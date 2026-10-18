/* Members gate: redirect to buy page if no valid session */
(function(){
  "use strict";
  var ok = false;
  try{ ok = sessionStorage.getItem('ldk_access') === '1'; }catch(e){}
  if(!ok){ window.location.replace('../buy.html'); }
})();
