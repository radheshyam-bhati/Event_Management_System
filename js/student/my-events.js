(async function () {
  const { fetchData, esc } = window.AppData;
  const [regs, waitlist, events] = await Promise.all([fetchData("registrations"), fetchData("waitlist"), fetchData("events")]);

  document.getElementById("tab-upcoming-count").textContent = regs.summary.upcomingTab;
  document.getElementById("tab-waitlisted-count").textContent = regs.summary.waitlistedTab;
  document.getElementById("tab-past-count").textContent = regs.summary.pastTab;

  const regHtml = regs.items.map((r) => `
    <article class="reg-card">
      <img src="${esc(r.imageUrl)}" alt="${esc(r.imageAlt)}" class="reg-thumb">
      <div class="flex-1"><span class="badge badge-muted badge-mono">${esc(r.badge)}</span><h2 class="section-title mt-3">${esc(r.title)}</h2><p class="text-sm text-muted mt-1">${esc(r.meta)}</p><p class="font-mono text-xs mt-3">${esc(r.countdown)}</p></div>
      <div class="flex flex-col justify-end"><a href="event-details.html?id=${esc(r.eventId)}" class="btn btn-primary">View Ticket</a></div>
    </article>`).join("");

  const wlHtml = waitlist.map((w) => {
    const evt = events.find((e) => e.id === w.eventId) || {};
    return `
      <article class="reg-card">
        <div class="reg-waitlist-thumb"><iconify-icon icon="lucide:layers"></iconify-icon></div>
        <div class="flex-1"><span class="badge badge-accent badge-mono">WAITLISTED · #${String(w.position).padStart(2, "0")}</span><h2 class="section-title mt-3">${esc(evt.title)}</h2><p class="text-sm text-muted mt-1">${esc(w.joinedLabel)}</p><p class="font-heading mt-3">You’re on the waitlist.</p></div>
        <button type="button" class="btn btn-outline-danger">Leave Waitlist</button>
      </article>`;
  }).join("");

  document.getElementById("registrations-list").innerHTML = regHtml + wlHtml;
})();
