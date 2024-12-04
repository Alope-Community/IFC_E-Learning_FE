import { login, register } from "@/api/Authentication";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

const useLogin = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: login,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["login"] });

      alert("Login Success");

      router.push("/");
    },
    onError: (error) => {
      alert("Login Error");

      console.error("Error Login item:", error);
    },
  });
};

const useRegister = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: register,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["register"] });

      alert("Register Success");

      router.push("/login");
    },
    onError: (error) => {
      alert("Register Error");

      console.error("Error Register item:", error);
    },
  });
};

export const useLogout = () => {
  const router = useRouter();

  const logout = () => {
    localStorage.removeItem("token");

    router.push("/login");
  };

  return { logout };
};

export { useLogin, useRegister };
