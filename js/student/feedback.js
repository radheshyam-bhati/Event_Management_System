(async function () {
  const { fetchData } = window.AppData;
  const [users, events, notifs] = await Promise.all([fetchData("users"), fetchData("events"), fetchData("notifications")]);
  const evt = events.find((e) => e.id === "evt-001") || events[0];

  document.querySelectorAll("[data-user-avatar]").forEach((el) => { el.src = users[0].avatarUrl; });
  document.querySelectorAll("[data-user-name]").forEach((el) => { el.textContent = users[0].firstName; });
  document.querySelectorAll("[data-notification-dot]").forEach((el) => el.classList.toggle("hidden", !notifs.some((n) => !n.read)));
  document.getElementById("feedback-headline").textContent = `How was ${evt.title}?`;
  document.getElementById("feedback-event-title").textContent = evt.title;
  document.getElementById("feedback-event-meta").textContent = `${evt.shortDate} · ${evt.shortVenue}`;
})();
