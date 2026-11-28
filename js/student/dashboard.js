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
    <div class="next-event-grid">
      <div class="next-event-media">
        <img src="${esc(next.imageUrl)}" alt="${esc(next.imageAlt)}" width="1536" height="1024">
        <span class="next-event-cat">${esc(next.category)}</span>
      </div>
      <div class="next-event-info">
        <span class="badge badge-muted">${esc(next.statusLabel)}</span>
        <h3 class="section-title mt-3">${esc(next.title)}</h3>
        <div class="next-event-meta-grid">
          <span class="flex gap-2 items-center"><iconify-icon icon="lucide:calendar"></iconify-icon>${esc(next.dateLabel)}</span>
          <span class="flex gap-2 items-center"><iconify-icon icon="lucide:clock"></iconify-icon>${esc(next.timeLabel)}</span>
          <span class="flex gap-2 items-center"><iconify-icon icon="lucide:map-pin"></iconify-icon>${esc(next.venue)}</span>
          <span class="flex gap-2 items-center"><iconify-icon icon="lucide:users"></iconify-icon>${next.registeredCount} Registered</span>
        </div>
        <div class="countdown-box">
          <span class="font-mono text-sm">${esc(next.countdownLabel)}</span>
          <span class="countdown-label">until doors open</span>
        </div>
        <div class="next-event-actions">
          <a href="event-details.html?id=${esc(next.id)}" class="btn btn-primary">View Event →</a>
          <a href="my-events.html" class="btn btn-outline-transparent">View Ticket</a>
        </div>
      </div>
    </div>`;

  document.getElementById("recommended-grid").innerHTML = events.filter((e) => e.recommended).map((evt) => `
    <article class="rec-card">
      <div class="rec-card-media"><img src="${esc(evt.imageUrl)}" alt="${esc(evt.imageAlt)}" width="1536" height="1024"></div>
      <div class="rec-card-body">
        <span class="rec-card-cat">${esc(evt.category)}</span>
        <h3 class="section-title mt-2">${esc(evt.title)}</h3>
        <p class="rec-card-meta">${esc(evt.shortDate)} · ${esc(evt.shortVenue)} · ${evt.spotsLeft} SPOTS</p>
        <a href="event-details.html?id=${esc(evt.id)}" class="btn btn-outline-tertiary btn-full mt-4">Register</a>
      </div>
    </article>`).join("");

  document.querySelectorAll("[data-calendar-label]").forEach((el) => { el.textContent = "April 2025"; });
  const calDays = ["M","T","W","T","F","S","S","","1","2","3","4","5","6","7","8","9","10","11","12","13","14","15","16","17","18","19","20","21","22","23","24","25","26","27","28","29","30"]
    .map((d) => d === "12" ? `<span class="calendar-day--today">12</span>` : d === "25" ? `<span class="calendar-day--event">25</span>` : `<span>${d}</span>`).join("");
  document.querySelectorAll("[data-calendar-grid]").forEach((el) => { el.innerHTML = calDays; });

  const hasUnread = notifs.some((n) => !n.read);
  document.querySelectorAll("[data-notification-dot]").forEach((el) => el.classList.toggle("hidden", !hasUnread));
})();
