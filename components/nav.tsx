"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState, type KeyboardEvent } from "react";


export function Nav({name,homeLabel,items: NAV_ITEMS}:{name:string;homeLabel:string;items:{label:string;href:string}[]}) {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  const dialogRef = useRef<HTMLDialogElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const homeRef = useRef<HTMLAnchorElement>(null);
  const navigationPending = useRef(false);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (dialog?.open || navigationPending.current) {
      dialog?.close();
      navigationPending.current = false;
      document.getElementById("main")?.focus({ preventScroll: true });
    }
  }, [pathname]);

  useEffect(() => {
    const desktop = window.matchMedia("(min-width: 640px)");
    function closeOnDesktop() {
      if (desktop.matches && dialogRef.current?.open) {
        dialogRef.current.close();
        homeRef.current?.focus({ preventScroll: true });
      }
    }
    desktop.addEventListener("change", closeOnDesktop);
    return () => desktop.removeEventListener("change", closeOnDesktop);
  }, []);

  function openMenu() {
    // Also establish the return target in browsers that do not focus clicked buttons.
    triggerRef.current?.focus({ preventScroll: true });
    dialogRef.current?.showModal();
    setMenuOpen(true);
  }

  function navigate(href: string) {
    navigationPending.current = href !== pathname;
    dialogRef.current?.close();
  }

  // Keep Tab at the dialog edges instead of allowing focus into browser chrome.
  function containFocus(event: KeyboardEvent<HTMLDialogElement>) {
    if (event.key !== "Tab") return;
    const targets = event.currentTarget.querySelectorAll<HTMLElement>("button, a[href]");
    const first = targets[0];
    const last = targets[targets.length - 1];
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last?.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first?.focus();
    }
  }

  return (
    <nav className="flex items-center justify-between" aria-label="Main">
      <Link
        href="/"
        ref={homeRef}
        className="text-heading text-sm font-medium tracking-tight transition-colors hover:text-foreground"
      >
        {name}
      </Link>

      {/* Desktop nav */}
      <ul className="hidden gap-6 sm:flex">
        {NAV_ITEMS.map((item) => (
          <li key={item.href}>
            <Link
              href={item.href}
              aria-current={pathname === item.href ? "page" : undefined}
              className={`text-sm transition-colors hover:text-foreground ${
                pathname === item.href || pathname.startsWith(item.href + "/")
                  ? "text-foreground"
                  : "text-muted"
              }`}
            >
              {item.label}
            </Link>
          </li>
        ))}
      </ul>

      {/* Mobile hamburger */}
      <button
        ref={triggerRef}
        className="flex h-8 w-8 items-center justify-center sm:hidden"
        onClick={openMenu}
        type="button"
        aria-controls="mobile-navigation"
        aria-haspopup="dialog"
        aria-expanded={menuOpen}
        aria-label={menuOpen ? "Close menu" : "Open menu"}
      >
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          aria-hidden="true"
          fill="none"
          className="text-foreground"
        >
          {menuOpen ? (
            <path
              d="M3 3L13 13M13 3L3 13"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          ) : (
            <>
              <path
                d="M2 4H14"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
              <path
                d="M2 8H14"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
              <path
                d="M2 12H14"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </>
          )}
        </svg>
      </button>

      {/* Mobile menu overlay */}
      <dialog
        ref={dialogRef}
        id="mobile-navigation"
        aria-label="Main navigation"
        onClose={() => setMenuOpen(dialogRef.current?.open ?? false)}
        onKeyDown={containFocus}
        className="mobile-menu fixed inset-0 m-0 h-dvh max-h-none w-full max-w-none flex-col items-center justify-center border-0 bg-background p-0 text-foreground open:flex sm:hidden"
      >
        <button
          className="absolute right-6 top-8 flex h-8 w-8 items-center justify-center"
          onClick={() => dialogRef.current?.close()}
          type="button"
          aria-label="Close menu"
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            aria-hidden="true"
            fill="none"
            className="text-foreground"
          >
            <path
              d="M3 3L13 13M13 3L3 13"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </svg>
        </button>
        <ul className="flex flex-col items-center gap-8">
          <li>
            <Link
              href="/"
              aria-current={pathname === "/" ? "page" : undefined}
              className="text-lg text-foreground"
              onNavigate={() => navigate("/")}
            >
              {homeLabel}
            </Link>
          </li>
          {NAV_ITEMS.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                aria-current={pathname === item.href ? "page" : undefined}
                className={`text-lg ${
                  pathname === item.href ||
                  pathname.startsWith(item.href + "/")
                    ? "text-foreground"
                    : "text-muted"
                }`}
                onNavigate={() => navigate(item.href)}
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </dialog>
    </nav>
  );
}
