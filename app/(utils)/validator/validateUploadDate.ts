"use client";

import { UploadPayload } from "@/app/(types)/post";
import { Validation } from "./ValidationInterface";



export function validateUploadPayload(data: UploadPayload): Validation {
  // 제목 (필수)
  if (!data.title || data.title.trim().length < 1 || data.title.length > 50) {
    return { isValid: false, message: "제목은 1자 이상 50자 이하여야 합니다." };
  }

  // 게시글 비밀번호 (비필수)
  if (data.authorPassword) {
    if (data.authorPassword.trim().length < 6 || data.authorPassword.length > 20) {
      return { isValid: false, message: "게시글 비밀번호는 6자 이상 20자 이하여야 합니다." };
    }
  }

  // 이미지 (필수)
  if (!data.base64ImgList || data.base64ImgList.length === 0) {
    return { isValid: false, message: "최소 1장의 사진을 업로드해야 합니다." };
  }
  
  if (data.base64ImgList.length > 3) {
    return { isValid: false, message: "사진은 최대 3장까지만 업로드할 수 있습니다." };
  }

  // 고양이 이름 (비필수)
  if (data.catName && data.catName.length > 40) {
    return { isValid: false, message: "고양이 이름은 최대 40자까지 입력할 수 있습니다." };
  }

  // 작성자명 (비필수)
  if (data.authorNickname && data.authorNickname.length > 40) {
    return { isValid: false, message: "작성자명은 최대 40자까지 입력할 수 있습니다." };
  }

  // 설명 (비필수)
  if (data.description && data.description.length > 250) {
    return { isValid: false, message: "설명은 최대 250자까지 입력할 수 있습니다." };
  }

  // 태그 (비필수)
  if (data.tags && data.tags.length > 3) {
    return { isValid: false, message: "태그는 최대 3개까지만 입력 가능합니다." };
  }

  if (data.tags) {
    for (let i = 0; i < data.tags.length; i++) {
      const tag = data.tags[i];
      if (tag.length > 10) {
        return { isValid: false, message: `태그 (${i + 1}번)는 10자 이하여야 합니다.` };
      }
    }
  }

  return { isValid: true, message: "유효한 업로드 데이터입니다." };
}