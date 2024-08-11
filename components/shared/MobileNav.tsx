"use client";

import Link from "next/link";
import React from "react";
import Image from "next/image";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { navLinks } from "@/constants";
import { usePathname } from "next/navigation";
import { Button } from "../ui/button";

const MobileNav = () => {
  const pathname = usePathname();
  return (
    <header className="header">
      <Link href="/" className="flex items-center gap-2 md:py-2">
        <Image
          src="assets/images/logo-text.svg"
          alt="Logo"
          width={180}
          height={28}
        />
      </Link>

      <nav className="flex gap-2">
        <SignedIn>
          <UserButton />

          <Sheet>
            <SheetTrigger>
              <Image
                src="/assets/icons/menu.svg"
                alt="menu"
                width={32}
                height={32}
                className="cursor-pointer"
              />
            </SheetTrigger>

            <SheetContent className="sheet-content sm:w-64">
              <>
                <Image
                  src="assets/images/logo-text.svg"
                  alt="Logo"
                  width={152}
                  height={23}
                />

                <ul className="header-nav-elements">
                  {navLinks.map(({ label, route, icon }) => {
                    const isActive = route === pathname;
                    return (
                      <li
                        key={route}
                        className={`padding-18 flex whitespace-nowrap text-dark-700  ${
                          isActive && "gradient-text"
                        }`}
                      >
                        <Link
                          className="sidebar-link cursor-pointer"
                          href={route}
                        >
                          <Image
                            src={icon}
                            alt="logo"
                            width={24}
                            height={24}
                            className={`${isActive} && 'brightness-200`}
                          />
                          {label}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </>
            </SheetContent>
          </Sheet>
        </SignedIn>

        <SignedOut>
            <Button asChild className="button bg-purple-gradient bg-cover">
              <Link href="/sign-in">Login</Link>
            </Button>
          </SignedOut>
      </nav>
    </header>
  );
};

export default MobileNav;
