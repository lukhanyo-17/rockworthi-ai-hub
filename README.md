# RockWorth AI Hub

ask: Build a fully functional, mobile-responsive "AI Workplace Productivity Hub" web application named RockWorth.

Brand Identity & UI/UX Design:

App Name: RockWorth (One word, exact capitalization). The logo/header text must use a heavily bolded, very distinct font (like Montserrat Black, Impact, or similar) so it stands out immediately.

Vibe: A grungy, serious business, premium corporate tool. Dark mode aesthetic.

Color Palette:

Main Background: Deep Navy.

Cards/Containers: Graphite (a dark, slightly textured gray).

Text: Crisp White for high readability.

Accents & Highlights: Deep Orange.

Buttons: Primary action buttons MUST be a striking Deep Orange gradient to provide sharp contrast against the Navy/Graphite background. Highlighted words or active tabs should also use this Deep Orange.

Layout: Include a sleek sidebar or top navigation bar to switch between the 3 core AI tools.

Tool 1: Smart Email Generator

UI: A graphite card with a text area labeled "What is this email about?", a dropdown menu for "Select Tone" (options: Formal, Friendly, Persuasive), and a Deep Orange gradient "Generate Email" button.

Functionality: When clicked, show a 2-second loading animation (spinner). Then, display a realistic, hardcoded mock email response that reflects the chosen tone.

Tool 2: Meeting Notes Summarizer

UI: A large text area labeled "Paste Raw Meeting Notes Here" and a Deep Orange "Summarize Notes" button.

Functionality: Upon clicking, show a 2-second loading state. Then, generate an output card divided into:

"Executive Summary" (a short paragraph).

"Action Items, Decisions & Deadlines" (a bulleted list with mock checkboxes). Use hardcoded mock data for the output.

Tool 3: AI Task Planner / Scheduler

UI: An input field to type a task, an "Add Task" button, and a primary Deep Orange "Generate Weekly Schedule" button.

Functionality: When the user clicks generate, show a loading state, then output a structured mock schedule breaking tasks down into "High Priority / Morning", "Medium Priority / Afternoon", and "Low Priority / Tomorrow".

Crucial Requirement: You MUST simulate the AI processing using realistic loading UI, and then render high-quality, hardcoded mock text outputs for each tool so that the grading assessors can fully test the user experience without needing a live backend API.

This project was built with [Lovable](https://lovable.dev).

**Live app**: https://rockworth-ai-hub.lovable.app

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/bb222219-eba3-4842-bf0e-cfaeb7b58719).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
