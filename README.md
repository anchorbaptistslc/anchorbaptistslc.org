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

- [Hugo Extended](https://gohugo.io/installation/) (v0.153.5 or later)
- [Node.js](https://nodejs.org/) (v18 or later)
- [npm](https://www.npmjs.com/) (usually comes with Node.js)
- [Image Magick](https://imagemagick.org) (On MacOS: `brew install imagemagick`)
- [Exiftool](https://exiftool.org) (On MacOS: `brew install exiftool`)

### Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/anchorbaptistslc/anchorbaptistslc.org.git
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

To test the editor with the local git repo vs the remote:

4. Start the CMS proxy server:
```bash
npx netlify-cms-proxy-server
```

### Building for Production

```bash
npm run build:prod
```

We use Image Magick and Exiftool in the production build to capture any images in the uploads directory with
non-sRGB color profiles (i.e. Adobe RGB) and re-encode the webp images with the same color profile as the original.
This ensure the site images retain the color of the original image intent.

## Automated Deployments

The site automatically redeploys every Tuesday at 8:00 AM Mountain Standard Time (3:00 PM UTC) to ensure:
- Expired events are removed from the site
- Content updates are published without manual intervention

This is implemented using a Netlify Scheduled Function that triggers a build hook. The function is located at `netlify/functions/scheduled-deploy.js`.

### How It Works

- **Schedule**: Every Tuesday at 3:00 PM UTC (8:00 AM MST / 7:00 AM MDT)
- **Implementation**: Netlify Scheduled Function with cron schedule `0 15 * * 2`
- **Trigger Method**: POST request to Netlify Build Hook
- **Configuration**: Uses environment variable for build hook URL

### Setup Instructions

1. **Get Build Hook URL** from Netlify:
   - Go to Netlify Dashboard > Site Settings > Build & Deploy > Build Hooks
   - Create a new build hook (or use existing one)
   - Copy the full URL (e.g., `https://api.netlify.com/build_hooks/YOUR_HOOK_ID`)

2. **Set Environment Variable** in Netlify:
   - Go to Netlify Dashboard > Site Settings > Environment Variables
   - Add variable: `NETLIFY_BUILD_HOOK_URL`
   - Value: Paste the build hook URL from step 1
   - Scopes: Select "All" or "Functions"

3. **For Local Testing** (optional):
   - Copy `.env.example` to `.env`
   - Add your build hook URL to `.env`
   - **Never commit `.env` to git** (already in `.gitignore`)

### Monitoring Deployments

- Check function logs in the Netlify dashboard under Functions
- View deployment history in the Netlify dashboard under Deploys
- Failed deployments will appear in function logs with error details

### Modifying the Schedule

To change the deployment schedule, edit the cron expression in `netlify/functions/scheduled-deploy.js`:

```javascript
export default schedule("0 15 * * 2", handler); // Tuesday at 3pm UTC
```

Cron format: `minute hour day-of-month month day-of-week` (in UTC)

Examples:
- Daily at 3pm UTC: `0 15 * * *`
- Monday & Thursday at 3pm UTC: `0 15 * * 1,4`
- First of month at 3pm UTC: `0 15 1 * *`

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

4. **Academy Page** (K-6th grade school mini-site)
   ```bash
   hugo new --kind academy academy/_index.md
   ```
   The academy page is a single-page mini-site with sections for About, Academics, Admissions, Tuition, Policies, and Contact.

Each archetype includes pre-configured frontmatter with the necessary fields and structure. See the [theme documentation](themes/anchor-theme/README.md) for more details about each content type.

### Logos and Graphics

The site includes several logos and graphics for branding and special occasions:

**Main Logos:**
- `logo-anchor-white.png` / `logo-anchor-yellow.png` - Standard church logos
- `logo-anchor-60th-text.png` - 60th anniversary logo
- `logo-anchor-60th-text-lifting-up-jesus.png` - 60th anniversary with tagline
- `logo-anchor-2026-making-a-difference.png` - 2026 annual theme logo

**Graphics:**
- `city-skyline-graphic.png` - Salt Lake City skyline footer graphic
- `city-skyline-making-a-difference.png` - Skyline with 2026 theme
- `city-skyline-65-years.png` - Skyline with 65 years celebration

Logos and graphics are located in `themes/anchor-theme/assets/images/` and `themes/anchor-theme/assets/images/graphics/`.

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
