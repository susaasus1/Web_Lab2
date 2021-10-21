$(function() {
    const X_VALUES = [-2.0, -1.5, -1.0, -0.5, 0.0, 0.5, 1.0, 1.5, 2.0];
    const Y_MIN = -3;
    const Y_MAX = 3;

    let rval;
    let canvas = $('.graph-canvas');

    function isNumeric(n) {
        return !isNaN(parseFloat(n)) && isFinite(n);
    }

    function validateY() {

        let numY = $('.input-form__text_y').val().replace(',', '.');

        if (isNumeric(numY) && numY >= Y_MIN && numY <= Y_MAX)
        {
            $('.input-form__info').text('Введите координаты точки')
            return true;
        } else {
            $('.input-form__info').text('Введите значение Y от -3 до 3!')
            return false;
        }
    }

    function validateR() {
        if (rval !== undefined) {
            $('.input-form__info').text('Введите координаты точки')
            return true;
        } else {
            $('.input-form__info').text('Выберите значение R!')
            return false;
        }
    }

    function validateForm() {
        return validateY() && validateR();
    }

    function drawPoint(x, y) {
        clearCanvas();
        if (x > canvas.width() || x < -canvas.width() || y > canvas.height() || y < -canvas.height()) return;

        let ctxAxes = canvas[0].getContext('2d');
        ctxAxes.setLineDash([2, 2]);
        ctxAxes.beginPath();
        ctxAxes.moveTo(x, 110);
        ctxAxes.lineTo(x, y);
        ctxAxes.moveTo(110, y);
        ctxAxes.lineTo(x, y);
        ctxAxes.stroke();
        ctxAxes.fillStyle = 'red';
        ctxAxes.arc(x, y, 2, 0, 2 * Math.PI);
        ctxAxes.fill();
    }

    function clearCanvas() {
        canvas[0].getContext('2d').clearRect(0, 0, canvas.width(), canvas.height());
    }

    function redrawFromInput() {
        if (validateForm()) {
            drawPoint($('.input-form__select_x option:selected').val() * 68 / rval + 110,
                -($('.input-form__text_y').val() / rval *  68 - 110));
        } else {
            clearCanvas();
        }
    }

    canvas.on('click', function (event) {
        if (!validateR()) return;

        let xFromCanvas = (event.offsetX - 110) / 68 * rval;
        let minDifference = Infinity;
        let nearestXValue;
        for (let i = 0; i < X_VALUES.length; i++) {
            if (Math.abs(xFromCanvas - X_VALUES[i]) < minDifference) {
                minDifference = Math.abs(xFromCanvas - X_VALUES[i]);
                nearestXValue = X_VALUES[i];
            }
        }

        let yValue = (-event.offsetY + 110) / 68 * rval;
        if (yValue < Y_MIN) yValue = Y_MIN;
        else if (yValue > Y_MAX) yValue = Y_MAX;

        drawPoint(nearestXValue * 68 / rval + 110, -(yValue / rval *  68 - 110));

        let xSelect = $('.input-form__select_x option[value="' + nearestXValue + '"]');
        xSelect.prop('selected', true);

        $('.input-form__select_x option').not(xSelect).prop('selected', false);
        $('.input-form__text_y').val(yValue.toString().substring(0, 10));
        $.ajax({
            url: 'controllerServlet',
            type: 'POST',
            dataType: "json",
            data: {
                'xval': nearestXValue.toString(),
                'yval': yValue.toString().substring(0, 10),
                'rval': rval.toString(),
                'timezone': new Date().getTimezoneOffset()
            }
        })
        setTimeout(() => { location.reload(); }, 100);

    });

    $('.input-form__control-buttons__button_submit').on('click', function(event) {
        if (!validateForm()) {
            event.preventDefault();
        } else {
            $('.input-form__hidden_r').val(rval);
            $('.input-form__hidden_timezone').val(new Date().getTimezoneOffset());
        }
    });

    $('.input-form__control-buttons__button_reset').on('click', function (event) {
        $('.input-form__hidden_clear').val('true');
    })

    $('.input-form__button_r').on('click', function(event) {
        rval = $(this).val();
        $(this).addClass('input-form__button_r_clicked');
        $('.input-form__button_r').not(this).removeClass('input-form__button_r_clicked');

        let svgGraph = document.querySelector(".result-graph").getSVGDocument();
        svgGraph.querySelector('.coordinate-text_minus-Rx').textContent = (-rval).toString();
        svgGraph.querySelector('.coordinate-text_minus-Ry').textContent = (-rval).toString();
        svgGraph.querySelector('.coordinate-text_minus-half-Rx').textContent = (-rval/2).toString();
        svgGraph.querySelector('.coordinate-text_minus-half-Ry').textContent = (-rval/2).toString();
        svgGraph.querySelector('.coordinate-text_plus-Rx').textContent = (rval).toString();
        svgGraph.querySelector('.coordinate-text_plus-Ry').textContent = (rval).toString();
        svgGraph.querySelector('.coordinate-text_plus-half-Rx').textContent = (rval/2).toString();
        svgGraph.querySelector('.coordinate-text_plus-half-Ry').textContent = (rval/2).toString();

        redrawFromInput();
    });

    $('.input-form__text_y').on('input', event => redrawFromInput());
    $('.input-form__select_x').on('change', event => redrawFromInput());
});
