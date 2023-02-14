import { Squash as Hamburger } from 'hamburger-react'
import React from 'react';
import {useState} from 'react';
import { Link } from 'react-router-dom';

// Maybe there is a better way to implement this. But I'll leave it like this
// At least for now

function HamNavBar() {
    const [isOpen, setIsOpen] = useState(false);
    return(
        <div className='ml-auto md:hidden'>
            <Hamburger toggled={isOpen} toggle={setIsOpen} />
            {isOpen && (
                <div className="absolute bg-[#3894a3] rounded mt-2.5 
                right-0 w-auto h-auto pl-[3.5rem] pr-[1.5rem] pb-[1rem]
                 flex flex-col" >
                    <ul className='flex text-[black] flex-col self-end text-xl items-end space-y-8 pt-3 '>
                        <Link to={'/'} className="hover:text-neutral-200 duration-[30ms]">
                            Home
                        </Link>
                        <Link to={'/play'} className="hover:text-neutral-200 duration-[30ms]">
                            Play
                        </Link>
                        <Link to="/login" className="hover:text-neutral-200 duration-[30ms]">
                            Login
                        </Link>
                        <Link to="/contact" className="hover:text-neutral-200 duration-[30ms]">
                            Contact
                        </Link>
                        <Link to="/api" className="hover:text-neutral-200 duration-[30ms]">
                            Test API
                        </Link>
                    </ul>
                </div>
            )}

        </div>
    );
}

export default HamNavBar

