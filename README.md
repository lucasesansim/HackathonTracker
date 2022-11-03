# HackathonTracker

### Context
Who hasn’t attended a hackathon in the past? Those are great opportunities to learn,
challenge ourselves and meet new people.
Each hackathon has developers and 3 winners (ranking 1st to 3rd). We will build a system that
looks for the best developers around the world by saving from each hackathon the best 10
developments.

### Requirements 

A. BACKEND
1) Build an API to retrieve both hackathons with their developers, and the best developers. At
this point, you can use mocked data inside the DB.
2) Build a cron that runs every 5 minutes and inserts a new hackathon including the best 10
developments. For the users generation, you can use the following API:
https://randomuser.me/api

B. FRONTEND
1) Build a list of hackathons with their name, place and date. Once you access each hackathon
you should see the best 10 developments from it.
2) Build a menu to be able to select between hackathons and top developers. Then, build the
top developers table.

C. BONUS
1) Build the implementation to require the user to login first
2) Block any other page if the user is not logged in.
3) Add any authorization method you know to prevent external users from calling our
services.

### Assumptions
- From backend requirements I understood that there needed to be an API developed that returned hackathons, and the developers that coded in that hackathon. Even though in the frontend the hackathon list doesn't require you to show the developers, I developed the API as requested, but in a more real scenario I would talk more about if this is really necessary, to lighten the load.
- Even though the CRON job doesn't create these kind of situations, cases in which developers attend and win several hackathons and have different projects are taken into account.
- Teams are not taken into account per se, would probably register them using the columns I already used, though it would be attractive to look forward to implementing a Teams table (or evaluation the best implementation for the idea), so that developers can participate by themselves, or in a team with other people.

### General Notes
- For a more thorough follow up on the thought process, the planification and how the challenge was implemented step by step, I encourage you to visit the PR section, as each commit would normally show pretty well what issue was I tackling and in what order.
- From here onwards, I'll list instructions, or explain myself on why I did certain things. I wouldn't normally do such a thorough explanation, but I do know that being able to peek on the decision-making is a key part of the process of the review, and so I'm making the effort to describe as much as possible. I am grateful in advance for the time invested in reading, if you wish to do so.

### Frontend Development
- run `npm start` while on /frontend directory to start the development server in `localhost:3000`

#### Frontend Notes
- Honestly, it was the first time I set up axios and Redux from scratch, so this all was a great learning experience. Of course, once I was reminded that originally, redux doesn't persist, I wasn't as pleasantly surprised, but thankfully, I did manage to overcome the obstacles regarding implementing Redux and Axios.
- I do recognize that maybe implementing Redux was a bit overkill... maybe it wasn't, but I did wanted to specifically use it as I feel skills using Redux are much needed.
- I do think that the way I made use of the general layout components, like `<SideBar />` and how it is implemented in `App.js`, together with `<Outlet />` are a bit funky in regards to how I implemented. Yet, I decided to not dwell further on this in sake of time, but I think refactoring is much needed here. Specially since much of the visual proportions are hardcoded with things like '80vh', which isn't the best way to take care of this in terms of visuals.
- I admit that the application is lacking in terms of colours and visuals, and it is lacking of a theme. Yet, I decided to make a much stronger emphasis on the logic behind it than on how it looked like.
- I recognize I could have done a bit better with configuring es-lint to automatically lint the code and commiting that so the codebase is cohesive, though I did my best to manually keep a clean and cohesive code.
- There were times when I didn't manage to achieve something I wanted to do the most orthodox way, and because things like these could take me more time than expected, I decided to write a comment about what would be the best way to handle the situation, and moved on. Example: For some reason I wasn't managing to override MUI's ListButton's selected styles, so after quite a bit of fighting with it, I decided to write about what was my intention and move on.
- You will notice I left some comments that say 'Future Versions:'. These would lead to things that I'd like to change, but as I saw as mostly a bonus, or something that wasn't that relevant to what I thought was useful to evaluate. Thus, I made note of them and moved on. I worked in this manner because I wanted to prioritize time, it being that the handing in of the project was already somewhat delayed, I didn't want to keep delaying further and hand in ASAP.
- About the 'Dashboard in development', I thought it was more sound that after a login you go into a dashboard, and not directly into a specific list, but instead, the general overview of the platform. It seemed also better to do so with the routing, and where '/' lead to.

### Backend Development

- run php artisan serve to start a Laravel development server in http://127.0.0.1:8000

#### Backend Notes
- I decided to do the entire backend using Laravel Eloquent ORM to explore on its uses. Even though I hadn't used Eloquent in my previous experiences (I used directly PHP Entities and Laravel's querybuilder), I decided to give a shot to this, challenging myself to grow and learn further, at the same time I could evaluate further on why or why not to use it. I did some reading on it, and I don't think
- I am aware that the Controllers could be further modularized, but I will leave that for further versions. I know the functions in these, as is, break SOLID principles, which I learned through the project that I need to be more aware of, but in lieu of time, so that the review isn't delayed further, I chose not to implement certain ideas I came up in relation to SOLID, such as: abstracting validation logic to a service so each function in the controllers don't need to handle validation, as well as abstracting the retrieval of the entities to a Repository (i.e. `HackathonRepository`), and such.
- Regarding the hackathon list api, and what I considered previously to be a somewhat useless inclusion of its developers, I don' t think it is that necessary mostly because the hackathons retrieved are necessarily paginated. Even though it may be heavier to fetch 2000 records, which would mean 20.000 developers on a more normal usage of said pagination, I don't think its that relevant.
- During the planning stages, I admit I blocked myself a bit while thinking on how to calculate which were the top 10 developers amongst the entire group of hackathons, thinking about searching all of a developer's developments, adding points based of thier ranks, and then ordering that... Then, after thinking it was totally unreasonable and unscalable to do such a query, I sought for another method. Of course, the easiest way was to add a column of total points for each developer, that would be added to each time a developer participates in a hackathon. But of course, I didn't see such a simple solution at first...

### Small Demo
https://user-images.githubusercontent.com/60542511/199766288-ce1edccd-3747-4aeb-bd50-a35be073bea9.mp4

### Ending
Thank you for reading up to here! 
I am truly appreciative of the opportunity given me with this challenge. I feel I am much clearer on where should I improve in next because of this, and it was really useful to measure my own current capabilities. Once more, thank you!
Have a great day, whenever you are reading this
