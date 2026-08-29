let antiCheatGuard = null;

document.addEventListener('DOMContentLoaded', function() {
    antiCheatGuard = new MutationObserver(() => {
        window.location.reload();
    });

    antiCheatGuard.observe(document.body, { 
        attributes: true, 
        childList: true, 
        subtree: true, 
        characterData: true 
    });
});
