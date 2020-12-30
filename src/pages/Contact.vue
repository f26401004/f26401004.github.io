<template lang="pug">

div.pa-3.page-background-default.d-flex.align-center
  v-container(:class="{ 'mt-16': isMobile }")
    v-card(width="100%" :class="{ 'rounded-lg': isMobile, 'mt-16': !isMobile, 'rounded-xl': !isMobile }")
      v-row.fill-height
        v-col.pt-0.pb-0(cols="12"
          md="5"
          lg="5"
          xl="5")
          v-container.fill-height.secondary(:class="{ 'rounded-t-lg': isMobile, 'rounded-l-xl': !isMobile }")
            v-row.custom-section-figure
              v-img.custom-figure(:src="require('@/assets/figure.png')")
        v-col(cols="12"
          md="7"
          lg="7"
          xl="7"
          :class="{ 'pa-8': !isMobile }")
          v-container.pl-9.pr-9
            h3.font-weight-black.text-left.primary--text(:class="{ 'text-h4': isMobile, 'text-h3': !isMobile }") Contact Me
          v-container.pl-9.pr-9
            v-form(v-model="isValid")
              v-container.pa-0
                v-row
                  v-col(cols="12"
                    md="6"
                    lg="6"
                    xl="6")
                    v-text-field(v-model="name"
                      required
                      filled
                      label="Your Name"
                      autocomplete="name"
                      :rules="rules.name"
                      :counter="50")
                  v-col(cols="12"
                    md="6"
                    lg="6"
                    xl="6")
                    v-text-field(v-model="email"
                      required
                      filled
                      autocomplete="email"
                      label="Your Email"
                      :rules="rules.email")
              v-container.pa-0
                v-textarea(v-model="message"
                  filled
                  label="Message"
                  laceholder="Tell me something"
                  :counter="2000")
          v-container.d-flex.justify-start.pl-9.pr-9
            v-btn(color="secondary"
              depressed
              tile
              :large="isMobile"
              :x-large="!isMobile"
              :style="{ 'width': isMobile ? '100%' : 'auto'}"
              @click="submitHandler")
              span.text-button Submit
              v-icon.ml-2(dark) mdi-send
  v-dialog(v-model="isDisplayDialog"
    :width="isMobile ? '90vw': '500px'")
    v-card
      v-container
        v-card-text {{ systemMessage }}
</template>

<script>
export default {
  name: 'Contact',
  data: function () {
    return {
      isValid: false,
      isDisplayDialog: false,
      name: '',
      email: '',
      message: '',
      systemMessage: '',
      rules: {
        name: [
          v => !!v || 'Your Name is reqiored.',
          v => v.length <= 50 || 'Your Name must be less than 50 characters.'
        ],
        email: [
          v => !!v || 'Your Email is required.',
          v => /.+@.+/.test(v) || 'Your Email must be valid.'
        ],
        message: [
          v => !!v || 'Message is required.',
          v => v.length <= 2000 || 'Message must be less than 2000 characters.'
        ]
      }
    }
  },
  methods: {
    submitHandler: async function () {
      if (!this.isValid) {
        return
      }
      try {
        const response = await fetch('https://asia-east2-profile-f26401004.cloudfunctions.net/sendEmail', {
          method: 'POST',
          headers: new Headers(),
          body: JSON.stringify({
            name: this.name,
            from: this.email,
            message: this.message
          })
        })
        const result = await response.text()

        // Displaying the system message
        this.systemMessage = result
        this.isDisplayDialog = true
      } catch (error) {
        // Displaying the system message
        this.systemMessage = error
        this.isDisplayDialog = true
      }
    }
  }
}
</script>

<style lang="scss" scoped>

@media only screen and (max-width: 600px) {
  .custom-figure {
    position: absolute;
    top: -26px;
    left: 40px;
    width: 195px;
    height: 262px;

    /deep/ & > .v-image__image {
      background-position: center top !important;
    }
  }
}

@media only screen and (min-width: 601px) {
  .custom-figure {
    position: absolute;
    top: -52px;
    left: 68px;
    width: 400px;
  }
}


.custom-section-figure {
  width: 100%;
  height: 212px;
}

</style>
