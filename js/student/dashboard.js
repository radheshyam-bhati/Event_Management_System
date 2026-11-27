(async function () {
  const { fetchData, esc } = window.AppData;
  const [users, events, regs, att, certs, notifs] = await Promise.all([
    fetchData("users"),
    fetchData("events"),
    fetchData("registrations"),
    fetchData("attendance"),
    fetchData("certificates"),
    fetchData("notifications")
  ]);

  const user = users[0];
  document.querySelectorAll("[data-user-avatar]").forEach((el) => { el.src = user.avatarUrl; el.alt = `${user.firstName} profile portrait`; });
  document.querySelectorAll("[data-user-name]").forEach((el) => { el.textContent = user.firstName; });
  document.querySelectorAll("[data-user-role]").forEach((el) => { el.textContent = user.role; });
  document.getElementById("greeting-term").textContent = user.termLabel;
  document.getElementById("greeting-headline").textContent = `Good morning, ${user.firstName}! 👋`;

  const stats = {
    registeredCount: regs.summary.registeredTotal,
    registeredMeta: regs.summary.registeredMeta,
    upcomingCount: regs.summary.upcomingTotal,
    upcomingMeta: regs.summary.upcomingMeta,
    attendedCount: att.summary.attended,
    attendedMeta: att.summary.attendedMeta,
    certificatesCount: certs.summary.earnedShort,
    certificatesMeta: certs.summary.earnedMeta
  };
  document.querySelectorAll("[data-stat]").forEach((el) => { el.textContent = stats[el.dataset.stat]; });

  const next = events.find((e) => e.id === "evt-001");
  document.getElementById("next-event-body").innerHTML = `
    <div class="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6">
      <div class="md:col-span-1 lg:col-span-2 rounded-lg overflow-hidden aspect-[16/9] md:aspect-[4/5] lg:aspect-[16/10] relative">
        <img src="${esc(next.imageUrl)}" alt="${esc(next.imageAlt)}" class="w-full h-full object-cover" width="1536" height="1024">
        <span class="absolute top-3 left-3 bg-accent text-accent-foreground text-[10px] lg:text-[11px] font-bold uppercase tracking-wide px-2 py-1 rounded-lg">${esc(next.category)}</span>
      </div>
      <div class="md:col-span-2 lg:col-span-3">
        <span class="bg-muted text-tertiary text-[11px] font-semibold px-2 py-1 rounded-lg">${esc(next.statusLabel)}</span>
        <h3 class="font-heading text-2xl md:text-3xl lg:text-2xl mt-3">${esc(next.title)}</h3>
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-x-4 gap-y-2 text-[13px] text-muted-foreground mt-3 lg:mt-4">
          <span class="flex gap-2 items-center"><iconify-icon icon="lucide:calendar"></iconify-icon>${esc(next.dateLabel)}</span>
          <span class="flex gap-2 items-center"><iconify-icon icon="lucide:clock"></iconify-icon>${esc(next.timeLabel)}</span>
          <span class="flex gap-2 items-center"><iconify-icon icon="lucide:map-pin"></iconify-icon>${esc(next.venue)}</span>
          <span class="flex gap-2 items-center"><iconify-icon icon="lucide:users"></iconify-icon>${next.registeredCount} Registered</span>
        </div>
        <div class="bg-background rounded-lg px-3 py-3 lg:py-2 mt-4 flex md:inline-flex justify-between lg:justify-start gap-3 items-center lg:items-end">
          <span class="font-mono text-sm md:text-base lg:text-sm">${esc(next.countdownLabel)}</span>
          <span class="text-[9px] uppercase tracking-wider text-muted-foreground">until doors open</span>
        </div>
        <div class="grid grid-cols-2 md:flex gap-3 mt-4">
          <a href="event-details.html?id=${esc(next.id)}" class="bg-primary text-primary-foreground rounded-lg px-4 min-h-11 inline-flex items-center justify-center text-sm font-semibold">View Event →</a>
          <a href="my-events.html" class="border border-border rounded-lg px-4 min-h-11 inline-flex items-center justify-center text-sm font-semibold">View Ticket</a>
        </div>
      </div>
    </div>`;

  document.getElementById("recommended-grid").innerHTML = events.filter((e) => e.recommended).map((evt) => `
    <article class="min-w-[260px] md:min-w-0 bg-card border border-border rounded-xl overflow-hidden">
      <div class="h-36 md:h-auto md:aspect-[16/8] lg:aspect-[4/3] overflow-hidden"><img src="${esc(evt.imageUrl)}" alt="${esc(evt.imageAlt)}" class="w-full h-full object-cover hover:scale-105 transition" width="1536" height="1024"></div>
      <div class="p-4">
        <span class="text-[10px] uppercase font-bold tracking-wider text-tertiary">${esc(evt.category)}</span>
        <h3 class="font-heading text-xl lg:text-lg mt-1 lg:mt-2 text-balance">${esc(evt.title)}</h3>
        <p class="font-mono text-[10px] text-muted-foreground mt-2">${esc(evt.shortDate)} · ${esc(evt.shortVenue)} · ${evt.spotsLeft} SPOTS</p>
        <a href="event-details.html?id=${esc(evt.id)}" class="w-full border border-tertiary text-tertiary min-h-11 rounded-lg text-sm font-semibold mt-4 inline-flex items-center justify-center">Register</a>
      </div>
    </article>`).join("");

  document.querySelectorAll("[data-calendar-label]").forEach((el) => { el.textContent = "April 2025"; });
  const calDays = ["M","T","W","T","F","S","S","","1","2","3","4","5","6","7","8","9","10","11","12","13","14","15","16","17","18","19","20","21","22","23","24","25","26","27","28","29","30"]
    .map((d) => d === "12" ? `<span class="bg-accent rounded-full">12</span>` : d === "25" ? `<span class="bg-tertiary text-tertiary-foreground rounded-full">25</span>` : `<span>${d}</span>`).join("");
  document.querySelectorAll("[data-calendar-grid]").forEach((el) => { el.innerHTML = calDays; });

  const hasUnread = notifs.some((n) => !n.read);
  document.querySelectorAll("[data-notification-dot]").forEach((el) => el.classList.toggle("hidden", !hasUnread));
})();
