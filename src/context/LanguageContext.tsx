/**
 * ============================================
 * LANGUAGE CONTEXT - Sistema de i18n
 * ============================================
 * 
 * Context React para gerenciar idioma atual
 * e função de tradução profissional
 */

'use client';

import {
    createContext,
    useContext,
    useState,
    useEffect,
    ReactNode,
    useCallback,
} from 'react';

import ptBR from '@/translations/pt-BR.json';
import en from '@/translations/en.json';

// Tipos
export type Language = 'pt-BR' | 'en';

type TranslationObject = {
    [key: string]: string | string[] | TranslationObject;
};

interface LanguageContextType {
    language: Language;
    setLanguage: (lang: Language) => void;
    t: (key: string) => string | string[];
    toggleLanguage: () => void;
}

const translations: Record<Language, TranslationObject> = {
    'pt-BR': ptBR,
    'en': en,
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// Função para acessar valores aninhados
function getNestedValue(obj: TranslationObject, path: string): string | string[] {
    const keys = path.split('.');
    let current: unknown = obj;

    for (const key of keys) {
        if (current && typeof current === 'object' && key in current) {
            current = (current as TranslationObject)[key];
        } else {
            return path; // Retorna a key se não encontrar
        }
    }

    return current as string | string[];
}

export function LanguageProvider({ children }: { children: ReactNode }) {
    const [language, setLanguageState] = useState<Language>('pt-BR');
    const [isHydrated, setIsHydrated] = useState(false);

    // Carregar idioma salvo do localStorage
    useEffect(() => {
        const saved = localStorage.getItem('language') as Language;
        if (saved && (saved === 'pt-BR' || saved === 'en')) {
            setLanguageState(saved);
        }
        setIsHydrated(true);
    }, []);

    // Salvar idioma no localStorage
    const setLanguage = useCallback((lang: Language) => {
        setLanguageState(lang);
        localStorage.setItem('language', lang);
        // Atualiza o atributo lang do HTML
        document.documentElement.lang = lang === 'pt-BR' ? 'pt-BR' : 'en';
    }, []);

    // Toggle entre idiomas
    const toggleLanguage = useCallback(() => {
        setLanguage(language === 'pt-BR' ? 'en' : 'pt-BR');
    }, [language, setLanguage]);

    // Função de tradução
    const t = useCallback(
        (key: string): string | string[] => {
            return getNestedValue(translations[language], key);
        },
        [language]
    );

    // Evitar hydration mismatch
    if (!isHydrated) {
        return null;
    }

    return (
        <LanguageContext.Provider value={{ language, setLanguage, t, toggleLanguage }}>
            {children}
        </LanguageContext.Provider>
    );
}

// Hook para usar traduções
export function useLanguage() {
    const context = useContext(LanguageContext);
    if (context === undefined) {
        throw new Error('useLanguage must be used within a LanguageProvider');
    }
    return context;
}

// Hook simplificado só para tradução
export function useTranslation() {
    const { t, language } = useLanguage();
    return { t, language };
}

export default LanguageContext;
