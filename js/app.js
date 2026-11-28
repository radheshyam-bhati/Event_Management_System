// Shared data fetcher and HTML escape helper (switch USE_MOCK in js/config.js for backend)
(function (global) {
  "use strict";

  async function fetchData(key) {
    const cfg = global.EMS_CONFIG;
    const url = cfg.USE_MOCK
      ? `${cfg.MOCK_BASE_PATH}/${cfg.MOCK_FILES[key]}`
      : `${cfg.API_BASE_URL}${cfg.ENDPOINTS[key]}`;
    const res = await fetch(url, { cache: "no-store" });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return res.json();
  }

  function esc(val) {
    return String(val ?? "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;");
  }

  global.AppData = { fetchData, esc };
})(window);
