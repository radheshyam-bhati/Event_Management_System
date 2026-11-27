(async function () {
  const { fetchData, esc } = window.AppData;
  const [users, items, notifs] = await Promise.all([fetchData("users"), fetchData("gallery"), fetchData("notifications")]);

  document.querySelectorAll("[data-user-avatar]").forEach((el) => { el.src = users[0].avatarUrl; });
  document.querySelectorAll("[data-user-name]").forEach((el) => { el.textContent = users[0].firstName; });
  document.querySelectorAll("[data-notification-dot]").forEach((el) => el.classList.toggle("hidden", !notifs.some((n) => !n.read)));

  document.getElementById("gallery-grid").innerHTML = items.map((item) => `
    <div class="overflow-hidden rounded-xl border border-border bg-card shadow-md">
      <img src="${esc(item.imageUrl)}" class="${esc(item.heightClass)} w-full object-cover" alt="${esc(item.imageAlt)}">
      <div class="p-4">
        <div class="flex items-center justify-between"><span class="rounded-lg bg-accent px-2 py-1 text-xs font-semibold text-accent-foreground">${esc(item.category)}</span><span class="font-mono text-[11px] text-muted-foreground">${esc(item.dateLabel)}</span></div>
        <p class="mt-3 font-heading text-xl">${esc(item.title)}</p>
        <p class="mt-1 text-sm text-muted-foreground">${esc(item.meta)}</p>
      </div>
    </div>`).join("");
})();
