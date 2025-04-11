/**
 * PreviewHeader component for the CMS
 * Displays a consistent header across all preview components
 */
export const PreviewHeader = createClass({
  render() {
    const { title, description, listItems = [] } = this.props;

    return (
      <div className="bg-blue-100 border-b-4 border-blue-300 p-4 text-center">
        <h1 className="text-2xl font-bold text-blue-800 mb-2">{title}</h1>
        <div className="text-blue-700 max-w-3xl mx-auto">
          <p className="mb-2">{description}</p>
          {listItems.length > 0 && (
            <ol className="list-decimal list-inside text-left" style={{ listStyleType: 'decimal', paddingLeft: '1.5rem' }}>
              {listItems.map((item, index) => (
                <li key={index} className="mb-1">{item}</li>
              ))}
            </ol>
          )}
        </div>
      </div>
    );
  }
}); 