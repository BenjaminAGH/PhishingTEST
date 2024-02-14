import ReactDOM from 'react-dom/client';
import App from './routes/App.jsx';
import './index.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Root from './routes/Root.jsx';
import ErrorPage from './routes/ErrorPage.jsx';
import Login from './routes/Login.jsx';
import '@radix-ui/themes/styles.css';
import CreateMail from './routes/Mail/CreateMail.jsx';
import GetMail from './routes/Mail/GetMail.jsx';
import Template from './routes/Phishing/template.jsx';
import Warning from './routes/Phishing/Warning.jsx';
import Statistics from './routes/Mail/Statistics.jsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '/',
        element: <App />,
      },
      {
        path: '/mail',
        element: <CreateMail />,
      },
      {
        path: '/mail/list',
        element: <GetMail />,
      },
      {
        path: '/stats',
        element: <Statistics />,
      }
    
    ],
  },
  {
    path: '/auth',
    element: <Login />,
  },
  {
    path: '/services/:caseId',
    element: <Template />,
  },
  {
    path: '/warning',
    element: <Warning />,
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />
);
