"use client"
import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form';
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Upload } from 'lucide-react';
import Image from 'next/image';
import defaultAvatar from "@/public/auth/default-avatar.png";// Adjust the path as necessary
import { api } from '@/app/lib/api';
import { useSession } from 'next-auth/react';
import { toast } from 'react-toastify';
const UploadForm = () => {
    const [previewImage, setPreviewImage] = React.useState<string | null>(null);

    const form = useForm();
    const [selectedFile, setSelectedFile] = React.useState<File | null>(null);
    const { update, data: session } = useSession();

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) {
            toast.error("No file selected.");
            return;
        }

        // Validate file type & size
        if (!["image/jpeg", "image/png"].includes(file.type)) {
            toast.error("Only JPG and PNG formats are allowed.");
            return;
        }
        if (file.size > 2 * 1024 * 1024) {
            toast.error("Image size must be less than 2MB.");
            return;
        }

        if (previewImage) URL.revokeObjectURL(previewImage); // Prevent memory leaks
        setSelectedFile(file);
        setPreviewImage(URL.createObjectURL(file));
        form.setValue("profileImage", file);
    };

    const handleSaveImage = async (e: React.ChangeEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!selectedFile) {
            toast.error("No image selected");
            return;
        }

        try {
            // Prepare FormData
            const formData = new FormData();
            formData.append("profileImage", selectedFile); // Must match backend expectation

            // Log FormData for debugging
            for (const [key, value] of formData.entries()) {
                console.log(`FormData entry: ${key}=${value}`);
            }

            // Upload image
            const uploadRes = await api.uploadProfileImage(formData, session?.accessToken as string);
            const uploadedImageUrl = uploadRes?.imageUrl;

            if (!uploadedImageUrl) {
                throw new Error("Failed to upload image");
            }

            // Update user profile
            await update({ profileImage: uploadedImageUrl });
            setPreviewImage(uploadedImageUrl);
            setSelectedFile(null);
            form.resetField("profileImage");

            toast.success("Profile image updated successfully");
        } catch (error: unknown) {
            console.error("Upload error:", error);
            if (error instanceof Error) {
                toast.error(`Error uploading image: ${error.message || "Unknown error"}`);
            }

            setPreviewImage(session?.user.profileImage || defaultAvatar.src);
            setSelectedFile(null);
            form.resetField("profileImage");
        }
    };
    const isGithubLogin = session?.provider === 'github';
    useEffect(() => {
        if (session?.user?.profileImage) {
            setPreviewImage(session.user.profileImage);
        }
    }, [session]);
    return (

        <form onSubmit={handleSaveImage} className="space-y-6 mt-4" encType="multipart/form-data">
            <Card>
                <CardHeader>
                    <div className="flex items-center justify-between">
                        <div>
                            <CardTitle>Profile Image</CardTitle>
                            {
                                isGithubLogin ? null :
                                    <CardDescription>Update your profile image</CardDescription>
                            }
                        </div>
                    </div>
                </CardHeader>
                <div className="flex flex-col items-center space-y-4 p-3">
                    <div className="relative">
                        <Image
                            width={96}
                            height={96}

                            src={previewImage || defaultAvatar}
                            alt="Profile"
                            className="w-24 h-24 rounded-full object-cover border-2 border-gray-300"
                        />


                        {
                            !isGithubLogin && (

                                <>
                                    <label className="absolute bottom-0 right-0 bg-secondary p-1 rounded-full cursor-pointer">

                                        <Upload className="text-white w-4 h-4" />
                                        <input
                                            type="file"
                                            accept="image/jpeg,image/png"
                                            className="hidden"
                                            name="profileImage"
                                            onChange={handleFileChange}
                                        />
                                    </label>

                                </>
                            )}
                    </div>
                    {
                        !isGithubLogin && (
                            <p className="text-sm text-gray-500">Allowed: JPG, PNG (Max 2MB)</p>

                        )
                    }

                </div>
            </Card>
            <Button type="submit" className="bg-secondary text-white px-4 py-2 rounded w-full" disabled={!previewImage || !selectedFile}>
                <Upload className="h-4 w-4 mr-2" />
                {selectedFile ? "Update Image" : "Upload Image"}
            </Button>
        </form>
    )
}

export default UploadForm
