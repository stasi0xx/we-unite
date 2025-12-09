import { Navbar } from "@/components/Navbar"; // Upewnij się, że ścieżka jest poprawna
import { Footer } from "@/components/Footer"; // Upewnij się, że ścieżka jest poprawna

export default function PrivacyPolicy() {
    return (
        <main className="min-h-screen bg-background text-zinc-300 font-sans">
            <Navbar />

            <div className="max-w-4xl mx-auto px-6 pt-32 pb-20">
                <h1 className="text-3xl md:text-5xl font-bold text-white mb-8">
                    Polityka Prywatności
                </h1>

                <div className="space-y-8 leading-relaxed">
                    <section>
                        <p className="text-sm text-zinc-500 mb-4">
                            Ostatnia aktualizacja: {new Date().toLocaleDateString('pl-PL')}
                        </p>
                        <p>
                            Szanujemy Twoją prywatność. Niniejsza Polityka Prywatności wyjaśnia, w jaki sposób zbieramy, wykorzystujemy i chronimy Twoje dane osobowe podczas korzystania ze strony internetowej <strong>WeUnite</strong> oraz naszych usług automatyzacji.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-white mb-4">1. Administrator Danych</h2>
                        <p>
                            Administratorem Twoich danych osobowych jest:<br />
                            <strong>WeUnite Jan Hofman</strong><br />
                            ul. Gdyńska G/9<br />
                            80-340 Gdańsk<br />
                            NIP: 5842877195<br />
                            <br />
                            Możesz skontaktować się z nami mailowo: <strong>info@weunite.pl</strong>
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-white mb-4">2. Jakie dane zbieramy i w jakim celu?</h2>
                        <ul className="list-disc pl-5 space-y-2">
                            <li>
                                <strong>Formularz kontaktowy:</strong> Zbieramy Twoje imię, nazwisko, adres e-mail oraz treść wiadomości w celu udzielenia odpowiedzi na Twoje zapytanie, przygotowania wyceny lub nawiązania współpracy. Podstawą prawną jest prawnie uzasadniony interes Administratora (art. 6 ust. 1 lit. f RODO) lub podjęcie działań na żądanie osoby, której dane dotyczą, przed zawarciem umowy (art. 6 ust. 1 lit. b RODO).
                            </li>
                            <li>
                                <strong>Analityka i logi serwera:</strong> Zbieramy dane techniczne (adres IP, typ przeglądarki, czas wizyty) w celach statystycznych oraz bezpieczeństwa serwisu.
                            </li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-white mb-4">3. Odbiorcy danych (Technologia)</h2>
                        <p>
                            Jako agencja technologiczna korzystamy z nowoczesnych narzędzi, którym możemy powierzać przetwarzanie Twoich danych. Są to zaufani partnerzy, którzy gwarantują bezpieczeństwo danych:
                        </p>
                        <ul className="list-disc pl-5 space-y-2 mt-2">
                            <li><strong>Supabase</strong> (USA/UE) – bezpieczna baza danych, w której przechowujemy zgłoszenia z formularzy.</li>
                            <li><strong>Vercel</strong> (USA) – dostawca hostingu naszej strony internetowej.</li>
                            <li><strong>Make / n8n</strong> (UE/USA) – narzędzia do automatyzacji procesów (np. automatyczne powiadomienie nas o Twojej wiadomości).</li>
                            <li><strong>OpenAI</strong> (USA) – w ograniczonym zakresie możemy wykorzystywać algorytmy AI do analizy treści zapytań w celu lepszego dopasowania oferty (dane są zanonimizowane tam, gdzie to możliwe).</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-white mb-4">4. Twoje Prawa</h2>
                        <p>
                            Zgodnie z RODO przysługuje Ci prawo do:
                        </p>
                        <ul className="list-disc pl-5 space-y-2 mt-2">
                            <li>Dostępu do swoich danych oraz otrzymania ich kopii.</li>
                            <li>Sprostowania (poprawiania) swoich danych.</li>
                            <li>Usunięcia danych ("prawo do bycia zapomnianym").</li>
                            <li>Ograniczenia przetwarzania danych.</li>
                            <li>Wniesienia sprzeciwu wobec przetwarzania danych.</li>
                            <li>Wniesienia skargi do Prezesa Urzędu Ochrony Danych Osobowych (PUODO).</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-white mb-4">5. Pliki Cookies</h2>
                        <p>
                            Nasza strona może wykorzystywać pliki cookies (ciasteczka) w celu zapewnienia poprawnego działania serwisu oraz w celach analitycznych. Możesz zarządzać ustawieniami cookies z poziomu swojej przeglądarki internetowej.
                        </p>
                    </section>

                    <section>
                        <p className="border-t border-white/10 pt-8 mt-12 text-sm text-zinc-500">
                            W razie pytań dotyczących prywatności, prosimy o kontakt pod adresem: info@weunite.pl.
                        </p>
                    </section>
                </div>
            </div>

            <Footer />
        </main>
    );
}