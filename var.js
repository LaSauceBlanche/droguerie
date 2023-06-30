
// menu
class StickyNavigation {
    constructor() {
        this.currentId = null;
        this.currentTab = null;
        this.tabContainerHeight = 70;
        let self = this;
        $('.et-hero-tab').click(function (event) {
            self.onTabClick(event, $(this));
        });
        $(window).scroll(() => {
            this.onScroll();
        });
        $(window).resize(() => {
            this.onResize();
        });
    }

    onTabClick(event, element) {
        event.preventDefault();
        let scrollTop = $(element.attr('href')).offset().top - this.tabContainerHeight + 1;
        $('html, body').animate({ scrollTop: scrollTop }, 600);
    }

    onScroll() {
        this.checkTabContainerPosition();
        this.findCurrentTabSelector();
    }

    onResize() {
        if (this.currentId) {
            this.setSliderCss();
        }
    }

    checkTabContainerPosition() {
        let offset = $('.et-hero-tabs').offset().top + $('.et-hero-tabs').height() - this.tabContainerHeight;
        if ($(window).scrollTop() > offset) {
            $('.et-hero-tabs-container').addClass('et-hero-tabs-container--top');
        } else {
            $('.et-hero-tabs-container').removeClass('et-hero-tabs-container--top');
        }
    }

    findCurrentTabSelector() {
        let newCurrentId;
        let newCurrentTab;
        let self = this;
        $('.et-hero-tab').each(function () {
            let id = $(this).attr('href');
            let offsetTop = $(id).offset().top - self.tabContainerHeight;
            let offsetBottom = $(id).offset().top + $(id).height() - self.tabContainerHeight;
            if ($(window).scrollTop() > offsetTop && $(window).scrollTop() < offsetBottom) {
                newCurrentId = id;
                newCurrentTab = $(this);
            }
        });
        if (this.currentId !== newCurrentId || this.currentId === null) {
            this.currentId = newCurrentId;
            this.currentTab = newCurrentTab;
            this.setSliderCss();
        }
    }

    setSliderCss() {
        let width = 0;
        let left = 0;
        if (this.currentTab) {
            width = this.currentTab.css('width');
            left = this.currentTab.offset().left;
        }
        $('.et-hero-tab-slider').css('width', width);
        $('.et-hero-tab-slider').css('left', left);
    }
}

new StickyNavigation();



/* -- Had to add extra lines for touch events -- */

window.onmousedown = e => handleOnDown(e);

window.ontouchstart = e => handleOnDown(e.touches[0]);

window.onmouseup = e => handleOnUp(e);

window.ontouchend = e => handleOnUp(e.touches[0]);

window.onmousemove = e => handleOnMove(e);

window.ontouchmove = e => handleOnMove(e.touches[0]);




// slide sur le teco des texte

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        console.log(entry)
        if (entry.isIntersecting) {
            entry.target.classList.add('show');
        } else {
            entry.target.classList.remove('show');
        }
    });
});

const hiddenElements = document.querySelectorAll('.hidden');
hiddenElements.forEach((el) => observer.observe(el));





//  slider d'image 


// COPIE LE TEXT



var btncopy = document.querySelector('.js-copy');
if (btncopy) {
    btncopy.addEventListener('click', docopy);
}

function docopy() {

    // Cible de l'élément qui doit être copié
    var target = this.dataset.target;
    var fromElement = document.querySelector(target);
    if (!fromElement) return;

    // Sélection des caractères concernés
    var range = document.createRange();
    var selection = window.getSelection();
    range.selectNode(fromElement);
    selection.removeAllRanges();
    selection.addRange(range);

    try {
        // Exécution de la commande de copie
        var result = document.execCommand('copy');
        if (result) {
            // La copie a réussi
            alert('Copié !');
        }
    }
    catch (err) {
        // Une erreur est surevnue lors de la tentative de copie
        alert(err);
    }

    // Fin de l'opération
    selection = window.getSelection();
    if (typeof selection.removeRange === 'function') {
        selection.removeRange(range);
    } else if (typeof selection.removeAllRanges === 'function') {
        selection.removeAllRanges();
    }
}









const images = document.querySelectorAll('img')
const totalImages = images.length;

const prevBtn = document.querySelector('.prev-btn')
const nextBtn = document.querySelector('.next-btn')

const selectedImgBtns = document.querySelectorAll('.img-nav-item')

let currentImgId = 0;

const hideAllImages = () => {
    images.forEach(img => {
        // hide all images
        if (img.classList[0] === 'visible') {
            img.classList.remove('visible')
            img.classList.add('hidden2')
        }
    })
}

const traverseImages = (direction) => {
    hideAllImages()

    if (direction === 'prev') {
        currentImgId = currentImgId ? (currentImgId - 1) % totalImages : totalImages - 1
    } else {
        currentImgId = (currentImgId + 1) % totalImages
    }

    images[currentImgId].classList.remove('hidden2')
    images[currentImgId].classList.add('visible')

    selectedImgBtns.forEach(btn => btn.classList.remove('img-nav-item-selected'))
    selectedImgBtns[currentImgId].classList.add('img-nav-item-selected')
}

const handleBtnClick = (btn, i) => {
    // not sure about this fuckery, but it works
    if (btn.classList.forEach(btnClass => {
        if (btnClass === 'img-nav-item-selected') {
            return true
        }
    })) {
        return
    }

    selectedImgBtns.forEach(btn => btn.classList.remove('img-nav-item-selected'))
    btn.classList.add('img-nav-item-selected')
    hideAllImages()
    currentImgId = i
    images[currentImgId].classList.remove('hidden2')
    images[currentImgId].classList.add('visible')
}

prevBtn.addEventListener('click', () => traverseImages('prev'))
nextBtn.addEventListener('click', () => traverseImages('next'))

selectedImgBtns.forEach((btn, i) => {
    btn.addEventListener('click', () => handleBtnClick(btn, i))
})