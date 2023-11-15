"use strict";

let svg = document.querySelector("svg");
let sw = svg.getBoundingClientRect().width;
let sh = svg.getBoundingClientRect().height;

//###############################DIMENSIONS OF HEXAGON's SIDES
let hexhori                 = sw / 12;
let hexh                    = hexhori * 1.5;
let hexhalfh                = hexhori * .75;
let hexw                    = hexhori * 1.8;
let hexhalfw                = hexhori * .9;
let xOffset                 = hexhori * .35;

//###############################STARTING POINT OF FIRST ROW
let rowStartX               = -50;
let rowStartY               = -10;

//###############################STARTING POINT OF NEXT HEXAGON
let startX                  = -50;
let startY                  = -10;

//###############VALUES TO ADD FOR NEXT HEXAGON's STARTPOSITION
let xStep                   = hexhori + xOffset;
let yStep                   = hexhalfh;

//######DETERMINES IF NEXT HEXAGON OF CURRENT ROW IS TOP OR BOT
let BOTSIDE                 = true;

//#VALUES TO CHECK IF HEXAGONS ALREADY FILL HEIGHT/WIDTH OF SVG
let rowWidth                = hexhori + xOffset - startX;
let additionalHexaWidth     = hexhori;

let columnHeight            = hexh + hexhalfh - startY;
let additionalHexaHeight    = hexh;

while(columnHeight <= sh + (sh * .6)) {
    console.log("Neue Row");
    renderHexaRow();
    BOTSIDE = true;
    rowWidth = hexhori + xOffset - startY;
    computeNextRowStart();
    columnHeight += additionalHexaHeight;
}

function renderHexaRow() {
    while(rowWidth <= sw + (sw * .2)) {
    renderHexagon();
    computeNextHexaStart();
    rowWidth += additionalHexaWidth;
}
}

function computeNextRowStart() {
    startX = rowStartX;
    // startY += hexh;
    if(startY < rowStartY) {
        console.error("startY of last Hexa < rowStartY");
        startY += hexh + hexhalfh;
    } else {
        console.error("startY of last Hexa >= rowStartY");
        startY += hexh;
    }
    rowStartY = startY;
    console.log("startY", startY);
    console.log("rowStartX:", rowStartY);
}

function computeNextHexaStart() {
    if(BOTSIDE) {
        startX += xStep;
        startY -= yStep;
        BOTSIDE = !BOTSIDE;
    } else {
        startX += xStep;
        startY += yStep;
        BOTSIDE = !BOTSIDE;
    }
}


function renderHexagon() {let path = document.createElementNS("http://www.w3.org/2000/svg", "path");

    console.warn("startY", startY);
    console.warn("rowStartX:", rowStartY);
    let d =
    `
    M ${startX} ${startY}

    l ${hexhori} 0

    l ${xOffset} ${hexhalfh}
    l -${xOffset} ${hexhalfh}

    l -${hexhori} 0

    l -${xOffset} -${hexhalfh}
    l ${xOffset} -${hexhalfh}

    `;

    path.setAttribute("d", d);
    path.setAttribute("stroke", "#333");
    path.setAttribute("class", "bg-hexas");
    path.setAttribute("fill", "none");
    // path.setAttribute("fill", "#151929");
    path.setAttribute("fill", "url(#rad)");
    // path.setAttribute("filter", "url(#shadow)");
    // path.setAttribute("filter", "url(#blur)");
    // path.style.filter = "url(#shadow)";


    // path.addEventListener("mouseenter", e => {
    //     let newD =
    //     `
    //     M ${startX + 10} ${startY + 10}
    
    //     l ${hexhori -20} 0
    
    //     l ${xOffset -10} ${hexhalfh -10}
    //     l -${xOffset -10} ${hexhalfh -10}
    
    //     l -${hexhori -20} 0
    
    //     l -${xOffset -10} -${hexhalfh -10}
    //     l ${xOffset -10} -${hexhalfh -10}
    
    //     `;
    //     e.target.setAttribute("d", newD);
    // });
    // path.addEventListener("mouseleave", e => {
    //     let newD =
    //     `
    //     M ${startX} ${startY}
    
    //     l ${hexhori} 0
    
    //     l ${xOffset} ${hexhalfh}
    //     l -${xOffset} ${hexhalfh}
    
    //     l -${hexhori} 0
    
    //     l -${xOffset} -${hexhalfh}
    //     l ${xOffset} -${hexhalfh}
    
    //     `;
    //     e.target.setAttribute("d", newD);
    // });
    svg.append(path);
}