import IntakeFormPage from "@/components/intake/IntakeFormPage";

export default function GenXPatIntakePage() {
  return (
    <IntakeFormPage
      referralPartner={{
        label: "GenXPat",
        sourceValue: "GenXPat referral link",
        link: "fileabroad.com/genxpat",
      }}
    />
  );
}
