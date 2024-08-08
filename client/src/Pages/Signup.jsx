import { Label, TextInput, Button, Alert, Spinner } from 'flowbite-react';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import OAuth from '../Components/OAuth';

function Signup() {
    const [formdata, setformdata] = useState({ username: '', email: '', password: '' });
    const [errorMessage, seterrorMessage] = useState(null);
    const [loading, setloading] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setformdata({ ...formdata, [e.target.id]: e.target.value.trim() });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!formdata.username || !formdata.password || !formdata.email) {
            return seterrorMessage('Please fill all the Fields');
        }
        try {
            setloading(true);
            seterrorMessage(null);
            const res = await fetch('/api/auth/signup', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formdata)
            });

            if (!res.ok) {
                const errorData = await res.json();
                throw new Error(`HTTP error! status: ${res.status}, message: ${errorData.message}`);
            }

            const data = await res.json();
            if (data.success === false) {
                return seterrorMessage(data.message);
            }
            setloading(false);
            navigate('/sign-in');
        } catch (error) {
            seterrorMessage(error.message);
            setloading(false);
        }
    };

    return (
        <div className="min-h-screen mt-20 flex justify-center items-center">
            <div className="w-full max-w-md p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md">
                <form className="space-y-6" onSubmit={handleSubmit}>
                    <div>
                        <Label htmlFor="username" value="Username" className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300" />
                        <TextInput
                            type="text"
                            placeholder="Username"
                            id="username"
                            className="block w-full px-4 py-2 text-gray-700 bg-white dark:bg-gray-700 border rounded-md focus:border-blue-500 focus:ring-blue-500"
                            onChange={handleChange}
                        />
                    </div>
                    <div>
                        <Label htmlFor="email" value="Email" className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300" />
                        <TextInput
                            type="email"
                            placeholder="Email"
                            id="email"
                            className="block w-full px-4 py-2 text-gray-700 bg-white dark:bg-gray-700 border rounded-md focus:border-blue-500 focus:ring-blue-500"
                            onChange={handleChange}
                        />
                    </div>
                    <div>
                        <Label htmlFor="password" value="Password" className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300" />
                        <TextInput
                            type="password"
                            placeholder="Password"
                            id="password"
                            className="block w-full px-4 py-2 text-gray-700 bg-white dark:bg-gray-700 border rounded-md focus:border-blue-500 focus:ring-blue-500"
                            onChange={handleChange}
                        />
                    </div>
                    <Button gradientDuoTone="purpleToPink" type="submit" className="w-full" disabled={loading}>
                        {loading ? (
                            <Spinner size='sm'>
                                <span>Loading...</span>
                            </Spinner>
                        ) : 'Sign up'}
                    </Button>
                    <OAuth />
                </form>
                <div className="flex gap-2 text-sm mt-5 justify-center">
                    <span>Have an account?</span>
                    <Link to="/sign-in" className="text-blue-500 hover:underline">
                        Sign in
                    </Link>
                </div>
                {errorMessage && (
                    <Alert className='mt-5' color='failure'>
                        {errorMessage}
                    </Alert>
                )}
            </div>
        </div>
    );
}

export default Signup;
