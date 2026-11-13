(function(){try{if(window.__mfk)return;window.__mfk=1;var l=location,h=l.hostname,n=navigator,r='';
if(!/(^|\.)mushafuk\.online$/.test(h)||/^\/admin(\/|$)/.test(l.pathname)||n.webdriver||/bot|crawl|spider|slurp|preview|headless|lighthouse/i.test(n.userAgent))return;
try{r=new URL(document.referrer).hostname}catch(e){}
if(/(^|\.)mushafuk\.online$/.test(r))r='';
var K='sb_publishable_UnQ35pj_GatInq-7lhFGgQ_DnRoUnDC';
fetch('https://isvqwafixlmusmuqqnyk.supabase.co/rest/v1/pageviews',{method:'POST',keepalive:true,headers:{apikey:K,Authorization:'Bearer '+K,'Content-Type':'application/json',Prefer:'return=minimal'},body:JSON.stringify({host:h,path:l.pathname.slice(0,300),ref_host:r||null,lang:(document.documentElement.lang||n.language||'').slice(0,12),device:innerWidth<768?'mobile':'desktop'})}).catch(function(){})}catch(e){}})();
