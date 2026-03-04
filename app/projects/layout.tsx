import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Projects',
    description:
        'Explore the portfolio of Rishikesh Pawar — full-stack web applications built with React, Spring Boot, and MySQL.',
};

export default function ProjectsLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
