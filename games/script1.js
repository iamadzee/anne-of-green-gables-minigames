let antiCheatGuard = null;

const answers = {
    1: 'Shuhrah',
    2: 'Shuhrah',
    3: 'adzee',
};

function check(num = 1) {
    let currentAnswer = answers[num];
    
    document.querySelectorAll(`.option${num}`).forEach((i) => {
        i.addEventListener('click', () => {
            if (i.textContent == currentAnswer) {
                if (antiCheatGuard) antiCheatGuard.disconnect();

                document.getElementById(`correctness${num}`).textContent = 'Correct!';
                document.getElementById(`correctness${num}`).style.color = '#98fb98';
                i.style.backgroundColor = 'green';
                i.disabled = true;
                
                document.querySelectorAll(`.option${num}`).forEach((j) => {
                    if (j !== i) {
                        j.disabled = true;
                    }
                });

                let nextNum = num + 1;
                let nextDiv = document.getElementById(`quiz${nextNum}`);
                
                if (nextDiv) {
                    nextDiv.style.display = 'block';
                    check(nextNum); 
                }

                if (antiCheatGuard) antiCheatGuard.observe(document.body, { attributes: true, childList: true, subtree: true, characterData: true });
            } else {
                if (antiCheatGuard) antiCheatGuard.disconnect();

                document.getElementById(`correctness${num}`).textContent = 'Incorrect!';
                document.getElementById(`correctness${num}`).style.color = 'red';
                i.style.backgroundColor = 'red';
                i.disabled = true;

                if (antiCheatGuard) antiCheatGuard.observe(document.body, { attributes: true, childList: true, subtree: true, characterData: true });
            }
        });
    });
}

document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('start').addEventListener('click', () => {
        if (antiCheatGuard) antiCheatGuard.disconnect();
        
        document.getElementById('start').style.display = 'none';
        document.getElementById('quiz1').style.display = 'block';
        check(); 
        
        if (antiCheatGuard) antiCheatGuard.observe(document.body, { attributes: true, childList: true, subtree: true, characterData: true });
    });

    antiCheatGuard = new MutationObserver(() => {
        window.location.reload();
    });

    antiCheatGuard.observe(document.body, { attributes: true, childList: true, subtree: true, characterData: true });
});
