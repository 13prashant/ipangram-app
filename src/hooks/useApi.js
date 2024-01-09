import { useEffect, useState } from "react";
import { useToast } from "../components/ui/use-toast";
import { backendApiUrl } from "../lib/constants";

export default function useApi(api) {
  const { toast } = useToast();

  const [data, setData] = useState([]);
  const [pagination, setPagination] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setIsPending(true);
    setError(null);

    (async () => {
      try {
        const response = await fetch(`${backendApiUrl}/api/v1${api}`);

        const json = await response.json();

        if (!response.ok) {
          setError(json.error);
        }
        if (response.ok) {
          setData(json.data);

          if (json.pagination) {
            setPagination(json.pagination);
          }
        }
      } catch (error) {
        console.error("Error while getting data: ", error);
        setError(error.message);
      } finally {
        setIsPending(false);
      }
    })();
  }, [api]);

  const callApi = async (api, method, data, successMessage) => {
    setIsPending(true);
    setError(null);

    try {
      const token = JSON.parse(localStorage.getItem("IPANGRAM_USER")).token;

      const response = await fetch(`${backendApiUrl}/api/v1${api}`, {
        method,
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const json = await response.json();

      if (!response.ok) {
        setError(json.error);
        toast({
          variant: "destructive",
          title: "Uh oh! Something went wrong.",
          description: json.error,
        });
      }
      if (response.ok) {
        if (json.success) {
          toast({
            title: successMessage,
          });
        } else {
          toast({
            variant: "destructive",
            title: "Uh oh! Something went wrong.",
            description: json.error,
          });
        }
      }
    } catch (error) {
      console.error("Error in POST Api: ", error);
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: error.message,
      });
    } finally {
      setIsPending(false);
    }
  };

  return {
    response: {
      isPending,
      error,
      data,
      pagination,
    },
    callApi,
  };
}
