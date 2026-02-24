function getWeekOfMonth(date) {
  const day = date.getDate();
  return Math.ceil(day / 7);
}

function isWorkingDay(batch, date) {
  const day = date.getDay(); // 0 = Sunday

  if (batch === "batch1") {
    return day >= 1 && day <= 3; // Mon–Wed
  }

  if (batch === "batch2") {
    return day >= 4 && day <= 6; // Thu–Sat
  }

  return false;
}

module.exports = { getWeekOfMonth, isWorkingDay };