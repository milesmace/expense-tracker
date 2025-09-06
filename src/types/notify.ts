import type { Action } from 'sonner';

export type ToastType = 'success' | 'error' | 'info' | 'warning' | 'normal';
export interface NotifyPayload {
  title: string;
  description?: string;
  type?: ToastType;
  duration?: number;
  redirectTo?: string;
  redirectDelay?: number;
  action?: Action;
  onAutoClose?: () => void;
  onDismiss?: () => void;
}
