// import React, { useEffect, useState } from 'react';
// import { useSelector } from 'react-redux';
// import { Link, useNavigate } from 'react-router-dom';
// import { Textarea, Button, Alert, Modal } from 'flowbite-react';   
// import  Comment from './Comment';
// import { HiExclamationCircle } from 'react-icons/hi';
// function CommentSection({ postId }) {
//     const { currentUser } = useSelector((state) => state.user);
//     const [comment, setComment] = useState('');
//     const [commentError, setCommentError] = useState(null);
//     const [postComments, setpostComments] = useState([]);
//     const [showModeldelete, setshowModeldelete] = useState(false);
//     const [commenttoDelete, setcommenttoDelete] = useState(null);
//     const maxLength = 200;
//     const navigate = useNavigate();
//     useEffect(() => {
//         const fetchcomments = async () => {
//             try {
//                 const res = await fetch(`/api/comment/get-comments/${postId}`,{
//                     method: 'GET',
//                 });
//                 if(res.ok) {
//                     const data = await res.json();
//                     console.log(data);
//                     setpostComments(data);
//                 }
//             } catch (error) {
//                 console.log(error);
//             }
//         }
//         fetchcomments();
//     },[postId,comment]);

//     const handleCommentChange = (e) => {
//         setComment(e.target.value);
//     };

//     const handleEdit = async (comment, editedContent) => {
//        setpostComments((c) => 
//         c._id === comment._id ? { ...c, content: editedContent} : c
//     );
//     };

//     const handleLike = async (commentId) => {
//         try {
//             if (!currentUser) {
//                 navigate('sign-in');
//                 return;
//             }
            
//             const res = await fetch(`/api/comment/likeComment/${commentId}`, {
//                 method: 'PUT',
//             });
    
//             if (res.ok) {
//                 const data = await res.json();
//                 setpostComments(comments.map((comment) =>
//                     comment._id === commentId ? {
//                         ...comment,
//                         likes: data.likes,
//                         numberOfLikes: data.likes.length,
//                     } : comment
//                 ));
//             }
//         } catch (error) {
//             console.log(error);
//         }
//     }

//    const handleDelete = async (commentId) => {
//         setshowModeldelete(false);
//         try {
//             if(!currentUser) {
//                 navigate('/sign-in');
//                 return;
//             }
//             const res = await fetch(`/api/comment/deleteComment/${commentId}`,
        
//         {
//             method: 'DELETE',
//         });
//         if(res.ok) {
//             const data = await res.json();
//            setpostComments(postComments.filter((comment) => comment._id !== commentId));
//         }
//         } catch (error) {
//             console.log(error);
//         }
//    } 
    
//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         if (comment.length > maxLength || comment.length == 0 ) {
//             setCommentError('Please change your comment such that it not empty and is not more than 200 characters');
//             return;
//         }
        

//         try {
//             const res = await fetch(`/api/comment/create`, {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json',
//                 },
//                 body: JSON.stringify({ content: comment, postId, userId: currentUser._id }),
//             });

//             if (!res.ok) {
//                 const errorData = await res.json();
//                 setCommentError(errorData.message || 'Failed to submit comment.');
//             } else {
//                 setComment('');
//                 setCommentError(null);
//             }
//         } catch (error) {
//             console.log(error);
//             setCommentError('An error occurred while submitting the comment.');
//         }
//     };

//     return (
//         <div className='max-w-2xl mx-auto w-full p-3'>
//             {currentUser ? (
//                 <div className='flex items-center gap-1 my-5 text-sm'>
//                     <p>Signed in as:</p>
//                     <img className='h-5 w-5 object-cover rounded-full' src={currentUser.profilePicture} alt={currentUser.username} />
//                     <Link className='text-xs text-cyan-600 hover:underline' to={'/dashboard?tab=profile'}>
//                         {currentUser.username}
//                     </Link>
//                 </div>
//             ) : (
//                 <div className='text-sm text-teal-700 my-5 flex gap-1'>
//                     Please Sign in to comment
//                     <Link className='text-cyan-500 hover:underline' to={'/sign-in'}>
//                         Sign In
//                     </Link>
//                 </div>
//             )}
//             {currentUser && (
//                 <form className='border border-teal-500 rounded-md p-3' onSubmit={handleSubmit}>
//                     <Textarea
//                         id='comment'
//                         placeholder='Add a comment...'
//                         rows='3'
//                         maxLength={maxLength}
//                         value={comment}
//                         onChange={handleCommentChange}
//                     />
//                     <div className='flex justify-between items-center mt-2'>
//                         <p>{maxLength - comment.length} Characters remaining...</p>
//                         <Button type='submit' color='cyan'>
//                             Submit
//                         </Button>
//                     </div>
//                     {commentError && <Alert color='failure' className='mt-5'>{commentError}</Alert>}
//                 </form>
//             )}
//             {
//                 postComments.length === 0 ? (
//                     <div className='text-sm-5 my-5'>
//                         No Comments
//                     </div>
//                 ) : (
//                     <>
//                     <div className='text-sm my-5 flex items-center gap-1'>
//                         Comments 
//                         <div className='border border-gray-500 py-1 px-2 rounded-sm'>{postComments.length}</div>
//                     </div>
//                     {
//                         postComments.map(comment => {
//                             <Comment key={comment._id} comment={comment} onLike={handleLike} onEdit={handleEdit} onDelete={(commentId)=>{
//                                 setshowModeldelete(true);
//                                 setcommenttoDelete(commentId)
//                             }}/>
//                         })
//                     }
//                     </>
                    
//                 )
//             }
//             <Modal show={setshowModeldelete} onClose={() => setshowModeldelete(false)} popup size='md'>
//           <Modal.Header />
//           <Modal.Body>
//             <div className="text-center">
//               <HiExclamationCircle className='h-14 w-14 mb-4 mx-auto' />
//               <h3 className='mb-5 text-lg text-gray-500 dark:text-gray-400'>
//                 Are you sure you want to delete this comment?
//               </h3>
//               <div className="flex flex-wrap justify-center m-3 p-1 space-x-1">
//                 <button onClick={() => handleDelete(commenttoDelete)} className="text-red-500 px-4 py-2 border border-red-500 rounded hover:bg-red-500 hover:text-white transition duration-300 ease-in-out">
//                   Yes
//                 </button>
//                 <button onClick={() => setshowModeldelete(false)} className="text-gray-700 px-4 py-2 border border-gray-700 rounded hover:bg-gray-700 hover:text-white transition duration-300 ease-in-out">
//                   Cancel
//                 </button>
//               </div>
//             </div>
//           </Modal.Body>
//         </Modal>
//         </div>
//     );
// }

// export default CommentSection;
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { Textarea, Button, Alert, Modal } from 'flowbite-react';   
import Comment from './Comment';
import { HiExclamationCircle } from 'react-icons/hi';

function CommentSection({ postId }) {
    const { currentUser } = useSelector((state) => state.user);
    const [comment, setComment] = useState('');
    const [commentError, setCommentError] = useState(null);
    const [postComments, setpostComments] = useState([]);
    const [showModeldelete, setshowModeldelete] = useState(false);
    const [commenttoDelete, setcommenttoDelete] = useState(null);
    const maxLength = 200;
    const navigate = useNavigate();

    useEffect(() => {
        const fetchcomments = async () => {
            try {
                const res = await fetch(`/api/comment/get-comments/${postId}`, {
                    method: 'GET',
                });
                if (res.ok) {
                    const data = await res.json();
                    setpostComments(data);
                }
            } catch (error) {
                console.log(error);
            }
        };
        fetchcomments();
    }, [postId]);

    const handleCommentChange = (e) => {
        setComment(e.target.value);
    };

    const handleEdit = (comment, editedContent) => {
        setpostComments((comments) =>
            comments.map((c) =>
                c._id === comment._id ? { ...c, content: editedContent } : c
            )
        );
    };

    const handleLike = async (commentId) => {
        try {
            if (!currentUser) {
                navigate('sign-in');
                return;
            }
            
            const res = await fetch(`/api/comment/likeComment/${commentId}`, {
                method: 'PUT',
            });
    
            if (res.ok) {
                const data = await res.json();
                setpostComments((comments) =>
                    comments.map((comment) =>
                        comment._id === commentId ? {
                            ...comment,
                            likes: data.likes,
                            numberOfLikes: data.likes.length,
                        } : comment
                    )
                );
            }
        } catch (error) {
            console.log(error);
        }
    };

    const handleDelete = async (commentId) => {
        setshowModeldelete(false);
        try {
            if (!currentUser) {
                navigate('/sign-in');
                return;
            }
            const res = await fetch(`/api/comment/deleteComment/${commentId}`, {
                method: 'DELETE',
            });
            if (res.ok) {
                setpostComments(postComments.filter((comment) => comment._id !== commentId));
            }
        } catch (error) {
            console.log(error);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (comment.length > maxLength || comment.length === 0) {
            setCommentError('Please change your comment such that it is not empty and is not more than 200 characters');
            return;
        }
        
        try {
            const res = await fetch(`/api/comment/create`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ content: comment, postId, userId: currentUser._id }),
            });

            if (!res.ok) {
                const errorData = await res.json();
                setCommentError(errorData.message || 'Failed to submit comment.');
            } else {
                setComment('');
                setCommentError(null);
                // Re-fetch comments after submitting a new one
                const data = await res.json();
                setpostComments([...postComments, data]);
            }
        } catch (error) {
            console.log(error);
            setCommentError('An error occurred while submitting the comment.');
        }
    };

    return (
        <div className='max-w-2xl mx-auto w-full p-3'>
            {currentUser ? (
                <div className='flex items-center gap-1 my-5 text-sm'>
                    <p>Signed in as:</p>
                    <img className='h-5 w-5 object-cover rounded-full' src={currentUser.profilePicture} alt={currentUser.username} />
                    <Link className='text-xs text-cyan-600 hover:underline' to={'/dashboard?tab=profile'}>
                        {currentUser.username}
                    </Link>
                </div>
            ) : (
                <div className='text-sm text-teal-700 my-5 flex gap-1'>
                    Please Sign in to comment
                    <Link className='text-cyan-500 hover:underline' to={'/sign-in'}>
                        Sign In
                    </Link>
                </div>
            )}
            {currentUser && (
                <form className='border border-teal-500 rounded-md p-3' onSubmit={handleSubmit}>
                    <Textarea
                        id='comment'
                        placeholder='Add a comment...'
                        rows='3'
                        maxLength={maxLength}
                        value={comment}
                        onChange={handleCommentChange}
                    />
                    <div className='flex justify-between items-center mt-2'>
                        <p>{maxLength - comment.length} Characters remaining...</p>
                        <Button type='submit' color='cyan'>
                            Submit
                        </Button>
                    </div>
                    {commentError && <Alert color='failure' className='mt-5'>{commentError}</Alert>}
                </form>
            )}
            {
                postComments.length === 0 ? (
                    <div className='text-sm-5 my-5'>
                        No Comments
                    </div>
                ) : (
                    <>
                    <div className='text-sm my-5 flex items-center gap-1'>
                        Comments 
                        <div className='border border-gray-500 py-1 px-2 rounded-sm'>{postComments.length}</div>
                    </div>
                    {
                        postComments.map((comment) => (
                            <Comment key={comment._id} comment={comment} onLike={handleLike} onEdit={handleEdit} onDelete={(commentId) => {
                                setshowModeldelete(true);
                                setcommenttoDelete(commentId);
                            }} />
                        ))
                    }
                    </>
                )
            }
            <Modal show={showModeldelete} onClose={() => setshowModeldelete(false)} popup size='md'>
                <Modal.Header />
                <Modal.Body>
                    <div className="text-center">
                        <HiExclamationCircle className='h-14 w-14 mb-4 mx-auto' />
                        <h3 className='mb-5 text-lg text-gray-500 dark:text-gray-400'>
                            Are you sure you want to delete this comment?
                        </h3>
                        <div className="flex flex-wrap justify-center m-3 p-1 space-x-1">
                            <button onClick={() => handleDelete(commenttoDelete)} className="text-red-500 px-4 py-2 border border-red-500 rounded hover:bg-red-500 hover:text-white transition duration-300 ease-in-out">
                                Yes
                            </button>
                            <button onClick={() => setshowModeldelete(false)} className="text-gray-700 px-4 py-2 border border-gray-700 rounded hover:bg-gray-700 hover:text-white transition duration-300 ease-in-out">
                                Cancel
                            </button>
                        </div>
                    </div>
                </Modal.Body>
            </Modal>
        </div>
    );
}

export default CommentSection;
