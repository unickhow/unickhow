<template>
  <div class="consistency my-12 flex flex-col gap-8 items-center justify-center !text-black md:-mx-16">
    <label class="tc-content-text">example 1: delete button in many ways</label>
    <div class="demo-delete-buttons flex gap-8 items-center justify-center">
      <button><Icon name="iconamoon:sign-times" class="text-[#8c8c8c] hover:text-[#FF0000]" /></button>
      <button><Icon name="ic:baseline-remove-circle-outline" /></button>
      <button><Icon name="ic:baseline-delete" class="text-[#8c8c8c]" /></button>
      <button class="text-[#FF2E2E]">Delete</button>
    </div>

    <label class="tc-content-text">example 2: modal in many ways</label>
    <div class="flex flex-col sm:flex-row gap-8 items-center justify-center w-full">
      <div class="demo-modal border-solid border-1 bg-white rounded flex-1">
        <div class="demo-modal__head p-2 border-b-solid border-1 flex justify-between">
          <h5>Modal title</h5>
          <button>
            <Icon name="ic:baseline-close" class="text-black" />
          </button>
        </div>
        <div class="demo-modal__body p-2">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Aspernatur, expedita!
        </div>
        <div class="demo-modal__foot p-2 border-t-solid border-1 flex justify-end">
          <button>Cancel</button>
          <button class="border-1 border-solid">OK</button>
        </div>
      </div>
      <div class="demo-modal border-solid border-1 bg-white rounded flex-1 p-2">
        <div class="demo-modal__head flex justify-between">
          <h5>Modal title</h5>
          <button>
            <Icon name="ic:baseline-close" class="text-black" />
          </button>
        </div>
        <div class="demo-modal__body py-4">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Aspernatur, expedita!
        </div>
        <div class="demo-modal__foot flex justify-end">
          <button>Cancel</button>
          <button class="border-1 border-solid">OK</button>
        </div>
      </div>
      <div class="demo-modal border-solid border-1 bg-white rounded flex-1">
        <div class="demo-modal__head p-2 border-b-solid border-1 flex justify-between">
          <h5>Modal title</h5>
          <button>
            <Icon name="ic:baseline-close" class="text-black" />
          </button>
        </div>
        <div class="demo-modal__body p-2 bg-[#eee]">
          <div class="rounded bg-white p-2">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Eius in explicabo fugit commodi nam! Incidunt.
          </div>
        </div>
        <div class="demo-modal__foot p-2 border-t-solid border-1 flex justify-between">
          <button>Cancel</button>
          <button class="border-1 border-solid">OK</button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.consistency .demo-modal {
  @apply shadow-xl;
}
.consistency .demo-delete-buttons button {
  @apply text-xl;
}

.consistency .demo-modal__foot button {
  @apply py-2 px-4 rounded text-black;
}
</style>
