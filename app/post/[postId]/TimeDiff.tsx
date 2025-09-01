"use client"

import { MediumDarkText } from "@/app/(components)/Texts"
import { timeDifferenceString } from "@/app/(utils)/timeUtil"


export default function TimeDiff({ time }: { time: string }){
    return <MediumDarkText text={timeDifferenceString(new Date(time))}/>
}
