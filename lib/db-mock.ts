// lib/db-mock.ts
export async function saveLeadToDatabase(email: string) {
    // Symulacja opóźnienia bazy danych
    await new Promise((resolve) => setTimeout(resolve, 1000));

    console.log(`[DATABASE] Zapisano nowy lead: ${email}`);

    // Tutaj normalnie byłoby: await db.insert(leads).values({ email });
    return { success: true, id: Math.random().toString(36).substring(7) };
}