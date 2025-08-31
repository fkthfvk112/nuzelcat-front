"use client"

import Link from "next/link"
import React, { useState } from "react";
import ScrollToTopButton from "./ScrollToTopButton";
import AddIcon from '@mui/icons-material/Add';
import ClearIcon from '@mui/icons-material/Clear';

interface floatingBtnDatasInterface{
    name:string,
    url:string
}

const additionalItemCss = "bg-white m-[4px] rounded-3xl p-2 px-5 text-center"


function FloatingBtn({floatingBtnDatas}:{floatingBtnDatas:floatingBtnDatasInterface[]}){
    const [floatingBtnClicked, setFloatingBtnClicked] = useState<boolean>(false);

    const clickPlusBtn = ()=>{
        setFloatingBtnClicked((prev)=>!prev);

    }

    const additionalBtnComps = floatingBtnDatas.map((btn, inx)=>
        <Link href={btn.url} key={inx} className={`${additionalItemCss}`}>
            {btn.name}
        </Link>
    )


    return (
        <>
        {floatingBtnClicked &&
        <div
            onClick={() => setFloatingBtnClicked(false)}
            style={{
            position: 'fixed',
            top: 0,
            right: 0,
            bottom: 0,
            left: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            zIndex: 40,
            }}
        />
        }
            <div className="fixed bottom-6 right-6 mb-10 z-50 flex flex-col items-end gap-2">
            <ScrollToTopButton marginBottom={0} />

            {floatingBtnClicked && (
                <div className="flex flex-row-reverse gap-2 mb-2">
                {additionalBtnComps}
                </div>
            )}

            <button
                onClick={clickPlusBtn}
                className={`${
                floatingBtnClicked ? "bg-white" : "bg-[#f76c76ff]"
                } border-none rounded-full w-[60px] h-[60px] cursor-pointer`}
            >
                {floatingBtnClicked ? (
                <ClearIcon sx={{ width: "25px", height: "25px" }} />
                ) : (
                <AddIcon sx={{ width: "25px", height: "25px", fill:"white" }} />
                )}
            </button>
            </div>
        </>
    )
}

export default React.memo(FloatingBtn)