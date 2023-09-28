var pageStatus = 0;
function getHighestScore(scores) {
    let maxScore = 0;
    let highestClass = '';

    // 遍历 scores 对象的属性
    for (let score in scores) {
        if (scores[score] > maxScore) {
            maxScore = scores[score];
            highestClass = score.replace('score', 'G9-');
        }
    }
    if (maxScore == 0) {
        return "小彩蛋！"
    }

    return highestClass;
}
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
        } else if (event.key === 'c') {
            var time = 0;
            while(time < 5*100*1000) {
                if (event.key === 'c') time++;
                else return;
                // console.log("haha", time)
            }
            scores = {
                score1: 0,
                score2: 0,
                score3: 0,
                score4: 0,
                score5: 0
            };
            updateScore('score1', scores.score1);
            updateScore('score2', scores.score2);
            updateScore('score3', scores.score3);
            updateScore('score4', scores.score4);
            updateScore('score5', scores.score5);
        } else if (event.key === 'k') {
            var delayTime = 400;
            if (!pageStatus){
                
                $("#winner").text(getHighestScore(scores))
                pageStatus = 1;
                $(".board1").fadeOut(delayTime);
                // 然后显示result
                setTimeout(function() {
                    $(".result").fadeIn(delayTime);
                }, delayTime + 10);
                delayTime = delayTime + 100
                setTimeout(() => {
                    shootStars();
                }, delayTime + 100);
                setTimeout(() => {
                    shootStars();
                }, delayTime + 200);
                setTimeout(() => {
                    shootStars();
                }, delayTime + 400);

                var end = Date.now() + (15 * 1000);
                // go Buckeyes!
                var colors = ['#bb0000', '#ffffff'];

                (function frame() {
                confetti({
                    particleCount: 2,
                    angle: 60,
                    spread: 55,
                    origin: { x: 0 },
                    colors: colors
                });
                confetti({
                    particleCount: 2,
                    angle: 120,
                    spread: 55,
                    origin: { x: 1 },
                    colors: colors
                });

                if (Date.now() < end) {
                    requestAnimationFrame(frame);
                }
                }());
                var duration = 120 * 1000;
                var animationEnd = Date.now() + duration;
                var skew = 1;

                function randomInRange(min, max) {
                return Math.random() * (max - min) + min;
                }

                (function frame() {
                var timeLeft = animationEnd - Date.now();
                var ticks = Math.max(200, 500 * (timeLeft / duration));
                skew = Math.max(0.8, skew - 0.001);

                confetti({
                    particleCount: 1,
                    startVelocity: 0,
                    ticks: ticks,
                    origin: {
                    x: Math.random(),
                    // since particles fall down, skew start toward the top
                    y: (Math.random() * skew) - 0.2
                    },
                    colors: ['#ffffff', '#bb0000', '#bbbb00'],
                    shapes: ['circle'],
                    gravity: randomInRange(0.4, 0.6),
                    scalar: randomInRange(0.4, 1),
                    drift: randomInRange(-0.4, 0.4)
                });

                if (timeLeft > 0) {
                    requestAnimationFrame(frame);
                }
                }());
            } else {
                pageStatus = 0;
                $(".result").fadeOut(delayTime);
                // 然后显示result
                setTimeout(function() {
                    $(".board1").fadeIn(delayTime);
                }, delayTime + 10);
            }
        }
    });
});