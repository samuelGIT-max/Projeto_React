// src/layout/Layout.tsx
import { NavLink, Outlet } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";

export default function Layout() {
  const { theme, toggle } = useTheme();

  return (
    <div style={{ padding: 24 }}>
      <nav
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 12,
          marginBottom: 16,
        }}
      >
        <div style={{ display: "flex", gap: 12 }}>
          <NavLink
            to="/"
            style={({ isActive }) => ({ color: isActive ? "#646cff" : "inherit" })}
          >
            Home
          </NavLink>
          <NavLink
            to="/users"
            style={({ isActive }) => ({ color: isActive ? "#646cff" : "inherit" })}
          >
            Users
          </NavLink>
        </div>

        <button onClick={toggle} title="Alternar tema">
          Tema: {theme}
        </button>
      </nav>

      <Outlet />
    </div>
  );
}
