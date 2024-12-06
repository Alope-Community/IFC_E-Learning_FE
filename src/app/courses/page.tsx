"use client";
import { getCategories } from "@/api/Categories";
import MasterLayout from "@/layouts/master";
import { Category } from "@/models/Category";
import { useQuery } from "@tanstack/react-query";
import { IconSearch } from "justd-icons";
import React from "react";

export default function CoursePage() {
  const { data: categories, isLoading: loadingGetCategories } = useQuery<
    Category[]
  >({
    queryKey: ["categories"],
    queryFn: () => getCategories(),
  });

  console.log(categories);

  return (
    <MasterLayout>
      <div className="bg-indigo-500 h-[300px] flex flex-col items-center justify-center mt-16 text-white">
        <h2 className="text-4xl font-medium">E-COURSE</h2>
        <p className="text-gray-100 mt-3">Learning Platform For You</p>
      </div>
      <section className="grid grid-cols-4 xl:px-20 md:px-10 px-5 mt-10 gap-10">
        <div className="relative">
          <div className="bg-white rounded shadow-sm p-5 sticky top-24">
            <div>
              <p>Search</p>
              <div className="relative">
                <input
                  type="text"
                  className="w-full py-2 rounded px-3 border bg-gray-50"
                  placeholder="Search..."
                />
                <button className="bg-indigo-500 hover:bg-indigo-400 absolute right-0 top-0 bottom-0 w-[40px] rounded-r flex items-center justify-center text-white">
                  <IconSearch />
                </button>
              </div>
            </div>
            <div className="mt-6">
              <p>Category</p>
              <div className="border p-3 rounded mt-2">
                <ul>
                  {loadingGetCategories ? (
                    <p>Loading...</p>
                  ) : (
                    categories?.map((category) => (
                      <li
                        key={category.id}
                        className="flex items-center gap-2 mb-2"
                      >
                        <input type="checkbox" id="category-a" />
                        <label htmlFor="category-a" className="text-sm">
                          {category.title}
                        </label>
                      </li>
                    ))
                  )}
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="col-span-3 grid grid-cols-3 gap-5">
          <div className="col-span-3 bg-white shadow-sm py-5 px-4 rounded flex items-center justify-between">
            <div>
              <p>
                Menemukan{" "}
                <span className="font-medium text-indigo-500">300</span>{" "}
                Pelajaran
              </p>
            </div>
            <div>
              <div className="flex gap-3 items-center">
                <label htmlFor="">Sort By :</label>
                <select className="bg-gray-100 px-3 py-2 rounded" name="" id="">
                  <option value="">(Default)</option>
                </select>
              </div>
            </div>
          </div>
          <div>
            <div className="bg-white rounded-lg shadow overflow-hidden">
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ1DmLCy9PSJfFqO55mNTYOQLx3x8THsbokkw&s"
                alt="Course"
                className="w-full"
              />
              <div className="p-5">
                <a href="#" className="block">
                  <h4 className="font-medium text-xl text-ellipsis max-w-full">
                    Hello
                  </h4>
                </a>
                <p className="text-gray-600 transition-all duration-300 mt-3 text-sm">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Reiciendis, eius eaque beatae ipsum fuga natus perferendis non
                  facere, ad officiis voluptas unde? Cum labore tenetur laborum.
                  Dolores iure nam unde?
                </p>
                <a
                  href={`/courses/`}
                  className="py-2 bg-indigo-500 hover:bg-indigo-400 w-full mt-5 flex justify-center text-white rounded-md"
                >
                  Lihat Kelas
                </a>
              </div>
            </div>
          </div>
          <div>
            <div className="bg-white rounded-lg shadow overflow-hidden">
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ1DmLCy9PSJfFqO55mNTYOQLx3x8THsbokkw&s"
                alt="Course"
                className="w-full"
              />
              <div className="p-5">
                <a href="#" className="block">
                  <h4 className="font-medium text-xl text-ellipsis max-w-full">
                    Hello
                  </h4>
                </a>
                <p className="text-gray-600 transition-all duration-300 mt-3 text-sm">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Reiciendis, eius eaque beatae ipsum fuga natus perferendis non
                  facere, ad officiis voluptas unde? Cum labore tenetur laborum.
                  Dolores iure nam unde?
                </p>
                <a
                  href={`/courses/`}
                  className="py-2 bg-indigo-500 hover:bg-indigo-400 w-full mt-5 flex justify-center text-white rounded-md"
                >
                  Lihat Kelas
                </a>
              </div>
            </div>
          </div>
          <div>
            <div className="bg-white rounded-lg shadow overflow-hidden">
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ1DmLCy9PSJfFqO55mNTYOQLx3x8THsbokkw&s"
                alt="Course"
                className="w-full"
              />
              <div className="p-5">
                <a href="#" className="block">
                  <h4 className="font-medium text-xl text-ellipsis max-w-full">
                    Hello
                  </h4>
                </a>
                <p className="text-gray-600 transition-all duration-300 mt-3 text-sm">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Reiciendis, eius eaque beatae ipsum fuga natus perferendis non
                  facere, ad officiis voluptas unde? Cum labore tenetur laborum.
                  Dolores iure nam unde?
                </p>
                <a
                  href={`/courses/`}
                  className="py-2 bg-indigo-500 hover:bg-indigo-400 w-full mt-5 flex justify-center text-white rounded-md"
                >
                  Lihat Kelas
                </a>
              </div>
            </div>
          </div>
          <div>
            <div className="bg-white rounded-lg shadow overflow-hidden">
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ1DmLCy9PSJfFqO55mNTYOQLx3x8THsbokkw&s"
                alt="Course"
                className="w-full"
              />
              <div className="p-5">
                <a href="#" className="block">
                  <h4 className="font-medium text-xl text-ellipsis max-w-full">
                    Hello
                  </h4>
                </a>
                <p className="text-gray-600 transition-all duration-300 mt-3 text-sm">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Reiciendis, eius eaque beatae ipsum fuga natus perferendis non
                  facere, ad officiis voluptas unde? Cum labore tenetur laborum.
                  Dolores iure nam unde?
                </p>
                <a
                  href={`/courses/`}
                  className="py-2 bg-indigo-500 hover:bg-indigo-400 w-full mt-5 flex justify-center text-white rounded-md"
                >
                  Lihat Kelas
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </MasterLayout>
  );
}
