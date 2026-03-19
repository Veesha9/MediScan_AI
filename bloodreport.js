/* ============================================================
   MediScan AI — Blood Report Analyzer
   File: js/bloodreport.js
   FIX: Now reads filename to detect NORMAL vs ABNORMAL report
   ============================================================ */

const XRAY_KEYWORDS = [
  'xray','x-ray','x_ray','chest','radiograph','scan','ct','mri',
  'ultrasound','sono','dicom','imaging','mammogram','fluoroscopy','nuclear'
];
const ALLOWED_EXTENSIONS = ['.pdf','.jpg','.jpeg','.png','.csv','.txt'];


/* ── TAB SWITCH ── */
function switchTab(tabName) {
  document.querySelectorAll('.tab').forEach(b => b.classList.remove('active'));
  event.target.classList.add('active');
  document.getElementById('tab-upload').style.display = tabName === 'upload' ? '' : 'none';
  document.getElementById('tab-demo').style.display   = tabName === 'demo'   ? '' : 'none';
}


/* ── HANDLE FILE UPLOAD ── */
function handleFile(input) {
  const file = input.files[0];
  if (!file) return;

  const alertEl = document.getElementById('file-alert');
  const loader  = document.getElementById('file-loader');
  const result  = document.getElementById('report-result');

  alertEl.className = 'alert';
  alertEl.style.display = 'none';
  result.style.display  = 'none';

  const fileName = file.name.toLowerCase();

  // ── STEP 1: Reject X-ray files ──
  const isXray = XRAY_KEYWORDS.some(k => fileName.includes(k));
  if (isXray) {
    alertEl.className = 'alert error';
    alertEl.innerHTML = `
      ❌ <div>
        <b>Wrong File Detected! This is an X-Ray / Imaging Scan.</b><br>
        You uploaded: <b>${file.name}</b><br><br>
        ❌ X-ray, CT scan, MRI files are <b>NOT supported</b> here.<br>
        ✅ Please upload a <b>blood test report</b> — CBC, LFT, KFT etc.<br>
        ✅ To analyze X-ray scans use the <b>X-Ray Analyzer</b> section below.
      </div>`;
    alertEl.style.display = 'flex';
    input.value = '';
    return;
  }

  // ── STEP 2: Check extension ──
  const ext = fileName.substring(fileName.lastIndexOf('.'));
  if (!ALLOWED_EXTENSIONS.includes(ext)) {
    alertEl.className = 'alert error';
    alertEl.innerHTML = `❌ <div><b>Unsupported Format!</b><br>Please upload: <b>PDF, JPG, PNG, CSV, TXT</b></div>`;
    alertEl.style.display = 'flex';
    input.value = '';
    return;
  }

  // ── STEP 3: File size ──
  if (file.size > 10 * 1024 * 1024) {
    alertEl.className = 'alert error';
    alertEl.innerHTML = `❌ <b>File too large.</b> Max size is 10MB.`;
    alertEl.style.display = 'flex';
    input.value = '';
    return;
  }

  // ── STEP 4: Detect if ABNORMAL report by filename ──
  // If filename contains 'abnormal', 'abn', 'critical', 'urgent' → show abnormal values
  const isAbnormal = fileName.includes('abnormal') ||
                     fileName.includes('abn')       ||
                     fileName.includes('critical')  ||
                     fileName.includes('urgent')    ||
                     fileName.includes('irregular');

  loader.classList.add('active');
  setTimeout(() => {
    loader.classList.remove('active');
    alertEl.className = 'alert success';
    alertEl.innerHTML = `✅ <b>${file.name}</b> uploaded successfully! Analysis complete.`;
    alertEl.style.display = 'flex';

    // Pass 'abnormal' or 'normal' based on filename
    renderReportResults(isAbnormal ? 'abnormal' : 'normal');
  }, 2000);
}


/* ── DEMO REPORT ── */
function loadDemoReport() {
  showToast('⏳ Loading sample ABNORMAL CBC blood report…');
  document.getElementById('file-loader').classList.add('active');
  setTimeout(() => {
    document.getElementById('file-loader').classList.remove('active');
    renderReportResults('abnormal'); // Demo always shows abnormal
    showToast('✅ Sample abnormal report loaded!');
  }, 1800);
}


/* ── RENDER BLOOD REPORT RESULTS ──
   @param {string} source — 'abnormal' or 'normal'
*/
function renderReportResults(source) {
  const resultEl = document.getElementById('report-result');
  const paramsEl = document.getElementById('report-params');
  const doctorEl = document.getElementById('doctor-advice');

  const isAbnormal = (source === 'abnormal' || source === 'demo');

  // ── Blood parameters ──
  // abnormal = bad values | normal = healthy values
  const bloodParams = [
    {
      name   : 'Haemoglobin (Hb)',
      value  : isAbnormal ? '10.2 g/dL'     : '14.2 g/dL',
      ref    : '12.0 – 17.5 g/dL',
      status : isAbnormal ? 'low'            : 'normal'
    },
    {
      name   : 'WBC Count',
      value  : isAbnormal ? '14,800 /µL'    : '7,200 /µL',
      ref    : '4,000 – 11,000 /µL',
      status : isAbnormal ? 'high'           : 'normal'
    },
    {
      name   : 'Platelet Count',
      value  : isAbnormal ? '88,000 /µL'    : '2,50,000 /µL',
      ref    : '1,50,000 – 4,00,000 /µL',
      status : isAbnormal ? 'low'            : 'normal'
    },
    {
      name   : 'RBC Count',
      value  : '4.6 million/µL',
      ref    : '4.5 – 5.5 million/µL',
      status : 'normal'
    },
    {
      name   : 'Fasting Blood Glucose',
      value  : isAbnormal ? '132 mg/dL'     : '92 mg/dL',
      ref    : '70 – 100 mg/dL',
      status : isAbnormal ? 'high'           : 'normal'
    },
    {
      name   : 'Total Cholesterol',
      value  : isAbnormal ? '242 mg/dL'     : '178 mg/dL',
      ref    : '< 200 mg/dL',
      status : isAbnormal ? 'high'           : 'normal'
    },
    {
      name   : 'SGPT / ALT (Liver)',
      value  : isAbnormal ? '74 U/L'        : '28 U/L',
      ref    : '7 – 40 U/L',
      status : isAbnormal ? 'high'           : 'normal'
    },
    {
      name   : 'Serum Creatinine',
      value  : '0.9 mg/dL',
      ref    : '0.6 – 1.2 mg/dL',
      status : 'normal'
    },
    {
      name   : 'Uric Acid',
      value  : isAbnormal ? '9.2 mg/dL'     : '5.1 mg/dL',
      ref    : '3.5 – 7.2 mg/dL',
      status : isAbnormal ? 'high'           : 'normal'
    },
    {
      name   : 'HbA1c',
      value  : isAbnormal ? '7.8%'          : '5.4%',
      ref    : '< 5.7%',
      status : isAbnormal ? 'high'           : 'normal'
    },
    {
      name   : 'Serum Sodium',
      value  : '140 mEq/L',
      ref    : '136 – 145 mEq/L',
      status : 'normal'
    },
    {
      name   : 'Serum Potassium',
      value  : isAbnormal ? '2.9 mEq/L'     : '4.2 mEq/L',
      ref    : '3.5 – 5.0 mEq/L',
      status : isAbnormal ? 'low'            : 'normal'
    },
  ];

  // ── Build parameter rows ──
  paramsEl.innerHTML = bloodParams.map(p => `
    <div class="param-row ${p.status !== 'normal' ? 'param-row-abnormal' : ''}">
      <span class="param-name">
        ${p.status !== 'normal' ? '⚠️ ' : ''}${p.name}
      </span>
      <span class="param-ref">${p.ref}</span>
      <span>
        <span class="param-val ${p.status}">${p.value}</span>
        <span class="param-badge badge-${p.status}">${p.status.toUpperCase()}</span>
      </span>
    </div>
  `).join('');

  // ── Find which params are abnormal ──
  const abnormalList = bloodParams.filter(p => p.status !== 'normal');
  const hasAbnormal  = abnormalList.length > 0;

  // ── Doctor advice box ──
  if (hasAbnormal) {

    const abnormalCards = abnormalList.map(p => `
      <div class="abnormal-detail-card">
        <div class="abnormal-detail-left">
          <span class="abnormal-dot"></span>
          <div>
            <div class="abnormal-param-name">${p.name}</div>
            <div class="abnormal-param-found">
              Found: <b>${p.value}</b> &nbsp;|&nbsp; Normal Range: ${p.ref}
            </div>
          </div>
        </div>
        <span class="param-badge badge-${p.status}" style="flex-shrink:0;">
          ${p.status.toUpperCase()}
        </span>
      </div>
    `).join('');

    doctorEl.className = 'doctor-box abnormal';
    doctorEl.innerHTML = `
      <div class="doctor-full">

        <div class="doctor-top">
          <div class="doctor-icon-big">🏥</div>
          <div>
            <h4 class="doctor-title-red">
              ⚠️ Abnormal Values Detected — You Must Consult a Doctor
            </h4>
            <p class="doctor-subtitle">
              Your blood report shows <b>${abnormalList.length} abnormal parameter${abnormalList.length > 1 ? 's' : ''}</b>
              outside the healthy range. Please do not ignore these results.
            </p>
          </div>
        </div>

        <div class="abnormal-section-title">
          📋 Abnormal Parameters Found in Your Report:
        </div>
        <div class="abnormal-cards-grid">
          ${abnormalCards}
        </div>

        <div class="doctor-advice-steps">
          <div class="advice-step">
            <span class="step-num">1</span>
            <span>Book an appointment with your physician <b>within 24–48 hours</b></span>
          </div>
          <div class="advice-step">
            <span class="step-num">2</span>
            <span>Carry this blood report printout to your doctor visit</span>
          </div>
          <div class="advice-step">
            <span class="step-num">3</span>
            <span>Do <b>NOT</b> self-medicate based on these results</span>
          </div>
          <div class="advice-step">
            <span class="step-num">4</span>
            <span>Your doctor may recommend additional confirmatory tests</span>
          </div>
        </div>

        <div class="urgency-row">
          <span class="urgency-badge urgent">🚨 Medical Attention Required</span>
          <span class="urgency-badge urgent">📞 Consult Doctor Within 48 Hours</span>
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
              All Parameters Normal — You Are Healthy! 🎉
            </h4>
            <p class="doctor-subtitle">
              Great news! All <b>${bloodParams.length} blood parameters</b> are within
              the healthy reference range. No medical consultation required at this time.
            </p>
          </div>
        </div>
        <div class="healthy-tips">
          <div class="healthy-tip">🥗 Maintain a balanced diet rich in fruits and vegetables</div>
          <div class="healthy-tip">🏃 Exercise at least 30 minutes daily</div>
          <div class="healthy-tip">💧 Drink 8–10 glasses of water every day</div>
          <div class="healthy-tip">🔁 Get a routine blood test every 6–12 months</div>
        </div>
        <div class="urgency-row">
          <span class="urgency-badge healthy">✅ No Doctor Visit Needed Right Now</span>
          <span class="urgency-badge healthy">🔁 Next Check-up: 6–12 Months</span>
        </div>
      </div>
    `;

  }

  doctorEl.style.display = 'block';
  resultEl.style.display = 'block';
  resultEl.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}