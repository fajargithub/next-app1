"use client";

import Router from "next/navigation";

const Home = ({ user }) => {
    return(
        <main className="grid min-h-full place-items-center bg-white px-6 py-24 sm:py-32 lg:px-8">
            <div className="text-center">
                <p className="text-base font-semibold text-gray-700">Welcome, {user.email}</p>
            </div>
        </main>
    );
};

export default Home;