import useAuthContext from "../hooks/useAuthContext";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Button } from "../components/ui/button";

export default function Home() {
  const {
    userData: { user },
  } = useAuthContext();

  const isManager = user.role === "manager";

  return (
    <main>
      <section className="ip-container">
        <div className="flex justify-center">
          <Card className="w-full">
            <CardHeader>
              <CardTitle>Welcome to iPangram</CardTitle>
              <CardDescription>Account Details</CardDescription>
            </CardHeader>

            <CardContent>
              <p>
                Name: <strong>{user.name}</strong>
              </p>
              <p>
                Email: <strong>{user.email}</strong>
              </p>
            </CardContent>

            {isManager && (
              <CardFooter className="flex gap-4">
                <Button className="" variant="secondary">
                  Employees
                </Button>
                <Button className="" variant="secondary">
                  Departments
                </Button>
              </CardFooter>
            )}
          </Card>
        </div>
      </section>
    </main>
  );
}
