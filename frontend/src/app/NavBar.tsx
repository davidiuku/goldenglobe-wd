'use client';
import Link from "next/link";

const NavBar = () => {

    return (
        <nav className='p-4 flex justify-between space-y-50'>
            <div className='text-xl font-bold'>GoldenGlobe-WD</div>
            <ul className='flex gap-4'>
                <li><Link href='/'>Home</Link></li>
                <li><Link href='/products'>Products</Link></li>
                <li><Link href='/cart'>Cart</Link></li>
                <li><Link href='/login'>Login</Link></li>
            </ul>
        </nav>
    );
};

export default NavBar;
