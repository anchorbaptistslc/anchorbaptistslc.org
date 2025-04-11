/**
 * HeroSection component for the CMS
 * Displays a hero section with image, title, and tagline
 * Based on the hero section from EventsListPreview
 */
export const HeroSection = ({ featured_image, title, tagline, getAsset }) => {
  return (
    <>
      {featured_image ? (
        <div className="relative h-48 md:h-64 overflow-hidden">
          <img
            src={getAsset(featured_image).toString()}
            alt={title || ''}
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gray-900 bg-opacity-60" />
          <div className="absolute inset-0 flex items-center">
            <div className="container mx-auto px-4">
              <h1 className="text-3xl md:text-4xl lg:text-5xl text-white mb-2 hero-heading">
                {title || ''}
              </h1>
              {tagline && (
                <p className="text-lg md:text-xl text-white opacity-90 hero-tagline">
                  {tagline}
                </p>
              )}
            </div>
          </div>
        </div>
      ) : (
        // Text-only header if no image
        <div className="bg-white border-b">
          <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl md:text-4xl text-gray-900 hero-heading">
              {title || ''}
            </h1>
            {tagline && (
              <p className="text-lg text-gray-600 mt-2 hero-tagline">
                {tagline}
              </p>
            )}
          </div>
        </div>
      )}
    </>
  );
}; 