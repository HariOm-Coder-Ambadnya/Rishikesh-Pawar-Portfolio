'use client';

import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import Link from 'next/link';
import {
    ArrowRight, Mail, Github, Linkedin, ExternalLink,
    Code2, Palette, Zap, Database, Server, GitBranch, Phone,
} from 'lucide-react';
import dynamic from 'next/dynamic';
import GsapTextHero, { GsapBadge, GsapSubtitle, GsapScrollPara } from '@/components/GsapTextHero';

// Load Three.js canvas only on the client (no SSR)
const ParticleSphere = dynamic(() => import('@/components/ParticleSphere'), { ssr: false });

const skills = [
    { name: 'Java',        icon: Code2     },
    { name: 'Spring Boot', icon: Server    },
    { name: 'React.js',    icon: Code2     },
    { name: 'MySQL',       icon: Database  },
    { name: 'REST APIs',   icon: Zap       },
    { name: 'Git & GitHub',icon: GitBranch },
];

const experience = [
    {
        period: 'Feb 2026 – Present',
        role: 'Full Stack Development Intern (Remote)',
        company: 'Web Mobi 360',
        description:
            'Developing backend services for Cerebro, an AI-powered document intelligence platform, using Spring Boot and Java 17. Designing RESTful APIs for document ingestion and LLM query handling and integrating third-party AI APIs for contextual chat. Building responsive Next.js interfaces in Agile environment with automated testing.',
    },
    {
        period: 'One week',
        role: 'Software Engineer Trainee',
        company: 'Zensar Technologies',
        description:
            'Developing full stack applications using React, Spring Boot, and MySQL. Building REST APIs and integrating frontend components with backend services.',
    },
];

const projects = [
    {
        title: 'EduNexus',
        description: 'Modern educational portal for academic resource management.',
        tech: ['Next.js', 'Spring Boot', 'PostgreSQL'],
        image: 'https://images.unsplash.com/photo-1501504905252-473c47e087f8?q=80&w=1200',
        link: 'https://github.com/HariOm-Coder-Ambadnya/EduNexus',
        github: 'https://github.com/HariOm-Coder-Ambadnya/EduNexus',
    },
    {
        title: 'Webmobi',
        description: 'RAG-powered AI team intelligence and document chat hub.',
        tech: ['Groq', 'MongoDB', 'React'],
        image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=1200',
        link: 'https://github.com/HariOm-Coder-Ambadnya/webmobicerebros',
        github: 'https://github.com/HariOm-Coder-Ambadnya/webmobicerebros',
    },
    {
        title: 'AI Content Generator',
        description: 'Full-stack AI platform for high-quality content generation.',
        tech: ['Spring Boot', 'React', 'Grok API'],
        image: 'https://images.unsplash.com/photo-1763568258289-47ada8efe7ea?q=80&w=1200',
        link: 'https://ai-content-generator-tau-seven.vercel.app/',
        github: 'https://github.com/HariOm-Coder-Ambadnya/AI-Content-Generator',
    },
    {
        title: 'Collab Edit',
        description: 'Real-time collaborative text editor with shared cursor visibility.',
        tech: ['React', 'Firebase', 'Socket.io'],
        image: 'https://images.unsplash.com/photo-1587620962725-abab7fe55159?q=80&w=1200',
        link: 'https://collabedit-nine.vercel.app/',
        github: 'https://github.com/HariOm-Coder-Ambadnya/collabedit',
    },
];

// ─── Framer-motion helpers ───────────────────────────────────────────────────

function FloatingShape({
    className,
    delay = 0,
    yOffset = 100,
}: {
    className?: string;
    delay?: number;
    yOffset?: number;
}) {
    const { scrollYProgress } = useScroll();
    const y = useTransform(scrollYProgress, [0, 1], [0, yOffset]);
    return (
        <motion.div
            style={{ y }}
            className={className}
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            transition={{ duration: 1, delay }}
        />
    );
}

// ─── Page ───────────────────────────────────────────────────────────────────

export default function Home() {
    const heroRef       = useRef(null);
    const aboutRef      = useRef(null);
    const experienceRef = useRef(null);
    const skillsRef     = useRef(null);
    const projectsRef   = useRef(null);

    const { scrollYProgress } = useScroll();
    const bgTextY  = useTransform(scrollYProgress, [0, 1], [0, -500]);

    const heroInView       = useInView(heroRef,       { once: true, amount: 0.1 });
    const aboutInView      = useInView(aboutRef,      { once: true, amount: 0.1 });
    const experienceInView = useInView(experienceRef, { once: true, amount: 0.1 });
    const skillsInView     = useInView(skillsRef,     { once: true, amount: 0.1 });
    const projectsInView   = useInView(projectsRef,   { once: true, amount: 0.1 });

    const fadeInUp = {
        hidden:  { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
    };

    const staggerContainer = {
        hidden:  { opacity: 0 },
        visible: { opacity: 1, transition: { staggerChildren: 0.15, delayChildren: 0.2 } },
    };

    const staggerItem = {
        hidden:  { opacity: 0, y: 30, scale: 0.95 },
        visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.6 } },
    };

    return (
        <div className="min-h-screen bg-[#f8f6f1] dark:bg-zinc-950 overflow-x-hidden transition-colors duration-500">

            {/* ── Noise texture ─────────────────────────────────────────── */}
            <div
                className="fixed inset-0 opacity-[0.03] pointer-events-none z-[100]"
                style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
                }}
            />

            {/* ── Floating rings ────────────────────────────────────────── */}
            <FloatingShape
                className="fixed top-[10%] left-[5%] w-48 h-48 md:w-64 md:h-64 border border-gray-200 dark:border-zinc-800 rounded-full z-0"
                yOffset={200}
            />
            <FloatingShape
                className="fixed top-[60%] right-[10%] w-64 h-64 md:w-96 md:h-96 border border-gray-200 dark:border-zinc-800 rounded-full z-0"
                yOffset={-300}
                delay={0.5}
            />

            {/* ── Background parallax text ──────────────────────────────── */}
            <motion.div
                style={{ y: bgTextY }}
                className="fixed inset-0 flex items-center justify-center pointer-events-none z-0 opacity-[0.03] dark:opacity-[0.05] select-none whitespace-nowrap"
            >
                <h2 className="text-[10vw] font-serif font-black uppercase tracking-tighter dark:text-white">
                    HUMAN × MACHINE
                </h2>
            </motion.div>

            {/* ══════════════════════════════════════════════════════════════
                HERO SECTION
            ══════════════════════════════════════════════════════════════ */}
            <section
                ref={heroRef}
                className="relative min-h-screen flex items-center justify-center px-4 pt-20 pb-10 overflow-hidden"
            >
                <div className="container mx-auto z-10">
                    {/*
                     * Mobile:  stacked (sphere on top, text below)
                     * Desktop: side-by-side (text left, sphere right)
                     */}
                    <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-center">

                        {/* ── Three.js sphere – visible on ALL screen sizes ── */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 1.2, ease: 'easeOut' }}
                            className="
                                order-1 lg:order-2
                                w-[280px] h-[280px]
                                sm:w-[340px] sm:h-[340px]
                                lg:w-1/2 lg:h-[600px]
                                flex-shrink-0
                            "
                        >
                            <ParticleSphere />
                        </motion.div>

                        {/* ── GSAP-animated text content ─────────────────── */}
                        <motion.div
                            initial="hidden"
                            animate={heroInView ? 'visible' : 'hidden'}
                            variants={staggerContainer}
                            className="order-2 lg:order-1 text-center lg:text-left flex-1"
                        >
                            {/* Badge */}
                            <div className="mb-4 overflow-hidden">
                                <GsapBadge
                                    text="Java Full Stack Developer"
                                    delay={0.1}
                                    className="inline-block text-sm uppercase tracking-[0.3em] text-primary font-medium"
                                />
                            </div>

                            {/* Main heading – GSAP 3-D character flip */}
                            <GsapTextHero
                                text="Rishikesh Suryakant Pawar"
                                delay={0.3}
                                stagger={0.025}
                                className="
                                    text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl
                                    font-serif font-light
                                    text-gray-900 dark:text-zinc-100
                                    mb-6 tracking-tighter leading-none
                                "
                            />

                            {/* Subtitle pills */}
                            <GsapSubtitle
                                items={['React', 'Spring Boot', 'REST APIs', 'MySQL']}
                                delay={0.9}
                                className="
                                    text-lg md:text-xl lg:text-2xl
                                    text-gray-600 dark:text-zinc-400
                                    mb-6 font-light italic font-serif
                                    flex flex-wrap justify-center lg:justify-start gap-y-1
                                "
                            />

                            {/* Paragraph */}
                            <GsapScrollPara
                                text="Elevating digital landscapes through precision engineering and masterful design. Based in India, working globally."
                                delay={0.2}
                                className="
                                    text-base md:text-lg
                                    text-gray-500 dark:text-zinc-500
                                    mb-10 max-w-xl mx-auto lg:mx-0 leading-relaxed
                                "
                            />

                            {/* CTA buttons */}
                            <motion.div
                                variants={fadeInUp}
                                className="flex flex-wrap items-center justify-center lg:justify-start gap-4"
                            >
                                <Link
                                    href="/projects"
                                    className="group px-8 py-4 bg-primary text-white rounded-full hover:bg-primary/90 transition-all duration-500 flex items-center gap-3 relative overflow-hidden"
                                >
                                    <span className="relative z-10 font-medium">Explore Works</span>
                                    <ArrowRight className="w-5 h-5 relative z-10 group-hover:translate-x-1 transition-transform duration-500" />
                                    <motion.div className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
                                </Link>
                                <Link
                                    href="/contact"
                                    className="px-8 py-4 bg-transparent border border-gray-200 dark:border-zinc-800 text-gray-900 dark:text-zinc-100 rounded-full hover:bg-white dark:hover:bg-zinc-900 transition-all duration-500"
                                >
                                    Let&apos;s Connect
                                </Link>
                            </motion.div>

                            {/* Social icons */}
                            <motion.div
                                variants={fadeInUp}
                                className="flex items-center justify-center lg:justify-start gap-6 mt-12"
                            >
                                {[
                                    { icon: Mail,     href: 'mailto:rishipawar0101@gmail.com' },
                                    { icon: Phone,    href: 'tel:+919021363384'               },
                                    { icon: Github,   href: 'https://github.com'              },
                                    { icon: Linkedin, href: 'https://linkedin.com'            },
                                ].map((social, i) => (
                                    <a
                                        key={i}
                                        href={social.href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="group relative"
                                    >
                                        <social.icon className="w-6 h-6 text-gray-400 dark:text-zinc-600 group-hover:text-primary transition-colors duration-500" />
                                        <motion.div className="absolute -inset-2 bg-gray-100 dark:bg-zinc-800 scale-0 group-hover:scale-100 rounded-full -z-10 transition-transform duration-500" />
                                    </a>
                                ))}
                            </motion.div>
                        </motion.div>
                    </div>
                </div>

                {/* Scroll indicator */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 2.5, duration: 1 }}
                    className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
                >
                    <span className="text-[10px] uppercase tracking-[0.4em] text-gray-400 rotate-90 mb-6">Scroll</span>
                    <div className="w-[1px] h-10 bg-gradient-to-b from-gray-200 to-transparent" />
                </motion.div>
            </section>

            {/* ══════════════════════════════════════════════════════════════
                ABOUT SECTION
            ══════════════════════════════════════════════════════════════ */}
            <section ref={aboutRef} className="relative py-24 md:py-32 px-4 z-10">
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.3 }}
                    variants={fadeInUp}
                    className="max-w-4xl mx-auto"
                >
                    <div className="flex flex-col md:flex-row gap-10 md:gap-16 items-start">
                        <div className="flex-1">
                            <h2 className="text-sm uppercase tracking-[0.4em] text-gray-400 dark:text-zinc-600 font-medium mb-8 md:mb-12">
                                / Philosophy
                            </h2>
                            <h3 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif font-light text-gray-900 dark:text-zinc-100 mb-8 md:mb-12 leading-tight">
                                Designing with purpose, coding for scale.
                            </h3>
                        </div>
                        <div className="flex-1 md:pt-12">
                            <div className="bg-white/40 dark:bg-zinc-900/40 backdrop-blur-3xl rounded-[2.5rem] border border-white/50 dark:border-zinc-800/50 shadow-[0_32px_64px_-12px_rgba(0,0,0,0.05)] p-8 md:p-14 relative overflow-hidden group">
                                <p className="text-lg md:text-xl text-gray-600 dark:text-zinc-400 leading-relaxed font-light relative z-10">
                                    Java Full Stack Developer with experience building end-to-end web applications using React and Spring Boot. Strong in REST API design, frontend-backend integration, and database modeling with MySQL.
                                </p>
                                <div className="absolute top-0 right-0 p-8 opacity-[0.05] group-hover:opacity-[0.1] transition-opacity duration-700">
                                    <Zap className="w-24 h-24 text-gray-900 dark:text-zinc-100" />
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </section>

            {/* ══════════════════════════════════════════════════════════════
                EXPERIENCE SECTION
            ══════════════════════════════════════════════════════════════ */}
            <section ref={experienceRef} className="relative py-24 md:py-32 px-4 z-10">
                <div className="max-w-5xl mx-auto">
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.2 }}
                        variants={fadeInUp}
                        className="mb-16 md:mb-20"
                    >
                        <h2 className="text-sm uppercase tracking-[0.4em] text-gray-400 dark:text-zinc-600 font-medium mb-4">
                            / Journey
                        </h2>
                        <h3 className="text-4xl sm:text-5xl md:text-7xl font-serif font-light text-gray-900 dark:text-zinc-100 tracking-tight">
                            Experience
                        </h3>
                    </motion.div>

                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.1 }}
                        variants={staggerContainer}
                        className="grid gap-6 md:gap-8"
                    >
                        {experience.map((exp, index) => (
                            <motion.div
                                key={index}
                                variants={staggerItem}
                                className="group relative bg-white/40 dark:bg-zinc-900/40 backdrop-blur-3xl rounded-[2.5rem] border border-white/50 dark:border-zinc-800/50 p-8 md:p-16 hover:bg-white/60 dark:hover:bg-zinc-800/60 transition-all duration-700 flex flex-col md:flex-row gap-8 md:gap-12"
                            >
                                <div className="md:w-1/3">
                                    <p className="text-sm font-medium text-gray-400 dark:text-zinc-600 mb-2 uppercase tracking-widest">{exp.period}</p>
                                    <h4 className="text-2xl md:text-3xl font-serif text-gray-900 dark:text-zinc-100 group-hover:text-primary group-hover:translate-x-2 transition-all duration-700">
                                        {exp.company}
                                    </h4>
                                </div>
                                <div className="md:w-2/3">
                                    <h5 className="text-lg md:text-xl font-medium text-gray-900 dark:text-zinc-200 mb-4 md:mb-6">{exp.role}</h5>
                                    <p className="text-base md:text-lg text-gray-500 dark:text-zinc-500 leading-relaxed font-light">{exp.description}</p>
                                </div>
                                <div className="absolute top-8 right-8 md:top-10 md:right-10 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                                    <div className="w-10 h-10 md:w-12 md:h-12 rounded-full border border-gray-200 dark:border-zinc-800 flex items-center justify-center">
                                        <ArrowRight className="w-4 h-4 md:w-5 md:h-5 text-secondary -rotate-45" />
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* ══════════════════════════════════════════════════════════════
                SKILLS SECTION
            ══════════════════════════════════════════════════════════════ */}
            <section ref={skillsRef} className="relative py-24 md:py-32 px-4 bg-[#ede8dd]/20 dark:bg-zinc-900/20 z-10">
                <div className="max-w-6xl mx-auto">
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.2 }}
                        variants={fadeInUp}
                        className="mb-16 md:mb-20 text-center"
                    >
                        <h2 className="text-sm uppercase tracking-[0.4em] text-gray-400 dark:text-zinc-600 font-medium mb-4">
                            / Arsenal
                        </h2>
                        <h3 className="text-4xl sm:text-5xl md:text-7xl font-serif font-light text-gray-900 dark:text-zinc-100 tracking-tight">
                            Mastered Skills
                        </h3>
                    </motion.div>

                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.1 }}
                        variants={staggerContainer}
                        className="grid grid-cols-2 sm:grid-cols-3 gap-4 md:gap-6"
                    >
                        {skills.map((skill, index) => {
                            const Icon = skill.icon;
                            return (
                                <motion.div
                                    key={index}
                                    variants={staggerItem}
                                    className="group bg-white/50 dark:bg-zinc-900/50 backdrop-blur-3xl rounded-[2rem] border border-white/50 dark:border-zinc-800/50 p-7 md:p-10 hover:shadow-[0_40px_80px_-20px_rgba(0,0,0,0.1)] hover:-translate-y-2 transition-all duration-700"
                                >
                                    <div className="w-12 h-12 md:w-16 md:h-16 rounded-2xl bg-[#f8f6f1] dark:bg-zinc-800 border border-gray-100 dark:border-zinc-700 flex items-center justify-center mb-6 md:mb-8 group-hover:rotate-[10deg] transition-transform duration-700 shadow-sm">
                                        <Icon className="w-6 h-6 md:w-8 md:h-8 text-primary" />
                                    </div>
                                    <p className="text-xl md:text-2xl font-serif text-gray-900 dark:text-zinc-100">{skill.name}</p>
                                </motion.div>
                            );
                        })}
                    </motion.div>
                </div>
            </section>

            {/* ══════════════════════════════════════════════════════════════
                FEATURED PROJECTS
            ══════════════════════════════════════════════════════════════ */}
            <section ref={projectsRef} className="relative py-24 md:py-32 px-4 z-10">
                <div className="max-w-6xl mx-auto">
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.2 }}
                        variants={fadeInUp}
                        className="flex items-end justify-between mb-16 md:mb-24"
                    >
                        <div>
                            <h2 className="text-sm uppercase tracking-[0.4em] text-gray-400 dark:text-zinc-600 font-medium mb-2">
                                / Selected Works
                            </h2>
                            <h3 className="text-4xl sm:text-5xl md:text-7xl font-serif font-light text-gray-900 dark:text-zinc-100 tracking-tight">
                                Featured
                            </h3>
                        </div>
                        <Link href="/projects" className="group flex flex-col items-end gap-2 mb-1">
                            <span className="text-sm font-medium text-gray-900 dark:text-zinc-100">View Catalog</span>
                            <div className="w-12 h-0.5 bg-gray-900 dark:bg-zinc-100 group-hover:w-24 transition-all duration-700" />
                        </Link>
                    </motion.div>

                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.1 }}
                        variants={staggerContainer}
                        className="grid sm:grid-cols-2 gap-10 md:gap-12 lg:gap-20"
                    >
                        {projects.map((project, index) => (
                            <motion.div key={index} variants={staggerItem} className="group cursor-pointer">
                                <div className="aspect-[4/5] bg-[#ede8dd]/50 dark:bg-zinc-900/50 rounded-[2rem] md:rounded-[3rem] overflow-hidden mb-6 md:mb-8 relative">
                                    <div className="absolute inset-0 group-hover:scale-110 transition-transform duration-1000">
                                        <img
                                            src={project.image}
                                            alt={project.title}
                                            className="w-full h-full object-cover grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100 dark:opacity-40 dark:group-hover:opacity-100 transition-all duration-700"
                                        />
                                    </div>
                                    <div className="absolute inset-0 bg-gray-900/0 group-hover:bg-gray-900/40 dark:group-hover:bg-zinc-950/60 transition-colors duration-700 flex items-center justify-center">
                                        <div className="flex gap-4 opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-700">
                                            <a
                                                href={project.link}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="w-16 h-16 bg-white dark:bg-zinc-800 rounded-full flex items-center justify-center hover:scale-110 transition-transform"
                                            >
                                                <ExternalLink className="w-6 h-6 text-gray-900 dark:text-zinc-100" />
                                            </a>
                                            <a
                                                href={project.github}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="w-16 h-16 bg-white dark:bg-zinc-800 rounded-full flex items-center justify-center hover:scale-110 transition-transform"
                                            >
                                                <Github className="w-6 h-6 text-gray-900 dark:text-zinc-100" />
                                            </a>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex justify-between items-start gap-4">
                                    <div>
                                        <h4 className="text-2xl md:text-3xl font-serif text-gray-900 dark:text-zinc-100 mb-3 md:mb-4">{project.title}</h4>
                                        <div className="flex flex-wrap gap-3">
                                            {project.tech.map((tech, i) => (
                                                <span key={i} className="text-[10px] uppercase tracking-widest text-gray-400 dark:text-zinc-600">
                                                    {tech}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                    <span className="text-[10px] uppercase tracking-widest text-gray-300 dark:text-zinc-700">0{index + 1}</span>
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* ══════════════════════════════════════════════════════════════
                CTA SECTION
            ══════════════════════════════════════════════════════════════ */}
            <section className="relative py-32 md:py-48 px-4 z-10 overflow-hidden">
                <div className="max-w-4xl mx-auto text-center relative z-20">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1 }}
                    >
                        <h2 className="text-[18vw] sm:text-[15vw] md:text-[10vw] font-serif font-light text-gray-900 dark:text-zinc-100 mb-8 md:mb-12 tracking-tighter leading-[0.8]">
                            Let&apos;s Build.
                        </h2>
                        <p className="text-lg md:text-xl text-gray-500 dark:text-zinc-500 mb-12 md:mb-16 max-w-xl mx-auto font-light">
                            Currently available for new projects or agency partnerships. Reach out and let&apos;s discuss your vision.
                        </p>
                        <Link
                            href="/contact"
                            className="inline-flex items-center gap-4 px-10 md:px-12 py-5 md:py-6 bg-primary text-white rounded-full hover:bg-primary/90 transition-all duration-700 font-medium text-base md:text-lg"
                        >
                            Start a Conversation
                            <ArrowRight className="w-5 h-5 md:w-6 md:h-6" />
                        </Link>
                    </motion.div>
                </div>

                {/* Footer strip */}
                <div className="absolute bottom-0 left-0 right-0 py-8 md:py-12 border-t border-gray-200/50 dark:border-zinc-800/50 flex flex-wrap justify-between px-6 md:px-8 text-[10px] uppercase tracking-[0.5em] text-gray-400 dark:text-zinc-600 gap-2">
                    <span>© 2026 Rishikesh Pawar</span>
                    <span>Loc: India / GMT+5:30</span>
                </div>
            </section>
        </div>
    );
}
