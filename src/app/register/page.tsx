"use client";
import { useAuthRedirect } from "@/hooks/_middlewareAuth";
import { useRegister } from "@/hooks/authentication";
import { FormDataRegister } from "@/models/Authentication";
import { IconBrandGoogle } from "justd-icons";
import Link from "next/link";
import React, { FormEvent, useEffect, useState } from "react";

const RegistrationPage = () => {
  useAuthRedirect();

  const mutation = useRegister();

  const [clientOnly, setClientOnly] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setClientOnly(true);
    }
  }, []);

  const [formData, setFormData] = useState<FormDataRegister>({
    name: "",
    email: "",
    password: "",
    password_confirmation: "",
  });

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    mutation.mutate(formData);
  };

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
                  <label htmlFor="name">Nama</label>
                  <input
                    type="text"
                    className="border w-full px-5 py-3 rounded-md"
                    placeholder="Nama"
                    id="name"
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        name: e.target.value,
                      })
                    }
                  />
                </div>
                <div>
                  <label htmlFor="email">Email</label>
                  <input
                    type="email"
                    className="border w-full px-5 py-3 rounded-md"
                    placeholder="Email"
                    id="email"
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        email: e.target.value,
                      })
                    }
                  />
                </div>
                <div>
                  <label htmlFor="password">Password</label>
                  <input
                    type="password"
                    className="border w-full px-5 py-3 rounded-md"
                    placeholder="Password"
                    id="password"
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        password: e.target.value,
                      })
                    }
                  />
                </div>
                <div>
                  <label htmlFor="re_password">Ulang Password</label>
                  <input
                    type="password"
                    className="border w-full px-5 py-3 rounded-md"
                    placeholder="Ulang Password"
                    id="re_password"
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        password_confirmation: e.target.value,
                      })
                    }
                  />
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
