export const formatRemainingTime = (deadline: Date): string => {
  const now = new Date();
  const diff = deadline.getTime() - now.getTime();

  if (diff <= 0) return 'Due now';

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));

  if (days > 0) return `${days}d ${hours}h remaining`;
  if (hours > 0) return `${hours}h ${minutes}m remaining`;
  return `${minutes}m remaining`;
};

export const isDueSoon = (deadline: Date, hoursThreshold = 24): boolean => {
  const now = new Date();
  const diff = deadline.getTime() - now.getTime();
  return diff > 0 && diff < hoursThreshold * 60 * 60 * 1000;
};

export const isPastDue = (deadline: Date): boolean => {
  return new Date() > deadline;
};