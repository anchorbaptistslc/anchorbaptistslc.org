/**
 * CMS Components Index
 * This file imports and exports all CMS preview components
 */

// Import components
import { HomePreview } from './components/HomePreview.js';
import { MinistryPreview } from './components/MinistryPreview.js';
import { EventPreview } from './components/EventPreview.js';
import { EventsListPreview } from './components/EventsListPreview.js';

// Make components available globally
window.HomePreview = HomePreview;
window.MinistryPreview = MinistryPreview;
window.EventPreview = EventPreview;
window.EventsListPreview = EventsListPreview;

// Export all components
export {
  HomePreview,
  MinistryPreview,
  EventPreview,
  EventsListPreview
}; 