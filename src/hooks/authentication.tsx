import { login } from "@/api/Authentication";
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

      router.push("/register");
    },
    onError: (error) => {
      alert("Login Error");

      console.error("Error Login item:", error);
    },
  });
};

export { useLogin };
