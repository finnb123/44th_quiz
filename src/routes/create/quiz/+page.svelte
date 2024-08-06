<script lang="ts">
  import type { ActionData, PageServerData } from "./$types";
  import MinorButton from "$lib/components/buttons/MinorButton.svelte";
  import Loading from "$lib/components/Loading.svelte";
  export let data: PageServerData;
  export let form: ActionData;
  $:({questions} = data);
  let checkboxes=[]
</script>

<div id="main" class=" bg-secondary p-12 flex justify-center items-center">
  <div id="content" class="w-3/4 bg-background p-12 py-16 rounded-xl">
      <form method="post" class="flex flex-col justify-center items-center">
        <h1 class="text-3xl text-headline pb-2">Create Quiz</h1>
        <!-- {#if form?.msg ==}<p class="text-highlight">Missing field required!</p>{/if} -->
        <div class='border border-headline rounded px-4 py-2'>
              <a href='/create/question' class='text-xl text-headline pb-4'>Create Questions Here</a>
        </div>
        
        <input
          class="w-1/2 p-2 my-2 mx-0 border border-solid border-stroke rounded-md text-lg"
          name="title"
          placeholder="Title"
          type="text"
          value={form?.title ?? ""}
        />
        {#await questions}
            <Loading />
        {:then loaded} 
          <table
            class="w-3/4 text-sm text-left rtl:text-right text-headline table-auto border-2 border-stroke"
          >
            <thead class="text-2xl text-headline uppercase bg-highlight">
              <tr>
                <th scope="col" class="px-4 py-3 w-8">ID</th>
                <th scope='col' class='px-2 py-3'>Select</th>
                <th scope="col" class="px-2 py-3">Title</th>

                <th scope="col" class="px-2 py-3">Image Path</th>
              </tr>
            </thead>

            <tbody class="text-xl text-headline">
              {#each loaded as { content, image_url, id }}
                  <tr
                    class="odd:bg-background even:bg-secondary odd:hover:text-highlight even:hover:text-background"
                  >
                    <th
                      scope="row"
                      class="px-4 py-4 first-letter:font-mediumext-headline whitespace-nowrap"
                      >{id}</th
                    >
                    <td><input class='text-headline text-xl' type="checkbox" value={id} name='questions'/></td>  <!--This is the checkbox for selecting the question -->
                    <td class="text-2xl px-2 py-4">{content}</td>
                    <td class="text-2xl px-2 py-4">{image_url ? image_url : 'None'}</td>
                  </tr>
              {/each}
            </tbody>
          </table>
        {/await}
        <div class="flex flex-col w-full max-w-96 items-center justify-center pt-4">
          <button
            class="w-full text-xl text-buttonText bg-button py-4 px-8 rounded-lg text-center"
            type="submit"
          >
            Create
          </button>
          <!-- <a class="mt-2 text-lg text-buttonText bg-button py-2 px-4 rounded-lg text-center" href="/"
            >Cancel
          </a> -->
          <MinorButton title="Cancel" path="/profile" class="mt-2 w-full" />
        </div>
      </form>

  </div>
</div>
