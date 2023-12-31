import CompanyCard from "@/components/company.card";
import { api } from "@/trpc/server";

export default async function Home() {
  const companies = await api.company.browse.query();
  return (
    <div className="flex flex-col gap-4">
      <div className="pb-4">
        <h1 className="text-4xl font-bold">Browse</h1>
      </div>
      <div className="grid gap-6 md:grid-cols-2">
        {companies.map((company) => (
          <CompanyCard key={company.name} company={company} />
        ))}
      </div>
    </div>
  );
}
