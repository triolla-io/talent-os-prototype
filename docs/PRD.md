# 🚀 Triolla Talent OS

> **Agentic HR Platform**

---

## 📋 Document Control

| **Attribute**        | **Details**                                         |
| :------------------- | :-------------------------------------------------- |
| 📄 **Document Type** | UI/UX Prototype PRD (v2.1)                          |
| 🎯 **Phase**         | High-Fidelity Interactive Prototype (Frontend Only) |

---

## 📑 Table of Contents

- [1. Executive Summary](#1-executive-summary)
- [2. Core Requirements & Scope](#2-core-requirements--scope)
- [3. Global Navigation & Layout](#3-global-navigation--layout)
- [4. Home Page (Dashboard) Wireframe](#4-home-page-dashboard-wireframe)
- [5. Secondary Core Views (Prototype Screens)](#5-secondary-core-views-prototype-screens)

---

## 1. 🌟 Executive Summary

**Triolla Talent OS** is a next-generation, fully agentic AI recruitment platform designed specifically for lean high-tech teams with only one recruiter. It transforms your single recruiter into a superhuman talent engine by autonomously handling intake, enrichment, scoring, outreach, and nurturing using the latest 2026 AI capabilities.

> 💡 **Key Principle:** The recruiter focuses _only_ on high-judgment decisions. The AI handles everything else intelligently and naturally.

### 🎯 Prototype Objective

This phase delivers a frontend-only, interactive prototype (built with tools like Vite, React, and Tailwind CSS). It uses mocked data to visually validate the **"Notion + Linear + Gmail"** aesthetic, the AI-agentic workflows, and the overall user experience before backend architecture and multi-tenant scaling are implemented.

---

## 2. 🎯 Core Requirements & Scope

Based on direct executive feedback, the prototype must visually demonstrate the following constraints and features:

- 🚫 **No Video Screening:** All screening is text + voice only — no video modality.
- 📈 **Scale Capacity:** Designed to visually manage a volume of ~500 CVs per month seamlessly.
- 🤖 **AI Job Description Writer:** Must include a dedicated UI flow for AI-generated job posts.
- 👯 **Duplicate Detection (ROI):** The UI must demonstrate how the system flags duplicate candidates to save on sourcing fees.
- 🎨 **UX Focus:** Extremely natural and intuitive for non-technical HR users, heavily utilizing plain English inputs.

---

## 3. 🗺 Global Navigation & Layout

The platform is designed to feel like a modern productivity tool.

### 3.1 🔝 Top Navigation Bar

_The persistent header across all screens:_

- ⬅️ **Left:** Triolla Logo
- 🔍 **Center:** Global Search bar _(natural language enabled, e.g., "Find developers with React experience")_
- ➡️ **Right:** Prominent "Ask AI" ✨ button, Notification bell 🔔, and Recruiter avatar 👤

### 3.2 🗂 Left Sidebar (Main Menu)

_Easy, icon-based navigation for non-technical users. The active tab must be clearly highlighted._

- 🏠 **Dashboard** _(Default Home Page)_
- 🔄 **Pipeline**
- 🏊 **Talent Pool**
- 💼 **Job Openings**
- 🤖 **AI Agents**
- 📊 **Reports**

### 3.3 📱 Mobile Experience

The entire platform is **fully responsive**. On mobile devices, the left sidebar collapses into a bottom navigation bar with large, touch-friendly buttons.

---

## 4. 🏠 Home Page (Dashboard) Wireframe

The Dashboard is the operational center of the application, prioritizing **actionable AI insights** over raw data.

| 📑 Section                 | 📝 Content (Mock Data)                                                                                                                                                                   | 🎯 Purpose                             |
| :------------------------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :------------------------------------- |
| **👋 Welcome Card**        | "Good morning, Sarah. You have 12 new candidates today. 3 are high-potential."                                                                                                           | Personal, friendly tone                |
| **📈 Key Metrics Row**     | • Active Roles: `5`<br>• Candidates in Pipeline: `87`<br>• This Month's Hires: `2`<br>• AI Confidence Score: `91%`                                                                       | At-a-glance performance tracking       |
| **✅ Today's Priorities**  | **Actionable list with AI suggestions:**<br>• Review 3 strong Senior PM candidates.<br>• Follow up with 8 candidates from last week.<br>• New job description ready for "Head of Sales". | Proactive guidance and task management |
| **📄 Recent Applications** | Horizontal scroll or simple table of the latest 8 candidates showing:<br>_Photo, Name, Role, AI Score, and a "Quick View" button._                                                       | Fast access to new CVs                 |
| **🧠 AI Insights Panel**   | "3 candidates in your Talent Pool are likely to respond this week." Each insight includes an animated confidence bar.                                                                    | Smart, predictive recommendations      |

---

## 5. 🖥 Secondary Core Views (Prototype Screens)

### 5.1 🔄 Pipeline

- **Kanban Board:** A visual drag-and-drop board with columns: `New` ➡️ `Screening` ➡️ `Interview` ➡️ `Offer` ➡️ `Hired/Rejected`.
- **Candidate Cards:** Must display the candidate's basic info alongside an **AI Match Score**.

### 5.2 🏊 Talent Pool & Duplicate Detection

- **Search Interface:** A view simulating a massive database of candidates.
- **Duplicate Alerts:** Visual mockups showing how the system flags a candidate submitted by an external agency who already exists in the Triolla database, simulating the saving of sourcing fees.

### 5.3 💼 Job Openings & AI JD Writer

- **Jobs List:** A table of active and drafted positions.
- **AI Generator Modal:** A click-through flow where the recruiter clicks _"Draft with AI"_, enters a short prompt, and the UI simulates typing out a fully formatted job description.
- **Department Quick-Select:** Chip buttons (Engineering, Product, Design, Sales, Marketing, Operations) for one-click prompt population.

### 5.4 🤖 AI Agents

- **Control Center:** A dedicated screen to visualize the "behind-the-scenes" magic. Shows mock toggles and activity logs for background agents _(e.g., "Auto-Enrichment Agent - Active", "Outreach Agent - Processing 5 emails")_.
- **Activity Log:** Per-agent color-coded stripes on each activity row for at-a-glance readability. Simulates real-time updates every 5 seconds.

### 5.5 📊 Reports

- **KPI Cards Row:** Four stat cards at top — Total Hired, Time to Hire, Pipeline Conversion, AI Confidence — with animated counters.
- **Charts:** Four charts — Hiring Funnel (bar), Hires Over Time (area), Source Distribution (donut), AI Confidence Trend (line).
- **Date Range Toggle:** UI toggle for 7/30/90 day ranges. Charts are preview data; live filtering is a future backend feature.
- **AI Summary Footer:** AI-generated plain English synthesis of chart data with recommendations (shimmer text).
