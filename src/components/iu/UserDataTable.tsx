import { ReactNode } from "react";
import Image from "next/image";
import TableRow from "./TableRow";

type ProfileCell = {
  avatarUrl: string;
  title: ReactNode;
  subtitle?: ReactNode;
  alt?: string;
};

export type ColumnDef<TData> = {
  key: keyof TData | string;
  header: string | ReactNode;
  accessor?: (row: TData, rowIndex: number) => ReactNode;
  className?: string;
  headerClassName?: string;
};

export type UserDataTableProps<TData> = {
  data: TData[];
  renderProfile: (row: TData, rowIndex: number) => ProfileCell | ReactNode;
  columns: Array<ColumnDef<TData>>;
  selectable?: boolean;
  getRowId?: (row: TData, index: number) => string;
  onSelectAllChange?: (checked: boolean) => void;
  onRowSelectChange?: (row: TData, checked: boolean) => void;
  className?: string;
  leftActions?: ReactNode;
  onSearchChange?: (value: string) => void;
  searchPlaceholder?: string;
};

export default function UserDataTable<TData>(props: UserDataTableProps<TData>) {
  const {
    data,
    renderProfile,
    columns,
    selectable = false,
    getRowId,
    onSelectAllChange,
    onRowSelectChange,
    className,
    leftActions,
    onSearchChange,
    searchPlaceholder = "Search",
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
      <div className="flex items-center justify-between flex-column md:flex-row flex-wrap space-y-4 md:space-y-0 py-4 bg-white dark:bg-gray-900 px-3">
        <div>
          {leftActions ?? (
            <button
              className="inline-flex items-center text-gray-500 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-3 py-1.5 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
              type="button"
            >
              <span className="sr-only">Action button</span>
              Action
              <svg className="w-2.5 h-2.5 ms-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4" />
              </svg>
            </button>
          )}
        </div>
        <label htmlFor="table-search-users" className="sr-only">
          Search
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 rtl:inset-r-0 start-0 flex items-center ps-3 pointer-events-none">
            <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
            </svg>
          </div>
          <input
            type="text"
            id="table-search-users"
            onChange={(e) => onSearchChange?.(e.target.value)}
            className="block pt-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder={searchPlaceholder}
          />
        </div>
      </div>

      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            {selectable && (
              <th scope="col" className="p-4">
                <div className="flex items-center">
                  <input
                    id="checkbox-all-user-table"
                    type="checkbox"
                    onChange={(e) => onSelectAllChange?.(e.target.checked)}
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-sm focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  />
                  <label htmlFor="checkbox-all-user-table" className="sr-only">
                    checkbox
                  </label>
                </div>
              </th>
            )}
            <th scope="col" className="px-6 py-3">
              Name
            </th>
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

            const leadCellContent = (() => {
              const content = renderProfile(row, rowIndex);
              if (typeof content === "object" && content !== null && "avatarUrl" in (content as ProfileCell)) {
                const c = content as ProfileCell;
                return (
                  <>
                    <Image
                      src={c.avatarUrl}
                      alt={c.alt ?? "avatar"}
                      width={40}
                      height={40}
                      className="rounded-full"
                    />
                    <div className="ps-3">
                      <div className="text-base font-semibold">{c.title}</div>
                      {c.subtitle && <div className="font-normal text-gray-500">{c.subtitle}</div>}
                    </div>
                  </>
                );
              }
              return <>{content as ReactNode}</>;
            })();

            const cells = columns.map((col, colIndex) => {
              let cellContent: ReactNode;
              if (col.accessor) {
                cellContent = col.accessor(row, rowIndex);
              } else if (typeof col.key === "string") {
                const value = (row as unknown as Record<string, unknown>)[col.key];
                cellContent = value as ReactNode;
              } else {
                const value = (row as unknown as Record<string, unknown>)[String(col.key)];
                cellContent = value as ReactNode;
              }
              return { key: `cell-${rowId}-${colIndex}`, className: col.className, content: cellContent };
            });

            return (
              <TableRow
                key={rowId}
                rowId={rowId}
                selectable={selectable}
                onSelectChange={(checked) => onRowSelectChange?.(row, checked)}
                leadCell={{ isHeader: true, content: leadCellContent }}
                cells={cells}
              />
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

