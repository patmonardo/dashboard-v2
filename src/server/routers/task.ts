import { z } from 'zod';
import { router, publicProcedure } from '../trpc';

export const taskRouter = router({
    list: publicProcedure.query(async ({ ctx }) => {
        return ctx.prisma.task.findMany({
            orderBy: { createdAt: 'desc' }
        });
    }),

    create: publicProcedure
        .input(z.object({ text: z.string().min(1) }))
        .mutation(async ({ ctx, input }) => {
            return ctx.prisma.task.create({
                data: { text: input.text }
            });
        }),

    toggle: publicProcedure
        .input(z.object({ id: z.string(), completed: z.boolean() }))
        .mutation(async ({ ctx, input }) => {
            return ctx.prisma.task.update({
                where: { id: input.id },
                data: { completed: input.completed }
            });
        })
});
