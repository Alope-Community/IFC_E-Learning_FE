"use client";
import { getCategories } from "@/api/Categories";
import { getCourses } from "@/api/Courses";
import CourseCard from "@/components/CourseCard";
import MasterLayout from "@/layouts/master";
import { Category } from "@/models/Category";
import { Course } from "@/models/Course";
import { useQuery } from "@tanstack/react-query";
import {
  IconBookOpenFill,
  IconChartPresentation2Fill,
  IconInboxEmptyFill,
  IconLoader,
  IconPlayFill,
} from "justd-icons";
import { useState } from "react";

export default function ProtectedPage() {
  const [selectedCategory, setSelectedCategory] = useState("");

  const { data, isLoading } = useQuery({
    queryKey: ["courses", selectedCategory],
    queryFn: () => getCourses({ limit: 4, category: selectedCategory }),
  });

  const { data: categories, isLoading: loadingGetCategories } = useQuery<
    Category[]
  >({
    queryKey: ["categories in home"],
    queryFn: () => getCategories({ limit: 4 }),
  });

  return (
    <>
      <MasterLayout>
        <header className="grid xl:grid-cols-2 gap-10 xl:px-20 md:px-10 px-5 items-center mt-24 mb-20">
          <div className="xl:order-1 order-2">
            <h2 className="md:text-3xl text-xl font-semibold md:leading-10">
              Belajar Tanpa Batas, Dimanapun dan Kapanpun. Langkah Kecil
              <span className="ml-2 relative z-10 after:content-[''] after:absolute after:h-3 after:bg-indigo-500 after:w-full after:bottom-0 after:left-0 after:-z-10 after:-rotate-1">
                Menuju Impian Besar
              </span>
              .
            </h2>
            <p className="mt-5 md:text-base text-sm">
              Belajar tanpa batas membuka peluang tak terbatas untuk berkembang.
              Dengan langkah kecil yang konsisten, kita dapat meraih impian
              besar, kapanpun dan dimanapun, dengan tekad, usaha, serta semangat
              pantang menyerah.
            </p>
            <div className="mt-10 flex md:gap-10 gap-8 items-center">
              <div>
                <a
                  href=""
                  className="bg-indigo-500 hover:bg-indigo-400 md:px-7 px-5 py-3 rounded text-white md:text-base text-sm"
                >
                  Mulai Kelas
                </a>
              </div>
              <button className="flex gap-2 items-center">
                <span className="md:size-10 size-8 bg-indigo-500 inline-flex items-center justify-center rounded-full text-white">
                  <IconPlayFill className="size-4" />
                </span>
                Play Now
              </button>
            </div>
          </div>
          <div className="grid 2xl:grid-cols-2 gap-5 relative order-1 xl:order-2">
            <div className="absolute bg-white xl:bottom-10 bottom-3 xl:-left-10 left-1/2 xl:-translate-x-0 -translate-x-1/2 p-3 rounded-xl shadow flex items-center gap-3 md:w-auto w-9/12">
              <div className="bg-indigo-500 size-12 flex items-center justify-center rounded-full">
                <IconChartPresentation2Fill className="text-white" />
              </div>
              <div>
                <p className="font-medium">200+ Penggguna</p>
                <p className="text-xs text-gray-800">
                  Telah mengambil kelas ini
                </p>
              </div>
            </div>

            <div className="row-span-2">
              <img
                src="/assets/headers/1.jpg"
                alt=""
                className="h-full object-cover rounded"
              />
            </div>
            <div className="2xl:block hidden">
              <img
                src="/assets/headers/2.jpg"
                alt=""
                className="h-full object-cover rounded"
              />
            </div>
            <div className="2xl:block hidden">
              <img
                src="/assets/headers/3.jpg"
                alt=""
                className="h-full object-cover rounded"
              />
            </div>
          </div>
        </header>
        {/*  */}
        <section className="grid xl:grid-cols-4 md:grid-cols-2 gap-5 xl:px-20 md:px-10 px-5 my-24">
          <div className="xl:col-span-4 md:col-span-2">
            <div className="flex items-center gap-3">
              <span className="bg-indigo-500 size-10 flex items-center justify-center rounded-full text-white">
                <IconBookOpenFill />
              </span>
              <h3 className="text-3xl font-medium">Pelajaran</h3>
            </div>
            <p className="mt-3 text-gray-700 text-sm md:w-1/2 mb-5">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni
              optio sit, itaque ipsa quaerat quasi quibusdam officia. Architecto
              cupiditate nam provident quis corrupti dolorem unde sapiente
              soluta. Veritatis, suscipit laudantium?
            </p>
          </div>
          <div className="xl:col-span-4 md:col-span-2 flex items-center gap-2">
            <button
              className={`${
                selectedCategory == ""
                  ? "bg-indigo-500 text-white px-5 py-2 rounded"
                  : "bg-gray-200"
              } md:px-5 py-2 px-3 rounded md:text-base text-xs`}
              onClick={() => setSelectedCategory("")}
            >
              All
            </button>
            {loadingGetCategories ? (
              <p>Loading...</p>
            ) : (
              categories?.map((category) => (
                <button
                  key={category.id}
                  className={`${
                    selectedCategory == category.slug
                      ? "bg-indigo-500 text-white px-5 py-2 rounded"
                      : "bg-gray-200"
                  } md:px-5 py-2 px-3 rounded md:text-base text-xs`}
                  onClick={() => setSelectedCategory(category.slug)}
                >
                  {category.title}
                </button>
              ))
            )}
          </div>
          {isLoading ? (
            <div className="bg-gray-200 col-span-4 px-5 py-10 rounded-md flex flex-col justify-center items-center">
              <IconLoader className="size-7" />
              <p className="font-medium text-xl mt-1">Loading ...</p>
              <small className="text-sm text-gray-800 mt-3">
                Harap Tunggu Sebentar
              </small>
            </div>
          ) : data?.data.length ? (
            data?.data.map((course: Course) => (
              <div key={course.id}>
                <CourseCard
                  id={course.id}
                  title={course.title}
                  slug={course.slug}
                  description={course.description}
                  teacher={course.user.name}
                  category={course.category.title}
                />
              </div>
            ))
          ) : (
            <div className="bg-gray-200 col-span-4 px-5 py-10 rounded-md flex flex-col justify-center items-center">
              <IconInboxEmptyFill className="size-7" />
              <p className="font-medium text-xl mt-1">Data Kosong</p>
              <small className="text-sm text-gray-800 mt-3">
                Kelas dengan Kategori {selectedCategory} kosong
              </small>
            </div>
          )}
        </section>
        {/*  */}
        <section className="grid xl:grid-cols-2 md:grid-cols-3 gap-10 bg-gray-100 md:px-0 px-5">
          <div className="relative md:block hidden">
            <img
              src="./../assets/1.jpg"
              alt=""
              className="absolute h-full md:w-full !w-screen z-10 object-cover top-10 md:block hidden"
            />
          </div>
          <div className="py-20 md:pr-20 xl:col-span-1 md:col-span-2">
            <h3 className="text-3xl font-semibold">
              WORLD - Class Learning For Anyone, Anywhere
            </h3>
            <p className="text-gray-800 mt-5">
              menghadirkan akses pendidikan terbaik tanpa batas geografis.
              Platform ini memadukan inovasi, fleksibilitas, dan kualitas,
              memungkinkan siapa saja belajar dengan mudah dan nyaman di mana
              pun.
            </p>
            <div className="my-10">
              <div className="flex items-center gap-5 mb-5">
                <span className="bg-indigo-500 size-10 flex items-center justify-center text-white text-xl rounded-full">
                  1
                </span>
                <p className="w-11/12 text-sm text-gray-800">
                  Pendidikan tersedia untuk siapa saja tanpa memandang lokasi,
                  latar belakang, atau batas geografis, mendukung inklusi global
                  dalam pembelajaran.
                </p>
              </div>
              <div className="flex items-center gap-5 mb-5">
                <span className="bg-indigo-500 size-10 flex items-center justify-center text-white text-xl rounded-full">
                  2
                </span>
                <p className="w-11/12 text-sm text-gray-800">
                  Materi dan metode pembelajaran yang inovatif dan berstandar
                  tinggi, dirancang untuk memberikan pengalaman belajar terbaik
                  bagi semua orang.
                </p>
              </div>
              <div className="flex items-center gap-5 mb-5">
                <span className="bg-indigo-500 size-10 flex items-center justify-center text-white text-xl rounded-full">
                  3
                </span>
                <p className="w-11/12 text-sm text-gray-800">
                  Pembelajaran yang dapat dilakukan kapan saja dan di mana saja,
                  memberikan kebebasan bagi pelajar untuk belajar sesuai
                  kebutuhan dan jadwal mereka.
                </p>
              </div>
            </div>
            <a
              href=""
              className="bg-indigo-500 hover:bg-indigo-400 md:px-7 px-5 py-3 rounded text-white md:text-base text-sm inline-flex items-center gap-2"
            >
              <IconPlayFill />
              Mulai Kelas
            </a>
          </div>
        </section>
      </MasterLayout>
    </>
    // <div>
    //   Welcome to the protected page!{" "}
    //   <button
    //     className="bg-red-500 text-white px-4 py-2 rounded"
    //     onClick={logout}
    //   >
    //     Logout
    //   </button>
    // </div>
  );
}
