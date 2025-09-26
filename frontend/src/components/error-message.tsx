import { AlertCircle } from "lucide-react"

interface ErrorMessageProps {
  message: string
}

export function ErrorMessage({ message }: ErrorMessageProps) {
  if (!message) return null

  return (
    <div className="flex items-center gap-2 p-3 rounded-lg bg-red-50 text-red-600 border border-red-200">
      <AlertCircle size={18} />
      <span className="text-sm font-medium">{message}</span>
    </div>
  )
}
