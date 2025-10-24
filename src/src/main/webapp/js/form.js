
class FormHandler {
    constructor(validator, graphRenderer) {
        this.validator = validator;
        this.graphRenderer = graphRenderer;
    }


    init() {
        this.initFormSubmit();
        this.initGraphClick();
        this.initRadiusChange();
    }


    initFormSubmit() {
        document.getElementById('check-form').addEventListener('submit', (event) => {
            if (!this.validator.validateForm()) {
                event.preventDefault();
                return;
            }

            if (typeof saveFormValues === 'function') {
                saveFormValues();
            }

            this.showLoadingIndicator();
        });
    }


    initGraphClick() {
        document.getElementById('svg-graph').addEventListener('click', (event) => {
            const r = this.graphRenderer.getCurrentR();
            
            if (!r) {
                this.validator.showError('Пожалуйста, выберите радиус R перед кликом по графику!');
                return;
            }

            const svg = event.currentTarget;
            const rect = svg.getBoundingClientRect();
            const svgX = event.clientX - rect.left;
            const svgY = event.clientY - rect.top;

            const scale = this.graphRenderer.getScale(r);
            const x = (svgX - this.graphRenderer.CENTER_X) / scale;
            const y = (this.graphRenderer.CENTER_Y - svgY) / scale;

            console.log('Клик по графику:', {
                svgX, svgY,
                centerX: this.graphRenderer.CENTER_X,
                centerY: this.graphRenderer.CENTER_Y,
                scale,
                x, y, r
            });

            this.graphRenderer.showTemporaryPoint(svg, svgX, svgY);

            if (!this.validator.validateCoordinates(x, y)) {
                return;
            }

            this.fillAndSubmitForm(x, y, r);
        });
    }


    initRadiusChange() {
        const rInput = document.getElementById('r-input');
        if (rInput) {
            rInput.addEventListener('input', () => {
                this.graphRenderer.redrawGraph(window.resultsData || []);
            });

            rInput.addEventListener('change', () => {
                this.graphRenderer.redrawGraph(window.resultsData || []);
            });
        }
    }


    fillAndSubmitForm(x, y, r) {
        console.log('Заполняем форму с координатами:', {x, y, r});
        const xValues = [-5, -4, -3, -2, -1, 0, 1, 2, 3];
        let closestX = xValues[0];
        let minDiff = Math.abs(x - closestX);

        for (let val of xValues) {
            const diff = Math.abs(x - val);
            if (diff < minDiff) {
                minDiff = diff;
                closestX = val;
            }
        }

        // Устанавливаем значение X и активируем кнопку
        const xInput = document.getElementById('x-value');
        if (xInput) {
            xInput.value = closestX.toString();

            // Активируем соответствующую кнопку
            document.querySelectorAll('.x-btn').forEach(btn => {
                btn.classList.remove('active');
                if (btn.getAttribute('data-value') === closestX.toString()) {
                    btn.classList.add('active');
                }
            });
        }

        const yInput = document.getElementById('y-input');
        if (yInput) {
            yInput.value = y.toFixed(3);
        }

        const rInput = document.getElementById('r-input');
        if (rInput) {
            rInput.value = r.toString();
        }

        console.log('Значения формы установлены:', {
            x: xInput.value,
            y: yInput.value,
            r: rInput.value
        });

        if (typeof saveFormValues === 'function') {
            saveFormValues();
        }

        this.showLoadingIndicator();

        console.log('Отправляем форму на check-area...');
        document.getElementById('check-form').submit();
    }

    showLoadingIndicator() {
        const loadingDiv = document.createElement('div');
        loadingDiv.id = 'loading-indicator';
        loadingDiv.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: rgba(0,0,0,0.8);
            color: white;
            padding: 20px;
            border-radius: 8px;
            z-index: 10000;
            font-size: 16px;
            font-weight: bold;
        `;
        loadingDiv.textContent = 'Обработка запроса...';
        document.body.appendChild(loadingDiv);
    }


    clearLoadingIndicator() {
        const loadingIndicator = document.getElementById('loading-indicator');
        if (loadingIndicator) {
            loadingIndicator.remove();
        }
    }
}
