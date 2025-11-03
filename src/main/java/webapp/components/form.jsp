<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<div class="form-container">
    <h2>Параметры точки</h2>
    <form id="check-form" method="POST" action="controller">

        <div class="form-group">
            <label for="x-value">Координата X:</label>
            <div class="button-group" id="x-buttons">
                <button type="button" class="x-btn" data-value="-3">-3</button>
                <button type="button" class="x-btn" data-value="-2">-2</button>
                <button type="button" class="x-btn" data-value="-1">-1</button>
                <button type="button" class="x-btn active" data-value="0">0</button>
                <button type="button" class="x-btn" data-value="1">1</button>
                <button type="button" class="x-btn" data-value="2">2</button>
                <button type="button" class="x-btn" data-value="3">3</button>
                <button type="button" class="x-btn" data-value="4">4</button>
                <button type="button" class="x-btn" data-value="5">5</button>
            </div>
            <input type="hidden" id="x-value" name="x" value="0">
            <div class="error-message" id="x-error"></div>
        </div>


        <div class="form-group">
            <label for="y-input">Координата Y (от -3 до 5):</label>
            <input type="text" id="y-input" name="y" placeholder="Введите число от -3 до 5" required>
            <div class="error-message" id="y-error"></div>
        </div>

        <div class="form-group">
            <label for="r-input">Радиус R диапазон (1, 4):</label>
            <input type="text" id="r-input" name="r" value="1" placeholder="Введите число от 1 до 4" required>
            <div class="error-message" id="r-error"></div>
        </div>

        <button type="submit" class="submit-btn">Проверить</button>
    </form>
</div>
