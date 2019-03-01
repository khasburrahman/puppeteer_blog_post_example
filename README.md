# The environment
Create `.env` file and fill it with this example
Your environment file shouldn't be pushed, 
for demo purpose I put the environment in this readme 
```
APP_URL="https://khasburrahman.github.io/puppeteer_blog_post_example/"

# headless configuration
PUPPETEER_HEADLESS=false

# a slowdown in miliseconds, for observation purpose
PUPPETEER_SLOWMO=5

# browser window width and height 
PUPPETEER_WIDTH=1280
PUPPETEER_HEIGHT=720
```

# How to
- first, make sure to install the dependencies `npm install`
- if you want to test locally, start the app first `npm start`, don't forget to change the APP_URL config to `http://localhost:3000`
- to test the app `npm test` 
