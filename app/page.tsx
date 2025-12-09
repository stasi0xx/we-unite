export default function Home() {
  return (
      <main className="min-h-screen flex flex-col items-center justify-center p-8 gap-8">

        {/* Sekcja Hero */}
        <div className="text-center space-y-4 max-w-2xl">
          <div className="font-mono text-xs text-accent uppercase tracking-widest mb-2 border border-border px-3 py-1 rounded-full w-fit mx-auto bg-card">
            Next.js 16 + Tailwind 4
          </div>

          <h1 className="text-5xl md:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-zinc-500">
            Automatyzacja <br />
            <span className="text-primary">Dla Twojej Firmy</span>
          </h1>

          <p className="text-xl text-zinc-400 font-sans">
            Budujemy systemy, które pracują, gdy Ty śpisz.
          </p>
        </div>

        {/* Przykładowe UI Elements */}
        <div className="flex gap-4">
          <button className="bg-primary text-primary-foreground px-8 py-3 rounded-lg font-medium hover:opacity-90 transition shadow-[0_0_20px_-5px_var(--primary)]">
            Rozpocznij Projekt
          </button>

          <button className="border border-border bg-card text-foreground px-8 py-3 rounded-lg font-medium hover:bg-zinc-800 transition">
            Zobacz Demo
          </button>
        </div>

        {/* Bento Grid Preview (Test kolorów kart) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-2xl mt-8">
          <div className="bg-card border border-border p-6 rounded-2xl">
            <h3 className="text-lg font-bold mb-2">Supabase Database</h3>
            <p className="text-zinc-500 text-sm">Bezpieczne dane klientów.</p>
          </div>
          <div className="bg-card border border-border p-6 rounded-2xl flex items-center justify-center">
            <code className="text-accent font-mono text-sm">Make.com Webhook Active</code>
          </div>
        </div>

      </main>
  );
}