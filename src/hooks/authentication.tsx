import { login, register } from "@/api/Authentication";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

const useLogin = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: login,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["login"] });

      toast.success('Login Success!')

      router.push("/");
    },
    onError: (error) => {
      toast.error(error.message)

      console.log("Error Login item:", error);
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

      toast.success("Register Success");

      router.push("/login");
    },
    onError: (error) => {
      toast.error(error.message);

      console.log("Error Register item:", error);
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
