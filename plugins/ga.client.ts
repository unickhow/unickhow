export default defineNuxtPlugin(() => {
  if (process.env.NODE_ENV === 'production' && !window.location.hostname.includes('.vercel.app')) {
    const gaScript = document.createElement('script')
    gaScript.type = 'text/javascript'
    gaScript.innerHTML = `
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', 'G-0ERCV84DE1');
    `
    document.head.appendChild(gaScript)
  }
})
