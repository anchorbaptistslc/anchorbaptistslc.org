/**
 * MinistryPreview component for the CMS
 * Displays a preview of a ministry page
 */
export const MinistryPreview = createClass({
  render: function() {
    const entry = this.props.entry;
    const data = entry.getIn(['data']).toJS();
    const contentImages = data.content_images || [];

    return h('div', { className: 'bg-white' },
      // Hero Section
      h('div', { className: 'relative h-48 md:h-64 overflow-hidden' },
        h('img', {
          src: data.featured_image ? this.props.getAsset(data.featured_image).toString() : '',
          className: 'absolute inset-0 w-full h-full object-cover',
          alt: data.title || ''
        }),
        h('div', { className: 'absolute inset-0 bg-gray-900 bg-opacity-60' }),
        h('div', { className: 'absolute inset-0 flex items-center' },
          h('div', { className: 'container mx-auto px-4' },
            h('h1', { className: 'text-3xl md:text-4xl lg:text-5xl text-white mb-2 hero-heading' }, data.title || ''),
            h('p', { className: 'text-lg md:text-xl text-white opacity-90 hero-tagline' }, data.tagline || '')
          )
        )
      ),
      // Content Section
      h('div', { className: 'container mx-auto px-4 py-8' },
        h('div', { className: 'flex flex-col lg:flex-row gap-8' },
          // Main Content
          h('div', { className: 'lg:w-7/12' },
            // Quick Info Box
            (data.meeting_time || data.location || data.age_group) && h('div', { className: 'bg-white rounded-lg shadow-sm p-6 mb-8' },
              h('div', { className: 'grid grid-cols-1 md:grid-cols-3 gap-6' },
                data.meeting_time && h('div', null,
                  h('h3', { className: 'font-semibold text-gray-600 mb-1', style: { fontSize: 'inherit' } }, 'Meeting Time'),
                  h('p', { className: 'text-lg' }, data.meeting_time)
                ),
                data.location && h('div', null,
                  h('h3', { className: 'font-semibold text-gray-600 mb-1', style: { fontSize: 'inherit' } }, 'Location'),
                  h('p', { className: 'text-lg' }, data.location)
                ),
                data.age_group && h('div', null,
                  h('h3', { className: 'font-semibold text-gray-600 mb-1', style: { fontSize: 'inherit' } }, 'Age Group'),
                  h('p', { className: 'text-lg' }, data.age_group)
                )
              )
            ),
            // Main Content
            h('div', { className: 'prose max-w-none' },
              this.props.widgetFor('body')
            ),
            // Leaders Section
            data.leaders && data.leaders.length > 0 && h('div', { className: 'mt-12' },
              h('h2', { className: 'text-2xl font-medium mb-6' }, 'Ministry Leaders'),
              h('div', { className: 'grid grid-cols-1 gap-8' },
                data.leaders.map((leader, index) => 
                  h('div', { key: index, className: 'flex items-start space-x-4' },
                    leader.photo && h('img', {
                      src: this.props.getAsset(leader.photo).toString(),
                      alt: leader.name,
                      className: 'w-24 h-24 rounded-lg object-cover'
                    }),
                    h('div', null,
                      h('h3', { className: 'font-medium text-xl' }, leader.name),
                      leader.role && h('p', { className: 'text-gray-600 mb-2' }, leader.role),
                      leader.bio && h('p', { className: 'text-gray-700' }, leader.bio)
                    )
                  )
                )
              )
            )
          ),
          // Images
          contentImages.length > 0 && h('div', { className: 'lg:w-5/12' },
            h('div', { className: 'grid grid-cols-1 gap-8' },
              contentImages.map((image, index) => 
                h('div', { key: index, className: 'text-center' },
                  h('img', {
                    src: image.image ? this.props.getAsset(image.image).toString() : '',
                    alt: image.alt_text || '',
                    className: 'rounded-lg shadow-lg mb-4'
                  }),
                  image.caption && h('p', { className: 'text-gray-600' }, image.caption)
                )
              )
            )
          )
        )
      )
    );
  }
});