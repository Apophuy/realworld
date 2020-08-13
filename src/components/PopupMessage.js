const PopupMessage = (text) => {
  if (window.M && text) {
    window.M.toast({ html: text, classes: 'deep-orange darken-3' });
  }
  return null;
};

export default PopupMessage;
