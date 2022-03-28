import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { FaEdit, FaSave, FaCamera } from "react-icons/fa";
import { BsFillCollectionFill } from "react-icons/bs";

import useAuthContext from "../../hooks/useAuthContext";
import useUpdateProfile from "../../hooks/useUpdateProfile";
import useToast from "../../hooks/useToast";
import Spinner from "../../components/Spinner";

export default function Profile() {
  const { user } = useAuthContext();
  const [displayName, setDisplayName] = useState(user.displayName);
  const [email] = useState(user.email);
  const [photoURL, setPhotoURL] = useState(user.photoURL);

  const [openEditForm, setOpenEditForm] = useState(false);

  const { updateProfile, success, loading, error } = useUpdateProfile();
  const { createToast } = useToast(1500);

  const formImageFile = useRef();
  const onFileSelected = (file) => {
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);

      reader.onload = (e) => {
        setPhotoURL(e.target.result);
      };
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    updateProfile(displayName, formImageFile.current?.files[0]);
  };

  useEffect(() => {
    if (success) {
      createToast("profile updated successfully!", "success");
      setOpenEditForm(false);
    }

    if (error) {
      createToast(error, "error");
    }
  }, [success, error, createToast]);

  if (loading) {
    return <Spinner />;
  }

  return (
    <>
      <div className="p-3 my-5 w-11/12 flex justify-center   md:w-9/12 lg:w-7/12 lg: mx-auto">
        {!openEditForm && (
          <div className="p-3 h-full w-full flex flex-col items-center gap-y-1 sm:gap-y-2 rounded-lg">
            <img
              src={photoURL}
              alt={displayName}
              className="h-3/6  max-h-[180px] w-[180px] rounded-full shadow-md"
            />
            <p className="text-3xl dark:text-white">{displayName}</p>
            <p className="dark:text-white">({email})</p>
            <div className="flex my-2 flex-col md:flex-row gap-3">
              <button
                className="px-3 py-2 text-lg flex items-center gap-x-2 rounded-lg text-white bg-indigo-600 dark:bg-blue-400"
                onClick={() => setOpenEditForm(true)}
              >
                <FaEdit /> Edit Profile
              </button>
              <Link
                to={"/library"}
                className="px-3 py-2 text-lg flex items-center gap-x-2 rounded-lg text-white bg-orange-500"
              >
                <BsFillCollectionFill /> my Library
              </Link>
            </div>
          </div>
        )}

        {openEditForm && (
          <form
            className="p-3 md:p-5 lg:p-6 h-full w-full flex flex-col items-center gap-y-2 lg:gap-y-3 rounded-lg"
            onSubmit={handleSubmit}
          >
            <label className="h-3/6 max-h-[180px] min-w-[180px] w-auto max-w-[180px] relative group cursor-pointer">
              <img
                src={photoURL}
                alt={displayName}
                className="min-h-[180px] max-h-[180px] w-full rounded-full shadow-md"
              />
              <div className="transition-colors absolute top-0 flex justify-center items-center left-0 right-0 bottom-0 group-hover:bg-black/[0.5] bg-black/[0.35] rounded-full">
                <FaCamera size={40} className="mt-5 text-white" />
              </div>
              <input
                type="file"
                className="hidden"
                ref={formImageFile}
                onChange={(e) => onFileSelected(e.target.files[0])}
                accept=".jpg,.png,.jpeg"
              />
            </label>
            <label className="text-xl w-[80%] mt-2 dark:text-white">
              <p className="mb-2">displayName</p>
              <input
                className="p-2 block w-full dark:text-black border-[2.3px] border-gray-600 rounded-md outline-none dark:focus:outline-blue-400 focus:border-indigo-600 "
                type="text"
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
              />
            </label>

            <label className="text-xl w-[80%] mt-2 dark:text-white">
              <p className="mb-2">Email (disabled)</p>
              <input
                className="p-2 block w-full dark:text-black border-[2.3px] border-gray-600 rounded-md outline-none dark:focus:outline-blue-400 focus:border-indigo-600 "
                type="email"
                disabled
                value={email}
              />
            </label>
            <button
              type="submit"
              className="px-3 py-2 text-lg flex items-center gap-x-2 rounded-lg text-white bg-indigo-600 dark:bg-blue-400"
            >
              <FaSave /> Save
            </button>
          </form>
        )}
      </div>
    </>
  );
}
