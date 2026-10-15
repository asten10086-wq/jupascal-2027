(function () {
  'use strict';

  const ELECTIVES = [
    { id: 'bio', en: 'Biology', zh: '生物' },
    { id: 'chem', en: 'Chemistry', zh: '化学' },
    { id: 'phy', en: 'Physics', zh: '物理' },
    { id: 'econ', en: 'Economics', zh: '经济' },
    { id: 'geog', en: 'Geography', zh: '地理' },
    { id: 'hist', en: 'History', zh: '历史' },
    { id: 'chist', en: 'Chinese History', zh: '中国历史' },
    { id: 'bafs_acc', en: 'BAFS (Accounting)', zh: '企会财（会计）' },
    { id: 'bafs_bm', en: 'BAFS (Business Mgmt)', zh: '企会财（商业管理）' },
    { id: 'ict', en: 'ICT', zh: '资讯及通讯科技' },
    { id: 'm1', en: 'M1 (Calculus & Stats)', zh: '数学延伸单元一 M1' },
    { id: 'm2', en: 'M2 (Algebra & Calculus)', zh: '数学延伸单元二 M2' },
    { id: 'clit', en: 'Chinese Literature', zh: '中国文学' },
    { id: 'elit', en: 'Literature in English', zh: '英语文学' },
    { id: 'va', en: 'Visual Arts', zh: '视觉艺术' },
    { id: 'music', en: 'Music', zh: '音乐' },
    { id: 'pe', en: 'Physical Education', zh: '体育' },
    { id: 'ths', en: 'Tourism & Hospitality', zh: '旅游与款待' },
    { id: 'tl', en: 'Technology & Living', zh: '科技与生活' },
    { id: 'ers', en: 'Ethics & Religious Studies', zh: '伦理与宗教' },
    { id: 'dat', en: 'Design & Applied Technology', zh: '设计与应用科技' },
    { id: 'hms', en: 'Health Management & Social Care', zh: '健康管理与社会关怀' },
    { id: 'other', en: 'Other elective', zh: '其他选修' },
  ];

  const LEVELS = ['', '1', '2', '3', '4', '5', '5*', '5**'];
  const CSD_LEVELS = ['', 'N/A', 'A', 'A*']; // A = Attained, A* = Attained with Distinction

  // Conversion scales
  const SCALE_85 = { '1': 1, '2': 2, '3': 3, '4': 4, '5': 5.5, '5*': 7, '5**': 8.5 };
  const SCALE_7 = { '1': 1, '2': 2, '3': 3, '4': 4, '5': 5, '5*': 6, '5**': 7 };
  // CUHK MBChB medicine conversion
  const SCALE_MED = { '1': 1, '2': 2, '3': 3, '4': 4, '5': 5, '5*': 6, '5**': 7 };

  const I18N = {
    zh: {
      title: '2027 JUPAS 收生分数估算',
      tagline: '基于 2026 收生结果 · 供 2027 JUPAS 申请人参考',
      badgeData: '仅使用 2026 收生分数',
      badgeUnis: '中大 · 港大 · 科大 · 理大',
      disclaimer: '本工具为非官方参考工具，与大学联招处（JUPAS Office）及各院校无任何隶属关系。估算未套用 2027 科目加权，仅为未加权 Best 5 / Best 6 参考值，不可视为录取机会预测。请以各院校官方公布为准。',
      gradesTitle: '你的 DSE 成绩',
      coreTitle: '核心科目',
      electivesTitle: '选修科目（最多 5 科）',
      chinese: '中国语文',
      english: '英国语文',
      math: '数学（必修）',
      csd: '公民与社会发展',
      addElective: '+ 添加选修',
      selectSubject: '选择科目…',
      selectLevel: '等级',
      csdNA: '不适用 / 未考',
      csdA: '达标 (Attained)',
      csdAD: '达标并表现优异',
      calc: '估算并比较',
      scaleTitle: '换算说明（未加权）',
      scaleBody: '中大 / 港大 / 科大：5**=8.5，5*=7，5=5.5，4=4，3=3，2=2，1=1。理大：简易 5**=7 量表（理大官方为加权分数，尺度不同，无法直接对比）。公民科一般不计入分数。医学（如中大 MBChB）使用 5**=7 量表。',
      resultsTitle: '课程比较',
      searchPh: '搜寻 JS 编号或课程名称…',
      sortLabel: '排序',
      sortMedian: '按中位数（高→低）',
      sortGap: '按与估算差距（近→远）',
      sortName: '按课程名称',
      sortLQ: '按下四分位（高→低）',
      allUnis: '全部院校',
      showing: '显示',
      of: '/',
      programmes: '个课程',
      exportCsv: '导出 CSV',
      yourEst: '你的估算',
      lq: '下四分位 LQ',
      med: '中位数 Med',
      uq: '上四分位 UQ',
      avg: '平均 Avg',
      formula: '计分方式',
      vintage: '数据年份',
      bandAbove: '高于上四分位',
      bandMedUq: '中位数–上四分位之间',
      bandLqMed: '下四分位–中位数之间',
      bandBelow: '低于下四分位',
      bandNa: '无法直接比较',
      polyuWarn: '理大公布分数为加权总分，尺度与未加权估算不同，故不显示档位比较。请参阅官方加权计算器。',
      weightedWarn: '注意：院校公布的 LQ/Med/UQ 可能已套用科目加权；此处为未加权估算，仅供粗略参考。',
      noData: '请先输入至少 4 科成绩（中、英、数 + 选修），然后点击「估算并比较」。',
      noMatch: '没有符合筛选条件的课程。',
      remove: '移除',
      gap: '差距',
      highest: '最高可达',
      researchLink: '数据缺口说明（RESEARCH.md）',
      footer: '非官方工具 · 仅供参考 · 数据为 2026 收生结果',
      csdHint: '公民科通常不计入 Best 5/6 分数。',
      enterGrades: '输入成绩后即可与 2026 LQ / Med / UQ 比较',
    },
    en: {
      title: '2027 JUPAS Admission Score Estimator',
      tagline: 'Based on 2026 admission results for 2027 applicants',
      badgeData: '2026 admitted-cohort scores only',
      badgeUnis: 'CUHK · HKU · HKUST · PolyU',
      disclaimer: 'Unofficial reference tool — not affiliated with the JUPAS Office or any university. Estimates are unweighted Best 5 / Best 6 only (2027 subject weightings not applied) and are not predictions of admission chances. Always verify against official university publications.',
      gradesTitle: 'Your HKDSE Grades',
      coreTitle: 'Core subjects',
      electivesTitle: 'Electives (up to 5)',
      chinese: 'Chinese Language',
      english: 'English Language',
      math: 'Mathematics (Compulsory)',
      csd: 'Citizenship & Social Development',
      addElective: '+ Add elective',
      selectSubject: 'Select subject…',
      selectLevel: 'Level',
      csdNA: 'N/A / not taken',
      csdA: 'Attained',
      csdAD: 'Attained with Distinction',
      calc: 'Estimate & compare',
      scaleTitle: 'Conversion (unweighted)',
      scaleBody: 'CUHK / HKU / HKUST: 5**=8.5, 5*=7, 5=5.5, 4=4, 3=3, 2=2, 1=1. PolyU: simple 5**=7 scale (official PolyU scores are weighted — different scale, not directly comparable). CSD usually not scored. Medicine (e.g. CUHK MBChB) uses 5**=7.',
      resultsTitle: 'Programme comparison',
      searchPh: 'Search JS code or programme name…',
      sortLabel: 'Sort',
      sortMedian: 'Median (high → low)',
      sortGap: 'Gap vs estimate (close → far)',
      sortName: 'Programme name',
      sortLQ: 'Lower quartile (high → low)',
      allUnis: 'All universities',
      showing: 'Showing',
      of: 'of',
      programmes: 'programmes',
      exportCsv: 'Export CSV',
      yourEst: 'Your estimate',
      lq: 'Lower quartile',
      med: 'Median',
      uq: 'Upper quartile',
      avg: 'Average',
      formula: 'Formula',
      vintage: 'Data vintage',
      bandAbove: 'Above upper quartile',
      bandMedUq: 'Between median & UQ',
      bandLqMed: 'Between LQ & median',
      bandBelow: 'Below lower quartile',
      bandNa: 'Not directly comparable',
      polyuWarn: 'PolyU published figures are weighted totals on a different scale. Band comparison is hidden. Use PolyU’s official weighted calculator.',
      weightedWarn: 'Note: published LQ/Med/UQ may include subject weightings; this is an unweighted estimate for rough reference only.',
      noData: 'Enter at least 4 subjects (Chin, Eng, Math + electives), then tap “Estimate & compare”.',
      noMatch: 'No programmes match your filters.',
      remove: 'Remove',
      gap: 'Gap',
      highest: 'Highest attainable',
      researchLink: 'Data gaps note (RESEARCH.md)',
      footer: 'Unofficial · for reference only · 2026 admission results',
      csdHint: 'CSD is usually not counted in Best 5/6 scores.',
      enterGrades: 'Enter grades to compare against 2026 LQ / Med / UQ',
    },
  };

  let lang = 'zh';
  let data = null;
  let electiveCount = 0;
  const MAX_ELECTIVES = 5;
  let lastComputed = null; // { results: [...] }

  function t(key) {
    return (I18N[lang] && I18N[lang][key]) || I18N.en[key] || key;
  }

  function $(sel, root) {
    return (root || document).querySelector(sel);
  }
  function $all(sel, root) {
    return Array.from((root || document).querySelectorAll(sel));
  }

  function levelOptions(selected) {
    return LEVELS.map(function (lv) {
      const label = lv === '' ? '—' : lv;
      return '<option value="' + lv + '"' + (lv === selected ? ' selected' : '') + '>' + label + '</option>';
    }).join('');
  }

  function csdOptions(selected) {
    const map = { '': '—', 'N/A': t('csdNA'), 'A': t('csdA'), 'A*': t('csdAD') };
    return CSD_LEVELS.map(function (lv) {
      return '<option value="' + lv + '"' + (lv === selected ? ' selected' : '') + '>' + (map[lv] || lv) + '</option>';
    }).join('');
  }

  function electiveSubjectOptions(selected) {
    let html = '<option value="">' + t('selectSubject') + '</option>';
    ELECTIVES.forEach(function (s) {
      const name = lang === 'zh' ? s.zh : s.en;
      html += '<option value="' + s.id + '"' + (s.id === selected ? ' selected' : '') + '>' + name + '</option>';
    });
    return html;
  }

  function detectBestN(formulaNote) {
    const f = (formulaNote || '').toLowerCase();
    if (f.indexOf('best 6') !== -1 || f.indexOf('best6') !== -1) return 6;
    // "6 graded subjects" for medicine
    if (f.indexOf('6 graded') !== -1) return 6;
    // Chin + Eng + Best 3 → effectively 5 subjects
    if (f.indexOf('chin + eng + best 3') !== -1 || f.indexOf('eng + math + best 3') !== -1) return 5;
    return 5;
  }

  function pickScale(uni, jsCode, formulaNote) {
    const note = (formulaNote || '') + ' ' + (jsCode || '');
    // CUHK MBChB
    if (uni === 'CUHK' && (jsCode === 'JS4501' || jsCode === 'JS4502' || /medicine conversion 5\*\*=7/i.test(note))) {
      return { scale: SCALE_MED, label: 'med7' };
    }
    if (uni === 'PolyU') {
      return { scale: SCALE_7, label: 'polyu7' };
    }
    // CUHK, HKU, HKUST common
    return { scale: SCALE_85, label: '8.5' };
  }

  function toPoints(level, scale) {
    if (!level || level === 'N/A' || level === 'A' || level === 'A*') return null;
    return scale[level] != null ? scale[level] : null;
  }

  function getGrades() {
    return {
      chinese: $('#grade-chi').value,
      english: $('#grade-eng').value,
      math: $('#grade-math').value,
      csd: $('#grade-csd').value,
      electives: $all('#electives-list .elective-row').map(function (row) {
        return {
          subject: row.querySelector('.subj').value,
          level: row.querySelector('.lvl').value,
        };
      }).filter(function (e) { return e.subject && e.level; }),
    };
  }

  function collectSubjectPoints(grades, scale) {
    const pts = [];
    const chi = toPoints(grades.chinese, scale);
    const eng = toPoints(grades.english, scale);
    const math = toPoints(grades.math, scale);
    if (chi != null) pts.push({ name: 'chi', points: chi });
    if (eng != null) pts.push({ name: 'eng', points: eng });
    if (math != null) pts.push({ name: 'math', points: math });
    // CSD intentionally excluded
    grades.electives.forEach(function (e, i) {
      const p = toPoints(e.level, scale);
      if (p != null) pts.push({ name: e.subject || ('el' + i), points: p });
    });
    return pts;
  }

  function estimateScore(grades, programme) {
    const { scale, label } = pickScale(programme.university, programme.js_code, programme.scoring_formula_note);
    const bestN = detectBestN(programme.scoring_formula_note);
    const pts = collectSubjectPoints(grades, scale);
    if (pts.length < Math.min(4, bestN)) {
      return { score: null, bestN: bestN, scaleLabel: label, reason: 'insufficient' };
    }
    const sorted = pts.map(function (p) { return p.points; }).sort(function (a, b) { return b - a; });
    const take = sorted.slice(0, bestN);
    const score = take.reduce(function (s, v) { return s + v; }, 0);
    // Round to 2 decimals for 8.5 scale halves
    const rounded = Math.round(score * 100) / 100;
    return {
      score: rounded,
      bestN: bestN,
      scaleLabel: label,
      used: take.length,
      maxPossible: Object.values(scale).length ? Math.max.apply(null, Object.values(scale)) * bestN : null,
    };
  }

  function classifyBand(est, prog) {
    if (prog.university === 'PolyU') {
      return { band: 'na', reason: 'polyu' };
    }
    if (est == null || est.score == null) {
      return { band: 'na', reason: 'noest' };
    }
    const s = est.score;
    const lq = prog.lower_quartile;
    const med = prog.median;
    const uq = prog.upper_quartile;

    // If all null
    if (lq == null && med == null && uq == null) {
      return { band: 'na', reason: 'nodata' };
    }

    // Prefer UQ when present
    if (uq != null && s >= uq) return { band: 'above', reason: 'uq' };
    if (med != null && uq != null && s >= med && s < uq) return { band: 'med-uq', reason: 'med-uq' };
    if (med != null && uq == null && s >= med) return { band: 'med-uq', reason: 'ge-med' }; // at/above med, no UQ
    if (lq != null && med != null && s >= lq && s < med) return { band: 'lq-med', reason: 'lq-med' };
    if (lq != null && s < lq) return { band: 'below', reason: 'below-lq' };
    if (lq == null && med != null && s < med) return { band: 'below', reason: 'below-med' };
    if (med == null && lq != null && s >= lq) return { band: 'lq-med', reason: 'ge-lq' };
    return { band: 'na', reason: 'fallback' };
  }

  function gapToMedian(est, prog) {
    if (est == null || est.score == null || prog.median == null) return null;
    if (prog.university === 'PolyU') return null; // incomparable
    return est.score - prog.median;
  }

  function fmtNum(n) {
    if (n == null || n !== n) return '—';
    if (typeof n === 'number') {
      return Number.isInteger(n) ? String(n) : (Math.round(n * 100) / 100).toString();
    }
    return String(n);
  }

  function bandLabel(band) {
    const map = {
      above: t('bandAbove'),
      'med-uq': t('bandMedUq'),
      'lq-med': t('bandLqMed'),
      below: t('bandBelow'),
      na: t('bandNa'),
    };
    return map[band] || t('bandNa');
  }

  function bandClass(band) {
    return 'band-' + band;
  }

  function pillClass(band) {
    return band;
  }

  function computeAll(grades) {
    const coreCount = [grades.chinese, grades.english, grades.math].filter(Boolean).length;
    const elCount = grades.electives.length;
    if (coreCount < 3 || coreCount + elCount < 4) {
      return null;
    }
    return data.programmes.map(function (prog) {
      const est = estimateScore(grades, prog);
      const bandInfo = classifyBand(est, prog);
      const gap = gapToMedian(est, prog);
      return { prog: prog, est: est, band: bandInfo.band, bandReason: bandInfo.reason, gap: gap };
    });
  }

  function getActiveUnis() {
    const chips = $all('.chip[data-uni]');
    const active = chips.filter(function (c) { return c.classList.contains('active'); }).map(function (c) { return c.dataset.uni; });
    if (active.length === 0 || active.indexOf('ALL') !== -1) return ['CUHK', 'HKU', 'HKUST', 'PolyU'];
    return active;
  }

  function renderResults() {
    const list = $('#prog-list');
    const meta = $('#results-meta-text');
    if (!lastComputed) {
      list.innerHTML = '<div class="empty">' + t('noData') + '</div>';
      meta.textContent = t('enterGrades');
      return;
    }

    const q = ($('#search-input').value || '').trim().toLowerCase();
    const unis = getActiveUnis();
    const sort = $('#sort-select').value;

    let rows = lastComputed.filter(function (r) {
      if (unis.indexOf(r.prog.university) === -1) return false;
      if (!q) return true;
      const hay = (r.prog.js_code + ' ' + r.prog.programme_name + ' ' + r.prog.university).toLowerCase();
      return hay.indexOf(q) !== -1;
    });

    rows.sort(function (a, b) {
      if (sort === 'median') {
        return (b.prog.median || -1) - (a.prog.median || -1);
      }
      if (sort === 'lq') {
        return (b.prog.lower_quartile || -1) - (a.prog.lower_quartile || -1);
      }
      if (sort === 'gap') {
        const ga = a.gap != null ? Math.abs(a.gap) : 9999;
        const gb = b.gap != null ? Math.abs(b.gap) : 9999;
        if (ga !== gb) return ga - gb;
        return (b.prog.median || 0) - (a.prog.median || 0);
      }
      if (sort === 'name') {
        return a.prog.programme_name.localeCompare(b.prog.programme_name);
      }
      return 0;
    });

    meta.textContent = t('showing') + ' ' + rows.length + ' ' + t('of') + ' ' + lastComputed.length + ' ' + t('programmes');

    if (rows.length === 0) {
      list.innerHTML = '<div class="empty">' + t('noMatch') + '</div>';
      return;
    }

    list.innerHTML = rows.map(function (r) {
      const p = r.prog;
      const estStr = r.est && r.est.score != null
        ? fmtNum(r.est.score) + ' <span style="font-weight:500;font-size:.75rem">(Best ' + r.est.bestN + ')</span>'
        : '—';

      let stats = '';
      stats += '<div class="stat est"><strong>' + estStr + '</strong>' + t('yourEst') + '</div>';
      if (p.lower_quartile != null) {
        stats += '<div class="stat"><strong>' + fmtNum(p.lower_quartile) + '</strong>' + t('lq') + '</div>';
      }
      if (p.median != null) {
        stats += '<div class="stat"><strong>' + fmtNum(p.median) + '</strong>' + t('med') + '</div>';
      }
      if (p.upper_quartile != null) {
        stats += '<div class="stat"><strong>' + fmtNum(p.upper_quartile) + '</strong>' + t('uq') + '</div>';
      }
      if (p.average != null) {
        stats += '<div class="stat"><strong>' + fmtNum(p.average) + '</strong>' + t('avg') + '</div>';
      }
      if (p.highest_attainable != null) {
        stats += '<div class="stat"><strong>' + fmtNum(p.highest_attainable) + '</strong>' + t('highest') + '</div>';
      }

      let gapHtml = '';
      if (r.gap != null) {
        const sign = r.gap > 0 ? '+' : '';
        gapHtml = ' · ' + t('gap') + ' ' + sign + fmtNum(r.gap);
      }

      let warn = '';
      if (p.university === 'PolyU') {
        warn = '<div class="prog-warn">' + t('polyuWarn') + '</div>';
      } else {
        warn = '<div class="prog-note">' + t('weightedWarn') + '</div>';
      }

      return (
        '<article class="prog-card ' + bandClass(r.band) + '">' +
          '<div class="prog-top">' +
            '<span class="prog-code">' + escapeHtml(p.js_code) + '</span>' +
            '<span class="band-pill ' + pillClass(r.band) + '">' + escapeHtml(bandLabel(r.band)) + gapHtml + '</span>' +
          '</div>' +
          '<div class="prog-name">' + escapeHtml(p.programme_name) + '</div>' +
          '<div class="prog-uni">' + escapeHtml(p.university) + ' · ' + escapeHtml(p.university_name) + '</div>' +
          '<div class="prog-stats">' + stats + '</div>' +
          '<div class="prog-note"><strong>' + t('formula') + ':</strong> ' + escapeHtml(p.scoring_formula_note || '—') +
            ' · <strong>' + t('vintage') + ':</strong> ' + escapeHtml(String(p.data_vintage || p.admission_year || '2026')) +
          '</div>' +
          warn +
        '</article>'
      );
    }).join('');
  }

  function escapeHtml(s) {
    return String(s)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  function addElective(preset) {
    if (electiveCount >= MAX_ELECTIVES) return;
    electiveCount += 1;
    const id = 'el-' + electiveCount;
    const row = document.createElement('div');
    row.className = 'elective-row';
    row.dataset.id = id;
    row.innerHTML =
      '<select class="subj" aria-label="' + t('selectSubject') + '">' + electiveSubjectOptions(preset && preset.subject) + '</select>' +
      '<select class="lvl" aria-label="' + t('selectLevel') + '">' + levelOptions(preset && preset.level) + '</select>' +
      '<button type="button" class="btn-icon" title="' + t('remove') + '" aria-label="' + t('remove') + '">×</button>';
    row.querySelector('.btn-icon').addEventListener('click', function () {
      row.remove();
      electiveCount = $all('#electives-list .elective-row').length;
      $('#btn-add-elective').disabled = electiveCount >= MAX_ELECTIVES;
    });
    $('#electives-list').appendChild(row);
    $('#btn-add-elective').disabled = electiveCount >= MAX_ELECTIVES;
  }

  function applyI18n() {
    $all('[data-i18n]').forEach(function (el) {
      const key = el.getAttribute('data-i18n');
      el.textContent = t(key);
    });
    $all('[data-i18n-placeholder]').forEach(function (el) {
      el.placeholder = t(el.getAttribute('data-i18n-placeholder'));
    });
    // Rebuild CSD and elective labels
    const csdVal = $('#grade-csd').value;
    $('#grade-csd').innerHTML = csdOptions(csdVal);
    $all('#electives-list .elective-row').forEach(function (row) {
      const subj = row.querySelector('.subj').value;
      const lvl = row.querySelector('.lvl').value;
      row.querySelector('.subj').innerHTML = electiveSubjectOptions(subj);
      row.querySelector('.lvl').innerHTML = levelOptions(lvl);
    });
    // Sort options
    const sort = $('#sort-select');
    const cur = sort.value;
    sort.innerHTML =
      '<option value="median">' + t('sortMedian') + '</option>' +
      '<option value="gap">' + t('sortGap') + '</option>' +
      '<option value="lq">' + t('sortLQ') + '</option>' +
      '<option value="name">' + t('sortName') + '</option>';
    sort.value = cur || 'median';
    document.title = t('title');
    document.documentElement.lang = lang === 'zh' ? 'zh-Hans' : 'en';
    renderResults();
  }

  function exportCsv() {
    if (!lastComputed) return;
    const unis = getActiveUnis();
    const q = ($('#search-input').value || '').trim().toLowerCase();
    let rows = lastComputed.filter(function (r) {
      if (unis.indexOf(r.prog.university) === -1) return false;
      if (!q) return true;
      const hay = (r.prog.js_code + ' ' + r.prog.programme_name).toLowerCase();
      return hay.indexOf(q) !== -1;
    });
    const header = ['js_code', 'university', 'programme_name', 'estimate', 'best_n', 'LQ', 'median', 'UQ', 'average', 'band', 'gap_vs_median', 'formula', 'data_vintage'];
    const lines = [header.join(',')];
    rows.forEach(function (r) {
      const p = r.prog;
      const cells = [
        p.js_code,
        p.university,
        '"' + String(p.programme_name).replace(/"/g, '""') + '"',
        r.est && r.est.score != null ? r.est.score : '',
        r.est ? r.est.bestN : '',
        p.lower_quartile != null ? p.lower_quartile : '',
        p.median != null ? p.median : '',
        p.upper_quartile != null ? p.upper_quartile : '',
        p.average != null ? p.average : '',
        r.band,
        r.gap != null ? r.gap : '',
        '"' + String(p.scoring_formula_note || '').replace(/"/g, '""') + '"',
        p.data_vintage || '',
      ];
      lines.push(cells.join(','));
    });
    const blob = new Blob([lines.join('\n')], { type: 'text/csv;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'jupas-2027-estimate-vs-2026.csv';
    a.click();
    URL.revokeObjectURL(url);
  }

  function onCalculate() {
    const grades = getGrades();
    lastComputed = computeAll(grades);
    if (!lastComputed) {
      $('#prog-list').innerHTML = '<div class="empty">' + t('noData') + '</div>';
      $('#results-meta-text').textContent = t('noData');
      return;
    }
    renderResults();
  }

  function bind() {
    $('#btn-calc').addEventListener('click', onCalculate);
    $('#btn-add-elective').addEventListener('click', function () { addElective(); });
    $('#search-input').addEventListener('input', renderResults);
    $('#sort-select').addEventListener('change', renderResults);
    $('#btn-export').addEventListener('click', exportCsv);

    $all('.chip[data-uni]').forEach(function (chip) {
      chip.addEventListener('click', function () {
        const uni = chip.dataset.uni;
        if (uni === 'ALL') {
          $all('.chip[data-uni]').forEach(function (c) { c.classList.remove('active'); });
          chip.classList.add('active');
        } else {
          $('.chip[data-uni="ALL"]').classList.remove('active');
          chip.classList.toggle('active');
          const any = $all('.chip[data-uni]').some(function (c) {
            return c.dataset.uni !== 'ALL' && c.classList.contains('active');
          });
          if (!any) $('.chip[data-uni="ALL"]').classList.add('active');
        }
        renderResults();
      });
    });

    $all('.lang-toggle button').forEach(function (btn) {
      btn.addEventListener('click', function () {
        lang = btn.dataset.lang;
        $all('.lang-toggle button').forEach(function (b) {
          b.classList.toggle('active', b.dataset.lang === lang);
        });
        applyI18n();
      });
    });
  }

  function initUI() {
    $('#grade-chi').innerHTML = levelOptions('4');
    $('#grade-eng').innerHTML = levelOptions('4');
    $('#grade-math').innerHTML = levelOptions('4');
    $('#grade-csd').innerHTML = csdOptions('A');
    addElective({ subject: 'chem', level: '5' });
    addElective({ subject: 'phy', level: '4' });
    addElective({ subject: 'econ', level: '4' });
    applyI18n();
    bind();
    // Auto-calculate with sample grades so first open shows results
    onCalculate();
  }

  function boot() {
    if (window.JUPAS_DATA && window.JUPAS_DATA.programmes) {
      data = window.JUPAS_DATA;
      initUI();
      return;
    }
    // Fallback fetch for local server
    fetch('data.json')
      .then(function (r) { return r.json(); })
      .then(function (d) {
        data = d;
        initUI();
      })
      .catch(function (err) {
        $('#prog-list').innerHTML = '<div class="empty">Failed to load data.json / data.js</div>';
        console.error(err);
      });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }
})();
