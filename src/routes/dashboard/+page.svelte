<script>
	import { PUBLIC_USERFRONT_ACCOUNT_ID } from '$env/static/public';

	import Userfront from '@userfront/toolkit/web-components';
	Userfront.init(PUBLIC_USERFRONT_ACCOUNT_ID);

	const { user } = Userfront;
</script>

<section class="m-5">
    <h1>Welcome {user.email}!</h1>
    <button on:click={() => Userfront.logout()} class="bg-orange-200 py-1 px-2 rounded-md hover:bg-orange-300">Log out</button>
</section>
