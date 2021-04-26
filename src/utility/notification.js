import { toast } from "react-toastify";

function showSuccess(msg) {
  toast.success(msg);
}

function showError(msg) {
  toast.error(msg);
}

function showInfo(msg) {
  toast.info(msg);
}

function showWarning(msg) {
  toast.warn(msg);
}

const notification = {
  showSuccess,
  showWarning,
  showInfo,
  showError,
};
export default notification;
