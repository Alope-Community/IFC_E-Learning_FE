"use client";

import { getCourseBySlug } from "@/api/Courses";
import { getSubmitSubmission } from "@/api/SubmitSubmission";
import Modal from "@/components/Modal";
import useSubmitSubmission from "@/hooks/submitSubmission";
import { useJoinCourse, useLeaveCourse } from "@/hooks/userCourse";
import MasterLayout from "@/layouts/master";
import { Submission } from "@/models/Submission";
import { SubmitSubmission } from "@/models/SubmitSubmission";
import formatDate from "@/tools/dateFormatter";
import timestampFormatter from "@/tools/timestampFormatter";
import { getUserId } from "@/utils/getUserId";
import { useQuery } from "@tanstack/react-query";
import {
  IconBookOpenFill,
  IconCalendarFill,
  IconFileDownloadFill,
  IconHand5Fill,
  IconLoader,
  IconPeopleFill,
} from "justd-icons";
import React, { FormEvent, useEffect, useState } from "react";

interface DetailCourseParam {
  slug: string;
}

type FormData = {
  submissionId: number;
  body: string;
  file: File | null; // Izinkan file menjadi null
};

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

  const { data: submitSubmissions, isLoading: loadingGetSubmitSubmission } =
    useQuery({
      queryKey: ["submit-submission", slug, userId],
      queryFn: () =>
        getSubmitSubmission({ user_id: userId || 0, course_slug: slug }),
      enabled: !!slug,
    });

  const mutationJoin = useJoinCourse();
  const mutationLeave = useLeaveCourse();
  const mutationSubmitSubmission = useSubmitSubmission();

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

  const [formData, setFormData] = useState<FormData>({
    submissionId: 0,
    body: "",
    file: null,
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;

    setFormData((prevData) => ({
      ...prevData,
      file,
    }));
  };

  const handleSubmitSubmission = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.target as HTMLFormElement;
    const submissionID = form.submissionID as HTMLInputElement;

    setFormData({
      ...formData,
      submissionId: parseInt(submissionID.value),
    });

    const formSubmitData = new FormData();

    formSubmitData.append("user_id", userId ? userId.toString() : "");
    formSubmitData.append("file", formData.file ? formData.file : "");
    formSubmitData.append("body", formData.body ? formData.body : "");
    formSubmitData.append(
      "submission_id",
      formData.submissionId
        ? formData.submissionId.toString()
        : submissionID.value
    );

    mutationSubmitSubmission.mutate(formSubmitData);
  };

  // Check if data from both queries is loaded
  if (isLoading || loadingGetSubmitSubmission) {
    return (
      <MasterLayout>
        <div className="xl:px-20 md:px-10 px-5 mt-28">
          <div className="bg-gray-200 xl:col-span-3 px-5 py-10 rounded-md flex flex-col justify-center items-center">
            <IconLoader className="size-7" />
            <p className="font-medium text-xl mt-1">Loading ...</p>
            <small className="text-sm text-gray-800 mt-3">
              Harap Tunggu Sebentar
            </small>
          </div>
        </div>
      </MasterLayout>
    );
  }

  // Check if both datasets are available
  if (!data?.data?.submission || !submitSubmissions) {
    return <p>No data available.</p>;
  }

  const matchedSubmissions = submitSubmissions.filter(
    (item1: SubmitSubmission) =>
      data.data.submission.some(
        (item2: SubmitSubmission) => item1.submission_id === item2.id
      )
  );

  return (
    <MasterLayout>
      {isLoading ? (
        <div className="xl:px-20 md:px-10 px-5 mt-28">
          <div className="bg-gray-200 xl:col-span-3 px-5 py-10 rounded-md flex flex-col justify-center items-center">
            <IconLoader className="size-7" />
            <p className="font-medium text-xl mt-1">Loading ...</p>
            <small className="text-sm text-gray-800 mt-3">
              Harap Tunggu Sebentar
            </small>
          </div>
        </div>
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
                          {data.data.users.length} Siswa
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
                {data.data.submission.length ? (
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
                ) : (
                  ""
                )}
              </div>
            </div>
            <div className="xl:col-span-3">
              {data.haveJoined ? (
                <div className="bg-white p-5 rounded shadow w-full">
                  <div
                    dangerouslySetInnerHTML={{ __html: data?.data?.body || "" }}
                  ></div>
                  {data.data.submission.length ? (
                    <>
                      <hr className="my-10" />
                      <div>
                        {loadingGetSubmitSubmission ? (
                          <p>loading</p>
                        ) : (
                          data.data.submission.map(
                            (row: Submission, index: number) => (
                              <div
                                key={row.id}
                                className="mb-10 scroll-mt-20"
                                id={`ID${row.id}`}
                              >
                                <div className="flex items-center justify-between">
                                  <div>
                                    <h5 className="font-medium text-xl mb-2 flex items-center gap-3">
                                      <IconBookOpenFill />
                                      {row.title}
                                    </h5>
                                    <p className="mb-5 text-sm">
                                      Batas Akhir:{" "}
                                      {timestampFormatter(row.deadline || "")}
                                    </p>
                                  </div>
                                  {submitSubmissions[index]?.grade ? (
                                    <div className="flex flex-col items-center bg-emerald-500 p-2 rounded text-white">
                                      <small>Nilai kamu:</small>
                                      <p className="text-xl font-semibold">
                                        {submitSubmissions[index].grade}
                                      </p>
                                    </div>
                                  ) : (
                                    ""
                                  )}
                                </div>
                                <p className="mb-4">{row.description}</p>
                                <h5 className="font-semibold">Jawab: </h5>
                                <form
                                  onSubmit={(e) => handleSubmitSubmission(e)}
                                >
                                  <input
                                    name="submissionID"
                                    type="text"
                                    value={row.id}
                                    readOnly
                                    hidden
                                  />
                                  {matchedSubmissions.some(
                                    (submission: SubmitSubmission) =>
                                      submission.submission_id === row.id
                                  ) ? (
                                    <>
                                      <textarea
                                        name="body"
                                        placeholder="Masukkan pesan disini ..."
                                        className="border rounded w-full h-[150px] p-2"
                                        disabled={matchedSubmissions}
                                        defaultValue={
                                          submitSubmissions[index].body
                                        }
                                      ></textarea>
                                      {submitSubmissions[index].file && (
                                        <a
                                          href={`http://127.0.0.1:8000/storage/${submitSubmissions[index].file}`}
                                          target="_blank"
                                          className="px-5 py-2 rounded bg-gray-100 hover:bg-gray-200 mt-4 text-gray-800 inline-flex items-center gap-3 shadow-sm"
                                        >
                                          <IconFileDownloadFill />
                                          Download File
                                        </a>
                                      )}
                                      <button className="block bg-emerald-500 hover:bg-emerald-400 py-2 rounded w-full text-white mt-5 cursor-not-allowed">
                                        Done
                                      </button>
                                    </>
                                  ) : (
                                    <>
                                      <textarea
                                        name="body"
                                        placeholder="Masukkan pesan disini ..."
                                        className="border rounded w-full h-[150px] p-2"
                                        onChange={(e) => {
                                          setFormData({
                                            ...formData,
                                            body: e.target.value,
                                          });
                                        }}
                                      ></textarea>
                                      <input
                                        type="file"
                                        onChange={handleFileChange}
                                      />
                                      <button className="block bg-indigo-500 hover:bg-indigo-400 py-2 rounded w-full text-white mt-5">
                                        Submit
                                      </button>
                                    </>
                                  )}
                                </form>
                                <hr className="my-10" />
                              </div>
                            )
                          )
                        )}
                      </div>
                    </>
                  ) : (
                    ""
                  )}
                </div>
              ) : (
                <div className="xl:px-20 md:px-10 px-5 mt-5">
                  <div className="bg-gray-200 xl:col-span-3 px-5 py-10 rounded-md flex flex-col justify-center items-center">
                    <IconHand5Fill className="size-7 text-gray-600" />
                    <p className="font-semibold text-xl mt-2 text-gray-900">
                      Akses Tidak Tersedia
                    </p>
                    <small className="text-sm text-gray-700 mt-3 text-center">
                      Untuk mengakses kelas ini, silakan bergabung terlebih
                      dahulu.
                    </small>
                  </div>
                </div>
              )}
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
