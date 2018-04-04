class Board {
    constructor(matrix) {
        const maxX = 5;

        let x = 0;
        let y = 0;

        this._board = {};

        Object.keys(matrix).forEach((rowId, index) => {
            let tX;
            let tY;

            if (x <= maxX) {
                tX = x;
                tY = y;
                x++;
            } else {
                y++;
                tX = 0;
                tY = y;
                x = 1;
            }

            this._board[`t${index}`] = {
                x: tX,
                y: tY,
            };

            if (rowId === 'v0' && index === 0) {
                this._board[`t${index}`].v = rowId;
            }
        });
    }

    findDist(tStart, tEnd) {
        return (Math.abs(this._board[tEnd].x - this._board[tStart].x) + Math.abs(this._board[tEnd].y - this._board[tStart].y));
    }

    findClosest(usedGroups) {
        let min = 9999;
        let minT = 'v0';

        for (const t in this._board) {
            if (!this._board[t].v) {
                let sumDist = 0;
                for (const tUsed in this._board) {
                    if (usedGroups.indexOf(this._board[tUsed].v) >= 0) {
                        sumDist += this.findDist(t, tUsed);
                    }
                }
                if (sumDist < min) {
                    min = sumDist;
                    minT = t;
                }
            }
        }

        return minT;
    }

    matchVtoT(vId) {
        for (const t in this._board) {
            if (vId === this._board[t].v) {
                return t;
            }
        }
        return undefined;
    }

    setT(vId, tId) {
        this._board[tId].v = vId;
    }

    getStatsV(vId) {
        return this._board[this.matchVtoT(vId)];
    }

    swapV(vId1, vId2) {
        const t1 = this.matchVtoT(vId1);
        const t2 = this.matchVtoT(vId2);

        this.setT(vId1, t2);
        this.setT(vId2, t1);
    }

    findTByCoordinate(x, y) {
        const result = [];

        for (const t in this._board) {
            const xT = this._board[t].x;
            const yT = this._board[t].y;

            if (Math.abs(xT - x) < 1 && Math.abs(yT - y) < 1) {
                result.push(this._board[t].v);
            }
        }

        return result;
    }
}

module.exports = Board;
