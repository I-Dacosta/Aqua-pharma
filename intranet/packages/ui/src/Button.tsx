import type { PropsWithChildren } from "react";

type ButtonProps = PropsWithChildren<{
  variant?: "primary" | "secondary";
}>;

export function Button({ children, variant = "primary" }: ButtonProps) {
  const className =
    variant === "primary"
      ? "rounded-full bg-slate-900 px-4 py-2 text-sm font-medium text-white"
      : "rounded-full border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700";

  return <button className={className}>{children}</button>;
}
