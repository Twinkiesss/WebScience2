class GraphRenderer {
    constructor() {
        this.SVG_WIDTH = 600;
        this.SVG_HEIGHT = 600;
        this.CENTER_X = this.SVG_WIDTH / 2;
        this.CENTER_Y = this.SVG_HEIGHT / 2;
        this.BASE_SCALE = 50;
        this.currentR = null;
    }

    getCurrentR() {
        const rInput = document.getElementById('r-input');
        const rValue = rInput ? rInput.value.trim().replace(',', '.') : '';
        return rValue && !isNaN(rValue) ? parseFloat(rValue) : null;
    }

    getScale(r) {
        if (!r || r <= 0) return this.BASE_SCALE;
        const maxSize = 250;
        const scale = maxSize / r;
        return Math.max(scale, 20);
    }


    drawAxes(svg, scale = this.BASE_SCALE) {
        this.drawGrid(svg, scale);
        const axisX = document.createElementNS('http://www.w3.org/2000/svg', 'line');
        axisX.setAttribute('x1', '0');
        axisX.setAttribute('y1', this.CENTER_Y);
        axisX.setAttribute('x2', this.SVG_WIDTH);
        axisX.setAttribute('y2', this.CENTER_Y);
        axisX.setAttribute('stroke', '#2c3e50');
        axisX.setAttribute('stroke-width', '3');
        axisX.setAttribute('stroke-linecap', 'round');
        svg.appendChild(axisX);

        const arrowX = document.createElementNS('http://www.w3.org/2000/svg', 'polygon');
        arrowX.setAttribute('points', `${this.SVG_WIDTH-8},${this.CENTER_Y-6} ${this.SVG_WIDTH},${this.CENTER_Y} ${this.SVG_WIDTH-8},${this.CENTER_Y+6}`);
        arrowX.setAttribute('fill', '#2c3e50');
        arrowX.setAttribute('stroke', '#2c3e50');
        arrowX.setAttribute('stroke-width', '1');
        svg.appendChild(arrowX);

        const axisY = document.createElementNS('http://www.w3.org/2000/svg', 'line');
        axisY.setAttribute('x1', this.CENTER_X);
        axisY.setAttribute('y1', '0');
        axisY.setAttribute('x2', this.CENTER_X);
        axisY.setAttribute('y2', this.SVG_HEIGHT);
        axisY.setAttribute('stroke', '#2c3e50');
        axisY.setAttribute('stroke-width', '3');
        axisY.setAttribute('stroke-linecap', 'round');
        svg.appendChild(axisY);

        const arrowY = document.createElementNS('http://www.w3.org/2000/svg', 'polygon');
        arrowY.setAttribute('points', `${this.CENTER_X-6},8 ${this.CENTER_X},0 ${this.CENTER_X+6},8`);
        arrowY.setAttribute('fill', '#2c3e50');
        arrowY.setAttribute('stroke', '#2c3e50');
        arrowY.setAttribute('stroke-width', '1');
        svg.appendChild(arrowY);

        const labelX = document.createElementNS('http://www.w3.org/2000/svg', 'text');
        labelX.setAttribute('x', this.SVG_WIDTH - 20);
        labelX.setAttribute('y', this.CENTER_Y - 15);
        labelX.setAttribute('font-size', '18');
        labelX.setAttribute('font-weight', 'bold');
        labelX.setAttribute('fill', '#2c3e50');
        labelX.textContent = 'X';
        svg.appendChild(labelX);

        const labelY = document.createElementNS('http://www.w3.org/2000/svg', 'text');
        labelY.setAttribute('x', this.CENTER_X + 15);
        labelY.setAttribute('y', '20');
        labelY.setAttribute('font-size', '18');
        labelY.setAttribute('font-weight', 'bold');
        labelY.setAttribute('fill', '#2c3e50');
        labelY.textContent = 'Y';
        svg.appendChild(labelY);
    }


    drawGrid(svg, scale = this.BASE_SCALE) {
        const gridStep = scale / 2;

        for (let i = this.CENTER_X % gridStep; i < this.SVG_WIDTH; i += gridStep) {
            if (Math.abs(i - this.CENTER_X) > 5) {
                const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
                line.setAttribute('x1', i);
                line.setAttribute('y1', '0');
                line.setAttribute('x2', i);
                line.setAttribute('y2', this.SVG_HEIGHT);
                line.setAttribute('stroke', '#ecf0f1');
                line.setAttribute('stroke-width', '1');
                line.setAttribute('opacity', '0.7');
                svg.appendChild(line);
            }
        }


        for (let i = this.CENTER_Y % gridStep; i < this.SVG_HEIGHT; i += gridStep) {
            if (Math.abs(i - this.CENTER_Y) > 5) {
                const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
                line.setAttribute('x1', '0');
                line.setAttribute('y1', i);
                line.setAttribute('x2', this.SVG_WIDTH);
                line.setAttribute('y2', i);
                line.setAttribute('stroke', '#ecf0f1');
                line.setAttribute('stroke-width', '1');
                line.setAttribute('opacity', '0.7');
                svg.appendChild(line);
            }
        }
    }


    drawArea(svg, r) {
        if (!r || r <= 0) return;
        const scale = this.getScale(r);
        const rScaled = r * scale;
        const rHalfScaled = (r/2) * scale;

        const rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
        rect.setAttribute('x', this.CENTER_X - rScaled);
        rect.setAttribute('y', this.CENTER_Y);
        rect.setAttribute('width', rScaled);
        rect.setAttribute('height', rScaled);
        rect.setAttribute('fill', 'rgba(66, 135, 245, 0.5)');
        rect.setAttribute('stroke', '#4285f4');
        rect.setAttribute('stroke-width', '2');
        svg.appendChild(rect);

        const circle = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        const circlePath = `M ${this.CENTER_X},${this.CENTER_Y}
                           L ${this.CENTER_X - rHalfScaled},${this.CENTER_Y}
                           A ${rHalfScaled},${rHalfScaled} 0 0,1 ${this.CENTER_X},${this.CENTER_Y - rHalfScaled}
                           Z`;
        circle.setAttribute('d', circlePath);
        circle.setAttribute('fill', 'rgba(66, 135, 245, 0.5)');
        circle.setAttribute('stroke', '#4285f4');
        circle.setAttribute('stroke-width', '2');
        svg.appendChild(circle);

        const triangle = document.createElementNS('http://www.w3.org/2000/svg', 'polygon');
        const trianglePoints = `${this.CENTER_X},${this.CENTER_Y}
                               ${this.CENTER_X + rScaled},${this.CENTER_Y}
                               ${this.CENTER_X},${this.CENTER_Y - rScaled/2}`;
        triangle.setAttribute('points', trianglePoints);
        triangle.setAttribute('fill', 'rgba(66, 135, 245, 0.5)');
        triangle.setAttribute('stroke', '#4285f4');
        triangle.setAttribute('stroke-width', '2');
        svg.appendChild(triangle);

        this.drawAxisMarks(svg, r);
    }


    drawAxisMarks(svg, r) {
        const scale = this.getScale(r);
        const marks = [
            { val: r, label: 'R' },
            { val: r/2, label: 'R/2' },
            { val: -r, label: '-R' },
            { val: -r/2, label: '-R/2' }
        ];

        marks.forEach(mark => {
            const scaled = mark.val * scale;

            if (mark.val !== 0) {
                //положительные X
                if (mark.val > 0) {
                    const markXPos = document.createElementNS('http://www.w3.org/2000/svg', 'line');
                    markXPos.setAttribute('x1', this.CENTER_X + scaled);
                    markXPos.setAttribute('y1', this.CENTER_Y - 5);
                    markXPos.setAttribute('x2', this.CENTER_X + scaled);
                    markXPos.setAttribute('y2', this.CENTER_Y + 5);
                    markXPos.setAttribute('stroke', '#000');
                    markXPos.setAttribute('stroke-width', '2');
                    svg.appendChild(markXPos);

                    const labelXPos = document.createElementNS('http://www.w3.org/2000/svg', 'text');
                    labelXPos.setAttribute('x', this.CENTER_X + scaled);
                    labelXPos.setAttribute('y', this.CENTER_Y + 20);
                    labelXPos.setAttribute('text-anchor', 'middle');
                    labelXPos.setAttribute('font-size', '12');
                    labelXPos.textContent = mark.label;
                    svg.appendChild(labelXPos);
                }

                //отрицательные X
                if (mark.val < 0) {
                    const markXNeg = document.createElementNS('http://www.w3.org/2000/svg', 'line');
                    markXNeg.setAttribute('x1', this.CENTER_X + scaled);
                    markXNeg.setAttribute('y1', this.CENTER_Y - 5);
                    markXNeg.setAttribute('x2', this.CENTER_X + scaled);
                    markXNeg.setAttribute('y2', this.CENTER_Y + 5);
                    markXNeg.setAttribute('stroke', '#000');
                    markXNeg.setAttribute('stroke-width', '2');
                    svg.appendChild(markXNeg);

                    const labelXNeg = document.createElementNS('http://www.w3.org/2000/svg', 'text');
                    labelXNeg.setAttribute('x', this.CENTER_X + scaled);
                    labelXNeg.setAttribute('y', this.CENTER_Y + 20);
                    labelXNeg.setAttribute('text-anchor', 'middle');
                    labelXNeg.setAttribute('font-size', '12');
                    labelXNeg.textContent = mark.label;
                    svg.appendChild(labelXNeg);
                }
            }

            if (mark.val !== 0) {
                //положительные Y
                if (mark.val > 0) {
                    const markYPos = document.createElementNS('http://www.w3.org/2000/svg', 'line');
                    markYPos.setAttribute('x1', this.CENTER_X - 5);
                    markYPos.setAttribute('y1', this.CENTER_Y - scaled);
                    markYPos.setAttribute('x2', this.CENTER_X + 5);
                    markYPos.setAttribute('y2', this.CENTER_Y - scaled);
                    markYPos.setAttribute('stroke', '#000');
                    markYPos.setAttribute('stroke-width', '2');
                    svg.appendChild(markYPos);

                    const labelYPos = document.createElementNS('http://www.w3.org/2000/svg', 'text');
                    labelYPos.setAttribute('x', this.CENTER_X - 15);
                    labelYPos.setAttribute('y', this.CENTER_Y - scaled + 5);
                    labelYPos.setAttribute('text-anchor', 'end');
                    labelYPos.setAttribute('font-size', '12');
                    labelYPos.textContent = mark.label;
                    svg.appendChild(labelYPos);
                }

                //отрицательные Y
                if (mark.val < 0) {
                    const markYNeg = document.createElementNS('http://www.w3.org/2000/svg', 'line');
                    markYNeg.setAttribute('x1', this.CENTER_X - 5);
                    markYNeg.setAttribute('y1', this.CENTER_Y - scaled);
                    markYNeg.setAttribute('x2', this.CENTER_X + 5);
                    markYNeg.setAttribute('y2', this.CENTER_Y - scaled);
                    markYNeg.setAttribute('stroke', '#000');
                    markYNeg.setAttribute('stroke-width', '2');
                    svg.appendChild(markYNeg);

                    const labelYNeg = document.createElementNS('http://www.w3.org/2000/svg', 'text');
                    labelYNeg.setAttribute('x', this.CENTER_X - 15);
                    labelYNeg.setAttribute('y', this.CENTER_Y - scaled + 5);
                    labelYNeg.setAttribute('text-anchor', 'end');
                    labelYNeg.setAttribute('font-size', '12');
                    labelYNeg.textContent = mark.label;
                    svg.appendChild(labelYNeg);
                }
            }
        });
    }


    drawPoints(svg, r, resultsData) {
        if (!r || r <= 0) return;

        const scale = this.getScale(r);
        const rNum = parseFloat(r);
        const filteredResults = resultsData.filter(result => {
            const resultR = parseFloat(result.r);
            return Math.abs(resultR - rNum) < 0.000001;
        });

        filteredResults.forEach((result) => {
            const svgX = this.CENTER_X + result.x * scale;
            const svgY = this.CENTER_Y - result.y * scale;
            const point = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
            point.setAttribute('cx', svgX);
            point.setAttribute('cy', svgY);
            point.setAttribute('r', '6');
            point.setAttribute('fill', result.hit ? '#28a745' : '#dc3545');
            point.setAttribute('stroke', '#fff');
            point.setAttribute('stroke-width', '2');
            svg.appendChild(point);
        });
    }

    redrawGraph(resultsData) {
        const svg = document.getElementById('svg-graph');
        svg.innerHTML = '';

        const r = this.getCurrentR();
        this.currentR = r;

        const scale = this.getScale(r);
        this.drawAxes(svg, scale);

        if (r) {
            this.drawArea(svg, r);
            this.drawPoints(svg, r, resultsData);
        } else {
            this.showRadiusMessage(svg);
        }
    }


    showRadiusMessage(svg) {
        const message = document.createElementNS('http://www.w3.org/2000/svg', 'text');
        message.setAttribute('x', this.CENTER_X);
        message.setAttribute('y', this.CENTER_Y);
        message.setAttribute('text-anchor', 'middle');
        message.setAttribute('font-size', '18');
        message.setAttribute('fill', '#666');
        message.setAttribute('font-weight', 'bold');
        svg.appendChild(message);
    }


    showTemporaryPoint(svg, x, y) {
        const tempPoint = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        tempPoint.setAttribute('cx', x);
        tempPoint.setAttribute('cy', y);
        tempPoint.setAttribute('r', '5');
        tempPoint.setAttribute('fill', '#ffc107');
        tempPoint.setAttribute('stroke', '#ff8f00');
        tempPoint.setAttribute('stroke-width', '2');
        tempPoint.setAttribute('opacity', '0.8');

        svg.appendChild(tempPoint);


        setTimeout(() => {
            if (tempPoint.parentNode) {
                tempPoint.parentNode.removeChild(tempPoint);
            }
        }, 1000);
    }
}
