import Link from "next/link";
import { Twitter, Linkedin, Github, Facebook, Mail, MapPin, Phone } from "lucide-react";

export const Footer = () => {
    return (
        <footer className="w-full bg-background border-t border-white/10 pt-16 pb-8 px-6 relative overflow-hidden">

            {/* Opcjonalnie: Subtelne tło/glow na dole */}
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[200px] bg-primary/5 blur-[100px] rounded-full pointer-events-none" />

            <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-8 relative z-10">

                {/* KOLUMNA 1: LOGO I OPIS */}
                <div className="space-y-4">
                    <Link href="/" className="flex items-center gap-2 group">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-500 flex items-center justify-center shadow-[0_0_15px_-3px_var(--primary)]">
                            <span className="font-bold text-white text-xs">WU</span>
                        </div>
                        <span className="font-bold text-lg tracking-wide text-white">
              WeUnite
            </span>
                    </Link>
                    <p className="text-zinc-500 text-sm leading-relaxed max-w-xs">
                        Tworzymy systemy, które pracują, gdy Ty śpisz. Automatyzacja, AI i nowoczesne strony WWW dla Twojego biznesu.
                    </p>

                    {/* Social Media */}
                    <div className="flex items-center gap-4 mt-4">
                        <SocialLink href="#" icon={<Twitter size={18} />} />
                        <SocialLink href="#" icon={<Linkedin size={18} />} />
                        <SocialLink href="#" icon={<Github size={18} />} />
                        <SocialLink href="#" icon={<Facebook size={18} />} />
                    </div>
                </div>

                {/* KOLUMNA 2: OFERTA */}
                <div>
                    <h4 className="font-bold text-white mb-6">Oferta</h4>
                    <ul className="space-y-3 text-sm text-zinc-400">
                        <li><FooterLink href="#">AI Social Responder</FooterLink></li>
                        <li><FooterLink href="#">Automatyzacja Biznesu</FooterLink></li>
                        <li><FooterLink href="#">Inteligentne Strony</FooterLink></li>
                        <li><FooterLink href="#">Konsultacje AI</FooterLink></li>
                    </ul>
                </div>

                {/* KOLUMNA 3: FIRMA */}
                <div>
                    <h4 className="font-bold text-white mb-6">Firma</h4>
                    <ul className="space-y-3 text-sm text-zinc-400">
                        <li><FooterLink href="#">O nas</FooterLink></li>
                        <li><FooterLink href="#">Case Studies</FooterLink></li>
                        <li><FooterLink href="/regulamin">Regulamin</FooterLink></li>
                        <li><FooterLink href="/polityka-prywatnosci">Polityka Prywatności</FooterLink></li>
                    </ul>
                </div>

                {/* KOLUMNA 4: KONTAKT */}
                <div>
                    <h4 className="font-bold text-white mb-6">Kontakt</h4>
                    <ul className="space-y-4 text-sm text-zinc-400">
                        <li className="flex items-start gap-3">
                            <Mail className="w-5 h-5 text-primary mt-0.5" />
                            <span>info@weunite.pl</span>
                        </li>
                        <li className="flex items-start gap-3">
                            <Phone className="w-5 h-5 text-primary mt-0.5" />
                            <span>+48 537 732 320</span>
                        </li>
                        <li className="flex items-start gap-3">
                            <MapPin className="w-5 h-5 text-primary mt-0.5" />
                            <span>
                 ul. Gdyńska G/9, <br />
                80-340 Gdańsk
              </span>
                        </li>
                    </ul>
                </div>
            </div>

            {/* COPYRIGHT */}
            <div className="max-w-6xl mx-auto mt-16 pt-8 border-t border-white/5 text-center md:text-left flex flex-col md:flex-row justify-between items-center text-xs text-zinc-600">
                <p>&copy; 2025 WeUnite. Wszelkie prawa zastrzeżone</p>
                <p className="mt-2 md:mt-0">Designed & Developed by Stanisław Korycki</p>
            </div>
        </footer>
    );
};

// Pomocnicze komponenty dla czystości kodu
const SocialLink = ({ href, icon }: { href: string; icon: React.ReactNode }) => (
    <a
        href={href}
        className="w-8 h-8 flex items-center justify-center rounded-full bg-white/5 border border-white/10 text-zinc-400 hover:bg-white/10 hover:text-white hover:border-white/20 transition-all duration-300"
    >
        {icon}
    </a>
);

const FooterLink = ({ href, children }: { href: string; children: React.ReactNode }) => (
    <Link href={href} className="hover:text-primary transition-colors">
        {children}
    </Link>
);