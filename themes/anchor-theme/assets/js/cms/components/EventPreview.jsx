import { formatDate } from '../utils/dateFormatters.js';

/**
 * EventPreview component for the CMS
 * Displays a preview of an individual event
 * JSX version - must render identically to EventPreview.js
 */
export const EventPreview = createClass({
  render() {
    const entry = this.props.entry;
    const data = entry.getIn(['data']) ? entry.getIn(['data']).toJS() : {};
    
    // Get start and end dates from the correct structure
    const startDate = data.dates && data.dates.start ? data.dates.start : '';
    const endDate = data.dates && data.dates.end ? data.dates.end : '';
    
    // Get content images
    const contentImages = data.content_images || [];
    
    return (
      <div className="bg-white">
        {/* Header */}
        <div className="bg-blue-100 border-b-4 border-blue-300 p-4 text-center">
          <h1 className="text-2xl font-bold text-blue-800 mb-2">Event Preview</h1>
          <div className="text-blue-700 max-w-3xl mx-auto">
            <p className="mb-2">Below you will see two views of your event. Note: Events only show if expiryDate is in the future.</p>
            <ol className="list-decimal list-inside text-left" style={{ listStyleType: 'decimal', paddingLeft: '1.5rem' }}>
              <li className="mb-1">How your event will appear in the carousel on the homepage</li>
              <li className="mb-1">How your event will appear on the events page</li>
            </ol>
          </div>
        </div>
        
        {/* Homepage Carousel View */}
        <div className="bg-brand-light bg-opacity-80 py-8 mb-8">
          <div className="container mx-auto px-4">
            <div className="relative rounded-lg overflow-hidden shadow-lg event-card">
              <div className="absolute inset-0">
                <img
                  src={data.image ? this.props.getAsset(data.image).toString() : ''}
                  alt={data.title || ''}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-brand-dark bg-opacity-40" />
              </div>
              <div className="relative p-4 md:p-6 text-white event-content">
                <div className="max-w-3xl mx-auto text-center flex flex-col h-full mt-4 md:mt-8">
                  <div className="flex-grow">
                    <h3 className="text-2xl md:text-3xl hero-heading mb-3">{data.title || ''}</h3>
                    <div className="event-description">
                      <p className="text-base hero-tagline">{data.description || ''}</p>
                    </div>
                    <p className="text-lg mb-4">
                      <span className="inline-block bg-brand-light text-brand-dark px-3 py-1 rounded-full">
                        {formatDate(startDate, endDate)}
                      </span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Event Content */}
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
            {/* Event Details */}
            <div className="md:col-span-2 event-details">
              {/* Title */}
              <h2 className="text-brand-dark mb-2">{data.title || 'Event Title'}</h2>
              
              {/* Date */}
              <div className="mb-4">
                <span className="text-lg md:text-xl text-brand-dark hero-tagline">
                  {formatDate(startDate, endDate)}
                </span>
              </div>
              
              {/* Description */}
              <div className="prose max-w-none">
                {data.description}
              </div>
            </div>
            
            {/* Event Images */}
            {contentImages.length > 0 ? (
              <div className="md:col-span-3 event-images">
                {contentImages.map((image, index) => (
                  <div key={index} className="mb-6">
                    <img
                      src={image.image ? this.props.getAsset(image.image).toString() : ''}
                      alt={image.caption || 'Event Image'}
                      className="w-full rounded-lg shadow-md"
                    />
                    {image.caption && (
                      <p className="text-sm text-gray-600 mt-2 text-center">{image.caption}</p>
                    )}
                  </div>
                ))}
              </div>
            ) : data.image ? (
              <div className="md:col-span-3 event-images">
                <div className="mb-6">
                  <img
                    src={this.props.getAsset(data.image).toString()}
                    alt={data.title || 'Event Image'}
                    className="w-full rounded-lg shadow-md"
                  />
                </div>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    );
  }
}); 