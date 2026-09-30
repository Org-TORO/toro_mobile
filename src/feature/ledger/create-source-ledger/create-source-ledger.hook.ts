import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { isAxiosError } from "axios";

import { api } from "../../../infra/api/api";
import type { FailureResponse } from "../../../infra/api/failure.response.";
import type SuccessResponse from "../../../infra/api/success.response.";

const GET_VESSELS_ENDPOINT = "/refs/create-source-ledger/get-vessels";
const GET_MAIN_STAFFS_ENDPOINT = "/refs/create-source-ledger/get-main-staffs";

export const useCreateSourceLedgerStepOne = () => {
  const [vessels, setVessels] = useState<
    {
      id: number;
      registrationNumber: string;
      fishingMethod: string;
      captainName: string;
      fishingLicense: string;
      imoNumber: string;
    }[]
  >([]);
  const [selectedVesselId, setSelectedVesselId] = useState<number | null>(null);
  const [isLoadingVessels, setIsLoadingVessels] = useState(true);
  const [vesselsErrorMessage, setVesselsErrorMessage] = useState("");

  const selectedVessel = useMemo(
    () => vessels.find((vessel) => vessel.id === selectedVesselId) ?? null,
    [selectedVesselId, vessels]
  );

  const getVessels = async () => {
    setIsLoadingVessels(true);
    setVesselsErrorMessage("");

    try {
      const response = await api.get<
        SuccessResponse<
          {
            id: number;
            registrationNumber: string;
            fishingMethod: string;
            captainName: string;
            fishingLicense: string;
            imoNumber: string;
          }[]
        >
      >(GET_VESSELS_ENDPOINT);
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
    getVessels,
    selectVessel,
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

