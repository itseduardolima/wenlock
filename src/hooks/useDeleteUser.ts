import { useMutation, useQueryClient } from "@tanstack/react-query";
import { UserService } from "../services/user-service";
import { useState } from "react";
import { toast } from "react-toastify";
import { handleError } from "../utils/Error";

export const useDeleteUser = () => {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState<string | null>(null);
  const queryClient = useQueryClient();

  const { mutate, isError, error } = useMutation({
    mutationFn: (userId: string) => UserService.deleteUser(userId),
    onSuccess: () => {
      toast.success("Exclusão Realizada!");
      queryClient.invalidateQueries({ queryKey: ["users"] });
      closeDeleteModal();
    },
    onError: (error) => {
      handleError(error);
    },
  });

  const openDeleteModal = (userId: string) => {
    setUserToDelete(userId);
    setIsDeleteModalOpen(true);
  };

  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false);
    setUserToDelete(null);
  };

  const confirmDelete = () => {
    if (userToDelete) {
      mutate(userToDelete);
    }
  };

  return {
    isDeleteModalOpen,
    openDeleteModal,
    closeDeleteModal,
    confirmDelete,
    isError,
    error,
  };
};
