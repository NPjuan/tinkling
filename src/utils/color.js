
const Color = {
  hex2rgb(color) {
    if (!this.isHex(color)) return color
    const reg = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/
    if (color && reg.test(color)) {
      color = this.parseHex(color)
      //处理六位的颜色值
      let hex = [];
      for (let i=1; i<7; i+=2) {
        hex.push(parseInt('0x'+color.slice(i, i+2)))
      }
      return `rgb(${hex.join(",")})`
    }
    return color
  },
  hex2hsl(color) {
    if (!this.isHex(color)) return color

    let r, g, b
    if (color.length === 4) {
      let temp = '#'
      for (let i=1; i<=3; i++) {
        temp += (color[i] + color[i])
      }
      color = temp
    }
    r = parseInt('0x'+color.slice(1, 3)) / 255
    g = parseInt('0x'+color.slice(3, 5)) / 255
    b = parseInt('0x'+color.slice(5, 7)) / 255
    const MAX = Math.max(r, g, b),
          MIN = Math.min(r, g, b)
    const V = MAX - MIN

    let H = 0;
    if (V === 0) {
      H = 0;
    } else if (MAX === r) {
      H = 60 * (((g - b) / V) % 6);
    } else if (MAX === g) {
      H = 60 * ((b - r) / V + 2);
    } else if (MAX === b) {
      H = 60 * ((r - g) / V + 4);
    }

    H = Math.floor(backCycle(H, 360));
    const L = numberFixed((MAX + MIN) / 2);
    const S = V === 0 ? 0 : numberFixed(V / (1 - Math.abs(2 * L - 1)));

    return `hsl(${H},${numberFixed(100 * S)}%,${numberFixed(100 * L)}%)`;


    function backCycle(num, cycle) {
      let index = num % cycle;
      if (index < 0) {
        index += cycle;
      }
      return index;
    }
    function numberFixed(num = 0, count = 3) {
      const power = Math.pow(10, count);
      return Math.floor(num * power) / power;
    }
  },
  rgb2hex(color) {
    if (!this.isRgb(color)) return color
    //十六进制颜色值的正则表达式
    let reg = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/;
    // 如果是rgb颜色表示
    if (/^(rgb|RGB\(\d{0,3}\d{0,3}\d{0,3}\))/.test(color)) {
      let aColor = color.replace(/(?:\(|\)|rgb|RGB)*/g, "").split(",");
      let strHex = "#";
      for (let i=0; i<aColor.length; i++) {
        let hex = Number(aColor[i]).toString(16);
        if (hex.length < 2) {
          hex = '0' + hex;
        }
        strHex += hex;
      }
      if (strHex.length !== 7) {
        strHex = color;
      }
      return strHex;
    } else if (reg.test(color)) {
      let num = color.replace(/#/,"").split("");
      if (num.length === 6) {
        return color;
      } else if(num.length === 3) {
        let numHex = "#";
        for (let i=0; i<3; i+=1) {
          numHex += (num[i] + num[i]);
        }
        return numHex;
      }
    }
    return color;
  },
  rgb2hsl(color) {
    return this.hex2hsl(this.rgb2hex(color))
  },
  hsl2rgb(color) {
    if(!this.isHsl(color)) return color
    const hsl = color.replace(/[^\d|.|,]/g, '').split(',')
    console.log(hsl)
    const H = hsl[0]
    const S = hsl[1] / 100
    const L = hsl[2] / 100
    const C = (1 - Math.abs(2 * L - 1)) * S
    const X = C * (1 - Math.abs(((H / 60) % 2) - 1))
    const m = L - C / 2
    const vRGB = []
    if (H >= 0 && H < 60) {
      vRGB.push(C, X, 0)
    } else if (H >= 60 && H < 120) {
      vRGB.push(X, C, 0)
    } else if (H >= 120 && H < 180) {
      vRGB.push(0, C, X)
    } else if (H >= 180 && H < 240) {
      vRGB.push(0, X, C)
    } else if (H >= 240 && H < 300) {
      vRGB.push(X, 0, C)
    } else if (H >= 300 && H < 360) {
      vRGB.push(C, 0, X)
    }
    const [vR, vG, vB] = vRGB
    const R = Math.round(255 * (vR + m))
    const G = Math.round(255 * (vG + m))
    const B = Math.round(255 * (vB + m))

    return `rgb(${R},${G},${B})`

  },
  hsl2hex(color) {
    return this.rgb2hex(this.hsl2rgb(color))
  },
  isHex(color) {
    const reg = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/
    return color && reg.test(color)
  },
  isRgb(color) {
    const reg = /^(rgb|RGB\(\d{0,3}\d{0,3}\d{0,3}\))/
    return color && reg.test(color)
  },
  isHsl(color) {
    const reg = /^(hsl|HSL\(\d{0,3},\d{1,2}(?=(\.\d+))%,\d{1,2}(?=(\.\d+))%\))/
    return color && reg.test(color)
  },
  parseHex(color) {
    if (color.length === 4 && this.isHex(color)) {
      let temp = '#'
      for (let i=1; i<=3; i++) {
        temp += (color[i] + color[i])
      }
      color = temp
    }
    return color
  }
}

export default Color