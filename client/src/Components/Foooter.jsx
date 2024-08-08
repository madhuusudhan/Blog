import React from 'react';
import { Footer } from 'flowbite-react';
import { Link } from 'react-router-dom';
import { BsLinkedin } from 'react-icons/bs';
import { FaXTwitter } from "react-icons/fa6";

export default function FooterCom() {
  return (
    <Footer container className='border border-t-8 border-teal-500'>
      <div className='w-full max-w-7xl mx-auto'>
        <div className='grid w-full justify-between sm:flex md:grid-cols-1'>
          <div className='mt-5'>
            <Link
              to='/'
              className='self-center whitespace-nowrap text-lg sm:text-xl font-semibold dark:text-white'
            >
              <span className='px-2 py-1  bg-gradient-to-r from-green-400 via-blue-500 to-teal-500 rounded-lg text-black'>
                Madhusudhan&apos;s
              </span>
              Blog
            </Link>
          </div>
          <div className='grid grid-cols-2 gap-8 mt-4 sm:grid-cols-3 sm:gap-6'>
            <div>
              <Footer.Title title='Follow me' />
              <Footer.LinkGroup col>
                <Footer.Link
                  href='https://github.com/madhuusudhan'
                  target='_blank'
                  rel='noopener noreferrer'
                >
                  Github
                </Footer.Link>
                <Footer.Link href='https://discordapp.com/users/Madhusudhan1323'>Discord</Footer.Link>
              </Footer.LinkGroup>
            </div>
            <div>
              <Footer.Title title='Social' />
              <div className="flex gap-6">
                <Footer.Icon href='https://x.com/madhuusudhan13' target='_blank' icon={FaXTwitter}/>
                <Footer.Icon href='https://linkedin.com/in/madhusudhan-kishtapuram' target='_blank' icon={BsLinkedin}/>
              </div>
            </div>
          </div>
        </div>
        <Footer.Divider />
        <div className='w-full sm:flex sm:items-center sm:justify-between'>
          <Footer.Copyright
            href='#'
            by="Madhusudhan's blog"
            year={new Date().getFullYear()}
          />
        </div>
      </div>
    </Footer>
  );
}
