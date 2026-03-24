// ============ ABOUT.JS — Accordion ============

function toggleAccord(header) {
  var item = header.closest('.accord-item');
  var isOpen = item.classList.contains('open');

  // Close all
  document.querySelectorAll('.accord-item').forEach(function (i) {
    i.classList.remove('open');
  });

  // Open clicked if it was closed
  if (!isOpen) {
    item.classList.add('open');
  }
}
