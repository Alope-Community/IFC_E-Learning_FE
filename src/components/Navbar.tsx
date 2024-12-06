import { useLogout } from "@/hooks/authentication";
import { IconLogout } from "justd-icons";
import React from "react";

export default function NavbarComponent() {
  const { logout } = useLogout();

  return (
    <nav className="flex justify-between items-center xl:px-20 md:px-10 px-5 bg-white py-5 shadow fixed top-0 left-0 right-0 z-50">
      <div className="flex-1">
        <h2 className="text-xl font-medium">
          <span className="text-indigo-500">E</span>-Course
        </h2>
      </div>
      <div className="flex-1 justify-center flex">
        <ul className="flex gap-7">
          <li>
            <a
              href=""
              className="after:content-[''] after:bottom-0 after:h-[5px] after:bg-indigo-500 after:absolute after:rounded-full relative pb-2 hover:after:w-[5px] active:after:w-[15px] after:transition-all after:duration-500 after:left-1/2 after:-translate-x-1/2 after:w-full after:left-0 after:right-0 after:transition-all after:duration-500"
            >
              Home
            </a>
          </li>
          <li>
            <a
              href=""
              className="after:content-[''] after:bottom-0 after:h-[5px] after:bg-indigo-500 after:absolute after:rounded-full relative pb-2 hover:after:w-[5px] active:after:w-[15px] after:transition-all after:duration-500 after:left-1/2 after:-translate-x-1/2"
            >
              Course
            </a>
          </li>
          <li>
            <a
              href=""
              className="after:content-[''] after:bottom-0 after:h-[5px] after:bg-indigo-500 after:absolute after:rounded-full relative pb-2 hover:after:w-[5px] active:after:w-[15px] after:transition-all after:duration-500 after:left-1/2 after:-translate-x-1/2"
            >
              Teacher
            </a>
          </li>
        </ul>
      </div>
      <div className="flex-1 flex justify-end">
        <button
          className="flex gap-2 px-3 py-2 rounded text-sm text-red-500 items-center"
          onClick={logout}
        >
          <IconLogout className="text-red-500 size-5" />
          Logout
        </button>
      </div>
    </nav>
  );
}
