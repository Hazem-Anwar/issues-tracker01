"use client";
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { IconBug } from "@tabler/icons-react";
import classnames from "classnames";
const Navbar = () => {
  const currentPage = usePathname();
  console.log(currentPage);
  const Links = [
    { label: "Dashboard", href: "/" },
    { label: "Issues", href: "/issues" },
  ];
  return (
    <div>
      <nav className="bg-white shadow-sm mb-10  py-3">
        <div className="container mx-auto flex justify-between items-center">
          <Link href="/" className="text-xl font-bold text-blue-600">
            <IconBug color="#000" size={38} />
          </Link>

          <div className="space-x-6">
            <ul className="flex items-center">
              {Links.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className={classnames({
                      "text-dark": link.href === currentPage,
                      "text-gray-400": link.href !== currentPage,
                      "hover:text-gray-900 ms-8 font-medium transition-colors":
                        true,
                    })}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
