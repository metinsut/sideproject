import { useMutation, useQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import type { CreateProjectSchema } from "@/lib/functions/projects/create-project";
import { createProject } from "@/lib/functions/projects/create-project";
import { getProjects } from "@/lib/functions/projects/get-projects";

export function useCreateProject() {
  return useMutation({
    mutationFn: (data: CreateProjectSchema) => createProject({ data }),

    onSuccess: () => {
      toast.success("Proje başarıyla oluşturuldu!");
    },

    onError: (err: Error) => {
      let parsedError: unknown;

      try {
        parsedError = JSON.parse(err.message);
      } catch (e) {
        toast.error(err.message || "Beklenmedik bir sunucu hatası oluştu.");
        console.error("Parsing Error:", e);
        return;
      }

      if (
        Array.isArray(parsedError) &&
        parsedError.length > 0 &&
        typeof parsedError[0] === "object" &&
        parsedError[0] !== null &&
        "path" in parsedError[0] &&
        "message" in parsedError[0]
      ) {
        const firstIssue = parsedError[0];
        const fieldName = firstIssue.path.join(".");
        const errorMessage = `Doğrulama hatası: ${
          fieldName ? `${fieldName} - ` : ""
        }${firstIssue.message}`;
        toast.error(errorMessage);
      } else if (
        typeof parsedError === "object" &&
        parsedError !== null &&
        "message" in parsedError &&
        typeof parsedError.message === "string"
      ) {
        toast.error((parsedError as { message: string }).message);
      } else {
        toast.error("Bilinmeyen bir hata oluştu.");
      }
      console.error("API Error:", parsedError);
    },
  });
}

export function useGetProjects() {
  return useQuery({
    queryKey: ["projects"],
    queryFn: () => getProjects(),
  });
}
