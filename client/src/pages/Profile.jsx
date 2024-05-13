import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useRef } from "react";
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from "firebase/storage";
import { app } from "../firebase";
export default function Profile() {
  const { currentUser } = useSelector((state) => state.user);
  const fileRef = useRef(null);
  const [file, setFile] = useState(undefined);
  const [fileUploadError, setFileUploadError] = useState(false);
  const [filePerc, setFilePerc] = useState(0);
  const [formData, setFormData] = useState({});
  // console.log(formData);
  // console.log(fileUploadError); 

  // console.log(filePerc);
  // console.log(file);
  useEffect(() => {
    if (file) {
      handleFileUpload(file);
    }
  }, [file]);
  const handleFileUpload = (file) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + file.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on("state_changed", (snapshot) => {
      const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      // console.log('Upload is'+progress+'%done');
      setFilePerc(Math.round(progress));
    },
    (error) => {
      setFileUploadError(true);
      console.error("Upload Error", error);
    },
    () => {
      getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => 
     
        setFormData({ ...formData, avatar: downloadURL })
      );
    }
  );
  };
  return (
    <div className="max-w-lg mx-auto items-center mt-5">
      <h1 className="font-semibold text-center text-3xl my-7">Profile</h1>

      <form className="flex flex-col gap-4 mt-5">
        <input
          onChange={(e) => setFile(e.target.files[0])}
          type="file"
          ref={fileRef}
          hidden
          accept="/image/*"
        />
        <img
          onClick={() => fileRef.current.click()}
          className="rounded-full p-2 w-20 h-20 my-2 self-center object-cover cursor-pointer"
          src={formData.avatar||currentUser.avatar}
          alt="pic"
        />
<p className="text-sm self-center">
  {
    fileUploadError?(<span className="text-red-700">Error Image Upload(image must be less than  2 MB) </span>):filePerc>0&&filePerc<100?(<span className="text-green-700">{`Uploading ${filePerc}%`}</span>):filePerc===100?(<span className="text-green-700">Successfully Uploaded!</span>):""}
  
</p>
        <input
          className="rounded-lg p-2 "
          type="text"
          placeholder="username"
          id="username"
        />
        <input
          className="rounded-lg p-2 "
          type="text"
          placeholder="email"
          id="email"
        />
        <input
          className="rounded-lg p-2 "
          type="text"
          placeholder="password"
          id=""
        />
        <button className="bg-slate-700 uppercase rounded-lg p-3">
          update
        </button>
        <button className="bg-green-700 uppercase rounded-lg p-3">
          create listing
        </button>
      </form>
      <div className="flex justify-between mt-5">
        <span className="text-red-700 cursor-pointer">Delete account</span>
        <span className="text-red-700 cursor-pointer">Sign out</span>
      </div>
    </div>
  );
}
