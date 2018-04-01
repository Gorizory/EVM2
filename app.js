const Board = require('./board');

const matrixAdj = {
    v0: {v0: 0, v1: 0, v2: 0, v3: 3, v4: 0, v5: 0, v6: 2, v7: 3, v8: 0},
    v1: {v0: 0, v1: 0, v2: 2, v3: 0, v4: 2, v5: 0, v6: 0, v7: 0, v8: 0},
    v2: {v0: 0, v1: 2, v2: 0, v3: 1, v4: 0, v5: 0, v6: 0, v7: 0, v8: 0},
    v3: {v0: 3, v1: 0, v2: 1, v3: 0, v4: 0, v5: 5, v6: 0, v7: 0, v8: 0},
    v4: {v0: 0, v1: 2, v2: 0, v3: 0, v4: 0, v5: 2, v6: 0, v7: 0, v8: 4},
    v5: {v0: 0, v1: 0, v2: 0, v3: 5, v4: 2, v5: 0, v6: 5, v7: 0, v8: 0},
    v6: {v0: 2, v1: 0, v2: 0, v3: 0, v4: 0, v5: 5, v6: 0, v7: 6, v8: 2},
    v7: {v0: 3, v1: 0, v2: 0, v3: 0, v4: 0, v5: 0, v6: 6, v7: 0, v8: 0},
    v8: {v0: 0, v1: 0, v2: 0, v3: 0, v4: 4, v5: 0, v6: 2, v7: 0, v8: 0},
};

const board = new Board(matrixAdj);

function countRo() {
    const ro = {};
    for (const rowId in matrixAdj) {
        let sum = 0;
        for (const colId in matrixAdj[rowId]) {
            sum += matrixAdj[rowId][colId];
        }
        ro[rowId] = sum;
    }
    return ro;
}

function countK(ro, usedGroups) {
    const k = {};

    for (const rowId in matrixAdj) {
        if (usedGroups.indexOf(rowId) < 0) {
            let roPlaced = 0;
            usedGroups.forEach(colId => {
                roPlaced += matrixAdj[rowId][colId];
            });
            k[rowId] = 2 * roPlaced - ro[rowId];
        }
    }

    return k;
}

function countQ() {
    let sum = 0;
    for (const rowId in matrixAdj) {
        for (const colId in matrixAdj) {
            sum += matrixAdj[rowId][colId] * board.findDist(board.matchVtoT(rowId), board.matchVtoT(colId));
        }
    }
    return sum / 2;
}

function continuousAlg() {
    console.log('Последовательный ход');

    const usedGroups = ['v0'];

    const ro = countRo();

    while (usedGroups.length < Object.keys(matrixAdj).length) {
        const k = countK(ro, usedGroups);
        const leastV = [];

        let max = -9999;
        for (const vId in k) {
            if (k[vId] > max) {
                max = k[vId];
            }
        }

        for (const vId in k) {
            if (k[vId] === max) {
                leastV.push(vId);
            }
        }

        leastV.forEach(vId => {
            board.setT(vId, board.findClosest(usedGroups));
        });

        leastV.forEach(vId => {
            usedGroups.push(vId);
        });
    }
    console.log(board._board);
    console.log(`Q = ${countQ()}`);
}

function countL(ro) {
    const l = {};

    for (const rowId in matrixAdj) {
        let sum = 0;

        for (const colId in matrixAdj) {
            sum += matrixAdj[rowId][colId] * board.findDist(board.matchVtoT(rowId), board.matchVtoT(colId));
        }

        l[rowId] = sum / ro[rowId];
    }

    return l;
}

function iterationAlg() {
    console.log('Последовательный ход');

    const ro = countRo();

    let iteration = 1;
    let exitFlag = false;

    while (!exitFlag) {
        let max = 0;
        let maxV = 'v0';

        const l = countL(ro);
        for (const lVId in l) {
            if (l[lVId] > max) {
                max = l[lVId];
                maxV = lVId;
            }
        }

        let sumX = 0;
        let sumY = 0;
        for (const colId in matrixAdj) {
            sumX += matrixAdj[maxV][colId] * board.getStatsV(colId).x;
            sumY += matrixAdj[maxV][colId] * board.getStatsV(colId).y;
        }
        const xc = sumX / ro[maxV];
        const yc = sumY / ro[maxV];

        const vToSwap = board.findTByCoordinate(xc, yc);
        let bestQ = countQ();
        let bestV = maxV;
        vToSwap.forEach(vId => {
            board.swapV(maxV, vId);
            const q = countQ();
            if (q < bestQ) {
                bestQ = q;
                bestV = vId;
            }
            board.swapV(maxV, vId);
        });

        if (bestV === maxV) {
            exitFlag = true;
        } else {
            board.swapV(maxV, bestV);
        }

        console.log(`Iteration: ${iteration}, Q: ${countQ()}`);

        iteration++;
    }
}

continuousAlg();
iterationAlg();
