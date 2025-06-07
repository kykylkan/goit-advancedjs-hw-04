import{a as g,S as L}from"./assets/vendor-dsYlHsC8.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))o(e);new MutationObserver(e=>{for(const r of e)if(r.type==="childList")for(const a of r.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&o(a)}).observe(document,{childList:!0,subtree:!0});function i(e){const r={};return e.integrity&&(r.integrity=e.integrity),e.referrerPolicy&&(r.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?r.credentials="include":e.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function o(e){if(e.ep)return;e.ep=!0;const r=i(e);fetch(e.href,r)}})();const b="50608541-859a2339eccb527f555031f69",v="https://pixabay.com/api/";async function h(s,t=1,i=15){const o={key:b,q:s,image_type:"photo",orientation:"horizontal",safesearch:!0,page:t,per_page:i};return(await g.get(v,{params:o})).data}function p(s){return s.map(({webformatURL:t,largeImageURL:i,tags:o,likes:e,views:r,comments:a,downloads:y})=>`
    <li class="photo-card">
      <a class="gallery__link" href="${i}">
        <img src="${t}" alt="${o}" loading="lazy" />
      </a>
      <div class="info">
        <p><b>Likes:</b> ${e}</p>
        <p><b>Views:</b> ${r}</p>
        <p><b>Comments:</b> ${a}</p>
        <p><b>Downloads:</b> ${y}</p>
      </div>
    </li>
  `).join("")}const w=document.querySelector("#search-form"),c=document.querySelector(".gallery"),l=document.querySelector(".load-more"),u=document.querySelector(".loader");let d="",n=1,f=0,m;w.addEventListener("submit",async s=>{if(s.preventDefault(),c.innerHTML="",l.classList.add("hidden"),u.classList.remove("hidden"),n=1,d=s.target.elements.searchQuery.value.trim(),!!d)try{const t=await h(d,n);if(f=t.totalHits,t.hits.length===0){c.innerHTML="<p>No images found.</p>";return}c.innerHTML=p(t.hits),m=new L(".gallery a").refresh(),t.hits.length<15||n*15>=f?l.classList.add("hidden"):l.classList.remove("hidden")}catch(t){console.error(t)}finally{u.classList.add("hidden")}});l.addEventListener("click",async()=>{n++,u.classList.remove("hidden");try{const s=await h(d,n);c.insertAdjacentHTML("beforeend",p(s.hits)),m.refresh();const{height:t}=document.querySelector(".gallery").firstElementChild.getBoundingClientRect();window.scrollBy({top:t*2,behavior:"smooth"}),n*15>=f&&(l.classList.add("hidden"),c.insertAdjacentHTML("beforeend",`<p class="end-message">We're sorry, but you've reached the end of search results.</p>`))}catch(s){console.error(s)}finally{u.classList.add("hidden")}});
//# sourceMappingURL=index.js.map
