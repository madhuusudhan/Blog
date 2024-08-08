import React, { useEffect, useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { TextInput, Button, Alert, Modal } from 'flowbite-react';
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage';
import { app } from '../firebase.js';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { updateFailure, updateStart, updateSuccess,deleteUserStart, deleteUserSuccess, deleteUserFailure, signoutSuccess } from '../Redux/User/userSlice.js';
import { HiExclamationCircle } from "react-icons/hi";
import { Link } from 'react-router-dom';
function Profile() {
  const { currentUser, error, loading} = useSelector((state) => state.user);
  const { theme } = useSelector((state) => state.theme);
  const [image, setImage] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);
  const [imageUploadProgress, setImageUploadProgress] = useState(0);
  const [imageUploadError, setImageUploadError] = useState(null);
  const [showModal, setshowModal] = useState(false);
  const fileRef = useRef();
  const [formData, setFormData] = useState({});
  const dispatch = useDispatch();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setImageUrl(URL.createObjectURL(file));
      setImageUploadError(null); // Reset error when a new image is selected
    }
  };

  useEffect(() => {
    if (image) {
      updateImage();
    }
  }, [image]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const updateImage = async () => {
    const storage = getStorage(app);
    const filename = new Date().getTime() + image.name;
    const storageRef = ref(storage, filename);
    const uploadTask = uploadBytesResumable(storageRef, image);

    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setImageUploadProgress(progress.toFixed(0));
      },
      (error) => {
        setImageUploadError('Image could not be uploaded (file must be under 2 MB)');
        setImageUploadProgress(0);
        setImage(null);
        setImageUrl(null);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setImageUrl(downloadURL);
          setFormData({ ...formData, profilePicture: downloadURL });
          setImageUploadError(null); // Clear error on successful upload
          setImageUploadProgress(0); // Reset progress
        });
      }
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (Object.keys(formData).length === 0) return;
    try {
      dispatch(updateStart());
      const token = document.cookie.split('=')[1]; // Extract token from cookies
      const res = await fetch(`/api/user/update/${currentUser._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
        credentials: 'include', // Include credentials (cookies)
      });
      const data = await res.json();
      if (!res.ok) {
        dispatch(updateFailure(data.message));
      } else {
        dispatch(updateSuccess(data));
      }
    } catch (error) {
      dispatch(updateFailure(error.message));
    }
  };
  
  const handleDelete = async () => {
    setshowModal(false);
    try {
      dispatch(deleteUserStart());
      const token = document.cookie.split('=')[1]; // Extract token from cookies
      const res = await fetch(`/api/user/delete/${currentUser._id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
        credentials: 'include', // Include credentials (cookies)
      });
      const data = await res.json();
      if (!res.ok) {
        dispatch(deleteUserFailure(data.message));
      } else {
        dispatch(deleteUserSuccess(data));
      }
    } catch (error) {
      dispatch(deleteUserFailure(error.message));
    }
  };
  const handleSignout = async () => {
      try {
        const res = await fetch('api/user/signout',{
          method: 'POST',
        });
        const data = await res.json();
        if(!res.ok) {
          console.log(data.message);
        }
        else {
          dispatch(signoutSuccess());
          window.location = '/sign-in';
        }
      } catch (error) {
        console.log(error.message);
      }
  }
  
  return (
    <div className={`w-full p-8 bg-gray-100 dark:bg-gray-800 rounded-lg border border-gray-100 ${theme}`}>
      <h1 className="mb-8 text-3xl font-semibold text-center text-blue-600 dark:text-blue-400">Profile</h1>
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
          <div 
            className="relative w-48 h-48 rounded-full overflow-hidden mx-auto cursor-pointer" 
            onClick={() => fileRef.current.click()}
          >
            {imageUploadProgress > 0 && (
              <CircularProgressbar 
                value={imageUploadProgress}
                text={`${imageUploadProgress}%`}
                strokeWidth={5}
                styles={{
                  root: {
                    width: '100%',
                    height: '100%',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    zIndex: 10,
                  },
                  path: {
                    stroke: `rgba(2,152,199, ${imageUploadProgress / 100})`,
                  },
                  text: {
                    fill: '#0298C7',
                  },
                }}
              />
            )}
            <img src={imageUrl || currentUser.profilePicture} alt="Profile Picture" className="object-cover w-full h-full rounded-full" />
          </div>
          {imageUploadError && (
            <Alert color={'failure'}>{imageUploadError}</Alert>
          )}
          <input type="file" name="" accept="image/*" onChange={handleImageChange} hidden ref={fileRef} />
          <div className="flex flex-col gap-6 w-full max-w-md items-center md:items-start">
            <label>Username</label>
            <TextInput
              type="text"
              id="username"
              placeholder="Username"
              defaultValue={currentUser.username}
              onChange={handleChange}
              className={`rounded-lg bg-transparent focus:outline-none focus:border-blue-500 text-base ${theme === 'dark' ? 'text-white' : 'text-black'}`}
            />
            <label>Email</label>
            <TextInput
              type="email"
              id="email"
              placeholder="Email"
              defaultValue={currentUser.email}
              onChange={handleChange}
              className={`rounded-lg bg-transparent focus:outline-none focus:border-blue-500 text-base ${theme === 'dark' ? 'text-white' : 'text-black'}`}
            />
            <label>Password</label>
            <TextInput
              type="password"
              id="password"
              placeholder="Password"
              defaultValue={'*******'}
              onChange={handleChange}
              className={`rounded-lg bg-transparent focus:outline-none focus:border-blue-500 text-base ${theme === 'dark' ? 'text-white' : 'text-black'}`}
            />
            <Button
              type="submit"
              outline
             className={`rounded-lg bg-transparent text-base ${theme === 'dark' ? 'text-white hover:bg-blue-600' : 'text-white hover:bg-blue-600'}`}
             >
              Edit details
              </Button>
            {
              currentUser.isAdmin && (
                <Link to={'/create-post'}>
                <Button
                  type='button'
                  className={`w-full ${theme === 'dark' ? 'text-white hover:bg-blue-600' : 'text-white hover:bg-blue-600'}`}
                  outline
                >
                  Create a Post
                </Button>
              </Link>
              )
            }
            <div className={`flex flex-col gap-6 ${theme === 'dark' ? 'text-gray-300' : 'text-red-600'}`}>
              <span onClick={() => setshowModal(true)} className="cursor-pointer hover:text-red-600 mx-auto md:mx-0">Delete Account</span>
              <span onClick={handleSignout}className="cursor-pointer hover:text-red-600 mx-auto md:mx-0">Sign out</span>
            </div>
            {
              <Modal show={showModal} onClose={() => setshowModal(false)} popup size={'md'}>
                <Modal.Header/>
                <Modal.Body>
                  <div className="text-center">
                  <HiExclamationCircle className='h-14 w-14  mb-4 mx-auto'/>
                  <h3 className='mb-5 text-lg text-gray-500 dark:text-gray-400'>
                    Are you Sure you want to Delete the account?
                  </h3>
                  <div className="flex flex-wrap justify-center m-3 p-1 space-x-1">
  <button onClick={() => handleDelete()} className="text-red-500 px-4 py-2 border border-red-500 rounded hover:bg-red-500 hover:text-white transition duration-300 ease-in-out">
    Yes
  </button>
  <button onClick={() =>setshowModal(false)} className="text-gray-700 px-4 py-2 border border-gray-700 rounded hover:bg-gray-700 hover:text-white transition duration-300 ease-in-out">
    Cancel
  </button>
</div>

                  
                  </div>
                </Modal.Body>
              </Modal>
            }
          </div>
        </div>
      </form>
    </div>
  );
}

export default Profile;
