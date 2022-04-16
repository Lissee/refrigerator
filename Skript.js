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
            document.querySelector('#Sky').style.display = 'block';
            setTimeout(() => {
                document.querySelector('#Sky').style.display = 'none';
            }, 10000)
            location.reload();
        }
    }
}, false)

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