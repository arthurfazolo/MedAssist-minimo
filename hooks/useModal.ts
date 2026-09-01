import { useState, useCallback, useRef } from 'react';

export interface UseModalReturn {
  isOpen: boolean;
  open: () => void;
  close: () => void;
  toggle: () => void;
}

export function useModal(initialState = false): UseModalReturn {
  const [isOpen, setIsOpen] = useState(initialState);
  const open = useCallback(() => setIsOpen(true), []);
  const close = useCallback(() => setIsOpen(false), []);
  const toggle = useCallback(() => setIsOpen(prev => !prev), []);

  return { isOpen, open, close, toggle };
}

export interface UseConfirmModalReturn {
  isOpen: boolean;
  message: string;
  title: string;
  variant: 'danger' | 'warning' | 'default';
  requestConfirm: (options: {
    title: string;
    message: string;
    variant?: 'danger' | 'warning' | 'default';
  }) => Promise<boolean>;
  handleConfirm: () => void;
  handleCancel: () => void;
}

export function useConfirmModal(): UseConfirmModalReturn {
  const [isOpen, setIsOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [message, setMessage] = useState('');
  const [variant, setVariant] = useState<'danger' | 'warning' | 'default'>('default');
  
  // Keep track of the resolve function for the Promise
  const resolveRef = useRef<((value: boolean) => void) | null>(null);

  const requestConfirm = useCallback((options: {
    title: string;
    message: string;
    variant?: 'danger' | 'warning' | 'default';
  }): Promise<boolean> => {
    setTitle(options.title);
    setMessage(options.message);
    setVariant(options.variant || 'default');
    setIsOpen(true);

    return new Promise<boolean>((resolve) => {
      resolveRef.current = resolve;
    });
  }, []);

  const handleConfirm = useCallback(() => {
    setIsOpen(false);
    if (resolveRef.current) {
      resolveRef.current(true);
      resolveRef.current = null;
    }
  }, []);

  const handleCancel = useCallback(() => {
    setIsOpen(false);
    if (resolveRef.current) {
      resolveRef.current(false);
      resolveRef.current = null;
    }
  }, []);

  return {
    isOpen,
    title,
    message,
    variant,
    requestConfirm,
    handleConfirm,
    handleCancel,
  };
}

export interface UseAlertModalReturn {
  isOpen: boolean;
  title: string;
  message: string;
  type: 'success' | 'error' | 'warning' | 'info';
  showAlert: (options: {
    title: string;
    message: string;
    type?: 'success' | 'error' | 'warning' | 'info';
  }) => void;
  handleClose: () => void;
}

export function useAlertModal(): UseAlertModalReturn {
  const [isOpen, setIsOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [message, setMessage] = useState('');
  const [type, setType] = useState<'success' | 'error' | 'warning' | 'info'>('info');

  const showAlert = useCallback((options: {
    title: string;
    message: string;
    type?: 'success' | 'error' | 'warning' | 'info';
  }) => {
    setTitle(options.title);
    setMessage(options.message);
    setType(options.type || 'info');
    setIsOpen(true);
  }, []);

  const handleClose = useCallback(() => {
    setIsOpen(false);
  }, []);

  return {
    isOpen,
    title,
    message,
    type,
    showAlert,
    handleClose,
  };
}
