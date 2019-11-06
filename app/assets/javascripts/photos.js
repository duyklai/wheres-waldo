document.addEventListener('DOMContentLoaded', function() {
  // Handler when the DOM is fully loaded
  let waldo_image = document.querySelector('.photo-image');
  // target-outline was a created div in show.html.erb
  let target_outline = document.querySelector('.target-outline');

  // Function to allow user to click away from "selection" and remove outline
  const hideOutline = () => {
    // let target_outline = document.querySelector('.target-outline');
    target_outline.style.visibility = 'hidden';
  };

  // Adding onclick event to the whole image div to show the target outline on user's mouse position
  waldo_image.addEventListener('click', function(e) {
    if (target_outline.style.visibility == 'visible') {
      hideOutline();
    } else {
      mouseX = e.pageX;
      mouseY = e.pageY;
      // These must match with scss width/height of target-box
      var target_outline_width = 30;
      var target_outline_height = 50;
      target_outline.style.visibility = 'visible';
      target_outline.style.top = `${mouseY - target_outline_height / 2}px`;
      target_outline.style.left = `${mouseX - target_outline_width / 2}px`;
    }
  });

  // Adding listener to check if user clicks on target outline box again; hide it if so
  target_outline.addEventListener('click', function() {
    hideOutline();
  });
});
