import React from 'react';
import { useAuthStore } from '../../hooks/useAuthStore';

export const NavBar = () => {
  const { startLogout, user } = useAuthStore();

  return (
    <div className="navbar navbar-dark bg-dark mb-4 px-4">
      <span className="navbar-brand">
        <i className="fa-solid fa-calendar-alt"></i> {user.name}
      </span>

      <button onClick={startLogout} className="btn btn-outline-danger">
        <i className="fas fa-sign-out-alt"></i>
        &nbsp;
        <span>Salir</span>
      </button>
    </div>
  );
};
