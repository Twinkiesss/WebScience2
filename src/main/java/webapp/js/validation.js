class FormValidator {
    constructor() {
        this.errorMessages = {
            x: {
                required: 'Выберите значение X',
                range: 'X должно быть от -3 до 5'
            },
            y: {
                required: 'Введите значение Y',
                number: 'Y должно быть числом',
                range: 'Y должно быть в диапазоне (-3; 5)'
            },
            r: {
                required: 'Введите значение R',
                number: 'R должно быть числом',
                range: 'R должно быть в диапазоне (1, 4)'
            }
        };
    }

    showError(message) {
        let errorDiv = document.getElementById('error-message');
        if (!errorDiv) {
            errorDiv = document.createElement('div');
            errorDiv.id = 'error-message';
            errorDiv.style.cssText = 'position: fixed; top: 20px; right: 20px; background: #f8d7da; color: #721c24; padding: 15px; border-radius: 5px; border: 1px solid #f5c6cb; z-index: 1000; max-width: 300px;';
            document.body.appendChild(errorDiv);
        }
        errorDiv.textContent = message;
        errorDiv.style.display = 'block';

        setTimeout(() => {
            errorDiv.style.display = 'none';
        }, 5000);
    }


    resetErrors() {
        document.querySelectorAll('.error-message').forEach(el => el.classList.remove('show'));
    }




    showFieldError(fieldId, message) {
        const errorElement = document.getElementById(fieldId + '-error');
        if (errorElement) {
            errorElement.textContent = message;
            errorElement.classList.add('show');
        }
    }

    validateX() {
        const xInput = document.getElementById('x-value');
        if (!xInput || !xInput.value) {
            this.showFieldError('x', this.errorMessages.x.required);
            return false;
        }
        const xValue = parseFloat(xInput.value);
        if (xValue < -3 || xValue > 5) {
            this.showFieldError('x', this.errorMessages.x.range);
            return false;
        }
        return true;
    }



    validateY() {
        const yInput = document.getElementById('y-input');
        const yValue = yInput.value.trim().replace(',', '.');

        if (!yValue) {
            this.showFieldError('y', this.errorMessages.y.required);
            return false;
        } else if (isNaN(yValue)) {
            this.showFieldError('y', this.errorMessages.y.number);
            return false;
        } else {
            const y = parseFloat(yValue);
            if (y < -3 || y > 5) {
                this.showFieldError('y', this.errorMessages.y.range);
                return false;
            } else {
                yInput.value = yValue;
            }
        }
        return true;
    }


    validateR() {
        const rInput = document.getElementById('r-input');
        const rValue = rInput.value.trim().replace(',', '.');

        if (!rValue) {
            this.showFieldError('r', this.errorMessages.r.required);
            return false;
        } else if (isNaN(rValue)) {
            this.showFieldError('r', this.errorMessages.r.number);
            return false;
        } else {
            const r = parseFloat(rValue);
            if (r < 1 || r > 4) {
                this.showFieldError('r', this.errorMessages.r.range);
                return false;
            } else {
                rInput.value = rValue;
            }
        }
        return true;
    }


    validateCoordinates(x, y) {
        if (x < -3 || x > 5) {
            this.showError('Координата X должна быть в диапазоне от -3 до 5');
            return false;
        }
        if (y <= -3 || y >= 5) {
            this.showError('Координата Y должна быть в диапазоне от -3 до 5');
            return false;
        }
        return true;
    }

    validateForm() {
        this.resetErrors();

        const isXValid = this.validateX();
        const isYValid = this.validateY();
        const isRValid = this.validateR();

        return isXValid && isYValid && isRValid;
    }
}
