/* Archivo visual de Universe y Rosita. Fotos y videos provienen del material enviado. */
(() => {
  const $ = (s, root=document) => root.querySelector(s);
  const $$ = (s, root=document) => [...root.querySelectorAll(s)];
  const gallery = $('#photoArchive');
  const reel = $('#videoArchive');
  const dialog = $('#archiveDialog');
  const overlay = $('#archiveMedia');
  const collections = {fotos: ARCHIVO.fotos, videos: ARCHIVO.videos};
  let type = 'fotos', current = 0;
  let filter = 'todos';
  let viewItems = collections.fotos;
  const text=(selector,value)=>$(selector).textContent=value;
  const imageLabel = item => item.tag === 'roblox' ? 'Nuestro mundo en Roblox · 2023' : 'Momentos de la vida real';

  function makePhotoCard(item, index) {
    const button = document.createElement('button');
    button.className = 'photo-archive-card'; button.type='button';
    button.dataset.group = item.tag;
    button.setAttribute('aria-label', `Abrir fotografía ${index+1}: ${item.titulo}`);
    const img = document.createElement('img'); img.src=item.src;img.alt=item.subtitulo;img.loading='lazy';img.decoding='async';
    const details = document.createElement('span'); details.className='photo-archive-caption';
    const ordinal = document.createElement('small'); ordinal.textContent=String(index+1).padStart(2,'0')+' / 48';
    const title = document.createElement('strong'); title.textContent = item.tag==='roblox' ? 'Universe & Rosita' : 'Steven & Ashley';
    details.append(ordinal,title);button.append(img,details);
    button.addEventListener('click',()=>openItem('fotos', collections.fotos.indexOf(item)));
    return button;
  }
  collections.fotos.forEach((item,i)=>gallery.append(makePhotoCard(item,i)));

  function makeVideoCard(item,i) {
    const button=document.createElement('button');button.type='button';button.className='video-card';
    button.setAttribute('aria-label','Reproducir video '+(i+1)+': '+item.titulo);
    const img=document.createElement('img');img.loading='lazy';img.decoding='async';img.src=item.poster;img.alt='Fotograma del video';
    const badge=document.createElement('span');badge.className='video-play';badge.textContent='▶';
    const footer=document.createElement('div');footer.className='video-card-footer';
    const duration=Math.floor(item.duracion/60)+':'+String(item.duracion%60).padStart(2,'0');
    footer.innerHTML='<small></small><strong></strong><span></span>';
    $('small',footer).textContent='RECORTE '+String(i+1).padStart(2,'0');
    $('strong',footer).textContent=item.titulo;
    $('span',footer).textContent=duration;
    button.append(img,badge,footer);button.addEventListener('click',()=>openItem('videos',i));return button;
  }
  collections.videos.forEach((item,i)=>reel.append(makeVideoCard(item,i)));

  $('#openArchive').addEventListener('click',()=>{
    const block=$('#archiveCollection');const willOpen=block.hidden;
    block.hidden=!willOpen;
    $('#openArchive').setAttribute('aria-expanded',String(willOpen));
    $('#openArchive').innerHTML=willOpen?'Cerrar el álbum <span>↑</span>':'Abrir todos nuestros recuerdos <span>↗</span>';
    if(willOpen) block.scrollIntoView({behavior:matchMedia('(prefers-reduced-motion:reduce)').matches?'auto':'smooth',block:'start'});
  });
  $$('.archive-filter').forEach(button=>button.addEventListener('click',()=>{
    filter=button.dataset.filter;
    $$('.archive-filter').forEach(node=>{const active=node===button;node.classList.toggle('active',active);node.setAttribute('aria-pressed',String(active));});
    $$('.photo-archive-card').forEach(node=>node.hidden=filter!=='todos'&&filter!==node.dataset.group);
  }));

  function openItem(kind,index){
    type=kind;current=index;
    showItem();
    if(!dialog.open) dialog.showModal();
  }
  function showItem(){
    const item=collections[type][current];
    if(!item)return;
    overlay.replaceChildren();
    if(type==='fotos'){
      const img=document.createElement('img');img.src=item.src;img.alt=item.subtitulo;img.className='archive-full-photo';
      overlay.append(img);
      text('#archiveMediaTitle',item.tag==='roblox' ? 'Universe y Rosita' : 'Steven y Ashley');
      text('#archiveMediaDescription',imageLabel(item));
    }else{
      if(typeof stopMusic==='function')stopMusic();
      const video=document.createElement('video');video.src=item.src;video.poster=item.poster;video.controls=true;video.autoplay=true;video.playsInline=true;video.preload='metadata';
      video.setAttribute('aria-label',item.titulo);video.className='archive-full-video';
      overlay.append(video);video.play().catch(()=>{});
      text('#archiveMediaTitle',item.titulo);text('#archiveMediaDescription','Un video guardado para nosotros');
    }
    text('#archiveMediaPosition',(type==='fotos'?'FOTOGRAFÍA ':'VIDEO ')+String(current+1).padStart(2,'0')+' / '+collections[type].length);
  }
  function navigate(delta){
    current=(current+delta+collections[type].length)%collections[type].length;
    showItem();
  }
  $('#archivePrevious').addEventListener('click',()=>navigate(-1));
  $('#archiveNext').addEventListener('click',()=>navigate(1));
  $('#closeArchiveDialog').addEventListener('click',()=>dialog.close());
  dialog.addEventListener('click',ev=>{if(ev.target===dialog)dialog.close()});
  dialog.addEventListener('close',()=>{const v=$('video',overlay);if(v){v.pause();v.removeAttribute('src');v.load()}overlay.replaceChildren();});
  document.addEventListener('keydown',event=>{
    if(!dialog.open)return;
    if(event.key==='ArrowLeft'){event.preventDefault();navigate(-1)}
    if(event.key==='ArrowRight'){event.preventDefault();navigate(1)}
  });
  let startX=null;
  overlay.addEventListener('touchstart',ev=>{if(ev.touches.length===1)startX=ev.touches[0].clientX},{passive:true});
  overlay.addEventListener('touchend',ev=>{if(startX===null||ev.changedTouches.length!==1)return;const dx=ev.changedTouches[0].clientX-startX;startX=null;if(Math.abs(dx)>85)navigate(dx<0?1:-1)},{passive:true});
})();
