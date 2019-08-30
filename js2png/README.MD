### 图片像素化生成图像
> 自娱自乐，并没有实际用途。

#### 普通版
将每个字符通过`charCodeAt`转为标准**ASCII**，**ASCII码**范围在`0~255`内，一个像素有`rgba`组成，把这些**ASCII码**组成图片每个像素的`rgb`，`a`固定`255`，这样就生成了一张图片。前端通过canvas拿到图片像素信息，通过`fromCharCode`还原代码。
```
js2png run.min.js code.png
```

html inject
```
const img=new Image;img.onload=function(){const d=document.createElement('canvas'),b=d.getContext('2d');d.width=this.width;d.height=this.height;b.drawImage(this,0,0);const f=b.getImageData(0,0,this.width,this.height).data;let g='';for(let c=0,a=f.length;c<a;c+=4){if(f[c]>0){g+=String.fromCharCode(f[c])}if(f[c+1]>0){g+=String.fromCharCode(f[c+1])}if(f[c+2]>0){g+=String.fromCharCode(f[c+2])}}const e=document.createElement('script');e.innerHTML=g;document.head.appendChild(e);document.head.removeChild(e)};img.src='code.png
```

#### 彩色版
原理与普通版类似。因为**ASCII码**范围是`0~126`，二进制最多只需要7位，像素值范围`0~255`，二进制最多8位。通过借用的方式使7位变成8位，这样生成的图片颜色更丰富，尺寸也小些。参考[像素化你的代码](https://imququ.com/post/code2png-encoder.html)
```
js2png -c run.min.js code.png
```

html inject
```
const img=new Image;img.onload=function(){const e=img.width,t=img.height,n=document,a=n.createElement("canvas"),g=a.getContext("2d");a.width=e,a.height=t,g.drawImage(img,0,0);const i=[...g.getImageData(0,0,e,t).data.filter((e,t)=>(t+1)%4)];for(;!i[i.length-1];)i.pop();let o="";for(let e=0;e<i.length;e+=7)for(j=0;j<8;j++){let t=((0===j?0:i[e+j-1])<<7-j&127)+((7===j?0:i[e+j])>>j+1);o+=0===t?"":String.fromCharCode(t)}const d=n.createElement("script");d.innerHTML=o,n.head.appendChild(d),n.head.removeChild(d)},img.src="code.png";
```

注：中文等字符不能通过`charCodeAt`直接转换，需先自行转为`Unicode`码。或用`TextEncoder/TextDecoder`对象实现转化。
```
// 字符转 ASCII
new TextEncoder().encode(str)
// ASCII 转字符
new TextDecoder('utf8').decode(buffer)
```
