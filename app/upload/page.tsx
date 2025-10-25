"use client"

import { useState } from "react";
import Container from "../(components)/Container";
import InnerContainer from "../(components)/InnerContaner";
import { CommonInput, CommonTextArea } from "../(components)/Input";
import { RedPinkText } from "../(components)/Texts";
import { ColorCode } from "../(constants)/Colors";
import UploadIcon from "@mui/icons-material/Upload";
import { GreenButton, RedPinkButton } from "../(components)/Btn";
import { resizeFileToBase64 } from "../(utils)/image";
import { photoUrlInterface} from "../(types)/Image";
import Image from "next/image";
import TagInput from "../(components)/TagInput";
import axios from "axios";
import { defaultAxios } from "../(utils)/axiosInstance";
import { useRouter } from "next/navigation";
import { url } from "../(constants)/Urls";
import Swal from "sweetalert2";
import Require from "../(components)/Require";
import { validateUploadPayload } from "../(utils)/validator/validateUploadDate";
import { emptyToNull } from "../(utils)/helper";
import { UploadPayload } from "../(types)/post";
import ClearIcon from '@mui/icons-material/Clear';

export default function Upload(){
    const [title, setTitle]     = useState<string>("");
    const [catName, setCatName] = useState<string>("");
    const [author, setAuthor]   = useState<string>("");
    const [desc, setDesc]       = useState<string>("");
    const [images, setImages]   = useState<photoUrlInterface[]>([]);
    const [tags, setTags]       = useState<string[]>([]);
    const [pw, setPw]           = useState<string>("");

    const [loading, setLoading] = useState<boolean>(false);

    const router = useRouter();

    const uploadPost = async () => {
        const payload:UploadPayload = {
            title: title,
            catName: emptyToNull(catName),
            authorNickname: emptyToNull(author),
            description: emptyToNull(desc),
            authorPassword: emptyToNull(pw),
            tags: tags && tags.length > 0 ? tags : null,
            locationRegion: null,
            base64ImgList: images.map(img => img.photoString),
        };

        const validRes = validateUploadPayload(payload)
        if (!validRes.isValid) {
            Swal.fire({
                title: "입력 오류",
                text: validRes.message,
                icon: "error",
                confirmButtonText: "확인"
            });
            return;
        }
        setLoading(true);

        defaultAxios.post("/post", payload).then((res)=>{
            if (res.status === 200) {
                Swal.fire({
                    title: "게시가 완료되었습니다!",
                    icon: "success",
                }).then(() => {
                    router.push(url.POST + res.data)
                });
            }
        }).finally(()=>{
            setLoading(false);
        })
    };


    // 최대 3장
    const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files) return;

    // FileList를 배열로 변환
    const selectedFiles = Array.from(event.target.files);

    // 현재 이미지 개수 + 새로 선택한 개수가 3 초과인지 확인
    if ((images?.length || 0) + selectedFiles.length > 3) {
        Swal.fire({
            title: "이미지는 업로드 오류",
            text: "이미지는 최대 세 장까지만 업로드 할 수 있어요.",
            icon: "warning",
            confirmButtonText: "확인"
        });
        return;
    }

    try {
        const resizedImages = await Promise.all(
        selectedFiles.map(async (file) => {
            const base64StrImg = (await resizeFileToBase64(file, 1200, 1200)) as string;
            return {
            photoString: base64StrImg,
            photoFille: file,
            tempSaved: false,
            savedPathUrl: "",
            };
        })
        );

        setImages((prev) => [...(prev || []), ...resizedImages]);
    } catch (error) {
        alert("파일 변환 오류 발생: " + error);
    } finally {
        // 파일 선택창 초기화 (같은 파일 다시 올릴 때 필요)
        event.target.value = "";
    }
    };

    /**현재 useState 배열에서 인덱스에 해당하는 사진 제거 */
    const deletePhoto = (inx:number)=>{
        const deletedPhoto = images.filter((_, index) => index !== inx);
        setImages(deletedPhoto);
    };

    return(
        <Container style={{ padding: '1rem' }}>
            <RedPinkText className="text-2xl mb-3 font2" text="고양이 자랑하기"/>
            <InnerContainer style={{ maxWidth: '512px', minHeight:'300px', padding:"3rem" }}>
                <div></div>
                <CommonInput title="제목" type="text" placeholder="제목" value={title} required={true}
                    maxLength={50}      
                    onChange={(e)=>setTitle(e.target.value)}/>
                    <div className="w-full flex flex-start my-3">
                        <div className="grid grid-cols-2 gap-1 justify-start">
                            <CommonInput title="고양이 이름" type="text" placeholder="고양이 이름" value={catName}
                                maxLength={20}
                                onChange={(e)=>setCatName(e.target.value)}/>
                            <CommonInput title="작성자" type="text" placeholder="작성자명" value={author}
                                maxLength={20}
                                onChange={(e)=>setAuthor(e.target.value)}/>
                        </div>
                    </div>
                    <CommonTextArea 
                        title="설명"
                        value={desc}
                        placeholder="설명"
                        className="h-[100px]" 
                        maxLength={250}                           
                        onChange={(e)=>setDesc(e.target.value)}
                    />
                    <div className="w-full mt-6">
                        <label
                            htmlFor="file-upload"
                            className="flex flex-col items-center justify-center 
                                    border-2 border-dotted border-red-500 
                                    rounded-lg p-4 w-full h-[100px] cursor-pointer"
                        >
                            <UploadIcon style={{ fontSize: 40, color: "red" }} />
                            <RedPinkText text="사진 업로드"/>
                        </label>
                        <input
                            id="file-upload"
                            type="file"
                            className="hidden"
                            multiple
                            accept="image/*"
                            onChange={handleFileChange}
                        />
                    </div>
                    <section className="flex justify-center mt-2">
                    {
                    images?.map((ele, inx) => (
                        <div key={inx} className="relative w-[100px] h-[100px] img-wrapper-square">
                                            <div className="w-full text-right">
                    <button onClick={()=>deletePhoto(inx)} className="right-top-xboxBtn">
                        <ClearIcon className="bg-white"/>
                    </button>
                </div> 
                            <Image
                            className="inner-img"
                            src={ele.photoString}
                            alt="no img"
                            fill
                            />
                        </div>
                    ))
                    }
                    </section>
                    <TagInput tags={tags} setTags={setTags} maxTags={3} required={false} info="길냥이, 집냥이, 치즈냥, 고등어, 밈 등" />
                    <CommonInput title="게시글 비밀번호" maxLength={20} type="text" placeholder="6자 이상" value={pw}
                        info="게시글 삭제할 때 필요해요."     
                        onChange={(e)=>setPw(e.target.value)}/>
                <GreenButton onClick={uploadPost} className="w-full max-w-[500px] mt-5" disabled={loading}>{loading ? "업로드 중..." : "업로드"}</GreenButton>
                <div className="flex">
                    <Require/><div style={{color:"#c1c1c1"}}>업로드 후 수정이 불가능해요.</div> 
                </div>
            </InnerContainer>
        </Container>
    )    
}