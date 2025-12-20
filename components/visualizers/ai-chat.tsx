"use client";

import { useState, useRef, useEffect } from "react";
import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport, type UIMessage } from "ai";
import { Send, Bot, User, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

// Definiujemy typ lokalnie, żeby uniknąć problemów z importem z pliku API w Next.js Client Component
// (Next.js czasem nie lubi importowania z 'app/api/...' do 'components/...')
// Musi pasować do tego co jest w route.ts
type ChatMessage = UIMessage<never, never, any>;

export default function AiChatInteractive() {
    const [inputValue, setInputValue] = useState("");
    const messagesEndRef = useRef<HTMLDivElement>(null);

    // 1. Konfiguracja UseChat
    const { messages, sendMessage, status, setMessages } = useChat({
        transport: new DefaultChatTransport({
            api: "/api/chat",
        }),
    });

    // 2. Seedowanie powitania
    useEffect(() => {
        if (messages.length === 0 && status === 'ready') {
            setMessages([
                {
                    id: "welcome-id",
                    role: "assistant",
                    parts: [{ type: "text", text: "Cześć! Tu Kuba z WeUnite. Widzę, że działasz na Instagramie. Czy zdarza Ci się gubić wiadomości od klientów w DM?" }],
                },
            ]);
        }
    }, []);

    const handleSend = async (e?: React.FormEvent) => {
        e?.preventDefault();
        if (!inputValue.trim()) return;

        const text = inputValue;
        setInputValue("");

        await sendMessage({
            role: 'user',
            parts: [{ type: 'text', text: text }],
        });
    };

    const isLoading = status === 'submitted' || status === 'streaming';

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages, status]);

    return (
        <div className="relative h-[450px] w-full max-w-md mx-auto overflow-hidden rounded-xl border border-zinc-800 bg-zinc-950 shadow-2xl flex flex-col font-sans">

            {/* Header */}
            <div className="flex items-center gap-3 px-4 py-3 border-b border-zinc-800 bg-zinc-900/50 backdrop-blur-sm">
                <div className="relative">
                    <div className="h-2 w-2 rounded-full bg-emerald-500 absolute bottom-0 right-0 ring-2 ring-zinc-900"></div>
                    <Bot size={20} className="text-blue-500" />
                </div>
                <div>
                    <p className="text-sm font-bold text-zinc-100">Asystent Kuba</p>
                </div>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-5 scrollbar-thin scrollbar-thumb-zinc-800 scrollbar-track-transparent">
                {messages.map((m, index) => (
                    <div
                        key={m.id || index}
                        className={cn(
                            "flex w-full animate-in fade-in slide-in-from-bottom-2 duration-300",
                            m.role === "user" ? "justify-end" : "justify-start"
                        )}
                    >
                        <div className={cn(
                            "flex gap-3 max-w-[85%]",
                            m.role === "user" ? "flex-row-reverse" : "flex-row"
                        )}>
                            <div className={cn(
                                "h-8 w-8 rounded-full flex items-center justify-center shrink-0 border shadow-sm",
                                m.role === "user"
                                    ? "bg-blue-600 border-blue-500 text-white"
                                    : "bg-zinc-800 border-zinc-700 text-zinc-400"
                            )}>
                                {m.role === "user" ? <User size={14} /> : <Bot size={14} />}
                            </div>

                            <div className={cn(
                                "px-4 py-2.5 text-sm shadow-md",
                                m.role === "user"
                                    ? "bg-blue-600 text-white rounded-2xl rounded-tr-sm"
                                    : "bg-zinc-800 text-zinc-200 border border-zinc-700 rounded-2xl rounded-tl-sm"
                            )}>
                                {m.parts ? m.parts.map((part, i) => {
                                    // TEXT PART
                                    if (part.type === 'text') {
                                        return <span key={i} className="whitespace-pre-wrap leading-relaxed block">{part.text}</span>;
                                    }

                                    // TOOL PART (Renderowanie widgetu)
                                    if (part.type === 'tool-invocation') {
                                        const toolName = part.toolInvocation.toolName;
                                        // Opcjonalnie: Możesz sprawdzić stan (result vs call)
                                        // const state = part.toolInvocation.state; // 'call' | 'result'

                                        return (
                                            <div key={i} className="my-2 p-2 bg-emerald-500/10 border border-emerald-500/20 rounded-lg flex items-center gap-2 text-xs text-emerald-500 font-mono">
                                                <Loader2 size={12} className="animate-spin" />
                                                <span className="uppercase tracking-wider">
                                    {toolName === 'saveLead' ? 'Zapisywanie...' : 'Przetwarzanie...'}
                                </span>
                                            </div>
                                        );
                                    }
                                    return null;
                                }) : (
                                    // Fallback
                                    <span></span>
                                )}
                            </div>
                        </div>
                    </div>
                ))}

                {isLoading && (
                    <div className="flex justify-start w-full pl-11 animate-in fade-in duration-300">
                        <div className="bg-zinc-900/50 border border-zinc-800/50 px-3 py-2 rounded-lg text-zinc-500 text-xs flex items-center gap-2">
                            <Loader2 size={12} className="animate-spin" />
                            <span className="font-medium">Kuba analizuje...</span>
                        </div>
                    </div>
                )}
                <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="p-3 bg-zinc-900 border-t border-zinc-800 z-10">
                <div className="flex gap-2 relative">
                    <input
                        className="flex-1 bg-zinc-950 border border-zinc-700/80 rounded-lg px-4 py-2.5 text-sm text-white placeholder:text-zinc-600 focus:outline-none focus:ring-1 focus:ring-blue-500 transition-all"
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter' && !e.shiftKey) {
                                e.preventDefault();
                                handleSend();
                            }
                        }}
                        placeholder="Napisz odpowiedź..."
                        autoComplete="off"
                    />
                    <button
                        onClick={() => handleSend()}
                        disabled={isLoading || !inputValue.trim()}
                        className="bg-blue-600 hover:bg-blue-500 text-white p-2.5 rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg active:scale-95"
                    >
                        <Send size={18} />
                    </button>
                </div>
            </div>
        </div>
    );
}