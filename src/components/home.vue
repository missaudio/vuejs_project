<template>
  <v-container>
    <v-row class="text-center pt-10">
      <v-col cols="12" class="pt-16">
        <v-avatar color="black" size="190">
          <v-img
            src="https://media.istockphoto.com/photos/cat-fun-picture-picture-id473619896?b=1&k=20&m=473619896&s=170667a&w=0&h=OLb-N5BYIoLM_PREj6HVSEjgmHMY2TJ_bbfk0OdAFEs="
            class="my-3"
            contain
            height="200"
          />
        </v-avatar>
      </v-col>

      <v-col class="mb-4">
        <p class="pl-16 mb-3">Your contents will be previewed here</p>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "HelloWorld",

  data: () => ({}),
};
</script>
