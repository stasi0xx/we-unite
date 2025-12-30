// --- BETONOWA ŚCIANA BEZPIECZEŃSTWA ---
import 'server-only';
// Ta linijka sprawia, że jeśli spróbujesz użyć tego pliku na froncie, aplikacja się nie zbuduje.
// Gwarantuje to, że kod z Service Role Key nigdy nie wycieknie do przeglądarki.

import { z } from 'zod';
import { tool, type ToolSet, type InferUITools } from 'ai';
import { createClient } from '@supabase/supabase-js';

// --- KONFIGURACJA ADMIN CLIENT (Private Server Environment) ---
const adminKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

// Ponieważ mamy "server-only", ten kod wykona się TYLKO na serwerze Node.js.
// Zmienne bez "NEXT_PUBLIC_" są tu widoczne, ale w przeglądarce byłyby ukryte.
if (!adminKey) {
    console.warn("⚠️ OSTRZEŻENIE: Brak SUPABASE_SERVICE_ROLE_KEY. Narzędzie saveLead nie zadziała.");
}

const supabaseAdmin = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    adminKey || ''
);

// --- DEFINICJA NARZĘDZI ---
export const tools = {
    saveLead: tool({
        description: 'Zapisuje e-mail klienta do bazy danych (CRM), gdy zdecyduje się na ofertę.',
        inputSchema: z.object({
            email: z.string().email().describe('Adres email podany przez klienta'),
            name: z.string().optional().describe('Imię i nazwisko klienta (jeśli podał)'),
        }),
        execute: async ({ email, name }) => {
            console.log(`[AI TOOL] Próba zapisu do tabeli 'leads': ${email}`);

            // Podwójne sprawdzenie na poziomie wykonania
            if (!adminKey) {
                console.error("❌ Błąd: Brak klucza Service Role (Admin).");
                return { status: 'error', message: 'Błąd konfiguracji serwera.' };
            }

            let firstName = name || null;
            let lastName = null;

            if (name && name.includes(' ')) {
                const parts = name.split(' ');
                firstName = parts[0];
                lastName = parts.slice(1).join(' ');
            }

            try {
                // Używamy supabaseAdmin - to klient z uprawnieniami Service Role
                // Ignoruje on RLS (Row Level Security)
                const { data, error } = await supabaseAdmin
                    .from('leads')
                    .insert([
                        {
                            email: email,
                            first_name: firstName,
                            last_name: lastName,
                            source: 'ai_chat_promo_5pln',
                            message: 'Lead z Asystenta AI (Autoresponder Promo)'
                        }
                    ])
                    .select()
                    .single();

                if (error) {
                    console.error('❌ Supabase Admin Insert Error:', JSON.stringify(error, null, 2));
                    throw new Error(`DB Error: ${error.message}`);
                }

                console.log('✅ Zapisano lead:', data);
                return {
                    status: 'success',
                    message: `Lead zapisany poprawnie. ID: ${data.id}`
                };
            } catch (err: any) {
                console.error('❌ Critical Error w execute:', err);
                return { status: 'error', message: 'Wystąpił problem techniczny z bazą danych.' };
            }
        },
    }),
} satisfies ToolSet;

export type ChatTools = InferUITools<typeof tools>;