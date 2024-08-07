import { fail, redirect } from '@sveltejs/kit';
import { z } from 'zod';
import prisma from '$lib/server/prisma';
import type { Actions, PageServerLoad } from './$types';

export const actions = {
	default: async ({ request, locals }) => {
		if (!locals.user) {
			return fail(401, { msg: 'No user' });
		}
		const { username } = locals.user;

		const formData = await request.formData();
		const object = Object.fromEntries(formData.entries());
		console.log(JSON.stringify(formData.entries()));
		const Schema = z.object({
			title: z.string(),
			questions: z.array(z.number())
		});
		const { success, error, data } = Schema.safeParse(object);

		if (!success) {
			return fail(422, { msg: error.message });
		}
		const { title, questions } = data;
		const jsonQuestions = JSON.stringify(questions);
		await prisma.quiz.create({
			data: {
				title,
				questions: jsonQuestions
			}
		});

		return redirect(303, '/profile');
	}
} satisfies Actions;

export const load: PageServerLoad = (async (event) => {
	if (!event.locals.user) redirect(302, '/auth/login');
	const response = prisma.question.findMany({
		select: {
			id: true,
			content: true,
			image_url: true
		}
	});
	return { questions: response };
}) satisfies PageServerLoad;
