import { useLogout } from "@/hooks/authentication";
import { getUserData } from "@/utils/getUserData";
import { IconHamburger, IconLogout, IconX } from "justd-icons";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";

export default function NavbarComponent() {
  const { logout } = useLogout();
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen((prev) => !prev);
  };

  const pathname = usePathname();

  const [userData, setUserData] = useState({
    id: 0,
    name: "",
    email: "",
  });

  useEffect(() => {
    const tokenData = getUserData();
    setUserData({
      id: tokenData?.id ? parseInt(tokenData?.id) : 0,
      name: tokenData?.name || "",
      email: tokenData?.email || "",
    });
  }, []);

  return (
    <>
      <nav className="flex justify-between items-center xl:px-20 md:px-10 px-5 bg-white py-5 shadow fixed top-0 left-0 right-0 z-50">
        <div className="flex-1">
          <h2 className="text-xl font-medium">
            <span className="text-indigo-500">E</span>-Course
          </h2>
        </div>
        <div className="flex-1 justify-center md:flex hidden">
          <ul className="flex gap-7">
            <li>
              <Link
                href="/"
                className={`after:content-[''] after:bottom-0 after:h-[5px] after:bg-indigo-500 after:absolute after:rounded-full relative pb-2 hover:after:w-[5px] active:after:w-[15px] after:transition-all after:duration-500 after:left-1/2 after:-translate-x-1/2 ${
                  pathname == "/" &&
                  "after:w-full after:left-0 after:right-0 after:transition-all after:duration-500"
                }`}
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                href="/courses"
                className={`after:content-[''] after:bottom-0 after:h-[5px] after:bg-indigo-500 after:absolute after:rounded-full relative pb-2 hover:after:w-[5px] active:after:w-[15px] after:transition-all after:duration-500 after:left-1/2 after:-translate-x-1/2 ${
                  pathname.startsWith("/courses") &&
                  "after:w-full after:left-0 after:right-0 after:transition-all after:duration-500"
                }`}
              >
                Course
              </Link>
            </li>
            <li>
              <Link
                href=""
                className="after:content-[''] after:bottom-0 after:h-[5px] after:bg-indigo-500 after:absolute after:rounded-full relative pb-2 hover:after:w-[5px] active:after:w-[15px] after:transition-all after:duration-500 after:left-1/2 after:-translate-x-1/2"
              >
                Teacher
              </Link>
            </li>
          </ul>
        </div>
        <div className="flex-1 md:flex hidden justify-end gap-10">
          <button
            className="flex gap-2 px-3 py-2 rounded text-sm text-red-500 items-center"
            onClick={logout}
          >
            <IconLogout className="text-red-500 size-5" />
            Logout
          </button>
          {/*  */}
          <Link href={"/dashboard"} className="flex items-center gap-2">
            <span className="block size-[35px] bg-indigo-500 rounded-full"></span>
            <p className="text-sm font-medium">{userData.name}</p>
          </Link>
        </div>
        <div className="flex-1 md:hidden flex justify-end items-center">
          <button onClick={toggleMenu}>
            {menuOpen ? (
              <IconX className="text-gray-800 size-6" /> // Icon "X"
            ) : (
              <IconHamburger className="text-gray-800 size-6" /> // Icon Hamburger
            )}
          </button>
        </div>
      </nav>
      <section
        className={`bg-white fixed inset-0 z-40 flex items-center justify-center transform transition-transform duration-500 ${
          menuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <ul className="text-center">
          <li className="mb-5">
            <Link
              href="/"
              className={`text-xl after:content-[''] after:bottom-0 after:h-[5px] after:bg-indigo-500 after:absolute after:rounded-full relative pb-2 hover:after:w-[5px] active:after:w-[15px] after:transition-all after:duration-500 after:left-1/2 after:-translate-x-1/2  ${
                pathname == "/" &&
                "after:w-full after:left-0 after:right-0 after:transition-all after:duration-500"
              }`}
            >
              Home
            </Link>
          </li>
          <li className="mb-5">
            <Link
              href="/courses"
              className={`text-xl after:content-[''] after:bottom-0 after:h-[5px] after:bg-indigo-500 after:absolute after:rounded-full relative pb-2 hover:after:w-[5px] active:after:w-[15px] after:transition-all after:duration-500 after:left-1/2 after:-translate-x-1/2  ${
                pathname.startsWith("/courses") &&
                "after:w-full after:left-0 after:right-0 after:transition-all after:duration-500"
              }`}
            >
              Course
            </Link>
          </li>
          <li className="mb-5">
            <Link
              href="/teachers"
              className={`text-xl after:content-[''] after:bottom-0 after:h-[5px] after:bg-indigo-500 after:absolute after:rounded-full relative pb-2 hover:after:w-[5px] active:after:w-[15px] after:transition-all after:duration-500 after:left-1/2 after:-translate-x-1/2  ${
                pathname.startsWith("/teacher") &&
                "after:w-full after:left-0 after:right-0 after:transition-all after:duration-500"
              }`}
            >
              Teacher
            </Link>
          </li>
          <li className="mt-10">
            <button
              className="flex gap-2 px-3 py-2 rounded text-xl text-red-500 items-center"
              onClick={logout}
            >
              <IconLogout className="text-red-500 size-5" />
              Logout
            </button>
          </li>
        </ul>
      </section>
    </>
  );
}
