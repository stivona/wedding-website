"use client";

import Link from "next/link";
import { useState } from "react";

const navItems = [
  { href: "/", label: "Home" },
  { href: "/schedule", label: "Schedule" },
  { href: "/accommodations", label: "Stay" },
];

const actionItems = [
  { href: "https://withjoy.com/shannonandaustingetmarried/registry", label: "Registry", external: true },
  { href: "/rsvp", label: "RSVP", external: false },
];

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-cream/95 backdrop-blur-sm border-b border-olive/10">
      <nav className="container-wedding py-4">
        <div className="flex items-center justify-between">
          {/* Logo/Names */}
          <Link 
            href="/" 
            className="text-2xl text-olive transition-transform duration-500 hover:[transform:rotateY(360deg)]"
            style={{ fontFamily: 'var(--font-libre-caslon-display), serif' }}
          >
            8 | 8
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <ul className="flex items-center gap-8">
              {navItems.map((item) => (
                <li key={item.label}>
                  <Link href={item.href} className="link-nav">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
            
            {/* Action Buttons */}
            <div className="flex items-center gap-3">
              {actionItems.map((item) =>
                item.external ? (
                  <a
                    key={item.label}
                    href={item.href}
                    className="px-4 py-2 border border-olive text-olive font-body text-sm uppercase tracking-widest rounded-full hover:bg-olive hover:text-cream transition-colors duration-200"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {item.label}
                  </a>
                ) : (
                  <Link
                    key={item.label}
                    href={item.href}
                    className="px-4 py-2 border border-olive text-olive font-body text-sm uppercase tracking-widest rounded-full hover:bg-olive hover:text-cream transition-colors duration-200"
                  >
                    {item.label}
                  </Link>
                )
              )}
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 text-olive"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {isOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden mt-4 pb-4 border-t border-olive/10 pt-4">
            <ul className="space-y-4 mb-6">
              {navItems.map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className="link-nav block"
                    onClick={() => setIsOpen(false)}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
            
            {/* Action Buttons - Mobile */}
            <div className="flex gap-3">
              {actionItems.map((item) =>
                item.external ? (
                  <a
                    key={item.label}
                    href={item.href}
                    className="flex-1 text-center px-4 py-2 border border-olive text-olive font-body text-sm uppercase tracking-widest rounded-full hover:bg-olive hover:text-cream transition-colors duration-200"
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => setIsOpen(false)}
                  >
                    {item.label}
                  </a>
                ) : (
                  <Link
                    key={item.label}
                    href={item.href}
                    className="flex-1 text-center px-4 py-2 border border-olive text-olive font-body text-sm uppercase tracking-widest rounded-full hover:bg-olive hover:text-cream transition-colors duration-200"
                    onClick={() => setIsOpen(false)}
                  >
                    {item.label}
                  </Link>
                )
              )}
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
