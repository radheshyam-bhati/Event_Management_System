(async function () {
  const { fetchData, esc } = window.AppData;
  const [users, certs, notifs] = await Promise.all([fetchData("users"), fetchData("certificates"), fetchData("notifications")]);

  document.querySelectorAll("[data-user-avatar]").forEach((el) => { el.src = users[0].avatarUrl; });
  document.querySelectorAll("[data-user-name]").forEach((el) => { el.textContent = users[0].firstName; });
  document.querySelectorAll("[data-notification-dot]").forEach((el) => el.classList.toggle("hidden", !notifs.some((n) => !n.read)));

  document.getElementById("cert-earned-count").textContent = certs.summary.earned;
  document.getElementById("cert-attended-count").textContent = certs.summary.attended;
  document.getElementById("cert-records-badge").textContent = certs.summary.badge;

  document.getElementById("certificates-list").innerHTML = certs.items.map((c) => {
    const cls = c.primary ? "btn btn-primary" : "btn btn-outline-tertiary";
    return `
      <div class="cert-row">
        <div class="cert-thumb"><iconify-icon icon="lucide:file"></iconify-icon></div>
        <div class="flex-1"><p class="section-title">${esc(c.title)}</p><p class="text-sm text-muted mt-1">${esc(c.meta)}</p><p class="mt-2 font-mono text-xs text-tertiary">${esc(c.code)}</p></div>
        <button type="button" class="${cls}"><iconify-icon icon="lucide:download"></iconify-icon>Download Certificate</button>
      </div>`;
  }).join("");
})();
