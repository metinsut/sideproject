import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { Theme } from "@/lib/theme/theme-provider";
import { useTheme } from "@/lib/theme/theme-provider";

const themeConfig: Record<Theme, { icon: string; label: string }> = {
  light: { icon: "☀️", label: "Light" },
  dark: { icon: "🌙", label: "Dark" },
  system: { icon: "💻", label: "System" },
};

export const ThemeToggle = () => {
  const { theme, setTheme } = useTheme();

  const handleThemeChange = (theme: Theme) => {
    setTheme(theme);
  };

  return (
    <Select value={theme} onValueChange={handleThemeChange}>
      <SelectTrigger className="w-full">
        <SelectValue placeholder={theme} />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="light">
          <p>{themeConfig.light.label}</p>
          <p>{themeConfig.light.icon}</p>
        </SelectItem>
        <SelectItem value="dark">
          <p>{themeConfig.dark.label}</p>
          <p>{themeConfig.dark.icon}</p>
        </SelectItem>
        <SelectItem value="system">
          <p>{themeConfig.system.label}</p>
          <p>{themeConfig.system.icon}</p>
        </SelectItem>
      </SelectContent>
    </Select>
  );
};
