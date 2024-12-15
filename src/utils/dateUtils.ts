export const formatDateList = (dates: string[]): string => {
  if (dates.length === 0) return '';
  if (dates.length <= 2) return dates.join(', ');
  return `${dates.length} days selected`;
};