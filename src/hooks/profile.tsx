// import UploadImage from "@/apis/_UploadImage";
import updateProfile from "@/api/Profile";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const useUpdateProfile = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateProfile,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["profile"] });
    },
    onError: (error) => {
      console.error("Error upload image:", error);
    },
  });
};

export default useUpdateProfile;
