export function timeDifferenceString(inputTime: Date): string {
  const currentTime = new Date();
  const differenceInSeconds = Math.floor(
    (currentTime.getTime() - inputTime.getTime()) / 1000
  );

  const minute = 60;
  const hour = minute * 60;
  const day = hour * 24;
  const week = day * 7;
  const month = day * 30;

  if (differenceInSeconds < minute) {
    return differenceInSeconds + "초 전";
  } else if (differenceInSeconds < hour) {
    const minutes = Math.floor(differenceInSeconds / minute);
    return minutes + "분 전";
  } else if (differenceInSeconds < day) {
    const hours = Math.floor(differenceInSeconds / hour);
    return hours + "시간 전";
  } else if (differenceInSeconds < week) {
    const days = Math.floor(differenceInSeconds / day);
    return days + "일 전";
  } else if (differenceInSeconds < month) {
    const weeks = Math.floor(differenceInSeconds / week);
    return weeks + "주 전";
  } else {
    const months = Math.floor(differenceInSeconds / month);
    return months + "달 전";
  }
}

export const formatTime_mmss = (time: number): string => {
  const minutes = Math.floor(time / 60);
  const seconds = time % 60;
  return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
};


/**
 * 현재 날짜를 YYYYMMDD 형식 문자열로 반환
 */
export function getTodayYMD(): string {
  const now = new Date();

  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");

  return `${year}${month}${day}`;
}

/**
 * Date를 YYYYMMDD 문자열로 변환
 */
function formatDateYMD(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}${month}${day}`;
}

/**
 * 오늘 기준 n일 전/주 전/달 전 반환
 * @param n number (음수도 허용 가능)
 * @param unit "day" | "week" | "month"
 */
export function getPastDateYMD(n: number, unit: "day" | "week" | "month"): string {
  const date = new Date();

  switch (unit) {
    case "day":
      date.setDate(date.getDate() - n);
      break;
    case "week":
      date.setDate(date.getDate() - n * 7);
      break;
    case "month":
      date.setMonth(date.getMonth() - n);
      break;
  }

  return formatDateYMD(date);
}