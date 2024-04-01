import { cn } from "lib/utils"

type FormLabelProps = {
  children: string
  className?: string
  required?: boolean
}

const FormLabel = ({ children, className, required = true }: FormLabelProps) => {
  return (
    <div className={cn("text-sm", className)}>
      {children}
      {required && <span className="ml-1 text-lg font-light leading-4 text-rose-500">*</span>}
    </div>
  )
}

export default FormLabel
