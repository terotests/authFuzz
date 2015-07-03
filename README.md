# authFuzz 

Simple authentication filesystem and authentication emulator for simple filesystem based interfaces and testing purposes.

The user account information is encoded with `SHA-3` algorithm. 

The filesystem hashes all the usernames and passwords with salt so that none of the information can be read directly from the serialized format.

The structure of the filesystem is as follows

1. **users** directory stores login information in file named `<usernamehash>` with value `<passwordhash>`
2. **users** directory stores groups`usernamehash-groups` with value `<grouphash>` separated by newlines
3. **groups** directory stores groups `groupnamehash` with value `<groupname>`

Thus, only group names can be obtained in plain text format through this interface.

```javascript
{
   "users":{"8a8202365df345876f77d7c4a5e192d484f1f68ad38d75c79d4737d2af93cf49":"9930f4bd8f81c27eb03a1ca9703e24c5f0ebee067c981942f516263d8191bb29",
            "8a8202365df345876f77d7c4a5e192d484f1f68ad38d75c79d4737d2af93cf49-groups":"8a8202365df345876f77d7c4a5e192d484f1f68ad38d75c79d4737d2af93cf49\n",
            "80dda3dcbcfea291d5c71fbd73d908118ccbb5d0b4155a00bbf03fdf471c8cb6":"e9cb79df963a6adb128648e29917d84eb2f30ff41f210277099ca256f41262cf",
            "80dda3dcbcfea291d5c71fbd73d908118ccbb5d0b4155a00bbf03fdf471c8cb6-groups":"80dda3dcbcfea291d5c71fbd73d908118ccbb5d0b4155a00bbf03fdf471c8cb6"},
  "groups":{"13fd8ac57db810ff8040a5bb7f51bc2525782b07d28ba33dbc3a1d6a3131f727":"common"}
}
```

## Initialization:

authFuzz requires [jayFuzz](https://github.com/terotests/jayFuzz) filesystem directory to save account information. This way the actual filesystem can in in memory, indexedDB or node.js or any other filesystem emulator.

```javascript

// create a filesystem with root
var filesystem = fsServerMemory("pwServerName");
var root = filesystem.getRootFolder();

// then give the filesystem to the authentication module
var auth = authFuzz(root);

```

## Salting

When initializing the auth -system, optional hash "salt" can be given

```javascript

var auth = authFuzz(root, "mySecretKey2187987");

```


## Creating users:

```javascript
auth.createUser("myUser", "myPassword")
    .then( function() {
        // user has been created
    })
```

## Creating groups:

```javascript
auth.createGroup("common")
    .then( function() {
        // user has been created
    })
```

## Authenticating user

```javascript
auth.login("myUser", "myPassword")
    .then( function(response) {
        if(response.result === true) {
            console.log("login successfull");
        }
    })
```

## Adding users to group

```javascript
auth.addUserToGroup("secondUser", "common")
    .then( function() {
        // user added to group
    });
```

## Removing user from group

User always has his own ID as a group, can not be removed from there

```javascript
auth.removeUserGroup("secondUser", "common")
    .then( function() {
        // user removed from group
    });
```

## Listing group ID's the user belongs to

```javascript
auth.getUserGroups( "secondUser")
    .then( function(list) {
        // list = array of group IDs
    });
```
   
















   

 


   
#### Class authModule





   
    
    
    
    
    
##### trait _dataTrait

- [guid](README.md#_dataTrait_guid)
- [isArray](README.md#_dataTrait_isArray)
- [isFunction](README.md#_dataTrait_isFunction)
- [isObject](README.md#_dataTrait_isObject)


    
    
    
    
    
    


   
      
            
#### Class later


- [add](README.md#later_add)
- [asap](README.md#later_asap)
- [every](README.md#later_every)
- [once](README.md#later_once)
- [onFrame](README.md#later_onFrame)
- [polyfill](README.md#later_polyfill)
- [removeFrameFn](README.md#later_removeFrameFn)



   


   



      
    
      
            
#### Class _promise


- [all](README.md#_promise_all)
- [collect](README.md#_promise_collect)
- [fail](README.md#_promise_fail)
- [fulfill](README.md#_promise_fulfill)
- [isFulfilled](README.md#_promise_isFulfilled)
- [isPending](README.md#_promise_isPending)
- [isRejected](README.md#_promise_isRejected)
- [onStateChange](README.md#_promise_onStateChange)
- [reject](README.md#_promise_reject)
- [rejectReason](README.md#_promise_rejectReason)
- [resolve](README.md#_promise_resolve)
- [state](README.md#_promise_state)
- [then](README.md#_promise_then)
- [triggerStateChange](README.md#_promise_triggerStateChange)
- [value](README.md#_promise_value)



   
    
##### trait util_fns

- [isArray](README.md#util_fns_isArray)
- [isFunction](README.md#util_fns_isFunction)
- [isObject](README.md#util_fns_isObject)


    
    


   
      
    



      
    
      
    
      
            
#### Class _sha3


- [_initSha](README.md#_sha3__initSha)
- [keccak](README.md#_sha3_keccak)
- [keccak_224](README.md#_sha3_keccak_224)
- [keccak_256](README.md#_sha3_keccak_256)
- [keccak_512](README.md#_sha3_keccak_512)
- [sha3_224](README.md#_sha3_sha3_224)
- [sha3_256](README.md#_sha3_sha3_256)
- [sha3_512](README.md#_sha3_sha3_512)



   


   



      
    
      
            
#### Class authFuzz


- [_getGroupNames](README.md#authFuzz__getGroupNames)
- [addUserToGroup](README.md#authFuzz_addUserToGroup)
- [createGroup](README.md#authFuzz_createGroup)
- [createUser](README.md#authFuzz_createUser)
- [getUserGroups](README.md#authFuzz_getUserGroups)
- [hash](README.md#authFuzz_hash)
- [login](README.md#authFuzz_login)
- [removeUserGroup](README.md#authFuzz_removeUserGroup)



   


   



      
    





   
# Class authModule


The class has following internal singleton variables:
        
        
### authModule::constructor( options )

```javascript

```
        


   
    
    
    
    
    
## trait _dataTrait

The class has following internal singleton variables:
        
        
### <a name="_dataTrait_guid"></a>_dataTrait::guid(t)


```javascript

return Math.random().toString(36).substring(2, 15) +
        Math.random().toString(36).substring(2, 15);

```

### <a name="_dataTrait_isArray"></a>_dataTrait::isArray(t)


```javascript
return Object.prototype.toString.call( t ) === '[object Array]';
```

### <a name="_dataTrait_isFunction"></a>_dataTrait::isFunction(fn)


```javascript
return Object.prototype.toString.call(fn) == '[object Function]';
```

### <a name="_dataTrait_isObject"></a>_dataTrait::isObject(t)


```javascript

return t === Object(t);
```


    
    
    
    
    
    


   
      
            
# Class later


The class has following internal singleton variables:
        
* _initDone
        
* _callers
        
* _oneTimers
        
* _everies
        
* _framers
        
        
### <a name="later_add"></a>later::add(fn, thisObj, args)


```javascript
if(thisObj || args) {
   var tArgs;
   if( Object.prototype.toString.call( args ) === '[object Array]' ) {
       tArgs = args;
   } else {
       tArgs = Array.prototype.slice.call(arguments, 2);
       if(!tArgs) tArgs = [];
   }
   _callers.push([thisObj, fn, tArgs]);   
} else {
    _callers.push(fn);
}
```

### <a name="later_asap"></a>later::asap(fn)


```javascript
this.add(fn);

```

### <a name="later_every"></a>later::every(seconds, fn, name)


```javascript

if(!name) {
    name = "time"+(new Date()).getTime()+Math.random(10000000);
}

_everies[name] = {
    step : Math.floor(seconds * 1000),
    fn : fn,
    nextTime : 0
};
```

### later::constructor( interval, fn )

```javascript
if(!_initDone) {

   var frame, cancelFrame;
   
   this.polyfill();
 
   if(typeof(window) != "undefined") {
       var frame = window['requestAnimationFrame'], 
           cancelFrame= window['cancelRequestAnimationFrame'];
       ['', 'ms', 'moz', 'webkit', 'o'].forEach( function(x) { 
           if(!frame) {
            frame = window[x+'RequestAnimationFrame'];
            cancelFrame = window[x+'CancelAnimationFrame'] 
                                       || window[x+'CancelRequestAnimationFrame'];
           }
        });
   }
 
    if (!frame)
        frame= function(cb) {
            return setTimeout(cb, 16);
        };
 
    if (!cancelFrame)
        cancelFrame = function(id) {
            clearTimeout(id);
        };    
        
    _callers = [];
    _oneTimers = {};
    _everies = {};
    _framers = [];
    var lastMs = 0;
    
    var _callQueQue = function() {
       var ms = (new Date()).getTime();
       var fn;
       while(fn=_callers.shift()) {
          if(Object.prototype.toString.call( fn ) === '[object Array]' ) {
              fn[1].apply(fn[0], fn[2]);
          } else {
              fn();
          }
           
       }
       
       for(var i=0; i<_framers.length;i++) {
           var fFn = _framers[i];
           fFn();
       }
       
       for(var n in _oneTimers) {
           if(_oneTimers.hasOwnProperty(n)) {
               var v = _oneTimers[n];
               v[0](v[1]);
               delete _oneTimers[n];
           }
       }
       
       for(var n in _everies) {
           if(_everies.hasOwnProperty(n)) {
               var v = _everies[n];
               if(v.nextTime < ms) {
                   v.fn();
                   v.nextTime = ms + v.step;
               }
               if(v.until) {
                   if(v.until < ms) {
                       delete _everies[n];
                   }
               }
           }
       }       
       
       frame(_callQueQue);
       lastMs = ms;
    };
    _callQueQue();
    _initDone = true;
}
```
        
### <a name="later_once"></a>later::once(key, fn, value)


```javascript
// _oneTimers

_oneTimers[key] = [fn,value];
```

### <a name="later_onFrame"></a>later::onFrame(fn)


```javascript

_framers.push(fn);
```

### <a name="later_polyfill"></a>later::polyfill(t)


```javascript
// --- let's not ---
```

### <a name="later_removeFrameFn"></a>later::removeFrameFn(fn)


```javascript

var i = _framers.indexOf(fn);
if(i>=0) {
    if(fn._onRemove) {
        fn._onRemove();
    }
    _framers.splice(i,1);
    return true;
} else {
    return false;
}
```



   


   



      
    
      
            
# Class _promise


The class has following internal singleton variables:
        
        
### <a name="_promise_all"></a>_promise::all(firstArg)


```javascript

var args;
if(this.isArray(firstArg)) {
  args = firstArg;
} else {
  args = Array.prototype.slice.call(arguments, 0);
}
// console.log(args);
var targetLen = args.length,
    rCnt = 0,
    myPromises = [],
    myResults = new Array(targetLen);
    
return this.then(
    function() {
 
        var allPromise = _promise();
        if(args.length==0) {
            allPromise.resolve([]);
        }
        args.forEach( function(b, index) {
            if(b.then) {
                // console.log("All, looking for ", b, " state = ", b._state);
                myPromises.push(b);
                
                b.then(function(v) {
                    myResults[index] = v;
                    rCnt++;
                    if(rCnt==targetLen) {

                        allPromise.resolve(myResults);
                    }
                }, function(v) {
                    allPromise.reject(v);
                });
                
            } else {
                allPromise.reject("Not list of promises");
            }
        })
        
        return allPromise;
        
    });



    

```

### <a name="_promise_collect"></a>_promise::collect(collectFn, promiseList, results)


```javascript

var args;
if(this.isArray(promiseList)) {
  args = promiseList;
} else {
  args = [promiseList];
}

// console.log(args);
var targetLen = args.length,
    isReady = false,
    noMore = false,
    rCnt = 0,
    myPromises = [],
    myResults = results || {};
    
return this.then(
    function() {
 
        var allPromise = _promise();
        args.forEach( function(b, index) {
            if(b.then) {
                // console.log("All, looking for ", b, " state = ", b._state);
                myPromises.push(b);
                
                b.then(function(v) {
                    rCnt++;
                    isReady = collectFn(v, myResults);
                    if( (isReady && !noMore) || (noMore==false && targetLen == rCnt) ) {
                        allPromise.resolve(myResults);
                        noMore = true;
                    }
                }, function(v) {
                    allPromise.reject(v);
                });
                
            } else {
                allPromise.reject("Not list of promises");
            }
        })
        
        return allPromise;
        
    });

```

### <a name="_promise_fail"></a>_promise::fail(fn)


```javascript
return this.then(null, fn);
```

### <a name="_promise_fulfill"></a>_promise::fulfill(withValue)


```javascript
// if(this._fulfilled || this._rejected) return;

if(this._rejected) return;
if(this._fulfilled && withValue != this._stateValue) {
    return;
}

var me = this;
this._fulfilled = true;
this._stateValue = withValue;

var chCnt = this._childPromises.length;

while(chCnt--) {
    var p = this._childPromises.shift();
    if(p._onFulfill) {
        try {
            var x = p._onFulfill(withValue);
            // console.log("Returned ",x);
            if(typeof(x)!="undefined") {
                p.resolve(x);
            } else {
                p.fulfill(withValue);
            }
        } catch(e) {
            // console.error(e);
            /*
                If either onFulfilled or onRejected throws an exception e, promise2 
                must be rejected with e as the reason.            
            */
            p.reject(e);
        }
    } else {
        /*
            If onFulfilled is not a function and promise1 is fulfilled, promise2 must be 
            fulfilled with the same value as promise1        
        */
        p.fulfill(withValue);
    }
};
// this._childPromises.length = 0;
this._state = 1;
this.triggerStateChange();

```

### _promise::constructor( onFulfilled, onRejected )

```javascript
// 0 = pending
// 1 = fullfilled
// 2 = error

this._state = 0;
this._stateValue = null;
this._isAPromise = true;
this._childPromises = [];

if(this.isFunction(onFulfilled))
    this._onFulfill = onFulfilled;
if(this.isFunction(onRejected))
    this._onReject = onRejected;
    
if(!onRejected && this.isFunction(onFulfilled) ) {

    var me = this;
    later().asap(
        function() {
            onFulfilled( function(v) {
                me.resolve(v)
            }, function(v) {
                me.reject(v);
            });           
        });
 
}
```
        
### <a name="_promise_isFulfilled"></a>_promise::isFulfilled(t)


```javascript
return this._state == 1;
```

### <a name="_promise_isPending"></a>_promise::isPending(t)


```javascript
return this._state == 0;
```

### <a name="_promise_isRejected"></a>_promise::isRejected(v)


```javascript
return this._state == 2;
```

### <a name="_promise_onStateChange"></a>_promise::onStateChange(fn)


```javascript

if(!this._listeners)
    this._listeners = [];

this._listeners.push(fn);
```

### <a name="_promise_reject"></a>_promise::reject(withReason)


```javascript

// if(this._rejected || this._fulfilled) return;

// conso

if(this._fulfilled) return;
if(this._rejected && withReason != this._rejectReason) return;


this._state = 2;
this._rejected = true;
this._rejectReason = withReason;
var me = this;

var chCnt = this._childPromises.length;
while(chCnt--) {
    var p = this._childPromises.shift();

    if(p._onReject) {
        try {
            p._onReject(withReason);
            p.reject(withReason);
        } catch(e) {
            /*
                If either onFulfilled or onRejected throws an exception e, promise2 
                must be rejected with e as the reason.            
            */
            p.reject(e);
        }
    } else {
        /*
            If onFulfilled is not a function and promise1 is fulfilled, promise2 must be 
            fulfilled with the same value as promise1        
        */
        p.reject(withReason);
    }
};

// this._childPromises.length = 0;
this.triggerStateChange();

```

### <a name="_promise_rejectReason"></a>_promise::rejectReason(reason)


```javascript
if(reason) {
    this._rejectReason = reason;
    return;
}
return this._rejectReason;
```

### <a name="_promise_resolve"></a>_promise::resolve(x)


```javascript

// console.log("Resolving ", x);

// can not do this many times...
if(this._state>0) return;

if(x==this) {
    // error
    this._rejectReason = "TypeError";
    this.reject(this._rejectReason);
    return;
}

if(this.isObject(x) && x._isAPromise) {
    
    // 
    this._state = x._state;
    this._stateValue = x._stateValue;
    this._rejectReason = x._rejectReason;
    // ... 
    if(this._state===0) {
        var me = this;
        x.onStateChange( function() {
            if(x._state==1) {
                // console.log("State change");
                me.resolve(x.value());
            } 
            if(x._state==2) {
                me.reject(x.rejectReason());                
            }
        });
    }
    if(this._state==1) {
        // console.log("Resolved to be Promise was fulfilled ", x._stateValue);
        this.fulfill(this._stateValue);    
    }
    if(this._state==2) {
        // console.log("Relved to be Promise was rejected ", x._rejectReason);
        this.reject(this._rejectReason);
    }
    return;
}
if(this.isObject(x) && x.then && this.isFunction(x.then)) {
    // console.log("Thenable ", x);
    var didCall = false;
    try {
        // Call the x.then
        var  me = this;
        x.then.call(x, 
            function(y) {
                if(didCall) return;
                // we have now value for the promise...
                // console.log("Got value from Thenable ", y);
                me.resolve(y);
                didCall = true;
            },
            function(r) {
                if(didCall) return;
                // console.log("Got reject from Thenable ", r);
                me.reject(r);
                didCall = true;
            });
    } catch(e) {
        if(!didCall) this.reject(e);
    }
    return;    
}
this._state = 1;
this._stateValue = x;

// fulfill the promise...
this.fulfill(x);

```

### <a name="_promise_state"></a>_promise::state(newState)


```javascript
if(typeof(newState)!="undefined") {
    this._state = newState;
}
return this._state;
```

### <a name="_promise_then"></a>_promise::then(onFulfilled, onRejected)


```javascript

if(!onRejected) onRejected = function() {};

var p = new _promise(onFulfilled, onRejected);
var me = this;

if(this._state==1) {
    later().asap( function() {
        me.fulfill(me.value());
    });
}
if(this._state==2) {
    later().asap( function() {
        me.reject(me.rejectReason());
    });
}
this._childPromises.push(p);
return p;



```

### <a name="_promise_triggerStateChange"></a>_promise::triggerStateChange(t)


```javascript
var me = this;
if(!this._listeners) return;
this._listeners.forEach( function(fn) {
    fn(me); 
});
// one-timer
this._listeners.length = 0;
```

### <a name="_promise_value"></a>_promise::value(v)


```javascript
if(typeof(v)!="undefined") {
    this._stateValue = v;
    return this;
}
return this._stateValue;
```



   
    
## trait util_fns

The class has following internal singleton variables:
        
        
### <a name="util_fns_isArray"></a>util_fns::isArray(someVar)


```javascript
return Object.prototype.toString.call( someVar ) === '[object Array]';
```

### <a name="util_fns_isFunction"></a>util_fns::isFunction(fn)


```javascript
return Object.prototype.toString.call(fn) == '[object Function]';
```

### <a name="util_fns_isObject"></a>util_fns::isObject(obj)


```javascript
return obj === Object(obj);
```


    
    


   
      
    



      
    
      
    
      
            
# Class _sha3


The class has following internal singleton variables:
        
* HEX_CHARS
        
* KECCAK_PADDING
        
* PADDING
        
* SHIFT
        
* RC
        
* blocks
        
* s
        
        
### <a name="_sha3__initSha"></a>_sha3::_initSha(t)


```javascript

if(RC) return;

HEX_CHARS = '0123456789abcdef'.split('');
KECCAK_PADDING = [1, 256, 65536, 16777216];
PADDING = [6, 1536, 393216, 100663296];
SHIFT = [0, 8, 16, 24];
RC = [1, 0, 32898, 0, 32906, 2147483648, 2147516416, 2147483648, 32907, 0, 2147483649,
        0, 2147516545, 2147483648, 32777, 2147483648, 138, 0, 136, 0, 2147516425, 0, 
        2147483658, 0, 2147516555, 0, 139, 2147483648, 32905, 2147483648, 32771, 
        2147483648, 32770, 2147483648, 128, 2147483648, 32778, 0, 2147483658, 2147483648,
        2147516545, 2147483648, 32896, 2147483648, 2147483649, 0, 2147516424, 2147483648];

blocks = [], s = [];
```

### _sha3::constructor( options )

```javascript
this._initSha();
```
        
### <a name="_sha3_keccak"></a>_sha3::keccak(message, bits, padding)


```javascript
var notString = typeof(message) != 'string';
if(notString && message.constructor == root.ArrayBuffer) {
  message = new Uint8Array(message);
}

if(bits === undefined) {
  bits = 512;
  padding = KECCAK_PADDING;
}

var block, code, end = false, index = 0, start = 0, length = message.length,
    n, i, h, l, c0, c1, c2, c3, c4, c5, c6, c7, c8, c9, 
    b0, b1, b2, b3, b4, b5, b6, b7, b8, b9, b10, b11, b12, b13, b14, b15, b16, b17, 
    b18, b19, b20, b21, b22, b23, b24, b25, b26, b27, b28, b29, b30, b31, b32, b33, 
    b34, b35, b36, b37, b38, b39, b40, b41, b42, b43, b44, b45, b46, b47, b48, b49;
var blockCount = (1600 - bits * 2) / 32;
var byteCount = blockCount * 4;

for(i = 0;i < 50;++i) {
  s[i] = 0;
}

block = 0;
do {
  blocks[0] = block;
  for(i = 1;i < blockCount + 1;++i) {
    blocks[i] = 0;
  }
  if(notString) {
    for (i = start;index < length && i < byteCount; ++index) {
      blocks[i >> 2] |= message[index] << SHIFT[i++ & 3];
    }
  } else {
    for (i = start;index < length && i < byteCount; ++index) {
      code = message.charCodeAt(index);
      if (code < 0x80) {
        blocks[i >> 2] |= code << SHIFT[i++ & 3];
      } else if (code < 0x800) {
        blocks[i >> 2] |= (0xc0 | (code >> 6)) << SHIFT[i++ & 3];
        blocks[i >> 2] |= (0x80 | (code & 0x3f)) << SHIFT[i++ & 3];
      } else if (code < 0xd800 || code >= 0xe000) {
        blocks[i >> 2] |= (0xe0 | (code >> 12)) << SHIFT[i++ & 3];
        blocks[i >> 2] |= (0x80 | ((code >> 6) & 0x3f)) << SHIFT[i++ & 3];
        blocks[i >> 2] |= (0x80 | (code & 0x3f)) << SHIFT[i++ & 3];
      } else {
        code = 0x10000 + (((code & 0x3ff) << 10) | (message.charCodeAt(++index) & 0x3ff));
        blocks[i >> 2] |= (0xf0 | (code >> 18)) << SHIFT[i++ & 3];
        blocks[i >> 2] |= (0x80 | ((code >> 12) & 0x3f)) << SHIFT[i++ & 3];
        blocks[i >> 2] |= (0x80 | ((code >> 6) & 0x3f)) << SHIFT[i++ & 3];
        blocks[i >> 2] |= (0x80 | (code & 0x3f)) << SHIFT[i++ & 3];
      }
    }
  }
  start = i - byteCount;
  if(index == length) {
    blocks[i >> 2] |= padding[i & 3];
    ++index;
  }
  block = blocks[blockCount];
  if(index > length && i < byteCount) {
    blocks[blockCount - 1] |= 0x80000000;
    end = true;
  }

  for(i = 0;i < blockCount;++i) {
    s[i] ^= blocks[i];
  }

  for(n = 0; n < 48; n += 2) {
    c0 = s[0] ^ s[10] ^ s[20] ^ s[30] ^ s[40];
    c1 = s[1] ^ s[11] ^ s[21] ^ s[31] ^ s[41];
    c2 = s[2] ^ s[12] ^ s[22] ^ s[32] ^ s[42];
    c3 = s[3] ^ s[13] ^ s[23] ^ s[33] ^ s[43];
    c4 = s[4] ^ s[14] ^ s[24] ^ s[34] ^ s[44];
    c5 = s[5] ^ s[15] ^ s[25] ^ s[35] ^ s[45];
    c6 = s[6] ^ s[16] ^ s[26] ^ s[36] ^ s[46];
    c7 = s[7] ^ s[17] ^ s[27] ^ s[37] ^ s[47];
    c8 = s[8] ^ s[18] ^ s[28] ^ s[38] ^ s[48];
    c9 = s[9] ^ s[19] ^ s[29] ^ s[39] ^ s[49];

    h = c8 ^ ((c2 << 1) | (c3 >>> 31));
    l = c9 ^ ((c3 << 1) | (c2 >>> 31));
    s[0] ^= h;
    s[1] ^= l;
    s[10] ^= h;
    s[11] ^= l;
    s[20] ^= h;
    s[21] ^= l;
    s[30] ^= h;
    s[31] ^= l;
    s[40] ^= h;
    s[41] ^= l;
    h = c0 ^ ((c4 << 1) | (c5 >>> 31));
    l = c1 ^ ((c5 << 1) | (c4 >>> 31));
    s[2] ^= h;
    s[3] ^= l;
    s[12] ^= h;
    s[13] ^= l;
    s[22] ^= h;
    s[23] ^= l;
    s[32] ^= h;
    s[33] ^= l;
    s[42] ^= h;
    s[43] ^= l;
    h = c2 ^ ((c6 << 1) | (c7 >>> 31));
    l = c3 ^ ((c7 << 1) | (c6 >>> 31));
    s[4] ^= h;
    s[5] ^= l;
    s[14] ^= h;
    s[15] ^= l;
    s[24] ^= h;
    s[25] ^= l;
    s[34] ^= h;
    s[35] ^= l;
    s[44] ^= h;
    s[45] ^= l;
    h = c4 ^ ((c8 << 1) | (c9 >>> 31));
    l = c5 ^ ((c9 << 1) | (c8 >>> 31));
    s[6] ^= h;
    s[7] ^= l;
    s[16] ^= h;
    s[17] ^= l;
    s[26] ^= h;
    s[27] ^= l;
    s[36] ^= h;
    s[37] ^= l;
    s[46] ^= h;
    s[47] ^= l;
    h = c6 ^ ((c0 << 1) | (c1 >>> 31));
    l = c7 ^ ((c1 << 1) | (c0 >>> 31));
    s[8] ^= h;
    s[9] ^= l;
    s[18] ^= h;
    s[19] ^= l;
    s[28] ^= h;
    s[29] ^= l;
    s[38] ^= h;
    s[39] ^= l;
    s[48] ^= h;
    s[49] ^= l;

    b0 = s[0];
    b1 = s[1];
    b32 = (s[11] << 4) | (s[10] >>> 28);
    b33 = (s[10] << 4) | (s[11] >>> 28);
    b14 = (s[20] << 3) | (s[21] >>> 29);
    b15 = (s[21] << 3) | (s[20] >>> 29);
    b46 = (s[31] << 9) | (s[30] >>> 23);
    b47 = (s[30] << 9) | (s[31] >>> 23);
    b28 = (s[40] << 18) | (s[41] >>> 14);
    b29 = (s[41] << 18) | (s[40] >>> 14);
    b20 = (s[2] << 1) | (s[3] >>> 31);
    b21 = (s[3] << 1) | (s[2] >>> 31);
    b2 = (s[13] << 12) | (s[12] >>> 20);
    b3 = (s[12] << 12) | (s[13] >>> 20);
    b34 = (s[22] << 10) | (s[23] >>> 22);
    b35 = (s[23] << 10) | (s[22] >>> 22);
    b16 = (s[33] << 13) | (s[32] >>> 19);
    b17 = (s[32] << 13) | (s[33] >>> 19);
    b48 = (s[42] << 2) | (s[43] >>> 30);
    b49 = (s[43] << 2) | (s[42] >>> 30);
    b40 = (s[5] << 30) | (s[4] >>> 2);
    b41 = (s[4] << 30) | (s[5] >>> 2);
    b22 = (s[14] << 6) | (s[15] >>> 26);
    b23 = (s[15] << 6) | (s[14] >>> 26);
    b4 = (s[25] << 11) | (s[24] >>> 21);
    b5 = (s[24] << 11) | (s[25] >>> 21);
    b36 = (s[34] << 15) | (s[35] >>> 17);
    b37 = (s[35] << 15) | (s[34] >>> 17);
    b18 = (s[45] << 29) | (s[44] >>> 3);
    b19 = (s[44] << 29) | (s[45] >>> 3);
    b10 = (s[6] << 28) | (s[7] >>> 4);
    b11 = (s[7] << 28) | (s[6] >>> 4);
    b42 = (s[17] << 23) | (s[16] >>> 9);
    b43 = (s[16] << 23) | (s[17] >>> 9);
    b24 = (s[26] << 25) | (s[27] >>> 7);
    b25 = (s[27] << 25) | (s[26] >>> 7);
    b6 = (s[36] << 21) | (s[37] >>> 11);
    b7 = (s[37] << 21) | (s[36] >>> 11);
    b38 = (s[47] << 24) | (s[46] >>> 8);
    b39 = (s[46] << 24) | (s[47] >>> 8);
    b30 = (s[8] << 27) | (s[9] >>> 5);
    b31 = (s[9] << 27) | (s[8] >>> 5);
    b12 = (s[18] << 20) | (s[19] >>> 12);
    b13 = (s[19] << 20) | (s[18] >>> 12);
    b44 = (s[29] << 7) | (s[28] >>> 25);
    b45 = (s[28] << 7) | (s[29] >>> 25);
    b26 = (s[38] << 8) | (s[39] >>> 24);
    b27 = (s[39] << 8) | (s[38] >>> 24);
    b8 = (s[48] << 14) | (s[49] >>> 18);
    b9 = (s[49] << 14) | (s[48] >>> 18);

    s[0] = b0 ^ (~b2 & b4);
    s[1] = b1 ^ (~b3 & b5);
    s[10] = b10 ^ (~b12 & b14);
    s[11] = b11 ^ (~b13 & b15);
    s[20] = b20 ^ (~b22 & b24);
    s[21] = b21 ^ (~b23 & b25);
    s[30] = b30 ^ (~b32 & b34);
    s[31] = b31 ^ (~b33 & b35);
    s[40] = b40 ^ (~b42 & b44);
    s[41] = b41 ^ (~b43 & b45);
    s[2] = b2 ^ (~b4 & b6);
    s[3] = b3 ^ (~b5 & b7);
    s[12] = b12 ^ (~b14 & b16);
    s[13] = b13 ^ (~b15 & b17);
    s[22] = b22 ^ (~b24 & b26);
    s[23] = b23 ^ (~b25 & b27);
    s[32] = b32 ^ (~b34 & b36);
    s[33] = b33 ^ (~b35 & b37);
    s[42] = b42 ^ (~b44 & b46);
    s[43] = b43 ^ (~b45 & b47);
    s[4] = b4 ^ (~b6 & b8);
    s[5] = b5 ^ (~b7 & b9);
    s[14] = b14 ^ (~b16 & b18);
    s[15] = b15 ^ (~b17 & b19);
    s[24] = b24 ^ (~b26 & b28);
    s[25] = b25 ^ (~b27 & b29);
    s[34] = b34 ^ (~b36 & b38);
    s[35] = b35 ^ (~b37 & b39);
    s[44] = b44 ^ (~b46 & b48);
    s[45] = b45 ^ (~b47 & b49);
    s[6] = b6 ^ (~b8 & b0);
    s[7] = b7 ^ (~b9 & b1);
    s[16] = b16 ^ (~b18 & b10);
    s[17] = b17 ^ (~b19 & b11);
    s[26] = b26 ^ (~b28 & b20);
    s[27] = b27 ^ (~b29 & b21);
    s[36] = b36 ^ (~b38 & b30);
    s[37] = b37 ^ (~b39 & b31);
    s[46] = b46 ^ (~b48 & b40);
    s[47] = b47 ^ (~b49 & b41);
    s[8] = b8 ^ (~b0 & b2);
    s[9] = b9 ^ (~b1 & b3);
    s[18] = b18 ^ (~b10 & b12);
    s[19] = b19 ^ (~b11 & b13);
    s[28] = b28 ^ (~b20 & b22);
    s[29] = b29 ^ (~b21 & b23);
    s[38] = b38 ^ (~b30 & b32);
    s[39] = b39 ^ (~b31 & b33);
    s[48] = b48 ^ (~b40 & b42);
    s[49] = b49 ^ (~b41 & b43);

    s[0] ^= RC[n];
    s[1] ^= RC[n + 1];
  }
} while(!end);

var hex = '';

for(i = 0, n = bits / 32;i < n;++i) {
    h = s[i];
    hex += HEX_CHARS[(h >> 4) & 0x0F] + HEX_CHARS[h & 0x0F] +
           HEX_CHARS[(h >> 12) & 0x0F] + HEX_CHARS[(h >> 8) & 0x0F] +
           HEX_CHARS[(h >> 20) & 0x0F] + HEX_CHARS[(h >> 16) & 0x0F] +
           HEX_CHARS[(h >> 28) & 0x0F] + HEX_CHARS[(h >> 24) & 0x0F];
}
return hex;
```

### <a name="_sha3_keccak_224"></a>_sha3::keccak_224(message)


```javascript
return this.keccak(message, 224, KECCAK_PADDING);
```

### <a name="_sha3_keccak_256"></a>_sha3::keccak_256(message)


```javascript
return this.keccak(message, 256, KECCAK_PADDING);
```

### <a name="_sha3_keccak_512"></a>_sha3::keccak_512(message)


```javascript
return this.keccak(message, 512, KECCAK_PADDING);
```

### <a name="_sha3_sha3_224"></a>_sha3::sha3_224(message)


```javascript
return this.keccak(message, 224, PADDING);
```

### <a name="_sha3_sha3_256"></a>_sha3::sha3_256(message)


```javascript
return this.keccak(message, 256, PADDING);
```

### <a name="_sha3_sha3_512"></a>_sha3::sha3_512(message)


```javascript
return this.keccak(message, 512, PADDING);
```



   


   



      
    
      
            
# Class authFuzz


The class has following internal singleton variables:
        
* HEX_CHARS
        
* KECCAK_PADDING
        
* PADDING
        
* SHIFT
        
* RC
        
* blocks
        
* s
        
        
### <a name="authFuzz__getGroupNames"></a>authFuzz::_getGroupNames(list, ignoreGroups)

Given list of group ID&#39;s returns the group names
```javascript
var orig = _promise(),
    reader = orig,
    res = [],
    folder = this._groups;
    
list.forEach( function(id) {
    
   if(ignoreGroups.indexOf(id)>=0) {
       res.push({
           id : id,
           name : id
       });
       return;
   }
    
   reader = reader.then( function() {
        return folder.readFile(id);    
   }).then( function(groupName) {
       res.push({
           id : id,
           name : groupName
       });
       return res;
   }).fail( function(m) {
       console.error("Error reading group index with "+m);
   })
});    
reader = reader.then( function() {
    return res;
});
orig.resolve(true);

return reader;
    
```

### <a name="authFuzz_addUserToGroup"></a>authFuzz::addUserToGroup(userName, groupName)


```javascript
var groupHash = this.hash( groupName );
var userHash  = this.hash( userName );
var local = this._users, me = this;
var groupFile = userHash+"-groups";

return _promise(
    function(result) {
        local.readFile(groupFile).then( function(lines) {
            var list = lines.split("\n");
            var bWasIn = false;
            list.forEach( function(gid) {
                if(gid == groupHash) bWasIn = true;
            });
            if(bWasIn) {
                result( { result : true, text : "User already in group"});            
            } else {
                return local.appendFile(groupFile, groupHash+"\n");
            }
        }).then( function() {
            result( { result : true, text : "User added to the group"});  
        });
    });

```

### <a name="authFuzz_createGroup"></a>authFuzz::createGroup(groupName)


```javascript
var groupHash = this.hash( groupName );
var local = this._groups, me = this;

return _promise(
    function(result) {
        local.writeFile(groupHash, groupName).then( function() {
            result( { result : true, text : "group created"});  
        })
    });

```

### <a name="authFuzz_createUser"></a>authFuzz::createUser(userName, password)


```javascript
var userHash = this.hash( userName );
var me = this;
var groupFile = userHash+"-groups";

return _promise(
    function(result) {
        me.then(
            function() {
                var local = me._users;
                local.writeFile(userHash, me.hash(password))
                    .then( function() {
                        return local.isFile(groupFile);
                    })
                    .then( function(is_file) {
                        if(!is_file) {
                            // user belongs to his own group by default
                            return local.writeFile(groupFile, userHash+"\n");
                        } else {
                            return true;
                        }
                    })
                    .then( function() {
                        result( { result : true} );
                    })
            });
    });

```

### <a name="authFuzz_getUserGroups"></a>authFuzz::getUserGroups(userName)


```javascript
var userHash  = this.hash( userName );
var local = this._users, me = this;
var groupFile = userHash+"-groups";

return _promise(
    function(result) {
        local.readFile(groupFile).then( function(lines) {
            var list = lines.split("\n");
            var res = [];
            list.forEach( function(gid) {
                if(gid && gid.length>2) res.push(gid);
            });
            me._getGroupNames( res, [userHash] ).then( result );
            // result(res);
        }).fail( function() {
            result([]);
        });
    });

```

### <a name="authFuzz_hash"></a>authFuzz::hash(value)


```javascript
return _sha3().sha3_256( value + this._salt );
```

### authFuzz::constructor( fileSystem, hashSalt )

```javascript

if(!hashSalt) {
    this._salt = "31337"; // just use some kind of salting if no provided
} else {
    this._salt = hashSalt;
}

this._fs = fileSystem;
var me = this;

this._fs.createDir("users").then( function() {
   return me._fs.createDir("groups");
}).then( function() {
    me._users  = fileSystem.getFolder("users");
    me._groups = fileSystem.getFolder("groups");
    me.resolve(true);
});


```
        
### <a name="authFuzz_login"></a>authFuzz::login(user, password)


```javascript
var userHash = this.hash( user );
var me = this;

return _promise(
    function(result) {
        me.then(
            function() {
                var local = me._users;
                local.readFile(userHash)
                    .then( function(value) {
                        var ok =  ( value == me.hash( password ) );
                        if(ok) {
                            result( { result : true, text : "Login successful"} );
                        } else {
                            result( { result : false, text : "Login failed"} );
                        }
                    })
                    .fail( function() {
                        result( { result : false, text : "Login failed"} );
                    })
            });
    });

```

### <a name="authFuzz_removeUserGroup"></a>authFuzz::removeUserGroup(userName, groupName)


```javascript
var groupHash = this.hash( groupName );
var userHash  = this.hash( userName );
var local = this._users, me = this;
var groupFile = userHash+"-groups";

return _promise(
    function(result) {
        local.readFile(groupFile).then( function(lines) {
            
            var list = lines.split("\n");
            var res = [];
            
            list.forEach( function(gid) {
                if(!gid || gid.trim().length==0) return;
                // user can not be removed from his/her own group
                if(gid == groupHash && ( gid != userHash )) {
                    
                } else {
                    res.push(gid);
                }
            });
            
            return local.writeFile(groupFile, res.join("\n"));
            
        }).then( function() {
            result( { result : true, text : "group removed"});  
        });
    });

```



   


   



      
    




