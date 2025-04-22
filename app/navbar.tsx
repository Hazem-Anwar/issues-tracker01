import React from "react";
import Link from "next/link";
import { IconBug } from "@tabler/icons-react";
const Navbar = () => {
  const Links = [
    { label: "Dashboard", href: "/" },
    { label: "Issues", href: "" },
  ];
  return (
    <div>
      <nav className="bg-white shadow-sm px-8 py-3">
        <div className="container mx-auto flex justify-between items-center">
          <Link href="/" className="text-xl font-bold text-blue-600">
            <IconBug color="#000" size={38} />
          </Link>

          <div className="space-x-6">
            <ul className="flex items-center">
              {Links.map((link) => (
                <li>
                  <Link
                    href={link.href}
                    className="text-gray-600 hover:text-gray-900 ms-8"
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
