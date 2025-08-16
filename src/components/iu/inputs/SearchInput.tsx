"use client";

import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
} from "react";

export type SearchInputProps = {
  id?: string;
  value?: string;                    // controlado
  defaultValue?: string;             // no controlado
  placeholder?: string;
  onChange?: (value: string) => void;           // disparo inmediato (cada keypress)
  onDebounce?: (value: string) => void;         // disparo con debounce
  debounceMs?: number;                          // default 300ms
  className?: string;                 // wrapper (p/ layout externo: grow, w-full, etc.)
  inputClassName?: string;            // clases extra del <input>
  autoFocus?: boolean;
  clearable?: boolean;                // muestra botón “X” para limpiar
  size?: "sm" | "md" | "lg";
  "aria-label"?: string;
};

const sizeMap: Record<NonNullable<SearchInputProps["size"]>, string> = {
  sm: "h-9 text-sm pl-9 pr-8",
  md: "h-10 text-sm pl-9 pr-9",
  lg: "h-11 text-base pl-10 pr-10",
};

const SearchInput = forwardRef<HTMLInputElement, SearchInputProps>(
  (
    {
      id,
      value,
      defaultValue,
      placeholder = "Search",
      onChange,
      onDebounce,
      debounceMs = 300,
      className,
      inputClassName,
      autoFocus,
      clearable = true,
      size = "md",
      "aria-label": ariaLabel = "Search",
    },
    ref
  ) => {
    const isControlled = typeof value === "string";
    const [inner, setInner] = useState<string>(defaultValue ?? "");
    const currentValue = isControlled ? (value as string) : inner;

    const inputRef = useRef<HTMLInputElement>(null);
    useImperativeHandle(ref, () => inputRef.current as HTMLInputElement);

    const debounceRef = useRef<number | null>(null);

    // Mantener sincronizado si es controlado
    useEffect(() => {
      if (isControlled) {
        // no tocar state interno
      }
    }, [isControlled, value]);

    const emitDebounce = useMemo(
      () => (val: string) => {
        if (!onDebounce) return;
        if (debounceRef.current) window.clearTimeout(debounceRef.current);
        debounceRef.current = window.setTimeout(() => {
          onDebounce(val);
        }, debounceMs);
      },
      [onDebounce, debounceMs]
    );

    const handleChange = (val: string) => {
      if (!isControlled) setInner(val);
      onChange?.(val);
      emitDebounce(val);
    };

    const handleInputChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
      handleChange(e.target.value);
    };

    const clear = () => {
      handleChange("");
      // forzar limpiar UI inmediatamente
      if (inputRef.current) {
        inputRef.current.value = "";
        inputRef.current.focus();
      }
    };

    return (
      <div className={`relative ${className ?? ""}`}>
        
        <span className="pointer-events-none absolute inset-y-0 left-3 flex items-center">
          <svg
            className="h-4 w-4 text-gray-400"
            viewBox="0 0 20 20"
            fill="none"
            aria-hidden="true"
            >
            <use href="/assets/icons-sprite.svg#icon-search" />
          </svg>
        </span>

        <input
          ref={inputRef}
          id={id}
          type="text"
          value={isControlled ? value : undefined}
          defaultValue={isControlled ? undefined : defaultValue}
          onChange={handleInputChange}
          placeholder={placeholder}
          aria-label={ariaLabel}
          autoFocus={autoFocus}
          className={[
            // Tailwind + compat Flowbite focus rings
            "w-full rounded-xl border border-gray-300 bg-white",
            "text-gray-900 placeholder:text-gray-400",
            "focus:border-blue-500 focus:ring-4 focus:ring-blue-100",
            sizeMap[size],
            inputClassName ?? "",
          ].join(" ")}
        />

        {/* Botón clear (derecha) */}           
        {clearable && currentValue?.length > 0 && (
          <button
            type="button"
            onClick={clear}
            className="absolute inset-y-0 right-2 my-auto inline-flex h-7 w-7 items-center justify-center rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-200"
            aria-label="Clear search"
            title="Clear"
          >
            <svg
              className="h-4 w-4 text-gray-400"
              viewBox="0 0 24 24"
              fill="none"
              aria-hidden="true"
            >
              <path
                d="M6 6l12 12M18 6L6 18"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </button>
        )}
      </div>
    );
  }
);

SearchInput.displayName = "SearchInput";
export default SearchInput;