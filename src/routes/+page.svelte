<script lang="ts">
  import type { PageData } from "./$types";
  import PostCard from "$lib/components/PostCard.svelte";
  import Loading from "$lib/components/Loading.svelte";

  export let data: PageData;
  const { quizzes } = data;
</script>
<div class='flex justify-center items-center'>
  <h2 class='text-4xl text-paragraph'>Available Quizzes</h2>
</div>
<div id="main" class=" bg-secondary pt-4 p-12 flex justify-center items-center">
    {#await quizzes}
      <Loading />
    {:then loaded}
      <table
        class="w-1/2 text-sm text-left rtl:text-right text-headline table-auto border-2 border-stroke"
      >
        <thead class="text-2xl text-headline uppercase bg-highlight">
          <tr>
            <th scope="col" class="px-4 py-3 w-8">#</th>
            <th scope='col' class='px-2 py-3'>ID</th>
            <th scope="col" class="px-2 py-3">Title</th>
          </tr>
        </thead>

        <tbody class="text-xl text-headline">
          {#each loaded as { title, id }, i}
            <a href="/p/{id}" class="contents">
              <tr
                class="odd:bg-background even:bg-secondary odd:hover:text-highlight even:hover:text-background"
              >
                <th
                  scope="row"
                  class="px-4 py-4 first-letter:font-mediumext-headline whitespace-nowrap"
                  >{i + 1}</th
                >
                <td class='text-2xl px-2 py-4'>{id}</td>
                <td class="text-2xl px-2 py-4">{title}</td>
              </tr>
            </a>
          {/each}
        </tbody>
      </table>
    {/await}
</div>