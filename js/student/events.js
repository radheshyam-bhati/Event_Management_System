(async function () {
  const { fetchData, esc } = window.AppData;
  const [users, events, notifs] = await Promise.all([fetchData("users"), fetchData("events"), fetchData("notifications")]);

  document.querySelectorAll("[data-user-avatar]").forEach((el) => { el.src = users[0].avatarUrl; });
  document.querySelectorAll("[data-notification-dot]").forEach((el) => el.classList.toggle("hidden", !notifs.some((n) => !n.read)));

  const list = events.filter((e) => e.panel !== "admin" && e.recommended).slice(0, 3);
  document.getElementById("events-count-label").textContent = "18 EVENTS";
  document.getElementById("events-grid").innerHTML = list.map((evt) => {
    const badge = evt.isFull ? "bg-secondary text-secondary-foreground" : evt.badgeLabel.startsWith("LIVE") ? "bg-accent text-accent-foreground" : "bg-muted text-tertiary";
    const right = evt.isFull ? `${evt.registeredCount} / ${evt.capacity}` : `${evt.spotsLeft} LEFT`;
    const btn = evt.isFull ? "bg-tertiary text-tertiary-foreground" : evt.badgeLabel.startsWith("LIVE") ? "bg-primary text-primary-foreground" : "border border-tertiary text-tertiary";
    return `
      <article class="bg-card rounded-xl border border-border overflow-hidden">
        <img src="${esc(evt.imageUrl)}" alt="${esc(evt.imageAlt)}" class="w-full h-40 object-cover">
        <div class="p-5">
          <div class="flex justify-between"><span class="${badge} rounded-lg px-2 py-1 text-[10px] font-mono">${esc(evt.badgeLabel)}</span><span class="font-mono text-[10px] text-muted-foreground">${esc(right)}</span></div>
          <h3 class="font-heading text-xl mt-4">${esc(evt.title)}</h3>
          <p class="text-sm text-muted-foreground mt-2">${esc(evt.dateLabel)} · ${esc(evt.venue)}</p>
          <a href="event-details.html?id=${esc(evt.id)}" class="w-full min-h-11 mt-5 rounded-lg ${btn} font-semibold text-sm inline-flex items-center justify-center">${evt.isFull ? "Join Waitlist" : "Register"}</a>
        </div>
      </article>`;
  }).join("");
})();
