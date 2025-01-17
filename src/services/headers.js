import { getServerSession } from "next-auth/next";
import options from "@/app/api/auth/[...nextauth]/options";

export const createHeaders = async () => {
  const token = await getServerSession(options).then((res) => res?.user?.idToken);
  return {
    "Content-Type": "application/json",
    "Authorization": "Bearer " + token,
  };
};

export default createHeaders;