"use client";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function Localization() {
  const handleChangeLanguage = (language: string) => {
    console.log(language);
  };

  return (
    <Select value="en" onValueChange={handleChangeLanguage}>
      <SelectTrigger className="w-full">
        <SelectValue placeholder="Language" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="en">English</SelectItem>
        <SelectItem value="tr">Turkish</SelectItem>
      </SelectContent>
    </Select>
  );
}
