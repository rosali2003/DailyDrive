
import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import EmailForm from './components/EmailForm';
import GoalForm from './components/GoalForm';
import { HabitForm } from './components/HabitForm';
import { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent } from './components/ui/card'; 
import { Button, buttonVariants } from './components/ui/button';
import { Input } from './components/ui/input';
import { Progress } from './components/ui/progress';
import { Checkbox } from './components/ui/checkbox';

function App() {
  return (
    <div className="App h-full bg-color">
      <Router>
        <div className="App">
          <header className="App-header">
            <nav className="navbar">
              <Link to="/">Dashboard</Link>
              <Link to="/email">Email Form</Link>
              <Link to="/goal">Goal Form</Link>
              <Link to="/habit">Habit Form</Link>
            </nav>
          </header>
          <main className="App-main">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/email" element={<EmailForm />} />
              <Route path="/goal" element={<GoalForm />} />
              <Route path="/habit" element={<HabitForm />} />
            </Routes>
            {/* Example usage of imported UI components */}
            <div className="ui-components">
              <Card>
                <CardHeader>
                  <CardTitle>Card Title</CardTitle>
                  <CardDescription>Card Description</CardDescription>
                </CardHeader>
                <CardContent>
                  <p>This is the card content.</p>
                  <Input placeholder="Enter text here" />
                  <Checkbox id="example-checkbox" />
                  <Progress value={50} />
                </CardContent>
                <CardFooter>
                  <Button>Submit</Button>
                </CardFooter>
              </Card>
            </div>
          </main>
        </div>
      </Router>
    </div>
  );
}

export default App;