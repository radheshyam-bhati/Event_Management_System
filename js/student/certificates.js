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
    const cls = c.primary ? "min-h-11 rounded-lg bg-primary px-4 text-sm font-semibold text-primary-foreground" : "min-h-11 rounded-lg border border-tertiary px-4 text-sm font-semibold text-tertiary";
    return `
      <div class="flex flex-col gap-4 p-5 sm:flex-row sm:items-center">
        <div class="flex h-16 w-12 shrink-0 items-center justify-center rounded-lg border border-primary bg-accent text-tertiary"><iconify-icon icon="lucide:file" class="text-2xl"></iconify-icon></div>
        <div class="min-w-0 flex-1"><p class="font-heading text-xl">${esc(c.title)}</p><p class="mt-1 text-sm text-muted-foreground">${esc(c.meta)}</p><p class="mt-2 font-mono text-[11px] tracking-wide text-tertiary">${esc(c.code)}</p></div>
        <button class="${cls}"><iconify-icon icon="lucide:download" class="mr-2 text-lg"></iconify-icon>Download Certificate</button>
      </div>`;
  }).join("");
})();
