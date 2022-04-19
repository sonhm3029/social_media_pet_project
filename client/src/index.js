import React, {
  useContext
} from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import {BrowserRouter as Router} from "react-router-dom";

import ContextApi from "@Context";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Router>
      <ContextApi>
        <App />
      </ContextApi>
    </Router>
  </React.StrictMode>
);

