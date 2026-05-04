import { LucideIcon } from "lucide-react";
import Link from "next/link";

type ServiceCardProps = {
  title: string;
  description: string;
  icon: LucideIcon;
  href: string;
};

export default function ServiceCard({
  title,
  description,
  icon: Icon,
  href,
}: ServiceCardProps) {
  return (
    <Link href={href} className="h-full">
      <div className="group h-full flex flex-col cursor-pointer rounded-xl border border-white/10 bg-white/5 p-7 transition hover:border-[#C7962D] hover:bg-white/10 hover:-translate-y-1 hover:shadow-[0_0_20px_rgba(199,150,45,0.15)]">

      
        <div className="mb-4">
          <Icon className="w-6 h-6 text-[#C7962D]" />
        </div>

      
        <h3 className="text-lg font-semibold mb-3 transition group-hover:text-white">
          {title}
        </h3>

        
        <p className="text-sm text-gray-400 leading-relaxed">
          {description}
        </p>

      </div>
    </Link>
  );
}