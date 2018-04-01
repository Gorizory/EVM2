const Board = require('./board');

const matrixAdj = {
    v0: {v0: 0, v1: 0, v2: 0, v3: 0, v4: 2, v5: 1, v6: 0, v7: 4, v8: 0, v9: 0, v10: 0, v11: 2, v12: 1, v13: 0, v14: 4, v15: 0, v16: 1, v17: 3, v18: 1, v19: 0, v20: 0, v21: 4, v22: 0, v23: 1, v24: 0, v25: 4, v26: 0, v27: 1, v28: 4, v29: 1},
    v1: {v0: 0, v1: 0, v2: 1, v3: 4, v4: 0, v5: 2, v6: 0, v7: 0, v8: 0, v9: 1, v10: 0, v11: 0, v12: 3, v13: 3, v14: 3, v15: 2, v16: 0, v17: 1, v18: 1, v19: 4, v20: 4, v21: 0, v22: 0, v23: 0, v24: 0, v25: 2, v26: 4, v27: 0, v28: 0, v29: 0},
    v2: {v0: 0, v1: 1, v2: 0, v3: 0, v4: 0, v5: 4, v6: 1, v7: 0, v8: 0, v9: 3, v10: 3, v11: 4, v12: 0, v13: 2, v14: 0, v15: 3, v16: 3, v17: 0, v18: 0, v19: 1, v20: 1, v21: 0, v22: 3, v23: 4, v24: 1, v25: 1, v26: 1, v27: 0, v28: 0, v29: 0},
    v3: {v0: 0, v1: 4, v2: 0, v3: 0, v4: 3, v5: 0, v6: 1, v7: 1, v8: 0, v9: 2, v10: 0, v11: 0, v12: 0, v13: 1, v14: 0, v15: 4, v16: 2, v17: 0, v18: 2, v19: 0, v20: 0, v21: 2, v22: 3, v23: 0, v24: 2, v25: 0, v26: 0, v27: 2, v28: 0, v29: 4},
    v4: {v0: 2, v1: 0, v2: 0, v3: 3, v4: 0, v5: 0, v6: 1, v7: 0, v8: 0, v9: 0, v10: 2, v11: 0, v12: 0, v13: 2, v14: 1, v15: 0, v16: 3, v17: 3, v18: 0, v19: 0, v20: 3, v21: 0, v22: 4, v23: 0, v24: 2, v25: 1, v26: 0, v27: 2, v28: 0, v29: 0},
    v5: {v0: 1, v1: 2, v2: 4, v3: 0, v4: 0, v5: 0, v6: 2, v7: 0, v8: 0, v9: 1, v10: 4, v11: 1, v12: 3, v13: 1, v14: 2, v15: 4, v16: 0, v17: 0, v18: 0, v19: 0, v20: 1, v21: 0, v22: 0, v23: 0, v24: 1, v25: 1, v26: 4, v27: 0, v28: 0, v29: 2},
    v6: {v0: 0, v1: 0, v2: 1, v3: 1, v4: 1, v5: 2, v6: 0, v7: 1, v8: 1, v9: 3, v10: 4, v11: 0, v12: 0, v13: 4, v14: 2, v15: 0, v16: 1, v17: 4, v18: 3, v19: 4, v20: 0, v21: 0, v22: 4, v23: 0, v24: 0, v25: 4, v26: 0, v27: 1, v28: 0, v29: 4},
    v7: {v0: 4, v1: 0, v2: 0, v3: 1, v4: 0, v5: 0, v6: 1, v7: 0, v8: 1, v9: 0, v10: 0, v11: 3, v12: 1, v13: 1, v14: 3, v15: 0, v16: 0, v17: 4, v18: 1, v19: 3, v20: 4, v21: 0, v22: 0, v23: 0, v24: 2, v25: 4, v26: 4, v27: 3, v28: 3, v29: 0},
    v8: {v0: 0, v1: 0, v2: 0, v3: 0, v4: 0, v5: 0, v6: 1, v7: 1, v8: 0, v9: 2, v10: 0, v11: 0, v12: 3, v13: 0, v14: 0, v15: 0, v16: 3, v17: 4, v18: 0, v19: 0, v20: 1, v21: 0, v22: 2, v23: 3, v24: 0, v25: 3, v26: 4, v27: 1, v28: 0, v29: 0},
    v9: {v0: 0, v1: 1, v2: 3, v3: 2, v4: 0, v5: 1, v6: 3, v7: 0, v8: 2, v9: 0, v10: 1, v11: 0, v12: 0, v13: 0, v14: 4, v15: 0, v16: 1, v17: 0, v18: 3, v19: 1, v20: 2, v21: 0, v22: 0, v23: 0, v24: 2, v25: 3, v26: 2, v27: 0, v28: 4, v29: 4},
    v10: {v0: 0, v1: 0, v2: 3, v3: 0, v4: 2, v5: 4, v6: 4, v7: 0, v8: 0, v9: 1, v10: 0, v11: 2, v12: 0, v13: 2, v14: 0, v15: 0, v16: 0, v17: 0, v18: 1, v19: 0, v20: 0, v21: 0, v22: 3, v23: 0, v24: 0, v25: 1, v26: 0, v27: 0, v28: 2, v29: 0},
    v11: {v0: 2, v1: 0, v2: 4, v3: 0, v4: 0, v5: 1, v6: 0, v7: 3, v8: 0, v9: 0, v10: 2, v11: 0, v12: 1, v13: 4, v14: 0, v15: 1, v16: 0, v17: 3, v18: 1, v19: 4, v20: 1, v21: 1, v22: 1, v23: 4, v24: 0, v25: 4, v26: 0, v27: 0, v28: 0, v29: 0},
    v12: {v0: 1, v1: 3, v2: 0, v3: 0, v4: 0, v5: 3, v6: 0, v7: 1, v8: 3, v9: 0, v10: 0, v11: 1, v12: 0, v13: 0, v14: 0, v15: 3, v16: 0, v17: 0, v18: 3, v19: 0, v20: 1, v21: 0, v22: 0, v23: 0, v24: 2, v25: 1, v26: 4, v27: 4, v28: 0, v29: 1},
    v13: {v0: 0, v1: 3, v2: 2, v3: 1, v4: 2, v5: 1, v6: 4, v7: 1, v8: 0, v9: 0, v10: 2, v11: 4, v12: 0, v13: 0, v14: 4, v15: 0, v16: 0, v17: 1, v18: 0, v19: 0, v20: 3, v21: 3, v22: 3, v23: 3, v24: 0, v25: 0, v26: 0, v27: 0, v28: 1, v29: 0},
    v14: {v0: 4, v1: 3, v2: 0, v3: 0, v4: 1, v5: 2, v6: 2, v7: 3, v8: 0, v9: 4, v10: 0, v11: 0, v12: 0, v13: 4, v14: 0, v15: 0, v16: 1, v17: 3, v18: 0, v19: 0, v20: 4, v21: 3, v22: 0, v23: 2, v24: 4, v25: 3, v26: 0, v27: 2, v28: 0, v29: 0},
    v15: {v0: 0, v1: 2, v2: 3, v3: 4, v4: 0, v5: 4, v6: 0, v7: 0, v8: 0, v9: 0, v10: 0, v11: 1, v12: 3, v13: 0, v14: 0, v15: 0, v16: 2, v17: 0, v18: 0, v19: 0, v20: 1, v21: 0, v22: 2, v23: 0, v24: 0, v25: 1, v26: 2, v27: 0, v28: 1, v29: 3},
    v16: {v0: 1, v1: 0, v2: 3, v3: 2, v4: 3, v5: 0, v6: 1, v7: 0, v8: 3, v9: 1, v10: 0, v11: 0, v12: 0, v13: 0, v14: 1, v15: 2, v16: 0, v17: 3, v18: 2, v19: 3, v20: 2, v21: 0, v22: 0, v23: 0, v24: 0, v25: 2, v26: 4, v27: 3, v28: 0, v29: 0},
    v17: {v0: 3, v1: 1, v2: 0, v3: 0, v4: 3, v5: 0, v6: 4, v7: 4, v8: 4, v9: 0, v10: 0, v11: 3, v12: 0, v13: 1, v14: 3, v15: 0, v16: 3, v17: 0, v18: 0, v19: 1, v20: 0, v21: 0, v22: 1, v23: 2, v24: 3, v25: 0, v26: 2, v27: 0, v28: 0, v29: 0},
    v18: {v0: 1, v1: 1, v2: 0, v3: 2, v4: 0, v5: 0, v6: 3, v7: 1, v8: 0, v9: 3, v10: 1, v11: 1, v12: 3, v13: 0, v14: 0, v15: 0, v16: 2, v17: 0, v18: 0, v19: 0, v20: 0, v21: 0, v22: 0, v23: 0, v24: 0, v25: 3, v26: 4, v27: 0, v28: 0, v29: 0},
    v19: {v0: 0, v1: 4, v2: 1, v3: 0, v4: 0, v5: 0, v6: 4, v7: 3, v8: 0, v9: 1, v10: 0, v11: 4, v12: 0, v13: 0, v14: 0, v15: 0, v16: 3, v17: 1, v18: 0, v19: 0, v20: 0, v21: 0, v22: 0, v23: 0, v24: 0, v25: 3, v26: 4, v27: 0, v28: 3, v29: 0},
    v20: {v0: 0, v1: 4, v2: 1, v3: 0, v4: 3, v5: 1, v6: 0, v7: 4, v8: 1, v9: 2, v10: 0, v11: 1, v12: 1, v13: 3, v14: 4, v15: 1, v16: 2, v17: 0, v18: 0, v19: 0, v20: 0, v21: 0, v22: 0, v23: 2, v24: 4, v25: 0, v26: 0, v27: 1, v28: 0, v29: 0},
    v21: {v0: 4, v1: 0, v2: 0, v3: 2, v4: 0, v5: 0, v6: 0, v7: 0, v8: 0, v9: 0, v10: 0, v11: 1, v12: 0, v13: 3, v14: 3, v15: 0, v16: 0, v17: 0, v18: 0, v19: 0, v20: 0, v21: 0, v22: 0, v23: 2, v24: 0, v25: 2, v26: 3, v27: 2, v28: 0, v29: 3},
    v22: {v0: 0, v1: 0, v2: 3, v3: 3, v4: 4, v5: 0, v6: 4, v7: 0, v8: 2, v9: 0, v10: 3, v11: 1, v12: 0, v13: 3, v14: 0, v15: 2, v16: 0, v17: 1, v18: 0, v19: 0, v20: 0, v21: 0, v22: 0, v23: 0, v24: 1, v25: 2, v26: 0, v27: 1, v28: 3, v29: 0},
    v23: {v0: 1, v1: 0, v2: 4, v3: 0, v4: 0, v5: 0, v6: 0, v7: 0, v8: 3, v9: 0, v10: 0, v11: 4, v12: 0, v13: 3, v14: 2, v15: 0, v16: 0, v17: 2, v18: 0, v19: 0, v20: 2, v21: 2, v22: 0, v23: 0, v24: 4, v25: 0, v26: 0, v27: 0, v28: 2, v29: 1},
    v24: {v0: 0, v1: 0, v2: 1, v3: 2, v4: 2, v5: 1, v6: 0, v7: 2, v8: 0, v9: 2, v10: 0, v11: 0, v12: 2, v13: 0, v14: 4, v15: 0, v16: 0, v17: 3, v18: 0, v19: 0, v20: 4, v21: 0, v22: 1, v23: 4, v24: 0, v25: 0, v26: 2, v27: 0, v28: 2, v29: 3},
    v25: {v0: 4, v1: 2, v2: 1, v3: 0, v4: 1, v5: 1, v6: 4, v7: 4, v8: 3, v9: 3, v10: 1, v11: 4, v12: 1, v13: 0, v14: 3, v15: 1, v16: 2, v17: 0, v18: 3, v19: 3, v20: 0, v21: 2, v22: 2, v23: 0, v24: 0, v25: 0, v26: 0, v27: 4, v28: 0, v29: 4},
    v26: {v0: 0, v1: 4, v2: 1, v3: 0, v4: 0, v5: 4, v6: 0, v7: 4, v8: 4, v9: 2, v10: 0, v11: 0, v12: 4, v13: 0, v14: 0, v15: 2, v16: 4, v17: 2, v18: 4, v19: 4, v20: 0, v21: 3, v22: 0, v23: 0, v24: 2, v25: 0, v26: 0, v27: 0, v28: 3, v29: 2},
    v27: {v0: 1, v1: 0, v2: 0, v3: 2, v4: 2, v5: 0, v6: 1, v7: 3, v8: 1, v9: 0, v10: 0, v11: 0, v12: 4, v13: 0, v14: 2, v15: 0, v16: 3, v17: 0, v18: 0, v19: 0, v20: 1, v21: 2, v22: 1, v23: 0, v24: 0, v25: 4, v26: 0, v27: 0, v28: 1, v29: 3},
    v28: {v0: 4, v1: 0, v2: 0, v3: 0, v4: 0, v5: 0, v6: 0, v7: 3, v8: 0, v9: 4, v10: 2, v11: 0, v12: 0, v13: 1, v14: 0, v15: 1, v16: 0, v17: 0, v18: 0, v19: 3, v20: 0, v21: 0, v22: 3, v23: 2, v24: 2, v25: 0, v26: 3, v27: 1, v28: 0, v29: 0},
    v29: {v0: 1, v1: 0, v2: 0, v3: 4, v4: 0, v5: 2, v6: 4, v7: 0, v8: 0, v9: 4, v10: 0, v11: 0, v12: 1, v13: 0, v14: 0, v15: 3, v16: 0, v17: 0, v18: 0, v19: 0, v20: 0, v21: 3, v22: 0, v23: 1, v24: 3, v25: 4, v26: 2, v27: 3, v28: 0, v29: 0},
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
    console.log('Итерационный ход');

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
