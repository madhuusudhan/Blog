import { Link } from 'react-router-dom';

export default function PostCard({ post }) {
  return (
    <div className='group relative w-full border border-teal-500 rounded-lg overflow-hidden sm:w-[380px] transition-all duration-300 hover:shadow-lg'>
      <Link to={`/post/${post.slug}`} className='block'>
        <img
          src={post.image}
          alt='post cover'
          className='h-[220px] w-full object-cover transition-transform duration-300 group-hover:scale-95'
        />
      </Link>
      <div className='p-3 flex flex-col gap-2'>
        <p className='text-base font-semibold line-clamp-2 transition-transform duration-300 group-hover:translate-x-2'>
          {post.title}
        </p>
        <span className='italic text-sm text-gray-600'>{post.category}</span>
        <Link
          to={`/post/${post.slug}`}
          className='absolute bottom-0 left-0 right-0 p-2 text-center text-teal-500 border-t border-teal-500 transition-all duration-300 group-hover:translate-y-0 translate-y-full bg-white hover:bg-teal-500 hover:text-white'
        >
          Read article
        </Link>
      </div>
    </div>
  );
}
