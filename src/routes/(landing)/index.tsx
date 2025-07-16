import { createFileRoute, Link } from "@tanstack/react-router";
import { BarChart, Briefcase, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { LandingFooter } from "./-footer";
import { LandingHeader } from "./-header";

export const Route = createFileRoute("/(landing)/")({
  component: LandingPage,
});

export default function LandingPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <LandingHeader />
      <main className="flex-1">
        <section className="grid justify-center w-full py-12 md:py-24 lg:py-32 xl:py-48">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                  Streamline Your Workflow
                </h1>
                <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                  The ultimate project management tool to help you and your team stay organized,
                  focused, and productive.
                </p>
              </div>
              <div className="space-x-4">
                <Button asChild>
                  <Link to="/register">Get Started</Link>
                </Button>
                <Button variant="secondary" asChild>
                  <Link to="/login">Login</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        <section
          id="features"
          className="grid justify-center w-full py-12 md:py-24 lg:py-32 bg-muted"
        >
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-muted-foreground/10 px-3 py-1 text-sm">
                  Key Features
                </div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                  Everything You Need to Succeed
                </h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Our project management tool is packed with features to help you manage your
                  projects from start to finish.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-3 lg:gap-12">
              <div className="grid gap-1">
                <div className="flex items-center gap-2">
                  <Briefcase className="h-6 w-6 text-primary" />
                  <h3 className="text-xl font-bold">Project Planning</h3>
                </div>
                <p className="text-muted-foreground">
                  Easily create, assign, and track tasks to keep your projects on schedule.
                </p>
              </div>
              <div className="grid gap-1">
                <div className="flex items-center gap-2">
                  <Users className="h-6 w-6 text-primary" />
                  <h3 className="text-xl font-bold">Team Collaboration</h3>
                </div>
                <p className="text-muted-foreground">
                  Communicate with your team, share files, and get feedback all in one place.
                </p>
              </div>
              <div className="grid gap-1">
                <div className="flex items-center gap-2">
                  <BarChart className="h-6 w-6 text-primary" />
                  <h3 className="text-xl font-bold">Progress Tracking</h3>
                </div>
                <p className="text-muted-foreground">
                  Visualize your progress with our interactive charts and reports.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="grid justify-center w-full py-12 md:py-24 lg:py-32">
          <div className="container grid items-center justify-center gap-4 px-4 text-center md:px-6">
            <div className="space-y-3">
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
                Ready to Boost Your Productivity?
              </h2>
              <p className="mx-auto max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Sign up today and take the first step towards more efficient project management.
              </p>
            </div>
            <div className="mx-auto w-full max-w-sm space-y-2">
              <Button asChild className="w-full">
                <Link to="/register">Create an Account</Link>
              </Button>
              <p className="text-xs text-muted-foreground">
                Get started for free. No credit card required.
              </p>
            </div>
          </div>
        </section>
      </main>
      <LandingFooter />
    </div>
  );
}
