import { hc } from "hono/client";


import { AppType } from '@/app/api/[[...route]]/route';

const appUrl = (process.env.NEXT_PUBLIC_APP_URL || '').replace(/^﻿/, '') ||
  (typeof window !== 'undefined' ? window.location.origin : 'http://localhost:3000');

export const client = hc<AppType>(appUrl);