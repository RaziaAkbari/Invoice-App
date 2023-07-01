const display = document.getElementById("display")
const btn = document.getElementById("new-invoice")
const menuBar = document.getElementById("menu-bar")
const backdrop = document.querySelector(".backdrop")
const itemList = document.getElementById("itemList")
const addItem = document.getElementById("add-item")
const row = document.getElementsByClassName("row1")
const totalInvoice = document.getElementById("total-invoice")
const showInvoice = document.getElementsByClassName("showInvoice")
const heading = document.getElementById("heading")
const block = document.getElementsByClassName("block")
const form = document.getElementById("form")
const inputs = form.querySelectorAll("input")
const modeBtn = document.getElementById("modeBtn")
let indexNum
// let array = []

//opens the backdrop
btn.addEventListener("click", () => {
  backdrop.classList.add("visible")
})

//removes the backdrop
backdrop.addEventListener("click", (e) => {
  if (e.target.classList.contains("backdrop")) {
    backdrop.classList.remove("visible")
  }
})

//deletes the row from the table in the form
function deleteRow(btn) {
  let row = btn.parentNode.parentNode
  row.parentNode.removeChild(row)
}

//the bug was in above syntax where querySelectorAll was used

addItem.addEventListener("click", (e) => {
  e.preventDefault()
  let newItem = document.createElement("tr")
  newItem.setAttribute("class", "row1")
  newItem.innerHTML = `
     <td>
      <input type="text" placeholder="Task Name" >
     </td>
     <td>
      <input type='number' value= "00" min='1' >
     </td>
     <td>
      <input type="number" name="number" id="" value="00"  min='1' step=5 class="text">
     </td>
     <td> 00 </td>


  <td>
      <button type='button' class='btn' onclick='deleteRow(this)'><img src="./images/icon-delete.svg" alt=""></button>
  </td>
`
  // console.log(newItem)
  itemList.appendChild(newItem)
  newItem.addEventListener("input", updateValue)
})

const updateValue = function (e) {
  const input = e.target
  const rowElement = input.closest("tr").querySelectorAll("td")
  // console.log(rowElement)
  const cell1 = rowElement[1].children[0].value
  const cell2 = rowElement[2].children[0].value
  var total = mulitply(cell1, cell2)
  const cell3 = rowElement[3]
  cell3.innerHTML = total
}

const mulitply = (x, y) => x * y

//updating the hard coded values
for (let i = 0; i < row.length; i++) {
  row[i].addEventListener("input", updateValue)
}

// const updateValue = function (e) {
//    console.log(cell3)
//   const inputs = document.querySelectorAll('input[type="number"]')
//   inputs.forEach((input) => {
//     input.addEventListener("input", () => {
//       for (let i = 0; i < row.length; i++) {
//         const rowElement = row[i].children
//         const cell1 = rowElement[1].children[0].value
//         const cell2 = rowElement[2].children[0].value
//         let total = cell1 * cell2
//         const cell3 = rowElement[3]
//         cell3.innerHTML = total
//         console.log(total, cell3)
//       }
//     })
//   })
// }
// console.log(row)
// row.addEventListener("input", updateValue)

// row.forEach((element) => {
//   element.addEventListener("input", updateValue)
// })

// console.log(inputs)

function validateForm() {
  let isValid = true
  inputs.forEach((input) => {
    if (input.value.trim() == "") {
      isValid = false
      input.placeholder = "These fields are required!"
      input.style.borderColor = "red"
    }
  })
  return isValid
}
// const send = document.getElementById("send")
form.addEventListener("submit", (event) => {
  event.preventDefault()
  if (validateForm()) {
    const fd = new FormData(form)
    const obj = Object.fromEntries(fd)
    // array.shift(obj)

    // retrieve existing data from localStorage
    const storedData = JSON.parse(localStorage.getItem("userInfo")) || []

    // push new object into existing array
    storedData.unshift(obj)

    // store updated array back into localStorage
    const json = JSON.stringify(storedData)
    localStorage.setItem("userInfo", json)
    console.log("Form submitted successfully")

    //deletes the initail background
    removeBlock(display)
    location.reload()
    // createBlock() //creates the new block
    discardForm() //resets the form and closes the overlay/backdrop
  }
})

// console.log(array)
function removeBlock(id) {
  if (
    display.innerHTML.includes("img") &&
    display.getElementsByTagName("p").length === 2
  ) {
    // Remove the image and paragraphs
    id.innerHTML = ""
  }
}

function discardForm() {
  form.reset()
  backdrop.classList.remove("visible")
}

function generateRandomId(length) {
  let result = ""
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"
  const charactersLength = characters.length

  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength))
  }

  return result
}

function createBlock() {
  let info = localStorage.getItem("userInfo")
  if (info) {
    info = JSON.parse(info)

    for (let i = 0; i < info.length; i++) {
      let obj = info[i]
      // console.log(info)
      removeBlock(display)
      const block = document.createElement("div")
      block.style.width = "100%"
      block.style.height = "4rem"
      block.style.backgroundColor = "white"
      block.style.borderRadius = "5px"
      block.style.marginTop = "6px"
      block.style.boxShadow = "0 0 5px #ccc"
      block.style.fontSize = "13px"
      block.style.fontWeight = "bold"
      block.setAttribute(
        "class",
        "d-flex justify-content-around p-2 pt-3 block"
      )
      display.appendChild(block)
      block.setAttribute("id", `block${i}`)
      let id = generateRandomId(5)
      //will be added to the blocks
      //BIG bug with the generated ids
      let newStat
      if (obj.paid == true) {
        newStat = `<div class = "p-2 ps-3 pe-3 bg-success text-white rounded" id = "status">
           Paid
        </div>`
      } else if (obj.paid == "draft") {
        newStat = `<div class = "p-2 ps-3 pe-3 bg-secondary text-white rounded" id = "status">
        draft
     </div>`
      } else {
        newStat = `<div class = "p-2 bg-danger text-white rounded" id = "status">
        Unpaid
     </div>`
      }
      let elements = `
  <p id= "#${id}"> #${id} </p> 
  <p> ${obj["invoice-date"]}</p>
  <p> ${obj["nameC"]}</p>
  <p> $${mulitply(parseFloat(obj["qty"]), parseFloat(obj["number"]))}</p>
   ${newStat}
  <div class="ms-2" class= "showInvoice"><img src="./images/icon-arrow-right.svg" > </div>
  
`

      // Get the length of the array
      // let arrayLength = info.length
      totalInvoice.innerHTML = `There are a total of ${info.length} invoices`
      block.innerHTML = elements
    }
  }
}

// Call the function on page load

window.onload = createBlock

//returns all the data of the invoices
document.addEventListener("click", (e) => {
  if (e.target.classList.contains("block")) {
    let info = localStorage.getItem("userInfo")
    info = JSON.parse(info)
    // console.log(info)
    console.log(e.target.id)
    //each block has an item of block following by the array's index number, for ex, block0, block1, etc..
    let blockID = e.target.id
    let parent = document.getElementById(blockID)
    //for retieving the generated IDs of each block
    let firstChildID = parent.firstElementChild.id
    // console.log(firstChildID)
    let index = blockID.charAt(blockID.length - 1)
    indexNum = index
    console.log(indexNum)
    console.log(index)
    // console.log(info[index])
    let obj = info[index]
    // console.log(obj)

    heading.setAttribute(
      "class",
      "bg-white p-3 rounded-3 d-flex justify-content-between w-100"
    )
    heading.style.boxShadow = "0 0 5px #ccc"
    display.style.boxShadow = "0 0 5px #ccc"
    display.setAttribute("class", "bg-white p-5 rounded-3 mt-3 mb-5")

    heading.innerHTML = `

  
  <div class="d-flex gap-3">
    <p>Status</p>
    <p id= "stat">Pending</p>
  </div>
  <div class= " d-flex justify-content-center gap-2">
  <button type="button" class="btn btn-light bg-white rounded-5" onclick= "back()">Go back</button>
    <button type="button" class="btn btn-danger rounded-5" id= "deleteInvoice" onclick="deleteIn()">Delete</button>
    <button type="button" class="btn btn-primary rounded-5" onclick = "paid(this)">Mask As Paid</button>
  </div>

`
    display.innerHTML = `
             
            <div class="d-flex justify-content-between">
              <div>
                <p class="fw-bold">${firstChildID}</p>
                <p>${obj["project-description"]}</p>
              </div>
              <div>
                <p class="fw-bold">Address</p>
                <p class="m-0">${obj["cityF"]}</p>
                <p class="m-0">${obj["post-codeF"]}</p>
                <p class="m-0">${obj["countryF"]}</p>
              </div>
            </div>
            <div class="row">
              <div class="col-4">
                <p class="fw-bold">Inovice date</p>
                <p>${obj["invoice-date"]}</p>
                <br />
                <p class="fw-bold">Payment Term</p>
                <p>${obj["payment-term"]}</p>
              </div>
              <div class="col-4">
                <p class="fw-bold">Bill to</p>
                <p>${obj["nameC"]}</p>
                <p>${obj["street-addressC"]}</p>
                <p>${obj["countryC"]}</p>
                <p>${obj["post-codeC"]}</p>
                <p>${obj["countryC"]}</p>
              </div>
              <div class="col-4">
                <p class="fw-bold">Send to</p>
                <p style= "word-wrap: break-word;">${obj["emailC"]}</p>
              </div>
            </div>
            <table class="table">
            <thead>
             <tr>
              <th>Item Name</th>
              <th>Qty.</th>
              <th>Price</th>
              <th>Total</th>
            
             </tr>
            </thead>
            
           <tbody id="itemList" >
          <tr class="row1">
            <td>
             ${obj["task"]}
         </td>
            <td>
            ${obj["qty"]}
         </td>
         <td>
         ${obj["number"]}
         </td>
         <td>${obj["number"] * obj["qty"]}</td>

       </tr>
       </tbody>
                    
                </table>
          
        `
    //  if()
  }
})
function back() {
  location.reload()
}

function paid(btn) {
  const parent = btn.parentElement
  const grandParent = parent.parentElement
  // console.log(parent)

  // Get the first child element of the parent
  const firstChild = grandParent.firstElementChild
  // console.log(firstChild)

  // Get the second child element of the first child
  const secondChild = firstChild.children[1]
  // console.log(secondChild)
  // Modify the second child element
  secondChild.textContent = "Paid"
  secondChild.setAttribute(
    "class",
    "p-1 bg-success text-white pe-4 ps-4 rounded"
  )
  let info = localStorage.getItem("userInfo")
  info = JSON.parse(info)
  info[indexNum].paid = true
  console.log(info[indexNum])
  const json = JSON.stringify(info)
  localStorage.setItem("userInfo", json)
}

function deleteIn() {
  let deleteBtn = document.getElementById("deleteInvoice")
  console.log(deleteBtn)
  // deleteBtn.addEventListener("click", (e) => {
  //   console.log(e.target)
  document.onclick = function (e) {
    // var clickedItem = e.target;
    // if (e.target.classList.contains("block")) {
    // let blockID = e.target.id
    // let index = blockID.charAt(blockID.length - 1)
    // console.log(index)
    let info = localStorage.getItem("userInfo")
    info = JSON.parse(info)
    info.splice(indexNum, 1)
    console.log(info)
    const json = JSON.stringify(info)
    localStorage.setItem("userInfo", json)
    location.reload()
  }
}
// console.log(blockID)

let stat = document.getElementById("stat")
let info = localStorage.getItem("userInfo")
info = JSON.parse(info)
//unfinished work of setting the status
for (let index = 0; index < info.length; index++) {
  // console.log(info[index])
  // if (info[index].paid == true) {
  //   stat.setAttribute("class", "p-1 bg-success text-white pe-4 ps-4 rounded")
  // }
}
const json = JSON.stringify(info)
localStorage.setItem("userInfo", json)

function draft() {
  const fd = new FormData(form)
  const obj = Object.fromEntries(fd)
  console.log(obj)
  console.log(fd)
  obj.paid = "draft"
  for (let key in obj) {
    if (obj[key] === "") {
      obj[key] = "Not Set yet"
    }
    console.log(obj[key])
  }

  const storedData = JSON.parse(localStorage.getItem("userInfo")) || []

  // push new object into existing array
  storedData.unshift(obj)

  // store updated array back into localStorage
  const json = JSON.stringify(storedData)
  localStorage.setItem("userInfo", json)
  console.log("Form submitted successfully")

  //deletes the initail background
  removeBlock(display)
  location.reload()
  // createBlock() //creates the new block
  discardForm() //resets the form and closes the overlay/backdrop
}
//intially the mode is light
// let mode = "light"
// localStorage.setItem("mode", mode)
// console.log(localStorage.getItem("mode"))

modeBtn.addEventListener("click", (e) => {
  // localStorage.setItem("mode", "dark")

  // console.log(e.target.src)
  if (
    e.target.tagName === "IMG" &&
    e.target.src.includes("/images/icon-moon.svg")
  ) {
    // document.body.style.color = "white"
    document.body.style.backgroundColor = " #2b313d"
    document.body.style.color = "white"
    modeBtn.innerHTML = `<img src="./images/icon-sun.svg" alt="" srcset="">`
    const filter = document.getElementById("filter")
    // console.log(filter)
    filter.style.color = "white"
    for (
      let index = 0;
      index < JSON.parse(localStorage.getItem("userInfo")).length;
      index++
    ) {
      const block = document.getElementById(`block${index}`)
      // console.log(block)
      block.style.backgroundColor = "#373b53"
      // console.log(e.target)
    }
    // localStorage.setItem("mode", "light")
    // console.log(localStorage.getItem("mode"))
  } else if (
    e.target.tagName === "IMG" &&
    e.target.src.includes("/images/icon-sun.svg")
  ) {
    document.body.style.backgroundColor = "rgb(248, 248, 251)"

    document.body.style.color = "black"
    modeBtn.innerHTML = `<img src="./images/icon-moon.svg" alt="" srcset="">`
    const filter = document.getElementById("filter")
    // console.log(filter)
    filter.style.color = "black"
    for (
      let index = 0;
      index < JSON.parse(localStorage.getItem("userInfo")).length;
      index++
    ) {
      const block = document.getElementById(`block${index}`)
      // console.log(block)
      block.style.backgroundColor = "white"
      // console.log(e.target)
    }
  }

  // console.log(localStorage.getItem("mode"))
})
