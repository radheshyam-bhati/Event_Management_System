(async function () {
  const { fetchData, esc } = window.AppData;
  const att = await fetchData("attendance");

  document.getElementById("att-attended").textContent = att.summary.attended;
  document.getElementById("att-noshows").textContent = att.summary.noShows;
  document.getElementById("att-rate").textContent = att.summary.rate;

  document.getElementById("attendance-rows").innerHTML = att.rows.map((r, i) => {
    const color = r.status === "ATTENDED" ? "text-tertiary" : r.status === "NO-SHOW" ? "text-destructive" : "text-muted-foreground";
    const border = i < att.rows.length - 1 ? "border-b border-border" : "";
    return `<div class="grid grid-cols-4 p-5 ${border} text-sm"><b>${esc(r.event)}</b><span class="font-mono text-xs">${esc(r.date)}</span><span>${esc(r.category)}</span><span class="${color} font-mono text-xs">${esc(r.status)}</span></div>`;
  }).join("");
})();
