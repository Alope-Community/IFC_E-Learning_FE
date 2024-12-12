"use client";

import { getCourseBySlug } from "@/api/Courses";
import Modal from "@/components/Modal";
import { useJoinCourse, useLeaveCourse } from "@/hooks/userCourse";
import MasterLayout from "@/layouts/master";
import { Submission } from "@/models/Submission";
import formatDate from "@/tools/dateFormatter";
import { getUserId } from "@/utils/getUserId";
import { useQuery } from "@tanstack/react-query";
import {
  IconBookOpenFill,
  IconCalendarFill,
  IconPeopleFill,
} from "justd-icons";
import React, { useEffect, useState } from "react";

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
  const [openModal, setOpenModal] = useState(false);

  const { data, isLoading } = useQuery({
    queryKey: ["courses", slug, userId],
    queryFn: () => getCourseBySlug(slug, userId || 0),
    enabled: !!slug,
  });

  const mutationJoin = useJoinCourse();
  const mutationLeave = useLeaveCourse();

  const handleSubmitJoinCourse = async () => {
    setOpenModal(!openModal);

    mutationJoin.mutate({
      course_id: data?.data?.id || 0,
      user_id: userId || 0,
    });
  };

  const handleSubmitLeaveCourse = async () => {
    setOpenModal(!openModal);

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
          <section
            className="bg-indigo-500 bg-[url('/assets/courses/cover2.jpg')] bg-cover h-[300px] w-full rounded-md mt-10 mx-auto flex items-end p-5 text-white overflow-hidden z-10 relative after:content-[''] after:absolute after:inset-0 after:bg-gradient-to-r from-indigo-500 to-indigo-500/30 after:-z-10"
            style={{ backgroundPositionY: -50 }}
          >
            <div>
              <h1 className="md:text-3xl text-2xl font-semibold uppercase mb-3">
                {data?.data?.title}
              </h1>
              <p className="md:text-xl text-sm text-gray-100">
                {data?.data?.category.title}
              </p>
            </div>
          </section>
          <section className="grid xl:grid-cols-4 mt-10 gap-5">
            <div className="relative">
              <div className="sticky top-10">
                <div className="border p-4 rounded bg-white w-full">
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
                          onClick={() => setOpenModal(!openModal)}
                          className="bg-red-500 hover:bg-red-400 w-full rounded text-white mt-5 py-3"
                        >
                          Tinggalkan Kelas
                        </button>
                      ) : (
                        <button
                          onClick={() => setOpenModal(!openModal)}
                          className="bg-indigo-500 hover:bg-indigo-400 w-full rounded text-white mt-5 py-3 px-8"
                        >
                          Gabung Kelas
                        </button>
                      )}
                    </div>
                  </div>
                </div>
                <div className="bg-white mt-5 p-5 rounded border">
                  <h4 className="font-medium mb-4 flex items-center gap-3">
                    <IconBookOpenFill />
                    Submissions
                  </h4>
                  <ul className="list-decimal pl-5">
                    {data.data.submission.map((row: Submission) => (
                      <li key={row.id} className="text-sm mb-2">
                        <a href={`#ID${row.id}`}>{row.title}</a>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
            <div className="xl:col-span-3">
              <div className="bg-white p-5 rounded shadow w-full">
                <div
                  dangerouslySetInnerHTML={{ __html: data?.data?.body || "" }}
                ></div>
                <hr className="my-10" />
                <div>
                  {data.data.submission.map((row: Submission) => (
                    <div
                      key={row.id}
                      className="mb-10 scroll-mt-20"
                      id={`ID${row.id}`}
                    >
                      <h5 className="font-medium text-xl mb-2 flex items-center gap-3">
                        <IconBookOpenFill />
                        {row.title}
                      </h5>
                      <p className="mb-5 text-sm">
                        Batas Akhir: {row.deadline}
                      </p>
                      <p className="mb-4">{row.description}</p>
                      <h5 className="font-semibold">Jawab: </h5>
                      <form action="">
                        <textarea
                          name=""
                          id=""
                          className="border rounded w-full h-[150px] p-2"
                        ></textarea>
                        <input type="file" />
                        <button className="block bg-indigo-500 hover:bg-indigo-400 py-2 rounded w-full text-white mt-5">
                          Submit
                        </button>
                      </form>
                      <hr className="my-10" />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>
        </div>
      )}

      <Modal
        isOpen={openModal}
        message={
          data?.haveJoined
            ? "Apakah anda yakin ingin keluar kelas?"
            : "Apakah anda yakin ingin gabung kelas ini?"
        }
        onConfirm={
          data?.haveJoined ? handleSubmitLeaveCourse : handleSubmitJoinCourse
        }
        onClose={() => setOpenModal(!openModal)}
        confirmBtnClassname={
          data?.haveJoined
            ? "hover:bg-red-800 bg-red-500 text-white px-4 py-2 rounded"
            : "hover:bg-indigo-800 bg-indigo-500 text-white px-4 py-2 rounded"
        }
      />
    </MasterLayout>
  );
}
