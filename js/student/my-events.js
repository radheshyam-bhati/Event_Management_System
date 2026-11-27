(async function () {
  const { fetchData, esc } = window.AppData;
  const [regs, waitlist, events] = await Promise.all([fetchData("registrations"), fetchData("waitlist"), fetchData("events")]);

  document.getElementById("tab-upcoming-count").textContent = regs.summary.upcomingTab;
  document.getElementById("tab-waitlisted-count").textContent = regs.summary.waitlistedTab;
  document.getElementById("tab-past-count").textContent = regs.summary.pastTab;

  const regHtml = regs.items.map((r) => `
    <article class="bg-card border border-border rounded-xl p-5 flex gap-5">
      <img src="${esc(r.imageUrl)}" alt="${esc(r.imageAlt)}" class="w-40 h-28 rounded-lg object-cover">
      <div class="flex-1"><span class="bg-muted text-tertiary text-[10px] font-mono rounded-lg px-2 py-1">${esc(r.badge)}</span><h2 class="font-heading text-2xl mt-3">${esc(r.title)}</h2><p class="text-sm text-muted-foreground mt-1">${esc(r.meta)}</p><p class="font-mono text-xs mt-3">${esc(r.countdown)}</p></div>
      <div class="flex flex-col justify-end"><a href="event-details.html?id=${esc(r.eventId)}" class="min-h-11 px-4 bg-primary rounded-lg text-primary-foreground text-sm font-semibold inline-flex items-center">View Ticket</a></div>
    </article>`).join("");

  const wlHtml = waitlist.map((w) => {
    const evt = events.find((e) => e.id === w.eventId) || {};
    return `
      <article class="bg-card border border-border rounded-xl p-5 flex gap-5">
        <div class="w-40 h-28 rounded-lg bg-secondary flex items-center justify-center"><iconify-icon icon="lucide:layers" class="text-3xl text-tertiary"></iconify-icon></div>
        <div class="flex-1"><span class="bg-accent text-accent-foreground text-[10px] font-mono rounded-lg px-2 py-1">WAITLISTED · #${String(w.position).padStart(2, "0")}</span><h2 class="font-heading text-2xl mt-3">${esc(evt.title)}</h2><p class="text-sm text-muted-foreground mt-1">${esc(w.joinedLabel)}</p><p class="font-heading italic text-lg mt-3">You’re on the waitlist.</p></div>
        <button class="self-end min-h-11 px-4 border border-destructive text-destructive rounded-lg text-sm">Leave Waitlist</button>
      </article>`;
  }).join("");

  document.getElementById("registrations-list").innerHTML = regHtml + wlHtml;
})();
