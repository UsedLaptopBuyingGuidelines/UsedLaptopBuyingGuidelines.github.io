const STORAGE_KEY = 'laptop_inspection_state';

function loadState() {
    const defaultState = { theme: 'light', progress: {}, notes: {} };
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : defaultState;
}

function saveState(state) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

function updateTestStatus(testId, status) {
    const state = loadState();
    state.progress[testId] = status;
    saveState(state);
}

function updateTestNote(testId, note) {
    const state = loadState();
    state.notes[testId] = note;
    saveState(state);
}

function getTestStatus(testId) {
    const state = loadState();
    return state.progress[testId] || 'pending';
}

function getTestNote(testId) {
    const state = loadState();
    return state.notes[testId] || '';
}

function toggleThemeStorage() {
    const state = loadState();
    state.theme = state.theme === 'light' ? 'dark' : 'light';
    saveState(state);
    return state.theme;
}

function resetInspection() {
    const state = loadState();
    state.progress = {};
    state.notes = {};
    saveState(state);
}
