import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Input } from "@/components/ui/input";

export function Toolbar() {
  return (
    <div className="flex justify-end">
      <Drawer>
        <DrawerTrigger>Create Project</DrawerTrigger>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>Create Project</DrawerTitle>
            <DrawerDescription>Create a new project.</DrawerDescription>
          </DrawerHeader>
          <div className="flex flex-col gap-4">
            <Input placeholder="Project Name" />
            <Input placeholder="Project Description" />
          </div>
          <DrawerFooter>
            <Button>Submit</Button>
            <DrawerClose>
              <Button variant="outline">Cancel</Button>
            </DrawerClose>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </div>
  );
}
