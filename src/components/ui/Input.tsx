"use client";

type InputProps = {
  type?: string;
  placeholder?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export default function Input({
  type = "text",
  placeholder,
  value,
  onChange,
}: InputProps) {
  return (
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
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