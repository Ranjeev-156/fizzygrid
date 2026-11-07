# FizzyGrid

FizzyGrid is a central directory for independent web tools. The headquarters and every tool are separate deployments.

## Run locally

Requirements: Node.js 18 or newer.

```bash
npm install
npm run dev
```

Open the local URL printed by Vite.

## Build

```bash
npm run build
npm run preview
```

The production website is generated in `dist/`.

## Deploy to Cloudflare Pages (Free plan)

1. Create a GitHub repository and upload this project.
2. In Cloudflare, open **Workers & Pages** and create a Pages project.
3. Connect the GitHub repository.
4. Set the build command to `npm run build`.
5. Set the build output directory to `dist`.
6. Deploy. Your site will receive a `*.pages.dev` address.

No paid domain, database, server, or API is required for this headquarters version.

## Add an independently deployed tool

Edit `src/data/tools.js`.

Each tool has its own record:

```js
{
  id: "json-studio",
  name: "JSON Studio",
  description: "Format and validate JSON.",
  category: "developer",
  icon: "braces",
  tags: ["json", "formatter"],
  status: "Live",
  featured: true,
  updated: "Updated recently",
  url: "https://your-json-tool.pages.dev"
}
```

Only add the URL after the independent tool has been deployed and tested. The headquarters opens it in a new tab with `noopener,noreferrer`.

## Included functionality

- Responsive desktop and mobile layout
- Dark mode (`#000000`) and premium white light mode
- Theme preference saved in local storage
- Tool search and category filters
- Featured tools and A–Z sorting
- Favorites saved in local storage
- Recently used list saved in local storage
- Keyboard search shortcut: `Ctrl/Cmd + K`
- Reduced-motion support
- Independent tool URL catalogue

## Cost and privacy notes

The headquarters itself uses static hosting and browser storage. It does not currently require a database, login, analytics provider, AI API, or paid service. Google Fonts is optional; system font fallbacks are included. If you want the site to work without an external font request, remove the Google Fonts links from `index.html`.

Favorites and recently used tools are stored locally in each visitor's browser. They are not synced between devices or shared with other users.

## Before public launch

- Add and test real tool URLs.
- Replace placeholder tool statuses with accurate launch statuses.
- Add a contact / feedback channel if you want to receive user messages.
- Add a privacy notice if you later introduce analytics, accounts, or server-side data collection.
- Test keyboard navigation, contrast, mobile layout and all links.
