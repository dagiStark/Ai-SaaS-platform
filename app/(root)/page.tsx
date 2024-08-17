import { navLinks } from "@/constants";
import Link from "next/link";
import React from "react";

const Home = () => {
  return (
    <>
      <section className="home">
        <h1 className="home-heading">
          Unleash your creative vision with Imaginify
        </h1>
        <ul className="flex-center w-full gap-20">
          {navLinks.slice(1, 5).map((link) => (
            <Link
              key={link.route}
              href={link.route}
              className="flex-center flex-col gap-2"
            >
              <li></li>
              <p>{link.label}</p>
            </Link>
          ))}
        </ul>
      </section>
    </>
  );
};

export default Home;
