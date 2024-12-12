"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";

import { useAuthRedirect } from "@/hooks/_middlewareAuth";
import { useRegister } from "@/hooks/authentication";
import { IRegisterForm, registerValidator } from "@/utils/zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { IconBrandGoogle } from "justd-icons";

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

  useEffect(() => {
    if (typeof window !== "undefined") {
      setClientOnly(true);
    }
  }, []);

  // const [formData, setFormData] = useState<FormDataRegister>({
  //   name: "",
  //   email: "",
  //   password: "",
  //   password_confirmation: "",
  // });

  const handleSubmit = onSubmit(async (data, event) => {
    event?.preventDefault();
    mutation.mutate(data);
  });

  return (
    <div>
      {clientOnly ? (
        <section className="min-h-screen grid xl:grid-cols-2">
          <div className="flex items-center justify-center">
            <div className="md:w-5/6 w-11/12">
              <div className="mb-10">
                <h3 className="text-2xl font-semibold">
                  Registration E-Learning
                </h3>
                <p className="text-gray-600 mt-2">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
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
                    placeholder="Ulang Password"
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
                    className="bg-indigo-500 hover:bg-indigo-400 w-full py-3 text-white rounded-md"
                  >
                    Submit
                  </button>
                  <p className="text-sm text-center mt-5">
                    Sudah punya akun?{" "}
                    <Link href={"/"} className="text-blue-500 italic">
                      Masuk
                    </Link>
                  </p>
                </div>
              </form>
              <hr className="my-5" />
              <button
                type="submit"
                className="bg-red-500 hover:bg-red-400 w-full py-3 text-white rounded-md flex justify-center items-center gap-1"
              >
                <IconBrandGoogle />
                Sign in with Google
              </button>
            </div>
          </div>
          <div className="bg-indigo-500 xl:flex hidden flex-col items-center justify-center">
            <h2 className="text-3xl text-white font-bold">REGISTRASI</h2>
            <p className="text-gray-200">
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
            </p>
          </div>
        </section>
      ) : (
        "Loading..."
      )}
    </div>
  );
};

export default RegistrationPage;
