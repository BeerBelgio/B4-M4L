/* Public COT metadata. The static manual remains usable if both data sources fail. */
(() => {
  'use strict';
  if(!document.body.classList.contains('cot-page'))return;
  const note=document.querySelector('#cot-manifest-note');
  const render=data=>{
    if(data?.schemaVersion!==1||data.device?.build!=='0.1.6.5')throw new Error('Unsupported COT documentation metadata.');
    document.querySelectorAll('[data-cot-build]').forEach(el=>{el.textContent='v'+data.device.build;});
    document.body.dataset.docBuild=data.device.build;
    document.body.dataset.docManifest='loaded';
  };
  const fallback=()=>{
    try{render(window.B4M4L_COT_HELP_MANIFEST);document.body.dataset.docManifest='mirror';}
    catch(error){document.body.dataset.docManifest='static';if(note)note.hidden=false;}
  };
  if(location.protocol==='file:')return fallback();
  fetch('help/help-manifest.json',{cache:'no-store'}).then(r=>{if(!r.ok)throw new Error('Metadata unavailable.');return r.json();}).then(render).catch(fallback);
})();
