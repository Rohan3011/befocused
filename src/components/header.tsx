import { Icons } from "./icons";
import { SiteSettings } from "./settings";
import SignIn from "./sign-in";

interface SiteHeaderProps {
  heading: string;
  text?: string;
  children?: React.ReactNode;
}

export function SiteHeader({ heading, text, children }: SiteHeaderProps) {
  return (
    <header className="container flex flex-col items-center justify-between gap-4 md:h-20 sm:flex-row">
      <div className="grid gap-1">
        <h1 className="flex items-center font-heading font-bold text-2xl">
          <Icons.target className="w-5 h-5 mr-2" />
          {heading}
        </h1>
        {text && <p className="text-lg text-muted-foreground">{text}</p>}
      </div>
      <div className="flex items-center gap-2">
        <SignIn />
        <SiteSettings />
      </div>
    </header>
  );
}
