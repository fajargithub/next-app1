import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

// Dummy user data for demonstration purposes
const users = [
    {
      id: 1,
      email: 'user@mail.com',
      password: '$2b$10$ELJWp3MwxtMR2tmlVTvyO.eZ886br5jlDOOOr.qSvzSNEXM.3O6cu' // hashed password for 'password123'
    }
  ];

  export async function POST(request) {
    const { email, password } = await request.json();
    const user = users.find(u => u.email === email);
    console.log(user);
    if (!user) {
        return NextResponse.json({ message: 'Invalid email or password' }, { status: 401 });
    }
  
    // Compare the provided password with the hashed password
    const isMatch = await bcrypt.compare(password, user.password);
  
    if (!isMatch) {
        return NextResponse.json({ message: 'Invalid email or password' }, { status: 401 });
    }
  
    // Create JWT token
    const token = jwt.sign({ id: user.id, email: user.email }, 'your_jwt_secret', { expiresIn: '1h' });
    return NextResponse.json({ status: true, token: token, message:'Login Success' });
  
    // const token = jwt.sign({ email: user.email }, 'your_jwt_secret', { expiresIn: '1h' });
    // return NextResponse.json({ token });
  };