"use client";
import { getCategories } from "@/api/Categories";
import { getCourses } from "@/api/Courses";
import CourseCard from "@/components/CourseCard";
import PaginationComponent from "@/components/Pagination";
import { useJoinCourse } from "@/hooks/userCourse";
import MasterLayout from "@/layouts/master";
import { Category } from "@/models/Category";
import limitStr from "@/tools/limitStr";
import { getUserId } from "@/utils/getUserId";
import { useQuery } from "@tanstack/react-query";
import { IconLoader, IconSearch, IconX } from "justd-icons";
import React, { useEffect, useState } from "react";

export default function CoursePage() {
  const [sortBy, setSortBy] = useState("default");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchVal, setSearchVal] = useState("");

  const { data: categories, isLoading: loadingGetCategories } = useQuery<
    Category[]
  >({
    queryKey: ["categories"],
    queryFn: () => getCategories({ limit: 1000 }),
  });

  const { data: courses, isLoading: loadingGetCourses } = useQuery({
    queryKey: ["courses", currentPage, searchVal, selectedCategories, sortBy],
    queryFn: () =>
      getCourses({
        limit: 10,
        page: currentPage,
        search: searchVal,
        categories: selectedCategories.join(","),
        sortBy,
      }),
  });

  const handlePageChange = (page: number) => {
    window.scrollTo(0, 0);
    setCurrentPage(page);
  };

  const handleCheckboxChange = (slug: string) => {
    setSelectedCategories(
      (prev) =>
        prev.includes(slug)
          ? prev.filter((category) => category !== slug) // Hapus kategori jika sudah ada
          : [...prev, slug] // Tambahkan kategori jika belum ada
    );
  };

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSortBy(e.target.value);
  };

  const resetFilter = () => {
    setSelectedCategories([]);
    setCurrentPage(1);
    setSearchVal("");
    setSortBy("default");
  };

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [classCode, setClassCode] = useState("");

  const mutationJoin = useJoinCourse();

  const [userId, setUserId] = useState<number | null>(0);
  useEffect(() => {
    const id = getUserId();
    setUserId(id ? parseInt(id) : 0);
  }, []);

  const handleJoinClass = async () => {
    setIsModalOpen(!isModalOpen);

    mutationJoin.mutate({
      code: classCode,
      user_id: userId || 0,
    });

    setClassCode("")
  };

  return (
    <MasterLayout>
      <div className="relative bg-[url('/assets/courses/cover1.jpg')] h-[300px] bg-cover bg-center flex flex-col items-center justify-center mt-16 text-white">
        {/* Overlay hitam */}
        <div className="absolute inset-0 bg-black opacity-70"></div>

        {/* Konten utama */}
        <div className="relative z-10 text-center">
          <h2 className="text-4xl font-medium">EduVerse</h2>
          <p className="text-gray-100 mt-3">Learning Beyond Boundaries</p>
          <button
            onClick={() => setIsModalOpen(true)}
            className="mt-10 bg-blue-500 px-4 py-2 rounded text-white hover:bg-blue-600"
          >
            Gabung dengan Kode
          </button>
        </div>
      </div>

      <section className="grid xl:grid-cols-4 xl:px-20 md:px-10 px-5 mt-10 gap-10">
        <div className="relative">
          <div className="bg-white rounded shadow-sm p-5 sticky top-24">
            <div>
              <p>Search</p>
              <div className="relative">
                <input
                  type="text"
                  value={searchVal}
                  className="w-full py-2 rounded px-3 border bg-gray-50"
                  placeholder="Search..."
                  onChange={(e) => setSearchVal(e.target.value)}
                />
                <button className="bg-indigo-500 hover:bg-indigo-400 absolute right-0 top-0 bottom-0 w-[40px] rounded-r flex items-center justify-center text-white">
                  <IconSearch />
                </button>
              </div>
            </div>
            <div className="mt-6">
              <p>Category</p>
              <div className="border p-3 rounded mt-2 md:max-h-[300px] max-h-[200px] overflow-y-auto">
                <ul className="grid xl:grid-cols-1 md:grid-cols-3 sm:grid-cols-2">
                  {loadingGetCategories ? (
                    <p>Loading...</p>
                  ) : (
                    categories?.map((category) => (
                      <li
                        key={category.id}
                        className="flex items-center gap-2 mb-2"
                      >
                        <input
                          type="checkbox"
                          id={`category-${category.slug}`}
                          checked={selectedCategories.includes(category.slug)} // Cek apakah kategori terpilih
                          onChange={() => handleCheckboxChange(category.slug)}
                        />
                        <label
                          htmlFor={`category-${category.slug}`}
                          className="text-sm"
                        >
                          {category.title}
                        </label>
                      </li>
                    ))
                  )}
                </ul>
              </div>
              {selectedCategories.length || searchVal ? (
                <button
                  className="w-full bg-red-500 hover:bg-red-400 py-2 rounded text-white mt-5"
                  onClick={resetFilter}
                >
                  Reset
                </button>
              ) : (
                ""
              )}
            </div>
          </div>
        </div>
        <div className="xl:col-span-3 grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-4">
          {!loadingGetCourses && (
            <div className="md:col-span-3 sm:col-span-2 bg-white shadow-sm py-5 px-4 rounded flex md:flex-row flex-col gap-5 items-center justify-between">
              <div>
                <p className="md:text-md text-sm">
                  Menemukan{" "}
                  <span className="font-medium text-indigo-500">
                    {courses?.total}
                  </span>{" "}
                  Pelajaran
                </p>
              </div>
              <div>
                <div className="flex gap-3 items-center">
                  <label htmlFor="categories" className="md:text-md text-sm">
                    Urut Berdasarkan :
                  </label>
                  <select
                    className="bg-gray-100 px-3 py-2 rounded"
                    name="sort by"
                    id="categories"
                    value={sortBy}
                    onChange={handleSortChange}
                  >
                    <option value="default" className="md:text-base text-sm">
                      Terbaru (Default)
                    </option>
                    <option value="oldest" className="md:text-base text-sm">
                      Terlama
                    </option>
                    <option value="name" className="md:text-base text-sm">
                      Nama
                    </option>
                  </select>
                </div>
              </div>
            </div>
          )}
          {loadingGetCourses ? (
            <div className="bg-gray-200 xl:col-span-3 col-span-4 px-5 py-10 rounded-md flex flex-col justify-center items-center">
              <IconLoader className="size-7" />
              <p className="font-medium text-xl mt-1">Loading ...</p>
              <small className="text-sm text-gray-800 mt-3">
                Harap Tunggu Sebentar
              </small>
            </div>
          ) : (
            <>
              {courses?.data.map((course) => (
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
              ))}
            </>
          )}
          <div className="xl:col-span-3 sm:col-span-2 flex justify-center mt-10">
            <PaginationComponent
              currentPage={currentPage}
              totalPages={courses?.last_page || 0}
              onPageChange={handlePageChange}
            />
          </div>
        </div>
      </section>

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white rounded-md p-6 w-[90%] max-w-md relative">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-5 right-5 text-gray-500 hover:text-gray-700"
            >
              <IconX />
            </button>
            <h3 className="text-xl font-medium mb-4">Masukkan Kode Kelas</h3>
            <input
              type="text"
              value={classCode}
              onChange={(e) => setClassCode(e.target.value)}
              className="w-full px-4 py-2 border rounded mb-4"
              placeholder="Contoh: ABC123"
            />
            <button
              onClick={handleJoinClass}
              className="w-full bg-blue-500 px-4 py-2 text-white rounded hover:bg-blue-600"
            >
              Gabung
            </button>
          </div>
        </div>
      )}
    </MasterLayout>
  );
}
