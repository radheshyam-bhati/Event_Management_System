(async function () {
  const { fetchData, esc } = window.AppData;
  const att = await fetchData("attendance");

  document.getElementById("att-attended").textContent = att.summary.attended;
  document.getElementById("att-noshows").textContent = att.summary.noShows;
  document.getElementById("att-rate").textContent = att.summary.rate;

  document.getElementById("attendance-rows").innerHTML = att.rows.map((r) => {
    const color = r.status === "ATTENDED" ? "text-tertiary" : r.status === "NO-SHOW" ? "text-destructive" : "text-muted";
    return `<div class="att-table-row"><b>${esc(r.event)}</b><span class="font-mono text-xs">${esc(r.date)}</span><span>${esc(r.category)}</span><span class="${color} font-mono text-xs">${esc(r.status)}</span></div>`;
  }).join("");
})();
