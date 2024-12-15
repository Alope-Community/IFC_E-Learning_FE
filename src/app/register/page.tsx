"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";

import { useAuthRedirect } from "@/hooks/_middlewareAuth";
import { useRegister } from "@/hooks/authentication";
import { IRegisterForm, registerValidator } from "@/utils/zod";
import { zodResolver } from "@hookform/resolvers/zod";
import LoaderComponent from "@/components/Loader";
import { IconHome1Fill } from "justd-icons";

const RegistrationPage = () => {
  useAuthRedirect();

  const mutation = useRegister();
  const [clientOnly, setClientOnly] = useState(false);
  const {
    register,
    handleSubmit: onSubmit,
    formState: { errors },
  } = useForm<IRegisterForm>({
    resolver: zodResolver(registerValidator),
  });

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setClientOnly(true);
    }
  }, []);

  const handleSubmit = onSubmit(async (data, event) => {
    event?.preventDefault();

    setIsLoading(true);
    try {
      mutation.mutateAsync(data);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  });

  if (isLoading) {
    return <LoaderComponent />;
  }

  return (
    <div>
      {clientOnly ? (
        <section className="min-h-screen grid xl:grid-cols-2">
          <div className="flex items-center justify-center relative">
            <Link
              href={"/"}
              className="absolute top-5 right-5 bg-gray-200 hover:bg-gray-100 px-4 py-2 rounded inline-flex items-center gap-2"
            >
              <IconHome1Fill />
              Beranda
            </Link>

            <div className="md:w-5/6 w-11/12">
              <div className="mb-10">
                <h3 className="text-2xl font-semibold">Registrasi EduVerse</h3>
                <p className="text-gray-600 mt-2">
                  Buat Kuncimu untuk menuju Gerbang dunia pengetahuan.
                </p>
              </div>
              <form
                method="POST"
                className="grid md:grid-cols-2 gap-5"
                onSubmit={handleSubmit}
              >
                <div>
                  <label
                    htmlFor="name"
                    className={`${errors.name && "text-red-500"}`}
                  >
                    Nama
                  </label>
                  <input
                    type="text"
                    className={`border w-full px-5 py-3 rounded-md ${
                      errors.name &&
                      "border-red-500 focus:ring-red-500 focus:border-red-500"
                    }`}
                    placeholder="Nama"
                    id="name"
                    {...register("name")}
                  />
                  {errors.name && (
                    <p className="mt-1 text-sm text-red-500">
                      {errors.name.message}
                    </p>
                  )}
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className={`${errors.email && "text-red-500"}`}
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    className={`border w-full px-5 py-3 rounded-md ${
                      errors.email &&
                      "border-red-500 focus:ring-red-500 focus:border-red-500"
                    }`}
                    placeholder="Email"
                    id="email"
                    {...register("email")}
                  />
                  {errors.email && (
                    <p className="mt-1 text-sm text-red-500">
                      {errors.email.message}
                    </p>
                  )}
                </div>
                <div>
                  <label
                    htmlFor="password"
                    className={`${errors.password && "text-red-500"}`}
                  >
                    Password
                  </label>
                  <input
                    type="password"
                    className={`border w-full px-5 py-3 rounded-md ${
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
                  <label
                    htmlFor="re_password"
                    className={`${errors.confirmPassword && "text-red-500"}`}
                  >
                    Konfirmasi Password
                  </label>
                  <input
                    type="password"
                    className={`border w-full px-5 py-3 rounded-md ${
                      errors.confirmPassword &&
                      "border-red-500 focus:ring-red-500 focus:border-red-500"
                    }`}
                    placeholder="Konfirmasi Password"
                    id="re_password"
                    {...register("confirmPassword")}
                  />
                  {errors.confirmPassword && (
                    <p className="mt-1 text-sm text-red-500">
                      {errors.confirmPassword.message}
                    </p>
                  )}
                </div>
                <div className="md:col-span-2">
                  <button
                    type="submit"
                    className="bg-gradient-to-r from-indigo-500 to-purple-500 hover:bg-gradient-to-l w-full py-3 text-white rounded-md"
                  >
                    Daftar
                  </button>
                  <p className="text-sm text-center mt-5">
                    Sudah punya akun?{" "}
                    <Link href={"/login"} className="text-blue-500 italic">
                      Masuk
                    </Link>
                  </p>
                </div>
              </form>
            </div>
          </div>
          <div className="bg-[url(/assets/2.jpg)] bg-cover bg-center relative z-10 xl:flex hidden flex-col items-center justify-center after:content-[''] after:absolute after:inset-0 after:bg-black/50 after:-z-10">
            <h2 className="text-3xl text-white font-bold">EduVerse</h2>
            <p className="text-gray-200">Learning Beyond Boundaries</p>
          </div>
        </section>
      ) : (
        <LoaderComponent />
      )}
    </div>
  );
};

export default RegistrationPage;
