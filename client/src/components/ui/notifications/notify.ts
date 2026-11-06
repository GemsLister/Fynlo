import Swal, { type SweetAlertResult } from "sweetalert2";

export interface NotificationProps {
  title: string;
  text: string;
  icon: "success" | "error" | "warning" | "info" | "question";
  confirm: boolean;
  cancel: boolean;
  confirmButtonText?: string;
  cancelButtonText?: string;
  onConfirm?: () => void;
  onCancel?: () => void;
}

export const notify = ({
  title,
  text,
  icon,
  confirm,
  cancel,
  confirmButtonText,
  cancelButtonText,
  // timer,
  onConfirm,
  onCancel,
}: NotificationProps): Promise<SweetAlertResult> => {
  return Swal.fire({
    icon: icon,
    title: title,
    text: text,
    //timer: timer !== undefined ? timer : cancel ? undefined : 2000,
    background: "#252d3d",
    color: "var(--color-text-primary)",
    iconColor: "var(--color-accent)",
    showConfirmButton: confirm,
    showCancelButton: cancel,
    confirmButtonText: confirmButtonText,
    cancelButtonText: cancelButtonText,
  }).then((result) => {
    if (result.isConfirmed && onConfirm) {
      onConfirm();
    } else if (result.isDismissed && onCancel) {
      onCancel();
    }
    return result;
  });
};
