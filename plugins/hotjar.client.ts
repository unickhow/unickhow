export default defineNuxtPlugin(() => {
  if (process.env.NODE_ENV === 'production' && !window.location.hostname.includes('.vercel.app')) {
    const hotjarScript = document.createElement('script')
    hotjarScript.type = 'text/javascript'
    hotjarScript.innerHTML = `
      (function(h,o,t,j,a,r){
        h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)};
        h._hjSettings={hjid:2135847,hjsv:6};
        a=o.getElementsByTagName('head')[0];
        r=o.createElement('script');r.async=1;
        r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv;
        a.appendChild(r);
      })(window,document,'https://static.hotjar.com/c/hotjar-','.js?sv=');
    `
    document.head.appendChild(hotjarScript)
  }
})
