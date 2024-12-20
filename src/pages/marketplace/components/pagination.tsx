import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from 'lucide-react'

interface PaginationProps {
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
}

export function Pagination({ currentPage, totalPages, onPageChange }: PaginationProps) {
  const maxVisiblePages = 7
  let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2))
  let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1)

  if (endPage - startPage + 1 < maxVisiblePages) {
    startPage = Math.max(1, endPage - maxVisiblePages + 1)
  }

  return (
    <div className="flex items-center justify-center space-x-2 my-8">
      <Button
        variant="outline"
        size="icon"
        className="bg-white"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        <ChevronLeft className="h-4 w-4" />
      </Button>
      {startPage > 1 && (
        <>
          <Button className="bg-white" variant="outline" onClick={() => onPageChange(1)}>
            1
          </Button>
          {startPage > 2 && <div className="px-2">...</div>}
        </>
      )}
      {Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i).map((page) => {
        if(currentPage == page){
          return <Button
          key={page}
          className="bg-green-500 text-white"
          variant="outline"
          onClick={() => onPageChange(page)}
        >
          {page}
        </Button>
        }
        return <Button
          key={page}
          className="bg-white"
          variant="outline"
          onClick={() => onPageChange(page)}
        >
          {page}
        </Button>
      })}
      {endPage < totalPages && (
        <>
          {endPage < totalPages - 1 && <div className="px-2">...</div>}
          <Button variant="outline" className="bg-white" onClick={() => onPageChange(totalPages)}>
            {totalPages}
          </Button>
        </>
      )}
      <Button
        variant="outline"
        size="icon"
        className="bg-white"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        <ChevronRight className="h-4 w-4" />
      </Button>
    </div>
  )
}

