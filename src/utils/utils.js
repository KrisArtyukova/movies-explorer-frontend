function getTimeFromMinutes(mins) {
  const hours = Math.trunc(mins / 60);
  const minutes = mins % 60;
  return `${hours}ч ${minutes}м`;
}

export default getTimeFromMinutes;
