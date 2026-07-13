"use client";

import { authService } from "@/services/auth.service";

export const LogoutButton = () => {
  const handleLogout = async () => {
    await authService.logout();
  };

  return (
    <div>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};
