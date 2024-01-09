import { useNavigate } from "react-router-dom";
import { Button } from "./button";

export default function Pagination({ pagination }) {
  const navigate = useNavigate();
  return (
    <div className="w-full flex justify-center gap-5 mt-10">
      {pagination.prev && (
        <Button
          variant="outline"
          onClick={() =>
            navigate(
              `?role=employee&page=${pagination.prev.page}&limit=${pagination.prev.limit}`
            )
          }
        >
          Previous
        </Button>
      )}
      {pagination.next && (
        <Button
          variant="outline"
          onClick={() =>
            navigate(
              `?role=employee&page=${pagination.next.page}&limit=${pagination.next.limit}`
            )
          }
        >
          Next
        </Button>
      )}
    </div>
  );
}
