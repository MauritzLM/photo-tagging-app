
## Photo tagging game for the [Odin project](https://www.theodinproject.com/)

- The game works like where's wally
- There are three images with 3 characters each to find
- Once players have found all three they have an option to add their name to the leaderboard
- Each image has its own leaderboard that can be viewed

## tech used

- nextjs
- tailwindcss
- postgres
- node
- express

## hosting

- front end on [vercel](https://vercel.com)
- backend on [railway](https://railway.app/)

## notes

It was my first time using nexjs, tailwindcss and an sql database. The documentation for nexjs and tailwind are really well written and that made it easy to understand.
I had to learn about postgres and how it works. Luckily I found a great [tutorial website](https://www.postgresqltutorial.com/) which made it easier to understand tables and queries. Figuring out the game logic, how to get the coordinates for each character and how to structure the game was a really fun and engaging experience.

I first wanted to host the backend on AWS, because they offer 1 year free for some of their services, but it was a real struggle to connect to the express app from my frontend. By default on AWS using their domain name the http protocol is used and connecting from secure https to http causes a CORS error. So one can get a custom domain 
with an SSL certificate so that the app uses https. On stackoverflow people also mentioned using load balancers, it did seem that an SSL certificate and therefore a custom domain would still be required. I decided to try out railway and it was just much easier to set up. In the future I do want learn more about using AWS.