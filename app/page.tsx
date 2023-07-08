import HelloWorld from "~/components/hello-world";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <HelloWorld />
    </main>
  );
}
