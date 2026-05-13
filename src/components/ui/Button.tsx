"use client";
import type { ButtonHTMLAttributes, ReactNode } from "react";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode;
};

export default function Button({
  className = "",
  children,
  onClick,
  type = "button",
  ...props
}: ButtonProps) {
  return (
    <button
      type={type}
      onClick={onClick}
      {...props}
      className={`
        inline-flex
        items-center
        justify-center

        px-6
        py-3

        rounded-xl

        font-medium
        text-black

        cursor-pointer

        bg-linear-to-r from-[#C7962D] to-[#E0B84F]

        transition-all duration-200

        hover:brightness-110
        hover:shadow-lg hover:shadow-[#C7962D]/20

        active:scale-[0.98]

        ${className}
      `}
    >
      {children}
    </button>
  );
}