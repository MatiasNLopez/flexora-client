import { ReactNode } from "react";
import TableRow from "./TableRow";

export type ColumnDef<TData> = {
  key: keyof TData | string;
  header: string | ReactNode;
  accessor?: (row: TData, rowIndex: number) => ReactNode;
  className?: string;
  headerClassName?: string;
};

export type DataTableProps<TData> = {
  data: TData[];
  columns: Array<ColumnDef<TData>>;
  selectable?: boolean;
  getRowId?: (row: TData, index: number) => string;
  onSelectAllChange?: (checked: boolean) => void;
  onRowSelectChange?: (row: TData, checked: boolean) => void;
  className?: string;
};

export default function DataTable<TData>(props: DataTableProps<TData>) {
  const {
    data,
    columns,
    selectable = false,
    getRowId,
    onSelectAllChange,
    onRowSelectChange,
    className,
  } = props;

  const resolveRowId = (row: TData, index: number): string => {
    try {
      return getRowId ? getRowId(row, index) : String(index);
    } catch {
      return String(index);
    }
  };

  return (
    <div className={`relative overflow-x-auto shadow-md sm:rounded-lg${className ? ` ${className}` : ""}`}>
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            {selectable && (
              <th scope="col" className="p-4">
                <div className="flex items-center">
                  <input
                    id="checkbox-all-data-table"
                    type="checkbox"
                    onChange={(e) => onSelectAllChange?.(e.target.checked)}
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-sm focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  />
                  <label htmlFor="checkbox-all-data-table" className="sr-only">
                    checkbox
                  </label>
                </div>
              </th>
            )}
            {columns.map((col, idx) => (
              <th
                key={`header-${idx}`}
                scope="col"
                className={`px-6 py-3${col.headerClassName ? ` ${col.headerClassName}` : ""}`}
              >
                {col.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, rowIndex) => {
            const rowId = resolveRowId(row, rowIndex);
            const cells = columns.map((col, colIndex) => {
              let content: ReactNode;
              if (col.accessor) {
                content = col.accessor(row, rowIndex);
              } else if (typeof col.key === "string") {
                const value = (row as unknown as Record<string, unknown>)[col.key];
                content = value as ReactNode;
              } else {
                const value = (row as unknown as Record<string, unknown>)[String(col.key)];
                content = value as ReactNode;
              }
              return { key: `cell-${rowId}-${colIndex}`, className: col.className, content };
            });
            return (
              <TableRow
                key={rowId}
                rowId={rowId}
                selectable={selectable}
                onSelectChange={(checked) => onRowSelectChange?.(row, checked)}
                cells={cells}
              />
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

