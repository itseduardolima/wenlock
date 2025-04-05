import { PaginationLinks, PaginationMeta } from "./pagination.interface";

export interface PaginatedResponse<T> {
  items: T[];
  meta: PaginationMeta;
  links: PaginationLinks;
}