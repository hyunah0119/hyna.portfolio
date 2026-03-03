/* header scroll */
window.addEventListener('scroll', () => {
    const header = document.querySelector('.header');
    const floating = document.querySelector('.floating');
    const scrollY = window.scrollY;

    if(scrollY > 0) {
        header.classList.add('is-fixed');
        floating.classList.add('is-active');
    } else if(scrollY === 0) {
        header.classList.remove('is-fixed');
        floating.classList.remove('is-active');
    }
});

/* header nav btn (tablet/mobile) */
const navBtn = document.querySelector('.nav-btn');
const navList = document.querySelector('.mo-nav-list');
const navLinks = document.querySelectorAll('.mo-nav-list a');
const body = document.body;

navBtn.addEventListener('click', (e) => {
    e.stopPropagation();

    const isOpen = navBtn.classList.toggle('is-open');
    navList.classList.toggle('is-open');
    body.classList.toggle('no-scroll', isOpen);
});

navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navBtn.classList.remove('is-open');
        navList.classList.remove('is-open');
        body.classList.remove('no-scroll');
    });
});

document.addEventListener('click', (e) => {
    if (!navList.contains(e.target) && !navBtn.contains(e.target)) {
        navBtn.classList.remove('is-open');
        navList.classList.remove('is-open');

        // 모달이 열려 있지 않을 때만 스크롤 다시 활성화
        const anyActivePopup = popup && Array.from(popup).some((p) =>
            p.classList.contains('is-active')
        );

        if (!anyActivePopup) {
            body.classList.remove('no-scroll');
        }
    }
});

/* work modal */
const workBtn = document.querySelectorAll('.work-card');
const popup = document.querySelectorAll('.popup');

// 모달 열림 여부에 따라 body 스크롤 잠금 (한 곳에서만 제어)
function updateBodyScrollLock() {
    const anyActive = Array.from(popup).some((p) => p.classList.contains('is-active'));
    body.classList.toggle('no-scroll', anyActive);
}

workBtn.forEach((btn) => {
    btn.addEventListener('click', () => {
        const layer = btn.dataset.layer;

        popup.forEach((pop) => {
            const popupLayer = pop.dataset.layer;
            pop.classList.remove('is-active');
            if (layer === popupLayer) pop.classList.add('is-active');
        });

        updateBodyScrollLock();
    });
});

popup.forEach((pop) => {
    pop.addEventListener('click', (e) => {
        if (e.target === pop) {
            pop.classList.remove('is-active');
            updateBodyScrollLock();
        }
    });

    const closeBtn = pop.querySelector('.popup-close');
    if (closeBtn) {
        closeBtn.addEventListener('click', () => {
            pop.classList.remove('is-active');
            updateBodyScrollLock();
        });
    }
});

/* floating btn */
const btn = document.querySelector('.floating-btn');

btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

/* Swiper - work list (tablet/mobile only) */
let workSwiper = null;
const workSwiperQuery = window.matchMedia('(max-width: 1024px)');

function initWorkSwiper() {
    workSwiper = new Swiper('.workSwiper', {
        slidesPerView: 1,
        spaceBetween: 20,
        pagination: {
            el: '.workSwiper .swiper-pagination',
            dynamicBullets: true,
        },
        navigation: {
            nextEl: '.workSwiper .swiper-button-next',
            prevEl: '.workSwiper .swiper-button-prev',
        },
        breakpoints: {
            700: {
                slidesPerView: 2.2,
                spaceBetween: 20,
                navigation: {
                    enabled: false,
                },
            },
        },
    });
}

function toggleWorkSwiper(e) {
    if (e.matches) {
        if (!workSwiper) {
            initWorkSwiper();
        }
        return;
    }

    if (workSwiper) {
        workSwiper.destroy(true, true);
        workSwiper = null;
    }
}

toggleWorkSwiper(workSwiperQuery);
workSwiperQuery.addEventListener('change', toggleWorkSwiper);

/* Swiper - popup (이미지 스와이퍼, 불릿만) */
document.querySelectorAll('.popupSwiper').forEach((el) => {
    new Swiper(el, {
        slidesPerView: 1,
        spaceBetween: 0,
        pagination: {
            el: el.querySelector('.swiper-pagination'),
            clickable: true,
            dynamicBullets: true,
        },
        navigation: false,
    });
});