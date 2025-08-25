"use client";
import { Pagination } from "@mui/material";
import { useRouter } from "next/navigation";

export default function CustomPageNation({
  queryStr,
  pageNow,
  pageMax,
}: {
  queryStr: string;
  pageNow: number;
  pageMax: number;
}) {
  const router = useRouter();
  const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
    const url = queryStr
      ? `/post/list/${value}?${queryStr}`
      : `/post/list/${value}`;
    router.push(url);
  };


  return (
      <Pagination
        size="small"
        onChange={handlePageChange}
        count={pageMax}
        defaultPage={pageNow}
      />
  );
}
