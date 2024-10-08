import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Input } from './ui/input';
import { Button } from './ui/button';
import axios from 'axios';

export default function EmailForm() {
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const navigate = useNavigate();
  const serverURL = process.env.SERVER_URL || 'http://localhost:8000';
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // save the email to your backend ?
    console.log('Saving email:', email);
    axios.post(`${serverURL}/api/users/`, { email, first_name: firstName, last_name: lastName }, {headers: {'Content-Type': 'application/json'}});
    // redirect to goals page
    navigate('/goal');
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-md mx-auto">
      <Input
        type="email"
        placeholder="Enter your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <Input
        type="text"
        placeholder="Enter your first name"
        value={firstName}
        onChange={(e) => setFirstName(e.target.value)}
        required
      />
      <Input
        type="text"
        placeholder="Enter your last name"
        value={lastName}
        onChange={(e) => setLastName(e.target.value)}
        required
      />
      <Button type="submit" className="w-full">Submit</Button>
    </form>
  );
}