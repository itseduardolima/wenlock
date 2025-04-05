import { useQuery } from "@tanstack/react-query"
import { UserService } from "../services/user-service"

interface UseUsersOptions {
  page: number
  limit: number
  search?: string
  enabled?: boolean
}

export const useUsers = ({ page, limit, search, enabled = true }: UseUsersOptions) => {
  return useQuery({
    queryKey: ["users", page, limit, search],
    queryFn: () => UserService.getUsers(page, limit, search),
    staleTime: 5 * 60 * 1000,
    enabled,
  })
}


