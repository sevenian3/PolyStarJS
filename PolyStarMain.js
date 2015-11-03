/*
 * The openStar project: stellar interior structure
 *
 * polyStar
 * V1.0, October 2015
 * JQuery version
 * 
 * C. Ian Short
 * Saint Mary's University
 * Department of Astronomy and Physics
 * Institute for Computational Astrophysics (ICA)
 * Halifax, NS, Canada
 *  * ian.short@smu.ca
 * www.ap.smu.ca/~ishort/
 * 
 * Open source pedagogical computational stellar astrophysics
 *
 * 1D, static, TE, polytropic interior structure model
 *
 * Suitable for pedagogical purposes only
 * 
 * Logic developed in Java SE 8.0, JDK 1.8
 * 
 * Ported to JavaScript for deployment
 *
 * System requirements for Java version: Java run-time environment (JRE)
 * System requirements for JavaScript version: JavaScript intrepretation enabld in WWW browser (usually by default)
 *
 * Code provided "as is" - there is no formal support 
 *
 * Java default license applies:
 * End users may adapt, modify, develop, debug, and deploy at will
 * for academic and othe non-profit uses, but are asked to leave this
 * header text in place (although they may add to the header text).
 *
 */


// **********************************************

"use strict"; //testing only!

// Global variables - Doesn't work - scope not global!

var c = 2.9979249E+10; // light speed in vaccuum in cm/s
var sigma = 5.670373E-5; //Stefan-Boltzmann constant ergs/s/cm^2/K^4  
var wien = 2.8977721E-1; // Wien's displacement law constant in cm K
var k = 1.3806488E-16; // Boltzmann constant in ergs/K
var h = 6.62606957E-27; //Planck's constant in ergs sec
var ee = 4.80320425E-10; //fundamental charge unit in statcoulombs (cgs)
var mE = 9.10938291E-28; //electron mass (g)
var GConst = 6.674e-8; //Newton's gravitational constant (cgs)
//Conversion factors
var amu = 1.66053892E-24; // atomic mass unit in g
var eV = 1.602176565E-12; // eV in ergs
var rSun = 6.955e10; // solar radii to cm
var mSun = 1.9891e33; // solar masses to g
var lSun = 3.846e33; // solar bolometric luminosities to ergs/s
var au = 1.4960e13; // 1 AU in cm

//Methods:
//Natural logs more useful than base 10 logs - Eg. Formal soln module: 
// Fundamental constants
var logC = Math.log(c);
var logSigma = Math.log(sigma);
var logWien = Math.log(wien);
var logK = Math.log(k);
var logH = Math.log(h);
var logEe = Math.log(ee); //Named so won't clash with log_10(e)
var logMe = Math.log(mE);
var logGConst = Math.log(GConst);
//Conversion factors
var logAmu = Math.log(amu);
var logEv = Math.log(eV);
var logRSun = Math.log(rSun);
var logMSun = Math.log(mSun);
var logLSun = Math.log(lSun);
var logAu = Math.log(au);

var logAStef = Math.log(4.0) + logSigma - logC;
var aStef = Math.exp(logAStef);

function main() {

    var c = 2.9979249E+10; // light speed in vaccuum in cm/s
    var sigma = 5.670373E-5; //Stefan-Boltzmann constant ergs/s/cm^2/K^4  
    var wien = 2.8977721E-1; // Wien's displacement law constant in cm K
    var k = 1.3806488E-16; // Boltzmann constant in ergs/K
    var h = 6.62606957E-27; //Planck's constant in ergs sec
    var ee = 4.80320425E-10; //fundamental charge unit in statcoulombs (cgs)
    var mE = 9.10938291E-28; //electron mass (g)
    var GConst = 6.674e-8; //Newton's gravitational constant (cgs)
//Conversion factors
    var amu = 1.66053892E-24; // atomic mass unit in g
    var eV = 1.602176565E-12; // eV in ergs
    var rSun = 6.955e10; // solar radii to cm
    var mSun = 1.9891e33; // solar masses to g
    var lSun = 3.846e33; // solar bolometric luminosities to ergs/s
    var au = 1.4960e13; // 1 AU in cm

//Methods:
//Natural logs more useful than base 10 logs - Eg. Formal soln module: 
// Fundamental constants
    var logC = Math.log(c);
    var logSigma = Math.log(sigma);
    var logWien = Math.log(wien);
    var logK = Math.log(k);
    var logH = Math.log(h);
    var logEe = Math.log(ee); //Named so won't clash with log_10(e)
    var logMe = Math.log(mE);
    var logGConst = Math.log(GConst);
//Conversion factors
    var logAmu = Math.log(amu);
    var logEv = Math.log(eV);
    var logRSun = Math.log(rSun);
    var logMSun = Math.log(mSun);
    var logLSun = Math.log(lSun);
    var logAu = Math.log(au);

    var logAStef = Math.log(4.0) + logSigma - logC;
    var aStef = Math.exp(logAStef);


//**********************************************************



// Intrinsic utility function:
//
// numPrint function to Set up special area of screen for printing out computed values for trouble-shooting 
// requires value to be printed, and the x and y pixel positions in that order
// Must be defined in scope of main() - ??

    var numPrint = function(val, x, y, r255, g255, b255, areaId) {

        var xStr = numToPxStrng(x);
        var yStr = numToPxStrng(y);
        var RGBHex = colHex(r255, g255, b255);
        var valStr = val.toString(10);
        var numId = document.createElement("p");
        numId.style.position = "absolute";
        numId.style.display = "block";
        numId.style.marginTop = yStr;
        numId.style.marginLeft = xStr;
        numId.style.color = RGBHex;
        numId.innerHTML = valStr;
        //masterId.appendChild(numId);
        areaId.appendChild(numId);
    }; // end numPrint

    var txtPrint = function(text, x, y, r255, g255, b255, areaId) {

        var xStr = numToPxStrng(x);
        var yStr = numToPxStrng(y);
        var RGBHex = colHex(r255, g255, b255);
        var txtId = document.createElement("p");
        txtId.style.position = "absolute";
        txtId.style.display = "block";
        txtId.style.width = "1000px";
        txtId.style.marginTop = yStr;
        txtId.style.marginLeft = xStr;
        txtId.style.color = RGBHex;
        txtId.innerHTML = text;
        //masterId.appendChild(numId);
        areaId.appendChild(txtId);
    }; // end txtPrint


    /* 
     plotPnt takes in the *numerical* x- and y- DEVICE coordinates (browser pixels), 
     hexadecimal colour, and opacity, and plots a generic plotting dot at that location:
     Calls numToPxStrng to convert numeric coordinates and opacity to style attribute strings for HTML
     Calls colHex to convert R, G, and B amounts out of 255 into #RRGGBB hex format  
     */



    var plotPnt = function(x, y, r255, g255, b255, opac, dSize, areaId) {

        var xStr = numToPxStrng(x);
        var yStr = numToPxStrng(y);
        var opacStr = numToPxStrng(opac);
        var dSizeStr = numToPxStrng(dSize);
        var RGBHex = colHex(r255, g255, b255);
//   var RGBHex = "#000000";


// Each dot making up the line is a separate element:
        var dotId = document.createElement("div");
        dotId.class = "dot";
        dotId.style.position = "absolute";
        dotId.style.display = "block";
        dotId.style.height = dSizeStr;
        dotId.style.width = dSizeStr;
        dotId.style.borderRadius = "100%";
        dotId.style.opacity = opacStr;
        dotId.style.backgroundColor = RGBHex;
        dotId.style.marginLeft = xStr;
        dotId.style.marginTop = yStr;
//Append the dot to the plot
        //masterId.appendChild(dotId);
        areaId.appendChild(dotId);
    };
    /* 
     plotLin takes in the *numerical* x- and y- DEVICE coordinates (browser pixels)
     OF TWO SUGGESSIVE DATA POITNS defining a line segment, 
     hexadecimal colour, and opacity, and plots a generic plotting dot at that location:
     Calls numToPxStrng to convert numeric coordinates and opacity to style attribute strings for HTML
     Calls colHex to convert R, G, and B amounts out of 255 into #RRGGBB hex format  
     */



    var plotLin = function(x0, y0, x1, y1, r255, g255, b255, opac, dSize, areaId) {

        // Parameters of a straight line - all that matters here is internal self-consistency:
        var slope = (y1 - y0) / (x1 - x0);
        var num = x1 - x0;
        var x, y, iFloat;
        for (var i = 0; i < num; i += 5) {
            iFloat = 1.0 * i;
            x = x0 + i;
            y = y0 + i * slope;
            var xStr = numToPxStrng(x);
            var yStr = numToPxStrng(y);
            var opacStr = numToPxStrng(opac);
            var dSizeStr = numToPxStrng(dSize);
            var RGBHex = colHex(r255, g255, b255);
//   var RGBHex = "#000000";


// Each dot making up the line is a separate element:
            var dotId = document.createElement("div");
            dotId.class = "dot";
            dotId.style.position = "absolute";
            dotId.style.display = "block";
            dotId.style.height = dSizeStr;
            dotId.style.width = dSizeStr;
            dotId.style.borderRadius = "100%";
            dotId.style.opacity = opacStr;
            dotId.style.backgroundColor = RGBHex;
            dotId.style.marginLeft = xStr;
            dotId.style.marginTop = yStr;
//Append the dot to the plot
            //masterId.appendChild(dotId);
            areaId.appendChild(dotId);
        }
    };
    /*
     colHex takes in red, green, and blue (in that order!) amounts out of 255 and converts
     them into stringified #RRGGBB format for HTML 
     */


    var colHex = function(r255, g255, b255) {



        var rr = Math.floor(r255); //MUST convert to integer
        var gg = Math.floor(g255); //MUST convert to integer
        var bb = Math.floor(b255); //MUST convert to integer

        var RGBHex = "rgb(";
        RGBHex = RGBHex.concat(rr);
        RGBHex = RGBHex.concat(",");
        RGBHex = RGBHex.concat(gg);
        RGBHex = RGBHex.concat(",");
        RGBHex = RGBHex.concat(bb);
        RGBHex = RGBHex.concat(")");
//////    var RGBHex = "rgb(60,80,120)";



        return RGBHex;
    };
// ***********************************

// Input control:



    // Get the checkbox values controlling what's plotted:
//JQuery test code:
//    $("#btnId").click(function() {
    //       alert("Value: " + $("#Teff").val());
    //       //alert("Value: ");
    //   });

    //var settingsId = document.getElementById("settingsId");

    //var settingsId = document.getElementsByTagName("form");
    //var atmosSettingsId = document.getElementById("atmosSettingsId");

    // Button for re-computing everything - if stellar parameters have changed
    var btnId = document.getElementById("btnId");
    btnId.onClick = function() {
    };

// Stellar atmospheric parameters
    var numInputs = 6;
//Make settingsId object array by hand:
// setId() is an object constructor
    function setId(nameIn, valueIn) {
        this.name = nameIn;
        this.value = valueIn;
    }
    //
    // settingId will be an array of objects
    var settingsId = [];
    settingsId.length = numInputs;
    //
    //1st version of each is of JQuery-ui round sliders not available
    //var teff = 1.0 * $("#Teff").val(); // K
    //var teff = 1.0 * $("#Teff").roundSlider("getValue");
    //Sigh - IE needs it this way...
    var log10RhoCSolObj = $("#log10RhoCSol").data("roundSlider");
    var log10RhoCSol = 1.0 * log10RhoCSolObj.getValue();
    //
    var indexObj = $("#index").data("roundSlider");
    var index = 1.0 * indexObj.getValue();
    //
    var yFracObj = $("#yFrac").data("roundSlider");
    var yFrac = 1.0 * yFracObj.getValue();
    //
    var zFracObj = $("#zFrac").data("roundSlider");
    var zFrac = 1.0 * zFracObj.getValue();
    //console.log("Teff read: " + teff);
// Planetary parameters for habitable zone calculation
    //var greenHouse = 1.0 * $("#GHTemp").val(); // Delta T_Surf boost K
    //var greenHouse = 1.0 * $("#GHTemp").roundSlider("getValue");
    var greenHouseObj = $("#GHTemp").data("roundSlider");
    var greenHouse = 1.0 * greenHouseObj.getValue();
    //var albedo = 1.0 * $("#Albedo").val(); //unitless reflectivity
    //var albedo = 1.0 * $("#Albedo").roundSlider("getValue");
    var albedoObj = $("#Albedo").data("roundSlider");
    var albedo = 1.0 * albedoObj.getValue();

    settingsId[0] = new setId("log<sub>10</sub> <em>&#961</em><sub>0</sub>/<em>&#961</em><sub>0, Sun</sub>", log10RhoCSol);
    settingsId[1] = new setId("<em>n</em>", index);
    settingsId[2] = new setId("<em>Y</em>", yFrac);
    settingsId[3] = new setId("<em>Z</em>", zFrac);
    settingsId[4] = new setId("<span style='color:green'>GHEff</span>", greenHouse);
    settingsId[5] = new setId("<span style='color:green'><em>A</em></span>", albedo);

    var ifShowStruc = false;
    //
    var ifPrintNone = true;
    var ifPrintStruc = false;
    var ifPrintSED = false;

    // Display options:
    if ($("#showStruc").is(":checked")) {
        ifShowStruc = true; // checkbox
    }

    //Detailed print-out options:
    if ($("#printNone").is(":checked")) {
        ifPrintNone = true; // checkbox
    }
    if ($("#printStruc").is(":checked")) {
        ifPrintStruc = true; // checkbox
    }
    if ($("#printSED").is(":checked")) {
        ifPrintSED = true; // checkbox
    }
    //
    // Form validation and Initial sanity checks:
    // 

// Stellar parameters:
//
    var flagArr = [];
    flagArr.length = numInputs;
    flagArr[0] = false;
    var minLog10RhoCSol = -1.0;
    var maxLog10RhoCSol = 1.0;
    //if (log10RhoCSol === null || log10RhoCSol == "") {
    //    alert("rhoC must be filled out");
    //    return;
    //}
    if (log10RhoCSol < minLog10RhoCSol) {
        flagArr[0] = true;
        log10RhoCSol = minLog10RhoCSol;
        var rhoCSolStr = String(minLog10RhoCSol);
        settingsId[0].value = minLog10RhoCSol;
        //first version is if there's no JQuery-UI
        //$("#Teff").val(minTeff);
        $("#logRhoCSol").roundSlider("setValue", minLog10RhoCSol);
    }
    if (log10RhoCSol > maxLog10RhoCSol) {
        flagArr[0] = true;
        log10RhoCSol = maxLog10RhoCSol;
        var logRhoCSolStr = String(maxLog10RhoCSol);
        settingsId[0].value = maxLog10RhoCSol;
        //$("#Teff").val(maxTeff);
        $("#logRhoCSol").roundSlider("setValue", maxLog10RhoCSol);
    }

    if (index === null || index == "") {
        alert("n must be filled out");
        return;
    }
    if (index < 1.5) {
        flagArr[1] = true;
        index = 1.5;
        var indexStr = "1.5";
        settingsId[1].value = 1.5;
        $("#index").roundSlider("setValue", 1.5);
    }
    if (index > 3.0) {
        flagArr[1] = true;
        index = 3.0;
        var indexStr = "3.0";
        settingsId[1].value = 3.0;
        $("#index").roundSlider("setValue", 3.0);
    }

    if (yFrac === null || yFrac == "") {
        alert("Y must be filled out");
        return;
    }
    if (yFrac < 0.2) {
        flagArr[2] = true;
        yFrac = 0.2;
        var yFracStr = "0.2";
        settingsId[2].value = 0.2;
        $("#yFrac").roundSlider("setValue", 0.2);
    }
    if (yFrac > 0.5) {
        flagArr[2] = true;
        yFrac = 0.5;
        var yFracStr = "0.5";
        settingsId[2].value = 0.5;
        $("#yFrac").roundSlider("setValue", 0.5);
    }

    if (zFrac === null || zFrac == "") {
        alert("Z must be filled out");
        return;
    }
    if (zFrac < 0.0001) {
        flagArr[3] = true;
        zFrac = 0.0001;
        var zFracStr = "0.0001";
        settingsId[3].value = 0.0001;
        $("#zFrac").roundSlider("setValue", 0.0001);
    }
    if (zFrac > 0.05) {
        flagArr[3] = true;
        zFrac = 0.05;
        var zFracStr = "0.05";
        settingsId[3].value = 0.05;
        $("#zFrac").roundSlider("setValue", 0.05);
    }

    // Planetary parameters for habitable zone calculation:
    //
    if (greenHouse === null || greenHouse === "") {
        alert("greenHouse must be filled out");
        return;
    }
    flagArr[4] = false;
    if (greenHouse < 0.0) {
        flagArr[4] = true;
        greenHouse = 0.0;
        var greenHouseStr = "0.0";
        settingsId[4].value = 0.0;
        //$("#GHTemp").val(0.0);
        $("#GHTemp").roundSlider("setValue", 0.0);
    }
    if (greenHouse > 200.0) {
        flagArr[4] = true;
        greenHouse = 200.0;
        var greenHouseStr = "200.0";
        settingsId[4].value = 200.0;
        //$("#GHTemp").val(200.0);
        $("#GHTemp").roundSlider("setValue", 200.0);
    }
    if (albedo === null || albedo === "") {
        alert("albedo must be filled out");
        return;
    }
    flagArr[5] = false;
    if (albedo < 0.0) {
        flagArr[5] = true;
        albedo = 0.0;
        var albedoStr = "0.0";
        settingsId[5].value = 0.0;
        //$("#Albedo").val(0.0);
        $("#Albedo").roundSlider("setValue", 0.0);
    }
    if (albedo > 1.0) {
        flagArr[5] = true;
        greenHouse = 1.0;
        var albedoStr = "1.0";
        settingsId[5].value = 1.0;
        //$("#Albedo").val(1.0);
        $("#Albedo").roundSlider("setValue", 1.0);
    }


// This has to be up here for some reason:
// Get the ID of the container div:



    var textId = document.getElementById("outPanel"); // text output area

    //var masterId = document.getElementById("container"); // graphical output area
    var plotOneId = document.getElementById("plotOne");
    var plotTwoId = document.getElementById("plotTwo");
    var plotThreeId = document.getElementById("plotThree");
    var plotFourId = document.getElementById("plotFour");
    var plotFiveId = document.getElementById("plotFive");
    var plotSixId = document.getElementById("plotSix");
    var plotSevenId = document.getElementById("plotSeven");
    var plotEightId = document.getElementById("plotEight");
    var plotNineId = document.getElementById("plotNine");
    var plotElevenId = document.getElementById("plotEleven");

    var printModelId = document.getElementById("printModel"); //detailed model print-out area

    if (ifShowStruc === true) {
        plotOneId.style.display = "block";
    }

    if ((ifPrintStruc === true) ||
            (ifPrintSED === true)) {
        printModelId.style.display = "block";
    } else if (ifPrintNone === true) {
        printModelId.style.display = "none";
    }
    //printModelId.style.display = "block"; //for testing

    // Begin compute code:

    // All code after this line
// Solar parameters:
    var teffSun = 5778.0;
    var log10gSun = 4.44;
    var gravSun = Math.pow(10.0, log10gSun);
//Solar units:
    var massSun = 1.0;
    var radiusSun = 1.0;
    var rhoCSun = 162.2;  // g cm^-3
    //double massStar = 1.0; //solar masses // test

    //Composition by mass fraction - needed for opacity approximations
    //   and interior structure
    var massXSun = 0.70; //Hydrogen
    var massYSun = 0.28; //Helium
    var massZSun = 0.02; // "metals"   
    // log_10 num density H in surface layer:
    var log10NH = 17.0;

    var log10E = logTen(Math.E); // convert log_e to log_10
    var logE10 = Math.log(10.0);     // convert log_10 to log_e

    var xFrac = 1.0 - yFrac - zFrac;
    var logXFrac = Math.log(xFrac);
    var logYFrac = Math.log(yFrac);

    var rhoCSol = Math.pow(10.0, log10RhoCSol);
    var rhoC = rhoCSol * rhoCSun; //Sun's central mass density in cgs units

// EOS quantities
//Adiabatic gammas
    var gammaMono = 5.0 / 3.0; //ideal monatomic gas 
    var gammaRad = 4.0 / 3.0; //radiation (photon gas)
//Constant "K" in polytropic (adiabatic) EOS (P = K*rho^gamma)
// Value based on conditions at centre of Sun:
//public static double polyK = 5.134615452370382E13;
//Mean molecular weight of fully ionized gas of solar composition
//double muI = 0.62; // amu (C&O 2nd Ed. p. 293)
//The following assumes Sigma_elements((1+z)/A) ~ 0.5:
//C&O 2nd Ed., p. 293

    var muI = function(xFrac, yFrac, zFrac) {
        var invMuI = 2.0 * xFrac + 0.75 * yFrac + 0.5 * zFrac;
        return 1.0 / invMuI;
    };

    var logGamMono = function(gammaMono) {
        return Math.log(gammaMono);
    };

    var logGamRad = function(gammaRad) {
        return Math.log(gammaRad);
    };

    var logMuI = function(xFrac, yFrac, zFrac) {
        return Math.log(muI(xFrac, yFrac, zFrac));
    };

    //Set up all the special Lane-Emden equation variables:
    //Adiabatic gamma consistent with input polytropic index
    var gammaPoly = (index + 1.0) / index;
    //For convection criterion: 
    var gamThing = gammaMono / (gammaMono - 1.0);

    //Initial Kay and lambda parameters from Lame-Embden equations:
    /* Doesn't work
     double Kay, KayTerm1, KayTerm2;
     KayTerm1 = 3.0 * (1.0 - beta) / Useful.aStef();
     KayTerm2 = Useful.k / beta / PhysData.muI(xFrac, yFrac, zFrac) / Useful.amu;
     Kay = Math.pow(KayTerm1, 0.3333) * Math.pow(KayTerm2, 4.0 / 3.0);
     */
    var Kay = 5.0e13;  //hard wire to value at centre of Sun

    var lambda, lamTerm, indxExp;
    indxExp = (1.0 - index) / index;
    lamTerm = (index + 1.0) * Kay * Math.pow(rhoC, indxExp) / 4.0 / Math.PI / GConst;
    lambda = Math.pow(lamTerm, 0.5);

    //console.log("First: Kay " + Kay + " lambda " + lambda);

    //Dimensionless Lane-Emden Equation variables, xi and D_n(xi)
    //xi is the independenet variable
    //y(xi) is a helper function to separate the 2nd order Lane-Emden equation
    //into two coupled 1st order equations
    var maxNumDeps = 1000;
    var xi = [];
    xi.length = maxNumDeps;
    var DFunc = [];
    DFunc.length = maxNumDeps;
    var yFunc = [];
    yFunc.length = maxNumDeps;
    var deltaXi, deltaDFunc, deltaY, deltaYMag;
    //double logDeltaXi, logDeltaD, logDeltaY, logDeltaYMag;

    //Physical variables:
    var radShell = []; //shell radial width  
    radShell.length = maxNumDeps;
    var tempShell = []; //kinetic temperature
    tempShell.length = maxNumDeps;
    var pressShell = []; //total pressure
    pressShell.length = maxNumDeps;
    var pGasShell = [];  //gas pressure
    pGasShell.length = maxNumDeps;
    var pRadShell = []; //radiation pressure
    pRadShell.length = maxNumDeps;
    var rhoShell = [];  //total fluid density
    rhoShell.length = maxNumDeps;
//    var mmwShell = [];  //total fluid density
//    mmwShell.length = maxNumDeps;    
    var massShell = [];   // shell mass
    massShell.length = maxNumDeps;
    var lumShell = []; //shell luminosity
    lumShell.length = maxNumDeps;
    var lumPpShell = []; //shell luminosity
    lumPpShell.length = maxNumDeps;
    var lumCnoShell = []; //shell luminosity    
    lumCnoShell.length = maxNumDeps;

    var epsShell = []; //total nuclear energy generation rate
    epsShell.length = maxNumDeps;
    var epsPpShell = []; //nuclear p-p chain energy generation rate  
    epsPpShell.length = maxNumDeps;
    var epsCnoShell = []; //nuclear cno cycle energy generation rate  
    epsCnoShell.length = maxNumDeps;

    var kapShell = []; //mean opacity
    kapShell.length = maxNumDeps;
    var kapBfShell = []; //mean b-f opacity
    kapBfShell.length = maxNumDeps;
    var kapFfShell = []; //mean f-f opacity
    kapFfShell.length = maxNumDeps;
    var kapEsShell = [];  //mean e^- scattering opacity
    kapEsShell.length = maxNumDeps;
    var kapHminShell = []; //mean H^- opacity       
    kapHminShell.length = maxNumDeps;

    //cumulative quantities
    var radInt = [];  //interior radius
    radInt.length = maxNumDeps;
    var radKm = [];
    radKm.length = maxNumDeps;
    var massInt = [];   //interior mass
    massInt.length = maxNumDeps;
    var lumInt = []; //interior luminosity
    lumInt
    var lumPpInt = []; //interior luminosity   
    lumPpInt.length = maxNumDeps;
    var lumCnoInt = []; //interior luminosity   
    lumCnoInt.length = maxNumDeps;
    var gravInt = []; //acceleration of gravity
    gravInt.length = maxNumDeps;

    //Convection:
    var dLnPdLnT = [];
    dLnPdLnT.length = maxNumDeps;
    var convFlag = [];
    convFlag.length = maxNumDeps;

    var RHS, logRHS, logRHSMag; //, logLastXi;
    var xiSquare; //useful

    //Try uniform spacing for now...
    // We know that at surface, xi >~ 3.0
    //guess at a good spacing for now...
    // Surface value of dimensionless xi parameter is in 
    //   range 3 to 7 for polytropic index 1.5 to 3.0
    deltaXi = 10.0 / maxNumDeps;
    //deltaXi = 0.04;  //debug mode
    //logDeltaXi = Math.log(deltaXi);

    //For Newton-Raphson temperature recovery:
    var firstTemp = 0.0;

    //central bounday (initial) values:
    // NOTE: we cannot set xi=0 - singularity                    
    // We know that at surface, xi >~ 3.0
    //guess at a good initial abscissa and spacing for now...
    var j = 0;
    xi[j] = 0.001;
    yFunc[j] = 0.0;
    DFunc[j] = 1.0;
    // The stuff that follows...
    radInt[j] = lambda * xi[j];
    radKm[j] = 1.0e-5 * radInt[j];
    radShell[j] = radInt[j];
    rhoShell[j] = rhoC * Math.pow(DFunc[j], index);
    pressShell[j] = Kay * Math.pow(rhoShell[j], gammaPoly);
    tempShell[j] = getTemp(pressShell[j], rhoShell[j], xFrac, yFrac, zFrac, firstTemp);
    //pGasShell[j] = beta * pressShell[j];
    //pRadShell[j] = (1.0 - beta) * pressShell[j];
    pGasShell[j] = k * rhoShell[j] * tempShell[j] / muI(xFrac, yFrac, zFrac) / amu;
    pRadShell[j] = aStef * Math.pow(tempShell[j], 4.0) / 3.0;
    //tempShell[i] = pressShell[i] * PhysData.muI(xFrac, yFrac, zFrac) * Useful.amu / Useful.k / rhoShell[i];
    massInt[j] = rhoC * 4.0 * Math.PI * Math.pow(radInt[j], 3) / 3.0;
    massShell[j] = massInt[j];

    if (tempShell[j] >= 1.0e7) {
        epsPpShell[j] = ppChain(tempShell[j], rhoShell[j], xFrac, zFrac); //H fusion p-p chain
        epsCnoShell[j] = cnoCycle(tempShell[j], rhoShell[j], xFrac, zFrac); //H fusion CNO cycle
        epsShell[j] = epsPpShell[j] + epsCnoShell[j];
        //lumInt[j] = rhoC * 4.0 * Math.PI * Math.pow(radInt[j], 3) * epsShell[j] / 3.0;
        lumPpInt[j] = rhoC * 4.0 * Math.PI * Math.pow(radInt[j], 3) * epsPpShell[j] / 3.0;
        lumCnoInt[j] = rhoC * 4.0 * Math.PI * Math.pow(radInt[j], 3) * epsCnoShell[j] / 3.0;
        lumPpShell[j] = lumPpInt[j];
        lumCnoShell[j] = lumCnoInt[j];
        lumInt[j] = lumPpInt[j] + lumCnoInt[j];
        lumShell[j] = lumPpShell[j] + lumCnoShell[j];
    } else {
        epsPpShell[j] = 0.0; //H fusion p-p chain
        epsCnoShell[j] = 0.0; //H fusion CNO cycle
        epsShell[j] = 0.0;
        //lumInt[j] = rhoC * 4.0 * Math.PI * Math.pow(radInt[j], 3) * epsShell[j] / 3.0;
        lumPpInt[j] = 0.0;
        lumCnoInt[j] = 0.0;
        lumPpShell[j] = 0.0;
        lumCnoShell[j] = 0.0;
        lumInt[j] = 0.0;
        lumShell[j] = 0.0;
    }

    kapBfShell[j] = kappaBfFn(tempShell[j], rhoShell[j], xFrac, zFrac); //b-f photo-ionization
    kapFfShell[j] = kappaFfFn(tempShell[j], rhoShell[j], xFrac, zFrac); //f-f Bremsstrahlung
    kapEsShell[j] = kappaEsFn(tempShell[j], rhoShell[j], xFrac, zFrac); //Thomson e^- scattering
    kapHminShell[j] = kappaHminFn(tempShell[j], rhoShell[j], xFrac, zFrac); //H^- b-f 
    kapShell[j] = kapBfShell[j] + kapFfShell[j] + kapEsShell[j] + kapHminShell[j];

    gravInt[j] = GConst * massInt[j] / Math.pow(radInt[j], 2);

    dLnPdLnT[j] = 0.0;

    //4th order Runge-Kutta (RK4) helper variables
    var k1y, k2y, k3y, k4y;
    var k1D, k2D, k3D, k4D;
    var hHalf = deltaXi / 2.0;
    var yHalf, DHalf, xiHalf;
    var yFull, DFull, xiFull;

    //console.log("    i     " + "   radius   " + "   massIn    " + "   lumInt   " + "   temp   " + "   press   "
    //        + "   rh    " + "   kappa   " + "   epsilon   " + "   dLnPdLnT    " + "   gravInt   " + "   pGas/PTot    "
    //        + "   convection? ");
    //System.out.println("      i       " + "    radius    " + "    press    " + "    rho    ");
    //Master numerical integration loop:
    //Loop exits when surface is found
    // Try Euler's method for now...
    //System.out.println("i    xi[i]    yFunc[i]    DFunc[i] ");
    var iSurf = 0;
    var iCore = 0;
    for (var i = 1; i < maxNumDeps; i++) {

        xi[i] = xi[i - 1] + deltaXi;

        /* Logarithmic - difficult due to signs
         logLastXi = Math.log(xi[i - 1]);
         
         //Start by advanceing helper function, y(xi):
         logRHSMag = index * Math.log(DFunc[i - 1]) + 2.0 * logLastXi;
         //RHS = -1.0 * Math.exp(logRHSMag);
         logDeltaYMag = logRHSMag + logDeltaXi;
         deltaYMag = Math.exp(logDeltaYMag);
         deltaY = -1.0 * deltaYMag;
         yFunc[i] = yFunc[i - 1] + deltaY;
         
         //Now use the updated value of y to update D_n
         logRHS = Math.log(yFunc[i]) - 2.0 * logLastXi;
         logDeltaD = logRHS + logDeltaXi;
         deltaDFunc = Math.exp(logDeltaD);
         DFunc[i] = DFunc[i - 1] + deltaDFunc;
         */
        //
        xiSquare = Math.pow(xi[i - 1], 2);
        xiHalf = Math.pow((xi[i - 1] + hHalf), 2);
        xiFull = Math.pow(xi[i], 2);
        //

        /*
         //Euler's method
         //Start by advanceing helper function, y(xi):
         RHS = -1.0 * Math.pow(DFunc[i - 1], index) * xiSquare;
         deltaY = RHS * deltaXi;
         yFunc[i] = yFunc[i - 1] + deltaY;
         
         //Now use the updated value of y to update D_n
         RHS = yFunc[i] / xiSquare;
         deltaDFunc = RHS * deltaXi;
         DFunc[i] = DFunc[i - 1] + deltaDFunc;
         
         System.out.format("Euler: %03d   %15.10f   %15.10f   %15.10f%n", i, xi[i], yFunc[i], DFunc[i]);
         */
        //4th order Runge-Kutta (RK4):
        k1y = -1.0 * Math.pow(DFunc[i - 1], index) * xiSquare;
        k1D = yFunc[i - 1] / xiSquare;

        DHalf = DFunc[i - 1] + hHalf * k1D;
        yHalf = yFunc[i - 1] + hHalf * k1y;
        k2y = -1.0 * Math.pow(DHalf, index) * xiHalf;
        k2D = yHalf / xiHalf;

        DHalf = DFunc[i - 1] + hHalf * k2D;
        yHalf = yFunc[i - 1] + hHalf * k2y;
        k3y = -1.0 * Math.pow(DHalf, index) * xiHalf;
        k3D = yHalf / xiHalf;

        DFull = DFunc[i - 1] + deltaXi * k3D;
        yFull = yFunc[i - 1] + deltaXi * k3y;
        k4y = -1.0 * Math.pow(DFull, index) * xiFull;
        k4D = yFull / xiFull;

        deltaY = deltaXi * (k1y + 2.0 * k2y + 2.0 * k3y + k4y) / 6.0;
        deltaDFunc = deltaXi * (k1D + 2.0 * k2D + 2.0 * k3D + k4D) / 6.0;
        yFunc[i] = yFunc[i - 1] + deltaY;
        DFunc[i] = DFunc[i - 1] + deltaDFunc;

        //Are we there yet?
        if ((DFunc[i] <= 0)
                || (isNaN(DFunc[i]) == true)
                || (isFinite(DFunc[i]) == false)) {
            break;
        }

        //System.out.format("RK4: %03d   %15.10f   %15.10f   %15.10f%n", i, xi[i], yFunc[i], DFunc[i]);
        radInt[i] = lambda * xi[i];
        radKm[i] = 1.0e-5 * radInt[i];
        radShell[i] = radInt[i] - radInt[i - 1];
        rhoShell[i] = rhoC * Math.pow(DFunc[i], index);
        pressShell[i] = Kay * Math.pow(rhoShell[i], gammaPoly);
        tempShell[i] = getTemp(pressShell[i], rhoShell[i], xFrac, yFrac, zFrac, tempShell[i - 1]);
        //pGasShell[i] = beta * pressShell[i];
        //pRadShell[i] = (1.0 - beta) * pressShell[i];
        pGasShell[i] = k * rhoShell[i] * tempShell[i] / muI(xFrac, yFrac, zFrac) / amu;
        pRadShell[i] = aStef * Math.pow(tempShell[i], 4.0) / 3.0;
        //tempShell[i] = pressShell[i] * PhysData.muI(xFrac, yFrac, zFrac) * Useful.amu / Useful.k / rhoShell[i];
        massShell[i] = 4.0 * Math.PI * Math.pow(radInt[i], 2) * rhoShell[i] * radShell[i];
        massInt[i] = massInt[i - 1] + massShell[i];
        //epsShell[i] = Power.nuclear(tempShell[i], rhoShell[i], xFrac, zFrac);

        if (tempShell[i] >= 1.0e7) {
            iCore = i;
            epsPpShell[i] = ppChain(tempShell[i], rhoShell[i], xFrac, zFrac); //H fusion p-p chain
            epsCnoShell[i] = cnoCycle(tempShell[i], rhoShell[i], xFrac, zFrac); //H fusion CNO cycle
            epsShell[i] = epsPpShell[i] + epsCnoShell[i];
            //lumShell[i] = 4.0 * Math.PI * Math.pow(radInt[i], 2) * rhoShell[i] * epsShell[i] * radShell[i];
            lumPpShell[i] = 4.0 * Math.PI * Math.pow(radInt[i], 2) * rhoShell[i] * epsPpShell[i] * radShell[i];
            lumCnoShell[i] = 4.0 * Math.PI * Math.pow(radInt[i], 2) * rhoShell[i] * epsCnoShell[i] * radShell[i];
            lumShell[i] = lumPpShell[i] + lumCnoShell[i];
            lumPpInt[i] = lumPpInt[i - 1] + lumPpShell[i];
            lumCnoInt[i] = lumCnoInt[i - 1] + lumCnoShell[i];
            lumInt[i] = lumInt[i - 1] + lumShell[i];
        } else {
            epsPpShell[i] = 0.0; //H fusion p-p chain
            epsCnoShell[i] = 0.0; //H fusion CNO cycle
            epsShell[i] = 0.0;
            //lumShell[i] = 4.0 * Math.PI * Math.pow(radInt[i], 2) * rhoShell[i] * epsShell[i] * radShell[i];
            lumPpShell[i] = 0.0;
            lumCnoShell[i] = 4.0 * Math.PI * Math.pow(radInt[i], 2) * rhoShell[i] * epsCnoShell[i] * radShell[i];
            lumShell[i] = 0.0;
            lumPpInt[i] = lumPpInt[i - 1];
            lumCnoInt[i] = lumCnoInt[i - 1];
            lumInt[i] = lumInt[i - 1];
        }

        //kapShell[i] = Kappa.kappaFn(tempShell[i], rhoShell[i], xFrac, zFrac);
        kapBfShell[i] = kappaBfFn(tempShell[i], rhoShell[i], xFrac, zFrac); //b-f photo-ionization
        kapFfShell[i] = kappaFfFn(tempShell[i], rhoShell[i], xFrac, zFrac); //f-f Bremsstrahlung
        kapEsShell[i] = kappaEsFn(tempShell[i], rhoShell[i], xFrac, zFrac); //Thomson e^- scattering
        kapHminShell[i] = kappaHminFn(tempShell[i], rhoShell[i], xFrac, zFrac); //H^- b-f
        kapShell[i] = kapBfShell[i] + kapFfShell[i] + kapEsShell[i] + kapHminShell[i];

        gravInt[i] = GConst * massInt[i] / Math.pow(radInt[i], 2);

        dLnPdLnT[i] = (Math.log(pGasShell[i]) - Math.log(pGasShell[i - 1]))
                / (Math.log(tempShell[i]) - Math.log(tempShell[i - 1]));
        if ((dLnPdLnT[i] >= gamThing)) {
            //Radiative transport
            convFlag[i] = false;
        } else {
            //Convective transport
            convFlag[i] = true;
        }

        //Dynamically update Kay and lambda:
        //Hmmm... these never seem to change, but let's update them anyway...
        Kay = pressShell[i] / Math.pow(rhoShell[i], gammaPoly);
        lamTerm = (index + 1.0) * Kay * Math.pow(rhoC, indxExp) / 4.0 / Math.PI / GConst;
        lambda = Math.pow(lamTerm, 0.5);
        //console.log("Kay " + Kay + " lambda " + lambda);

        //console.log("    i     " + "     radius     " + "     massInt     " + "     lumInt     " + "     temp     " + "     press     "
        //        + "     rho     " + "     kappa     " + "     epsilon     " + "     dLnPdLnT     " + "     gravInt     " + "     pGas/PTot     "
        //        + "     convection? ");
        //console.log("      i       " + "    radius    " + "    press    " + "    rho    ");
        //console.log("%03d  %10.6f   %10.6f   %10.6f   %10.6f   %10.6f   %10.6f   %10.6f   %10.6f   %10.6f   %10.6f   %10.6f %b",
        //        i, log10E * Math.log(radInt[i]), log10E * Math.log(massInt[i]), log10E * Math.log(lumInt[i]), log10E * Math.log(tempShell[i]),
        //        log10E * Math.log(pressShell[i]), log10E * Math.log(rhoShell[i]), kapShell[i], log10E * Math.log(epsShell[i]),
        //        dLnPdLnT[i], log10E * Math.log(gravInt[i]), pGasShell[i] / pressShell[i], convFlag[i]);
        //console.log("   %03d     %15.11f      %15.11f      %15.11f      %15.11f      %n",
        //        i, log10E * Math.log(radInt[i]), log10E * Math.log(pressShell[i]), log10E * Math.log(rhoShell[i]), log10E * Math.log(tempShell[i]));
        //Surface boundary condition:
        iSurf++;

    }

    var numDeps = iSurf;
    //System.out.println("Actual number of depths = " + numDeps);
    //Independent total mass calculation:
    //First derivative, dD_n/dXi at surface:
    var dDFuncdXi = (DFunc[iSurf] - DFunc[iSurf - 1]) / (xi[iSurf] - xi[iSurf - 1]);
    var totMass = -4.0 * Math.PI * Math.pow(lambda, 3.0) * rhoC * Math.pow(xi[iSurf], 2.0) * dDFuncdXi;
    //System.out.println("Total analytic mass " + totMass);

    //Results:
    //cgs units:
    var mass = massInt[numDeps];
    var radius = radInt[numDeps];
    var luminosity = lumInt[numDeps];
    var surfTemp = tempShell[numDeps];
    var logg = logTen(gravInt[numDeps]);

    //Compute the effective temperature of the model:
    var teff4 = luminosity / 4.0 / Math.PI / Math.pow(radius, 2.0) / sigma;
    var teff = Math.pow(teff4, 0.25);

    //solar units:
    var massSol = mass / mSun;
    var radiusSol = radius / rSun;
    var logRadiusSol = Math.log(radiusSol);
    var lumSol = luminosity / lSun;

    //Central quantities:
    var temp0 = tempShell[0];
    var rho0 = rhoShell[0];
    var press0 = pressShell[0];

    //Run the loop inward to build the optical depth scasle, tauIn:
    //// No!While we're at it - find the nuclear burning core
    var tauIn = [];
    tauIn.length = numDeps;
    tauIn[numDeps - 1] = 0.0;
    //int iCore = numDeps - 1;
    for (var i = numDeps - 2; i === 0; i--) {
        tauIn[i] = tauIn[i - 1]
                + rhoShell[i] * kapShell[i] * radShell[i];
        // if (lumInt[i] > 0.99 * luminosity) {
        //    iCore--;
        // }
    }

    var rCore = radInt[iCore];

    //Report:
    //console.log("cgs units:");
    //console.log("Radius: " + log10E * Math.log(radius) + " Mass: " + log10E * Math.log(mass) + " Bol Luminosity: " + log10E * Math.log(luminosity));
    //console.log("Teff: " + teff + " TSurf: " + surfTemp);
    //console.log("log g: " + logg);
    //console.log("Solar units:");
    //console.log("Radius: " + radiusSol + " Mass: " + massSol + " Bol Luminosity: " + lumSol);
    //console.log("Nuclear burning core fractional radius: " + (radInt[iCore] / radius));

    //Compute spectral energy distribution (SED):
    //wavelength grid (cm):
    var waveSetup = [];
    waveSetup.length = 3;
    waveSetup[0] = 100.0 * 1.0e-7;  // test Start wavelength, cm
    waveSetup[1] = 2000.0 * 1.0e-7; // test End wavelength, cm
    waveSetup[2] = 100;  // test number of lambda
    var numWaves = waveSetup[2];

    var SED = [];
    SED.length = numWaves;
    var logSED = [];
    logSED.length = numWaves;

    var waveGrid = [];
    waveGrid.length = numWaves;
    var thisWave, thisLogWave, logWave0, logWave1;
    logWave0 = Math.log(waveSetup[0]);
    logWave1 = Math.log(waveSetup[1]);
    var deltaLogWave = (logWave1 - logWave0) / numWaves;
    //console.log("wave        SED");
    for (var i = 0; i < numWaves; i++) {
        thisLogWave = logWave0 + (1.0 * i) * deltaLogWave;
        thisWave = Math.exp(thisLogWave);
        waveGrid[i] = thisWave;
        logSED[i] = planck(teff, thisWave);
        SED[i] = Math.exp(logSED[i]);
        //console.log(" " + waveGrid[i] + " " + SED[i]);
    }

    //
    //double colors[] = new double[5];
    //var colors = UBVRI(waveGrid, SED);
    var numColors = 5;
    var colors = [];
    colors.length = numColors;
    colors = UBVRI(waveGrid, SED); //, numDeps, tauIn, tempShell);

    //console.log("Photometric color indices: "
    //       + "U-B: " + colors[0]
    //        + " B-V: " + colors[1]
    //        + " V-R: " + colors[2]
    //       + " V-I: " + colors[3]
    //       + " R-I: " + colors[4]
    //      );
//
//
//
//  *******    END MODELLING CODE
// 
//
// Text output section:

//    
// Set up the canvas:
//

    // **********  Basic canvas parameters: These are numbers in px - needed for calculations:
    // All plots and other output must fit within this region to be white-washed between runs

    var xRangeT = 1550;
    var yRangeT = 65;
    var xOffsetT = 10;
    var yOffsetT = 10;
    var charToPxT = 4; // width of typical character font in pixels - CAUTION: finesse!

    var zeroInt = 0;
    //these are the corresponding strings ready to be assigned to HTML style attributes


    var xRangeTStr = numToPxStrng(xRangeT);
    var yRangeTStr = numToPxStrng(yRangeT);
    var xOffsetTStr = numToPxStrng(xOffsetT);
    var yOffsetTStr = numToPxStrng(yOffsetT);
    // Very first thing on each load: White-wash the canvas!!

    var washTId = document.createElement("div");
    var washTWidth = xRangeT + xOffsetT;
    var washTHeight = yRangeT + yOffsetT;
    var washTTop = yOffsetT;
    var washTWidthStr = numToPxStrng(washTWidth);
    var washTHeightStr = numToPxStrng(washTHeight);
    var washTTopStr = numToPxStrng(washTTop);
    washTId.id = "washT";
    washTId.style.position = "absolute";
    washTId.style.width = washTWidthStr;
    washTId.style.height = washTHeightStr;
    washTId.style.marginTop = washTTopStr;
    washTId.style.marginLeft = "0px";
    washTId.style.opacity = 1.0;
    washTId.style.backgroundColor = "#EEEEEE";
    //washId.style.zIndex = -1;
    washTId.style.zIndex = 0;
    //washTId.style.border = "2px blue solid";

    //Wash the canvas:
    textId.appendChild(washTId);
    var roundNum, remain;
    // R & L_Bol:
    var colr = 0;
    var xTab = 60;
    roundNum = radiusSol.toPrecision(3);
    txtPrint("<span title='Stellar radius'><em>R</em> = </span> "
            + roundNum
            + " <span title='Solar radii'>\n\
<a href='http://en.wikipedia.org/wiki/Solar_radius' target='_blank'><em>R</em><sub>Sun</sub></a>\n\
</span> ",
            20 + colr * xTab, 15, zeroInt, zeroInt, zeroInt, textId);
//
    roundNum = lumSol.toPrecision(3);
    txtPrint("<span title='Bolometric luminosity'>\n\
<a href='http://en.wikipedia.org/wiki/Luminosity' target='_blank'><em>L</em><sub>Bol</sub></a> = \n\
</span> "
            + roundNum
            + " <span title='Solar luminosities'>\n\
<a href='http://en.wikipedia.org/wiki/Solar_luminosity' target='_blank'><em>L</em><sub>Sun</sub></a>\n\
</span> ",
            20 + colr * xTab, 40, zeroInt, zeroInt, zeroInt, textId);
//
    roundNum = massSol.toPrecision(3);
    txtPrint("<span title='Mass'>\n\
<a href='https://en.wikipedia.org/wiki/Stellar_mass' target='_blank'><em>M</em></a> = \n\
</span> "
            + roundNum
            + " <span title='Solar masses'>\n\
<a href='https://en.wikipedia.org/wiki/Solar_mass' target='_blank'><em>M</em><sub>Sun</sub></a>\n\
</span> ",
            180 + colr * xTab, 15, zeroInt, zeroInt, zeroInt, textId);
//
    roundNum = surfTemp.toPrecision(3);
    txtPrint("<span title='Surface temperature'>\n\
<em>T</em><sub>Surf</sub> = </span> "
            + roundNum
            + " <span title='Kelvin'>\n\
<a href='https://en.wikipedia.org/wiki/Kelvin' target='_blank'>K</a>\n\
</span> ",
            180 + colr * xTab, 40, zeroInt, zeroInt, zeroInt, textId);
//
    roundNum = teff.toPrecision(3);
    txtPrint("<span title='Effective temperature'>\n\
<a href='https://en.wikipedia.org/wiki/Effective_temperature' target='_blank'><em>T</em><sub>eff</sub></a> = \n\
</span> "
            + roundNum
            + " <span title='Kelvin'>\n\
<a href='https://en.wikipedia.org/wiki/Kelvin' target='_blank'>K</a>\n\
</span> ",
            360 + colr * xTab, 15, zeroInt, zeroInt, zeroInt, textId);
//
    roundNum = logg.toPrecision(3);
    txtPrint("<span title='Surface gravity'>\n\
<a href='https://en.wikipedia.org/wiki/Surface_gravity' target='_blank'>log <em>g</em></a> = \n\
</span> "
            + roundNum
            + " <span title=''>\n\
cm s<sup>-2</sup>\n\
</span> ",
            360 + colr * xTab, 40, zeroInt, zeroInt, zeroInt, textId);
//
    roundNum = temp0.toPrecision(4);
    txtPrint("<span title='Central temperature'>\n\
<em>T</em><sub>0</sub> = </span> "

            + roundNum
            + " <span title='Kelvin'>\n\
<a href='https://en.wikipedia.org/wiki/Kelvin' target='_blank'>K</a>\n\
</span> ",
            520 + colr * xTab, 10, zeroInt, zeroInt, zeroInt, textId);
//
    roundNum = rho0.toPrecision(5);
    txtPrint("<span title='Central mass density'>\n\
<em>&#961</em><sub>0</sub> = </span> "
            + roundNum
            + " <span title=''>\n\
g cm<sup>-3</sup>\n\
</span> ",
            520 + colr * xTab, 30, zeroInt, zeroInt, zeroInt, textId);
//
    roundNum = press0.toPrecision(4);
    txtPrint("<span title='Central total pressure (gas + radiation)'>\n\
<em>P</em><sub>Total, 0</sub> = </span></span> "
            + roundNum
            + " <span title=''>\n\
<a href='https://en.wikipedia.org/wiki/Pressure' target='_blank'>dynes cm<sup>-2</sup></a>\n\
</span> ",
            520 + colr * xTab, 50, zeroInt, zeroInt, zeroInt, textId);
//

    // UBVRI indices
    var xTab = 80;
    var colr = 0;
    var roundNum0 = colors[0].toFixed(2);
    var roundNum1 = colors[1].toFixed(2);
    var roundNum2 = colors[2].toFixed(2);
    var roundNum3 = colors[3].toFixed(2);
    var roundNum4 = colors[4].toFixed(2);
    txtPrint("<a href='http://en.wikipedia.org/wiki/UBV_photometric_system' title='Johnson-Cousins U-B photometric color index' target='_blank'>\n\
<span style='color:purple'>U</span>-" +
            "<span style='color:blue'>B\n\
</span>\n\
</a>: " + roundNum0
            + " <a href='http://en.wikipedia.org/wiki/UBV_photometric_system' title='Johnson-Cousins B-V photometric color index' target='_blank'>\n\
<span style='color:blue'>B\n\
</span>-" +
            "<span style='color:#00FF88'>V</span></a>: " + roundNum1
            + " <a href='http://en.wikipedia.org/wiki/UBV_photometric_system' title='Johnson-Cousins V-R photometric color index' target='_blank'>\n\
<span style='color:#00FF88'>V\n\
</span>-" +
            "<span style='color:red'>R\n\
</span>\n\
</a>: " + roundNum2
            + " <a href='http://en.wikipedia.org/wiki/UBV_photometric_system' title='Johnson-Cousins V-I photometric color index' target='_blank'>\n\
<span style='color:#00FF88'>V\n\
</span>-" +
            "<span style='color:red'>I\n\
</span>\n\
</a>: " + roundNum3
            + " <a href='http://en.wikipedia.org/wiki/UBV_photometric_system' title='Johnson-Cousins R-I photometric color index' target='_blank'>\n\
<span style='color:red'>R</span>-" +
            "<span style='color:brown'>I\n\
</span>\n\
</a>: " + roundNum4, 780 + colr * xTab, 15, zeroInt, zeroInt, zeroInt, textId);
//

    //Default initializations:
    var spectralClass = "-";
    var luminClass = "-";

    if (teff < 3000.0) {
        spectralClass = "L";
    } else if ((teff >= 3000.0) && (teff < 3900.0)) {
        spectralClass = "M";
    } else if ((teff >= 3900.0) && (teff < 5200.0)) {
        spectralClass = "K";
    } else if ((teff >= 5200.0) && (teff < 5950.0)) {
        spectralClass = "G";
    } else if ((teff >= 5950.0) && (teff < 7300.0)) {
        spectralClass = "F";
    } else if ((teff >= 7300.0) && (teff < 9800.0)) {
        spectralClass = "A";
    } else if ((teff >= 9800.0) && (teff < 30000.0)) {
        spectralClass = "B";
    } else if (teff >= 30000.0) {
        spectralClass = "O";
    }

    if ((logg >= 1.0) && (logg < 1.5)) {
        luminClass = "II";
    } else if ((logg >= 1.5) && (logg < 3.0)) {
        luminClass = "III";
    } else if ((logg >= 3.0) && (logg < 4.0)) {
        luminClass = "IV";
    } else if ((logg >= 4.0) && (logg < 5.0)) {
        luminClass = "V";
    } else if (logg >= 5.0) {
        luminClass = "VI";
    }

    var spectralType = "<a href='https://en.wikipedia.org/wiki/Stellar_classification' title='MK Spectral type' target='_blank'>" +
            "Spectral type " +
            "</a>" + spectralClass + " " + luminClass;

    txtPrint(spectralType, 780, 40, zeroInt, zeroInt, zeroInt, textId);
//
    xTab = 140;
    var outString, fullNum, j;
    //var numReportable = numInputs - numPreStars - numPreLines - -numPrePlanets - numPerfModes - 1;
    var echoText = "<table><tr>  ";
    //  var setName = ""; //initialization

    for (var i = 0; i < numInputs; i++) {

        var fullNum = settingsId[i].value;
        //roundNum = fullNum.toPrecision(2);
        roundNum = fullNum;
        //console.log("i " + i + " settingsId[i].name " + settingsId[i].name + " settingsId[i].value " + settingsId[i].value + " fullNum " + fullNum + " roundNum " + roundNum);
        if (flagArr[i]) {
            outString = "<td>   <span style='color:red'>   " + settingsId[i].name + "</br>" + roundNum.toString(10) + "   </span>   </td>";
            //outString = "<td>   <span style='color:red'>   " + setName + "</br>" + roundNum.toString(10) + "   </span>   </td>";
        } else {
            outString = "<td>   <span style='color:black'>   " + settingsId[i].name + "</br>" + roundNum.toString(10) + "   </span>   </td>";
            //outString = "<td>   <span style='color:black'>   " + setName + "</br>" + roundNum.toString(10) + "   </span>   </td>";
        }
        //if (i === numReportable / 2){
        //    echoText = echoText + "</tr><tr>";  // New row
        //};
        echoText = echoText + "   " + outString + "   ";
    }  // i loop

    echoText = echoText + "  </tr></table>";
    txtPrint(echoText, 1200, 10, zeroInt, zeroInt, zeroInt, textId);
//
//  NOTE!!!
//  
//  The remaining 3000+ lines of code or so are all devoted to the graphical output plots.  
//  Have not been able to spin this stuff off into separare function that can be called from 
//  seperate source files by the HTML code.  This is baaaaad!  :-(
//    
// Each of these plots takes ~400 lines of code to convert JavaScript calculations into 
// HTML elements!!
// I'd like to spin each plot into a separate function in its own *.js source file, but it doesn't 
// seem to work - !!???

// ***** WARNING: Do NOT rearrange order of plot-wise code-blocks.  Some blocks use variables declared and initialized in
// previous blocks.  If you want to re-arrange the plots in the WWW page, change the row and column number
// indices (plotRow, plotCol) at the beginning of each block

    var colorTemp = function(temp, minTeff, maxTeff, dark) {

        // Converts a gas temperature in K to a approximate rendering RGB color according
        // to the Wien displacement law of blackbody radiation

        var wien = 2.8977721E-1; // Wien's displacement law constant in cm K
        var logMaxPeak = Math.log(wien / minTeff);
        var logMinPeak = Math.log(wien / maxTeff);
        //var greenTeff = 6000.; // K
        var tempSun = 6000;
        //var logGreenPeak = Math.log(wien / greenTeff);
//
        //var logLamPeak = Math.log(wien / temp); // lambda in cm
        var tempVega = 9550.0;
        // Color palate - try keeping the amoung of green neutral and varying the red and blue inversely with Teff
// For hex RRGGBB format there are 16^2 = 256 different values for each of R, G, and B:
// compute how much red and blue should be in the render colour:
// Do not usef full range - buffer by 10 at either end to avoid near- black and white values - ??

        //var gg = 0.0;
        var rr, gg, bb;
        // Red side of green peak
        // if (logLamPeak >= logGreenPeak) {
        //   gg = 0.5 * Math.pow(16, 2) * (logMaxPeak - logLamPeak) / (logMaxPeak - logGreenPeak);
        //    // blue side of green peak
        // } else {
        //    gg = 0.5 * Math.pow(16, 2) * (logLamPeak - logMinPeak) / (logGreenPeak - logMinPeak);
        // }
        if (temp <= tempSun) {
            rr = 255.0;
            gg = 255.0 * (1.0 - (tempSun - temp) / (tempSun - minTeff));
            bb = 255.0 * (1.0 - (tempVega - temp) / (tempVega - minTeff));
        } else if (temp <= tempVega && temp >= tempSun) {
            rr = 255.0;
            gg = 255.0;
            bb = 255.0 * (1.0 - (tempVega - temp) / (tempVega - minTeff));
        } else {
            rr = 255.0 * (1.0 - (temp - tempVega) / (maxTeff - tempVega));
            gg = 255.0 * (1.0 - (temp - tempVega) / (maxTeff - tempVega));
            bb = 255.0;
        }

        var ggI = Math.ceil(dark * gg);
////var tempDisk2 = teff;
// The higher the Teff, the more blue... :
//        //var bb = Math.pow(16, 2) * (logTen(tempDisk2) - logTen(minTeff)) / (logTen(maxTeff) - logTen(minTeff));  // logarithmically 
        //       //var bb = Math.pow(16, 2) - Math.pow(16, 2) * (logLamPeak - logMinPeak) / (logMaxPeak - logMinPeak); 
        //       var bb = Math.pow(16, 2) * (logMaxPeak - logLamPeak) / (logMaxPeak - logMinPeak);
////    var bb = Math.pow(16,2) * ( msTeffs[k] - minTeff )/( maxTeff - minTeff );  // linearly
        var bbI = Math.floor(dark * bb); //MUST convert to integer

//// ... and the less red:
        //       //var rr = Math.pow(16, 2) - Math.pow(16, 2) * (logTen(tempDisk2) - logTen(minTeff)) / (logTen(maxTeff) - logTen(minTeff)); //logarithmically       
        //       var rr = Math.pow(16, 2) * Math.pow((logLamPeak - logMinPeak) / (logMaxPeak - logMinPeak), 2);
////    var rr =  Math.pow(16,2) - Math.pow(16,2) * ( msTeffs[k] - minTeff )/( maxTeff - minTeff ); //linearly
        var rrI = Math.floor(dark * rr); //MUST convert to integer

        //var starRGBHex = "rgb(" + rrI + "," + ggI + "," + bbI + ")";
        //return starRGBHex;

        var RGBArr = [rrI, ggI, bbI];
        return RGBArr;
    };
//    
// Set up the canvas:
//

// **********  Basic canvas parameters: These are numbers in px - needed for calculations:
// All plots and other output must fit within this region to be white-washed between runs

    /*
     var xRange = 1850;
     var yRange = 600;
     */
    var xOffset = 10;
    var yOffset = 20 + yRangeT + yOffsetT;
    var charToPx = 4; // width of typical character font in pixels - CAUTION: finesse!


    var xRange = 300;
    var yRange = 200;
    //var xOffset = 10;
    //var yOffset = 20;

    //these are the corresponding strings ready to be assigned to HTML style attributes


    var xRangeStr = numToPxStrng(xRange);
    var yRangeStr = numToPxStrng(yRange);
    var xOffsetStr = numToPxStrng(xOffset);
    var yOffsetStr = numToPxStrng(yOffset);
    //******* tick mark, label, and axis name properties: 

    var wColor = "#F0F0F0";
    var washer = function(xOffset, yOffset, wColor, areaId) {
        // Very first thing on each load: White-wash the canvas!!


        var washXMargin = 150;
        var washYMargin = 110;
        var washWidth = xRange + washXMargin; //+ xOffset;
        var washHeight = yRange + washYMargin; //+ yOffset;
        var washTop = yOffset - washYMargin / 2 - 16;
        var washLeft = xOffset - washXMargin / 2 - 50;
        var washWidthStr = numToPxStrng(washWidth);
        var washHeightStr = numToPxStrng(washHeight);
        var washTopStr = numToPxStrng(washTop);
        var washLeftStr = numToPxStrng(washLeft);
        var washId = document.createElement("div");
        washId.id = "wash";
        washId.style.position = "absolute";
        washId.style.width = washWidthStr;
        washId.style.height = washHeightStr;
        washId.style.marginTop = washTopStr;
        //washId.style.marginLeft = "0px";
        washId.style.marginLeft = washLeftStr;
        washId.style.opacity = 1.0;
        //washId.style.backgroundColor = "#EEEEEE";
        washId.style.backgroundColor = wColor;
        //washId.style.zIndex = -1;
        washId.style.zIndex = 0;
        //washId.style.border = "1px gray solid";

        //Wash the canvas:
        //masterId.appendChild(washId);
        areaId.appendChild(washId);
    };

    var xOffsetStr = numToPxStrng(xOffset);
    var yOffsetStr = numToPxStrng(yOffset);
    // ******Individual plot size parameters:


    var charToPx = 4; // width of typical character font in pixels - CAUTION: finesse!
    //
    //Initialize quantities needed for various plots - plots are now all in if(){} blocks
    // so all this now has to be initialized ahead of time:
    // Will need this in some if blocks below:

    var iLamMinMax = minMax(SED);
    var iLamMax = iLamMinMax[1];
    var norm = 1.0e15; // y-axis normalization
    var wien = 2.8977721E-1; // Wien's displacement law constant in cm K
    var lamMax = 1.0e7 * (wien / teff);
    lamMax = lamMax.toPrecision(5);
    var lamMaxStr = lamMax.toString(10);
    var bandFlux = fColors(waveGrid, SED, numWaves);
    //Vega's disk center values of B, V, R intensity normalized by B+V+R:
    //var vegaBVR = [1.0, 1.0, 1.0]; //for now
    //console.log("Vega: rr " + vegaBVR[2] +
    //        " gg " + vegaBVR[1] +
    //        " bb " + vegaBVR[0]);
    var rgbVega = [183.0 / 255.0, 160.0 / 255.0, 255.0 / 255.0];
    var bvr = bandFlux[2] + bandFlux[3] + bandFlux[4];
    //console.log("bandIntens[2][0]/bvr " + bandIntens[2][0] / bvr + " bandIntens[3][0]/bvr " + bandIntens[3][0] / bvr + " bandIntens[4][0]/bvr " + bandIntens[4][0] / bvr);
    //console.log("Math.max(bandIntens[2][0]/bvr, bandIntens[3][0]/bvr, bandIntens[4][0]/bvr) " + Math.max(bandIntens[2][0] / bvr, bandIntens[3][0] / bvr, bandIntens[4][0] / bvr));
    var brightScale = 255.0 / Math.max(bandFlux[2] / bvr, bandFlux[3] / bvr, bandFlux[4] / bvr);
    var saveRGB = []; //intialize
    var saveRadius = 0.0; //initialize
    var radiusScale = 20; //solar_radii-to-pixels!
    var logScale = 20; //amplification factor for log pixels
    // 
    // Star radius in pixels:
    //    var radiusPx = (radiusScale * radius);  //linear radius
    var radiusPx = logScale * logTen(radiusScale * radius); //logarithmic radius
    radiusPx = Math.ceil(radiusPx);

    //var cosFctr = cosTheta[1][i];
    //var cosFctr = 0.0;
    //var radiusPxI = Math.ceil(radiusPx * Math.sin(Math.acos(cosFctr)));
    var radiusPxI = radiusPx;
    var radiusStr = numToPxStrng(radiusPxI);
    saveRadius = radiusPxI; // For HRD, plot nine
    //var i = Math.ceil(numThetas / 2);
    var rrI = Math.ceil(brightScale * (bandFlux[4] / bvr) / rgbVega[0]); // / vegaBVR[2]);
    var ggI = Math.ceil(brightScale * (bandFlux[3] / bvr) / rgbVega[1]); // / vegaBVR[1]);
    var bbI = Math.ceil(brightScale * (bandFlux[2] / bvr) / rgbVega[2]); // / vegaBVR[0]);
    //console.log(" rrI: " + rrI + " ggI: " + ggI + " bbI: " + bbI + " dark: " + dark);
    var RGBArr = [];
    RGBArr.length = 3;
    RGBArr[0] = rrI;
    RGBArr[1] = ggI;
    RGBArr[2] = bbI;
    saveRGB = RGBArr; // For HRD, plot nine



    //******* tick mark, label, and axis name properties: 

    //tick marks:
    var tickHeight = 8;
    var tickHeightStr = numToPxStrng(tickHeight);
    var tickWidth = "0px";
    var tickColor = "black";
    var tickBorder = "1px black solid";
    //labels:
    var labelHeight = 15;
    var labelHeightStr = numToPxStrng(labelHeight);
    var labelWidth = 80;
    var labelWidthStr = numToPxStrng(labelWidth);
    //
    //
    //
    // ********* stabdForm()
    //
    //
    //

    var standForm = function(x) {
        // Turn any old number into the nearest number in standard form with a whole number exponent
        // and a mantissa rounded to the nearest canonical value appropriate for labeling a tick mark 

        var numParts = [2];
        var isNeg = false;
        if (x === 0.0) {
            numParts = [0.0, 0.0];
        } else {

            if (x < 0) {
                isNeg = true;
                x = -1.0 * x;
            }

            var b = logTen(x);
            var n = Math.floor(b);
            var a = x / Math.pow(10.0, n);
            if (isNeg === true) {
                a = -1.0 * a;
            }

            numParts[0] = a; //mantissa
            numParts[1] = n; //exponent
        }

        return numParts;
    };
    //
    //
    //
    // ********* rounder()
    //
    //
    //

    var rounder = function(x, n, flag) {

        // Return a number rounded up or down to n decimal places (sort of?)

        var y, z;
        n = Math.abs(Math.floor(n)); //n was supposed to be a positive whole number anyway
        if (flag != "up" && flag != "down") {
            flag = "down";
        }

        if (n === 0) {
            z = x;
        } else {
            var fctr = Math.pow(10.0, n);
            var fx = 1.0 * x;
            y = fx * fctr;
            if (flag === "up") {
                z = Math.ceil(y);
            } else {
                z = Math.floor(y);
            }

            var fz = 1.0 * z;
            fz = fz / fctr;
        }

        return fz;
    };
    //
    //
    //
    // ********* XBar()
    //
    //
    //
//// Draws a horizontal line (for any purpose) at a given DATA y-coordinate (yVal) 
//and returns the DEVICE y-coordinate (yShift) for further use by calling routine
// (such as placing an accompanying annotation)
//
    var XBar = function(plotRow, plotCol,
            yVal, minYDataIn, maxYDataIn,
            color, areaId) {

        var xOffset = 100 + plotCol * (xRange + 150);
        var yOffset = 100 + yRangeT + yOffsetT + plotRow * (yRange + 120);
        var xOffsetStr = numToPxStrng(xOffset);
        var yOffsetStr = numToPxStrng(yOffset);
        var xLowerYOffset = yOffset + yRange;
        var xLowerYOffsetStr = numToPxStrng(xLowerYOffset);
        //x-axis name properties:

        var yTickXOffset = xOffset - tickHeight / 2; //height and width reversed for y-ticks
        var yTickXOffsetStr = numToPxStrng(yTickXOffset);
        var barWidth = xRange;
        var barWidthStr = numToPxStrng(barWidth);
        var barHeightStr = "1px";
        var yTickPos = yRange * (yVal - minYDataIn) / (maxYDataIn - minYDataIn);
        //       xTickPos = xTickPos;


        var yShift = xLowerYOffset - yTickPos;
//stringify and add unit:
        var yShiftStr = numToPxStrng(yShift);
        //console.log("XBar: yTickPos, yShift, minYDataIn, maxYDataIn, yRange, yVal: "
        //        + yTickPos + " " + yShift + " " + minYDataIn + " " + maxYDataIn + " " + yRange + " " + yVal);

// Make the y-tick mark, Teff:

        var yTickId = document.createElement("div");
        yTickId.class = "ytick";
        yTickId.style.position = "absolute";
        yTickId.style.display = "block";
        yTickId.style.marginLeft = yTickXOffsetStr;
        //yTickId.style.border = tickBorder;
// Note that for y ticks, the height and width are reversed!:
        yTickId.style.width = barWidthStr;
        yTickId.style.height = barHeightStr;
        yTickId.style.zIndex = 0;
        yTickId.style.marginTop = yShiftStr;
        yTickId.style.backgroundColor = color;
//Append the tickmark to the axis element
        //masterId.appendChild(yTickId);
        areaId.appendChild(yTickId);
        return yShift;
    };
    //
    //
    //
    // ********* YBar()
    //
    //
    //

// Draws a vertical line (for any purpose) at a given DATA x-coordinate (xVal) 
//and returns the DEVICE x-coordinate (xShift) for further use by calling routine
// (such as placing an accompanying annotation)
//
    var YBar = function(plotRow, plotCol,
            xVal, minXDataIn, maxXDataIn, barWidth, barHeight,
            yFinesse, color, areaId) {

        var xOffset = 100 + plotCol * (xRange + 150);
        var yOffset = 100 + yRangeT + yOffsetT + plotRow * (yRange + 120) + yFinesse;
        var xOffsetStr = numToPxStrng(xOffset);
        var yOffsetStr = numToPxStrng(yOffset);
        var xLowerYOffset = yOffset + yRange;
        var xLowerYOffsetStr = numToPxStrng(xLowerYOffset);
        var xTickYOffset = xLowerYOffset - tickHeight / 2;
        var xTickYOffsetStr = numToPxStrng(xTickYOffset);
        //var barHeight = yRange;
        var barHeightStr = numToPxStrng(barHeight);
        //var barWidthStr = "1px";
        var barWidthStr = numToPxStrng(barWidth);
        var xTickPos = xRange * (xVal - minXDataIn) / (maxXDataIn - minXDataIn);
        //       xTickPos = xTickPos;
        //console.log("YBar: xVal, minXDataIn, maxXDataIn: " + xVal + " " + minXDataIn + " " + maxXDataIn);

        var xShift = xOffset + xTickPos;
//stringify and add unit:
        var xShiftStr = numToPxStrng(xShift);
        //console.log("YBar: xTickPos, xOffset, xShift, xTickYOffsetStr, barWidthStr, barHeightStr: " +
        //        xTickPos + " " + xOffset + " " + xShift + " " + xTickYOffsetStr + " " + barWidthStr + " " + barHeightStr);

// Make the x-tick mark, Teff:
        //console.log("In YBar: xVal " + xVal + " minXDataIn " + minXDataIn + " maxXDataIn " + maxXDataIn + " xRange " + xRange + " barWidth " + barWidth + " xShift " + xShift);
        //console.log("In YBar: xVal " + xVal + " barWidth " + barWidth + " xShift " + xShift);
        var xTickId = document.createElement("div");
        xTickId.class = "xtick";
        xTickId.style.position = "absolute";
        xTickId.style.display = "block";
        xTickId.style.marginTop = yOffsetStr;
        //xTickId.style.marginTop = xLowerYOffsetStr;
        xTickId.style.marginLeft = xShiftStr;
        xTickId.style.height = barHeightStr;
        xTickId.style.width = barWidthStr;
        //xTickId.style.border = tickBorder;
        xTickId.style.backgroundColor = color;
        xTickId.style.zIndex = 0;
//Append the tickmark to the axis element
        //masterId.appendChild(xTickId);
        areaId.appendChild(xTickId);
        return xShift;
    };
    //
    //console.log("xRange " + xRange + " yRange " + yRange);
    //
    //
    //
    //  ***** XAxis()
    //
    //
    //

    var XAxis = function(plotRow, plotCol,
            minXDataIn, maxXDataIn, xAxisName,
            areaId) {

        var axisParams = [];
        axisParams.length = 8;
        // Variables to handle normalization and rounding:
        var numParts = [];
        numParts.length = 2;
        //var mantissa;
        var xOffset = 100 + plotCol * (xRange + 150);
        var yOffset = 100 + yRangeT + yOffsetT + plotRow * (yRange + 120);
        axisParams[0] = xOffset;
        axisParams[4] = yOffset;
        var xOffsetStr = numToPxStrng(xOffset);
        var yOffsetStr = numToPxStrng(yOffset);
        var xLowerYOffset = yOffset + yRange;
        var xLowerYOffsetStr = numToPxStrng(xLowerYOffset);
        var xTickYOffset = xLowerYOffset - tickHeight / 2;
        var xTickYOffsetStr = numToPxStrng(xTickYOffset);
        var xLabelYOffset = xLowerYOffset + labelHeight;
        var xLabelYOffsetStr = numToPxStrng(xLabelYOffset);
        //x-axis name properties:
        var xNameYOffset = xLowerYOffset + 2 * labelHeight;
        //var xNameYOffsetStr = numToPxStrng(xNameYOffset);
        var xNameXOffset = Math.floor(xRange / 2) + xOffset;
        //var xNameXOffsetStr = numToPxStrng(xNameXOffset);

        axisParams[5] = xLowerYOffset;
        washer(xOffset, yOffset, wColor, areaId);
        //console.log(xOffsetStr);

        var xId = document.createElement("div");
        xId.class = "xaxis";
        xId.style.position = "absolute";
        xId.style.width = xRangeStr;
        xId.style.height = "1px";
        xId.style.marginTop = xLowerYOffsetStr;
        xId.style.marginLeft = xOffsetStr;
        xId.style.border = "1px black solid";
        //Draw the x-axis:
        //masterId.appendChild(xId);
        areaId.appendChild(xId);
        //console.log("XAxis(): minXDataIn: " + minXDataIn + " maxXDataIn " + maxXDataIn);
        numParts = standForm(minXDataIn);
        //mantissa = rounder(numParts[0], 1, "down");
        //minXData = mantissa * Math.pow(10.0, numParts[1]);
        var mantissa0 = numParts[0];
        var exp0 = numParts[1];
        //numParts = standForm(maxXDataIn);
        //mantissa = rounder(numParts[0], 1, "up");
        //maxXData = mantissa * Math.pow(10.0, numParts[1]);
        var mantissa1 = maxXDataIn / Math.pow(10.0, exp0);
        //var rangeXData = maxXData - minXData;
        var reverse = false; //initialization
        var rangeXData = mantissa1 - mantissa0;
        //console.log("mantissa0 " + mantissa0 + " exp0 " + exp0 + " mantissa1 " + mantissa1);
        //Catch axes that are supposed to be backwards
        if (rangeXData < 0.0) {
            rangeXData = -1.0 * rangeXData;
            reverse = true;
        }
        //console.log("XAxis(): reverse: " + reverse + " rangeXData " + rangeXData);
        var deltaXData = 1.0; //default initialization
        if (rangeXData >= 100000.0) {
            deltaXData = 20000.0;
        } else if ((rangeXData < 100000.0) && (rangeXData >= 20000.0)) {
            deltaXData = 25000.0;
        } else if ((rangeXData < 20000.0) && (rangeXData >= 1000.0)) {
            deltaXData = 5000.0;
        } else if ((rangeXData < 1000.0) && (rangeXData >= 250.0)) {
            deltaXData = 200.0;
        } else if ((rangeXData < 250.0) && (rangeXData >= 100.0)) {
            deltaXData = 20.0;
        } else if ((rangeXData < 100.0) && (rangeXData >= 50.0)) {
            deltaXData = 10.0;
        } else if ((rangeXData < 50.0) && (rangeXData >= 20.0)) {
            deltaXData = 5.0;
        } else if ((rangeXData < 20.0) && (rangeXData >= 8.0)) {
            deltaXData = 2.0;
        } else if ((rangeXData <= 2.0) && (rangeXData > 0.5)) {
            deltaXData = 0.20;
        } else if ((rangeXData <= 0.5) && (rangeXData > 0.1)) {
            deltaXData = 0.1;
        } else if (rangeXData <= 0.1) {
            deltaXData = 0.02;
        }
        //console.log("XAxis: mantissa0 " + mantissa0 + " exp0 " + exp0 + " mantissa1 " + mantissa1 + " rangeXData " + rangeXData + " reverse " + reverse + " deltaXData " + deltaXData);
        var mantissa0new = mantissa0 - (mantissa0 % deltaXData) - deltaXData;
        var mantissa1new = mantissa1 - (mantissa1 % deltaXData) + deltaXData;
        var numXTicks = Math.floor((mantissa1new - mantissa0new) / deltaXData);
        //console.log("numXTicks " + numXTicks + " mantissa0new " + mantissa0new + " mantissa1new " 
        //        + mantissa1new + " deltaXData " + deltaXData);
        if (reverse) {
            deltaXData = -1.0 * deltaXData;
            //minXData2 = minXData2 - deltaXData; //sigh - I dunno.
            numXTicks = (-1 * numXTicks); // + 1; //sigh - I dunno.
        }
        numXTicks++;
        var minXData2, maxXData2, rangeXData2;
        minXData2 = mantissa0new * Math.pow(10.0, exp0);
        maxXData2 = mantissa1new * Math.pow(10.0, exp0);
        rangeXData2 = (mantissa1new - mantissa0new) * Math.pow(10.0, exp0);
        deltaXData = deltaXData * Math.pow(10.0, exp0);
        //var deltaXData = rangeXData / (1.0 * numXTicks);
        //numParts = standForm(deltaXData);
        //mantissa = rounder(numParts[0], 1, "down");
        //deltaXData = mantissa * Math.pow(10.0, numParts[1]);
        var deltaXPxl = xRange / (numXTicks - 1);
        //console.log("XAxis: mantissa0new " + mantissa0new + " mantissa1new " + mantissa1new + " deltaXData " + deltaXData + " minXData2 " + minXData2 + " maxXData2 " + maxXData2 + " deltaXPxl " + deltaXPxl + " rangeXData2 " + rangeXData2);
        axisParams[1] = rangeXData2;
        axisParams[2] = deltaXData;
        axisParams[3] = deltaXPxl;
        axisParams[6] = minXData2;
        axisParams[7] = maxXData2;
        //
        //console.log("XAxis: xOffset " + xOffset);
        var ii;
        for (var i = 0; i < numXTicks; i++) {

            ii = 1.0 * i;
            var xTickPos = ii * deltaXPxl;
            var xTickVal = minXData2 + (ii * deltaXData);
            var xTickRound = xTickVal.toPrecision(3);
            //var xTickRound = xTickVal;
            var xTickValStr = xTickRound.toString(10);
            // horizontal position in pixels - data values increase rightward:
            var xShift = xOffset + xTickPos;
//stringify and add unit:
            //console.log("XAxis: xTickVal " + xTickVal + " xTickPos " + xTickPos);
            var xShiftStr = numToPxStrng(xShift);
// Make the x-tick mark, Teff:

            var xTickId = document.createElement("div");
            xTickId.class = "xtick";
            xTickId.style.position = "absolute";
            xTickId.style.display = "inline";
            xTickId.style.marginTop = xTickYOffsetStr;
            //xTickId.style.marginTop = xLowerYOffsetStr;
            xTickId.style.marginLeft = xShiftStr;
            xTickId.style.height = tickHeightStr;
            xTickId.style.width = tickWidth;
            xTickId.style.border = tickBorder;
            xTickId.style.zIndex = 0;
//Append the tickmark to the axis element
            //masterId.appendChild(xTickId);
            areaId.appendChild(xTickId);
            //Make the tick label, Teff:

            txtPrint("<span style='font-size:x-small'>" + xTickValStr + "</span>",
                    xShift, xLabelYOffset, zeroInt, zeroInt, zeroInt, areaId);
        }  // end x-tickmark loop


// Add name of x-axis:

        var xNameXOffsetThis = xNameXOffset - charToPx * "Depth (km)".length;
        txtPrint("<span style='font-size:small'>" + xAxisName + "</span>",
                xNameXOffsetThis, xNameYOffset, zeroInt, zeroInt, zeroInt, areaId);
        // console.log("XAxis: " + axisParams[0]);
        return axisParams;
    };
    //
    //
    //
    //  ***** YAxis()
    //
    //
    //

    var YAxis = function(plotRow, plotCol,
            minYDataIn, maxYDataIn, yAxisName,
            areaId) {

        var axisParams = [];
        axisParams.length = 8;
        // Variables to handle normalization and rounding:
        var numParts = [];
        numParts.length = 2;
        //var mantissa;
        var xOffset = 100 + plotCol * (xRange + 150);
        var yOffset = 100 + yRangeT + yOffsetT + plotRow * (yRange + 120);
        axisParams[0] = xOffset;
        axisParams[4] = yOffset;
        var xOffsetStr = numToPxStrng(xOffset);
        var yOffsetStr = numToPxStrng(yOffset);
        var xLowerYOffset = yOffset + yRange;
        var xLowerYOffsetStr = numToPxStrng(xLowerYOffset);
        //x-axis name properties:

        var yTickXOffset = xOffset - tickHeight / 2; //height and width reversed for y-ticks
        var yTickXOffsetStr = numToPxStrng(yTickXOffset);
        var yLabelXOffset = xOffset - 3 * labelHeight; //height & width reversed for y-ticks
        var yLabelXOffsetStr = numToPxStrng(yLabelXOffset);
        var yNameYOffset = yOffset + Math.floor(yRange / 2);
        //var yNameYOffsetStr = numToPxStrng(yNameYOffset);
        var yNameXOffset = xOffset - 100;
        //var yNameXOffsetStr = numToPxStrng(yNameXOffset);

        axisParams[5] = xLowerYOffset;
        // Create the LEFT y-axis element and set its style attributes:

        var yId = document.createElement("div");
        yId.class = "yaxis";
        yId.style.position = "absolute";
        yId.style.width = "1px";
        yId.style.height = yRangeStr;
        yId.style.marginLeft = xOffsetStr;
        yId.style.marginTop = yOffsetStr;
        yId.style.border = "1px black solid";
        //Draw the y-axis:
        //masterId.appendChild(yId);
        areaId.appendChild(yId);
        numParts = standForm(minYDataIn);
        //mantissa = rounder(numParts[0], 1, "down");
        //minYData = mantissa * Math.pow(10.0, numParts[1]);
        var mantissa0 = numParts[0];
        var exp0 = numParts[1];
        //numParts = standForm(maxYDataIn);
        //mantissa = rounder(numParts[0], 1, "up");
        //maxYData = mantissa * Math.pow(10.0, numParts[1]);
        var mantissa1 = maxYDataIn / Math.pow(10.0, exp0);
        //var rangeYData = maxYData - minYData;
        var reverse = false; //initialization
        var rangeYData = mantissa1 - mantissa0;
        //Catch axes that are supposed to be backwards
        if (rangeYData < 0.0) {
            rangeYData = -1.0 * rangeYData;
            reverse = true;
        }
        var deltaYData = 1.0; //default initialization
        if (rangeYData >= 100000.0) {
            deltaYData = 20000.0;
        } else if ((rangeYData < 100000.0) && (rangeYData >= 10000.0)) {
            deltaXData = 20000.0;
        } else if ((rangeYData < 10000.0) && (rangeYData >= 1000.0)) {
            deltaYData = 500.0;
        } else if ((rangeYData < 1000.0) && (rangeYData >= 250.0)) {
            deltaYData = 200.0;
        } else if ((rangeYData < 250.0) && (rangeYData >= 100.0)) {
            deltaYData = 20.0;
        } else if ((rangeYData < 100.0) && (rangeYData >= 50.0)) {
            deltaYData = 10.0;
        } else if ((rangeYData < 50.0) && (rangeYData >= 20.0)) {
            deltaYData = 5.0;
        } else if ((rangeYData < 20.0) && (rangeYData >= 8.0)) {
            deltaYData = 2.0;
        } else if ((rangeYData <= 2.0) && (rangeYData > 0.5)) {
            deltaYData = 0.20;
        } else if ((rangeYData <= 0.5) && (rangeYData > 0.1)) {
            deltaYData = 0.1;
        } else if (rangeYData <= 0.1) {
            deltaYData = 0.02;
        }
        //console.log("YAxis: mantissa0 " + mantissa0 + " exp0 " + exp0 + " mantissa1 " + mantissa1 + " rangeYData " + rangeYData + " deltaYData " + deltaYData);
        var mantissa0new = mantissa0 - (mantissa0 % deltaYData);
        var mantissa1new = mantissa1 - (mantissa1 % deltaYData) + deltaYData;
        var numYTicks = Math.floor((mantissa1new - mantissa0new) / deltaYData); // + 1;
        if (reverse) {
            deltaYData = -1.0 * deltaYData;
            //minYData2 = minYData2 - deltaXData; //sigh - I dunno.
            numYTicks = (-1 * numYTicks); // + 1; //sigh - I dunno.
        }
        numYTicks++;
        deltaYData = deltaYData * Math.pow(10.0, exp0);
        var minYData2, maxYData2, rangeYData2;
        minYData2 = mantissa0new * Math.pow(10.0, exp0);
        maxYData2 = mantissa1new * Math.pow(10.0, exp0);
        rangeYData2 = (mantissa1new - mantissa0new) * Math.pow(10.0, exp0);
        //console.log("YAxis(): minYData2 " + minYData2 + " maxYData2 " + maxYData2 + " rangeYData2 " + rangeYData2);
        //var deltaYData = rangeYData / (1.0 * numYTicks);
        //numParts = standForm(deltaYData);
        //mantissa = rounder(numParts[0], 1, "down");
        //deltaYData = mantissa * Math.pow(10.0, numParts[1]);
        var deltaYPxl = yRange / (numYTicks - 1);
        //console.log("YAxis: mantissa0new " + mantissa0new + " mantissa1new " + mantissa1new + " deltaYData " + deltaYData + " minYData " + minYData + " maxYData " + maxYData + " deltaYPxl " + deltaYPxl);
        axisParams[1] = rangeYData2;
        axisParams[2] = deltaYData;
        axisParams[3] = deltaYPxl;
        axisParams[6] = minYData2;
        axisParams[7] = maxYData2;
        //
        var ii;
        for (var i = 0; i < numYTicks; i++) {

            ii = 1.0 * i;
            var yTickPos = ii * deltaYPxl;
            // Doesn't work - ?? var yTickVal = minYDataRnd + (ii * deltaDataRnd);
            var yTickVal = minYData2 + (ii * deltaYData);
            var yTickRound = yTickVal.toPrecision(3);
            //console.log("YAxis: yTickRound " + yTickRound + " yTickPos " + yTickPos);
            //var yTickRound = yTickVal;
            var yTickValStr = yTickRound.toString(10);
            // vertical position in pixels - data values increase upward:
            var yShift = xLowerYOffset - yTickPos;
//stringify and add unit:
            var yShiftStr = numToPxStrng(yShift);
// Make the y-tick mark, Teff:

            var yTickId = document.createElement("div");
            yTickId.class = "ytick";
            yTickId.style.position = "absolute";
            yTickId.style.display = "block";
            yTickId.style.marginLeft = yTickXOffsetStr;
            yTickId.style.border = tickBorder;
// Note that for y ticks, the height and width are reversed!:
            yTickId.style.width = tickHeightStr;
            yTickId.style.height = tickWidth;
            yTickId.style.zIndex = 0;
            yTickId.style.marginTop = yShiftStr;
//Append the tickmark to the axis element
            //masterId.appendChild(yTickId);
            areaId.appendChild(yTickId);
            //Make the y-tick label:

            txtPrint("<span style='font-size:x-small'>" + yTickValStr + "</span>",
                    yLabelXOffset, yShift, zeroInt, zeroInt, zeroInt, areaId);
        }  // end y-tickmark loop, j


// Add name of LEFT y-axis:

        txtPrint("<span style='font-size:x-small'>" + yAxisName + "</span>",
                yNameXOffset, yNameYOffset, zeroInt, zeroInt, zeroInt, areaId);
        //console.log("YAxis: " + axisParams[0]);
        return axisParams;
    };
    //   var testVal = -1.26832e7;
    //   var numParts = standForm(testVal);
    //  console.log("mantissa= " + numParts[0] + " exponent= " + numParts[1]);
//
    //   var roundVal = rounder(numParts[0], 1, "up");
    //   console.log("roundVal= " + roundVal);

    var yFinesse = 0.0; //default initialization

    //
    //
//
//  *****   PLOT SEVEN / PLOT 7
//
//

// Plot seven - image of stellar disk

    //console.log("Plot seven");

//    var plotRow = 0;
//    var plotCol = 1;
    var plotRow = 0;
    var plotCol = 0;
    var xOffset = 100 + plotCol * (xRange + 150) + xRange / 2;
    var yOffset = 100 + yRangeT + yOffsetT + plotRow * (yRange + 120);
    var yOffsetStr = numToPxStrng(yOffset);
    var xLowerYOffset = yOffset + yRange / 2;
    var xTickYOffset = xLowerYOffset - tickHeight / 2;
    var xTickYOffsetStr = numToPxStrng(xTickYOffset);
    var xLabelYOffset = xLowerYOffset + labelHeight;
    var xLabelYOffsetStr = numToPxStrng(xLabelYOffset);
    //x-axis name properties:
    var xNameYOffset = xLowerYOffset + 2 * labelHeight;
    var xNameYOffsetStr = numToPxStrng(xNameYOffset);
    var xNameXOffset = Math.floor(xRange / 2) + xOffset;
    var xNameXOffsetStr = numToPxStrng(xNameXOffset);
    var yTickXOffset = xOffset - tickHeight / 2; //height and width reversed for y-ticks
    var yTickXOffsetStr = numToPxStrng(yTickXOffset);
    var yLabelXOffset = xOffset - 3 * labelHeight; //height & width reversed for y-ticks
    var yLabelXOffsetStr = numToPxStrng(yLabelXOffset);
    var yNameYOffset = yOffset + Math.floor(yRange / 2);
    var yNameYOffsetStr = numToPxStrng(yNameYOffset);
    var yNameXOffset = xOffset - 120;
    var yNameXOffsetStr = numToPxStrng(yNameXOffset);
    // Convert solar radii to pixels:

//radius parameters in pixel all done above now:

    var titleYPos = xLowerYOffset - yRange + 40;
    //var titleXPos = xOffset - xOffset / 2;
    var titleXPos = xOffset;
    var thet1, thet2;
    var thet3;
    washer(xOffset - xRange / 2, yOffset, wColor, plotSevenId);
    // Add title annotation:

    //var titleYPos = xLowerYOffset - 1.15 * yRange;
    //var titleXPos = 1.02 * xOffset;

    txtPrint("<span style='font-size:normal; color:blue'><a href='http://en.wikipedia.org/wiki/Limb_darkening' target='_blank'>Stellar disk</a></span> <br />\n\
     <span style='font-size:small'>(Logarithmic radius) </span>",
            titleXPos - 100, titleYPos - 15, zeroInt, zeroInt, zeroInt, plotSevenId);
    //txtPrint("<span style='font-size:normal; color:black'><em>&#952</em> = </span>",
    //        titleXPos + 30, titleYPos + 5, zeroInt, zeroInt, zeroInt, plotSevenId);

    //var cosFctr = cosTheta[1][i];
    //var cosFctr = 0.0;
    //var radiusPxI = Math.ceil(radiusPx * Math.sin(Math.acos(cosFctr)));
    var radiusPxI = radiusPx;
    var radiusStr = numToPxStrng(radiusPxI);
    //this now done above:
    //           if (i === 3) {
    //               saveRadius = radiusPxI; // For HRD, plot nine
    //           }

// Adjust position to center star:
// Radius is really the *diameter* of the symbol
    var xLowerYOffsetI = xLowerYOffset - radiusPxI / 2;
    var xLowerYOffsetStr = numToPxStrng(xLowerYOffsetI);
    var xOffsetI = xOffset - radiusPxI / 2;
    var xOffsetStr = numToPxStrng(xOffsetI);

    //  Necessary

    rrI = Math.ceil(brightScale * (bandFlux[4] / bvr) / rgbVega[0]); // / vegaBVR[2]);
    ggI = Math.ceil(brightScale * (bandFlux[3] / bvr) / rgbVega[1]); // / vegaBVR[1]);
    bbI = Math.ceil(brightScale * (bandFlux[2] / bvr) / rgbVega[2]); // / vegaBVR[0]);
    //console.log(" rrI: " + rrI + " ggI: " + ggI + " bbI: " + bbI + " dark: " + dark);

    //var RGBArr = [];
    //RGBArr.length = 3;
    //RGBArr[0] = rrI;
    //RGBArr[1] = ggI;
    //RGBArr[2] = bbI;
//            if (i === Math.ceil(numThetas / 2)) {
//                saveRGB = RGBArr; // For HRD, plot nine
//            }
//console.log("Plot seven: rrI, ggI, bbI: " + rrI + " " + ggI + " " + bbI);
    //console.log("i, rrI, ggI, bbI " + i + " " + rrI + " " + ggI + " " + bbI + " radiusStr " + radiusStr);
    var starRGBHex = "rgb(" + rrI + "," + ggI + "," + bbI + ")";
    var starId = document.createElement("div");
    starId.class = "star";
    starId.style.display = "block";
    starId.style.position = "absolute";
    starId.style.height = radiusStr;
    starId.style.width = radiusStr;
    //   starId.style.border = tickBorder;
    starId.style.borderRadius = "100%";
    //starId.style.zIndex = "-1"; // put on top    
    starId.style.opacity = "1.0";
    starId.style.backgroundColor = starRGBHex;
    starId.style.marginTop = xLowerYOffsetStr;
    starId.style.marginLeft = xOffsetStr;
    //starId.style.border = "1px blue solid";

    plotSevenId.appendChild(starId);
    //

//
    //}   

//
//
//  *****   PLOT ELEVEN / PLOT 11
//
//
// Plot Eleven: Life Zone


//    var plotRow = 3;
//    var plotCol = 1;
    var plotRow = 0;
    var plotCol = 2;
    var xOffset = 100 + plotCol * (xRange + 150) + xRange / 2;
    var yOffset = 100 + yRangeT + yOffsetT + plotRow * (yRange + 120);
    var yOffsetStr = numToPxStrng(yOffset);
    var xLowerYOffset = yOffset + yRange / 2;
    var xTickYOffset = xLowerYOffset - tickHeight / 2;
    var xTickYOffsetStr = numToPxStrng(xTickYOffset);
    var xLabelYOffset = xLowerYOffset + labelHeight;
    var xLabelYOffsetStr = numToPxStrng(xLabelYOffset);
    //x-axis name properties:
    var xNameYOffset = xLowerYOffset + 2 * labelHeight;
    var xNameYOffsetStr = numToPxStrng(xNameYOffset);
    var xNameXOffset = Math.floor(xRange / 2) + xOffset;
    var xNameXOffsetStr = numToPxStrng(xNameXOffset);
    var yTickXOffset = xOffset - tickHeight / 2; //height and width reversed for y-ticks
    var yTickXOffsetStr = numToPxStrng(yTickXOffset);
    var yLabelXOffset = xOffset - 3 * labelHeight; //height & width reversed for y-ticks
    var yLabelXOffsetStr = numToPxStrng(yLabelXOffset);
    var yNameYOffset = yOffset + Math.floor(yRange / 2);
    var yNameYOffsetStr = numToPxStrng(yNameYOffset);
    var yNameXOffset = xOffset - 120;
    var yNameXOffsetStr = numToPxStrng(yNameXOffset);
    // Calculation of steam line and ice line:

    //Assuming liquid salt-free water at one atmospheric pressure is necessary:
    var steamTemp = 373.0; // K = 100 C
    var iceTemp = 273.0; //K = 0 C

    //console.log("greenHouse " + greenHouse + " albedo " + albedo);
    //var albedo = 0.3;  //Same as Earth
    //var greenHouse = 20.0;  //K - boost to surface temeprature from planetary atmospheric greenhosue effect
    steamTemp = steamTemp - greenHouse;
    iceTemp = iceTemp - greenHouse;
    var logSteamLine, logIceLine;
    var au = 1.4960e13; // 1 AU in cm
    var rSun = 6.955e10; // solar radii to cm
    //Steam line:
    //Set steamTemp equal to planetary surface temp and find distance that balances stellar irradiance 
    //absorbed by planetary cross-section with planet's bolometric thermal emission:
    //Everything in solar units -> distance, d, in solar radii
    logSteamLine = 2.0 * (Math.log(teff) - Math.log(steamTemp)) + logRadiusSol + 0.5 * Math.log(1.0 - albedo);
    //now the same for the ice line:
    logIceLine = 2.0 * (Math.log(teff) - Math.log(iceTemp)) + logRadiusSol + 0.5 * Math.log(1.0 - albedo);
    var iceLineAU = Math.exp(logIceLine) * rSun / au;
    var steamLineAU = Math.exp(logSteamLine) * rSun / au;
    iceLineAU = iceLineAU.toPrecision(3);
    steamLineAU = steamLineAU.toPrecision(3);
    //console.log("steamLine " + logE * logSteamLine + " iceLine " + logE * logIceLine);

    // Convert solar radii to pixels:

    var radiusScale = 20; //solar_radii-to-pixels!
    var logScale = 10; //amplification factor for log pixels


    // 
    // Star radius in pixels:

    //    var radiusPx = (radiusScale * radius);  //linear radius
    var radiusPx = logScale * logTen(radiusScale * radius); //logarithmic radius

    radiusPx = Math.ceil(radiusPx);
    var radiusPxSteam = logScale * logTen(radiusScale * radius * Math.exp(logSteamLine));
    radiusPxSteam = Math.ceil(radiusPxSteam);
    var radiusPxIce = logScale * logTen(radiusScale * radius * Math.exp(logIceLine));
    radiusPxIce = Math.ceil(radiusPxIce);
    // Key raii in order of *DECREASING* size (important!):
    var radii = [radiusPxIce + 2, radiusPxIce, radiusPxSteam, radiusPxSteam - 2, radiusPx];
    //

    rrI = saveRGB[0];
    ggI = saveRGB[1];
    bbI = saveRGB[2];
    var starRGBHex = "rgb(" + rrI + "," + ggI + "," + bbI + ")";
    var colors = ["#0000FF", "#00FF88", "#FF0000", wColor, starRGBHex];
    var numZone = radii.length;
    var titleYPos = xLowerYOffset - yRange + 40;
    //var titleXPos = xOffset - xOffset / 2;
    var titleXPos = xOffset;
    washer(xOffset - xRange / 2, yOffset, wColor, plotElevenId);
    // Add title annotation:

    //var titleYPos = xLowerYOffset - 1.15 * yRange;
    //var titleXPos = 1.02 * xOffset;

    txtPrint("<span style='font-size:normal; color:blue' title='Assumes liquid salt-free water at one Earth atmosphere pressure needed for life'><a href='https://en.wikipedia.org/wiki/Circumstellar_habitable_zone' target='_blank'>Life zone for habitable planets</a></span><br />\n\
     <span style='font-size:small'>(Logarithmic radius)</span>",
            titleXPos - 100, titleYPos - 15, zeroInt, zeroInt, zeroInt, plotElevenId);
    var legendYPos = xLowerYOffset - 0.75 * yRange;
    var legendXPos = 1.05 * xOffset;
    txtPrint("<span style='font-size:small'>"
            + " <span style='color:#FF0000'>Steam line</span> " + steamLineAU + " <a href='https://en.wikipedia.org/wiki/Astronomical_unit' title='1 AU = Earths average distance from center of Sun'> AU</a><br /> "
            + " <span style='color:#00FF88'><strong>Life zone</strong></span><br /> "
            + " <span style='color:#0000FF'>Ice line</span> " + iceLineAU + " <a href='https://en.wikipedia.org/wiki/Astronomical_unit' title='1 AU = Earths average distance from center of Sun'> AU</a>"
            + " </span>",
            legendXPos, legendYPos, zeroInt, zeroInt, zeroInt, plotElevenId);
    //Get the Vega-calibrated colors from the intensity spectrum of each theta annulus:    

    //  Loop over radial zones - largest to smallest
    for (var i = 0; i < radii.length; i++) {

//console.log("i " + i + " radii[i] " + radii[i]);
        var radiusStr = numToPxStrng(radii[i]);
        // Adjust position to center star:
        // Radius is really the *diameter* of the symbol
        //var xLowerYOffsetI = xLowerYOffset - radiusPx / 2;
        var xLowerYOffsetI = xLowerYOffset - radii[i] / 2;
        var xLowerYOffsetStr = numToPxStrng(xLowerYOffsetI);
        //var xOffsetI = xOffset - radiusPx / 2;
        var xOffsetI = xOffset - radii[i] / 2;
        var xOffsetStr = numToPxStrng(xOffsetI);
        // limb darkening intensity factor:


        var starId = document.createElement("div");
        starId.class = "star";
        starId.style.display = "block";
        starId.style.position = "absolute";
        starId.style.height = radiusStr;
        starId.style.width = radiusStr;
        //   starId.style.border = tickBorder;
        starId.style.borderRadius = "100%";
        //starId.style.zIndex = "-1"; // put on top    
        starId.style.opacity = "1.0";
        //starId.style.backgroundColor = starRGBHex;
        starId.style.backgroundColor = colors[i];
        starId.style.marginTop = xLowerYOffsetStr;
        starId.style.marginLeft = xOffsetStr;
        //starId.style.border = "1px blue solid";

        plotElevenId.appendChild(starId);
        //

        //
    }  //i loop (thetas)

    //
    //
    //  *****   PLOT NINE / PLOT 9
    //
    //
    // Plot Nine: HRDiagram



//    var plotRow = 0;
//    var plotCol = 0;
    var plotRow = 1;
    var plotCol = 0;
    //var numXTicks = 6;
    // WARNING: Teff axis is backwards!!
    var minXData = logTen(50000.0); //K
    var maxXData = logTen(2500.0); //K
    //console.log("minXData " + minXData + " maxXData " + maxXData);


    var xAxisName = "<span title='Logarithmic surface temperature of spherical blackbody radiation emitter of equivalent bolometric surface flux, in Kelvins (K)'> \n\
     <a href='http://en.wikipedia.org/wiki/Effective_temperature' target='_blank'>\n\
     Log<sub>10</sub> <em>T</em><sub>eff</sub></a> \n\
     (<a href='http://en.wikipedia.org/wiki/Kelvin' target='_blank'>K</a>)</span>";
    //var numYTicks = 6;
    var minYData = -2.0; //solar luminosities;
    var maxYData = 3.5; //solar luminosities


    var yAxisName = "<span title='Logarithmic Bolometric luminosity'>\n\
     <a href='http://en.wikipedia.org/wiki/Luminosity' target='_blank'>\n\
     Log<sub>10</sub><em>L</em><sub>Bol</sub></a></span><br />  \n\
     <span title='Solar luminosities'>\n\
     <a href='http://en.wikipedia.org/wiki/Solar_luminosity' target='_blank'>\n\
     <em>L</em><sub>Sun</sub></a></span> ";
    //
    //console.log("Calling xAxis from HRD plot nine");
    var xAxisParams = XAxis(plotRow, plotCol,
            minXData, maxXData, xAxisName,
            plotNineId);
    var yAxisParams = YAxis(plotRow, plotCol,
            minYData, maxYData, yAxisName,
            plotNineId);
    //
    xOffset = xAxisParams[0];
    yOffset = yAxisParams[4];
    var rangeXData = xAxisParams[1];
    var deltaXData = xAxisParams[2];
    var deltaXPxl = xAxisParams[3];
    var rangeYData = yAxisParams[1];
    var deltaYData = yAxisParams[2];
    var deltaYPxl = yAxisParams[3];
    var xLowerYOffset = xAxisParams[5];
    minXData = xAxisParams[6]; //updated value
    minYData = yAxisParams[6]; //updated value
    maxXData = xAxisParams[7]; //updated value
    maxYData = yAxisParams[7]; //updated value     
    //console.log("minXData " + minXData + " maxXData " + maxXData, " rangeXData " + rangeXData + " deltaXData " + deltaXData);
    //
    var titleYPos = xLowerYOffset - 1.15 * yRange;
    var titleXPos = 1.02 * xOffset;
    txtPrint("<span style='font-size:normal; color:blue'><a href='http://www.ap.smu.ca/~ishort/hrdtest3.html' target='_blank'>H-R Diagram</a></span>",
            titleXPos, titleYPos, zeroInt, zeroInt, zeroInt, plotNineId);
    // *********  Input stellar data

    //Sun

    var sunClass = "G2";
    var sunTeff = 5778;
    // var sunTeff = 10000; //debug test
    var sunB_V = 0.656;
    var sunM_v = 4.83;
    var sunM_Bol = 4.75;
    var sunRad = 1.0;
    // var sunRad = 10.0; //debug test
    var logSunLum = 2.5 * logTen(1.0); //log Suns luminosity in solar luminosities 


    // Carroll & Ostlie, 2nd Ed. , Appendix G:

    //Main sequence

    var msClass = ["O5", "O6", "O7", "O8", "B0", "B1", "B2", "B3", "B5", "B6", "B7", "B8", "B9", "A0", "A1", "A2", "A5", "A8", "F0", "F2", "F5", "F8", "G0", "G2", "G8", "K0", "K1", "K3", "K4", "K5", "K7", "M0", "M1", "M2", "M3", "M4", "M5", "M6", "M7"];
    var msTeffs = [42000, 39500, 37500, 35800, 30000, 25400, 20900, 18800, 15200, 13700, 12500, 11400, 10500, 9800, 9400, 9020, 8190, 7600, 7300, 7050, 6650, 6250, 5940, 5790, 5310, 5150, 4990, 4690, 4540, 4410, 4150, 3840, 3660, 3520, 3400, 3290, 3170, 3030, 2860];
    var msB_V = [-0.33, -0.33, -0.32, -0.32, -0.30, -0.26, -0.24, -0.20, -0.17, -0.15, -0.13, -0.11, -0.07, -0.02, +0.01, +0.05, +0.15, +0.25, +0.30, +0.35, +0.44, +0.52, +0.58, +0.63, +0.74, +0.81, +0.86, +0.96, +1.05, +1.15, +1.33, +1.40, +1.46, +1.49, +1.51, +1.54, +1.64, +1.73, +1.80];
    var msM_v = [-5.1, -5.1, -4.9, -4.6, -3.4, -2.6, -1.6, -1.3, -0.5, -0.1, +0.3, +0.6, +0.8, +1.1, +1.3, +1.5, +2.2, +2.7, +3.0, +3.4, +3.9, +4.3, +4.7, +4.9, +5.6, +5.7, +6.0, +6.5, +6.7, +7.1, +7.8, +8.9, +9.6, 10.4, 11.1, 11.9, 12.8, 13.8, 14.7];
    var msBC = [-4.40, -3.93, -3.68, -3.54, -3.16, -2.70, -2.35, -1.94, -1.46, -1.21, -1.02, -0.80, -0.51, -0.30, -0.23, -0.20, -0.15, -0.10, -0.09, -0.11, -0.14, -0.16, -0.18, -0.20, -0.40, -0.31, -0.37, -0.50, -0.55, -0.72, -1.01, -1.38, -1.62, -1.89, -2.15, -2.38, -2.73, -3.21, -3.46];
    var msMass = [60, 37, 29, 23, 17.5, 13.0, 10.0, 7.6, 5.9, 4.8, 4.3, 3.8, 3.2, 2.9, 2.5, 2.2, 2.0, 1.7, 1.6, 1.5, 1.4, 1.2, 1.05, 0.90, 0.83, 0.79, 0.75, 0.72, 0.69, 0.67, 0.55, 0.51, 0.43, 0.40, 0.33, 0.26, 0.21, 0.13, 0.10];
    //var msRads = [13.4 ,12.2 ,11.0 ,10.0 , 6.7 , 5.2 , 4.1 , 3.8 , 3.2 , 2.9 , 2.7 , 2.5 , 2.3 , 2.2 , 2.1 , 2.0 , 1.8 , 1.5 , 1.4 , 1.3 , 1.2 , 1.1 , 1.06, 1.03, 0.96, 0.93, 0.91, 0.86, 0.83, 0.80, 0.74, 0.63, 0.56, 0.48, 0.41, 0.35, 0.29, 0.24, 0.20];
    //var msM_Bol = [-9.51,-9.04,-8.60,-8.18,-6.54,-5.26,-3.92,-3.26,-1.96,-1.35,-0.77,-0.22,+0.28,+0.75,+1.04,+1.31,+2.02,+2.61,+2.95,+3.27,+3.72,+4.18,+4.50,+4.66,+5.20,+5.39,+5.58,+5.98,+6.19,+6.40,+6.84,+7.52,+7.99,+8.47,+8.97,+9.49,10.1 ,10.6 ,11.3];

    //Needed for tick mark placement in pixels:

    //var maxMsTeff = msTeffs[0];
    //var minMsTeff = msTeffs[msTeffs.length - 1];
    //var maxMsM_v = msM_v[msM_v.length - 1];
    //var minMsM_v = msM_v[0];
    // Main sequence data processing:


    var msNum = msClass.length;
    var msM_Bol = [];
    var logR45 = [];
    var logR = [];
    var msRads = [];
    var msLogLum = [];
    msM_Bol.length = msNum;
    logR45.length = msNum;
    logR.length = msNum;
    msRads.length = msNum;
    msLogLum.length = msNum;
    // Calculate radii in solar radii:
    // For MS stars, do the Luminosity as well

    for (var i = 0; i < msNum; i++) {

        msM_Bol[i] = msM_v[i] + msBC[i];
        var msTeffSol = msTeffs[i] / sunTeff;
        logR45[i] = 2.5 * logSunLum + sunM_Bol - 10.0 * logTen(msTeffSol) - msM_Bol[i];
        logR[i] = logR45[i] / 4.5;
        msRads[i] = Math.exp(Math.LN10 * logR[i]); //No base ten exponentiation in JS!
        var msLogL = (sunM_Bol - msM_Bol[i]) / 2.5;
        // Round log(Lum) to 1 decimal place:
        msLogL = 10.0 * msLogL;
        msLogL = Math.floor(msLogL);
        msLogLum[i] = msLogL / 10.0;
    } // end i loop


// Giants:

    var rgbClass = ["O5", "O6", "O7", "O8", "B0", "B1", "B2", "B3", "B5", "B6", "B7", "B8", "B9", "A0", "A1", "A2", "A5", "A8", "F0", "F2", "F5", "G0", "G2", "G8", "K0", "K1", "K3", "K4", "K5", "K7", "M0", "M1", "M2", "M3", "M4", "M5", "M6"];
    var rgbTeffs = [39400, 37800, 36500, 35000, 29200, 24500, 20200, 18300, 15100, 13800, 12700, 11700, 10900, 10200, 9820, 9460, 8550, 7830, 7400, 7000, 6410, 5470, 5300, 4800, 4660, 4510, 4260, 4150, 4050, 3870, 3690, 3600, 3540, 3480, 3440, 3380, 3330];
    var rgbB_V = [-0.32, -0.32, -0.32, -0.31, -0.29, -0.26, -0.24, -0.20, -0.17, -0.15, -0.13, -0.11, -0.07, -0.03, +0.01, +0.05, +0.15, +0.25, +0.30, +0.35, +0.43, +0.65, +0.77, +0.94, +1.00, +1.07, +1.27, +1.38, +1.50, +1.53, +1.56, +1.58, +1.60, +1.61, +1.62, +1.63, +1.52];
    var rgbM_v = [-5.9, -5.7, -5.6, -5.5, -4.7, -4.1, -3.4, -3.2, -2.3, -1.8, -1.4, -1.0, -0.6, -0.4, -0.2, -0.1, +0.6, +1.0, +1.3, +1.4, +1.5, +1.3, +1.3, +1.0, +1.0, +0.9, +0.8, +0.8, +0.7, +0.4, +0.0, -0.2, -0.4, -0.4, -0.4, -0.4, -0.4];
    var rgbBC = [-4.05, -3.80, -3.58, -3.39, -2.88, -2.43, -2.02, -1.60, -1.30, -1.13, -0.97, -0.82, -0.71, -0.42, -0.29, -0.20, -0.14, -0.10, -0.11, -0.11, -0.14, -0.20, -0.27, -0.42, -0.50, -0.55, -0.76, -0.94, -1.02, -1.17, -1.25, -1.44, -1.62, -1.87, -2.22, -2.48, -2.73];
    //var rgbRads = [18.5,16.8,15.4,14.3,11.4,10.0, 8.6, 8.0, 6.7, 6.1, 5.5, 5.0, 4.5, 4.1, 3.9, 3.7, 3.3, 3.1, 3.2, 3.3, 3.8, 6.0, 6.7, 9.6,10.9,12.5,16.4,18.7,21.4,27.6,39.3,48.6,58.5,69.7,82.0,96.7,16];
    //var rgbM_Bol = [-9.94,-9.55,-9.20,-8.87,-7.58,-6.53,-5.38,-4.78,-3.56,-2.96,-2.38,-1.83,-1.31,-0.83,-0.53,-0.26,+0.44,+0.95,+1.17,+1.31,+1.37,+1.10,+1.00,+0.63,+0.48,+0.32,-0.01,-0.18,-0.36,-0.73,-1.28,-1.64,-1.97,-2.28,-2.57,-2.86,-3.18];

    // RGB sequence data processing:


    var rgbNum = rgbClass.length;
    var rgbM_Bol = [];
    var logR45 = [];
    var logR = [];
    var rgbRads = [];
    var rgbLogLum = [];
    rgbM_Bol.length = rgbNum;
    logR45.length = rgbNum;
    logR.length = rgbNum;
    rgbRads.length = rgbNum;
    // Calculate radii in solar radii:

    for (var i = 0; i < rgbNum; i++) {

        rgbM_Bol[i] = rgbM_v[i] + rgbBC[i];
        var rgbTeffSol = rgbTeffs[i] / sunTeff;
        logR45[i] = 2.5 * logSunLum + sunM_Bol - 10.0 * logTen(rgbTeffSol) - rgbM_Bol[i];
        logR[i] = logR45[i] / 4.5;
        rgbRads[i] = Math.exp(Math.LN10 * logR[i]); //No base ten exponentiation in JS!

        var rgbLogL = (sunM_Bol - rgbM_Bol[i]) / 2.5;
        // Round log(Lum) to 1 decimal place:
        rgbLogL = 10.0 * rgbLogL;
        rgbLogL = Math.floor(rgbLogL);
        rgbLogLum[i] = rgbLogL / 10.0;
    } // end i loop


// No! Too bright for what GrayStar can model!
// //Supergiants:
//
// var sgbClass = ["O5", "O6", "O7", "O8", "B0", "B1", "B2", "B3", "B5", "B6", "B7", "B8", "B9", "A0", "A1", "A2", "A5", "A8", "F0", "F2", "F5", "F8", "G0", "G2", "G8", "K0", "K1", "K3", "K4", "K5", "K7", "M0", "M1", "M2", "M3", "M4", "M5", "M6"];
// var sgbTeffs = [40900, 38500, 36200, 34000, 26200, 21400, 17600, 16000, 13600, 12600, 11800, 11100, 10500, 9980, 9660, 9380, 8610, 7910, 7460, 7030, 6370, 5750, 5370, 5190, 4700, 4550, 4430, 4190, 4090, 3990, 3830, 3620, 3490, 3370, 3210, 3060, 2880, 2710];
// var sgbB_V = [-0.31, -0.31, -0.31, -0.29, -0.23, -0.19, -0.17, -0.13, -0.10, -0.08, -0.05, -0.03, -0.02, -0.01, +0.02, +0.03, +0.09, +0.14, +0.17, +0.23, +0.32, +0.56, +0.76, +0.87, +1.15, +1.24, +1.30, +1.46, +1.53, +1.60, +1.63, +1.67, +1.69, +1.71, +1.69, +1.76, +1.80, +1.86];
//  var sgbM_v = [-6.5, -6.5, -6.6, -6.6, -6.9, -6.9, -6.7, -6.7, -6.6, -6.4, -6.3, -6.3, -6.3, -6.3, -6.3, -6.3, -6.3, -6.4, -6.4, -6.4, -6.4, -6.4, -6.3, -6.3, -6.1, -6.1, -6.0, -5.9, -5.8, -5.7, -5.6, -5.8, -5.8, -5.8, -5.5, -5.2, -4.8, -4.9];
// var sgbBC = [-3.87, -3.74, -3.48, -3.35, -2.49, -1.87, -1.58, -1.26, -0.95, -0.88, -0.78, -0.66, -0.52, -0.41, -0.32, -0.28, -0.13, -0.03, -0.01, 0.00, -0.03, -0.09, -0.15, -0.21, -0.42, -0.50, -0.56, -0.75, -0.90, -1.01, -1.20, -1.29, -1.38, -1.62, -2.13, -2.75, -3.47, -3.90];
//  
//  //var sgbRads = [21,  22,  23,  25,  31,  37,  42,  45,  51,  53,  56,  58,  61,  64,  67,  69,  78,  91, 102, 114, 140, 174, 202, 218, 272, 293, 314, 362, 386, 415, 473, 579, 672, 791, 967,1220,1640,2340];
//  //var sgbM_Bol = [-10.4,-10.2,-10.1, -9.9, -9.3, -8.8, -8.2, -7.9, -7.5, -7.3, -7.1, -6.9, -6.8, -6.7, -6.6, -6.5, -6.4, -6.4, -6.4, -6.4, -6.4, -6.4, -6.4, -6.4, -6.5, -6.5, -6.5, -6.6, -6.7, -6.7, -6.8, -7.0, -7.2, -7.4, -7.6, -7.9, -8.3, -8.8];
// 
//  // SGB sequence data processing:
// 
// 
//  var sgbNum = sgbClass.length;
// 
//  var sgbM_Bol = [];
// var logR45 = [];
//  var logR = [];
//  var sgbRads = [];
//  var sgbLogLum = [];
//  
// sgbM_Bol.length = sgbNum;
//  logR45.length = sgbNum;
//  logR.length = sgbNum;
//   sgbRads.length = sgbNum;
//  
//   
//  // Calculate radii in solar radii:
//   
//  for (var i = 0; i < sgbNum; i++) {
//  
// sgbM_Bol[i] = sgbM_v[i] + sgbBC[i];
//  var sgbTeffSol = sgbTeffs[i] / sunTeff;
//  
//  logR45[i] = 2.5 * logSunLum + sunM_Bol - 10.0 * logTen(sgbTeffSol) - sgbM_Bol[i];
//  logR[i] = logR45[i] / 4.5;
//  sgbRads[i] = Math.exp(Math.LN10 * logR[i]);  //No base ten exponentiation in JS!
//  
//  var sgbLogL = (sunM_Bol - sgbM_Bol[i]) / 2.5;
//  // Round log(Lum) to 1 decimal place:
//  sgbLogL = 10.0 * sgbLogL;
//  sgbLogL = Math.floor(sgbLogL);
//  sgbLogLum[i] = sgbLogL / 10.0;
//  
//  } // end i loop
// 

//Data loops - plot the result!

//MS stars

    var dSize = 2.0; //plot point size
    var opac = 0.7; //opacity
    // RGB color
    var r255 = 50;
    var g255 = 50;
    var b255 = 50; //dark gray

    var ii;
    //for (var i = 5; i < msNum - 3; i++) {
    for (var i = 4; i < msNum - 1; i++) {

        ii = 1.0 * i;
        var xTickPos = xRange * (logTen(msTeffs[i]) - minXData) / rangeXData; // pixels   

        // horizontal position in pixels - data values increase rightward:
        var xShift = xOffset + xTickPos;
        ////stringify and add unit:
        //        var xShiftStr = numToPxStrng(xShift);

        var yTickPos = yRange * (msLogLum[i] - minYData) / rangeYData;
        // vertical position in pixels - data values increase upward:
        var yShift = xLowerYOffset - yTickPos;
        ////stringify and add unit:
        //       var yShiftStr = numToPxStrng(yShift);

        plotPnt(xShift, yShift, r255, g255, b255, opac, dSize, plotNineId);
    }


//RGB stars

// RGB color
    var r255 = 100;
    var g255 = 100;
    var b255 = 100; //gray

    var ii;
    //for (var i = 4; i < rgbNum - 2; i++) {
    for (var i = 3; i < rgbNum - 1; i++) {

        ii = 1.0 * i;
        var xTickPos = xRange * (logTen(rgbTeffs[i]) - minXData) / rangeXData; // pixels   

        // horizontal position in pixels - data values increase rightward:
        var xShift = xOffset + xTickPos;
        ////stringify and add unit:
        //        var xShiftStr = numToPxStrng(xShift);

        var yTickPos = yRange * (rgbLogLum[i] - minYData) / rangeYData;
        // vertical position in pixels - data values increase upward:
        var yShift = xLowerYOffset - yTickPos;
        ////stringify and add unit:
        //       var yShiftStr = numToPxStrng(yShift);

        plotPnt(xShift, yShift, r255, g255, b255, opac, dSize, plotNineId);
    }


// No! Too bright for what GrayStar can model!
// //SGB stars
// 
// // RGB color
// var r255 = 150;
// var g255 = 150;
// var b255 = 150; //light gray
//  
// var ii;
// for (var i = 4; i < sgbNum - 3; i++) {
//  
//  ii = 1.0 * i;
//  var xTickPos = xRange * (logTen(sgbTeffs[i]) - minXData) / rangeXData; // pixels   
//  
//  // horizontal position in pixels - data values increase rightward:
// var xShift = xOffset + xTickPos;
// ////stringify and add unit:
// //        var xShiftStr = numToPxStrng(xShift);
// 
//  var yTickPos = yRange * (sgbLogLum[i] - minYData) / rangeYData;
// // vertical position in pixels - data values increase upward:
//  var yShift = xLowerYOffset - yTickPos;
// ////stringify and add unit:
//  //       var yShiftStr = numToPxStrng(yShift);
// 
//  plotPnt(xShift, yShift, r255, g255, b255, opac, dSize, plotNineId);
// 
// 
//  }
// 


// Now overplot our star:
//console.log("teff, bolLum, radiusPxI, rrI, ggI, bbI: " +
//        teff + " " + bolLum + " " + radiusPxI + " " + rrI + " " + ggI + " " + bbI);
    var xTickPos = xRange * (logTen(teff) - minXData) / rangeXData; // pixels   
    // horizontal position in pixels - data values increase rightward:
    var xShift = xOffset + xTickPos;
    var yTickPos = yRange * (logTen(lumSol) - minYData) / rangeYData;
    // vertical position in pixels - data values increase upward:
    var yShift = xLowerYOffset - yTickPos;
    //Take color and radius from the last step of the star rendering loop (plot Seve) - that should be the inner-most disk:
    //console.log("saveRadius " + saveRadius + " saveRGB[0], saveRGB[1], saveRGB[2] " + saveRGB[0] + " " + saveRGB[1] + " " + saveRGB[2]);
    var radiusPxThis = saveRadius / 15;
    var rrI = saveRGB[0];
    var ggI = saveRGB[1];
    var bbI = saveRGB[2];
    plotPnt(xShift, yShift, zeroInt, zeroInt, zeroInt, opac, 1.05 * radiusPxThis, plotNineId); //black border to bring attention
    plotPnt(xShift, yShift, rrI, ggI, bbI, opac, radiusPxThis, plotNineId);
    //Now overplot Luminosity class markers:

    //    //I
    //    xShift = xOffset + xRange * (logTen(sgbTeffs[sgbNum - 2]) - minXData) / rangeXData; // pixels 
    //    yShift = xLowerYOffset - (yRange * (sgbLogLum[sgbNum - 1] - minYData) / rangeYData);
    //    txtPrint("<span style='font-size:normal'><a href='http://en.wikipedia.org/wiki/Stellar_classification' target='_blank'>\n\
    // I</a></span>", xShift, yShift, 50, 50, 50, plotNineId);
    //III
    xShift = xOffset + xRange * (logTen(rgbTeffs[rgbNum - 8]) - minXData) / rangeXData; // pixels 
    yShift = xLowerYOffset - (yRange * (rgbLogLum[rgbNum - 8] - minYData) / rangeYData);
    txtPrint("<span style='font-size:normal'><a href='http://en.wikipedia.org/wiki/Stellar_classification' title='Giants' target='_blank'>\n\
     III</a></span>", xShift, yShift, 50, 50, 50, plotNineId);
    //V
    xShift = xOffset + xRange * (logTen(msTeffs[msNum - 8]) - minXData) / rangeXData; // pixels 
    yShift = xLowerYOffset - (yRange * (msLogLum[msNum - 8] - minYData) / rangeYData);
    txtPrint("<span style='font-size:normal'><a href='http://en.wikipedia.org/wiki/Stellar_classification' title='Main Sequence, Dwarfs' target='_blank'>\n\
     V</a></span>", xShift, yShift, 50, 50, 50, plotNineId);


// ****************************************
    //
    //
    //  *****   PLOT ONE / PLOT 1
    //

    //console.log("plotOneId.style.display: " + plotOneId.style.display);
    // Plot one: log(Tau) vs log(rho)
    //console.log("PLOT ONE: ifAtmosShow= " + ifAtmosShow);

    //console.log("PLOT ONE");
    //   var plotRow = 1;
    //   var plotCol = 0;
    var plotRow = 2;
    var plotCol = 0;
    //var numXTicks = 6;
    var minXData = radKm[0];
    var maxXData = radKm[numDeps - 1];
    var xAxisName = "<span>Radius (km)</span>";
    //console.log("PLOT ONE: minXData " + minXData + " maxXData " + maxXData);

    var minYData = log10E * Math.log(rhoShell[numDeps - 1]); // Avoid upper boundary condition [i]=0
    var maxYData = log10E * Math.log(rhoShell[0]);
    var yAxisName = "Log<sub>10</sub> <em>&#961</em> <br />(g cm<sup>-3</sup>)";
    //washer(xRange, xOffset, yRange, yOffset, wColor, plotOneId);

    //console.log("Calling xAxis() from PLOT ONE");
    var xAxisParams = XAxis(plotRow, plotCol,
            minXData, maxXData, xAxisName,
            plotOneId);
    var yAxisParams = YAxis(plotRow, plotCol,
            minYData, maxYData, yAxisName,
            plotOneId);
    xOffset = xAxisParams[0];
    yOffset = xAxisParams[4];
    var rangeXData = xAxisParams[1];
    var deltaXData = xAxisParams[2];
    var deltaXPxl = xAxisParams[3];
    var rangeYData = yAxisParams[1];
    var deltaYData = yAxisParams[2];
    var deltaYPxl = yAxisParams[3];
    var xLowerYOffset = xAxisParams[5];
    minXData = xAxisParams[6]; //updated value
    minYData = yAxisParams[6]; //updated value
    maxXData = xAxisParams[7]; //updated value
    maxYData = yAxisParams[7]; //updated value     
    //console.log("PLOT ONE: " + " rangeXData " + rangeXData + " deltaXData " + deltaXData
    //        + " minXData " + minXData + " maxXData " + maxXData);
    //
    var legendYPos = xLowerYOffset - 1.05 * yRange;
    var legendXPos = 1.1 * xOffset;
    txtPrint("log<sub>10</sub> <a href='http://en.wikipedia.org/wiki/Gas_laws' title='mass density' target='_blank'>Density</a>",
            legendXPos - 20, legendYPos - 20, zeroInt, zeroInt, zeroInt, plotOneId);
//    txtPrint("<a href='http://en.wikipedia.org/wiki/Gas_laws'>Density</a>",
    //           legendXPos - 20, legendYPos - 20, zeroInt, zeroInt, zeroInt, plotOneId);                      
    //txtPrint(" <a href='http://en.wikipedia.org/wiki/Gas_laws' target='_blank'><span title='Gas pressure'><em>P</em><sub>Gas</sub></span></a> ",
    //        legendXPos + 140, legendYPos - 20, 0, 255, 0, masterId);

    //Data loop - plot the result!

    var dSize = 6.0; //plot point size
    var dSizeG = 4.0;
    var opac = 1.0; //opacity
    // RGB color
    // PTot:
    var r255 = 0;
    var g255 = 0;
    var b255 = 255; //blue 
    // PGas:
    var r255G = 0;
    var g255G = 255;
    var b255G = 100; //green
    // PRad:
    var r255R = 255;
    var g255R = 0;
    var b255R = 0; //red

    var ii;
    // Avoid upper boundary at i=0
    for (var i = 2; i < numDeps; i++) {

        ii = 1.0 * i;
        var xTickPos = xRange * (radKm[i] - minXData) / rangeXData; // pixels   

        // horizontal position in pixels - data values increase rightward:
        var xShift = xOffset + xTickPos;
        ////stringify and add unit:
        //        var xShiftStr = numToPxStrng(xShift);

        var yTickPos = yRange * (log10E * Math.log(rhoShell[i]) - minYData) / rangeYData;
        // vertical position in pixels - data values increase upward:
        var yShift = xLowerYOffset - yTickPos;
        ////stringify and add unit:
        //       var yShiftStr = numToPxStrng(yShift);

        plotPnt(xShift, yShift, r255, g255, b255, opac, dSize, plotOneId);
    }

    // Nuclear burning core marker

    var barWidth = 2.0;
    var barColor = "#777777";
    xShift = YBar(plotRow, plotCol,
            radKm[iCore], minXData, maxXData, barWidth, yRange,
            yFinesse, barColor, plotOneId);
    txtPrint("<span style='font-size:small; color:#444444'>Core</span>",
            xShift + 10, yShift - 50, zeroInt, zeroInt, zeroInt, plotOneId);


//
//
//  *****   PLOT TWO / PLOT 2
//
//

// Plot two: log(Tau) vs Temp
// 

    //console.log("PLOT TWO");
    //var plotRow = 0;
    //var plotCol = 2;

    var plotRow = 1;
    var plotCol = 1;
    //var numXTicks = 6;
    var minXData = radKm[0];
    var maxXData = radKm[numDeps - 1];
    var xAxisName = "<span>Radius (km)</span>";
    //var numYTicks = 6;
    var minYData = 1.0e-3 * tempShell[numDeps - 1];
    var maxYData = 1.0e-3 * tempShell[0];
    //console.log("minYData " + minYData + " maxYData " + maxYData);
    var yAxisName = "<em>T</em><sub>Kin</sub> x 10<sup>3</sup>(K)";
    //washer(xRange, xOffset, yRange, yOffset, wColor, plotTwoId);
    //
    //console.log("PLOT TWO: Before Axis(): minXData " + minXData + " minYData " + minYData);
    var xAxisParams = XAxis(plotRow, plotCol,
            minXData, maxXData, xAxisName,
            plotTwoId);
    var yAxisParams = YAxis(plotRow, plotCol,
            minYData, maxYData, yAxisName,
            plotTwoId);
    //
    xOffset = xAxisParams[0];
    yOffset = xAxisParams[4];
    var rangeXData = xAxisParams[1];
    var deltaXData = xAxisParams[2];
    var deltaXPxl = xAxisParams[3];
    var rangeYData = yAxisParams[1];
    var deltaYData = yAxisParams[2];
    var deltaYPxl = yAxisParams[3];
    var xLowerYOffset = xAxisParams[5];
    minXData = xAxisParams[6]; //updated value
    minYData = yAxisParams[6]; //updated value
    maxXData = xAxisParams[7]; //updated value
    maxYData = yAxisParams[7]; //updated value    
    //console.log("PLOT TWO: After Axis(): minXData " + minXData + " minYData " + minYData);
    //console.log("minYData " + minYData + " maxYData " + maxYData + " rangeYData " + rangeYData + " deltaYData " + deltaYData);
    //

    //Data loop - plot the result!

    var dSize = 5.0; //plot point size
    var opac = 1.0; //opacity
    // RGB color
    var r255 = 0;
    var g255 = 0;
    var b255 = 255; //blue

    var ii;
    for (var i = 0; i < numDeps; i++) {

        //FROM XAxis():
        //       var deltaXPxl = xRange / (numXTicks);
        //for (var i = 0; i < numXTicks; i++) {
        //    ii = 1.0 * i;
        //  var xTickPos = ii * deltaXPxl;

        ii = 1.0 * i;
        var xTickPos = xRange * (radKm[i] - minXData) / rangeXData; // pixels   
        //console.log("PLOT TWO: logE * tauRos[1][i] " + logE * tauRos[1][i] + " xTickPos " + xTickPos);

        // horizontal position in pixels - data values increase rightward:
        var xShift = xOffset + xTickPos;
        ////stringify and add unit:
        //        var xShiftStr = numToPxStrng(xShift);

        var yTickPos = yRange * ((1.0e-3 * tempShell[i]) - minYData) / rangeYData;
        // vertical position in pixels - data values increase upward:
        var yShift = xLowerYOffset - yTickPos;
        ////stringify and add unit:
        //       var yShiftStr = numToPxStrng(yShift);

        plotPnt(xShift, yShift, r255, g255, b255, opac, dSize, plotTwoId);
    }

    // Nuclear burning core marker

    var barWidth = 2.0;
    var barColor = "#777777";
    xShift = YBar(plotRow, plotCol,
            radKm[iCore], minXData, maxXData, barWidth, yRange,
            yFinesse, barColor, plotTwoId);
    txtPrint("<span style='font-size:small; color:#444444'>Core</span>",
            xShift + 10, yShift - 50, zeroInt, zeroInt, zeroInt, plotTwoId);


    //
    //
    //  *****   PLOT THREE / PLOT 3
    //
    //
    // Plot three: log(Tau) vs log(Pressure)


    //console.log("PLOT THREE");
    //   var plotRow = 1;
    //   var plotCol = 0;
    var plotRow = 2;
    var plotCol = 1;
    //var numXTicks = 6;
    var minXData = radKm[0];
    var maxXData = radKm[numDeps - 1];
    var xAxisName = "<span>Radius (km)</span>";
    // From Hydrostat.hydrostat:
    //press is a 4 x numDeps array:
    // rows 0 & 1 are linear and log *gas* pressure, respectively
    // rows 2 & 3 are linear and log *radiation* pressure
    // Don't use upper boundary condition as lower y-limit - use a couple of points below surface:
    //var numYTicks = 6;
    // Build total P from P_Gas & P_Rad:
    var logPTot = [];
    logPTot.length = numDeps;
    for (var i = 0; i < numDeps; i++) {
        logPTot[i] = log10E * Math.log(pressShell[i]);
        //console.log(logPTot[i]);
    }
    //var minYData = logE * logPTot[0] - 2.0; // Avoid upper boundary condition [i]=0
    var minYData = log10E * Math.min(Math.log(pGasShell[numDeps - 1]), Math.log(pRadShell[numDeps - 1])) - 1.0;
    var maxYData = logPTot[0];
    var yAxisName = "Log<sub>10</sub> <em>P</em> <br />(dynes <br />cm<sup>-2</sup>)";
    //washer(xRange, xOffset, yRange, yOffset, wColor, plotThreeId);

    var xAxisParams = XAxis(plotRow, plotCol,
            minXData, maxXData, xAxisName,
            plotThreeId);
    var yAxisParams = YAxis(plotRow, plotCol,
            minYData, maxYData, yAxisName,
            plotThreeId);
    xOffset = xAxisParams[0];
    yOffset = xAxisParams[4];
    var rangeXData = xAxisParams[1];
    var deltaXData = xAxisParams[2];
    var deltaXPxl = xAxisParams[3];
    var rangeYData = yAxisParams[1];
    var deltaYData = yAxisParams[2];
    var deltaYPxl = yAxisParams[3];
    var xLowerYOffset = xAxisParams[5];
    minXData = xAxisParams[6]; //updated value
    minYData = yAxisParams[6]; //updated value
    maxXData = xAxisParams[7]; //updated value
    maxYData = yAxisParams[7]; //updated value        
    //
    var legendYPos = xLowerYOffset - 1.05 * yRange;
    var legendXPos = 1.1 * xOffset;
    txtPrint("log Pressure: <span style='color:blue' title='Total pressure'><strong><em>P</em><sub>Tot</sub></strong></span> "
            + " <a href='http://en.wikipedia.org/wiki/Gas_laws' target='_blank'><span style='color:#00FF88' title='Gas pressure'><em>P</em><sub>Gas</sub></span></a> "
            + " <a href='http://en.wikipedia.org/wiki/Radiation_pressure' target='_blank'><span style='color:red' title='Radiation pressure'><em>P</em><sub>Rad</sub></span></a>",
            legendXPos - 20, legendYPos - 20, zeroInt, zeroInt, zeroInt, plotThreeId);
    //txtPrint(" <a href='http://en.wikipedia.org/wiki/Gas_laws' target='_blank'><span title='Gas pressure'><em>P</em><sub>Gas</sub></span></a> ",
    //        legendXPos + 140, legendYPos - 20, 0, 255, 0, masterId);

    //Data loop - plot the result!

    var dSize = 6.0; //plot point size
    var dSizeG = 4.0;
    var opac = 1.0; //opacity
    // RGB color
    // PTot:
    var r255 = 0;
    var g255 = 0;
    var b255 = 255; //blue 
    // PGas:
    var r255G = 0;
    var g255G = 255;
    var b255G = 100; //green
    // PRad:
    var r255R = 255;
    var g255R = 0;
    var b255R = 0; //red

    var ii;
    // Avoid upper boundary at i=0
    for (var i = 1; i < numDeps; i++) {

        ii = 1.0 * i;
        var xTickPos = xRange * (radKm[i] - minXData) / rangeXData; // pixels   

        // horizontal position in pixels - data values increase rightward:
        var xShift = xOffset + xTickPos;
        ////stringify and add unit:
        //        var xShiftStr = numToPxStrng(xShift);

        var yTickPos = yRange * (logPTot[i] - minYData) / rangeYData;
        var yTickPosG = yRange * (log10E * Math.log(pGasShell[i]) - minYData) / rangeYData;
        var yTickPosR = yRange * (log10E * Math.log(pRadShell[i]) - minYData) / rangeYData;
        // vertical position in pixels - data values increase upward:
        var yShift = xLowerYOffset - yTickPos;
        var yShiftG = xLowerYOffset - yTickPosG;
        var yShiftR = xLowerYOffset - yTickPosR;
        ////stringify and add unit:
        //       var yShiftStr = numToPxStrng(yShift);

        plotPnt(xShift, yShift, r255, g255, b255, opac, dSize, plotThreeId);
        plotPnt(xShift, yShiftG, r255G, g255G, b255G, opac, dSizeG, plotThreeId);
        plotPnt(xShift, yShiftR, r255R, g255R, b255R, opac, dSizeG, plotThreeId);
    }

    // Nuclear burning core marker

    var barWidth = 2.0;
    var barColor = "#777777";
    xShift = YBar(plotRow, plotCol,
            radKm[iCore], minXData, maxXData, barWidth, yRange,
            yFinesse, barColor, plotThreeId);
    txtPrint("<span style='font-size:small; color:#444444'>Core</span>",
            xShift + 10, yShift - 50, zeroInt, zeroInt, zeroInt, plotThreeId);

//
//
//  *****   PLOT FIVE / PLOT 5
//
//
// Plot five: SED


    //console.log("PLOT FIVE");
//    var plotRow = 2;
//    var plotCol = 0;
    var plotRow = 1;
    var plotCol = 2;
    //var numXTicks = 5;
    var minXData = 1.0e7 * waveGrid[0];
    var maxXData = 1.0e7 * waveGrid[numWaves - 1];
    var xAxisName = "<em>&#955</em> (nm)";
    //    ////Logarithmic x:
    //var minXData = 7.0 + logTen(masterLams[0]);
    //var maxXData = 7.0 + logTen(masterLams[numMaster - 1]);
    //var maxXData = 3.0; //finesse - Log10(lambda) = 3.5 nm
    //var xAxisName = "Log<sub>10</sub> &#955 (nm)";
    //var numYTicks = 4;
    //now done above var norm = 1.0e15; // y-axis normalization
    var minYData = 0.0;
    // iLamMax established in PLOT TWO above:
    var maxYData = SED[iLamMax] / norm;
    //console.log("In: minYData " + minYData + " maxYData " + maxYData);
    var yAxisName = "<span title='Monochromatic surface flux'><a href='http://en.wikipedia.org/wiki/Spectral_flux_density' target='_blank'> <em>F</em><sub>&#955</sub> x 10<sup>15</sup><br />ergs s<sup>-1</sup> <br />cm<sup>-3</sup></a></span>";
    ////Logarithmic y:
    //var minYData = 12.0;
    //var maxYData = logE * masterFlux[1][iLamMax];
    //var yAxisName = "<span title='Monochromatic surface flux'><a href='http://en.wikipedia.org/wiki/Spectral_flux_density' target='_blank'>Log<sub>10</sub> <em>F</em><sub>&#955</sub> <br /> ergs s<sup>-1</sup> cm<sup>-3</sup></a></span>";
    //(xRange, xOffset, yRange, yOffset, wColor, plotFiveId);

    var xAxisParams = XAxis(plotRow, plotCol,
            minXData, maxXData, xAxisName,
            plotFiveId);
    //console.log("minYData " + minYData + " maxYData " + maxYData);

    var yAxisParams = YAxis(plotRow, plotCol,
            minYData, maxYData, yAxisName,
            plotFiveId);
    xOffset = xAxisParams[0];
    yOffset = xAxisParams[4];
    var rangeXData = xAxisParams[1];
    var deltaXData = xAxisParams[2];
    var deltaXPxl = xAxisParams[3];
    var rangeYData = yAxisParams[1];
    var deltaYData = yAxisParams[2];
    var deltaYPxl = yAxisParams[3];
    var xLowerYOffset = xAxisParams[5];
    minXData = xAxisParams[6]; //updated value
    minYData = yAxisParams[6]; //updated value
    maxXData = xAxisParams[7]; //updated value
    maxYData = yAxisParams[7]; //updated value        
    //console.log("Out: minYData " + minYData + " maxYData " + maxYData);
    //
    // Add legend annotation:


    var legendYPos = xLowerYOffset - 1.2 * yRange;
    var legendXPos = 1.05 * xOffset;

    txtPrint("<span style='font-size:small'>"
            + "<span><em>F</em><sub>&#955</sub> (<em>&#955</em><sub>Max</sub> = " + lamMaxStr + " nm)</span> ",
            legendXPos, legendYPos + 10, zeroInt, zeroInt, zeroInt, plotFiveId);
    var titleYPos = xLowerYOffset - 1.15 * yRange;
    var titleXPos = 1.02 * xOffset;
    txtPrint("<span style='font-size:normal; color:blue'><a href='http://en.wikipedia.org/wiki/Spectral_energy_distribution' target='_blank'>\n\
     Spectral energy distribution (SED)</a></span>",
            titleXPos, titleYPos - 25, zeroInt, zeroInt, zeroInt, plotFiveId);
    // Photometric bands centers


    var opac = 0.5;
    var opacStr = numToPxStrng(opac);
    var yTickPos = 0;
    var yShift = (xLowerYOffset - yRange) + yTickPos;
    var yShiftStr = numToPxStrng(yShift);
    var vBarWidth = 2; //pixels 
    var vBarHeight = yRange;
    var vBarWidthStr = numToPxStrng(vBarWidth);
    var vBarHeightStr = numToPxStrng(vBarHeight);
    //
    var UBVRIBands = function(r255, g255, b255, band0) {

        var RGBHex = colHex(r255, g255, b255);
        // Vertical bar:
        var xTickPos = xRange * (band0 - minXData) / rangeXData; // pixels    
        var xShift = xOffset + xTickPos;
        var xShiftStr = numToPxStrng(xShift);
        var vCrossId = document.createElement("div");
        vCrossId.class = "cross";
        vCrossId.style.position = "absolute";
        vCrossId.style.display = "block";
        vCrossId.style.height = vBarHeightStr;
        vCrossId.style.width = vBarWidthStr;
        //hCrossId.style.borderRadius = "100%";
        vCrossId.style.opacity = opacStr;
        vCrossId.style.backgroundColor = RGBHex;
        vCrossId.style.marginLeft = xShiftStr;
        vCrossId.style.marginTop = yShiftStr;
        //Append the dot to the plot
        plotFiveId.appendChild(vCrossId);
    }; //end function UBVRIbands
    //
    var filters = filterSet();
    var lam0_ptr = 11; // approximate band centre
    var numBands = filters.length;
    var lamUBVRI = [];
    lamUBVRI.length = numBands;
    for (var ib = 0; ib < numBands; ib++) {
        lamUBVRI[ib] = 1.0e7 * filters[ib][0][lam0_ptr]; //linear lambda
        //lamUBVRI[ib] = 7.0 + logTen(filters[ib][0][lam0_ptr]);  //logarithmic lambda
    }

//Ux:
    var r255 = 155;
    var g255 = 0;
    var b255 = 155; // violet

    UBVRIBands(r255, g255, b255, lamUBVRI[0]);
    //B:
    var r255 = 0;
    var g255 = 0;
    var b255 = 255; // blue
    UBVRIBands(r255, g255, b255, lamUBVRI[2]);
    //V:
    var r255 = 0;
    var g255 = 255;
    var b255 = 100; // green
    UBVRIBands(r255, g255, b255, lamUBVRI[3]);
    //R:
    var r255 = 255;
    var g255 = 0;
    var b255 = 0; // red
    UBVRIBands(r255, g255, b255, lamUBVRI[4]);
    //I:
    var r255 = 255;
    var g255 = 40;
    var b255 = 40; // dark red / brown ??
    UBVRIBands(r255, g255, b255, lamUBVRI[5]);
    //Data loop - plot the result!

    //var dSize = 4.0; //plot point size
    //var dSize0 = 4.0;
    var dSize = 3.0; //plot point size
    var dSize0 = 2.0;
    var opac = 1.0; //opacity
    // RGB color
    // PTot:
    var r255 = 0;
    var g255 = 0;
    var b255 = 0; //black
    // PGas:
    var r2550 = 90;
    var g2550 = 90;
    var b2550 = 90; //dark gray
    // PRad:
    var r255N = 120;
    var g255N = 120;
    var b255N = 120; //light gray

    // Avoid upper boundary at i=0

    //var logLambdanm = 7.0 + logTen(masterLams[0]);  //logarithmic
    //var xTickPos = xRange * (logLambdanm - minXData) / rangeXData; // pixels  //logarithmic
    var lambdanm = 1.0e7 * waveGrid[0];
    var xTickPos = xRange * (lambdanm - minXData) / rangeXData; // pixels
    var lastXShift = xOffset + xTickPos;
//Logarithmic y:
    //var yTickPos = yRange * (logE * masterFlux[1][0] - minYData) / rangeYData;
    //var yTickPos0 = yRange * (logTen(masterIntens[0][0]) - minYData) / rangeYData;
    //var yTickPosN = yRange * (logTen(masterIntens[0][numThetas - 2]) - minYData) / rangeYData;
    var yTickPos = yRange * ((SED[0] / norm) - minYData) / rangeYData;

    // vertical position in pixels - data values increase upward:
    var lastYShift = xLowerYOffset - yTickPos;

    var xShift, yShift;
    for (var i = 1; i < numWaves; i++) {

        lambdanm = waveGrid[i] * 1.0e7; //cm to nm //linear
        //logLambdanm = 7.0 + logTen(masterLams[i]);  //logarithmic
        ii = 1.0 * i;
        //xTickPos = xRange * (logLambdanm - minXData) / rangeXData; // pixels   //logarithmic
        xTickPos = xRange * (lambdanm - minXData) / rangeXData; // pixels   //linear

        // horizontal position in pixels - data values increase rightward:
        xShift = xOffset + xTickPos;
        ////stringify and add unit:
        //        var xShiftStr = numToPxStrng(xShift);

//logarithmic y:
        //yTickPos = yRange * (logE * masterFlux[1][i] - minYData) / rangeYData;
        //yTickPos0 = yRange * (logTen(masterIntens[i][0]) - minYData) / rangeYData;
        //yTickPosN = yRange * (logTen(masterIntens[i][numThetas - 2]) - minYData) / rangeYData;
        yTickPos = yRange * ((SED[i] / norm) - minYData) / rangeYData;
        //console.log("SED[i] " + SED[i] + " logSED[i] " + log10E * logSED[i]);

        // vertical position in pixels - data values increase upward:
        yShift = xLowerYOffset - yTickPos;

        ////stringify and add unit:
        //       var yShiftStr = numToPxStrng(yShift);

        plotPnt(xShift, yShift, r255, g255, b255, opac, dSize, plotFiveId);

        //plotLin(lastXShift, lastYShift, xShift, yShift, r255, g255, b255, opac, dSize, plotFiveId);
        //plotLin(lastXShift, lastYShift0, xShift, yShift0, r2550, g2550, b2550, opac, dSize0, plotFiveId);
        //plotLin(lastXShift, lastYShiftN, xShift, yShiftN, r255N, g255N, b255N, opac, dSize0, plotFiveId);

        lastXShift = xShift;
        lastYShift = yShift;

    }

    //
    //
    //  *****   PLOT FOUR / PLOT 4
    //
    //
    // Plot four: radius vs log(kappa)


    //console.log("PLOT THREE");
    //   var plotRow = 1;
    //   var plotCol = 0;
    var plotRow = 2;
    var plotCol = 2;
    //var numXTicks = 6;
    var minXData = radKm[0];
    var maxXData = radKm[numDeps - 1];
    var xAxisName = "<span>Radius (km)</span>";
    // From Hydrostat.hydrostat:
    //press is a 4 x numDeps array:
    // rows 0 & 1 are linear and log *gas* pressure, respectively
    // rows 2 & 3 are linear and log *radiation* pressure
    // Don't use upper boundary condition as lower y-limit - use a couple of points below surface:
    //var numYTicks = 6;
    // Build total P from P_Gas & P_Rad:
    var logKTot = [];
    logKTot.length = numDeps;
    for (var i = 0; i < numDeps; i++) {
        logKTot[i] = log10E * Math.log(kapShell[i]);
        //console.log(logPTot[i]);
    }
    //var minYData = logE * logPTot[0] - 2.0; // Avoid upper boundary condition [i]=0
    var minYData = log10E * Math.min(Math.log(kapBfShell[0]), Math.log(kapFfShell[0]),
            Math.log(kapEsShell[0])) - 1.0;
    var maxYData = logKTot[numDeps - 1];
    console.log("PLOT FOUR minYData " + minYData + " maxYData " + maxYData);
    var yAxisName = "Log<sub>10</sub> <em>&#954</em> <br />(cm<sup>2</sup> <br />g<sup>-1</sup>)";
    //washer(xRange, xOffset, yRange, yOffset, wColor, plotFourId);

    var xAxisParams = XAxis(plotRow, plotCol,
            minXData, maxXData, xAxisName,
            plotFourId);
    var yAxisParams = YAxis(plotRow, plotCol,
            minYData, maxYData, yAxisName,
            plotFourId);
    xOffset = xAxisParams[0];
    yOffset = xAxisParams[4];
    var rangeXData = xAxisParams[1];
    var deltaXData = xAxisParams[2];
    var deltaXPxl = xAxisParams[3];
    var rangeYData = yAxisParams[1];
    var deltaYData = yAxisParams[2];
    var deltaYPxl = yAxisParams[3];
    var xLowerYOffset = xAxisParams[5];
    minXData = xAxisParams[6]; //updated value
    minYData = yAxisParams[6]; //updated value
    maxXData = xAxisParams[7]; //updated value
    maxYData = yAxisParams[7]; //updated value        
    //
    var legendYPos = xLowerYOffset - 1.05 * yRange;
    var legendXPos = 1.1 * xOffset;
    txtPrint("log Extinction: <span style='color:black' title='Total extinction coefficient'><a href='https://en.wikipedia.org/wiki/Refractive_index#Complex_refractive_index'><strong><em>&#954</em><sub>Tot</sub></strong></a></span> "
            + " <a href='https://en.wikipedia.org/wiki/Kramers'_opacity_law' target='_blank'><span style='color:blue' title='bound-free'><em>&#954</em><sub>bf</sub></span></a> "
            + " <a href='https://en.wikipedia.org/wiki/Kramers'_opacity_law' target='_blank'><span style='color:red' title='free-free'><em>&#954</em><sub>ff</sub></span></a>"
            + " <a href='https://en.wikipedia.org/wiki/Thomson_scattering' target='_blank'><span style='color:#00FF88' title='electron scattering'><em>&#954</em><sub>e</sub></span></a>"
            + " <a href='https://en.wikipedia.org/wiki/Hydrogen_anion' target='_blank'><span style='color:purple' title='Hmin bound-free'><em>&#954</em><sub>Hmin</sub></span></a>",
            legendXPos - 20, legendYPos - 20, zeroInt, zeroInt, zeroInt, plotFourId);
    //txtPrint(" <a href='http://en.wikipedia.org/wiki/Gas_laws' target='_blank'><span title='Gas pressure'><em>P</em><sub>Gas</sub></span></a> ",
    //        legendXPos + 140, legendYPos - 20, 0, 255, 0, masterId);

    //Data loop - plot the result!

    var dSize = 6.0; //plot point size
    var dSizeG = 4.0;
    var opac = 1.0; //opacity
    // RGB color
    // Tot:
    var r255 = 0;
    var g255 = 0;
    var b255 = 0; //black
    // 
    var r255G = 0;
    var g255G = 255;
    var b255G = 100; //green
    //
    var r255R = 255;
    var g255R = 0;
    var b255R = 0; //red

    var r255R = 0;
    var g255R = 0;
    var b255R = 255; //blue  

    var r255P = 0;
    var g255P = 255;
    var b255P = 255; //purple     

    var ii;
    // Avoid upper boundary at i=0
    for (var i = 1; i < numDeps; i++) {

        ii = 1.0 * i;
        var xTickPos = xRange * (radKm[i] - minXData) / rangeXData; // pixels   

        // horizontal position in pixels - data values increase rightward:
        var xShift = xOffset + xTickPos;
        ////stringify and add unit:
        //        var xShiftStr = numToPxStrng(xShift);

        var yTickPos = yRange * (logKTot[i] - minYData) / rangeYData;
        var yTickPosB = yRange * (log10E * Math.log(kapBfShell[i]) - minYData) / rangeYData;
        var yTickPosR = yRange * (log10E * Math.log(kapFfShell[i]) - minYData) / rangeYData;
        var yTickPosG = yRange * (log10E * Math.log(kapEsShell[i]) - minYData) / rangeYData;
        var yTickPosP = yRange * (log10E * Math.log(kapHminShell[i]) - minYData) / rangeYData;

        // vertical position in pixels - data values increase upward:
        var yShift = xLowerYOffset - yTickPos;
        var yShiftG = xLowerYOffset - yTickPosG;
        var yShiftR = xLowerYOffset - yTickPosR;
        var yShiftB = xLowerYOffset - yTickPosG;
        var yShiftP = xLowerYOffset - yTickPosR;
        ////stringify and add unit:
        //       var yShiftStr = numToPxStrng(yShift);

        plotPnt(xShift, yShift, r255, g255, b255, opac, dSize, plotFourId);
        plotPnt(xShift, yShiftG, r255G, g255G, b255G, opac, dSizeG, plotFourId);
        plotPnt(xShift, yShiftR, r255R, g255R, b255R, opac, dSizeG, plotFourId);
        plotPnt(xShift, yShiftB, r255B, g255B, b255B, opac, dSizeG, plotFourId);
        plotPnt(xShift, yShiftP, r255P, g255P, b255P, opac, dSizeG, plotFourId);
    }


    //console.log("Bar: xShift = " + xShift);

    //
    //
    //  *****   PLOT SIX / PLOT 6
    //
    //
    // Plot six: radius vs log(epsilon)


    //console.log("PLOT THREE");
    //   var plotRow = 1;
    //   var plotCol = 0;
    var plotRow = 3;
    var plotCol = 0;
    //var numXTicks = 6;
    var minXData = radKm[0];
    var maxXData = radKm[numDeps - 1];
    var xAxisName = "<span>Radius (km)</span>";
    // From Hydrostat.hydrostat:
    //press is a 4 x numDeps array:
    // rows 0 & 1 are linear and log *gas* pressure, respectively
    // rows 2 & 3 are linear and log *radiation* pressure
    // Don't use upper boundary condition as lower y-limit - use a couple of points below surface:
    //var numYTicks = 6;
    // Build total P from P_Gas & P_Rad:
    var logETot = [];
    logETot.length = numDeps;
    for (var i = 0; i < numDeps; i++) {
        logETot[i] = log10E * Math.log(epsShell[i]);
        //console.log(logPTot[i]);
    }
    //var minYData = logE * logPTot[0] - 2.0; // Avoid upper boundary condition [i]=0
    var minYData = log10E * Math.min(Math.log(epsPpShell[iCore]), Math.log(epsCnoShell[iCore])) - 1.0;
    var maxYData = logETot[0];
    var yAxisName = "Log<sub>10</sub> <em>&#949</em> <br />(ergs<br />s<sup>-1</sup> g<sup>-1</sup>)";
    //washer(xRange, xOffset, yRange, yOffset, wColor, plotSixId);

    var xAxisParams = XAxis(plotRow, plotCol,
            minXData, maxXData, xAxisName,
            plotSixId);
    var yAxisParams = YAxis(plotRow, plotCol,
            minYData, maxYData, yAxisName,
            plotSixId);
    xOffset = xAxisParams[0];
    yOffset = xAxisParams[4];
    var rangeXData = xAxisParams[1];
    var deltaXData = xAxisParams[2];
    var deltaXPxl = xAxisParams[3];
    var rangeYData = yAxisParams[1];
    var deltaYData = yAxisParams[2];
    var deltaYPxl = yAxisParams[3];
    var xLowerYOffset = xAxisParams[5];
    minXData = xAxisParams[6]; //updated value
    minYData = yAxisParams[6]; //updated value
    maxXData = xAxisParams[7]; //updated value
    maxYData = yAxisParams[7]; //updated value        
    //
    var legendYPos = xLowerYOffset - 1.05 * yRange;
    var legendXPos = 1.1 * xOffset;
    txtPrint("log Power generation: <span style='color:black' title='Total power generation rate'><a href='https://en.wikipedia.org/wiki/Fusion_power'><strong><em>&#949</em><sub>Tot</sub></strong></a></span> "
            + " <a href='https://en.wikipedia.org/wiki/Proton%E2%80%93proton_chain_reaction' target='_blank'><span style='color:blue' title='proton-proton chain'><em>&#949</em><sub>pp</sub></span></a> "
            + " <a href='https://en.wikipedia.org/wiki/CNO_cycle' target='_blank'><span style='color:red' title='CNO cycle'><em>&#949</em><sub>CNO</sub></span></a>",
            legendXPos - 20, legendYPos - 20, zeroInt, zeroInt, zeroInt, plotSixId);
    //txtPrint(" <a href='http://en.wikipedia.org/wiki/Gas_laws' target='_blank'><span title='Gas pressure'><em>P</em><sub>Gas</sub></span></a> ",
    //        legendXPos + 140, legendYPos - 20, 0, 255, 0, masterId);

    //Data loop - plot the result!

    var dSize = 6.0; //plot point size
    var dSizeG = 4.0;
    var dSizeR = 4.0;
    var dSizeB = 4.0;
    var opac = 1.0; //opacity
    // RGB color
    // PTot:
    var r255 = 0;
    var g255 = 0;
    var b255 = 255; //blue 
    // PGas:
    var r255G = 0;
    var g255G = 255;
    var b255G = 100; //green
    // PRad:
    var r255R = 255;
    var g255R = 0;
    var b255R = 0; //red

    var r255B = 0;
    var g255B = 0;
    var b255B = 255; //red

    var ii;
    // Avoid upper boundary at i=0
    for (var i = 1; i < iCore; i++) {

        ii = 1.0 * i;
        var xTickPos = xRange * (radKm[i] - minXData) / rangeXData; // pixels   

        // horizontal position in pixels - data values increase rightward:
        var xShift = xOffset + xTickPos;
        ////stringify and add unit:
        //        var xShiftStr = numToPxStrng(xShift);

        var yTickPos = yRange * (logETot[i] - minYData) / rangeYData;
        var yTickPosB = yRange * (log10E * Math.log(epsPpShell[i]) - minYData) / rangeYData;
        var yTickPosR = yRange * (log10E * Math.log(epsCnoShell[i]) - minYData) / rangeYData;

        // vertical position in pixels - data values increase upward:
        var yShift = xLowerYOffset - yTickPos;
        var yShiftB = xLowerYOffset - yTickPosB;
        var yShiftR = xLowerYOffset - yTickPosR;
        ////stringify and add unit:
        //       var yShiftStr = numToPxStrng(yShift);

        plotPnt(xShift, yShift, zeroInt, zeroInt, zeroInt, opac, dSize, plotSixId);
        plotPnt(xShift, yShiftB, r255B, g255B, b255B, opac, dSizeB, plotSixId);
        plotPnt(xShift, yShiftR, r255R, g255R, b255R, opac, dSizeR, plotSixId);
    }

    // Nuclear burning core marker

    var barWidth = 2.0;
    var barColor = "#777777";
    xShift = YBar(plotRow, plotCol,
            radKm[iCore], minXData, maxXData, barWidth, yRange,
            yFinesse, barColor, plotSixId);
    txtPrint("<span style='font-size:small; color:#444444'>Core</span>",
            xShift + 10, yShift - 50, zeroInt, zeroInt, zeroInt, plotSixId);

//


//  *****   PLOT EIGHT / PLOT 8
//
//

// Plot eight - stellar interior color map

    //console.log("Plot seven");

//    var plotRow = 0;
//    var plotCol = 1;
    var plotRow = 0;
    var plotCol = 1;
    var xOffset = 100 + plotCol * (xRange + 150) + xRange / 2;
    var yOffset = 100 + yRangeT + yOffsetT + plotRow * (yRange + 120);
    var yOffsetStr = numToPxStrng(yOffset);
    var xLowerYOffset = yOffset + yRange / 2;
    var xTickYOffset = xLowerYOffset - tickHeight / 2;
    var xTickYOffsetStr = numToPxStrng(xTickYOffset);
    var xLabelYOffset = xLowerYOffset + labelHeight;
    var xLabelYOffsetStr = numToPxStrng(xLabelYOffset);
    //x-axis name properties:
    var xNameYOffset = xLowerYOffset + 2 * labelHeight;
    var xNameYOffsetStr = numToPxStrng(xNameYOffset);
    var xNameXOffset = Math.floor(xRange / 2) + xOffset;
    var xNameXOffsetStr = numToPxStrng(xNameXOffset);
    var yTickXOffset = xOffset - tickHeight / 2; //height and width reversed for y-ticks
    var yTickXOffsetStr = numToPxStrng(yTickXOffset);
    var yLabelXOffset = xOffset - 3 * labelHeight; //height & width reversed for y-ticks
    var yLabelXOffsetStr = numToPxStrng(yLabelXOffset);
    var yNameYOffset = yOffset + Math.floor(yRange / 2);
    var yNameYOffsetStr = numToPxStrng(yNameYOffset);
    var yNameXOffset = xOffset - 120;
    var yNameXOffsetStr = numToPxStrng(yNameXOffset);
    // Convert solar radii to pixels:

//radius parameters in pixel all done above now:

    var titleYPos = xLowerYOffset - yRange + 40;
    //var titleXPos = xOffset - xOffset / 2;
    var titleXPos = xOffset;
    var thet1, thet2;
    var thet3;
    washer(xOffset - xRange / 2, yOffset, wColor, plotEightId);
    // Add title annotation:

    //var titleYPos = xLowerYOffset - 1.15 * yRange;
    //var titleXPos = 1.02 * xOffset;

    txtPrint("<span style='font-size:normal; color:blue'><a href='http://en.wikipedia.org/wiki/Limb_darkening' target='_blank'>Stellar interior map</a></span> <br />\n\
     <span style='font-size:small'>(Linear radius) </span> </br>\n\
     <span style='font-size:small; color:black'>Black circle: Nuclear burning core boundary </span> </br>\n\
     <span style='font-size:small; color:black'>Color opacity = <em>&#961</em>",
            titleXPos - 100, titleYPos - 15, zeroInt, zeroInt, zeroInt, plotEightId);
    //txtPrint("<span style='font-size:normal; color:black'><em>&#952</em> = </span>",
    //        titleXPos + 30, titleYPos + 5, zeroInt, zeroInt, zeroInt, plotEightId);

    var radSED = [];
    radSED.length = numWaves;
    var logRadSED = [];
    logRadSED.length = numWaves;

    var kk = 0;
    var tempLbl;
    var rhoOpac = 1.0;
    var rhoOpacStr;
    var radScaleLinear = 5.0e-10 * radiusScale;
    for (var k = numDeps - 1; k >= 0; k -= 1) {

        //console.log("Plot eight: k = " + k);

        for (var i = 0; i < numWaves; i++) {
            thisWave = waveGrid[i];
            //logRadSED[i] = planck(1.0e3*logTen(tempShell[k]), thisWave);
            logRadSED[i] = planck(1.0e-3 * tempShell[k], thisWave);
            radSED[i] = Math.exp(logRadSED[i]);
            //console.log(" " + waveGrid[i] + " " + SED[i]);
        }

        var bandFlux = fColors(waveGrid, radSED, numWaves);
        var bvr = bandFlux[2] + bandFlux[3] + bandFlux[4];
        //console.log("bandIntens[2][0]/bvr " + bandIntens[2][0] / bvr + " bandIntens[3][0]/bvr " + bandIntens[3][0] / bvr + " bandIntens[4][0]/bvr " + bandIntens[4][0] / bvr);
        //console.log("Math.max(bandIntens[2][0]/bvr, bandIntens[3][0]/bvr, bandIntens[4][0]/bvr) " + Math.max(bandIntens[2][0] / bvr, bandIntens[3][0] / bvr, bandIntens[4][0] / bvr));
        var brightScale = 255.0 / Math.max(bandFlux[2] / bvr, bandFlux[3] / bvr, bandFlux[4] / bvr);

        //var cosFctr = cosTheta[1][i];
        //var cosFctr = 0.0;
        //var radiusPxI = Math.ceil(radiusPx * Math.sin(Math.acos(cosFctr)));
        //radiusPx = logScale * logTen(radiusScale * radInt[k]); //logarithmic radius
        radiusPx = radScaleLinear * radInt[k];
        radiusPx = Math.ceil(radiusPx);
        var radiusPxI = radiusPx;
        var radiusStr = numToPxStrng(radiusPxI);
        //console.log("radiusStr " + radiusStr);
        //this now done above:
        //           if (i === 3) {
        //               saveRadius = radiusPxI; // For HRD, plot nine
        //           }

// Adjust position to center star:
// Radius is really the *diameter* of the symbol
        var xLowerYOffsetI = xLowerYOffset - radiusPxI / 2;
        var xLowerYOffsetStr = numToPxStrng(xLowerYOffsetI);
        var xOffsetI = xOffset - radiusPxI / 2;
        var xOffsetStr = numToPxStrng(xOffsetI);

        rhoOpac = rhoShell[k] / rhoShell[0];
        //rhoOpac = ( Math.log(rhoShell[k])- Math.log(rhoShell[numDeps-1]) ) /( Math.log(rhoShell[0]) - Math.log(rhoShell[numDeps-1]) );
        rhoOpacStr = rhoOpac.toString(10);

        //  Necessary

        rrI = Math.ceil(brightScale * (bandFlux[4] / bvr) / rgbVega[0]); // / vegaBVR[2]);
        ggI = Math.ceil(brightScale * (bandFlux[3] / bvr) / rgbVega[1]); // / vegaBVR[1]);
        bbI = Math.ceil(brightScale * (bandFlux[2] / bvr) / rgbVega[2]); // / vegaBVR[0]);

        //console.log(" rrI: " + rrI + " ggI: " + ggI + " bbI: " + bbI + " dark: " + dark);

        //var RGBArr = [];
        //RGBArr.length = 3;
        //RGBArr[0] = rrI;
        //RGBArr[1] = ggI;
        //RGBArr[2] = bbI;
        //console.log("rrI " + rrI + " ggI " + ggI + " bbI " + bbI);
//            if (i === Math.ceil(numThetas / 2)) {
//                saveRGB = RGBArr; // For HRD, plot nine
//            }
//console.log("Plot seven: rrI, ggI, bbI: " + rrI + " " + ggI + " " + bbI);
        //console.log("i, rrI, ggI, bbI " + i + " " + rrI + " " + ggI + " " + bbI + " radiusStr " + radiusStr);
        var starRGBHex = "rgb(" + rrI + "," + ggI + "," + bbI + ")";
        var starId = document.createElement("div");
        starId.class = "star";
        starId.style.display = "block";
        starId.style.position = "absolute";
        starId.style.height = radiusStr;
        starId.style.width = radiusStr;
        //   starId.style.border = tickBorder;
        starId.style.borderRadius = "100%";
        //starId.style.zIndex = "-1"; // put on top    
        starId.style.opacity = rhoOpacStr;
        starId.style.backgroundColor = starRGBHex;
        starId.style.marginTop = xLowerYOffsetStr;
        starId.style.marginLeft = xOffsetStr;
        //starId.style.border = "1px blue solid";

        plotEightId.appendChild(starId);

//Nuclear burning core boundary:
        if ((k > iCore - 2) && (k < iCore + 2)) {
            rrI = 0;
            ggI = 0;
            bbI = 0;
            var starRGBHex = "rgb(" + rrI + "," + ggI + "," + bbI + ")";
            var starId = document.createElement("div");
            starId.class = "star";
            starId.style.display = "block";
            starId.style.position = "absolute";
            starId.style.height = radiusStr;
            starId.style.width = radiusStr;
            //   starId.style.border = tickBorder;
            starId.style.borderRadius = "100%";
            //starId.style.zIndex = "-1"; // put on top    
            starId.style.opacity = "1.0";
            starId.style.backgroundColor = starRGBHex;
            starId.style.marginTop = xLowerYOffsetStr;
            starId.style.marginLeft = xOffsetStr;
            //starId.style.border = "1px blue solid";

            plotEightId.appendChild(starId);

        }

        //Temperature color code legend:

        if ((k % 50) == 0.0) {
            tempLbl = tempShell[k].toPrecision(5);
            txtPrint("<span style='font-size:x-small; color:starRGBHex'>T<sub>Kin</sub> = "
                    + tempLbl + " K</span>",
                    titleXPos + 40, 50 + titleYPos + 10 * kk, rrI, ggI, bbI, plotEightId);
            kk++;
        } //kk loop - T legend
    }  //k loop - radial shells



    //



// Detailed model output section:

//    
// Set up the canvas:
//

    // **********  Basic canvas parameters: These are numbers in px - needed for calculations:
    // All plots and other output must fit within this region to be white-washed between runs

    var xRangeT = 1750;
    var yRangeT = 10000;
    var xOffsetT = 10;
    var yOffsetT = 1500;
    var charToPxT = 4; // width of typical character font in pixels - CAUTION: finesse!

    var zeroInt = 0;
    //these are the corresponding strings ready to be assigned to HTML style attributes


    var xRangeTStr = numToPxStrng(xRangeT);
    var yRangeTStr = numToPxStrng(yRangeT);
    var xOffsetTStr = numToPxStrng(xOffsetT);
    var yOffsetTStr = numToPxStrng(yOffsetT);
    // Very first thing on each load: White-wash the canvas!!

    var washTId = document.createElement("div");
    var washTWidth = xRangeT + xOffsetT;
    var washTHeight = yRangeT + yOffsetT;
    var washTTop = yOffsetT;
    var washTWidthStr = numToPxStrng(washTWidth);
    var washTHeightStr = numToPxStrng(washTHeight);
    var washTTopStr = numToPxStrng(washTTop);
    washTId.id = "washT";
    washTId.style.position = "absolute";
    washTId.style.width = washTWidthStr;
    washTId.style.height = washTHeightStr;
    washTId.style.marginTop = washTTopStr;
    washTId.style.marginLeft = "0px";
    washTId.style.opacity = 1.0;
    washTId.style.backgroundColor = "#FFFFFF";
    //washId.style.zIndex = -1;
    washTId.style.zIndex = 0;
    //washTId.style.border = "2px blue solid";

    //Wash the canvas:
    printModelId.appendChild(washTId);

    // R & L_Bol:
    var colr = 0;
    var lineHeight = 17;
    var value;
    var vOffset = 60;

    if (ifPrintStruc === true) {
        var valMu = muI(xFrac, yFrac, zFrac);
        var valMu = valMu.toPrecision(5);
        txtPrint("Vertical atmospheric structure, Num depths=" + numDeps +
                ", &#956=" + valMu + " amu, X=" + xFrac + ", Y=" + yFrac + ", Z=" + zFrac,
                10, yOffsetT, 0, 0, 0, printModelId);

        //Column headings:

        var xTab = 190;
        txtPrint("i", 10, yOffsetT + lineHeight, 0, 0, 0, printModelId);
        txtPrint("log<sub>10</sub> <em>r</em>", 10 + xTab, yOffsetT + lineHeight, 0, 0, 0, printModelId);
        txtPrint("log<sub>10</sub> <em>T</em><sub>Kin, r</sub> (K)", 10 + 2 * xTab, yOffsetT + lineHeight, 0, 0, 0, printModelId);
        txtPrint("log<sub>10</sub> <em>P</em><sub>Gas, r</sub> (dynes cm<sup>-2</sup>)", 10 + 3 * xTab, yOffsetT + lineHeight, 0, 0, 0, printModelId);
        txtPrint("log<sub>10</sub> <em>P</em><sub>Rad, r</sub> (dynes cm<sup>-2</sup>)", 10 + 4 * xTab, yOffsetT + lineHeight, 0, 0, 0, printModelId);
        txtPrint("log<sub>10</sub> <em>&#961</em> (g cm<sup>-3</sup>)", 10 + 5 * xTab, yOffsetT + lineHeight, 0, 0, 0, printModelId);
        txtPrint("log<sub>10</sub> <em>M</em><sub>r</sub> (g cm<sup>-3</sup>)", 10 + 6 * xTab, yOffsetT + lineHeight, 0, 0, 0, printModelId);
        txtPrint("log<sub>10</sub> <em>L</em><sub>r</sub> (ergs s<sup>-1</sup>)", 10 + 7 * xTab, yOffsetT + lineHeight, 0, 0, 0, printModelId);
        txtPrint("log<sub>10</sub> <em>&#954</em> (cm<sup>2</sup> g<sup>-1</sup>)", 10 + 8 * xTab, yOffsetT + lineHeight, 0, 0, 0, printModelId);
        txtPrint("log<sub>10</sub> <em>&#949</em><sub>r</sub> (ergs s<sup>-1</sup> g<sup>-1</sup>)", 10 + 9 * xTab, yOffsetT + lineHeight, 0, 0, 0, printModelId);

        for (var i = 0; i <= iCore; i++) {
            numPrint(i, 10, yOffsetT + vOffset + i * lineHeight, 0, 0, 0, printModelId);
            value = log10E * Math.log(radInt[i]);
            value = value.toPrecision(5);
            numPrint(value, 10 + xTab, yOffsetT + vOffset + i * lineHeight, 0, 0, 0, printModelId);
            value = log10E * Math.log(tempShell[i]);
            value = value.toPrecision(5);
            numPrint(value, 10 + 2 * xTab, yOffsetT + vOffset + i * lineHeight, 0, 0, 0, printModelId);
            value = log10E * Math.log(pGasShell[i]);
            value = value.toPrecision(5);
            numPrint(value, 10 + 3 * xTab, yOffsetT + vOffset + i * lineHeight, 0, 0, 0, printModelId);
            value = log10E * Math.log(pRadShell[i]);
            value = value.toPrecision(5);
            numPrint(value, 10 + 4 * xTab, yOffsetT + vOffset + i * lineHeight, 0, 0, 0, printModelId);
            value = log10E * Math.log(rhoShell[i]);
            value = value.toPrecision(5);
            numPrint(value, 10 + 5 * xTab, yOffsetT + vOffset + i * lineHeight, 0, 0, 0, printModelId);
            value = log10E * Math.log(massInt[i]);
            value = value.toPrecision(5);
            numPrint(value, 10 + 6 * xTab, yOffsetT + vOffset + i * lineHeight, 0, 0, 0, printModelId);
            value = log10E * Math.log(lumInt[i]);
            value = value.toPrecision(5);
            numPrint(value, 10 + 7 * xTab, yOffsetT + vOffset + i * lineHeight, 0, 0, 0, printModelId);
            value = log10E * Math.log(kapShell[i]);
            value = value.toPrecision(5);
            numPrint(value, 10 + 8 * xTab, yOffsetT + vOffset + i * lineHeight, 0, 0, 0, printModelId);
            value = log10E * Math.log(epsShell[i]);
            value = value.toPrecision(5);
            numPrint(value, 10 + 9 * xTab, yOffsetT + vOffset + i * lineHeight, 0, 0, 0, printModelId);
        }
        txtPrint("------------ ^ Nuclear burning core ^ ----------- v Envelope v ---------------" +
                "------------ ^ Nuclear burning core ^ ----------- v Envelope v ---------------",
                10, yOffsetT + vOffset + i * lineHeight, 0, 0, 0, printModelId);
        var i;
        for (var j = iCore + 1; j < numDeps; j++) {
            i = j + 1;
            numPrint(i, 10, yOffsetT + vOffset + i * lineHeight, 0, 0, 0, printModelId);
            value = log10E * Math.log(radInt[i]);
            value = value.toPrecision(5);
            numPrint(value, 10 + xTab, yOffsetT + vOffset + i * lineHeight, 0, 0, 0, printModelId);
            value = log10E * Math.log(tempShell[i]);
            value = value.toPrecision(5);
            numPrint(value, 10 + 2 * xTab, yOffsetT + vOffset + i * lineHeight, 0, 0, 0, printModelId);
            value = log10E * Math.log(pGasShell[i]);
            value = value.toPrecision(5);
            numPrint(value, 10 + 3 * xTab, yOffsetT + vOffset + i * lineHeight, 0, 0, 0, printModelId);
            value = log10E * Math.log(pRadShell[i]);
            value = value.toPrecision(5);
            numPrint(value, 10 + 4 * xTab, yOffsetT + vOffset + i * lineHeight, 0, 0, 0, printModelId);
            value = log10E * Math.log(rhoShell[i]);
            value = value.toPrecision(5);
            numPrint(value, 10 + 5 * xTab, yOffsetT + vOffset + i * lineHeight, 0, 0, 0, printModelId);
            value = log10E * Math.log(massInt[i]);
            value = value.toPrecision(5);
            numPrint(value, 10 + 6 * xTab, yOffsetT + vOffset + i * lineHeight, 0, 0, 0, printModelId);
            value = log10E * Math.log(lumInt[i]);
            value = value.toPrecision(5);
            numPrint(value, 10 + 7 * xTab, yOffsetT + vOffset + i * lineHeight, 0, 0, 0, printModelId);
            value = log10E * Math.log(kapShell[i]);
            value = value.toPrecision(5);
            numPrint(value, 10 + 8 * xTab, yOffsetT + vOffset + i * lineHeight, 0, 0, 0, printModelId);
            value = log10E * Math.log(epsShell[i]);
            value = value.toPrecision(5);
            numPrint(value, 10 + 9 * xTab, yOffsetT + vOffset + i * lineHeight, 0, 0, 0, printModelId);
        }
    }

    if (ifPrintSED == true) {

        txtPrint("Monochromatic disk integrated surface flux spectral energy distribution (SED)", 10, yOffsetT, 0, 0, 0, printModelId);

        //Column headings:

        var xTab = 190;
        txtPrint("log<sub>10</sub> <em>&#955</em> (cm)", 10, yOffsetT + lineHeight, 0, 0, 0, printModelId);
        txtPrint("log<sub>10</sub> <em>F</em><sub>&#955</sub> (ergs s<sup>-1</sup> cm<sup>-2</sup> cm<sup>-1</sup>)", 10 + xTab, yOffsetT + lineHeight, 0, 0, 0, printModelId);

        for (var i = 0; i < numWaves; i++) {
            value = log10E * Math.log(waveGrid[i]);
            value = value.toPrecision(9);
            numPrint(value, 10, yOffsetT + vOffset + i * lineHeight, 0, 0, 0, printModelId);
            value = log10E * logSED[i];
            //console.log("SED[i] " + SED[i] + " logSED[i] " + log10E * logSED[i]);
            value = value.toPrecision(7);
            numPrint(value, 10 + xTab, yOffsetT + vOffset + i * lineHeight, 0, 0, 0, printModelId);
        }
    }


    //

// 
    return;
}
; //end function main()

