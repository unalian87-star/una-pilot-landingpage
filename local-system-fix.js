(function(){
  if (new URLSearchParams(location.search).get('lang') !== 'bs') return;
  document.title='UNA AI System · Lokalni operativni sistem';
  const title=document.getElementById('hardwareTitle');
  const text=document.getElementById('hardwareText');
  const truth=document.getElementById('truthEyebrow');
  const truthTitle=document.getElementById('truthTitle');
  const truthText=document.getElementById('truthText');
  const contact=document.getElementById('contact');
  const shop=document.getElementById('shop');
  if(title) title.textContent='Sve što sistem firme treba.';
  if(text) text.textContent='Nabavljamo i postavljamo servere, računare, laptope, službene telefone, mreže, kamere i alarmne sisteme prema potrebama firme. Za montažu i održavanje radimo s partnerima; dostupnost i vrijeme reakcije potvrđuju se po gradu i ugovoru.';
  if(truth) truth.textContent='ISKRENE GRANICE';
  if(truthTitle) truthTitle.textContent='Zaštita podataka kroz arhitekturu, ne kroz reklamno obećanje.';
  if(truthText) truthText.textContent='Lokalna obrada može znatno smanjiti slanje podataka u vanjske cloud sisteme. Da li podaci zaista ostaju lokalno zavisi od konfiguracije, dozvola, backup-a, ažuriranja i korištenih programa. Te tačke dokumentujemo i testiramo; ne obećavamo opću garanciju privatnosti ili sigurnosti.';
  if(contact) contact.textContent='Zatražite savjetovanje';
  if(shop) { shop.textContent='Nazad u shop'; shop.href='index.html?lang=bs#shop'; }
})();
