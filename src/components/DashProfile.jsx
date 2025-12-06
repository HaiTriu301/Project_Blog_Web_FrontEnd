import { useSelector } from "react-redux";
import {Alert, Button, TextInput} from "flowbite-react";
import { useEffect, useRef, useState } from "react";
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

export default function DashProfile() {
    const { currentUser } = useSelector((state) => state.user);

    const [imageFile, setImageFile] = useState(null);
    const [imageFileUrl, setImageFileUrl] = useState(null);
    const [imageFileUploadProgress, setImageFileUploadProgress] = useState(null);
    const [imageFileUploadError, setImageFileUploadError] = useState(null);

    const filePickerRef = useRef();

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImageFile(file);
            setImageFileUrl(URL.createObjectURL(file)); // preview
        }
    };

    // Auto upload when imageFile changes
    useEffect(() => {
        if (imageFile) {
            uploadImageToCloudinary();
        }
    }, [imageFile]);

    // ⭐ Upload Image to Cloudinary
    const uploadImageToCloudinary = async () => {
        try {
            setImageFileUploadError(null);
            setImageFileUploadProgress("Uploading...");

            const CLOUD_NAME = "dbfxk37aa";
            const UPLOAD_PRESET = "blog_fruit";

            const formData = new FormData();
            formData.append("file", imageFile);
            formData.append("upload_preset", UPLOAD_PRESET);

            const res = await fetch(
                `https://api.cloudinary.com/v1_1/dbfxk37aa/image/upload`,
                {
                    method: "POST",
                    body: formData,
                }
            );

            const data = await res.json();

            if (data.secure_url) {
                setImageFileUrl(data.secure_url);
                setImageFileUploadProgress("Upload successful!");
            } else {
                setImageFileUploadError("Upload failed!");
            }
        } catch (err) {
            console.error(err);
            setImageFileUploadError("Upload failed!");
        }
    };

    return (
        <div className="max-w-lg mx-auto p-3 w-full">
            <h1 className="my-7 text-center font-semibold text-3xl">Profile</h1>

            <form className="flex flex-col gap-4">
                {/* Hidden input */}
                <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    ref={filePickerRef}
                    hidden
                />

                {/* Avatar */}
                <div
                    className="relative w-32 h-32 self-center cursor-pointer shadow-md overflow-hidden rounded-full"
                    onClick={() => filePickerRef.current.click()}
                >
                    <img
                        src={imageFileUrl || currentUser.profilePicture}
                        alt="user"
                        className={`rounded-full w-full h-full object-cover border-8 border-[lightgray] $ 
                        {imageFileUploadProgress && imageFileUploadProgress < 100 && 'opacity-50'}`}
                    />
                </div>

                {/*{imageFileUploadProgress && <Alert color='failure'>{imageFileUploadError}</Alert>}*/}

                {/* Upload status */}
                {imageFileUploadProgress && (
                    <p className="text-center text-sm text-green-600">
                        {imageFileUploadProgress}
                    </p>
                )}

                {imageFileUploadError && (
                    <p className="text-center text-sm text-red-600">
                        {imageFileUploadError}
                    </p>
                )}

                <TextInput
                    type="text"
                    id="username"
                    placeholder="username"
                    defaultValue={currentUser.username}
                />

                <TextInput type="password" id="password" placeholder="password" />

                <TextInput
                    type="email"
                    id="email"
                    placeholder="email"
                    defaultValue={currentUser.email}
                />

                <Button type="submit" gradientduotone="purpleToBlue" outline>
                    Update
                </Button>
            </form>

            <div className="text-red-500 flex justify-between mt-5">
                <span className="cursor-pointer">Delete Account</span>
                <span className="cursor-pointer">Sign out</span>
            </div>
        </div>
    );
}
