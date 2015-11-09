var c = 2.9979249E+10; // light speed in vaccuum in cm/s
var sigma = 5.670373E-5; //Stefan-Boltzmann constant ergs/s/cm^2/K^4  
var k = 1.3806488E-16; // Boltzmann constant in ergs/K
var h = 6.62606957E-27; //Planck's constant in ergs sec
var ee = 4.80320425E-10; //fundamental charge unit in statcoulombs (cgs)
var mE = 9.10938291E-28; //electron mass (g)
//Conversion factors
var amu = 1.66053892E-24; // atomic mass unit in g
var eV = 1.602176565E-12; // eV in ergs

//Methods:
//Natural logs more useful than base 10 logs - Eg. Formal soln module: 
// Fundamental constants
var logC = Math.log(c);
var logSigma = Math.log(sigma);
var logK = Math.log(k);
var logH = Math.log(h);
var logEe = Math.log(ee); //Named so won't clash with log_10(e)
var logMe = Math.log(mE);
//Conversion factors
var logAmu = Math.log(amu);
var logEv = Math.log(eV);

var logAStef = Math.log(4.0) + logSigma - logC;
var aStef = Math.exp(logAStef);
// // 
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

//public static double logPolyK(){
//    return Math.log(polyK);
//}    
//Kramers oapcity pre-factors (C&O 2nd Ed. p. 249-250):
// Assume all Gaunt and guillotine factors (t) are 1.0
// units: cm^2 g^-1 (cgs)
var kap0BF = 4.34e22; // bound-free (photo-ionization)
var kap0FF = 3.68e19; // free-free (bremstrahlung)
var kap0ES = 0.2;  // electron scattering
var kap0Hmin = 7.9e-33 / 0.02;  // H^- b-f

var logKap0BF = function() {
    return Math.log(kap0BF);
};

var logKap0FF = function() {
    return Math.log(kap0FF);
};

var logKap0ES = function() {
    return Math.log(kap0ES);
};

var logKap0Hmin = function() {
    return Math.log(kap0Hmin);
};

//Nuclear E generation data (C&O 2nd Ed. p. 311 - 312):
// Power law mass power generation rate pre-factors
//proton-proton (p-p) chain H fusion
var eps0PP = 1.08e-5; // ergs s^-1 cm^3 g^-2
var betaPP = 4.0; //T_6 exponent

var logEps0PP = function() {
    return Math.log(eps0PP);
};

//More realistic non-power law treatment:\
//C&) 2nd Ed., p. 311
var eps2PP = 0.241e4; //units consistent with ergs/g
var logEps2PP = function() {
    return Math.log(eps2PP);
};

//CNO cycle - H fusion catalyzed by Carbon, Nitrogen and Oxygen 
var eps0CNO = 8.24e-24;  // ergs s^-1 cm^3 g^-2
var betaCNO = 19.9; //T_6 exponent

var logEps0CNO = function() {
    return Math.log(eps0CNO);
};

//More realistic non-power law treatment:\
//C&) 2nd Ed., p. 312  
var eps2CNO = 8.67e24;  // units consistent with ergs/g
var logEps2CNO = function() {
    return Math.log(eps2CNO);
};

//Triple alpha process for He fusion:

//More realistic non-power law treatment:\
//C&) 2nd Ed., p. 312  
var eps2Ta = 50.9e4;  // units consistent with ergs/g
var logEps2Ta = function() {
    return Math.log(eps2Ta);
};


// threshold for H-fusion
//C&O 2nd Ed., p. 302
var fusionPPTemp = 1.0e7; //K 
//For Triple-alpha process He fusion - ??
var fusionTaTemp = 1.0e8; //K 


var kappaBfFn = function(temp, rho, xFrac, zFrac) {

    var kappa;

    var logTemp = Math.log(temp);
    var logRho = Math.log(rho);

    //Kramers-type oapcity laws
    //Assumes all Gaunt and guillotine (cut-off) factors are unity
    //C&O 2nd Ed. p. 249-250
    //Combined B-F Gaunt and Guillotine (cut-off) cutoff factors:
    var logGtBF = Math.log(0.708) + 0.2 * (Math.log(rho) + Math.log(1.0 + xFrac));

    //bounf-free (b-f) contribution (photo-ionization)
    var logKapBF = logKap0BF() - logGtBF + logRho - 3.5 * logTemp
            + Math.log(zFrac) + Math.log(1.0 + xFrac);
    var kapBF = Math.exp(logKapBF);

    return kapBF;

};

var kappaFfFn = function(temp, rho, xFrac, zFrac) {

    var logTemp = Math.log(temp);
    var logRho = Math.log(rho);

    //Kramers-type oapcity laws
    //Assumes all Gaunt and guillotine (cut-off) factors are unity
    //C&O 2nd Ed. p. 249-250
    //free-free (f-f) contribution (bremstrahlung, braking radiation)
    var logKapFF = logKap0FF() + logRho - 3.5 * logTemp
            + Math.log(1.0 - zFrac) + Math.log(1.0 + xFrac);
    var kapFF = Math.exp(logKapFF);

    //System.out.println("kappa " + kappa);
    return kapFF;

};

var kappaEsFn = function(temp, rho, xFrac, zFrac) {

    var logTemp = Math.log(temp);
    var logRho = Math.log(rho);

    //Kramers-type oapcity laws
    //Assumes all Gaunt and guillotine (cut-off) factors are unity
    //C&O 2nd Ed. p. 249-250        
    //Thomson scattering from free electrons:
    var logKapES = logKap0ES() + Math.log(1.0 + xFrac);
    var kapES = Math.exp(logKapES);

    return kapES;

};

var kappaHminFn = function(temp, rho, xFrac, zFrac) {

    var logTemp = Math.log(temp);
    var logRho = Math.log(rho);
    //initializations:
    var logKapHmin = -99.0;
    var kapHmin = 0.0;

    //Kramers-type oapcity laws
    //Assumes all Gaunt and guillotine (cut-off) factors are unity
    //C&O 2nd Ed. p. 249-250   
    // Hminus b-f:
    // Hminus opacity is DANGEROUS: T^9 !! 
    if ((temp > 3000.0) && (temp < 6000.0)
            && (rho > 1.0e-13) && (rho < 1.0e-8)
            && (zFrac > 0.001) && (zFrac < 0.03)) {
        logKapHmin = logKap0Hmin() + 0.5 * logRho + 9.0 * logTemp
                + Math.log(zFrac);
        kapHmin = Math.exp(logKapHmin);
    } else {
        kapHmin = 0.0; //initialization
    }

    return kapHmin;
};

var getTemp = function(press, rho, xFrac, yFrac, zFrac, lastTemp) {

    var tolerance = 1.0e-3;  // relative error tolerance for root
    var maxIter = 1000; //maximum number of N-R iterations

    var rootTemp = 1.0;  //initialization

    var cGas = k * rho / muI(xFrac, yFrac, zFrac) / amu;
    var cRad = aStef / 3.0;

    //establish initial guess ("x_0") be averaging the temperature we would have 
    // if the pressure were due entirely to gas and entirely to radiation:
    var temp0 = lastTemp; //initialization
    if (lastTemp == 0.0) {
        var tGas0 = press / cGas;
        var tPress04 = press / cRad;
        var tPress0 = Math.pow(tPress04, 0.25);
        temp0 = 0.5 * (tGas0 + tPress0);
    } else {
        temp0 = lastTemp;
    }

    var y0 = (cRad * Math.pow(temp0, 4.0)) + (cGas * temp0) - press;
    var yPrime0, y1;
    var temp1 = temp0; //initialization of improved guess

    var i;
    for (i = 0; i < maxIter; i++) {

        if (Math.abs(y0) <= tolerance) {
            break;
        } else {

            yPrime0 = (4.0 * cRad * Math.pow(temp0, 3.0)) + cGas;
            temp1 = temp0 - (y0 / yPrime0);

            y1 = (cRad * Math.pow(temp1, 4.0)) + (cGas * temp1) - press;

            temp0 = temp1;
            y0 = y1;

        }
    }

    rootTemp = temp1;

    i--;
    //System.out.println("Number of N-R iterations: " + i);

    return rootTemp;
};

var ppChain = function(temp, rho, xFrac, zFrac) { //cnoFrac

    //Nuclear E generation data (C&O 2nd Ed. p. 311 - 312):
// Power law mass power generation rate pre-factors
//proton-proton (p-p) chain H fusion
    var eps0PP = 1.08e-5; // ergs s^-1 cm^3 g^-2
    var betaPP = 4.0; //T_6 exponent
    var eps2PP = 0.241e4; //units consistent with ergs/g
    var logEps2PP = function() {
        return Math.log(eps2PP);
    };

    var logEps0PP = function() {
        return Math.log(eps0PP);
    };

// threshold for H-fusion
//C&O 2nd Ed., p. 302

    // H fusion

    // Assumes power law approximation for reaction and power rates
    // Assumes screening factor, corrections for PPII and PPIII and
    // higher order corrections are all unity
    // C&O 2nd Ed. p. 311-312

    //p-p chain

    var logRatePP;
    var T6 = 1.0e-6 * temp;
    var logT6 = Math.log(T6);  //log "T6" temperature    
    var logRho = Math.log(rho);
    var logX = Math.log(xFrac);

    // logRatePP = logEps0PP() + logRho + 2.0 * logX
    //        + betaPP * logT6;

    var fpp = 1.0; //For now...   p-p chain screening factor
    //double psipp = 1.0;  //For now...  correction factor for simultaneous occurence of PPI, PPII & PPIII chains
    //double Cpp = 1.0; //For now... higher order correction terms
    //Notes: from C&) statstar.Physics.Nuclear
    //       PP chains (see Hansen and Kawaler, Eq. 6.65, 6.73, and 6.74)
    //       psipp = 1 + 1.412E8*(1/X - 1)*EXP(-49.98*T6**(-onethird))
    var xTerm = (1.0 / xFrac - 1.0);
    var logPsipp = Math.log(1.412e8) + Math.log(xTerm) - 49.98 * Math.pow(T6, -0.333333);
    var psipp = 1.0 + Math.exp(logPsipp);
    //Cpp = 1 + 0.0123*T6**onethird + 0.0109*T6**twothirds + 0.000938*T6
    var logTerm1 = Math.log(0.0123) + (1.0 / 3.0) * Math.log(T6);
    var logTerm2 = Math.log(0.0109) + (2.0 / 3.0) * Math.log(T6);
    var logTerm3 = Math.log(0.000938) + Math.log(T6);
    var Cpp = 1.0 + Math.exp(logTerm1) + Math.exp(logTerm2) + Math.exp(logTerm3);
    //
    logRatePP = logEps2PP() + logRho + 2.0 * logX
            - (2.0 / 3.0) * logT6 - 33.80 * Math.pow(T6, -0.333333)
            + Math.log(fpp) + Math.log(psipp) + Math.log(Cpp);



    return Math.exp(logRatePP);

};

var cnoCycle = function(temp, rho, xFrac, zFrac) { 

    //Nuclear E generation data (C&O 2nd Ed. p. 311 - 312):
// Power law mass power generation rate pre-factors

//CNO cycle - H fusion catalyzed by Carbon, Nitrogen and Oxygen 
    var eps0CNO = 8.24e-24;  // ergs s^-1 cm^3 g^-2
    var betaCNO = 19.9; //T_6 exponent
    var eps2CNO = 8.67e24;  // units consistent with ergs/g
    var logEps2CNO = function() {
        return Math.log(eps2CNO);
    };

    var logEps0CNO = function() {
        return Math.log(eps0CNO);
    };

// threshold for H-fusion
//C&O 2nd Ed., p. 302

    // H fusion

    // Assumes power law approximation for reaction and power rates
    // Assumes screening factor, corrections for PPII and PPIII and
    // higher order corrections are all unity
    // C&O 2nd Ed. p. 311-312

    // CNO cycle
    // Need value for X_CNO mass fraction!
    var T6 = 1.0e-6 * temp;
    var logT6 = Math.log(T6);  //log "T6" temperature    
    var logRho = Math.log(rho);
    var logX = Math.log(xFrac);
    var logRateCNO;
    var logXCNO = Math.log(zFrac / 2.0);

    //logRateCNO = logEps0CNO() + logRho + logX + logXCNO
    //        + betaCNO * logT6;

    //More realistic non-power law treatment:
    //double Ccno = 1.0; //For now... higher order correction terms
    //Notes: from C&) statstar.Physics.Nuclear
    //CNO cycle (Kippenhahn and Weigert, Eq. 18.65)
    //CCNO = 1 + 0.0027*T6**onethird - 0.00778*T6**twothirds - 0.000149*T6         
    var logTerm1 = Math.log(0.0027) + (1.0 / 3.0) * Math.log(T6);
    var logTerm2 = Math.log(0.00778) + (2.0 / 3.0) * Math.log(T6);
    var logTerm3 = Math.log(0.000149) + Math.log(T6);
    var Ccno = 1.0 + Math.exp(logTerm1) - Math.exp(logTerm2) - Math.exp(logTerm3);
    //
    logRateCNO = logEps2CNO() + logRho + logX + logXCNO
            - (2.0 / 3.0) * logT6 - 152.28 * Math.pow(T6, -0.333333)
            + Math.log(Ccno);


    //System.out.println("totEpsilon " + totEpsilon);
    return Math.exp(logRateCNO);


};

var TaProcess = function(temp, rho, yFrac) { 

    var eps2Ta = 50.9e4;  // units consistent with ergs/g
    var logEps2Ta = function() {
        return Math.log(eps2Ta);
    };
    // He fusion
    // Assumes screening factor, corrections for PPII and PPIII and
    // higher order corrections are all unity
    // C&O 2nd Ed. p. 311-312
    // Triple alpha process
    // Need value for X_CNO mass fraction!
    var T8 = 1.0e-8 * temp;
    var logT8 = Math.log(T8);  //log "T6" temperature
    var logRho = Math.log(rho);
    var logY = Math.log(yFrac);
    var logRateTa;

    //More realistic non-power law treatment:
    var fTa = 1.0; //For now... Triple alpha process screening factor
    logRateTa = logEps2Ta() + 2.0 * logRho + 3.0 * logY
            - 3.0 * logT8 - (44.027 / T8);
    // + Math.log(fpp) + Math.log(psipp) + Math.log(Cpp);       

    //System.out.println("totEpsilon " + totEpsilon);
    return Math.exp(logRateTa);

    //Notes: from C&) statstar.Physics.Nuclear
    //CNO cycle (Kippenhahn and Weigert, Eq. 18.65)
    //CCNO = 1 + 0.0027*T6**onethird - 0.00778*T6**twothirds - 0.000149*T6         
}




