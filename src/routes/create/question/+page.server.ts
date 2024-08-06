import { fail, json, redirect } from "@sveltejs/kit";
import { z } from "zod";
import prisma from "$lib/server/prisma";
import type { Actions, PageServerLoad } from "./$types";

export const actions = {
  default: async ({ request, locals }) => {
    if (!locals.user) {
      return fail(401, { msg: "No user" });
    }
    const { username } = locals.user;

    const formData = await request.formData();
    const object = Object.fromEntries(formData.entries());
    const Schema = z.object({
      content: z.string(),
      image_path: z.string().optional(),
      answers: z.string()
    });
    const { success, error, data } = Schema.safeParse(object);
    if (!success) {
      return fail(422, { msg: error.message });
    }

    const { content, image_path, answers } = data;
    const answersArray = answers.replace(/ /g,'').split(",");
    let answersList = answersArray.map((answer) => { 
      return {'content' : answer}
    });

    let answersIds = await prisma.answer.createManyAndReturn({
      select: { id: true },
      data: [
        ...answersList
      ]
    });
    const jsonAnswerIds = JSON.stringify(answersIds);
    await prisma.question.create({
      data: {
        content,
        image_url: image_path,
        answers: jsonAnswerIds,
      },
    });3

    return redirect(303, "/profile");
  },
} satisfies Actions;

export const load: PageServerLoad = (async (event) => {
  if (!event.locals.user) redirect(302, "/auth/login");
}) satisfies PageServerLoad;
