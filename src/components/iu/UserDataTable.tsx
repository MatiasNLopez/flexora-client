import { ReactNode } from "react";
import Image from "next/image";
import TableRow from "./TableRow";
import SearchInput from "./inputs/SearchInput";
import ButtonBase from "./buttons/ButtonBase";
import { useUserActions } from "../../hooks/useUserActions";
import { User } from "../../models/user";

type ProfileCell = {
  avatarUrl: string;
  title: ReactNode;      // suele ser username
  subtitle?: ReactNode;  // suele ser email
  alt?: string;
};

export type ColumnDef<TData> = {
  key: keyof TData | string;
  header: string | ReactNode;
  accessor?: (row: TData, rowIndex: number) => ReactNode;
  className?: string;
  headerClassName?: string;
  sortable?: boolean;
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

  // Opcionales para UI
  pageInfoText?: string; // "Showing 1–10 of 1000"
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
    searchPlaceholder = "Search for User",
    pageInfoText = "Showing 1–10 of 1000",
  } = props;

  // Hook para manejar acciones de usuario
  const {
    isCreating,
    isUpdating,
    isDeleting,
    createError,
    updateError,
    deleteError,
    createUser,
    updateUser,
    deleteUser,
    clearCreateError,
    clearUpdateError,
    clearDeleteError,
  } = useUserActions();

  // Funciones de manejo para los botones
  const handleAddUser = async () => {
    // Aquí podrías abrir un modal o navegar a una página de creación
    console.log('Abrir modal de crear usuario');
  };

  const handleEditUser = async (user: TData) => {
    // Aquí podrías abrir un modal o navegar a una página de edición
    console.log('Editar usuario:', user);
  };

  const handleDeleteUser = async (user: TData) => {
    // Aquí podrías mostrar una confirmación antes de eliminar
    if (confirm('¿Estás seguro de que quieres eliminar este usuario?')) {
      const userWithId = user as unknown as User;
      const success = await deleteUser(userWithId.user_id);
      if (success) {
        console.log('Usuario eliminado exitosamente');
        
      }
    }
  };

  const resolveBaseRowId = (row: TData, index: number): string => {
    try {
      return getRowId ? getRowId(row, index) : String(index);
    } catch {
      return String(index);
    }
  };

  // Debug de duplicados en dev
  if (process.env.NODE_ENV !== "production") {
    const seen = new Set<string>();
    data.forEach((row, i) => {
      const id = resolveBaseRowId(row, i);
      if (seen.has(id)) {
        // eslint-disable-next-line no-console
        console.warn("UserDataTable: Duplicate base rowId detected:", id, { index: i, row });
      }
      seen.add(id);
    });
  }

  return (
    <div className={`rounded-2xl border border-gray-200 bg-white shadow-sm ${className ?? ""}`}>
      
      {/* Toolbar */}
      <div className="flex flex-wrap items-center gap-3 p-3 sm:p-4">
        {/* Search */}
        <SearchInput
          id="table-search-users"
          className="grow sm:grow-0 w-full sm:w-[260px]"
          placeholder={searchPlaceholder}
          onChange={onSearchChange}
          size="md"
          clearable
          inputClassName="h-10"
        />

        {/* Filters */}
        <ButtonBase 
          unstyled
          className="inline-flex items-center gap-2 rounded-xl border border-gray-300 bg-white px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-4 focus:ring-gray-100"
          startIcon={
            <svg className="h-4 w-4" aria-hidden="true">
              <use href="/assets/icons-sprite.svg#icon-filter" />
            </svg>
          }
          text="Filters"
          >
        </ButtonBase> 

        <div className="ml-auto flex items-center gap-2">
         <ButtonBase
          className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-3 py-2 text-sm font-semibold text-white hover:bg-blue-700 focus:ring-4 focus:ring-blue-100"
          startIcon={
            <svg className="h-4 w-4" aria-hidden="true">
              <use href="/assets/icons-sprite.svg#icon-add" />
            </svg>
          }
          text="Add User"
          >
        </ButtonBase>
          <ButtonBase 
          className="inline-flex items-center gap-2 rounded-xl border border-gray-300 bg-white px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-4 focus:ring-gray-100"
          startIcon={
            <svg className="h-4 w-4" aria-hidden="true">
              <use href="/assets/icons-sprite.svg#icon-edit" />
            </svg>
          }
           text="Edit User"
           >
          </ButtonBase>
          <ButtonBase 
          className="inline-flex items-center gap-2 rounded-xl bg-rose-600 px-3 py-2 text-sm font-semibold text-white hover:bg-rose-700 focus:outline-none focus:ring-4 focus:ring-rose-100"
          startIcon={
            <svg className="h-4 w-4" aria-hidden="true">
              <use href="/assets/icons-sprite.svg#icon-delete" />
            </svg>
          }
          text="Delete User"
          onClick={() => handleDeleteUser(data[0])}
          >
          </ButtonBase>

          <ButtonBase  
            className="inline-flex items-center gap-2 rounded-xl border border-gray-300 bg-white px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-4 focus:ring-gray-100"
            endIcon={
              <svg className="h-4 w-4" aria-hidden="true">
                <use href="/assets/icons-sprite.svg#icon-chevron-down" />
              </svg>
            }
            text="More Actions"
            >
          </ButtonBase>
        </div>
      </div>

      {/* Table */}
      <div className="relative overflow-x-auto">
        <table className="w-full border-t border-gray-200 text-left text-sm text-gray-700">
          {/* Header */}
          <thead className="sticky top-0 z-10 bg-white text-xs text-gray-500">
            <tr className="border-b border-gray-200">
              {selectable && (
                <th scope="col" className="w-10 px-4 py-3">
                  <div className="flex items-center">
                    <input
                      id="checkbox-all-user-table"
                      type="checkbox"
                      onChange={(e) => onSelectAllChange?.(e.target.checked)}
                      className="h-4 w-4 rounded-[6px] border-gray-300 text-blue-600 focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </th>
              )}
              {/* Username (lead cell header) */}
              <th scope="col" className="px-4 py-3 font-medium">
                <div className="inline-flex items-center gap-1">
                  Username
                  <svg className="h-3.5 w-3.5 text-gray-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                    <path d="M7 7l3-3 3 3H7zm0 6h6l-3 3-3-3z" />
                  </svg>
                </div>
              </th>

              {columns.map((col, idx) => (
                <th
                  key={`header-${idx}`}
                  scope="col"
                  className={`px-4 py-3 font-medium ${col.headerClassName ?? ""}`}
                >
                  <div className="inline-flex items-center gap-1">
                    {col.header}
                    {col.sortable && (
                      <svg className="h-3.5 w-3.5 text-gray-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                        <path d="M7 7l3-3 3 3H7zm0 6h6l-3 3-3-3z" />
                      </svg>
                    )}
                  </div>
                </th>
              ))}

              {/* Role header al final si lo querés fijo puedes moverlo a columns */}
            </tr>
          </thead>

          {/* Body */}
          <tbody className="divide-y divide-gray-100">
            {data.map((row, rowIndex) => {
              const baseRowId = resolveBaseRowId(row, rowIndex);
              const uniqueRowKey = `${baseRowId}__${rowIndex}`;

              const leadCellContent = (() => {
                const content = renderProfile(row, rowIndex);
                if (typeof content === "object" && content !== null && "avatarUrl" in (content as ProfileCell)) {
                  const c = content as ProfileCell;
                  return (
                    <div className="flex items-center gap-3">
                      <Image
                        src={c.avatarUrl}
                        alt={c.alt ?? "avatar"}
                        width={36}
                        height={36}
                        className="rounded-full"
                      />
                      <div className="flex flex-col">
                        <span className="font-medium text-gray-900">{c.title}</span>
                        {c.subtitle && <span className="text-xs text-gray-500">{c.subtitle}</span>}
                      </div>
                    </div>
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
                return {
                  key: `cell-${uniqueRowKey}-${colIndex}`,
                  className: col.className,
                  content: cellContent,
                };
              });

              return (
                <TableRow
                  key={uniqueRowKey}
                  rowId={baseRowId}
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

      {/* Footer / Pagination info */}
      <div className="border-t border-gray-200 p-3 text-center text-xs text-gray-500 sm:p-4">
        {pageInfoText}
      </div>
    </div>
  );
}
