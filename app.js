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
  const CSD_LEVELS = ['', 'N/A', 'A', 'A*'];

  const SCALE_85 = { '1': 1, '2': 2, '3': 3, '4': 4, '5': 5.5, '5*': 7, '5**': 8.5 };
  const SCALE_7 = { '1': 1, '2': 2, '3': 3, '4': 4, '5': 5, '5*': 6, '5**': 7 };

  const I18N = {
    zh: {
      title: '2027 JUPAS 收生分数估算',
      tagline: '基于 2026 收生结果 · 供 2027 JUPAS 申请人参考',
      badgeData: '仅使用 2026 收生分数',
      badgeUnis: '中大 · 港大 · 科大 · 理大',
      badgeUnweighted: '按课程科目加权估算',
      disclaimer: '本工具为非官方参考工具，与大学联招处（JUPAS Office）及各院校无任何隶属关系。估算已套用课程 2026 科目加权（成绩×权重）后的 Best 5 / Best 6，不可视为录取机会预测。2027 加权或入学要求如有更新，请以院校官方为准。',
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
      scaleTitle: '换算与加权说明',
      scaleBody: '中大 / 港大 / 科大：多数课程 5**=8.5，5*=7，5=5.5；医学等例外见课程详情。理大：5**=7 后再乘科目权重（常见 5 / 7 / 10）。显示分数 = 等级换算分 × 科目权重后取 Best 5/6（及公式要求的必修科）。公民科一般不计入分数。',
      unweightedNote: '估算已套用该课程公布的科目加权；若本站缺个别加权，则按等权（×1）计算并在详情中注明。',
      resultsTitle: '课程比较',
      searchPh: '搜寻 JS 编号或课程名称…',
      sortLabel: '排序',
      sortMedian: '按中位数（高→低）',
      sortGap: '按与估算差距（近→远）',
      sortName: '按课程名称',
      sortLQ: '按下四分位（高→低）',
      sortCode: '按 JS 编号',
      allUnis: '全部院校',
      showing: '显示',
      of: '/',
      programmes: '个课程',
      exportCsv: '导出 CSV',
      yourEst: '你的估算（加权）',
      lq: '下四分位 LQ',
      med: '中位数 Med',
      uq: '上四分位 UQ',
      avg: '平均 Avg',
      formula: '计分方式',
      vintage: '数据年份',
      weights: '科目加权',
      bandAbove: '高于上四分位 / 中位数以上',
      bandMedUq: '中位数–上四分位之间',
      bandLqMed: '下四分位–中位数之间',
      bandBelow: '低于下四分位',
      bandNa: '无法直接比较',
      polyuWarn: '理大官方收生分为加权总分；本站已按 2026/27 科目权重估算。尺度应可对照，但仍属近似参考。',
      weightedWarn: '估算 = 成绩换算分 × 科目权重后的计分结果，用于对照院校公布的 LQ / Med / UQ。',
      noData: '请先输入至少 4 科成绩（中、英、数 + 选修），然后点击「估算并比较」。',
      noMatch: '没有符合筛选条件的课程。',
      remove: '移除',
      gap: '差距',
      highest: '最高可达',
      researchLink: '数据缺口说明',
      githubLink: 'GitHub 仓库',
      footer: '非官方工具 · 仅供参考 · 数据为 2026 收生结果 · 非录取机会预测',
      footerDetail: '仅含中大 / 港大 / 科大 / 理大共 191 个课程的 2026 收生分位。估算按课程 2026 科目加权。科大 / 理大不公布 UQ。完整 2027 入学要求如有更新请以官方为准。',
      csdHint: '公民科通常不计入 Best 5/6 分数；多数课程要求「达标」。',
      enterGrades: '输入成绩后即可与 2026 LQ / Med / UQ 比较',
      eligTitle: '入学要求提示',
      eligBody: '多数课程要求公民科「达标」(Attained)。完整逐科 2027 入学要求尚未全部核验；请另查院校官方页面。核心科常见底线约「332A」+ 选修，但各课程不同。',
      openDetail: '查看详情 →',
      detailScores: '2026 收生分数',
      detailFormula: '计分方法（2026）',
      detailWeights: '科目加权',
      detailElig: '入学要求提示',
      detailSource: '数据说明',
      detailClose: '关闭',
      noUq: '院校未公布 UQ',
      equalWeight: '等权（未列科目加权，按 ×1）',
      bandBarEst: '你的位置',
      reqCsd: '公民科：建议达标 (Attained)',
      reqCore: '核心科常见最低要求约 332A（中/英/数/公民），选修另计 — 以官方为准',
      reqGap: '完整 2027 入学要求尚未全部载入本站',
      sourceNote: '分数为 2026 收生结果；加权来自院校 / JUPAS 2026 公式。请勿当作录取保证。',
    },
    en: {
      title: '2027 JUPAS Admission Score Estimator',
      tagline: 'Based on 2026 admission results for 2027 applicants',
      badgeData: '2026 admitted-cohort scores only',
      badgeUnis: 'CUHK · HKU · HKUST · PolyU',
      badgeUnweighted: 'Programme-weighted estimates',
      disclaimer: 'Unofficial reference tool — not affiliated with the JUPAS Office or any university. Estimates apply each programme’s 2026 subject weights (grade × weight) for Best 5 / Best 6 and are not predictions of admission chances. Always verify 2027 official formulae and requirements.',
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
      scaleTitle: 'Conversion & weighting',
      scaleBody: 'CUHK / HKU / HKUST: usually 5**=8.5, 5*=7, 5=5.5 (medicine may differ). PolyU: 5**=7 then × subject weight (often 5 / 7 / 10). Displayed score = converted points × subject weights, Best 5/6 (plus required subjects per formula). CSD usually not scored.',
      unweightedNote: 'Estimates use published 2026 subject weights. If a programme has no listed weights here, equal weight (×1) is used and noted in the detail panel.',
      resultsTitle: 'Programme comparison',
      searchPh: 'Search JS code or programme name…',
      sortLabel: 'Sort',
      sortMedian: 'Median (high → low)',
      sortGap: 'Gap vs estimate (close → far)',
      sortName: 'Programme name',
      sortLQ: 'Lower quartile (high → low)',
      sortCode: 'JS code',
      allUnis: 'All universities',
      showing: 'Showing',
      of: 'of',
      programmes: 'programmes',
      exportCsv: 'Export CSV',
      yourEst: 'Your estimate (weighted)',
      lq: 'Lower quartile',
      med: 'Median',
      uq: 'Upper quartile',
      avg: 'Average',
      formula: 'Formula',
      vintage: 'Data vintage',
      weights: 'Subject weights',
      bandAbove: 'Above UQ / at or above median',
      bandMedUq: 'Between median & UQ',
      bandLqMed: 'Between LQ & median',
      bandBelow: 'Below lower quartile',
      bandNa: 'Not directly comparable',
      polyuWarn: 'PolyU published figures are weighted totals; this site estimates with 2026/27 subject weights. Comparison should be on a similar scale but remains approximate.',
      weightedWarn: 'Estimate = converted grade points × subject weights under the programme formula, compared with published LQ / Med / UQ.',
      noData: 'Enter at least 4 subjects (Chin, Eng, Math + electives), then tap “Estimate & compare”.',
      noMatch: 'No programmes match your filters.',
      remove: 'Remove',
      gap: 'Gap',
      highest: 'Highest attainable',
      researchLink: 'Data gaps note',
      githubLink: 'GitHub repo',
      footer: 'Unofficial · for reference only · 2026 admission results · not a chance predictor',
      footerDetail: '191 programmes at CUHK / HKU / HKUST / PolyU with 2026 admission quartiles. Estimates use 2026 subject weights. HKUST / PolyU do not publish UQ. Verify full 2027 requirements officially.',
      csdHint: 'CSD is usually not counted in Best 5/6; most programmes require Attained.',
      enterGrades: 'Enter grades to compare against 2026 LQ / Med / UQ',
      eligTitle: 'Entrance requirements note',
      eligBody: 'Most programmes require CSD Attained. Full per-programme 2027 entrance requirements are not fully verified here — check official pages. Typical core floor is about “332A” + electives, but programmes differ.',
      openDetail: 'View details →',
      detailScores: '2026 admission scores',
      detailFormula: 'Scoring method (2026)',
      detailWeights: 'Subject weightings',
      detailElig: 'Entrance requirements note',
      detailSource: 'Source note',
      detailClose: 'Close',
      noUq: 'UQ not published by institution',
      equalWeight: 'Equal weight (no listed multipliers; ×1)',
      bandBarEst: 'Your position',
      reqCsd: 'CSD: Attained recommended / typically required',
      reqCore: 'Typical core floor ~332A (Chi/Eng/Math/CSD); electives vary — verify officially',
      reqGap: 'Full 2027 entrance requirements are not fully loaded on this site',
      sourceNote: 'Scores are 2026 admitted-cohort figures; weights from 2026 university / JUPAS formulae. Not an offer guarantee.',
    },
  };

  let lang = 'zh';
  let data = null;
  let electiveCount = 0;
  const MAX_ELECTIVES = 5;
  let lastComputed = null;
  let selectedCode = null;

  function t(key) {
    return (I18N[lang] && I18N[lang][key]) || I18N.en[key] || key;
  }

  function $(sel, root) {
    return (root || document).querySelector(sel);
  }
  function $all(sel, root) {
    return Array.from((root || document).querySelectorAll(sel));
  }

  function escapeHtml(s) {
    return String(s == null ? '' : s)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  function progName(p) {
    if (lang === 'zh' && p.programme_name_zh) return p.programme_name_zh;
    return p.programme_name;
  }

  function uniShort(p) {
    const map = { CUHK: { zh: '中大', en: 'CUHK' }, HKU: { zh: '港大', en: 'HKU' }, HKUST: { zh: '科大', en: 'HKUST' }, PolyU: { zh: '理大', en: 'PolyU' } };
    const m = map[p.university];
    return m ? (lang === 'zh' ? m.zh : m.en) : p.university;
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

  function detectBestN(prog) {
    if (prog.formula_2026_id === 'best6') return 6;
    if (prog.formula_2026_id === 'best5') return 5;
    const f = ((prog.formula_2026 || prog.scoring_formula_note || '') + '').toLowerCase();
    if (f.indexOf('best 6') !== -1 || f.indexOf('best6') !== -1 || f.indexOf('6 graded') !== -1) return 6;
    return 5;
  }

  function getConversion(prog) {
    if (prog.score_conversion) {
      const c = prog.score_conversion;
      return {
        '1': c['1'], '2': c['2'], '3': c['3'], '4': c['4'],
        '5': c['5'], '5*': c['5*'], '5**': c['5**'],
      };
    }
    if (prog.university === 'PolyU') return SCALE_7;
    if (prog.js_code === 'JS4501' || prog.js_code === 'JS4502') return SCALE_7;
    return SCALE_85;
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

  function collectSubjects(grades, scale) {
    const list = [];
    function push(id, level) {
      const pts = toPoints(level, scale);
      if (pts == null) return;
      list.push({ id: id, level: level, base: pts });
    }
    push('chi', grades.chinese);
    push('eng', grades.english);
    push('math', grades.math);
    grades.electives.forEach(function (e) { push(e.subject, e.level); });
    return list;
  }

  function applyWeights(subjects, prog) {
    const wmap = prog.subject_weights_by_id || {};
    const bestOf = prog.best_of_weights_2026 || [];
    // Start with listed weight or 1
    const usedInBestOf = {};
    subjects.forEach(function (s) {
      s.weight = wmap[s.id] != null ? wmap[s.id] : 1;
    });
    // best_of: elevate best `count` among group by base points
    bestOf.forEach(function (bo) {
      const ids = bo.subject_ids || [];
      if (!ids.length) return;
      const cands = subjects
        .filter(function (s) { return ids.indexOf(s.id) !== -1 && !usedInBestOf[s.id]; })
        .sort(function (a, b) { return b.base - a.base; });
      const take = cands.slice(0, bo.count || 1);
      take.forEach(function (s) {
        s.weight = bo.weight;
        usedInBestOf[s.id] = true;
      });
    });
    subjects.forEach(function (s) {
      s.weighted = Math.round(s.base * s.weight * 1000) / 1000;
    });
    return subjects;
  }

  function getCompulsoryIds(prog) {
    const ids = [];
    const constraints = prog.calculation_constraints || [];
    constraints.forEach(function (c) {
      if (c.type === 'compulsory_subjects' && Array.isArray(c.subjects)) {
        c.subjects.forEach(function (name) {
          const n = (name || '').toLowerCase();
          if (n.indexOf('english') !== -1) ids.push('eng');
          else if (n.indexOf('chinese') !== -1 && n.indexOf('history') === -1 && n.indexOf('literature') === -1) ids.push('chi');
          else if (n.indexOf('mathematics') !== -1 && n.indexOf('extended') === -1 && n.indexOf('module') === -1) ids.push('math');
        });
      }
    });
    // Heuristic from formula text
    const f = (prog.formula_2026 || prog.scoring_formula_note || '').toLowerCase();
    if (/\beng\b/.test(f) && /best\s*\d/.test(f) && ids.indexOf('eng') === -1) {
      if (/eng\s*\+|1\.?\d*\s*x\s*eng|eng\s*x\s*\d/i.test(prog.formula_2026 || '') || /eng \+/.test(f)) ids.push('eng');
    }
    if (/math/.test(f) && /\+\s*math|math\s*\+|1\.?\d*\s*x\s*math|math\s*x\s*\d/i.test(prog.formula_2026 || prog.scoring_formula_note || '')) {
      if (ids.indexOf('math') === -1) ids.push('math');
    }
    return Array.from(new Set(ids));
  }

  function estimateScore(grades, prog) {
    const scale = getConversion(prog);
    const bestN = detectBestN(prog);
    let subjects = collectSubjects(grades, scale);
    if (subjects.length < Math.min(4, bestN)) {
      return { score: null, bestN: bestN, reason: 'insufficient', weighted: true };
    }
    subjects = applyWeights(subjects, prog);

    const compulsory = getCompulsoryIds(prog).filter(function (id) {
      return subjects.some(function (s) { return s.id === id; });
    });

    const selected = [];
    const remaining = subjects.slice();
    compulsory.forEach(function (id) {
      const idx = remaining.findIndex(function (s) { return s.id === id; });
      if (idx !== -1) {
        selected.push(remaining[idx]);
        remaining.splice(idx, 1);
      }
    });
    remaining.sort(function (a, b) { return b.weighted - a.weighted; });
    while (selected.length < bestN && remaining.length) {
      selected.push(remaining.shift());
    }

    let score = selected.reduce(function (sum, s) { return sum + s.weighted; }, 0);

    // HKUST 6th-subject bonus
    const hkust = (prog.calculation_constraints || []).find(function (c) { return c.type === 'hkust_weighted_best'; });
    let bonus = 0;
    if (hkust && remaining.length) {
      const maxW = Number(hkust.max_attainable_weighting || 5);
      const pct = Number(hkust.bonus_percentage || 5) / 100;
      const bestLeft = remaining.slice().sort(function (a, b) { return b.base - a.base; })[0];
      if (bestLeft) {
        bonus = Math.round(maxW * pct * bestLeft.base * 1000) / 1000;
        score += bonus;
      }
    }

    // HKU-style 0.2 × 7th best (when formula mentions it)
    const f = (prog.formula_2026 || '') + '';
    if (/0\.2\s*x\s*7th/i.test(f) && remaining.length) {
      const seventh = remaining.slice().sort(function (a, b) { return b.weighted - a.weighted; })[0];
      if (seventh) {
        bonus += Math.round(seventh.weighted * 0.2 * 1000) / 1000;
        score += seventh.weighted * 0.2;
      }
    }

    const hasWeights = prog.subject_weights_by_id && Object.keys(prog.subject_weights_by_id).length > 0;
    return {
      score: Math.round(score * 1000) / 1000,
      bestN: bestN,
      weighted: true,
      hasListedWeights: !!hasWeights,
      used: selected,
      bonus: bonus,
      scale: scale,
    };
  }

  function classifyBand(est, prog) {
    if (est == null || est.score == null) return { band: 'na', reason: 'noest' };
    const s = est.score;
    const lq = prog.lower_quartile;
    const med = prog.median;
    const uq = prog.upper_quartile;

    if (lq == null && med == null && uq == null) return { band: 'na', reason: 'nodata' };

    // With UQ (CUHK / HKU)
    if (uq != null && s >= uq) return { band: 'above', reason: 'uq' };
    if (med != null && uq != null && s >= med && s < uq) return { band: 'med-uq', reason: 'med-uq' };
    if (lq != null && med != null && s >= lq && s < med) return { band: 'lq-med', reason: 'lq-med' };
    if (lq != null && s < lq) return { band: 'below', reason: 'below-lq' };

    // No UQ (HKUST / PolyU): above/at median → green-ish; between LQ and med → yellow; below LQ → red
    if (uq == null) {
      if (med != null && s >= med) return { band: 'above', reason: 'ge-med-no-uq' };
      if (lq != null && med != null && s >= lq && s < med) return { band: 'lq-med', reason: 'lq-med-no-uq' };
      if (lq != null && s < lq) return { band: 'below', reason: 'below-lq' };
      if (med != null && s < med) return { band: 'below', reason: 'below-med' };
      if (lq != null && s >= lq) return { band: 'lq-med', reason: 'ge-lq' };
    }

    if (lq == null && med != null && s < med) return { band: 'below', reason: 'below-med' };
    return { band: 'na', reason: 'fallback' };
  }

  function gapToMedian(est, prog) {
    if (est == null || est.score == null || prog.median == null) return null;
    return est.score - prog.median;
  }

  function fmtNum(n) {
    if (n == null || n !== n) return '—';
    if (typeof n === 'number') {
      return Number.isInteger(n) ? String(n) : (Math.round(n * 1000) / 1000).toString();
    }
    return String(n);
  }

  function bandLabel(band, prog) {
    if (band === 'above' && prog && prog.upper_quartile == null) {
      return lang === 'zh' ? '不低于中位数' : 'At / above median';
    }
    const map = {
      above: t('bandAbove'),
      'med-uq': t('bandMedUq'),
      'lq-med': t('bandLqMed'),
      below: t('bandBelow'),
      na: t('bandNa'),
    };
    return map[band] || t('bandNa');
  }

  function computeAll(grades) {
    const coreCount = [grades.chinese, grades.english, grades.math].filter(Boolean).length;
    const elCount = grades.electives.length;
    if (coreCount < 3 || coreCount + elCount < 4) return null;
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

  function scoreBandHtml(r) {
    const p = r.prog;
    const est = r.est && r.est.score;
    if (est == null || (p.lower_quartile == null && p.median == null && p.upper_quartile == null)) {
      return '<div class="score-band-na">' + escapeHtml(t('bandNa')) + '</div>';
    }
    const lq = p.lower_quartile;
    const med = p.median;
    const uq = p.upper_quartile;
    const vals = [est, lq, med, uq].filter(function (v) { return v != null; });
    const min = Math.min.apply(null, vals) - 1;
    const max = Math.max.apply(null, vals) + 1;
    const span = max - min || 1;
    const pct = Math.max(0, Math.min(100, ((est - min) / span) * 100));
    let ticks = '';
    if (lq != null) ticks += '<span><strong>LQ</strong> ' + fmtNum(lq) + '</span>';
    if (med != null) ticks += '<span><strong>Med</strong> ' + fmtNum(med) + '</span>';
    if (uq != null) ticks += '<span><strong>UQ</strong> ' + fmtNum(uq) + '</span>';
    else ticks += '<span>' + escapeHtml(t('noUq')) + '</span>';
    return (
      '<div class="score-band" title="' + escapeHtml(t('bandBarEst')) + ': ' + fmtNum(est) + '">' +
        '<div class="score-band-track">' +
          '<span class="score-band-marker" style="left:' + pct + '%"></span>' +
        '</div>' +
        '<div class="score-band-ticks">' + ticks + '</div>' +
      '</div>'
    );
  }

  function weightsSummary(p) {
    if (p.subject_weights_raw) return p.subject_weights_raw;
    const w = p.subject_weights_by_id || {};
    const keys = Object.keys(w);
    if (!keys.length) return t('equalWeight');
    return keys.map(function (k) { return k + '×' + w[k]; }).join(', ');
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
      const hay = (
        r.prog.js_code + ' ' +
        r.prog.programme_name + ' ' +
        (r.prog.programme_name_zh || '') + ' ' +
        r.prog.university
      ).toLowerCase();
      return hay.indexOf(q) !== -1;
    });

    rows.sort(function (a, b) {
      if (sort === 'median') return (b.prog.median || -1) - (a.prog.median || -1);
      if (sort === 'lq') return (b.prog.lower_quartile || -1) - (a.prog.lower_quartile || -1);
      if (sort === 'gap') {
        const ga = a.gap != null ? Math.abs(a.gap) : 9999;
        const gb = b.gap != null ? Math.abs(b.gap) : 9999;
        if (ga !== gb) return ga - gb;
        return (b.prog.median || 0) - (a.prog.median || 0);
      }
      if (sort === 'name') return progName(a.prog).localeCompare(progName(b.prog), lang === 'zh' ? 'zh' : 'en');
      if (sort === 'code') return a.prog.js_code.localeCompare(b.prog.js_code);
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
      if (p.lower_quartile != null) stats += '<div class="stat"><strong>' + fmtNum(p.lower_quartile) + '</strong>' + t('lq') + '</div>';
      if (p.median != null) stats += '<div class="stat"><strong>' + fmtNum(p.median) + '</strong>' + t('med') + '</div>';
      if (p.upper_quartile != null) stats += '<div class="stat"><strong>' + fmtNum(p.upper_quartile) + '</strong>' + t('uq') + '</div>';
      if (p.average != null) stats += '<div class="stat"><strong>' + fmtNum(p.average) + '</strong>' + t('avg') + '</div>';
      if (p.highest_attainable != null) stats += '<div class="stat"><strong>' + fmtNum(p.highest_attainable) + '</strong>' + t('highest') + '</div>';

      let gapHtml = '';
      if (r.gap != null) {
        const sign = r.gap > 0 ? '+' : '';
        gapHtml = ' · ' + t('gap') + ' ' + sign + fmtNum(r.gap);
      }

      let warn = '';
      if (p.university === 'PolyU') warn = '<div class="prog-warn">' + t('polyuWarn') + '</div>';
      else warn = '<div class="prog-note">' + t('weightedWarn') + '</div>';

      const selected = selectedCode === p.js_code ? ' is-selected' : '';

      return (
        '<button type="button" class="prog-card ' + ('band-' + r.band) + selected + '" data-code="' + escapeHtml(p.js_code) + '">' +
          '<div class="prog-top">' +
            '<span class="prog-code">' + escapeHtml(p.js_code) + '</span>' +
            '<span class="band-pill ' + r.band + '">' + escapeHtml(bandLabel(r.band, p)) + gapHtml + '</span>' +
          '</div>' +
          '<div class="prog-name">' + escapeHtml(progName(p)) + '</div>' +
          '<div class="prog-uni">' + escapeHtml(uniShort(p)) + ' · ' + escapeHtml(p.university_name) + '</div>' +
          '<div class="prog-stats">' + stats + '</div>' +
          scoreBandHtml(r) +
          '<div class="prog-note"><strong>' + t('formula') + ':</strong> ' + escapeHtml(p.formula_2026 || p.scoring_formula_note || '—') +
            ' · <strong>' + t('vintage') + ':</strong> ' + escapeHtml(String(p.data_vintage || p.admission_year || '2026')) +
          '</div>' +
          warn +
          '<div class="prog-open-hint">' + t('openDetail') + '</div>' +
        '</button>'
      );
    }).join('');

    $all('.prog-card[data-code]').forEach(function (card) {
      card.addEventListener('click', function () {
        openDrawer(card.getAttribute('data-code'));
      });
    });
  }

  function findResult(code) {
    if (!lastComputed) return null;
    return lastComputed.find(function (r) { return r.prog.js_code === code; }) || null;
  }

  function openDrawer(code) {
    const r = findResult(code) || (data && {
      prog: data.programmes.find(function (p) { return p.js_code === code; }),
      est: null, band: 'na', gap: null,
    });
    if (!r || !r.prog) return;
    selectedCode = code;
    const p = r.prog;
    $('#drawer-code').textContent = p.js_code;
    $('#drawer-title').textContent = progName(p);
    $('#drawer-uni').textContent = uniShort(p) + ' · ' + p.university_name;

    let scores = '<dl class="drawer-dl">';
    if (r.est && r.est.score != null) scores += '<dt>' + t('yourEst') + '</dt><dd><strong>' + fmtNum(r.est.score) + '</strong></dd>';
    if (p.lower_quartile != null) scores += '<dt>' + t('lq') + '</dt><dd>' + fmtNum(p.lower_quartile) + '</dd>';
    if (p.median != null) scores += '<dt>' + t('med') + '</dt><dd>' + fmtNum(p.median) + '</dd>';
    if (p.upper_quartile != null) scores += '<dt>' + t('uq') + '</dt><dd>' + fmtNum(p.upper_quartile) + '</dd>';
    else scores += '<dt>' + t('uq') + '</dt><dd>' + t('noUq') + '</dd>';
    if (p.average != null) scores += '<dt>' + t('avg') + '</dt><dd>' + fmtNum(p.average) + '</dd>';
    if (p.highest_attainable != null) scores += '<dt>' + t('highest') + '</dt><dd>' + fmtNum(p.highest_attainable) + '</dd>';
    if (r.gap != null) scores += '<dt>' + t('gap') + '</dt><dd>' + (r.gap > 0 ? '+' : '') + fmtNum(r.gap) + '</dd>';
    scores += '</dl>';
    scores += scoreBandHtml(r);
    scores += '<p class="band-pill ' + r.band + '" style="margin-top:.5rem">' + escapeHtml(bandLabel(r.band, p)) + '</p>';

    const formula = escapeHtml(p.formula_2026 || p.scoring_formula_note || '—');
    const wtxt = escapeHtml(weightsSummary(p));

    let elig = '<ul style="margin:.25rem 0 0;padding-left:1.1rem;font-size:.85rem;color:var(--ink-muted)">';
    elig += '<li>' + escapeHtml(t('reqCsd')) + '</li>';
    if (p.min_requirements_note) {
      const m = p.min_requirements_note;
      elig += '<li>Chi ' + escapeHtml(m.chi || '—') + ' · Eng ' + escapeHtml(m.eng || '—') +
        ' · Math ' + escapeHtml(m.math || '—') + ' · CSD ' + escapeHtml(m.csd || 'A') +
        ' <span style="opacity:.75">(2026 ref.)</span></li>';
    } else {
      elig += '<li>' + escapeHtml(t('reqCore')) + '</li>';
    }
    elig += '<li>' + escapeHtml(t('reqGap')) + '</li></ul>';

    let warn = p.university === 'PolyU'
      ? '<p class="prog-warn">' + t('polyuWarn') + '</p>'
      : '<p class="drawer-note">' + t('weightedWarn') + '</p>';

    $('#drawer-body').innerHTML =
      '<div class="drawer-section"><h3>' + t('detailScores') + '</h3>' + scores + '</div>' +
      '<div class="drawer-section"><h3>' + t('detailFormula') + '</h3><p class="drawer-note">' + formula + '</p></div>' +
      '<div class="drawer-section"><h3>' + t('detailWeights') + '</h3><p class="drawer-note">' + wtxt + '</p></div>' +
      '<div class="drawer-section"><h3>' + t('detailElig') + '</h3>' + elig + '</div>' +
      '<div class="drawer-section"><h3>' + t('detailSource') + '</h3><p class="drawer-note">' +
        escapeHtml(t('sourceNote')) + '<br><strong>' + t('vintage') + ':</strong> ' +
        escapeHtml(String(p.data_vintage || '2026')) +
        (p.score_scale_note ? '<br>' + escapeHtml(p.score_scale_note) : '') +
      '</p>' + warn + '</div>';

    const drawer = $('#prog-drawer');
    const backdrop = $('#drawer-backdrop');
    drawer.hidden = false;
    backdrop.hidden = false;
    drawer.setAttribute('aria-hidden', 'false');
    document.body.classList.add('drawer-open');
    if (location.hash !== '#' + code) {
      history.replaceState(null, '', '#' + code);
    }
    renderResults();
  }

  function closeDrawer() {
    selectedCode = null;
    $('#prog-drawer').hidden = true;
    $('#drawer-backdrop').hidden = true;
    $('#prog-drawer').setAttribute('aria-hidden', 'true');
    document.body.classList.remove('drawer-open');
    if (location.hash && /^#JS\d{4}/i.test(location.hash)) {
      history.replaceState(null, '', location.pathname + location.search);
    }
    renderResults();
  }

  function addElective(preset) {
    if (electiveCount >= MAX_ELECTIVES) return;
    electiveCount += 1;
    const row = document.createElement('div');
    row.className = 'elective-row';
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
      el.textContent = t(el.getAttribute('data-i18n'));
    });
    $all('[data-i18n-placeholder]').forEach(function (el) {
      el.placeholder = t(el.getAttribute('data-i18n-placeholder'));
    });
    const csdVal = $('#grade-csd').value;
    $('#grade-csd').innerHTML = csdOptions(csdVal);
    $all('#electives-list .elective-row').forEach(function (row) {
      const subj = row.querySelector('.subj').value;
      const lvl = row.querySelector('.lvl').value;
      row.querySelector('.subj').innerHTML = electiveSubjectOptions(subj);
      row.querySelector('.lvl').innerHTML = levelOptions(lvl);
    });
    const sort = $('#sort-select');
    const cur = sort.value;
    sort.innerHTML =
      '<option value="median">' + t('sortMedian') + '</option>' +
      '<option value="gap">' + t('sortGap') + '</option>' +
      '<option value="lq">' + t('sortLQ') + '</option>' +
      '<option value="name">' + t('sortName') + '</option>' +
      '<option value="code">' + t('sortCode') + '</option>';
    sort.value = cur || 'median';
    document.title = t('title');
    document.documentElement.lang = lang === 'zh' ? 'zh-Hans' : 'en';
    renderResults();
    if (selectedCode) openDrawer(selectedCode);
  }

  function exportCsv() {
    if (!lastComputed) return;
    const unis = getActiveUnis();
    const q = ($('#search-input').value || '').trim().toLowerCase();
    const rows = lastComputed.filter(function (r) {
      if (unis.indexOf(r.prog.university) === -1) return false;
      if (!q) return true;
      const hay = (r.prog.js_code + ' ' + r.prog.programme_name + ' ' + (r.prog.programme_name_zh || '')).toLowerCase();
      return hay.indexOf(q) !== -1;
    });
    const header = ['js_code', 'university', 'programme_name', 'programme_name_zh', 'estimate_weighted', 'best_n', 'LQ', 'median', 'UQ', 'average', 'band', 'gap_vs_median', 'formula', 'weights', 'data_vintage'];
    const lines = [header.join(',')];
    rows.forEach(function (r) {
      const p = r.prog;
      lines.push([
        p.js_code,
        p.university,
        '"' + String(p.programme_name).replace(/"/g, '""') + '"',
        '"' + String(p.programme_name_zh || '').replace(/"/g, '""') + '"',
        r.est && r.est.score != null ? r.est.score : '',
        r.est ? r.est.bestN : '',
        p.lower_quartile != null ? p.lower_quartile : '',
        p.median != null ? p.median : '',
        p.upper_quartile != null ? p.upper_quartile : '',
        p.average != null ? p.average : '',
        r.band,
        r.gap != null ? r.gap : '',
        '"' + String(p.formula_2026 || p.scoring_formula_note || '').replace(/"/g, '""') + '"',
        '"' + String(weightsSummary(p)).replace(/"/g, '""') + '"',
        p.data_vintage || '',
      ].join(','));
    });
    const blob = new Blob([lines.join('\n')], { type: 'text/csv;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'jupas-2027-weighted-estimate-vs-2026.csv';
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
    if (selectedCode) openDrawer(selectedCode);
  }

  function bind() {
    $('#btn-calc').addEventListener('click', onCalculate);
    $('#btn-add-elective').addEventListener('click', function () { addElective(); });
    $('#search-input').addEventListener('input', renderResults);
    $('#sort-select').addEventListener('change', renderResults);
    $('#btn-export').addEventListener('click', exportCsv);
    $('#drawer-close').addEventListener('click', closeDrawer);
    $('#drawer-backdrop').addEventListener('click', closeDrawer);
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') closeDrawer();
    });

    $all('.chip[data-uni]').forEach(function (chip) {
      chip.addEventListener('click', function () {
        const uni = chip.dataset.uni;
        if (uni === 'ALL') {
          $all('.chip[data-uni]').forEach(function (c) {
            c.classList.remove('active');
            c.setAttribute('aria-selected', 'false');
          });
          chip.classList.add('active');
          chip.setAttribute('aria-selected', 'true');
        } else {
          $('.chip[data-uni="ALL"]').classList.remove('active');
          $('.chip[data-uni="ALL"]').setAttribute('aria-selected', 'false');
          chip.classList.toggle('active');
          chip.setAttribute('aria-selected', chip.classList.contains('active') ? 'true' : 'false');
          const any = $all('.chip[data-uni]').some(function (c) {
            return c.dataset.uni !== 'ALL' && c.classList.contains('active');
          });
          if (!any) {
            $('.chip[data-uni="ALL"]').classList.add('active');
            $('.chip[data-uni="ALL"]').setAttribute('aria-selected', 'true');
          }
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

    window.addEventListener('hashchange', function () {
      const m = (location.hash || '').match(/^#(JS\d{4})$/i);
      if (m) openDrawer(m[1].toUpperCase());
      else closeDrawer();
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
    onCalculate();
    const m = (location.hash || '').match(/^#(JS\d{4})$/i);
    if (m) openDrawer(m[1].toUpperCase());
  }

  function boot() {
    if (window.JUPAS_DATA && window.JUPAS_DATA.programmes) {
      data = window.JUPAS_DATA;
      initUI();
      return;
    }
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
