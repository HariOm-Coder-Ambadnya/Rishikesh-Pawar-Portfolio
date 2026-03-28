'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { SplitText } from 'gsap/SplitText';

// Register GSAP plugins
if (typeof window !== 'undefined') {
    gsap.registerPlugin(SplitText);
}

interface GsapTextHeroProps {
    /** The heading text to animate */
    text: string;
    /** Extra Tailwind / CSS classes for the wrapper */
    className?: string;
    /** Stagger delay between chars in seconds (default 0.03) */
    stagger?: number;
    /** Animation delay in seconds (default 0) */
    delay?: number;
}

export default function GsapTextHero({
    text,
    className = '',
    stagger = 0.03,
    delay = 0,
}: GsapTextHeroProps) {
    const containerRef = useRef<HTMLHeadingElement>(null);

    useEffect(() => {
        const el = containerRef.current;
        if (!el) return;

        // --- SplitText is a GSAP Club plugin; provide a character-level fallback
        // when it is not available (in the free build SplitText ships since GSAP 3.12)
        let split: SplitText | null = null;
        let targets: HTMLElement[];

        try {
            split = new SplitText(el, { type: 'chars,words' });
            targets = split.chars as HTMLElement[];
        } catch {
            targets = [el];
        }

        // Initial state
        gsap.set(targets, { opacity: 0, y: 60, rotateX: -90, transformOrigin: '0% 50% -50px' });

        // Animate in
        const tl = gsap.timeline({ delay });
        tl.to(targets, {
            opacity: 1,
            y: 0,
            rotateX: 0,
            duration: 0.8,
            ease: 'back.out(1.4)',
            stagger,
        });

        return () => {
            tl.kill();
            if (split) split.revert();
        };
    }, [text, stagger, delay]);

    return (
        <h1
            ref={containerRef}
            className={className}
            style={{ perspective: '600px', perspectiveOrigin: '50% 50%' }}
        >
            {text}
        </h1>
    );
}

// ─── Subtitle variant ────────────────────────────────────────────────────────

interface GsapSubtitleProps {
    items: string[];
    className?: string;
    delay?: number;
}

export function GsapSubtitle({ items, className = '', delay = 0.6 }: GsapSubtitleProps) {
    const wrapperRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const el = wrapperRef.current;
        if (!el) return;

        const spans = el.querySelectorAll('span.gsap-word');
        gsap.set(spans, { opacity: 0, y: 30 });

        const tl = gsap.timeline({ delay });
        tl.to(spans, {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: 'power3.out',
            stagger: 0.12,
        });

        return () => { tl.kill(); };
    }, [items, delay]);

    return (
        <div ref={wrapperRef} className={className}>
            {items.map((item, i) => (
                <span key={i} className="gsap-word inline-block">
                    {item}
                    {i < items.length - 1 && (
                        <span className="mx-2 text-gray-300 dark:text-zinc-700">—</span>
                    )}
                </span>
            ))}
        </div>
    );
}

// ─── Badge / tag line variant ────────────────────────────────────────────────

interface GsapBadgeProps {
    text: string;
    className?: string;
    delay?: number;
}

export function GsapBadge({ text, className = '', delay = 0 }: GsapBadgeProps) {
    const ref = useRef<HTMLSpanElement>(null);

    useEffect(() => {
        const el = ref.current;
        if (!el) return;

        gsap.set(el, { opacity: 0, x: -24 });
        const tl = gsap.timeline({ delay });
        tl.to(el, { opacity: 1, x: 0, duration: 0.7, ease: 'power3.out' });

        return () => { tl.kill(); };
    }, [delay]);

    return (
        <span ref={ref} className={className}>
            {text}
        </span>
    );
}

// ─── Scroll-triggered paragraph ─────────────────────────────────────────────

interface GsapScrollParaProps {
    text: string;
    className?: string;
    delay?: number;
}

export function GsapScrollPara({ text, className = '', delay = 0 }: GsapScrollParaProps) {
    const ref = useRef<HTMLParagraphElement>(null);

    useEffect(() => {
        const el = ref.current;
        if (!el) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    gsap.fromTo(
                        el,
                        { opacity: 0, y: 40 },
                        { opacity: 1, y: 0, duration: 0.9, ease: 'power3.out', delay }
                    );
                    observer.disconnect();
                }
            },
            { threshold: 0.2 }
        );
        observer.observe(el);
        return () => observer.disconnect();
    }, [delay]);

    return <p ref={ref} className={className}>{text}</p>;
}
