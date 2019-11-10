# Where's Waldo: Rails

## Goals

Building a "photo-tagging app" with JavaScript as front-end and Ruby on Rails as back-end database. This is my implementation of "Find Waldo" with images taken from online sources from the original _Find-Waldo_. Front-end side of things (JS) is responsible for UI of the pages. Things like DOM manipulation and UI elements (box outlines, target lists) are generated from JavaScript. The "fact-check" back-end deals with the position of the characters (Waldo, Wenda, Wizard, and Odlaw) in the photos, which are included via meta-data. These information/positions are compared everytime user clicks on the image. Rails also provides the different relationships (photos, characters, scores) and connections/links between the pages (score board, photo, home).

## How to play

User can select an image from the home page by clicking on the name of the photo. Once the page loads, the user can begin to find the characters in the image. The first two photo will only feature Waldo. While the last two photo will feature the full cast of characters (Waldo, Wenda, Wizard, and Odlaw). Once the user thinks they have found one of the character, they can click on the photo. A black outline box will appear around their mouse position with a list of possible character(s). The player must identify who they have found and click on the name. User can return to the homepage from here if they wish to start on another photo. Once the user found all the character(s) in the photo, the page will prompt the user to input a name to enter the highscore board. Once submitted, the page will automatically redirect the user to the scoreboard page. User can continue to play another photo or try again for faster time.

Current [Demo](https://tranquil-castle-83602.herokuapp.com/).

## How to build

This app was built with Ruby 2.6.5 and Rails 5.2.3. To build app locally:

Clone the repository:

`$ git clone https://github.com/duyklai/wheres-waldo.git`

Install the necessary gems:

`$ bundle install`

Migrate the database and setup (seeding first time):

`$ rails db:migrate`

`$ rails db:setup`

Then, you can start the server:

`$ rails server`

connect to localhost:3000 on your browser.
