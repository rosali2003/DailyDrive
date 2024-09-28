import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import EmailForm from './components/EmailForm';
import GoalForm from './components/GoalForm';

function App() {
  return (
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
            </ul>
          </nav>
        </header>
        <main>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/email" element={<EmailForm />} />
            <Route path="/goal" element={<GoalForm />} />
            <Route path="*" element={<h1>404 - Not Found</h1>} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;