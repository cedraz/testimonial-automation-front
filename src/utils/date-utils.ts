export function formatDate(date: string): string {
  const dateObj = new Date(date);

  return dateObj.toLocaleDateString().toString();
}

export function getDiference(date: string): {
  differenceInDays: number;
  differenceInHours: number;
} {
  const dateObj = new Date(date);
  const today = new Date();

  const difference = today.getTime() - dateObj.getTime();

  const differenceInDays = Math.floor(difference / (1000 * 60 * 60 * 24));
  const differenceInHours = Math.ceil(
    (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
  );

  return {
    differenceInDays,
    differenceInHours
  };
}
