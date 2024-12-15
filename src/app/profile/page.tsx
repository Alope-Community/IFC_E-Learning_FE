"use client";

import { useEffect, useState } from "react";
import {
  IconArrowLeft,
  IconEye,
  IconEyeClosedFill,
  IconLogout,
} from "justd-icons";
import { getUserData } from "@/utils/getUserData";
import MasterLayout from "@/layouts/master";
import Link from "next/link";
import { useLogout } from "@/hooks/authentication";
import useUpdateProfile from "@/hooks/profile";
import { z } from "zod";

const avatars = ["avatar1", "avatar2", "avatar3", "avatar4"];

const passwordSchema = z
  .object({
    password: z
      .string()
      .min(8, "Password harus minimal 8 karakter!")
      .max(32, "Password maximal 32 karakter!"),
    passwordConfirmation: z.string(),
  })
  .refine((data) => data.password === data.passwordConfirmation, {
    message: "Password dan Konfirmasi Password tidak sama!",
    path: ["passwordConfirmation"],
  });

export default function EditProfile() {
  const { logout } = useLogout();

  const [userData, setUserData] = useState({
    id: "",
    name: "",
    email: "",
    avatar: "",
  });

  const [name, setName] = useState("");
  const [profilePicture, setProfilePicture] = useState("avatar1");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");

  useEffect(() => {
    const data = getUserData();
    setUserData({
      id: data?.id || "0",
      name: data?.name || "",
      email: data?.email || "",
      avatar: data?.avatar || "",
    });

    setName(data?.name || "");
  }, []);

  const [errors, setErrors] = useState<Record<string, string>>({});

  const mutation = useUpdateProfile();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = { password, passwordConfirmation };

    try {
      if (password) {
        passwordSchema.parse(formData);
      }

      mutation.mutate({
        user_id: parseInt(userData.id) || 0,
        name,
        profile: profilePicture,
        password,
      });

      setErrors({});
      logout();
    } catch (error) {
      if (error instanceof z.ZodError) {
        const fieldErrors = error.errors.reduce((acc, curr) => {
          acc[curr.path[0] as string] = curr.message;
          return acc;
        }, {} as Record<string, string>);
        setErrors(fieldErrors);
      }
    }
  };

  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <MasterLayout>
      <div className="bg-indigo-500 h-[300px] flex flex-col items-center justify-center mt-16 text-white">
        <h2 className="text-4xl font-medium">Profil</h2>
        {/* <p className="text-gray-100 mt-3">Learning Platform For You</p> */}
      </div>
      <section className="grid xl:grid-cols-4 xl:px-20 md:px-10 px-5 mt-10 gap-10">
        <div className="relative">
          <div className="bg-white rounded shadow-sm sticky top-24 text-center overflow-hidden">
            <div className="p-5">
              <span className="w-[50px] h-[50px] bg-indigo-500 inline-flex rounded-full mb-3">
              <span className="w-[50px] h-[50px] bg-indigo-500 inline-flex rounded-full mb-3">
                {userData.avatar ? (
                  <img src={`/avatars/${userData.avatar}`} />
                ) : ""}
              </span>
              </span>
              <h3>{userData.name}</h3>
              <p className="text-sm italic text-gray-800">{userData.email}</p>
            </div>
            {/* <div className="p-5">
              <Link
                href="/dashboard"
                className="flex items-center justify-center gap-2 underline italic text-indigo-400"
              >
                <IconPencilBox />
                Batal Edit
              </Link>
            </div> */}
            <button
              className="flex justify-center mt-5 bg-red-500 w-full py-3 text-white items-center text-sm gap-2"
              onClick={logout}
            >
              <IconLogout />
              Logout
            </button>
          </div>
        </div>
        <div className="xl:col-span-3">
          <div>
            <Link
              href="/dashboard"
              className="inline-flex items-center gap-2 bg-gray-200 hover:bg-gray-300 px-5 py-2 rounded text-sm"
            >
              <IconArrowLeft />
              Kembali
            </Link>
          </div>
          <div className="p-5  bg-white rounded shadow-md mt-5">
            <h2 className="text-lg font-bold mb-4">Edit Profile</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-sm mb-2">Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-2 border rounded"
                  required
                />
              </div>

              <div className="mb-4">
                <label className="block text-sm mb-2">Foto Profil</label>
                <div className="flex gap-2">
                  {avatars.map((avatar) => (
                    <button
                      key={avatar}
                      type="button"
                      className={`p-2 border rounded ${
                        profilePicture === avatar
                          ? "border-indigo-500"
                          : "border-gray-300"
                      }`}
                      onClick={() => setProfilePicture(avatar)}
                    >
                      <img
                        src={`/avatars/${avatar}.jpg`}
                        alt={avatar}
                        className="w-12 h-12 rounded-full"
                      />
                    </button>
                  ))}
                </div>
              </div>

              <button
                type="submit"
                className="bg-indigo-500 text-white px-4 py-2 rounded w-full flex justify-center items-center gap-2"
              >
                Update Profile
              </button>
            </form>
          </div>
          <div className="p-5 bg-white rounded shadow-md mt-10">
            <h2 className="text-lg font-bold mb-4">Edit Password</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-sm mb-2">Password</label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-4 py-2 border rounded"
                  />
                  {errors.password && (
                    <p className="text-red-500 text-sm">{errors.password}</p>
                  )}
                  <button
                    type="button"
                    className="absolute bottom-1/2 right-5 translate-y-1/2"
                    onClick={togglePasswordVisibility}
                  >
                    {showPassword ? (
                      <IconEye className="size-6" />
                    ) : (
                      <IconEyeClosedFill className="size-6" />
                    )}
                  </button>
                </div>
              </div>

              <div className="mb-4">
                <label className="block text-sm mb-2">
                  Konfirmasi Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    value={passwordConfirmation}
                    onChange={(e) => setPasswordConfirmation(e.target.value)}
                    className="w-full px-4 py-2 border rounded"
                  />
                  {errors.passwordConfirmation && (
                    <p className="text-red-500 text-sm">
                      {errors.passwordConfirmation}
                    </p>
                  )}
                  <button
                    type="button"
                    className="absolute bottom-1/2 right-5 translate-y-1/2"
                    onClick={togglePasswordVisibility}
                  >
                    {showPassword ? (
                      <IconEye className="size-6" />
                    ) : (
                      <IconEyeClosedFill className="size-6" />
                    )}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                className="bg-indigo-500 text-white px-4 py-2 rounded w-full flex justify-center items-center gap-2"
              >
                Ubah Password
              </button>
            </form>
          </div>
        </div>
      </section>
    </MasterLayout>
  );
}
