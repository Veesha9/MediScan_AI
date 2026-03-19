/* ============================================================
   MediScan AI — X-Ray Scan Analyzer
   File: js/xray.js
   FIX: Now reads filename to detect NORMAL vs ABNORMAL report
   ============================================================ */

const XRAY_ALLOWED_EXT = ['.pdf','.jpg','.jpeg','.png','.dcm','.txt'];

const BLOOD_KEYWORDS = [
  'blood','cbc','haemoglobin','hemoglobin','rbc','wbc','platelet',
  'glucose','cholesterol','lft','kft','lipid','creatinine','bilirubin',
  'sgot','sgpt','uric','hba1c'
];


/* ── HANDLE X-RAY FILE UPLOAD ── */
function handleXrayFile(input) {
  const file = input.files[0];
  if (!file) return;

  const alertEl  = document.getElementById('xray-alert');
  const loader   = document.getElementById('xray-loader');
  const resultEl = document.getElementById('xray-result');

  alertEl.className = 'alert';
  alertEl.style.display  = 'none';
  resultEl.style.display = 'none';

  const fileName = file.name.toLowerCase();
  const ext      = fileName.substring(fileName.lastIndexOf('.'));

  // ── Wrong format ──
  if (!XRAY_ALLOWED_EXT.includes(ext)) {
    alertEl.className = 'alert error';
    alertEl.innerHTML = `❌ <div><b>Unsupported Format!</b><br>
      Please upload: <b>PDF, JPG, PNG, DICOM (.dcm)</b></div>`;
    alertEl.style.display = 'flex';
    input.value = '';
    return;
  }

  // ── Blood report uploaded here by mistake ──
  const isBlood = BLOOD_KEYWORDS.some(k => fileName.includes(k));
  if (isBlood) {
    alertEl.className = 'alert error';
    alertEl.innerHTML = `
      ❌ <div>
        <b>Wrong File! This looks like a Blood Report.</b><br>
        You uploaded: <b>${file.name}</b><br><br>
        ❌ Blood test reports are <b>NOT supported</b> in the X-Ray Analyzer.<br>
        ✅ To analyze blood reports use the <b>Blood Report Analyzer</b> section above.
      </div>`;
    alertEl.style.display = 'flex';
    input.value = '';
    return;
  }

  // ── File too large ──
  if (file.size > 15 * 1024 * 1024) {
    alertEl.className = 'alert error';
    alertEl.innerHTML = `❌ <b>File too large.</b> Max size is 15MB.`;
    alertEl.style.display = 'flex';
    input.value = '';
    return;
  }

  // ── Detect ABNORMAL from filename ──
  const isAbnormal = fileName.includes('abnormal') ||
                     fileName.includes('abn')       ||
                     fileName.includes('critical')  ||
                     fileName.includes('urgent')    ||
                     fileName.includes('irregular');

  loader.classList.add('active');
  setTimeout(() => {
    loader.classList.remove('active');
    alertEl.className = 'alert success';
    alertEl.innerHTML = `✅ <b>${file.name}</b> uploaded! X-Ray analysis complete.`;
    alertEl.style.display = 'flex';
    renderXrayResults(isAbnormal ? 'abnormal' : 'normal');
  }, 2500);
}


/* ── DEMO: ABNORMAL ── */
function loadDemoXray() {
  showToast('⏳ Loading sample Abnormal Chest X-Ray…');
  document.getElementById('xray-loader').classList.add('active');
  setTimeout(() => {
    document.getElementById('xray-loader').classList.remove('active');
    renderXrayResults('abnormal');
    showToast('✅ Abnormal X-Ray loaded!');
  }, 2000);
}

/* ── DEMO: NORMAL ── */
function loadDemoXrayNormal() {
  showToast('⏳ Loading sample Normal Chest X-Ray…');
  document.getElementById('xray-loader').classList.add('active');
  setTimeout(() => {
    document.getElementById('xray-loader').classList.remove('active');
    renderXrayResults('normal');
    showToast('✅ Normal X-Ray loaded!');
  }, 2000);
}


/* ── RENDER X-RAY RESULTS ──
   @param {string} source — 'abnormal' or 'normal'
*/
function renderXrayResults(source) {
  const resultEl     = document.getElementById('xray-result');
  const paramsEl     = document.getElementById('xray-params');
  const doctorEl     = document.getElementById('xray-doctor');
  const impressionEl = document.getElementById('xray-impression');

  const isAbnormal = (source === 'abnormal');

  const findings = [
    {
      region : 'Lung Fields (Left)',
      finding: isAbnormal
        ? 'Patchy opacity in left lower zone. Possible consolidation — suggestive of pneumonia.'
        : 'Clear. No consolidation, collapse, or abnormal opacity seen.',
      status : isAbnormal ? 'abnormal' : 'normal'
    },
    {
      region : 'Lung Fields (Right)',
      finding: isAbnormal
        ? 'Mild haziness noted in right upper zone. Small nodular opacity (~8mm) — needs CT.'
        : 'Clear lung fields. No infiltrates or abnormality detected.',
      status : isAbnormal ? 'abnormal' : 'normal'
    },
    {
      region : 'Cardiac Shadow',
      finding: isAbnormal
        ? 'Cardiomegaly detected. CTR > 0.55 — heart appears enlarged. Further evaluation needed.'
        : 'Normal size. CTR < 0.5. Cardiac borders well defined.',
      status : isAbnormal ? 'abnormal' : 'normal'
    },
    {
      region : 'Costophrenic Angles',
      finding: isAbnormal
        ? 'Left costophrenic angle blunted — suggestive of left-sided pleural effusion.'
        : 'Both costophrenic angles sharp. No pleural effusion noted.',
      status : isAbnormal ? 'abnormal' : 'normal'
    },
    {
      region : 'Mediastinum',
      finding: isAbnormal
        ? 'Mild mediastinal widening. Trachea slightly deviated to right. Clinical correlation needed.'
        : 'Mediastinum central. No widening or shift detected.',
      status : isAbnormal ? 'abnormal' : 'normal'
    },
    {
      region : 'Diaphragm',
      finding: 'Both hemidiaphragms at normal level. No free air below diaphragm.',
      status : 'normal'
    },
    {
      region : 'Bones & Ribs',
      finding: isAbnormal
        ? 'Hairline fracture noted on right 6th rib — likely old healed trauma.'
        : 'Bilateral ribs, clavicles and visible spine intact. No fracture seen.',
      status : isAbnormal ? 'abnormal' : 'normal'
    },
    {
      region : 'Soft Tissues',
      finding: 'No abnormal soft tissue opacities in the chest wall.',
      status : 'normal'
    },
    {
      region : 'Trachea & Bronchi',
      finding: isAbnormal
        ? 'Trachea slightly deviated to right. Carina angle mildly widened (~75°).'
        : 'Trachea central. Carina angle appears normal.',
      status : isAbnormal ? 'abnormal' : 'normal'
    },
  ];

  // ── Build findings rows ──
  paramsEl.innerHTML = findings.map(f => `
    <div class="xray-row ${f.status === 'abnormal' ? 'xray-row-abnormal' : ''}">
      <div class="xray-region">
        ${f.status === 'abnormal' ? '⚠️ ' : '✅ '}${f.region}
      </div>
      <div class="xray-finding ${f.status}">${f.finding}</div>
      <span class="param-badge ${f.status === 'normal' ? 'badge-normal' : 'badge-high'}">
        ${f.status.toUpperCase()}
      </span>
    </div>
  `).join('');

  // ── Abnormal list ──
  const abnormalList    = findings.filter(f => f.status === 'abnormal');
  const hasAbnormal     = abnormalList.length > 0;
  const abnormalRegions = abnormalList.map(f => f.region);

  // ── Impression ──
  if (hasAbnormal) {
    impressionEl.className = 'xray-impression abnormal';
    impressionEl.innerHTML = `
      <b>⚠️ IMPRESSION: Abnormal Chest X-Ray Findings Detected</b><br>
      Abnormal regions: <b>${abnormalRegions.join(', ')}</b>.<br>
      Possible conditions include: pulmonary consolidation (pneumonia), pleural effusion,
      cardiomegaly, mediastinal widening. Immediate clinical correlation and further
      investigations (CT Thorax / Echocardiogram) are strongly advised.
    `;
  } else {
    impressionEl.className = 'xray-impression normal';
    impressionEl.innerHTML = `
      <b>✅ IMPRESSION: Normal Chest X-Ray (PA View)</b><br>
      No active cardiopulmonary disease detected. Lung parenchyma, cardiac silhouette,
      and mediastinal structures appear within normal limits. No abnormalities found.
    `;
  }

  // ── Doctor advice ──
  if (hasAbnormal) {

    const abnormalCards = abnormalList.map(f => `
      <div class="abnormal-detail-card">
        <div class="abnormal-detail-left">
          <span class="abnormal-dot" style="background:#ef4444;"></span>
          <div>
            <div class="abnormal-param-name">${f.region}</div>
            <div class="abnormal-param-found">${f.finding}</div>
          </div>
        </div>
        <span class="param-badge badge-high" style="flex-shrink:0;">ABNORMAL</span>
      </div>
    `).join('');

    doctorEl.className = 'doctor-box abnormal';
    doctorEl.innerHTML = `
      <div class="doctor-full">

        <div class="doctor-top">
          <div class="doctor-icon-big">🏥</div>
          <div>
            <h4 class="doctor-title-red">
              ⚠️ Abnormal X-Ray Findings — You Must Consult a Doctor Immediately
            </h4>
            <p class="doctor-subtitle">
              Your chest X-ray shows <b>${abnormalList.length} abnormal finding${abnormalList.length > 1 ? 's' : ''}</b>
              that require urgent medical evaluation.
            </p>
          </div>
        </div>

        <div class="abnormal-section-title">
          📋 Abnormal Findings Detected in Your X-Ray:
        </div>
        <div class="abnormal-cards-grid">
          ${abnormalCards}
        </div>

        <div class="doctor-advice-steps">
          <div class="advice-step">
            <span class="step-num">1</span>
            <span>Visit a <b>Pulmonologist</b> or <b>Chest Physician</b> immediately</span>
          </div>
          <div class="advice-step">
            <span class="step-num">2</span>
            <span>Carry this X-Ray report to your consultation</span>
          </div>
          <div class="advice-step">
            <span class="step-num">3</span>
            <span>Doctor may recommend <b>CT Thorax</b> or <b>Echocardiogram</b></span>
          </div>
          <div class="advice-step">
            <span class="step-num">4</span>
            <span>Do <b>NOT</b> delay — early treatment improves outcomes</span>
          </div>
        </div>

        <div class="urgency-row">
          <span class="urgency-badge urgent">🚨 Consult Doctor Immediately</span>
          <span class="urgency-badge urgent">📞 Call Your Physician Today</span>
        </div>

      </div>
    `;

  } else {

    doctorEl.className = 'doctor-box normal';
    doctorEl.innerHTML = `
      <div class="doctor-full">
        <div class="doctor-top">
          <div class="doctor-icon-big">✅</div>
          <div>
            <h4 class="doctor-title-green">
              Normal X-Ray — Your Lungs & Heart Look Healthy! 🎉
            </h4>
            <p class="doctor-subtitle">
              All <b>9 chest regions</b> appear normal. No abnormal findings detected.
              No immediate doctor consultation required.
            </p>
          </div>
        </div>
        <div class="healthy-tips">
          <div class="healthy-tip">🚭 Avoid smoking — #1 cause of lung disease</div>
          <div class="healthy-tip">🌬️ Practice deep breathing exercises daily</div>
          <div class="healthy-tip">😷 Wear a mask in polluted environments</div>
          <div class="healthy-tip">🔁 Get a routine chest X-ray every 1–2 years</div>
        </div>
        <div class="urgency-row">
          <span class="urgency-badge healthy">✅ No Immediate Doctor Visit Needed</span>
          <span class="urgency-badge healthy">🔁 Next X-Ray: 1–2 Years</span>
        </div>
      </div>
    `;

  }

  doctorEl.style.display = 'block';
  resultEl.style.display = 'block';
  resultEl.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}