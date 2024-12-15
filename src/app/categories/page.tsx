"use client";
import { getCategories } from "@/api/Categories";
import MasterLayout from "@/layouts/master";
import { Category } from "@/models/Category";
import { useQuery } from "@tanstack/react-query";
import { IconLoader } from "justd-icons";
import React from "react";

export default function CategoriesPage() {
  const { data: categories, isLoading: loadingGetCategories } = useQuery<
    Category[]
  >({
    queryKey: ["categories"],
    queryFn: () => getCategories({ limit: 1000 }),
  });

  return (
    <MasterLayout>
      <div className="relative bg-gradient-to-r from-indigo-500 to-purple-500 h-[300px] bg-cover bg-center flex flex-col items-center justify-center mt-16 text-white">
        {/* <div className="absolute inset-0 bg-black opacity-70"></div> */}

        <div className="relative z-10 text-center">
          <h2 className="text-4xl font-medium">Jelajahi Kategori</h2>
          <p>
            Temukan berbagai kategori pembelajaran inspiratif di EduVerse dan
            mulai perjalanan belajarmu hari ini!
          </p>
        </div>
      </div>

      <section className="grid xl:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 xl:px-20 md:px-10 px-5 mt-10 xl:gap-10 md:gap-5 gap-3">
        {loadingGetCategories ? (
          <div className="bg-gray-200 xl:col-span-4 md:col-span-3 sm:col-span-2 px-5 py-10 rounded-md flex flex-col justify-center items-center">
            <IconLoader className="size-7" />
            <p className="font-medium text-xl mt-1">Loading ...</p>
            <small className="text-sm text-gray-800 mt-3">
              Harap Tunggu Sebentar
            </small>
          </div>
        ) : (
          categories?.map((category) => (
            <div
              key={category.id}
              className="bg-white border-l-2 border-indigo-500 rounded-lg shadow overflow-hidden"
            >
              <div className="p-5">
                <h4 className="font-medium text-xl text-ellipsis max-w-full">
                  {category.title}
                </h4>
                <p className="text-gray-600 transition-all duration-300 mt-3 text-sm">
                  {category.description}
                </p>
              </div>
            </div>
          ))
        )}
      </section>
    </MasterLayout>
  );
}
