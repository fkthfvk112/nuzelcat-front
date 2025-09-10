"use server";
import { revalidateTag } from "next/cache";

export const revalidateByTagName = async(tagName: string) => {
  revalidateTag(tagName);
};
