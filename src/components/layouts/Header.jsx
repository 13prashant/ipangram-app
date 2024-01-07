import { useEffect } from "react";
import { Link } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import { useToast } from "../ui/use-toast";
import { Button } from "../ui/button";
import { menuItems } from "./helpers";

export default function Header() {
  const { toast } = useToast;

  const { logout, isPending, error } = useAuth();

  useEffect(() => {
    if (error) {
      toast({
        title: "Uh oh! Something went wrong.",
        description: "There was a problem logging out.",
      });
    }
  }, [error, toast]);

  return (
    <header className="bg-slate-100">
      <div className="ip-container flex w-full justify-between items-center">
        <Link to="/" className="font-extrabold">
          iPangram
        </Link>
        <nav className="flex items-center gap-5">
          <ul className="flex gap-5">
            {menuItems.map((menu) => (
              <li key={menu.id}>
                <Link
                  to={menu.link}
                  className="font-semibold cursor-pointer hover:underline duration-300"
                >
                  {menu.name}
                </Link>
              </li>
            ))}
          </ul>
          <Button onClick={logout} variant="outline" disabled={isPending}>
            {isPending ? "Logging out" : "Logout"}
          </Button>
        </nav>
      </div>
    </header>
  );
}
