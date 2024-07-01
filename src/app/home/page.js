"use client";

import { useRouter } from 'next/navigation';
import { deleteCookie } from "cookies-next";

const Home = ({ user }) => {

    const router = useRouter();

    const handleLogout = () => {
        deleteCookie('token');
        router.push('/login');
    };

    return(
        <div className="text-center">
            <p className="text-base font-semibold text-gray-700">Welcome, {user.email}</p>
            <button
                onClick={handleLogout}
                className="mt-4 bg-red-500 text-white p-2 rounded"
            >
                Logout
            </button>
        </div>
    );
};

export default Home;