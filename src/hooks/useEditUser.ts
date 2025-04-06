import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { UserService } from "../services/user-service";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import type { UpdateUserData } from "../schemas/userSchema";
import { handleError } from "../utils/Error";

export const useEditUser = (userId: string | undefined) => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const [isReady, setIsReady] = useState(false);

  const {
    data: user,
    isLoading: isLoadingUser,
    isError: isErrorFetching,
    error: fetchError,
  } = useQuery({
    queryKey: ["user", userId],
    queryFn: () => (userId ? UserService.getUserById(userId) : null),
    enabled: !!userId,
  });

  const {
    mutate,
    isPending: isUpdating,
    isError: isErrorUpdating,
    error: updateError,
    isSuccess,
    reset,
  } = useMutation({
    mutationFn: (userData: UpdateUserData) => {
      if (!userId) throw new Error("ID do usuário não fornecido");
      return UserService.updateUser(userId, userData);
    },
    onSuccess: () => {
      toast.success("Dados salvos com sucesso!"),
        queryClient.invalidateQueries({ queryKey: ["users"] });
        queryClient.invalidateQueries({ queryKey: ["users", userId] });

      navigate("/usuarios");
    },
    onError: (error) => {
      handleError(error);
    },
  });

  const updateUser = (userData: UpdateUserData) => {
    mutate(userData);
  };

  const isError = isErrorFetching || isErrorUpdating;
  const error = fetchError || updateError;
  const isLoading = isLoadingUser || isUpdating;

  return {
    user,
    updateUser,
    isLoading,
    isReady,
    isError,
    error,
    isSuccess,
    reset,
  };
};
