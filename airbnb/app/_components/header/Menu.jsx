"use client";
import usePopup from "@/hooks/usePopup";
import { loggedinUsersLink, loggedOutUsersLink } from "@/lib/menuLinks";
import avatar from "@/public/avatar.jpg";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useRef } from "react";
import { FaUser } from "react-icons/fa";
import { FaBars } from "react-icons/fa6";
import { HiOutlineLogout } from "react-icons/hi";
import LanguageSelector from "./LanguageSelector";

const Menu = () => {
    const dropdownRef = useRef(null);
    const { togglePopup, show } = usePopup(dropdownRef);
    const { data } = useSession();
    const router = useRouter();
    const pathname = usePathname();

    if (data && data?.error === "RefreshAccessTokenError") {
        signOut();
    }

    return (
        <div className='flex items-center space-x-4 relative justify-end'>
            <LanguageSelector />

            <button
                onClick={togglePopup}
                className='bg-white border border-zinc-300 text-zinc-800 px-4 py-2 rounded-full hover:shadow-md flex gap-3 items-center justify-center'
                aria-expanded={show}
                aria-haspopup='menu'>
                <FaBars />
                <span className='bg-zinc-600 w-6 h-6 rounded-full flex items-center justify-center text-xs text-white'>
                    {data?.user && data?.user?.image ? (
                        <Image
                            src={data?.user?.image}
                            alt={
                                data?.user?.name
                                    ? data?.user?.name
                                    : "LoggedIn User"
                            }
                            width={100}
                            height={100}
                            className='rounded-full'
                        />
                    ) : data?.user && !data?.user?.image ? (
                        <Image
                            src={avatar}
                            alt={
                                data?.user?.name
                                    ? data?.user?.name
                                    : "LoggedIn User"
                            }
                            width={100}
                            height={100}
                            className='rounded-full'
                        />
                    ) : (
                        <FaUser />
                    )}
                </span>
            </button>

            {show && (
                <div
                    ref={dropdownRef}
                    className='max-w-48 w-48 bg-white shadow-sm border rounded-md absolute right-0 top-full max-h-fit mt-2 z-50'>
                    {!data?.user ? (
                        <ul>
                            {loggedOutUsersLink.map((link) => (
                                <li key={link.id}>
                                    <button
                                        onClick={(e) => {
                                            togglePopup(e);
                                            router.push(`${link?.path}`);
                                        }}
                                        className='block px-3 py-2 text-sm text-zinc-700 transition-all hover:bg-zinc-50 hover:text-zinc-800'>
                                        {link.title}
                                    </button>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <ul>
                            {loggedinUsersLink.map((link) => (
                                <li key={link.id}>
                                    <button
                                        onClick={(e) => {
                                            togglePopup(e);
                                            router.push(`${link?.path}`);
                                        }}
                                        className='block px-3 py-2 text-sm text-zinc-700 transition-all hover:bg-zinc-50 hover:text-zinc-800'>
                                        {link.title}
                                    </button>
                                </li>
                            ))}
                            <li>
                                <button
                                    onClick={() =>
                                        signOut({ redirectTo: "/login" })
                                    }
                                    className='flex justify-center px-3 gap-1 py-2 text-sm text-zinc-700 transition-all hover:bg-zinc-50 hover:text-zinc-800'>
                                    Logout <HiOutlineLogout size={20} />
                                </button>
                            </li>
                        </ul>
                    )}
                </div>
            )}
        </div>
    );
};

export default Menu;