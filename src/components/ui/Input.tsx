"use client";

import React from "react";

type InputProps = React.InputHTMLAttributes<HTMLInputElement>;

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, ...props }, ref) => {
    return (
      <input
        ref={ref}
        {...props}
        className={
          "w-full p-3 rounded-md bg-[#0f1115] border border-white/10 text-white placeholder-gray-500 outline-none transition-all focus:border-[#C7962D] focus:ring-1 focus:ring-[#C7962D]/40 " +
          (className ?? "")
        }
      />
    );
  }
);

Input.displayName = "Input";

export default Input;