import { useForm } from "@tanstack/react-form";
import { useMutation } from "@tanstack/react-query";
import { createFileRoute, Link, useRouter } from "@tanstack/react-router";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import authClient from "@/lib/auth/auth-client";

export const Route = createFileRoute("/(auth)/login")({
  component: Login,
});

function Login() {
  const router = useRouter();

  const form = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    onSubmit: async ({ value }) => {
      const { error } = await authClient.signIn.email({
        email: value.email,
        password: value.password,
      });
      if (error) {
        toast.error(error.message);
      } else {
        router.navigate({ to: "/app" });
      }
    },
  });

  const { mutateAsync, isPending } = useMutation({
    mutationFn: () =>
      authClient.signIn.social({
        provider: "google",
        callbackURL: "/app",
      }),
    onError: (err: Error) => {
      toast.error(err.message);
    },
  });

  return (
    <div className="flex flex-col gap-6">
      <Card className="overflow-hidden p-0">
        <CardContent className="grid p-0 md:grid-cols-2">
          <form
            className="p-6 md:p-8"
            onSubmit={(e) => {
              e.preventDefault();
              e.stopPropagation();
              form.handleSubmit();
            }}
          >
            <div className="flex flex-col gap-6">
              <div className="flex flex-col items-center text-center">
                <h1 className="text-2xl font-bold">Welcome back</h1>
                <p className="text-muted-foreground text-balance">Login to your Acme Inc account</p>
              </div>
              <form.Field
                name="email"
                validators={{
                  onChange: ({ value }) => {
                    if (!value) return "Email is required";
                    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return "Invalid email format";
                    return undefined;
                  },
                }}
              >
                {(field) => (
                  <div className="grid gap-3">
                    <Label htmlFor={field.name}>Email</Label>
                    <Input
                      id={field.name}
                      name={field.name}
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                      type="email"
                      placeholder="m@example.com"
                    />
                    {field.state.meta.isTouched && field.state.meta.errors ? (
                      <em className="text-sm text-red-500">{field.state.meta.errors.join(", ")}</em>
                    ) : null}
                  </div>
                )}
              </form.Field>
              <form.Field
                name="password"
                validators={{
                  onChange: ({ value }) => (!value ? "Password is required" : undefined),
                }}
              >
                {(field) => (
                  <div className="grid gap-3">
                    <div className="flex items-center">
                      <Label htmlFor={field.name}>Password</Label>
                      <Link
                        to="/forgot-password"
                        className="ml-auto text-sm underline-offset-2 hover:underline"
                      >
                        Forgot your password?
                      </Link>
                    </div>
                    <Input
                      id={field.name}
                      name={field.name}
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                      type="password"
                    />
                    {field.state.meta.isTouched && field.state.meta.errors ? (
                      <em className="text-sm text-red-500">{field.state.meta.errors.join(", ")}</em>
                    ) : null}
                  </div>
                )}
              </form.Field>
              <div className="grid grid-cols-2 gap-2">
                <Link to="/">
                  <Button type="button" variant="outline">
                    Back to Home
                  </Button>
                </Link>
                <form.Subscribe selector={(state) => [state.canSubmit, state.isSubmitting]}>
                  {([canSubmit, isSubmitting]) => (
                    <Button type="submit" className="w-full" disabled={!canSubmit}>
                      {isSubmitting ? "Logging in..." : "Login"}
                    </Button>
                  )}
                </form.Subscribe>
              </div>
              <div className="after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t">
                <span className="bg-card text-muted-foreground relative z-10 px-2">
                  Or continue with
                </span>
              </div>
              <Button
                variant="outline"
                type="button"
                className="w-full"
                onClick={() => mutateAsync()}
                disabled={isPending}
              >
                {isPending ? <Loader2 className="animate-spin" /> : <div>Login with Google</div>}
                <span className="sr-only">Login with Google</span>
              </Button>
              <div className="text-center text-sm">
                Don't have an account?
                <Link to="/register" className="pl-2 underline underline-offset-4">
                  Sign up
                </Link>
              </div>
            </div>
          </form>
          <div className="bg-muted relative hidden md:block">
            <img
              src="/logo-name.png"
              alt="logo"
              className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
            />
          </div>
        </CardContent>
      </Card>
      <div className="text-muted-foreground *:[a]:hover:text-primary text-center text-xs text-balance *:[a]:underline *:[a]:underline-offset-4">
        By clicking continue, you agree to our <Link to="/terms">Terms of Service</Link> and{" "}
        <Link to="/privacy">Privacy Policy</Link>.
      </div>
    </div>
  );
}
