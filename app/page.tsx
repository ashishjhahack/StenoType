import Navbar from "@/components/Navbar";

export default function Home() {
  return (
    <>
      <Navbar />

      <main>
        <h1 className="text-5xl font-bold tracking-tight text-white">
          Master Steno
          <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
            Faster
          </span>
        </h1>
      </main>
    </>
  );
}
