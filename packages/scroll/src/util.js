var barMap = {
  vertical: {
    offset: 'offsetTop',
    offsetSize: 'offsetHeight',
    scroll: 'scrollTop',
    scrollSize: 'scrollHeight',
    size: 'height',
    key: 'vertical',
    axis: 'Y',
    client: 'clientY',
    clientSize: 'clientHeight',
    direction: 'top'
  },
  horizontal: {
    offset: 'offsetLeft',
    offsetSize: 'offsetWidth',
    scroll: 'scrollLeft',
    scrollSize: 'scrollWidth',
    size: 'width',
    key: 'horizontal',
    axis: 'X',
    client: 'clientX',
    clientSize: 'clientWidth',
    direction: 'left'
  }
};

export {
  barMap
}