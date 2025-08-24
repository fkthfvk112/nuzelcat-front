"use client";
import axios from "axios";
import Swal from "sweetalert2";
import { errorCode } from "../(constants)/ErrorCode";


/** 기본 서버로 요청하는 axios */
export const defaultAxios = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_API_URL}`,
  withCredentials: true,
  timeout:30000,
});


//----------------------------------- 공통 에러 적용 ----------------------------
[defaultAxios].map((instance)=>{
  instance.interceptors.response.use((res)=>{
    return res;
  },
  (err)=>{
    if (err.message === "Network Error" || err.code === 'ERR_INTERNET_DISCONNECTED') {
      Swal.fire({
      title: "인터넷 연결 실패",
      text: "인터넷을 다시 확인해주세요.",
      icon: "warning",
      confirmButtonText: "확인",
      confirmButtonColor: '#d33',
      allowEnterKey:false
      });
      
      return Promise.reject(err);
    }
    else if (err.code === "ECONNABORTED") {
      Swal.fire({
        title: "서버 응답 시간이 초과되었습니다.",
        text: "잠시 후 다시 시도해 주세요.",
        icon: "warning",
        confirmButtonText: "확인",
        confirmButtonColor: '#d33',
        allowEnterKey: false,
      });
    }
    else if(errorCode.includes(err.response.data.code)){
      Swal.fire({
        title: "에러가 발생하였습니다.",
        text: err.response.data.message,
        icon: "warning",
        confirmButtonText: "확인",
        confirmButtonColor: '#d33',
        allowEnterKey:false
        });
    }else if(err.response.status === 403 && err.response.data != "T001"){
      console.log("에러", err)
      Swal.fire({
        title: "에러가 발생하였습니다.",
        text:"사용 권한이 없습니다.",
        icon: "warning",
        confirmButtonText: "확인",
        confirmButtonColor: '#d33',
        allowEnterKey:false
        });
    }
    else if(err.response.data != "T001"){
      Swal.fire({
        title: "에러가 발생하였습니다.",
        icon: "warning",
        confirmButtonText: "확인",
        confirmButtonColor: '#d33',
        allowEnterKey:false
        });
    }
    return Promise.reject(err);
  })
})