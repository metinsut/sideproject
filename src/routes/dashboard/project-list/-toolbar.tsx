import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { CreateProjectForm } from "./-components/create-project-form";

export function Toolbar() {
  return (
    <div className="flex justify-end">
      <Drawer>
        <DrawerTrigger>Create Project</DrawerTrigger>
        <DrawerContent>
          <DrawerHeader className="flex! justify-between">
            <DrawerTitle>Create Project</DrawerTitle>
            <DrawerDescription>Create a new project.</DrawerDescription>
          </DrawerHeader>
          <CreateProjectForm />
        </DrawerContent>
      </Drawer>
    </div>
  );
}
