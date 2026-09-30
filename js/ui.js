let currentTestId = null;

function initUI() {
    renderMeemo();
    document.getElementById('greetingMsg').innerText = getGreeting();
    
    const state = loadState();
    document.documentElement.setAttribute('data-theme', state.theme);
    
    renderCategories();
    updateProgressUI();
}

function renderCategories(filterText = '', statusFilter = 'all') {
    const nav = document.getElementById('categoryNav');
    nav.innerHTML = '';
    
    inspectionData.forEach(cat => {
        const filteredTests = cat.tests.filter(test => {
            const matchesText = test.title.toLowerCase().includes(filterText.toLowerCase());
            const status = getTestStatus(test.id);
            const matchesStatus = statusFilter === 'all' || 
                                  (statusFilter === 'pending' && status === 'pending') ||
                                  (statusFilter === 'checked' && status === 'checked') ||
                                  (statusFilter === 'warning' && (status === 'warning' || status === 'problem'));
            return matchesText && matchesStatus;
        });

        if (filteredTests.length > 0) {
            const catDiv = document.createElement('div');
            const catBtn = document.createElement('button');
            catBtn.className = 'category-btn';
            catBtn.innerText = cat.category;
            catBtn.onclick = () => { ul.classList.toggle('hidden'); };
            
            const ul = document.createElement('ul');
            // ul.classList.add('hidden'); // uncomment to collapse by default

            filteredTests.forEach(test => {
                const li = document.createElement('li');
                const a = document.createElement('a');
                a.className = `test-item ${currentTestId === test.id ? 'active' : ''}`;
                
                const status = getTestStatus(test.id);
                let statusIcon = '⏳';
                if (status === 'checked') statusIcon = '✓';
                if (status === 'warning' || status === 'problem') statusIcon = '⚠';
                if (status === 'skipped') statusIcon = '—';

                a.innerText = `${statusIcon} ${test.id}. ${test.title}`;
                a.onclick = (e) => {
                    e.preventDefault();
                    loadTestView(test.id);
                };
                li.appendChild(a);
                ul.appendChild(li);
            });
            
            catDiv.appendChild(catBtn);
            catDiv.appendChild(ul);
            nav.appendChild(catDiv);
        }
    });
}

function loadTestView(id) {
    currentTestId = id;
    const test = allTests.find(t => t.id === id);
    const cat = inspectionData.find(c => c.tests.some(t => t.id === id));

    document.getElementById('landingSection').classList.add('hidden');
    document.getElementById('summarySection').classList.add('hidden');
    document.getElementById('testViewSection').classList.remove('hidden');

    document.getElementById('breadcrumb').innerHTML = `${cat.category} &rarr; <strong>Test ${test.id}</strong>`;
    document.getElementById('testTitle').innerText = `${test.id}. ${test.title}`;
    document.getElementById('testPurpose').innerText = test.purpose;
    document.getElementById('testGui').innerText = test.gui;
    
    const cmdCode = document.getElementById('testCommand');
    const cmdBtn = document.getElementById('copyCmdBtn');
    if (test.command && test.command !== "N/A") {
        cmdCode.innerText = test.command;
        cmdBtn.style.display = 'inline-block';
        cmdBtn.onclick = () => copyToClipboard(test.command, cmdBtn);
    } else {
        cmdCode.innerText = "No command needed for this test.";
        cmdBtn.style.display = 'none';
    }

    document.getElementById('testInstruction').innerText = test.instruction;
    document.getElementById('testExpected').innerText = test.expected;
    document.getElementById('testWarning').innerText = test.warning;
    document.getElementById('testNext').innerText = test.next;

    const notesArea = document.getElementById('testNotes');
    notesArea.value = getTestNote(test.id);
    notesArea.oninput = (e) => updateTestNote(test.id, e.target.value);

    // Reset status buttons
    const statusBtns = document.querySelectorAll('.status-btn');
    statusBtns.forEach(btn => {
        btn.classList.remove('active');
        if (btn.dataset.status === getTestStatus(test.id)) {
            btn.classList.add('active');
        }
        btn.onclick = () => {
            updateTestStatus(test.id, btn.dataset.status);
            loadTestView(test.id); // re-render to update classes
            updateProgressUI();
            renderCategories(document.getElementById('searchInput').value, document.getElementById('statusFilter').value);
        };
    });

    // Navigation buttons
    document.getElementById('prevTestBtn').onclick = () => {
        if (test.id > 1) loadTestView(test.id - 1);
    };
    
    const nextBtn = document.getElementById('nextTestBtn');
    nextBtn.onclick = () => {
        if (getTestStatus(test.id) === 'pending') {
            updateTestStatus(test.id, 'checked');
            updateProgressUI();
        }
        if (test.id < allTests.length) {
            loadTestView(test.id + 1);
        } else {
            showSummary();
        }
    };

    // Update Meemo
    let meemoMood = 'talking';
    const currentStatus = getTestStatus(test.id);
    if(currentStatus === 'warning' || currentStatus === 'problem') meemoMood = 'warning';
    if(currentStatus === 'checked') meemoMood = 'happy';
    setMeemoState(meemoMood, test.meemo);
    
    // Highlight sidebar
    renderCategories(document.getElementById('searchInput').value, document.getElementById('statusFilter').value);
}

function updateProgressUI() {
    let completed = 0;
    let warnings = 0;
    allTests.forEach(t => {
        const status = getTestStatus(t.id);
        if (status !== 'pending') completed++;
        if (status === 'warning' || status === 'problem') warnings++;
    });
    
    const total = allTests.length;
    const percent = Math.round((completed / total) * 100);
    
    document.getElementById('progressFill').style.width = `${percent}%`;
    document.getElementById('progressText').innerText = `${completed} / ${total} Tests Completed (${percent}%) | ⚠ Warnings: ${warnings}`;
}

function showSummary() {
    document.getElementById('landingSection').classList.add('hidden');
    document.getElementById('testViewSection').classList.add('hidden');
    document.getElementById('summarySection').classList.remove('hidden');
    setMeemoState('idle', 'এই হলো তোমার পুরো চেকিং এর সামারি! এবার ঠাণ্ডা মাথায় সিদ্ধান্ত নাও।');

    const summaryDiv = document.getElementById('summaryContent');
    summaryDiv.innerHTML = '';
    
    let warningHtml = '<h3>⚠ Warnings & Problems Found:</h3><ul>';
    let hasWarnings = false;

    allTests.forEach(test => {
        const status = getTestStatus(test.id);
        const note = getTestNote(test.id);
        if (status === 'warning' || status === 'problem') {
            hasWarnings = true;
            warningHtml += `<li><strong>Test ${test.id} (${test.title}):</strong> Status: ${status}. ${note ? 'Note: '+note : ''}</li>`;
        }
    });
    warningHtml += '</ul>';
    
    if (!hasWarnings) warningHtml = '<p>No major warnings recorded!</p>';
    
    summaryDiv.innerHTML = warningHtml;
}
