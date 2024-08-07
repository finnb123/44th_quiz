import { redirect } from '@sveltejs/kit';
import prisma from '$lib/server/prisma';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async (event) => {
	// don't auth
	if (!event.locals.user) redirect(302, '/auth/login');
	const { id, username } = event.locals.user;
	const quizzes = prisma.quiz.findMany({});
	return {
		username,
		quizzes
	};
};
