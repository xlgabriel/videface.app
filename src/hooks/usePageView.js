import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";

/**
 * usePageView
 * Sends GA4 page_view events when the route changes in a SPA.
 * - Uses `window.gtag` if available (non-blocking).
 * - Designed to be called once at the top-level of your router (e.g. inside `App`).
 * - If react-router is not used, this hook can be replaced by a single call
 *   to `window.gtag` on initial mount.
 *
 * Measurement ID is embedded here for simplicity; move to env if needed.
 */
const MEASUREMENT_ID = "G-BJRRZS9MQV";

export default function usePageView() {
  const location = useLocation?.();
  const firstRunRef = useRef(true);

  useEffect(() => {
    // compute path and title
    const page_path = location?.pathname + (location?.search || "") || window.location.pathname + window.location.search;
    const page_title = document.title || "";

    // Use optional chaining in case gtag isn't loaded yet.
    try {
      // Avoid double-sending on strict-mode dev double-render by honoring firstRunRef
      // but still allow sending on actual location changes.
      if (firstRunRef.current) {
        // First effect run after mount
        window.gtag?.("config", MEASUREMENT_ID, { page_path, page_title });
        firstRunRef.current = false;
        return;
      }

      // Subsequent location changes
      window.gtag?.("config", MEASUREMENT_ID, { page_path, page_title });
    } catch (err) {
      // non-fatal: don't break the app if analytics fails
      // eslint-disable-next-line no-console
      console.warn("gtag error", err);
    }
    // We only want to run when location changes
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location?.pathname, location?.search]);
}
