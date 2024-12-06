import React from "react";

export default function FooterComponent() {
  return (
    <footer className="bg-gray-900 text-white mt-20">
      <div className="grid grid-cols-1 xl:grid-cols-4 sm:grid-cols-2 gap-10 xl:px-20 md:px-10 px-5 py-12">
        <div className="text-center sm:text-left">
          <h2 className="text-2xl font-medium">Personal</h2>
          <hr className="mt-0 border-indigo-500 border-[2px] w-20 mb-3 sm:mx-0 mx-auto" />
          <ul className="space-y-3">
            <li className="text-gray-200 hover:text-gray-400 transition-colors">
              <a href="#">Digital Wallet</a>
            </li>
            <li className="text-gray-200 hover:text-gray-400 transition-colors">
              <a href="#">Finally Service</a>
            </li>
            <li className="text-gray-200 hover:text-gray-400 transition-colors">
              <a href="#">Lifestyle</a>
            </li>
          </ul>
        </div>
        <div className="text-center sm:text-left">
          <h2 className="text-2xl font-medium">Personal</h2>
          <hr className="mt-0 border-indigo-500 border-[2px] w-20 mb-3 sm:mx-0 mx-auto" />
          <ul className="space-y-3">
            <li className="text-gray-200 hover:text-gray-400 transition-colors">
              <a href="#">Digital Wallet</a>
            </li>
            <li className="text-gray-200 hover:text-gray-400 transition-colors">
              <a href="#">Finally Service</a>
            </li>
            <li className="text-gray-200 hover:text-gray-400 transition-colors">
              <a href="#">Lifestyle</a>
            </li>
          </ul>
        </div>
        <div className="text-center sm:text-left">
          <h2 className="text-2xl font-medium">Personal</h2>
          <hr className="mt-0 border-indigo-500 border-[2px] w-20 mb-3 sm:mx-0 mx-auto" />
          <ul className="space-y-3">
            <li className="text-gray-200 hover:text-gray-400 transition-colors">
              <a href="#">Digital Wallet</a>
            </li>
            <li className="text-gray-200 hover:text-gray-400 transition-colors">
              <a href="#">Finally Service</a>
            </li>
            <li className="text-gray-200 hover:text-gray-400 transition-colors">
              <a href="#">Lifestyle</a>
            </li>
          </ul>
        </div>
        <div className="text-center sm:text-left">
          <h2 className="text-2xl font-medium">Personal</h2>
          <hr className="mt-0 border-indigo-500 border-[2px] w-20 mb-3 sm:mx-0 mx-auto" />
          <ul className="space-y-3">
            <li className="text-gray-200 hover:text-gray-400 transition-colors">
              <a href="#">Digital Wallet</a>
            </li>
            <li className="text-gray-200 hover:text-gray-400 transition-colors">
              <a href="#">Finally Service</a>
            </li>
            <li className="text-gray-200 hover:text-gray-400 transition-colors">
              <a href="#">Lifestyle</a>
            </li>
          </ul>
        </div>
      </div>
      <hr className="border-t-2 border-gray-500 max-w-screen-xl mx-auto my-2 w-full" />
      <div className="xl:px-20 md:px-10 px-5 my-5 flex md:flex-row flex-col items-center gap-5">
        <h2 className="t">Download aplikasi kami di</h2>
        <a href="">
          <img
            src="https://a.m.dana.id/danaweb/v3/googleplay-download.svg"
            alt=""
          />
        </a>
        <a href="">
          <img
            src="https://a.m.dana.id/danaweb/v3/appstore-download.svg"
            alt=""
          />
        </a>
      </div>
      <div className="bg-gray-950 text-center py-4">
        <p className="text-sm font-medium text-gray-200">
          &copy; Alope. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
