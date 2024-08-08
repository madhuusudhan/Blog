import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Table, Modal } from 'flowbite-react';
import { Link } from 'react-router-dom';
import { HiExclamationCircle } from 'react-icons/hi';
import {FaCheck, FaTimes} from 'react-icons/fa'
function DashUsers() {
  const { currentUser } = useSelector((state) => state.user);
  const [Users, setUsers] = useState([]);
  const [fetchError, setFetchError] = useState(null);
  const [showMore, setShowMore] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setFetchError(false); // Reset error state before fetch
        const res = await fetch(`/api/user/users?limit=9`,{ method: 'GET', credentials:'include'});
        const data = await res.json();
        if (res.ok) {
          setUsers(data.users);
          if (data.users.length < 9) {
            setShowMore(false);
          }
        } else {
          setFetchError(true);
          console.error('Failed to fetch Users', data);
        }
      } catch (error) {
        setFetchError(true);
        console.error('Error fetching Users:', error);
      }
    };

    if (currentUser?.isAdmin) {
      fetchUsers();
    }
  }, [currentUser]);

  const handleShowMore = async () => {
    const startIndex = Users.length;
    try {
      const res = await fetch(`/api/user/users?startIndex=${startIndex}`);
      const data = await res.json();
      if (res.ok) {
        setUsers((prev) => [...prev, ...data.users]);
        if (data.users.length < 9) {
          setShowMore(false);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  // const handleDelete = async () => {
  //   try {
  //     const res = await fetch(`/api/user/delete/${deleteId}`, { method: 'DELETE' });
  //     const data = await res.json();
  //     if (res.ok) {
  //       const newdata = Users.filter((user) => user._id !== deleteId);
  //       setUsers(newdata);
  //       setShowModal(false);
  //       setDeleteId(null);
  //     }
  //     else {
  //       console.log(error);
  //     }

  //   } catch (error) {
  //     console.log(error);
  //   }
  // };
  const handleDelete = async () => {
    console.log('handleDelete called');
    console.log('deleteId:', deleteId);
    try {
      const res = await fetch(`/api/user/delete/${deleteId}`, { method: 'DELETE' });
      const data = await res.json();
      if (res.ok) {
        const newdata = Users.filter((user) => user._id !== deleteId);
        setUsers(newdata);
        setShowModal(false);
        setDeleteId(null);
      } else {
        console.error('Failed to delete User', data);
      }
    } catch (error) {
      console.error('Error deleting User:', error);
    }
  };
  return (
    <div className='w-full overflow-x-auto p-3 scrollbar scrollbar-track-gray-100 scrollbar-thumb-gray-300 dark:scrollbar-track-gray-700 dark:scrollbar-thumb-gray-500'>
      {fetchError && <p>Error fetching posts. Please try again later.</p>}
      {currentUser?.isAdmin && Users.length > 0 ? (
        <>
          <Table hoverable className='min-w-full shadow-md'>
            <Table.Head>
              <Table.HeadCell>Date created</Table.HeadCell>
              <Table.HeadCell>Profile Picture</Table.HeadCell>
              <Table.HeadCell>Username</Table.HeadCell>
              <Table.HeadCell>Email</Table.HeadCell>
              <Table.HeadCell>Admin</Table.HeadCell>
              <Table.HeadCell>Delete</Table.HeadCell>
            </Table.Head>
            <Table.Body className='divide-y'>
              {Users.map((user) => (
                <Table.Row className='bg-white dark:border-gray-700 dark:bg-gray-800' key={user._id}>
                  <Table.Cell>{new Date(user.createdAt).toLocaleDateString()}</Table.Cell>
                  <Table.Cell>
                    <Link to={`/user/${user._id}`}>
                      <img src={user.profilePicture} alt={user.username} className='w-20 h-20 object-cover rounded-full' />
                    </Link>
                  </Table.Cell>
                  <Table.Cell>
                    <Link className='font-medium text-gray-900 dark:text-white' to={`/user/${user._id}`}>
                      {user.username}
                    </Link>
                  </Table.Cell>
                  <Table.Cell>{user.email}</Table.Cell>
                  <Table.Cell>{user.isAdmin ?  <FaCheck className = "text-green-500"/> : <FaTimes className = "text-red-500"/>}</Table.Cell>
                  <Table.Cell>
                    <button
                      className='text-red-600 hover:underline'
                      onClick={() => {
                        setDeleteId(user._id);
                        setShowModal(true);
                      }}
                    >
                      Delete
                    </button>
                  </Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table>
          {showMore && (
            <div className="flex justify-center mt-4">
              <button
                className="py-2 px-4 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75 transition duration-300"
                onClick={handleShowMore}
              >
                Show more
              </button>
            </div>
          )}
        </>
      ) : (
        <p>You have no Users yet.</p>
      )}
      {showModal && (
        <Modal show={showModal} onClose={() => setShowModal(false)} popup size='md'>
          <Modal.Header />
          <Modal.Body>
            <div className="text-center">
              <HiExclamationCircle className='h-14 w-14 mb-4 mx-auto' />
              <h3 className='mb-5 text-lg text-gray-500 dark:text-gray-400'>
                Are you sure you want to delete this User?
              </h3>
              <div className="flex flex-wrap justify-center m-3 p-1 space-x-1">
                <button onClick={handleDelete} className="text-red-500 px-4 py-2 border border-red-500 rounded hover:bg-red-500 hover:text-white transition duration-300 ease-in-out">
                  Yes
                </button>
                <button onClick={() => setShowModal(false)} className="text-gray-700 px-4 py-2 border border-gray-700 rounded hover:bg-gray-700 hover:text-white transition duration-300 ease-in-out">
                  Cancel
                </button>
              </div>
            </div>
          </Modal.Body>
        </Modal>
      )}
    </div>
  );
}

export default DashUsers;
