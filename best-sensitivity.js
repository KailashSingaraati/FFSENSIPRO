// ============ BEST-SENSITIVITY.JS — Filter & Copy ============

function filterSens(type, btn) {
  // Update active tab
  document.querySelectorAll('.tab-btn').forEach(function (b) {
    b.classList.remove('active');
  });
  btn.classList.add('active');

  // Filter cards
  var cards = document.querySelectorAll('.sens-card');
  cards.forEach(function (card) {
    var cardTypes = card.getAttribute('data-type') || '';
    if (type === 'all' || cardTypes.indexOf(type) !== -1) {
      card.style.display = 'flex';
      card.style.animation = 'fadeIn 0.3s ease';
    } else {
      card.style.display = 'none';
    }
  });
}

function copyCard(btn) {
  var card = btn.closest('.sens-card');
  var title = card.querySelector('h3').textContent;
  var values = card.querySelectorAll('.cv');
  var lines = ['🎯 ' + title + ' (FFSensPro)', '──────────────────────'];

  values.forEach(function (cv) {
    var label = cv.querySelector('span').textContent;
    var val = cv.querySelector('strong').textContent;
    lines.push(padRight(label + ':', 12) + val);
  });

  lines.push('──────────────────────');
  lines.push('From: FFSensPro');

  var text = lines.join('\n');

  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(text).then(showGlobalToast).catch(fallbackCopy.bind(null, text));
  } else {
    fallbackCopy(text);
  }
}

function fallbackCopy(text) {
  var ta = document.createElement('textarea');
  ta.value = text;
  ta.style.cssText = 'position:fixed;opacity:0;top:0;left:0';
  document.body.appendChild(ta);
  ta.focus();
  ta.select();
  try { document.execCommand('copy'); } catch (e) {}
  document.body.removeChild(ta);
  showGlobalToast();
}

function showGlobalToast() {
  var toast = document.getElementById('globalToast');
  if (!toast) return;
  toast.classList.remove('hidden');
  setTimeout(function () { toast.classList.add('hidden'); }, 2500);
}

function padRight(str, len) {
  while (str.length < len) str += ' ';
  return str;
}

// Add fadeIn keyframe
var style = document.createElement('style');
style.textContent = '@keyframes fadeIn { from { opacity:0; transform:translateY(10px); } to { opacity:1; transform:translateY(0); } }';
document.head.appendChild(style);
