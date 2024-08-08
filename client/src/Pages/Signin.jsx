// import { Label, TextInput, Button, Alert, Spinner } from 'flowbite-react';
// import { Link, useNavigate } from 'react-router-dom';
// import { useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
import { signInStart, signInFailure, signInSuccess } from '../Redux/User/userSlice';
import OAuth from '../Components/OAuth';

// function Signin() {
//     const [formdata, setformdata] = useState({ email: '', password: '' });
//     const { loading, error: errorMessage } = useSelector(state => state.user);
//     const navigate = useNavigate();
//     const dispatch = useDispatch();

//     const handleChange = (e) => {
//         setformdata({ ...formdata, [e.target.id]: e.target.value.trim() });
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         if (!formdata.password || !formdata.email) {
//             return dispatch(signInFailure('Please fill all the Fields'));
//         }
//         try {
//             dispatch(signInStart());
//             const res = await fetch('api/auth/signin', {
//                 method: 'POST',
//                 headers: { 'Content-Type': 'application/json' },
//                 body: JSON.stringify(formdata)
//             });

//             if (!res.ok) {
//                 const errorData = await res.json();
//                 throw new Error(`HTTP error! status: ${res.status}, message: ${errorData.message}`);
//             }

//             const data = await res.json();
//             if (data.success === false) {
//                 dispatch(signInFailure(data.message));
//             }
//             dispatch(signInSuccess(data));
//             navigate('/');
//         } catch (error) {
//             dispatch(signInFailure(error.message));
//         }
//     };

//     return (
//         <div className="min-h-screen mt-20 flex justify-center items-center">
//             <div className="w-full max-w-md p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md">
//                 <form className="space-y-6" onSubmit={handleSubmit}>
//                     <div>
//                         <Label htmlFor="email" value="Email" className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300" />
//                         <TextInput
//                             type="email"
//                             placeholder="Email"
//                             id="email"
//                             className="block w-full px-4 py-2 text-gray-700 bg-white dark:bg-gray-700 border rounded-md focus:border-blue-500 focus:ring-blue-500"
//                             onChange={handleChange}
//                         />
//                     </div>
//                     <div>
//                         <Label htmlFor="password" value="Password" className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300" />
//                         <TextInput
//                             type="password"
//                             placeholder="******"
//                             id="password"
//                             className="block w-full px-4 py-2 text-gray-700 bg-white dark:bg-gray-700 border rounded-md focus:border-blue-500 focus:ring-blue-500"
//                             onChange={handleChange}
//                         />
//                     </div>
//                     <Button gradientDuoTone="purpleToPink" type="submit" className="w-full" disabled={loading}>
//                         {loading ? (
//                             <Spinner size='sm'>
//                                 <span>Loading...</span>
//                             </Spinner>
//                         ) : 'Sign in'}
//                     </Button>
//                     <OAuth />
//                 </form>
//                 <div className="flex gap-2 text-sm mt-5 justify-center">
//                     <span>Don&apos;t have an account?</span>
//                     <Link to="/sign-up" className="text-blue-500 hover:underline">
//                         Sign up
//                     </Link>
//                 </div>
//                 {errorMessage && (
//                     <Alert className='mt-5' color='failure'>
//                         {errorMessage}
//                     </Alert>
//                 )}
//             </div>
//         </div>
//     );
// }

// export default Signin;
import { Alert, Button, Label, Spinner, TextInput } from 'flowbite-react';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

export default function SignIn() {
  const [formData, setFormData] = useState({});
  const { loading, error: errorMessage } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.email || !formData.password) {
      return dispatch(signInFailure('Please fill all the fields'));
    }
    try {
      dispatch(signInStart());
      const res = await fetch('/api/auth/signin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(signInFailure(data.message));
      }

      if (res.ok) {
        dispatch(signInSuccess(data));
        navigate('/');
      }
    } catch (error) {
      dispatch(signInFailure(error.message));
    }
  };
  return (
    <div className='min-h-screen mt-20'>
      <div className='flex p-3 max-w-3xl mx-auto flex-col md:flex-row md:items-center gap-5'>
        {/* left */}
        {/* right */}

        <div className='flex-1'>
          <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
            <div>
              <Label value='Your email' />
              <TextInput
                type='email'
                placeholder='name@company.com'
                id='email'
                onChange={handleChange}
              />
            </div>
            <div>
              <Label value='Your password' />
              <TextInput
                type='password'
                placeholder='**********'
                id='password'
                onChange={handleChange}
              />
            </div>
            <Button
              gradientDuoTone='purpleToPink'
              type='submit'
              disabled={loading}
            >
              {loading ? (
                <>
                  <Spinner size='sm' />
                  <span className='pl-3'>Loading...</span>
                </>
              ) : (
                'Sign In'
              )}
            </Button>
            <OAuth />
          </form>
          <div className='flex gap-2 text-sm mt-5'>
            <span>Dont Have an account?</span>
            <Link to='/sign-up' className='text-blue-500'>
              Sign Up
            </Link>
          </div>
          {errorMessage && (
            <Alert className='mt-5' color='failure'>
              {errorMessage}
            </Alert>
          )}
        </div>
      </div>
    </div>
  );
}