"use client";

import React from "react";

type InputProps = React.InputHTMLAttributes<HTMLInputElement>;

export default function Input({
  type = "text",
  ...props
}: InputProps) {
  return (
    <input
      type={type}
      {...props}
      className="
        w-full 
        p-3 
        rounded-md 
        bg-[#0f1115] 
        border border-white/10 
        text-white 
        placeholder-gray-500
        outline-none 
        transition-all

        focus:border-[#C7962D]
        focus:ring-1 
        focus:ring-[#C7962D]/40
      "
    />
  );
}