export {};

declare global {
    interface Window {
        Telegram: {
            WebApp: {
                ready: () => void;
                initDataUnsafe?: {
                    user?: {
                        id: number;
                        first_name: string;
                    };
                };
            };
        };
    }
}
