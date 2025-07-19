import { Toaster as Sonner, type ToasterProps, toast } from "sonner";

const Toaster = ({ ...props }: ToasterProps) => {
  return (
    <Sonner
      richColors
      className="toaster group"
      style={
        {
          "--normal-bg": "var(--popover)",
          "--normal-text": "var(--popover-foreground)",
          "--normal-border": "var(--border)",
        } as React.CSSProperties
      }
      {...props}
    />
  );
};

export { Toaster, toast };
