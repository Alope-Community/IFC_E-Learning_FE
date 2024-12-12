"use client";
import { useAuthRedirect } from "@/hooks/_middlewareAuth";
import { useLogin } from "@/hooks/authentication";
import { IconBrandGoogle } from "justd-icons";
import Link from "next/link";

import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { ILoginForm, loginValidator } from "@/utils/zod";
import { zodResolver } from "@hookform/resolvers/zod";

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

  useEffect(() => {
    if (typeof window !== "undefined") {
      setClientOnly(true);
    }
  }, []);

  // const [formData, setFormData] = useState({
  //   email: "",
  //   password: "",
  // });

  const handleSubmit = onSubmit(async (data, event) => {
    event?.preventDefault();
    mutation.mutate(data);
    // const result = await login(formData);
    // if (result) {
    // }
  });

  return (
    <div>
      {clientOnly ? (
        <section className="min-h-screen grid xl:grid-cols-2">
          <div className="bg-indigo-500 xl:flex hidden flex-col items-center justify-center">
            <h2 className="text-3xl text-white font-bold">LOGIN</h2>
            <p className="text-gray-200">
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
            </p>
          </div>
          <div className="flex items-center justify-center">
            <div className="md:w-2/3 w-11/12">
              <div className="mb-10">
                <h3 className="text-2xl font-semibold">Login E-Learning</h3>
                <p className="text-gray-600 mt-2">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
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
                    className="bg-indigo-500 hover:bg-indigo-400 w-full py-3 text-white rounded-md"
                  >
                    Submit
                  </button>
                  <p className="text-sm text-center mt-5">
                    Belum punya akun?{" "}
                    <Link href={"/register"} className="text-blue-500 italic">
                      Daftar
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
        </section>
      ) : (
        "Loading..."
      )}
    </div>
  );
};

export default LoginPage;
