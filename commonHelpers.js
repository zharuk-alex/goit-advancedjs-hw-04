import{a as y,S as g,i as c}from"./assets/vendor-ce20a572.js";(function(){const o=document.createElement("link").relList;if(o&&o.supports&&o.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))s(e);new MutationObserver(e=>{for(const a of e)if(a.type==="childList")for(const i of a.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&s(i)}).observe(document,{childList:!0,subtree:!0});function n(e){const a={};return e.integrity&&(a.integrity=e.integrity),e.referrerPolicy&&(a.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?a.credentials="include":e.crossOrigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function s(e){if(e.ep)return;e.ep=!0;const a=n(e);fetch(e.href,a)}})();const h="5416463-3b798b4f634faaf9188b7760a",b=async({query:t,page:o,per_page:n=40})=>{const s=await y.get("https://pixabay.com/api/",{params:{key:h,q:t,image_type:"photo",orientation:"horizontal",safesearch:!0,per_page:n,page:o}});if(s.status!==200)throw new Error(s.statusText);return s.data},r={header:document.querySelector(".header"),nav:document.querySelector(".nav-list"),form:document.querySelector("#search-form"),btnSearch:document.querySelector("#search-form button[type=submit]"),searchInput:document.querySelector("#search-form input[name=searchQuery]"),gallery:document.querySelector(".gallery"),btnLoadMore:document.querySelector(".load-more"),loadMoreObserve:document.querySelector(".load-more-observe")},d=new IntersectionObserver(t=>{t.forEach(o=>{o.isIntersecting&&l.load_type==="infinit_scroll"&&u()})},{root:null,rootMargin:"300px"}),l=new Proxy({query:"",page:0,per_page:40,is_loadable:!1,load_type:null},{set(t,o,n){const s=o==="is_loadable"?n:t.is_loadable,e=o==="load_type"?n:t.load_type;return o==="load_type"&&(localStorage.setItem("load_type",e),Array.from(r.nav.querySelectorAll(".nav-link")).forEach(a=>{const{type:i}=a.dataset;i===e?a.classList.add("active"):a.classList.remove("active")})),e==="loadmore"&&s?(r.btnLoadMore.classList.remove("hidden"),d.unobserve(r.loadMoreObserve)):e==="infinit_scroll"&&s?(r.btnLoadMore.classList.add("hidden"),d.observe(r.loadMoreObserve)):(r.btnLoadMore.classList.add("hidden"),d.unobserve(r.loadMoreObserve)),t[o]=n,!0}});l.load_type=localStorage.getItem("load_type")??"loadmore";const v=new g(".gallery .photo-link",{}),f=t=>{t.classList.add("loading"),t.setAttribute("disabled",!0)},p=t=>{t.classList.remove("loading"),t.removeAttribute("disabled")},L=t=>{setTimeout(()=>{var i;const o=r.header.offsetHeight,n=parseInt(window.getComputedStyle(r.gallery).gap),s=r.gallery.querySelector(`.photo-card[data-id="${t}"]`),a=((i=s==null?void 0:s.getBoundingClientRect())==null?void 0:i.top)-o-n-n/2;window.scrollBy({top:a,behavior:"smooth"})},500)},_=({id:t,largeImageURL:o,webformatURL:n,tags:s,likes:e,views:a,comments:i,downloads:m})=>`
  <div class="photo-card" data-id="${t}">
    <a class="photo-link" href="${o}" >
      <img src="${n}" alt="${s}" title="${s}" loading="lazy" />
      <div class="info">
        <p class="info-item">
          <b>Likes</b>
          ${e}
        </p>
        <p class="info-item">
          <b>Views</b>
          ${a}
        </p>
        <p class="info-item">
          <b>Comments</b>
          ${i}
        </p>
        <p class="info-item">
          <b>Downloads</b>
          ${m}
        </p>
      </div>
    </a>
  </div>`,u=async()=>{var s;l.page++;const{page:t,per_page:o,query:n}=l;try{const e=await b({query:n,page:t,per_page:o});if(((s=e.hits)==null?void 0:s.length)===0)throw new Error("Sorry, there are no images matching your search query. Please try again.");t===1&&c.success({position:"topRight",message:`Hooray! We found ${e.totalHits} images.`});const a=e.hits.map(i=>_(i)).join("");return r.gallery.insertAdjacentHTML("beforeend",a),l.is_loadable=l.page*l.per_page<e.totalHits,l.is_loadable||c.info({position:"topRight",message:"We're sorry, but you've reached the end of search results."}),v.refresh(),e}catch(e){console.error(e),c.error({position:"topRight",message:e.message})}finally{p(r.btnSearch),p(r.btnLoadMore)}};r.searchInput.addEventListener("input",function(){var t;(t=this.value)!=null&&t.length?r.btnSearch.removeAttribute("disabled"):r.btnSearch.setAttribute("disabled",!0)});r.form.addEventListener("submit",t=>{t.preventDefault();const o=r.searchInput.value.trim();if(!o){c.warning({position:"topRight",message:"Input is empty! Please, type your query"});return}r.gallery.innerHTML="",f(r.btnSearch),r.btnLoadMore.classList.add("hidden"),l.page=0,l.is_loadable=!1,l.query=o,u()});r.btnLoadMore.addEventListener("click",async()=>{var o;f(r.btnLoadMore);const t=await u();L((o=t.hits[0])==null?void 0:o.id)});r.nav.addEventListener("click",t=>{t.preventDefault();const{currentTarget:o,target:n}=t;o!==n&&(l.load_type=n.dataset.type)});
//# sourceMappingURL=commonHelpers.js.map
