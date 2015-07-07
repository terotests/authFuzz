// The code template begins here
'use strict';

(function () {

  var __amdDefs__ = {};

  // The class definition is here...
  var authModule_prototype = function authModule_prototype() {
    // Then create the traits and subclasses for this class here...

    // trait comes here...

    (function (_myTrait_) {

      // Initialize static variables here...

      /**
       * @param float t
       */
      _myTrait_.guid = function (t) {

        return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
      };

      /**
       * @param float t
       */
      _myTrait_.isArray = function (t) {
        return Object.prototype.toString.call(t) === '[object Array]';
      };

      /**
       * @param float fn
       */
      _myTrait_.isFunction = function (fn) {
        return Object.prototype.toString.call(fn) == '[object Function]';
      };

      /**
       * @param float t
       */
      _myTrait_.isObject = function (t) {

        return t === Object(t);
      };
    })(this);

    // the subclass definition comes around here then

    // The class definition is here...
    var later_prototype = function later_prototype() {
      // Then create the traits and subclasses for this class here...

      (function (_myTrait_) {
        var _initDone;
        var _callers;
        var _oneTimers;
        var _everies;
        var _framers;

        // Initialize static variables here...

        /**
         * @param function fn
         * @param float thisObj
         * @param float args
         */
        _myTrait_.add = function (fn, thisObj, args) {
          if (thisObj || args) {
            var tArgs;
            if (Object.prototype.toString.call(args) === '[object Array]') {
              tArgs = args;
            } else {
              tArgs = Array.prototype.slice.call(arguments, 2);
              if (!tArgs) tArgs = [];
            }
            _callers.push([thisObj, fn, tArgs]);
          } else {
            _callers.push(fn);
          }
        };

        /**
         * @param function fn
         */
        _myTrait_.asap = function (fn) {
          this.add(fn);
        };

        /**
         * @param float seconds
         * @param float fn
         * @param float name
         */
        _myTrait_.every = function (seconds, fn, name) {

          if (!name) {
            name = 'time' + new Date().getTime() + Math.random(10000000);
          }

          _everies[name] = {
            step: Math.floor(seconds * 1000),
            fn: fn,
            nextTime: 0
          };
        };

        if (_myTrait_.__traitInit && !_myTrait_.hasOwnProperty('__traitInit')) _myTrait_.__traitInit = _myTrait_.__traitInit.slice();
        if (!_myTrait_.__traitInit) _myTrait_.__traitInit = [];
        _myTrait_.__traitInit.push(function (interval, fn) {
          if (!_initDone) {

            var frame, cancelFrame;

            this.polyfill();

            if (typeof window != 'undefined') {
              var frame = window['requestAnimationFrame'],
                  cancelFrame = window['cancelRequestAnimationFrame'];
              ['', 'ms', 'moz', 'webkit', 'o'].forEach(function (x) {
                if (!frame) {
                  frame = window[x + 'RequestAnimationFrame'];
                  cancelFrame = window[x + 'CancelAnimationFrame'] || window[x + 'CancelRequestAnimationFrame'];
                }
              });
            }

            if (!frame) frame = function (cb) {
              return setTimeout(cb, 16);
            };

            if (!cancelFrame) cancelFrame = function (id) {
              clearTimeout(id);
            };

            _callers = [];
            _oneTimers = {};
            _everies = {};
            _framers = [];
            var lastMs = 0;

            var _callQueQue = function _callQueQue() {
              var ms = new Date().getTime();
              var fn;
              while (fn = _callers.shift()) {
                if (Object.prototype.toString.call(fn) === '[object Array]') {
                  fn[1].apply(fn[0], fn[2]);
                } else {
                  fn();
                }
              }

              for (var i = 0; i < _framers.length; i++) {
                var fFn = _framers[i];
                fFn();
              }

              for (var n in _oneTimers) {
                if (_oneTimers.hasOwnProperty(n)) {
                  var v = _oneTimers[n];
                  v[0](v[1]);
                  delete _oneTimers[n];
                }
              }

              for (var n in _everies) {
                if (_everies.hasOwnProperty(n)) {
                  var v = _everies[n];
                  if (v.nextTime < ms) {
                    v.fn();
                    v.nextTime = ms + v.step;
                  }
                  if (v.until) {
                    if (v.until < ms) {
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
        });

        /**
         * @param  key
         * @param float fn
         * @param float value
         */
        _myTrait_.once = function (key, fn, value) {
          // _oneTimers

          _oneTimers[key] = [fn, value];
        };

        /**
         * @param function fn
         */
        _myTrait_.onFrame = function (fn) {

          _framers.push(fn);
        };

        /**
         * @param float t
         */
        _myTrait_.polyfill = function (t) {};

        /**
         * @param float fn
         */
        _myTrait_.removeFrameFn = function (fn) {

          var i = _framers.indexOf(fn);
          if (i >= 0) {
            if (fn._onRemove) {
              fn._onRemove();
            }
            _framers.splice(i, 1);
            return true;
          } else {
            return false;
          }
        };
      })(this);
    };

    var later = function later(a, b, c, d, e, f, g, h) {
      var m = this,
          res;
      if (m instanceof later) {
        var args = [a, b, c, d, e, f, g, h];
        if (m.__factoryClass) {
          m.__factoryClass.forEach(function (initF) {
            res = initF.apply(m, args);
          });
          if (typeof res == 'function') {
            if (res._classInfo.name != later._classInfo.name) return new res(a, b, c, d, e, f, g, h);
          } else {
            if (res) return res;
          }
        }
        if (m.__traitInit) {
          m.__traitInit.forEach(function (initF) {
            initF.apply(m, args);
          });
        } else {
          if (typeof m.init == 'function') m.init.apply(m, args);
        }
      } else return new later(a, b, c, d, e, f, g, h);
    };
    // inheritance is here

    later._classInfo = {
      name: 'later'
    };
    later.prototype = new later_prototype();

    // the subclass definition comes around here then

    // The class definition is here...
    var _promise_prototype = function _promise_prototype() {
      // Then create the traits and subclasses for this class here...

      // trait comes here...

      (function (_myTrait_) {

        // Initialize static variables here...

        /**
         * @param float someVar
         */
        _myTrait_.isArray = function (someVar) {
          return Object.prototype.toString.call(someVar) === '[object Array]';
        };

        /**
         * @param Function fn
         */
        _myTrait_.isFunction = function (fn) {
          return Object.prototype.toString.call(fn) == '[object Function]';
        };

        /**
         * @param Object obj
         */
        _myTrait_.isObject = function (obj) {
          return obj === Object(obj);
        };
      })(this);

      (function (_myTrait_) {

        // Initialize static variables here...

        /**
         * @param Array firstArg
         */
        _myTrait_.all = function (firstArg) {

          var args;
          if (this.isArray(firstArg)) {
            args = firstArg;
          } else {
            args = Array.prototype.slice.call(arguments, 0);
          }
          // console.log(args);
          var targetLen = args.length,
              rCnt = 0,
              myPromises = [],
              myResults = new Array(targetLen);

          return this.then(function () {

            var allPromise = _promise();
            if (args.length == 0) {
              allPromise.resolve([]);
            }
            args.forEach(function (b, index) {
              if (b.then) {
                // console.log("All, looking for ", b, " state = ", b._state);
                myPromises.push(b);

                b.then(function (v) {
                  myResults[index] = v;
                  rCnt++;
                  if (rCnt == targetLen) {

                    allPromise.resolve(myResults);
                  }
                }, function (v) {
                  allPromise.reject(v);
                });
              } else {
                allPromise.reject('Not list of promises');
              }
            });

            return allPromise;
          });
        };

        /**
         * @param function collectFn
         * @param array promiseList
         * @param Object results
         */
        _myTrait_.collect = function (collectFn, promiseList, results) {

          var args;
          if (this.isArray(promiseList)) {
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

          return this.then(function () {

            var allPromise = _promise();
            args.forEach(function (b, index) {
              if (b.then) {
                // console.log("All, looking for ", b, " state = ", b._state);
                myPromises.push(b);

                b.then(function (v) {
                  rCnt++;
                  isReady = collectFn(v, myResults);
                  if (isReady && !noMore || noMore == false && targetLen == rCnt) {
                    allPromise.resolve(myResults);
                    noMore = true;
                  }
                }, function (v) {
                  allPromise.reject(v);
                });
              } else {
                allPromise.reject('Not list of promises');
              }
            });

            return allPromise;
          });
        };

        /**
         * @param function fn
         */
        _myTrait_.fail = function (fn) {
          return this.then(null, fn);
        };

        /**
         * @param float withValue
         */
        _myTrait_.fulfill = function (withValue) {
          // if(this._fulfilled || this._rejected) return;

          if (this._rejected) return;
          if (this._fulfilled && withValue != this._stateValue) {
            return;
          }

          var me = this;
          this._fulfilled = true;
          this._stateValue = withValue;

          var chCnt = this._childPromises.length;

          while (chCnt--) {
            var p = this._childPromises.shift();
            if (p._onFulfill) {
              try {
                var x = p._onFulfill(withValue);
                // console.log("Returned ",x);
                if (typeof x != 'undefined') {
                  p.resolve(x);
                } else {
                  p.fulfill(withValue);
                }
              } catch (e) {
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
        };

        if (_myTrait_.__traitInit && !_myTrait_.hasOwnProperty('__traitInit')) _myTrait_.__traitInit = _myTrait_.__traitInit.slice();
        if (!_myTrait_.__traitInit) _myTrait_.__traitInit = [];
        _myTrait_.__traitInit.push(function (onFulfilled, onRejected) {
          // 0 = pending
          // 1 = fullfilled
          // 2 = error

          this._state = 0;
          this._stateValue = null;
          this._isAPromise = true;
          this._childPromises = [];

          if (this.isFunction(onFulfilled)) this._onFulfill = onFulfilled;
          if (this.isFunction(onRejected)) this._onReject = onRejected;

          if (!onRejected && this.isFunction(onFulfilled)) {

            var me = this;
            later().asap(function () {
              onFulfilled(function (v) {
                me.resolve(v);
              }, function (v) {
                me.reject(v);
              });
            });
          }
        });

        /**
         * @param float t
         */
        _myTrait_.isFulfilled = function (t) {
          return this._state == 1;
        };

        /**
         * @param float t
         */
        _myTrait_.isPending = function (t) {
          return this._state == 0;
        };

        /**
         * @param bool v
         */
        _myTrait_.isRejected = function (v) {
          return this._state == 2;
        };

        /**
         * @param function fn
         */
        _myTrait_.onStateChange = function (fn) {

          if (!this._listeners) this._listeners = [];

          this._listeners.push(fn);
        };

        /**
         * @param Object withReason
         */
        _myTrait_.reject = function (withReason) {

          // if(this._rejected || this._fulfilled) return;

          // conso

          if (this._fulfilled) return;
          if (this._rejected && withReason != this._rejectReason) return;

          this._state = 2;
          this._rejected = true;
          this._rejectReason = withReason;
          var me = this;

          var chCnt = this._childPromises.length;
          while (chCnt--) {
            var p = this._childPromises.shift();

            if (p._onReject) {
              try {
                p._onReject(withReason);
                p.reject(withReason);
              } catch (e) {
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
        };

        /**
         * @param Object reason
         */
        _myTrait_.rejectReason = function (reason) {
          if (reason) {
            this._rejectReason = reason;
            return;
          }
          return this._rejectReason;
        };

        /**
         * @param Object x
         */
        _myTrait_.resolve = function (x) {

          // console.log("Resolving ", x);

          // can not do this many times...
          if (this._state > 0) return;

          if (x == this) {
            // error
            this._rejectReason = 'TypeError';
            this.reject(this._rejectReason);
            return;
          }

          if (this.isObject(x) && x._isAPromise) {

            //
            this._state = x._state;
            this._stateValue = x._stateValue;
            this._rejectReason = x._rejectReason;
            // ...
            if (this._state === 0) {
              var me = this;
              x.onStateChange(function () {
                if (x._state == 1) {
                  // console.log("State change");
                  me.resolve(x.value());
                }
                if (x._state == 2) {
                  me.reject(x.rejectReason());
                }
              });
            }
            if (this._state == 1) {
              // console.log("Resolved to be Promise was fulfilled ", x._stateValue);
              this.fulfill(this._stateValue);
            }
            if (this._state == 2) {
              // console.log("Relved to be Promise was rejected ", x._rejectReason);
              this.reject(this._rejectReason);
            }
            return;
          }
          if (this.isObject(x) && x.then && this.isFunction(x.then)) {
            // console.log("Thenable ", x);
            var didCall = false;
            try {
              // Call the x.then
              var me = this;
              x.then.call(x, function (y) {
                if (didCall) return;
                // we have now value for the promise...
                // console.log("Got value from Thenable ", y);
                me.resolve(y);
                didCall = true;
              }, function (r) {
                if (didCall) return;
                // console.log("Got reject from Thenable ", r);
                me.reject(r);
                didCall = true;
              });
            } catch (e) {
              if (!didCall) this.reject(e);
            }
            return;
          }
          this._state = 1;
          this._stateValue = x;

          // fulfill the promise...
          this.fulfill(x);
        };

        /**
         * @param float newState
         */
        _myTrait_.state = function (newState) {
          if (typeof newState != 'undefined') {
            this._state = newState;
          }
          return this._state;
        };

        /**
         * @param function onFulfilled
         * @param function onRejected
         */
        _myTrait_.then = function (onFulfilled, onRejected) {

          if (!onRejected) onRejected = function () {};

          var p = new _promise(onFulfilled, onRejected);
          var me = this;

          if (this._state == 1) {
            later().asap(function () {
              me.fulfill(me.value());
            });
          }
          if (this._state == 2) {
            later().asap(function () {
              me.reject(me.rejectReason());
            });
          }
          this._childPromises.push(p);
          return p;
        };

        /**
         * @param float t
         */
        _myTrait_.triggerStateChange = function (t) {
          var me = this;
          if (!this._listeners) return;
          this._listeners.forEach(function (fn) {
            fn(me);
          });
          // one-timer
          this._listeners.length = 0;
        };

        /**
         * @param float v
         */
        _myTrait_.value = function (v) {
          if (typeof v != 'undefined') {
            this._stateValue = v;
            return this;
          }
          return this._stateValue;
        };
      })(this);
    };

    var _promise = function _promise(a, b, c, d, e, f, g, h) {
      var m = this,
          res;
      if (m instanceof _promise) {
        var args = [a, b, c, d, e, f, g, h];
        if (m.__factoryClass) {
          m.__factoryClass.forEach(function (initF) {
            res = initF.apply(m, args);
          });
          if (typeof res == 'function') {
            if (res._classInfo.name != _promise._classInfo.name) return new res(a, b, c, d, e, f, g, h);
          } else {
            if (res) return res;
          }
        }
        if (m.__traitInit) {
          m.__traitInit.forEach(function (initF) {
            initF.apply(m, args);
          });
        } else {
          if (typeof m.init == 'function') m.init.apply(m, args);
        }
      } else return new _promise(a, b, c, d, e, f, g, h);
    };
    // inheritance is here

    _promise._classInfo = {
      name: '_promise'
    };
    _promise.prototype = new _promise_prototype();

    // the subclass definition comes around here then

    // The class definition is here...
    var authFuzz_prototype = function authFuzz_prototype() {
      // Then create the traits and subclasses for this class here...

      // trait comes here...

      (function (_myTrait_) {

        // Initialize static variables here...

        /**
         * @param float t
         */
        _myTrait_.guid = function (t) {

          return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
        };

        /**
         * @param float t
         */
        _myTrait_.isArray = function (t) {
          return Object.prototype.toString.call(t) === '[object Array]';
        };

        /**
         * @param float fn
         */
        _myTrait_.isFunction = function (fn) {
          return Object.prototype.toString.call(fn) == '[object Function]';
        };

        /**
         * @param float t
         */
        _myTrait_.isObject = function (t) {

          return t === Object(t);
        };
      })(this);

      (function (_myTrait_) {

        // Initialize static variables here...

        /**
         * @param float list
         * @param float ignoreGroups
         */
        _myTrait_._getGroupNames = function (list, ignoreGroups) {
          var orig = _promise(),
              reader = orig,
              res = [],
              folder = this._groups;

          list.forEach(function (id) {

            if (ignoreGroups.indexOf(id) >= 0) {
              res.push({
                id: id,
                name: id
              });
              return;
            }

            reader = reader.then(function () {
              return folder.readFile(id);
            }).then(function (groupName) {
              res.push({
                id: id,
                name: groupName
              });
              return res;
            }).fail(function (m) {
              console.error('Error reading group index with ' + m + ' FOR ' + id);
            });
          });
          reader = reader.then(function () {
            return res;
          });
          orig.resolve(true);

          return reader;
        };

        /**
         * @param string userId
         * @param float groupName
         */
        _myTrait_.addUserToGroup = function (userId, groupName) {
          var me = this;
          var udata = me._udata;

          return _promise(function (result) {
            udata.readFile(userId).then(function (jsonData) {

              var data = JSON.parse(jsonData);

              if (data.groups.indexOf(groupName) < 0) data.groups.push(groupName);

              return udata.writeFile(userId, JSON.stringify(data));
            }).then(function () {
              result({
                result: true,
                text: 'User added to the group'
              });
            });
          });
        };

        /**
         * @param string userId
         * @param string newPassword
         */
        _myTrait_.changePassword = function (userId, newPassword) {
          var local = this._users,
              me = this;
          var udata = me._udata;

          return _promise(function (result) {
            udata.readFile(userId).then(function (jsonData) {
              var data = JSON.parse(jsonData);
              // me.hash(password)+":"+id+":"+domain
              return local.writeFile(data.hash, me.hash(newPassword) + ':' + userId + ':' + data.domain);
            }).then(function () {
              result({
                result: true,
                text: 'Password changed'
              });
            }).fail(function () {
              result([]);
            });
          });
        };

        /**
         * @param string userId
         * @param float newUsername
         * @param float newDomain
         */
        _myTrait_.changeUsername = function (userId, newUsername, newDomain) {
          var local = this._users,
              me = this;
          var udata = me._udata;

          return _promise(function (result) {
            var hashData, data, newHash, domain;
            udata.readFile(userId).then(function (jsonData) {
              data = JSON.parse(jsonData);
              // me.hash(password)+":"+id+":"+domain
              domain = newDomain || data.domain;
              return local.readFile(data.hash);
            }).then(function (oldData) {
              hashData = oldData;
              if (hashData) {
                return local.removeFile(data.hash);
              }
            }).then(function () {
              if (hashData) {
                newHash = me.hash(newUsername + ':' + domain);
                return local.writeFile(newHash, hashData);
              }
            }).then(function () {
              if (hashData) {
                data.hash = newHash;
                data.userName = newUsername;
                data.domain = domain;
                return udata.writeFile(userId, JSON.stringify(data));
              }
            }).then(function () {
              if (hashData) {
                result({
                  result: true,
                  text: 'Username changed'
                });
              } else {
                result({
                  result: false,
                  text: 'Could not change the username'
                });
              }
            }).fail(function () {
              result({
                result: false,
                text: 'Could not change the username'
              });
            });
          });
        };

        /**
         * @param float userName
         * @param float password
         * @param float id
         * @param float domain
         */
        _myTrait_.createUser = function (userName, password, id, domain) {
          // username is used to find the user based on the username...
          // userID should be

          domain = domain || '';
          if (!id) id = this.guid();

          var userHash = this.hash(userName + ':' + domain);
          var me = this;

          // store user information into object, which is serialized
          var userData = {
            userName: userName,
            domain: domain,
            hash: userHash,
            groups: []
          };

          return _promise(function (result) {
            me.then(function () {
              var local = me._users;
              var udata = me._udata;

              local.isFile(userHash).then(function (is_file) {
                if (!is_file) {
                  local.writeFile(userHash, me.hash(password) + ':' + id + ':' + domain).then(function () {
                    return udata.writeFile(id, JSON.stringify(userData));
                  }).then(function () {
                    result({
                      result: true,
                      userId: id
                    });
                  });
                } else {
                  local.readFile(userHash).then(function (data) {
                    var parts = data.split(':');
                    result({
                      result: true,
                      userId: parts[1]
                    });
                  });
                }
              });
            });
          });
        };

        /**
         * @param string userId
         */
        _myTrait_.getUserData = function (userId) {
          var me = this;
          var udata = me._udata;

          return _promise(function (result) {
            udata.readFile(userId).then(function (jsonData) {
              var data = JSON.parse(jsonData);
              result(data);
            }).fail(function () {
              result(null);
            });
          });
        };

        /**
         * @param float userId
         */
        _myTrait_.getUserGroups = function (userId) {
          var local = this._users,
              me = this;

          // local and udata...
          var local = me._users;
          var udata = me._udata;

          return _promise(function (result) {
            udata.readFile(userId).then(function (jsonData) {
              var data = JSON.parse(jsonData);
              result(data.groups);
            }).fail(function () {
              result([]);
            });
          });
        };

        /**
         * @param string value
         */
        _myTrait_.hash = function (value) {
          return _sha3().sha3_256(value + this._salt);
        };

        if (_myTrait_.__traitInit && !_myTrait_.hasOwnProperty('__traitInit')) _myTrait_.__traitInit = _myTrait_.__traitInit.slice();
        if (!_myTrait_.__traitInit) _myTrait_.__traitInit = [];
        _myTrait_.__traitInit.push(function (fileSystem, hashSalt) {
          if (!hashSalt) {
            this._salt = '31337'; // just use some kind of salting if no provided
          } else {
            this._salt = hashSalt;
          }

          this._fs = fileSystem;
          var me = this;

          this._fs.createDir('users').then(function () {
            return me._fs.createDir('groups');
          }).then(function () {
            return me._fs.createDir('domains');
          }).then(function () {
            return me._fs.createDir('udata');
          }).then(function () {
            me._users = fileSystem.getFolder('users');
            me._groups = fileSystem.getFolder('groups');
            me._domains = fileSystem.getFolder('domains');
            me._udata = fileSystem.getFolder('udata');
            me.resolve(true);
          });
        });

        /**
         * @param float user
         * @param float password
         * @param float domain
         */
        _myTrait_.login = function (user, password, domain) {
          var me = this;

          if (!domain) domain = '';
          var userHash = this.hash(user + ':' + domain);

          return _promise(function (result) {
            me.then(function () {
              var local = me._users;
              local.readFile(userHash).then(function (value) {

                var parts = value.split(':');
                var pwHash = parts[0],
                    uid = parts[1];

                var ok = pwHash == me.hash(password);
                if (ok) {
                  result({
                    result: true,
                    userId: uid,
                    text: 'Login successful'
                  });
                } else {
                  result({
                    result: false,
                    text: 'Login failed'
                  });
                }
              }).fail(function () {
                result({
                  result: false,
                  text: 'Login failed'
                });
              });
            });
          });
        };

        /**
         * @param string userId
         * @param string groupName
         */
        _myTrait_.removeUserGroup = function (userId, groupName) {
          var me = this;
          var udata = me._udata;

          return _promise(function (result) {
            // The user ID... file??
            udata.readFile(userId).then(function (jsonData) {

              var data = JSON.parse(jsonData);

              var i = data.groups.indexOf(groupName);
              if (data.groups.indexOf(groupName) >= 0) data.groups.splice(i, 1);

              return udata.writeFile(userId, JSON.stringify(data));
            }).then(function () {
              result({
                result: true,
                text: 'Removed user from group'
              });
            });
          });
        };
      })(this);
    };

    var authFuzz = function authFuzz(a, b, c, d, e, f, g, h) {
      var m = this,
          res;
      if (m instanceof authFuzz) {
        var args = [a, b, c, d, e, f, g, h];
        if (m.__factoryClass) {
          m.__factoryClass.forEach(function (initF) {
            res = initF.apply(m, args);
          });
          if (typeof res == 'function') {
            if (res._classInfo.name != authFuzz._classInfo.name) return new res(a, b, c, d, e, f, g, h);
          } else {
            if (res) return res;
          }
        }
        if (m.__traitInit) {
          m.__traitInit.forEach(function (initF) {
            initF.apply(m, args);
          });
        } else {
          if (typeof m.init == 'function') m.init.apply(m, args);
        }
      } else return new authFuzz(a, b, c, d, e, f, g, h);
    };
    // inheritance is here _promise

    authFuzz_prototype.prototype = _promise.prototype;

    authFuzz._classInfo = {
      name: 'authFuzz'
    };
    authFuzz.prototype = new authFuzz_prototype();

    (function () {
      if (typeof define !== 'undefined' && define !== null && define.amd != null) {
        __amdDefs__['authFuzz'] = authFuzz;
        this.authFuzz = authFuzz;
      } else if (typeof module !== 'undefined' && module !== null && module.exports != null) {
        module.exports['authFuzz'] = authFuzz;
      } else {
        this.authFuzz = authFuzz;
      }
    }).call(new Function('return this')());

    // the subclass definition comes around here then

    // The class definition is here...
    var _sha3_prototype = function _sha3_prototype() {
      // Then create the traits and subclasses for this class here...

      (function (_myTrait_) {
        var HEX_CHARS;
        var KECCAK_PADDING;
        var PADDING;
        var SHIFT;
        var RC;
        var blocks;
        var s;

        // Initialize static variables here...

        /**
         * @param float t
         */
        _myTrait_._initSha = function (t) {
          if (RC) return;

          HEX_CHARS = '0123456789abcdef'.split('');
          KECCAK_PADDING = [1, 256, 65536, 16777216];
          PADDING = [6, 1536, 393216, 100663296];
          SHIFT = [0, 8, 16, 24];
          RC = [1, 0, 32898, 0, 32906, 2147483648, 2147516416, 2147483648, 32907, 0, 2147483649, 0, 2147516545, 2147483648, 32777, 2147483648, 138, 0, 136, 0, 2147516425, 0, 2147483658, 0, 2147516555, 0, 139, 2147483648, 32905, 2147483648, 32771, 2147483648, 32770, 2147483648, 128, 2147483648, 32778, 0, 2147483658, 2147483648, 2147516545, 2147483648, 32896, 2147483648, 2147483649, 0, 2147516424, 2147483648];

          blocks = [], s = [];
        };

        if (_myTrait_.__traitInit && !_myTrait_.hasOwnProperty('__traitInit')) _myTrait_.__traitInit = _myTrait_.__traitInit.slice();
        if (!_myTrait_.__traitInit) _myTrait_.__traitInit = [];
        _myTrait_.__traitInit.push(function (t) {
          this._initSha();
        });

        /**
         * @param float message
         * @param float bits
         * @param float padding
         */
        _myTrait_.keccak = function (message, bits, padding) {
          var notString = typeof message != 'string';
          if (notString && message.constructor == root.ArrayBuffer) {
            message = new Uint8Array(message);
          }

          if (bits === undefined) {
            bits = 512;
            padding = KECCAK_PADDING;
          }

          var block,
              code,
              end = false,
              index = 0,
              start = 0,
              length = message.length,
              n,
              i,
              h,
              l,
              c0,
              c1,
              c2,
              c3,
              c4,
              c5,
              c6,
              c7,
              c8,
              c9,
              b0,
              b1,
              b2,
              b3,
              b4,
              b5,
              b6,
              b7,
              b8,
              b9,
              b10,
              b11,
              b12,
              b13,
              b14,
              b15,
              b16,
              b17,
              b18,
              b19,
              b20,
              b21,
              b22,
              b23,
              b24,
              b25,
              b26,
              b27,
              b28,
              b29,
              b30,
              b31,
              b32,
              b33,
              b34,
              b35,
              b36,
              b37,
              b38,
              b39,
              b40,
              b41,
              b42,
              b43,
              b44,
              b45,
              b46,
              b47,
              b48,
              b49;
          var blockCount = (1600 - bits * 2) / 32;
          var byteCount = blockCount * 4;

          for (i = 0; i < 50; ++i) {
            s[i] = 0;
          }

          block = 0;
          do {
            blocks[0] = block;
            for (i = 1; i < blockCount + 1; ++i) {
              blocks[i] = 0;
            }
            if (notString) {
              for (i = start; index < length && i < byteCount; ++index) {
                blocks[i >> 2] |= message[index] << SHIFT[i++ & 3];
              }
            } else {
              for (i = start; index < length && i < byteCount; ++index) {
                code = message.charCodeAt(index);
                if (code < 128) {
                  blocks[i >> 2] |= code << SHIFT[i++ & 3];
                } else if (code < 2048) {
                  blocks[i >> 2] |= (192 | code >> 6) << SHIFT[i++ & 3];
                  blocks[i >> 2] |= (128 | code & 63) << SHIFT[i++ & 3];
                } else if (code < 55296 || code >= 57344) {
                  blocks[i >> 2] |= (224 | code >> 12) << SHIFT[i++ & 3];
                  blocks[i >> 2] |= (128 | code >> 6 & 63) << SHIFT[i++ & 3];
                  blocks[i >> 2] |= (128 | code & 63) << SHIFT[i++ & 3];
                } else {
                  code = 65536 + ((code & 1023) << 10 | message.charCodeAt(++index) & 1023);
                  blocks[i >> 2] |= (240 | code >> 18) << SHIFT[i++ & 3];
                  blocks[i >> 2] |= (128 | code >> 12 & 63) << SHIFT[i++ & 3];
                  blocks[i >> 2] |= (128 | code >> 6 & 63) << SHIFT[i++ & 3];
                  blocks[i >> 2] |= (128 | code & 63) << SHIFT[i++ & 3];
                }
              }
            }
            start = i - byteCount;
            if (index == length) {
              blocks[i >> 2] |= padding[i & 3];
              ++index;
            }
            block = blocks[blockCount];
            if (index > length && i < byteCount) {
              blocks[blockCount - 1] |= 2147483648;
              end = true;
            }

            for (i = 0; i < blockCount; ++i) {
              s[i] ^= blocks[i];
            }

            for (n = 0; n < 48; n += 2) {
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

              h = c8 ^ (c2 << 1 | c3 >>> 31);
              l = c9 ^ (c3 << 1 | c2 >>> 31);
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
              h = c0 ^ (c4 << 1 | c5 >>> 31);
              l = c1 ^ (c5 << 1 | c4 >>> 31);
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
              h = c2 ^ (c6 << 1 | c7 >>> 31);
              l = c3 ^ (c7 << 1 | c6 >>> 31);
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
              h = c4 ^ (c8 << 1 | c9 >>> 31);
              l = c5 ^ (c9 << 1 | c8 >>> 31);
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
              h = c6 ^ (c0 << 1 | c1 >>> 31);
              l = c7 ^ (c1 << 1 | c0 >>> 31);
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
              b32 = s[11] << 4 | s[10] >>> 28;
              b33 = s[10] << 4 | s[11] >>> 28;
              b14 = s[20] << 3 | s[21] >>> 29;
              b15 = s[21] << 3 | s[20] >>> 29;
              b46 = s[31] << 9 | s[30] >>> 23;
              b47 = s[30] << 9 | s[31] >>> 23;
              b28 = s[40] << 18 | s[41] >>> 14;
              b29 = s[41] << 18 | s[40] >>> 14;
              b20 = s[2] << 1 | s[3] >>> 31;
              b21 = s[3] << 1 | s[2] >>> 31;
              b2 = s[13] << 12 | s[12] >>> 20;
              b3 = s[12] << 12 | s[13] >>> 20;
              b34 = s[22] << 10 | s[23] >>> 22;
              b35 = s[23] << 10 | s[22] >>> 22;
              b16 = s[33] << 13 | s[32] >>> 19;
              b17 = s[32] << 13 | s[33] >>> 19;
              b48 = s[42] << 2 | s[43] >>> 30;
              b49 = s[43] << 2 | s[42] >>> 30;
              b40 = s[5] << 30 | s[4] >>> 2;
              b41 = s[4] << 30 | s[5] >>> 2;
              b22 = s[14] << 6 | s[15] >>> 26;
              b23 = s[15] << 6 | s[14] >>> 26;
              b4 = s[25] << 11 | s[24] >>> 21;
              b5 = s[24] << 11 | s[25] >>> 21;
              b36 = s[34] << 15 | s[35] >>> 17;
              b37 = s[35] << 15 | s[34] >>> 17;
              b18 = s[45] << 29 | s[44] >>> 3;
              b19 = s[44] << 29 | s[45] >>> 3;
              b10 = s[6] << 28 | s[7] >>> 4;
              b11 = s[7] << 28 | s[6] >>> 4;
              b42 = s[17] << 23 | s[16] >>> 9;
              b43 = s[16] << 23 | s[17] >>> 9;
              b24 = s[26] << 25 | s[27] >>> 7;
              b25 = s[27] << 25 | s[26] >>> 7;
              b6 = s[36] << 21 | s[37] >>> 11;
              b7 = s[37] << 21 | s[36] >>> 11;
              b38 = s[47] << 24 | s[46] >>> 8;
              b39 = s[46] << 24 | s[47] >>> 8;
              b30 = s[8] << 27 | s[9] >>> 5;
              b31 = s[9] << 27 | s[8] >>> 5;
              b12 = s[18] << 20 | s[19] >>> 12;
              b13 = s[19] << 20 | s[18] >>> 12;
              b44 = s[29] << 7 | s[28] >>> 25;
              b45 = s[28] << 7 | s[29] >>> 25;
              b26 = s[38] << 8 | s[39] >>> 24;
              b27 = s[39] << 8 | s[38] >>> 24;
              b8 = s[48] << 14 | s[49] >>> 18;
              b9 = s[49] << 14 | s[48] >>> 18;

              s[0] = b0 ^ ~b2 & b4;
              s[1] = b1 ^ ~b3 & b5;
              s[10] = b10 ^ ~b12 & b14;
              s[11] = b11 ^ ~b13 & b15;
              s[20] = b20 ^ ~b22 & b24;
              s[21] = b21 ^ ~b23 & b25;
              s[30] = b30 ^ ~b32 & b34;
              s[31] = b31 ^ ~b33 & b35;
              s[40] = b40 ^ ~b42 & b44;
              s[41] = b41 ^ ~b43 & b45;
              s[2] = b2 ^ ~b4 & b6;
              s[3] = b3 ^ ~b5 & b7;
              s[12] = b12 ^ ~b14 & b16;
              s[13] = b13 ^ ~b15 & b17;
              s[22] = b22 ^ ~b24 & b26;
              s[23] = b23 ^ ~b25 & b27;
              s[32] = b32 ^ ~b34 & b36;
              s[33] = b33 ^ ~b35 & b37;
              s[42] = b42 ^ ~b44 & b46;
              s[43] = b43 ^ ~b45 & b47;
              s[4] = b4 ^ ~b6 & b8;
              s[5] = b5 ^ ~b7 & b9;
              s[14] = b14 ^ ~b16 & b18;
              s[15] = b15 ^ ~b17 & b19;
              s[24] = b24 ^ ~b26 & b28;
              s[25] = b25 ^ ~b27 & b29;
              s[34] = b34 ^ ~b36 & b38;
              s[35] = b35 ^ ~b37 & b39;
              s[44] = b44 ^ ~b46 & b48;
              s[45] = b45 ^ ~b47 & b49;
              s[6] = b6 ^ ~b8 & b0;
              s[7] = b7 ^ ~b9 & b1;
              s[16] = b16 ^ ~b18 & b10;
              s[17] = b17 ^ ~b19 & b11;
              s[26] = b26 ^ ~b28 & b20;
              s[27] = b27 ^ ~b29 & b21;
              s[36] = b36 ^ ~b38 & b30;
              s[37] = b37 ^ ~b39 & b31;
              s[46] = b46 ^ ~b48 & b40;
              s[47] = b47 ^ ~b49 & b41;
              s[8] = b8 ^ ~b0 & b2;
              s[9] = b9 ^ ~b1 & b3;
              s[18] = b18 ^ ~b10 & b12;
              s[19] = b19 ^ ~b11 & b13;
              s[28] = b28 ^ ~b20 & b22;
              s[29] = b29 ^ ~b21 & b23;
              s[38] = b38 ^ ~b30 & b32;
              s[39] = b39 ^ ~b31 & b33;
              s[48] = b48 ^ ~b40 & b42;
              s[49] = b49 ^ ~b41 & b43;

              s[0] ^= RC[n];
              s[1] ^= RC[n + 1];
            }
          } while (!end);

          var hex = '';

          for (i = 0, n = bits / 32; i < n; ++i) {
            h = s[i];
            hex += HEX_CHARS[h >> 4 & 15] + HEX_CHARS[h & 15] + HEX_CHARS[h >> 12 & 15] + HEX_CHARS[h >> 8 & 15] + HEX_CHARS[h >> 20 & 15] + HEX_CHARS[h >> 16 & 15] + HEX_CHARS[h >> 28 & 15] + HEX_CHARS[h >> 24 & 15];
          }
          return hex;
        };

        /**
         * @param string message
         */
        _myTrait_.keccak_224 = function (message) {
          return this.keccak(message, 224, KECCAK_PADDING);
        };

        /**
         * @param string message
         */
        _myTrait_.keccak_256 = function (message) {
          return this.keccak(message, 256, KECCAK_PADDING);
        };

        /**
         * @param string message
         */
        _myTrait_.keccak_512 = function (message) {
          return this.keccak(message, 512, KECCAK_PADDING);
        };

        /**
         * @param string message
         */
        _myTrait_.sha3_224 = function (message) {
          return this.keccak(message, 224, PADDING);
        };

        /**
         * @param string message
         */
        _myTrait_.sha3_256 = function (message) {
          return this.keccak(message, 256, PADDING);
        };

        /**
         * @param string message
         */
        _myTrait_.sha3_512 = function (message) {
          return this.keccak(message, 512, PADDING);
        };
      })(this);
    };

    var _sha3 = function _sha3(a, b, c, d, e, f, g, h) {
      var m = this,
          res;
      if (m instanceof _sha3) {
        var args = [a, b, c, d, e, f, g, h];
        if (m.__factoryClass) {
          m.__factoryClass.forEach(function (initF) {
            res = initF.apply(m, args);
          });
          if (typeof res == 'function') {
            if (res._classInfo.name != _sha3._classInfo.name) return new res(a, b, c, d, e, f, g, h);
          } else {
            if (res) return res;
          }
        }
        if (m.__traitInit) {
          m.__traitInit.forEach(function (initF) {
            initF.apply(m, args);
          });
        } else {
          if (typeof m.init == 'function') m.init.apply(m, args);
        }
      } else return new _sha3(a, b, c, d, e, f, g, h);
    };
    // inheritance is here

    _sha3._classInfo = {
      name: '_sha3'
    };
    _sha3.prototype = new _sha3_prototype();

    (function () {
      if (typeof define !== 'undefined' && define !== null && define.amd != null) {
        __amdDefs__['_sha3'] = _sha3;
        this._sha3 = _sha3;
      } else if (typeof module !== 'undefined' && module !== null && module.exports != null) {
        module.exports['_sha3'] = _sha3;
      } else {
        this._sha3 = _sha3;
      }
    }).call(new Function('return this')());

    (function (_myTrait_) {

      // Initialize static variables here...

      if (_myTrait_.__traitInit && !_myTrait_.hasOwnProperty('__traitInit')) _myTrait_.__traitInit = _myTrait_.__traitInit.slice();
      if (!_myTrait_.__traitInit) _myTrait_.__traitInit = [];
      _myTrait_.__traitInit.push(function (options) {});
    })(this);
  };

  var authModule = function authModule(a, b, c, d, e, f, g, h) {
    var m = this,
        res;
    if (m instanceof authModule) {
      var args = [a, b, c, d, e, f, g, h];
      if (m.__factoryClass) {
        m.__factoryClass.forEach(function (initF) {
          res = initF.apply(m, args);
        });
        if (typeof res == 'function') {
          if (res._classInfo.name != authModule._classInfo.name) return new res(a, b, c, d, e, f, g, h);
        } else {
          if (res) return res;
        }
      }
      if (m.__traitInit) {
        m.__traitInit.forEach(function (initF) {
          initF.apply(m, args);
        });
      } else {
        if (typeof m.init == 'function') m.init.apply(m, args);
      }
    } else return new authModule(a, b, c, d, e, f, g, h);
  };
  // inheritance is here

  authModule._classInfo = {
    name: 'authModule'
  };
  authModule.prototype = new authModule_prototype();

  if (typeof define !== 'undefined' && define !== null && define.amd != null) {
    define(__amdDefs__);
  }
}).call(new Function('return this')());

// --- let's not ---