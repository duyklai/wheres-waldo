document.addEventListener('DOMContentLoaded', function() {
  // Handler when the DOM is fully loaded

  // If document does not have the node of class "photos-show", do not execute the rest of script
  if (!document.querySelector('.photos-show')) return;

  // Global variables
  const photo_image = document.querySelector('.photo-image');
  let gameWon = false; // Boolean check for if waldo was found
  let score = 0; // Keeps track of score (timer)
  let globalTimer; // Takes the object returned by setInterval to be stopped later
  let mouseX;
  let mouseY;

  // target_outline will be the box outline of the user's click
  let target_outline = document.createElement('div');
  target_outline.className = 'target-outline';
  // These must match with scss width/height of target-box
  // Hardcoded due to querySelector nor just referencing target_outline.style.width/height does not return this information
  // Need look into it more
  let target_outline_width = 30;
  let target_outline_height = 45;

  // target_list will be box of all characters that user needs to find in photos
  // Filling in all possible characters from database with ul/li
  const target_list_div = document.createElement('div');
  target_list_div.className = 'target-list-container';
  const target_list = document.createElement('ul');
  target_list.className = 'target-list';
  let characterList = document.querySelectorAll('meta[id=character]');
  let list_item;
  characterList.forEach(character => {
    list_item = document.createElement('li');
    list_item.className = 'character_item';
    list_item.innerHTML = character.name;
    list_item.addEventListener('click', function(e) {
      checkGuess(e);
      checkWin();
    });
    target_list.appendChild(list_item);
  });
  target_list_div.appendChild(target_list);

  // Adding onclick event (if game still not won) to the whole image div to show the target outline on user's mouse position
  photo_image.addEventListener('click', function(e) {
    // Append the target-outline & target_list as element of page once user has clicked on image
    // Choosing not to append first to not mess with "styling" of page, can push things around even when "hidden"
    document.body.appendChild(target_outline);
    document.body.appendChild(target_list_div);

    if (!gameWon) {
      // Checking to see if user clicks away from current selection
      // If the current outline is still being displayed, remove outline, message, and list
      if (target_outline.style.visibility == 'visible') {
        hideOutline();
        hideMessage();
        hideList();
      } else {
        // Included twice to always remove message and ensure message changes
        hideMessage();
        mouseX = e.pageX;
        mouseY = e.pageY;
        console.log(mouseX, mouseY);
        target_outline.style.visibility = 'visible';
        target_list_div.style.visibility = 'visible';
        // Subtract 2 to "center" mouse around box
        target_outline.style.left = `${mouseX - target_outline_width / 2}px`;
        target_outline.style.top = `${mouseY - target_outline_height / 2}px`;

        target_list_div.style.left = `${mouseX +
          target_outline_width / 2 +
          7}px`;
        // If target_list will expand beyond the current screen size, push it upward to prevent page scrolling
        // Current iteration of this game will only go up to 4 characters; Problem of expanding page occurs when there are 4/3 characters in list
        // Potential solution: reduce photo size on screen (need higher quality photos for smaller sizes)
        if (mouseY - target_outline_height / 2 > 850.5) {
          // Hardcoded checking for length of 4/3 characters, and push "dropdown" upwards
          if (target_list.childNodes.length == 4) {
            target_list_div.style.top = `${mouseY -
              target_outline_height / 2 -
              34}px`;
          } else if (target_list.childNodes.length == 3) {
            target_list_div.style.top = `${mouseY -
              target_outline_height / 2 -
              15}px`;
          } else
            target_list_div.style.top = `${mouseY -
              target_outline_height / 2}px`;
        } else
          target_list_div.style.top = `${mouseY - target_outline_height / 2}px`;
      }
    }
  });

  // Adding listener (if game still not won) to check if user clicks on target outline box again; hide it if user did
  target_outline.addEventListener('click', function() {
    if (!gameWon) {
      hideOutline();
      hideMessage();
      hideList();
    }
  });

  // Input: the selection (event) that user clicked on in target list
  // Function will compare the character's position in database with position the user clicked on in image
  // If it matches (found), then remove character from target list, mark character with a marker, hide outline/list and change confirmation message
  const checkGuess = event => {
    // Get character's position according to meta data
    let [charaX, charaY] = getCharPos(event.target.innerHTML);
    // If user selects correct place and matches with correct character
    if (
      mouseX - target_outline_width / 2 <= charaX &&
      mouseX + target_outline_width / 2 >= charaX &&
      mouseY - target_outline_height / 2 <= charaY &&
      mouseY + target_outline_height / 2 >= charaY
    ) {
      // Remove the target's name from the list
      target_list.removeChild(event.target);
      // Mark character with circle as found
      markCharacter(charaX, charaY);

      // Hide all the information on screen
      checkMessage(true);
      hideOutline();
      hideList();

      // Allows user to see that their selection was correct/wrong before removing message
      setTimeout(function() {
        hideMessage();
      }, 3000);
    } else {
      // If the user selects wrong positions or wrong character to match
      checkMessage(false);
      hideOutline();
      hideList();

      setTimeout(function() {
        hideMessage();
      }, 3000);
    }
  };

  // Two Possible function outcome:
  // 1) When user first comes to page, and clicks on photo, will create and append the .found-check-message div and message
  // 2) If not user first time on page, then query the element created above and change the message
  // Visibility of said message/div will be changed in other places
  const checkMessage = guess => {
    let message = guess ? 'You found one!' : 'Wrong person!';
    let check_message_div = document.querySelector('.found-check-message-div');

    // If the message div already exists
    if (check_message_div) {
      let check_message = document.querySelector('.found-check-message');
      check_message.innerHTML = message;
      check_message_div.style.visibility = 'visible';
    } else {
      check_message_div = document.createElement('div');
      check_message_div.className = 'found-check-message-div';

      let check_message = document.createElement('h2');
      check_message.className = 'found-check-message';
      check_message.innerHTML = message;

      check_message_div.appendChild(check_message);
      document.body.appendChild(check_message_div);
    }
  };

  // Function to check if win conditions are met (all characters have been found)
  // Set gameWon to true, stops timer, and fetch the score form
  const checkWin = () => {
    if (target_list.childNodes.length < 1) {
      gameWon = true;
      clearInterval(globalTimer);
      submitScoreForm();
    }
  };

  // Function to mark (add a marker) around the character which have been found by user
  const markCharacter = (characterX, characterY) => {
    let marker = document.createElement('div');
    marker.className = 'marker-outline';

    marker.style.left = `${characterX - 20 / 2}px`;
    marker.style.top = `${characterY - 40 / 2}px`;
    document.body.appendChild(marker);
  };

  // If game is won, then ajax the score-form and append it to this page as documentElement
  // Will be overlayed ontop of image with 2 hidden field of score and photo_id
  const submitScoreForm = () => {
    if (gameWon) {
      // Parse the photo_id of current photo based on waldo's meta data (there's always going to be a waldo)
      let photoID = parseInt(
        document.querySelector('meta[name=Waldo]').attributes.photo_id.value,
        10
      );
      // Get input form from scores/new.html.erb form
      Rails.ajax({
        url: '/scores/new',
        type: 'GET',
        success: function(response) {
          document.body.append(response.documentElement);
          // Insert values into the fields
          let score_form = document.querySelector('.score-form');
          score_form.childNodes.forEach(input => {
            if (input.id == 'score_score') {
              input.value = score;
            } else if (input.id == 'score_photo_id') {
              input.value = photoID;
            }
          });
        },
        error: function() {
          alert('Error. Try again');
        }
      });
    }
  };

  // Update time (score) as well as Timer number in HTML
  const timer = () => {
    return setInterval(function() {
      score += 1;

      let time_container = document.querySelector('.timer');
      time_container.innerHTML = 'Timer: ' + score;
    }, 1000);
  };

  //#region Helper functions

  // Getting the passed character's positions
  const getCharPos = character_name => {
    let character = document.querySelector(`meta[name=${character_name}]`);
    let characterX = parseInt(character.attributes.pos_x.value, 10);
    let characterY = parseInt(character.attributes.pos_y.value, 10);

    return [characterX, characterY];
  };

  // Function to allow user to click away from "selection" and remove outline
  const hideOutline = () => {
    target_outline.style.visibility = 'hidden';
  };

  // Function to hide message of guess when user clicks away
  const hideMessage = () => {
    let check_message_div = document.querySelector('.found-check-message-div');
    // Check to make sure it already exists before changing to avoid error
    if (check_message_div) check_message_div.style.visibility = 'hidden';
  };

  const hideList = () => {
    target_list_div.style.visibility = 'hidden';
  };

  //#endregion

  globalTimer = timer();
});
