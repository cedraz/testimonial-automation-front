export function timeLeftTo(dateString: string) {
  const date = new Date(dateString);

  const milliseconds = date.getTime() - new Date().getTime();

  const days = milliseconds / (1000 * 60 * 60 * 24);

  console.log();

  return days.toFixed(0).toString();
}
