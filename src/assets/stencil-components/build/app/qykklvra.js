/*! Built with http://stenciljs.com */
const{h:e}=window.App;class t{constructor(){this.publicServerKey=function(e){const t=(e+"=".repeat((4-e.length%4)%4)).replace(/\-/g,"+").replace(/_/g,"/"),i=window.atob(t),n=new Uint8Array(i.length);for(let e=0;e<i.length;++e)n[e]=i.charCodeAt(e);return n}("BBsb4au59pTKF4IKi-aJkEAGPXxtzs-lbtL58QxolsT2T-3dVQIXTUCCE1TSY8hyUvXLhJFEUmH7b5SJfSTcT-E")}componentWillLoad(){"serviceWorker"in navigator&&"PushManager"in window?this.swSupport=!0:this.swSupport=!1}subscribeToNotify(e){console.log(e.detail.checked),!0===e.detail.checked&&this.handleSub()}handleSub(){navigator.serviceWorker.getRegistration().then(e=>{e.pushManager.getSubscription().then(t=>{null===t&&e.pushManager.subscribe({userVisibleOnly:!0,applicationServerKey:this.publicServerKey}).then(e=>{console.log("web push subscription: ",e),this.notify=!0})})})}render(){if(this.match&&this.match.params.name)return e("ion-page",{class:"show-page"},e("ion-header",{"md-height":"56px"},e("ion-toolbar",{color:"primary"},e("ion-title",null,"Ionic PWA Toolkit"))),e("ion-content",null,e("p",null,"Hello! My name is ",this.match.params.name,". My name was passed in through a route param!"),this.swSupport?e("ion-item",null,e("ion-label",null,"Notifications"),e("ion-toggle",{checked:this.notify,disabled:this.notify})):null))}static get is(){return"app-profile"}static get properties(){return{match:{type:"Any",attr:"match"},notify:{state:!0},swSupport:{state:!0}}}static get listeners(){return[{name:"ionChange",method:"subscribeToNotify"}]}static get style(){return"app-profile ion-scroll{padding:15px}"}}export{t as AppProfile};