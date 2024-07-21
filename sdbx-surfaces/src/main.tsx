import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

import './index.css';
import ChartExample from './nodes/ChartNode';
import Example from './nodes/ConcentricTreeNode';

// <ChartExample width={700} height={700}/>

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Example width={700} height={700} />
    <ChartExample width={700} height={700} animate={true} />
  </React.StrictMode>
);
