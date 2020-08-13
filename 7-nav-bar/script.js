const menuBars = document.getElementById('menu-bars');
const overlay = document.getElementById('overlay');

const navItems = Array.from(document.querySelectorAll('li'));

function animateItems(elementArray, direction1, direction2) {
  elementArray.map((element, index) => {
    element.classList.replace(
      `slide-${direction1}-${index + 1}`,
      `slide-${direction2}-${index + 1}`
    );
  });
}

function toggleNav() {
  menuBars.classList.toggle('change');

  overlay.classList.toggle('overlay-active');
  if (overlay.classList.contains('overlay-active')) {
    overlay.classList.replace('overlay-slide-left', 'overlay-slide-right');
    animateItems(navItems, 'out', 'in');
  } else {
    overlay.classList.replace('overlay-slide-right', 'overlay-slide-left');
    animateItems(navItems, 'in', 'out');
  }
}

// Event Listeners
menuBars.addEventListener('click', toggleNav);
navItems.map((navItem) => {
  navItem.addEventListener('click', toggleNav);
});
