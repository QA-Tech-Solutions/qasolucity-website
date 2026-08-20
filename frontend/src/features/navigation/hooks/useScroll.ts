"use client";

import { useEffect, useState, useRef } from "react";

export function useScroll() {
  const [scrolled, setScrolled] = useState(false);
  const throttleRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (throttleRef.current) return;
      
      setScrolled(window.scrollY > 20);
      
      throttleRef.current = setTimeout(() => {
        throttleRef.current = null;
      }, 150);
    };

    handleScroll();

    window.addEventListener(
      "scroll",
      handleScroll,
      { passive: true }
    );

    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (throttleRef.current) clearTimeout(throttleRef.current);
    };
  }, []);

  return scrolled;
}