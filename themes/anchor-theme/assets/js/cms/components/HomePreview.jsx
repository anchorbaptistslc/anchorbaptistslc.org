import { EventCard } from './EventCard.jsx';
import { PreviewHeader } from './PreviewHeader.jsx';

/**
 * HomePreview component for the CMS
 * Displays a preview of the homepage with events carousel
 * JSX version - must render identically to HomePreview.js
 */
export const HomePreview = createClass({
  getInitialState() {
    return { currentSlide: 0, events: [] };
  },

  componentDidMount() {
    try {
      // Fetch events from the Events collection using getCollection
      this.props.getCollection('events-items').then(events => {
        console.log('Events from getCollection:', events);

        // Filter for upcoming events
        const now = new Date();
        const upcomingEvents = events.filter(event => {
          // Log the event structure to understand it
          console.log('Event structure:', event);

          // Get the data from the event
          const eventData = event.get('data');
          console.log('Event data:', eventData);

          if (!eventData) return false;

          // Check if we have dates
          if (!eventData.dates) return false;

          // Get the end date or fall back to start date
          const endDate = eventData.dates.end ? new Date(eventData.dates.end) :
            (eventData.dates.start ? new Date(eventData.dates.start) : null);

          return endDate && endDate >= now;
        }).map(event => {
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

        // Sort events by start date
        upcomingEvents.sort((a, b) => {
          const aDate = a.dates && a.dates.start ? new Date(a.dates.start) : new Date(0);
          const bDate = b.dates && b.dates.start ? new Date(b.dates.start) : new Date(0);
          return aDate - bDate;
        });

        console.log('Upcoming events:', upcomingEvents);
        this.setState({ events: upcomingEvents });
      }).catch(error => {
        console.error('Error fetching events:', error);
      });
    } catch (error) {
      console.error('Error in componentDidMount:', error);
    }
  },

  nextSlide() {
    const activeEvents = this.getActiveEvents(this.state.events);
    this.setState(prevState => ({
      currentSlide: (prevState.currentSlide + 1) % activeEvents.length
    }));
  },

  prevSlide() {
    const activeEvents = this.getActiveEvents(this.state.events);
    this.setState(prevState => ({
      currentSlide: prevState.currentSlide === 0
        ? activeEvents.length - 1
        : prevState.currentSlide - 1
    }));
  },

  goToSlide(index) {
    this.setState({ currentSlide: index });
  },

  getActiveEvents(events) {
    const now = new Date();
    return events.filter(function (event) {
      try {
        const endDate = event.dates && event.dates.end ? new Date(event.dates.end) :
          (event.dates && event.dates.start ? new Date(event.dates.start) : null);
        return endDate && endDate >= now;
      } catch (e) {
        return false;
      }
    });
  },

  render() {
    const entry = this.props.entry;
    const hero = entry.getIn(['data', 'hero']) ? entry.getIn(['data', 'hero']).toJS() : {};
    const worship = entry.getIn(['data', 'worship']) ? entry.getIn(['data', 'worship']).toJS() : {};
    const welcome = entry.getIn(['data', 'welcome']) ? entry.getIn(['data', 'welcome']).toJS() : {};
    const featured = entry.getIn(['data', 'featured']) ? entry.getIn(['data', 'featured']).toJS() : {};
    const params = entry.getIn(['data', 'params']) ? entry.getIn(['data', 'params']).toJS() : {};
    const events = this.state.events;

    // Get active events using the helper method
    const activeEvents = this.getActiveEvents(events);

    return (
      <div className="bg-gray-50">
        {/* Header */}
        <PreviewHeader
          title=""
          description="Events are managed in the Event Items section."
          listItems={[]}
        />

        {/* Hero Section */}
        <div className="relative overflow-hidden z-0">
          <div className="absolute inset-0">
            <img
              src={hero.image ? this.props.getAsset(hero.image).toString() : ''}
              className="w-full h-full object-cover object-[center_65%]"
              alt=""
              aria-hidden="true"
            />
            <div className="absolute inset-0 bg-brand-dark bg-opacity-75 mix-blend-multiply transition-opacity duration-500 opacity-0" />
          </div>
          <div className="relative">
            <div className="container mx-auto px-4 py-24">
              <div className="max-w-4xl">
                {params.show_title && (
                  <h1 className="text-4xl md:text-5xl mb-6 text-white hero-heading">
                    {hero.title || ''}
                  </h1>
                )}
                <p className="text-xl mb-8 text-white hero-tagline">
                  {hero.tagline || ''}
                </p>
                <div className="space-x-4">
                  {hero.cta?.learn_more && (
                    <a
                      href={hero.cta.learn_more.url || '#'}
                      className="bg-white text-brand-dark px-6 py-2 rounded-lg font-semibold hover:bg-gray-100 border-2 border-white"
                    >
                      {hero.cta.learn_more.text || 'Learn More'}
                    </a>
                  )}
                  {hero.cta?.visit && (
                    <a
                      href={hero.cta.visit.url || '#'}
                      className="bg-transparent border-2 border-white text-white px-6 py-2 rounded-lg font-semibold transition-colors duration-200 hover:bg-gray-100 hover:text-brand-dark hover:border-gray-100"
                    >
                      {hero.cta.visit.text || 'Visit Us'}
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Upcoming Events Section (if events exist) */}
        {activeEvents.length > 0 && (
          <div className="py-12 bg-brand-light bg-opacity-80 relative shadow-lg">
            <div className="container mx-auto px-4">
              {/* Show heading if show_heading is true or undefined */}
              {(params.events_section?.show_heading !== false) && (
                <h2 className="text-3xl mb-6 text-center hero-heading text-brand-dark">
                  {params.events_section?.heading || 'Upcoming Events'}
                </h2>
              )}

              <div className="event-carousel relative">
                {/* Show only the current event based on component state */}
                {activeEvents.length > 0 && (
                  <div className="event-slide active">
                    <EventCard
                      {...activeEvents[this.state.currentSlide]}
                      getAsset={this.props.getAsset}
                    />
                  </div>
                )}

                {/* Left and right click areas for navigation (only if multiple events) */}
                {activeEvents.length > 1 && (
                  <>
                    <div
                      className="absolute inset-y-0 left-0 w-1/5 z-10 cursor-pointer"
                      onClick={this.prevSlide}
                    />
                    <div
                      className="absolute inset-y-0 right-0 w-1/5 z-10 cursor-pointer"
                      onClick={this.nextSlide}
                    />
                  </>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Service Times */}
        <div className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl mb-12 text-center hero-heading">
              {worship.title || ''}
            </h2>
            <p className="text-base text-gray-600 font-normal text-center -mt-10 mb-12">
              {worship.subtitle || ''}
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="text-center p-6 bg-gray-50 rounded-lg">
                <h3 className="font-medium mb-2 tracking-[0.05em]" style={{ fontSize: '16px' }}>
                  Sunday School
                </h3>
                <p className="text-xl text-brand-link">9:30 AM</p>
              </div>
              <div className="text-center p-6 bg-gray-50 rounded-lg">
                <h3 className="font-medium mb-2 tracking-[0.05em]" style={{ fontSize: '16px' }}>
                  Sunday Morning
                </h3>
                <p className="text-xl text-brand-link">10:45 AM</p>
              </div>
              <div className="text-center p-6 bg-gray-50 rounded-lg">
                <h3 className="font-medium mb-2 tracking-[0.05em]" style={{ fontSize: '16px' }}>
                  Sunday Evening
                </h3>
                <p className="text-xl text-brand-link">6:00 PM</p>
              </div>
              <div className="text-center p-6 bg-gray-50 rounded-lg">
                <h3 className="font-medium mb-2 tracking-[0.05em]" style={{ fontSize: '16px' }}>
                  Wednesday
                </h3>
                <p className="text-xl text-brand-link">7:00 PM</p>
              </div>
            </div>
          </div>
        </div>

        {/* Welcome Section */}
        <div className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="lg:grid lg:grid-cols-2 lg:gap-8 lg:items-center">
              <div className="prose">
                {this.props.widgetFor('body')}
              </div>
              <div className="mt-8 lg:mt-0">
                <img
                  src={welcome.image ? this.props.getAsset(welcome.image).toString() : ''}
                  alt={welcome.image_alt || ''}
                  className="rounded-lg shadow-lg"
                />
                {welcome.image_alt && (
                  <p className="mt-4 text-center text-gray-600">{welcome.image_alt}</p>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Featured Content */}
        {featured.image && (
          <div className="relative py-16">
            <div className="absolute inset-0">
              <img
                src={featured.image ? this.props.getAsset(featured.image).toString() : ''}
                alt=""
                className="w-full h-full object-cover"
                aria-hidden="true"
              />
              <div className="absolute inset-0 bg-gray-900 bg-opacity-60" />
            </div>
            <div className="container mx-auto px-4 relative">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {featured.cards?.map(card => (
                  <div key={card.title} className="bg-white bg-opacity-90 p-8 rounded-lg shadow-lg">
                    <h3 className="text-2xl font-medium mb-4 tracking-[0.05em]">
                      {card.title || ''}
                    </h3>
                    <p className="mb-4">{card.description || ''}</p>
                    <a
                      href={card.url || '#'}
                      className="text-brand-link font-semibold hover:text-brand-linkHover"
                    >
                      {card.link_text || 'Learn More →'}
                    </a>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
}); 