export interface ImageCardInterface{
    postId:number,
    repreImgUrl:string,// 대표 이미지 url
    imgCnt:number, // 포스팅에 포함된 이미지 개수
    createdAt:string, // 포스팅 생성일
    title: string, // 포스팅 제목
    catName: string, // 고양이 이름
    tags:string[],
    likeCnt:number,
    viewCnt:number,
}

export interface photoUrlInterface{
    photoString:string,
    photoFille:File
    tempSaved:boolean,
    savedPathUrl:string,
}
