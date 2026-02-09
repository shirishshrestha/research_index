/**
 * Paginated response from Django REST Framework
 */
export interface PaginatedResponse<T> {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
}

/**
 * Pagination params for API requests
 */
export interface PaginationParams {
  page?: number;
  page_size?: number;
}

/**
 * Extract results from paginated response
 */
export function extractResults<T>(response: T[] | PaginatedResponse<T>): T[] {
  if (Array.isArray(response)) {
    return response;
  }
  return response.results;
}

/**
 * Extract pagination metadata from response
 */
export interface PaginationMeta {
  count: number;
  next: string | null;
  previous: string | null;
  currentPage: number;
  totalPages: number;
  pageSize: number;
}

export function extractPaginationMeta<T>(
  response: T[] | PaginatedResponse<T>,
  currentPage: number = 1,
  pageSize: number = 10,
): PaginationMeta {
  if (Array.isArray(response)) {
    return {
      count: response.length,
      next: null,
      previous: null,
      currentPage: 1,
      totalPages: 1,
      pageSize: response.length,
    };
  }

  const totalPages = Math.ceil(response.count / pageSize);

  return {
    count: response.count,
    next: response.next,
    previous: response.previous,
    currentPage,
    totalPages,
    pageSize,
  };
}
