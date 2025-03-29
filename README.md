# Anchor Baptist Church Website

[![Netlify Status](https://api.netlify.com/api/v1/badges/838733ea-fab2-4283-918d-7bff63e4c47a/deploy-status)](https://app.netlify.com/sites/anchorbaptistslc/deploys)

This is the official website for Anchor Baptist Church in Salt Lake City, Utah, built using [Hugo](https://gohugo.io/), a fast and modern static site generator.

## About

The website serves as the online presence for Anchor Baptist Church, providing:
- Information about our church and ministries
- Service times and location
- Access to live streams and recordings
- Resources for visitors and members

## Technology Stack

- **Static Site Generator**: [Hugo](https://gohugo.io/)
- **CSS Framework**: [Tailwind CSS](https://tailwindcss.com/)
- **Search**: Custom JavaScript implementation
- **Build Tools**: Node.js, PostCSS

## Local Development

### Prerequisites

- [Hugo Extended](https://gohugo.io/installation/) (v0.136.5 or later)
- [Node.js](https://nodejs.org/) (v18 or later)
- [npm](https://www.npmjs.com/) (usually comes with Node.js)

### Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/richardbolt/anchorbaptistslc.org.git
   cd anchorbaptistslc.org
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

The site will be available at `http://localhost:1313/`.

### Building for Production

```bash
npm run build:prod
```

## Content Management

The site uses Hugo archetypes to maintain consistent content structure. These templates help ensure that new content follows the established patterns:

### Creating New Pages

1. **Homepage**
   ```bash
   hugo new --kind homepage _index.md
   ```

2. **Ministry Pages**
   ```bash
   hugo new --kind ministries ministries/your-ministry.md
   ```

3. **About Section Pages**
   ```bash
   hugo new --kind about about/your-page.md
   ```

Each archetype includes pre-configured frontmatter with the necessary fields and structure. See the [theme documentation](themes/anchor-theme/README.md) for more details about each content type.

## Project Structure

- `assets/`: Source files for CSS and JavaScript
- `content/`: Markdown content files
- `layouts/`: HTML templates
- `static/`: Static files (images, etc.)
- `themes/anchor-theme/`: Custom theme files
- `config/`: Hugo configuration files

## Service Times

- Sunday School: 10:00 AM
- Sunday Morning: 11:00 AM
- Sunday Evening: 6:00 PM
- Wednesday: 7:00 PM

## Contact Information

- **Address**: 1880 East 5600 South, Salt Lake City, UT 84121
- **Phone**: (801) 272-9405
- **Email**: office@anchorbaptistslc.org
- **Social Media**:
  - [Facebook](https://www.facebook.com/anchorbaptistchurchslc/)
  - [YouTube](https://www.youtube.com/@anchorbaptistchurchslc/streams)
  - [Instagram](https://www.instagram.com/anchorbaptistslc/)

## Design Inspiration

The website design was inspired by several other church websites, which can be found in [inspiration.md](inspiration.md).

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is proprietary and maintained by Anchor Baptist Church. All rights reserved.
