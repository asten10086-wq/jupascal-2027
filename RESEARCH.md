# JUPASCal 2027 research — based on **2026** admission results

**Label for the product:** *Based on 2026 admission results for 2027 JUPAS applicants.*

**Hard data rule (user):** Only use JUPAS admission score statistics from the **2026 admissions exercise**, published **after June 2026** (Main Round / post-HKDSE). **Do not** use 2025 or older admission scores as calculator benchmarks. Expected/forward-looking scores are not substitutes for admitted-cohort LQ/median/UQ.

Research date: 2026-10-15 (Asia/Shanghai).

---

## 1. What https://jupascal.com does (current 2026-edition site)

Unofficial free bilingual (EN/中文) JUPAS & HKDSE admission-score calculator. No sign-up.

### Pages / UI structure
| Area | URL pattern | Role |
|------|-------------|------|
| Home / calculator | `/` | Enter HKDSE grades; estimate scores under each programme’s weighting; compare to historical quartiles |
| Programme index | `/p/` | Browse all JUPAS programmes by institution (10 UGC + SSSDP) |
| Programme detail | `/p/JS####/` | Per-programme: quota, entrance requirements, scoring formula + weightings, LQ/MED/UQ, Band A apps/offers history, FAQ, overview |

### Features (as stated on site / programme pages)
1. **Score calculator** — enter DSE levels; apply that programme’s subject weightings and Best-5 / Best-6 (or variant) formula.
2. **Benchmark comparison** — show estimated score vs **lower quartile / median / upper quartile** of past admitted students.
3. **Eligibility check** — against **2026** entrance requirements (Chin/Eng/Math/CSD/electives).
4. **Programme catalogue** — all degree programmes across HKU, CUHK, HKUST, PolyU, CityUHK, HKBU, LingnanU, EdUHK, HKMU, SSSDP.
5. **Band A history** — applications vs offers / offer rate by year (where available).
6. **Not** a formal ranking engine of “chance %”; more a per-programme score vs historical distribution view. Supports ApL / Cat C (per creator notes).

### Data fields shown on a programme page (example JS4412 / JS5212)
- JS code, programme name (EN/中), institution, quota  
- Admission scores: **UQ / MED / LQ** (jupascal currently labels these as **2025** admitted cohort)  
- Entrance requirements 2026 (min levels per subject)  
- Scoring method 2026 + subject weight detail  
- Band A applications / offers / % (multi-year)  
- Study level, first-year tuition, contact, official links  
- FAQ: “what was last year’s score?”, “requirements?”, “how is score calculated?”

### Scoring / weighting (as jupascal presents it)
- Uses each programme’s **own** formula (Best 5, Best 6, Eng+Math+slots, PolyU-style weighted Best 5 + optional 6th bonus, etc.).
- Applies published subject multipliers (e.g. Eng×2, Math×1.5, M1/M2×1.75).
- HKDSE level→point conversion follows the university (commonly 5**=8.5 / 5*=7 / 5=5.5 for CUHK/HKUST/HKU; PolyU uses weighted points on a larger scale; CUHK MBChB uses 5**=7).
- **Important:** the live jupascal.com site still benchmarks against **2025** LQ/MED/UQ while checking **2026** entry requirements. A 2027 clone should swap benchmarks to **2026** admitted-cohort figures and check **2027** entry requirements/weightings when published.

---

## 2. 2026 admission score sources (post-June 2026 only)

| University | Official 2026 source | Metrics published | Local / dataset status |
|------------|----------------------|-------------------|------------------------|
| **HKUST** | [2026 HKUST JUPAS Admissions Scores PDF](https://join.hkust.edu.hk/docs/2026_HKUST_JUPAS_ADMISSIONS_SCORES.pdf) | Median, LQ, highest attainable (weighted Best 5 + 6th bonus). **No UQ.** | Official PDF saved; **33** programmes in dataset |
| **PolyU** | [JUPAS Admissions Figures](https://www.polyu.edu.hk/saso/docdrive/jupas/admission_figures.pdf) (2026 section); alt [20261005_v2](https://www.polyu.edu.hk/fcms/docdrive/2026%20JUPAS%20admission_figures_20261005_v2.pdf) | Average, **Median**, **LQ** (weighted). **No UQ.** Bonus/interview may be included. STARS conditional offers excluded. | Official PDFs saved; **45** programmes |
| **HKU** | [HKU-JUPAS-Admissions-Scores-2026.pdf](https://admissions.hku.hk/sites/default/files/2026-09/HKU-JUPAS-Admissions-Scores-2026.pdf) (path dated **2026-09**) | **UQ, Median, LQ** under 2026 main selection principles | PDF URL confirmed; download blocked from research box → figures transcribed from aggregators citing that PDF; **56** programmes. **Re-verify against PDF before production.** |
| **CUHK** | Download area lists **Admission Grades (2026 Entry)** under 2026 Entry: [OAFA download area](https://admission.cuhk.edu.hk/application/jupas/download-area-for-important-information/) | **UQ, Median, LQ** (programme-weighted) | Official PDF not downloaded here (host blocked). **57** programmes from aggregator citing CUHK 2026 grades (~69 reported published). **Gap: complete from official PDF.** |

### Explicitly excluded (do not use as 2027 calculator benchmarks)
- Current jupascal.com **2025** LQ/MED/UQ  
- `archive/JUPAS-2025-admissions-scores.pdf` (2025 JUPAS Office compilation — archived only)  
- HKU/CUHK **Expected Score** sheets (forward-looking, not admitted-cohort stats)  
- Faculty PDFs that only report **2025** admission figures (e.g. some CUHK Science “Admission Figures (2025)” leaflets)  
- Any 2023–2024 score columns

Secondary aggregators used only as **bridges to cite 2026 official releases** when PDF bytes were unreachable: [jupascalculator.app](https://www.jupascalculator.app/) (data version 2026-10-15), [starschools.hk](https://starschools.hk/) (HKU). Prefer re-ingestion from official PDFs.

---

## 3. Dataset file paths

```
/workspace/jupascal-2027/
├── RESEARCH.md                 ← this file
├── scores_2026.json            ← combined (meta + all programmes)
├── scores_2026.csv             ← flat table
├── scores_2026_cuhk.json
├── scores_2026_hku.json
├── scores_2026_hkust.json
├── scores_2026_polyu.json
├── sources.json                ← source URLs + gaps
├── hkust-2026-scores.pdf       ← official
├── polyu-2026-admission-figures.pdf
├── polyu-2026-admission-figures-v2.pdf
├── hkust-2026-scores.txt       ← pdftotext
├── polyu-2026-full.txt
└── archive/
    └── JUPAS-2025-admissions-scores.pdf   ← NOT for calculator scores
```

### Counts (2026 scores only)
| Uni | Programmes with 2026 scores in dataset |
|-----|----------------------------------------|
| CUHK | 57 (partial vs ~69 official) |
| HKU | 56 |
| HKUST | 33 |
| PolyU | 45 |
| **Total** | **191** |

---

## 4. Metric notes by university (what jupascal-style UI should show)

| Uni | Show in UI | Score scale | Notes |
|-----|------------|-------------|-------|
| CUHK | LQ, Median, UQ | Weighted Best 5 (or 6 graded for MBChB); ~20–60 typical | Conversion usually 5**=8.5; medicine 5**=7 |
| HKU | LQ, Median, UQ | Programme-specific Best 5/6 + weights; ~25–56 typical | Formula changes year-to-year — always pair score with **2026** formula when comparing; for **2027** applicants use **2027** formula + **2026** benchmarks |
| HKUST | LQ, Median (+ optional highest attainable) | Weighted Best 5 + 6th bonus; ~30–60 typical | **No UQ** officially |
| PolyU | LQ, Median (+ optional Average) | Weighted Best 5 (± 6th bonus); often **150–340** scale | **No UQ**. Weights commonly 5/7/10. Do not mix with CUHK/HKU point scales |

Never compare raw PolyU scores to CUHK/HKU/HKUST on one axis without normalisation / separate columns.

---

## 5. Recommendations for a 2027-edition calculator

1. **Banner / disclaimer (required)**  
   > Based on **2026** JUPAS Main Round admission results (admitted students’ score distribution). For **2027** applicants’ reference only. Not a cut-off or offer guarantee. Interviews, OEA, Band, and whole-person factors still apply. Subject weightings for **2027 entry** may differ — recalculate with 2027 official formulae when published.

2. **Benchmark year**  
   Replace jupascal’s 2025 LQ/MED/UQ with **2026** figures from this dataset (and official PDFs as they are re-verified).

3. **Requirements & weightings year**  
   - Until universities publish 2027 weightings: use **2027 entry** pages when live; otherwise show 2026 formulae with a clear “formula year = 2026; may change for 2027” warning.  
   - CUHK already shows **2027 Entry** programme-specific requirements on the OAFA download area — prefer those for eligibility checks.

4. **Comparison UX (clone of jupascal)**  
   - Input DSE → compute programme score with that programme’s formula.  
   - Position vs LQ / Median / UQ (hide UQ for HKUST & PolyU).  
   - Filters: university, faculty/scheme, JS code search, score ≥ LQ / ≥ Median.  
   - Optional: Band A competition (from JUPAS programme pages) — separate from score benchmarks.  
   - Bilingual EN/中文; no login.

5. **PolyU special case**  
   Implement PolyU’s weighting table (points × 5/7/10 + optional 6th bonus). Display scores on PolyU’s scale. Label Average vs Median distinctly (PolyU publishes both).

6. **Data pipeline**  
   Re-download official PDFs each August–October after Main Round; checksum; refuse to fall back to prior-year scores. Keep `admission_year: 2026` on every score row.

7. **Legal / product**  
   Remain unofficial; link to university calculators and JUPAS. Do not claim prediction accuracy.

---

## 6. Gaps

| Gap | Impact | Action |
|-----|--------|--------|
| CUHK official PDF not ingested | ~12 programmes missing vs ~69 published; transcription risk | Download *Admission Grades (2026 Entry)* from OAFA download area and replace aggregator rows |
| HKU official PDF not byte-verified | Transcription risk on 56 programmes | Download `HKU-JUPAS-Admissions-Scores-2026.pdf` (2026-09 path) and diff |
| HKUST / PolyU no UQ | UI cannot show UQ for those unis | Show LQ + Median only; do not invent UQ |
| PolyU JS3000 | No 2026 reference scores (new / insufficient data) | Show “no 2026 benchmark” like jupascal |
| HKU JS6236 Design+ | Official “Insufficient Reference Data” | Exclude or flag |
| 2027 subject weightings | May change vs 2026 | Track OAFA / HKU / HKUST / PolyU 2027 calculator pages |
| Other 6 institutions + SSSDP | Out of current scope (user asked CUHK, HKU, HKUST, **+ PolyU**) | Optional later using same post-June-2026 rule |
| jupascal live site still on 2025 scores | Confirms need for 2027 update | Swap data layer only after official 2026 ingest |

---

## 7. Key source URL checklist

- https://jupascal.com/  
- https://jupascal.com/p/  
- https://join.hkust.edu.hk/docs/2026_HKUST_JUPAS_ADMISSIONS_SCORES.pdf  
- https://www.polyu.edu.hk/saso/docdrive/jupas/admission_figures.pdf  
- https://www.polyu.edu.hk/fcms/docdrive/2026%20JUPAS%20admission_figures_20261005_v2.pdf  
- https://admissions.hku.hk/sites/default/files/2026-09/HKU-JUPAS-Admissions-Scores-2026.pdf  
- https://admission.cuhk.edu.hk/application/jupas/download-area-for-important-information/  
- https://admission.cuhk.edu.hk/application/jupas/programme-specific-requirements-and-score-calculator/  
- https://www.polyu.edu.hk/study/ug/admissions/jupas/jupas-score-calculator  

