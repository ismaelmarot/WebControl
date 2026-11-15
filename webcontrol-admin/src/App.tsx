import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { Dashboard } from '@/pages/Dashboard'
import { Login } from '@/pages/Login'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Dashboard />,
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '*',
    element: <Dashboard />,
  },
])

export default function App() {
  return (
    <RouterProvider router={router} />
  )
}