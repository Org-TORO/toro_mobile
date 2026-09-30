import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { isAxiosError, type AxiosResponse } from "axios";

import { api } from "../../../infra/api/api";
import {
  ERROR_CODES,
  type FailureResponse,
} from "../../../infra/api/failure.response.";
import type SuccessResponse from "../../../infra/api/success.response.";
import { useAuthStore } from "../../../infra/security/auth.store";

const GET_VESSELS_ENDPOINT = "/refs/create-source-ledger/get-vessels";
const GET_MAIN_STAFFS_ENDPOINT = "/refs/create-source-ledger/get-main-staffs";
const CREATE_SOURCE_LEDGER_ENDPOINT = "/api/ledgers/create-source-ledger";
const DEFAULT_SOURCE_TYPE = "VESSEL";

type SourceType = "VESSEL" | "FARM";

type VesselOption = {
  id: number;
  registrationNumber: string;
  fishingMethod: string;
  captainName: string;
  fishingLicense: string;
  imoNumber: string;
};

type CreateSourceLedgerRequest = {
  organizationId: number;
  vesselId: number;
  sourceType: SourceType;
};

type SourceLedgerSummary = {
  id: number;
  organizationId: number;
  vesselId: number;
  sourceType: SourceType;
  createdAt: string;
};

type CreateSourceLedgerFieldErrors = Partial<
  Record<keyof CreateSourceLedgerRequest, string>
>;

const getCreateSourceLedgerErrorMessage = (
  error: unknown
): string => {
  console.log(error);
  
  if (!isAxiosError<FailureResponse<CreateSourceLedgerFieldErrors | string>>(error)) {
    return "Unable to create source ledger";
  }

  const responseData = error.response?.data;
  const responseErrors = responseData?.errors;

  if (
    responseData?.code === ERROR_CODES.INPUT_VALIDATION_ERROR &&
    responseErrors &&
    typeof responseErrors === "object"
  ) {
    const fieldMessages = Object.values(responseErrors).filter(Boolean);

    return fieldMessages[0] ?? responseData.message;
  }

  if (
    responseData?.code === ERROR_CODES.BUSINESS_VALIDATION_ERROR &&
    typeof responseErrors === "string"
  ) {
    return responseErrors;
  }

  return responseData?.message ?? "Unable to create source ledger";
};

export const useCreateSourceLedgerStepOne = () => {
  const organizationId = useAuthStore(
    (state) => state.userInfo?.organizationId ?? null
  );
  const [vessels, setVessels] = useState<VesselOption[]>([]);
  const [selectedVesselId, setSelectedVesselId] = useState<number | null>(null);
  const [isLoadingVessels, setIsLoadingVessels] = useState(true);
  const [vesselsErrorMessage, setVesselsErrorMessage] = useState("");
  const [isCreatingSourceLedger, setIsCreatingSourceLedger] = useState(false);
  const [createSourceLedgerErrorMessage, setCreateSourceLedgerErrorMessage] =
    useState("");
  const [createdSourceLedger, setCreatedSourceLedger] =
    useState<SourceLedgerSummary | null>(null);

  const selectedVessel = useMemo(
    () => vessels.find((vessel) => vessel.id === selectedVesselId) ?? null,
    [selectedVesselId, vessels]
  );

  const getVessels = async () => {
    setIsLoadingVessels(true);
    setVesselsErrorMessage("");

    try {
      const response = await api.get<SuccessResponse<VesselOption[]>>(
        GET_VESSELS_ENDPOINT
      );
      const nextVessels = response.data.data;

      setVessels(nextVessels);
      setSelectedVesselId((currentId) => {
        if (nextVessels.length === 0) {
          return null;
        }

        const currentVesselStillExists = nextVessels.some(
          (vessel) => vessel.id === currentId
        );

        return currentVesselStillExists ? currentId : nextVessels[0].id;
      });
    } catch (error) {
      if (isAxiosError<FailureResponse>(error)) {
        setVesselsErrorMessage(
          error.response?.data?.message ?? "Unable to get vessels"
        );
      } else {
        setVesselsErrorMessage("Unable to get vessels");
      }
    } finally {
      setIsLoadingVessels(false);
    }
  };

  const selectVessel = (vesselId: number) => {
    setSelectedVesselId(vesselId);
    setCreateSourceLedgerErrorMessage("");
    setCreatedSourceLedger(null);
  };

  const createSourceLedger = async () => {
    setCreateSourceLedgerErrorMessage("");
    setCreatedSourceLedger(null);

    if (!organizationId) {
      setCreateSourceLedgerErrorMessage("Organization id is required");
      return null;
    }

    if (!selectedVesselId) {
      setCreateSourceLedgerErrorMessage("Vessel id is required");
      return null;
    }

    setIsCreatingSourceLedger(true);

    try {
      const response = await api.post<SuccessResponse<SourceLedgerSummary>>(
        CREATE_SOURCE_LEDGER_ENDPOINT,
        {
          organizationId,
          vesselId: selectedVesselId,
          sourceType: DEFAULT_SOURCE_TYPE,
        }
      );

      setCreatedSourceLedger(response.data.data);

      return response.data.data;
    } catch (error) {
      setCreateSourceLedgerErrorMessage(
        getCreateSourceLedgerErrorMessage(error)
      );

      return null;
    } finally {
      setIsCreatingSourceLedger(false);
    }
  };

  useEffect(() => {
    void getVessels();
  }, []);

  return {
    vessels,
    selectedVessel,
    selectedVesselId,
    isLoadingVessels,
    vesselsErrorMessage,
    isCreatingSourceLedger,
    createSourceLedgerErrorMessage,
    createdSourceLedger,
    getVessels,
    selectVessel,
    createSourceLedger,
  };
};

export const useCreateSourceLedgerStepTwo = () => {
  const requestIdRef = useRef(0);
  const [mainStaffs, setMainStaffs] = useState<
    {
      id: number;
      userId: number;
      fullName: string;
      email: string;
      phoneNumber: string;
      organizationId: number;
      organizationName: string;
    }[]
  >([]);
  const [selectedMainStaffId, setSelectedMainStaffId] = useState<number | null>(null);
  const [mainStaffSearch, setMainStaffSearch] = useState("");
  const [isLoadingMainStaffs, setIsLoadingMainStaffs] = useState(true);
  const [mainStaffsErrorMessage, setMainStaffsErrorMessage] = useState("");

  const selectedMainStaff = useMemo(
    () => mainStaffs.find((mainStaff) => mainStaff.id === selectedMainStaffId) ?? null,
    [mainStaffs, selectedMainStaffId]
  );

  const getMainStaffs = useCallback(async (search = mainStaffSearch) => {
    const requestId = requestIdRef.current + 1;
    const normalizedSearch = search.trim();

    requestIdRef.current = requestId;
    setIsLoadingMainStaffs(true);
    setMainStaffsErrorMessage("");

    try {
      const response = await api.get<
        SuccessResponse<
          {
            id: number;
            userId: number;
            fullName: string;
            email: string;
            phoneNumber: string;
            organizationId: number;
            organizationName: string;
          }[]
        >
      >(GET_MAIN_STAFFS_ENDPOINT, {
        params: normalizedSearch ? { search: normalizedSearch } : undefined,
      });

      if (requestIdRef.current !== requestId) {
        return;
      }

      setMainStaffs(response.data.data);
    } catch (error) {
      if (requestIdRef.current !== requestId) {
        return;
      }

      if (isAxiosError<FailureResponse>(error)) {
        setMainStaffsErrorMessage(
          error.response?.data?.message ?? "Unable to get main staffs"
        );
      } else {
        setMainStaffsErrorMessage("Unable to get main staffs");
      }
    } finally {
      if (requestIdRef.current === requestId) {
        setIsLoadingMainStaffs(false);
      }
    }
  }, [mainStaffSearch]);

  const selectMainStaff = (mainStaffId: number) => {
    setSelectedMainStaffId(mainStaffId);
  };

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      void getMainStaffs(mainStaffSearch);
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [getMainStaffs, mainStaffSearch]);

  return {
    mainStaffs,
    selectedMainStaff,
    selectedMainStaffId,
    mainStaffSearch,
    isLoadingMainStaffs,
    mainStaffsErrorMessage,
    getMainStaffs,
    selectMainStaff,
    setMainStaffSearch,
  };
};

