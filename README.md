# voyage-tasks

Your project's `readme` is as important to success as your code. For
this reason you should put as much care into its creation and maintenance
as you would any other component of the application.

If you are unsure of what should go into the `readme` let this article,
written by an experienced Chingu, be your starting point -
[Keys to a well written README](https://tinyurl.com/yk3wubft).

And before we go there's "one more thing"! Once you decide what to include
in your `readme` feel free to replace the text we've provided here.

> Own it & Make it your Own!

## Local Development

### Pre-requisites

#### Install Docker

- Install the [Docker Desktop](https://www.docker.com/products/docker-desktop/) app on your local machine, and run the app.

- Install Docker via Docker CLI. For this method, Docker Compose must also be installed separately.

#### Verify installation

```bash
docker-compose --version
docker --version
```

### Run the app in development

In the root of the project, run the following command to start the app in development mode:

```bash
docker-compose -f docker/docker-compose.dev.yml up --build
```

This command will build the Docker containers and start the application in development mode.

#### Accessing the App

- Frontend: [http://localhost:5173](http://localhost:5173)
- Backend: [http://localhost:3000](http://localhost:3000)

### Stopping the Containers

To stop the running containers, press `CTRL + C` in the terminal or run:

```bash
docker-compose -f docker/docker-compose.dev.yml down
```

### Rebuilding the Containers

```bash
docker-compose -f docker/docker-compose.dev.yml up --build
```

### Viewing Logs

To view the logs of a specific container, use:

```bash
docker-compose -f docker/docker-compose.dev.yml logs -f [service-name]
```

Replace `[service-name]` with `backend` or `frontend` as applicable.

## Team Documents

You may find these helpful as you work together to organize your project.

- [Team Project Ideas](./docs/team_project_ideas.md)
- [Team Decision Log](./docs/team_decision_log.md)

Meeting Agenda templates (located in the `/docs` directory in this repo):

- Meeting - Voyage Kickoff --> ./docs/meeting-voyage_kickoff.docx
- Meeting - App Vision & Feature Planning --> ./docs/meeting-vision_and_feature_planning.docx
- Meeting - Sprint Retrospective, Review, and Planning --> ./docs/meeting-sprint_retrospective_review_and_planning.docx
- Meeting - Sprint Open Topic Session --> ./docs/meeting-sprint_open_topic_session.docx

## Our Team

Everyone on your team should add their name along with a link to their GitHub
& optionally their LinkedIn profiles below. Do this in Sprint #1 to validate
your repo access and to practice PR'ing with your team _before_ you start
coding!

- Syed Affan #1: [GitHub](http://github.com/affan880) / [LinkedIn](http://linkedin.com/in/syed-affan/)
- Dorene St.Marthe #2: [GitHub](https://github.com/Dorene-StMarthe) / [LinkedIn](https://www.linkedin.com/in/dorenestmarthe/)
- Steffi Saint-Pierre #3: [GitHub](https://github.com/stefley1509) / [LinkedIn](https://www.linkedin.com/in/steffisp/)
- Shaimaa #4: [GitHub](https://github.com/Shaimaa01) / [LinkedIn](https://www.linkedin.com/in/shaimaa-kamel-818bab31b/)
- Jack Li #5: [GitHub](https://github.com/jackli921) / [LinkedIn](https://www.linkedin.com/in/jackli0707/)
