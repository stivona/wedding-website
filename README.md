# Shannon & Austin Wedding Website

A beautiful wedding website built with Next.js 14 and Tailwind CSS, designed to match the elegant olive green and cream aesthetic from the save-the-date coasters.

## Getting Started

1. **Install dependencies:**
   ```bash
   yarn install
   ```

2. **Run the development server:**
   ```bash
   yarn dev
   ```

3. **Open [http://localhost:3000](http://localhost:3000)** to view the website.

## Pages

- **Home** (`/`) - Welcome page with names, date, and quick info
- **Schedule** (`/schedule`) - Ceremony and reception details with maps
- **Accommodations** (`/accommodations`) - Hotels, room block info, and camping option

## External Links (Navigation)

The navigation includes placeholder links for:
- **Registry** - Update the `href` in `components/Navigation.tsx` when ready
- **RSVP** - Update the `href` in `components/Navigation.tsx` when ready

## Customization

### Colors
Edit `tailwind.config.ts` to adjust the color palette:
- `olive` - Primary green color (#3A5635)
- `cream` - Background color (#FAF8F5)

### Fonts
- **Headings**: Paradise Seashore (local font in `app/fonts/`)
- **Body**: Libre Franklin (Google Font)

### Content
- Update venue details in `app/schedule/page.tsx`
- Update hotel information in `app/accommodations/page.tsx`
- Modify the welcome message in `app/page.tsx`

## Deployment

This project is configured for [Vercel](https://vercel.com):

1. Push your code to a Git repository
2. Import the project in Vercel
3. Deploy!

Or use the Vercel CLI:
```bash
npx vercel
```

## Tech Stack

- [Next.js 14](https://nextjs.org/) - React framework
- [Tailwind CSS](https://tailwindcss.com/) - Styling
- [TypeScript](https://www.typescriptlang.org/) - Type safety


