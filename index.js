import{a as m,S as p,i as n}from"./assets/vendor-hCbx__bN.js";(function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))i(e);new MutationObserver(e=>{for(const t of e)if(t.type==="childList")for(const a of t.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&i(a)}).observe(document,{childList:!0,subtree:!0});function s(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?t.credentials="include":e.crossOrigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function i(e){if(e.ep)return;e.ep=!0;const t=s(e);fetch(e.href,t)}})();const y="56286362-285fb1525f2ba0fd2f4df197e",g="https://pixabay.com/api/",h=async o=>(await m.get(g,{params:{key:y,q:o,image_type:"photo",orientation:"horizontal",safesearch:!0}})).data,l=document.querySelector(".gallery"),d=document.querySelector(".loader"),b=new p(".gallery a",{captionsData:"alt",captionDelay:250}),L=o=>{const r=o.map(({webformatURL:s,largeImageURL:i,tags:e,likes:t,views:a,comments:f,downloads:u})=>`
    <li class="gallery-item">
      <a class="gallery-link" href="${i}">
        <img class="gallery-image" src="${s}" alt="${e}" />
      </a>
      <div class="info">
        <p class="info-item"><b>Likes</b> ${t}</p>
        <p class="info-item"><b>Views</b> ${a}</p>
        <p class="info-item"><b>Comments</b> ${f}</p>
        <p class="info-item"><b>Downloads</b> ${u}</p>
      </div>
    </li>
  `).join("");l.insertAdjacentHTML("beforeend",r),b.refresh()},S=()=>{l.innerHTML=""},v=()=>{d.classList.remove("is-hidden")},w=()=>{d.classList.add("is-hidden")},c=document.querySelector(".form");c.addEventListener("submit",async o=>{o.preventDefault();const r=o.currentTarget.elements["search-text"].value.trim();if(r){S(),v();try{const s=await h(r);if(s.hits.length===0){n.error({message:"Sorry, there are no images matching your search query. Please try again!",position:"topRight"});return}L(s.hits)}catch(s){n.error({title:"Error",message:s.message,position:"topRight"})}finally{w(),c.reset()}}});
//# sourceMappingURL=index.js.map
