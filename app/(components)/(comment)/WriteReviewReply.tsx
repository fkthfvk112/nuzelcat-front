"use client"

import { writeComment } from "@/app/(api)/(comment)/comment_client";
import { defaultAxios } from "@/app/(utils)/axiosInstance";
import { revalidateByTagName } from "@/app/(utils)/revalidateByTagName";
import { Modal } from "@mui/material";
import React, { ChangeEvent, useState } from "react";

const modalstyle = {
    position: "absolute" as "absolute",
    bottom: "5%",
    left: "50%",
    maxHeight:"300px",
    transform: "translate(-50%, -50%)",
    width: "80%",
    backgroundColor: "white",
    padding:"1em",
    maxWidth:"700px",
    minWidth:"275px"
  };

  interface commonReviewReply{
    parentReviewId:number|string,
    message:string,
    checkAnonymous?:boolean,
  }

function WriteReviewReply({postId, parentReviewId}:{postId:number, parentReviewId:number}){
    const [open, setOpen] = useState<boolean>(false);
    const [reply, setReply] = useState<string>("")

    const reviewKey = `reviews-${postId}`;

    const handleSaveReply = ()=>{
      writeComment({
        postId:postId,
        parentId:parentReviewId,
        body:reply
      }).then((res)=>{
        revalidateByTagName(reviewKey);
      }).catch((e) => {
        console.log(e);
      });          
    }    

    const handleChangeData = (evt:ChangeEvent<HTMLTextAreaElement>)=>{
      const messageNow = evt.target.value;
      if(messageNow.length > 1000) return;
      setReply(messageNow);
    }

    return(
        <>
        <div onClick={()=>{
            setOpen(true);
        }} className="text-[#a1a1a1] cursor-pointer whitespace-nowrap">대댓글</div>
            <Modal
                open={open}
                onClose={() => {
                    setOpen(false);
                }}
            >
                <div style={modalstyle}>
                {
                    <div className="w-full border border-slate-400">
                      <textarea
                        className="w-full h-30 p-3 border-none bottom-line-noM"
                        placeholder="대댓글을 작성해주세요."
                        value={reply}
                        onChange={(e)=>handleChangeData(e)}
                      />
                      <div className="flex justify-between flex-wrap items-center p-2">
                        <div className="flex justify-end items-center w-full">
                          <div className="me-5">{reply.length}/1000</div>
                          {
                            reply.length >= 2 && reply.length <= 1000?
                            <button 
                            className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded cursor-pointer transition"
                            onClick={() => handleSaveReply()}>
                              댓글 쓰기
                            </button>:
                            <button 
                            className="bg-gray-300 text-gray-600 px-4 py-2 rounded cursor-not-allowed"
                            >
                              댓글 쓰기
                            </button>
                          }
                        </div>
                    </div>
                    </div>
                  }
                </div>
            </Modal>
        </>
    )
}

export default React.memo(WriteReviewReply);