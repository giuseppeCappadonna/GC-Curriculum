/*  -----------------------------------------------------------------------------------------------
VANILLA CAROUSEL SLIDER
--------------------------------------------------------------------------------------------------- */
let s_container = document.querySelector('.slider_container');
let s_inner = document.querySelector('.slider_inner');
let s_cards = document.querySelectorAll('.slider_card');

let pressed = false;
let startX;
let x;

//calc width of card
const set_width = () => {
  let w_cont = s_container.offsetWidth;

  let w_single_card = 250;
  if (w_cont < 475) {
    if (w_cont < 340) {
      w_single_card = w_cont - 25;
    } else {
      w_single_card = w_cont / 1.5;
    }
  } else {
    w_single_card = (w_cont - 15) / 2;
  }
  s_cards.forEach((card) => {
    card.style.width = `${w_single_card}px`;
  });
};

//SAME HEIGHT container
const set_height = () => {
  let h_container = s_inner.offsetHeight;
  s_container.style.height = `${h_container}px`;
};
//cal function
set_width();
set_height();
addEventListener('resize', (e) => {
  set_width();
  set_height();
});

//SLIDER CODE
if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
  // mobile optimization code
  s_container.addEventListener('touchstart', (e) => {
    pressed = true;
    startx = e.targetTouches[0].clientX - s_inner.offsetLeft;
  }, {
    passive: true
  });

  s_container.addEventListener('touchmove', (e) => {
    if (!pressed) return;
    x = e.targetTouches[0].clientX;
    s_inner.style.left = `${x - startx}px`;
    checkEnd();
    scrollProgressBar();
  }, {
    passive: true
  });
} else {
  //pc optimization code
  s_container.addEventListener("mousedown", (e) => {
    pressed = true;
    startX = e.offsetX - s_inner.offsetLeft;
    s_container.style.cursor = "grabbing";
  });

  s_container.addEventListener("mouseup", () => {
    s_container.style.cursor = "grab";
    pressed = false;
  });

  s_container.addEventListener("mousemove", (e) => {
    if (!pressed) return;
    e.preventDefault(); //to prevent default behaviors
    x = e.offsetX; //the x-coordinate of the mouse pointer relative to the container slider element
    s_inner.style.left = `${x - startX}px`; //subtracting current position from the offset to the parent div
    checkEnd(); //create limit to where the scroll can stop
    scrollProgressBar();
  });
}

const checkEnd = () => {
  let outer = s_container.getBoundingClientRect();
  let inner = s_inner.getBoundingClientRect();
  if (parseInt(s_inner.style.left) > 0) {
    s_inner.style.left = "0px";
  } else if (inner.right < outer.right) {
    s_inner.style.left = `-${inner.width - outer.width}px`;
  }
};

const scrollProgressBar = () => {
  let p_bar = document.querySelector('.progress-bar');

  let outer = s_container.getBoundingClientRect();
  let inner = s_inner.getBoundingClientRect();
  let max_pos = inner.width - outer.width;
  let slide_pos = parseFloat(s_inner.style.left) * -1;

  p_bar.style.left = `${(80*slide_pos)/max_pos}%`;
};

/*  -----------------------------------------------------------------------------------------------
  MENU
--------------------------------------------------------------------------------------------------- */
let drp_mnu_btns = document.querySelectorAll(".list .dropdown_menu_btn");
let drp_mnu_items = document.querySelectorAll(".dropdown_menu_item");
let drp_mnu = document.querySelector(".list");

drp_mnu_btns.forEach((drp_mnu_btn) => {
  drp_mnu_btn.addEventListener("click", function(e) {
    let target = e.currentTarget;
    let ele = target.nextElementSibling;
    drp_mnu_items.forEach((element) => {
      if (element !== ele) {
        element.previousElementSibling.classList.remove("active");
        element.classList.remove("open");
      }
    });
    target.classList.toggle("active");
    ele.classList.toggle("open");
  });

  document.addEventListener("click", (event) => {
    let isClickInside = drp_mnu.contains(event.target);
    if (!isClickInside) {
      //click outside
      drp_mnu_items.forEach((drp_mnu_items) => {
        drp_mnu_items.previousElementSibling.classList.remove("active");
        drp_mnu_items.classList.remove("open");
      });
    }
  });
});
/*  -----------------------------------------------------------------------------------------------
Request Phone
--------------------------------------------------------------------------------------------------- */
document.querySelector(".rqst").addEventListener("click", (e) => {
  document.getElementById('Contact').scrollIntoView({
    behavior: 'smooth'
  });
  document.getElementById('text_area').innerHTML = "Richiesta di contatto telefonico per la seguente motivazione: ";
});

/*  -----------------------------------------------------------------------------------------------
  ,'"`.
 /     \
:       :
:       :
 `.___,' 
--------------------------------------------------------------------------------------------------- */
let ee_btn = document.querySelector(".EE");
let magic_cont = document.querySelector(".magic-cont");
let i = 0;
let ee_first = true;

ee_btn.addEventListener("click", () => {
  if (ee_first) {
    i++;
    console.log("i=", i);
    if (i >= 3) {
      ee_btn.classList.toggle("bounce");
      setTimeout(function() {
        ee_btn.classList.remove("bounce");
      }, 200);
      if (i >= 13) {
        ee_event();
      }
    } else if (i > 0 && i < 10) {
      setTimeout(function() {
        i = 0;
      }, 15000);
    }
  }
});

const ee_event = () => {
  ee_first = false;
  magic_cont.classList.toggle("magic_active");
  setTimeout(function() {
    i = 0;
    magic_cont.classList.remove("magic_active");
    console.log("Sei un mago", i);
  }, 60000);

};
//on Picker change change root color
let pik = document.getElementById('colorpicker');
pik.addEventListener('input', function() {
  document.documentElement.style.setProperty('--color', pik.value);
});
