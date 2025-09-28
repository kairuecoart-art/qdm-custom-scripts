// 注意：QDM 已內建 jQuery，所以我們使用標準的 document ready 語法
// (function($){...})(jQuery); 是一種常見的寫法，確保 $ 符號為 jQuery
(function($) {
    $(document).ready(function() {
        // 取得所有具有 'fade-target' 類別的圖片元素
        const fadeTargets = document.querySelectorAll('.fade-target');

        // 如果瀏覽器支援 Intersection Observer
        if ('IntersectionObserver' in window) {
            const observerOptions = {
                root: null, 
                rootMargin: '0px 0px -50px 0px', // 提前 50px 觸發
                threshold: 0.1 
            };

            const observer = new IntersectionObserver((entries, observer) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        // 進入視野，加入 'is-visible' 類別，啟動 CSS 動畫
                        entry.target.classList.add('is-visible');
                        
                        // 停止觀察，避免重複觸發
                        observer.unobserve(entry.target);
                    }
                });
            }, observerOptions);

            // 開始觀察所有目標元素
            fadeTargets.forEach(target => {
                observer.observe(target);
            });
        } else {
            // 如果不支援 Intersection Observer (舊版瀏覽器)，則直接顯示圖片
            // 避免圖片永遠隱藏
            fadeTargets.forEach(target => {
                target.classList.add('is-visible');
            });
        }
    });
})(jQuery); 