!function(e){var t={};function r(o){if(t[o])return t[o].exports;var n=t[o]={i:o,l:!1,exports:{}};return e[o].call(n.exports,n,n.exports,r),n.l=!0,n.exports}r.m=e,r.c=t,r.d=function(e,t,o){r.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:o})},r.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},r.t=function(e,t){if(1&t&&(e=r(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var o=Object.create(null);if(r.r(o),Object.defineProperty(o,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var n in e)r.d(o,n,function(t){return e[t]}.bind(null,n));return o},r.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return r.d(t,"a",t),t},r.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},r.p="",r(r.s=83)}({0:function(e,t){e.exports=window.wp.element},11:function(e,t,r){var o=r(30);e.exports=function(e,t,r){return(t=o(t))in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e},e.exports.__esModule=!0,e.exports.default=e.exports},2:function(e,t){e.exports=window.wp.i18n},20:function(e,t){e.exports=function(e,t){(null==t||t>e.length)&&(t=e.length);for(var r=0,o=new Array(t);r<t;r++)o[r]=e[r];return o},e.exports.__esModule=!0,e.exports.default=e.exports},21:function(e,t,r){var o=r(20);e.exports=function(e,t){if(e){if("string"==typeof e)return o(e,t);var r=Object.prototype.toString.call(e).slice(8,-1);return"Object"===r&&e.constructor&&(r=e.constructor.name),"Map"===r||"Set"===r?Array.from(e):"Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)?o(e,t):void 0}},e.exports.__esModule=!0,e.exports.default=e.exports},22:function(e,t){e.exports=window.wp.compose},23:function(e,t){function r(t){return e.exports=r="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},e.exports.__esModule=!0,e.exports.default=e.exports,r(t)}e.exports=r,e.exports.__esModule=!0,e.exports.default=e.exports},29:function(e,t,r){var o=r(34),n=r(35),i=r(21),c=r(36);e.exports=function(e){return o(e)||n(e)||i(e)||c()},e.exports.__esModule=!0,e.exports.default=e.exports},3:function(e,t){e.exports=window.wp.components},30:function(e,t,r){var o=r(23).default,n=r(31);e.exports=function(e){var t=n(e,"string");return"symbol"==o(t)?t:String(t)},e.exports.__esModule=!0,e.exports.default=e.exports},31:function(e,t,r){var o=r(23).default;e.exports=function(e,t){if("object"!=o(e)||!e)return e;var r=e[Symbol.toPrimitive];if(void 0!==r){var n=r.call(e,t||"default");if("object"!=o(n))return n;throw new TypeError("@@toPrimitive must return a primitive value.")}return("string"===t?String:Number)(e)},e.exports.__esModule=!0,e.exports.default=e.exports},34:function(e,t,r){var o=r(20);e.exports=function(e){if(Array.isArray(e))return o(e)},e.exports.__esModule=!0,e.exports.default=e.exports},35:function(e,t){e.exports=function(e){if("undefined"!=typeof Symbol&&null!=e[Symbol.iterator]||null!=e["@@iterator"])return Array.from(e)},e.exports.__esModule=!0,e.exports.default=e.exports},36:function(e,t){e.exports=function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")},e.exports.__esModule=!0,e.exports.default=e.exports},38:function(e,t){e.exports=window.wp.hooks},40:function(e,t){e.exports=window.wp.blockEditor},83:function(e,t,r){"use strict";r.r(t);var o=r(11),n=r.n(o),i=r(38),c=r(29),u=r.n(c),a=r(0),l=r(22),s=r(3),p=r(40),f=r(2),m=r(9),b=Object(a.createElement)(m.SVG,{width:"256",height:"256",fill:"none",xmlns:"http://www.w3.org/2000/svg",viewBox:" 0 0 256 256"},Object(a.createElement)(m.Path,{fillRule:"evenodd",clipRule:"evenodd",d:"M16.2016 47c-5.2739 0-9.54928 4.1406-9.54928 9.2482V181.099c0 5.108 4.27538 9.249 9.54928 9.249H133.18c3.956 0 7.162-3.106 7.162-6.937 0-3.83-3.206-6.936-7.162-6.936H28.1382c-3.9554 0-7.1619-3.105-7.1619-6.936v-69.362c0-3.8304 3.2065-6.9359 7.1619-6.9359H207.187c5.274 0 9.55-4.1405 9.55-9.2482V56.2482c0-5.1076-4.276-9.2482-9.55-9.2482H16.2016ZM240.61 145.262h-5.969v-8.092c0-16.6-13.894-30.057-31.035-30.057-17.14 0-31.035 13.457-31.035 30.057v8.092h-8.355c-5.274 0-9.55 4.141-9.55 9.249v46.241c0 5.107 4.276 9.248 9.55 9.248h76.394c5.274 0 9.549-4.141 9.549-9.248v-46.241c0-5.108-4.275-9.249-9.549-9.249Zm-20.292-8.092v8.092h-33.423v-8.092c0-8.938 7.482-16.184 16.711-16.184 9.23 0 16.712 7.246 16.712 16.184Zm-180.2429-6.936c0-2.554 2.1377-4.624 4.7747-4.624h76.3942c2.637 0 4.775 2.07 4.775 4.624s-2.138 4.624-4.775 4.624H44.8498c-2.637 0-4.7747-2.07-4.7747-4.624Zm0 20.808c0-2.553 2.1377-4.624 4.7747-4.624h28.6479c2.6369 0 4.7746 2.071 4.7746 4.624 0 2.554-2.1377 4.625-4.7746 4.625H44.8498c-2.637 0-4.7747-2.071-4.7747-4.625ZM166.603 198.44v-41.617h71.62v41.617h-71.62Z",fill:"#428BCA"})),d=Object(l.createHigherOrderComponent)((function(e){return function(t){if("core/button"!==t.name)return Object(a.createElement)(e,t);if(!simpayBlockButton||!simpayBlockButton.paymentForms)return Object(a.createElement)(e,t);var r=t.attributes,o=t.setAttributes,n=r.simpayFormId;return Object(a.createElement)(a.Fragment,null,Object(a.createElement)(e,t),Object(a.createElement)(p.InspectorControls,null,Object(a.createElement)(s.PanelBody,{icon:b,title:Object(f.__)("WP Simple Pay","stripe"),initialOpen:!0},Object(a.createElement)(s.SelectControl,{label:Object(f.__)("Payment Form","stripe"),value:n,onChange:function(e){o(""!==e?{simpayFormId:parseInt(e),simpayFormInstanceId:Math.floor(1e3*Math.random())}:{simpayFormId:null,simpayFormInstanceId:null})},options:[{label:Object(f.__)("Select a form…","stripe"),value:""}].concat(u()(simpayBlockButton.paymentForms)),help:Object(f.__)("Select an overlay or Stripe Checkout payment form to launch.","stripe")}))))}}),"withToolbarButton");function y(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);t&&(o=o.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,o)}return r}function x(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?y(Object(r),!0).forEach((function(t){n()(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):y(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}Object(i.addFilter)("editor.BlockEdit","simpay/with-payment-form-button-block",d),Object(i.addFilter)("blocks.getSaveElement","simpay/save-payment-form-button-block",(function(e,t,r){if(e){if("core/button"!==t.name)return e;var o=r.simpayFormId,n=r.simpayFormInstanceId;return o?Object(a.createElement)(a.Fragment,null,e,Object(a.createElement)("div",{id:"simpay-block-button-".concat(n),className:"simpay-block-button-".concat(o),style:{display:"none"}},"[simpay id=",o," isButtonBlock=1 instanceId=",n,"]")):e}})),Object(i.addFilter)("blocks.registerBlockType","simpay/payment-form-button-block",(function(e,t){return"core/button"!==t?e:x(x({},e),{},{attributes:x(x({},e.attributes),{},{simpayFormId:{type:"integer"},simpayFormInstanceId:{type:"integer"}})})}))},9:function(e,t){e.exports=window.wp.primitives}});