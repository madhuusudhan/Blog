import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Spinner, Button } from "flowbite-react";
import { Link } from 'react-router-dom';
import CommentSection from '../Components/CommentSection';
import PostCard from '../Components/PostCard';
function PostPage() {
    const { postSlug } = useParams();
    const [pageLoading, setPageLoading] = useState(false);
    const [post, setPost] = useState(null);
    const [error, setError] = useState(false);
    const [recentPosts, setrecentPosts] = useState([]);
    useEffect(() => {
        const fetchPost = async () => {
            try {
                setPageLoading(true);
                const res = await fetch(`/api/post/getposts/?slug=${postSlug}`);
                console.log(recentPosts.length);
                const data = await res.json();

                if (!res.ok) {
                    throw new Error(data.message || 'Failed to fetch post.');
                }

                setPost(data.posts[0]);
                setError(false);
            } catch (error) {
                setError(true);
                console.error(error);
            } finally {
                setPageLoading(false);
            }
        };
        fetchPost();
    }, [postSlug]);
    useEffect(() => {
        const fetchrecentPosts = async () => {
            try {
                const res = await fetch('/api/post/getposts?limit=3');
                const data = await res.json();
                if(res.ok) {
                    setrecentPosts(data.posts);
                }
            } catch (error) {
                console.log(error);
            }
        }
        fetchrecentPosts();
    },[postSlug]);
    if (pageLoading) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <Spinner size={'xl'} />
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <p>Error loading post. Please try again later.</p>
            </div>
        );
    }

    return (
        <div className='flex p-3 flex-col max-w-6xl mx-auto min-h-screen'>
            <h1 className='text-3xl mt-10 p-3 text-center font-serif max-w-2xl mx-auto lg:text-4xl'>
                {post && post.title}
            </h1>
            <Link className='self-center mt-5 ' to={`/search/?category=${post && post.category}`}>
                <Button className='dark:bg-blue-300 dark:text-black bg-green-500 sans-serif' color='gray' pill size={'xs'}>
                    {post && post.category}
                </Button>
            </Link>
            <img src={post && post.image} alt={post && post.title} className='mt-10 p-3 max-h-[600px] w-full object-cover' />
            <div className='flex justify-between p-3 border border-slate-300 mx-auto w-full max-w-2xl text-xs'>
                <span>{post && new Date(post.createdAt).toLocaleDateString()}</span>
                <span className='italic'>{post && (post.content.length / 1000).toFixed(0)} mins read</span>
            </div>
            <div className='p-3 max-w-2xl mx-auto w-full post-content' dangerouslySetInnerHTML={{ __html: post && post.content }}></div>
            {post && <CommentSection postId={post._id} />}
            <div className="flex flex-col justify-center items-center mb-5">
            <h1 className="text-xl font-bold text-black mt-5 mb-5 decoration-1 dark:text-white">Recent Posts</h1>
                <div className='flex flex-wrap gap-5 mt-5 justify-center'>
                    {
                        recentPosts && 
                        recentPosts.map((post) => <PostCard key={post._id} post={post}></PostCard>)
                    }
                </div>
            </div>
        </div>
    );
}

export default PostPage;
