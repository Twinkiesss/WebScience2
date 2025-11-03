document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('.x-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            document.querySelectorAll('.x-btn').forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            const xInput = document.getElementById('x-value');
            if (xInput) {
                xInput.value = this.getAttribute('data-value');
            }
        });
    });

    const validator = new FormValidator();
    const graphRenderer = new GraphRenderer();
    const formHandler = new FormHandler(validator, graphRenderer);

    formHandler.init();
    formHandler.clearLoadingIndicator();
    restoreFormValues();

    graphRenderer.redrawGraph(window.resultsData || []);
});

function restoreFormValues() {
    const savedX = sessionStorage.getItem('formX');
    if (savedX) {
        const xInput = document.getElementById('x-value');
        if (xInput) {
            xInput.value = savedX;
            document.querySelectorAll('.x-btn').forEach(btn => {
                btn.classList.remove('active');
                if (btn.getAttribute('data-value') === savedX) {
                    btn.classList.add('active');
                }
            });
        }
    }

    const savedY = sessionStorage.getItem('formY');
    if (savedY) {
        const yInput = document.getElementById('y-input');
        if (yInput) {
            yInput.value = savedY;
        }
    }

    const savedR = sessionStorage.getItem('formR');
    if (savedR) {
        const rInput = document.getElementById('r-input');
        if (rInput) {
            rInput.value = savedR;
        }
    }
}

function saveFormValues() {
    const xInput = document.getElementById('x-value');
    if (xInput && xInput.value) {
        sessionStorage.setItem('formX', xInput.value);
    }

    const yInput = document.getElementById('y-input');
    if (yInput && yInput.value) {
        sessionStorage.setItem('formY', yInput.value);
    }

    const rInput = document.getElementById('r-input');
    if (rInput && rInput.value) {
        sessionStorage.setItem('formR', rInput.value);
    }
}

window.addEventListener('pageshow', function() {
    const loadingIndicator = document.getElementById('loading-indicator');
    if (loadingIndicator) {
        loadingIndicator.remove();
    }
});