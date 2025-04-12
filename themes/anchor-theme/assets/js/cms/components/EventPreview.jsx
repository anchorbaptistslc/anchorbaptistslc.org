import { formatDate } from '../utils/dateFormatters.js';
import { EventCard } from './EventCard.jsx';
import { PreviewHeader } from './PreviewHeader.jsx';

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
        <PreviewHeader
          title="Event Preview"
          description="Below you will see two views of your event. Note: Events only show if expiryDate is in the future."
          listItems={[
            "How your event will appear in the carousel on the homepage",
            "How your event will appear on the events page"
          ]}
        />
        
        {/* Homepage Carousel View */}
        <div className="bg-brand-light bg-opacity-80 py-8 mb-8">
          <div className="container mx-auto px-4">
            <EventCard
              title={data.title}
              description={data.description}
              image={data.image}
              dates={{ start: startDate, end: endDate }}
              getAsset={this.props.getAsset}
            />
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
                {data.description || ''}}
              </div>
              {data.body && (
                <div className="prose max-w-none">
                  {this.props.widgetFor('body')}
                </div>
              )}
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