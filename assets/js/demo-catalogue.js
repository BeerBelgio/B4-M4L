/* The public catalogue remains its two authored HTML cards. Only the isolated demo opts in. */
(() => {
  'use strict';
  const mode=document.body.dataset.demoCatalogue;
  if(!mode)return;
  const grid=document.querySelector('.device-grid'),original=grid.querySelector('[data-device]').cloneNode(true);
  const requested=Number(new URLSearchParams(location.search).get('cards')||mode);
  const count=[2,6,10,12].includes(requested)?requested:10;
  for(let i=2;i<count;i++){
    const node=original.cloneNode(true);node.dataset.demo='true';
    const card=node.querySelector('.device-card'),passive=document.createElement('div');
    passive.className=card.className;passive.setAttribute('role','group');passive.setAttribute('aria-label',`Demo placeholder ${i-1}`);
    passive.append(...card.childNodes);card.replaceWith(passive);
    const art=passive.querySelector('.device-card-art'),label=document.createElement('span');label.textContent='DEMO / PLACEHOLDER';art.replaceChildren(label);
    passive.querySelector('.device-card-flag').textContent='DEMO / PLACEHOLDER';
    passive.querySelector('h3').textContent=`PLACEHOLDER ${String(i-1).padStart(2,'0')}`;
    passive.querySelector('p').textContent='Layout test card. No product, version or download.';
    const cta=node.querySelector('.device-explore'),disabled=document.createElement('span');
    disabled.className=cta.className;disabled.setAttribute('role','link');disabled.setAttribute('aria-disabled','true');
    disabled.append(...cta.childNodes);cta.replaceWith(disabled);grid.append(node);
  }
  document.querySelector('#patch-system').dispatchEvent(new Event('patch:layout'));
})();
