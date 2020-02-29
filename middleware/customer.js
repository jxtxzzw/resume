export default function (context) {
  if (process.client) {
    let script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = '/customer-js.js';
    document.getElementsByTagName('head')[0].appendChild(script)
  }
}
