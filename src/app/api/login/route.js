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

    if (!user) {
        return NextResponse.json({ success: false, message: 'Invalid email or password' });
    }

    // Compare the provided password with the hashed password
    const isMatch = await bcrypt.compare(password, user.password);
  
    if (!isMatch) {
        return NextResponse.json({ success: false, message: 'Invalid email or password' });
    }
  
    // Create JWT token
    const token = jwt.sign({ id: user.id, email: user.email }, 'your_jwt_secret', { expiresIn: '1h' });
    return NextResponse.json({ success: true, token: token, message:'Login Success', message: 'Login Successfully' });

  };