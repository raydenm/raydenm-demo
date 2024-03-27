import reactLogo from "@/assets/react.svg";
import { Icons } from "@/components/icons";
import { ThemeProvider } from "./components/theme-provider";
import { ThemeToggle } from "./components/theme-toggle";

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <main className="flex h-screen w-full flex-col items-center justify-center space-y-6">
        <div>
          <a href="https://react.dev" target="_blank" rel="noreferrer">
            <img src={reactLogo} className="h-20 w-20 animate-bounce" alt="React logo" />
          </a>
        </div>
        <h1 className="text-3xl font-bold">React Enterprise Template</h1>
        <ThemeToggle />
      </main>
    </ThemeProvider>
  );
}

export default App;
