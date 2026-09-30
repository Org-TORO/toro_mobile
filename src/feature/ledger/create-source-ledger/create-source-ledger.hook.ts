import { useEffect, useMemo, useState } from "react";
import { isAxiosError } from "axios";

import { api } from "../../../infra/api/api";
import type { FailureResponse } from "../../../infra/api/failure.response.";
import type SuccessResponse from "../../../infra/api/success.response.";

const GET_VESSELS_ENDPOINT = "/refs/create-source-ledger/get-vessels";

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

