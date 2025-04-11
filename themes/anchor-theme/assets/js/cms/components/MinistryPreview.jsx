/**
 * MinistryPreview component for the CMS
 * Displays a preview of a ministry page
 * JSX version - must render identically to MinistryPreview.js
 */
export const MinistryPreview = createClass({
  render() {
    const entry = this.props.entry;
    const data = entry.getIn(['data']).toJS();
    const contentImages = data.content_images || [];

    return (
      <div className="bg-white">
        {/* Hero Section */}
        <div className="relative h-48 md:h-64 overflow-hidden">
          <img
            src={data.featured_image ? this.props.getAsset(data.featured_image).toString() : ''}
            className="absolute inset-0 w-full h-full object-cover"
            alt={data.title || ''}
          />
          <div className="absolute inset-0 bg-gray-900 bg-opacity-60" />
          <div className="absolute inset-0 flex items-center">
            <div className="container mx-auto px-4">
              <h1 className="text-3xl md:text-4xl lg:text-5xl text-white mb-2 hero-heading">
                {data.title || ''}
              </h1>
              <p className="text-lg md:text-xl text-white opacity-90 hero-tagline">
                {data.tagline || ''}
              </p>
            </div>
          </div>
        </div>

        {/* Content Section */}
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Main Content */}
            <div className="lg:w-7/12">
              {/* Quick Info Box */}
              {(data.meeting_time || data.location || data.age_group) && (
                <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {data.meeting_time && (
                      <div>
                        <h3 className="font-semibold text-gray-600 mb-1" style={{ fontSize: 'inherit' }}>
                          Meeting Time
                        </h3>
                        <p className="text-lg">{data.meeting_time}</p>
                      </div>
                    )}
                    {data.location && (
                      <div>
                        <h3 className="font-semibold text-gray-600 mb-1" style={{ fontSize: 'inherit' }}>
                          Location
                        </h3>
                        <p className="text-lg">{data.location}</p>
                      </div>
                    )}
                    {data.age_group && (
                      <div>
                        <h3 className="font-semibold text-gray-600 mb-1" style={{ fontSize: 'inherit' }}>
                          Age Group
                        </h3>
                        <p className="text-lg">{data.age_group}</p>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Main Content */}
              <div className="prose max-w-none">
                {this.props.widgetFor('body')}
              </div>

              {/* Leaders Section */}
              {data.leaders && data.leaders.length > 0 && (
                <div className="mt-12">
                  <h2 className="text-2xl font-medium mb-6">Ministry Leaders</h2>
                  <div className="grid grid-cols-1 gap-8">
                    {data.leaders.map((leader, index) => (
                      <div key={index} className="flex items-start space-x-4">
                        {leader.photo && (
                          <img
                            src={this.props.getAsset(leader.photo).toString()}
                            alt={leader.name}
                            className="w-24 h-24 rounded-lg object-cover"
                          />
                        )}
                        <div>
                          <h3 className="font-medium text-xl">{leader.name}</h3>
                          {leader.role && (
                            <p className="text-gray-600 mb-2">{leader.role}</p>
                          )}
                          {leader.bio && (
                            <p className="text-gray-700">{leader.bio}</p>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Images */}
            {contentImages.length > 0 && (
              <div className="lg:w-5/12">
                <div className="grid grid-cols-1 gap-8">
                  {contentImages.map((image, index) => (
                    <div key={index} className="text-center">
                      <img
                        src={image.image ? this.props.getAsset(image.image).toString() : ''}
                        alt={image.alt_text || ''}
                        className="rounded-lg shadow-lg mb-4"
                      />
                      {image.caption && (
                        <p className="text-gray-600">{image.caption}</p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
}); 