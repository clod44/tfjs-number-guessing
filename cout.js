
function cout(newInfo, col, glow){
    let rgb = [0,0,0];
    let glowsize = 0;
    let glowrgb = [0,0,0];
    if(col){
      arrayCopy(col,rgb);
    }
    if(glow){
      glowsize = 5;
      arrayCopy(rgb,glowrgb);
      rgb = [255,255,255];
    }
    const infoText = document.getElementById("info-text");
    const date = new Date(); /* creating object of Date class */
    const hour = makeDoubleDigit(date.getHours());
    const min = makeDoubleDigit(date.getMinutes());
    const sec = makeDoubleDigit(date.getSeconds());
    const time = `<${hour}:${min}:${sec}>`
    infoText.innerHTML = infoText.innerHTML + "<br/><span style='"+
                      "color: rgb("+rgb[0]+","+rgb[1]+","+rgb[2]+"); "+
                      "text-shadow:0 0 "+glowsize+"px rgb("+glowrgb[0]+","+glowrgb[1]+","+glowrgb[2]+");'><b>" + 
                      time + "</b> " + newInfo + "</span>";
    
    const infoHolder = document.getElementById("info-holder");
    infoText.scrollIntoView({
      behavior: 'smooth',
      block: 'end'
    });
  
    function makeDoubleDigit(number) {
      if (number < 10) {
        return "0" + number;
      }
      else {
        return number;
      }
    }
  }
  