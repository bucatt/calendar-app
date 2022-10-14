import React from 'react';
import ReactDOM from 'react-dom/client';
//import { BrowserRouter } from 'react-router-dom'
import { CalendarApp } from './CalendarApp';
// import { CalendarPage } from "./calendar/pages/CalendarPage";
// import { CalendarApp } from "./CalendarApp";
// import { AppRouter } from "./router/AppRouter";
import './styles.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <CalendarApp />
  </React.StrictMode>,
);
