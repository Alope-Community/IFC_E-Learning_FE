"use client";
import { useAuthRedirect } from "@/hooks/_middlewareAuth";
import { useLogin } from "@/hooks/authentication";
// import { IconBrandGoogle } from "justd-icons";
import Link from "next/link";

import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { ILoginForm, loginValidator } from "@/utils/zod";
import { zodResolver } from "@hookform/resolvers/zod";
import LoaderComponent from "@/components/Loader";
import { IconHome1Fill } from "justd-icons";

const LoginPage = () => {
  useAuthRedirect();

  const mutation = useLogin();
  const [clientOnly, setClientOnly] = useState(false);
  const {
    register,
    handleSubmit: onSubmit,
    formState: { errors },
  } = useForm<ILoginForm>({
    resolver: zodResolver(loginValidator),
  });

  const [isLoading, setIsloading] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setClientOnly(true);
    }
  }, []);

  const handleSubmit = onSubmit(async (data, event) => {
    event?.preventDefault();

    setIsloading(true);
    try {
      await mutation.mutateAsync(data);
    } catch (error) {
      console.log(error);
    } finally {
      setIsloading(false);
    }
  });

  if (isLoading) {
    return <LoaderComponent />;
  }

  return (
    <div>
      {clientOnly ? (
        <section className="min-h-screen grid xl:grid-cols-2">
          <div className="bg-[url(/assets/1.jpg)] bg-cover bg-center relative z-10 xl:flex hidden flex-col items-center justify-center after:content-[''] after:absolute after:inset-0 after:bg-black/50 after:-z-10">
            <h2 className="text-3xl text-white font-bold">EduVerse</h2>
            <p className="text-gray-200">Learning Beyond Boundaries</p>
          </div>
          <div className="flex items-center justify-center relative">
            <Link
              href={"/"}
              className="absolute top-5 left-5 bg-gray-200 hover:bg-gray-100 px-4 py-2 rounded inline-flex items-center gap-2"
            >
              <IconHome1Fill />
              Beranda
            </Link>
            <div className="md:w-2/3 w-11/12">
              <div className="mb-10">
                <h3 className="text-2xl font-semibold">Login EduVerse</h3>
                <p className="text-gray-600 mt-2">
                  Gerbang menuju dunia pengetahuan.
                </p>
              </div>
              <form method="POST" onSubmit={handleSubmit}>
                <div className="mb-5">
                  <label
                    htmlFor="email"
                    className={`block mb-2 font-medium text-gray-700 ${
                      errors.password && "text-red-500"
                    }`}
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    placeholder="Email"
                    className={`w-full px-5 py-3 rounded-md border ${
                      errors.email &&
                      "border-red-500 focus:ring-red-500 focus:border-red-500"
                    }`}
                    {...register("email")}
                  />
                  {errors.email && (
                    <p className="mt-1 text-sm text-red-500">
                      {errors.email.message}
                    </p>
                  )}
                </div>
                <div className="mb-5">
                  <label
                    htmlFor="password"
                    className={errors.password && "text-red-500"}
                  >
                    Password
                  </label>
                  <input
                    type="password"
                    className={`w-full px-5 py-3 rounded-md border ${
                      errors.password &&
                      "border-red-500 focus:ring-red-500 focus:border-red-500"
                    }`}
                    placeholder="Password"
                    id="password"
                    {...register("password")}
                  />
                  {errors.password && (
                    <p className="mt-1 text-sm text-red-500">
                      {errors.password.message}
                    </p>
                  )}
                </div>
                <div>
                  <button
                    type="submit"
                    className="bg-gradient-to-r from-indigo-500 to-purple-500 hover:bg-gradient-to-l w-full py-3 text-white rounded-md"
                  >
                    Masuk
                  </button>
                  <p className="text-sm text-center mt-5">
                    Belum punya akun?{" "}
                    <Link href={"/register"} className="text-blue-500 italic">
                      Daftar
                    </Link>
                  </p>
                </div>
              </form>
              {/* <hr className="my-5" />
              <button
                type="submit"
                className="bg-red-500 hover:bg-red-400 w-full py-3 text-white rounded-md flex justify-center items-center gap-1"
              >
                <IconBrandGoogle />
                Sign in with Google
              </button> */}
            </div>
          </div>
        </section>
      ) : (
        <LoaderComponent />
      )}
    </div>
  );
};

export default LoginPage;
