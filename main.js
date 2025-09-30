document.addEventListener('DOMContentLoaded', () => {
    // 変更点: ミッションの総数を5に変更
    const totalMissions = 5;
    const progressBar = document.getElementById('progressBar');
    
    // 効果音を取得
    const sfxCorrect = document.getElementById('sfx-correct');
    const sfxIncorrect = document.getElementById('sfx-incorrect');
    const sfxNext = document.getElementById('sfx-next');
    const sfxLaunch = document.getElementById('sfx-launch');
    const allSfx = [sfxCorrect, sfxIncorrect, sfxNext, sfxLaunch];

    let isAudioUnlocked = false;

    const unlockAudio = () => {
        if (!isAudioUnlocked) {
            allSfx.forEach(sfx => {
                sfx.play().catch(() => {});
                sfx.pause();
                sfx.currentTime = 0;
            });
            isAudioUnlocked = true;
            document.body.removeEventListener('click', unlockAudio);
        }
    };
    document.body.addEventListener('click', unlockAudio);

    // クイズの選択肢ボタンの処理
    document.querySelectorAll('.quiz-option').forEach(button => {
        button.addEventListener('click', () => {
            const missionNumber = parseInt(button.dataset.mission);
            const quizContainer = document.getElementById(`quiz-${missionNumber}`);
            const feedbackEl = quizContainer.querySelector('.quiz-feedback');

            if (button.hasAttribute('data-correct')) {
                sfxCorrect.play();
                feedbackEl.textContent = '▶ 正解！ミッションクリア。';
                feedbackEl.className = 'quiz-feedback correct';
                
                quizContainer.querySelectorAll('.quiz-option').forEach(btn => btn.disabled = true);
                
                const missionCard = document.getElementById(`mission-${missionNumber}`);
                const resultDiv = missionCard.querySelector('.mission-result');
                resultDiv.style.display = 'block';

            } else {
                sfxIncorrect.play();
                feedbackEl.textContent = '▶ アクセスが拒否されました。再試行してください。';
                feedbackEl.className = 'quiz-feedback incorrect';
                setTimeout(() => { feedbackEl.textContent = ''; }, 1500);
            }
        });
    });

    // 「次のミッションへ」ボタンの処理
    document.querySelectorAll('.next-mission-button').forEach(button => {
        button.addEventListener('click', () => {
            sfxNext.play();
            const missionNumber = parseInt(button.dataset.mission);
            const currentMissionCard = document.getElementById(`mission-${missionNumber}`);

            currentMissionCard.classList.remove('active');
            currentMissionCard.classList.add('completed');
            
            const progress = (missionNumber / (totalMissions - 1)) * 100;
            progressBar.style.width = `${progress}%`;

            const nextMissionNumber = missionNumber + 1;
            const nextMissionCard = document.getElementById(`mission-${nextMissionNumber}`);
            if (nextMissionCard) {
                nextMissionCard.classList.add('active');
                
                const stickyHeader = document.querySelector('.sticky-header');
                const headerHeight = stickyHeader ? stickyHeader.offsetHeight : 0;
                
                const elementTopPosition = nextMissionCard.getBoundingClientRect().top + window.pageYOffset;
                const offsetPosition = elementTopPosition - headerHeight - 16;
    
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }

            if (missionNumber === totalMissions - 1) {
                document.getElementById('final-launch-button').disabled = false;
            }
        });
    });
    
    // 最終ミッションの発進ボタンの処理
    document.getElementById('final-launch-button').addEventListener('click', (e) => {
        sfxLaunch.play();
        const missionCard = document.getElementById(`mission-${totalMissions}`);
        
        e.target.disabled = true;
        e.target.textContent = `[ 発 射 完 了 ]`;
        const resultDiv = missionCard.querySelector('.mission-result');
        resultDiv.style.display = 'block';
    });
});
