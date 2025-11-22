import { Button } from "@/components/ui/button";
import Header from "./_components/Header";
import Hero from "./_components/Hero";

// Home page component

export default function Home() {
  return (
    <div className="flex flex-col items-center">
      <Header />
      <Hero />
    </div>
  );
}
