import { Link } from "@tanstack/react-router";
import { Menu, Mountain } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useIsMobile } from "@/hooks/use-mobile";

export function LandingHeader() {
  const isMobile = useIsMobile();

  if (isMobile) {
    return (
      <header className="flex h-16 w-full items-center justify-between bg-background px-4 md:px-6">
        <Link to="/" className="flex items-center gap-2">
          <img src="/logo.png" alt="Project Flow" className="size-10" />
          <span className="font-semibold">ProjectFlow</span>
        </Link>
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon">
              <Menu className="size-6" />
            </Button>
          </SheetTrigger>
          <SheetContent side="right">
            <div className="grid gap-4 p-4">
              <Link to="/" className="flex items-center gap-2">
                <img src="/logo.png" alt="Project Flow" className="size-10" />
                <span className="font-semibold">ProjectFlow</span>
              </Link>
              <div className="grid gap-2">
                <Button variant="ghost" asChild>
                  <Link to="/login">Login</Link>
                </Button>
                <Button asChild>
                  <Link to="/register">Register</Link>
                </Button>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </header>
    );
  }

  return (
    <header className="flex h-16 w-full items-center justify-between bg-background px-4 md:px-6">
      <Link to="/" className="flex items-center gap-2">
        <img src="/logo.png" alt="Project Flow" className="size-10" />
        <span className="font-semibold">ProjectFlow</span>
      </Link>
      <div className="flex items-center gap-4">
        <Button variant="ghost" asChild>
          <Link to="/login">Login</Link>
        </Button>
        <Button asChild>
          <Link to="/register">Get Started</Link>
        </Button>
      </div>
    </header>
  );
}
