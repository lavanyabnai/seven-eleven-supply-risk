import Top10Lanes from "@/components/transportation/cost/Top10Lanes";
import PrimeTender from "@/components/transportation/cost/PrimeTender";
import ValueLostLine from "@/components/transportation/cost/ValueLostLine";
import TotalSpendLine from "@/components/transportation/cost/TotalSpendLine";
import DamageRateLine from "@/components/transportation/cost/DamageRateLine";
import OntimeLine from "@/components/transportation/cost/OntimeLine";
import MissingDataLine from "@/components/transportation/cost/MissingDataLine";
import PrimeTenderLine from "@/components/transportation/cost/PrimeTenderLine";
export default function CarrierScoreTab() {
  return (
    <div>
    <div className="my-2 p-4 rounded-lg border bg-white">
                    <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-700 via-sky-700 to-blue-700 font-display ">
                        Carrier Scorecard
                    </h2>
                </div>
    <div className="grid grid-cols-2 gap-4">
      <Top10Lanes />

      <div className="grid grid-cols-3 gap-4">
        <PrimeTenderLine />

        <ValueLostLine />

        <TotalSpendLine />

        <DamageRateLine />

        <OntimeLine />

        <MissingDataLine />
      </div>
    </div>
    </div>
  );
}
