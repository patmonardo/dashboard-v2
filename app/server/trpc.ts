import { initTRPC } from '@trpc/server';
import superjson from 'superjson';
import { prisma } from '../utils/prisma';

const t = initTRPC.context<{ prisma: typeof prisma }>().create({
    transformer: superjson,
});

export const router = t.router;
export const publicProcedure = t.procedure;
