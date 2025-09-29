"use client";

import * as React from "react";
import {
  closestCenter,
  DndContext,
  KeyboardSensor,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
  type UniqueIdentifier,
} from "@dnd-kit/core";
import { restrictToVerticalAxis } from "@dnd-kit/modifiers";
import {
  arrayMove,
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import {
  ColumnDef,
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  Row,
  SortingState,
  useReactTable,
  VisibilityState,
} from "@tanstack/react-table";
import { z } from "zod";

import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { formatCurrency, formatDate, formatNumber } from "@/lib/utils";

export const cropSchema = z.object({
  id: z.string(),
  farm_id: z.string(),
  crop_name: z.string(),
  season: z.enum(["Spring", "Summer", "Fall", "Winter"]),
  area_planted: z.number(),
  expected_yield: z.number(),
  actual_yield: z.number(),
  price_per_kg: z.number(),
  status: z.enum(["harvested", "in progress", "planted", "germinating"]),
  planting_date: z.string(),
  harvest_date: z.string().optional(),
});

const getStatusColor = (status: string) => {
  switch (status) {
    case "harvested":
      return "bg-green-100 text-green-800 border-green-200";
    case "in progress":
      return "bg-blue-100 text-blue-800 border-blue-200";
    case "planted":
      return "bg-yellow-100 text-yellow-800 border-yellow-200";
    case "germinating":
      return "bg-purple-100 text-purple-800 border-purple-200";
    default:
      return "bg-gray-100 text-gray-800 border-gray-200";
  }
};

const getSeasonColor = (season: string) => {
  switch (season) {
    case "Spring":
      return "bg-green-50 text-green-700 border-green-200";
    case "Summer":
      return "bg-orange-50 text-orange-700 border-orange-200";
    case "Fall":
      return "bg-amber-50 text-amber-700 border-amber-200";
    case "Winter":
      return "bg-blue-50 text-blue-700 border-blue-200";
    default:
      return "bg-gray-50 text-gray-700 border-gray-200";
  }
};

const columns: ColumnDef<z.infer<typeof cropSchema>>[] = [
  {
    accessorKey: "crop_name",
    header: "Crop Name",
    cell: ({ row }) => row.original.crop_name,
    enableHiding: false,
  },
  {
    accessorKey: "season",
    header: "Season",
    cell: ({ row }) => (
      <Badge
        variant="outline"
        className={`${getSeasonColor(row.original.season)} text-xs`}
      >
        {row.original.season}
      </Badge>
    ),
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => (
      <Badge
        variant="outline"
        className={`${getStatusColor(row.original.status)} text-xs`}
      >
        {row.original.status.replace("_", " ")}
      </Badge>
    ),
  },
  {
    accessorKey: "area_planted",
    header: () => <div className="text-right">Area (acres)</div>,
    cell: ({ row }) => (
      <div className="text-right font-medium">
        {formatNumber(row.original.area_planted)}
      </div>
    ),
  },
  {
    accessorKey: "expected_yield",
    header: () => <div className="text-right">Expected Yield (kg)</div>,
    cell: ({ row }) => (
      <div className="text-right">
        {formatNumber(row.original.expected_yield)}
      </div>
    ),
  },
  {
    accessorKey: "actual_yield",
    header: () => <div className="text-right">Actual Yield (kg)</div>,
    cell: ({ row }) => (
      <div className="text-right font-medium">
        {row.original.actual_yield > 0
          ? formatNumber(row.original.actual_yield)
          : "-"}
      </div>
    ),
  },
  {
    accessorKey: "price_per_kg",
    header: () => <div className="text-right">Price/kg (GBP)</div>,
    cell: ({ row }) => (
      <div className="text-right font-medium">
        {formatCurrency(row.original.price_per_kg)}
      </div>
    ),
  },
  {
    accessorKey: "planting_date",
    header: "Planting Date",
    cell: ({ row }) => (
      <div className="text-sm">{formatDate(row.original.planting_date)}</div>
    ),
  },
  {
    accessorKey: "harvest_date",
    header: "Harvest Date",
    cell: ({ row }) => (
      <div className="text-sm">
        {row.original.harvest_date
          ? formatDate(row.original.harvest_date)
          : "-"}
      </div>
    ),
  },
];

function DraggableRow({ row }: { row: Row<z.infer<typeof cropSchema>> }) {
  const { transform, transition, setNodeRef, isDragging } = useSortable({
    id: row.original.id,
  });

  return (
    <TableRow
      data-state={row.getIsSelected() && "selected"}
      data-dragging={isDragging}
      ref={setNodeRef}
      className="relative z-0 data-[dragging=true]:z-10 data-[dragging=true]:opacity-80"
      style={{
        transform: CSS.Transform.toString(transform),
        transition: transition,
      }}
    >
      {row.getVisibleCells().map((cell) => (
        <TableCell key={cell.id}>
          {flexRender(cell.column.columnDef.cell, cell.getContext())}
        </TableCell>
      ))}
    </TableRow>
  );
}

export default function CropsTable({
  data: initialData,
}: {
  data: z.infer<typeof cropSchema>[];
}) {
  const [data, setData] = React.useState(() => initialData);
  const [rowSelection, setRowSelection] = React.useState({});
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [pagination, setPagination] = React.useState({
    pageIndex: 0,
    pageSize: 10,
  });
  const sortableId = React.useId();
  const sensors = useSensors(
    useSensor(MouseSensor, {}),
    useSensor(TouchSensor, {}),
    useSensor(KeyboardSensor, {})
  );

  const dataIds = React.useMemo<UniqueIdentifier[]>(
    () => data?.map(({ id }) => id) || [],
    [data]
  );

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
      columnVisibility,
      rowSelection,
      columnFilters,
      pagination,
    },
    getRowId: (row) => row.id.toString(),
    enableRowSelection: true,
    onRowSelectionChange: setRowSelection,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
  });

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    if (active && over && active.id !== over.id) {
      setData((data) => {
        const oldIndex = dataIds.indexOf(active.id);
        const newIndex = dataIds.indexOf(over.id);
        return arrayMove(data, oldIndex, newIndex);
      });
    }
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="overflow-hidden rounded-lg border">
        <DndContext
          collisionDetection={closestCenter}
          modifiers={[restrictToVerticalAxis]}
          onDragEnd={handleDragEnd}
          sensors={sensors}
          id={sortableId}
        >
          <Table>
            <TableHeader className="bg-muted sticky top-0 z-10">
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => {
                    return (
                      <TableHead key={header.id} colSpan={header.colSpan}>
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                      </TableHead>
                    );
                  })}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody className="**:data-[slot=table-cell]:first:w-8">
              {table.getRowModel().rows?.length ? (
                <SortableContext
                  items={dataIds}
                  strategy={verticalListSortingStrategy}
                >
                  {table.getRowModel().rows.map((row) => (
                    <DraggableRow key={row.id} row={row} />
                  ))}
                </SortableContext>
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={columns.length}
                    className="h-24 text-center"
                  >
                    No crops found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </DndContext>
      </div>
    </div>
  );
}

export { CropsTableSkeleton } from "./Skeleton";
