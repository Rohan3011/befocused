import Pomodoro from "~/components/pomodoro";
import SignIn from "~/components/sign-in";
import { SiteFooter } from "~/components/site-footer";

export default function Home() {
  return (
    <main className="h-full mx-auto max-w-2xl flex flex-col items-center justify-between p-2 md:p-4 lg:p-10">
      <section className="w-full">
        <Pomodoro />
      </section>
    </main>
  );
}
