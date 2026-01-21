import React, { useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { assets } from '../assets/assets';
import { useAuth } from '../context/AuthContext';
import UserButton from './UserButton';
import { useState } from 'react';

const Navbar = () => {
    const navLinks = [
        { name: 'Home', path: '/' },
        { name: 'Hotels', path: '/hotels' },
        { name: 'Experience', path: '/experience' },
        { name: 'About', path: '/about' },
    ];

    const Booking = () => (
        <svg className="w-4 h-4 text-gray-700" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24" >
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 19V4a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v13H7a2 2 0 0 0-2 2Zm0 0a2 2 0 0 0 2 2h12M9 3v14m7 0v4" />
        </svg>
    )

    const SettingsIcon = () => (
        <svg className="w-4 h-4 text-gray-700" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
    )

    const [isScrolled, setIsScrolled] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const { openSignIn, user } = useAuth();
    const isOwner = user && (user.role === 'hotelOwner' || user.role === 'admin');
    const navigate = useNavigate();
    const locate = useLocation();

    useEffect(() => {
        if (locate.pathname !== "/") {
            setIsScrolled(true);
            return;
        }
        else {
            setIsScrolled(false);
        }

        const handleScroll = () => {
            setIsScrolled(window.scrollY > 10);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, [locate.pathname]);

    return (
        <nav className={`fixed top-0 left-0 w-full flex items-center justify-between px-4 md:px-16 lg:px-24 xl:px-32 transition-all duration-500 z-50 ${isScrolled ? "bg-white/80 shadow-md text-gray-700 backdrop-blur-lg py-3 md:py-4" : "py-4 md:py-6"}`}>
            {/* Logo */}
            <Link to="/" >
                <img src={assets.logo} alt="logo" className={`h-13 ${isScrolled && "invert opacity-80"}`} />
            </Link>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-4 lg:gap-8">
                {navLinks.map((link, i) => (
                    <Link
                        key={i}
                        to={link.path}
                        className={`group flex flex-col gap-0.5 ${isScrolled ? "text-gray-700" : "text-white"} ${locate.pathname === link.path ? "font-medium" : ""}`}
                    >
                        {link.name}
                        <div className={`${isScrolled ? "bg-gray-700" : "bg-white"} h-0.5 ${locate.pathname === link.path ? "w-full" : "w-0"} group-hover:w-full transition-all duration-300`} />
                    </Link>
                ))}
                {isOwner && <button onClick={() => (navigate("/owner"))} className={`border px-4 py-1 text-sm font-light rounded-full cursor-pointer ${isScrolled ? 'text-black' : 'text-white'} transition-all`}>
                    Owner
                </button>}
                {user?.role === 'admin' && <button onClick={() => (navigate("/admin"))} className={`border px-4 py-1 text-sm font-light rounded-full cursor-pointer ${isScrolled ? 'text-black' : 'text-white'} transition-all`}>
                    Admin
                </button>}
            </div>

            {/* Desktop Right */}
            <div className="hidden md:flex items-center gap-4">
                {user ?
                    (<UserButton>
                        <UserButton.MenuItems>
                            <UserButton.Action label='My Booking' labelIcon={<Booking />} onClick={() => (navigate("/my-bookings"))} />
                            <UserButton.Action label='Settings' labelIcon={<SettingsIcon />} onClick={() => (navigate("/settings"))} />
                        </UserButton.MenuItems>
                    </UserButton>)
                    :
                    (<button onClick={openSignIn} className="bg-black text-white px-8 py-2.5 rounded-full ml-4 transition-all duration-500">
                        Login
                    </button>)
                }
            </div>

            {/* Mobile Menu Button */}
            <div className="flex items-center gap-3 md:hidden">
                <img onClick={() => setIsMenuOpen(!isMenuOpen)} src={assets.menuIcon} alt="menuicon" className={`${isScrolled && "invert"} h-4`} />
            </div>

            {/* Mobile Menu */}
            <div className={`fixed top-0 left-0 w-full h-screen bg-white text-base flex flex-col md:hidden items-center justify-center gap-6 font-medium text-gray-800 transition-all duration-500 ${isMenuOpen ? "translate-x-0" : "-translate-x-full"}`}>
                <button className="absolute top-4 right-4" onClick={() => setIsMenuOpen(false)}>
                    <img src={assets.closeMenu} alt="closemenu" className="h-6.5" />
                </button>

                {navLinks.map((link, i) => (
                    <Link
                        key={i}
                        to={link.path}
                        onClick={() => setIsMenuOpen(false)}
                        className={locate.pathname === link.path ? "font-medium" : ""}
                    >
                        {link.name}
                    </Link>
                ))}

                {isOwner && <button onClick={() => { navigate("/owner"); setIsMenuOpen(false) }} className="border px-4 py-1 text-sm font-light rounded-full cursor-pointer transition-all">
                    Owner Dashboard
                </button>}

                {user?.role === 'admin' && <button onClick={() => { navigate("/admin"); setIsMenuOpen(false) }} className="border px-4 py-1 text-sm font-light rounded-full cursor-pointer transition-all">
                    Admin Dashboard
                </button>}

                {user ?
                    (<UserButton>
                        <UserButton.MenuItems>
                            <UserButton.Action label='My Booking' labelIcon={<Booking />} onClick={() => (navigate("/my-bookings"))} />
                            <UserButton.Action label='Settings' labelIcon={<SettingsIcon />} onClick={() => (navigate("/settings"))} />
                        </UserButton.MenuItems>
                    </UserButton>)
                    :
                    (<button onClick={openSignIn} className="bg-black text-white px-8 py-2.5 rounded-full transition-all duration-500">
                        Login
                    </button>)
                }
            </div>
        </nav>
    );
}

export default Navbar
