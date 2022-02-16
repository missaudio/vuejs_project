<template>
  <div id="videoPreview" class="text-center container pt-16 pa-4">
    <div v-if="link.split(';')[0].split('/')[1] == 'pdf'">
      <pdf
        :src="link"
        @num-pages="pageCount = $event"
        @page-loaded="callMe"
        v-for="i in currentPage"
        :key="i"
        width="100%"
        :page="i"
      ></pdf>
    </div>
    <iframe
      v-else-if="link.split(':')[0] != 'data'"
      id="video"
      width="96%"
      height="496px"
      :src="link + '?autoplay=1'"
    >
    </iframe>

    <vue-calendly
      v-else-if="link.split('//')[1].split('/')[0] == 'calendly.com'"
      :url="link"
      height="100vh"
    ></vue-calendly>

    <video
      v-else
      width="96%"
      height="496px"
      id="video-preview"
      controls
      autoplay
      :src="link"
    />
  </div>
</template>

<script>
import pdf from "vue-pdf";

export default {
  components: {
    pdf,
  },
  props: ["link"],
  data() {
    return {
      currentPage: 1,
      pageCount: 0,
    };
  },
  methods: {
    callMe() {
      this.currentPage++;
    },
  },
};
</script>

<style scoped>
#video,
#video-preview {
  border-radius: 7px;
  border: none;
}
</style>


