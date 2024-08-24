import { useEffect } from "react";
import { useUser } from "@clerk/nextjs";
import { axiosInstance } from "@/lib/axios";

const useSaveUserData = () => {
  const { user } = useUser();

  useEffect(() => {
    const saveUserData = async () => {
      if (user) {
        const { id, emailAddresses, fullName, firstName, lastName } = user;

        try {
          const res = await axiosInstance.post("/api/user", {
            id,
            emailAddresses,
            fullName,
            firstName,
            lastName,
          });
          return res;
        } catch (error) {
          console.error("Error saving user data:", error);
        }
      }
    };

    if (user) {
      saveUserData();
    }
  }, [user]);

  return null;
};

export default useSaveUserData;
