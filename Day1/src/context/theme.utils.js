export function getInitialTheme() {
  const saved = localStorage.getItem("theme");
  if (saved === "light" || saved === "dark") return saved;

  const prefersDark =
    window.matchMedia?.("(prefers-color-scheme: dark)").matches ?? false;

  return prefersDark ? "dark" : "light";
}
