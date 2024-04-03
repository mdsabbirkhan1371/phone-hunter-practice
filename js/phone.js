// load phone section 
const loadPhones= async (searchText,isShowAll)=>{
    const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`)
    const data = await res.json()
    const phones = data.data
    disPlayPhones(phones,isShowAll)
    
}

// display phones  section 
const disPlayPhones = (phones,isShowAll)=>{
    const phonesContainer = document.getElementById('phones-container');
    phonesContainer.textContent = '';

    // show all button default hidden and when show more than 12  show all button
    const showAllContainer = document.getElementById('button-container');
    if(phones.length>12 && !isShowAll){
        showAllContainer.classList.remove('hidden');
    }
    else{
        showAllContainer.classList.add('hidden')
    }
    
    // slice phone to display only 12 and add isShow all;
    // console.log('is show all',isShowAll)
    if(!isShowAll){
        phones= phones.slice(0,12);
    }

    

    phones.forEach(phone => {
        // console.log(phone)
        const {image,phone_name,brand,slug} = phone;
        const phoneCard = document.createElement('div');
        phoneCard.classList = `card bg-gray-100 p-4 shadow-xl`
        phoneCard.innerHTML = `
        
        <figure>
        <img src="${image}" alt="Shoes" />
        </figure>
                    <div class="card-body">
                      <h2 class="card-title">${phone_name}!</h2>
                      <p>If a dog chews shoes whose shoes does he choose?</p>
                      <div class="card-actions justify-center">
                        <button onclick="handleDetails('${slug}')" class="btn btn-primary">See Details</button>
                      </div>
                    </div>
        `
        phonesContainer.appendChild(phoneCard)
        
    });

    // add spinner
    addSpinner(false)

}

const handLeSearch =(isShowAll)=>{
    // add spinner 
    addSpinner(true)

    const searchField = document.getElementById('inputField');
    const searchText = searchField.value;

    // load phones 
    loadPhones(searchText,isShowAll)
}


// add spinner 

const addSpinner =(isLoading)=>{
    const spinner = document.getElementById('loading-spinner');
    if(isLoading){
        spinner.classList.remove('hidden')
    }
    else{
        spinner.classList.add('hidden')
    }
}

// show all function 

const seeAll =() =>{
    handLeSearch(true)
}

// see details phone hanlde  function

const handleDetails =async(id)=>{
   const res = await fetch(`https://openapi.programming-hero.com/api/phone/${id}`)
   const data = await res.json();
//    console.log(data)
   const phone = data.data;
   showDetails.showModal()

   seeDetails(phone)
}

// see details of phone
const seeDetails =(phone)=>{
console.log(phone)
const {image,brand,releaseDate,name} =phone;

    const phoneName = document.getElementById('name');
    phoneName.innerText =name;
    const deatilsContainer = document.getElementById('details-container');
    deatilsContainer.innerHTML = `
    <img class="w-50 mx-auto my-2" src="${image}"/>
    <h3>Brand: ${brand}</3>
    <p>Release Date: ${releaseDate}</p>
    <h3>Display: ${phone.mainFeatures.displaySize}</>
    <h3>Memory: ${phone.mainFeatures.memory}</>
    <h3>Chipset: ${phone.mainFeatures.chipSet}</>
    <h3>Brand: ${phone.mainFeatures.storage}</>
    
    `
}