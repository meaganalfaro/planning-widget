# ⚠️ STILL IN PROGRESS ⚠️
# 🌸 Planner Widget

A kawaii-themed, AI-powered productivity widget for planning your goals — built with React + Vite. Supports 4 pastel themes, inline editing, and an AI onboarding flow that reads your syllabus PDFs and generates a personalized plan using the Claude API.

---

## ✨ Features

- **AI onboarding** — upload your syllabi, enter your goals and schedule constraints, and Claude generates a fully personalized plan
- **4 pastel themes** — Light, Dark, Cool, and Warm, all derived from a consistent kawaii color palette
- **Monthly phases** — 4-phase summer breakdown with clickable detail cards
- **Goal buckets** — organized view of your goals with inline editable items
- **Sample week** — a generated weekly schedule template based on your availability
- **Calendar tab** — deadlines, milestones, and events extracted from your syllabi, color-coded by type
- **Persistent edits** — all changes saved to localStorage so nothing is lost on refresh
- **Embeddable widget** — deploy to Vercel and embed anywhere via `<iframe>`
- **Mac desktop widget** — compatible with Übersicht for live desktop background display

---

## 📐 Product Specification

This project is built around a detailed product spec that covers the problem statement, feature designs, and technical decisions behind each component.

→ [Read the full product spec](./PRODUCT_SPEC.md)

## 🛠 Tech Stack

| Layer | Tool |
|---|---|
| Framework | React + Vite |
| Styling | CSS custom properties (theme system) |
| Persistence | localStorage |
| AI | Anthropic Claude API (BYOK) |
| Deployment | Vercel |
| Desktop widget | Übersicht (optional) |

---

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- An [Anthropic API key](https://console.anthropic.com/) (for the AI onboarding feature)

### Installation

```bash
# Clone the repo
git clone https://github.com/meaganalfaro/planning-widget.git
cd planning-widget

# Install dependencies
npm install

# Start the dev server
npm run dev
```

Open `http://localhost:5173` in your browser.

### First Run

On first load, the app will walk you through a 3-step onboarding flow:

1. **Goals** — enter your target roles and summer goals
2. **Upload** — upload your course syllabi as PDFs
3. **Schedule** — enter your weekly availability and constraints

You'll be prompted to enter your Anthropic API key (stored locally in your browser — never sent anywhere except directly to Anthropic's API).

---

## 📁 Project Structure

```
src/
  components/
    WindowChrome.jsx       # Title bar with traffic light dots
    TabBar.jsx             # Tab navigation
    tabs/
      PhasesTab.jsx        # Monthly phases view
      BucketsTab.jsx       # Goal buckets view
      WeekTab.jsx          # Weekly schedule view
      CalendarTab.jsx      # Calendar with extracted deadlines
  data/
    defaults.js            # Fallback data if user skips onboarding
    schema.js              # JSON schema sent to Claude
  hooks/
    useLocalStorage.js     # Persistent state hook
  themes/
    themes.js              # 4 theme color objects
  onboarding/
    Onboarding.jsx         # Multi-step onboarding container
    Step1Goals.jsx         # Goals + target roles form
    Step2Upload.jsx        # PDF syllabus upload
    Step3Schedule.jsx      # Availability + constraints form
  App.jsx                  # Root — routes between onboarding and widget
  index.css
```

---

## 🎨 Themes

| Theme | Background | Accent | Vibe |
|---|---|---|---|
| Light | Pink `#ff92c4`    | Yellow `#f2e8a8` | Soft and warm      |
| Dark  | Brown `#361800`   | Blue `#b5e6f0`   | Cozy night mode    |
| Cool  | Blue `#b5e6f0`    | Pink `#ff92c4`   | Calm and focused   |
| Warm  | Yellow `#f2e8a8`  | Pink `#ff92c4`   | Bright and cheerful|

---

## 🖥 Embedding as a Widget

### Anywhere (iframe)

After deploying to Vercel:

```html
<iframe
  src="https://your-app.vercel.app"
  width="720"
  height="600"
  frameborder="0"
/>
```

Works in Notion, personal sites, GitHub Pages, anywhere that supports iframes.

### Mac Desktop (Übersicht)

1. Install [Übersicht](https://tracesof.net/uebersicht/)
2. Place the built `index.html` (or point to your Vercel URL) in your Übersicht widgets folder
3. The planner will render live on your desktop background

---

## 🗺 Roadmap

- [x] Project scaffold + folder structure
- [x] Theme system with CSS custom properties
- [x] useLocalStorage hook
- [x] Phases tab
- [x] Buckets tab with inline editing + add items
- [x] Week tab with color-coded events + add event modal
- [ ] Calendar tab
- [ ] Onboarding multi-step form
- [ ] PDF upload + base64 conversion
- [ ] Claude API integration (BYOK)
- [ ] Reward + completion system
- [ ] Collapsed widget view
- [ ] Übersicht desktop widget config
- [ ] Native macOS WidgetKit (stretch)

---

## 👩‍💻 Author

Built by **Meagan Alfaro** — M.S. Cybersecurity student at FIU.

---
