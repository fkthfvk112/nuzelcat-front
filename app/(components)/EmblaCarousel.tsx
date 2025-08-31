"use client";
import React, { useCallback, useEffect, useState } from "react";
import { EmblaOptionsType } from "embla-carousel";
import useEmblaCarousel from "embla-carousel-react";
import { flushSync } from "react-dom";
import "../(constants)/embla.css";
import Image from "next/image";

const TWEEN_FACTOR = 3;
const numberWithinRange = (n: number, min: number, max: number) =>
  Math.min(Math.max(n, min), max);

type PropType = {
  imgUrls: string[];
  slides: number[];
  options?: EmblaOptionsType;
};

const EmblaCarousel: React.FC<PropType> = ({ imgUrls, slides, options }) => {
  const [emblaRef, emblaApi] = useEmblaCarousel(options);
  const [tweenValues, setTweenValues] = useState<number[]>([]);
  const [modalImg, setModalImg] = useState<string>("");
  const [modalOpen, openImgModal] = useState<boolean>(false);

  // 버튼 활성화 상태
  const [prevBtnEnabled, setPrevBtnEnabled] = useState(false);
  const [nextBtnEnabled, setNextBtnEnabled] = useState(false);

  const imageByIndex = (index: number): string =>
    imgUrls[index % imgUrls.length];

  const clickImgModalOpen = (imgStr: string) => {
    setModalImg(imgStr);
    openImgModal(true);
  };

  const onScroll = useCallback(() => {
    if (!emblaApi) return;
    const engine = emblaApi.internalEngine();
    const scrollProgress = emblaApi.scrollProgress();
    const styles = emblaApi.scrollSnapList().map((scrollSnap, index) => {
      let diffToTarget = scrollSnap - scrollProgress;
      if (engine.options.loop) {
        engine.slideLooper.loopPoints.forEach((loopItem) => {
          const target = loopItem.target();
          if (index === loopItem.index && target !== 0) {
            const sign = Math.sign(target);
            if (sign === -1) diffToTarget = scrollSnap - (1 + scrollProgress);
            if (sign === 1) diffToTarget = scrollSnap + (1 - scrollProgress);
          }
        });
      }
      const tweenValue = 1 - Math.abs(diffToTarget * TWEEN_FACTOR);
      return numberWithinRange(tweenValue, 0, 1);
    });
    setTweenValues(styles);
  }, [emblaApi]);

  // 버튼 활성화 갱신
  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setPrevBtnEnabled(emblaApi.canScrollPrev());
    setNextBtnEnabled(emblaApi.canScrollNext());
    onScroll();
  }, [emblaApi, onScroll]);

  // 버튼 핸들러
  const scrollPrev = useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onScroll();
    onSelect();
    emblaApi.on("scroll", () => flushSync(onScroll));
    emblaApi.on("reInit", () => {
      onSelect();
      onScroll();
    });
    emblaApi.on("select", onSelect);
  }, [emblaApi, onScroll, onSelect]);

  const showArrows = imgUrls.length > 1;

  return (
    <>
      <div className="embla relative">
        <div className="embla__viewport" ref={emblaRef}>
          <div className="embla__container">
            {slides.map((index) => (
              <div className="embla_img_slide" key={index}>
                <Image
                  className="inner-img"
                  src={imageByIndex(index)}
                  alt="image"
                  fill
                  onClick={() => clickImgModalOpen(imageByIndex(index))}
                />
              </div>
            ))}
          </div>
        </div>

        {/* 좌우 네비게이션 버튼 (이미지 2장 이상일 때만 표시) */}
        {showArrows && (
          <>
            <button
              type="button"
              aria-label="이전 이미지"
              onClick={scrollPrev}
              disabled={!prevBtnEnabled}
              className="absolute left-2 top-1/2 -translate-y-1/2 z-10 rounded-full bg-black/40 hover:bg-black/60 disabled:bg-black/20 text-white w-10 h-10 flex items-center justify-center cursor-pointer"
            >
              {/* Left Arrow SVG */}
              <svg width="20" height="20" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M15 6l-6 6 6 6" fill="none" stroke="currentColor" strokeWidth="2" />
              </svg>
            </button>

            <button
              type="button"
              aria-label="다음 이미지"
              onClick={scrollNext}
              disabled={!nextBtnEnabled}
              className="absolute right-2 top-1/2 -translate-y-1/2 z-10 rounded-full bg-black/40 hover:bg-black/60 disabled:bg-black/20 text-white w-10 h-10 flex items-center justify-center cursor-pointer"
            >
              {/* Right Arrow SVG */}
              <svg width="20" height="20" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M9 6l6 6-6 6" fill="none" stroke="currentColor" strokeWidth="2" />
              </svg>
            </button>
          </>
        )}
      </div>

      {/* 이미지 모달이 필요하면 아래 주석 해제해서 사용 */}
      {/* <ImgModal modalOpen={modalOpen} setModalOpen={openImgModal} modalImg={modalImg}/> */}
    </>
  );
};

export default EmblaCarousel;
