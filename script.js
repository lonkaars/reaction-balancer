function solveReaction() {
    var solution;
    try {
        solution = solve($(".reactionUnsolved").val())
    } catch (error) {
        console.error(error)
        solution = null
    }
    var answer = ''
    if (solution == null) {
        answer = "The reaction entered is invalid"
    } else if (solution == "NoSol"){
        answer = "The reaction entered has no solution"
    } else {
        answer = returnHTML(solution)
    }
    $(".answer").html(answer)
}

var darkMode = false;

function toggleDarkMode() {
    darkMode = !darkMode
    $('body').css("--c-1", darkMode == false ? "#fff" : "#000");
    $('body').css("--c-2", darkMode == false ? "#0008" : "#000");
    $('body').css("--c-3", darkMode == false ? "#000" : "#fff");
    $('body').css("--c-4", darkMode == false ? "#ddd" : "#222");
    $('body').css("--c-5", darkMode == false ? "#bbb" : "#333");
    $('body').css("--c-6", darkMode == false ? "#0008" : "#fff8");
    $('body').css("--c-7", darkMode == false ? "#0003" : "#fff3");
    $('body').css("--c-8", darkMode == false ? "#0007" : "#fff7");
    $('body').css("--c-9", darkMode == false ? "#0008" : "#2228");
    $('body').css("--p-1", darkMode == false ? "130px" : "70px");
}

function showHelp() {
    $(".helpShade").css("visibility", "visible");
    anime({
        targets: ".helpWindow",
        bottom: ["-500px", "0"],
        easing: "easeOutQuad",
        duration: 100
    });
    anime({
        targets: ".helpShade",
        opacity: [0, 1],
        easing: "easeOutQuad",
        duration: 100
    })
}

function hideHelp() {
    anime({
        targets: ".helpWindow",
        bottom: ["0", "-500px"],
        easing: "easeInQuad",
        duration: 100
    });
    anime({
        targets: ".helpShade",
        opacity: [1, 0],
        easing: "easeInQuad",
        duration: 100,
        complete: function () {
            $(".helpShade").css("visibility", "hidden");
        }
    })
}