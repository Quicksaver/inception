# Inception Webapp

- [Inception Webapp](#inception-webapp)
  - [Technologies and Tools](#technologies-and-tools)
    - [Frontend Framework](#frontend-framework)
    - [Content Management](#content-management)
    - [Development Tools](#development-tools)
    - [Design](#design)
    - [Hosting \& Deployment](#hosting--deployment)
  - [How to Run](#how-to-run)

## Technologies and Tools

### Frontend Framework

- [Next.js](https://nextjs.org/) 16 with App Router
  - leverages [React](https://react.dev/) 19 with server-side rendering
- [TypeScript](https://www.typescriptlang.org/) for type safety
- [Radix UI](https://www.radix-ui.com/) primitives for accessible components
- SCSS with BEM methodology for styling

### Content Management

- [Sanity CMS](https://www.sanity.io/) with Studio
  - Real-time content updates and preview
  - Structured content with Portable Text

### Development Tools

- [ESLint](https://eslint.org/) with Next.js config and custom rules
- [Stylelint](https://stylelint.io/) for SCSS linting
- [Prettier](https://prettier.io/) for code formatting
- Type generation for Sanity schemas

### Design

- Custom design in [Figma](https://figma.com)
  - Responsive and mobile-first approach
  - Accessible and intuitive UI

### Hosting & Deployment

- [GitHub](https://github.com) for source code hosting and version control
- [Vercel](https://vercel.com) with automatic deployments
  - Global CDN for fast content delivery
  - Automatic SSL certificates and DDoS protection

## How to Run

To clone and run this application, you'll need

- [Git](https://git-scm.com)
- [Node.js](https://nodejs.org/en/download/)
  - [Corepack Enabled](https://nodejs.org/api/corepack.html)

From your command line:

```bash
# Clone this repository
$ git clone https://github.com/Quicksaver/inception

# Go into the repository
$ cd inception

# Enable corepack
$ corepack enable

# Install dependencies
$ yarn

# Local dev run the website
$ yarn dev
```
