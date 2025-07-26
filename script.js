document.getElementById("activityForm").addEventListener("submit", function(event) {
  event.preventDefault();

  const form = event.target;
  const summary = document.getElementById("summarySection");
  const errorMsg = document.getElementById("errorMsg");
  const downloadBtn = document.getElementById("downloadBtn");

  let totalMinutes = 0;
  let totalMoney = 0;
  let totalPoints = 0;

  const activities = {
    Study: { rate: 25, points: 10 },
    Scroll: { rate: -5, points: -2 },
    Sleep: { rate: 10, points: 5 },
    Create: { rate: 20, points: 8 },
    Socialize: { rate: 12, points: 6 }
  };

  for (let activity in activities) {
    const input = form[activity].value.trim();
    let [h, m] = input.split(":").map(Number);

    if (isNaN(h)) h = 0;
    if (isNaN(m)) m = 0;

    const mins = h * 60 + m;
    totalMinutes += mins;
    totalMoney += (mins / 60) * activities[activity].rate;
    totalPoints += (mins / 60) * activities[activity].points;
  }

  if (totalMinutes !== 180) {
    errorMsg.innerText = "⏰ Your total time must add up to 3 hours (180 minutes).";
    downloadBtn.style.display = "none";
    return;
  }

  errorMsg.innerText = "";
  document.getElementById("moneyResult").innerText = `$${totalMoney.toFixed(2)}`;
  document.getElementById("score").innerText = `${totalPoints.toFixed(0)} pts`;

  let insight = "";
  if (totalPoints > 25) insight = "🚀 Productive! You made time count!";
  else if (totalPoints > 5) insight = "🙂 Decent use of time.";
  else insight = "⚠️ Time wasted. Make better choices next time.";

  document.getElementById("insight").innerText = insight;

  downloadBtn.style.display = "inline-block";
});

document.getElementById("downloadBtn").addEventListener("click", function () {
  const element = document.getElementById("summarySection");
  html2pdf().from(element).save("Your_Time_Summary.pdf");
});
