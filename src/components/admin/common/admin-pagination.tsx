"use client";

import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  MoreHorizontal,
} from "lucide-react";

import type { PaginationMeta } from "@/types/pagination";

import { Button } from "@/components/ui/button";

interface Props {
  pagination: PaginationMeta;

  onPageChange: (page: number) => void;
}

export function AdminPagination({ pagination, onPageChange }: Props) {
  const { page, totalPages, hasPreviousPage, hasNextPage } = pagination;

  const pages = createPageItems(page, totalPages);

  return (
    <div className="flex items-center justify-center gap-1">
      <Button
        variant="outline"
        size="icon"
        disabled={!hasPreviousPage}
        onClick={() => onPageChange(1)}
      >
        <ChevronsLeft />
      </Button>

      <Button
        variant="outline"
        size="icon"
        disabled={!hasPreviousPage}
        onClick={() => onPageChange(page - 1)}
      >
        <ChevronLeft />
      </Button>

      {pages.map((item, index) =>
        item === "ellipsis" ? (
          <Button
            key={`ellipsis-${index}`}
            variant="ghost"
            size="icon"
            disabled
          >
            <MoreHorizontal />
          </Button>
        ) : (
          <Button
            key={item}
            variant={item === page ? "default" : "outline"}
            onClick={() => onPageChange(item)}
          >
            {item}
          </Button>
        ),
      )}

      <Button
        variant="outline"
        size="icon"
        disabled={!hasNextPage}
        onClick={() => onPageChange(page + 1)}
      >
        <ChevronRight />
      </Button>

      <Button
        variant="outline"
        size="icon"
        disabled={!hasNextPage}
        onClick={() => onPageChange(totalPages)}
      >
        <ChevronsRight />
      </Button>
    </div>
  );
}

function createPageItems(
  currentPage: number,
  totalPages: number,
): (number | "ellipsis")[] {
  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, index) => index + 1);
  }

  if (currentPage <= 3) {
    return [1, 2, 3, 4, "ellipsis", totalPages];
  }

  if (currentPage >= totalPages - 2) {
    return [
      1,
      "ellipsis",
      totalPages - 3,
      totalPages - 2,
      totalPages - 1,
      totalPages,
    ];
  }

  return [1, "ellipsis", currentPage, currentPage + 1, "ellipsis", totalPages];
}
