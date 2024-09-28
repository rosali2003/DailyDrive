import { useState } from 'react'
// import { useRouter } from 'next/navigation'
import { Input } from './ui/input'
import { Button } from './ui/button'

export default function EmailForm() {
  const [email, setEmail] = useState('')
  // const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    // In a real app, you would save the email to your backend here
    console.log('Saving email:', email)
    // Redirect to the goals page
    // router.push('/goals')
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input
        type="email"
        placeholder="Enter your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <Button type="submit" className="w-full">
        Get Started
      </Button>
    </form>
  )
}