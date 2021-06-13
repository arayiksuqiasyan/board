const board = document.getElementById("board")
const colors = ["#e74c3c", '#8e44ad', '#3498db', '#e67e22', '#2ecc71']
const B_SIZE = 20
const WIDTH = document.body.clientWidth
const HEIGHT = document.body.clientHeight
const SQUARES_NUMBER = WIDTH * HEIGHT / ((B_SIZE + 4) * (B_SIZE + 4));
let touch = false
let timeout;
let revers = true

generate()
window.addEventListener('resize', () => {
    console.log(1);
    clearTimeout(timeout)
    timeout = setTimeout(() => {
        board.innerHTML = '';
        generate()
    }, 100);
})

function generate() {
    const WIDTH = document.body.clientWidth
    const HEIGHT = document.body.clientHeight
    const B_SIZE = 40
    const SQUARES_NUMBER = WIDTH * HEIGHT / 400;

    for (let i = 0; i < SQUARES_NUMBER; i++) {
        let square = document.createElement('div')
        square.classList.add("square")
        square.style.width = B_SIZE + "px"
        square.style.height = B_SIZE + "px"
        square.addEventListener("mouseover", () => {
            setColor(square)
        })
        square.addEventListener("mouseleave", () => {
            removeColor(square)
        })
        square.addEventListener("touchmove", (e) => {
            const square = document.elementFromPoint(
                e.targetTouches[0].clientX,
                e.targetTouches[0].clientY
            )
            if (square?.classList.contains('square')) {
                setColor(square)
                setTimeout(() => {
                    removeColor(square)
                }, 1000)
            }
        })
        square.addEventListener("click", () => { onClick(i) })



        board.append(square)
    }
}

function setColor(e) {
    const color = getRandomColor()
    e.style.transition = "0s"
    e.style.backgroundColor = color
    e.style.boxShadow = ` 0 0 12px ${color}, 0 0 10px ${color}`
}
function removeColor(e) {
    e.style.transition = "2s ease"
    e.style.backgroundColor = "#1d1d1d"
    e.style.boxShadow = ` 0 0 2px #000`


}
function getRandomColor() {
    const index = Math.floor(Math.random() * colors.length)
    return colors[index]
}

function onClick(idx) {
    revers = !revers
    const squares = document.querySelectorAll(".square")
    const w = parseInt(document.body.clientWidth / (B_SIZE + 4))
    const arr = Array(parseInt(SQUARES_NUMBER)).fill(0).map((item, idx) => {
        if (revers) {

            if (idx % 2 === 0) {
                return idx
            }
            return 0
        } else {
            if (idx % 2 === 1) {
                return idx
            }
            return 0
        }
    })

    arr.forEach((item) => {
        const color = getRandomColor()

        if (squares[item]) {
            squares[item].style.backgroundColor = color
            squares[item].style.boxShadow = ` 0 0 12px ${color}, 0 0 10px ${color}`
            setTimeout(() => {
                removeColor(squares[item])
            }, 1000);
        }
    })

}