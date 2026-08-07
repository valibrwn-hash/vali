import { CoverSection } from "@/components/sections/CoverSection";
import { AbstractSection } from "@/components/sections/AbstractSection";
import { SelectedWorkSection } from "@/components/sections/SelectedWorkSection";
import { CapabilitiesSection } from "@/components/sections/CapabilitiesSection";
import { ApproachSection } from "@/components/sections/ApproachSection";
import { ExpertiseSection, TrustSection } from "@/components/sections/ExpertiseSection";
import { ContactPreviewSection } from "@/components/sections/ContactPreviewSection";

export default function HomePage() {
  return (
    <>
      <CoverSection />
      <AbstractSection />
      <SelectedWorkSection />
      <CapabilitiesSection />
      <ApproachSection />
      <ExpertiseSection />
      <TrustSection />
      <ContactPreviewSection />
    </>
  );
}
