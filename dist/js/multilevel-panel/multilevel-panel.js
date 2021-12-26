function MultilevelPanel(opts){
  var _self = this,
    multilevelMenuElem = document.querySelector('.multilevel-menu'),
    links = Array.prototype.slice.call(document.querySelectorAll('.multilevel-menu__parent > a, .multilevel-menu .with-submenu > a')),
    panel = document.querySelector('.multilevel-panel'),
    submenus = Array.prototype.slice.call(document.querySelectorAll('.multilevel-menu ul')),
    backButton = document.getElementById('menu-back'),
    back = document.querySelector('.multilevel-panel__back'),
    backTexts = [],
    options = {
      backAsCurrent: opts.backAsCurrent !== undefined ? opts.backAsCurrent : false,
      activeBreakpoint: opts.activeBreakpoint !== undefined ? opts.activeBreakpoint : null,
      setDynamicBreakpoint: opts.setDynamicBreakpoint !== undefined ? opts.setDynamicBreakpoint : null
    };
  
  this.init = function(){
    if(options.setDynamicBreakpoint){
      multilevelMenuElem.setAttribute('data-da', 'multilevel-panel,'+options.setDynamicBreakpoint+',2');
    }
    this.eventsBinding();
  }
  this.eventsBinding = function(){
    links.forEach(item => {
      item.addEventListener('click', this.linksClick);
    });
    backButton.addEventListener('click', this.backClick);
  },
  this.linksClick = function(e){
    console.log('linksClick!');
    if(options.activeBreakpoint !== null && screen.width > options.activeBreakpoint){
      return;
    }
    e.preventDefault();
    var currentSubmenu = e.target.nextElementSibling;
    currentSubmenu.classList.add('active');
    back.classList.add('active');

    if(options.backAsCurrent){
      backButton.textContent = e.target.textContent;
      backTexts.push(e.target.textContent);
    }

    panel.scrollTop = 0;
    panel.classList.add('freeze');
  },
  this.backClick = function(e){
    
    var activeMenus = Array.prototype.slice.call(document.querySelectorAll('.multilevel-menu ul.active'));

    if(activeMenus.length > 0){
      activeMenus[activeMenus.length - 1].classList.remove('active');

      if(options.backAsCurrent){
        e.target.textContent = backTexts[activeMenus.length - 2];
        backTexts.pop();
      }

      if(activeMenus.length === 1){
        _self.reset();
      }
    }
  },
  this.reset = function(){
    back.classList.remove('active');
    panel.classList.remove('freeze');
    backTexts = [];
    Array.prototype.slice.call(document.querySelectorAll('.multilevel-menu ul.active'))
      .forEach(function(menu){
        menu.classList.remove('active');
    });
  }
  
  this.init();
}
// Use
  // var multilevelMenu = new MultilevelPanel({ 
  //   backAsCurrent: true,
  //   activeBreakpoint: 1200,
  // setDynamicBreakpoint: 1200
  // })