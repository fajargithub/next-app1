'use client';

import { useEffect, useState } from 'react';
import { getCookie } from 'cookies-next';
import jwt from 'jsonwebtoken';
import { useRouter } from 'next/navigation';
import Home from '../app/home/page';

const Index = () => {
  const [user, setTheUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    console.log('on useEffect!');
    const token = getCookie('token');
    if (token) {
      try {
        const decoded = jwt.verify(token, process.env.NEXT_PUBLIC_JWT_SECRET);
        setTheUser(decoded);

      } catch (err) {
        console.error('Token verification failed', err);
        router.push(`/login?error=${encodeURIComponent('Your Token session is expired, Please log in again')}`); // Redirect to login if token is invalid
      }

      console.log(user);
    } else {
      console.log('on else useEffect')
      router.push(`/login?error=${encodeURIComponent('Please log in')}`);
    }
  }, [router]);



  if (!user) {
    return <p>Loading...</p>;
  }

  return (
    <Home user={user} />
  );
};

export default Index;