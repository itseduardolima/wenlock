import api from "./api";
import type { User } from "../interface/user.interface";
import { PaginatedResponse } from "../interface/response.interface";

export const UserService = {
  
  getUsers: async ( page = 1, limit = 15, search?: string ): Promise<PaginatedResponse<User>> => {
    try {
      const params = new URLSearchParams();

      if (page > 1) {
        params.append("page", page.toString());
      }

      params.append("limit", limit.toString());

      if (search) {
        params.append("search", search);
      }

      const response = await api.get<PaginatedResponse<User>>(
        `/users?${params.toString()}`
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching users:", error);
      
      return {
        items: [],
        meta: {
          totalItems: 0,
          itemCount: 0,
          itemsPerPage: limit,
          totalPages: 0,
          currentPage: page,
        },
        links: {
          first: "",
          previous: "",
          next: "",
          last: "",
        },
      };
    }
  },
};
