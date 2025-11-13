FarmAid AI — Frontend
=====================

Concise README describing what was built, how to run it, and next steps.

Project summary
---------------
FarmAid AI is a mobile-first, multi-language Next.js frontend that helps farmers identify plant diseases from images, view confidence scores, get tailored product recommendations, and contact agronomy experts. The UI is accessible, animated with Framer Motion, and wired to a typed Axios API client ready for backend integration.

Core features
-------------
- Image upload (drag & drop and file picker) with preview and validation
- AI diagnosis result with confidence score and tailored recommendations
- Marketplace for recommended products (filters, ratings, buy link)
- Expert directory with WhatsApp and email contact
- Multi-language UI (English, Igbo, Hausa, Yoruba) with persisted preference
- Global state using Zustand and animations via Framer Motion

Tech stack
----------
- Next.js (App Router) + React + TypeScript
- Tailwind CSS v4 (custom color palette)
- Zustand (state)
- Axios (API client)
- Framer Motion (animations)

Important files & layout
------------------------
- `app/` — Next.js pages & layout (`app/layout.tsx`, `app/globals.css`)
- `components/` — Reusable UI components (Navbar, UploadBox, ResultCard, ProductCard, ExpertCard)
- `store/useAppStore.ts` — Zustand global state
- `services/api.ts` — Centralized Axios client and typed methods
- `hooks/useTranslation.ts` and `utils/translations.ts` — i18n system
- `DEVELOPER_GUIDE.md` / `DEPLOYMENT_GUIDE.md` — developer & deployment docs

Quick start (development)
-------------------------
Open a bash terminal in the project root and run:

```bash
npm install
npm run dev
```

Build & run production
----------------------

```bash
npm run build
npm start
```

Environment variables
---------------------
Create a `.env.local` file and set at least:

```env
NEXT_PUBLIC_API_URL=https://api.yourdomain.com/api
NEXT_PUBLIC_SENTRY_DSN= # optional
```

Minimal backend contract (what the frontend expects)
--------------------------------------------------
1) POST /predict
   - Accepts: multipart/form-data with field `image`
   - Returns JSON:
     ```json
     {
       "disease": "Late blight",
       "confidence": 92.5,
       "recommendations": [
         { "id": "r1", "title": "Fungicide A", "description": "Apply as directed", "type": "product", "productIds": ["p1"] }
       ]
     }
     ```

2) GET /products
   - Returns product list: `{ id, name, description, price, type, image, vendor, rating }`

3) GET /experts
   - Returns expert list: `{ id, name, specialty, location, whatsapp, email, rating, experience }`

How to connect a real backend
-----------------------------
- Implement the `/predict` endpoint to accept an image and return the `DiagnosisResult` shape above.
- Implement `/products` and `/experts` or point `services/api.ts` to existing endpoints.
- Update `NEXT_PUBLIC_API_URL` to the deployed backend URL.

Next steps & suggestions
------------------------
- Integrate authentication and a diagnosis history for users
- Add payment integration (Paystack / Flutterwave) for Marketplace purchases
- Add unit tests (Jest + React Testing Library) and E2E tests (Playwright)
- Consider PWA/Offline support for low-connectivity environments

Where to find more info
----------------------
- `DEVELOPER_GUIDE.md` — developer patterns, conventions, hooks, and examples
- `DEPLOYMENT_GUIDE.md` — deployment options and CI/CD guidance

