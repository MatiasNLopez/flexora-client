import { ReactNode } from "react";

export type TableRowCell = {
  key?: string | number;
  className?: string;
  content: ReactNode;
};

export type LeadCell = {
  isHeader?: boolean;
  className?: string;
  content: ReactNode;
};

export type TableRowProps = {
  rowId: string;
  selectable?: boolean;
  onSelectChange?: (checked: boolean) => void;
  leadCell?: LeadCell;
  cells: TableRowCell[];
  className?: string;
};

export default function TableRow(props: TableRowProps) {
  const { rowId, selectable, onSelectChange, leadCell, cells, className } = props;

  return (
    <tr
      className={
        `bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600` +
        (className ? ` ${className}` : "")
      }
    >
      {selectable && (
        <td className="w-4 p-4">
          <div className="flex items-center">
            <input
              id={`checkbox-row-${rowId}`}
              type="checkbox"
              onChange={(e) => onSelectChange?.(e.target.checked)}
              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-sm focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
            />
            <label htmlFor={`checkbox-row-${rowId}`} className="sr-only">
              checkbox
            </label>
          </div>
        </td>
      )}

      {leadCell && (
        leadCell.isHeader ? (
          <th
            scope="row"
            className={`flex items-center px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white${leadCell.className ? ` ${leadCell.className}` : ""}`}
          >
            {leadCell.content}
          </th>
        ) : (
          <td className={`px-6 py-4${leadCell.className ? ` ${leadCell.className}` : ""}`}>{leadCell.content}</td>
        )
      )}

      {cells.map((cell, idx) => (
        <td key={cell.key ?? idx} className={`px-6 py-4${cell.className ? ` ${cell.className}` : ""}`}>
          {cell.content}
        </td>
      ))}
    </tr>
  );
}

