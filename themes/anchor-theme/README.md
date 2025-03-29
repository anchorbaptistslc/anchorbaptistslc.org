# Anchor Theme

A modern, responsive theme for Anchor Baptist Church's website built with Hugo and Tailwind CSS.

## Features

- Responsive design optimized for all devices
- Modern UI with clean typography and spacing
- Built with Tailwind CSS for flexible styling
- Search functionality with instant results
- Support for multiple content types:
  - Pages
  - Ministries
  - Events
  - Sermons
- Customizable through site parameters
- Optimized for performance and accessibility

## Content Types

The theme includes several [archetypes](https://gohugo.io/content-management/archetypes/) to help maintain consistent content structure:

### Homepage
```bash
hugo new --kind homepage _index.md
```
Creates a new homepage with:
- Hero section with title, tagline, and CTA buttons
- Worship times section
- Featured cards section
- Welcome section with image

### Ministries
```bash
hugo new --kind ministries ministries/your-ministry.md
```
Creates a new ministry page with:
- Title and description
- Featured image
- Tagline
- Content images with alt text and captions
- Single column layout

### About
```bash
hugo new --kind about about/your-page.md
```
Creates a new about section page with:
- Title and description
- Featured image
- Tagline
- Content images with alt text and captions

## Requirements

- Hugo Extended version 0.145.0 or later
- Node.js and npm for asset processing
- PostCSS for CSS processing

## Installation

1. Clone the theme into your Hugo site's themes directory:
   ```bash
   git clone https://github.com/yourusername/anchor-theme.git themes/anchor-theme
   ```

2. Install the required npm packages:
   ```bash
   npm install
   ```

## Configuration

### Site Parameters

The theme supports the following site parameters in your Hugo configuration:

```yaml
params:
  description: "A Bible-believing church in Salt Lake City, Utah"
  address: "1880 East 5600 South, Salt Lake City, UT 84121"
  phone: "(801) 272-9405"
  email: "office@anchorbaptistslc.org"
  
  # Social Media
  social:
    facebook: "https://www.facebook.com/anchorbaptistchurchslc/"
    youtube: "https://www.youtube.com/@anchorbaptistchurchslc/streams"
    instagram: "https://www.instagram.com/anchorbaptistslc/"
  
  # Service Times
  services:
    sunday_school: "10:00 AM"
    sunday_morning: "11:00 AM"
    sunday_evening: "6:00 PM"
    wednesday: "7:00 PM"
```

### Navigation

The theme uses Hugo's menu system. Configure your main menu in your Hugo configuration:

```yaml
menu:
  main:
    - identifier: about
      name: About
      url: /about/
      weight: 1
    - identifier: ministries
      name: Ministries
      url: /ministries/
      weight: 2
    - identifier: sermons
      name: Sermons
      url: /sermons/
      weight: 3
    - identifier: contact
      name: Contact
      url: /contact/
      weight: 4
```

## Development

### Building Assets

The theme uses PostCSS and Tailwind CSS for styling. To build the assets:

```bash
npm run build
```

For development with watch mode:

```bash
npm run dev
```

### Directory Structure

```
themes/anchor-theme/
├── assets/
│   ├── css/
│   │   └── theme.css
│   ├── images/
│   └── js/
│       └── theme.js
├── layouts/
│   ├── _default/
│   │   └── baseof.html
│   │   └── index.json
│   │   └── list.html
│   │   └── single.html
│   │   └── two-column.html
│   ├── ministries/
│   │   └── single.html
│   ├── partials/
│   │   └── breadcrumb.html
│   │   └── footer.html
│   │   └── head.html
│   │   └── header.html
│   │   └── hero.html
│   └── index.html
├── static/
│   ├── css/
│   ├── images/
│   │   └── logo-anchor-60th-text.jpg
│   │   └── logo-anchor-yellow.jpg
│   │   └── logo.jpg
│   └── js/
│       └── search.js
└── README.md
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This theme is intended for use by Anchor Baptist Church only. 