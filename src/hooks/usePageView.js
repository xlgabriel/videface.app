import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";

/**
 * usePageView
 * Tracks virtual page views for both GA4 (via gtag) and GTM (via dataLayer)
 * on every SPA route change.
 *
 * Called once at the top-level router (App.jsx). Covers ALL routes automatically,
 * so individual pages don't need their own tracking code.
 *
 * - gtag("config", ...) → GA4 picks up the page view.
 * - dataLayer.push({ event: "virtual_page_view", ... }) → GTM can trigger tags
 *   (e.g. Google Ads remarketing, custom events) on any route.
 */
const MEASUREMENT_ID = "G-BJRRZS9MQV";

// Module-level guard: prevents duplicate pushes from React 18 StrictMode
// double-mount on first render. Resets only on full page reload.
let initialPushDone = false;

export default function usePageView() {
  const location = useLocation?.();
  const prevPathRef = useRef(null);

  useEffect(() => {
    const page_path =
      (location?.pathname || "") + (location?.search || "") ||
      window.location.pathname + window.location.search;
    const page_title = document.title || "";

    // Deduplicate: skip if path hasn't actually changed (StrictMode double-fire)
    if (!initialPushDone) {
      initialPushDone = true;
    } else if (prevPathRef.current === page_path) {
      return;
    }
    prevPathRef.current = page_path;

    // GA4 via gtag
    try {
      window.gtag?.("config", MEASUREMENT_ID, { page_path, page_title });
    } catch {
      /* non-fatal */
    }

    // GTM via dataLayer — lets GTM trigger tags on every virtual page view
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      event: "virtual_page_view",
      page_path,
      page_title,
    });
  }, [location?.pathname, location?.search]);
}
