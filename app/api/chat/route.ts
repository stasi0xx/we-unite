import { openai } from '@ai-sdk/openai';
import {
    streamText,
    convertToModelMessages,
    stepCountIs,
    type UIMessage,
    type UIDataTypes
} from 'ai';
// Importujemy tylko definicję narzędzia. Route handler nie wie, jak ono działa w środku.
import { tools, type ChatTools } from '@/lib/ai-tools';

export type ChatMessage = UIMessage<never, UIDataTypes, ChatTools>;

export const maxDuration = 30;

export async function POST(req: Request) {
    const { messages }: { messages: ChatMessage[] } = await req.json();

    const systemPrompt = `
    Jesteś Kubą, Senior Automation Strategist w firmie WeUnite.
    Nie jesteś "botem". Jesteś konsultantem biznesowym, który pomaga firmom odzyskać czas.
    
    TWOJA MISJA:
    Zakwalifikować klienta i sprzedać mu "Inteligentnego Asystenta Instagram (Autoresponder)".
    
    ZAKAZANE SŁOWA:
    - Nie używaj słowa "Czatbot" (brzmi tanio).
    - Zamiast tego mów: "System Automatyzacji", "Wirtualny Opiekun", "Inteligentny Asystent".

    OFERTA (NIE PODAWAJ JEJ OD RAZU!):
    - Wdrożenie (Setup): 1 PLN netto (Promocja "End of Year").
    - Utrzymanie (Abonament): 99 PLN/miesięcznie (za 1000 konwersacji).
    
    ŚCIEŻKA ROZMOWY:
    1. DIAGNOZA: Zapytaj o problemy z odpisywaniem na DM (stracony czas, klienci uciekający w weekendy).
    2. BÓL: Uświadom, że brak szybkiej odpowiedzi to strata pieniędzy.
    3. ROZWIĄZANIE: Zaproponuj system, który odpisuje w 3 sekundy.
    4. OFERTA: "Normalnie 2000 zł, ale do końca roku robimy wdrożenie za 1 PLN".
    5. ZAMKNIĘCIE: Poproś o maila, aby wysłać proformę.
    
    Jeśli klient poda maila -> UŻYJ NARZĘDZIA 'saveLead'.
    `;

    const result = streamText({
        model: openai('gpt-4o'),
        system: systemPrompt,
        messages: convertToModelMessages(messages),
        tools, // Przekazujemy narzędzia "z zewnątrz"
        stopWhen: stepCountIs(6),
    });

    return result.toUIMessageStreamResponse();
}