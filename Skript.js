const SIZE = 4;
document.querySelector('.puzzles').style.gridTemplate = `repeat(${SIZE}, 1fr) / repeat(${SIZE}, 1fr)`

function createGrid() {
    let grid = document.querySelector('.puzzles');

    for (let i = 0; i < SIZE; i++) {
        for (let j = 0; j < SIZE; j++) {
            let puzzle = document.createElement("div");
            puzzle.classList.add('puzzle');
            puzzle.setAttribute("data-col", '' + j);
            puzzle.setAttribute("data-row", '' + i);

            if (Math.floor(Math.random() * 2) === 1) {
                puzzle.classList.add('horizontal');
            } else {
                puzzle.classList.add('vertical');
            }
            grid.appendChild(puzzle);
        }
    }
}

// поворот вентилей
window.addEventListener("click", (e) => {
    let target = e.target;
    if (target.className === 'puzzle horizontal' || e.target.className === 'puzzle vertical') {
        let row = target.getAttribute('data-row');
        let col = target.getAttribute('data-col');

        for (let i = 0; i < SIZE; i++)  {
            rotate(document.querySelector('[data-col="' + i + '"][data-row="' + row + '"]'));
        }

        for (let j = 0; j < SIZE; j++) {
            rotate(document.querySelector('[data-col="' + col + '"][data-row="' + j + '"]'));
        }

        rotate(target);

        // конец игры
        if (document.querySelectorAll('.horizontal').length === 0 || document.querySelectorAll('.vertical').length === 0) {
            setTimeout(() => {
                let arr = document.querySelectorAll('.puzzles');
                for (let i = 0; i < 16; i++) {
                    arr[i].style.setProperty("transform", "translatex(calc(100vw - 150px)");
                }
                setTimeout(() => {
                    document.querySelector(".puzzles").innerHTML = '';
                    let puzzle = document.createElement("div");
                    puzzle.classList.add('restartPuzzle');
                    puzzle.classList.add('foreverPuzzle');

                    let button = document.createElement("button");
                    button.textContent = "restart";
                    button.onclick = restart;
                    document.querySelector('.puzzles').appendChild(puzzle);
                    document.querySelector('.puzzles').appendChild(button);
                }, 500);
            }, 500);
        }
    }
}, false)

function restart () {
    const clear = document.querySelector(".puzzles");
    clear.innerHTML = '';
    setTimeout(() => {
        document.querySelector('#Sky').style.display = 'block';
    }, 1000)
    document.querySelector('#Sky').style.display = 'none';
    createGrid();
}

function rotate(element) {
    if (element.className === 'puzzle horizontal') {
        element.classList.remove('horizontal');
        element.classList.add('vertical');
    } else {
        element.classList.remove('vertical');
        element.classList.add('horizontal');
    }
}

createGrid();