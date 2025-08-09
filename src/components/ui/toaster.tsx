<<<<<<< HEAD

=======
>>>>>>> 0fd5d8bc551d026d03784ba71de0bb995a11daa8
import { useToast } from "@/hooks/use-toast"
import {
  Toast,
  ToastClose,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport,
} from "@/components/ui/toast"

export function Toaster() {
  const { toasts } = useToast()

  return (
    <ToastProvider>
      {toasts.map(function ({ id, title, description, action, ...props }) {
        return (
<<<<<<< HEAD
          <Toast key={id} {...props} className="fixed top-4 right-4 z-50">
=======
          <Toast key={id} {...props}>
>>>>>>> 0fd5d8bc551d026d03784ba71de0bb995a11daa8
            <div className="grid gap-1">
              {title && <ToastTitle>{title}</ToastTitle>}
              {description && (
                <ToastDescription>{description}</ToastDescription>
              )}
            </div>
            {action}
            <ToastClose />
          </Toast>
        )
      })}
      <ToastViewport />
    </ToastProvider>
  )
}
