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

export default function Upload(){
    const [title, setTitle]     = useState<string>("");
    const [catName, setCatName] = useState<string>("");
    const [author, setAuthor]   = useState<string>("");
    const [desc, setDesc]       = useState<string>("");
    const [images, setImages]   = useState<photoUrlInterface[]>([]);
    const [tags, setTags]       = useState<string[]>([]);
    const [pw, setPw]           = useState<string>("");

    const router = useRouter();

    const uploadPost = async () => {
        const payload = {
            title: title,
            catName: catName,
            authorNickname: author,
            description: desc,
            authorPassword: pw,
            tags: tags,
            locationRegion: null,
            base64ImgList: images.map(img => img.photoString),
        };

        defaultAxios.post("/post", payload).then((res)=>{
            if (res.status === 200) {
                Swal.fire({
                    title: "게시가 완료되었습니다!",
                    icon: "success",
                }).then(() => {
                    router.push(url.POST + res.data)
                });
            }
        })
    };


    // 최대 3장
    const handleFileChange = async (event: any) => {
        if(!images || images?.length >= 3){
            alert("이미지는 최대 세 장까지만 올릴 수 있습니다.")
            return;
        }
        const file = event.target.files[0];
        console.log("파일", file)
        if (file) {
            try {
            const base64StrImg = (await resizeFileToBase64(file, 1200, 1200)) as string;

                setImages((prev) => [
                    ...(prev || []), // 기존 배열 복사
                    {
                    photoString: base64StrImg,
                    photoFille: file,
                    tempSaved: false,
                    savedPathUrl: "",
                    },
                ]);
            } catch (error) {
            alert("파일 변환 오류 발생 " + error);
            }
        }
    };

    return(
        <Container style={{ padding: '7.5rem' }}>
            <RedPinkText className="text-2xl mb-10" text="고양이 자랑하기"/>
            <InnerContainer style={{ maxWidth: '512px', minHeight:'300px', padding:"3rem" }}>
                <div></div>
                <CommonInput title="제목" type="text" placeholder="제목" value={title}
                    maxLength={50}      
                    onChange={(e)=>setTitle(e.target.value)}/>
                    <div className="w-full flex flex-start my-3">
                        <div className="grid grid-cols-2 gap-1 justify-start">
                            <CommonInput title="고양이 이름" type="text" placeholder="고양이 이름(생략가능)" value={catName}
                                maxLength={20}
                                onChange={(e)=>setCatName(e.target.value)}/>
                            <CommonInput title="작성자" type="text" placeholder="작성자명(생략가능)" value={author}
                                maxLength={20}
                                onChange={(e)=>setAuthor(e.target.value)}/>
                        </div>
                    </div>
                <CommonTextArea 
                    title="설명"
                    value={desc}
                    placeholder="설명(생략가능)"
                    className="h-[100px]" 
                    maxLength={250}                           
                    onChange={(e)=>setDesc(e.target.value)}/>
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
                            onChange={(evt) => {
                                handleFileChange(evt);
                            }}
                        />
                    </div>
                    <section className="flex justify-center mt-2">
                    {
                    images?.map((ele, inx) => (
                        <div key={inx} className="relative w-[100px] h-[100px] img-wrapper-square">
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
                    <TagInput tags={tags} setTags={setTags} maxTags={3} />
                    <CommonInput title="게시글 비밀번호" maxLength={20} type="text" placeholder="게시글 비밀번호(삭제시 사용)" value={pw}       
                        onChange={(e)=>setPw(e.target.value)}/>
                <GreenButton onClick={uploadPost} className="w-full max-w-[500px] mt-5">업로드</GreenButton>
            </InnerContainer>
        </Container>
    )    
}