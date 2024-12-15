// import UploadImage from "@/apis/_UploadImage";
import sendDiscussion from "@/api/Discussion";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const useSendDiscussion = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: sendDiscussion,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["discussions", "courses", "course"],
      });
      alert("Success kirim diskusi");
    },
    onError: (error) => {
      console.log("Error upload image:", error);
    },
  });
};

export default useSendDiscussion;
