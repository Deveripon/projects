import { Suspense } from "react";
import Logo from "./Logo";
import Menu from "./Menu";
import SearchBar from "./SearchBar";

const Header = () => {
    return (
        <nav className='grid sticky z-50 top-0 grid-cols-2 md:flex justify-between items-center py-3 bg-white border-b mb-6 md:gap-8 px-4 md:px-8 lg:px-20'>
            <div className='flex items-center'>
                <Logo />
            </div>
            <Suspense fallback='Loading...'>
                <SearchBar />
            </Suspense>

            <Menu />
        </nav>
    );
};

export default Header;
