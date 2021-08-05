const HORIZONTAL_ARRAY = ['width', 'paddingLeft', 'marginLeft', 'paddingRight', 'marginRight'];
const VERTICAL_ARRAY = ['height', 'paddingTop', 'marginTop', 'paddingBottom', 'marginBottom'];

class Transition {
  constructor (props) {
    this.direction = props.direction || 'vertical';
    this.timing = props.timing || 0.3;
    this.mode = props.mode || 'ease-in-out';

    this.attrArray = this.direction === 'horizontal' ? HORIZONTAL_ARRAY : VERTICAL_ARRAY;
    this.elTransition = '';
    this.attrArray.forEach(attr => {
      const item = `${this.timing}s ${attr} ${this.mode}, `;
      this.elTransition += item;
    });
    this.elTransition = this.elTransition.slice(0, -2);

    let attr = this.attrArray[0];
    // this.scrollAttr: 'scrollHight' or 'scrollWidth'
    this.scrollAttr = 'scroll' + attr[0].toUpperCase() + attr.slice(1);
  }
  
}

function getTransitionFun (props) {
  let transition = new Transition(props);
  return {
    'before-enter' (el) {
      console.log('before-enter')
      el.style.transition = transition.elTransition;
      if (!el.dataset) {
        el.dataset = {};
      }
      transition.attrArray.forEach(attr => {
        el.dataset[attr] = el.style[attr];
        el.style[attr] = 0;
      })
      el.style.boxSizing = 'content-box';
    },
  
    'enter' (el) {
      console.log('enter')
      el.dataset.overflow = el.style.overflow;
      
      transition.attrArray.forEach((attr, i) => {
        if (i === 0) {
          el.style[attr] = el[transition.scrollAttr] ?  el[transition.scrollAttr] + 'px' : '';
        } else {
          el.style[attr] = el.dataset[attr];
        }
      })
      
      el.style.overflow = 'hidden';
    },
  
    'after-enter' (el) {
      console.log('after-enter')
      el.style.transition = '';
      el.style[transition.scrollAttr] = '';
      el.style.overflow = el.dataset.overflow;
    },
  
    'before-leave' (el) {
      console.log('before-leave')
      if (!el.dataset) {
        el.dataset = {};
      }
      transition.attrArray.forEach((attr, i) => {
        if (i === 0) {
          el.style[attr] = el[transition.scrollAttr] + 'px';
        } else {
          el.dataset[attr] = el.style[attr];
        }
      })
      
      el.style.overflow = 'hidden';
      el.style.boxSizing = 'border-box';
    },
  
    'leave' (el) {
      console.log('leave')
      if (el[transition.scrollAttr] !== 0) {
        el.style.transition = transition.elTransition;
        transition.attrArray.forEach(attr => {
          el.style[attr] = 0;
        })
      }
    },
  
    'after-leave' (el) {
      console.log('after-leave')
      el.style.transition = '';
      el.style.overflow = el.dataset.overflow;
  
      transition.attrArray.forEach((attr, i) => {
        if (i === 0) {
          el.style[attr] = '';
        } else {
          el.style[attr] = el.dataset[attr];
        }
      })
    }
  }
}
export default {
  name: 'collapseTransition',
  functional: true,
  render(h, { children, props }) {
    const data = {
      on: getTransitionFun (props)
    };
    return h('transition', data, children);
  }
};