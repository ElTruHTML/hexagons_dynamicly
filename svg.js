"use strict";

let svg = document.getElementById("headerSVG");
let svgWidth = +((getComputedStyle(svg).width).replace("px", ""));
let svgHeight = +((getComputedStyle(svg).height).replace("px", ""));
console.log(svgWidth);
console.log(svgHeight);

let originalStartX = 30;
let originalStartY = 200;
let startX = originalStartX;
let startY = originalStartY;

let rowAlign = "bot";
let firstStartX = true;
let firstStartY = true;

let fullWidth = 260;
let overlapX = 20;
let overlapY = 10;
let longside = 140;
let minix = 60;
let miniy = 120;


let fullHeight = miniy * 2;

let computedPathWidth = 0;
let computedPathHeight = 0;

function insertHexagon() {
    let path = document.createElementNS("http://www.w3.org/2000/svg", "path");
    path.setAttribute("class", "hexagons");
    path.setAttribute("d", computeHexagon());
    svg.append(path);
}
function computeHexagon() {
    console.log("computedPAthWidth VOR neuem Path:", computedPathWidth);
    console.warn("computedPAthHeight VOR neuem Path:", computedPathHeight);
    let hexaPath = `
    M${startX} ${startY}
    l${minix} ${miniy}
    l${longside} 0
    l${minix} -${miniy}
    l-${minix} -${miniy}
    l-${longside} 0
    l-${minix} ${miniy}`;

    computedPathWidth += fullWidth;
    if(firstStartX) {
        computedPathWidth += startX;
        firstStartX = false;
    }

    computeNextStartY();
    console.log("computedPAthWidth NACH neuem Path:", computedPathWidth);
    console.warn("computedPAthHeight NACH neuem Path:", computedPathHeight);
    return hexaPath;
}
function computeNextStartY() {
    if(rowAlign === "bot") {
        rowAlign = "top";
        startY += miniy + overlapY;
    } else {
        rowAlign = "bot";
        startY -= miniy + overlapY;
    }
}

while(computedPathHeight <= svgHeight)
{
    while(computedPathWidth <= svgWidth)
    {
        insertHexagon();
        startX += fullWidth - minix + overlapX;
    }
    computedPathHeight += fullHeight + miniy;

    if(firstStartY) {
        computedPathHeight += originalStartY - miniy + overlapY;
        firstStartY = false;
    }
    computedPathWidth = 0;
    startX = originalStartX;
    startY = originalStartY + miniy * 2 + overlapY * 2;
}

// while(computedPathWidth <= svgWidth)
// {
//     insertHexagon();
//     startX += fullWidth - minix + overlapX;
// }
// computedPathHeight += fullHeight + miniy;

// if(firstStartY) {
//     computedPathHeight += originalStartY - miniy + overlapY;
//     firstStartY = false;
// }
// computedPathWidth = 0;
// startX = originalStartX;
// startY = originalStartY + miniy * 2 + overlapY * 2;

// while(computedPathWidth <= svgWidth)
// {
//     insertHexagon();
//     startX += fullWidth - minix + overlapX;
// }