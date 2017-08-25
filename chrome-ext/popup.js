function renderInstructions(text) {
  document.getElementById('instructions').textContent = text;
}

document.addEventListener('DOMContentLoaded', function() {
    renderInstructions('To use React VT, open Chrome Developer Tools and open the React VT tab.');
});
