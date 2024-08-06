import prisma from "$lib/server/prisma";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async () => {
  // should also be a function
  const response = prisma.quiz.findMany({
    where: { published: true },
    select: {
      title: true,
      id: true,
    },
  });
  return { quizzes: response };
};

// export const actions: Actions = {
//     // signout: async (event) => {
//     //     if (!event.locals.session) {
//     //         return fail(401)
//     //     }
//     //     await lucia.invalidateSession(event.locals.session.id);
//     //     const sessionCookie = lucia.createBlankSessionCookie();
//     //     event.cookies.set(sessionCookie.name, sessionCookie.value, {
//     //         path: ".",
//     //         ...sessionCookie.attributes
//     //     });
//     //     redirect(302, "/")
//     // },
//     // signin: async (event) => {redirect(302, "/auth/signin") }
// } satisfies Actions;
