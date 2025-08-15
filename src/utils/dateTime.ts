/**
 * Formats a date to "DD MMM YYYY" format (e.g., "21 Dec 2025")
 * @param date - Date object, timestamp, or date string to format
 * @returns Formatted date string in "DD MMM YYYY" format
 */
export const formatDate = (date: Date | number | string): string => {
  const dateObj = new Date(date);

  // Check if date is valid
  if (isNaN(dateObj.getTime())) {
    throw new Error('Invalid date provided');
  }

  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  const day = dateObj.getDate();
  const month = months[dateObj.getMonth()];
  const year = dateObj.getFullYear();

  return `${day} ${month} ${year}`;
};

/**
 * Formats a timestamp (in seconds) to "DD MMM YYYY" format
 * @param timestamp - Unix timestamp in seconds
 * @returns Formatted date string in "DD MMM YYYY" format
 */
export const formatTimestamp = (timestamp: number): string => {
  return formatDate(new Date(timestamp * 1000));
};

/**
 * Calculates the time left until a specified end time and formats it as a string.
 * Returns null if the end time has already passed.
 * @param endTime - The end time as a Date object
 * @returns Formatted string representing the time left, or null if the end time has passed
 */
export const getFormattedTimeLeft = (endTime: Date): string => {
  const launchTime = new Date(endTime).getTime();
  const currentTime = Date.now();
  const timeLeft = launchTime - currentTime;

  if (timeLeft <= 0) {
    return '0d 0h 0m';
  }

  const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
  const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));

  if (days > 0) {
    return `${days}d ${hours}h`;
  } else if (hours > 0) {
    return `${hours}h ${minutes}m`;
  } else {
    return `${minutes}m`;
  }
};
