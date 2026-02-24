function getWeekType(dateStr){
  const anchor = new Date("2026-01-05");
  const current = new Date(dateStr);
  const diffWeeks = Math.floor((current - anchor) / (1000*60*60*24*7));
  return (diffWeeks % 2 === 0) ? 1 : 2;
}

function isWorkingDay(batch, dateStr){
  const day = new Date(dateStr).getDay(); // 0 Sunday .. 6 Saturday
  const week = getWeekType(dateStr);
  if(week === 1){
    if(batch === 1) return day >= 1 && day <= 3; // Mon-Wed
    if(batch === 2) return day >= 4 && day <= 5; // Thu-Fri
  } else {
    if(batch === 1) return day >= 4 && day <= 5; // Thu-Fri
    if(batch === 2) return day >= 1 && day <= 3; // Mon-Wed
  }
  return false;
}

module.exports = { getWeekType, isWorkingDay };
