<script lang="ts">
  import type { ActionData } from "./$types";
  import MinorButton from "$lib/components/buttons/MinorButton.svelte";

  export let form: ActionData;
</script>

<div id="main" class=" bg-secondary p-12 flex justify-center items-center">
  <div id="content" class="w-3/4 bg-background p-12 py-16 rounded-xl">
    <form method="post" class="flex flex-col justify-center items-center">
      <h1 class="text-3xl text-headline pb-2">Create Question</h1>
      <!-- {#if form?.msg ==}<p class="text-highlight">Missing field required!</p>{/if} -->
      <a href='/create/quiz' class='text-xl text-headline pb-4'>Create Quizzes Here</a>
      <textarea
        class="w-full p-2 my-2 mx-0 border border-solid border-stroke rounded-md text-lg"
        name="content"
        cols="25"
        placeholder="Content"
        rows="8"
        value={form?.content ?? ""}
      />      
      <textarea
        class="w-full p-2 my-2 mx-0 border border-solid border-stroke rounded-md text-lg"
        name="answers"
        cols="25"
        placeholder="Answers: A, B, C, D. Anwers must be seperated by a comma."
        rows="8"
        value={form?.answers ?? ""}
      />      
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