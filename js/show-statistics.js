// Calculate and display show statistics
function calculateShowStatistics() {
  const statsElement = document.getElementById("shows-stats");
  if (!statsElement) return;

  const tables = document.querySelectorAll(".past-shows-table");
  let yksityistilaisuusCount = 0;
  let avoinCount = 0;

  tables.forEach((table) => {
    const rows = table.querySelectorAll("tbody tr");
    rows.forEach((row) => {
      const td = row.querySelector("td");
      if (td) {
        const text = td.textContent || td.innerText;
        if (text.includes("Yksityistilaisuus")) {
          yksityistilaisuusCount++;
        } else {
          avoinCount++;
        }
      }
    });
  });

  statsElement.textContent = `Kureliivit ja jaloimmat reidet on esiintynyt ${avoinCount} kertaa avoimissa esityksissä ja ${yksityistilaisuusCount} kertaa yksityistilaisuuksissa.`;
}

// Calculate show statistics when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  calculateShowStatistics();
});
