import ProfileMain from "@/components/main/ProfileMain";
import { Metadata } from "next";

export const metadata:Metadata = {
  title: "Profile",
  description: "Manage your profile and view your order history at E-store.",
};
const ProfilePage = () => {


  return (
    <ProfileMain />
  );
};

export default ProfilePage; 