export function cn(...classes: (string | undefined | null | false)[]): string {
    return classes.filter(Boolean).join(" ");
}

export function scrollToSection(elementId: string, offset: number = 40): boolean {
    if (typeof window === 'undefined') return false;

    try {
        const element = document.getElementById(elementId);
        if (!element) return false;

        const rect = element.getBoundingClientRect();
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const targetPosition = rect.top + scrollTop - offset;

        const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
        const clampedPosition = Math.max(0, Math.min(targetPosition, maxScroll));

        requestAnimationFrame(() => {
            window.scrollTo({
                top: clampedPosition,
                behavior: 'smooth'
            });
        });

        return true;
    } catch (error) {
        if (process.env.NODE_ENV === 'development') {
            console.error('[scrollToSection] Error:', error);
        }
        return false;
    }
}