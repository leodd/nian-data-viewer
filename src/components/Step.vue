<template>
  <div class="step">
    <p class="title">{{ stepData.user }}&nbsp;&nbsp;&nbsp;<span class="time">{{ getTime() }}</span>
    <p class="content" v-if="stepData.content.length !== 0">{{ stepData.content }}</p>
    <a v-for="(img, index) in stepData.images" :href="baseUrl + img.path" target="_blank">
      <img :src="baseUrl + img.path" :style="{height: size[index], width: size[index]}">
    </a>
    <button class="comment" @click="showComment">
      评论 {{ typeof stepData.comments === 'string' ? '0' : stepData.comments.length }}
    </button>
  </div>
</template>

<script>
  export default {
    name: 'step',

    props: ['step-data', 'base-url'],

    data() {
      return {
        size: []
      }
    },

    created() {
      if (this.stepData.image !== '' && this.stepData.images.length === 0) {
        this.stepData.images.push({
          path: this.stepData.image
        });
      }

      let num = this.stepData.images.length;

      if (num === 1) {
        this.size = ['400px'];
      }
      else if (num === 5) {
        this.size = ['200px', '200px', '133.3px', '133.3px', '133.3px'];
      }
      else if (num === 8) {
        this.size = ['200px', '200px'];
        for(let i = 0; i < 6; i++) {
          this.size.push('133.3px');
        }
      }
      else if (num % 3 === 0) {
        for(let i = 0; i < num; i++) {
          this.size.push('133.3px');
        }
      }
      else {
        for(let i = 0; i < num; i++) {
          this.size.push('200px');
        }
      }

    },

    methods: {
      getTime() {
        let timestamp = parseInt(this.stepData.lastdate);

        let date = new Date(timestamp*1000);

        return `${date.getFullYear()}年${date.getMonth() + 1}月${date.getDate()}日`;
      },

      showComment() {
        if (typeof this.stepData.comments === 'string') return;

        this.$openModal('comment', {
          props: {
            commentData: this.stepData.comments
          },
          isCenter: true,
          isComName: true
        });
      }
    }
  }
</script>

<style lang="scss">
  .step {
    width: 300px;
    background-color: #fff;
    border-radius: 5px;
    text-align: left;
    overflow: hidden;

    .title {
      color: rgba(0, 0, 0, 0.8);
      margin: 20px 20px 15px 20px;
      font-size: 0.9em;
      line-height: 0.9em;
      font-weight: bold;

      .time {
        color: rgba(0, 0, 0, 0.3);
      }
    }

    .content {
      color: rgba(0, 0, 0, 0.8);
      font-size: 0.9em;
      margin: 0 20px 15px 20px;
      line-height: 1.5em;
      white-space: pre-wrap; /* css-3 */
      white-space: -moz-pre-wrap; /* Mozilla, since 1999 */
      white-space: -o-pre-wrap; /* Opera 7 */
      word-wrap: break-word; /* Internet Explorer 5.5+ */
    }

    img {
      display: inline-block;
      width: 133.3px;
      height: 133.3px;
      margin: 0;
      object-fit: cover;
      vertical-align: middle;
    }

    .comment {
      display: block;
      margin: 15px 20px 20px 20px;
      padding: 6px;
      background-color: #05a0f6;
      border: none;
      color: #ffffff;
      border-radius: 5px;
      cursor: pointer;
    }
  }
</style>
