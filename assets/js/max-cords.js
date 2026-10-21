/* Real HTML anchors, responsive curves and independent connections. No runtime device link. */
(() => {
  'use strict';
  const NS = 'http://www.w3.org/2000/svg';
  const clamp = (n,min,max) => Math.max(min,Math.min(max,n));
  // Trim every turn, then join tangent segments. There are no sharp elbow paths.
  function rounded(points, radius=22) {
    const p=points.filter((v,i)=>!i||Math.hypot(v.x-points[i-1].x,v.y-points[i-1].y)>.1);
    if(p.length<2)return '';
    let d=`M ${p[0].x} ${p[0].y}`,current=p[0];
    const line=end=>{d+=` C ${current.x} ${current.y} ${end.x} ${end.y} ${end.x} ${end.y}`;current=end;};
    for(let i=1;i<p.length-1;i++){
      const a=p[i-1],b=p[i],c=p[i+1];
      const l1=Math.hypot(b.x-a.x,b.y-a.y),l2=Math.hypot(c.x-b.x,c.y-b.y);
      const r=Math.min(radius,l1/2,l2/2);
      const before={x:b.x+(a.x-b.x)*r/l1,y:b.y+(a.y-b.y)*r/l1};
      const after={x:b.x+(c.x-b.x)*r/l2,y:b.y+(c.y-b.y)*r/l2};
      line(before);d+=` Q ${b.x} ${b.y} ${after.x} ${after.y}`;current=after;
    }
    line(p[p.length-1]);return d;
  }
  class PatchGraph {
    constructor(root) {
      this.root=root;this.frame=0;this.observed=new Set();this.transitions=new Set();
      this.svg=document.createElementNS(NS,'svg');
      this.svg.classList.add('max-cords');this.svg.setAttribute('aria-hidden','true');
      this.svg.setAttribute('focusable','false');root.prepend(this.svg);
      this.schedule=this.schedule.bind(this);
      this.ro='ResizeObserver' in window ? new ResizeObserver(this.schedule) : null;
      this.mo=new MutationObserver(records=>{
        if(records.every(m=>m.target.closest?.('.max-cords')))return;
        this.refresh();this.schedule();
      });
      this.mo.observe(root,{subtree:true,childList:true,characterData:true,attributes:true,attributeFilter:['open','lang']});
      root.addEventListener('patch:layout',this.schedule);
      root.addEventListener('toggle',this.schedule,true);
      root.addEventListener('load',this.schedule,true);
      root.addEventListener('transitionrun',e=>{if(e.propertyName==='transform'){this.transitions.add(e.target);this.schedule();}});
      for(const type of ['transitionend','transitioncancel'])root.addEventListener(type,e=>{if(e.propertyName==='transform'){this.transitions.delete(e.target);this.schedule();}});
      window.addEventListener('resize',this.schedule,{passive:true});
      window.addEventListener('scroll',this.schedule,{passive:true});
      window.visualViewport?.addEventListener('resize',this.schedule);
      document.fonts?.ready.then(this.schedule);
      this.refresh();this.schedule();
    }
    owned(selector) {return [...this.root.querySelectorAll(selector)].filter(el=>el.closest('[data-patch-graph]')===this.root);}
    refresh() {
      const current=new Set([this.root,...this.root.querySelectorAll('[data-node],[data-port],[data-device],.compat-grid,.help-entry,.public-accordion,.device-actions')]);
      for(const el of this.observed)if(!current.has(el))this.ro?.unobserve(el);
      for(const el of current)if(!this.observed.has(el))this.ro?.observe(el);
      this.observed=current;
    }
    point(el,bottom=false) {
      if(!el)return null;
      const r=el.getBoundingClientRect(),b=this.root.getBoundingClientRect();
      return {x:(r.left+r.width/2-b.left)*this.root.clientWidth/b.width,
        y:((bottom?r.bottom+1:r.top+r.height/2)-b.top)*this.root.clientHeight/b.height};
    }
    left(el) {
      return (el.getBoundingClientRect().left-this.root.getBoundingClientRect().left)*this.root.clientWidth/this.root.getBoundingClientRect().width;
    }
    curve(a,b,route='',index=0) {
      if(route==='flow'&&(matchMedia('(min-width:621px)').matches||Math.abs(b.x-a.x)>Math.abs(b.y-a.y))){
        const dx=Math.max(12,(b.x-a.x)*.45);
        return `M ${a.x} ${a.y} C ${a.x+dx} ${a.y} ${b.x-dx} ${b.y} ${b.x} ${b.y}`;
      }
      if(route==='home-special' && b.y>a.y+60){
        const lane=a.y+Math.max(24,(b.y-a.y)*.45);
        return rounded([a,{x:a.x,y:lane},{x:b.x,y:lane},b],38);
      }
      if(route==='render')return rounded([a,{x:a.x,y:b.y-26},{x:b.x,y:b.y-26},b],16);
      if(route==='section'){
        const column=this.root.querySelector('.public-section'),lane=Math.max(5,this.left(column)-12-index*5);
        const exit=a.y+18+index*7;
        return rounded([a,{x:a.x,y:exit},{x:lane,y:exit},{x:lane,y:b.y-24},{x:b.x,y:b.y-24},b],18);
      }
      if(route==='guide'){
        const column=this.root.querySelector('.device-cover-copy');
        const scale=this.root.clientWidth/this.root.getBoundingClientRect().width;
        const right=column ? this.left(column)+column.getBoundingClientRect().width*scale : this.root.clientWidth-19;
        const lane=Math.min(this.root.clientWidth-7,right+12);
        return rounded([a,{x:a.x,y:a.y+18},{x:lane,y:a.y+18},{x:lane,y:b.y-24},{x:b.x,y:b.y-24},b],16);
      }
      const bend=clamp(Math.abs(b.y-a.y)*.34,16,110);
      if(b.y>=a.y+8)return `M ${a.x} ${a.y} C ${a.x} ${a.y+bend} ${b.x} ${b.y-bend} ${b.x} ${b.y}`;
      // A repositioned hero may connect upwards: one rounded return path, behind boxes.
      const x=clamp(Math.min(a.x,b.x)-28,6,this.root.clientWidth-6);
      return rounded([a,{x:a.x,y:a.y+18},{x,y:a.y+18},{x,y:b.y-18},{x:b.x,y:b.y-18},b],16);
    }
    schedule() {if(!this.frame)this.frame=requestAnimationFrame(()=>this.draw());}
    draw() {
      const began=performance.now();
      this.frame=0;
      if(!this.root.clientWidth||!this.root.clientHeight)return;
      const vb=`0 0 ${this.root.clientWidth} ${this.root.clientHeight}`;
      if(this.svg.getAttribute('viewBox')!==vb)this.svg.setAttribute('viewBox',vb);
      const fragment=document.createDocumentFragment();
      let number=0;
      const wire=(a,b,kind='normal',route='',meta={},index=0)=>{
        if(!a||!b)return;
        const d=this.curve(a,b,route,index),group=document.createElementNS(NS,'g');
        group.setAttribute('data-wire-id',String(++number));group.setAttribute('data-kind',kind);
        for(const [name,value] of Object.entries(meta))group.setAttribute('data-'+name,value);
        const layers=[kind==='normal'?'edge':'edge-special',kind];
        if(kind==='msp'||kind==='jitter')layers.push(kind+'-stripe');
        for(const type of layers){
          const path=document.createElementNS(NS,'path');path.setAttribute('d',d);path.setAttribute('class','max-cord '+type);
          for(const [name,value] of Object.entries(meta))path.setAttribute('data-'+name,value);
          group.append(path);
        }
        fragment.append(group);
      };
      const port=name=>this.point(this.root.querySelector(`[data-port="${name}"]`));
      let section=0;
      // Each declarative relation produces its own complete outlet-to-inlet cable.
      for(const link of this.owned('[data-cable]')){
        wire(port(link.dataset.from),port(link.dataset.to),link.dataset.kind||'normal',link.dataset.route,
          {from:link.dataset.from,to:link.dataset.to},link.dataset.route==='section'?section++:0);
      }
      // No row chaining, shared spines or graphical Y/T junctions in the catalogue.
      this.owned('.device-node[data-device]').forEach((node,index)=>{
        wire(port('browse-out'),this.point(node.querySelector('[data-device-port]')),'normal','',
          {from:'browse-out',connection:'device-input','device-index':index});
        wire(this.point(node.querySelector('[data-card-out]')),this.point(node.querySelector('[data-explore-in]')),'jitter','',
          {connection:'card-explore','device-index':index});
      });
      this.svg.replaceChildren(fragment);
      const elapsed=performance.now()-began;
      this.maxDrawMs=Math.max(this.maxDrawMs||0,elapsed);
      this.root.dataset.cordDrawMs=elapsed.toFixed(3);
      this.root.dataset.cordMaxDrawMs=this.maxDrawMs.toFixed(3);
      this.root.dataset.cordWireCount=String(number);
      for(const el of this.transitions)if(!el.isConnected)this.transitions.delete(el);
      if(this.transitions.size)this.schedule();
    }
  }
  document.querySelectorAll('[data-patch-graph]').forEach(root=>new PatchGraph(root));
})();
