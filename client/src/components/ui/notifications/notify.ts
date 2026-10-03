import Swal from "sweetalert2";

interface NotificationProps {
  title: string;
  text: string;
  icon: "success" | "error" | "warning" | "info" | "question";
  confirm: boolean;
  cancel: boolean;
}

export const notify = ({
  title,
  text,
  icon,
  confirm,
  cancel,
}: NotificationProps) => {
  Swal.fire({
    icon: icon,
    title: title,
    text: text,
    timer: 2000,
    background: "#252d3d",
    color: "var(--color-text-primary)",
    iconColor: "var(--color-accent)",
    showConfirmButton: confirm,
    showCancelButton: cancel,
  });
};
