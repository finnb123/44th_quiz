<script lang="ts">
  import type { PageData } from "./$types";
  import Post from "$lib/components/Post.svelte";
  import FormButton from "$lib/components/buttons/FormButton.svelte";

  export let data: PageData;
  $: ({ quiz } = data);
  let editQuiz = false;
  $: name = editQuiz ? "Cancel" : "Edit Quiz";
</script>

<div class="flex flex-col items-center justify-center bg-secondary basis-3/4">
  <div class="w-3/4 h-3/4 rounded-xl bg-background py-12">
      {#if editQuiz}
      <form method="post" class="flex flex-col justify-center items-center">
        <h1 class="text-3xl text-headline pb-4">Edit Post</h1>
        <input
          class="w-3/4 p-2 my-2 mx-0 border border-solid border-stroke rounded-md text-3xl"
          name="title"
          type="text"
          value={quiz.title ?? ""}
        />
        <!-- <textarea
          class="w-3/4 h-full p-2 my-2 border border-solid border-stroke rounded-md text-lg"
          name="content"
          cols="80"
          rows="20"
          value={post.content ?? ""}
        /> -->

        <FormButton title="Save Changes" action="updateQuiz" />
      </form>
    {:else}
    <div class="w-3/4 h-3/4 px-10 py-4">
      <h1 class='text-3xl text-headline'>{quiz.title}</h1>
      <h2 class='text-2xl text-headline'>Published: {quiz.published}</h2>
      {#if quiz.published}
        <p class='text-headline'>Tip: To delete or edit a quiz, you must first Un-Publish it.</p>
      {/if}
    </div>
    {/if}
  </div>
  <div class="my-0 mx-auto mt-12 mb-8 text-center">
    <form method="post" class="actions">
      {#if !quiz.published}
        <FormButton title="Publish" action="publishPost" />
        <button
        class="w-40 p-2 rounded-lg bg-button text-buttonText text-2xl peer-last:ml-8"
        type="button"
        on:click={() => (editQuiz = !editQuiz)}
        >
        {name}
        </button>
        <FormButton title="Delete" action="deletePost" />
      {:else}
        <FormButton title="Un-Publish" action='revokePost'/>
      {/if}
    </form>
  </div>
</div>
