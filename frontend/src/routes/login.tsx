import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { AlertCircle, CheckCircle, Loader2, Lock, Mail } from "lucide-react";
import { useState } from "react";
import { getApiBaseUrl } from "@/lib/apiBaseUrl";
import { readJsonResponse } from "@/lib/apiResponse";

export const Route = createFileRoute("/login")({
  head: () => ({
    meta: [
      { title: "Login — Nomads Navigate Nepal" },
      { name: "description", content: "Login to your Nomads Navigate Nepal account." },
    ],
  }),
  component: LoginPage,
});

interface LoginFormData {
  email: string;
  password: string;
}

interface ApiResponse {
  success: boolean;
  message: string;
  token?: string;
  user?: {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    role?: string;
  };
}

function LoginPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<LoginFormData>({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (error) setError(null);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setSuccess(false);

    if (!formData.email) {
      setError("Email is required");
      return;
    }

    if (!validateEmail(formData.email)) {
      setError("Please enter a valid email address");
      return;
    }

    if (!formData.password) {
      setError("Password is required");
      return;
    }

    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    setLoading(true);

    try {
      const apiUrl = getApiBaseUrl();
      const endpoint = `${apiUrl}/auth/login`;
      console.debug("Login: using API URL:", apiUrl);

      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: formData.email.toLowerCase(),
          password: formData.password,
        }),
        credentials: "include",
      });

      const data = await readJsonResponse<ApiResponse>(response, endpoint);

      if (!response.ok) {
        throw new Error(data.message || "Login failed");
      }

      setSuccess(true);

      if (data.token) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("authToken", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));
      }

      setTimeout(() => {
        const isAdmin = data.user?.role === "admin";
        navigate({ to: isAdmin ? "/admin" : "/dashboard" });
      }, 1500);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Login failed. Please try again.";

      if (errorMessage === "Failed to fetch") {
        setError(
          "Network error: unable to reach the API. This is usually a backend or CORS issue — check the API url and server CORS settings.",
        );
      } else {
        setError(errorMessage);
      }

      console.error("Login error (apiUrl=%s):", getApiBaseUrl(), err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen pt-32 pb-16 flex items-center justify-center">
      <div className="w-full max-w-md px-4">
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold tracking-tight text-foreground mb-2">Welcome Back</h1>
          <p className="text-muted-foreground">Login to your Nomads Navigate Nepal account</p>
        </div>

        <div className="rounded-2xl glass border border-border/50 p-8">
          {success && (
            <div className="mb-6 p-4 rounded-lg bg-green-500/10 border border-green-500/20 flex items-start gap-3">
              <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-green-600">Login Successful!</p>
                <p className="text-sm text-green-600 opacity-75">
                  Welcome back! Redirecting to your{" "}
                  {formData.email.toLowerCase().includes("nomadsnavigate5") ||
                  formData.email.toLowerCase().includes("prabeshmsb76")
                    ? "admin panel"
                    : "dashboard"}
                  ...
                </p>
              </div>
            </div>
          )}

          {error && (
            <div className="mb-6 p-4 rounded-lg bg-red-500/10 border border-red-500/20 flex items-start gap-3">
              <AlertCircle className="h-5 w-5 text-red-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-red-600">Login Failed</p>
                <p className="text-sm text-red-600 opacity-75">{error}</p>
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground pointer-events-none" />
                <input
                  id="email"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter your email"
                  className="w-full pl-10 pr-4 py-2 rounded-lg bg-secondary border border-border/50 text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-gradient-sunset transition-colors"
                  disabled={loading}
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-foreground mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground pointer-events-none" />
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Enter your password"
                  className="w-full pl-10 pr-4 py-2 rounded-lg bg-secondary border border-border/50 text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-gradient-sunset transition-colors"
                  disabled={loading}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                  disabled={loading}
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>
            </div>

            <div className="text-right">
              <Link
                to="/contact"
                className="text-sm text-gradient-sunset hover:opacity-80 transition-opacity"
              >
                Forgot password?
              </Link>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full mt-6 py-2 rounded-lg bg-gradient-sunset text-white font-semibold hover:shadow-glow hover:-translate-y-0.5 transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:shadow-none disabled:hover:translate-y-0 flex items-center justify-center gap-2"
            >
              {loading && <Loader2 className="h-4 w-4 animate-spin" />}
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>

          <div className="my-6 flex items-center gap-3">
            <div className="flex-1 h-px bg-border/50" />
            <span className="text-sm text-muted-foreground">or</span>
            <div className="flex-1 h-px bg-border/50" />
          </div>

          <p className="text-center text-sm text-muted-foreground">
            Don't have an account?{" "}
            <Link
              to="/register"
              className="text-gradient-sunset hover:opacity-80 transition-opacity font-semibold"
            >
              Sign up here
            </Link>
          </p>
        </div>

        <div className="mt-8 p-6 rounded-2xl glass border border-border/50">
          <h3 className="font-semibold text-foreground mb-3">Demo Credentials</h3>
          <p className="text-sm text-muted-foreground mb-2">
            <strong>Email:</strong> demo@nomads.com
          </p>
          <p className="text-sm text-muted-foreground">
            <strong>Password:</strong> demo123456
          </p>
          <p className="text-xs text-muted-foreground mt-4 italic">
            Create your own account to book treks and access exclusive features.
          </p>
        </div>
      </div>
    </div>
  );
}
