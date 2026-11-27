(async function () {
  const { fetchData, esc } = window.AppData;
  const id = new URLSearchParams(location.search).get("id") || "evt-001";
  const [users, events] = await Promise.all([fetchData("users"), fetchData("events")]);
  const evt = events.find((e) => e.id === id) || events[0];

  document.querySelectorAll("[data-user-avatar]").forEach((el) => { el.src = users[0].avatarUrl; });
  document.getElementById("event-detail-main").innerHTML = `
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <article class="lg:col-span-2">
        <img src="${esc(evt.imageUrl)}" alt="${esc(evt.imageAlt)}" class="rounded-xl h-80 w-full object-cover">
        <div class="mt-7">
          <span class="bg-accent text-accent-foreground font-mono text-[10px] px-2 py-1 rounded-lg">${esc(evt.badgeLabel)}</span>
          <h1 class="font-heading text-4xl mt-4 text-balance">${esc(evt.title)}</h1>
          <p class="text-muted-foreground mt-4 text-pretty">${esc(evt.description || "")}</p>
          <div class="grid grid-cols-2 mt-7 gap-4 text-sm">
            <div class="bg-card border border-border rounded-lg p-4"><iconify-icon icon="lucide:calendar" class="text-tertiary"></iconify-icon><p class="font-mono text-xs mt-2">${esc((evt.dateLabel || "").toUpperCase())}</p><p class="text-muted-foreground mt-1">${esc(evt.timeLabel || "")}</p></div>
            <div class="bg-card border border-border rounded-lg p-4"><iconify-icon icon="lucide:map-pin" class="text-tertiary"></iconify-icon><p class="font-semibold mt-2">${esc(evt.venue)}</p><p class="text-muted-foreground mt-1">${esc(evt.building || "")}</p></div>
          </div>
          <div class="mt-8 space-y-3">
            <section class="bg-card border border-border rounded-xl p-5"><div class="flex justify-between"><h2 class="font-heading text-xl">What to Expect</h2><iconify-icon icon="lucide:chevron-up"></iconify-icon></div><p class="text-sm text-muted-foreground mt-3">${esc(evt.expectation || "")}</p></section>
            <section class="bg-card border border-border rounded-xl p-5 flex justify-between"><h2 class="font-heading text-xl">Who Can Attend</h2><iconify-icon icon="lucide:chevron-down"></iconify-icon></section>
            <section class="bg-card border border-border rounded-xl p-5 flex justify-between"><h2 class="font-heading text-xl">Venue &amp; Location</h2><iconify-icon icon="lucide:chevron-down"></iconify-icon></section>
            <section class="bg-card border border-border rounded-xl p-5 flex justify-between"><h2 class="font-heading text-xl">Organizer</h2><iconify-icon icon="lucide:chevron-down"></iconify-icon></section>
          </div>
        </div>
      </article>
      <aside class="lg:col-span-1">
        <section class="bg-card border border-border rounded-xl p-6 shadow-md">
          <div class="flex justify-between"><span class="bg-muted text-tertiary font-mono text-[10px] px-2 py-1 rounded-lg">REGISTERED</span><button><iconify-icon icon="lucide:share-2"></iconify-icon></button></div>
          <h2 class="font-heading text-2xl mt-5">Your place is reserved</h2>
          <p class="text-sm text-muted-foreground mt-2">Free entry · Student ID required</p>
          <div class="mt-6"><div class="flex justify-between font-mono text-xs"><span>${evt.registeredCount} / ${evt.capacity} REGISTERED</span><span class="text-tertiary">80%</span></div><div class="h-2 bg-muted rounded-lg mt-2 overflow-hidden"><div class="h-full w-4/5 bg-tertiary rounded-lg"></div></div></div>
          <div class="bg-background rounded-lg p-4 mt-5"><p class="font-mono text-sm">${esc(evt.countdownLabel || "02d : 14h : 32m")}</p><p class="text-[10px] text-muted-foreground uppercase tracking-wider mt-1">Until doors open</p></div>
          <a href="my-events.html" class="w-full min-h-11 mt-6 bg-primary text-primary-foreground rounded-lg font-semibold text-sm inline-flex items-center justify-center">View My Ticket</a>
          <button class="w-full min-h-11 mt-3 border border-destructive text-destructive rounded-lg font-semibold text-sm">Cancel Registration</button>
        </section>
        <section class="bg-accent rounded-xl p-5 mt-5"><p class="font-heading italic text-lg">Waitlist state</p><p class="text-sm mt-2">When full, students see “You are #8 on the waitlist” with a single leave action.</p></section>
      </aside>
    </div>`;
})();
