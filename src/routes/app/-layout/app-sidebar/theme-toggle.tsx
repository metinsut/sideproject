import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { UserTheme } from "@/lib/theme/theme-provider";
import { useTheme } from "@/lib/theme/theme-provider";

const themeConfig: Record<UserTheme, { icon: string; label: string }> = {
  light: { icon: "☀️", label: "Light" },
  dark: { icon: "🌙", label: "Dark" },
  system: { icon: "💻", label: "System" },
};

export const ThemeToggle = () => {
  const { userTheme, setTheme } = useTheme();

  const getNextTheme = () => {
    const themes = Object.keys(themeConfig) as UserTheme[];
    const currentIndex = themes.indexOf(userTheme);
    const nextIndex = (currentIndex + 1) % themes.length;
    return themes[nextIndex];
  };

  const handleThemeChange = () => {
    const nextTheme = getNextTheme();
    if (nextTheme) {
      setTheme(nextTheme);
    }
  };

  return (
    <Select value={userTheme} onValueChange={handleThemeChange}>
      <SelectTrigger className="w-full">
        <SelectValue placeholder={userTheme} />
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
