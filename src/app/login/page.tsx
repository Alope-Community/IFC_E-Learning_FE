"use client";
import { useLogin } from "@/hooks/authentication";
import { IconBrandGoogle } from "justd-icons";
import Link from "next/link";
import React, {
  FormEvent,
  FormHTMLAttributes,
  useEffect,
  useState,
} from "react";

const LoginPage = () => {
  const mutation = useLogin();
  const [clientOnly, setClientOnly] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setClientOnly(true);
    }
  }, []);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    mutation.mutate(formData);
    // const result = await login(formData);
    // if (result) {
    // }
  };

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
                <div className="mb-5">
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
