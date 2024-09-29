import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { PlusIcon, TrashIcon } from 'lucide-react';
import axios from 'axios';

// Define the Goal type
type Goal = {
  id: number;
  title: string;
  completion_date: string;  // Change this to string for better handling of date input
};

const serverURL = process.env.SERVER_URL || 'http://localhost:8000';

export default function GoalForm() {
  const [goals, setGoals] = useState<Goal[]>([{ id: 1, title: '', completion_date: new Date().toISOString().substring(0, 10) }]);
  const navigate = useNavigate();

  const addGoal = () => {
    setGoals([...goals, { id: goals.length + 1, title: '', completion_date: new Date().toISOString().substring(0, 10) }]);
  };

  const removeGoal = (id: number) => {
    setGoals(goals.filter(goal => goal.id !== id));
  };

  const updateGoal = (id: number, field: 'title' | 'completion_date', value: string) => {
    setGoals(goals.map(goal => goal.id === id ? { ...goal, [field]: value } : goal));
  };

  const [users, setUsers] = useState<any[]>([]);
  const [selectedUser, setSelectedUser] = useState<number | null>(null);

  useEffect(() => {
    axios.get(`${serverURL}/api/users/`)
      .then((response) => {
        setUsers(response.data);
        setSelectedUser(response.data[0].id);
      });
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedUser === null) {
      alert('Please select a user');
      return;
    }

    // Validation: ensure all fields are filled
    if (goals.some(goal => goal.title === '' || goal.completion_date === '')) {
      alert('Please fill in all fields');
      return;
    }

    for (const goal of goals) {
      const completionDate = new Date(goal.completion_date);  // Convert string to Date

      await axios.post(`${serverURL}/api/goals/`, {
        title: goal.title,
        completion_date: completionDate.toISOString(),  // Use toISOString() here
        user: selectedUser
      }, { headers: { 'Content-Type': 'application/json' } });
    }
    
    navigate('/habit');
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-md mx-auto p-4 bg-white shadow-lg rounded-lg">
      {goals.map((goal) => (
        <div key={goal.id} className="flex items-center space-x-4 mb-4">
          <Input
            className="flex-1"
            placeholder="Enter your goal"
            value={goal.title}
            onChange={(e) => updateGoal(goal.id, 'title', e.target.value)}
            required
          />
          <Input
            type="date"
            className="flex-1"
            value={goal.completion_date}  // Directly use the string date value
            onChange={(e) => updateGoal(goal.id, 'completion_date', e.target.value)}
            required
          />

          <select
            onChange={(e) => setSelectedUser(Number(e.target.value))}
            value={selectedUser || ''}
            className="border border-gray-300 rounded-md p-2"
          >
            {users.map((user) => (
              <option key={user.id} value={user.id}>
                {user.first_name} {user.last_name}
              </option>
            ))}
          </select>
          <Button type="button" variant="ghost" onClick={() => removeGoal(goal.id)}>
            <TrashIcon className="h-5 w-5" />
          </Button>
        </div>
      ))}
      <Button type="button" onClick={addGoal} variant="outline" className="w-full mb-4">
        <PlusIcon className="h-5 w-5 mr-2" /> Add Another Goal
      </Button>
      <Button type="submit" className="w-full bg-blue-600 text-white">
        Set Daily Habits
      </Button>
    </form>
  );
}
