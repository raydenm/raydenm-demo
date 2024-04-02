"use client"

import Pagination from "rc-pagination"
import {
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
  Pagination as UIPagination,
} from "components/ui/pagination"
import { cn } from "lib/utils"

type PagingProps = {
  total: number
  pageSize?: number
  className?: string
  onChange: (current: number) => void
  pageNumber: number
}

const Paging = ({ total, pageNumber = 1, pageSize = 10, className = "", onChange }: PagingProps) => {
  const itemRender = (
    current: number,
    type: "page" | "prev" | "next" | "jump-prev" | "jump-next",
    element: React.ReactNode
  ) => {
    if (type === "page") {
      return (
        <PaginationItem>
          <PaginationLink href="#" isActive={current === pageNumber}>
            {current}
          </PaginationLink>
        </PaginationItem>
      )
    }
    if (type === "prev") {
      return (
        <PaginationItem>
          <PaginationPrevious href="#"></PaginationPrevious>
        </PaginationItem>
      )
    }
    if (type === "next") {
      return (
        <PaginationItem>
          <PaginationNext href="#"></PaginationNext>
        </PaginationItem>
      )
    }
    if (type === "jump-prev") {
      return (
        <PaginationItem>
          <PaginationEllipsis />
        </PaginationItem>
      )
    }
    if (type === "jump-next") {
      return (
        <PaginationItem>
          <PaginationEllipsis />
        </PaginationItem>
      )
    }
    return element
  }

  return (
    <UIPagination className={className}>
      <PaginationContent>
        <Pagination
          className={cn(className, "flex items-center justify-center")}
          total={total}
          current={pageNumber}
          pageSize={pageSize}
          onChange={onChange}
          itemRender={itemRender}
        />
      </PaginationContent>
    </UIPagination>
  )
}

export default Paging
