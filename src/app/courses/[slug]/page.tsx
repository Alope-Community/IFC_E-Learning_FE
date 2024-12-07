"use client";

import { getCourseBySlug } from "@/api/Courses";
import { useJoinCourse, useLeaveCourse } from "@/hooks/userCourse";
import MasterLayout from "@/layouts/master";
import { Course } from "@/models/Course";
import formatDate from "@/tools/dateFormatter";
import { getUserId } from "@/utils/getUserId";
import { useQuery } from "@tanstack/react-query";
import { IconCalendarFill, IconPeopleFill } from "justd-icons";
import React, { FormEvent, useEffect, useState } from "react";

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

  const [userId, setUserId] = useState<number | null>(0);

  const { data, isLoading } = useQuery({
    queryKey: ["courses", slug, userId],
    queryFn: () => getCourseBySlug(slug, userId || 0),
    enabled: !!slug,
  });

  const mutationJoin = useJoinCourse();
  const mutationLeave = useLeaveCourse();

  const handleSubmitJoinCourse = async () => {
    mutationJoin.mutate({
      course_id: data?.data?.id || 0,
      user_id: userId || 0,
    });
  };

  const handleSubmitLeaveCourse = async () => {
    mutationLeave.mutate({
      course_id: data?.data?.id || 0,
      user_id: userId || 0,
    });
  };

  useEffect(() => {
    const id = getUserId();
    setUserId(id ? parseInt(id) : 0);
  }, []);

  return (
    <MasterLayout>
      {isLoading ? (
        <p className="mt-28">Loading ...</p>
      ) : (
        <div className="xl:px-20 md:px-10 px-5 mt-28">
          <section className="bg-indigo-500 h-[300px] w-full rounded-md mt-10 mx-auto flex items-end p-5 text-white">
            <div>
              <h1 className="text-3xl font-semibold uppercase mb-3">
                {data?.data?.title}
              </h1>
              <p className="text-xl text-gray-100">
                {data?.data?.category.title}
              </p>
            </div>
          </section>
          <section className="grid xl:grid-cols-4 mt-10 gap-5">
            <div className="relative">
              <div className="border p-4 rounded bg-white sticky top-5 w-full">
                <div className="flex gap-2 items-center mb-5">
                  <span className="w-[55px] h-[55px] rounded-full bg-indigo-500"></span>
                  <div>
                    <p className="text-xl font-medium">
                      {data?.data?.user.name}
                    </p>
                    <p className="text-sm text-gray-800 italic">
                      {data?.data?.user.nuptk}
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
                          data?.data?.created_at ||
                            "2024-12-05T06:48:34.000000Z"
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
                    {data.haveJoined ? (
                      <button
                        onClick={handleSubmitLeaveCourse}
                        className="bg-red-500 hover:bg-red-400 w-full rounded text-white mt-5 py-3"
                      >
                        Tinggalkan Kelas
                      </button>
                    ) : (
                      <button
                        onClick={handleSubmitJoinCourse}
                        className="bg-indigo-500 hover:bg-indigo-400 w-full rounded text-white mt-5 py-3 px-8"
                      >
                        Gabung Kelas
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
            <div
              className="xl:col-span-3 bg-white p-8 rounded shadow"
              dangerouslySetInnerHTML={{ __html: data?.data?.body || "" }}
            ></div>
          </section>
        </div>
      )}
    </MasterLayout>
  );
}
