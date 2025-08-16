import Image from "next/image";
import { HiOutlineBell, HiOutlineMoon, HiOutlineSearch, HiOutlineChevronDown } from "react-icons/hi";
import { ChangeEvent } from "react";
import { IMAGES } from "@/lib/constants";

export type NavBarUser = {
  name: string;
  email: string;
  avatarUrl?: string;
  badgeLabel?: string;
};

export type NavBarProps = {
  user: NavBarUser;
  searchValue?: string;
  searchPlaceholder?: string;
  onSearchChange?: (value: string) => void;
  onSearchSubmit?: () => void;
  onToggleTheme?: () => void;
  onNotificationsClick?: () => void;
  className?: string;
};

export default function NavBar(props: NavBarProps) {
  const {
    user,
    searchValue = "",
    searchPlaceholder = "Search",
    onSearchChange,
    onSearchSubmit,
    onToggleTheme,
    onNotificationsClick,
    className,
  } = props;

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    onSearchChange?.(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearchSubmit?.();
  };

  return (
    <div className={`w-full px-2 sm:px-4 ${className ?? ""}`}>
      <div className="flex items-center justify-between gap-4 w-full">
        
        {/* Actions */}
        <div className="flex items-center gap-3"> 
          <button
            type="button"
            onClick={onToggleTheme}
            aria-label="Toggle theme"
            className="grid place-items-center w-9 h-9 rounded-lg border border-gray-200 dark:border-gray-700 text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800"
          >
            <HiOutlineMoon className="w-5 h-5" />
          </button>

          <button
            type="button"
            onClick={onNotificationsClick}
            aria-label="Notifications"
            className="grid place-items-center w-9 h-9 rounded-lg border border-gray-200 dark:border-gray-700 text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800"
          >
            <HiOutlineBell className="w-5 h-5" />
          </button>

          {/* User */}
          <div className="flex items-center gap-3">
            {(() => {
              const avatarSrc = user.avatarUrl && user.avatarUrl.trim().length > 0 ? user.avatarUrl : IMAGES.DEFAULT_AVATAR;
              return (
                <Image src={avatarSrc} alt={user.name} width={36} height={36} className="rounded-full" />
              );
            })()}
            <div className="hidden sm:block">
              <div className="text-sm font-medium text-gray-900 dark:text-white line-clamp-1">{user.name}</div>
              <div className="text-xs text-gray-500 dark:text-gray-400 line-clamp-1">{user.email}</div>
            </div>
            {user.badgeLabel && (
              <span className="text-xs px-2 py-0.5 rounded-md bg-blue-50 text-blue-700 border border-blue-200 dark:bg-blue-900/30 dark:text-blue-300 dark:border-blue-800">
                {user.badgeLabel}
              </span>
            )}
            <HiOutlineChevronDown className="w-4 h-4 text-gray-500 dark:text-gray-400" />
          </div>
        </div>
      </div>
    </div>
  );
}

