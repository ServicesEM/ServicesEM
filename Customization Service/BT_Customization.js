function insertPaymentSection() {
  const footerSection = document.querySelector('footer#footer > .footer > div:nth-child(1) div.pb-2.px-3');
  const existingPaymentSection = document.querySelector('.paymentsection');
  
  if (footerSection && !existingPaymentSection) {
    const paymentHTML = `
      <div class="paymentsection">
        <div class="paymentlogos">
          <img src="https://a.storyblok.com/f/260755/193x150/cb9153c35f/master-card.svg" alt="Mastercard logo">
          <img src="https://a.storyblok.com/f/260755/1500x1500/a238aa3537/american-express-square-logo.png" alt="American Express Square Logo">
          <img src="https://a.storyblok.com/f/260755/300x97/b049f15744/visa.svg" alt="Visa logo">
          <img src="https://a.storyblok.com/f/260755/91x23/9c7a8cbcd7/paypal.svg" alt="PayPal logo">
          <img src="https://a.storyblok.com/f/260755/204x150/f6892b3ccc/klix_by_citadele.svg" alt="airBaltic payment method Klix by Citadele">
          <img src="https://a.storyblok.com/f/260755/72x25/b373577c3e/trustly.svg" alt="Trustly logo">
          <img src="https://a.storyblok.com/f/260755/64x23/efebfb62c6/bitpay.svg" alt="Bitpay logo">
          <img src="https://a.storyblok.com/f/260755/47x31/664bee5c55/apple-pay.svg" alt="Apple pay logo">
          <img src="https://a.storyblok.com/f/260755/57x31/a0411c0052/google-pay.svg" alt="Google pay logo">
          <img src="https://a.storyblok.com/f/260755/67x21/47d1044ba0/uatp.svg" alt="UATP logo">
        </div>
        <a href="https://www.airbaltic.com/en/before-you-fly/payment-options" target="_blank" rel="noopener noreferrer"></a>
      </div>
    `;
    footerSection.insertAdjacentHTML('beforeend', paymentHTML);
  }
}

function observeDOMChanges() {
  const observer = new MutationObserver((mutationsList) => {
    for (const mutation of mutationsList) {
      if (mutation.type === 'childList') {
        const footerElement = document.querySelector('footer#footer > .footer');
        if (footerElement) {
          insertPaymentSection();
          observer.disconnect();
        }
      }
    }
  });

  const config = { childList: true, subtree: true };
  observer.observe(document.body, config);
}

if (document.readyState === 'complete' || document.readyState === 'interactive') {
  insertPaymentSection();
} else {
  document.addEventListener('DOMContentLoaded', () => {
    insertPaymentSection();
    observeDOMChanges();
  });
}
