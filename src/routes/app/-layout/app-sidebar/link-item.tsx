import type { LinkProps } from "@tanstack/react-router";
import { Link } from "@tanstack/react-router";

export function LinkItem(props: LinkProps) {
  const { children, ...rest } = props;
  return (
    <Link
      activeProps={{ className: "font-bold" }}
      activeOptions={{ exact: true }}
      className="p-2"
      {...rest}
    >
      {children}
    </Link>
  );
}
