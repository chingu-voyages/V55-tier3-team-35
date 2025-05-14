# Chingu Voyage Team 35 - Turborepo Monorepo Project

This is a monorepo project for Chingu Voyage Team 35 using Turborepo, Elysia.js (Bun), and React.

## What's Inside?

This monorepo includes the following packages:

- `api`: An [Elysia.js](https://elysiajs.com/) API server running on [Bun](https://bun.sh/)
- `client`: A [React](https://react.dev/) frontend application
- `shared`: Shared TypeScript utilities, types, and constants used by both frontend and backend

Each package has its own `package.json` and dependencies.

## Prerequisites

- [Node.js](https://nodejs.org/en/) (v18 or higher)
- [Bun](https://bun.sh/) for the API server (v1.0.0 or higher)
- [npm](https://www.npmjs.com/) (v10.2.0 or higher)

## Setup

1. Clone the repository

```bash
git clone https://github.com/chingu-voyages/v55-tier3-team-35.git
cd v55-tier3-team-35
```

2. Install dependencies

```bash
npm install
```

3. Build the project

```bash
npm run build
```

This builds all packages in the monorepo. The shared package will be built first, followed by the API and client packages.

## Development

To develop all apps and packages simultaneously:

```bash
npm run dev
```

This will start the development servers for both the API (http://localhost:3000) and client (http://localhost:5173).

### Working on Individual Packages

To work on a specific package:

```bash
cd packages/<package-name>
npm run dev
```

## Team Members

- Syed Affan #1: [GitHub](http://github.com/affan880) / [LinkedIn](http://linkedin.com/in/syed-affan/)
- Dorene St.Marthe #2: [GitHub](https://github.com/Dorene-StMarthe) / [LinkedIn](https://www.linkedin.com/in/dorenestmarthe/)
- Steffi Saint-Pierre #3: [GitHub](https://github.com/stefley1509) / [LinkedIn](https://www.linkedin.com/in/steffisp/)
- Shaimaa #4: [GitHub](https://github.com/Shaimaa01) / [LinkedIn](https://www.linkedin.com/in/shaimaa-kamel-818bab31b/)
- Jack Li #5: [GitHub](https://github.com/jackli921) / [LinkedIn](https://www.linkedin.com/in/jackli0707/)
- Angus Chang #6: [GitHub](https://github.com/changangus) / [LinkedIn](https://www.linkedin.com/in/changangus/)

## Team Documents

You may find these helpful as you work together to organize your project.

- [Team Project Ideas](./docs/team_project_ideas.md)
- [Team Decision Log](./docs/team_decision_log.md)

Meeting Agenda templates (located in the `/docs` directory in this repo):

- Meeting - Voyage Kickoff --> ./docs/meeting-voyage_kickoff.docx
- Meeting - App Vision & Feature Planning --> ./docs/meeting-vision_and_feature_planning.docx
- Meeting - Sprint Retrospective, Review, and Planning --> ./docs/meeting-sprint_retrospective_review_and_planning.docx
- Meeting - Sprint Open Topic Session --> ./docs/meeting-sprint_open_topic_session.docx