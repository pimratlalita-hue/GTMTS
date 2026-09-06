---
name: Academic Governance System
colors:
  surface: '#f8f9ff'
  surface-dim: '#cbdbf5'
  surface-bright: '#f8f9ff'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#eff4ff'
  surface-container: '#e5eeff'
  surface-container-high: '#dce9ff'
  surface-container-highest: '#d3e4fe'
  on-surface: '#0b1c30'
  on-surface-variant: '#44474e'
  inverse-surface: '#213145'
  inverse-on-surface: '#eaf1ff'
  outline: '#74777f'
  outline-variant: '#c4c6cf'
  surface-tint: '#485f83'
  primary: '#00142f'
  on-primary: '#ffffff'
  primary-container: '#0f294a'
  on-primary-container: '#7a91b7'
  inverse-primary: '#b0c8f1'
  secondary: '#0051d5'
  on-secondary: '#ffffff'
  secondary-container: '#316bf3'
  on-secondary-container: '#fefcff'
  tertiary: '#240f00'
  on-tertiary: '#ffffff'
  tertiary-container: '#422000'
  on-tertiary-container: '#d97705'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#d5e3ff'
  primary-fixed-dim: '#b0c8f1'
  on-primary-fixed: '#001b3b'
  on-primary-fixed-variant: '#30476a'
  secondary-fixed: '#dbe1ff'
  secondary-fixed-dim: '#b4c5ff'
  on-secondary-fixed: '#00174b'
  on-secondary-fixed-variant: '#003ea8'
  tertiary-fixed: '#ffdcc3'
  tertiary-fixed-dim: '#ffb77d'
  on-tertiary-fixed: '#2f1500'
  on-tertiary-fixed-variant: '#6e3900'
  background: '#f8f9ff'
  on-background: '#0b1c30'
  surface-variant: '#d3e4fe'
  navy-deep: '#0F294A'
  navy-primary: '#1E3A8A'
  sapphire-blue: '#2563EB'
  amber-distinction: '#D97706'
  amber-light: '#F59E0B'
  amber-subtle: '#FEF3C7'
  emerald-success: '#059669'
  emerald-subtle: '#D1FAE5'
  rose-risk: '#E11D48'
  rose-subtle: '#FFE4E6'
  slate-surface: '#F8FAFC'
  slate-surface-card: '#FFFFFF'
  slate-border: '#E2E8F0'
  slate-border-strong: '#CBD5E1'
  slate-text-main: '#0F172A'
  slate-text-muted: '#64748B'
typography:
  display-hero:
    fontFamily: Inter
    fontSize: 2.25rem
    fontWeight: '700'
    lineHeight: 2.75rem
    letterSpacing: -0.025em
  headline-lg:
    fontFamily: Inter
    fontSize: 1.75rem
    fontWeight: '700'
    lineHeight: 2.25rem
    letterSpacing: -0.02em
  headline-lg-mobile:
    fontFamily: Inter
    fontSize: 1.375rem
    fontWeight: '700'
    lineHeight: 1.75rem
    letterSpacing: -0.015em
  headline-md:
    fontFamily: Inter
    fontSize: 1.25rem
    fontWeight: '600'
    lineHeight: 1.75rem
    letterSpacing: -0.01em
  headline-sm:
    fontFamily: Inter
    fontSize: 1.125rem
    fontWeight: '600'
    lineHeight: 1.5rem
  body-lg:
    fontFamily: Inter
    fontSize: 1rem
    fontWeight: '400'
    lineHeight: 1.625rem
  body-md:
    fontFamily: Inter
    fontSize: 0.875rem
    fontWeight: '400'
    lineHeight: 1.375rem
  body-sm:
    fontFamily: Inter
    fontSize: 0.75rem
    fontWeight: '400'
    lineHeight: 1.125rem
  label-lg:
    fontFamily: Inter
    fontSize: 0.875rem
    fontWeight: '600'
    lineHeight: 1.25rem
    letterSpacing: 0.01em
  label-md:
    fontFamily: Inter
    fontSize: 0.75rem
    fontWeight: '600'
    lineHeight: 1rem
    letterSpacing: 0.02em
  label-sm:
    fontFamily: Inter
    fontSize: 0.6875rem
    fontWeight: '600'
    lineHeight: 0.875rem
    letterSpacing: 0.03em
  metric-kpi:
    fontFamily: Inter
    fontSize: 2rem
    fontWeight: '700'
    lineHeight: 2.25rem
    letterSpacing: -0.03em
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  space-xxs: 0.125rem
  space-xs: 0.25rem
  space-sm: 0.5rem
  space-md: 0.75rem
  space-base: 1rem
  space-lg: 1.25rem
  space-xl: 1.5rem
  space-2xl: 2rem
  space-3xl: 3rem
  gutter-mobile: 1rem
  gutter-desktop: 1.5rem
  sidebar-collapsed-width: 4.5rem
  sidebar-expanded-width: 16rem
  cockpit-max-width: 100rem
---

## Brand & Style

The design system embodies the authority, rigorous precision, and progressive clarity required by modern higher education leadership. It positions governance tools not as bureaucratic hurdles, but as an executive operational cockpit that liberates faculty time and illuminates high-stakes administrative decisions.

### Personality & Values
- **Authoritative & Scholarly:** Grounded in institutional gravitas, inspiring confidence across deans, department chairs, and faculty evaluators.
- **Vigilant & Proactive:** Early-warning telemetry and budget encumbrance tracking deliver immediate situational awareness.
- **Unburdening & Focused:** High data density balanced by generous visual structure; transforms convoluted QA and TOR workflows into crisp, linear actions.
- **Accessible & Multilingual:** Optimized for high-legibility bilingual rendering (Thai & English), ensuring complex academic titles and regulatory codes remain distinct and legible.

### Visual Style
A tailored hybrid of **Corporate / Modern** and subtle **Tactile Precision**:
- Surfaces use cool, clean slate-gray tones to minimize ocular fatigue during extended assessment and grading cycles.
- Card containers and navigation bars incorporate discrete structural ghost borders with refined backdrop blurs (`backdrop-blur-md`), evoking the clarity of modern operational cockpits.
- Status and actionable metrics utilize sharp semantic color accents (Emerald, Amber, Rose) against deep institutional blues to maintain an uncompromising hierarchy across dense data tables and executive widgets.

## Colors

The color palette establishes institutional credibility through a stratified tier of academic blues, warm governance ambers, and tactical semantic indicators.

### Key Roles
- **Primary (`#0F294A` / `#1E3A8A`):** Deep Academic Navy is reserved for commanding elements: the left persistent app drawer, top executive status bar, primary page titles, and dominant action buttons. It signals stability, compliance, and institutional authority.
- **Secondary (`#2563EB`):** Sapphire Blue guides interactive flows, active navigational tabs, focused input rings, in-line hyperlinks, and ongoing workflow states.
- **Tertiary (`#D97706` / `#F59E0B`):** Warm Amber/Gold accentuates academic distinction, honors, critical pending approvals (e.g., TOR signature pending, dean review required), and encumbrance earmarks.
- **Neutral (`#64748B`):** Cool slate governs supporting text, inactive icons, system rules, and secondary interface chrome, avoiding sterile monochrome grays.

### Semantic Status Colors
- **Approved / Complete (`#059669` Emerald):** Represents confirmed rubrics, verified OBE/CLO alignments, and cleared budget requests. Accompanied by `#D1FAE5` tinted backgrounds.
- **Early-Warning / High Risk (`#E11D48` Rose):** Alerts leadership to student dropout risks, academic probation, missed TOR deadlines, and negative budget variance. Accompanied by `#FFE4E6` tinted backgrounds.
- **Pending Review (`#D97706` Amber):** Documents waiting on department head sign-off, budget encumbrances in progress, or unmapped learning outcomes.

### Background and Layering Strategy
Default canvas uses `slate-surface` (`#F8FAFC`), which prevents screen glare during long evaluation periods. Executive cards, data grids, and drawers rest on `slate-surface-card` (`#FFFFFF`), bounded by crisp 1px borders in `slate-border` (`#E2E8F0`).

## Typography

Typography prioritizes bilingual clarity, cross-browser rendering reliability, and vertical density for dense academic tables and executive metrics.

### Font Pairing & Stack
- **Primary Typeface:** `Inter` is specified as the system anchor, pairing seamlessly with Thai system fallbacks (specifically `Sarabun` or native macOS/iOS `Thonburi`, `Sukhumvit Set`). The font stack declared across all tokens must be:
  `'Inter', 'Sarabun', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif`.
- **Characteristics:** Neutral grotesque proportions, tall x-height, and open counters guarantee that complex Thai vowel indicators and tone marks align naturally without clipping or irregular line-box inflation.

### Hierarchy Guidelines
- **KPI Metrics (`metric-kpi`):** Dedicated to high-level figures on executive dashboards (e.g., total encumbered research funds, cumulative TOR point achievements, retention rates). Uses negative letter tracking and heavy tabular numerals (`font-feature-settings: 'tnum' 1`).
- **Body & Tabular Densities:** Standard body copy uses `body-md` (14px). Dense enterprise data tables, audit logs, and rubric mapping matrices utilize `body-sm` (12px) paired with `label-md` to preserve vertical screen real estate.

## Layout & Spacing

The layout model uses an 8px rhythmic baseline combined with a fluid, multi-tier grid designed for information-dense enterprise cockpits.

### Grid & Page Architecture
- **Desktop (>= 1280px):** 12-column responsive grid with a constrained max content container of `100rem` (1600px). Columns utilize `1.5rem` (24px) gutters. The application workspace features a persistent 2-tier structure: an collapsible left navigation sidebar (`16rem` expanded, `4.5rem` collapsed) and an executive stage with dynamic multi-panel split panes for workflow evaluation.
- **Tablet (768px – 1279px):** 8-column layout with `1.25rem` (20px) gutters. The sidebar folds into an off-canvas drawer or compact iconography rail. Metric cards switch from 4-across to 2-across layouts.
- **Mobile (< 768px):** 4-column single-stack layout with `1rem` (16px) margins. Executive dashboards compress dense multi-column tabular data into grouped swipeable or expandable review cards with full-width action drawers.

### Spacing Philosophy
- Form fields and operational controls adhere to an exact `0.5rem` (8px) internal padding cadence to keep forms compact.
- Dashboard KPI cards implement `1.25rem` (20px) internal container padding to allow data points and trend badges breathing room without wasting vertical viewport territory.

## Elevation & Depth

Visual hierarchy uses clean surface layering and crisp structural borders rather than heavy drop shadows, preserving an editorial, institutional look.

### Elevation Levels
- **Layer 0 (Canvas Base):** `slate-surface` (`#F8FAFC`). Flat backdrop for the entire administrative suite.
- **Layer 1 (Cards & Data Tables):** Pure white (`#FFFFFF`) with a clean 1px border (`#E2E8F0`). Shadow: `0 1px 2px 0 rgba(15, 23, 42, 0.04)`. Used for all standard dashboard widgets, form containers, and document panels.
- **Layer 2 (Elevated Active States & Dropdowns):** Pure white with a 1px border (`#CBD5E1`). Shadow: `0 4px 6px -1px rgba(15, 23, 42, 0.08), 0 2px 4px -2px rgba(15, 23, 42, 0.04)`. Applied to hover-state cards, popovers, select dropdowns, and date range pickers.
- **Layer 3 (Modals & Approval Drawers):** Pure white with subtle navy tint in the ambient shadow: `0 20px 25px -5px rgba(15, 41, 74, 0.12), 0 8px 10px -6px rgba(15, 41, 74, 0.06)`. Backed by an opaque dim overlay: `rgba(15, 25, 45, 0.45)` with `backdrop-filter: blur(4px)`.
- **Subtle Glass Accents:** Top sticky action headers and active audit breadcrumbs use `rgba(255, 255, 255, 0.85)` with `backdrop-filter: blur(8px)` and a bottom border in `slate-border` (`#E2E8F0`).

## Shapes

The design system employs a **Soft (`1`)** shape language (`0.25rem` base, `0.5rem` for cards and inputs, `0.75rem` for large modal surfaces). 

### Rationale & Rules
- **Enterprise Precision:** Rounding radii remain disciplined (`0.375rem` to `0.5rem` / 6px to 8px). Overly rounded or pill-shaped designs dilute the legal, regulatory, and formal weight of academic evaluation documents.
- **Badges & Tags:** Semantic status chips and early-warning badges use `rounded-md` (`0.375rem`) rather than fully circular pills, ensuring alignment with dense table cell grids.
- **Action Buttons & Form Controls:** Consistently set to `rounded-md` (`0.375rem` / 6px) to maintain a cohesive horizontal and vertical rhythm when nested inside complex input groups and segmented controllers.

## Components

### Buttons
- **Primary:** Solid Deep Navy (`#0F294A`) with white text and `rounded-md`. Hover: `#1E3A8A`. Active: `#0A1C33`. Used exclusively for final confirmation actions (e.g., "อนุมัติโครงการ", "ส่งผลการประเมิน TOR", "ยืนยันการตัดงบประมาณ").
- **Secondary / Operational:** White surface with 1px border in `#CBD5E1`, text in `#0F294A`. Hover: background `#F1F5F9`.
- **Tertiary / Distinction:** Solid Warm Amber (`#D97706`) with white text. Reserved for privileged academic promotions, fast-track workflow exceptions, and SAR exports.
- **Danger / Rejection:** White background with 1px border in `#FDA4AF` and text in `#E11D48`. Hover: background `#FFE4E6`.
- **Size Standards:** Height 36px (`px-3 py-1.5`) for data table rows; height 42px (`px-4 py-2`) for standard view actions; height 48px for modal primary calls to action.

### Status Badges & Chips
- Designed with subtle low-saturation backgrounds and saturated foreground text:
  - **Approved / Met (`#D1FAE5` bg / `#065F46` text):** Indicates verified CLO attainment, signed TOR forms.
  - **Risk / Alert (`#FFE4E6` bg / `#9F1239` text):** Student GPA alert (< 2.00), budget overdraft warning, missing syllabus evidence.
  - **Pending / In Review (`#FEF3C7` bg / `#92400E` text):** Pending dean review, encumbrance routing in progress.
  - **Neutral / Draft (`#F1F5F9` bg / `#475569` text):** Unsubmitted draft, inactive term.

### Data Tables & Grids
- **Header:** Background `#F8FAFC`, uppercase `label-sm` in `#64748B`, 1px border-b in `#CBD5E1`.
- **Rows:** Alternating subtle row zebra striping is prohibited; use clean 1px bottom divider lines (`#E2E8F0`). Row height: 48px for comfortable density.
- **Row Hover:** Smooth transition to `#F8FAFC`. Active/Selected row uses `#EFF6FF` with a 2px left border accent in Sapphire `#2563EB`.
- **Numeric & Financial Cells:** Tabular numerals with right alignment. Thai currency abbreviations ("฿") formatted in muted slate typography.

### Input Fields & Select Controls
- **Resting:** Background `#FFFFFF`, 1px border in `#CBD5E1`, `rounded-md`, typography in `body-md` (`#0F172A`). Placeholder text in `#94A3B8`.
- **Focus:** Border color shifts to Sapphire Blue (`#2563EB`) with an ambient outer focus ring: `box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.15)`.
- **Error State:** Border shifts to Rose (`#E11D48`) with `box-shadow: 0 0 0 3px rgba(225, 29, 72, 0.15)`. Error helper text displays below in `body-sm` (`#E11D48`).

### Checkboxes & Radio Buttons
- 16px x 16px square/circle with a 1.5px border in `#94A3B8`. 
- Checked state fills with `#0F294A` (Navy) displaying a clean white geometric checkmark or radio dot.
- High-contrast accessibility: focus state includes an outer 2px offset ring in `#2563EB`.

### Executive Cockpit Cards
- White container with 1px border in `#E2E8F0` and `rounded-lg` (`0.5rem`).
- Header includes a title in `headline-sm`, an optional metadata timestamp in `body-sm`, and an icon or status badge in the top right.
- Content zone houses primary KPI numbers formatted with `metric-kpi`, coupled with contextual delta indicators (e.g., `+12.4% vs เทอมก่อนหน้า` in Emerald or Rose).

### Workflow Approval Timeline
- A vertical or horizontal step rail showing audit milestones.
- Completed stages: `#059669` circular node with check icon and solid connection line.
- Current active stage: `#2563EB` pulsing node with user avatar / role designation label.
- Future stages: `#CBD5E1` outline node with dashed connector line.