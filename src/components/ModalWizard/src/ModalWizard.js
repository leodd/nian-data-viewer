import Vue from 'vue';
import Modal from './Modal.vue';

const ModalConstructor = Vue.extend(Modal);

const stack = [];
let idSeed = 1;
let zIndexSeed = 1010;

function openModal(content, opts={}) {
  if (content === null) return;

  let comOpt = null;

  if (typeof content === 'function') {
    comOpt = {
      functional: true,
      render: (h, c) => content(h, c.props)
    };
  }
  else if (typeof content === 'string' && !opts.isComName) {
    comOpt = {
      template: content
    };

    if (opts['props'] && typeof opts['props'] === 'object') {
      comOpt.props = Object.keys(opts.props);
    }
  }
  else if (typeof content === 'object' || (typeof content === 'string' && opts.isComName)) {
    comOpt = content;
  }
  else return;

  opts.contentComOpt = comOpt;
  opts.onClose = closeTopModal;

  const instance = new ModalConstructor({
    data: opts
  });

  instance.id = `modal_${idSeed++}`;
  instance.vm = instance.$mount();
  document.body.appendChild(instance.vm.$el);
  instance.vm.visible = true;
  instance.dom = instance.vm.$el;
  instance.dom.style.zIndex = zIndexSeed++;

  stack.push(instance);

  if (stack.length <= 1) {
    document.body.style.overflow = 'hidden';

    document.addEventListener('keydown', escDetect)
  }
}

function closeModal() {
  if (stack.length > 0) {
    stack[stack.length - 1].close();
  }
}

function closeTopModal() {
  stack.pop();

  zIndexSeed--;

  if (stack.length <= 0) {
    document.body.style.overflow = null;

    document.removeEventListener('keydown', escDetect);
  }
}

function escDetect(e) {
  e = e || window.event;

  if (e.keyCode === 27 && stack.length > 0) {
    stack[stack.length - 1].close();
  }
}

export default {
  openModal,
  closeModal
}
