(async function () {
  const { fetchData, esc } = window.AppData;
  const [users, events, notifs] = await Promise.all([fetchData("users"), fetchData("events"), fetchData("notifications")]);

  document.querySelectorAll("[data-user-avatar]").forEach((el) => { el.src = users[0].avatarUrl; });
  document.querySelectorAll("[data-notification-dot]").forEach((el) => el.classList.toggle("hidden", !notifs.some((n) => !n.read)));

  const list = events.filter((e) => e.panel !== "admin" && e.recommended).slice(0, 3);
  document.getElementById("events-count-label").textContent = "18 EVENTS";
  document.getElementById("events-grid").innerHTML = list.map((evt) => {
    const badge = evt.isFull ? "badge badge-secondary" : evt.badgeLabel.startsWith("LIVE") ? "badge badge-accent" : "badge badge-muted";
    const right = evt.isFull ? `${evt.registeredCount} / ${evt.capacity}` : `${evt.spotsLeft} LEFT`;
    const btn = evt.isFull ? "btn btn-tertiary btn-full mt-5" : evt.badgeLabel.startsWith("LIVE") ? "btn btn-primary btn-full mt-5" : "btn btn-outline-tertiary btn-full mt-5";
    return `
      <article class="event-listing-card">
        <img src="${esc(evt.imageUrl)}" alt="${esc(evt.imageAlt)}" class="event-listing-img">
        <div class="event-listing-body">
          <div class="flex justify-between items-center"><span class="${badge} badge-mono">${esc(evt.badgeLabel)}</span><span class="badge-mono text-muted">${esc(right)}</span></div>
          <h3 class="section-title mt-4">${esc(evt.title)}</h3>
          <p class="text-sm text-muted mt-2">${esc(evt.dateLabel)} · ${esc(evt.venue)}</p>
          <a href="event-details.html?id=${esc(evt.id)}" class="${btn}">${evt.isFull ? "Join Waitlist" : "Register"}</a>
        </div>
      </article>`;
  }).join("");
})();
