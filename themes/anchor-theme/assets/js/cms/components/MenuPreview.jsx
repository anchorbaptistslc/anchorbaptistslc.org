/**
 * MenuPreview component for the CMS
 * Displays a preview of the menu structure
 */
import { PreviewHeader } from './PreviewHeader.jsx';

export const MenuPreview = createClass({
  render() {
    const entry = this.props.entry;
    const data = entry.getIn(['data']).toJS();
    const menuConfig = data.menu || {};

    return (
      <div className="bg-white">
        {/* Header */}
        <PreviewHeader
          title="Menu Item Preview"
          listItems={[
            "Main menu items appear in the top navigation",
            "Items with parents appear in dropdown menus",
            "Footer menu items appear in the site footer"
          ]}
        />

        {/* Menu Configuration Details */}
        <div className="container mx-auto px-4 py-8">
          <div className="bg-gray-50 p-6 rounded-lg shadow-sm">
            <dl className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {menuConfig.main && (
                <>
                  <dt className="font-medium">Main Link:</dt>
                  <dd className="mx-2"><a href={data.external_url} target="_blank">{menuConfig.main.name || data.title}</a></dd>
                  <dt className="font-medium">Weight/Position:</dt>
                  <dd className="mx-2">{menuConfig.main?.weight || 'Not set'}</dd>
                  <dt className="font-medium">Parent:</dt>
                  <dd className="mx-2">{menuConfig.main.parent || 'None (Top Level)'}</dd>
                </>
              )}
              {menuConfig.footer && (
                <>
                  <dt className="font-medium">Footer Link:</dt>
                  <dd className="mx-2"><a href={data.external_url} target="_blank">{menuConfig.footer.name || data.title}</a></dd>
                  <dt className="font-medium">Weight/Position:</dt>
                  <dd className="mx-2">{menuConfig.footer?.weight || 'Not set'}</dd>
                </>
              )}
            </dl>
          </div>
        </div>
      </div>
    );
  }
});