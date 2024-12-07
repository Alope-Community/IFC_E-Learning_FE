import { joinCourse, leaveCourse } from "@/api/Courses";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

const useJoinCourse = () => {
  const queryClient = useQueryClient();
  //   const router = useRouter();

  return useMutation({
    mutationFn: joinCourse,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["courses"] });

      alert("Join Success");

      //   router.push("/");
    },
    onError: (error) => {
      alert("Join Error");

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

      alert("Leave Success");

      //   router.push("/");
    },
    onError: (error) => {
      alert("Leave Error");

      console.error("Error Login item:", error);
    },
  });
};

export { useJoinCourse, useLeaveCourse };
