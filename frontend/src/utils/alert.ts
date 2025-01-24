import Swal, { SweetAlertIcon } from "sweetalert2";

export const showMsgAlert = (icon: SweetAlertIcon, msg: string) => {
  Swal.fire({
    title: msg,
    icon: icon,
  });
};
