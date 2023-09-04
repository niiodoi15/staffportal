var currentTab = 0; // Current tab is set to be the first tab (0)
showTab(currentTab); // Display the current tab

function showTab(n) {
  // This function will display the specified tab of the form...
  var x = document.getElementsByClassName("step");
  x[n].style.display = "block";
  //... and fix the Previous/Next buttons:
  if (n == 0) {
    document.getElementById("prevBtn").style.display = "none";
  } else {
    document.getElementById("prevBtn").style.display = "inline";
  }
  if (n == x.length - 1) {
    document.getElementById(
      "nextBtn"
    ).innerHTML = `<i class="fas fa-paper-plane"></i> Submit`;
  } else {
    document.getElementById(
      "nextBtn"
    ).innerHTML = `Next <span><i class="fa fa-arrow-right"></i></span>`;
  }
  //... and run a function that will display the correct step indicator:
  fixStepIndicator(n);
}

function nextPrev(n) {
  // This function will figure out which tab to display
  var x = document.getElementsByClassName("step");
  // Exit the function if any field in the current tab is invalid:
  //   if (n == 1 && !validateForm()) return false;
  // Hide the current tab:
  x[currentTab].style.display = "none";
  // Increase or decrease the current tab by 1:
  currentTab = currentTab + n;
  // if you have reached the end of the form...
  if (currentTab >= x.length) {
    // ... the form gets submitted:
    document.getElementById("signUpForm").submit();
    return false;
  }
  // Otherwise, display the correct tab:
  showTab(currentTab);
}

function validateForm() {
  // This function deals with validation of the form fields
  var x,
    y,
    i,
    valid = true;
  x = document.getElementsByClassName("step");
  y = x[currentTab].getElementsByTagName("input");
  // A loop that checks every input field in the current tab:
  for (i = 0; i < y.length; i++) {
    // If a field is empty...
    if (y[i].value == "") {
      // add an "invalid" class to the field:
      y[i].className += " invalid";
      // and set the current valid status to false
      valid = false;
    }
  }
  // If the valid status is true, mark the step as finished and valid:
  if (valid) {
    document.getElementsByClassName("stepIndicator")[currentTab].className +=
      " finish";
  }
  return valid; // return the valid status
}

function fixStepIndicator(n) {
  // This function removes the "active" class of all steps...
  var i,
    x = document.getElementsByClassName("stepIndicator");
  for (i = 0; i < x.length; i++) {
    x[i].className = x[i].className.replace(" active", "");
  }
  //... and adds the "active" class on the current step:
  x[n].className += " active";
}

function searchTable() {
  var input, filter, found, table, tr, td, i, j;
  input = document.getElementById("myInput");
  filter = input.value.toUpperCase();
  table = document.getElementById("myTable");
  tr = table.getElementsByTagName("tr");
  for (i = 0; i < tr.length; i++) {
    td = tr[i].getElementsByTagName("td");
    for (j = 0; j < td.length; j++) {
      if (td[j].innerHTML.toUpperCase().indexOf(filter) > -1) {
        found = true;
      }
    }
    if (found) {
      tr[i].style.display = "No data found";
      found = false;
    } else {
      tr[i].style.display = "none";
    }
  }
}

$.extend(DataTable.ext.classes, {
  sTable: "dataTable",
  sNoFooter: "no-footer",

  /* Paging buttons */
  sPageButton: "paginate_button",
  sPageButtonActive: "current",
  sPageButtonDisabled: "disabled",

  /* Striping classes */
  sStripeOdd: "odd",
  sStripeEven: "even",

  /* Empty row */
  sRowEmpty: "dataTables_empty",

  /* Features */
  sWrapper: "dataTables_wrapper",
  sFilter: "dataTables_filter",
  sInfo: "dataTables_info",
  sPaging: "dataTables_paginate paging_" /* Note that the type is postfixed */,
  sLength: "dataTables_length",
  sProcessing: "dataTables_processing",

  /* Sorting */
  sSortAsc: "sorting_asc",
  sSortDesc: "sorting_desc",
  sSortable: "sorting" /* Sortable in both directions */,
  sSortableAsc: "sorting_asc_disabled",
  sSortableDesc: "sorting_desc_disabled",
  sSortableNone: "sorting_disabled",
  sSortColumn:
    "sorting_" /* Note that an int is postfixed for the sorting order */,

  /* Filtering */
  sFilterInput: "",

  /* Page length */
  sLengthSelect: "",

  /* Scrolling */
  sScrollWrapper: "dataTables_scroll",
  sScrollHead: "dataTables_scrollHead",
  sScrollHeadInner: "dataTables_scrollHeadInner",
  sScrollBody: "dataTables_scrollBody",
  sScrollFoot: "dataTables_scrollFoot",
  sScrollFootInner: "dataTables_scrollFootInner",

  /* Misc */
  sHeaderTH: "",
  sFooterTH: "",

  // Deprecated
  sSortJUIAsc: "",
  sSortJUIDesc: "",
  sSortJUI: "",
  sSortJUIAscAllowed: "",
  sSortJUIDescAllowed: "",
  sSortJUIWrapper: "",
  sSortIcon: "",
  sJUIHeader: "",
  sJUIFooter: "",
});

var extPagination = DataTable.ext.pager;

function _numbers(page, pages) {
  var numbers = [],
    buttons = extPagination.numbers_length,
    half = Math.floor(buttons / 2),
    i = 1;

  if (pages <= buttons) {
    numbers = _range(0, pages);
  } else if (page <= half) {
    numbers = _range(0, buttons - 2);
    numbers.push("ellipsis");
    numbers.push(pages - 1);
  } else if (page >= pages - 1 - half) {
    numbers = _range(pages - (buttons - 2), pages);
    numbers.splice(0, 0, "ellipsis"); // no unshift in ie6
    numbers.splice(0, 0, 0);
  } else {
    numbers = _range(page - half + 2, page + half - 1);
    numbers.push("ellipsis");
    numbers.push(pages - 1);
    numbers.splice(0, 0, "ellipsis");
    numbers.splice(0, 0, 0);
  }

  numbers.DT_el = "span";
  return numbers;
}

$.extend(extPagination, {
  simple: function (page, pages) {
    return ["previous", "next"];
  },

  full: function (page, pages) {
    return ["first", "previous", "next", "last"];
  },

  numbers: function (page, pages) {
    return [_numbers(page, pages)];
  },

  simple_numbers: function (page, pages) {
    return ["previous", _numbers(page, pages), "next"];
  },

  full_numbers: function (page, pages) {
    return ["first", "previous", _numbers(page, pages), "next", "last"];
  },

  first_last_numbers: function (page, pages) {
    return ["first", _numbers(page, pages), "last"];
  },

  // For testing and plug-ins to use
  _numbers: _numbers,

  // Number of number buttons (including ellipsis) to show. _Must be odd!_
  numbers_length: 7,
});

$.extend(true, DataTable.ext.renderer, {
  pageButton: {
    _: function (settings, host, idx, buttons, page, pages) {
      var classes = settings.oClasses;
      var lang = settings.oLanguage.oPaginate;
      var aria = settings.oLanguage.oAria.paginate || {};
      var btnDisplay,
        btnClass,
        counter = 0;

      var attach = function (container, buttons) {
        var i, ien, node, button;
        var clickHandler = function (e) {
          _fnPageChange(settings, e.data.action, true);
        };

        for (i = 0, ien = buttons.length; i < ien; i++) {
          button = buttons[i];

          if ($.isArray(button)) {
            var inner = $("<" + (button.DT_el || "div") + "/>").appendTo(
              container
            );
            attach(inner, button);
          } else {
            btnDisplay = null;
            btnClass = "";

            switch (button) {
              case "ellipsis":
                container.append('<span class="ellipsis">&#x2026;</span>');
                break;

              case "first":
                btnDisplay = lang.sFirst;
                btnClass =
                  button + (page > 0 ? "" : " " + classes.sPageButtonDisabled);
                break;

              case "previous":
                btnDisplay = lang.sPrevious;
                btnClass =
                  button + (page > 0 ? "" : " " + classes.sPageButtonDisabled);
                break;

              case "next":
                btnDisplay = lang.sNext;
                btnClass =
                  button +
                  (page < pages - 1 ? "" : " " + classes.sPageButtonDisabled);
                break;

              case "last":
                btnDisplay = lang.sLast;
                btnClass =
                  button +
                  (page < pages - 1 ? "" : " " + classes.sPageButtonDisabled);
                break;

              default:
                btnDisplay = button + 1;
                btnClass = page === button ? classes.sPageButtonActive : "";
                break;
            }

            if (btnDisplay !== null) {
              node = $("<a>", {
                class: classes.sPageButton + " " + btnClass,
                "aria-controls": settings.sTableId,
                "aria-label": aria[button],
                "data-dt-idx": counter,
                tabindex: settings.iTabIndex,
                id:
                  idx === 0 && typeof button === "string"
                    ? settings.sTableId + "_" + button
                    : null,
              })
                .html(btnDisplay)
                .appendTo(container);

              _fnBindAction(node, { action: button }, clickHandler);

              counter++;
            }
          }
        }
      };

      // IE9 throws an 'unknown error' if document.activeElement is used
      // inside an iframe or frame. Try / catch the error. Not good for
      // accessibility, but neither are frames.
      var activeEl;

      try {
        // Because this approach is destroying and recreating the paging
        // elements, focus is lost on the select button which is bad for
        // accessibility. So we want to restore focus once the draw has
        // completed
        activeEl = $(host).find(document.activeElement).data("dt-idx");
      } catch (e) {}

      attach($(host).empty(), buttons);

      if (activeEl !== undefined) {
        $(host)
          .find("[data-dt-idx=" + activeEl + "]")
          .focus();
      }
    },
  },
});
var data = {
  labels: ["January", "February", "March", "April", "May", "June", "July"],
  datasets: [
    {
      label: "My First dataset",
      fillColor: "rgba(220,220,220,0.2)",
      strokeColor: "rgba(220,220,220,1)",
      pointColor: "rgba(220,220,220,1)",
      pointStrokeColor: "#fff",
      pointHighlightFill: "#fff",
      pointHighlightStroke: "rgba(220,220,220,1)",
      data: [65, 59, 80, 81, 56, 55, 40],
    },
    {
      label: "My Second dataset",
      fillColor: "rgba(151,187,205,0.2)",
      strokeColor: "rgba(151,187,205,1)",
      pointColor: "rgba(151,187,205,1)",
      pointStrokeColor: "#fff",
      pointHighlightFill: "#fff",
      pointHighlightStroke: "rgba(151,187,205,1)",
      data: [28, 48, 40, 19, 86, 27, 90],
    },
  ],
};

var data2 = [
  {
    value: 300,
    color: "#F7464A",
    highlight: "#FF5A5E",
    label: "Red",
  },
  {
    value: 50,
    color: "#46BFBD",
    highlight: "#5AD3D1",
    label: "Green",
  },
  {
    value: 100,
    color: "#FDB45C",
    highlight: "#FFC870",
    label: "Yellow",
  },
  {
    value: 40,
    color: "#949FB1",
    highlight: "#A8B3C5",
    label: "Grey",
  },
  {
    value: 120,
    color: "#4D5360",
    highlight: "#616774",
    label: "Dark Grey",
  },
];

// Global + Custom Chart Config Options

var options = {
  bezierCurve: false,
  animation: true,
  animationEasing: "easeOutQuart",
  showScale: false,
  tooltipEvents: ["mousemove", "touchstart", "touchmove"],
  tooltipCornerRadius: 3,
  pointDot: true,
  pointDotRadius: 4,
  datasetFill: true,
  scaleShowLine: true,
  animationEasing: "easeOutBounce",
  animateRotate: true,
  animateScale: true,
};

// Load Chart

var ctx1 = document.getElementById("myLineChart").getContext("2d");
var ctx = document.getElementById("myDonutChart").getContext("2d");

var myLineChart = new Chart(ctx1).Line(data, options);
// var myBarChart = new Chart(ctx).Bar(data, options);
// var myRadarChart = new Chart(ctx).Radar(data, options);
// new Chart(ctx).PolarArea(data2, options);

// For a pie chart
// var myPieChart = new Chart(ctx).Pie(data2,options);

// And for a doughnut chart
var myDoughnutChart = new Chart(ctx).Doughnut(data2, options);

function addRev() {
  document.getElementById("add_there").innerHTML += `<div class="col-md-11">
                                                                                <div class="row">
                                                                                    <div class="col-lg-8 col-md-8 col-sm-8">
                                                                                        <input type="text" value=""
                                                                                            name="" class="form-control"
                                                                                            placeholder="Description">
                                                                                    </div>
                                                                                    <div
                                                                                        class="col-lg-4 col-md-4 col-sm-4 d-flex">
                                                                                        <input type="text" value=""
                                                                                            name="" class="form-control"
                                                                                            placeholder="Amount">
                                                                                    </div>
                                                                                </div>
                                                                            </div>`;
}
