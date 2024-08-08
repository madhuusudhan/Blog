import React from 'react';
import { Button } from 'flowbite-react';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';

const profilePictureURL = 'https://firebasestorage.googleapis.com/v0/b/blog-app-mern-abcd4.appspot.com/o/IMG_20231113_174306%5B1%5D.jpg?alt=media&token=a68d5db7-2450-4075-8c76-30ac85b2d7c3';

const About = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900 p-6">
      <div className="flex flex-col md:flex-row items-center bg-white dark:bg-gray-800 shadow-2xl rounded-lg p-8 md:p-12 w-full max-w-4xl">
        <div className="flex flex-col md:w-1/2 mb-8 md:mb-0 md:pr-8">
          <h1 className="text-3xl md:text-4xl font-extrabold text-gray-800 dark:text-white mb-4">
            Hello there!
          </h1>
          <p className="text-base md:text-lg text-gray-700 dark:text-gray-300 mb-6">
            Welcome to my corner of the internet! I’m Madhusudhan, a passionate software developer who loves delving into web technologies, DevOps, and the latest tech trends. This blog is my playground where I explore and share insights on a variety of tech topics.
          </p>
          <p className="text-base md:text-lg text-gray-700 dark:text-gray-300 mb-6">
            Here, you’ll discover posts ranging from practical coding tutorials to deep dives into software engineering. I’m always learning and experimenting with new technologies, so there’s always something new to check out. I hope you find the content both informative and inspiring.
          </p>
          <p className="text-base md:text-lg text-gray-700 dark:text-gray-300 mb-6">
            Feel free to join the conversation by leaving comments, engaging with fellow readers, and sharing your thoughts. Let’s build a vibrant community of tech enthusiasts and lifelong learners together!
          </p>
        </div>
        <div className="flex items-center justify-center md:w-1/2">
          <img
            src={profilePictureURL}
            alt="Madhusudhan"
            className="w-48 h-48 md:w-64 md:h-64 rounded-full border-4 border-gray-300 dark:border-gray-600 shadow-lg"
          />
        </div>
      </div>
      <div className="mt-12 flex flex-col md:flex-row gap-4 md:gap-6">
        <Button
          href="https://github.com/madhuusudhan"
          target="_blank"
          rel="noopener noreferrer"
          color="light"
          className="flex items-center space-x-3 px-6 py-3 border border-gray-300 dark:border-gray-600 rounded-full shadow-lg transition-transform transform hover:scale-105 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-white"
        >
          <FaGithub className="text-xl md:text-2xl" />
          <span className="hidden md:inline ml-2">GitHub</span>
        </Button>
        <Button
          href="https://twitter.com/madhuusudhan13"
          target="_blank"
          rel="noopener noreferrer"
          color="light"
          className="flex items-center space-x-3 px-6 py-3 border border-gray-300 dark:border-gray-600 rounded-full shadow-lg transition-transform transform hover:scale-105 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-white"
        >
          <FaXTwitter className="text-xl md:text-2xl" />
          <span className="hidden md:inline ml-2">Twitter</span>
        </Button>
        <Button
          href="https://www.linkedin.com/in/madhusudhan-kishtapuram/"
          target="_blank"
          rel="noopener noreferrer"
          color="light"
          className="flex items-center space-x-3 px-6 py-3 border border-gray-300 dark:border-gray-600 rounded-full shadow-lg transition-transform transform hover:scale-105 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-white"
        >
          <FaLinkedin className="text-xl md:text-2xl" />
          <span className="hidden md:inline ml-2">LinkedIn</span>
        </Button>
      </div>
    </div>
  );
};

export default About;
