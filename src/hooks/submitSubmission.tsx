// import UploadImage from "@/apis/_UploadImage";
import { submitSubmission } from "@/api/SubmitSubmission";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const useSubmitSubmission = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: submitSubmission,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["submit-submission"] });
    },
    onError: (error) => {
      console.log("Error upload image:", error);
    },
  });
};

export default useSubmitSubmission;
