// Copy to clipboard with fallback
function copyToClipboard(text, buttonElement) {
    if (navigator.clipboard && window.isSecureContext) {
        navigator.clipboard.writeText(text).then(() => {
            showCopiedFeedback(buttonElement);
        }).catch(err => {
            fallbackCopy(text, buttonElement);
        });
    } else {
        fallbackCopy(text, buttonElement);
    }
}

function fallbackCopy(text, buttonElement) {
    const textArea = document.createElement("textarea");
    textArea.value = text;
    textArea.style.position = "fixed";
    textArea.style.left = "-999999px";
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    try {
        document.execCommand('copy');
        showCopiedFeedback(buttonElement);
    } catch (err) {
        console.error('Fallback copy failed', err);
    }
    document.body.removeChild(textArea);
}

function showCopiedFeedback(btn) {
    const originalText = btn.innerText;
    btn.innerText = "Copied ✓";
    btn.style.backgroundColor = "var(--black)";
    btn.style.color = "var(--cream)";
    setTimeout(() => {
        btn.innerText = originalText;
        btn.style.backgroundColor = "";
        btn.style.color = "";
    }, 2000);
}

function getGreeting() {
    const hour = new Date().getHours();
    if (hour >= 5 && hour < 12) return "শুভ সকাল!";
    if (hour >= 12 && hour < 17) return "শুভ দুপুর!";
    if (hour >= 17 && hour < 20) return "শুভ সন্ধ্যা!";
    return "শুভ রাত্রি!";
}
