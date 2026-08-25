import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { TaskProvider } from './contexts/TaskContext.jsx';
import { HashRouter } from 'react-router-dom';
import { CategoryProvider } from './contexts/CategoryContext.jsx';
import { ThemeProvider } from './contexts/ThemeContext.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <HashRouter>
      <ThemeProvider>
        <TaskProvider>
          <CategoryProvider>
            <App />
          </CategoryProvider>
        </TaskProvider>
      </ThemeProvider>
    </HashRouter>
  </StrictMode>,
);
