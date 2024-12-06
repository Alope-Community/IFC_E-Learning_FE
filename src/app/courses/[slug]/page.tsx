"use client";

import { getCourseBySlug } from "@/api/Courses";
import { Course } from "@/models/Course";
import formatDate from "@/tools/dateFormatter";
import { useQuery } from "@tanstack/react-query";
import { IconCalendarFill, IconPeopleFill } from "justd-icons";
import {
  IconCalendar,
  IconCalendarFill,
  IconPeopleFill,
  IconPerson,
} from "justd-icons";
import React from "react";

interface DetailCourseParam {
  slug: string;
}

export default function DetailCoursePage({
  params: paramsPromise,
}: {
  params: Promise<DetailCourseParam>;
}) {
  const params = React.use(paramsPromise);
  const { slug } = params;

  const { data } = useQuery<Course>({
    queryKey: ["courses", slug],
    queryFn: () => getCourseBySlug(slug),
    enabled: !!slug,
  });

  return (
    <div className="xl:px-20 md:px-10 px-5">
      <section className="bg-indigo-500 h-[300px] w-full rounded-md mt-10 mx-auto flex items-end p-5 text-white">
        <div>
          <h1 className="text-3xl font-semibold uppercase mb-3">
            {data?.title}
      <section className="relative bg-[url('https://images.unsplash.com/photo-1524311583145-d5593bd3502a?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')] bg-cover h-[300px] w-full rounded-md mt-10 mx-auto flex items-end p-5 text-white">
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent rounded-md"></div>
        <div className="relative z-10">
          <h1 className="text-3xl font-bold uppercase mb-3">
            MATKUL INDONESIA Kelas XII RPL
          </h1>
          <p className="text-xl text-gray-100">{data?.category.title}</p>
          <p className="text-xl font-semibold text-gray-100">
            Taufan Hidayatul Akbar
          </p>
        </div>
      </section>

      <section className="grid xl:grid-cols-4 mt-10 gap-5">
        <div className="relative">
          <div className="border p-4 rounded bg-white sticky top-5 w-full">
            <div className="flex gap-2 items-center mb-5">
              <IconPerson className="w-10 h-10" />
              <div>
                <p className="text-xl font-medium">{data?.user.name}</p>
                <p className="text-sm text-gray-800 italic">
                  {data?.user.nuptk}
                </p>

              </div>
            </div>
            <div className="flex xl:flex-col md:flex-row flex-col gap-5 justify-between xl:items-start items-center">
              <div className="w-full">
                <p className="text-sm italic text-gray-800 mb-5">
                  <span className="flex gap-1 items-center">
                    <IconCalendarFill className="size-5" />
                    Dibuat Pada :
                  </span>
                  <span className="text-base text-gray-900 not-italic">
                    {formatDate(
                      data?.created_at || "2024-12-05T06:48:34.000000Z"
                    )}
                  </span>
                </p>
                <p className="text-sm italic text-gray-800">
                  <span className="flex gap-1 items-center">
                    <IconPeopleFill className="size-5" />
                    Diikuti Oleh :
                  </span>
                  <span className="text-base text-gray-900 not-italic">
                    200+ Siswa
                  </span>
                </p>
              </div>
              <div className="w-full">
                <button className="bg-indigo-500 hover:bg-indigo-400 w-full rounded text-white mt-5 py-3 px-8 transition-all duration-300 ease-in-out transform hover:scale-105">
                  Gabung Kelas
                </button>
              </div>
            </div>
          </div>
        </div>
        <div
          className="xl:col-span-3 bg-white p-8 rounded shadow"
          dangerouslySetInnerHTML={{ __html: data?.body || "" }}
        ></div>
      </section>
    </div>
  );
}
