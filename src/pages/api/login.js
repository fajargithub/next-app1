import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

// Dummy user data for demonstration purposes
const users = [
  {
    id: 1,
    email: 'user@mail.com',
    password: "$2a$10$KixyKyxrQToBqJcrPff96.ql.sH0TEj8pt5Tfl9q2i6zWyNSzRAgW" // hashed version of 'password123'
  }
];

export default async (req, res) => {
    const { email, password } = req.body;

    //Find user by Email
    const user = users.find(u => u.email === email);

    if(!user) {
        return res.status(401).json({ message: 'Invalid Email'});
    }

    bcrypt.hash(password, function(err, hash) {
      if (err) { throw (err); }
  
      bcrypt.compare(password, hash, function(err, result) { 
          if(err) {
            return res.status(401).json({ success:false, message: 'Invalid Password:'});
        }
        // Create JWT token
        const token = jwt.sign({ id:user.id, email: user.email }, 'your_jwt_secret', { expiresIn: '1h'});
    
        return res.status(200).json({ success:true, message: 'Login successful', token: token });
      });
  });
}