document.addEventListener('DOMContentLoaded', () => {
    const totalMissions = 6;
    const progressBar = document.getElementById('progressBar');
    
    // クイズの選択肢ボタンの処理
    document.querySelectorAll('.quiz-option').forEach(button => {
        button.addEventListener('click', () => {
            const missionNumber = parseInt(button.dataset.mission);
            const quizContainer = document.getElementById(`quiz-${missionNumber}`);
            const feedbackEl = quizContainer.querySelector('.quiz-feedback');

            if (button.hasAttribute('data-correct')) {
                feedbackEl.textContent = '▶ 正解！ミッションクリア。';
                feedbackEl.className = 'quiz-feedback correct';
                
                // 同じクイズのボタンを全て無効化
                quizContainer.querySelectorAll('.quiz-option').forEach(btn => btn.disabled = true);
                
                // 結果表示エリアを表示
                const missionCard = document.getElementById(`mission-${missionNumber}`);
                const resultDiv = missionCard.querySelector('.mission-result');
                resultDiv.style.display = 'block';

            } else {
                feedbackEl.textContent = '▶ アクセスが拒否されました。再試行してください。';
                feedbackEl.className = 'quiz-feedback incorrect';
                setTimeout(() => { feedbackEl.textContent = ''; }, 1500);
            }
        });
    });

    // 「次のミッションへ」ボタンの処理
    document.querySelectorAll('.next-mission-button').forEach(button => {
        button.addEventListener('click', () => {
            const missionNumber = parseInt(button.dataset.mission);
            const currentMissionCard = document.getElementById(`mission-${missionNumber}`);

            // 現在のミッションを完了状態にして暗くする
            currentMissionCard.classList.remove('active');
            currentMissionCard.classList.add('completed');
            
            // プログレスバーを更新
            const progress = (missionNumber / (totalMissions - 1)) * 100;
            progressBar.style.width = `${progress}%`;

            // 次のミッションをアンロックして明るくする
            const nextMissionNumber = missionNumber + 1;
            const nextMissionCard = document.getElementById(`mission-${nextMissionNumber}`);
            if (nextMissionCard) {
                nextMissionCard.classList.add('active');
                // 次のミッションへスクロール
                nextMissionCard.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }

            // 最後のミッションなら発進ボタンを有効化
            if (missionNumber === totalMissions - 1) {
                document.getElementById('final-launch-button').disabled = false;
            }
        });
    });
    
    // 最終ミッションの発進ボタンの処理
    document.getElementById('final-launch-button').addEventListener('click', (e) => {
        const missionCard = document.getElementById('mission-6');
        missionCard.classList.add('completed');
        e.target.disabled = true;
        e.target.textContent = `[ 発 射 完 了 ]`;
        const resultDiv = missionCard.querySelector('.mission-result');
        resultDiv.style.display = 'block';
    });
});
