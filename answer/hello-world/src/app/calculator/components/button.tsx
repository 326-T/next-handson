"use client";

export default function CircleButton({
  value,
  onClick,
}: {
  value: number | string;
  onClick: () => void;
}) {
  return (
    <button
      className="
        w-16 h-16
        bg-gray-200
        hover:bg-gray-300
        rounded-full
        focus:bg-orange-500
        focus:text-white
      "
      onClick={onClick}
    >
      {value}
    </button>
  );
}
