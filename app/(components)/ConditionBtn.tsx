"use client"

import { CircularProgress } from "@mui/material";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";

export default function ConditionBtns() {
    const [queryMap, setQueryMap] = useState<Map<string, string[]>>(new Map());
    const [isLoading, setIsLoading] = useState<boolean>(false); //have to 스켈레톤으로 변경할 방법 찾기 loading.tsx발동시키기
    const currentUrl = usePathname();
    const searchParams = useSearchParams();
    const router = useRouter();

    useEffect(()=>{
        setIsLoading(false);
    }, [currentUrl, searchParams])

    const getSortingCon = () => {
         const sortDir = searchParams.get("sortDir"); 
    
        console.log("컨디션", currentUrl)

        return sortDir ? sortDir : "score_desc";
    }

    const setSortingCon = (sortingCon: string) => {
        const queryStrArr:string[] = [];// ["key=value", "key2=value2"]

        const conditionMap = new Map(queryMap);
        Array.from(conditionMap, ([key, value])=>({name:key, value})).forEach((query)=>{
            query.value.forEach((val)=>{
                if(query.name !== "sortDir"){
                    queryStrArr.push(`${query.name}=${val}`);
                }
            })
        })

        queryStrArr.push(`sortDir=${sortingCon}`);

        const queryStr = queryStrArr.length > 0 ? queryStrArr.join('&') : '';

        setIsLoading(true);
        router.push("/post/list/1?" + queryStr);
    };

    return (
        <div className="flex justify-end w-full max-w-[2450px] mt-6 mb-6">
            {
            !isLoading?
            <>
            <section className="w-[150px] px-2 bg-white rounded-2xl">
                <select
                    name="sorting"
                    value={getSortingCon()}
                    onChange={(evt) => {
                        setSortingCon(evt.target.value);
                    }}
                    className="rounded p-2"
                    >
                    <option value="score_desc">인기순</option>
                    <option value="desc">최신순</option>
                </select>
            </section>
            </>:<div className="flex justify-center w-full"><CircularProgress /></div>
            }
        </div>
    )

}

