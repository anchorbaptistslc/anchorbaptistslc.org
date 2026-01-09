/**
 * CMS Components Index
 * This file imports and exports all CMS preview components
 */

// Import components
import { HomePreview } from './components/HomePreview.jsx';
import { MinistryPreview } from './components/MinistryPreview.jsx';
import { EventPreview } from './components/EventPreview.jsx';
import { EventsListPreview } from './components/EventsListPreview.jsx';
import { MenuPreview } from './components/MenuPreview.jsx';
import { AcademyPreview } from './components/AcademyPreview.jsx';

// Make components available globally
window.HomePreview = HomePreview;
window.MinistryPreview = MinistryPreview;
window.EventPreview = EventPreview;
window.EventsListPreview = EventsListPreview;
window.MenuPreview = MenuPreview;
window.AcademyPreview = AcademyPreview;

// Export components for use in other parts of the application
export {
  HomePreview,
  MinistryPreview,
  EventPreview,
  EventsListPreview,
  MenuPreview,
  AcademyPreview,
}; 