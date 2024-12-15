"use client";
import { getCategories } from "@/api/Categories";
import { getCourses } from "@/api/Courses";
import CourseCard from "@/components/CourseCard";
import AppLayout from "@/layouts/app";
import { Category } from "@/models/Category";
import { Course } from "@/models/Course";
import { useQuery } from "@tanstack/react-query";
import {
  IconBookOpenFill,
  IconChartPresentation2Fill,
  IconInboxEmptyFill,
  IconLoader,
  IconPlayFill,
  IconX,
} from "justd-icons";
import Link from "next/link";
import { useEffect, useState } from "react";

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

  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    if (isModalOpen) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }

    // Cleanup ketika komponen unmount
    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, [isModalOpen]);

  return (
    <>
      <AppLayout>
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
                <Link
                  href="/courses"
                  className="bg-indigo-500 hover:bg-indigo-400 md:px-7 px-5 py-3 rounded text-white md:text-base text-sm"
                >
                  Mulai Kelas
                </Link>
              </div>
              <button onClick={openModal} className="flex gap-2 items-center">
                <span className="md:size-10 size-8 bg-indigo-500 inline-flex items-center justify-center rounded-full text-white">
                  <IconPlayFill className="size-4" />
                </span>
                Tentang E-Course
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
            <p className="mt-3 text-gray-700 md:w-1/2 mb-5">
              Belajar tanpa batas, bangun keterampilan! Kami menyediakan berbagai materi edukatif, mulai dari teknologi, pemrograman, hingga materi umum lainnya yang mudah dipahami untuk semua kalangan.
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
              Eduverse - Learning Beyond Boundaries
            </h3>
            <p className="text-gray-800 mt-5">
              Menghadirkan pengalaman belajar yang luas layaknya semesta, Eduverse dirancang untuk menggabungkan pendidikan berkualitas dengan akses global, menciptakan ruang belajar tanpa batas yang modern dan inklusif.
            </p>
            <div className="my-10">
              <div className="flex items-center gap-5 mb-5">
                <span className="bg-indigo-500 size-10 flex items-center justify-center text-white text-xl rounded-full">
                  1
                </span>
                <p className="w-11/12 text-sm text-gray-800">
                  Menghapus batasan geografis dan memberikan akses bagi siapa saja untuk menikmati pendidikan berkualitas di mana pun berada.
                </p>
              </div>
              <div className="flex items-center gap-5 mb-5">
                <span className="bg-indigo-500 size-10 flex items-center justify-center text-white text-xl rounded-full">
                  2
                </span>
                <p className="w-11/12 text-sm text-gray-800">
                  Menyediakan berbagai jenis materi pembelajaran, mulai dari pemrograman, ilmu umum, hingga pengembangan keterampilan profesional.
                </p>
              </div>
              <div className="flex items-center gap-5 mb-5">
                <span className="bg-indigo-500 size-10 flex items-center justify-center text-white text-xl rounded-full">
                  3
                </span>
                <p className="w-11/12 text-sm text-gray-800">
                  Dengan teknologi canggih, Eduverse memberikan fleksibilitas, kenyamanan, dan pengalaman belajar yang interaktif.
                </p>
              </div>
              <div className="flex items-center gap-5 mb-5">
                <span className="bg-indigo-500 size-10 flex items-center justify-center text-white text-xl rounded-full">
                  4
                </span>
                <p className="w-11/12 text-sm text-gray-800">
                  Membangun jaringan pembelajar dari seluruh dunia, memungkinkan kolaborasi dan pertukaran ide secara luas.
                </p>
              </div>
            </div>
            <div>
            <Link
              href="/courses"
              className="bg-indigo-500 hover:bg-indigo-400 md:px-5 px-4 py-2 rounded text-white md:text-base text-xs inline-flex items-center gap-2"
            >
              Lihat Semua Kelas
            </Link>
            </div>
          </div>
        </section>
      </AppLayout>

      {isModalOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
          onClick={closeModal}
        >
          <div className="bg-white rounded-lg max-w-xl w-full overflow-hidden">
            <div className="relative pb-56.25">
              <iframe
                width="560"
                height="315"
                src="https://www.youtube.com/embed/WvmsN2VLUa8?si=Y1AHUlE7yJqyes9p"
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
              ></iframe>
            </div>
            <button
              onClick={closeModal}
              className="absolute top-5 right-5 bg-red-500 hover:bg-red-400 text-white w-[40px] h-[40px] flex items-center justify-center rounded-full"
            >
              <IconX />
            </button>
          </div>
        </div>
      )}
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
