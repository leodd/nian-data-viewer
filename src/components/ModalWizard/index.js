import ModalWizard from './src/ModalWizard.js';

function install (Vue, opts={}) {
  Vue.prototype[`$${opts.openModalName || 'openModal'}`] = ModalWizard.openModal;
  Vue.prototype[`$${opts.closeModalName || 'closeModal'}`] = ModalWizard.closeModal;
}

export default {
  install,
  ...ModalWizard
};
