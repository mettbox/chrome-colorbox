const convertBtn = document.getElementById('convertBtn');
const inputForm = document.getElementById('inputForm');
const outputForm = document.getElementById('outputForm');
const copyBtn = document.getElementById('copy');

navigator.permissions.query({ name: 'clipboard-write' }).then(result => {
  if (result.state === 'granted' || result.state === 'prompt') {
    copyBtn.style.display = 'block';
  }
});

convertBtn.addEventListener('click', async () => {
  outputForm.value = hexify(inputForm.value);
});

copyBtn.addEventListener('click', async () => {
  navigator.clipboard.writeText(outputForm.value);
});

const hexify = color => {
  const values = color
    .replace(/rgba?\(/, '')
    .replace(/\)/, '')
    .replace(/[\s+]/g, '')
    .split(',');

  const a = parseFloat(values[3] || 1);
  const r = Math.floor(a * parseInt(values[0]) + (1 - a) * 255);
  const g = Math.floor(a * parseInt(values[1]) + (1 - a) * 255);
  const b = Math.floor(a * parseInt(values[2]) + (1 - a) * 255);

  return (
    '#' +
    ('0' + r.toString(16)).slice(-2) +
    ('0' + g.toString(16)).slice(-2) +
    ('0' + b.toString(16)).slice(-2)
  );
};
