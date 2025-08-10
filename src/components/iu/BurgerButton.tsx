import { ButtonHTMLAttributes } from "react";

type Props = ButtonHTMLAttributes<HTMLButtonElement>;

export function BurgerButton(props: Props) {
    const { className, children, ...rest } = props;
    return (
        <button
            {...rest}
            type="button"
            className={
                `inline-flex items-center p-2 m-3 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200` +
                (className ? ` ${className}` : "")
            }
        >
            {children}
        </button>
    )
}

export default BurgerButton;