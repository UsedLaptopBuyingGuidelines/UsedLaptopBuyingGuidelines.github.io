document.addEventListener('DOMContentLoaded', () => {
    initUI();

    // Event Listeners
    document.getElementById('themeToggle').addEventListener('click', () => {
        const newTheme = toggleThemeStorage();
        document.documentElement.setAttribute('data-theme', newTheme);
    });

    document.getElementById('resetBtn').addEventListener('click', () => {
        if(confirm("সব inspection status এবং notes মুছে ফেলতে চান? এটি আর ফেরত পাওয়া যাবে না।")) {
            resetInspection();
            location.reload();
        }
    });

    document.getElementById('printBtn').addEventListener('click', () => {
        window.print();
    });

    document.getElementById('startTestBtn').addEventListener('click', () => {
        loadTestView(1);
    });
    
    document.getElementById('quickModeBtn').addEventListener('click', () => {
        setMeemoState('talking', 'Quick Mode: আমরা শুধু সবচেয়ে জরুরি ৫-১০টি বিষয় চেক করব। (Category navigation ব্যবহার করুন)');
        loadTestView(1);
    });

    document.getElementById('summaryBtn').addEventListener('click', () => {
        showSummary();
    });
    
    document.getElementById('backToTestsBtn').addEventListener('click', () => {
        if(currentTestId) loadTestView(currentTestId);
        else loadTestView(1);
    });

    // Filters & Search
    document.getElementById('searchInput').addEventListener('input', (e) => {
        renderCategories(e.target.value, document.getElementById('statusFilter').value);
    });

    document.getElementById('statusFilter').addEventListener('change', (e) => {
        renderCategories(document.getElementById('searchInput').value, e.target.value);
    });
});
