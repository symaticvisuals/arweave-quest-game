// app/components/ThemeSwitcher.tsx
"use client";

import { Button, Switch } from "@nextui-org/react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { MoonIcon, SunIcon } from "./icons";

export function ThemeSwitcher() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div>
      <Switch
        size="lg"
        color="success"
        onChange={() => {
          if (theme === "light") {
            setTheme("dark");
          } else {
            setTheme("light");
          }
        }}
        startContent={<SunIcon />}
        endContent={<MoonIcon />}
      >
       
      </Switch>
      
    </div>
  );
}
