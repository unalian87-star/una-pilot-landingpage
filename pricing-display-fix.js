(function(){
  if (typeof window.bridgeExpansion !== 'function') return;
  const original=window.bridgeExpansion;
  window.bridgeExpansion=function(){
    return original().replaceAll('Einstieg ab 290 € netto','Einstieg ab 390 € netto; mehrere Partnerpfade werden als Paket kalkuliert').replaceAll('Početak od 290 € neto','Početak od 390 € neto; više partnerskih puteva obračunava se kao paket').replaceAll('Workflow-Einrichtung ab 190 € netto','Workflow-Einrichtung ab 490 € netto; verbundene Abläufe ab 690 €').replaceAll('Individualno povezivanje procesa od 190 € neto','Individualno povezivanje procesa od 490 € neto; povezani procesi od 690 €');
  };
})();
