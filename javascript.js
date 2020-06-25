// global variables for time
var currentTime = moment();
var currentDate = currentTime.format("MM DD YYYY");

// jquery to display the current date
$("#currentDay").text("Today's Date is " + currentDate);

$(document).ready(function() {

    // This is supposed to grab tasks from local storage
    hourArray = $(".hour").toArray()
    for (i = 0; i < hourArray.length; i++) {
        $(hourArray[i].siblings("textarea")).text(localStorage.getItem($(hourArray[i].attr("data-time"))));
        
    }
});

// For loop to create our row divs for each hour during the work day; each with a text area and save button

for (i = 0; i < 9; i++) {

    var timeSection = $("<div>").addClass("row");

    var timeItem = $("<div>").addClass("hour col-md-2").text(moment("9:00 AM", "hh:mm A").add(i, "hours").format("hA"));
    timeItem.attr("data-time", moment("9:00 AM", "hh:mm A").add(i, "hours").format("hA"));

    var taskItem = $("<textarea>").addClass("col-md-9");

    var saveButton = $("<button>").addClass("saveBtn col-md-1").html('<i class="fa fa-save"></i>');

    $(".container").append(timeSection);

    $(timeSection).append(timeItem);

    $(timeItem).after(taskItem);

    $(taskItem).after(saveButton);


    // if else statement to assign colors to rows based on current, past or future

    if (currentTime.isSame(moment("9:00 AM", "hh:mm A").add(i, "hours"), "hour")) {
        $(taskItem).addClass("present");

    } else if (currentTime.isBefore(moment("9:00 AM", "hh:mm A").add(i, "hours"), "hour")) {
        $(taskItem).addClass("future");

    } else if (currentTime.isAfter(moment("9:00 AM", "hh:mm A").add(i, "hours"), "hour")) {
        $(taskItem).addClass("past")
    }


}

// save button that is supposed to save text to the local storage
$(".saveBtn").on("click", function() {

    localStorage.setItem($(this).siblings(".hour").attr("data-time"), $(this).siblings("textarea").val())
});
console.log(localStorage);

