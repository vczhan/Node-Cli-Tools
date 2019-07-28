command line
```
js2png run.min.js code.png
```

html inject
```
const img=new Image;img.onload=function(){const d=document.createElement('canvas'),b=d.getContext('2d');d.width=this.width;d.height=this.height;b.drawImage(this,0,0);const f=b.getImageData(0,0,this.width,this.height).data;let g='';for(let c=0,a=f.length;c<a;c+=4){if(f[c]>0){g+=String.fromCharCode(f[c])}if(f[c+1]>0){g+=String.fromCharCode(f[c+1])}if(f[c+2]>0){g+=String.fromCharCode(f[c+2])}}const e=document.createElement('script');e.innerHTML=g;document.head.appendChild(e);document.head.removeChild(e)};img.src='code.png
```

command line
```
js2png -c run.min.js code.png
```

html inject
```
const img=new Image;img.onload=function(){const e=img.width,t=img.height,n=document,a=n.createElement("canvas"),g=a.getContext("2d");a.width=e,a.height=t,g.drawImage(img,0,0);const i=[...g.getImageData(0,0,e,t).data.filter((e,t)=>(t+1)%4)];for(;!i[i.length-1];)i.pop();let o="";for(let e=0;e<i.length;e+=7)for(j=0;j<8;j++){let t=((0===j?0:i[e+j-1])<<7-j&127)+((7===j?0:i[e+j])>>j+1);o+=0===t?"":String.fromCharCode(t)}const d=n.createElement("script");d.innerHTML=o,n.head.appendChild(d),n.head.removeChild(d)},img.src="code.png";
```