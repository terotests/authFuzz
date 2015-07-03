(function(){var t={},n=function(){!function(t){t.guid=function(){return Math.random().toString(36).substring(2,15)+Math.random().toString(36).substring(2,15)},t.isArray=function(t){return"[object Array]"===Object.prototype.toString.call(t)},t.isFunction=function(t){return"[object Function]"==Object.prototype.toString.call(t)},t.isObject=function(t){return t===Object(t)}}(this);var n=function(){!function(t){var n,e,i,r,o;t.add=function(t,n,i){if(n||i){var r;"[object Array]"===Object.prototype.toString.call(i)?r=i:(r=Array.prototype.slice.call(arguments,2),r||(r=[])),e.push([n,t,r])}else e.push(t)},t.asap=function(t){this.add(t)},t.every=function(t,n,e){e||(e="time"+(new Date).getTime()+Math.random(1e7)),r[e]={step:Math.floor(1e3*t),fn:n,nextTime:0}},t.__traitInit&&!t.hasOwnProperty("__traitInit")&&(t.__traitInit=t.__traitInit.slice()),t.__traitInit||(t.__traitInit=[]),t.__traitInit.push(function(){if(!n){var t,s;if(this.polyfill(),"undefined"!=typeof window){var t=window.requestAnimationFrame,s=window.cancelRequestAnimationFrame;["","ms","moz","webkit","o"].forEach(function(n){t||(t=window[n+"RequestAnimationFrame"],s=window[n+"CancelAnimationFrame"]||window[n+"CancelRequestAnimationFrame"])})}t||(t=function(t){return setTimeout(t,16)}),s||(s=function(t){clearTimeout(t)}),e=[],i={},r={},o=[];var a=0,u=function(){for(var n,s=(new Date).getTime();n=e.shift();)"[object Array]"===Object.prototype.toString.call(n)?n[1].apply(n[0],n[2]):n();for(var c=0;c<o.length;c++){var f=o[c];f()}for(var h in i)if(i.hasOwnProperty(h)){var l=i[h];l[0](l[1]),delete i[h]}for(var h in r)if(r.hasOwnProperty(h)){var l=r[h];l.nextTime<s&&(l.fn(),l.nextTime=s+l.step),l.until&&l.until<s&&delete r[h]}t(u),a=s};u(),n=!0}}),t.once=function(t,n,e){i[t]=[n,e]},t.onFrame=function(t){o.push(t)},t.polyfill=function(){},t.removeFrameFn=function(t){var n=o.indexOf(t);return n>=0?(t._onRemove&&t._onRemove(),o.splice(n,1),!0):!1}}(this)},e=function(t,n,i,r,o,s,a,u){var c,f=this;if(!(f instanceof e))return new e(t,n,i,r,o,s,a,u);var h=[t,n,i,r,o,s,a,u];if(f.__factoryClass)if(f.__factoryClass.forEach(function(t){c=t.apply(f,h)}),"function"==typeof c){if(c._classInfo.name!=e._classInfo.name)return new c(t,n,i,r,o,s,a,u)}else if(c)return c;f.__traitInit?f.__traitInit.forEach(function(t){t.apply(f,h)}):"function"==typeof f.init&&f.init.apply(f,h)};e._classInfo={name:"later"},e.prototype=new n;var i=function(){!function(t){t.isArray=function(t){return"[object Array]"===Object.prototype.toString.call(t)},t.isFunction=function(t){return"[object Function]"==Object.prototype.toString.call(t)},t.isObject=function(t){return t===Object(t)}}(this),function(t){t.all=function(t){var n;n=this.isArray(t)?t:Array.prototype.slice.call(arguments,0);var e=n.length,i=0,o=[],s=new Array(e);return this.then(function(){var t=r();return 0==n.length&&t.resolve([]),n.forEach(function(n,r){n.then?(o.push(n),n.then(function(n){s[r]=n,i++,i==e&&t.resolve(s)},function(n){t.reject(n)})):t.reject("Not list of promises")}),t})},t.collect=function(t,n,e){var i;i=this.isArray(n)?n:[n];var o=i.length,s=!1,a=!1,u=0,c=[],f=e||{};return this.then(function(){var n=r();return i.forEach(function(e){e.then?(c.push(e),e.then(function(e){u++,s=t(e,f),(s&&!a||0==a&&o==u)&&(n.resolve(f),a=!0)},function(t){n.reject(t)})):n.reject("Not list of promises")}),n})},t.fail=function(t){return this.then(null,t)},t.fulfill=function(t){if(!(this._rejected||this._fulfilled&&t!=this._stateValue)){this._fulfilled=!0,this._stateValue=t;for(var n=this._childPromises.length;n--;){var e=this._childPromises.shift();if(e._onFulfill)try{var i=e._onFulfill(t);"undefined"!=typeof i?e.resolve(i):e.fulfill(t)}catch(r){e.reject(r)}else e.fulfill(t)}this._state=1,this.triggerStateChange()}},t.__traitInit&&!t.hasOwnProperty("__traitInit")&&(t.__traitInit=t.__traitInit.slice()),t.__traitInit||(t.__traitInit=[]),t.__traitInit.push(function(t,n){if(this._state=0,this._stateValue=null,this._isAPromise=!0,this._childPromises=[],this.isFunction(t)&&(this._onFulfill=t),this.isFunction(n)&&(this._onReject=n),!n&&this.isFunction(t)){var i=this;e().asap(function(){t(function(t){i.resolve(t)},function(t){i.reject(t)})})}}),t.isFulfilled=function(){return 1==this._state},t.isPending=function(){return 0==this._state},t.isRejected=function(){return 2==this._state},t.onStateChange=function(t){this._listeners||(this._listeners=[]),this._listeners.push(t)},t.reject=function(t){if(!(this._fulfilled||this._rejected&&t!=this._rejectReason)){this._state=2,this._rejected=!0,this._rejectReason=t;for(var n=this._childPromises.length;n--;){var e=this._childPromises.shift();if(e._onReject)try{e._onReject(t),e.reject(t)}catch(i){e.reject(i)}else e.reject(t)}this.triggerStateChange()}},t.rejectReason=function(t){return t?void(this._rejectReason=t):this._rejectReason},t.resolve=function(t){if(!(this._state>0)){if(t==this)return this._rejectReason="TypeError",void this.reject(this._rejectReason);if(this.isObject(t)&&t._isAPromise){if(this._state=t._state,this._stateValue=t._stateValue,this._rejectReason=t._rejectReason,0===this._state){var n=this;t.onStateChange(function(){1==t._state&&n.resolve(t.value()),2==t._state&&n.reject(t.rejectReason())})}return 1==this._state&&this.fulfill(this._stateValue),void(2==this._state&&this.reject(this._rejectReason))}if(this.isObject(t)&&t.then&&this.isFunction(t.then)){var e=!1;try{var n=this;t.then.call(t,function(t){e||(n.resolve(t),e=!0)},function(t){e||(n.reject(t),e=!0)})}catch(i){e||this.reject(i)}}else this._state=1,this._stateValue=t,this.fulfill(t)}},t.state=function(t){return"undefined"!=typeof t&&(this._state=t),this._state},t.then=function(t,n){n||(n=function(){});var i=new r(t,n),o=this;return 1==this._state&&e().asap(function(){o.fulfill(o.value())}),2==this._state&&e().asap(function(){o.reject(o.rejectReason())}),this._childPromises.push(i),i},t.triggerStateChange=function(){var t=this;this._listeners&&(this._listeners.forEach(function(n){n(t)}),this._listeners.length=0)},t.value=function(t){return"undefined"!=typeof t?(this._stateValue=t,this):this._stateValue}}(this)},r=function(t,n,e,i,o,s,a,u){var c,f=this;if(!(f instanceof r))return new r(t,n,e,i,o,s,a,u);var h=[t,n,e,i,o,s,a,u];if(f.__factoryClass)if(f.__factoryClass.forEach(function(t){c=t.apply(f,h)}),"function"==typeof c){if(c._classInfo.name!=r._classInfo.name)return new c(t,n,e,i,o,s,a,u)}else if(c)return c;f.__traitInit?f.__traitInit.forEach(function(t){t.apply(f,h)}):"function"==typeof f.init&&f.init.apply(f,h)};r._classInfo={name:"_promise"},r.prototype=new i;var o=function(){!function(t){var n,e,i,r,o,s,a;t._initSha=function(){o||(n="0123456789abcdef".split(""),e=[1,256,65536,16777216],i=[6,1536,393216,100663296],r=[0,8,16,24],o=[1,0,32898,0,32906,2147483648,2147516416,2147483648,32907,0,2147483649,0,2147516545,2147483648,32777,2147483648,138,0,136,0,2147516425,0,2147483658,0,2147516555,0,139,2147483648,32905,2147483648,32771,2147483648,32770,2147483648,128,2147483648,32778,0,2147483658,2147483648,2147516545,2147483648,32896,2147483648,2147483649,0,2147516424,2147483648],s=[],a=[])},t.__traitInit&&!t.hasOwnProperty("__traitInit")&&(t.__traitInit=t.__traitInit.slice()),t.__traitInit||(t.__traitInit=[]),t.__traitInit.push(function(){this._initSha()}),t.keccak=function(t,i,u){var c="string"!=typeof t;c&&t.constructor==root.ArrayBuffer&&(t=new Uint8Array(t)),void 0===i&&(i=512,u=e);var f,h,l,_,p,d,v,y,m,g,I,j,w,F,b,A,O,R,k,E,C,x,P,S,z,T,V,U,G,M,q,D,L,N,B,H,J,K,Q,W,X,Y,Z,$,tn,nn,en,rn,on,sn,an,un,cn,fn,hn,ln,_n,pn,dn,vn,yn,mn,gn,In,jn,wn,Fn=!1,bn=0,An=0,On=t.length,Rn=(1600-2*i)/32,kn=4*Rn;for(_=0;50>_;++_)a[_]=0;f=0;do{for(s[0]=f,_=1;Rn+1>_;++_)s[_]=0;if(c)for(_=An;On>bn&&kn>_;++bn)s[_>>2]|=t[bn]<<r[3&_++];else for(_=An;On>bn&&kn>_;++bn)h=t.charCodeAt(bn),128>h?s[_>>2]|=h<<r[3&_++]:2048>h?(s[_>>2]|=(192|h>>6)<<r[3&_++],s[_>>2]|=(128|63&h)<<r[3&_++]):55296>h||h>=57344?(s[_>>2]|=(224|h>>12)<<r[3&_++],s[_>>2]|=(128|h>>6&63)<<r[3&_++],s[_>>2]|=(128|63&h)<<r[3&_++]):(h=65536+((1023&h)<<10|1023&t.charCodeAt(++bn)),s[_>>2]|=(240|h>>18)<<r[3&_++],s[_>>2]|=(128|h>>12&63)<<r[3&_++],s[_>>2]|=(128|h>>6&63)<<r[3&_++],s[_>>2]|=(128|63&h)<<r[3&_++]);for(An=_-kn,bn==On&&(s[_>>2]|=u[3&_],++bn),f=s[Rn],bn>On&&kn>_&&(s[Rn-1]|=2147483648,Fn=!0),_=0;Rn>_;++_)a[_]^=s[_];for(l=0;48>l;l+=2)v=a[0]^a[10]^a[20]^a[30]^a[40],y=a[1]^a[11]^a[21]^a[31]^a[41],m=a[2]^a[12]^a[22]^a[32]^a[42],g=a[3]^a[13]^a[23]^a[33]^a[43],I=a[4]^a[14]^a[24]^a[34]^a[44],j=a[5]^a[15]^a[25]^a[35]^a[45],w=a[6]^a[16]^a[26]^a[36]^a[46],F=a[7]^a[17]^a[27]^a[37]^a[47],b=a[8]^a[18]^a[28]^a[38]^a[48],A=a[9]^a[19]^a[29]^a[39]^a[49],p=b^(m<<1|g>>>31),d=A^(g<<1|m>>>31),a[0]^=p,a[1]^=d,a[10]^=p,a[11]^=d,a[20]^=p,a[21]^=d,a[30]^=p,a[31]^=d,a[40]^=p,a[41]^=d,p=v^(I<<1|j>>>31),d=y^(j<<1|I>>>31),a[2]^=p,a[3]^=d,a[12]^=p,a[13]^=d,a[22]^=p,a[23]^=d,a[32]^=p,a[33]^=d,a[42]^=p,a[43]^=d,p=m^(w<<1|F>>>31),d=g^(F<<1|w>>>31),a[4]^=p,a[5]^=d,a[14]^=p,a[15]^=d,a[24]^=p,a[25]^=d,a[34]^=p,a[35]^=d,a[44]^=p,a[45]^=d,p=I^(b<<1|A>>>31),d=j^(A<<1|b>>>31),a[6]^=p,a[7]^=d,a[16]^=p,a[17]^=d,a[26]^=p,a[27]^=d,a[36]^=p,a[37]^=d,a[46]^=p,a[47]^=d,p=w^(v<<1|y>>>31),d=F^(y<<1|v>>>31),a[8]^=p,a[9]^=d,a[18]^=p,a[19]^=d,a[28]^=p,a[29]^=d,a[38]^=p,a[39]^=d,a[48]^=p,a[49]^=d,O=a[0],R=a[1],on=a[11]<<4|a[10]>>>28,sn=a[10]<<4|a[11]>>>28,q=a[20]<<3|a[21]>>>29,D=a[21]<<3|a[20]>>>29,gn=a[31]<<9|a[30]>>>23,In=a[30]<<9|a[31]>>>23,tn=a[40]<<18|a[41]>>>14,nn=a[41]<<18|a[40]>>>14,J=a[2]<<1|a[3]>>>31,K=a[3]<<1|a[2]>>>31,k=a[13]<<12|a[12]>>>20,E=a[12]<<12|a[13]>>>20,an=a[22]<<10|a[23]>>>22,un=a[23]<<10|a[22]>>>22,L=a[33]<<13|a[32]>>>19,N=a[32]<<13|a[33]>>>19,jn=a[42]<<2|a[43]>>>30,wn=a[43]<<2|a[42]>>>30,_n=a[5]<<30|a[4]>>>2,pn=a[4]<<30|a[5]>>>2,Q=a[14]<<6|a[15]>>>26,W=a[15]<<6|a[14]>>>26,C=a[25]<<11|a[24]>>>21,x=a[24]<<11|a[25]>>>21,cn=a[34]<<15|a[35]>>>17,fn=a[35]<<15|a[34]>>>17,B=a[45]<<29|a[44]>>>3,H=a[44]<<29|a[45]>>>3,V=a[6]<<28|a[7]>>>4,U=a[7]<<28|a[6]>>>4,dn=a[17]<<23|a[16]>>>9,vn=a[16]<<23|a[17]>>>9,X=a[26]<<25|a[27]>>>7,Y=a[27]<<25|a[26]>>>7,P=a[36]<<21|a[37]>>>11,S=a[37]<<21|a[36]>>>11,hn=a[47]<<24|a[46]>>>8,ln=a[46]<<24|a[47]>>>8,en=a[8]<<27|a[9]>>>5,rn=a[9]<<27|a[8]>>>5,G=a[18]<<20|a[19]>>>12,M=a[19]<<20|a[18]>>>12,yn=a[29]<<7|a[28]>>>25,mn=a[28]<<7|a[29]>>>25,Z=a[38]<<8|a[39]>>>24,$=a[39]<<8|a[38]>>>24,z=a[48]<<14|a[49]>>>18,T=a[49]<<14|a[48]>>>18,a[0]=O^~k&C,a[1]=R^~E&x,a[10]=V^~G&q,a[11]=U^~M&D,a[20]=J^~Q&X,a[21]=K^~W&Y,a[30]=en^~on&an,a[31]=rn^~sn&un,a[40]=_n^~dn&yn,a[41]=pn^~vn&mn,a[2]=k^~C&P,a[3]=E^~x&S,a[12]=G^~q&L,a[13]=M^~D&N,a[22]=Q^~X&Z,a[23]=W^~Y&$,a[32]=on^~an&cn,a[33]=sn^~un&fn,a[42]=dn^~yn&gn,a[43]=vn^~mn&In,a[4]=C^~P&z,a[5]=x^~S&T,a[14]=q^~L&B,a[15]=D^~N&H,a[24]=X^~Z&tn,a[25]=Y^~$&nn,a[34]=an^~cn&hn,a[35]=un^~fn&ln,a[44]=yn^~gn&jn,a[45]=mn^~In&wn,a[6]=P^~z&O,a[7]=S^~T&R,a[16]=L^~B&V,a[17]=N^~H&U,a[26]=Z^~tn&J,a[27]=$^~nn&K,a[36]=cn^~hn&en,a[37]=fn^~ln&rn,a[46]=gn^~jn&_n,a[47]=In^~wn&pn,a[8]=z^~O&k,a[9]=T^~R&E,a[18]=B^~V&G,a[19]=H^~U&M,a[28]=tn^~J&Q,a[29]=nn^~K&W,a[38]=hn^~en&on,a[39]=ln^~rn&sn,a[48]=jn^~_n&dn,a[49]=wn^~pn&vn,a[0]^=o[l],a[1]^=o[l+1]}while(!Fn);var En="";for(_=0,l=i/32;l>_;++_)p=a[_],En+=n[p>>4&15]+n[15&p]+n[p>>12&15]+n[p>>8&15]+n[p>>20&15]+n[p>>16&15]+n[p>>28&15]+n[p>>24&15];return En},t.keccak_224=function(t){return this.keccak(t,224,e)},t.keccak_256=function(t){return this.keccak(t,256,e)},t.keccak_512=function(t){return this.keccak(t,512,e)},t.sha3_224=function(t){return this.keccak(t,224,i)},t.sha3_256=function(t){return this.keccak(t,256,i)},t.sha3_512=function(t){return this.keccak(t,512,i)}}(this)},s=function(t,n,e,i,r,o,a,u){var c,f=this;if(!(f instanceof s))return new s(t,n,e,i,r,o,a,u);var h=[t,n,e,i,r,o,a,u];if(f.__factoryClass)if(f.__factoryClass.forEach(function(t){c=t.apply(f,h)}),"function"==typeof c){if(c._classInfo.name!=s._classInfo.name)return new c(t,n,e,i,r,o,a,u)}else if(c)return c;f.__traitInit?f.__traitInit.forEach(function(t){t.apply(f,h)}):"function"==typeof f.init&&f.init.apply(f,h)};s._classInfo={name:"_sha3"},s.prototype=new o,function(){"undefined"!=typeof define&&null!==define&&null!=define.amd?(t._sha3=s,this._sha3=s):"undefined"!=typeof module&&null!==module&&null!=module.exports?module.exports._sha3=s:this._sha3=s}.call(new Function("return this")());var a=function(){!function(t){t._getGroupNames=function(t,n){var e=r(),i=e,o=[],s=this._groups;return t.forEach(function(t){return console.log("group id ",t),n.indexOf(t)>=0?void o.push({id:t,name:t}):void(i=i.then(function(){return s.readFile(t)}).then(function(n){return o.push({id:t,name:n}),o}).fail(function(n){console.error("Error reading group index with "+n+" FOR "+t)}))}),i=i.then(function(){return o}),e.resolve(!0),i},t.addUserToGroup=function(t,n){var e=this.hash(n),i=this.hash(t),o=this._users,s=i+"-groups";return r(function(t){o.readFile(s).then(function(n){var i=n.split("\n"),r=!1;return i.forEach(function(t){t==e&&(r=!0)}),r?void t({result:!0,text:"User already in group"}):o.appendFile(s,e+"\n")}).then(function(){t({result:!0,text:"User added to the group"})})})},t.createGroup=function(t){var n=this.hash(t),e=this._groups;return r(function(i){e.writeFile(n,t).then(function(){i({result:!0,text:"group created"})})})},t.createUser=function(t,n){var e=this.hash(t),i=this,o=e+"-groups";return r(function(t){i.then(function(){var r=i._users;r.writeFile(e,i.hash(n)).then(function(){return r.isFile(o)}).then(function(t){return t?!0:r.writeFile(o,e+"\n")}).then(function(){t({result:!0})})})})},t.getUserGroups=function(t){var n=this.hash(t),e=this._users,i=this,o=n+"-groups";return r(function(r){console.log("groupFile = "+o),console.log("user name = "+t),e.readFile(o).then(function(t){console.log("Lines from the groupFile"),console.log(t);var e=t.split("\n"),o=[];e.forEach(function(t){t&&t.length>2&&o.push(t)}),i._getGroupNames(o,[n]).then(r)}).fail(function(){r([])})})},t.hash=function(t){return s().sha3_256(t+this._salt)},t.__traitInit&&!t.hasOwnProperty("__traitInit")&&(t.__traitInit=t.__traitInit.slice()),t.__traitInit||(t.__traitInit=[]),t.__traitInit.push(function(t,n){this._salt=n?n:"31337",this._fs=t;var e=this;this._fs.createDir("users").then(function(){return e._fs.createDir("groups")}).then(function(){e._users=t.getFolder("users"),e._groups=t.getFolder("groups"),e.resolve(!0)})}),t.login=function(t,n){var e=this.hash(t),i=this;return r(function(t){i.then(function(){var r=i._users;r.readFile(e).then(function(e){var r=e==i.hash(n);t(r?{result:!0,text:"Login successful"}:{result:!1,text:"Login failed"})}).fail(function(){t({result:!1,text:"Login failed"})})})})},t.removeUserGroup=function(t,n){var e=this.hash(n),i=this.hash(t),o=this._users,s=i+"-groups";return r(function(t){o.readFile(s).then(function(t){var n=t.split("\n"),r=[];return n.forEach(function(t){t&&0!=t.trim().length&&(t==e&&t!=i||r.push(t))}),o.writeFile(s,r.join("\n")+"\n")}).then(function(){t({result:!0,text:"group removed"})})})}}(this)},u=function(t,n,e,i,r,o,s,a){var c,f=this;if(!(f instanceof u))return new u(t,n,e,i,r,o,s,a);var h=[t,n,e,i,r,o,s,a];if(f.__factoryClass)if(f.__factoryClass.forEach(function(t){c=t.apply(f,h)}),"function"==typeof c){if(c._classInfo.name!=u._classInfo.name)return new c(t,n,e,i,r,o,s,a)}else if(c)return c;f.__traitInit?f.__traitInit.forEach(function(t){t.apply(f,h)}):"function"==typeof f.init&&f.init.apply(f,h)};a.prototype=r.prototype,u._classInfo={name:"authFuzz"},u.prototype=new a,function(){"undefined"!=typeof define&&null!==define&&null!=define.amd?(t.authFuzz=u,this.authFuzz=u):"undefined"!=typeof module&&null!==module&&null!=module.exports?module.exports.authFuzz=u:this.authFuzz=u}.call(new Function("return this")()),function(t){t.__traitInit&&!t.hasOwnProperty("__traitInit")&&(t.__traitInit=t.__traitInit.slice()),t.__traitInit||(t.__traitInit=[]),t.__traitInit.push(function(){})}(this)},e=function(t,n,i,r,o,s,a,u){var c,f=this;if(!(f instanceof e))return new e(t,n,i,r,o,s,a,u);var h=[t,n,i,r,o,s,a,u];if(f.__factoryClass)if(f.__factoryClass.forEach(function(t){c=t.apply(f,h)}),"function"==typeof c){if(c._classInfo.name!=e._classInfo.name)return new c(t,n,i,r,o,s,a,u)}else if(c)return c;f.__traitInit?f.__traitInit.forEach(function(t){t.apply(f,h)}):"function"==typeof f.init&&f.init.apply(f,h)};e._classInfo={name:"authModule"},e.prototype=new n,"undefined"!=typeof define&&null!==define&&null!=define.amd&&define(t)}).call(new Function("return this")());