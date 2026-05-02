import SqueezeLoader from "@/components/ui/loading-indicator";

export default function Loading() {
  return (
    <main className="min-h-screen bg-background">
      <SqueezeLoader size={72} color1="#e8e4db" color2="#c42e2e" />
    </main>
  );
}
