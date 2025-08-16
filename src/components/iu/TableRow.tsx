import { ReactNode } from "react";

type LeadCell = {
  isHeader?: boolean;
  content: ReactNode;
};

type RowCell = {
  key: string;
  content: ReactNode;
  className?: string;
};

type Props = {
  rowId: string;
  selectable?: boolean;
  onSelectChange?: (checked: boolean) => void;
  leadCell: LeadCell;
  cells: RowCell[];
  isSelected?: boolean;
};

export default function TableRow({
  rowId,
  selectable = false,
  onSelectChange,
  leadCell,
  cells,
  isSelected = false,
}: Props) {
  return (
    <tr
      className={`hover:bg-gray-50 ${isSelected ? "bg-blue-50/40" : "bg-white"}`}
      data-rowid={rowId}
    >
      {selectable && (
        <td className="w-10 px-4 py-3">
          <input
            aria-label={`select-row-${rowId}`}
            type="checkbox"
            defaultChecked={isSelected}
            onChange={(e) => onSelectChange?.(e.target.checked)}
            className="h-4 w-4 rounded-[6px] border-gray-300 text-blue-600 focus:ring-2 focus:ring-blue-500"
          />
        </td>
      )}

      {/* Lead cell: username/email/avatar */}
      <th scope="row" className="px-4 py-3 font-normal text-gray-700">
        {leadCell.content}
      </th>

      {/* Other cells */}
      {cells.map((c) => (
        <td key={c.key} className={`px-4 py-3 align-middle ${c.className ?? ""}`}>
          {c.content}
        </td>
      ))}
    </tr>
  );
}
