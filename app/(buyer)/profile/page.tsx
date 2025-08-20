"use client";  
  import { motion } from "framer-motion";
  import ProfileForm from "@/components/forms/ProfileForm";

  const ProfilePage = () => {


    return (
      <div className="min-h-screen bg-gray-50 py-8 mt-20">
        <div className="container mx-auto px-4 max-w-7xl">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-8"
          >
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Profile</h1>
            <p className="text-gray-600">Manage your account settings and preferences</p>
          </motion.div>

          <div className="w-full">
            {/* Profile Card */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="lg:col-span-1"
            >
              <ProfileForm />
            </motion.div>


          </div>
        </div>
      </div>
    );
  };

  export default ProfilePage; 