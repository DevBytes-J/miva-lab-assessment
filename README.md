# Joanna Bassey - Portfolio & Academic Planner
> **MIVA Open University · Faculty of Computing · Software Engineering Lab Assessment**

Hi! Welcome to my submission repository.

I'm **Joanna Bassey**, a Software Engineering student at **MIVA Open University** . 

This project is my submission for our Software Engineering lab assessment brief, where we were tasked with building a personal portfolio website and integrating an academic task planner.

---

##  The Assessment Brief & My Thought Process

When we were given the assessment brief asking us to build a portfolio and include a task planner, I had to stop and think about how to approach it.

I didn't want to just tack on a random, generic "todo list" that felt disconnected from the rest of the site. If I was asked to build a task planner for a university assessment, I wanted it to actually reflect my real life as a student at MIVA Open University, and fit naturally into the design of the portfolio.

Here is what went through my mind when I received the brief, and why I built it the way I did:

### 1. "How do I make the task planner actually useful for a student?"
When asked to build a task planner, I thought about what I actually deal with every week:
- **Actual university courses**: Instead of generic tags, I added my real courses to the dropdown (`COS 102`, `CSC 104`, `GST 112`, `GST 122`). That way, when you add a task like *"Study chapter four"* or *"Prepare group presentation"*, you attach it directly to the course it belongs to.
- **Due dates**: Deadlines matter in school (although i missed mine :) ), so I included a date picker that formats the date cleanly on each task card (e.g. `Due 18 Jun 2025`).
- **Quick filter tabs**: I added three filter buttons (`all`, `active`, and `done`) right above the list, with a live counter badge so you can instantly see how many total tasks you have and switch views with one click.

### 2. "How do I make tracking progress visual and motivating?"
A plain list of tasks doesn't give you much feedback. I wanted something visual that shows how far along you are:
- I built a **circular progress ring** in the sidebar that displays your completion percentage (`% complete`) and an encouraging summary underneath (e.g. *"2 of 3 tasks completed. Keep moving, one task at a time."*).
- In the CSS, I styled this ring using a dynamic `conic-gradient` powered by a `--progress` custom property. When you check or uncheck a task, JavaScript recalculates the angle (from 0 to 360 degrees) and updates the ring immediately.
- I also included a **date block** right above the ring that automatically pulls today's actual day, month, and year using native JavaScript `Date()`.

### 3. "How should the planner give feedback when you do something?"
I didn't want the page to be completely silent when you interact with it, and native browser `alert()` popups look outdated and interrupt your workflow.
- I built custom **toast notifications** in CSS and JavaScript:
  - When you add a task: shows a toast saying **"Successfully added"**.
  - When you check off a task: shows a celebration toast saying **"Congratulations"**.
  - When you delete a task: shows a toast saying **"Successfully deleted"**.
- Each toast slides in at the bottom corner with an animated progress line, stays for 2.6 seconds, and smoothly fades out (or you can click it to dismiss it immediately).

### 4. "How do I keep tasks saved between refreshes?"
Because this is a frontend assessment, we don't have an external database running. But it would be frustrating if refreshing the page wiped out your entire list.
- I hooked the planner up to browser `localStorage` under the key `'joanna-planner'`. 
- When you first visit the site, it loads three starter tasks to show how it works. Any task you add, mark as done, or delete is saved to `localStorage` so your list stays intact when you reload.

### 5. Meeting the Requirement: Pure HTML, CSS, and JavaScript
A core requirement of the assessment was to build this project entirely with vanilla web technologies (HTML5, CSS3, and JavaScript) without relying on frontend frameworks or CSS libraries.

Here is how I implemented everything with pure web standards:
- **Semantic HTML5**: Structured every page using clean, meaningful tags (`<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<aside>`, and `<footer>`) instead of generic containers.
- **Pure CSS3**: Built the entire responsive design, custom properties, fluid typography with `clamp()`, and 3D card flips completely in native CSS without Tailwind, Bootstrap, or any UI framework.
- **Vanilla ES6+ JavaScript**: Handled all DOM updates, `localStorage` state management, progress calculations, toast notifications, and scroll-reveal observers directly using native browser APIs.

---

## How the Codebase is Organized

To keep everything clean, organized, and easy for examiners to inspect, I separated the code into dedicated page files, modular stylesheets, and scoped scripts:

```plaintext
miva-lab-assessment/
│
├── index.html                   # Home: Hero, animated word cycler, orbital portrait, stat counter ribbon
├── about.html                   # About: My story, intro video, AltSchool & MIVA cards, 3D flip card hobbies
├── projects.html                # Work: Real production project case studies with hover-straightening mockups
├── planner.html                 # Planner: The required academic task manager with progress ring & toasts
├── contact.html                 # Contact: Validated inquiry form, confirmation screen, direct links
├── README.md                    # Project documentation
│
├── assets/                      # Media assets organized cleanly by page
│   ├── shared/
│   │   ├── logo.png             # Navigation wordmark logo
│   │   └── footer-logo.png      # Monogram brand mark with orbital ring and sparkle star
│   ├── home/
│   │   └── joanna-portrait.jpeg # My hero section portrait photograph
│   ├── about/
│   │   ├── joanna-video.mp4     # Self-hosted biographical video introduction
│   │   ├── baking.jpeg          # Baking hobby photo
│   │   ├── cooking.jpeg         # Cooking hobby photo
│   │   ├── taking-pictures-1.jpeg # Photography photo 1
│   │   ├── taking-pictures-2.jpeg # Photography photo 2
│   │   ├── recreation-1.jpeg    # Travel & relaxation photo 1
│   │   └── recreation-2.jpeg    # Travel & relaxation photo 2
│   └── projects/
│       ├── sage.png             # Project mockup: Project Sage
│       ├── openprofile.png      # Project mockup: Open Profile
│       └── postsync.png         # Project mockup: PostSync
│
├── css/                         # Modular CSS stylesheets
│   ├── base.css                 # Colors, typography, header, desktop & mobile/tablet footers, animations
│   ├── home.css                 # Hero section, orbital rings, rotating word animations, stat counter strip
│   ├── about.css                # Video container, education cards, skill tags, 3D flip card gallery
│   ├── projects.css             # Project cards, mockup frames with hover-straighten, CTA section
│   ├── planner.css              # Progress ring, task form, custom checkmarks, toast notifications
│   └── contact.css              # Contact layout, form inputs, submission confirmation card
│
└── js/                          # Scoped ES6+ JavaScript modules
    ├── main.js                  # Shared routing ([data-nav]), mobile menu toggle, scroll flow-reveal
    ├── home.js                  # Hero rotating title cycler, viewport-triggered metric number counter
    ├── planner.js               # Task CRUD, localStorage persistence, progress ring math, toast triggers
    └── contact.js               # Form validation, smooth viewport scroll reset, confirmation view
```

---

## Page-by-Page Breakdown

### 1. Home (`index.html`)
- **Hero Introduction**: Welcoming copy featuring my name in bold (`Joanna Bassey`), paired with an animated word cycler that smoothly rotates through four qualities: *Creative*, *Thoughtful*, *Clean*, and *Intentional*.
- **Orbital Portrait Frame**: My portrait housed inside a circular frame surrounded by decorative orbital rings and a rotating sparkle star.
- **Metric Counter Strip**: An animated statistics ribbon highlighting *03+ Production projects*, *02+ Years writing code*, and *100% Commitment to clean craft*. The numbers automatically count up when scrolled into view.
- **Featured Preview**: A teaser card showcasing Project Sage with a direct link to the project.

### 2. About Me (`about.html`)
- **My Origin Story**: How my journey into tech started with curiosity - wondering what makes a button move, why an image breaks, or what makes a website slow.
- **Personal Video Intro**: An embedded HTML5 video player where I introduce myself.
- **Education & Certifications**:
  - *Diploma in Frontend Development* from **AltSchool Africa** (2024 - 2025).
  - *BSc. in Software Engineering* at **MIVA Open University** (2024 - Present).
- **Core Technical Skills**: Badges covering HTML5, CSS3, Vanilla JS, React.js, UI/UX Wireframing & Figma, Git & Version Control, and Performance & Accessibility.
- **3D Flip Card Hobby Gallery**: Interactive cards that flip around on hover (`rotateY(180deg)`) to show what I love doing outside of programming:
  - Baking sweet treats 
  - Cooking delicious meals 
  - Street & city photography 
  - Traveling and city exploration 

### 3. Selected Work (`projects.html`)
Case studies of live production websites I have worked on:
1. **Project Sage** ([www.chinedu.design](https://www.chinedu.design)) - Design system & frontend architecture.
2. **Open Profile** ([www.openprofile.bio](https://www.openprofile.bio)) - High-performance bio link platform.
3. **PostSync** ([postsyncc.vercel.app](https://postsyncc.vercel.app/)) - Multi-channel content publishing and scheduling tool.
- **Hover-Straightening Mockups**: Screenshots are tilted at `-2deg` like physical photos on a desk, and smoothly glide upright to `0deg` on hover.
- **Call-to-Action Section**: An invitation banner (*"Let's make something worth sharing"*) featuring an eased hover transition on the *"Tell me about it"* button.

### 4. Academic Planner (`planner.html`)
The interactive task manager built for the assessment brief:
- **Sidebar**: Shows today's real day and month/year, the visual conic-gradient progress ring with percentage complete, and a summary of completed vs total tasks.
- **Task Form**: Add a task name, pick a university course (`COS 106`, `COS 104`, `GST 102`, `MAT 102`), select a due date, and click *"Add to my list"*.
- **Task Filters**: Instant filter buttons for `all`, `active`, and `done`, plus a total task badge count.
- **Task List**: Custom checkmark buttons to toggle completion, title, course tag, formatted due date, and a delete button.
- **Toast Notifications**: Slide-in alerts for adding (*"Successfully added"*), completing (*"Congratulations"*), and deleting (*"Successfully deleted"*).
- **LocalStorage**: Automatically keeps your tasks saved.

### 5. Contact (`contact.html`)
- **Inquiry Form**: Clean inputs for full name, email address, topic of interest (General inquiry, Project collaboration, Academic connection), and message.
- **Smooth Confirmation Flow**: Submitting the form smoothly scrolls you to the top and displays a confirmation card with a button to send another message.
- **Direct Channels**: Direct links to my email ([joannabassey19@gmail.com](mailto:joannabassey19@gmail.com)), phone/WhatsApp ([+234 708 011 2687](tel:+2347080112687)), GitHub, and LinkedIn.

---

##  How I Coded Key Features

### 1. Planner Progress Ring Math
In [`js/planner.js`](file:///C:/Users/DELL/Desktop/miva-lab-assessment/js/planner.js), the progress ring is updated by calculating the percentage of completed tasks and converting it into degrees (0° to 360°):

```javascript
const completed = tasks.filter((t) => t.completed).length;
const total = tasks.length;
const pct = total ? Math.round((completed / total) * 100) : 0;
const deg = Math.round((pct / 100) * 360);

if (progressRing) {
  progressRing.style.setProperty("--progress", `${deg}deg`);
}
if (progressPct) {
  progressPct.textContent = `${pct}%`;
}
```

In [`css/planner.css`](file:///C:/Users/DELL/Desktop/miva-lab-assessment/css/planner.css), the ring uses a conic-gradient with that `--progress` variable:
```css
.progress-ring {
  --progress: 0deg;
  background: conic-gradient(var(--color-orchid) var(--progress), #ffffff20 0);
}
```

### 2. Task State & LocalStorage
Tasks are stored in an array and synced to `localStorage`:
```javascript
let tasks = (() => {
  try {
    const saved = localStorage.getItem("joanna-planner");
    return saved ? JSON.parse(saved) : starterTasks;
  } catch {
    return starterTasks;
  }
})();

function saveTasks() {
  try {
    localStorage.setItem("joanna-planner", JSON.stringify(tasks));
  } catch {}
}
```

### 3. Custom Toast Notifications
When an action occurs, `showPlannerToast(message, type)` creates a toast with an SVG icon, appends it to `#planner-toast-container`, and cleans it up after 2.6 seconds:
```javascript
function showPlannerToast(message, type = "add") {
  // Creates .planner-toast element with specific icon
  // Slides in, displays message, and auto-dismisses after 2.6s
}
```

### 4. Staggered Scroll Flow-Reveal
In [`js/main.js`](file:///C:/Users/DELL/Desktop/miva-lab-assessment/js/main.js), an `IntersectionObserver` watches cards, text blocks, and headings, assigning a `--flow-delay` CSS variable to stagger child entrance animations without any external animation library.

### 5. Dual Responsive Footer
In [`css/base.css`](file:///C:/Users/DELL/Desktop/miva-lab-assessment/css/base.css), the footer automatically adapts:
- **On Desktop (> 1024px)**: 3-column layout (logo on left, motto in center, text links on right, legal copyright at bottom).
- **On Mobile & Tablet (≤ 1024px)**: A centered brand experience:
  1. Centered `JB` logo with orbital ring and sparkle star.
  2. 3-line italicized motto in `Playfair Display`.
  3. Hairline gradient divider centered on a 4-pointed sparkle star.
  4. Three circular outline icon buttons (GitHub, LinkedIn, and Email) with hover lift.
  5. Centered uppercase tracking legal statement.

---

##  My Color Palette & Typography

| Color Name | Hex Code | Purpose in the Project |
| :--- | :---: | :--- |
| **Deep Wine** | `#461d3a` | Primary buttons, main headings, bold text |
| **Muted Plum** | `#502a50` | Active navigation indicators, card borders |
| **Rich Berry** | `#7e2a53` | Button hover fills, callout banners, page numbering |
| **Dusty Orchid**| `#ba71a2` | Star sparkles, button drop-shadows, progress ring fill |
| **Soft Lilac** | `#ecd0ec` | Progress track background, icon borders, course tags |
| **Warm Paper** | `#faf6f3` | Main page canvas background, card surfaces |
| **Dark Canvas** | `#080307` | Mobile & tablet footer background |

- **Headings**: `"Playfair Display", Georgia, serif` - For editorial warmth and academic elegance.
- **Body & UI**: `"DM Sans", sans-serif` - Clean, geometric, and readable at all screen sizes.

---

##  Accessibility

- **Semantic Landmark HTML**: Used `<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<aside>`, and `<footer>`.
- **Screen Reader Support**: All icons and action buttons include `aria-label` or `aria-hidden` attributes.
- **Keyboard Navigation**: Distinct focus states and logical tab order across form controls and navigation links.
- **Reduced Motion**: Full `@media (prefers-reduced-motion: reduce)` block to turn off animations for users sensitive to motion.

---

##  How to Run This Locally

Because this project is built on standard web technologies, there are no dependencies or build tools to install:

### Option 1: Direct in your browser
1. Download or clone this repository:
   ```bash
   git clone https://github.com/DevBytes-J/miva-lab-assessment.git
   ```
2. Open the folder and double-click `index.html` to view it in any modern browser.

### Option 2: Run a local server (Recommended)
Using Python:
```bash
python -m http.server 8000
```
Then open `http://localhost:8000` in your browser.

Or in VS Code:
- Open the project folder in VS Code, right-click `index.html`, and choose **"Open with Live Server"**.

---

##  Student Information & Contacts

- **Student Name**: Joanna Bassey
- **Institution**: MIVA Open University, Nigeria
- **Programme**: BSc. Software Engineering
- **Alumna**: AltSchool Africa (Diploma in Frontend Development)
- **Email**: [joannabassey19@gmail.com](mailto:joannabassey19@gmail.com)
- **Phone / WhatsApp**: [+234 708 011 2687](tel:+2347080112687)
- **GitHub**: [@DevBytes-J](https://github.com/DevBytes-J/)
- **LinkedIn**: [Joanna Bassey](https://www.linkedin.com/in/joanna-bassey-554004338/)

---
*Submitted for the MIVA Open University Software Engineering Lab Assessment.*
