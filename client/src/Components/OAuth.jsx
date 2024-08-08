import { Button } from "flowbite-react";
import { AiFillGoogleCircle } from 'react-icons/ai';
import {GoogleAuthProvider, getAuth, signInWithPopup} from 'firebase/auth'
import {app} from '../firebase'
import { useDispatch } from "react-redux";
import { signInSuccess } from "../Redux/User/userSlice";
import { useNavigate } from "react-router-dom";
function OAuth() {
    const auth = getAuth(app);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const handleGoogleClick = async () =>{
            const provider = new GoogleAuthProvider();
            provider.setCustomParameters({prompt: 'select_account'});
            try {
                  const resultsFromGoogle = await signInWithPopup(auth, provider );
                  console.log(resultsFromGoogle);
                  const res = await fetch('/api/auth/google', {
                    method: 'POST',
                    headers: {'Content-Type': 'application/json'},
                    body: JSON.stringify({
                        name: resultsFromGoogle.user.displayName,
                        email: resultsFromGoogle.user.email,
                        googlePhotoUrl: resultsFromGoogle.user.photoURL,
                    })
                 })
                 const data = await res.json();
                    if(res.ok) {
                        dispatch(signInSuccess(data));
                        navigate('/');
                    }
                    console.log(data);
            } catch (error) {
                console.log(error);
            }
    }
  return (
    <Button
      type="button"
      className="flex items-center justify-center px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 hover:bg-indigo-100"
      gradientDuoTone="blueToWhite"
      outline
      onClick={handleGoogleClick}
    >
      <AiFillGoogleCircle className="mr-2 w-6 h-6 text-blue-500" />
      <span className="text-sm font-medium text-blue-700">Continue with Google</span>
    </Button>
  );
}

export default OAuth;
