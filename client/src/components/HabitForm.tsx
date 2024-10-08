import { useState, useEffect } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Checkbox } from "./ui/checkbox";
import { PlusIcon, TrashIcon } from "lucide-react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const serverUrl = process.env.REACT_APP_SERVER_URL || "http://127.0.0.1:8000";

interface Habit {
  id: number;
  title: string;
  description: string;
  recurrence: string;
  frequency: number;
  interval: number;
  unit: string;
  user: number | null;
  goal: number | null;
}

export const HabitForm = () => {
  const navigate = useNavigate();
  const [habits, setHabits] = useState<Habit[]>([
    {
      id: 0, // Set the initial ID to 0
      title: "",
      description: "",
      recurrence: "",
      frequency: 1,
      interval: 1,
      unit: "day",
      user: 0,
      goal: 0,
    },
  ]);
  const [selectedUser, setSelectedUser] = useState<number | null>(null);
  const [selectedGoal, setSelectedGoal] = useState<number | null>(null);
  const [users, setUsers] = useState<any[]>([]);
  const [goals, setGoals] = useState<any[]>([]);

  useEffect(() => {
    axios.get(`${serverUrl}/api/users/`).then((response) => {
      setUsers(response.data);
      setSelectedUser(response.data[0].id);
    });

    axios.get(`${serverUrl}/api/goals/`).then((response) => {
      setGoals(response.data);
      setSelectedGoal(response.data[0].id);
    });
  }, []);

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
        user: selectedUser,
        goal: selectedGoal,
      },
    ]);
  };

  // Remove habit by ID
  const removeHabit = (id: number) => {
    setHabits(habits.filter((habit) => habit.id !== id));
  };

  // Generalized update function for any field
  const updateHabit = (
    id: number,
    field: keyof Habit,
    value: string | number
  ) => {
    setHabits(
      habits.map((habit) =>
        habit.id === id ? { ...habit, [field]: value } : habit
      )
    );
  };

  // Submit handler for form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Saving habits:", habits);
  };

  // Send habits data to the server
  const onSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedUser === null) {
      alert('Please select a user');
      return;
    }
    if (selectedGoal === null) {
      alert('Please select a goal');
      return;
    }
    try {
      console.log('habit', habits);
      for (const habit of habits ) {
        axios.post(`${serverUrl}/api/habits/`, {
          title: habit.title,
          description: habit.description,
          recurrence: habit.recurrence,
          frequency: habit.frequency,
          unit: habit.unit,
          user: selectedUser,
          goal: selectedGoal
        }, { headers: { 'Content-Type': 'application/json' } });
      }
      console.log("Habits created successfully");
    } catch (error) {
      console.error("There was an error creating the habit", error);
    }

    // Redirect to the dashboard after submission
    navigate("/");
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {habits.map((habit) => (
        <div key={habit.id} className="flex items-center space-x-4">
          <Checkbox id={`habit-${habit.id}`} />
          <Input
            className="custom-input"
            placeholder="Enter a daily habit title"
            value={habit.title}
            onChange={(e) => updateHabit(habit.id, 'title', e.target.value)}
            required
          />
          <Input
            className="custom-input"
            placeholder="Enter a description"
            value={habit.description}
            onChange={(e) => updateHabit(habit.id, 'description', e.target.value)}
            required
          />
          <Input
            className="custom-input"
            placeholder="Enter a recurrence"
            value={habit.recurrence}
            onChange={(e) => updateHabit(habit.id, 'recurrence', e.target.value)}
            required
          />
          <Input
            className="custom-input"
            placeholder="Enter a frequency"
            value={habit.frequency}
            onChange={(e) => updateHabit(habit.id, 'frequency', Number(e.target.value))}
            type="number"
            required
          />
          <Input
            className="custom-input"
            placeholder="Enter a unit"
            value={habit.unit}
            onChange={(e) => updateHabit(habit.id, 'unit', e.target.value)}
            required
          />
          <Input
            className="custom-input"
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
      </Button>
      <Button onClick={onSend} type="submit" className="w-full">
        Finish Setup
      </Button>
    </form>
  );
};