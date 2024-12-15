import { CourseCardParams } from "@/models/_ComponentParams";
import { IconBookOpenFill, IconPeopleFill } from "justd-icons";
import Link from "next/link";
import React from "react";

export default function CourseCard(course: CourseCardParams) {
  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <img
        src={`/assets/courses/bg${(course.id % 9) + 1}.svg`}
        alt="Course"
        className="w-full max-h-[200px] min-h-[200px  ] object-cover"
      />
      <div className="flex justify-between  px-5 py-2 bg-gray-200 items-center gap-2 text-gray-700">
        <div className="flex items-center gap-2">
          <IconPeopleFill />
          <p className="text-sm">{course.teacher}</p>
        </div>
        <div className="flex items-center gap-2">
          <IconBookOpenFill />
          <p className="text-sm">{course.category}</p>
        </div>
      </div>
      <div className="p-5">
        <h4 className="font-medium text-xl text-ellipsis max-w-full">
          {course.title}
        </h4>
        <p className="text-gray-600 transition-all duration-300 mt-3 text-sm">
          {course.description}
        </p>
        <Link
          href={`/courses/${course.slug}`}
          className="py-2 bg-indigo-500 hover:bg-indigo-400 w-full mt-5 flex justify-center text-white rounded-md"
        >
          Lihat Kelas
        </Link>
      </div>
    </div>
  );
}
