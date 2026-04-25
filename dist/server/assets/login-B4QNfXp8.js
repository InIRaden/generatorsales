import { jsxs, jsx } from "react/jsx-runtime";
import { useNavigate, Link } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { u as useAuth, s as supabase } from "./router-bJNx2uWH.js";
import { B as Button } from "./button-BmLZMIt9.js";
import { L as Label, I as Input } from "./label-PJTQmjq7.js";
import { Sparkles } from "lucide-react";
import { toast } from "sonner";
import "@tanstack/react-query";
import "@supabase/supabase-js";
import "@radix-ui/react-slot";
import "class-variance-authority";
import "clsx";
import "tailwind-merge";
import "@radix-ui/react-label";
function Login() {
  const navigate = useNavigate();
  const {
    user,
    loading
  } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);
  useEffect(() => {
    if (!loading && user) navigate({
      to: "/dashboard"
    });
  }, [user, loading, navigate]);
  const onSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    const {
      error
    } = await supabase.auth.signInWithPassword({
      email,
      password
    });
    setSubmitting(false);
    if (error) {
      toast.error(error.message);
      return;
    }
    toast.success("Welcome back!");
    navigate({
      to: "/dashboard"
    });
  };
  return /* @__PURE__ */ jsxs("div", { className: "min-h-screen bg-background flex items-center justify-center px-4 relative overflow-hidden", children: [
    /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-mesh opacity-50 pointer-events-none" }),
    /* @__PURE__ */ jsxs("div", { className: "relative w-full max-w-md", children: [
      /* @__PURE__ */ jsxs(Link, { to: "/", className: "flex items-center gap-2 justify-center mb-8", children: [
        /* @__PURE__ */ jsx("div", { className: "h-8 w-8 rounded-lg bg-gradient-brand flex items-center justify-center glow-brand", children: /* @__PURE__ */ jsx(Sparkles, { className: "h-4 w-4 text-primary-foreground" }) }),
        /* @__PURE__ */ jsx("span", { className: "font-semibold text-lg", children: "PageForge" })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "glass rounded-2xl p-8", children: [
        /* @__PURE__ */ jsx("h1", { className: "text-2xl font-bold mb-1", children: "Welcome back" }),
        /* @__PURE__ */ jsx("p", { className: "text-sm text-muted-foreground mb-6", children: "Sign in to continue building." }),
        /* @__PURE__ */ jsxs("form", { onSubmit, className: "space-y-4", children: [
          /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
            /* @__PURE__ */ jsx(Label, { htmlFor: "email", children: "Email" }),
            /* @__PURE__ */ jsx(Input, { id: "email", type: "email", required: true, value: email, onChange: (e) => setEmail(e.target.value) })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
            /* @__PURE__ */ jsx(Label, { htmlFor: "password", children: "Password" }),
            /* @__PURE__ */ jsx(Input, { id: "password", type: "password", required: true, value: password, onChange: (e) => setPassword(e.target.value) })
          ] }),
          /* @__PURE__ */ jsx(Button, { type: "submit", disabled: submitting, className: "w-full bg-gradient-brand text-primary-foreground hover:opacity-90", children: submitting ? "Signing in…" : "Sign in" })
        ] }),
        /* @__PURE__ */ jsxs("p", { className: "text-sm text-muted-foreground mt-6 text-center", children: [
          "No account? ",
          /* @__PURE__ */ jsx(Link, { to: "/signup", className: "text-primary hover:underline", children: "Create one" })
        ] })
      ] })
    ] })
  ] });
}
export {
  Login as component
};
