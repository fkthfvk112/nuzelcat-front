export const Badge = ({ text, colorCode }: { text: string; colorCode: string }) => {
  return (
    <span
      style={{ backgroundColor: colorCode }}
      className="flex justify-center items-center w-fit px-3 me-2 mt-1 text-white rounded-md font-bold whitespace-nowrap"
    >
      {text}
    </span>
  );
};
