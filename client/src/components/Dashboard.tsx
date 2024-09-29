import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Progress } from './ui/progress';
import { Checkbox } from './ui/checkbox';
import { Link } from 'react-router-dom';

interface Goal {
  id: number;
  description: string;
  targetDate: string;
  progress: number;
}

interface Habit {
  id: number;
  description: string;
  completed: boolean;
}

export default function Dashboard() {
  const [goals, setGoals] = useState<Goal[]>([]);
  const [habits, setHabits] = useState<Habit[]>([]);

  useEffect(() => {
    // In a real app, you would fetch goals and habits from your backend here
    setGoals([
      { id: 1, description: 'Apply for 5 jobs a day', targetDate: '2023-12-31', progress: 60 },
      { id: 2, description: 'Learn a new programming language', targetDate: '2024-06-30', progress: 30 },
    ]);
    setHabits([
      { id: 1, description: 'Update resume', completed: false },
      { id: 2, description: 'Practice coding for 1 hour', completed: false },
    ]);
  }, []);

  const toggleHabit = (id: number) => {
    setHabits(habits.map(habit => 
      habit.id === id ? { ...habit, completed: !habit.completed } : habit
    ));
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Your Goals</CardTitle>
        </CardHeader>
        <CardContent>
          {goals.map(goal => (
            <div key={goal.id} className="mb-4">
              <div className="flex justify-between items-center mb-2">
                <span>{goal.description}</span>
                <span className="text-sm text-gray-500">Target: {goal.targetDate}</span>
              </div>
              <Progress value={goal.progress} className="w-full" />
            </div>
          ))}
          <Link to="/goal">
            <Button className="mt-4">Edit Goals</Button>
          </Link>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Today's Habits</CardTitle>
        </CardHeader>
        <CardContent>
          {habits.map(habit => (
            <div key={habit.id} className="flex items-center space-x-2 mb-2">
              <Checkbox 
                id={`habit-${habit.id}`} 
                checked={habit.completed}
                onCheckedChange={() => toggleHabit(habit.id)}
              />
              <label htmlFor={`habit-${habit.id}`}>{habit.description}</label>
            </div>
          ))}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Daily Reflection</CardTitle>
        </CardHeader>
        <CardContent>
          <p>Don't forget to fill out your daily reflection!</p>
          <Link to="/reflection">
            <Button className="mt-4">Start Reflection</Button>
          </Link>
        </CardContent>
      </Card>
    </div>
  );
}