import { redirect } from '@sveltejs/kit';

// merge the cart in local storage with the user's cart

// Protected route. Redirect if not logged in.
export const load = async ({ locals }) => {
	if (!locals.auth) throw redirect(302, `/login`);
};

