document.addEventListener("DOMContentLoaded", function() {
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
});

/* Slide de texte */

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add('show');
        } else {
            entry.target.classList.remove('show');
        }
    });
});

const hiddenElements = document.querySelectorAll('.hidden');
hiddenElements.forEach((el) => observer.observe(el));

/* Copier dans le presse-papiers */

var btncopy = document.querySelector('.js-copy');
if (btncopy) {
    btncopy.addEventListener('click', docopy);
}

function docopy() {
    var target = this.dataset.target;
    var fromElement = document.querySelector(target);
    if (!fromElement) return;

    var range = document.createRange();
    var selection = window.getSelection();
    range.selectNode(fromElement);
    selection.removeAllRanges();
    selection.addRange(range);

    try {
        var result = document.execCommand('copy');
        if (result) {
            alert('Copié !');
        }
    } catch (err) {
        alert(err);
    }

    selection = window.getSelection();
    if (typeof selection.removeRange === 'function') {
        selection.removeRange(range);
    } else if (typeof selection.removeAllRanges === 'function') {
        selection.removeAllRanges();
    }
}

/* Galerie d'images */

const images = document.querySelectorAll('img');
const totalImages = images.length;

const prevBtn = document.querySelector('.prev-btn');
const nextBtn = document.querySelector('.next-btn');

const selectedImgBtns = document.querySelectorAll('.img-nav-item');

let currentImgId = 0;

const hideAllImages = () => {
    images.forEach((img) => {
        if (img.classList.contains('visible')) {
            img.classList.remove('visible');
            img.classList.add('hidden2');
        }
    });
};

const traverseImages = (direction) => {
    hideAllImages();

    if (direction === 'prev') {
        currentImgId = currentImgId ? (currentImgId - 1) % totalImages : totalImages - 1;
    } else {
        currentImgId = (currentImgId + 1) % totalImages;
    }

    images[currentImgId].classList.remove('hidden2');
    images[currentImgId].classList.add('visible');

    selectedImgBtns.forEach((btn) => btn.classList.remove('img-nav-item-selected'));
    selectedImgBtns[currentImgId].classList.add('img-nav-item-selected');
};

const handleBtnClick = (btn, i) => {
    if (btn.classList.contains('img-nav-item-selected')) {
        return;
    }

    selectedImgBtns.forEach((btn) => btn.classList.remove('img-nav-item-selected'));
    btn.classList.add('img-nav-item-selected');
    hideAllImages();
    currentImgId = i;
    images[currentImgId].classList.remove('hidden2');
    images[currentImgId].classList.add('visible');
};

prevBtn.addEventListener('click', () => traverseImages('prev'));
nextBtn.addEventListener('click', () => traverseImages('next'));

selectedImgBtns.forEach((btn, i) => {
    btn.addEventListener('click', () => handleBtnClick(btn, i));
});
