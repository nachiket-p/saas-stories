# PRD: SaaS Metrics Playground Tool

## Overview

A lightweight, interactive web tool designed for startup founders to understand, calculate, and simulate early-stage SaaS metrics like CAC, LTV, Payback Period, and LTV\:CAC ratio in a fun, non-boring way. Instead of a dry form-filling calculator, this will feel like a storytelling experience or a mini-game.

## Target Audience

* First-time SaaS founders
* Solo entrepreneurs
* Early-stage startups
* Business school students

## Goals

* Educate founders on key SaaS metrics
* Allow simulation based on adjustable inputs
* Provide actionable tips on how to improve these metrics
* Make metrics feel intuitive through narrative

## Core Metrics to Cover

1. **CAC (Customer Acquisition Cost)**
2. **LTV (Customer Lifetime Value)**
3. **LTV : CAC Ratio**
4. **Payback Period**
5. **Churn Rate**
6. **Activation Rate**

---

## User Experience Flow

### 1. Welcome Screen

* Title: "Your SaaS Business Quest Begins!"
* Avatar mascot to guide users (e.g., "SaaSy the Metric Owl")
* CTA: "Let’s calculate my metrics"

### 2. Input Playground (Story-mode layout)

* Each input prompt is phrased like a narrative:

  * "How much gold (money) do you spend to recruit one loyal customer?"
  * "How much does a happy customer pay you every month?"
  * "How long do they usually stay before flying off?"
* Inputs grouped by themes:

  * **Acquisition**: Marketing Spend, Sales Tools, Number of Customers
  * **Revenue**: Monthly revenue per customer, Avg months retained
  * **Retention**: Churn %, Activation events

### 3. Output Dashboard (Visual Guide)

The same visual layout will be used across all scenarios for consistency:

#### 🧩 Visual Layout Components:

* **Left Panel**: Input Summary Card (editable)

  * Key metrics used in the scenario
  * Toggle to tweak values
* **Center Panel**: Visual Results Zone

  * **CAC vs LTV Bar Chart**
  * **LTV\:CAC Ratio Speedometer Gauge**
  * **Churn vs Activation Pie Chart**
  * **Payback Period Countdown Clock**
* **Right Panel**: Narrative Guidance from "SaaSy the Owl"

  * Contextual comments on the scenario outcome
  * Suggestions for improvement
* **Top Navigation**: Scenario dropdown selector and CTA buttons

  * Replay, Save Snapshot, Share

### 4. Improvement Guide (Optional)

* Button: "How can I improve this?"
* Contextual suggestions:

  * If CAC is high: "Try reducing ad spend per customer or improve conversion."
  * If LTV is low: "Boost engagement to increase retention and upsells."

### 5. Scenario Mode (Learn by Examples)

Users can choose from 4 fictional SaaS startup profiles to explore preset scenarios. Each one uses the same visual dashboard layout above:

#### Scenario 1: ProductHunt Pete

* Description: Just launched SaaS with a few beta users
* Metrics: CAC = \$200, MRR = \$20, Lifetime = 4 mo
* Outcome: LTV\:CAC = 0.4

#### Scenario 2: Indie Anna

* Description: Bootstrapped SaaS with loyal user base
* Metrics: CAC = \$40, MRR = \$15, Lifetime = 18 mo
* Outcome: LTV\:CAC = 6.75

#### Scenario 3: VC Vikram

* Description: Funded startup with aggressive spending
* Metrics: CAC = \$350, MRR = \$60, Lifetime = 10 mo
* Outcome: LTV\:CAC = 1.71

#### Scenario 4: Churn Buster Bella

* Description: Retention-focused, mature SaaS
* Metrics: CAC = \$100, MRR = \$30, Lifetime = 36 mo
* Outcome: LTV\:CAC = 10.8

### 6. Save/Share/Replay

* Download PDF or save snapshot
* Shareable link
* "Restart Simulation" button

---

## Technical Stack (Final Decision)

The following libraries and tools will be used for V1:

* **Framework**: Next.js
* **Styling**: Tailwind CSS
* **UI Components**: shadcn/ui
* **Icons**: Lucide
* **State Management**: Zustand
* **Charts**: Recharts
* **Animations**: Framer Motion
* **Mascot Animation**: Lottie + lottie-react (optional)
* **PDF/Export**: html2canvas + jsPDF
* **Hosting**: Vercel
* **Form Handling**: React Hook Form
* **Utility**: clsx

---

## Brand & Style Guide (Tailwind + shadcn)

### Colors

* `--primary`: `#4F46E5` (Indigo 600)
* `--primary-foreground`: `#FFFFFF`
* `--secondary`: `#FACC15` (Yellow 400)
* `--secondary-foreground`: `#1F2937` (Gray 800)
* `--background`: `#F9FAFB` (Gray 50)
* `--card`: `#FFFFFF`
* `--card-border`: `#E5E7EB` (Gray 200)
* `--text-default`: `#111827` (Gray 900)
* `--text-muted`: `#6B7280` (Gray 500)

### Typography

* **Headings**: `font-display`, `font-bold`, `tracking-tight`, `text-gray-900`
* **Body**: `font-sans`, `leading-relaxed`, `text-gray-700`
* **System fonts**: `Inter`, `ui-sans-serif`, `system-ui`

### Spacing & Layout

* Use consistent `px-4`, `py-6`, `gap-4` for padding/margin between sections
* Cards: `rounded-2xl`, `shadow-md`, `border`

### Components (shadcn/ui)

* Use `Card`, `Button`, `Input`, `Tabs`, `Tooltip`, `Popover`, `Alert`, `Badge`, `Dialog`, `DropdownMenu`
* Button variants:

  * `default`: indigo solid
  * `ghost`: muted gray for background nav/actions
* Add playful interaction on hover using Framer Motion (scale, bounce)

### Chart Style

* Use Tailwind palette for chart colors
* Font in charts: `text-sm`, `font-medium`
* Tooltip: use `shadcn Popover` style for hover tooltips

---

## Animation Guide (Lottie + Framer Motion)

### Mascot Animations

* 🦉 **SaaSy the Owl**

  * Idle: [Owl Idle Animation](https://lottiefiles.com/animations/owl-idle-animation-uN0uIjysHo)
  * Teaching: [Owl Explaining](https://lottiefiles.com/animations/owl-teaching-FC3zYKzSmS)
  * Reading tips: [Owl Reading Book](https://lottiefiles.com/animations/owl-reading-book-WRCotRJhx1)

### Scenario Feedback Animations

* ✅ **Success / High LTV\:CAC**

  * [Happy Success Check](https://lottiefiles.com/animations/success-check-mark-QrvJ4PQF1E)
* ⚠️ **Warning / Low Ratio or High CAC**

  * [Oops Alert Animation](https://lottiefiles.com/animations/oops-6kJHLPl3Fd)
* 🔁 **Churn Emphasis**

  * [Sad Face Loop](https://lottiefiles.com/animations/sad-face-loop-VE1O6Z3zRi)
* 💡 **Tips & Suggestions**

  * [Idea Lightbulb Flicker](https://lottiefiles.com/animations/idea-lightbulb-rB8XuPq20n)

### Welcome/Loading Animations

* [Owl Startup Intro](https://lottiefiles.com/animations/animated-owl-intro-vd7hnZsoUh)
* [Rocket Launch Intro](https://lottiefiles.com/animations/rocket-launch-splash-uIHKDZ8uLr)

### Integration

* Embed via `lottie-react` library
* Animate with Framer Motion transitions
* Dynamically swap animations based on metric results or state changes

---

## Future Ideas (Not for V1)

* AI advisor to suggest changes in real-time
* Gamified scoring based on optimal metrics
* More fictional profiles with unique business twists

---

## Tone & Design

* Playful but clear
* Minimalist UI with good UX for mobile and desktop
* Gamified touch: points, emojis, mascot comments

---

## Success Criteria

* Time on tool > 3 minutes
* > 50% users complete the full flow
* 30%+ share or download snapshot

---

Let me know if you want to turn this into an interactive prototype or HTML preview next!
