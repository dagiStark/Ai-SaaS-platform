"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { SignedIn, SignedOut } from "@clerk/nextjs";
import { navLinks } from "@/constants";
import { usePathname } from "next/navigation";
import { Button } from "../ui/button";
import { UserButton } from "@clerk/nextjs";

const Sidebar = () => {
  const pathname = usePathname();
  return (
    <aside className="sidebar">
      <div className="flex size-full flex-col gap-4">
        <Link href="/" className="sidebar-logo">
          <Image
            src="/assets/images/logo-text.svg"
            alt="logo"
            width={180}
            height={28}
          />
        </Link>

        <nav className="sidebar-nav">
          <SignedIn>
            <ul className="sidebar-nav-elements">
              {navLinks.slice(0, 6).map(({ label, route, icon }) => {
                const isActive = route === pathname;
                return (
                  <li
                    key={route}
                    className={`sidebar-nav-element group ${
                      isActive
                        ? "bg-purple-gradient text-white"
                        : "text-gray-700"
                    }`}
                  >
                    <Link className="sidebar-link cursor-pointer" href={route}>
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
            
            <ul className="sidebar-nav-elements">
              {navLinks.slice(6).map(({ label, route, icon }) => {
                const isActive = route === pathname;
                return (
                  <li
                    key={route}
                    className={`sidebar-nav-element group ${
                      isActive
                        ? "bg-purple-gradient text-white"
                        : "text-gray-700"
                    }`}
                  >
                    <Link className="sidebar-link cursor-pointer" href={route}>
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
              <li className="flex-center cursor-pointer gap-2 p-4">
                <UserButton showName />
              </li>
            </ul>
          </SignedIn>

          <SignedOut>
            <Button asChild className="button bg-purple-gradient bg-cover">
              <Link href="/sign-in">Login</Link>
            </Button>
          </SignedOut>
        </nav>
      </div>
    </aside>
  );
};

export default Sidebar;
