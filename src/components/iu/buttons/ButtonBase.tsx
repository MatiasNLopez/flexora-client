"use client";

import React, { forwardRef, ReactNode } from "react";

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  startIcon?: ReactNode;
  endIcon?: ReactNode;
  loading?: boolean;
  loadingSpinner?: ReactNode;
  fullWidth?: boolean;
  unstyled?: boolean;
  className?: string;
  text?: string; // label alternativo si no pasás children
  // onClick ya viene en React.ButtonHTMLAttributes<HTMLButtonElement>
};

const baseClasses =
  "inline-flex items-center justify-center gap-2 rounded-xl focus:outline-none " +
  "disabled:opacity-50 disabled:cursor-not-allowed";

const DefaultSpinner = () => (
  <svg className="h-4 w-4 animate-spin text-current" viewBox="0 0 24 24" aria-hidden="true">
    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" className="opacity-25" />
    <path d="M4 12a8 8 0 0 1 8-8v4a4 4 0 0 0-4 4H4z" fill="currentColor" className="opacity-75" />
  </svg>
);

const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  {
    children,
    className = "",
    startIcon,
    endIcon,
    loading = false,
    loadingSpinner,
    fullWidth = false,
    unstyled = false,
    type,
    disabled,
    text,
    onClick, // <- acá la recibimos explícitamente
    ...rest
  },
  ref
) {
  const classes = [
    unstyled ? "" : baseClasses,
    fullWidth ? "w-full" : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  const label = children ?? (text ? <span className="truncate">{text}</span> : null);

  const handleClick: React.MouseEventHandler<HTMLButtonElement> = (e) => {
    // Evitá clic cuando está cargando o deshabilitado
    if (loading || disabled) {
      e.preventDefault();
      e.stopPropagation();
      return;
    }
    onClick?.(e);
  };

  return (
    <button
      ref={ref}
      type={type ?? "button"}
      className={classes}
      disabled={disabled || loading}
      aria-busy={loading || undefined}
      data-loading={loading ? "" : undefined}
      onClick={handleClick}
      {...rest}
    >
      {loading ? (
        loadingSpinner ?? <DefaultSpinner />
      ) : (
        <>
          {startIcon && <span className="shrink-0">{startIcon}</span>}
          {label}
          {endIcon && <span className="shrink-0">{endIcon}</span>}
        </>
      )}
    </button>
  );
});

export default Button;
