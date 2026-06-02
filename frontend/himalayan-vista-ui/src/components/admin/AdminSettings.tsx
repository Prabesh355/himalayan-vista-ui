import { LogOut, ShieldCheck, KeyRound } from 'lucide-react';
import { useNavigate } from '@tanstack/react-router';

export const AdminSettings = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    if (typeof window !== 'undefined') {
      window.localStorage.removeItem('token');
      window.localStorage.removeItem('authToken');
      window.localStorage.removeItem('user');
    }
    navigate({ to: '/login' });
  };

  return (
    <div className="space-y-6 max-w-4xl">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
        <p className="text-muted-foreground">Manage admin session and security basics.</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="rounded-xl bg-card border p-5">
          <div className="flex items-center gap-3 mb-3">
            <ShieldCheck className="h-5 w-5 text-primary" />
            <h2 className="font-semibold">Admin access</h2>
          </div>
          <p className="text-sm text-muted-foreground">
            Your account is configured through Render environment variables and JWT authentication.
          </p>
        </div>

        <div className="rounded-xl bg-card border p-5">
          <div className="flex items-center gap-3 mb-3">
            <KeyRound className="h-5 w-5 text-primary" />
            <h2 className="font-semibold">Session tips</h2>
          </div>
          <p className="text-sm text-muted-foreground">
            If you get logged out, sign in again and the dashboard will reuse the stored JWT token.
          </p>
        </div>
      </div>

      <div className="rounded-xl bg-card border p-5 flex items-center justify-between gap-4">
        <div>
          <h2 className="font-semibold">Logout</h2>
          <p className="text-sm text-muted-foreground">Clear the current admin session and go back to login.</p>
        </div>
        <button
          onClick={handleLogout}
          className="inline-flex items-center gap-2 rounded-lg bg-red-500 px-4 py-2 text-sm font-semibold text-white hover:bg-red-600 transition-colors"
        >
          <LogOut className="h-4 w-4" />
          Logout
        </button>
      </div>
    </div>
  );
};
