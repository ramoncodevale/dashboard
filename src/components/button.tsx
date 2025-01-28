import { ReactNode } from "react"

interface ButtonProps {
  children: ReactNode
  onClick?: () => void
  className?: string
  variant?: "primary" | "danger"
}

const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  className,
  variant = "primary",
}) => {
  const baseStyles =
    "cursor-pointer rounded-md  text-sm font-bold transition-all"
  const variants = {
    primary: "bg-[#0055cc] text-white",
    danger: "bg-red-500 text-white hover:bg-red-600",
  }

  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  )
}

export default Button
