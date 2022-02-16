<template>
  <v-app>
    <v-app-bar app flat color="white" height="auto">
      <div class="d-flex align-center pl-16">
        <v-toolbar-title>Cratt Journey</v-toolbar-title>&nbsp;
        <span><v-icon small>edit</v-icon></span>
      </div>

      <v-spacer></v-spacer>
      <v-btn text small @click="$router.push({ name: 'Home' })">
        <span class="text-capitalize mr-2"
          ><v-icon small>dashboard</v-icon> Contents</span
        >
      </v-btn>
      <v-btn text small>
        <span class="text-capitalize mr-2">
          <v-icon small>share</v-icon> Share</span
        >
      </v-btn>

      <v-btn text small>
        <span class="text-capitalize mr-2">
          <v-icon small>download_done</v-icon> Insights</span
        >
      </v-btn>
      <v-spacer></v-spacer>
      <v-btn small>
        <span class="text-capitalize mr-2">
          <v-icon small>preview</v-icon>Preview</span
        >
      </v-btn>
    </v-app-bar>

    <v-main class="grey lighten-5">
      <router-view />
    </v-main>

    <v-navigation-drawer
      app
      v-model="drawer"
      absolute
      floating
      width="400"
      permanent
      class="pt-16 pl-4 grey lighten-4"
    >
      <v-list nav dense>
        <v-list-item>
          <v-list-item-title
            >Add section header (Optional) &nbsp;
            <span><v-icon small>edit</v-icon></span>
          </v-list-item-title>
        </v-list-item>
        <v-list-item-group
          v-model="group"
          active-class="deep-purple--text text--accent-4"
        >
          <v-list-item
            class="white"
            v-if="!addContentClicked"
            @click="
              addContentClicked = true;
              $router.push({
                name: 'Home',
              });
            "
          >
            <v-list-item-title
              ><v-icon>add</v-icon>Add content</v-list-item-title
            >
          </v-list-item>
        </v-list-item-group>

        <v-list-item
          v-if="addContentClicked"
          class="white pa-2 pt-10"
          style="border-radius: 5px"
        >
          <v-list-item-content class="pa-3">
            <v-layout row wrap justify-space-around>
              <v-flex xs9>
                <span>Content types </span>
              </v-flex>
              <v-flex xs2 class="text-right">
                <v-btn
                  small
                  text
                  @click="
                    addContentClicked = false;
                    whichContentSelected = '';
                    youtubeLink = '';
                    videoLink = '';
                    formLink = '';
                    $router.push({
                      name: 'Home',
                    });
                  "
                >
                  <v-icon class="red--text">close</v-icon></v-btn
                >
              </v-flex>
            </v-layout>
            <v-layout row wrap class="pt-4" v-if="whichContentSelected == ''">
              <v-flex
                xs4
                v-for="(contentType, i) in contentTypes"
                :key="i"
                class="pa-2"
              >
                <v-btn text x-small @click="clickContenttype(contentType.name)">
                  <span class="text-capitalize"
                    ><v-icon x-small>{{ contentType.icon }} </v-icon> &nbsp;
                    {{ contentType.name }}</span
                  >
                </v-btn>
              </v-flex>
            </v-layout>

            <v-layout row wrap class="pt-4" justify-space-around>
              <v-flex
                xs8
                v-if="whichContentSelected == 'Videos'"
                class="text-center"
              >
                <v-flex xs12 class="text-center">
                  <v-btn
                    text
                    class="grey lighten-3"
                    @click="simulateInputfileClicked"
                  >
                    <span class="text-capitalize">Select video</span>
                  </v-btn>
                </v-flex>

                <v-flex xs12 class="text-center"
                  ><br />
                  <p>Or</p>
                </v-flex>
                <v-text-field
                  prepend-icon="link"
                  v-model="youtubeLink"
                  style="font-size: 11px"
                  :rules="[(v) => !!v || 'required']"
                  label="Enter YouTube link"
                  required
                ></v-text-field>

                <v-btn x-small text dark class="primary" @click="uploadVideo">
                  <span class="text-capitalize">Upload video</span>
                </v-btn>
              </v-flex>

              <v-flex
                xs8
                v-if="whichContentSelected == 'Forms'"
                class="text-center"
              >
                <v-text-field
                  prepend-icon="link"
                  v-model="formLink"
                  style="font-size: 11px"
                  :rules="[(v) => !!v || 'required']"
                  label="Enter form link"
                  required
                ></v-text-field>

                <v-btn x-small text dark class="primary" @click="uploadForm">
                  <span class="text-capitalize">Open form</span>
                </v-btn>
              </v-flex>

              <v-flex
                xs8
                v-if="whichContentSelected == 'Calendar'"
                class="text-center"
              >
                <v-text-field
                  prepend-icon="link"
                  v-model="calendlyLink"
                  style="font-size: 11px"
                  :rules="[(v) => !!v || 'required']"
                  label="Enter calendly link"
                  required
                ></v-text-field>

                <v-btn
                  x-small
                  text
                  dark
                  class="primary"
                  @click="uploadCalendly"
                >
                  <span class="text-capitalize">Open calendly</span>
                </v-btn>
              </v-flex>
            </v-layout>

            <input
              type="file"
              accept="video/*"
              ref="selectVideo"
              style="display: none"
              @change="OnInputFile"
            />

            <input
              type="file"
              ref="selectFile"
              style="display: none"
              accept="application/pdf"
              @change="OnInputAllFile"
            />
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
  </v-app>
</template>

<script>
export default {
  name: "App",

  data: () => ({
    drawer: true,
    group: null,
    addContentClicked: false,
    files: [],
    video: "",
    pdfFile: "",
    whichContentSelected: "",
    youtubeLink: "",
    formLink: "",
    calendlyLink: "",
    allFiles: [],

    contentTypes: [
      { name: "Videos", icon: "video_library" },
      { name: "Slides", icon: "picture_as_pdf" },
      { name: "Calendar", icon: "access_time" },

      { name: "Documents", icon: "book" },
      { name: "Forms", icon: "supervisor_account" },
      { name: "External link", icon: "link" },
    ],
  }),

  methods: {
    OnInputFile(e) {
      const files = e.target.files;
      this.files = [];
      Array.from(files).forEach((file) => this.addVideo(file));
    },
    simulateInputfileClicked() {
      if (this.whichContentSelected == "Videos") this.$refs.selectVideo.click();
    },

    clickContenttype(selected) {
      this.whichContentSelected = selected;

      if (this.whichContentSelected == "Slides") this.$refs.selectFile.click();
    },

    uploadVideo() {
      if (this.youtubeLink != "") {
        this.$router.push({
          name: "contentPreview",
          params: {
            link: this.youtubeLink,
          },
        });
        this.addContentClicked = false;
        this.whichContentSelected = "";
      } else alert("Please enter youtube link");
    },

    uploadForm() {
      if (this.formLink != "") {
        this.$router.push({
          name: "contentPreview",
          params: {
            link: this.formLink,
          },
        });
        this.addContentClicked = false;
        this.formLink = "";
        this.whichContentSelected = "";
      } else alert("Please enter form link");
    },

    uploadCalendly() {
      if (this.calendlyLink != "") {
        this.$router.push({
          name: "contentPreview",
          params: {
            link: this.calendlyLink,
          },
        });
        this.addContentClicked = false;
        this.calendlyLink = "";
        this.whichContentSelected = "";
      } else alert("Please enter calendly link");
    },

    OnInputAllFile(e) {
      const files = e.target.files;
      this.allFiles = [];
      Array.from(files).forEach((file) => this.addFiles(file));
    },
    addVideo(file) {
      this.files.push(file);
      const reader = new FileReader();
      reader.onload = (f) => {
        this.video = f.target.result;

        this.$router.push({
          name: "contentPreview",
          params: {
            link: this.video,
          },
        });

        this.addContentClicked = false;
      };
      reader.readAsDataURL(file);
    },
    addFiles(file) {
      this.allFiles.push(file);
      const reader = new FileReader();
      reader.onload = (f) => {
        this.pdfFile = f.target.result;

        this.$router.push({
          name: "contentPreview",
          params: {
            link: this.pdfFile,
          },
        });
        this.addContentClicked = false;
        this.whichContentSelected = "";
        this.youtubeLink = "";
        this.videoLink = "";
        this.formLink = "";
      };
      reader.readAsDataURL(file);
    },
  },
};
</script>
