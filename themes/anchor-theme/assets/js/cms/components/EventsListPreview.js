import { formatDate } from '../utils/dateFormatters.js';

/**
 * EventsListPreview component for the CMS
 * Displays a preview of the events list page
 */
export const EventsListPreview = createClass({
  getInitialState() {
    return { events: [] };
  },
  
  componentDidMount() {
    try {
      // Fetch events from the Events collection
      this.props.getCollection('events-items').then(events => {
        console.log('Events from getCollection:', events);
        
        const now = new Date();
        
        // Process events - filter out _index.md and expired events
        const processedEvents = events
          .filter(event => {
            // Skip the _index.md file
            const slug = event.get('slug');
            if (slug === '' || slug === '_index') return false;
            
            // Get the data from the event
            const eventData = event.get('data');
            if (!eventData) return false;
            
            // Check expiry date
            const expiryDate = eventData.expiryDate ? new Date(eventData.expiryDate) : null;
            return expiryDate && expiryDate >= now;
          })
          .map(event => {
            const data = event.get('data');
            return {
              ...data,
              // Ensure dates are properly formatted
              dates: {
                start: data.dates?.start || null,
                end: data.dates?.end || null
              }
            };
          });
        
        // Sort events by start date (ascending)
        processedEvents.sort((a, b) => {
          const aDate = a.dates && a.dates.start ? new Date(a.dates.start) : new Date(0);
          const bDate = b.dates && b.dates.start ? new Date(b.dates.start) : new Date(0);
          return aDate - bDate; // Ascending order
        });
        
        console.log('Processed events:', processedEvents);
        this.setState({ events: processedEvents });
      }).catch(error => {
        console.error('Error fetching events:', error);
      });
    } catch (error) {
      console.error('Error in componentDidMount:', error);
    }
  },
  
  render: function() {
    const entry = this.props.entry;
    const data = entry.getIn(['data']) ? entry.getIn(['data']).toJS() : {};
    const events = this.state.events;
    
    return h('div', { className: 'events-page bg-white' },
      // Hero Section
      data.featured_image ? 
        h('div', { className: 'relative h-48 md:h-64 overflow-hidden' },
          h('img', {
            src: this.props.getAsset(data.featured_image).toString(),
            alt: data.title || '',
            className: 'absolute inset-0 w-full h-full object-cover'
          }),
          h('div', { className: 'absolute inset-0 bg-gray-900 bg-opacity-60' }),
          h('div', { className: 'absolute inset-0 flex items-center' },
            h('div', { className: 'container mx-auto px-4' },
              h('h1', { className: 'text-3xl md:text-4xl lg:text-5xl text-white mb-2 hero-heading' }, data.title || 'Events'),
              data.tagline && h('p', { className: 'text-lg md:text-xl text-white opacity-90 hero-tagline' }, data.tagline)
            )
          )
        ) :
        // Text-only header if no image
        h('div', { className: 'bg-white border-b' },
          h('div', { className: 'container mx-auto px-4 py-8' },
            h('h1', { className: 'text-3xl md:text-4xl text-gray-900 hero-heading' }, data.title || 'Events'),
            data.tagline && h('p', { className: 'text-lg md:text-xl text-gray-600 hero-tagline' }, data.tagline)
          )
        ),
      
      // Events List
      h('div', { className: 'container mx-auto px-4 py-12' },
        events.length > 0 ? 
          h('div', {},
            events.map((event, index) => 
              h('div', { key: index, className: 'grid grid-cols-1 md:grid-cols-5 gap-8 mb-16' },
                // Event Details
                h('div', { className: 'md:col-span-2 event-details' },
                  h('h2', { className: 'text-brand-dark mb-2' }, event.title || 'Event Title'),
                  h('div', { className: 'mb-4' },
                    h('span', { className: 'text-lg md:text-xl text-brand-dark hero-tagline' },
                      formatDate(event.dates?.start, event.dates?.end)
                    )
                  ),
                  h('div', { className: 'mb-4' },
                    h('p', { className: 'text-gray-700' }, event.description || '')
                  ),
                  event.content && h('div', { className: 'prose max-w-none' },
                    this.props.widgetFor('content')
                  )
                ),
                
                // Event Images
                h('div', { className: 'md:col-span-3 event-images' },
                  event.content_images && event.content_images.length > 0 ?
                    event.content_images.map((img, imgIndex) =>
                      h('div', { key: imgIndex, className: 'mb-6' },
                        h('img', {
                          src: this.props.getAsset(img.image).toString(),
                          alt: img.alt_text || event.title,
                          className: 'w-full rounded-lg shadow-md'
                        }),
                        img.caption && h('p', { className: 'text-sm text-gray-600 mt-2 text-center' }, img.caption)
                      )
                    ) :
                    event.image && h('div', { className: 'mb-6' },
                      h('img', {
                        src: this.props.getAsset(event.image).toString(),
                        alt: event.title,
                        className: 'w-full rounded-lg shadow-md'
                      })
                    )
                )
              )
            )
          ) : 
          h('div', { className: 'text-center py-12' },
            h('p', { className: 'text-xl text-gray-700' }, 'No upcoming events at this time.')
          )
      )
    );
  }
});