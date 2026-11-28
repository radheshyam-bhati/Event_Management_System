(async function () {
  const { fetchData, esc } = window.AppData;
  const id = new URLSearchParams(location.search).get("id") || "evt-001";
  const [users, events] = await Promise.all([fetchData("users"), fetchData("events")]);
  const evt = events.find((e) => e.id === id) || events[0];

  document.querySelectorAll("[data-user-avatar]").forEach((el) => { el.src = users[0].avatarUrl; });
  document.getElementById("event-detail-main").innerHTML = `
    <div class="event-detail-grid">
      <article class="event-detail-main">
        <img src="${esc(evt.imageUrl)}" alt="${esc(evt.imageAlt)}" class="event-detail-hero-img">
        <div class="mt-7">
          <span class="badge badge-accent badge-mono">${esc(evt.badgeLabel)}</span>
          <h1 class="page-title mt-4">${esc(evt.title)}</h1>
          <p class="page-subtitle mt-4">${esc(evt.description || "")}</p>
          <div class="event-meta-cards">
            <div class="card card-padded"><iconify-icon icon="lucide:calendar" class="text-tertiary"></iconify-icon><p class="font-mono text-xs mt-2">${esc((evt.dateLabel || "").toUpperCase())}</p><p class="text-muted mt-1">${esc(evt.timeLabel || "")}</p></div>
            <div class="card card-padded"><iconify-icon icon="lucide:map-pin" class="text-tertiary"></iconify-icon><p class="font-semibold mt-2">${esc(evt.venue)}</p><p class="text-muted mt-1">${esc(evt.building || "")}</p></div>
          </div>
          <div class="flex flex-col gap-3 mt-8">
            <section class="card card-padded"><div class="flex justify-between"><h2 class="section-title">What to Expect</h2><iconify-icon icon="lucide:chevron-up"></iconify-icon></div><p class="text-sm text-muted mt-3">${esc(evt.expectation || "")}</p></section>
            <section class="card card-padded flex justify-between"><h2 class="section-title">Who Can Attend</h2><iconify-icon icon="lucide:chevron-down"></iconify-icon></section>
            <section class="card card-padded flex justify-between"><h2 class="section-title">Venue &amp; Location</h2><iconify-icon icon="lucide:chevron-down"></iconify-icon></section>
            <section class="card card-padded flex justify-between"><h2 class="section-title">Organizer</h2><iconify-icon icon="lucide:chevron-down"></iconify-icon></section>
          </div>
        </div>
      </article>
      <aside class="event-detail-aside">
        <section class="card card-padded card-shadow">
          <div class="flex justify-between"><span class="badge badge-muted badge-mono">REGISTERED</span><button type="button"><iconify-icon icon="lucide:share-2"></iconify-icon></button></div>
          <h2 class="section-title mt-5">Your place is reserved</h2>
          <p class="text-sm text-muted mt-2">Free entry · Student ID required</p>
          <div class="mt-6">
            <div class="flex justify-between font-mono text-xs"><span>${evt.registeredCount} / ${evt.capacity} REGISTERED</span><span class="text-tertiary">80%</span></div>
            <div class="progress-track"><div class="progress-fill"></div></div>
          </div>
          <div class="card-muted card-padded mt-5"><p class="font-mono text-sm">${esc(evt.countdownLabel || "02d : 14h : 32m")}</p><p class="eyebrow-mono mt-1">Until doors open</p></div>
          <a href="my-events.html" class="btn btn-primary btn-full mt-6">View My Ticket</a>
          <button type="button" class="btn btn-outline-danger btn-full mt-3">Cancel Registration</button>
        </section>
        <section class="card-accent card-padded mt-5"><p class="section-title">Waitlist state</p><p class="text-sm mt-2">When full, students see “You are #8 on the waitlist” with a single leave action.</p></section>
      </aside>
    </div>`;
})();
