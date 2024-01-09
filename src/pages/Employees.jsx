import { useSearchParams } from "react-router-dom";
import useApi from "../hooks/useApi";
import { AlertCircle } from "lucide-react";
import Loader from "../components/ui/loader";
import { Alert, AlertDescription, AlertTitle } from "../components/ui/alert";
import Pagination from "../components/ui/pagination";

export default function Employees() {
  let [searchParams] = useSearchParams();

  const currentPage = searchParams.get("page") || 1;
  const limit = searchParams.get("limit") || 1;

  const { response } = useApi(
    `/users?role=employee&page=${currentPage}&limit=${limit}`
  );

  const { pagination } = response;

  return (
    <section className="ip-container">
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
          <div className="flex flex-col gap-3">
            {response.data.map((employee, index) => (
              <div
                key={employee.id}
                className="flex gap-3 bg-gray-100 rounded-md p-5"
              >
                <span className="font-semibold">{employee.name}</span>
                <span>{employee.email}</span>
              </div>
            ))}
          </div>
        )}
      </div>
      {pagination && <Pagination pagination={pagination} />}
    </section>
  );
}
