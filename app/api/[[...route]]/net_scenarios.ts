import { zValidator } from '@hono/zod-validator';
import { eq, inArray } from 'drizzle-orm';
import { Hono } from 'hono';
import { z } from 'zod';

import { db } from '@/db/drizzle';
import { netScenario, insertNetScenarioSchema, type NewNetScenario } from '@/db/schema';

const app = new Hono()
  .get('/', async (c) => {

    const data = await db.select().from(netScenario);

    return c.json({ data });
  })
  .get(
    '/:id',
    zValidator(
      'param',
      z.object({
        id: z.string()
      })
    ),
    async (c) => {
      const { id } = c.req.valid('param');

      const [data] = await db
        .select()
        .from(netScenario)
        .where(eq(netScenario.id, parseInt(id)));

      if (!data) {
        return c.json({ error: 'Not found' }, 404);
      }

      return c.json({ data });
    }
  )
  .post(
    '/',
    zValidator(
      'json',
      insertNetScenarioSchema.omit({ id: true })
    ),
    async (c) => {
      const body = c.req.valid('json');

      const [data] = await db.insert(netScenario).values(body as Omit<NewNetScenario, 'id'>).returning();
      return c.json({ data });
    }
  )
  .post(
    '/bulk-create',
    zValidator(
      'json',
      z.array(insertNetScenarioSchema.omit({ id: true }))
    ),
    async (c) => {
      const values = c.req.valid('json');

      await db.delete(netScenario);
      const data = await db.insert(netScenario).values(values as Omit<NewNetScenario, 'id'>[]).returning();

      return c.json({ data });
    }
  )
  .post(
    '/bulk-delete',
    zValidator(
      'json',
      z.object({
        ids: z.array(z.number())
      })
    ),
    async (c) => {
      const { ids } = c.req.valid('json');

      try {
        const data = await db
          .delete(netScenario)
          .where(inArray(netScenario.id, ids))
          .returning({ id: netScenario.id });

        return c.json({ data });
      } catch (error) {
        console.error('Bulk delete error:', error);
        return c.json({ error: 'Internal Server Error' }, 500);
      }
    }
  )
  .delete(
    '/:id',
    zValidator(
      'param',
      z.object({
        id: z.string()
      })
    ),
    async (c) => {
      const { id } = c.req.valid('param');

      const [data] = await db
        .delete(netScenario)
        .where(eq(netScenario.id, parseInt(id)))
        .returning();

      if (!data) {
        return c.json({ error: 'Not found' }, 404);
      }

      return c.json({ data });
    }
  )
  .patch(
    '/:id',
    zValidator(
      'param',
      z.object({
        id: z.string()
      })
    ),
    zValidator(
      'json',
      insertNetScenarioSchema.omit({ id: true }).partial()
    ),
    async (c) => {
      const { id } = c.req.valid('param');
      const values = c.req.valid('json');

      const processedValues = {
        ...values,
        updatedAt: new Date()
      } as Partial<NewNetScenario>;

      const [data] = await db
        .update(netScenario)
        .set(processedValues)
        .where(eq(netScenario.id, parseInt(id)))
        .returning();

      if (!data) {
        return c.json({ error: 'Not found' }, 404);
      }

      return c.json({ data });
    }
  );

export default app;
