import { Skeleton } from "../ui/Skeleton";
import { TableBody, TableCell, TableRow } from "../ui/Table";


export const TableBodySkeleton = () => {
  const rows = Array.from({ length: 5 });

  return (
    <TableBody className="bg-white">
      {rows.map((_, index) => (
        <TableRow key={index} className="h-[3.313rem] border-b">
          {/* Skeleton for Document Name */}
          <TableCell className="px-4 py-2">
            <Skeleton className="h-4 w-[25rem] rounded" />
          </TableCell>

          {/* Skeleton for Download and Print Icons */}
          <TableCell className="px-4 py-2 text-center">
            <div className="flex items-center justify-center gap-x-8">
              <Skeleton className="h-6 w-6 rounded-lg" />
              <Skeleton className="h-6 w-6 rounded-lg" />
            </div>
          </TableCell>

          {/* Skeleton for Edit Icon */}
          <TableCell className="px-4 py-2 flex items-center justify-center translate-y-[15%] h-full flex-1">
            <Skeleton className="h-6 w-6 rounded-lg" />
          </TableCell>
        </TableRow>
      ))}
    </TableBody>
  );
};
