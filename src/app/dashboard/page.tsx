"use client";
import getDashboard from "@/api/Dashboard";
import CourseCard from "@/components/CourseCard";
import { useLogout } from "@/hooks/authentication";
import MasterLayout from "@/layouts/master";
import limitStr from "@/tools/limitStr";
import { getUserData } from "@/utils/getUserData";
import { useQuery } from "@tanstack/react-query";
import {
  IconInboxEmptyFill,
  IconLoader,
  IconLogout,
  IconPencilBox,
} from "justd-icons";
import Link from "next/link";
import { useEffect, useState } from "react";
// import Link from "next/link";
// import React, { useState } from "react";

export default function DashboardPage() {
  const { logout } = useLogout();
  // const [currentPage, setCurrentPage] = useState(1);
  // const [searchVal, setSearchVal] = useState("");

  const [userData, setUserData] = useState({
    id: "",
    name: "",
    email: "",
    avatar: "",
  });

  useEffect(() => {
    const data = getUserData();
    setUserData({
      id: data?.id || "0",
      name: data?.name || "",
      email: data?.email || "",
      avatar: data?.avatar || "",
    });
  }, []);

  const { data, isLoading } = useQuery({
    queryKey: ["dashboard"],
    queryFn: () => getDashboard({ user_id: parseInt(userData.id) }),
  });

  // const handlePageChange = (page: number) => {
  //   setCurrentPage(page);
  // };

  return (
    <MasterLayout>
      <div className="bg-indigo-500 h-[300px] flex flex-col items-center justify-center mt-16 text-white">
        <h2 className="text-4xl font-medium">Dashboard</h2>
        {/* <p className="text-gray-100 mt-3">Kelas yang kamu ikuti</p> */}
      </div>
      <section className="grid xl:grid-cols-4 xl:px-20 md:px-10 px-5 mt-10 gap-10">
        <div className="relative">
          <div className="bg-white rounded shadow-sm sticky top-24 text-center overflow-hidden">
            <div className="p-5">
              <span className="w-[50px] h-[50px] bg-indigo-500 inline-flex rounded-full mb-3">
                {userData.avatar ? (
                  <img src={`/avatars/${userData.avatar}`} />
                ) : ""}
              </span>
              <h3>{userData.name}</h3>
              <p className="text-sm italic text-gray-800">{userData.email}</p>
            </div>
            <div className="p-5">
              <Link
                href="/profile"
                className="flex items-center justify-center gap-2 underline italic text-indigo-400"
              >
                <IconPencilBox />
                Edit Profile
              </Link>
            </div>
            <button
              className="flex justify-center mt-5 bg-red-500 w-full py-3 text-white items-center text-sm gap-2"
              onClick={logout}
            >
              <IconLogout />
              Logout
            </button>
          </div>
        </div>
        <div className="xl:col-span-3 grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-4">
          {isLoading ? (
            <div className="bg-gray-200 xl:col-span-3 sm:col-span-2 px-5 py-10 rounded-md flex flex-col justify-center items-center">
              <IconLoader className="size-7" />
              <p className="font-medium text-xl mt-1">Loading ...</p>
              <small className="text-sm text-gray-800 mt-3">
                Harap Tunggu Sebentar
              </small>
            </div>
          ) : (
            <>
              {data?.courses.length ? (
                data?.courses.map((course) => (
                  <div key={course.id}>
                    <CourseCard
                      id={course.id}
                      title={limitStr(course.title, 35)}
                      slug={course.slug}
                      description={limitStr(course.description, 100)}
                      teacher={course.user.name}
                      category={course.category.title}
                    />
                  </div>
                ))
              ) : (
                <div className="bg-gray-200 xl:col-span-3 px-5 py-10 rounded-md flex flex-col justify-center items-center">
                  <IconInboxEmptyFill className="size-7" />
                  <p className="font-medium text-xl mt-1">Kosong</p>
                  <small className="text-sm text-gray-800 mt-3">
                    Kamu belum masuk ke kelas manapun!
                  </small>
                </div>
              )}
            </>
          )}
          <div className="xl:col-span-3 flex justify-center mt-10">
            {/* <PaginationComponent
              currentPage={currentPage}
              totalPages={courses?.last_page || 0}
              onPageChange={handlePageChange}
            /> */}
          </div>
        </div>
      </section>
    </MasterLayout>
  );
}
