import { useState } from "react"
import { useQuery } from "@tanstack/react-query"
import { UserService } from "../services/user-service"

export const useUserDetails = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null)

  const {
    data: user,
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery({
    queryKey: ["user", selectedUserId],
    queryFn: () => (selectedUserId ? UserService.getUserById(selectedUserId) : null),
    enabled: !!selectedUserId,
  })

  const openUserDetails = (userId: string) => {
    setSelectedUserId(userId)
    setIsOpen(true)
  }

  const closeUserDetails = () => {
    setIsOpen(false)
  }

  return {
    user,
    isOpen,
    isLoading,
    isError,
    error,
    openUserDetails,
    closeUserDetails,
    refetch,
  }
}

