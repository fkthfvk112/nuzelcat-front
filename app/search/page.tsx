import SearchAdvancedForm from "./SearchAdvancedForm";

// app/search/page.tsx
export default function SearchPage({
  searchParams,
}: {
  searchParams?:any
}) {
  return (
    <SearchAdvancedForm
      defaultTitle={(searchParams?.title as string) ?? ""}
      defaultCatName={(searchParams?.catName as string) ?? ""}
      defaultTags={typeof searchParams?.tags === "string" ? searchParams.tags.split(",") : []}
      defaultSortDir={(searchParams?.sortDir as "asc" | "desc" | "score_asc" | "score_desc") ?? "score_desc"}
      defaultSize={searchParams?.size ? Number(searchParams.size) : 12}
    />
  );
}
