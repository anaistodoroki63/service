var bipCtx = null;

function playBip(vehiculeType) {
  var freq = 600, duree = 0.3;
  if (vehiculeType === 'VSAV') { freq = 1000; duree = 0.5; }
  else if (vehiculeType === 'FPT' || vehiculeType === 'CCF') { freq = 600; duree = 0.4; }
  else if (vehiculeType === 'EPA' || vehiculeType === 'GRVE') { freq = 800; duree = 0.6; }
  else if (vehiculeType === 'VSR' || vehiculeType === 'VL') { freq = 900; duree = 0.25; }
  else { freq = 600; duree = 0.3; }
  
  try {
    if (!bipCtx) bipCtx = new (window.AudioContext || window.webkitAudioContext)();
    var osc = bipCtx.createOscillator();
    var gain = bipCtx.createGain();
    osc.connect(gain);
    gain.connect(bipCtx.destination);
    osc.frequency.value = freq;
    osc.type = 'square';
    gain.gain.value = 0.5;
    osc.start(bipCtx.currentTime);
    osc.stop(bipCtx.currentTime + duree);
  } catch(e) { console.log('Erreur bip: ' + e); }
}

function getVehiculeType(id) {
  if (id.indexOf('VSAV') !== -1) return 'VSAV';
  if (id.indexOf('FPT') !== -1) return 'FPT';
  if (id.indexOf('CCF') !== -1) return 'CCF';
  if (id.indexOf('EPA') !== -1) return 'EPA';
  if (id.indexOf('GRVE') !== -1) return 'GRVE';
  if (id.indexOf('VSR') !== -1) return 'VSR';
  if (id.indexOf('VL') !== -1) return 'VL';
  return 'FPT';
}
