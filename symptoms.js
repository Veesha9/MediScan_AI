/* ============================================================
   MediScan AI — Symptom Checker Logic
   File: js/symptoms.js
   Handles: Symptom selection, remedy rendering
   Depends on: js/remedies.js (REMEDY_DB)
   ============================================================ */

// All available symptoms shown in the symptom grid
const ALL_SYMPTOMS = [
  'Fever',
  'Headache',
  'Fatigue',
  'Cough',
  'Cold',
  'Sore Throat',
  'Body Pain',
  'Nausea',
  'Vomiting',
  'Diarrhea',
  'Constipation',
  'Stomach Pain',
  'Bloating',
  'Dizziness',
  'Chest Pain',
  'Shortness of Breath',
  'Back Pain',
  'Joint Pain',
  'Skin Rash',
  'Insomnia',
  'Anxiety',
  'Loss of Appetite'
];


/* ─────────────────────────────────────────
   BUILD SYMPTOM GRID
   Dynamically creates clickable symptom tags
   Called once on page load
───────────────────────────────────────── */
function buildSymptomGrid() {
  const grid = document.getElementById('symptom-grid');
  if (!grid) return;

  grid.innerHTML = ALL_SYMPTOMS.map(symptom => `
    <div class="symptom-tag" onclick="toggleSymptom(this)">
      ${symptom}
    </div>
  `).join('');
}


/* ─────────────────────────────────────────
   TOGGLE SYMPTOM SELECTION
   Adds/removes 'selected' class on click
   @param {HTMLElement} element - The clicked tag
───────────────────────────────────────── */
function toggleSymptom(element) {
  element.classList.toggle('selected');
}


/* ─────────────────────────────────────────
   CLEAR ALL SELECTIONS
   Deselects all symptom tags and hides results
───────────────────────────────────────── */
function clearSymptoms() {
  document.querySelectorAll('.symptom-tag').forEach(tag => {
    tag.classList.remove('selected');
  });

  // Hide remedy block and alert
  document.getElementById('remedy-block').style.display = 'none';
  document.getElementById('symptom-alert').style.display = 'none';
}


/* ─────────────────────────────────────────
   CHECK SYMPTOMS & FETCH REMEDIES
   Called when user clicks "Suggest Remedies"
───────────────────────────────────────── */
function checkSymptoms() {
  // Get all selected symptom names
  const selectedSymptoms = [...document.querySelectorAll('.symptom-tag.selected')]
    .map(tag => tag.textContent.trim());

  const alertEl  = document.getElementById('symptom-alert');
  const remedyEl = document.getElementById('remedy-block');
  const loaderEl = document.getElementById('symptom-loader');

  // Reset previous output
  remedyEl.style.display = 'none';
  alertEl.style.display  = 'none';

  // ── Validation: at least one symptom required ──
  if (selectedSymptoms.length === 0) {
    alertEl.className = 'alert info';
    alertEl.innerHTML = 'ℹ️ Please select at least one symptom from the list above.';
    alertEl.style.display = 'flex';
    return;
  }

  // ── Simulate AI processing delay ──
  loaderEl.classList.add('active');

  setTimeout(() => {
    loaderEl.classList.remove('active');
    renderRemedies(selectedSymptoms);
  }, 1500); // Simulated 1.5s AI response time
}


/* ─────────────────────────────────────────
   RENDER REMEDIES
   Builds and displays remedy cards
   @param {string[]} selectedSymptoms - Array of symptom names
───────────────────────────────────────── */
function renderRemedies(selectedSymptoms) {
  const remedyBlock = document.getElementById('remedy-block');
  const remedyTitle = document.getElementById('remedy-title');
  const remedyList  = document.getElementById('remedy-list');

  // Update title
  const displaySymptoms = selectedSymptoms.slice(0, 3).join(', ');
  const moreCount = selectedSymptoms.length > 3 ? ` +${selectedSymptoms.length - 3} more` : '';
  remedyTitle.textContent = `🌿 Home Remedies for: ${displaySymptoms}${moreCount}`;

  // Build HTML for all remedies
  let html = '';
  let hasAnyRemedy = false;

  selectedSymptoms.forEach(symptom => {
    const remedies = REMEDY_DB[symptom];

    if (remedies && remedies.length > 0) {
      hasAnyRemedy = true;

      // Section label per symptom
      html += `<p class="symptom-section-label">${symptom}</p>`;

      // Each remedy card
      remedies.forEach(remedy => {
        html += `
          <div class="remedy-card">
            <h5>🌱 ${remedy.name}</h5>
            <p>${remedy.desc}</p>
          </div>
        `;
      });
    }
  });

  // If no remedies found in DB
  if (!hasAnyRemedy) {
    html = `<p style="color:var(--muted); font-size:0.88rem; padding: 0.5rem 0;">
      No specific home remedies found for the selected symptoms. 
      Please consult a qualified doctor for proper diagnosis and treatment.
    </p>`;
  }

  remedyList.innerHTML = html;
  remedyBlock.style.display = 'block';

  // Scroll smoothly to results
  remedyBlock.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}


/* ─────────────────────────────────────────
   INITIALIZE on DOM ready
───────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', function () {
  buildSymptomGrid();
});
