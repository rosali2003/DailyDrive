import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import "./globals.css";
import App from './App';
import './App.css';
import { Button } from './components/ui/button'; 
import { Card } from './components/ui/card'; 
import { Checkbox } from './components/ui/checkbox';
import { Input } from './components/ui/input';
import { Progress } from './components/ui/progress';


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

);

