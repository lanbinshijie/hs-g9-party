var pageStatus = 0;
$(document).ready(function() {
    var scores = {
        score1: 0,
        score2: 0,
        score3: 0,
        score4: 0,
        score5: 0
    };

    function updateScore(classId, score) {
        var scoreElement = $('#' + classId);
        scoreElement.fadeOut(100);
        setTimeout(function() {
            scoreElement.text(score);
            scoreElement.fadeIn(100);
        }, 100);
    }

    var defaultsStars = {
        spread: 360,
        ticks: 100,
        gravity: 0,
        decay: 0.94,
        startVelocity: 30,
        shapes: ['star'],
        colors: ['FFE400', 'FFBD00', 'E89400', 'FFCA6C', 'FDFFB8']
      };
      
    function shootStars() {
        confetti({
            ...defaultsStars,
            particleCount: 100,
            scalar: 1.5,
            shapes: ['star']
        });
        
        confetti({
            ...defaultsStars,
            particleCount: 10,
            scalar: 0.75,
            shapes: ['circle']
        });
    }
      
    // setTimeout(shootStars, 0);

    updateScore();


    function shootConfetti(classId) {
        setTimeout(shootConfettiTies(classId), 10);
    }

    function shootConfettiTies(classId) {
        var canvas = document.querySelector('.' + classId + 'x');
        canvas.confetti = canvas.confetti || confetti.create(canvas, { resize: true });

        canvas.confetti({
            particleCount: 300,
            spread: 70,
            origin: { y: 1 }
        });
    }

    $('body').on('keydown', function (event) {
        if (event.key === 'q') {
            scores.score1++;
            shootConfetti('class-1');
            updateScore('score1', scores.score1);
        } else if (event.key === 'w') {
            scores.score2++;
            shootConfetti('class-2');
            updateScore('score2', scores.score2);
        } else if (event.key === 'e') {
            scores.score3++;
            shootConfetti('class-3');
            updateScore('score3', scores.score3);
        } else if (event.key === 'r') {
            scores.score4++;
            shootConfetti('class-4');
            updateScore('score4', scores.score4);
        } else if (event.key === 't') {
            scores.score5++;
            shootConfetti('class-5');
            updateScore('score5', scores.score5);
        } else if (event.key === 'a') {
            scores.score1--;
            updateScore('score1', scores.score1);
        } else if (event.key === 's') {
            scores.score2--;
            updateScore('score2', scores.score2);
        } else if (event.key === 'd') {
            scores.score3--;
            updateScore('score3', scores.score3);
        } else if (event.key === 'f') {
            scores.score4--;
            updateScore('score4', scores.score4);
        } else if (event.key === 'g') {
            scores.score5--;
            updateScore('score5', scores.score5);
        } else if (event.key === 'k') {
            // 结算按钮的逻辑
            // 在这里编写结算分数的代码
            console.log('点击了结算按钮');
        }
    });
});