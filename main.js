document.addEventListener('DOMContentLoaded', () => {
    const totalMissions = 6;
    const progressBar = document.getElementById('progressBar');
    
    // 効果音を取得
    const sfxCorrect = document.getElementById('sfx-correct');
    const sfxIncorrect = document.getElementById('sfx-incorrect');
    const sfxNext = document.getElementById('sfx-next');
    const sfxLaunch = document.getElementById('sfx-launch');

    // クイズの選択肢ボタンの処理
    document.querySelectorAll('.quiz-option').forEach(button => {
        button.addEventListener('click', () => {
            const missionNumber = parseInt(button.dataset.mission);
            const quizContainer = document.getElementById(`quiz-${missionNumber}`);
            const feedbackEl = quizContainer.querySelector('.quiz-feedback');

            if (button.hasAttribute('data-correct')) {
                sfxCorrect.play(); // 正解の効果音
                feedbackEl.textContent = '▶ 正解！ミッションクリア。';
                feedbackEl.className = 'quiz-feedback correct';
                
                quizContainer.querySelectorAll('.quiz-option').forEach(btn => btn.disabled = true);
                
                const missionCard = document.getElementById(`mission-${missionNumber}`);
                const resultDiv = missionCard.querySelector('.mission-result');
                resultDiv.style.display = 'block';

            } else {
                sfxIncorrect.play(); // 不正解の効果音
                feedbackEl.textContent = '▶ アクセスが拒否されました。再試行してください。';
                feedbackEl.className = 'quiz-feedback incorrect';
                setTimeout(() => { feedbackEl.textContent = ''; }, 1500);
            }
        });
    });

    // 「次のミッションへ」ボタンの処理
    document.querySelectorAll('.next-mission-button').forEach(button => {
        button.addEventListener('click', () => {
            sfxNext.play(); // 次へ進む効果音
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
                nextMissionCard.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }

            if (missionNumber === totalMissions - 1) {
                document.getElementById('final-launch-button').disabled = false;
            }
        });
    });
    
    // 最終ミッションの発進ボタンの処理
    document.getElementById('final-launch-button').addEventListener('click', (e) => {
        sfxLaunch.play(); // 発進の効果音
        const missionCard = document.getElementById('mission-6');
        
        // missionCard.classList.add('completed'); // この行を削除して、カードが暗くならないようにする
        e.target.disabled = true;
        e.target.textContent = `[ 発 射 完 了 ]`;
        const resultDiv = missionCard.querySelector('.mission-result');
        resultDiv.style.display = 'block';
    });
});
