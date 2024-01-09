import useAuthContext from "../hooks/useAuthContext";
import useApi from "../hooks/useApi";
import { AlertCircle } from "lucide-react";
import Loader from "../components/ui/loader";
import { Alert, AlertDescription, AlertTitle } from "../components/ui/alert";
import { Button } from "../components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "../components/ui/dialog";
import DepartmentForm from "../components/departments/DepartmentForm";

export default function Departments() {
  const { response } = useApi(`/departments`);

  const {
    userData: { user },
  } = useAuthContext();

  const isManager = user.role === "manager";

  return (
    <section className="ip-container">
      {isManager && (
        <div className="flex justify-end mb-10">
          <Dialog>
            <DialogTrigger asChild>
              <Button>Create new department</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DepartmentForm />
            </DialogContent>
          </Dialog>
        </div>
      )}

      <div>
        {response.isPending ? (
          <Loader />
        ) : response.error ? (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{response.error}</AlertDescription>
          </Alert>
        ) : (
          <div className="flex gap-5">
            {response.data.map((department) => (
              <div key={department.id} className="cursor-pointer">
                <Dialog>
                  <DialogTrigger asChild>
                    <div className="flex gap-5">
                      <div className="border border-gray-400 rounded-md max-w-96 p-5">
                        <h4 className="font-bold text-xl">{department.name}</h4>
                        <p className="text-gray-400">
                          {department?.description}
                        </p>
                      </div>
                    </div>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[425px]">
                    <DepartmentForm
                      id={department.id}
                      name={department.name}
                      description={department?.description}
                      isUpdate
                    />
                  </DialogContent>
                </Dialog>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
