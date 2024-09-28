
import { useState } from "react";
// import { useRouter } from 'next/navigation'
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Checkbox } from "./ui/checkbox";
import { PlusIcon, TrashIcon } from "lucide-react";
import axios from "axios";

const serverUrl = process.env.REACT_APP_SERVER_URL || "http://127.0.0.1:8000";

interface Habit {
  id: number;
  title: string;
  description: string;
  recurrence: string;
  frequency: number;
  interval: number;
  unit: string;
}

export const HabitForm = () => {
  const [habits, setHabits] = useState<Habit[]>([
    {
      id: 0, // Set the initial ID to 0
      title: "",
      description: "",
      recurrence: "",
      frequency: 1,
      interval: 1,
      unit: "day",
    },
  ]);

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Checkbox } from './ui/checkbox';

// Define the Habit type
type Habit = {
  id: number;
  description: string;
};

export default function HabitForm() {
  const [habits, setHabits] = useState<Habit[]>([{ id: 1, description: '' }]);
  const navigate = useNavigate();


  // Add a new habit with default values and a unique ID
  const addHabit = () => {
    setHabits([
      ...habits,
      {
        id: habits.length + 1, // Generate a new ID
        title: "",
        description: "",
        recurrence: "",
        frequency: 1,
        interval: 1,
        unit: "day",
      },
    ]);

    setHabits([...habits, { id: habits.length + 1, description: '' }]);

  };

  // Remove habit by ID
  const removeHabit = (id: number) => {

    setHabits(habits.filter((habit) => habit.id !== id));
  };

  // Generalized update function for any field
  const updateHabit = (id: number, field: keyof Habit, value: string | number) => {
    setHabits(
      habits.map((habit) =>
        habit.id === id ? { ...habit, [field]: value } : habit
      )
    );

    setHabits(habits.filter(habit => habit.id !== id));
  };

  const updateHabit = (id: number, description: string) => {
    setHabits(habits.map(habit => habit.id === id ? { ...habit, description } : habit));

  };

  // Submit handler for form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    console.log("Saving habits:", habits);
    // Handle redirection or further action after saving
  };

  // Send habits data to the server
  const onSend = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${serverUrl}/api/habits/`, habits);
      console.log("Habits successfully sent", response.data);
    } catch (error) {
      console.error("There was an error creating the habit", error);
    }

    // In a real app, you would save the habits to your backend here
    console.log('Saving habits:', habits);
    // Redirect to the dashboard
    navigate('/');

  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {habits.map((habit) => (
        <div key={habit.id} className="flex items-center space-x-4">
          <Checkbox id={`habit-${habit.id}`} />
          <Input
            placeholder="Enter a daily habit title"
            value={habit.title}
            onChange={(e) => updateHabit(habit.id, 'title', e.target.value)}
            required
          />
          <Input
            placeholder="Enter a description"
            value={habit.description}
            onChange={(e) => updateHabit(habit.id, 'description', e.target.value)}
            required
          />
          <Input
            placeholder="Enter a recurrence"
            value={habit.recurrence}
            onChange={(e) => updateHabit(habit.id, 'recurrence', e.target.value)}
            required
          />
          <Input
            placeholder="Enter a frequency"
            value={habit.frequency}
            onChange={(e) => updateHabit(habit.id, 'frequency', Number(e.target.value))}
            type="number"
            required
          />
          <Input
            placeholder="Enter a unit"
            value={habit.unit}
            onChange={(e) => updateHabit(habit.id, 'unit', e.target.value)}
            required
          />
          <Input
            placeholder="Enter an interval"
            value={habit.interval}
            onChange={(e) => updateHabit(habit.id, 'interval', Number(e.target.value))}
            type="number"
            required
          />

          <Button
            type="button"
            variant="ghost"
            onClick={() => removeHabit(habit.id)}
          >
            <TrashIcon className="h-5 w-5" />
          </Button>
        </div>
      ))}
      <Button
        type="button"
        onClick={addHabit}
        variant="outline"
        className="w-full"
      >
        <PlusIcon className="h-5 w-5 mr-2" /> Add Another Habit

          <Button type="button" variant="ghost" onClick={() => removeHabit(habit.id)}>
          </Button>
        </div>
      ))}
      <Button type="button" onClick={addHabit} variant="outline" className="w-full">

      </Button>
      <Button onClick={onSend} type="submit" className="w-full">
        Finish Setup
      </Button>
    </form>
  );

};

}

