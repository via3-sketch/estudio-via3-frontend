"use client";

type ButtonProps = {
  children: React.ReactNode;
  onClick?: () => void;
  type?: "button" | "submit";
};

export default function Button({
  children,
  onClick,
  type = "button",
}: ButtonProps) {
  return (
    <button
      type={type}
      onClick={onClick}
      className="
        w-full
        py-3
        rounded-md
        font-semibold
        text-black

        bg-linear-to-r from-[#C7962D] to-[#E0B84F]

        transition-all duration-200

        hover:opacity-90
        hover:shadow-lg hover:shadow-[#C7962D]/20

        active:scale-[0.98]
      "
    >
      {children}
    </button>
  );
}