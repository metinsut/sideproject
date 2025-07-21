import { Link } from "@tanstack/react-router";

type Props = {
  to: string;
  children: React.ReactNode;
};

export function LinkItem(props: Props) {
  const { to, children } = props;
  return (
    <Link
      to={to}
      activeProps={{ className: "font-bold" }}
      activeOptions={{ exact: true }}
      className="p-2"
    >
      {children}
    </Link>
  );
}
