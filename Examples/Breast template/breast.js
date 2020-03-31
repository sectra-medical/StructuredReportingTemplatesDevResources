$(document).ready(function () {

    // The variable breastImage is defined in breast-image.js
    // to avoid the gigantic image code to clutter.
    $("#breast-img").attr("src", breastImage);

    $("#img-to-PACS").attr("data-field-type", "image/png")

    $("#comparison input").change(function () {
        var comparisonOutput = $("#comparison-text");
        var comparison = new Array();

        $.each($("#comparison input:checked"), function() {
            comparison.push($(this).val());
        })
        comparison = (comparison.join(", "))
        comparisonOutput.val(comparison)
    })

    $("#breast-composition input").change(function () {
        var compositionOutput = $("#composition-text");
        var value = $(this).val();
        console.log(value)
        if ($(this).attr("id") === "composition-a") {
            $("#composition-explanation").text("The breasts are almost entirely fatty.")
            compositionOutput.val(value + ". The breasts are almost entirely fatty.")
        } else if ($(this).attr("id") == "composition-b") {
            $("#composition-explanation").text("There are scattered areas of fibroglandular density.")
            compositionOutput.val(value + ". There are scattered areas of fibroglandular density.")
        } else if ($(this).attr("id") == "composition-c") {
            $("#composition-explanation").text("The breasts are heterogeneously dense, which may obscure small masses.")
            compositionOutput.val(value + ". The breasts are heterogeneously dense, which may obscure small masses.")
        } else if ($(this).attr("id") == "composition-d") {
            $("#composition-explanation").text("The breasts are extremely dense, which lowers the sensitivity of mammography.")
            compositionOutput.val(value + ". The breasts are extremely dense, which lowers the sensitivity of mammography.")
        } else {
            $("#composition-explanation").text("")
            compositionOutput.val("")
        }
    })

    $("#findings").change(function () {
        var val = $("#findings option:selected").text();
        if (val !== "No findings") {
            $("#findings-bonus").show()
        } else {
            $("#findings-bonus").hide()
        }
        var tech = $("#technique > .active").text().trim();
        updateImpression(tech);
    })

    $("#assessment").change(function () {
        var assessmentId = $("#assessment option:selected").attr("id");
        var management = $("#findings-management");

        if (assessmentId == "opt0") {
            stringOpt0 = "Recall for additional imaging and/or comparison with prior examination(s).";
            management.text(stringOpt0);
        } else if (assessmentId == "opt1" || assessmentId == "opt2") {
            stringOpt1and2 = "Routine mammography screening.";
            management.text(stringOpt1and2);
        } else if (assessmentId == "opt3") {
            stringOpt3 = "Short-interval (6-month) follow-up or continued surveillance mammography.";
            management.text(stringOpt3)
        } else if (assessmentId == "opt4" || assessmentId == "opt5") {
            stringOpt4and5 = "Tissue diagnosis.";
            management.text(stringOpt4and5)
        } else if (assessmentId == "opt6") {
            stringOpt6 = "Surgical excision when clinically appropriate.";
            management.text(stringOpt6)
        } else {
            management.text("")
        }

        var tech = $("#technique > .active").text().trim();
        updateImpression(tech);
    })

    $("#technique input:radio").change(function (e) {
        var tech = $(this).val();
        console.log("update");
        console.log($(this).val());
        updateImpression(tech);
    })

    function updateImpression(technique) {
        var findings = $("#findings option:selected").text().trim();
        var mgmt = $("#findings-management").text().trim();
        var impressionOutput = technique + ' assessment, ' + findings.toLowerCase() + '. ' + mgmt;
        $("#impression").text(impressionOutput);
        $("#impression-output").val(impressionOutput);
    }
})