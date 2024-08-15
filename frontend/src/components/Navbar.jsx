import React from 'react';
import logo from '../assets/images/logo.png';
import { SignInButton, UserButton, useUser } from '@clerk/clerk-react';

const Navbar = () => {
    const { isSignedIn } = useUser();

    return (
        <div className='flex justify-between bg-blue-700 p-3'>
            <div>
                <img className='h-12 w-12' src={logo} alt='logo' />
            </div>
            <div>
                <input 
                    type='text' 
                    placeholder='Search Walmart' 
                    className='border-2 bg-white h-10 px-5 pr-16 rounded-2xl text-sm focus:outline-none' 
                />
            </div>
            <div >
                {isSignedIn ? (
                    <UserButton />
                ) : (
                    <div className='bg-yellow-500 text-white px-5 py-1 text-lg w-24 h-10 rounded-2xl '> <SignInButton /> </div>
                )}
            </div>
        </div>
    );
};

export default Navbar;
