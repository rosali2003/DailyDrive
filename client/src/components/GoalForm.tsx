import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { PlusIcon, TrashIcon } from 'lucide-react';

// Define the Goal type
type Goal = {
  id: number;
  description: string;
  targetDate: string;
};

export default function GoalForm() {
  const [goals, setGoals] = useState<Goal[]>([{ id: 1, description: '', targetDate: '' }]);
  const navigate = useNavigate();

  const addGoal = () => {
    setGoals([...goals, { id: goals.length + 1, description: '', targetDate: '' }]);
  };

  const removeGoal = (id: number) => {
    setGoals(goals.filter(goal => goal.id !== id));
  };

  const updateGoal = (id: number, field: 'description' | 'targetDate', value: string) => {
    setGoals(goals.map(goal => goal.id === id ? { ...goal, [field]: value } : goal));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, you would save the goals to your backend here
    console.log('Saving goals:', goals);
    // Redirect to the habits page
    navigate('/habits');
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-md mx-auto">
      {goals.map((goal) => (
        <div key={goal.id} className="flex items-center space-x-4">
          <Input
            placeholder="Enter your goal"
            value={goal.description}
            onChange={(e) => updateGoal(goal.id, 'description', e.target.value)}
            required
          />
          <Input
            type="date"
            value={goal.targetDate}
            onChange={(e) => updateGoal(goal.id, 'targetDate', e.target.value)}
            required
          />
          <Button type="button" variant="ghost" onClick={() => removeGoal(goal.id)}>
            <TrashIcon className="h-5 w-5" />
          </Button>
        </div>
      ))}
      <Button type="button" onClick={addGoal} variant="outline" className="w-full">
        <PlusIcon className="h-5 w-5 mr-2" /> Add Another Goal
      </Button>
      <Button type="submit" className="w-full">
        Set Daily Habits
      </Button>
    </form>
  );
}