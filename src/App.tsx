import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { Counter } from "./components/Counter";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./layout/Layout";
import Home from "./pages/Home";
import Users from "./pages/Users";
import NotFound from "./pages/NotFound";
import UserDetail from "./pages/UserDetail";
import Signup from "./pages/Signup";

const router = createBrowserRouter([
  { element: <Layout />, children: [
      { path: "/", element: <Home /> },
      { path: "/users", element: <Users /> },
      { path: "/users/:id", element: <UserDetail /> },
      { path: "*", element: <NotFound /> }, // <- 404
      { path: "/signup", element: <Signup /> },
  ]},
]);

export default function App() {
  return <RouterProvider router={router} />;
}