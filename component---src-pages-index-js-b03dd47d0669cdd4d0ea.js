(window.webpackJsonp=window.webpackJsonp||[]).push([[5],{BnQ9:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.classNames=function(e){return Object.keys(e).filter((function(t){return e[t]})).join(" ")}},GilN:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var a=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var a in n)Object.prototype.hasOwnProperty.call(n,a)&&(e[a]=n[a])}return e},r=i(n("q1tI")),o=i(n("17x9")),l=i(n("Ibp0")),c=function(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var n in e)Object.prototype.hasOwnProperty.call(e,n)&&(t[n]=e[n]);return t.default=e,t}(n("BnQ9"));function i(e){return e&&e.__esModule?e:{default:e}}function s(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function u(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function p(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):function(e,t){for(var n=Object.getOwnPropertyNames(t),a=0;a<n.length;a++){var r=n[a],o=Object.getOwnPropertyDescriptor(t,r);o&&o.configurable&&void 0===e[r]&&Object.defineProperty(e,r,o)}}(e,t))}var m={stargazers:"Star",watchers:"Watch",forks:"Fork"},f={forks:"network"},d=function(e){function t(){var n,a;s(this,t);for(var r=arguments.length,o=Array(r),l=0;l<r;l++)o[l]=arguments[l];return n=a=u(this,e.call.apply(e,[this].concat(o))),a.state={count:null},u(a,n)}return p(t,e),t.prototype.componentDidMount=function(){var e=this;this.xhr=(0,l.default)(this.getRequestUrl(),(function(t){e.setCount(t)}))},t.prototype.componentWillUnmount=function(){this.xhr&&this.xhr.abort()},t.prototype.setCount=function(e){if(e){var t=e[this.props.type+"_count"];this.setState({count:t})}},t.prototype.getRequestUrl=function(){var e=this.props;return"//api.github.com/repos/"+e.namespace+"/"+e.repo},t.prototype.getRepoUrl=function(){var e=this.props;return"//github.com/"+e.namespace+"/"+e.repo+"/"},t.prototype.getCountUrl=function(){var e=this.props,t=e.namespace,n=e.repo,a=e.type;return"//github.com/"+t+"/"+n+"/"+(f[a]||a)+"/"},t.prototype.getCountStyle=function(){return null!==this.state.count?{display:"block"}:null},t.prototype.render=function(){var e=this.props,t=e.className,n=e.type,o=e.size,l=function(e,t){var n={};for(var a in e)t.indexOf(a)>=0||Object.prototype.hasOwnProperty.call(e,a)&&(n[a]=e[a]);return n}(e,["className","type","size"]);delete l.namespace,delete l.repo;var i,s,u,p=this.state.count,f=c.classNames((u=t,(s=t)in(i={"github-btn":!0,"github-btn-large":"large"===o})?Object.defineProperty(i,s,{value:u,enumerable:!0,configurable:!0,writable:!0}):i[s]=u,i));return r.default.createElement("span",a({},l,{className:f}),r.default.createElement("a",{className:"gh-btn",href:this.getRepoUrl(),target:"_blank"},r.default.createElement("span",{className:"gh-ico","aria-hidden":"true"}),r.default.createElement("span",{className:"gh-text"},m[n])),r.default.createElement("a",{className:"gh-count",target:"_blank",href:this.getCountUrl(),style:this.getCountStyle()},p))},t}(r.default.Component);d.displayName="GitHubButton",d.propTypes={className:o.default.string,type:o.default.oneOf(["stargazers","watchers","forks"]).isRequired,namespace:o.default.string.isRequired,repo:o.default.string.isRequired,size:o.default.oneOf(["large"])},t.default=d,e.exports=t.default},Ibp0:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=function(e,t){if("undefined"!=typeof XDomainRequest)return t(null),null;var n=new XMLHttpRequest;return n.onreadystatechange=function(){n.readyState===XMLHttpRequest.DONE&&200===n.status&&t(JSON.parse(n.responseText))},n.open("GET",e,!0),n.send(),n},e.exports=t.default},N2BU:function(e,t){e.exports="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyRpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoTWFjaW50b3NoKSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDpFNTE3OEEyQTk5QTAxMUUyOUExNUJDMTA0NkE4OTA0RCIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDpFNTE3OEEyQjk5QTAxMUUyOUExNUJDMTA0NkE4OTA0RCI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOkU1MTc4QTI4OTlBMDExRTI5QTE1QkMxMDQ2QTg5MDREIiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOkU1MTc4QTI5OTlBMDExRTI5QTE1QkMxMDQ2QTg5MDREIi8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+m4QGuQAAAyRJREFUeNrEl21ojWEYx895TDPbMNlBK46IUiNmPvHBSUjaqc0H8pF5+aDUKPEBqU2NhRQpX5Rv5jWlDIWlMCv7MMSWsWwmb3tpXub4XXWdPHvc9/Gc41nu+nedc7/8r/99PffLdYdDPsvkwsgkTBwsA/PADJCnzX2gHTwBt8Hl7p537/3whn04XoDZDcpBlk+9P8AFcAghzRkJwPF4zGGw0Y9QS0mAM2AnQj77FqCzrtcwB1Hk81SYojHK4DyGuQ6mhIIrBWB9Xm7ug/6B/nZrBHBegrkFxoVGpnwBMSLR9EcEcC4qb8pP14BWcBcUgewMnF3T34VqhWMFkThLJAalwnENOAKiHpJq1FZgI2AT6HZtuxZwR9GidSHtI30jOrbawxlVX78/AbNfhHlomEUJJI89O2MqeE79T8/nk8nMBm/dK576hZgmA3cp/R4l9/UeSxiHLVIlNm4nFfT0bxyuIj7LHRTKai+zdJobwMKzcZSJb0ePV5PKN+BqAAKE47UlMnERELMM3EdYP/yrd+XYb2mOiYBiQ8OQnoRBlXrl9JZix7D1pHTazu4MoyBcnYamqAjIMTR8G4FT8LuhLsexXYYjICBiqhQBvYb6fLZIJCjPypVvaOoVAW2WcasCnL2Nq82xHJNSqlCeFcDshaPK0twkAhosjZL31QYw+1rlMpWGMArl23SBsZZO58F2tlJXmjOXS+s4WGvpMiBJT/I2PInZ6lIs9/hBsNS1hS6BG0DSqmYEDRlCXQrmy50P1oDRKTSegmNbUsA0zDMwRhPJXeCE3vWLPQMvan6X8AgIa1vcR4AkGZkDR4ejJ1UHpsaVI0g2LInpOsNFUud1rhxSV+fzC9Woz2EZkWQuja7/B+jUrgtIMpy9YCW4n4K41YfzRneW5E1KJTe4B2Zq1Q5EHEtj4U3AfEzR5SVY4l7QYQPJdN2as7RKBF0BPZqqH4VgMAMBL8Byxr7y8zCZiDlnOcEKIPmUpgB5Z2ww5RdOiiRiNajUmWda5IG6WbhsyY2fx6m8gLcoJDJFkH219M3We1+cnda93pfycZpIJEL/s/wSYADmOAwAQgdpBAAAAABJRU5ErkJggg=="},RXBc:function(e,t,n){"use strict";n.r(t);var a=n("q1tI"),r=n.n(a),o=n("Bl7J"),l=n("vrFN"),c=n("N2BU"),i=n.n(c),s=n("diBO"),u=n("GilN"),p=n.n(u);n("zrgH"),n("hZTp");t.default=function(){return r.a.createElement(o.a,null,r.a.createElement(l.a,{title:"Haystack"}),r.a.createElement("main",{className:"home-wrapper"},r.a.createElement("section",{className:"section1"},r.a.createElement("div",{className:"githubicon"},r.a.createElement(p.a,{type:"stargazers",size:"large",namespace:"deepset-ai",repo:"haystack"})),r.a.createElement("h1",null,"Haystack"),r.a.createElement("h3",null,"Neural Question Answering at Scale"),r.a.createElement("div",{className:"btn-wrapper"},r.a.createElement(s.a,{className:"primary white-color",to:"/en/docs/intromd",locale:"en"},"Get started"),r.a.createElement(s.a,{className:"primary white-color",to:"/en/docs/intromd",locale:"en"},"Learn more"))),r.a.createElement("section",{className:"section2"}),r.a.createElement("section",{className:"section4"},r.a.createElement("h2",null,"Open Source"),r.a.createElement("p",null,"Haystack is open-sourced on GitHub"),r.a.createElement("p",null,"Contribution and Feedback are welcome!"),r.a.createElement("div",{className:"btn-wrapper"},r.a.createElement("a",{className:"primary primary-color with-icon",href:"https://github.com/deepset-ai",target:"_blank",rel:"noopener noreferrer"},r.a.createElement("img",{src:i.a,alt:"github"}),r.a.createElement("span",null,"Contribute on Github"))))))}},hZTp:function(e,t,n){},zrgH:function(e,t,n){}}]);
//# sourceMappingURL=component---src-pages-index-js-b03dd47d0669cdd4d0ea.js.map