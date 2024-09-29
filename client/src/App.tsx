import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import EmailForm from './components/EmailForm';
import GoalForm from './components/GoalForm';
import { HabitForm } from './components/HabitForm';
import ReflectionForm from './components/ReflectionForm';
import './App.css';
import { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent } from './components/ui/card'; 
import { Button } from './components/ui/button';
import { Input } from './components/ui/input';
import { Progress } from './components/ui/progress';
import { Checkbox } from './components/ui/checkbox';
import ThreeDBackground from './components/ThreeDBackground';

function App() {
  return (
    <div className="App">
      <ThreeDBackground />
      <Router>
        <header className="App-header">
          <nav className="navbar">
            <Link to="/">Dashboard</Link>
            <Link to="/email">Email Form</Link>
            <Link to="/goal">Goal Form</Link>
            <Link to="/habit">Habit Form</Link>
            <Link to="/reflection">Reflection</Link>
          </nav>
        </header>
        <main className="App-main">
          <div className="container">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/email" element={<EmailForm />} />
              <Route path="/goal" element={<GoalForm />} />
              <Route path="/habit" element={<HabitForm />} />
              <Route path="/reflection" element={<ReflectionForm />} />
            </Routes>
          </div>
        </main>
      </Router>
    </div>
  );
}

export default App;