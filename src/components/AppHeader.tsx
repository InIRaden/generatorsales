import { Link } from "@tanstack/react-router";
import { Sparkles, LogOut, LayoutDashboard, Plus } from "lucide-react";
import { useAuth } from "@/lib/auth-context";
import { Button } from "@/components/ui/button";

export function AppHeader() {
  const { user, signOut } = useAuth();

  return (
    <header className="sticky top-0 z-40 glass border-b">
      <div className="mx-auto max-w-7xl flex h-16 items-center justify-between px-4 sm:px-6">
        <Link to="/" className="flex items-center gap-2 font-semibold">
          <div className="h-8 w-8 rounded-lg bg-gradient-brand flex items-center justify-center glow-brand">
            <Sparkles className="h-4 w-4 text-primary-foreground" />
          </div>
          <span className="text-lg">PageForge</span>
        </Link>
        <nav className="flex items-center gap-2">
          {user ? (
            <>
              <Button asChild variant="ghost" size="sm">
                <Link to="/dashboard"><LayoutDashboard className="h-4 w-4 mr-2" />Dashboard</Link>
              </Button>
              <Button asChild size="sm" className="bg-gradient-brand text-primary-foreground hover:opacity-90">
                <Link to="/new"><Plus className="h-4 w-4 mr-2" />New page</Link>
              </Button>
              <Button onClick={() => signOut()} variant="ghost" size="icon" title="Sign out">
                <LogOut className="h-4 w-4" />
              </Button>
            </>
          ) : (
            <>
              <Button asChild variant="ghost" size="sm"><Link to="/login">Sign in</Link></Button>
              <Button asChild size="sm" className="bg-gradient-brand text-primary-foreground hover:opacity-90"><Link to="/signup">Get started</Link></Button>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}
