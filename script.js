function cubicEquation() {
    const a = +document.getElementById("a-cubic").value;
    const b = +document.getElementById("b-cubic").value;
    const c = +document.getElementById("c-cubic").value;
    const d = +document.getElementById("d-cubic").value;

    const w = -b / (3 * a);
    const p = (3 * a * (w**2) + 2 * b * w + c) / a;
    const q = (a * (w**3) + b * (w**2) + c * w + d) / a;

    const D = (q**2) / 4 + (p**3) / 27;

    let x1 = "x1 = ";
    let x2 = "x2 = ";
    let x3 = "x3 = ";
    let output;

    if(D == 0) {
        x1 += w - 2 * Math.cbrt(q / 2);
        x2 += x3;
        x2 += w + 2 * Math.cbrt(q / 2); 
        
        output = x1 + "\n" + x2;
    }
    else if(D > 0) {
        const u = Math.cbrt(-q / 2 + Math.sqrt(D));
        const v = Math.cbrt(-q / 2 - Math.sqrt(D));

        x1 += u + v + w;

        output = x1;
    }
    else {
        const f = Math.acos(3 * q / (2 * p * Math.sqrt(-p / 3)));

        x1 += w + 2 * Math.sqrt(-p / 3) * Math.cos(f / 3);
        x2 += w + 2 * Math.sqrt(-p / 3) * Math.cos(f / 3 + 2 * Math.PI / 3);
        x3 += w + 2 * Math.sqrt(-p / 3) * Math.cos(f / 3 + 4 * Math.PI / 3);

        output = x1 + "\n" + x2 + "\n" + x3;
    }

    document.getElementById("output-cubic").innerText = output;
}

function eratosnesSieve() {
    const input = +document.getElementById("prime-number-input").value;

    const arr = [];

    for(let i = 3; i < input; i += 2){
        arr.push(i);
    }

    for(let i = 0; i < arr.length; i++){
        for(let j = i + 1; j < arr.length; j++){
            if(arr[j] != 0 && arr[j] % arr[i] == 0){
                arr[j] = 0;
            }
        }
    }

    let result = [];

    for(let i = 0; i < arr.length - 5; i++){
        if(arr[i + 2] != 0) continue;
        if(arr[i] && arr[i + 1] && arr[i + 3] && arr[i + 4]){
            result.push([arr[i], arr[i + 1], arr[i + 3], arr[i + 4]].join(", "));
        }
    }

    document.getElementById("output-prime").innerText = result.join("\n");
}

function quinticEquation() {
    let aInput = document.getElementById("a-quintic").value;
    const a = aInput ? aInput : 1;
    const b = +document.getElementById("b-quintic").value;
    const c = +document.getElementById("c-quintic").value;
    const d = +document.getElementById("d-quintic").value;
    const e = +document.getElementById("e-quintic").value;
    const f = +document.getElementById("f-quintic").value;

    const min = +document.getElementById("min-quintic").value;
    const max = +document.getElementById("max-quintic").value;
    const step = +document.getElementById("step-quintic").value;
    const precision = +document.getElementById("precision-quintic").value;

    const roots = [];
    let f1 = solveQuinticEquation(min, a, b, c, d, e, f);

    for(let i = min + step; i <= max; i += step) {
        const f2 = solveQuinticEquation(i, a, b, c, d, e, f);
        if(f2 == 0) {
            roots.push(i);
        }
        if(f1 * f2 < 0){
            let from = f1;
            let to = f2;
            let idxFrom = i - step;
            let idxTo = i;
            while(true) {
                let avgIdx = (idxFrom + idxTo) / 2;

                let fun = solveQuinticEquation(avgIdx, a, b, c, d, e, f);

                if(Math.abs(fun) < precision) {
                    roots.push(avgIdx);
                    break;
                }

                if(from * fun < 0) {
                    to = fun;
                    idxTo = avgIdx;
                }
                else if (fun * to < 0) {
                    from = fun;
                    idxFrom = avgIdx;
                }
                else {
                    roots.push(avgIdx);
                    break;
                }
            }
        }
        f1 = f2;
    }

    document.getElementById("output-quintic").innerText = roots.join(" ");
}

function solveQuinticEquation (x, a, b, c, d, e, f) {
    return a * x**5 + b * x**4 + c * x**3 + d * x**2 + e * x + f;
}


function monteCarlo() {
    const precision = +document.getElementById("monte-carlo-input").value;

    //current functions properties:
    const a = 0;
    const b = 2 * Math.PI;
    const h = 3;

    let countAbove1 = 0;
    let countBelow1 = 0;    

    while(true) {
        //console.log('e = ' + precision);
        let countAbove2 = countAbove1;
        let countBelow2 = countBelow1;

        const x = getRandomArbitrary(a, b);
        const y = getRandomArbitrary(0, h);

        if(y > solveExampleFunction(x)) {
            countAbove1++;
        }
        else if(y < solveExampleFunction(x)) {
            countBelow1++;
        }

        const integral1 = countIntegral(a, b, h, countAbove1, countBelow1);
        const integral2 = countIntegral(a, b, h, countAbove2, countBelow2);

        if((Math.abs(Math.abs(integral2) - Math.abs(integral1)) < precision) && (integral1 != 0) && (integral2 != 0)) {
            document.getElementById("output-monte-carlo").innerText = integral2;
            break;
        }
    }
}

function getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
}

function solveExampleFunction(x) {
    return Math.sin(x) + Math.sin(2 * x) + Math.sin(4 * x);
}

function countIntegral(a, b, h, l1, l2) {
    return (b - a) * h * l2 / (l1 + l2);
}
