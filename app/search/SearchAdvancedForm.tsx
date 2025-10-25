// app/(components)/SearchAdvancedForm.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { CommonInput } from "@/app/(components)/Input";
import TagInput from "@/app/(components)/TagInput";
import { GreenButton, RedPinkButton } from "@/app/(components)/Btn";
import Container from "../(components)/Container";
import InnerContainer from "../(components)/InnerContaner";
import { RedPinkText } from "../(components)/Texts";

type Props = {
  defaultTitle?: string;
  defaultCatName?: string;
  defaultAuthorName?:string;
  defaultTags?: string[];
  defaultSortDir?: "asc" | "desc" | "score_asc" | "score_desc";
  defaultSize?: number;
};

const SORT_OPTIONS = [
  { value: "score_desc", label: "인기도 내림차순(기본)" },
  { value: "score_asc",  label: "인기도 오름차순" },
  { value: "desc",       label: "최신순" },
  { value: "asc",        label: "오래된순" },
] as const;

export default function SearchAdvancedForm({
  defaultTitle = "",
  defaultCatName = "",
  defaultAuthorName = "",
  defaultTags = [],
  defaultSortDir = "score_desc",
  defaultSize = 12,
}: Props) {
  const router = useRouter();

  const [title, setTitle] = useState(defaultTitle);
  const [author, setAuthor] = useState(defaultAuthorName);
  const [catName, setCatName] = useState(defaultCatName);
  const [tags, setTags] = useState<string[]>(defaultTags);
  const [sortDir, setSortDir] = useState<"asc" | "desc" | "score_asc" | "score_desc">(defaultSortDir);
  const buildQuery = () => {
    const qs = new URLSearchParams();
    if (title.trim())   qs.set("title", title.trim());
    if (catName.trim()) qs.set("catName", catName.trim());
    if (author.trim()) qs.set("author", author.trimRight());
    if (tags.length)    qs.set("tags", encodeURIComponent(tags.join(",")));
    qs.set("sortDir", sortDir);
    return qs.toString();
  };

  const onSearch = () => {
    const q = buildQuery();
    // 리스트 1페이지로 이동 (네가 이미 만든 리스트 페이지 규격에 맞춤)
    router.push(q ? `/post/list/1?${q}` : `/post/list/1`);
  };

  const onReset = () => {
    setTitle("");
    setCatName("");
    setTags([]);
    setSortDir("score_desc");
  };

  return (
    <Container style={{ padding: '1rem' }}>
        <RedPinkText className="text-2xl mb-3 font2" text="고양이 검색하기"/>
        <InnerContainer style={{ maxWidth: '512px', minHeight:'300px', padding:"3rem" }}>
            <div className="w-full">
                <CommonInput
                title="제목"
                type="text"
                placeholder="제목 입력"
                value={title}
                maxLength={50}
                onChange={(e) => setTitle(e.target.value)}/>
            </div>
            <div className="w-full mt-3">
                <CommonInput
                title="고양이 이름"
                type="text"
                placeholder="고양이 이름 입력"
                value={catName}
                maxLength={20}
                onChange={(e) => setCatName(e.target.value)}
                />
            </div>
            <div className="w-full mt-3">
                <CommonInput
                title="작성자"
                type="text"
                placeholder="작성자명 입력"
                value={author}
                maxLength={20}
                onChange={(e) => setAuthor(e.target.value)}
                />
            </div>
            <TagInput
            tags={tags}
            setTags={setTags}
            maxTags={3}
            required={false}
            info="길냥이, 집냥이, 치즈냥, 고등어 등"
            />
            <div className="flex flex-col w-full">
            <label className="text-sm text-gray-600 mb-1">정렬</label>
            <select
                value={sortDir}
                onChange={(e) => setSortDir(e.target.value as any)}
                className="rounded-lg border border-gray-300 px-3 py-2"
            >
                {SORT_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>
                    {opt.label}
                </option>
                ))}
            </select>
            </div>
            <div className="flex items-end gap-2 mt-6">
                <GreenButton className="w-[100px]" onClick={onSearch}>검색</GreenButton>
                <RedPinkButton className="w-[100px]" onClick={onReset}>초기화</RedPinkButton>
            </div>
        </InnerContainer>
    </Container>
  );
}
