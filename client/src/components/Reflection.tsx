import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Input } from './ui/input';
import { Button } from './ui/button';
import axios from 'axios';

export default function ReflectionForm() {
  const [reflection, setReflection] = useState('');
  const navigate = useNavigate();


  const callDjangoFunction = async () => {
        try {
            const res = await axios.post('http://localhost:8000/api/emailReminder/', {
                input: {
                    'reflection': reflection,
                    'streak': -1,
                    'goal': 'Finding a job within 3 months',
                    'habits': ['Apply to 5 jobs a day', 'Research companies for 30 minutes a day', 
                            'Spend 30 minutes a day fixing resumes, cover letters, etc.']
                },
            });
        } catch (error) {
            console.error('Error calling the API', error);
        }
    };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // save the email to your backend ?
    console.log('Saving reflection:');
    callDjangoFunction()
    // redirect to goals page
    navigate('/');
  };


  return (
    <form onSubmit={handleSubmit} className="space-y-4">
        <div>
            <textarea
                placeholder="Self-reflect"
                value={reflection}
                onChange={(e) => setReflection(e.target.value)}
                required>
            </textarea>   
        </div>
      <Button type="submit">Submit</Button>
    </form>
  );
}
