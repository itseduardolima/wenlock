import { AxiosError } from "axios";
import { toast } from "react-toastify";

export interface ErrorResponse {
  message: string;
}

export const handleError = (error: unknown) => {
  const axiosErr = error as AxiosError<ErrorResponse>;

  let errorMessage = "Erro no servidor";
  if (
    axiosErr?.response?.data?.message &&
    Array.isArray(axiosErr.response.data.message)
  ) {
    errorMessage = axiosErr.response.data.message.join("\n");
  } else if (typeof axiosErr?.response?.data?.message === "string") {
    errorMessage = axiosErr.response.data.message;
  }

  console.error("Detalhes do erro:", axiosErr.response || error);
  toast.error(errorMessage);
};