import React from 'react'
import {TextInput, FileInput, Button, Alert, Select} from 'flowbite-react'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { app } from '../firebase.js';
import { getStorage, uploadBytesResumable, ref, getDownloadURL } from 'firebase/storage';
import { useState } from 'react';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css'
import { useNavigate } from 'react-router-dom';
function Createpost() {
  const [file, setfile] = useState(null);
  const [imageUploadProgress, setimageUploadProgress] = useState(null);
  const [imageUploadError, setimageUploadError] = useState(null);
  const [formData, setFormData] = useState({});
  const [publishError, setpublishError] = useState(null);
  // console.log(formData);
  const navigate = useNavigate();
  const uploadImage = async () =>{
      try {
        if(!file) {
          setimageUploadError('Please Select an image');
          return;
        }
        setimageUploadError(null);
        const storage = getStorage(app);
        const filename = new Date().getTime() + '-' + file.name;
        const storageRef = ref(storage, filename);
        const uploadTask = uploadBytesResumable(storageRef, file);
        uploadTask.on(
          'state_changed',
          (snapshot) => {
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            setimageUploadProgress(progress.toFixed(0));
          },
          (error) => {
            setimageUploadError('Image upload failed');
            setimageUploadProgress(null);
          },
          () => {
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) =>{
              setimageUploadProgress(null);
              setimageUploadError(null);
              setFormData({ ...formData, image: downloadURL});
            });
          }
        );
      } catch (error) {
        setimageUploadError('Image upload failed');
        setimageUploadProgress(null);
        console.log(error);
      }

  }
  console.log(publishError);
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/post/create',{
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if(!res.ok) {
        setpublishError(data.message);
        return;
      }
      if(data.success === false) {
        setpublishError(data.message);
        return;
      }
      if(res.ok) {
        setpublishError(null);
        const postend = data.savedPost.slug;
        // console.log(postend);
        navigate(`/post/${postend}`);
      }
    } catch (error) {
      setpublishError('Publish Error');
      console.log(error);
    }
  }
  return (
    <div className="p-3 max-w-3xl mx-auto min-h-screen">
      <h1 className="text-center text-3xl my-7 font-semibold">
        Create a post
      </h1>
      <form className='flex flex-col gap-4' onSubmit={(e) =>handleSubmit(e)}>
          <div className='flex flex-col gap-4 sm:flex-row justify-between'>
          <TextInput type='text' placeholder='Title' required id='title' className='flex-1' 
          onChange={(e) => setFormData({ ...formData, title: e.target.value})}
          >
           </TextInput>
           <Select
           onChange={(e) => setFormData({ ...formData, category: e.target.value})}
           >
            <option value="Uncategorized">Select a Category</option>
            <option value="Web-development">Web Development</option>
            <option value="Devops">Devops</option>
            <option value="BlockChain">Blockchain</option>
           </Select>
          </div>
          <div className='flex gapp-4 items-center justify-between border-4 border-green-500 border-dotted p-3'>
            <FileInput type='file' accept='image/*' onChange={(e) =>setfile(e.target.files[0])}></FileInput>
            <Button type='button' disabled={imageUploadProgress} gradientDuoTone={'purpleToBlue'} size={'sm'} outline onClick={uploadImage}> {
              imageUploadProgress ? <div className='w-16 h-16'>
                 <CircularProgressbar
                 value={imageUploadProgress}
                 text={`${imageUploadProgress || 0}%`}
                 />
              </div> : 'Upload Image'
            }</Button>
          </div>
          {
            imageUploadError && (
              <Alert color='failure'>
                {imageUploadError}
              </Alert>
            )
          }
          {
            formData.image && 
            <img src={formData.image} alt="Uploaded Image" className='w-full h-72 object-cover' />
          }
          <ReactQuill required theme='snow' placeholder='Start writing...' className='h-72 mb-12' 
          onChange={(value) => setFormData({ ...formData, content:value})}
          />
          <Button onClick ={(e) =>handleSubmit(e)}gradientDuoTone="purpleToBlue">Submit</Button>
          {
            publishError && <Alert clacolor='failure' className='mt-5'>
              {publishError}
            </Alert>
          }
      </form>

    </div>
  )
}

export default Createpost