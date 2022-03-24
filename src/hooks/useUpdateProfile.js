import { useEffect, useState } from "react";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { updateProfile as updateFireBaseProfile } from "firebase/auth";
import useAuthContext from "./useAuthContext";
import { storage } from "../firebase/config";

const useUpdateProfile = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [isCancelled, setIsCancelled] = useState(false);

  const { user } = useAuthContext();

  const updateProfile = async (displayName, profileImage) => {
    setLoading(true);
    setError(null);
    setSuccess(false);
    try {
      let uploadedImage;

      if (profileImage) {
        const imageRef = ref(storage, `/${user.uid}/${profileImage.name}`);
        await uploadBytes(imageRef, profileImage);

        uploadedImage = await getDownloadURL(imageRef);
      }

      await updateFireBaseProfile(user, {
        displayName: displayName,
        photoURL: uploadedImage ? uploadedImage : user.photoURL,
      });

      if (!isCancelled) {
        setLoading(false);
        setSuccess(true);
        setError(null);
      }
    } catch (err) {
      console.log(err);
      if (!isCancelled) {
        setLoading(false);
        setError(err.message);
        setSuccess(false);
      }
    }
  };

  useEffect(() => {
    return () => {
      setIsCancelled(true);
    };
  }, []);

  return { updateProfile, loading, error, success };
};

export default useUpdateProfile;
