import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";

function ProtectedRoute() {
  const navigate = useNavigate();

  useEffect(() => {
    console.log('Efecto de autenticación ejecutado');
    const auth = localStorage.getItem("token");
    if (!auth) {
      alert('Tienes que iniciar sesión primero');
      navigate('/');
    }
  }, [navigate]);
  

  const auth = localStorage.getItem("token");

  if (!auth) {
    console.log('No autenticado, redirigiendo...');
    return null;
  }

  return <Outlet />;
}

export default ProtectedRoute;
