import React from "react";
import { Link, Outlet } from "react-router-dom";

export function Layout() {
  return (
    <div>
      <h1>FROMAGERIA TESILLI</h1>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/products">Products</Link>
          </li>
        </ul>
      </nav>

      <hr />

      <Outlet />
    </div>
  );
}
