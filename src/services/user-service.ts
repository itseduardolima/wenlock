import api from "./api";
import type { CreateUserData, UpdateUserData, User } from "../interface/user.interface";
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

  getUserById: async (id: string): Promise<User | null> => {
    try {
      const response = await api.get<User>(`/users/${id}`)
      return response.data
    } catch (error) {
      console.error(`Error fetching user with ID ${id}:`, error)
      return null
    }
  },

  createUser: async (userData: CreateUserData): Promise<User> => {
    try {
      const response = await api.post<User>("/users", userData)
      return response.data
    } catch (error) {
      console.error("Error creating user:", error)
      throw error
    }
  },

  updateUser: async (id: string, userData: UpdateUserData): Promise<User> => {
    try {
      const response = await api.patch<User>(`/users/${id}`, userData)
      return response.data
    } catch (error) {
      console.error(`Error updating user with ID ${id}:`, error)
      throw error
    }
  },

  deleteUser: async (id: string): Promise<void> => {
    try {
      await api.delete(`/users/${id}`)
    } catch (error) {
      console.error(`Error deleting user with ID ${id}:`, error)
      throw error
    }
  }
};



