import { useSelector } from "react-redux";
import {Alert, Button, TextInput} from "flowbite-react";
import { useEffect, useRef, useState } from "react";
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import {updateStart, updateSuccess, updateFailure} from "../redux/user/userSlice.js";
import {useDispatch} from "react-redux";

export default function DashProfile() {
    const { currentUser } = useSelector((state) => state.user);

    const [imageFile, setImageFile] = useState(null);
    const [imageFileUrl, setImageFileUrl] = useState(null);
    const [imageFileUploadProgress, setImageFileUploadProgress] = useState(null);
    const [imageFileUploadError, setImageFileUploadError] = useState(null);
    const [imageFileUploading, setImageFileUploading] = useState(false);
    const [updateUserSuccess, setUpdateUserSuccess] = useState(null);
    const [updateUserError, setUpdateUserError] = useState(null);
    const [formData, setFormData] = useState({})
    const filePickerRef = useRef();
    const dispatch = useDispatch();



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
            setImageFileUploading(true);
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
                setFormData((prev) => ({ ...prev, profilePicture: data.secure_url }));
                setImageFileUploading(false);
            } else {
                setImageFileUploadError("Upload failed!");
            }
        } catch (err) {
            console.error(err);
            setImageFileUploadError("Upload failed!");
        }
    };

    const handleChange = (e) => {
        setFormData({...formData, [e.target.id]: e.target.value});
    }

        const handleSubmit = async (e) => {
            e.preventDefault();
            setUpdateUserError(null)
            setUpdateUserSuccess(null)
            if (Object.keys(formData).length === 0) {
                setUpdateUserError("No changes made")
                return;
            }
            if(imageFileUploading){
                setUpdateUserError("Please wait until the image is uploaded")
                return;
            }
            try{
                dispatch(updateStart())
                // Need path from Tuan
                const res = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/signin`, {
                    method: 'PUT',
                    headers: {'Content-Type': 'application/json'},
                    body: JSON.stringify(formData),
                })
                const data = await res.json()
                if (!res.ok){
                    dispatch(updateFailure(data.message))
                    setUpdateUserError(data.message)
                } else {
                    dispatch(updateSuccess(data))
                    setUpdateUserSuccess("User's profile has been updated successfully!")
                }
            } catch (error) {
                dispatch(updateFailure(error.message))
                setUpdateUserError(error.message)
            }
        }

    return (
        <div className="max-w-lg mx-auto p-3 w-full">
            <h1 className="my-7 text-center font-semibold text-3xl">Profile</h1>

            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
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
                    onChange={handleChange}
                />

                <TextInput
                    type="email"
                    id="email"
                    placeholder="email"
                    defaultValue={currentUser.email}
                    onChange={handleChange}
                />

                <TextInput
                    type="password"
                    id="password"
                    placeholder="password"
                    onChange={handleChange}
                />

                <Button type="submit" gradientduotone="purpleToBlue" outline>
                    Update
                </Button>
            </form>

            <div className="text-red-500 flex justify-between mt-5">
                <span className="cursor-pointer">Delete Account</span>
                <span className="cursor-pointer">Sign out</span>
            </div>
            {updateUserSuccess && (
                <Alert color="success" className='mt-5'>{updateUserSuccess}</Alert>
            )}
            {updateUserError && (
                <Alert color="failure" className='mt-5'>{updateUserError}</Alert>
            )}
        </div>
    );
}
