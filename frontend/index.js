const container = document.getElementById('container')
const btnSpin = document.getElementById('spin')
const reel1 = document.getElementById('reel-1')
const reel1Img = reel1.querySelector('img')

const slotSeven = document.createElement('img')

slotSeven.id = 'seven'
slotSeven.src = 'images/seven.png'
console.log(slotSeven)

const slotBar = document.createElement('img')

slotBar.id = 'bar'
slotBar.src = 'images/bar.png'
console.log(slotBar)

const greeting = document.createElement('h2')
greeting.innerText = 'Hello Slot Player!'

container.appendChild(greeting)
console.log("Hello Slot Player!")

btnSpin.addEventListener('click', spin)

function spin() {
    console.log('Spin!!')
    for (let i=0; i<3; i++) {
    selectImg1()
    selectImg2()

    }
}

function selectImg1() {
    console.log(reel1Img)
    setTimeout(() => {reel1Img.src = 'images/bar.png'}, 1000)
    
   
}

function selectImg2() {
    setTimeout(() => {reel1Img.src = 'images/seven.png'}, 1000)
}