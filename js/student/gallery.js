(async function () {
  const { fetchData, esc } = window.AppData;
  const [users, items, notifs] = await Promise.all([fetchData("users"), fetchData("gallery"), fetchData("notifications")]);

  document.querySelectorAll("[data-user-avatar]").forEach((el) => { el.src = users[0].avatarUrl; });
  document.querySelectorAll("[data-user-name]").forEach((el) => { el.textContent = users[0].firstName; });
  document.querySelectorAll("[data-notification-dot]").forEach((el) => el.classList.toggle("hidden", !notifs.some((n) => !n.read)));

  const sizeMap = { "h-56": "gallery-img--sm", "h-64": "gallery-img--md", "h-72": "gallery-img--lg" };
  document.getElementById("gallery-grid").innerHTML = items.map((item) => `
    <div class="gallery-card">
      <img src="${esc(item.imageUrl)}" class="gallery-img ${sizeMap[item.heightClass] || "gallery-img--sm"}" alt="${esc(item.imageAlt)}">
      <div class="card-padded">
        <div class="flex items-center justify-between"><span class="badge badge-accent">${esc(item.category)}</span><span class="eyebrow-mono">${esc(item.dateLabel)}</span></div>
        <p class="section-title mt-3">${esc(item.title)}</p>
        <p class="text-sm text-muted mt-1">${esc(item.meta)}</p>
      </div>
    </div>`).join("");
})();
