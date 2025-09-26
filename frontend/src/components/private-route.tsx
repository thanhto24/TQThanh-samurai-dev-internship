import { Navigate } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "@/lib/hooks";
import { useEffect, useState } from "react";
import { setUser } from "@/lib/features/userSlice";
import { api } from "@/lib/api";
import type { JSX } from "react";
import { Loader2 } from "lucide-react";

interface PrivateRouteProps {
  children: JSX.Element;
}

export function PrivateRoute({ children }: PrivateRouteProps) {
  const user = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const { data: userData } = await api.get("/auth/me");
        dispatch(setUser(userData));
      } catch (error) {
        dispatch(setUser({ name: "", email: "" }));
        console.error("Failed to fetch user:", error);
      } finally {
        setLoading(false);
      }
    };

    if (!user || Object.keys(user).length === 0) {
      fetchUser();
    } else {
      setLoading(false);
    }
  }, [user, dispatch]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-10 w-10 animate-spin text-primary" />
      </div>
    );
  }

  if (!user || !user.name) {
    return <Navigate to="/signin" replace />;
  }

  return children;
}
