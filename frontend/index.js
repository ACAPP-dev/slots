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
    console.log('Spin Button Pressed!!')
    

    // debugger
    // selectImg1()
    spinInterval(()=>{
        setTimeout(()=>selectImg1(), 500)
        setTimeout(()=>selectImg2(), 1000)
    }, 1500, 4)

    }


function spinInterval(callback, delay, repetitions) {
    let reps = 0
    let intervalID = window.setInterval(()=>{
        callback()

        if (++reps === repetitions) {
            window.clearInterval(intervalID)
        }
    }, delay)
}

function selectImg1() {
    console.log(reel1Img)
    reel1.removeChild(reel1Img)
    reel1Img.src = 'images/bar.png'
    reel1.appendChild(reel1Img)  
}

function selectImg2() {
    console.log(reel1Img)
    reel1.removeChild(reel1Img)
    reel1Img.src = 'images/seven.png'
    reel1.appendChild(reel1Img)
}