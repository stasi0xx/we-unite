// types/global.d.ts
interface Window {
    gtag: (
        command: 'consent' | 'config' | 'event' | 'js',
        targetId: string,
        config?: Record<string, any>
    ) => void;
}