import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

export default function TermsOfService() {
    return (
        <main className="min-h-screen bg-background text-zinc-300 font-sans">
            <Navbar />

            <div className="max-w-4xl mx-auto px-6 pt-32 pb-20">
                <h1 className="text-3xl md:text-5xl font-bold text-white mb-8">
                    Regulamin Serwisu
                </h1>

                <div className="space-y-8 leading-relaxed">
                    <section>
                        <p className="text-sm text-zinc-500 mb-4">
                            Wchodzi w życie z dniem: {new Date().toLocaleDateString('pl-PL')}
                        </p>
                        <p>
                            Niniejszy Regulamin określa zasady korzystania ze strony internetowej <strong>WeUnite</strong>, rodzaje usług świadczonych drogą elektroniczną oraz warunki zawierania i rozwiązywania umów.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-white mb-4">1. Postanowienia ogólne</h2>
                        <p>
                            Właścicielem serwisu internetowego (Usługodawcą) jest:<br />
                            <strong>WeUnite Jan Hofman</strong><br />
                            z siedzibą przy: ul. Gdyńska G/9, 80-340 Gdańsk<br />
                            NIP: 5842877195, REGON: 543312986<br />
                            Adres e-mail: info@weunite.pl<br />
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-white mb-4">2. Wymagania techniczne</h2>
                        <p>
                            Do prawidłowego korzystania z Serwisu niezbędne jest spełnienie następujących warunków technicznych:
                        </p>
                        <ul className="list-disc pl-5 space-y-2 mt-2">
                            <li>Urządzenie z dostępem do sieci Internet.</li>
                            <li>Przeglądarka internetowa w aktualnej wersji (Chrome, Firefox, Safari, Edge) z obsługą JavaScript i Cookies.</li>
                            <li>Aktywne konto poczty elektronicznej (e-mail) – w przypadku korzystania z formularza kontaktowego.</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-white mb-4">3. Rodzaje i zakres usług</h2>
                        <p>
                            Usługodawca świadczy za pośrednictwem Serwisu następujące usługi drogą elektroniczną:
                        </p>
                        <ul className="list-disc pl-5 space-y-2 mt-2">
                            <li>Umożliwienie zapoznania się z ofertą agencji WeUnite (automatyzacja, AI, strony WWW).</li>
                            <li>Udostępnienie formularza kontaktowego w celu przesyłania zapytań ofertowych.</li>
                            <li>Prezentacja interaktywnych elementów (Bento Grid, Demo), mających charakter poglądowy.</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-white mb-4">4. Warunki zawierania i rozwiązywania umów</h2>
                        <p>
                            Umowa o świadczenie usług drogą elektroniczną zostaje zawarta w momencie rozpoczęcia korzystania z Serwisu (wyświetlenie strony). Korzystanie z formularza kontaktowego jest dobrowolne i bezpłatne. Użytkownik może w każdej chwili zrezygnować z korzystania z usług poprzez opuszczenie strony internetowej.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-white mb-4">5. Odpowiedzialność i AI</h2>
                        <p>
                            Jako agencja wdrażająca sztuczną inteligencję, informujemy, że:
                        </p>
                        <ul className="list-disc pl-5 space-y-2 mt-2">
                            <li>Prezentowane na stronie przykłady działania AI mają charakter demonstracyjny.</li>
                            <li>Administrator dokłada wszelkich starań, aby treści były aktualne, jednak nie ponosi odpowiedzialności za decyzje biznesowe podjęte na podstawie informacji zawartych w Serwisie przed podpisaniem właściwej umowy współpracy.</li>
                            <li>Serwis może zawierać linki do stron zewnętrznych (np. narzędzi No-Code), za które Administrator nie ponosi odpowiedzialności.</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-white mb-4">6. Własność intelektualna</h2>
                        <p>
                            Wszelkie treści zamieszczone w Serwisie (teksty, grafiki, kod źródłowy, logotypy) są chronione prawem autorskim i należą do Usługodawcy. Ich kopiowanie, powielanie lub wykorzystywanie bez pisemnej zgody jest zabronione.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-white mb-4">7. Postępowanie reklamacyjne</h2>
                        <p>
                            W przypadku nieprawidłowego działania Serwisu, Użytkownik ma prawo zgłosić reklamację na adres e-mail: <strong>[TWÓJ EMAIL]</strong>. Reklamacje rozpatrywane są w terminie 14 dni.
                        </p>
                    </section>

                    <section>
                        <p className="border-t border-white/10 pt-8 mt-12 text-sm text-zinc-500">
                            W sprawach nieuregulowanych niniejszym Regulaminem zastosowanie mają przepisy Kodeksu Cywilnego oraz inne właściwe przepisy prawa polskiego.
                        </p>
                    </section>
                </div>
            </div>

            <Footer />
        </main>
    );
}