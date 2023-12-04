import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { NavItem } from "@/types/nav";
import { siteConfig } from "@/config/site";
import { cn } from "@nextui-org/react";




interface MainNavProps {
  items?: NavItem[];
  children?: React.ReactNode;
}

export function MainNav({ items, children }: MainNavProps) {
  const pathname = usePathname();




  return (
    <div className="flex gap-6 md:gap-10">
      <Link href="/" className="hidden md:flex items-center space-x-2">
      
        <span className="hidden sm:inline-block font-bold">
          {siteConfig.name}
        </span>
      </Link>
      {items?.length ? (
        <nav className="hidden md:flex gap-6">
          {items?.map(
            (item, index) =>
              item.href && (
                <Link
                  key={index}
                  href={item.href}
                  className={cn(
                    "flex items-center text-lg font-medium transition-colors hover:text-foreground/80 sm:text-sm",
                    pathname === item.href
                      ? "text-foreground"
                      : "text-foreground/60",
                    item.disabled && "cursor-not-allowed opacity-80"
                  )}
                >
                  {item.title}
                </Link>
              )
          )}
        </nav>
      ) : null}
      
    </div>
  );
}
