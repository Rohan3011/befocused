import HelloWorld from "~/components/hello-world";

export default function Home() {
  return (
    <main className="flex min-h-screen mx-auto max-w-2xl flex-col items-center justify-between bg-blue-500 p-2 md:p-4 lg:p-10">
      <HelloWorld />
    </main>
  );
}
