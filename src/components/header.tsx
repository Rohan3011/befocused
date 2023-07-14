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
        <h1 className="font-heading text-3xl md:text-4xl">{heading}</h1>
        {text && <p className="text-lg text-muted-foreground">{text}</p>}
      </div>
      <SignIn />
    </header>
  );
}
