import { useState, useCallback, useRef, useEffect } from "react";

export const useMenu = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);

    const toggleMenu = useCallback(() => {
        setIsMenuOpen((prev) => !prev);
    }, []);

    const openMenu = useCallback(() => {
        setIsMenuOpen(true);
    }, []);

    const closeMenu = useCallback(() => {
        setIsMenuOpen(false);
    }, []);

    // Close menu when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                isMenuOpen &&
                menuRef.current &&
                !menuRef.current.contains(event.target as Node)
            ) {
                closeMenu();
            }
        };

        if (isMenuOpen) {
            document.addEventListener("mousedown", handleClickOutside);
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [isMenuOpen, closeMenu]);

    return {
        isMenuOpen,
        toggleMenu,
        openMenu,
        closeMenu,
        menuRef,
    };
};

