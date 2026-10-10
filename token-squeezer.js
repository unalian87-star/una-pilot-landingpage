'use strict';
const input=document.getElementById('input-text'),output=document.getElementById('output-text'),status=document.getElementById('tool-status');
input.addEventListener('input',()=>document.getElementById('input-count').textContent=input.value.length.toLocaleString('de-DE')+' Zeichen');
document.getElementById('example-text').onclick=()=>{input.value='Bitte beachten Sie, dass wir mit Bezug auf die folgende Aufgabe arbeiten.\n\n\nIn order to prepare the customer reply, use the provided facts.    \nPlease note that the final answer must remain factual.\n';input.dispatchEvent(new Event('input'));};
document.getElementById('compress-text').onclick=()=>{
 const original=input.value;if(!original.trim()){status.textContent='Bitte zuerst einen Text eingeben.';input.focus();return;}
 let result=original.replace(/\r\n?/g,'\n').replace(/[ \t]+$/gm,'').replace(/\n{3,}/g,'\n\n').trim();
 if(document.getElementById('shorten-phrases').checked){for(const[a,b]of [[/\bIn order to\b/gi,'To'],[/\bdue to the fact that\b/gi,'because'],[/\bat this point in time\b/gi,'now'],[/\bPlease note that\s*/gi,''],[/\bBitte beachten Sie, dass\s*/gi,'']])result=result.replace(a,b);}
 const factor=Number(document.getElementById('token-factor').value);if(!Number.isFinite(factor)||factor<1||factor>20){status.textContent='Bitte einen Wert zwischen 1 und 20 Zeichen pro Token wählen.';return;}
 const before=Math.ceil(original.length/factor),after=Math.ceil(result.length/factor),percent=before?Math.round((before-after)/before*100):0;
 output.value=result;document.getElementById('original-tokens').textContent=before.toLocaleString('de-DE');document.getElementById('compressed-tokens').textContent=after.toLocaleString('de-DE');document.getElementById('saved-percent').textContent=percent+' %';document.getElementById('change-summary').textContent=`${original.length.toLocaleString('de-DE')} → ${result.length.toLocaleString('de-DE')} Zeichen. Tokenwerte sind Schätzungen; prüfen Sie Bedeutung und Format vor der Verwendung.`;document.getElementById('tool-results').hidden=false;status.textContent='Text aufgeräumt. Das Original bleibt oben erhalten.';
};
document.getElementById('copy-text').onclick=async()=>{try{await navigator.clipboard.writeText(output.value);status.textContent='Ergebnis kopiert.';}catch{output.focus();output.select();status.textContent='Bitte den markierten Text manuell kopieren.';}};
