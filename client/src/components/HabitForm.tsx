import { useState } from 'react'
// import { useRouter } from 'next/navigation'
import { Input } from './ui/input'
import { Button } from './ui/button'
import { Checkbox } from './ui/checkbox'
import { PlusIcon, TrashIcon } from 'lucide-react'

interface Habit {
  id: number
  description: string
}

export default function HabitForm() {
  const [habits, setHabits] = useState<Habit[]>([{ id: 1, description: '' }])
//   const router = useRouter()

  const addHabit = () => {
    setHabits([...habits, { id: habits.length + 1, description: '' }])
  }

  const removeHabit = (id: number) => {
    setHabits(habits.filter(habit => habit.id !== id))
  }

  const updateHabit = (id: number, description: string) => {
    setHabits(habits.map(habit => habit.id === id ? { ...habit, description } : habit))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    // In a real app, you would save the habits to your backend here
    console.log('Saving habits:', habits)
    // Redirect to the dashboard
    // router.push('/dashboard')
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {habits.map((habit) => (
        <div key={habit.id} className="flex items-center space-x-4">
          <Checkbox id={`habit-${habit.id}`} />
          <Input
            placeholder="Enter a daily habit"
            value={habit.description}
            onChange={(e) => updateHabit(habit.id, e.target.value)}
            required
          />
          <Button type="button" variant="ghost" onClick={() => removeHabit(habit.id)}>
            <TrashIcon className="h-5 w-5" />
          </Button>
        </div>
      ))}
      <Button type="button" onClick={addHabit} variant="outline" className="w-full">
        <PlusIcon className="h-5 w-5 mr-2" /> Add Another Habit
      </Button>
      <Button type="submit" className="w-full">
        Finish Setup
      </Button>
    </form>
  )
}