import { formatDate } from '../utils/dateFormatters.js';

/**
 * EventPreview component for the CMS
 * Displays a preview of an individual event
 */
export const EventPreview = createClass({
  render: function() {
    const entry = this.props.entry;
    const data = entry.getIn(['data']) ? entry.getIn(['data']).toJS() : {};
    
    // Get start and end dates from the correct structure
    const startDate = data.dates && data.dates.start ? data.dates.start : '';
    const endDate = data.dates && data.dates.end ? data.dates.end : '';
    
    // Get content images
    const contentImages = data.content_images || [];
    
    return h('div', { className: 'bg-white' },
      // Header
      h('div', { className: 'bg-blue-100 border-b-4 border-blue-300 p-4 text-center' },
        h('h1', { className: 'text-2xl font-bold text-blue-800 mb-2' }, 'Event Preview'),
        h('div', { className: 'text-blue-700 max-w-3xl mx-auto' },
          h('p', { className: 'mb-2' }, 'Below you will see two views of your event. Note: Events only show if expiryDate is in the future.'),
          h('ol', { 
            className: 'list-decimal list-inside text-left',
            style: { listStyleType: 'decimal', paddingLeft: '1.5rem' }
          },
            h('li', { className: 'mb-1' }, 'How your event will appear in the carousel on the homepage'),
            h('li', { className: 'mb-1' }, 'How your event will appear on the events page')
          )
        )
      ),
      
      // Homepage Carousel View
      h('div', { className: 'bg-brand-light bg-opacity-80 py-8 mb-8' },
        h('div', { className: 'container mx-auto px-4' },
          h('div', { className: 'relative rounded-lg overflow-hidden shadow-lg event-card' },
            h('div', { className: 'absolute inset-0' },
              h('img', {
                src: data.image ? this.props.getAsset(data.image).toString() : '',
                alt: data.title || '',
                className: 'w-full h-full object-cover'
              }),
              h('div', { className: 'absolute inset-0 bg-brand-dark bg-opacity-40' })
            ),
            h('div', { className: 'relative p-4 md:p-6 text-white event-content' },
              h('div', { className: 'max-w-3xl mx-auto text-center flex flex-col h-full mt-4 md:mt-8' },
                h('div', { className: 'flex-grow' },
                  h('h3', { className: 'text-2xl md:text-3xl hero-heading mb-3' }, data.title || ''),
                  h('div', { className: 'event-description' },
                    h('p', { className: 'text-base hero-tagline' }, data.description || '')
                  ),
                  h('p', { className: 'text-lg mb-4' },
                    h('span', { className: 'inline-block bg-brand-light text-brand-dark px-3 py-1 rounded-full' },
                      formatDate(startDate, endDate)
                    )
                  )
                )
              )
            )
          )
        )
      ),
      
      // Event Content
      h('div', { className: 'container mx-auto px-4 py-8' },
        h('div', { className: 'grid grid-cols-1 md:grid-cols-5 gap-8' },
          // Event Details
          h('div', { className: 'md:col-span-2 event-details' },
            // Title
            h('h2', { className: 'text-brand-dark mb-2' }, data.title || 'Event Title'),
            
            // Date
            h('div', { className: 'mb-4' },
              h('span', { className: 'text-lg md:text-xl text-brand-dark hero-tagline' },
                formatDate(startDate, endDate)
              )
            ),
            
            // Description
            h('div', { className: 'prose max-w-none' },
              data.description
            )
          ),
          
          // Event Images
          contentImages.length > 0 ? 
            h('div', { className: 'md:col-span-3 event-images' },
              contentImages.map((image, index) => 
                h('div', { key: index, className: 'mb-6' },
                  h('img', {
                    src: image.image ? this.props.getAsset(image.image).toString() : '',
                    alt: image.caption || 'Event Image',
                    className: 'w-full rounded-lg shadow-md'
                  }),
                  image.caption && h('p', { className: 'text-sm text-gray-600 mt-2 text-center' }, image.caption)
                )
              )
            ) : 
            data.image ? 
              h('div', { className: 'md:col-span-3 event-images' },
                h('div', { className: 'mb-6' },
                  h('img', {
                    src: this.props.getAsset(data.image).toString(),
                    alt: data.title || 'Event Image',
                    className: 'w-full rounded-lg shadow-md'
                  })
                )
              ) : null
        )
      )
    );
  }
});