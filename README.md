# yhsite

Static personal site for Yossi Hertzberg with a lightweight retro look and simple hyperlink-based navigation.

## Local development

This repo is set up to use `pnpm` as the package manager, but the site itself is dependency-free.

```bash
pnpm dev
```

The local dev server runs at `http://localhost:4321`.

## Build

```bash
pnpm build
```

This copies the site from `src/` into `dist/`, which is the directory to deploy.

## Cloudflare Pages

Use these settings in Cloudflare Pages:

- Framework preset: `None`
- Build command: `pnpm build`
- Build output directory: `dist`

If your Cloudflare project needs `pnpm`, enable it with a recent Node version in Pages settings. After deployment, attach your custom domain in the Cloudflare Pages dashboard.

## Editing content

The main content lives in [src/index.html](/Users/yossi/git/yhsite/src/index.html) and the styling lives in [src/styles.css](/Users/yossi/git/yhsite/src/styles.css).

Project and profile URLs were not included in the initial content, so their labels are shown as plain text placeholders for now. You can convert them into links directly in the HTML whenever you have the URLs ready.
