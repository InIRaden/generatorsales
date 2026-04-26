import { jsx, jsxs } from "react/jsx-runtime";
import { useNavigate, Outlet } from "@tanstack/react-router";
import { useEffect } from "react";
import { u as useAuth } from "./router-bJNx2uWH.js";
import { Sparkles } from "lucide-react";
import "@tanstack/react-query";
import "sonner";
import "@supabase/supabase-js";
function AuthGate() {
  const {
    user,
    loading
  } = useAuth();
  const navigate = useNavigate();
  useEffect(() => {
    if (!loading && !user) navigate({
      to: "/login"
    });
  }, [user, loading, navigate]);
  if (loading || !user) {
    return /* @__PURE__ */ jsx("div", { className: "min-h-screen flex items-center justify-center", children: /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3 text-muted-foreground", children: [
      /* @__PURE__ */ jsx(Sparkles, { className: "h-5 w-5 animate-pulse text-primary" }),
      "Loading…"
    ] }) });
  }
  return /* @__PURE__ */ jsx(Outlet, {});
}
export {
  AuthGate as component
};
