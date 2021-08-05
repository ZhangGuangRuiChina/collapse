const HORIZONTAL_ARRAY = ['width', 'paddingLeft', 'marginLeft', 'paddingRight', 'marginRight'];
const VERTICAL_ARRAY = ['height', 'paddingTop', 'marginTop', 'paddingBottom', 'marginBottom'];

class Transition {
  constructor (props) {
    this.direction = props.direction || 'vertical';
    this.timing = props.timing || 0.3;
    this.mode = props.mode || 'ease-in-out';

    this.attrArray = this.direction === 'horizontal' ? HORIZONTAL_ARRAY : VERTICAL_ARRAY;
    let elTransition = '';
    this.attrArray.forEach(attr => {
      attr = attr.replace(/([A-Z])/g,"-$1").toLowerCase();
      const item = `${this.timing}s ${attr} ${this.mode}, `;
      elTransition += item;
    });
    this.elTransition = elTransition.slice(0, -2);

    let attr = this.attrArray[0];
    // this.scrollAttr: 'scrollHight' or 'scrollWidth'
    this.scrollAttr = 'scroll' + attr[0].toUpperCase() + attr.slice(1);
  }
  
}

function getTransitionFun (props) {
  const TRANSITION = new Transition(props);
  return {
    beforeEnter (el) {
      el.style.transition = TRANSITION.elTransition;
      if (!el.dataset) {
        el.dataset = {};
      }
      TRANSITION.attrArray.forEach(attr => {
        el.dataset[attr] = el.style[attr];
        el.style[attr] = 0;
      })
      el.style.boxSizing = 'content-box';
    },
  
    enter (el) {
      el.dataset.overflow = el.style.overflow;
      
      TRANSITION.attrArray.forEach((attr, i) => {
        if (i === 0) {
          el.style[attr] = el[TRANSITION.scrollAttr] ?  el[TRANSITION.scrollAttr] + 'px' : '';
        } else {
          el.style[attr] = el.dataset[attr];
        }
      })
      
      el.style.overflow = 'hidden';
    },
  
    afterEnter (el) {
      el.style.transition = '';
      el.style[TRANSITION.scrollAttr] = '';
      el.style.overflow = el.dataset.overflow;
    },
  
    beforeLeave (el) {
      if (!el.dataset) {
        el.dataset = {};
      }
      TRANSITION.attrArray.forEach((attr, i) => {
        if (i === 0) {
          el.style[attr] = el[TRANSITION.scrollAttr] + 'px';
        } else {
          el.dataset[attr] = el.style[attr];
        }
      })
      
      el.style.overflow = 'hidden';
      el.style.boxSizing = 'border-box';
    },
  
    leave (el) {
      if (el[TRANSITION.scrollAttr] !== 0) {
        el.style.transition = TRANSITION.elTransition;
        TRANSITION.attrArray.forEach(attr => {
          el.style[attr] = 0;
        })
      }
    },
  
    afterLeave (el) {
      el.style.transition = '';
      el.style.overflow = el.dataset.overflow;
  
      TRANSITION.attrArray.forEach((attr, i) => {
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