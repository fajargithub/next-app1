'use client';

import { useEffect, useState } from 'react';
import { getCookie } from 'cookies-next';
import jwt from 'jsonwebtoken';
import { useRouter } from 'next/navigation';

const Home = () => {
  const [user, setTheUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    console.log('on useEffect!');
    const token = getCookie('token');
    if (token) {
      try {
        const decoded = jwt.verify(token, process.env.NEXT_PUBLIC_JWT_SECRET);
        console.log(decoded);
        setTheUser(decoded);

      } catch (err) {
        console.error('Token verification failed', err);
        router.push('/login'); // Redirect to login if token is invalid
      }

      console.log(user);
    } else {
      console.log('on else useEffect')
      router.push('/login'); // Redirect to login if no token is found
    }
  }, [router]);



  if (!user) {
    return <p>Loading...</p>;
  }

  return (
    <div className="flex items-center bg-gray-100">
        <h1>Welcome!, {user.email}</h1>
    </div>
  );
};

export default Home;