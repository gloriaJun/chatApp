<template>
  <div class="chat-image-upload">
    <v-btn
      icon
      @click="onClickBtn"
    >
      <v-icon>add_photo_alternate</v-icon>
    </v-btn>
    <input
      ref="inputFile"
      type="file"
      accept="image/*"
      @change="upload"
    >
  </div>
</template>

<script>
export default {
  name: 'ChatImageUpload',
  methods: {
    onClickBtn() {
      this.$refs.inputFile.click();
    },
    async upload(event) {
      const { files } = event.target;
      if (!files) {
        return;
      }

      const dataUrl = await this.convertToDataUrl(files[0]);
      this.$emit('upload', dataUrl);
    },
    convertToDataUrl(file) {
      return new Promise((resolve, reject) => {
        const image = new Image();
        image.src = URL.createObjectURL(file);

        image.onload = function () {
          const canvas = document.createElement('canvas');
          const {
            naturalWidth: width,
            naturalHeight: height,
          } = image;

          canvas.width = width;
          canvas.height = height;
          canvas.getContext('2d').drawImage(image, 0, 0, width, height);

          resolve(canvas.toDataURL(file.type || 'image/png'));
        };
      });
    },
  },
};
</script>

<style lang="stylus">
.chat-image-upload

  input[type='file']
    display none;

</style>
