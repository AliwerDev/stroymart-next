import { useEffect, useState } from 'react';

/**
 * Returns an object with a `portalElement` property (an HTMLElement) and a `mounted`
 * property (a boolean). The `portalElement` is set to the element with the given
 * `elementId` when the component mounts. The `mounted` property is set to true when
 * the component mounts.
 *
 * @param elementId The id of the element to use as the portal element.
 * @returns An object with `portalElement` and `mounted` properties.
 */
const useAppPortal = (elementId: string) => {
  const [portalElement, setPortalElement] = useState<HTMLElement | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const el = document.getElementById(elementId);
    setPortalElement(el);
  }, [elementId]);

  return { portalElement, mounted };
};

export default useAppPortal;
