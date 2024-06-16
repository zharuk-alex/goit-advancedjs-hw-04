import{a as h,S as g,i as u}from"./assets/vendor-ce20a572.js";(function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))s(t);new MutationObserver(t=>{for(const a of t)if(a.type==="childList")for(const l of a.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&s(l)}).observe(document,{childList:!0,subtree:!0});function n(t){const a={};return t.integrity&&(a.integrity=t.integrity),t.referrerPolicy&&(a.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?a.credentials="include":t.crossOrigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function s(t){if(t.ep)return;t.ep=!0;const a=n(t);fetch(t.href,a)}})();const b="5416463-3b798b4f634faaf9188b7760a",y=({query:e,page:r,per_page:n=40})=>{const s=new URLSearchParams({key:b,q:e,image_type:"photo",orientation:"horizontal",safesearch:!0,per_page:n,page:r});return h.get("https://pixabay.com/api/",{params:s}).then(t=>{if(t.status!==200)throw new Error(t.statusText);return t.data})},o={header:document.querySelector(".header"),nav:document.querySelector(".nav-list"),form:document.querySelector("#search-form"),btnSearch:document.querySelector("#search-form button[type=submit]"),searchInput:document.querySelector("#search-form input[name=searchQuery]"),gallery:document.querySelector(".gallery"),btnLoadMore:document.querySelector(".load-more"),loadMoreObserve:document.querySelector(".load-more-observe")},c=new IntersectionObserver(e=>{e.forEach(r=>{r.isIntersecting&&i.load_type==="infinit_scroll"&&d()})},{root:null,rootMargin:"300px"}),i=new Proxy({query:"",page:0,per_page:40,is_loadable:!1,load_type:null},{set(e,r,n){const s=r==="is_loadable"?n:e.is_loadable,t=r==="load_type"?n:e.load_type;return r==="load_type"&&(localStorage.setItem("load_type",t),Array.from(o.nav.querySelectorAll(".nav-link")).forEach(a=>{const{type:l}=a.dataset;l===t?a.classList.add("active"):a.classList.remove("active")})),t==="loadmore"&&s?(o.btnLoadMore.classList.remove("hidden"),c.unobserve(o.loadMoreObserve)):t==="infinit_scroll"&&s?(o.btnLoadMore.classList.add("hidden"),c.observe(o.loadMoreObserve)):(o.btnLoadMore.classList.add("hidden"),c.unobserve(o.loadMoreObserve)),e[r]=n,!0}});i.load_type=localStorage.getItem("load_type")??"loadmore";const v=new g(".gallery .photo-link",{}),p=e=>{e.classList.add("loading"),e.setAttribute("disabled",!0)},f=e=>{e.classList.remove("loading"),e.removeAttribute("disabled")},L=e=>{setTimeout(()=>{const r=o.header.offsetHeight,n=parseInt(window.getComputedStyle(o.gallery).gap),a=o.gallery.querySelector(`.photo-card[data-id="${e}"]`).getBoundingClientRect().top-r-n-n/2;window.scrollBy({top:a,behavior:"smooth"})},500)},S=({id:e,largeImageURL:r,webformatURL:n,tags:s,likes:t,views:a,comments:l,downloads:m})=>`
  <div class="photo-card" data-id="${e}">
    <a class="photo-link" href="${r}" >
      <img src="${n}" alt="${s}" title="${s}" loading="lazy" />
      <div class="info">
        <p class="info-item">
          <b>Likes</b>
          ${t}
        </p>
        <p class="info-item">
          <b>Views</b>
          ${a}
        </p>
        <p class="info-item">
          <b>Comments</b>
          ${l}
        </p>
        <p class="info-item">
          <b>Downloads</b>
          ${m}
        </p>
      </div>
    </a>
  </div>`,d=()=>{i.page++;const{page:e,per_page:r,query:n}=i;return y({query:n,page:e,per_page:r}).then(s=>{var a;if(((a=s.hits)==null?void 0:a.length)===0)throw new Error("Sorry, there are no images matching your search query. Please try again.");e===1&&u.success({position:"topRight",message:`Hooray! We found ${s.totalHits} images.`});const t=s.hits.map(l=>S(l)).join("");return o.gallery.insertAdjacentHTML("beforeend",t),i.is_loadable=i.page*i.per_page<s.totalHits,v.refresh(),s}).catch(s=>{console.error(s),u.error({position:"topRight",message:s.message})}).finally(()=>{f(o.btnSearch),f(o.btnLoadMore)})};o.searchInput.addEventListener("input",function(){var e;(e=this.value)!=null&&e.length?o.btnSearch.removeAttribute("disabled"):o.btnSearch.setAttribute("disabled",!0)});o.form.addEventListener("submit",e=>{e.preventDefault(),i.page=0,o.gallery.innerHTML="",p(o.btnSearch),o.btnLoadMore.classList.add("hidden"),i.query=o.searchInput.value,d()});o.btnLoadMore.addEventListener("click",()=>{p(o.btnLoadMore),d().then(e=>{var r;L((r=e.hits[0])==null?void 0:r.id)})});o.nav.addEventListener("click",e=>{e.preventDefault();const{currentTarget:r,target:n}=e;r!==n&&(i.load_type=n.dataset.type)});
//# sourceMappingURL=commonHelpers.js.map
