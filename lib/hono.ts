import { hc } from "hono/client";


import { AppType } from '@/app/api/[[...route]]/route';

export const client = hc<AppType>(
  process.env.NEXT_PUBLIC_APP_URL ||
  (typeof window !== 'undefined' ? window.location.origin : 'http://localhost:3000')
);