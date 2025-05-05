"use client";

import { useTheme } from "next-themes";
import { Toaster as Sonner } from "sonner";

type ToasterProps = React.ComponentProps<typeof Sonner>;

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = "system" } = useTheme();

  return (
    <Sonner
      theme={theme as ToasterProps["theme"]}
      className="toaster group"
      toastOptions={{
        classNames: {
          toast:
            "group toast group-[.toaster]:bg-white group-[.toaster]:text-[#010D3E] group-[.toaster]:border-slate-200 group-[.toaster]:shadow-lg dark:group-[.toaster]:bg-slate-950 dark:group-[.toaster]:text-[#010D3E] dark:group-[.toaster]:border-slate-800",
          description:
            "group-[.toast]:text-[#010D3E] dark:group-[.toast]:text-[#010D3E]",
          actionButton:
            "group-[.toast]:bg-slate-900 group-[.toast]:text-[#010D3E] dark:group-[.toast]:bg-slate-50 dark:group-[.toast]:text-[#010D3E]",
          cancelButton:
            "group-[.toast]:bg-slate-100 group-[.toast]:text-[#010D3E] dark:group-[.toast]:bg-slate-800 dark:group-[.toast]:text-[#010D3E]",
        },
      }}
      {...props}
    />
  );
};

export { Toaster };
