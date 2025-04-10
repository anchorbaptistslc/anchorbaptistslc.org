/**
 * Format a date for display in the CMS preview
 * @param {string} startDate - The start date in ISO format
 * @param {string} endDate - The end date in ISO format (optional)
 * @returns {string} Formatted date string
 */
export function formatDate(startDate, endDate) {
  if (!startDate) return '';
  
  const start = new Date(startDate);
  
  // If no end date, just format the start date
  if (!endDate) {
    return `${start.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })} at ${start.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })}`;
  }
  
  const end = new Date(endDate);
  
  // Check if dates are in different years
  if (start.getFullYear() !== end.getFullYear()) {
    return `${start.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })} - ${end.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}`;
  }
  
  // Check if dates are in different months
  if (start.getMonth() !== end.getMonth()) {
    return `${start.toLocaleDateString('en-US', { month: 'long', day: 'numeric' })} - ${end.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}`;
  }
  
  // Same month and year
  return `${start.toLocaleDateString('en-US', { month: 'long' })} ${start.getDate()}-${end.getDate()}, ${start.getFullYear()}`;
} 