"use client";

import { useState } from "react";
import ClearIcon from "@mui/icons-material/Clear";
import { CommonInput } from "./Input";

interface TagInputProps {
  tags: string[];
  setTags: React.Dispatch<React.SetStateAction<string[]>>;
  maxTags?: number;
  info?:string;
  required?:boolean;
}

export default function TagInput({ tags, setTags, maxTags = 3, info, required }: TagInputProps) {
  const [tagInput, setTagInput] = useState<string>("");

  // 태그 추가
  const handleAddTag = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" || e.key === "," || e.key === " ") {
      e.preventDefault();
      const newTag = tagInput.trim();
      if (!newTag) return;
      if (tags.length >= maxTags) {
        alert(`태그는 최대 ${maxTags}개까지 입력할 수 있습니다.`);
        return;
      }
      if (tags.includes(newTag)) {
        alert("중복된 태그입니다.");
        return;
      }
      setTags([...tags, newTag]);
      setTagInput("");
    }
  };

  // 태그 삭제
  const handleDeleteTag = (index: number) => {
    setTags(tags.filter((_, i) => i !== index));
  };

  return (
    <div className="w-full my-4">
      <CommonInput
        title={`태그 (최대 ${maxTags}개)`}
        info={info}
        required={required}
        type="text"
        value={tagInput}
        placeholder="# 없이 태그 입력 후 Enter"
        onChange={(e) => setTagInput(e.target.value)}
        onKeyDown={handleAddTag}
        enterKeyHint="done"
        className="w-full border rounded p-2 mt-1"
      />
      <div className="flex gap-2 mt-2 flex-wrap">
        {tags.map((tag, inx) => (
          <div
            key={inx}
            className="bg-[#34D399] text-white flex justify-center items-center w-fit px-3 me-2 mt-1 text-white rounded-md font-bold whitespace-nowrap"
          >
            #{tag}
            <button
              onClick={() => handleDeleteTag(inx)}
              className="ml-2 text-dart"
            >
              <ClearIcon fontSize="small" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
