var e,t,o,r,n;e="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},t={},o={},null==(r=e.parcelRequired7c6)&&((r=function(e){if(e in t)return t[e].exports;if(e in o){var r=o[e];delete o[e];var n={id:e,exports:{}};return t[e]=n,r.call(n.exports,n,n.exports),n.exports}var i=Error("Cannot find module '"+e+"'");throw i.code="MODULE_NOT_FOUND",i}).register=function(e,t){o[e]=t},e.parcelRequired7c6=r),r.register,n=r("h6c0i"),document.querySelector(".form").addEventListener("submit",async e=>{e.preventDefault();let t=parseInt(document.querySelector("#delay").value,10),o=parseInt(document.querySelector("#step").value,10),r=parseInt(document.querySelector("#amount").value,10);for(let e=1;e<=r;e++)try{let r=e,i=t+o*e,l=await function(e,t){return new Promise((o,r)=>{let n=Math.random()>.3;setTimeout(()=>{n?o({position:e,delay:t}):r({position:e,delay:t})},t)})}(r,i);(0,n.Notify).success(`\u{2705} Fulfilled promise ${l.position} in ${l.delay}ms`)}catch(e){(0,n.Notify).failure(`\u{274C} Rejected promise ${e.position} in ${e.delay}ms`)}});
//# sourceMappingURL=03-promises.68eca1dc.js.map
