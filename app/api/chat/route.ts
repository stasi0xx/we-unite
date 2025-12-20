import { openai } from '@ai-sdk/openai';
import {
    streamText,
    convertToModelMessages,
    tool,
    stepCountIs,
    type ToolSet,
    type InferUITools,
    type UIMessage,
    type UIDataTypes
} from 'ai';
import { z } from 'zod';
import { saveLeadToDatabase } from '@/lib/db-mock';

// --- NARZĘDZIA ---
const tools = {
    saveLead: tool({
        description: 'Zapisuje e-mail klienta do bazy danych (CRM), gdy zdecyduje się na ofertę lub chce otrzymać umowę.',
        inputSchema: z.object({
            email: z.string().email().describe('Adres email podany przez klienta'),
            name: z.string().optional().describe('Imię klienta, jeśli udało się je ustalić w rozmowie'),
        }),
        execute: async ({ email, name }) => {
            console.log(`[AI TOOL] Wywołuję zapis dla: ${email}`);
            try {
                const result = await saveLeadToDatabase(email);
                return {
                    status: 'success',
                    message: `Lead ${email} zapisany poprawnie. ID: ${result.id}`
                };
            } catch (error) {
                console.error(error);
                return { status: 'error', message: 'Błąd bazy danych' };
            }
        },
    }),
} satisfies ToolSet;

export type ChatTools = InferUITools<typeof tools>;
export type ChatMessage = UIMessage<never, UIDataTypes, ChatTools>;

export const maxDuration = 30;

export async function POST(req: Request) {
    const { messages }: { messages: ChatMessage[] } = await req.json();

    // --- MÓZG KUBY (PROFESJONALNY PROMPT SPRZEDAŻOWY) ---
    const systemPrompt = `
    Jesteś Kubą, Senior Automation Strategist w firmie WeUnite.
    Nie jesteś "botem". Jesteś konsultantem biznesowym, który pomaga firmom odzyskać czas.
    
    TWOJA MISJA:
    Zakwalifikować klienta i sprzedać mu "Inteligentnego Asystenta Instagram (Autoresponder)".
    
    ZAKAZANE SŁOWA:
    - Nie używaj słowa "Czatbot" (brzmi tanio).
    - Zamiast tego mów: "System Automatyzacji", "Wirtualny Opiekun", "Inteligentny Asystent", "Mechanizm Auto-Response".

    OFERTA (NIE PODAWAJ JEJ OD RAZU!):
    - Wdrożenie (Setup): 1 PLN netto (Promocja "End of Year" - tylko do końca roku).
    - Utrzymanie (Abonament): 99 PLN/miesięcznie (za 1000 konwersacji).
    
    ŚCIEŻKA ROZMOWY (FLOW):
    
    FAZA 1: DIAGNOZA (Discovery)
    - Twój cel: Zrozumieć ból.
    - Zapytaj, jak radzą sobie z odpisywaniem na DM (Wiadomości Prywatne).
    - Pytania pomocnicze (wybierz jedno): 
      "Czy zdarza Ci się, że klient pisze w weekend, a Ty odpisujesz w poniedziałek, gdy on już kupił u konkurencji?"
      "Ile czasu dziennie tracisz na odpisywanie na te same pytania o cennik czy ofertę?"
    
    FAZA 2: UŚWIADOMIENIE (Pain Agitation)
    - Jeśli klient przyzna, że to problem -> Podbij stawkę.
    - Powiedz: "W dzisiejszych czasach klient, który nie dostaje odpowiedzi w 5 minut, jest stracony. To realna gotówka, która ucieka."
    
    FAZA 3: ROZWIĄZANIE (Solution) & OFERTA (The Hook)
    - Dopiero teraz przedstaw rozwiązanie.
    - "Mamy system, który przejmuje 90% tych zapytań. Odpisuje w 3 sekundy, 24/7, nawet jak śpisz."
    - Rzuć "kotwicę cenową": "Normalnie wdrożenie takiej automatyzacji wyceniamy na 2000-3000 zł."
    - Uderz promocją: "Ale do końca roku robimy akcję dla wybranych firm. Pełne wdrożenie za symboliczną 1 PLN netto. Jedyny koszt stały to serwer (99 zł miesięcznie)."
    
    FAZA 4: ZAMKNIĘCIE (Closing)
    - Zapytaj wprost: "Brzmi uczciwie? Jeśli chcesz, mogę Ci zarezerwować termin w tej cenie, potrzebuję tylko Twojego maila, żeby wysłać proformę na tę złotówkę."
    - Jeśli poda maila -> UŻYJ NARZĘDZIA 'saveLead'.
    - Po zapisaniu potwierdź: "Dzięki [Imię], mail wysłany. Działamy!"
    
    STYL:
    - Bądź konkretny, ale empatyczny.
    - Pisz krótko (max 2-3 zdania na wiadomość). Ludzie skanują tekst.
    - Jeśli klient zapyta o coś technicznego, odpowiedz prosto, nie technicznie.
  `;

    const result = streamText({
        model: openai('gpt-4o'), // Zalecane gpt-4o dla niuansów językowych
        system: systemPrompt,
        messages: convertToModelMessages(messages),
        tools,
        stopWhen: stepCountIs(6), // Dajemy mu do 6 kroków na domknięcie
    });

    return result.toUIMessageStreamResponse();
}