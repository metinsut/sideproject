import { useForm } from "@tanstack/react-form";
import { useRouter } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useCreateProject } from "@/lib/queries/projects";

export function CreateProjectForm() {
  const router = useRouter();
  const { mutateAsync: createProject } = useCreateProject();

  const form = useForm({
    defaultValues: {
      name: "",
      description: "",
    },
    onSubmit: async ({ value }) => {
      const project = await createProject(value);
      if (project) {
        router.invalidate();
        router.navigate({ to: `/app/project/${project.id}` });
      }
    },
  });

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        e.stopPropagation();
        form.handleSubmit();
      }}
      className="grid gap-2 p-4"
    >
      <form.Field
        name="name"
        validators={{
          onSubmit: ({ value }) => (value.length < 3 ? "At least 3 characters" : undefined),
        }}
      >
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
      <div className="flex justify-end">
        <form.Subscribe selector={(state) => [state.canSubmit, state.isSubmitting]}>
          {([canSubmit, isSubmitting]) => (
            <Button type="submit" className="mt-4" disabled={!canSubmit}>
              {isSubmitting ? "Creating project..." : "Create Project"}
            </Button>
          )}
        </form.Subscribe>
      </div>
    </form>
  );
}
