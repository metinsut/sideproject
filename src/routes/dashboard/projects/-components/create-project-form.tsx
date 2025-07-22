import { useForm } from "@tanstack/react-form";
import { useRouter } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { createProject } from "@/lib/functions/projects/create-project";

export function CreateProjectForm() {
  const router = useRouter();
  const form = useForm({
    defaultValues: {
      name: "",
      description: "",
    },
    onSubmit: async ({ value }) => {
      const project = await createProject({ data: value });
      if (project) {
        router.invalidate();
        router.navigate({ to: `/dashboard/project/${project.id}` });
      }
    },
    validators: {
      onChange: ({ value }) => {
        if (!value.name) {
          return "Name is required";
        }
        return null;
      },
    },
  });

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        e.stopPropagation();
        form.handleSubmit();
      }}
      className="space-y-4 p-4"
    >
      <form.Field name="name">
        {(field) => (
          <div>
            <Label htmlFor={field.name}>Project Name</Label>
            <Input
              id={field.name}
              name={field.name}
              value={field.state.value}
              onBlur={field.handleBlur}
              onChange={(e) => field.handleChange(e.target.value)}
            />
            {field.state.meta.errors ? (
              <em className="text-red-500 text-sm">{field.state.meta.errors.join(", ")}</em>
            ) : null}
          </div>
        )}
      </form.Field>
      <form.Field name="description">
        {(field) => (
          <div>
            <Label htmlFor={field.name}>Description</Label>
            <Input
              id={field.name}
              name={field.name}
              value={field.state.value}
              onBlur={field.handleBlur}
              onChange={(e) => field.handleChange(e.target.value)}
            />
          </div>
        )}
      </form.Field>
      <form.Subscribe selector={(state) => [state.canSubmit, state.isSubmitting]}>
        {([canSubmit, isSubmitting]) => (
          <Button type="submit" className="w-full" disabled={!canSubmit}>
            {isSubmitting ? "Creating project..." : "Create Project"}
          </Button>
        )}
      </form.Subscribe>
    </form>
  );
}
