/**
 * ============================================
 * COMPONENT: AppShell - Client Wrapper
 * ============================================
 * 
 * Wrapper client-side para gerenciar estado global
 * como o ContactModal
 */

'use client';

import { useState, useEffect } from 'react';
import { Header, Footer } from '@/components/layout';
import { SmoothScrollProvider, CustomCursor, PageTransition, PageLoader, ContactModal } from '@/components/ui';

interface AppShellProps {
    children: React.ReactNode;
}

export function AppShell({ children }: AppShellProps) {
    const [isContactOpen, setIsContactOpen] = useState(false);

    // Escutar evento customizado para abrir modal
    useEffect(() => {
        const handleOpenContact = () => setIsContactOpen(true);
        window.addEventListener('openContactModal', handleOpenContact);
        return () => window.removeEventListener('openContactModal', handleOpenContact);
    }, []);

    return (
        <>
            <PageLoader />
            <SmoothScrollProvider>
                <CustomCursor />
                <Header onContactClick={() => setIsContactOpen(true)} />
                <PageTransition>
                    <main>{children}</main>
                </PageTransition>
                <Footer />
            </SmoothScrollProvider>
            <ContactModal isOpen={isContactOpen} onClose={() => setIsContactOpen(false)} />
            <div className="grain-overlay" aria-hidden="true" />
        </>
    );
}

export default AppShell;
