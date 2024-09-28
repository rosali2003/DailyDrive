import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import EmailForm from './components/EmailForm';
import GoalForm from './components/GoalForm';
import HabitForm from './components/HabitForm'; // Import HabitForm component
import './App.css'; // Ensure CSS is imported

function App() {
  return (
    <div className="App">
      <Router>
        <div className="App">
          <header className="App-header">
            <nav>
              <ul>
                <li>
                  <Link to="/">Dashboard</Link>
                </li>
                <li>
                  <Link to="/email">Email Form</Link>
                </li>
                <li>
                  <Link to="/goal">Goal Form</Link>
                </li>
                <li>
                  <Link to="/habit">Habit Form</Link> {/* Add link to HabitForm */}
                </li>
              </ul>
            </nav>
          </header>
          <main>
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/email" element={<EmailForm />} />
              <Route path="/goal" element={<GoalForm />} />
              <Route path="/habit" element={<HabitForm />} /> {/* Add route for HabitForm */}
            </Routes>
          </main>
        </div>
      </Router>
    </div>
  );
}

export default App;