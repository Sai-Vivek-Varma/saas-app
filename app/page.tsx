import CompanionCard from "@/components/CompanionCard";
import CompanionsList from "@/components/CompanionList";
import CTA from "@/components/CTA";
import {
  getAllCompanions,
  getRecentSessions,
} from "@/lib/actions/companion.actions";
import { getSubjectColor } from "@/lib/utils";

export const dynamic = "force-dynamic";

const Page = async () => {
  const companions = await getAllCompanions({ limit: 3 });
  const recentSessions = await getRecentSessions();
  return (
    <main className="py-10">
      <h1>Popular Companions</h1>

      <section className="home-section">
        {companions.map((companion) => (
          <CompanionCard
            key={companion.id}
            {...companion}
            color={getSubjectColor(companion.subject)}
          />
        ))}
      </section>

      <section className="home-section">
        <CompanionsList
          title="Recently completed sessions"
          companions={recentSessions}
          classNames="w-2/3 max-lg:w-full"
        />
        <CTA />
      </section>
    </main>
  );
};

export default Page;
