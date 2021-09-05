<template>
  <div
    class="bg-gray-900 text-gray-200 p-2 max-w-screen-md flex flex-col"
    @click.stop
  >
    <h3 class="text-2xl text-center mb-2">
      Share your build
    </h3>
    <p class="p-2 mb-2 bg-blue-900 rounded">
      To share a build you just need to copy link and send it to someone, although because link is pretty
      long I recommend to use url shortener like 
      <a
        class="text-blue-400"
        href="https://www.shorturl.at"
        target="_blank"
        rel="noopener noreferrer"
      >shorturl</a>.
    </p>
    <a
      ref="link"
      :href="shareLink"
      target="_blank"
      rel="noopener noreferrer"
      class="bg-gray-800 text-blue-400 p-1 text-sm"
    >{{ domen + shareLink }}</a>
    <button
      class="bg-gray-700 px-4 py-2 rounded mt-2 hover:bg-gray-600"
      @click="copyShareLink"
    >
      COPY LINK
    </button>
  </div>
</template>

<script>
export default {
  name: "Share",
  props: {
    shareLink: {
      type: String,
      default: ""
    }
  },
  computed: {
    domen() {
      return window.location.protocol + "//" + window.location.hostname;
    },
  },
  methods: {
    copyShareLink() {
      navigator.clipboard.writeText(this.$refs.link.href);
    },
  }
}
</script>

<style>

</style>