import { useMutation, useQueryClient } from "@tanstack/react-query";
import { joinCourse, leaveCourse } from "@/api/Courses";
import toast from "react-hot-toast";

const useJoinCourse = () => {
  const queryClient = useQueryClient();
  //   const router = useRouter();

  return useMutation({
    mutationFn: joinCourse,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["courses"] });

      toast.success("Join Success");

      //   router.push("/");
    },
    onError: (error) => {
      toast.error(error.message);

      console.error("Error Login item:", error);
    },
  });
};

const useLeaveCourse = () => {
  const queryClient = useQueryClient();
  //   const router = useRouter();

  return useMutation({
    mutationFn: leaveCourse,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["courses"] });

      toast.success("Leave Success");

      //   router.push("/");
    },
    onError: (error) => {
      toast.error("Leave Error");

      console.error("Error Login item:", error);
    },
  });
};

export { useJoinCourse, useLeaveCourse };
