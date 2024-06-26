'use client';

import { useEffect, useState } from 'react';
import { getCookie } from 'cookies-next';
import jwt from 'jsonwebtoken';
import { useRouter } from 'next/navigation';

const Home = () => {
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const token = getCookie('token');
    if (token) {
      try {
        const decoded = jwt.verify(token, 'your_jwt_secret');
        setUser(decoded);
      } catch (err) {
        router.push('/login'); // Redirect to login if token is invalid
      }
    } else {
      router.push('/login'); // Redirect to login if no token is found
    }
  }, [router]);

  if (!user) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h1>Welcome, {user.email}</h1>
    </div>
  );
};

export default Home;