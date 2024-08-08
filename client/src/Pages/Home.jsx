import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import PostCard from '../Components/PostCard';

function Home() {
  const [Posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const res = await fetch(`/api/post/getposts`);
      const data = await res.json();
      setPosts(data.posts);
    };
    fetchPosts();
  }, []);

  return (
    <div className='p-10'>
      <div className="flex flex-col gap-6 p-20 px-3">
        <h1 className="text-3xl font-bold">Welcome to my Blog</h1>
        <p className="text-gray-700 text-xs text-wrap font-medium dark:text-white sm:text-sm">
          Hi there, I am Madhusudhan and I welcome you to my blog where I share insights and lessons from my journey. I write about web development, DevOps, and more. Here, you'll find a curated collection of articles that delve into the latest trends, best practices, and innovative solutions in these fields. Join me as I explore and unravel the complexities of modern technology, one post at a time.
        </p>
        <Link to={'/search'} className='text-xs sm:text-sm text-teal-700 font-bold hover:underline'> View all posts</Link>
      </div>
      <div className='max-w-6xl mx-auto p-3 flex flex-col gap-8 py-7'>
        {Posts && Posts.length > 0 && (
          <div className='flex flex-col gap-6'>
            <h2 className='text-2xl font-semibold text-center'>Recent Posts</h2>
            <div className='grid  gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'>
              {Posts.map((post) => (
                <PostCard post={post} key={post._id} />
              ))}
            </div>
            <Link to={'/search'} className='text-teal-700 font-bold hover:underline text-center'>View all Posts</Link>
          </div>
        )}
      </div>
    </div>
  );
}

export default Home;
