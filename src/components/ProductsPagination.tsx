import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationPrevious,
  PaginationNext,
  PaginationEllipsis,
} from "@/components/ui/pagination";

interface Props {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

function buildPageList(current: number, total: number): (number | "ellipsis")[] {
  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1);

  const pages: (number | "ellipsis")[] = [1];
  const start = Math.max(2, current - 1);
  const end = Math.min(total - 1, current + 1);

  if (start > 2) pages.push("ellipsis");
  for (let i = start; i <= end; i++) pages.push(i);
  if (end < total - 1) pages.push("ellipsis");
  pages.push(total);

  return pages;
}

function ProductsPagination({ currentPage, totalPages, onPageChange }: Props) {
  if (totalPages <= 1) return null;

  const go = (page: number) => (e: React.MouseEvent) => {
    e.preventDefault();
    if (page < 1 || page > totalPages || page === currentPage) return;
    onPageChange(page);
  };

  const pages = buildPageList(currentPage, totalPages);

  const linkCls = "bg-transparent! hover:bg-transparent! text-foreground!";

  return (
    <Pagination className="mt-8 bg-transparent! text-foreground!">
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            href="#"
            onClick={go(currentPage - 1)}
            aria-disabled={currentPage === 1}
            className={linkCls}
            style={currentPage === 1 ? { pointerEvents: "none", opacity: 0.4 } : undefined}
          />
        </PaginationItem>

        {pages.map((p, i) => (
          <PaginationItem key={`${p}-${i}`}>
            {p === "ellipsis" ? (
              <PaginationEllipsis className="text-foreground!" />
            ) : (
              <PaginationLink
                href="#"
                isActive={p === currentPage}
                onClick={go(p)}
                className={linkCls}
              >
                {p}
              </PaginationLink>
            )}
          </PaginationItem>
        ))}

        <PaginationItem>
          <PaginationNext
            href="#"
            onClick={go(currentPage + 1)}
            aria-disabled={currentPage === totalPages}
            className={linkCls}
            style={currentPage === totalPages ? { pointerEvents: "none", opacity: 0.4 } : undefined}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}

export default ProductsPagination;
