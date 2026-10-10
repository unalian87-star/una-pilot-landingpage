(function () {
  'use strict';
  const data = window.SHOP_DATA;
  if (!data || !Array.isArray(data.products)) return;

  const de = (value) => [value, value];
  const setupNote = (name) => [
    `UNA-Einrichtung für ${name}: 1 Konto/Arbeitsplatz ab 149 € netto. Für 2–10 Lizenzen ab 290 €, 11–25 ab 490 €, ab 26 Lizenzen als Firmenpaket. Anbieter-Lizenzen, Abos, Hardware und API-Nutzung werden separat nach dem gewählten Modell ausgewiesen.`,
    `UNA postavljanje za ${name}: 1 nalog/radno mjesto od 149 € neto. Za 2–10 licenci od 290 €, 11–25 od 490 €, od 26 licenci paket za firmu. Licence dobavljača, pretplate, hardver i API korištenje navode se odvojeno prema izabranom modelu.`
  ];
  const workflowNote = [
    'Der Preis richtet sich nach Datenquellen, Schnittstellen, Prüfungen und Betriebsumfang: einfacher Ablauf ab 690 €, verbundener Workflow ab 990 €, mehrere Abteilungen als Firmenpaket. Bei mehreren Automatisierungen sinkt der Stückpreis deutlich; wir kalkulieren ein Gesamtpaket statt denselben Preis mehrfach zu berechnen.',
    'Cijena zavisi od izvora podataka, povezivanja, provjera i obima rada: jednostavan proces od 690 €, povezani workflow od 990 €, više odjela kao paket za firmu. Kod više automatizacija cijena po komadu značajno pada; obračunavamo paket umjesto da isti iznos naplatimo više puta.'
  ];
  const set = (id, values) => {
    const product = data.products.find((item) => item.id === id);
    if (!product) return;
    Object.assign(product, values);
  };

  set('automation-start', { price: 490, priceNote: [
    'Ein klar begrenzter Einstiegs-Workflow ab 490 € netto. Verbundene Systeme, Datenmigration, laufende Betreuung und Anbietergebühren werden separat kalkuliert. Ab zwei Automatisierungen gilt ein Paketpreis mit Mengenrabatt.',
    'Jasan početni workflow od 490 € neto. Povezani sistemi, migracija podataka, podrška i naknade dobavljača obračunavaju se odvojeno. Od dvije automatizacije važi paketna cijena s količinskim popustom.'
  ]});
  data.products.filter((item) => item.category === 'automations' && item.id !== 'automation-start').forEach((item) => {
    item.price = /20|22|23/.test(item.id) ? 990 : 690;
    item.priceNote = workflowNote;
  });

  data.products.filter((item) => item.category === 'software').forEach((item) => {
    item.price = item.id === 'software-04' ? 290 : 149;
    item.priceNote = setupNote(item.name?.[0] || 'Software');
  });
  set('software-01', { price: 149, priceNote: [
    'UNA richtet Google Workspace nach Ihrem Bedarf ein: 1 Lizenz/Konto ab 149 €, 2–10 Lizenzen ab 290 €, 11–25 ab 490 €, ab 26 als Firmenpaket. Die Google-Lizenz selbst wird nach dem gewählten Starter-, Standard-, Plus- oder Enterprise-Modell und der Nutzerzahl separat berechnet. Wir beraten auch zu Microsoft 365 und anderen passenden Lösungen.',
    'UNA postavlja Google Workspace prema Vašim potrebama: 1 licenca/nalog od 149 €, 2–10 licenci od 290 €, 11–25 od 490 €, od 26 paket za firmu. Google licenca se posebno obračunava prema modelu Starter, Standard, Plus ili Enterprise i broju korisnika. Savjetujemo i za Microsoft 365 i druga odgovarajuća rješenja.'
  ]});
  set('software-11', { price: 249, priceNote: [
    'CRM-Ersteinrichtung ab 249 € für ein Konto; 2–10 Nutzer ab 490 €, 11–25 ab 790 €, größere Teams als Paket. Lizenz und laufende Nutzung des Anbieters sind separat.',
    'Početno postavljanje CRM-a od 249 € za jedan nalog; 2–10 korisnika od 490 €, 11–25 od 790 €, veći timovi kao paket. Licenca i korištenje dobavljača obračunavaju se odvojeno.'
  ]});
  set('training-remote', { price: 290, priceNote: [
    'Remote-Schulung ab 290 € netto für eine klar abgegrenzte 90-Minuten-Session. Team-Workshop ab 490 €, mehrere Termine und Firmenschulungen als Paket mit Mengenrabatt. Wir beraten zuerst, ob Google Workspace, Microsoft 365, lokale KI oder ein anderes System am besten passt.',
    'Remote obuka od 290 € neto za jasno definisanu sesiju od 90 minuta. Timska radionica od 490 €, više termina i obuke za firmu kao paket s količinskim popustom. Najprije savjetujemo da li najbolje odgovaraju Google Workspace, Microsoft 365, lokalni AI ili drugi sistem.'
  ]});
  set('executive-briefing', { price: 290, priceNote: [
    'Führungskräfte-Briefing ab 290 € netto. Bei mehreren Teams, Standorten oder Softwarevarianten erstellen wir ein Gesamtangebot.',
    'Briefing za rukovodstvo od 290 € neto. Za više timova, lokacija ili softverskih varijanti pripremamo paketnu ponudu.'
  ]});
  set('ai-bridge', { price: 390, priceNote: [
    'Business-Bridge-Einstieg ab 390 € netto für Briefing, Angebotsprofil, QR-Zugang und Übergabe. Mehrere Abteilungen, Partnerpfade oder geschützte Integrationen werden als Firmenpaket günstiger kalkuliert.',
    'Početak Business Bridge od 390 € neto za briefing, profil ponude, QR pristup i predaju. Više odjela, partnerski putevi ili zaštićene integracije obračunavaju se povoljnije kao paket za firmu.'
  ]});

  const extras = [
    { id: 'software-advice', category: 'services', name: ['Software-Auswahlberatung', 'Savjetovanje pri izboru softvera'], description: ['Google Workspace, Microsoft 365, lokale KI oder eine andere Lösung: Wir vergleichen Bedarf, Lizenzmodell, Datenschutz und laufende Kosten, bevor Sie kaufen.', 'Google Workspace, Microsoft 365, lokalni AI ili drugo rješenje: upoređujemo potrebe, licence, zaštitu podataka i tekuće troškove prije kupovine.'], price: 149, visual: ['Passt das System?', 'Odgovara li sistem?'], tone: 'blue', priceNote: ['Beratung ab 149 € netto. Die gewählte Software, Lizenzen und Umstellungskosten stehen separat in der Offerte.', 'Savjetovanje od 149 € neto. Izabrani softver, licence i troškovi prelaska navode se odvojeno u ponudi.'], features: [['Anforderungen und Teamgrösse klären', 'Razjasniti potrebe i veličinu tima'], ['Modelle und Lizenzen vergleichen', 'Uporediti modele i licence'], ['Entscheidung und Einführung planen', 'Planirati odluku i uvođenje']] },
    { id: 'local-una-system', category: 'software', name: ['UNA AI System · Lokales Betriebssystem', 'UNA AI System · Lokalni operativni sistem'], description: ['Ein privates Unternehmenssystem, das auf eigener Hardware läuft, Prozesse kennenlernt und mit dem Betrieb wächst – mit einer verständlichen Einführung statt grosser Versprechen.', 'Privatni sistem firme koji radi na vlastitom hardveru, uči procese i raste s poslovanjem – uz jasno uvođenje bez velikih obećanja.'], price: 2490, visual: ['LOCAL AI OS', 'LOCAL AI OS'], tone: 'violet', demo: 'local-system.html?lang=de', priceNote: ['UNA AI System Edge ab 2.490 € netto für einen klar begrenzten Start bis 5 Nutzer auf vorhandener Hardware. Team-, Business- und Enterprise-Stufen sowie Hardware, Wartung und optionale Modelllizenzen stehen auf der Zukunftsseite.', 'UNA AI System Edge od 2.490 € neto za jasan početak do 5 korisnika na postojećem hardveru. Team, Business i Enterprise nivoi te hardver, održavanje i opcionalne licence opisani su na stranici budućnosti.'], features: [['Lokale Daten- und Prozessbasis planen', 'Planirati lokalnu osnovu podataka i procesa'], ['Wissensabläufe und Freigaben einrichten', 'Postaviti znanje, procese i odobrenja'], ['Test, Übergabe und Lernplan', 'Test, predaja i plan učenja']] },
    { id: 'hardware-workplace', category: 'services', name: ['Hardware & Unternehmensarbeitsplätze', 'Hardver i radna mjesta firme'], description: ['Server, Computer, Laptops, Diensthandys, Netzwerke, Kameras und Alarmsysteme passend zum Unternehmen beschaffen und einrichten.', 'Serveri, računari, laptopi, službeni telefoni, mreže, kamere i alarmni sistemi prema potrebama firme.'], price: 149, visual: ['HARDWARE', 'HARDVER'], tone: 'teal', priceNote: ['Planung und Einrichtung ab 149 € netto. Die Hardware selbst kostet extra; wir bieten Beschaffung, Vergleich und Einrichtung als Paket an.', 'Planiranje i postavljanje od 149 € neto. Hardver se plaća posebno; nudimo nabavku, poređenje i postavljanje kao paket.'] },
    { id: 'business-phones', category: 'services', name: ['Diensthandys & mobile Arbeitsplätze', 'Službeni telefoni i mobilna radna mjesta'], description: ['Diensthandys mit abgestimmten Apps, Zugriffsrechten, Kontakten und einem sicheren Bridge-Zugang zum freigegebenen Unternehmenssystem.', 'Službeni telefoni s prilagođenim aplikacijama, dozvolama, kontaktima i sigurnim Bridge pristupom odobrenom sistemu firme.'], price: 249, visual: ['MOBILE TEAM', 'MOBILNI TIM'], tone: 'blue', priceNote: ['Einrichtung ab 249 € netto pro Gerätegruppe; Gerät, Vertrag, MDM/Knox und Apps werden nach Modell und Lizenzzahl separat angeboten. Bei mehreren Geräten gilt ein Firmenpaket.', 'Postavljanje od 249 € neto po grupi uređaja; uređaj, ugovor, MDM/Knox i aplikacije zavise od modela i licenci. Za više uređaja važi paket za firmu.'] },
    { id: 'it-care', category: 'services', name: ['IT-Komplettservice & Partner-Wartung', 'Kompletna IT usluga i partnersko održavanje'], description: ['Planung, Einrichtung und laufende Betreuung der IT. Für Vor-Ort-Einsätze arbeiten wir mit geprüften Partnern in grösseren Städten und vereinbaren Reaktionszeiten.', 'Planiranje, postavljanje i stalna podrška IT-a. Za rad na lokaciji sarađujemo s provjerenim partnerima u većim gradovima i dogovaramo vrijeme reakcije.'], price: 590, monthly: 79, visual: ['IT CARE', 'IT PODRŠKA'], tone: 'orange', priceNote: ['Audit und Start-Einrichtung ab 590 € netto. Betreuung ab 79 €/Monat für einen kleinen Standort; mehrere Standorte, Notfallbereitschaft, Ersatzteile und Vor-Ort-Verträge nach Angebot. Partnerverfügbarkeit wird vor Auftrag bestätigt.', 'Audit i početno postavljanje od 590 € neto. Podrška od 79 €/mjesečno za malu lokaciju; više lokacija, hitna podrška, rezervni dijelovi i rad na lokaciji prema ponudi. Dostupnost partnera potvrđuje se prije narudžbe.'] },
    { id: 'security-systems', category: 'services', name: ['Sicherheitstechnik & Schutzkonzept', 'Sigurnosna tehnika i plan zaštite'], description: ['Bedarf und Standort prüfen und passende Partner für Kameras, Alarmanlagen, Zutritt, Backups und Netzwerkschutz koordinieren.', 'Provjeriti potrebe i lokaciju te koordinirati partnere za kamere, alarm, pristup, backup i zaštitu mreže.'], price: 149, visual: ['SECURITY', 'SIGURNOST'], tone: 'violet', priceNote: ['Machbarkeitscheck ab 149 € netto. Geräte, Montage, Leitstelle, Wartung und Versicherungsbedingungen sind separate Partnerleistungen. Keine pauschale Sicherheitsgarantie.', 'Provjera izvedivosti od 149 € neto. Uređaji, montaža, nadzor, održavanje i uslovi osiguranja su odvojene partnerske usluge. Nema opće garancije sigurnosti.'] },
    { id: 'una-membership', category: 'services', name: ['UNA Group Mitgliedschaft', 'UNA Group članstvo'], description: ['Zugang zu Partnerangeboten, Empfehlungen und abgestimmten Unternehmensvorteilen. Bei teilnehmenden Mitgliedern können 20 % Vorteil gelten; Teilnahme und Bedingungen werden je Partner ausgewiesen.', 'Pristup partnerskim ponudama, preporukama i pogodnostima za firme. Kod učesnika može važiti 20 % pogodnosti; učešće i uslovi navode se za svakog partnera.'], price: 19, monthly: 19, visual: ['UNA NETWORK', 'UNA MREŽA'], tone: 'teal', priceNote: ['Mitgliedschaft ab 19 €/Monat netto. Juristische Erstberatung kann im Mitgliedsmodell nach Umfang und Partnerverfügbarkeit enthalten sein. Zahnzusatzleistungen und Versicherungen sind noch separate Partnerangebote und gelten erst nach schriftlich bestätigten Bedingungen.', 'Članstvo od 19 €/mjesečno neto. Početno pravno savjetovanje može biti uključeno prema obimu i dostupnosti partnera. Dentalne usluge i osiguranja su odvojene partnerske ponude i važe tek nakon pisanih uslova.'] },
  ];
  extras.forEach((item) => { if (!data.products.some((existing) => existing.id === item.id)) data.products.push(item); });
})();
