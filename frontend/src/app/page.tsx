import Container from "@/components/layout/Container";

export default function Home() {
  return (
    <main>
      <Container>
        <div className="rounded-xl border p-8">
          <h1 className="text-4xl font-bold">
            QA Solucity
          </h1>

          <p className="mt-4">
            Our design system is working 🚀
          </p>
        </div>
      </Container>
    </main>
  );
}