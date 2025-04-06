import { useMutation, useQueryClient } from "@tanstack/react-query";
import { UserService } from "../services/user-service";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { handleError } from "../utils/Error";

interface CreateUserData {
  name: string;
  email: string;
  matricula: string;
  password: string;
}

export const useCreateUser = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const {
    mutate,
    isPending: isLoading,
    isError,
    error,
    isSuccess,
    reset,
  } = useMutation({
    mutationFn: (userData: CreateUserData) => UserService.createUser(userData),
    onSuccess: () => {
      toast.success("Cadastro Realizado!");
      queryClient.invalidateQueries({ queryKey: ["users"] });
      navigate("/usuarios");
    },
    onError: (error) => {
      handleError(error);
    },
  });

  const createUser = (userData: CreateUserData) => {
    mutate(userData);
  };

  return {
    createUser,
    isLoading,
    isError,
    error,
    isSuccess,
    reset,
  };
};
