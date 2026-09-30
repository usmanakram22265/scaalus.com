import Link from "next/link";
import type {
  AnchorHTMLAttributes,
  ButtonHTMLAttributes,
  ReactNode,
} from "react";
import { Icon } from "./icons";

type Variant = "primary" | "secondary";
type Size = "md" | "lg";

type StyleProps = {
  variant?: Variant;
  size?: Size;
  arrow?: boolean;
  className?: string;
  children: ReactNode;
};

// Hover is an overlay whose opacity fades, so only opacity and transform ever animate.
const base =
  "btn group relative isolate inline-flex items-center justify-center gap-2 overflow-hidden whitespace-nowrap rounded-full font-semibold " +
  "transition-transform duration-150 ease-out active:scale-[0.97] " +
  "before:absolute before:inset-0 before:-z-10 before:opacity-0 before:transition-opacity before:duration-200 before:ease-out before:content-[''] " +
  "hover:before:opacity-100 disabled:pointer-events-none disabled:opacity-70";

const variants: Record<Variant, string> = {
  primary: "bg-brand text-white shadow-primary before:bg-royal",
  secondary:
    "border border-navy/[0.12] bg-surface-elevated text-navy before:bg-surface-card",
};

const sizes: Record<Size, string> = {
  md: "h-12 px-5 text-[0.9375rem]",
  lg: "h-[3.25rem] px-7 text-base",
};

function classes({
  variant = "primary",
  size = "md",
  className,
}: Omit<StyleProps, "children">) {
  return [base, variants[variant], sizes[size], className]
    .filter(Boolean)
    .join(" ");
}

function Content({ arrow, children }: Pick<StyleProps, "arrow" | "children">) {
  return (
    <>
      {children}
      {arrow ? (
        <Icon
          name="arrowRight"
          size={18}
          strokeWidth={2}
          className="-mr-1 transition-transform duration-200 ease-out group-hover:translate-x-0.5"
        />
      ) : null}
    </>
  );
}

type ButtonLinkProps = StyleProps &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "className" | "children"> & {
    href: string;
  };

export function ButtonLink({
  variant,
  size,
  arrow,
  className,
  children,
  href,
  ...rest
}: ButtonLinkProps) {
  return (
    <Link
      href={href}
      className={classes({ variant, size, className })}
      {...rest}
    >
      <Content arrow={arrow}>{children}</Content>
    </Link>
  );
}

type ButtonProps = StyleProps &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, "className" | "children">;

export function Button({
  variant,
  size,
  arrow,
  className,
  children,
  type = "button",
  ...rest
}: ButtonProps) {
  return (
    <button
      type={type}
      className={classes({ variant, size, className })}
      {...rest}
    >
      <Content arrow={arrow}>{children}</Content>
    </button>
  );
}
