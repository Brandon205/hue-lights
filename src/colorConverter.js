const scale = (num, in_min, in_max, out_min, out_max) => { // To Scale numbers from a range down to another range
    return (num - in_min) * (out_max - out_min) / (in_max - in_min) + out_min;
  }

export function rgbToXY(r, g, b) { // Return Format: [0.2553, 0.9112]
    //RGB values set in between 0 and 1
    r = scale(r, 0, 255, 0, 1)
    g = scale(g, 0, 255, 0, 1)
    b = scale(b, 0, 255, 0, 1)
    //Apply gamma correction (For more accurate colors)
    let red = r > 0.04045 ? Math.pow((r + 0.055) / (1.0 + 0.055), 2.4) : (r / 12.92)
    let green = g > 0.04045 ? Math.pow((g + 0.055) / (1.0 + 0.055), 2.4) : (g / 12.92)
    let blue = b > 0.04045 ? Math.pow((b + 0.055) / (1.0 + 0.055), 2.4) : (b / 12.92)
    //Convert RGB values to XYZ
    let xx = red * 0.649926 + green * 0.103455 + blue * 0.197109;
    let yy = red * 0.234327 + green * 0.743075 + blue * 0.022598;
    let zz = red * 0 + green * 0.053077 + blue * 1.035763
    //Calculate XY values from XYZ
    let x = xx / (xx + yy + zz);
    let y = yy / (xx + yy + zz);
    //Could now use the Y value as brightness yy: scale(y, 0, 1, 0, 255).toFixed(0)
    return {'x': Number.parseFloat(x).toFixed(4), 'y': Number.parseFloat(y).toFixed(4)}
}

export function xyToRGB(x, y, brightness) { // Return Format: {r: 255, g: 255, b: 255}
    // Convert
    let z = 1 - x - y
    let Y = brightness
    let X = (Y / y) * x
    let Z = (Y / y) * z
    // Convert to RGB
    let R =  X * 1.656492 - Y * 0.354851 - Z * 0.255038;
    let G = -X * 0.707196 + Y * 1.655397 + Z * 0.036152;
    let B =  X * 0.051713 - Y * 0.121364 + Z * 1.011530;
    // Reverse gamma correction
    let r = R <= 0.0031308 ? 12.92 * R : (1 + 0.055) * Math.pow(R, (1 / 2.4)) - 0.055;
    let g = G <= 0.0031308 ? 12.92 * G : (1 + 0.055) * Math.pow(G, (1 / 2.4)) - 0.055;
    let b = B <= 0.0031308 ? 12.92 * B : (1 + 0.055) * Math.pow(B, (1 / 2.4)) - 0.055;

    return {'r': Math.round(scale(r, 0, 17, 0, 255)), 'g': Math.round(scale(g, 0, 17, 0, 255)), 'b': Math.round(scale(b, 0, 17, 0, 255))};
}
