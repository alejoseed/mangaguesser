function HandleColors(setAllColors : any) {
    let color = GetRandomColor();
    setAllColors({
        colorOne: color[0],
        colorTwo: color[1],
        colorThree: color[2],
        colorFour: color[3],
    });
    return setAllColors;
}

function GetRandomColor() {
    // Array to store the generated colors
    let color : string[] = ["#", "#", "#", "#"];
  
    // Loop to generate hex color code
    for (let i = 0; i < color.length; i++) {
      let tmp : string = Math.floor(Math.random() * 16777215).toString(16);
      color[i] += tmp;
    }
    return color;
}

export default HandleColors;
