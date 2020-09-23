const gradientGenerator = () => {
    var hexValues = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "a", "b", "c", "d", "e"];
    function populate(a) {
    for (var i = 0; i < 6; i++) {
    var x = Math.round(Math.random() * 14);
    var y = hexValues[x];
    a += y;
    }
    return a;
    }
    var newColor1 = populate('#');
    var newColor2 = populate('#');
    var angle = Math.round(Math.random() * 360);
    function hexToRGB(hex, alpha) {
    var r = parseInt(hex.slice(1, 3), 16),
    g = parseInt(hex.slice(3, 5), 16),
    b = parseInt(hex.slice(5, 7), 16);
    if (alpha) {
    return "rgba(" + r + ", " + g + ", " + b + ", " + alpha + ")";
    } else {
    return "rgb(" + r + ", " + g + ", " + b + ")";
    }
    }
    let newRgbaColor = hexToRGB(newColor1, 0.7);
    let newRgbaColor1 = hexToRGB(newColor1, 1);
    // var gradient = "linear-gradient(" + angle + "deg, " + newColor1 + ", " + newColor2 + ")";
    var gradient = "linear-gradient(" + 150 + "deg, " + newRgbaColor + ", " + newRgbaColor1 + "50%" + ")";
    console.log('newColor1', newColor1, angle, gradient, newRgbaColor1, newRgbaColor)
    return gradient;
    }



    const getGradient = (rgbValues) => {
    console.log("rgbValues", rgbValues)
    if (rgbValues !== undefined) {
    function getColors(alpha) {
    if (alpha) {
    return "rgba(" + parseInt(rgbValues.red) + ", " + parseInt(rgbValues.green) + ", " + parseInt(rgbValues.blue) + ", " + alpha + ")";
    } else {
    return "rgb(" + parseInt(rgbValues.red) + ", " + parseInt(rgbValues.green) + ", " + parseInt(rgbValues.blue) + ")";
    }
    }
    let newRgbaColor = getColors(0.7);
    let newRgbaColor1 = getColors(1);
    var gradient = "linear-gradient(" + 150 + "deg, " + newRgbaColor + ", " + newRgbaColor1 + "50%" + ")";
    return gradient;
    }
    }


    const getNameInitials = (name) => {
    if (name !== undefined) {
    var initials = name.match(/\b\w/g) || [];
    initials = ((initials.shift() || '') + (initials.pop() || '')).toUpperCase();
    console.log(initials);
    return initials;
    }
    }


    const getRGB = () => {
    var hexValues = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "a", "b", "c", "d", "e"];
    function populate(a) {
    for (var i = 0; i < 6; i++) {
    var x = Math.round(Math.random() * 14);
    var y = hexValues[x];
    a += y;
    }
    return a;
    }
    var newColor = populate('#');
    function hexToRGB(hex, alpha) {
    var r = parseInt(hex.slice(1, 3), 16),
    g = parseInt(hex.slice(3, 5), 16),
    b = parseInt(hex.slice(5, 7), 16);
    return [r, g, b]
    }
    return hexToRGB(newColor, 0.7)
    }




    export default {
    gradientGenerator,
    getNameInitials,
    getRGB,
    getGradient,
    };