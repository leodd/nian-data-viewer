<template>
  <div id="app">
    <div class="center-box" v-if="isShowWelcome">
      <p>{{ log }}</p>
      <input type="text" placeholder="你的记本名称" @keydown.enter="onEnter" v-model="dreamName" :disabled="isProcessing">
    </div>

    <masonary-layout
      v-if="!isShowWelcome"
      ref="masonary"
      :width-of-item="400"
      :gap-between-item="15"
      :sizes="[
        {columns: 1},
        {mq: '845px', columns: 2},
        {mq: '1245px', columns: 3}
      ]"
      style="margin: 15px auto 30px auto"
    >
      <step v-for="step in steps" :key="step.sid" :step-data="step" :base-url="'./' + dreamName + '/images/'">
      </step>
    </masonary-layout>

    <infinite-loading v-if="!isShowWelcome" @infinite="infiniteHandler" ref="infiniteLoading"
      style="margin-bottom: 60px;"
    >
      <span style="rgba(255,255,255,0.50);" slot="no-more">没有更多了 :)</span>
    </infinite-loading>

    <div class="bottom-box" v-if="!isShowWelcome">
      <p>{{ log }}</p><br>
      <input type="text" placeholder="你的记本名称" @keydown.enter="onEnter" v-model="dreamName" :disabled="isProcessing">
    </div>
  </div>
</template>

<script>
  export default {
    name: 'app',

    data () {
      return {
        dreamName: '',
        log: '',
        isProcessing: false,
        dreamData: null,
        steps: [],
        description: null,
        isShowWelcome: true
      }
    },

    mounted() {
      this.log = '请输入你的记本名称并回车';
    },

    methods: {
      onEnter() {
        if (this.isProcessing) return;

        this.isProcessing = true;

        let rawFile = new XMLHttpRequest();
        rawFile.overrideMimeType("application/json");
        rawFile.open("GET", './' + this.dreamName + '/content.json', true);
        rawFile.onreadystatechange = () => {
          if(rawFile.readyState === 4 && rawFile.status === 200) {
            this.log = '处理中...';
            let data = JSON.parse(rawFile.responseText);
            this.dreamData = data;
            this.isProcessing = false;
            this.log = '完成';

            this.showSteps();
          }
          else if (rawFile.readyState === 4 && rawFile.status !== 200) {
            this.log = '找不到该记本';
            this.isProcessing = false;
          }
        };
        rawFile.onerror = () => {
          this.log = '找不到该记本';
          this.isProcessing = false;
        };
        rawFile.send();
      },

      infiniteHandler($state) {
        if (!this.dreamData || !this.dreamData.steps) return;

        let index = this.steps.length;

        if (index >= this.dreamData.steps.length) {
          $state.complete();
          return;
        }

        let num = Math.min(this.dreamData.steps.length - index, 20);

        for(let i = 0; i < num; i++) {
          this.steps.push(this.dreamData.steps[index + i]);
        }

        this.$refs.masonary.pack();

        $state.loaded();
      },

      showSteps() {
        //clear all current steps
        this.steps.splice(0, this.steps.length);

        this.isShowWelcome = false;

        this.$nextTick(() => {
          this.$refs.masonary.repack();
          this.$refs.infiniteLoading.$emit('$InfiniteLoading:reset');
        });
      }
    }
  }
</script>

<style lang="scss">
  * {
    font-family: "Arial","Microsoft YaHei","黑体","宋体",sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;

    &:focus {
      outline: none;
    }
  }

  #app {
    text-align: center;
    margin: 0;

    & > .center-box {
      position: absolute;
      top: 50%;
      left: 50%;
      margin-right: -50%;
      transform: translate(-50%, -50%);
      text-align: left;

      p {
        color: rgba(255, 255, 255, 0.25);
        font-size: 1em;
      }

      input {
        height: 30px;
        width: 400px;
        font-size: 1.2em;
        outline: none;
        border: none;
        border-radius: 5px;
        padding: 10px;
        background-color: #2f2f2f;
        color: rgba(255, 255, 255, 0.5);
        box-shadow: 0 5px 20px rgba(0, 0, 0, 0.2);
      }

      ::placeholder {
        color: rgba(255, 255, 255, 0.1);
        font-style: italic;
      }
    }

    & > .bottom-box {
      position: fixed;
      left: 0;
      bottom: 0;
      padding: 10px;
      text-align: left;

      p {
        display: inline-block;
        color: rgba(255, 255, 255, 0.25);
        font-size: 0.7em;
        border-radius: 5px;
        padding: 5px;
        background-color: rgba(34, 34, 34, 0.8);
      }

      input {
        height: 20px;
        width: 300px;
        font-size: 1em;
        outline: none;
        border: none;
        border-radius: 5px;
        padding: 10px;
        background-color: #2f2f2f;
        color: rgba(255, 255, 255, 0.5);
        box-shadow: 0 5px 20px rgba(0, 0, 0, 0.2);
      }

      ::placeholder {
        color: rgba(255, 255, 255, 0.1);
        font-style: italic;
      }
    }
  }
</style>
