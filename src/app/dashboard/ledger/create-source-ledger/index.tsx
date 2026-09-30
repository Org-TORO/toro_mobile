import { useState } from "react";

import CreateSourceLedgerStepOne from "./_components/create-source-ledger-step-one";
import CreateSourceLedgerStepTwo from "./_components/create-source-ledger-step-two";
import CreateSourceLedgerStepper from "./_components/create-source-ledger-stepper";

export default function CreateSourceLedgerScreen() {
  const [activeStep, setActiveStep] = useState<"1" | "2">("1");

  return (
    <>
      <CreateSourceLedgerStepper activeStep={activeStep} />
      {activeStep === "1" ? (
        <CreateSourceLedgerStepOne onContinue={() => setActiveStep("2")} />
      ) : (
        <CreateSourceLedgerStepTwo onGoBack={() => setActiveStep("1")} />
      )}
    </>
  );
}
