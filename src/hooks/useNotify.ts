import { useNavigate } from 'react-router-dom';

import { toast } from 'sonner';

import type { NotifyPayload, ToastType } from '@/types';

/**
 * Custom hook to show toast notifications and optionally redirect the user.
 *
 * This hook integrates the `sonner` toast library with `react-router-dom` navigation,
 * allowing you to trigger user feedback and redirect flows in a unified way.
 *
 * @returns A `notify` function that can be used to trigger toasts.
 */
export const useNotify = () => {
  const navigate = useNavigate();

  /**
   * Triggers a toast notification and optionally navigates to another route.
   *
   * @param payload - Configuration object for the toast and redirect behavior.
   * @param payload.title - The main content or headline of the toast.
   * @param payload.description - Optional additional detail for the toast.
   * @param payload.type - The type of toast (`"success"`, `"error"`, `"info"`, `"warning"`, or `"normal"`). Defaults to `"info"`.
   * @param payload.duration - Optional custom duration (in ms) before the toast disappears.
   * @param payload.redirectTo - Optional route path to navigate to after the toast is shown.
   * @param payload.redirectDelay - Optional delay (in ms) before navigation occurs. Defaults to `2000`.
   * @param payload.action - Optional action object to render a button inside the toast.
   * @param payload.onAutoClose - Optional callback function to execute when the toast is automatically closed.
   * @param payload.onDismiss - Optional callback function to execute when the toast is dismissed.
   */
  const notify = (payload: NotifyPayload) => {
    const {
      title,
      description,
      type = 'info' as ToastType,
      duration,
      redirectTo,
      redirectDelay = 2000,
      action,
      onAutoClose,
      onDismiss,
    } = payload;

    // Display toast using appropriate variant
    if (type === 'normal') {
      toast(title, {
        description,
        duration,
        action,
        onAutoClose,
        onDismiss,
      });
    } else {
      const { success, error, info, warning } = toast;
      let toastFn;

      if (type === 'success') toastFn = success;
      else if (type === 'error') toastFn = error;
      else if (type === 'info') toastFn = info;
      else if (type === 'warning') toastFn = warning;
      else toastFn = info; // Fallback to info if type is unknown

      toastFn(title, {
        description,
        duration,
        action,
        onAutoClose,
        onDismiss,
      });
    }

    // Handle optional redirection after a delay
    if (redirectTo) {
      setTimeout(() => {
        navigate(redirectTo);
      }, redirectDelay);
    }
  };

  return notify;
};
