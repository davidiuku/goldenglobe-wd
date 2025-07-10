'use client';
import Link from "next/link";

const NavBar = () => {

    return (
        <nav className='p-4 flex justify-between mb-5'>
            <ul className='flex gap-4'>
                <li className='text-xl font-bold'><Link href='/'>GoldenGlobe-WD</Link></li>
                <li><Link href='/'>Home</Link></li>
                <li><Link href='/products'>Products</Link></li>
                <li><Link href='/cart'>Cart</Link></li>
            </ul>
            <ul className='flex gap-4'>
                <li>Hello! <Link href='/login' className="underline">Login</Link> or <Link href='/signup' className="underline">Sign-Up</Link></li>
            </ul>
        </nav>
    );
};

export default NavBar;
