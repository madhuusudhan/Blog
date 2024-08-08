import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

function User() {
  const { userId } = useParams();
  const [user, setUser] = useState(null);
  const { currentUser } = useSelector((state) => state.user);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch(`/api/user/${userId}`, { 
          method: 'GET', 
          credentials: 'include' // Include credentials to send cookies
        });
        if (res.ok) {
          const data = await res.json();
          setUser(data);
        } else {
          const errorData = await res.json();
          setError(errorData);
        }
      } catch (error) {
        console.log(error);
        setError({ message: error.message });
      }
    };
    fetchUser();
  }, [userId]);

  return (
    <div className="min-h-screen bg-teal-200 dark:bg-blue-900 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        {user ? (
          <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg">
            <div className="flex items-center justify-center">
              <img 
                src={user.profilePicture} 
                alt="No profile picture" 
                className="w-32 h-32 rounded-full object-cover border-4 border-blue-500 dark:border-teal-200"
              />
            </div>
            <div className="mt-4 text-center">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">{user.username}</h2>
              <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">Joined on {new Date(user.createdAt).toLocaleDateString()}</p>
            </div>
          </div>
        ) : (
          error && (
            <div className="bg-red-100 dark:bg-red-800 p-4 rounded-lg shadow-lg text-red-700 dark:text-red-100">
              {error.message}
            </div>
          )
        )}
      </div>
    </div>
  );
}

export default User;
