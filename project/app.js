let UemailEl = document.getElementById("emailUs");
let UpassEl = document.getElementById("passwordUs");
let UnameEl = document.getElementById("username");
let phoneEl = document.getElementById("phone");
let UcountryEl = document.getElementById("countryUs");
let UcityEl = document.getElementById("cityUs");


let RemailEl = document.getElementById("emailRes");
let RcountryEl = document.getElementById("countryRes");
let RcityEl = document.getElementById("cityRes");
let RpassEl = document.getElementById("passwordRes");
let RnameEl = document.getElementById("restName");



let userEmail;
let userPass;

let resEmail;
let resPass;


let storage = firebase.storage();
let auth = firebase.auth();
let db = firebase.firestore();

let UID;
let RID;

async function createUserAccount(){
  userEmail = UemailEl.value;
  userPass = UpassEl.value;
 let userCredential = await firebase.auth().createUserWithEmailAndPassword(userEmail, userPass)
  UID = userCredential.user.uid;
  await db.collection("user").doc(UID).set({
        username : UnameEl.value,
        city : UcityEl.value,
        country : UcountryEl.value,
        phone : phoneEl.value,
        email : UemailEl.value,
        uid : UID
      });
      window.location.href = "userHome.html";
    
}

async function createResAccount(){
  resEmail = RemailEl.value;
  resPass = RpassEl.value;
  
   let userCredential = await firebase.auth().createUserWithEmailAndPassword(resEmail, resPass)
   UID = userCredential.user.uid;
   await db.collection("Resturaunt").doc(UID).set({
         Resturaunt : RnameEl.value,
         city : RcityEl.value,
         country : RcountryEl.value,
         email : RemailEl.value,
         uid : UID,
         role : "resturaunt"
       });
       window.location.href = "sellerHome.html";
  
}
async function login(){
  let emailEl = document.getElementById('email');
  let passEl = document.getElementById('pass');

  await firebase.auth().signInWithEmailAndPassword(emailEl.value, passEl.value)
    
  let roleVal = giveCheckedRadio()
  if (roleVal === "customer"){
    window.location.href = "userHome.html";
  }
  else if(roleVal === "resturaunt"){
    window.location.href = "sellerHome.html";
  }
}

function logout(){
 auth.signOut();
 window.location = "login.html";
}
let uid;
firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    uid = user.uid;
  } else {
  }
});

let roleEl = document.getElementsByName('role');
function giveCheckedRadio() {
  let checkedProp;
  for (var i = 0; i < roleEl.length; i++) {
      if (roleEl[i].checked) {
          checkedProp = roleEl[i].value;
      }
  }
  return checkedProp;
}

let dNameEl = document.getElementById('Dname');
let dpriceEl = document.getElementById('Dprice');
let dd = document.getElementById('Dfee');
let catEl = document.getElementById('cat');
let imageEl = document.getElementById('dp');
let picOfDish;
let url;

firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    var uid = user.uid;
    console.log(uid)
  } 
  else {
    console.log("No User")
  }
})


async function setDish(){
  let file = imageEl.files[0];
  let dishPicRef = firebase.storage().ref().child("images/" + file.name);
  await dishPicRef.put(file)
  url= await dishPicRef.getDownloadURL();
//  let userID = firebase.auth().currentUser;
  resName = await db.collection("Resturaunt").doc(uid).get();
  Rname = resName.data().Resturaunt;
  // resName = resName.forEach((data)=>{
  //   return data.data().Resturaunt
  // })
  

  await db.collection("Products").add({
      dishName : dNameEl.value,
      dishPrice : dpriceEl.value,
      deliveryFee : dd.value,
      category : catEl.value,
      pic : url,
      ID:uid,
      name : Rname
      // Resturaunt : Rname
    });
    // console.log(uSer)
    alert("Successfully added!")
}



        
async function getDishesUser(){        
  let dishes = await db.collection('Products').get();
  dishes.forEach(function(dataname){
    document.getElementById('cards').innerHTML += `
    <div class="col">
    <div class="card shadow">
    <img src="${dataname.data().pic}" class="card-img-top" alt="..." width="100" height="200">
    <div class="card-body">
    <h3 class="card-title">${dataname.data().name}</h3>
    <h5 class="card-title">${dataname.data().dishName}</h5>
    <p style="color: green;">Rs. ${dataname.data().dishPrice}</p>
    <p style="color: green;">Delivery : ${dataname.data().deliveryFee}</p>
    <button class = "btn btn-success" onclick = "buyNow(e)">Order</button>
    
    </div>
    </div>
    </div>`
  })
}


async function getDishesChi(){        
  let dishes = await db.collection('Products').get();
  dishes.forEach(function(dataname){
    if(dataname.data().category === "chinese" ){
      document.getElementById('cards').innerHTML += `
      <div class="col">
      <div class="card shadow">
      <img src="${dataname.data().pic}" class="card-img-top" alt="..." width="100" height="200">
      <div class="card-body">
      <h3 class="card-title">${dataname.data().name}</h3>
      <h5 class="card-title">${dataname.data().dishName}</h5>
      <p style="color: green;">Rs. ${dataname.data().dishPrice}</p>
      <p style="color: green;">Delivery : ${dataname.data().deliveryFee}</p>
      <button class = "btn btn-success" onclick = "buyNow(e)">Order</button>
      
      </div>
      </div>
      </div>`
    }
  })
}
async function getDishesDesi(){        
  let dishes = await db.collection('Products').get();
  dishes.forEach(function(dataname){
    if(dataname.data().category === "Desi" ){
      document.getElementById('cards').innerHTML += `
      <div class="col">
      <div class="card shadow">
      <img src="${dataname.data().pic}" class="card-img-top" alt="..." width="100" height="200">
      <div class="card-body">
      <h3 class="card-title">${dataname.data().name}</h3>
      <h5 class="card-title">${dataname.data().dishName}</h5>
      <p style="color: green;">Rs. ${dataname.data().dishPrice}</p>
      <p style="color: green;">Delivery : ${dataname.data().deliveryFee}</p>
      <button class = "btn btn-success" onclick = "buyNow(e)">Order</button>
      
      </div>
      </div>
      </div>`
    }
  })
}
async function getDishesBBQ(){        
  let dishes = await db.collection('Products').get();
  dishes.forEach(function(dataname){
    if(dataname.data().category === "BBQ" ){
      document.getElementById('cards').innerHTML += `
      <div class="col">
      <div class="card shadow">
      <img src="${dataname.data().pic}" class="card-img-top" alt="..." width="100" height="200">
      <div class="card-body">
      <h3 class="card-title">${dataname.data().name}</h3>
      <h5 class="card-title">${dataname.data().dishName}</h5>
      <p style="color: green;">Rs. ${dataname.data().dishPrice}</p>
      <p style="color: green;">Delivery : ${dataname.data().deliveryFee}</p>
      <button class = "btn btn-success" onclick = "buyNow(e)">Order</button>
      
      </div>
      </div>
      </div>`
    }
  })
}
async function getDishesFF(){        
  let dishes = await db.collection('Products').get();
  dishes.forEach(function(dataname){
    if(dataname.data().category === "fastFood" ){
      document.getElementById('cards').innerHTML += `
      <div class="col">
      <div class="card shadow">
      <img src="${dataname.data().pic}" class="card-img-top" alt="..." width="100" height="200">
      <div class="card-body">
      <h3 class="card-title">${dataname.data().name}</h3>
      <h5 class="card-title">${dataname.data().dishName}</h5>
      <p style="color: green;">Rs. ${dataname.data().dishPrice}</p>
      <p style="color: green;">Delivery : ${dataname.data().deliveryFee}</p>
      <button class = "btn btn-success" onclick = "buyNow(e)">Order</button>
      
      </div>
      </div>
      </div>`
    }
  })
}

async function getDishesFreeD(){        
  let dishes = await db.collection('Products').get();
  dishes.forEach(function(dataname){
    if(dataname.data().deliveryFee === "free" ){
      document.getElementById('cards').innerHTML += `
      <div class="col">
      <div class="card shadow">
      <img src="${dataname.data().pic}" class="card-img-top" alt="..." width="100" height="200">
      <div class="card-body">
      <h3 class="card-title">${dataname.data().name}</h3>
      <h5 class="card-title">${dataname.data().dishName}</h5>
      <p style="color: green;">Rs. ${dataname.data().dishPrice}</p>
      <p style="color: green;">Delivery : ${dataname.data().deliveryFee}</p>
      <button class = "btn btn-success" onclick = "buyNow(e)">Order</button>
      
      </div>
      </div>
      </div>`
    }
  })
}


async function getDishes(){
  
  let dishes = await db.collection('Products').get();
  dishes.forEach(function(dataname){
    if(dataname.data().ID == uid){
      document.getElementById('cards').innerHTML += `
      <div class="col">
      <div class="card shadow">
      <img src="${dataname.data().pic}" class="card-img-top" alt="..." width="100" height="200">
      <div class="card-body" id = "n">
      <h5 class="card-title">${dataname.data().dishName}</h5>
      <p style="color: green;">Rs. ${dataname.data().dishPrice}</p>
      <p style="color: green;">Delivery : ${dataname.data().deliveryFee}</p>
      <button class = "btn btn-danger del" id = ${dataname.data().ID} onclick = "delItem(this)">Delete Item</button>
      </div>
      </div>
      </div>`
    }
  })
}

function customer(){
  window.location = "signupuser.html"
}

function resturaunt(){
  window.location = "signuprest.html"
}


async function delItem(e){
let itemToDel = e.parentNode.parentNode.parentNode;
let itemID = e.id
let itemName = e.parentNode.children[0].innerHTML
console.log(itemName)
document.getElementById("cards").removeChild(itemToDel)
// let deleted = db.collection('Products').doc(itemID).delete()

// console.log(itemName.children[0].innerHTML)
}

function buyNow(e){

  let productID = e.id
  let productResName = e.parentNode.children[0].innerHTML
  let productName = e.parentNode.children[1].innerHTML
  let productPrice = e.parentNode.children[2].innerHTML
  let productDF = e.parentNode.children[3].innerHTML
  
console.log(productID,productName,productResName,productPrice,productDF)
}