/**
 * Format a date for display in the CMS preview
 * @param {string} startDate - The start date in ISO format
 * @param {string} endDate - The end date in ISO format (optional)
 * @returns {string} Formatted date string
 */
export function formatDate(dateString, endDateString) {
  if (!dateString) return '';
  
  try {
    // If dateString is a Date object, get its ISO string
    if (typeof dateString === 'object' && dateString instanceof Date) {
      dateString = dateString.toISOString();
    }
    if (typeof endDateString === 'object' && endDateString instanceof Date) {
      endDateString = endDateString.toISOString();
    }
    
    // If we have both start and end dates, format as a range
    if (endDateString) {
      const startDate = new Date(dateString);
      const endDate = new Date(endDateString);
      
      // If dates are in different months or years, show full range
      const startMonth = startDate.getUTCMonth();
      const endMonth = endDate.getUTCMonth();
      const startYear = startDate.getUTCFullYear();
      const endYear = endDate.getUTCFullYear();
      
      // Format start date
      const formatOptions = { 
        month: 'long',
        day: 'numeric',
        timeZone: 'UTC'
      };
      
      if (startYear !== endYear) {
        // Different years: "January 1, 2025 - February 3, 2026"
        formatOptions.year = 'numeric';
        const startFormatted = new Intl.DateTimeFormat('en-US', formatOptions).format(startDate);
        const endFormatted = new Intl.DateTimeFormat('en-US', Object.assign({}, formatOptions)).format(endDate);
        return `${startFormatted} - ${endFormatted}`;
      } else if (startMonth !== endMonth) {
        // Same year, different months: "January 30 - February 3, 2025"
        const startFormatted = new Intl.DateTimeFormat('en-US', formatOptions).format(startDate);
        const endFormatted = new Intl.DateTimeFormat('en-US', Object.assign({}, formatOptions, {year: 'numeric'})).format(endDate);
        return `${startFormatted} - ${endFormatted}`;
      } else {
        // Same month and year: "January 1-5, 2025"
        const monthYear = new Intl.DateTimeFormat('en-US', {
          month: 'long',
          year: 'numeric',
          timeZone: 'UTC'
        }).format(startDate);
        
        const startDay = startDate.getUTCDate();
        const endDay = endDate.getUTCDate();
        
        return `${monthYear.split(' ')[0]} ${startDay}-${endDay}, ${monthYear.split(' ')[1]}`;
      }
    } else {
      // For single day events, show full date and time
      const utcDate = new Date(dateString);
      
      // Format using Intl.DateTimeFormat with UTC timezone to preserve the time as entered
      const formatter = new Intl.DateTimeFormat('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        timeZone: 'UTC',
        hour12: true
      });
      
      return formatter.format(utcDate);
    }
  } catch (e) {
    console.error('Error formatting date:', e);
    return String(dateString);
  }
};