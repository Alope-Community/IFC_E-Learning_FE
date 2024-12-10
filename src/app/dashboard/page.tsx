"use client";
import { getCategories } from "@/api/Categories";
import { getCourses } from "@/api/Courses";
import getDashboard from "@/api/Dashboard";
import CourseCard from "@/components/CourseCard";
import PaginationComponent from "@/components/Pagination";
import MasterLayout from "@/layouts/master";
import { Category } from "@/models/Category";
import limitStr from "@/tools/limitStr";
import { useQuery } from "@tanstack/react-query";
import { IconLoader, IconSearch } from "justd-icons";
import Link from "next/link";
import React, { useState } from "react";

export default function DashboardPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchVal, setSearchVal] = useState("");

  const { data, isLoading } = useQuery({
    queryKey: ["dashboard"],
    queryFn: () => getDashboard({ user_id: 5 }),
  });

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <MasterLayout>
      <div className="bg-indigo-500 h-[300px] flex flex-col items-center justify-center mt-16 text-white">
        <h2 className="text-4xl font-medium">Dashboard</h2>
        <p className="text-gray-100 mt-3">Learning Platform For You</p>
      </div>
      <section className="grid xl:grid-cols-4 xl:px-20 md:px-10 px-5 mt-10 gap-10">
        <div className="relative">
          <div className="bg-white rounded shadow-sm p-5 sticky top-24">
            <div>
              <p>Search</p>
              <div className="relative">
                <input
                  type="text"
                  className="w-full py-2 rounded px-3 border bg-gray-50"
                  placeholder="Search..."
                  onChange={(e) => setSearchVal(e.target.value)}
                />
                <button className="bg-indigo-500 hover:bg-indigo-400 absolute right-0 top-0 bottom-0 w-[40px] rounded-r flex items-center justify-center text-white">
                  <IconSearch />
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="xl:col-span-3 grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-4">
          {/* {!isLoading && (
            <div className="md:col-span-3 sm:col-span-2 bg-white shadow-sm py-5 px-4 rounded flex md:flex-row flex-col gap-5 items-center justify-between">
              <div>
                <p className="md:text-md text-sm">
                  Menemukan{" "}
                  <span className="font-medium text-indigo-500">
                    {data?.total}
                  </span>{" "}
                  Pelajaran
                </p>
              </div>
              <div>
                <div className="flex gap-3 items-center">
                  <label htmlFor="categories" className="md:text-md text-sm">
                    Sort By :
                  </label>
                  <select
                    className="bg-gray-100 px-3 py-2 rounded"
                    name=""
                    id="categories"
                  >
                    <option value="" className="md:text-base text-sm">
                      (Default)
                    </option>
                  </select>
                </div>
              </div>
            </div>
          )} */}
          {isLoading ? (
            <div className="bg-gray-200 xl:col-span-3 px-5 py-10 rounded-md flex flex-col justify-center items-center">
              <IconLoader className="size-7" />
              <p className="font-medium text-xl mt-1">Loading ...</p>
              <small className="text-sm text-gray-800 mt-3">
                Harap Tunggu Sebentar
              </small>
            </div>
          ) : (
            <>
              {data?.courses.map((course) => (
                <div key={course.id}>
                  <CourseCard
                    title={limitStr(course.title, 35)}
                    slug={course.slug}
                    description={limitStr(course.description, 100)}
                    teacher={course.user.name}
                    category={course.category.title}
                  />
                </div>
              ))}
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
