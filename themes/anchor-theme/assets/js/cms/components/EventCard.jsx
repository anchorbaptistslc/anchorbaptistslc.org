import { formatDate } from '../utils/dateFormatters.js';

/**
 * EventCard component for displaying event information in a consistent format
 * Used across multiple preview components
 */
export const EventCard = createClass({
  render() {
    const { 
      title,
      description,
      image,
      dates,
      getAsset,
      className = '',
      showDate = true
    } = this.props;

    return (
      <div className={`relative rounded-lg overflow-hidden shadow-lg event-card ${className}`}>
        <div className="absolute inset-0">
          <img
            src={image ? getAsset(image).toString() : ''}
            alt={title || ''}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-brand-dark bg-opacity-40" />
        </div>
        <div className="relative p-4 md:p-6 text-white event-content">
          <div className="max-w-3xl mx-auto text-center flex flex-col h-full mt-4 md:mt-8">
            <div className="flex-grow">
              <h3 className="text-2xl md:text-3xl hero-heading mb-3">{title || ''}</h3>
              <div className="event-description">
                <p className="text-base hero-tagline">{description || ''}</p>
              </div>
              {showDate && dates && (
                <p className="text-lg mb-4">
                  <span className="inline-block bg-brand-light text-brand-dark px-3 py-1 rounded-full">
                    {formatDate(dates.start, dates.end)}
                  </span>
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
}); 