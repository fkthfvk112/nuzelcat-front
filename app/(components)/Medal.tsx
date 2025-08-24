import Image from "next/image";

export type MedalType = "gold" | "silver" | "bronze"

interface MedalInterface {
  medalType: MedalType;
}

export default function Medal({ medalType }: MedalInterface) {
  // medalType에 따라 이미지 매핑
  const medalSrc: Record<MedalType, string> = {
    gold: "/gold.png",
    silver: "/silver.png",
    bronze: "/bronze.png",
  };

  return (
    <div className="relative w-[70px] h-[70px]">
      <Image
        src={medalSrc[medalType]}
        alt={`${medalType} medal`}
        fill
        className="object-contain"
        loading="lazy"
      />
    </div>
  );
}
