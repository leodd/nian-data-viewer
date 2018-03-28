<script type="text/jsx">
  export default {
    render: function (h) {
      return (
        <div class="ModalWizard__Modal">
          <transition name="fade-in" onAfterLeave={this.doDestroy}>
            <div class="background" ref="lightbox" v-show={this.visible} onClick={this.close}>
              <div class="center-box" ref="centerbox">
                {h(this.contentComOpt, {props: this.props})}
              </div>
            </div>
          </transition>
        </div>
      );
    },

    data: function () {
      return {
        visible: false,
        isCenter: false,
        headerMargin: 20,
        footerMargin: 20,
        onClose: null,
        contentComOpt: null,
        props: null
      }
    },

    watch: {
      visible: function (val) {
        if (val === false) return;

        this.$nextTick(function() {
          let centerbox = this.$refs.centerbox;
          let lightbox = this.$refs.lightbox;
          let modal = this.toArray(centerbox.children).pop();

          let totalHeight = modal.clientHeight + this.headerMargin + this.footerMargin;

          this.isCenter = lightbox.clientHeight > totalHeight ? this.isCenter : false;

          modal.style.position = this.isCenter ? 'absolute' : 'relative';

          centerbox.style.top = this.isCenter ? "50%" : "0";

          modal.style.top = this.isCenter
            ? `-${modal.clientHeight / 2}px` : '0';
          modal.style.left = `-${modal.clientWidth / 2}px`;

          modal.style.margin = this.isCenter ? '0' : `${this.headerMargin}px 0 ${this.footerMargin}px 0`;
        });
      }
    },

    methods: {
      close: function () {
        this.visible = false;
        if (typeof this.onClose === 'function') {
          this.onClose();
        }
      },

      doDestroy: function () {
        this.$destroy(true);
        this.$el.parentNode.removeChild(this.$el);
      },

      toArray: function (input) {
        return Array.prototype.slice.call(input);
      }
    }
  }
</script>

<style lang="scss">
  .ModalWizard__Modal {

    & > .background {
      background-color: rgba(0, 0, 0, 0.8);
      position: fixed;
      top: 0;
      left: 0;
      height: 100%;
      width: 100%;
      overflow: auto;

      & > .center-box {
        position: absolute;
        top: 0;
        left: 50%;
        width: 0;
      }
    }

    .fade-in-enter-active,
    .fade-in-leave-active {
      transition: opacity 0.1s;
    }

    .fade-in-enter,
    .fade-in-leave-to {
      opacity: 0;
    }
  }
</style>
