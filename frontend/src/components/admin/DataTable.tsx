import React from "react";
import { ChevronLeft, ChevronRight, Search } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

export interface Column<T> {
  key: string;
  header: string;
  render?: (item: T) => React.ReactNode;
  width?: string;
}

export interface TablePagination {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  pageSize: number;
  pageSizeOptions?: number[];
  onPageChange?: (page: number) => void;
  onPageSizeChange?: (pageSize: number) => void;
}

interface DataTableProps<T> {
  data: T[];
  columns: Column<T>[];
  keyExtractor: (item: T) => string;
  onSearch?: (term: string) => void;
  searchPlaceholder?: string;
  searchValue?: string;
  onClearSearch?: () => void;
  isSearchPending?: boolean;
  actions?: (item: T) => React.ReactNode;
  isLoading?: boolean;
  pagination?: TablePagination;
}

export function DataTable<T>({
  data,
  columns,
  keyExtractor,
  onSearch,
  searchPlaceholder = "Search...",
  searchValue,
  onClearSearch,
  isSearchPending,
  actions,
  isLoading,
  pagination,
}: DataTableProps<T>) {
  return (
    <div className="w-full bg-card rounded-xl border shadow-sm">
      <div className="p-4 border-b flex items-center justify-between gap-4">
        {onSearch && (
          <div className="relative max-w-sm w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              placeholder={searchPlaceholder}
              value={searchValue ?? ""}
              onChange={(e) => onSearch(e.target.value)}
              className="w-full pl-9 pr-10 py-2 bg-secondary/50 border-none rounded-lg focus:ring-2 focus:ring-primary/20 text-sm outline-none transition-all"
            />
            {isSearchPending && (
              <span className="absolute right-7 top-1/2 -translate-y-1/2">
                <span className="inline-block w-4 h-4 border-2 border-gray-300 border-t-primary rounded-full animate-spin" />
              </span>
            )}
            {searchValue ? (
              <button
                aria-label="Clear search"
                onClick={() => {
                  onClearSearch?.();
                  onSearch("");
                }}
                className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              >
                ×
              </button>
            ) : null}
          </div>
        )}
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left">
          <thead className="bg-secondary/50 text-muted-foreground text-xs uppercase font-medium">
            <tr>
              {columns.map((col) => (
                <th key={col.key} className={cn("px-6 py-4", col.width)}>
                  {col.header}
                </th>
              ))}
              {actions && <th className="px-6 py-4 text-right">Actions</th>}
            </tr>
          </thead>
          <tbody>
            <AnimatePresence>
              {isLoading ? (
                <tr>
                  <td
                    colSpan={columns.length + (actions ? 1 : 0)}
                    className="px-6 py-8 text-center text-muted-foreground"
                  >
                    Loading data...
                  </td>
                </tr>
              ) : data.length === 0 ? (
                <tr>
                  <td
                    colSpan={columns.length + (actions ? 1 : 0)}
                    className="px-6 py-8 text-center text-muted-foreground"
                  >
                    No results found.
                  </td>
                </tr>
              ) : (
                data.map((item, i) => (
                  <motion.tr
                    key={keyExtractor(item)}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05 }}
                    className="border-b last:border-0 hover:bg-secondary/20 transition-colors"
                  >
                    {columns.map((col) => (
                      <td key={col.key} className="px-6 py-4 whitespace-nowrap">
                        {col.render ? col.render(item) : (item as any)[col.key]}
                      </td>
                    ))}
                    {actions && (
                      <td className="px-6 py-4 whitespace-nowrap text-right">{actions(item)}</td>
                    )}
                  </motion.tr>
                ))
              )}
            </AnimatePresence>
          </tbody>
        </table>
      </div>

      <div className="p-4 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-t text-sm text-muted-foreground">
        <div>
          {pagination ? (
            <span>
              Showing{" "}
              {pagination.totalItems === 0
                ? 0
                : (pagination.currentPage - 1) * pagination.pageSize + 1}{" "}
              to {Math.min(pagination.totalItems, pagination.currentPage * pagination.pageSize)} of{" "}
              {pagination.totalItems} entries
            </span>
          ) : (
            <span>
              Showing {data.length > 0 ? 1 : 0} to {data.length} of {data.length} entries
            </span>
          )}
        </div>

        {pagination ? (
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
            {pagination.pageSizeOptions?.length ? (
              <label className="flex items-center gap-2 text-sm">
                <span>Rows</span>
                <select
                  value={pagination.pageSize}
                  onChange={(e) => pagination.onPageSizeChange?.(Number(e.target.value))}
                  className="rounded-md border border-input bg-background px-2 py-1 text-sm"
                >
                  {pagination.pageSizeOptions.map((size: number) => (
                    <option key={size} value={size}>
                      {size}
                    </option>
                  ))}
                </select>
              </label>
            ) : null}

            <div className="flex gap-2">
              <button
                className="p-2 border rounded-md hover:bg-secondary disabled:opacity-50 transition-colors"
                onClick={() => pagination.onPageChange?.(pagination.currentPage - 1)}
                disabled={!pagination.onPageChange || pagination.currentPage <= 1}
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                className="p-2 border rounded-md hover:bg-secondary disabled:opacity-50 transition-colors"
                onClick={() => pagination.onPageChange?.(pagination.currentPage + 1)}
                disabled={
                  !pagination.onPageChange || pagination.currentPage >= pagination.totalPages
                }
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        ) : (
          <div className="flex gap-2">
            <button className="p-2 border rounded-md hover:bg-secondary disabled:opacity-50 transition-colors">
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button className="p-2 border rounded-md hover:bg-secondary disabled:opacity-50 transition-colors">
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
