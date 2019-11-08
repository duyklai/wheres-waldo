document.addEventListener('DOMContentLoaded', function() {
  // Handler when the DOM is fully loaded
  const waldo_image = document.querySelector('.photo-image');
  const photo_container = document.querySelector('.photo-container');
  // target-outline will be the box outline of the user's click
  let target_outline = document.createElement('div');
  target_outline.className = 'target-outline';
  // Boolean check for if waldo was found
  let gameWon = false;
  // Keeps track of score (timer)
  let score = 0;
  // Takes the object returned by setInterval to be stopped later
  let globalTimer;

  // Function to allow user to click away from "selection" and remove outline
  const hideOutline = () => {
    target_outline.style.visibility = 'hidden';
  };

  const hideMessage = () => {
    let check_message_div = document.querySelector('.found-check-message-div');
    check_message_div.style.visibility = 'hidden';
  };

  // Adding onclick event to the whole image div to show the target outline on user's mouse position
  waldo_image.addEventListener('click', function(e) {
    photo_container.appendChild(target_outline);
    if (!gameWon) {
      if (target_outline.style.visibility == 'visible') {
        hideOutline();
        hideMessage();
      } else {
        mouseX = e.pageX;
        // calculating offset
        mouseY = e.pageY - 55;
        // These must match with scss width/height of target-box
        let target_outline_width = 30;
        let target_outline_height = 50;
        target_outline.style.visibility = 'visible';
        target_outline.style.top = `${mouseY - target_outline_height / 2}px`;
        target_outline.style.left = `${mouseX - target_outline_width / 2}px`;

        checkGuess(mouseX, mouseY, target_outline_width, target_outline_height);
      }
    }
  });

  // Adding listener to check if user clicks on target outline box again; hide it if so
  target_outline.addEventListener('click', function() {
    if (!gameWon) {
      hideOutline();
      hideMessage();
    }
  });

  // Getting character(waldo) positions
  const getWaldo = () => {
    let waldo = document.querySelector('meta[name=Waldo]');
    let waldoX = parseInt(waldo.attributes.pos_x.value, 10);
    let waldoY = parseInt(waldo.attributes.pos_y.value, 10);

    return [waldoX, waldoY];
  };

  const checkGuess = (mouseX, mouseY, outline_width, outline_height) => {
    [charaX, charaY] = getWaldo();
    if (
      mouseX - outline_width / 2 <= charaX &&
      mouseX + outline_width / 2 >= charaX &&
      mouseY - outline_height / 2 <= charaY &&
      mouseY + outline_height / 2 >= charaY
    ) {
      checkMessage(true);
      gameWon = true;
      clearInterval(globalTimer);
      checkWin();
    } else checkMessage(false);
  };

  const checkMessage = guess => {
    let message = guess ? 'You found him!' : 'Not this one!';
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

  const checkWin = () => {
    if (gameWon) {
      let waldo = document.querySelector('meta[name=Waldo]');
      let photoID = parseInt(waldo.attributes.photo_id.value, 10);
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

  globalTimer = timer();
});
