/**
 * AcademyPreview component for the CMS
 * Displays a preview of the academy page with all sections
 */
export const AcademyPreview = createClass({
  render() {
    const entry = this.props.entry;
    const data = entry.getIn(['data']).toJS();
    const hero = data.hero || {};
    const subnav = data.subnav || [];
    const sections = data.sections || {};

    return (
      <div className="academy-page bg-gray-50">
        {/* Hero Section */}
        {hero && (
          <div className="academy-hero relative">
            <div className="relative h-48 md:h-64 overflow-hidden bg-gray-300">
              {hero.image && (
                <img
                  src={this.props.getAsset(hero.image).toString()}
                  alt={hero.title || 'Academy Hero'}
                  className="absolute inset-0 w-full h-full object-cover"
                />
              )}
              <div className="absolute inset-0 bg-gray-900 bg-opacity-60"></div>

              {/* Hero Content */}
              <div className="absolute inset-0 flex items-center">
                <div className="container mx-auto px-4">
                  <div className="max-w-4xl mx-auto text-center text-white">
                    <h1 className="text-3xl md:text-4xl lg:text-5xl mb-2 hero-heading">
                      {hero.title || 'Anchor Baptist Academy'}
                    </h1>
                    {hero.tagline && (
                      <p className="text-lg md:text-xl opacity-90 hero-tagline">
                        {hero.tagline}
                      </p>
                    )}

                    {/* CTA Buttons */}
                    <div className="flex flex-col sm:flex-row gap-4 justify-center mt-6">
                      {hero.cta_primary && (
                        <span className="inline-block bg-white text-brand-dark px-6 py-2 rounded-lg font-semibold border-2 border-white">
                          {hero.cta_primary.text}
                        </span>
                      )}
                      {hero.cta_secondary && (
                        <span className="inline-block bg-transparent border-2 border-white text-white px-6 py-2 rounded-lg font-semibold">
                          {hero.cta_secondary.text}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Sub-Navigation */}
            {subnav && subnav.length > 0 && (
              <nav className="academy-subnav bg-brand-dark shadow-lg">
                <div className="container mx-auto px-4">
                  <div className="flex justify-center items-center py-4 space-x-6 flex-wrap">
                    {subnav.map((item, index) => (
                      <span key={index} className="text-white hover:text-brand-light transition-colors font-medium">
                        {item.label}
                      </span>
                    ))}
                  </div>
                </div>
              </nav>
            )}
          </div>
        )}

        {/* About Section */}
        {sections.about && (
          <section className="py-12 md:py-20 bg-white">
            <div className="container mx-auto px-4 md:px-6">
              <div className="max-w-6xl mx-auto">
                <h2 className="text-2xl sm:text-3xl md:text-4xl mb-6 md:mb-8 text-brand-dark text-center">
                  {sections.about.title}
                </h2>
                {sections.about.content && (
                  <div className="prose md:prose-lg max-w-none mb-8 md:mb-12 text-center mx-auto max-w-4xl">
                    <p className="whitespace-pre-wrap">{sections.about.content}</p>
                  </div>
                )}
                {sections.about.image && (
                  <div className="mb-16">
                    <img
                      src={this.props.getAsset(sections.about.image).toString()}
                      alt="About Anchor Baptist Academy"
                      className="rounded-lg shadow-2xl w-full object-cover max-h-96"
                    />
                  </div>
                )}
                {sections.about.subsections && sections.about.subsections.length > 0 && (
                  <div className="grid md:grid-cols-3 gap-8 mt-12">
                    {sections.about.subsections.map((sub, index) => (
                      <div key={index} className="bg-gray-50 rounded-lg p-8 hover:shadow-lg transition-shadow duration-300 border-t-4 border-brand-light">
                        <h3 className="text-2xl font-bold mb-4 text-brand-dark">{sub.title}</h3>
                        <div className="prose prose-sm text-gray-700">
                          <p className="whitespace-pre-wrap text-sm">{sub.content}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </section>
        )}

        {/* Academics Section */}
        {sections.academics && (
          <section className="py-12 md:py-20 bg-gray-50">
            <div className="container mx-auto px-4 md:px-6">
              <div className="max-w-6xl mx-auto">
                <h2 className="text-2xl sm:text-3xl md:text-4xl mb-6 md:mb-8 text-brand-dark text-center">
                  {sections.academics.title}
                </h2>
                {sections.academics.content && (
                  <div className="prose md:prose-lg max-w-none mb-12 md:mb-16 text-center mx-auto max-w-4xl">
                    <p className="whitespace-pre-wrap">{sections.academics.content}</p>
                  </div>
                )}
                {sections.academics.features && sections.academics.features.length > 0 && (
                  <div className="grid md:grid-cols-3 gap-8">
                    {sections.academics.features.map((feature, index) => (
                      <div key={index} className="bg-white rounded-lg shadow-lg p-6 text-center hover:shadow-xl transition-shadow duration-300">
                        <div className="flex justify-center mb-4">
                          <div className="w-16 h-16 text-brand-light flex items-center justify-center text-4xl">
                            {feature.icon === 'book' && '📚'}
                            {feature.icon === 'users' && '👥'}
                            {feature.icon === 'graduation-cap' && '🎓'}
                          </div>
                        </div>
                        <h3 className="text-xl font-bold mb-3 text-brand-dark">{feature.title}</h3>
                        <p className="text-gray-700">{feature.description}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </section>
        )}

        {/* Admissions Section */}
        {sections.admissions && (
          <section className="py-12 md:py-20 bg-white">
            <div className="container mx-auto px-4 md:px-6">
              <div className="max-w-6xl mx-auto">
                <h2 className="text-2xl sm:text-3xl md:text-4xl mb-6 md:mb-8 text-brand-dark text-center">
                  {sections.admissions.title}
                </h2>
                {sections.admissions.content && (
                  <div className="prose md:prose-lg max-w-none mb-12 md:mb-16 text-center mx-auto max-w-4xl">
                    <p className="whitespace-pre-wrap">{sections.admissions.content}</p>
                  </div>
                )}
                {sections.admissions.steps && sections.admissions.steps.length > 0 && (
                  <div className="grid md:grid-cols-4 gap-6">
                    {sections.admissions.steps.map((step, index) => (
                      <div key={index} className="text-center">
                        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-brand-light text-white text-2xl font-bold mb-4">
                          {step.number}
                        </div>
                        <h3 className="text-lg font-bold mb-2 text-brand-dark">{step.title}</h3>
                        <p className="text-sm text-gray-700">{step.description}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </section>
        )}

        {/* Tuition Section */}
        {sections.tuition && (
          <section className="py-12 md:py-20 bg-gray-50">
            <div className="container mx-auto px-4 md:px-6">
              <div className="max-w-4xl mx-auto">
                <h2 className="text-2xl sm:text-3xl md:text-4xl mb-6 md:mb-8 text-brand-dark text-center">
                  {sections.tuition.title}
                </h2>
                {sections.tuition.content && (
                  <div className="prose md:prose-lg max-w-none mb-12 md:mb-16 text-center">
                    <p className="whitespace-pre-wrap">{sections.tuition.content}</p>
                  </div>
                )}
                {sections.tuition.rates && sections.tuition.rates.length > 0 && (
                  <div className="mb-12">
                    <h3 className="text-2xl font-bold mb-6 text-brand-dark">Tuition Rates</h3>
                    <div className="space-y-4">
                      {sections.tuition.rates.map((rate, index) => (
                        <div key={index} className="flex justify-between items-center bg-white p-4 rounded-lg shadow">
                          <span className="font-semibold text-lg">{rate.grade}</span>
                          <span className="text-brand-dark font-bold text-xl">{rate.cost}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                {sections.tuition.payment_plans && sections.tuition.payment_plans.length > 0 && (
                  <div className="mb-12">
                    <h3 className="text-2xl font-bold mb-6 text-brand-dark">Payment Plans</h3>
                    <ul className="space-y-3 bg-white p-6 rounded-lg shadow">
                      {sections.tuition.payment_plans.map((plan, index) => (
                        <li key={index} className="flex items-start">
                          <span className="mr-3">✓</span>
                          <span>{plan}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                {sections.tuition.financial_aid && sections.tuition.financial_aid.content && (
                  <div className="bg-brand-light text-white rounded-lg p-8">
                    <h3 className="text-2xl font-bold mb-4">Financial Assistance</h3>
                    <div className="prose prose-invert max-w-none">
                      <p className="whitespace-pre-wrap">{sections.tuition.financial_aid.content}</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </section>
        )}

        {/* Policies Section */}
        {sections.policies && (
          <section className="py-12 md:py-20 bg-white">
            <div className="container mx-auto px-4 md:px-6">
              <div className="max-w-4xl mx-auto">
                <h2 className="text-2xl sm:text-3xl md:text-4xl mb-6 md:mb-8 text-brand-dark text-center">
                  {sections.policies.title}
                </h2>
                {sections.policies.content && (
                  <div className="prose md:prose-lg max-w-none mb-8 md:mb-12 text-center">
                    <p className="whitespace-pre-wrap">{sections.policies.content}</p>
                  </div>
                )}
                {sections.policies.documents && sections.policies.documents.length > 0 && (
                  <div className="grid md:grid-cols-2 gap-4">
                    {sections.policies.documents.map((doc, index) => (
                      <div key={index} className="flex items-center bg-gray-50 p-4 rounded-lg">
                        <span className="mr-4 text-4xl">📄</span>
                        <span className="font-semibold text-brand-link">
                          {doc.title}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </section>
        )}

        {/* Contact Section */}
        {sections.contact && (
          <section className="py-12 md:py-16 bg-brand-dark text-white">
            <div className="container mx-auto px-4 md:px-6">
              <div className="max-w-4xl mx-auto">
                <h2 className="text-2xl sm:text-3xl md:text-4xl mb-4 md:mb-6">
                  {sections.contact.title}
                </h2>
                <div className="grid md:grid-cols-2 gap-8 mb-8">
                  <div>
                    <h3 className="text-xl font-bold mb-4">Contact Information</h3>
                    <div className="space-y-4">
                      {sections.contact.office_hours && (
                        <div>
                          <strong>Office Hours:</strong><br/>
                          {sections.contact.office_hours}
                        </div>
                      )}
                      {sections.contact.phone && (
                        <div>
                          <strong>Phone:</strong><br/>
                          {sections.contact.phone}
                        </div>
                      )}
                      {sections.contact.email && (
                        <div>
                          <strong>Email:</strong><br/>
                          {sections.contact.email}
                        </div>
                      )}
                      {sections.contact.location && (
                        <div>
                          <strong>Location:</strong><br/>
                          {sections.contact.location}
                        </div>
                      )}
                    </div>
                  </div>
                  <div>
                    {sections.contact.content && (
                      <div className="prose prose-invert max-w-none">
                        <p className="whitespace-pre-wrap">{sections.contact.content}</p>
                      </div>
                    )}
                  </div>
                </div>
                <div className="flex flex-col sm:flex-row gap-4 justify-center mt-12">
                  <span className="inline-block bg-white text-brand-dark px-8 py-3 rounded-lg font-semibold text-center">
                    View Admissions Process
                  </span>
                  <span className="inline-block border-2 border-white text-white px-8 py-3 rounded-lg font-semibold text-center">
                    Send Us an Email
                  </span>
                </div>
              </div>
            </div>
          </section>
        )}
      </div>
    );
  }
});
