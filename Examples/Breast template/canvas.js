$(document).ready(function () {
    context = document.getElementById('breast-canvas').getContext("2d");
    var colorPurple = "#cb3594";
    var colorGreen = "#00CC00";
    var colorYellow = "#ffcf33";
    var colorRed = "#CC0000";
    var colorBlue = "#0000FF"
    var curColor = colorPurple;
    var mouseCoordinates = new Array();

    $("#color-buttons button").click(function () {
        console.log(this)
        if ($(this).attr("id") === "green") {
            curColor = colorGreen;
        } else if ($(this).attr("id") === "yellow") {
            curColor = colorYellow;
        } else if ($(this).attr("id") === "red") {
            curColor = colorRed;
        } else if ($(this).attr("id") === "blue") {
            curColor = colorBlue;
        } else {
            curColor = colorPurple;
        }

    })

    var clickColor = new Array();

    window.onload = function () {
        var img = document.getElementById("breast-img");
        context.drawImage(img, 0, 0, 550, 250);
    }


    $('#breast-canvas').mousedown(function (e) {
        var mouseX = e.pageX - this.offsetLeft;
        var mouseY = e.pageY - this.offsetTop;

        paint = true;
        addClick(e.pageX - this.offsetLeft, e.pageY - this.offsetTop);
        redraw();
    });

    $('#breast-canvas').mousemove(function (e) {
        if (paint) {
            addClick(e.pageX - this.offsetLeft, e.pageY - this.offsetTop, true);
            redraw();
        }
    });

    var canvas = document.getElementById("breast-canvas");
    $('#breast-canvas').mouseup(function (e) {
        paint = false;
        var dataURL = canvas.toDataURL();
        $("#img-to-PACS").val(dataURL);

        var mouseX = e.pageX - this.offsetLeft;
        var mouseY = e.pageY - this.offsetTop;
        console.log("x: " + mouseX)
        console.log("y: " + mouseY)
        setLatAndQuad(mouseX, mouseY, curColor)
    });

    $('#breast-canvas').mouseleave(function (e) {
        paint = false;
        var dataURL = canvas.toDataURL();
        $("#img-to-PACS").val(dataURL);
    });


    var clickX = new Array();
    var clickY = new Array();
    var clickDrag = new Array();
    var paint;

    function addClick(x, y, dragging) {
        clickX.push(x);
        clickY.push(y);
        clickDrag.push(dragging);
        clickColor.push(curColor);
    }

    function redraw() {
        //context.clearRect(0, 0, context.canvas.width, context.canvas.height); // Clears the canvas
        /* context.strokeStyle = "#df4b26"; */

        context.strokeStyle = "#df4b26";
        context.lineJoin = "round";
        context.lineWidth = 5;

        for (var i = 0; i < clickX.length; i++) {
            context.beginPath();
            if (clickDrag[i] && i) {
                context.moveTo(clickX[i - 1], clickY[i - 1]);
            } else {
                context.moveTo(clickX[i] - 1, clickY[i]);
            }
            context.lineTo(clickX[i], clickY[i]);
            context.closePath();
            context.strokeStyle = clickColor[i];
            context.stroke();
        }
    }


    var clicksX = new Array();
    var clicksY = new Array();
    function setLatAndQuad(mouseX, mouseY, col) {

        clicksX.push(mouseX);
        clicksY.push(mouseY);

        var depthText = new Array();
        var lateralityText = new Array();
        var quadText = new Array();
        console.log("clicks x: " + clicksX.join())
        console.log("clicks y: " + clicksY.join())

        var depth = $("#depth");
        var depthOutput = $("#depth-output");
        var quad = $("#quadrant");
        var quadOutput = $("#quadrant-output");
        var lat = $("#laterality");
        var latOutput = $("#laterality-output");

        for (var i = 0; i < clicksX.length; i++) {
            var text;
            if (clicksX[i] < 274) {
                text = "Right"
                if (!lateralityText.includes(text)) {
                    lateralityText.push(text)
                }
            } else {
                text = "Left";
                if (!lateralityText.includes(text)) {
                    lateralityText.push(text)
                }
            }

            if (clicksY[i] > 162) {
                if ((clicksX[i] < 200 && clicksX[i] > 147) || (clicksX[i] > 350 && clicksX[i] < 403)) {
                    text = "Lower outer quadrant";
                    quadText.push(text)
                } else if (clicksX[i] > 200 && clicksX[i] < 350) {
                    text = "Lower inner quadrant";
                    quadText.push(text)
                }
            }

            if (clicksY[i] < 162) {
                if ((clicksX[i] > 200 && clicksX[i] < 350)) {
                    text = "Upper inner quadrant";
                    quadText.push(text)
                } else if ((clicksX[i] > 147 && clicksX[i] < 200) || (clicksX[i] > 350 && clicksX[i] < 403)) {
                    text = "Upper outer quadrant";
                    quadText.push(text)
                }
            }


            if (clicksX[i] < 57 || clicksX[i] > 494) {
                text = "Anterior";
                depthText.push(text)
            } else if (clicksX[i] < 89 && clicksX[i] > 57 || clicksX[i] < 494 && clicksX[i] > 461) {
                text = "Middle";
                depthText.push(text)
            } else if (clicksX[i] < 133 && clicksX[i] > 89 || clicksX[i] < 461 && clicksX[i] > 423) {
                text = "Posterior";
                depthText.push(text)
            }
        }

        depth.text(depthText.join(", "));
        depthOutput.val(depthText.join(", "));
        lat.text(lateralityText.join(", "));
        latOutput.val(lateralityText.join(", "));
        quad.text(quadText.join(", "));
        quadOutput.val(quadText.join(", "));
    }


})
