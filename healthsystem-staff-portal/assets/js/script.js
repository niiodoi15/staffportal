const chat = document.querySelector(".chat");
const topSection = document.querySelector(".top-section");
const togglecChaBbtn = document.querySelector(".toggle-chat-btn");

// togglecChaBbtn.addEventListener("click", () => {
//   topSection.classList.toggle("display");
//   chat.classList.toggle("display");
// });

const fieldsContainer = document.querySelector("[data-id=fields-container]");
const btnAddFields = document.querySelector("[data-id=btn-new-fields]");

btnAddFields.addEventListener("click", (e) => {
  e.preventDefault();
  addColumn();
});

function addColumn() {
  const col = document.createElement("div");
  col.className = "col-md-11";

  const row = document.createElement("div");
  row.className = "row";
  row.innerHTML = `<div class="col-lg-8 col-md-8 col-sm-8"> <input type="text" value="" name="" class="form-control" placeholder="Description"> </div>`;
  col.appendChild(row);

  // col.innerHTML += `<div class="row">
  //       <div class="col-lg-8 col-md-8 col-sm-8">
  //           <input type="text" value=""
  //               name="" class="form-control"
  //               placeholder="Description">
  //       </div>
  //       <div
  //           class="col-lg-4 col-md-4 col-sm-4 d-flex">
  //           <input type="text" value=""
  //               name="" class="form-control"
  //               placeholder="Amount">
  //       </div>
  //        </div>
  //       `;

  console.log(col.innerHTML);
  return;
}

addColumn();
