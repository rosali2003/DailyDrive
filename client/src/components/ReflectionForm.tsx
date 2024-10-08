import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Checkbox } from './ui/checkbox';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const ReflectionForm: React.FC = () => {
  const [completedHabits, setCompletedHabits] = useState<boolean | null>(null);
  const [reflection, setReflection] = useState<string>('');
  const navigate = useNavigate();

  const callDjangoFunction = async () => {
    try {
        const res = await axios.post('http://localhost:8000/api/emailReminder/', {
        'reflection': reflection,
        'streak': -1,
        'goal': 'Finding a job within 3 months',
        'habits': ['Apply to 5 jobs a day', 'Research companies for 30 minutes a day', 
                'Spend 30 minutes a day fixing resumes, cover letters, etc.']
        });
    } catch (error) {
        console.error('Error calling the API', error);
    }
};

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission, e.g., save to backend
    console.log('Completed Habits:', completedHabits);
    console.log('Reflection:', reflection);
    // Redirect to the dashboard page
    callDjangoFunction();
    navigate('/dashboard');
  };

  return (
    <div className="space-y-6 max-w-md mx-auto">
      <Card>
        <CardHeader>
          <CardTitle>Did you complete all your habits today?</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="completed-habits-yes" 
                checked={completedHabits === true}
                onCheckedChange={() => setCompletedHabits(true)}
              />
              <label htmlFor="completed-habits-yes">Yes</label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="completed-habits-no" 
                checked={completedHabits === false}
                onCheckedChange={() => setCompletedHabits(false)}
              />
              <label htmlFor="completed-habits-no">No</label>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Reflection on Today's Progress</CardTitle>
        </CardHeader>
        <CardContent>
          <textarea
            className="w-full p-2 border border-gray-300 rounded-md"
            placeholder="Write your reflection here..."
            value={reflection}
            onChange={(e) => setReflection(e.target.value)}
            rows={5} // Adjust the number of rows to make the textarea larger
            required
          />
        </CardContent>
        <div className="p-4">
          <Button onClick={handleSubmit} className="w-full mt-4">Submit Reflection</Button>
        </div>
      </Card>
    </div>
  );
};

export default ReflectionForm;