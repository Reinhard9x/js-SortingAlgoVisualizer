const canvas = document.getElementById('mycanvas')
const ctx = canvas.getContext('2d')
let array = []
let choice = 0
let state = []
let pivot = 0
let number = null



document.getElementById('mycanvas').width = 1400
document.getElementById('mycanvas').height = 700


//create array
function newarray(){
    document.getElementById("startsorting").disabled = false
    array = []
    for(let i = 0; i < 70; i++){
        number = Math.floor(Math.random()*590)+10
        for(let j = 0; j < array.length; j++){
            if(number == array[j]){
                number = Math.floor(Math.random()*590)+10
                j = -1
            }
        }
        array.push(number)
    }
    
}
newarray()

//show array in canvas
function render(){
    ctx.clearRect(0,0,canvas.width,canvas.height)
    for(let i = 0; i < array.length; i++){
            ctx.beginPath()
            ctx.fillStyle = '#AA96DA'
            if(choice == 1){
                if(array[i] == state[0] || array[i] == state[1]){
                    ctx.fillStyle = '#35155D'
                }
                    if(array[i] == pivot){
                        ctx.fillStyle = '#FF2E63'
                    }
            }
            if(choice == 2){
                if(array[i] == state[0] || array[i] == state[1]){
                    ctx.fillStyle = '#35155D'
                }
            }
            if(choice == 3){
                if(array[i] == state[0] || array[i] == state[1]){
                    ctx.fillStyle = '#35155D'
                }
            }
            if(choice == 4){
                if(array[i] == state[0] || array[i] == state[1]){
                    ctx.fillStyle = '#35155D'
                }
            }
            if(choice == 5){
                if(array[i] == state[0] || array[i] == state[1]){
                    ctx.fillStyle = '#35155D'
                }
            }
            
            ctx.rect(0+canvas.width/array.length*i,canvas.height - array[i], canvas.width/array.length, array[i])
            ctx.fill()
            ctx.strokeStyle = '#35155D'
            ctx.stroke()

        }
    state = []
    info()
}
render()

//info
function info(){
    ctx.beginPath()
    ctx.rect(0,0, 20, 20)
    ctx.fillStyle = '#35155D'
    ctx.fill()
    ctx.stroke()
            
    ctx.beginPath()
    ctx.font = 'bold 20px Arial'
    ctx.fillText('Swap elements', 25, 20)

    ctx.beginPath()
    ctx.rect(0,40, 20, 20)
    ctx.fillStyle = '#FF2E63'
    ctx.fill()
    ctx.stroke()

    ctx.beginPath()
    ctx.font = 'bold 20px Arial'
    ctx.fillText('Pivot', 25, 60)
}

//new array
document.getElementById("newarray").onclick = function (){
    array = []
    newarray()
    render()
}

//Choose or change sorting algorithm
document.getElementById('quick').onclick = function (){
    document.getElementById('h1').innerHTML = 'You have chosen Quick Sort'
    choice = 1

}
document.getElementById('merge').onclick = function (){
    document.getElementById('h1').innerHTML = 'You have chosen Merge Sort'
    choice = 2

}
document.getElementById('bubble').onclick = function (){
    document.getElementById('h1').innerHTML = 'You have chosen Bubble Sort'
    choice = 3

}
document.getElementById('bitonic').onclick = function (){
    document.getElementById('h1').innerHTML = 'You have chosen Bitonic Sort'
    choice = 4

}
document.getElementById('heap').onclick = function (){
    document.getElementById('h1').innerHTML = 'You have chosen Heap Sort'
    choice = 5

}


let overlay = document.getElementById("overlay")
toggleOverlay()
//overlay to stop clicks
function toggleOverlay(){
    overlay = document.getElementById("overlay")
    if (overlay.style.display == 'none') {
        overlay.style.display = 'block'
    }
    else{
        overlay.style.display = 'none'
    }
}

//sorting alogorithms

//quicksort
async function Startquicksort(){


    await Quicksort(0,array.length-1)
    toggleOverlay()
    async function Quicksort(start,end){
        
        if(end <= start){
            return
        }
        pivot = await partition(start,end)

        await Quicksort(start,pivot-1)
        await Quicksort(pivot+1,end)
        render()
    }
   
    async function partition(start,end){
        pivot = array[end]
        let i = start - 1
        for(let j = start; j <= end; j++){
			if(array[j] < pivot) {
				i++
				let temp = array[i]
				array[i] = array[j]
				array[j] = temp
                state.push(array[j])
                state.push(array[i])
                await sleep(30)
                render()
			}
		}
		i++
		let temp = array[i]
		array[i] = array[end]
		array[end] = temp
        state.push(temp)
        state.push(array[i])
        await sleep(30)
        render()
		return i
	} 
    state = []
    render()
}

//mergesort
async function Startmergesort(){

    await mergeSort(array, 0, array.length -1 )
    toggleOverlay()
    render()
    
    
    async function merge(arr, start, mid, end){
        let start2 = mid + 1
 
        // If the direct merge is already sorted
        if (arr[mid] <= arr[start2])  
            return
     
        // Two pointers to maintain start
        // of both arrays to merge
        while (start <= mid && start2 <= end){
             
            // If element 1 is in right place
            if (arr[start] <= arr[start2])
            {
                start++
            }
            else
            {
                state.push(array[start])
                state.push(array[start2])
                let value = arr[start2]
                let index = start2
                await sleep(30)
                render()
                state = []
                // Shift all the elements between element 1
                // element 2, right by 1.
                while (index != start)
                {
                    arr[index] = arr[index - 1]
                    index--
                }
                arr[start] = value
                await sleep(30)
                render()
                // Update all the pointers
                start++
                mid++
                start2++
                state = []
            }
        }
    }
    
 
    /* l is for left index and r is right index
    of the sub-array of arr to be sorted */
    async function mergeSort(arr, l, r){
        if (l < r){
         
        // Same as (l + r) / 2, but avoids overflow
        // for large l and r
        let m = l + Math.floor((r - l) / 2)
 
        // Sort first and second halves
        await mergeSort(arr, l, m);
        await mergeSort(arr, m + 1, r)
 
        await merge(arr, l, m, r)
        await sleep(30)
        render()
        }

    }  
}

//bubblesort
function Startbubblesort(){

    bubblesort()
    
    async function bubblesort(){
        let temp = null
        for(let j = 0; j < array.length - 1; j++){
            for(let i = 0; i < array.length - j + 1; i++){
                if(array[i] > array[i+1]){
                    state.push(array[i+2])
                    state.push(array[i])
                    temp = array[i]
                    array[i] = array[i+1]
                    array[i+1] = temp
                    await sleep(20)
                    render()
                    state = []
                }  
            }
        }
        render()
        toggleOverlay()
    }

    
}

//bitonicsort
function Startbitonicsort(){
    
    array = array.slice(5,array.length-1)
    bitonicSort()

    async function bitonicSort() {
        let n = array.length
        let k, j, l, i, temp
        for (k = 2; k <= n; k *= 2) {
            for (j = k/2; j > 0; j /= 2) {
                for (i = 0; i < n; i++) {
                    l = i ^ j
                    if (l > i) {
                        if ( ((i&k)==0) && (array[i] > array[l]) || ( ( (i&k)!=0) && (array[i] < array[l])) )  {
                            state.push(array[i])
                            state.push(array[l])
                            temp = array[i]
                            array[i] = array[l]
                            array[l] = temp
                            await sleep(60)
                            render()
                        }
                    }
                }
            }
        }
        await sleep(60)
        render()
        toggleOverlay()
    }
    render()
    
    
}

//heapsort
function Startheapsort(){

    heapSort()

    async function heapSort() {
        let size = array.length
      
        for (let i = Math.floor(size / 2 - 1); i >= 0; i--){
          await heapify(array, size, i)
        }
      
        for (let i = size - 1; i >= 0; i--) {
          state.push(array[i])
          state.push(array[0])
          let temp = array[0]
          array[0] = array[i]
          array[i] = temp
          await sleep(10)
          render()
          await heapify(array, i, 0)
          await sleep(10)
          render()
          state = []
        }
        toggleOverlay()
      }
      
      async function heapify(array, size, i) {
        let max = i
        let left = 2 * i + 1
        let right = 2 * i + 2
        
        if (left < size && array[left] > array[max])
          max = left
      
        if (right < size && array[right] > array[max])
          max = right
      
        if (max != i) {
          state.push(array[i])
          state.push(array[max])
          
          let temp = array[i]
          array[i] = array[max]
          array[max] = temp
          await sleep(90)
          render()
          await heapify(array, size, max)
          await sleep(60)
          render()
          state = []
        }
      }
    render()
}

//start the sorting
document.getElementById("startsorting").onclick = function (){
    switch(choice){
        case 1:
            document.getElementById("startsorting").disabled = true
            toggleOverlay()
            Startquicksort()
            break
        case 2:
            document.getElementById("startsorting").disabled = true
            toggleOverlay()
            Startmergesort()
            break
        case 3:
            document.getElementById("startsorting").disabled = true
            toggleOverlay()
            Startbubblesort()
            break
        case 4:
            document.getElementById("startsorting").disabled = true
            toggleOverlay()
            Startbitonicsort()
            break
        case 5:
            document.getElementById("startsorting").disabled = true
            toggleOverlay()
            Startheapsort()
            break
    }
}
//sleep
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms))
}
