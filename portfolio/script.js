// ===================================
// Lucide Icons 初始化
// ===================================
document.addEventListener("DOMContentLoaded", function() {
    lucide.createIcons();
});

// ===================================
// 滾動顯示動畫 (Scroll Reveal Animation)
// ===================================
function reveal() {
    const reveals = document.querySelectorAll(".reveal");

    reveals.forEach(el => {
        const windowHeight = window.innerHeight;
        const elementTop = el.getBoundingClientRect().top;
        const elementVisible = 100;

        if (elementTop < windowHeight - elementVisible) {
            el.classList.add("active");
        }
    });
}

// 監聽滾動事件
window.addEventListener("scroll", reveal);

// 頁面載入時執行一次（初始化可見元素）
reveal();

// ===================================
// 輪播顯示動卡片
// ===================================
// document.addEventListener('DOMContentLoaded', function () {
//     // 1. 找出所有的輪播圖
//     const allSwipers = document.querySelectorAll('.visual-swiper');

//     // 2. 一個一個單獨設定
//     allSwipers.forEach(function(swiperElement) {
        
//         const parentContainer = swiperElement.closest('.col-lg-6');
//         const paginationElement = parentContainer.querySelector('.visual-swiper-pagination');

//         const swiper = new Swiper(swiperElement, {
//             loop: true, // 循環播放
            
//             autoplay: {
//                 delay: 5000,
//                 disableOnInteraction: false,
//             },

//             mousewheel: {
//                 invert: false, // 預設 false (滾輪往下 = 向右滑，滾輪往上 = 向左滑)
//                 // forceToAxis: true, // (選用) 如果設為 true，只有在「水平」滾動滑鼠/觸控板時才會切換，避免使用者想往下滑網頁時卡住
//             },

//             pagination: {
//                 el: paginationElement,
//                 clickable: true,
//             },

//             on: {
//                 init: function () {
//                     controlVideos(this);
//                 },
//                 slideChangeTransitionEnd: function () {
//                     controlVideos(this);
//                 }
//             }
//         });
//     });
// });

// function controlVideos(swiperInstance) {

//     // 先停止全部影片
//     swiperInstance.slides.forEach(slide => {
//         const video = slide.querySelector("video");
//         if (video) {
//             video.pause();
//             video.currentTime = 0;
//         }
//     });

//     // 播放目前 active slide 裡的影片
//     const activeSlide = swiperInstance.slides[swiperInstance.activeIndex];
//     const activeVideo = activeSlide.querySelector("video");

//     if (activeVideo) {
//         activeVideo.play();
//     }
// }

document.addEventListener('DOMContentLoaded', function () {
    const allSwipers = document.querySelectorAll('.visual-swiper');

    // --- 功能 1: 全域暫停 (Nuclear Option) ---
    // 用途：當有新影片要播時，把「頁面上所有」其他影片都關掉
    function pauseAllVideos(exceptVideo = null) {
        document.querySelectorAll('video').forEach(video => {
            if (video !== exceptVideo) {
                video.pause();
            }
        });
    }

    // --- 功能 2: 局部暫停 (Polite Option) ---
    // 用途：當切換到圖片時，只關掉「這個輪播圖自己內部」的影片，不要吵到別的輪播
    function pauseVideosInSwiper(swiperInstance) {
        // 只找這個 Swiper 容器裡面的 video
        const videos = swiperInstance.el.querySelectorAll('video');
        videos.forEach(video => {
            video.pause();
        });
    }

    // --- 功能 3: 智慧播放控制器 (Core Logic) ---
    function handleSlideChange(swiperInstance) {
        // 1. 找到現在正在顯示的那個 Slide
        const activeSlide = swiperInstance.slides[swiperInstance.activeIndex];
        if (!activeSlide) return;

        // 2. 檢查這個 Slide 裡面有沒有影片
        const newVideo = activeSlide.querySelector('video');

        if (newVideo) {
            // ★ 情境 A：切換到了「影片」
            // 動作：霸道模式！把全頁面其他影片都殺掉，只播我自己
            pauseAllVideos(newVideo);
            
            const playPromise = newVideo.play();
            if (playPromise !== undefined) {
                playPromise.catch(error => console.log("播放被阻擋:", error));
            }
        } else {
            // ★ 情境 B：切換到了「圖片」
            // 動作：禮貌模式！只暫停我自己這個輪播裡的影片
            // 讓隔壁正在播影片的輪播圖繼續播，不要打斷它
            pauseVideosInSwiper(swiperInstance);
        }
    }

    // --- 功能 4: 視窗可視監聽 (Observer) ---
    const observerOptions = {
        root: null,
        threshold: 0.5 
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            const swiperElement = entry.target;
            const swiperInstance = swiperElement.swiper;

            if (entry.isIntersecting) {
                // 進入畫面：嘗試播放 (如果當前是影片的話)
                if (swiperInstance) handleSlideChange(swiperInstance);
            } else {
                // 離開畫面：一定要暫停這個輪播，節省效能
                if (swiperInstance) pauseVideosInSwiper(swiperInstance);
            }
        });
    }, observerOptions);


    // --- 初始化 ---
    allSwipers.forEach(function (swiperElement) {
        const parentContainer = swiperElement.closest('.col-lg-6') || swiperElement.closest('.visual-swiper-wrapper');
        const paginationElement = parentContainer?.querySelector('.visual-swiper-pagination');

        new Swiper(swiperElement, {
            loop: true,
            
            // 建議：如果是影片輪播，autoplay 容易造成干擾，建議關閉或設長一點
            autoplay: { delay: 5000, disableOnInteraction: false },

            mousewheel: { invert: false },
            pagination: {
                el: paginationElement,
                clickable: true,
            },
            
            on: {
                init: function () {
                   // 交給 Observer 處理
                },
                
                // ★★★ 關鍵：只在切換結束時判斷 ★★★
                slideChangeTransitionEnd: function () {
                    handleSlideChange(this);
                }
            }
        });

        observer.observe(swiperElement);
    });
});

// ===================================
// 平滑滾動導航 (Smooth Scroll Navigation)
// ===================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);

        if (targetElement) {
            targetElement.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ===================================
// 導覽列背景變化 (可選功能)
// ===================================
// 當滾動超過 50px 時增加導覽列陰影
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar-glass');

    if (window.scrollY > 50) {
        navbar.classList.add('shadow-sm');
    } else {
        navbar.classList.remove('shadow-sm');
    }
});