import { useState } from 'react';

/**
 * Custom hook to manage modal state.
 *
 * @template T - The type of modal states. Defaults to `"closed"`.
 * @param {T | "closed"} [initialState="closed"] - The initial state of the modal.
 * @returns {{
 *   modal: T | "closed",
 *   open: (newState: T) => void,
 *   close: () => void
 * }} - An object containing the modal state and functions to open and close the modal.
 */
const useToggle = <T = 'closed'>(initialState: T | 'closed' = 'closed') => {
  const [modal, setModal] = useState<T | 'closed'>(() => initialState);

  /**
   * Opens the modal with a specific state.
   *
   * @param {T} newState - The state to set the modal to (e.g., "open", "loading").
   */
  const open = (newState: T) => setModal(newState);

  /**
   * Closes the modal, setting its state to "closed".
   */
  const close = () => setModal('closed');

  return {
    modal,
    open,
    close,
  };
};

export default useToggle;
