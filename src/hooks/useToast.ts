import { useEffect, useState } from 'react';
import { nanoid } from 'nanoid';

/**
 * @description
 * This hook is for managing toast messages.
 * id would be unique identifier, it will be "key" of the component list
 * <ToastContainer> will use id whether the message is new or not
 * it leads reference of judging whether render or not
 */
type ToastMessage = {
  id: string;
  content: string;
};

let listeners: Array<() => void> = [];
let toastMessages: ToastMessage[] = []; //this toastMessages will globally available
const MAX_TOAST_QUEUE_COUNT = 3; //ToastContainer will slice toastMessages under this number

export const addToast = (content: string) => {
  const newMessage = {
    id: nanoid(),
    content
  };

  // Keep only MAX_TOAST_QUEUE_COUNT messages, it will be sliced by <ToastContainer>
  toastMessages = [newMessage, ...toastMessages].slice(
    0,
    MAX_TOAST_QUEUE_COUNT
  );
  listeners.forEach((listener) => listener());
};

/**
 * @description
 * Here's reason for removeToast:
 * Some time, toast hidden important UI element
 * So, we need to remove toast when user click the toast
 */
export const removeToast = (id: string) => {
  toastMessages = toastMessages.filter((message) => message.id !== id);
  listeners.forEach((listener) => listener());
};

export function useToast() {
  const [_, forceUpdate] = useState({});

  useEffect(() => {
    const currentListener = () => forceUpdate({});
    listeners.push(currentListener);
    return () => {
      listeners = listeners.filter((listener) => listener !== currentListener);
    };
  }, []);

  return {
    toastMessages,
    addToast,
    removeToast
  };
}
