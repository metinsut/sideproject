import { ClientOnly } from "@tanstack/react-router";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { LocaleType } from "@/lib/functions/locale/types";
import * as m from "@/paraglide/messages";
import { getLocale, setLocale } from "@/paraglide/runtime";

export function Localization() {
  const currentLocale = getLocale();

  const handleChangeLanguage = (language: LocaleType) => {
    setLocale(language);
  };

  return (
    <ClientOnly fallback={<div>Loading...</div>}>
      <Select value={currentLocale} onValueChange={handleChangeLanguage}>
        <SelectTrigger className="w-full">
          <SelectValue placeholder={m.language()} />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="en">{m.english()}</SelectItem>
          <SelectItem value="tr">{m.turkish()}</SelectItem>
        </SelectContent>
      </Select>
    </ClientOnly>
  );
}
