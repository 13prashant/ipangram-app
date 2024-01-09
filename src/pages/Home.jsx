import useAuthContext from "../hooks/useAuthContext";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../components/ui/card";

export default function Home() {
  const {
    userData: { user },
  } = useAuthContext();

  return (
    <section className="ip-container">
      <div className="flex justify-center">
        <Card className="w-full">
          <CardHeader>
            <CardTitle>Welcome to iPangram</CardTitle>
            <CardDescription>Your Account Details</CardDescription>
          </CardHeader>

          <CardContent>
            <p>
              Name: <strong>{user.name}</strong>
            </p>
            <p>
              Email: <strong>{user.email}</strong>
            </p>
            <p className="capitalize">
              Role: <strong>{user.role}</strong>
            </p>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
