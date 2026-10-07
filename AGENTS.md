# HDS component library

This repository contains components, visual recipes, a documentation gallery and Codex skills. It is not a portfolio application. Keep public exports generic and avoid adding personal site pages, project data, private information or third-party assets from client projects.

Prefer React + Vite, Tailwind and daisyUI. Use TanStack Router/Query/Table, React Hook Form + Yup, Zustand and date-fns when a consuming application actually requires them. Keep ESLint and Prettier checks passing. Gallery hosting targets Vercel.

Do not bundle ReactBits TechText source: see docs/tech-text.md. Preserve shadcn and font licenses. Skills must remain usable after being installed without the original checkout. After changing source or previews, run node scripts/sync-skill-assets.mjs before installing skills.
