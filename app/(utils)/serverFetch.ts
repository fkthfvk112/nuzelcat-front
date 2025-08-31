"use server";

import { headers } from "next/headers";

export default async function serverFetch({
  url,
  queryParams,
  option
}: {
  url: string;
  queryParams?: object;
  option?: RequestInit;
}): Promise<any> {
  const queryString = queryParams ? `?${objectToQueryString(queryParams)}` : "";
  const fullUrl = `${process.env.NEXT_PUBLIC_API_URL}${url}${queryString}`;

  // ✅ 비동기 호출
  const incomingHeaders = await headers();

  const forwardHeaders: HeadersInit = {
    ...(option?.headers || {}),
    "x-forwarded-for": incomingHeaders.get("x-forwarded-for") || "",
    "user-agent": incomingHeaders.get("user-agent") || "",
    "accept-language": incomingHeaders.get("accept-language") || ""
  };

  const res = await fetch(fullUrl, {
    ...option,
    headers: forwardHeaders,
    cache: "no-store"
  });

  if (!res.ok) {
    const result = await res.json();
    console.log("결과", result);
    throw new Error(result?.message || "알 수 없는 오류가 발생했습니다.");
  }

  return res.json();
}

const objectToQueryString = (queryParam: Object) => {
  return Object.entries(queryParam)
    .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
    .join("&");
};
