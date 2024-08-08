import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Table, Modal } from 'flowbite-react';
import { Link } from 'react-router-dom';
import { HiExclamationCircle } from 'react-icons/hi';

function Posts() {
  const { currentUser } = useSelector((state) => state.user);
  const [posts, setPosts] = useState([]);
  const [fetchError, setFetchError] = useState(null);
  const [showMore, setShowMore] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setFetchError(false); 
        const res = await fetch(`/api/post/getposts?userId=${currentUser._id}`);
        const data = await res.json();
        if (res.ok) {
          setPosts(data.posts);
          if (data.posts.length < 9) {
            setShowMore(false);
          }
        } else {
          setFetchError(true);
          console.error('Failed to fetch posts', data);
        }
      } catch (error) {
        setFetchError(true);
        console.error('Error fetching posts:', error);
      }
    };

    if (currentUser?.isAdmin) {
      fetchPosts();
    }
  }, [currentUser]);

  const handleShowMore = async () => {
    const startIndex = posts.length;
    try {
      const res = await fetch(`/api/post/getposts?userId=${currentUser._id}&startIndex=${startIndex}`);
      const data = await res.json();
      if (res.ok) {
        setPosts((prev) => [...prev, ...data.posts]);
        if (data.posts.length < 9) {
          setShowMore(false);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async () => {
    try {
      const res = await fetch(`/api/post/delete/${deleteId}/${currentUser._id}`, { method: 'DELETE' });
      const data = await res.json();
      if (res.ok) {
        const newdata = posts.filter((post) => post._id !== deleteId);
        setPosts(newdata);
        setShowModal(false);
        setDeleteId(null);
      }
      else {
        console.log(error);
      }

    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className='w-full overflow-x-auto p-3 scrollbar scrollbar-track-gray-100 scrollbar-thumb-gray-300 dark:scrollbar-track-gray-700 dark:scrollbar-thumb-gray-500'>
      {fetchError && <p>Error fetching posts. Please try again later.</p>}
      {currentUser?.isAdmin && posts.length > 0 ? (
        <>
          <Table hoverable className='min-w-full shadow-md'>
            <Table.Head>
              <Table.HeadCell>Date created</Table.HeadCell>
              <Table.HeadCell>Post image</Table.HeadCell>
              <Table.HeadCell>Post title</Table.HeadCell>
              <Table.HeadCell>Category</Table.HeadCell>
              <Table.HeadCell>Edit</Table.HeadCell>
              <Table.HeadCell>Delete</Table.HeadCell>
            </Table.Head>
            <Table.Body className='divide-y'>
              {posts.map((post) => (
                <Table.Row className='bg-white dark:border-gray-700 dark:bg-gray-800' key={post._id}>
                  <Table.Cell>{new Date(post.updatedAt).toLocaleDateString()}</Table.Cell>
                  <Table.Cell>
                    <Link to={`/post/${post._id}`}>
                      <img src={post.image} alt={post.title} className='w-40 h-20 object-cover' />
                    </Link>
                  </Table.Cell>
                  <Table.Cell>
                    <Link className='font-medium text-gray-900 dark:text-white' to={`/post/${post.slug}`}>
                      {post.title}
                    </Link>
                  </Table.Cell>
                  <Table.Cell>{post.category}</Table.Cell>
                  <Table.Cell>
                    <Link to={`/update-post/${post._id}`}>
                      <button className='text-blue-600 hover:underline'>Edit</button>
                    </Link>
                  </Table.Cell>
                  <Table.Cell>
                    <button
                      className='text-red-600 hover:underline'
                      onClick={() => {
                        setDeleteId(post._id);
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
        <p>You have no posts</p>
      )}
      {showModal && (
        <Modal show={showModal} onClose={() => setShowModal(false)} popup size='md'>
          <Modal.Header />
          <Modal.Body>
            <div className="text-center">
              <HiExclamationCircle className='h-14 w-14 mb-4 mx-auto' />
              <h3 className='mb-5 text-lg text-gray-500 dark:text-gray-400'>
                Are you sure you want to delete this post?
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

export default Posts;
