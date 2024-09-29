import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Input } from './ui/input';
import { Button } from './ui/button';
import axios from 'axios';

// Define the Goal type
type Goal = {
  id: number;
  title: string;
  completion_date: Date;
};

export default function GoalForm() {
  const [goals, setGoals] = useState<Goal[]>([{ id: 1, title: '', completion_date: new Date() }]);
  const navigate = useNavigate();

  const addGoal = () => {
    setGoals([...goals, { id: goals.length + 1, title: '', completion_date: new Date() }]);
  };

  const removeGoal = (id: number) => {
    setGoals(goals.filter(goal => goal.id !== id));
  };

  const updateGoal = (id: number, field:  'title' | 'completion_date', value: string) => {
    setGoals(goals.map(goal => goal.id === id ? { ...goal, [field]: value } : goal));
  };

  const [users, setUsers] = useState<any[]>([]);
  const [selectedUser, setSelectedUser] = useState<number | null>(null);

  useEffect(() => {
    axios.get(`${process.env.SERVER_URL}/api/users/`)
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
    // In a real app, you would save the goals to your backend here
    console.log('Saving goals:', goals);
    for (const goal of goals ) {
      axios.post(`${process.env.SERVER_URL}/api/goals/`, {
        title: goal.title,
        completion_date: `${goal.completion_date.toISOString()}`,
        user: selectedUser
      }, { headers: { 'Content-Type': 'application/json' } });
    }
    // Redirect to the habits page
    navigate('/habits');
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {goals.map((goal) => (
        <div key={goal.id} className="flex items-center space-x-4">
          <Input
            placeholder="Enter your goal"
            value={goal.title}
            onChange={(e) => updateGoal(goal.id, 'title', e.target.value)}
            required
          />
          <Input
            type="date"
            value={goal.completion_date ? new Date(goal.completion_date).toISOString().substring(0, 10) : ''}
            onChange={(e) => updateGoal(goal.id, 'completion_date', e.target.value)}
            required
          />
          <select onChange={(x) => {setSelectedUser(Number(x.target.value))}}>
            {users.map((user) => (
              <option key={user.id} value={user.id}>
                {user.first_name} {user.last_name}
              </option>
            ))}
          </select>
          <Button className="dark" type="button" variant="ghost" onClick={() => removeGoal(goal.id)}>
          </Button>
        </div>
      ))}
      <Button type="button" className="w-full" onClick={addGoal} variant="outline" > Add Goal
      </Button>
      <Button type="submit" className="w-full">
        Set Daily Habits
      </Button>
    </form>
  );
}