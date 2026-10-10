'use strict';

/* Additive Bridge presentation layer: keeps the existing shop content intact. */
(() => {
  const original = window.bridgeExpansion;
  if (typeof original !== 'function') return;
  window.bridgeExpansion = function () {
    const visual = `<div class="bridge-feature"><div class="bridge-feature-copy"><span class="meta">01 · UNA AI BRIDGE</span><h3>${t('Ein Bild. Zwei Wege. Ein klarer nächster Schritt.','Jedna slika. Dva puta. Jasan sljedeći korak.')}</h3><p>${t('Die Bridge verbindet die verständliche Ansicht für Menschen mit einem freigegebenen, strukturierten Briefing für KI-Assistenten. So werden wichtige Informationen einmal klar vorbereitet und können anschließend schneller geprüft werden.','Bridge povezuje razumljivi prikaz za ljude sa odobrenim, strukturiranim briefingom za AI asistente. Važne informacije pripreme se jednom i zatim se mogu brže provjeriti.')}</p><ul><li>${t('Klicken: die öffentliche Präsentation öffnen','Klik: otvorite javnu prezentaciju')}</li><li>${t('Scannen: den öffentlichen KI-Zugang prüfen','Skeniranje: provjerite javni AI pristup')}</li><li>${t('Menschliche Freigabe bleibt im Prozess','Ljudsko odobrenje ostaje dio procesa')}</li></ul><div class="detail-actions"><a class="button" href="#qr">${t('Bridge öffnen','Otvori Bridge')}</a><a class="button secondary" href="#bridge">${t('Konzept ansehen','Pogledaj koncept')}</a></div></div><a class="bridge-feature-art" href="#qr" aria-label="${t('UNA AI Bridge öffnen','Otvori UNA AI Bridge')}"><img src="assets/bridge-silver-scene.jpg" alt="${t('Silberne UNA AI Bridge Grafik mit QR-Zugang','Srebrna UNA AI Bridge grafika sa QR pristupom')}"><img class="bridge-feature-qr" src="assets/bridge-scan.png" alt="${t('QR-Code zum öffentlichen UNA Briefing','QR kod za javni UNA briefing')}"><span>${t('KLICKEN · SCANNEN · VERSTEHEN','KLIKNI · SKENIRAJ · RAZUMIJ')}</span></a></div>`;
    return original().replace('<div class="service-grid">', `${visual}<div class="service-grid">`);
  };
})();
