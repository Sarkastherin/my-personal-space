import { Toast } from "flowbite-react";
import { FaCheck } from "react-icons/fa6";
import { IoMdClose } from "react-icons/io";
import { MdError } from "react-icons/md";
import { useState } from "react";
const colors = {
  blue: "text-blue-600 bg-blue-200",
  green: "text-green-600 bg-green-200",
  red: "text-red-600 bg-red-200",
};

export function ToastBase({
  show,
  message,
  icon: Icon,
  color,
}: {
  show: boolean;
  message: string;
  icon?: React.ComponentType<{ className?: string }>;
  color?: keyof typeof colors;
}) {
  const [showToast, setShowToast] = useState(show);
  const handleClose = () => {
    setShowToast(false);
  };
  return (
    <div className={`fixed bottom-4 right-4 ${showToast ? "block" : "hidden"}`}>
      <Toast className="max-w-md border border-gray-200">
        {Icon ? (
          <div className={"inline-flex items-center justify-center shrink-0 w-7 h-7 " + (color ? colors[color] : "text-blue-600 bg-blue-200") + " rounded"}>
            <Icon className="w-5 h-5" aria-hidden="true" />
          </div>
        ) : null}
        <div className="ms-3 me-10 text-sm font-normal">{message}</div>
        <button
          type="button"
          className="ms-auto flex items-center justify-center text-body hover:text-heading bg-transparent box-border border border-transparent hover:bg-neutral-secondary-medium focus:ring-4 focus:ring-neutral-tertiary font-medium leading-5 rounded text-sm h-8 w-8 focus:outline-none"
          data-dismiss-target="#toast-success"
          aria-label="Close"
          onClick={handleClose}
        >
          <span className="sr-only">Cerrar</span>
          <IoMdClose className="w-5 h-5" aria-hidden="true" />
        </button>
      </Toast>
    </div>
  );
}
export function ToastSuccess({
  show,
  message,
}: {
  show: boolean;
  message: string;
}) {
  return <ToastBase show={show} message={message} icon={FaCheck} color="green" />;
}
export function ToastError({
  show,
  message,
}: {
  show: boolean;
  message: string;
}) {
  return <ToastBase show={show} message={message} icon={MdError} color="red" />;
}
