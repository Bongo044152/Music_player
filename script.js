document.addEventListener("DOMContentLoaded", () => {
        // await fetch("data.json")
        // .then(response => response.json())
        // .then(data => {
        //     const container = document.getElementById('player_container');
        //     container.innerHTML = ''; // 清空容器

        //     data.forEach(item => {
        //         // 創建新的 player_box 元素
        //         const playerBox = document.createElement('div');
        //         playerBox.id = 'player_box';

        //         // 填充內容
        //         playerBox.innerHTML = `
        //             <a href="${item.link}" target="_blank">
        //                 <img src="${item.img}" alt="${item.name}">
        //             </a>
        //             <audio controls>
        //                 <source src="${item.mp3}" type="audio/mpeg">
        //             </audio>
        //             <h3>${item.name}</h3>
        //         `;

        //         // 將 playerBox 添加到容器中
        //         container.appendChild(playerBox);
        //     });
        // });

        let $items = document.querySelectorAll("#player_box");
        let index = 0;
        $items.forEach((element) => {
            element.style.setProperty('--index', index);
            index += 1;
        });
        function Remove_x(display, items) {
            items.forEach((e, idx) => {
                // Set the previous value of --remove_x to --pre
                const currentRemoveX = window.getComputedStyle(e).getPropertyValue('--remove_x').trim();
                e.style.setProperty('--pre', currentRemoveX);

                // Set the new value for --remove_x
                if(idx == display){
                    e.style.setProperty('--remove_x', `${0}%`);
                }
                else if(idx < display){
                    e.style.setProperty('--remove_x', `${- (150 - (idx-display+1) * 16.18)}%`);
                }
                else{
                    e.style.setProperty('--remove_x', `${+ (150 + (idx-1) * 16.18)}%`);
                }
                
                // Trigger animation by forcing a reflow
                e.style.animation = 'none'; // Reset animation
                e.offsetHeight; // Trigger reflow
                e.style.animation = 'move 0.5s ease'; // Reapply animation
            });
        }
        function setZIndex(display, items) {
            let left = Array.from(items).slice(0, display);
            let right = Array.from(items).slice(display + 1);
            let maxZIndex = items.length;
            items[display].style.setProperty('--z_index', maxZIndex);

            let zIndex = maxZIndex - 1;
            // 设置左边元素的 z-index
            for (let i = left.length - 1; i >= 0; i--) {
                left[i].style.setProperty('--z_index', zIndex);
                zIndex--;
            }
            // 设置右边元素的 z-index
            zIndex = maxZIndex - 1;
            for (let i of right) {
                i.style.setProperty('--z_index', zIndex);
                zIndex--;
            }
        }
        function set_opticaly(display, items) {
            for (let i = 0; i < items.length; i++) {
                let audio = items[i].querySelector("audio");
                let play_btn = items[i].querySelector("#btn");
                
                if (i === display) {
                    items[i].style.opacity = "1";
                    items[i].style.filter = "none";
                    items[i].style.pointerEvents = "all";
                    if (audio && audio.paused) {
                        play_btn.click();
                    }
                } else {
                    items[i].style.opacity = "0.3";
                    items[i].style.filter = "brightness(0.5)";
                    items[i].style.pointerEvents = "none";
                    if (audio && !audio.paused) {
                        play_btn.click();
                    }
                    audio.currentTime = 0
                }
            }
        }
        
        

        // 音樂播放
        // https://www.youtube.com/watch?v=JtrFzoL1joI
        let audios = document.querySelectorAll("audio");
        let progress = document.querySelectorAll('#player_container input[type="range"]');
        let play_btn = document.querySelectorAll('#btn');

        for (let i = 0; i < audios.length; i++) {
            audios[i].onloadedmetadata = () => {
                progress[i].max = audios[i].duration;
                progress[i].value = audios[i].currentTime;

                play_btn[i].addEventListener("click", (event) => {
                    let icon = event.currentTarget;
                    let audio = audios[i];

                    if (audio.paused) {
                        audio.play()
                            .then(() => {
                                icon.setAttribute("name", "pause-circle-outline");
                            })
                            .catch(error => console.error('Play failed:', error));
                    } else {
                        audio.pause();
                        icon.setAttribute("name", "play-circle-outline");
                    }
                });

                // 更新进度条
                audios[i].ontimeupdate = () => {
                    progress[i].value = audios[i].currentTime;
                };

                // 进度条拖动事件
                progress[i].addEventListener("input", (event) => {
                    let newTime = parseFloat(event.currentTarget.value);
                    audios[i].currentTime = newTime;
                });

                // 左右按鍵更新時間 
                document.addEventListener("keydown", (event) => {
                    const audio = audios[display];

                    if (!audio) return; // 如果沒有音頻元素，則退出

                    switch (event.code) {
                        case 'ArrowLeft':
                            audio.currentTime = Math.max(0, audio.currentTime - 1); // 向後跳 5 秒，保證不小於 0
                            break;
                        case 'ArrowRight':
                            audio.currentTime = Math.min(audio.duration, audio.currentTime + 1); // 向前跳 5 秒，保證不超過音頻總時長
                            break;
                    }
                });
            }
        }

        // 初始化
        let display = 0;
        setZIndex(display, $items);
        Remove_x(display, $items);
        set_opticaly(display, $items)

        // 监听键盘事件
        document.addEventListener('keydown', (event) => {
            if (event.code === 'Space') {
                $items[display].querySelector('#btn').click();
            }
        });
        // 前後事件
        document.querySelectorAll("#player_box").forEach( e => {
            e.querySelector('ion-icon[name="play-back-circle-outline"]').addEventListener("click", () => {
                display -= 1;
                if(display < 0){
                    display = $items.length -1;
                }
                setZIndex(display, $items)
                Remove_x(display, $items)
                set_opticaly(display, $items)
            })
            e.querySelector('ion-icon[name="play-forward-circle-outline"]').addEventListener("click", () => {
                display = (display + 1) % $items.length;
                setZIndex(display, $items)
                Remove_x(display, $items)
                set_opticaly(display, $items)
            })
        })

        // 監聽圖片和 YouTube 圖標
        const imgs = document.querySelectorAll("img");
        const youtubeIcons = document.querySelectorAll("#player_box > a > ion-icon");

        function toggleActiveState(img, icon, isActive) {
            if (isActive) {
                img.classList.add("active");
                icon.classList.add("active");
            } else {
                img.classList.remove("active");
                icon.classList.remove("active");
            }
        }
        imgs.forEach((img, index) => {
            const icon = youtubeIcons[index];
            img.addEventListener('mouseenter', () => toggleActiveState(img, icon, true));
            icon.addEventListener('mouseenter', () => toggleActiveState(img, icon, true));
            img.addEventListener('mouseleave', () => toggleActiveState(img, icon, false));
            icon.addEventListener('mouseleave', () => toggleActiveState(img, icon, false));
        });
});