import { useForm } from "@tanstack/react-form";
import { useMutation } from "@tanstack/react-query";
import { createFileRoute, Link, useRouter } from "@tanstack/react-router";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import authClient from "@/lib/auth/auth-client";

export const Route = createFileRoute("/(auth)/register")({
  component: Register,
});

function Register() {
  const router = useRouter();

  const form = useForm({
    defaultValues: {
      email: "",
      password: "",
      name: "",
    },
    onSubmit: async ({ value }) => {
      console.log({ value });
      const { data, error } = await authClient.signUp.email({
        email: value.email,
        password: value.password,
        name: value.name,
      });
      console.log({ data, error });
      if (error) {
        toast.error(error.message);
      } else {
        router.navigate({ to: "/login" });
      }
    },
  });

  const { mutateAsync, isPending } = useMutation({
    mutationFn: () =>
      authClient.signIn.social({
        provider: "google",
        callbackURL: "/dashboard",
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
                <h1 className="text-2xl font-bold">Create an account</h1>
                <p className="text-muted-foreground text-balance">
                  Create an account to get started
                </p>
              </div>
              <form.Field
                name="name"
                validators={{
                  onChange: ({ value }) => (!value ? "Name is required" : undefined),
                }}
              >
                {(field) => (
                  <div className="grid gap-3">
                    <Label htmlFor={field.name}>Name</Label>
                    <Input
                      id={field.name}
                      name={field.name}
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                      type="text"
                      placeholder="John Doe"
                    />
                    {field.state.meta.isTouched && field.state.meta.errors ? (
                      <em className="text-sm text-red-500">{field.state.meta.errors.join(", ")}</em>
                    ) : null}
                  </div>
                )}
              </form.Field>
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
                    <Button type="submit" disabled={!canSubmit}>
                      {isSubmitting ? "Registering..." : "Register"}
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
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                  <title>Google logo</title>
                  <path
                    d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"
                    fill="currentColor"
                  />
                </svg>
                <span className="sr-only">Login with Google</span>
              </Button>
              <div className="text-center text-sm">
                Already have an account?
                <Link to="/login" className="pl-2 underline underline-offset-4">
                  Login
                </Link>
              </div>
            </div>
          </form>
          <div className="bg-muted relative hidden md:block">
            <img
              src="/placeholder.svg"
              alt="placeholder"
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
