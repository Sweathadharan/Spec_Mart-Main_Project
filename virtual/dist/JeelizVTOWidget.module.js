/* eslint-disable */
let JEELIZVTO = null;
let JEELIZVTOWIDGET = null;
var $jscomp = $jscomp || {};
$jscomp.scope = {};
$jscomp.owns = function (qa, va) {
  return Object.prototype.hasOwnProperty.call(qa, va);
};
$jscomp.ASSUME_ES5 = !1;
$jscomp.ASSUME_NO_NATIVE_MAP = !1;
$jscomp.ASSUME_NO_NATIVE_SET = !1;
$jscomp.SIMPLE_FROUND_POLYFILL = !1;
$jscomp.ISOLATE_POLYFILLS = !1;
$jscomp.defineProperty =
  $jscomp.ASSUME_ES5 || 'function' == typeof Object.defineProperties
    ? Object.defineProperty
    : function (qa, va, Fa) {
        if (qa == Array.prototype || qa == Object.prototype) return qa;
        qa[va] = Fa.value;
        return qa;
      };
$jscomp.getGlobal = function (qa) {
  qa = [
    'object' == typeof globalThis && globalThis,
    qa,
    'object' == typeof window && window,
    'object' == typeof self && self,
    'object' == typeof global && global,
  ];
  for (var va = 0; va < qa.length; ++va) {
    var Fa = qa[va];
    if (Fa && Fa.Math == Math) return Fa;
  }
  throw Error('Cannot find global object');
};
$jscomp.global = $jscomp.getGlobal(this);
$jscomp.IS_SYMBOL_NATIVE =
  'function' === typeof Symbol && 'symbol' === typeof Symbol('x');
$jscomp.TRUST_ES6_POLYFILLS =
  !$jscomp.ISOLATE_POLYFILLS || $jscomp.IS_SYMBOL_NATIVE;
$jscomp.polyfills = {};
$jscomp.propertyToPolyfillSymbol = {};
$jscomp.POLYFILL_PREFIX = '$jscp$';
var $jscomp$lookupPolyfilledValue = function (qa, va) {
  var Fa = $jscomp.propertyToPolyfillSymbol[va];
  if (null == Fa) return qa[va];
  Fa = qa[Fa];
  return void 0 !== Fa ? Fa : qa[va];
};
$jscomp.polyfill = function (qa, va, Fa, Qa) {
  va &&
    ($jscomp.ISOLATE_POLYFILLS
      ? $jscomp.polyfillIsolated(qa, va, Fa, Qa)
      : $jscomp.polyfillUnisolated(qa, va, Fa, Qa));
};
$jscomp.polyfillUnisolated = function (qa, va, Fa, Qa) {
  Fa = $jscomp.global;
  qa = qa.split('.');
  for (Qa = 0; Qa < qa.length - 1; Qa++) {
    var Aa = qa[Qa];
    if (!(Aa in Fa)) return;
    Fa = Fa[Aa];
  }
  qa = qa[qa.length - 1];
  Qa = Fa[qa];
  va = va(Qa);
  va != Qa &&
    null != va &&
    $jscomp.defineProperty(Fa, qa, {
      configurable: !0,
      writable: !0,
      value: va,
    });
};
$jscomp.polyfillIsolated = function (qa, va, Fa, Qa) {
  var Aa = qa.split('.');
  qa = 1 === Aa.length;
  Qa = Aa[0];
  Qa = !qa && Qa in $jscomp.polyfills ? $jscomp.polyfills : $jscomp.global;
  for (var Ab = 0; Ab < Aa.length - 1; Ab++) {
    var pa = Aa[Ab];
    if (!(pa in Qa)) return;
    Qa = Qa[pa];
  }
  Aa = Aa[Aa.length - 1];
  Fa = $jscomp.IS_SYMBOL_NATIVE && 'es6' === Fa ? Qa[Aa] : null;
  va = va(Fa);
  null != va &&
    (qa
      ? $jscomp.defineProperty($jscomp.polyfills, Aa, {
          configurable: !0,
          writable: !0,
          value: va,
        })
      : va !== Fa &&
        (($jscomp.propertyToPolyfillSymbol[Aa] = $jscomp.IS_SYMBOL_NATIVE
          ? $jscomp.global.Symbol(Aa)
          : $jscomp.POLYFILL_PREFIX + Aa),
        (Aa = $jscomp.propertyToPolyfillSymbol[Aa]),
        $jscomp.defineProperty(Qa, Aa, {
          configurable: !0,
          writable: !0,
          value: va,
        })));
};
$jscomp.assign =
  $jscomp.TRUST_ES6_POLYFILLS && 'function' == typeof Object.assign
    ? Object.assign
    : function (qa, va) {
        for (var Fa = 1; Fa < arguments.length; Fa++) {
          var Qa = arguments[Fa];
          if (Qa) for (var Aa in Qa) $jscomp.owns(Qa, Aa) && (qa[Aa] = Qa[Aa]);
        }
        return qa;
      };
$jscomp.polyfill(
  'Object.assign',
  function (qa) {
    return qa || $jscomp.assign;
  },
  'es6',
  'es3'
);
$jscomp.arrayIteratorImpl = function (qa) {
  var va = 0;
  return function () {
    return va < qa.length ? { done: !1, value: qa[va++] } : { done: !0 };
  };
};
$jscomp.arrayIterator = function (qa) {
  return { next: $jscomp.arrayIteratorImpl(qa) };
};
$jscomp.makeIterator = function (qa) {
  var va =
    'undefined' != typeof Symbol && Symbol.iterator && qa[Symbol.iterator];
  return va ? va.call(qa) : $jscomp.arrayIterator(qa);
};
$jscomp.FORCE_POLYFILL_PROMISE = !1;
$jscomp.polyfill(
  'Promise',
  function (qa) {
    function va() {
      this.batch_ = null;
    }
    function Fa(pa) {
      return pa instanceof Aa
        ? pa
        : new Aa(function (Ga, Na) {
            Ga(pa);
          });
    }
    if (qa && !$jscomp.FORCE_POLYFILL_PROMISE) return qa;
    va.prototype.asyncExecute = function (pa) {
      if (null == this.batch_) {
        this.batch_ = [];
        var Ga = this;
        this.asyncExecuteFunction(function () {
          Ga.executeBatch_();
        });
      }
      this.batch_.push(pa);
    };
    var Qa = $jscomp.global.setTimeout;
    va.prototype.asyncExecuteFunction = function (pa) {
      Qa(pa, 0);
    };
    va.prototype.executeBatch_ = function () {
      for (; this.batch_ && this.batch_.length; ) {
        var pa = this.batch_;
        this.batch_ = [];
        for (var Ga = 0; Ga < pa.length; ++Ga) {
          var Na = pa[Ga];
          pa[Ga] = null;
          try {
            Na();
          } catch ($a) {
            this.asyncThrow_($a);
          }
        }
      }
      this.batch_ = null;
    };
    va.prototype.asyncThrow_ = function (pa) {
      this.asyncExecuteFunction(function () {
        throw pa;
      });
    };
    var Aa = function (pa) {
      this.state_ = 0;
      this.result_ = void 0;
      this.onSettledCallbacks_ = [];
      var Ga = this.createResolveAndReject_();
      try {
        pa(Ga.resolve, Ga.reject);
      } catch (Na) {
        Ga.reject(Na);
      }
    };
    Aa.prototype.createResolveAndReject_ = function () {
      function pa($a) {
        return function (jb) {
          Na || ((Na = !0), $a.call(Ga, jb));
        };
      }
      var Ga = this,
        Na = !1;
      return { resolve: pa(this.resolveTo_), reject: pa(this.reject_) };
    };
    Aa.prototype.resolveTo_ = function (pa) {
      if (pa === this)
        this.reject_(new TypeError('A Promise cannot resolve to itself'));
      else if (pa instanceof Aa) this.settleSameAsPromise_(pa);
      else {
        a: switch (typeof pa) {
          case 'object':
            var Ga = null != pa;
            break a;
          case 'function':
            Ga = !0;
            break a;
          default:
            Ga = !1;
        }
        Ga ? this.resolveToNonPromiseObj_(pa) : this.fulfill_(pa);
      }
    };
    Aa.prototype.resolveToNonPromiseObj_ = function (pa) {
      var Ga = void 0;
      try {
        Ga = pa.then;
      } catch (Na) {
        this.reject_(Na);
        return;
      }
      'function' == typeof Ga
        ? this.settleSameAsThenable_(Ga, pa)
        : this.fulfill_(pa);
    };
    Aa.prototype.reject_ = function (pa) {
      this.settle_(2, pa);
    };
    Aa.prototype.fulfill_ = function (pa) {
      this.settle_(1, pa);
    };
    Aa.prototype.settle_ = function (pa, Ga) {
      if (0 != this.state_)
        throw Error(
          'Cannot settle(' +
            pa +
            ', ' +
            Ga +
            '): Promise already settled in state' +
            this.state_
        );
      this.state_ = pa;
      this.result_ = Ga;
      this.executeOnSettledCallbacks_();
    };
    Aa.prototype.executeOnSettledCallbacks_ = function () {
      if (null != this.onSettledCallbacks_) {
        for (var pa = 0; pa < this.onSettledCallbacks_.length; ++pa)
          Ab.asyncExecute(this.onSettledCallbacks_[pa]);
        this.onSettledCallbacks_ = null;
      }
    };
    var Ab = new va();
    Aa.prototype.settleSameAsPromise_ = function (pa) {
      var Ga = this.createResolveAndReject_();
      pa.callWhenSettled_(Ga.resolve, Ga.reject);
    };
    Aa.prototype.settleSameAsThenable_ = function (pa, Ga) {
      var Na = this.createResolveAndReject_();
      try {
        pa.call(Ga, Na.resolve, Na.reject);
      } catch ($a) {
        Na.reject($a);
      }
    };
    Aa.prototype.then = function (pa, Ga) {
      function Na(ob, Bb) {
        return 'function' == typeof ob
          ? function (Qb) {
              try {
                $a(ob(Qb));
              } catch (Kb) {
                jb(Kb);
              }
            }
          : Bb;
      }
      var $a,
        jb,
        Rb = new Aa(function (ob, Bb) {
          $a = ob;
          jb = Bb;
        });
      this.callWhenSettled_(Na(pa, $a), Na(Ga, jb));
      return Rb;
    };
    Aa.prototype.catch = function (pa) {
      return this.then(void 0, pa);
    };
    Aa.prototype.callWhenSettled_ = function (pa, Ga) {
      function Na() {
        switch ($a.state_) {
          case 1:
            pa($a.result_);
            break;
          case 2:
            Ga($a.result_);
            break;
          default:
            throw Error('Unexpected state: ' + $a.state_);
        }
      }
      var $a = this;
      null == this.onSettledCallbacks_
        ? Ab.asyncExecute(Na)
        : this.onSettledCallbacks_.push(Na);
    };
    Aa.resolve = Fa;
    Aa.reject = function (pa) {
      return new Aa(function (Ga, Na) {
        Na(pa);
      });
    };
    Aa.race = function (pa) {
      return new Aa(function (Ga, Na) {
        for (
          var $a = $jscomp.makeIterator(pa), jb = $a.next();
          !jb.done;
          jb = $a.next()
        )
          Fa(jb.value).callWhenSettled_(Ga, Na);
      });
    };
    Aa.all = function (pa) {
      var Ga = $jscomp.makeIterator(pa),
        Na = Ga.next();
      return Na.done
        ? Fa([])
        : new Aa(function ($a, jb) {
            function Rb(Qb) {
              return function (Kb) {
                ob[Qb] = Kb;
                Bb--;
                0 == Bb && $a(ob);
              };
            }
            var ob = [],
              Bb = 0;
            do
              ob.push(void 0),
                Bb++,
                Fa(Na.value).callWhenSettled_(Rb(ob.length - 1), jb),
                (Na = Ga.next());
            while (!Na.done);
          });
    };
    return Aa;
  },
  'es6',
  'es3'
);
$jscomp.polyfill(
  'Math.log2',
  function (qa) {
    return qa
      ? qa
      : function (va) {
          return Math.log(va) / Math.LN2;
        };
  },
  'es6',
  'es3'
);
$jscomp.polyfill(
  'Promise.prototype.finally',
  function (qa) {
    return qa
      ? qa
      : function (va) {
          return this.then(
            function (Fa) {
              return Promise.resolve(va()).then(function () {
                return Fa;
              });
            },
            function (Fa) {
              return Promise.resolve(va()).then(function () {
                throw Fa;
              });
            }
          );
        };
  },
  'es9',
  'es3'
);
$jscomp.polyfill(
  'Math.sign',
  function (qa) {
    return qa
      ? qa
      : function (va) {
          va = Number(va);
          return 0 === va || isNaN(va) ? va : 0 < va ? 1 : -1;
        };
  },
  'es6',
  'es3'
);
var JeelizVTOWidget = (function () {
  function qa() {
    Oa.mode = kb.realtime;
    Oa.isRT = !0;
    xa.adjust = document.getElementById('JeelizVTOWidgetAdjust');
    if (xa.adjust) {
      xa.adjustNotice = document.getElementById('JeelizVTOWidgetAdjustNotice');
      xa.adjustExit = document.getElementById('JeelizVTOWidgetAdjustExit');
      xa.changeModelContainer = document.getElementById(
        'JeelizVTOWidgetChangeModelContainer'
      );
      xa.buttonResizeCanvas = document.getElementById('buttonResizeCanvas');
      var W = xa.adjust;
      W && W.addEventListener('click', Rb, !1);
      (W = xa.adjustExit) && W.addEventListener('click', ob, !1);
      [xa.adjust, xa.changeModelContainer, xa.buttonResizeCanvas].forEach(Fa);
    }
    Sb.enabled && Sa.do_instantDetection(Sb.interval, Sb.callback);
    Yb && (Yb(!0), (Yb = null));
  }
  function va() {
    var W = document.createElement('style');
    W.setAttribute('type', 'text/css');
    W.innerHTML =
      '._jeelizVTOForceHide { display: none!important }._jeelizVTOForceShow { display: revert!important }';
    var Da = document.getElementsByTagName('head');
    1 <= Da.length ? Da[0].appendChild(W) : document.body.appendChild(W);
  }
  function Fa(W) {
    W &&
      (W.classList.remove('_jeelizVTOForceHide'),
      'none' === window.getComputedStyle(W).display &&
        W.classList.add('_jeelizVTOForceShow'));
  }
  function Qa(W) {
    W &&
      (W.classList.add('_jeelizVTOForceHide'),
      W.classList.remove('_jeelizVTOForceShow'));
  }
  function Aa(W, Da) {
    if (W) for (var Ka in Da) W.style[Ka] = Da[Ka];
  }
  function Ab(W) {
    if (W) return W.clientWidth;
  }
  function pa(W) {
    if (W) return W.clientHeight;
  }
  function Ga(W) {
    return new Promise(function (Da, Ka) {
      var La = new XMLHttpRequest();
      La.open('GET', W, !0);
      La.onreadystatechange = function () {
        if (4 === La.readyState)
          if (200 === La.status || 0 === La.status)
            try {
              var Wa = JSON.parse(La.responseText);
              Da(Wa);
            } catch (Ua) {
              Ka('INVALID JSON');
            }
          else Ka('HTTP ERROR ' + La.status);
      };
      La.send();
    });
  }
  function Na() {
    $a('INVALID_SKU');
  }
  function $a(W) {
    sc.error ? sc.error(W) : console.log('ERROR:', W);
  }
  function jb() {
    var W = Ab(xa.container),
      Da = pa(xa.container),
      Ka = Math.abs(fb.displayHeight - Da);
    1 >= Math.abs(fb.displayWidth - W) && 1 >= Ka
      ? console.log(
          'INFO in JeelizVTOWidget.resize: resolution difference too small abord resize'
        )
      : ((fb.displayWidth = W),
        (fb.displayHeight = Da),
        console.log(
          'INFO in JeelizVTOWidget.resize: width = ' +
            fb.displayWidth.toString() +
            ' height = ' +
            fb.displayHeight.toString() +
            ' oFactor = ' +
            (1).toString()
        ),
        (fb.cvWidth = Math.round(1 * fb.displayWidth)),
        (fb.cvHeight = Math.round(1 * fb.displayHeight)),
        Aa(xa.cv, {
          width: fb.displayWidth.toString() + 'px',
          height: fb.displayHeight.toString() + 'px',
        }),
        (xa.cv.width = fb.cvWidth),
        (xa.cv.height = fb.cvHeight),
        Sa &&
          (Oa.mode === kb.notLoaded
            ? Sa.set_size(fb.cvWidth, fb.cvHeight, !1)
            : Sa.resize(fb.cvWidth, fb.cvHeight, !1)));
  }
  function Rb() {
    [xa.adjust, xa.changeModelContainer, xa.buttonResizeCanvas].forEach(Qa);
    Oa.mode = kb.adjust;
    [xa.adjustNotice, xa.adjustExit].forEach(Fa);
    xa.cv.style.cursor = 'move';
    Sa.switch_modeInteractor('movePinch');
    Kb('ADJUST_START');
  }
  function ob() {
    [xa.adjustNotice, xa.adjustExit].forEach(Qa);
    [xa.adjust, xa.changeModelContainer, xa.buttonResizeCanvas].forEach(Fa);
    xa.cv.style.cursor = 'auto';
    Oa.mode = Oa.realtime;
    Sa.switch_modeInteractor('idle');
    Kb('ADJUST_END');
  }
  function Bb() {
    if (!xa.trackIframe) {
      var W = gc.appstaticURL + 'jeewidget/';
      xa.trackIframe = document.createElement('iframe');
      xa.trackIframe.width = '10';
      xa.trackIframe.height = '10';
      xa.trackIframe.src = W + 'trackIframe.html';
      Aa(xa.trackIframe, {
        position: 'absolute',
        zIndex: -1,
        bottom: '0px',
        right: '0px',
      });
      xa.container.appendChild(xa.trackIframe);
    }
  }
  function Qb(W, Da, Ka, La) {
    Sa.load_model(
      Da.mod + '.json',
      Da.mats,
      function () {
        Oa.mode = kb.realtime;
        Ka && Ka();
        ub.toggle_loading(!1);
        if (xa.trackIframe) {
          var Wa = location.href.split('?').shift().split('://').pop();
          Wa = Wa.split('/').shift();
          Wa = Wa.split('www.').pop();
          try {
            xa.trackIframe.contentWindow.postMessage(
              { action: 'COUNTTRYONSESSION', domain: Wa, sku: W },
              '*'
            );
          } catch (Ua) {}
        }
      },
      W,
      La
    );
  }
  function Kb(W) {
    (W = Bc[W]) && W();
  }
  var Sa = (function () {
    function W(a, b) {
      return a[0] * (1 - b) + a[1] * b;
    }
    function Da(a, b) {
      var d = new XMLHttpRequest();
      d.open('GET', a, !0);
      d.withCredentials = !1;
      d.onreadystatechange = function () {
        4 !== d.readyState ||
          (200 !== d.status && 0 !== d.status) ||
          b(d.responseText);
      };
      d.send();
    }
    function Ka(a, b) {
      if (0 === b || 'object' !== typeof a) return a;
      a = Object.assign({}, a);
      b = void 0 === b || -1 === b ? -1 : b - 1;
      for (var d in a) a[d] = Ka(a[d], b);
      return a;
    }
    function La(a) {
      return 0.5 > a ? 4 * a * a * a : (a - 1) * (2 * a - 2) * (2 * a - 2) + 1;
    }
    function Wa(a) {
      switch (a) {
        case 'relu':
          return 'gl_FragColor=max(vec4(0.,0.,0.,0.),gl_FragColor);';
        case 'elu':
          return 'gl_FragColor=mix(exp(-abs(gl_FragColor))-vec4(1.,1.,1.,1.),gl_FragColor,step(0.,gl_FragColor));';
        case 'elu01':
          return 'gl_FragColor=mix(0.1*exp(-abs(gl_FragColor))-vec4(0.1,0.1,0.1,0.1),gl_FragColor,step(0.,gl_FragColor));';
        case 'arctan':
          return 'gl_FragColor=atan(3.14159265359*texture2D(u0,vUV))/3.14159265359;';
        case 'copy':
          return '';
        default:
          return !1;
      }
    }
    function Ua(a, b) {
      var d = b % 8;
      return (a[(b - d) / 8] >> (7 - d)) & 1;
    }
    function Lb(a, b, d) {
      var e = 1,
        q = 0;
      for (d = b + d - 1; d >= b; --d) (q += e * Ua(a, d)), (e *= 2);
      return q;
    }
    function Ja(a) {
      a = a.data;
      a =
        'undefined' === typeof btoa
          ? Buffer.from(a, 'base64').toString('latin1')
          : atob(a);
      for (var b = a.length, d = new Uint8Array(b), e = 0; e < b; ++e)
        d[e] = a.charCodeAt(e);
      return d;
    }
    function bb(a) {
      return 'string' === typeof a ? JSON.parse(a) : a;
    }
    function qb(a) {
      return 'undefined' === typeof bb(a).nb ? rb(a) : vb(a);
    }
    function vb(a) {
      var b = bb(a);
      a = b.nb;
      if (0 === a) return new Uint8Array(b.nb);
      var d = b.n;
      b = Ja(b);
      for (var e = new Uint32Array(d), q = 0; q < d; ++q)
        e[q] = Lb(b, q * a, a);
      return e;
    }
    function rb(a) {
      var b = bb(a);
      a = b.ne;
      var d = b.nf,
        e = b.n;
      b = Ja(b);
      for (
        var q = new Float32Array(e),
          l = new Float32Array(d),
          v = a + d + 1,
          n = 0;
        n < e;
        ++n
      ) {
        var t = v * n,
          r = 0 === Ua(b, t) ? 1 : -1,
          w = Lb(b, t + 1, a);
        t = t + 1 + a;
        for (var D = l.length, z = 0, H = t; H < t + D; ++H)
          (l[z] = Ua(b, H)), ++z;
        for (D = t = 0; D < d; ++D) t += l[D] * Math.pow(2, -D - 1);
        q[n] =
          0 === t && 0 === w
            ? 0
            : r * (1 + t) * Math.pow(2, 1 + w - Math.pow(2, a - 1));
      }
      return q;
    }
    function hc(a) {
      var b = null,
        d = null,
        e = null,
        q = 0,
        l = this;
      this.m = function (v) {
        this.Rn(v.Hd);
        e.Sk({ Zf: v.Zf, Fi: v.Fi || !1, Vf: v.Vf });
      };
      this.Ll = function (v) {
        return b[v];
      };
      this.Rn = function (v) {
        var n = null;
        q = v.length;
        b = v.map(function (t, r) {
          t = Object.assign({}, t, {
            index: r,
            parent: l,
            Td: n,
            um: r === q - 1,
          });
          return (n = 0 === r ? Uc.instance(t) : Vc.instance(t));
        });
        d = b[0];
        e = b[q - 1];
        b.forEach(function (t, r) {
          0 !== r && t.dn();
        });
      };
      this.wa = function (v) {
        v.g(0);
        var n = v;
        b.forEach(function (t) {
          n = t.wa(n, !1);
        });
        return n;
      };
      this.Nh = function () {
        return d.Kl();
      };
      this.Dc = function () {
        return e.Ol();
      };
      this.Jh = function () {
        return e.Jh();
      };
      this.v = function () {
        b &&
          (b.forEach(function (v) {
            v.v();
          }),
          (e = d = b = null),
          (q = 0));
      };
      'undefined' !== typeof a && this.m(a);
    }
    function Cb(a, b) {
      a[b] = !0;
      a.setAttribute(b, 'true');
    }
    function Tb() {
      return /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
    }
    function Zb() {
      var a = navigator.appVersion.match(/OS (\d+)_(\d+)_?(\d+)?/);
      return a && a.length && 2 < a.length
        ? [parseInt(a[1], 10), parseInt(a[2], 10), parseInt(a[3] || 0, 10)]
        : [0, 0, 0];
    }
    function $b() {
      var a = navigator.userAgent.toLowerCase();
      return -1 !== a.indexOf('safari') && -1 === a.indexOf('chrome') ? !0 : !1;
    }
    function ac(a) {
      if (!a) return a;
      var b = null;
      if (a.video) {
        var d = function (e) {
          return e && 'object' === typeof e ? Object.assign({}, e) : e;
        };
        b = {};
        'undefined' !== typeof a.video.width && (b.width = d(a.video.width));
        'undefined' !== typeof a.video.height && (b.height = d(a.video.height));
        'undefined' !== typeof a.video.facingMode &&
          (b.facingMode = d(a.video.facingMode));
      }
      b = { audio: a.audio, video: b };
      'undefined' !== typeof a.deviceId && bc(b, a.deviceId);
      return b;
    }
    function bc(a, b) {
      b &&
        ((a.video = a.video || {}),
        (a.video.deviceId = { exact: b }),
        a.video.facingMode && delete a.video.facingMode);
    }
    function ic(a) {
      var b = a.video.width;
      a.video.width = a.video.height;
      a.video.height = b;
      return a;
    }
    function jc(a) {
      function b(z) {
        return [
          480, 576, 640, 648, 720, 768, 800, 960, 1080, 1152, 1280, 1366, 1920,
        ].sort(function (H, x) {
          return Math.abs(H - z) - Math.abs(x - z);
        });
      }
      function d(z) {
        var H = ac(a);
        z = z(H);
        q.push(z);
        e(z);
      }
      function e(z) {
        if (z.video && z.video.facingMode && z.video.facingMode.exact) {
          var H = z.video.facingMode.exact;
          z = ac(z);
          delete z.video.facingMode.exact;
          z.video.facingMode.ideal = H;
          q.push(z);
        }
      }
      var q = [];
      if (!a || !a.video) return q;
      e(a);
      if (a.video.width && a.video.height) {
        if (a.video.width.ideal && a.video.height.ideal) {
          var l = b(a.video.width.ideal).slice(0, 3),
            v = b(a.video.height.ideal).slice(0, 3),
            n = {},
            t = 0;
          for (n.jb = void 0; t < l.length; n = { jb: n.jb }, ++t) {
            n.jb = l[t];
            var r = {},
              w = 0;
            for (r.ib = void 0; w < v.length; r = { ib: r.ib }, ++w)
              if (
                ((r.ib = v[w]),
                n.jb !== a.video.width.ideal || r.ib !== a.video.height.ideal)
              ) {
                var D = Math.max(n.jb, r.ib) / Math.min(n.jb, r.ib);
                D < 4 / 3 - 0.1 ||
                  D > 16 / 9 + 0.1 ||
                  d(
                    (function (z, H) {
                      return function (x) {
                        x.video.width.ideal = z.jb;
                        x.video.height.ideal = H.ib;
                        return x;
                      };
                    })(n, r)
                  );
              }
          }
        }
        d(function (z) {
          return ic(z);
        });
      }
      a.video.width &&
        a.video.height &&
        (a.video.width.ideal &&
          a.video.height.ideal &&
          d(function (z) {
            delete z.video.width.ideal;
            delete z.video.height.ideal;
            return z;
          }),
        d(function (z) {
          delete z.video.width;
          delete z.video.height;
          return z;
        }));
      a.video.facingMode &&
        (d(function (z) {
          delete z.video.facingMode;
          return z;
        }),
        a.video.width &&
          a.video.height &&
          d(function (z) {
            ic(z);
            delete z.video.facingMode;
            return z;
          }));
      q.push({ audio: a.audio, video: !0 });
      return q;
    }
    function cc(a) {
      try {
        var b = window.matchMedia('(orientation: portrait)').matches ? !0 : !1;
      } catch (e) {
        b = window.innerHeight > window.innerWidth;
      }
      if (b && a && a.video) {
        b = a.video.width;
        var d = a.video.height;
        b &&
          d &&
          b.ideal &&
          d.ideal &&
          b.ideal > d.ideal &&
          ((a.video.height = b), (a.video.width = d));
      }
    }
    function Mb(a) {
      a.volume = 0;
      Cb(a, 'muted');
      if ($b()) {
        if (1 === a.volume) {
          var b = function () {
            a.volume = 0;
            window.removeEventListener('mousemove', b, !1);
            window.removeEventListener('touchstart', b, !1);
          };
          window.addEventListener('mousemove', b, !1);
          window.addEventListener('touchstart', b, !1);
        }
        setTimeout(function () {
          a.volume = 0;
          Cb(a, 'muted');
        }, 5);
      }
    }
    function kc(a) {
      var b = Ca.element,
        d = Ca.kh;
      return null === b
        ? Promise.resolve()
        : new Promise(function (e, q) {
            if (b.srcObject && b.srcObject.getVideoTracks) {
              var l = b.srcObject.getVideoTracks();
              1 !== l.length
                ? q('INVALID_TRACKNUMBER')
                : ((l = l[0]), a ? Cc(b, e, q, d) : (l.stop(), e()));
            } else q('BAD_IMPLEMENTATION');
          });
    }
    function Dc(a, b, d, e) {
      function q(v) {
        l || ((l = !0), d(v));
      }
      var l = !1;
      navigator.mediaDevices
        .getUserMedia(e)
        .then(function (v) {
          function n() {
            setTimeout(function () {
              if (a.currentTime) {
                var r = a.videoHeight;
                if (0 === a.videoWidth || 0 === r) q('VIDEO_NULLSIZE');
                else {
                  var w = { Nk: null, wg: null, Pm: null };
                  try {
                    var D = v.getVideoTracks()[0];
                    D &&
                      ((w.Pm = D),
                      (w.Nk = D.getCapabilities()),
                      (w.wg = D.getSettings()));
                  } catch (z) {}
                  $b() || Tb()
                    ? a.parentNode && null !== a.parentNode
                      ? (l || b(a, v, w),
                        setTimeout(function () {
                          a.play();
                        }, 100))
                      : (document.body.appendChild(a),
                        Mb(a),
                        setTimeout(function () {
                          a.style.transform = 'scale(0.0001,0.0001)';
                          a.style.position = 'fixed';
                          a.style.bottom = '0px';
                          a.style.right = '0px';
                          Mb(a);
                          setTimeout(function () {
                            a.play();
                            l || b(a, v, w);
                          }, 100);
                        }, 80))
                    : l || b(a, v, w);
                }
              } else q('VIDEO_NOTSTARTED');
            }, 700);
          }
          function t() {
            a.removeEventListener('loadeddata', t, !1);
            var r = a.play();
            Mb(a);
            'undefined' === typeof r
              ? n()
              : r
                  .then(function () {
                    n();
                  })
                  .catch(function () {
                    q('VIDEO_PLAYPROMISEREJECTED');
                  });
          }
          'undefined' !== typeof a.srcObject
            ? (a.srcObject = v)
            : ((a.src = window.URL.createObjectURL(v)), (a.videoStream = v));
          Mb(a);
          a.addEventListener('loadeddata', t, !1);
        })
        .catch(function (v) {
          q(v);
        });
    }
    function Cc(a, b, d, e) {
      if (a)
        if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
          if (e && e.video && Tb()) {
            var q = Zb();
            0 !== q[0] && (12 > q[0] || (12 === q[0] && 2 > q[1])) && cc(e);
          }
          Cb(a, 'autoplay');
          Cb(a, 'playsinline');
          e && e.audio ? (a.volume = 0) : Cb(a, 'muted');
          Dc(
            a,
            b,
            function () {
              function l(n) {
                if (0 === n.length) d('INVALID_FALLBACKCONSTRAINTS');
                else {
                  var t = n.shift();
                  Dc(
                    a,
                    b,
                    function () {
                      l(n);
                    },
                    t
                  );
                }
              }
              var v = jc(e);
              l(v);
            },
            e
          );
        } else d && d('MEDIASTREAMAPI_NOTFOUND');
      else d && d('VIDEO_NOTPROVIDED');
    }
    function Wc(a) {
      navigator.mediaDevices && navigator.mediaDevices.enumerateDevices
        ? navigator.mediaDevices
            .enumerateDevices()
            .then(function (b) {
              (b = b.filter(function (d) {
                return (
                  d.kind &&
                  -1 !== d.kind.toLowerCase().indexOf('video') &&
                  d.label &&
                  d.deviceId
                );
              })) &&
              b.length &&
              0 < b.length
                ? a(b, !1)
                : a(!1, 'NODEVICESFOUND');
            })
            .catch(function () {
              a(!1, 'PROMISEREJECTED');
            })
        : a(!1, 'NOTSUPPORTED');
    }
    function Xc() {
      function a(J) {
        J = J ? lc.Xe : 1;
        B.width = J * M.width;
        B.height = J * M.height;
        return B;
      }
      function b(J) {
        for (var T = '', fa = J.length - 1; 0 <= fa; --fa) {
          var ua = J[fa],
            Ha = 'http' === ua.substring(0, 4).toLowerCase();
          T = ua + T;
          if (Ha) break;
        }
        return T;
      }
      function d() {
        ++ra;
        2 === ra &&
          (z(),
          A(!0),
          L(),
          ya.vj(),
          l(),
          S.Yc.forEach(function (J) {
            J();
          }),
          S.Yc.splice(0),
          U.model && !S.isBusy && ya.vi(U.model));
      }
      function e(J, T, fa) {
        return new Promise(function (ua) {
          wa.uj(T);
          Ba.ca();
          Ia.isEnabled = !0;
          oa.isEnabled = !1;
          Ia.Ja || (Ia.Ja = dc.instance({}));
          J.Oh() && (Ia.Ja.jj(J.Oh()), wa.sa(Ia.Ja));
          J.set();
          oa.isEnabled = !1;
          v();
          var Ha = gb.Lh(fa);
          setTimeout(function () {
            Ia.isEnabled = !1;
            wa.uj(!1);
            ua(Ha);
          }, 1);
        });
      }
      function q(J, T) {
        return new Promise(function (fa) {
          oa.Yb = J;
          oa.isEnabled = !0;
          oa.J = function () {
            var ua = Ec.instance(T());
            oa.J = null;
            fa(ua);
          };
        });
      }
      function l() {
        S.load_model = function (J, T, fa, ua, Ha, lb) {
          if (S.isBusy) return !1;
          S.isBusy = !0;
          if (U.model)
            S.set_model(
              J,
              function () {
                var Ra = T;
                if (Ha) {
                  Ra = T.slice(0);
                  var ib = cb.Pl().map(function (Yc) {
                      return Yc.toLowerCase();
                    }),
                    Db;
                  for (Db in Ha) {
                    var Fc = ib.indexOf(Db.toLowerCase());
                    -1 !== Fc && (Ra[Fc] = Ha[Db]);
                  }
                }
                S.set_materials(Ra, function () {
                  S.isBusy = !1;
                  fa && fa();
                });
              },
              function () {
                S.isBusy = !1;
                lb && lb();
              }
            );
          else {
            var hb = b([M.ba, M.ua, M.Md + '/']);
            ua = T.map(function (Ra) {
              return hb + Ra;
            });
            U.model = {
              url: b([M.ba, M.ua, M.Nd + '/' + J]),
              Mc: ua,
              Eb: !1,
              Db: !1,
            };
            ya.vi(U.model, function () {
              S.isBusy = !1;
              fa && fa();
            });
          }
          return !0;
        };
        S.set_offset = function (J) {
          ha = J;
          ya.ie();
        };
        S.set_scale = function (J) {
          ka = J;
          ya.je();
        };
        S.set_rx = function (J) {
          O = J;
          ya.Hj();
        };
        S.switch_shadow = wa.Bg;
        S.switch_bgBlur = wa.Ag;
        S.set_zoom = wa.ng;
        S.is_viewer3D = function () {
          return ia === Z.Ea;
        };
        S.switch_viewer3D = function (J, T) {
          if (
            ia === Z.kc ||
            ia === Z.lc ||
            (ia === Z.V && !J) ||
            (ia === Z.Ea && J) ||
            oa.isEnabled
          )
            return !1;
          if (ia === Z.ta)
            return ma !== Z.Ea || J
              ? ma === Z.V && J
                ? ((ma = Z.Ea), wa.sa(V.zb), wa.Za(1), T && T(), !0)
                : !1
              : ((ma = Z.V), wa.sa(V.gb), wa.Za(0), T && T(), !0);
          var fa = 0,
            ua = -1,
            Ha = 0;
          ia === Z.V
            ? ((ia = Z.kc), (ua = M.No))
            : ia === Z.Ea && ((ia = Z.lc), (ua = M.Qo));
          var lb = tc.bf();
          X = setInterval(function () {
            var hb = tc.bf();
            fa += (hb - lb) / ua;
            1 <= fa &&
              ((fa = 1),
              ia === Z.kc
                ? ((ia = Z.Ea), wa.sa(V.zb))
                : ((ia = Z.V), wa.sa(V.gb)),
              T && T(),
              clearInterval(X),
              (X = null));
            var Ra = ia === Z.lc || ia === Z.V ? 1 - M.Lo(fa) : M.Ko(fa);
            wa.Za(Ra);
            (ia !== Z.lc && ia !== Z.kc) ||
              0 !== Ha++ % 2 ||
              (wa.sa(V.Pf), V.Pf.Yn(Ra));
            lb = hb;
          }, 0.016);
          return !0;
        };
        S.capture_image = function (J, T, fa, ua) {
          oa.Yb = J;
          oa.isEnabled = !0;
          'undefined' === typeof isAllocate && (fa = !1);
          (ua = 'undefined' === typeof ua ? !1 : ua) && wa.ce(!1);
          D();
          oa.J = function () {
            wa.Si(0);
            c.flush();
            var Ha = gb.Lh(fa);
            T(Ha);
            ua && wa.ce(!0);
          };
        };
        S.capture_detection = function (J, T) {
          var fa = null === N.Ab ? N.fb : N.Vc;
          q(J, function () {
            return {
              Ac: y.nc.clone(),
              Qf: cb.Rh(),
              Mf: cb.Ph(),
              background: fa.clone(),
              Ja: za.Na.Sh().clone(),
              Lf: aa,
            };
          }).then(T);
        };
        S.process_image = function (J) {
          function T() {
            return new Promise(function (hb, Ra) {
              oa.Lg = Ha.updateLightInterval;
              q(Ha.nSteps, function () {
                return {
                  Ac: y.nc.clone(),
                  Qf: !1,
                  Mf: !1,
                  background: M.hq ? !1 : N.fb.clone(!0),
                  Ja: za.Na.Sh().clone(),
                };
              }).then(function (ib) {
                oa.Lg = 3;
                ib
                  ? 1 >= ib.ac().Ac.data[0]
                    ? Ra('FACE_NOT_FOUND')
                    : e(ib, Ha.isMask, !0).then(function (Db) {
                        hb(Db);
                      })
                  : Ra('CRITICAL');
              });
              v();
            });
          }
          function fa() {
            return new Promise(function (hb, Ra) {
              fetch_modelBySKU(Ha.modelSKU, Ha.glassesDBURL)
                .then(function (ib) {
                  S.load_model(
                    ib.Xp,
                    ib.Wp,
                    function () {
                      hb();
                    },
                    Ha.modelSKU,
                    null,
                    function () {
                      Ra('CANNOT_LOAD_MODEL');
                    }
                  );
                })
                .catch(function (ib) {
                  Ra(ib);
                });
            });
          }
          function ua() {
            return new Promise(function (hb) {
              var Ra = new Image();
              Ra.onload = function () {
                var ib = Ra.width,
                  Db = Ra.height;
                if (ib !== M.width || Db !== M.height)
                  Ca.Ed && ((Ca.element.width = ib), (Ca.element.height = Db)),
                    k(ib, Db, Ha.overSamplingFactor);
                Ca.yh.drawImage(Ra, 0, 0);
                D();
                hb();
              };
              Ra.src = Ha.imageBase64;
            });
          }
          var Ha = Object.assign(
            {
              imageBase64: null,
              FOVHztDeg: 0,
              nSteps: 50,
              updateLightInterval: 3,
              overSamplingFactor: 2,
              modelSKU: 'undef',
              glassesDBURL: 'https://glassesdbcached.jeeliz.com/sku/',
              isMask: !0,
            },
            J
          );
          if (M.Fd) throw Error('This feature cannot be called');
          var lb = Xa.FOVforced;
          Ha.FOVHztDeg && (Xa.FOVforced = Ha.FOVHztDeg);
          return new Promise(function (hb, Ra) {
            return fa()
              .then(ua)
              .then(function () {
                T()
                  .then(function (ib) {
                    Xa.FOVforced = lb;
                    hb(ib);
                  })
                  .catch(Ra);
              })
              .catch(Ra)
              .catch(Ra);
          });
        };
        S.process_offlineRendering = function (J, T, fa, ua, Ha) {
          ya.zn();
          ua &&
            (S.Sj.drawImage(gb.qb(), 0, 0),
            gb.qb().parentNode.insertBefore(S.Bb, gb.qb()),
            S.Bb.setAttribute('class', 'jeefitMask'));
          S.set_model(T, function () {
            S.set_materials(fa, function () {
              setTimeout(function () {
                e(J, ua).then(Ha);
                ya.wn(
                  ua
                    ? function () {
                        gb.qb().parentNode.removeChild(S.Bb);
                      }
                    : !1
                );
              }, 1);
            });
          });
        };
        S.serialize_detection = function (J) {
          return J.ac();
        };
        S.unserialize_detection = function (J, T, fa) {
          return Ec.Uc(J, T, fa);
        };
        S.do_instantDetection = function (J, T) {
          Gc.m(y.nc);
          Gc.start(J, T);
        };
        S.relieve_DOM = function (J, T) {
          if (m.Sb) return !1;
          t(T || 160);
          sa = !1;
          Q && clearTimeout(Q);
          Q = setTimeout(function () {
            t(M.ya);
            Q = !1;
            w();
          }, J);
          return !0;
        };
        S.switch_slow = function (J, T) {
          if (m.Sb) return !1;
          'undefined' === typeof T && (T = M.Zj);
          Q && (t(M.ya), w(), clearTimeout(Q), (Q = !1));
          J ? (sa = !1) : w();
          t(J ? T : M.ya);
          return !0;
        };
        S.switch_deepSleep = function (J) {
          if (na === J) return !1;
          na = !1;
          S.switch_sleep(J);
          na = J;
          return !0;
        };
        S.switch_sleep = function (J, T) {
          function fa() {
            S.isBusy = !1;
            J ? ((ma = ia), (ia = Z.ta)) : ((ia = ma), v());
          }
          if (m.Sb || na || S.isBusy) return T ? Promise.reject() : null;
          if ((J && ia === Z.ta) || (!J && ia !== Z.ta))
            return T ? Promise.resolve(!1) : !1;
          X && (clearInterval(X), (X = null));
          ia === Z.lc
            ? ((ia = Z.V), wa.sa(V.gb), wa.Za(0))
            : ia === Z.kc && ((ia = Z.Ea), wa.sa(V.zb), wa.Za(1));
          wb.stop();
          var ua = null;
          S.isBusy = !0;
          T ? (ua = kc(!J).then(fa)) : fa();
          return T ? ua : !0;
        };
        S.set_modelStandalone = function (J, T) {
          wa.de(!1);
          uc.instance({
            url: J.model,
            Mc: J.materials,
            Eb: !1,
            Db: !1,
            J: function (fa) {
              xb = [0, 0, 0];
              Eb = 1;
              Fb = h = p = 0;
              Ma = M.Kc;
              S.ready && ya.ke();
              T && T();
              n(fa);
              ya.yg();
              wa.de(!0);
            },
          });
        };
        S.start_rendering = ya.yg;
        S.update_material = function (J, T) {
          cb && cb.yo(J, T);
        };
        S.set_model = function (J, T, fa) {
          cb &&
            ((J = b([M.ba, M.ua, M.Nd + '/', J])),
            cb.replace(
              J,
              function () {
                T && T(cb.Rk());
              },
              fa
            ));
        };
        S.set_tweaker = function (J, T) {
          function fa(ua) {
            S.Zg(ua);
            T && T();
          }
          'string' === typeof J ? Da(M.ba + M.ua + M.ro + '/' + J, fa) : fa(J);
        };
        S.Zg = function (J) {
          J &&
            (J.preOffset && (xb = J.preOffset),
            J.preScale && (Eb = J.preScale),
            J.rx && (p = J.rx),
            J.beginBendZ && (h = J.beginBendZ),
            J.bendStrength && (Fb = J.bendStrength),
            J.maskBranchStartEnd && (Ma = J.maskBranchStartEnd),
            S.ready && ya.ke());
        };
        S.set_materials = function (J, T) {
          if (cb) {
            var fa = b([M.ba, M.ua, M.Md + '/']);
            J = J.map(function (ua) {
              var Ha = ua;
              'string' === typeof ua &&
                ((Ha = fa + ua), (Ha = Ha.replace(/([^:])\/\//, '$1/')));
              return Ha;
            });
            cb.og(J, T);
          }
        };
      }
      function v() {
        Gb.reset();
        wb.stop();
        Ba.ca();
        r(0);
      }
      function n(J) {
        cb && (wa.qn(cb), cb.remove());
        wa.Vj(J);
        cb = J;
      }
      function t(J) {
        R = J;
        wb.update({ ya: R });
      }
      function r(J) {
        la = -1;
        oa.isEnabled
          ? (la = oa.Yb)
          : Ia.isEnabled
          ? (la = Ia.Yb)
          : sa
          ? (D(), (la = ia === Z.V ? Gb.T() : 1))
          : ((la = M.Wc[0]), D());
        Ba.ca();
        if (!Ia.isEnabled)
          for (var T = 0; T < la; ++T)
            ba.set('s60'),
              N.vf.O(),
              N.fb.g(0),
              y.Nc.g(1),
              Y.l(!1, !1),
              ea.wa(N.vf),
              oa.isEnabled && 0 === (T + 1) % oa.Lg && f();
        oa.isEnabled
          ? (oa.J && oa.J(),
            (oa.isEnabled = !1),
            c.flush(),
            ia !== Z.ta && wb.hg(r))
          : (wa.animate(J),
            N.dg &&
              P - V.si > V.wj &&
              M.Wb &&
              ia === Z.V &&
              (Ba.ca(), f(), Ba.aa()),
            Ia.isEnabled ||
              (sa &&
                (Gb.Aj(),
                (T = Gb.Kh(1)),
                (Pa = W(M.Xj, T)),
                M.Wb &&
                  ia === Z.V &&
                  ((V.wj = W(M.ui, T)),
                  (V.be = W(M.Im, T)),
                  (V.be = Math.min(V.be, 0.5)))),
              (P = J),
              ia !== Z.ta && wb.hg(r)));
      }
      function w() {
        P = tc.bf();
        sa = !0;
      }
      function D() {
        var J = 15;
        if (!Ca.Ed) {
          var T = Ca.element.currentTime;
          J = T - ta;
          0 > J && (ta = T);
          if (1e3 * J < M.Fo) return;
        }
        Ca.ka.refresh();
        ta += J;
        Ca.od = J;
        K = !0;
        Ba.ca();
        ba.set('s0');
        y.eg.O();
        y.Nc.Bk(0);
        Y.l(!0, !0);
        ba.set('s58');
        N.fb.O();
        Ca.ka.g(0);
        Y.l(!1, !1);
        null !== N.Ab &&
          (ba.set('s59'), N.Vc.o(), N.fb.g(0), N.Ab.g(1), Y.l(!1, !1));
      }
      function z() {
        N.Kj = ca.instance({
          isPot: !0,
          isLinear: !0,
          isFloat: !1,
          url: M.ba + M.ua + M.Go,
        });
        var J = {
          isPot: !1,
          isLinear: !0,
          isFloat: !1,
          width: B.width,
          height: B.height,
        };
        N.fb = ca.instance(J);
        N.Vc = ca.instance(J);
        m.xj.push(N.fb, N.Vc);
        N.vf = ca.instance({ isPot: !0, isFloat: !1, width: ea.Nh() });
        M.Jd &&
          (sb = ca.instance({
            isPot: !1,
            isFloat: !1,
            isLinear: !0,
            url: (M.Kf || -1 !== M.Jf.indexOf('//') ? '' : M.ba + M.ua) + M.Jf,
          }));
      }
      function H() {
        function J() {
          return {
            width: 3,
            height: 1,
            isFloat: !0,
            isPot: !1,
            array: new Float32Array([0, 0.5, 0.5, 0, 0, 0, 0, 0, 0, 0, 0, 0]),
          };
        }
        var T = {
          width: 3,
          height: 1,
          isFloat: !0,
          isPot: !1,
          array: new Float32Array([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]),
        };
        y.Nc = Hc.instance(J());
        y.eg = ca.instance(J());
        y.nc = ca.instance(J());
        y.Qd = Hc.instance(J());
        y.Re = ca.instance(T);
        T = {
          width: 2,
          height: 1,
          isFloat: !0,
          isPot: !1,
          array: new Float32Array([0, 0, 0, 0, 0, 0, 0, 0]),
        };
        y.Pg = ca.instance(T);
        y.me = ca.instance(T);
        V.Rd = ca.instance({
          width: 1,
          height: 1,
          isFloat: !0,
          isPot: !1,
          array: new Float32Array([0, 0, 0, 0]),
        });
      }
      function x(J) {
        N.dg = J;
        if (K) {
          K = !1;
          ba.set('s66');
          y.Pg.O();
          y.me.g(2);
          var T = W(M.Dk, Gb.Kh(0.5));
          ba.G('u65', T);
          y.eg.g(1);
          ba.G('u66', 1e3 * Ca.od);
          Y.l(!1, !1);
          ba.set('s67');
          y.me.o();
          y.Pg.g(0);
          Y.l(!1, !1);
        }
        J.g(0);
        y.Nc.fj(1);
        c.viewport(0, 0, 1, 1);
        ba.set('s61');
        ba.ug('u45', Ic.get(0));
        Y.l(!1, !1);
        ba.set('s62');
        c.viewport(1, 0, 2, 1);
        Y.l(!1, !1);
        y.Re.O();
        ba.set('s63');
        ba.M('u56', M.ze[0] * Pa, M.ze[1]);
        y.Nc.g(0);
        y.Qd.g(1);
        Y.l(!1, !1);
        ba.set('s64');
        y.Qd.fj(1);
        y.Re.g(0);
        y.me.g(2);
        y.Nc.g(3);
        Y.l(!1, !1);
        ba.set('s65');
        y.Qd.g(0);
        y.nc.o();
        Y.l(!1, !1);
      }
      function f() {
        V.si = P;
        V.Rd.O();
        ba.set(F.hi ? 's69' : 's68');
        N.dg.g(0);
        Y.l(!1, !1);
        za.Na.Jj(Ca.ka, V.Rd, V.be);
      }
      function g() {
        var J = M.ba,
          T = M.ue.split('://').shift();
        if ('http' === T || 'https' === T) J = '';
        J += M.ue;
        'json' !== J.split('.').pop() && (J += M.neuralNetworkPath);
        Da(J, function (fa) {
          fa = JSON.parse(fa);
          if (fa.exportData) {
            var ua = fa.exportData;
            F.Xa = F.Xa || ua.rotationEulerAnglesFactors;
            F.Bc = F.Bc || ua.deformScaleXFactor;
            F.qa = F.qa || ua.translationScalingFactors;
            F.xh = ua.dyOffset || 0;
            F.vh = ua.dsOffset || 0;
            F.hi = ua.isLThetaSplitCosSin || !1;
          }
          ea = new hc({ Hd: fa.layers, Zf: 'gpuRawAvg', Vf: x });
          d();
        });
      }
      function A(J) {
        a(J);
        J = M.width;
        var T = M.height;
        G.mb[0] = 1;
        G.mb[1] = J / T;
        Ic.m({
          Pd: M.scanOverlapFactors,
          Ci: M.scanNScaleLevels,
          Y: J,
          qf: T,
          Yi: M.scanScale0Factor,
          qa: F.qa,
          ig: !0,
        });
        ab = J > T ? [J / T, 1] : [1, T / J];
        m.Ha = !0;
      }
      function L() {
        ba.j('s60', [
          { type: '1i', name: 'u1', value: 0 },
          { type: '1i', name: 'u39', value: 1 },
          { type: '2f', name: 'u40', value: G.mb },
          { type: '1f', name: 'u41', value: F.Bc },
          { type: '1f', name: 'u43', value: F.xh },
          { type: '1f', name: 'u42', value: F.vh },
        ]);
        ba.j('s61', [
          { type: '1i', name: 'u44', value: 0 },
          { type: '1i', name: 'u39', value: 1 },
          { type: '1f', name: 'u49', value: M.po },
          { type: '1f', name: 'u50', value: M.$k },
          {
            type: '3f',
            name: 'u46',
            value: [F.qa[0] * G.mb[0], F.qa[1] * G.mb[1], F.qa[2]],
          },
          {
            type: '3f',
            name: 'u47',
            value: [M.mc[0][0], M.mc[1][0], M.mc[2][0]],
          },
          {
            type: '3f',
            name: 'u48',
            value: [M.mc[0][1], M.mc[1][1], M.mc[2][1]],
          },
        ]);
        ba.j('s62', [
          { type: '1i', name: 'u44', value: 0 },
          { type: '1i', name: 'u39', value: 1 },
          { type: '2f', name: 'u53', value: M.gn },
          { type: '3f', name: 'u51', value: F.Xa },
          { type: '3f', name: 'u52', value: M.zj },
          { type: '1f', name: 'u54', value: M.wl },
        ]);
        ba.j('s63', [
          { type: '1i', name: 'u39', value: 0 },
          { type: '1i', name: 'u55', value: 1 },
          { type: '2f', name: 'u56', value: M.ze },
          { type: '1f', name: 'u57', value: M.xn },
          { type: '1f', name: 'u58', value: M.fn },
        ]);
        ba.j('s64', [
          { type: '1i', name: 'u55', value: 1 },
          { type: '1i', name: 'u59', value: 0 },
          { type: '1i', name: 'u60', value: 2 },
          { type: '1i', name: 'u61', value: 3 },
          { type: '2f', name: 'u40', value: G.mb },
          { type: '1f', name: 'u63', value: ea.Nh() },
          { type: '2f', name: 'u62', value: M.tn },
        ]);
        ba.j('s65', [
          { type: '1i', name: 'u39', value: 0 },
          { type: '1f', name: 'u64', value: M.An },
        ]);
        ba.j('s66', [
          { type: '1i', name: 'u44', value: 0 },
          { type: '1i', name: 'u39', value: 1 },
          { type: '1i', name: 'u60', value: 2 },
          { type: '3f', name: 'u51', value: F.Xa },
          { type: '3f', name: 'u52', value: M.zj },
        ]);
        ba.j('s67', [
          { type: '1i', name: 'u60', value: 0 },
          { type: '2f', name: 'u68', value: M.qo },
          { type: '2f', name: 'u69', value: M.yn },
        ]);
        ba.j('s68', [{ type: '1i', name: 'u44', value: 0 }]);
        ba.j('s69', [{ type: '1i', name: 'u44', value: 0 }]);
        ba.j('s59', [
          { type: '1i', name: 'u1', value: 0 },
          { type: '1i', name: 'u70', value: 1 },
        ]);
      }
      function k(J, T, fa) {
        var ua = 0 === fa,
          Ha = a(ua);
        M.width = J;
        M.height = T;
        A(ua);
        L();
        m.xj.forEach(function (lb) {
          lb.resize(J, T);
        });
        fa = ua ? 1 : fa;
        da.resize(Ha.width * fa, Ha.height * fa);
        ya.Tc();
        db.vg(
          Ca.element.videoWidth || Ca.element.width,
          Ca.element.videoHeight || Ca.element.height
        );
        db.Cg();
        db.vj();
      }
      var p,
        h,
        G = { mb: [-1, -1] },
        I = null,
        E = [0.5, 0, 0, 0.5],
        B = { width: -1, height: -1 },
        m = { cb: null, Sb: !1, Ha: !1, xj: [] },
        u = [0, M.Sd[1], M.Sd[2]],
        F = {
          Xa: [-M.Xa[0], -M.Xa[1], M.Xa[2]],
          Bc: M.Bc,
          qa: M.qa,
          xh: 0,
          vh: 0,
          hi: !1,
        },
        R = M.ya,
        Q = null,
        ea = null;
      a(!0);
      var ha = [0, 0, 0],
        ka = 1,
        O = 0,
        N = { fb: null, Vc: null, vf: null, Kj: null, dg: null, Ab: null },
        y = { eg: null, nc: null, Qd: null, Re: null, Pg: null, me: null },
        P = 0,
        K = !1,
        V = {
          gb: null,
          zb: null,
          Pf: null,
          si: 0,
          wj: M.ui[1],
          be: 0.1,
          Rd: null,
        },
        ra = 0,
        ja = !1,
        sa = !0,
        Pa = 1,
        la = -1,
        Z = { ta: -1, V: 0, Ea: 1, kc: 2, lc: 3 },
        ia = Z.V,
        X = null,
        ma = Z.V,
        na = !1,
        oa = { isEnabled: !1, Yb: 1, Lg: 3, J: null },
        Ia = { isEnabled: !1, Ja: null, Yb: 0 },
        sb = null,
        ab = -1,
        Ya = !1,
        Za = !1,
        mb = !1,
        mc = [0, 0, 0],
        yb = 1,
        Hb,
        Nb,
        ec,
        xb = [0, 0, 0],
        Eb = 1,
        Fb = (h = p = 0),
        Ma = M.Kc,
        Ob = [0, 0, 0],
        aa = { scale: 1, offsetX: 0, offsetY: 0 },
        ta = 0,
        ya = {
          m: function () {
            ba.tc([
              {
                id: 's58',
                name: '_',
                s: 'attribute vec2 a0;uniform mat2 u38;varying vec2 vv0;void main(){gl_Position=vec4(a0,0.,1.),vv0=vec2(.5)+u38*a0;}',
                I: ['a0'],
                R: [2],
                h: 'uniform sampler2D u1;varying vec2 vv0;void main(){gl_FragColor=texture2D(u1,vv0);}',
                i: ['u1', 'u38'],
                precision: 'lowp',
              },
              {
                id: 's60',
                name: '_',
                h: 'uniform sampler2D u1;varying vec2 vv0;void main(){gl_FragColor=texture2D(u1,vv0);}',
                s: 'attribute vec2 a0;uniform sampler2D u39;uniform vec2 u40;uniform float u41,u42,u43;const vec2 h=vec2(.16,.5),i=vec2(.5,.5),j=vec2(.84,.5),q=vec2(.5,.5);varying vec2 vv0;void main(){vec4 b=texture2D(u39,h);vec2 c=b.gb,a=b.a*u40;vec4 l=texture2D(u39,i);float m=l.y;vec2 n=vec2(mix(1.,1./cos(m),u41),1.);a*=n,a*=1.+u42;vec2 o=a0*.5;float d=texture2D(u39,j).r,e=cos(d),f=sin(d);mat2 g=mat2(e,f,-f,e);vec2 p=g*o;c+=vec2(-.5,-.5)*a*(g*vec2(0.,u43)),vv0=c+p*a,gl_Position=vec4(a0,0.,1.);}',
                I: ['a0'],
                R: [2],
                i: 'u1 u39 u40 u41 u42 u43'.split(' '),
                precision: 'lowp',
              },
              {
                id: 's61',
                name: '_',
                s: 'attribute vec2 a0;void main(){gl_Position=vec4(a0,0.,1.);}',
                h: 'uniform sampler2D u44,u39;uniform vec3 u45,u46,u47,u48;uniform float u49,u50;const vec4 e=vec4(.25,.25,.25,.25);const vec2 f=vec2(.16,.5),g=vec2(.5,.5),h=vec2(.83,.5);const vec3 i=vec3(1.,1.,1.);void main(){vec4 j=texture2D(u44,vec2(.625,.625)),k=texture2D(u44,vec2(.875,.625));float l=dot(j-k,e);bool m=l>u50;vec4 a=texture2D(u39,f);m?a.r=2.:a.r>u49?a.r=0.:a.r>1.9?a.r+=1.:0.;if(a.r<.9)a=vec4(1.,u45);else{float n=dot(e,texture2D(u44,vec2(.875,.875))),o=dot(e,texture2D(u44,vec2(.125,.625))),p=dot(e,texture2D(u44,vec2(.375,.625))),b=texture2D(u39,h).r,c=cos(b),d=sin(b);vec2 q=mat2(c,d,-d,c)*vec2(n,o);float r=texture2D(u39,g).a;vec3 s=mix(u47,u48,r*i);a.r*=step(1.9,a.r),a.gba+=vec3(q,p)*u46*s*a.a;}gl_FragColor=a;}',
                i: 'u44 u39 u45 u49 u46 u50 u47 u48'.split(' '),
              },
              {
                id: 's62',
                name: '_',
                h: 'uniform sampler2D u44,u39;uniform vec3 u51,u52;uniform vec2 u53;uniform float u54;const vec4 v=vec4(1.,1.,1.,1.),f=vec4(0.,0.,0.,0.),e=vec4(.25,.25,.25,.25);const vec2 g=vec2(.16,.5),h=vec2(.5,.5),i=vec2(.84,.5);varying vec2 vv0;void main(){float k=step(vv0.x,.5);vec4 l=texture2D(u39,g);if(l.r<1.9){gl_FragColor=f;return;}float m=dot(texture2D(u44,vec2(.125,.125)),e),a=smoothstep(u53.x,u53.y,m);vec4 n=texture2D(u39,h);float o=n.a;a=mix(a,o,.3);float p=dot(e,texture2D(u44,vec2(.125,.875))),q=dot(e,texture2D(u44,vec2(.375,.875))),r=dot(e,texture2D(u44,vec2(.625,.875)));vec3 s=vec3(p,q,r),b=u52+s*u51;float c=texture2D(u39,i).r,d=b.z*u54;c+=d,b.z-=d;vec4 t=vec4(b,a),u=vec4(c,0.,0.,0.);gl_FragColor=mix(u,t,k);}',
                i: 'u44 u39 u53 u51 u52 u54'.split(' '),
              },
              {
                id: 's63',
                name: '_',
                h: 'uniform sampler2D u39,u55;uniform vec2 u56;uniform float u57,u58;const vec4 f=vec4(1.,1.,1.,1.),h=vec4(1.,0.,0.,0.),i=vec4(0.,0.,0.,1.);const vec2 g=vec2(.5,.5);varying vec2 vv0;void main(){vec4 c=texture2D(u39,vv0),d=texture2D(u55,vv0),o=texture2D(u39,g),j=texture2D(u55,g);float k=pow(j.a,u58),l=mix(u56.x,u56.y,1.-k),a=step(.34,vv0.x)*step(vv0.x,.66);vec4 m=mix(h,i,a),b=max(l*f,m);b*=mix(f,u57*vec4(1.,1.,1.,0.)+vec4(0.,0.,0.,1.),a);vec4 n=c-d;gl_FragColor=n*b;}',
                i: ['u39', 'u55', 'u56', 'u57', 'u58'],
                precision: 'highp',
              },
              {
                id: 's64',
                name: '_',
                h: 'uniform sampler2D u55,u59,u60,u61;uniform vec2 u40,u62;uniform float u63;const vec4 u=vec4(1.,1.,1.,1.);const vec2 g=vec2(.25,.5),h=vec2(.75,.5),f=vec2(.16,.5),i=vec2(.5,.5);varying vec2 vv0;void main(){float j=step(.33,vv0.x)*step(vv0.x,.66),v=step(.66,vv0.x);vec4 k=texture2D(u61,i);float a=k.a;a*=texture2D(u60,g).a,a*=texture2D(u60,h).a;vec4 l=texture2D(u55,vv0),m=texture2D(u59,vv0),b=l+m;b.a=mix(b.a,a,j);vec4 c=texture2D(u55,f),n=texture2D(u61,f);vec2 o=c.gb,p=n.gb;float q=c.a;vec2 d=u63*abs(o-p)/(u40*q);float r=max(d.x,d.y),s=smoothstep(u62.x,u62.y,r);vec4 t=texture2D(u61,vv0);gl_FragColor=mix(b,t,s);}',
                i: 'u55 u59 u60 u61 u40 u63 u62'.split(' '),
                precision: 'highp',
              },
              {
                id: 's65',
                name: '_',
                h: 'uniform sampler2D u39;uniform float u64;const vec4 g=vec4(1.,1.,1.,1.);const vec2 f=vec2(.5,.5);varying vec2 vv0;void main(){vec4 a=texture2D(u39,vv0);float b=step(vv0.x,.33),c=texture2D(u39,f).g;a.a+=b*a.a*u64*abs(sin(c)),gl_FragColor=a;}',
                i: ['u39', 'u64'],
                precision: 'highp',
              },
              {
                id: 's66',
                name: '_',
                h: 'uniform sampler2D u39,u60,u44;uniform vec3 u51,u52;uniform float u65,u66;const vec4 e=vec4(.25,.25,.25,.25);const vec3 g=vec3(1.,1.,1.);const vec2 h=vec2(.5,.5);const vec3 i=vec3(1.,1.,4.);varying vec2 vv0;void main(){vec4 c=texture2D(u39,h);float d=step(vv0.x,.5),a=1.-d;vec4 j=texture2D(u60,vv0);float t=c.a;vec2 k=mix(vec2(.875,.875),vec2(.125,.875),a),l=mix(vec2(.125,.625),vec2(.375,.875),a),m=mix(vec2(.375,.625),vec2(.625,.875),a);float n=dot(e,texture2D(u44,k)),o=dot(e,texture2D(u44,l)),p=dot(e,texture2D(u44,m));vec3 q=mix(i,u51,a),b=q*vec3(n,o,p),r=c.rgb;b=mix(b,u52+b-r,a)/u66;vec4 s=mix(vec4(b,0.),j,vec4(u65*g,0.));gl_FragColor=s;}',
                i: 'u39 u60 u44 u65 u66 u51 u52'.split(' '),
                precision: 'highp',
              },
              {
                id: 's67',
                name: '_',
                h: 'uniform sampler2D u60;uniform vec2 u68,u69;const vec4 h=vec4(.25,.25,.25,.25);varying vec2 vv0;void main(){float a=step(.5,vv0.x),c=mix(u68.x,u69.x,a),d=mix(u68.y,u69.y,a);vec3 b=texture2D(u60,vv0).rgb;float f=length(b),g=1.-smoothstep(c,d,f);gl_FragColor=vec4(b,g);}',
                i: ['u60', 'u68', 'u69'],
                precision: 'highp',
              },
              {
                id: 's68',
                name: '_',
                s: 'attribute vec2 a0;void main(){gl_Position=vec4(a0,0.,1.);}',
                h: 'uniform sampler2D u44;const vec4 e=vec4(.25,.25,.25,.25);const float f=3.1415;void main(){float a=dot(texture2D(u44,vec2(.375,.375)),e),b=dot(texture2D(u44,vec2(.625,.375)),e),c=f/2.*dot(texture2D(u44,vec2(.875,.375)),e),d=.75*f*dot(texture2D(u44,vec2(.125,.375)),e);gl_FragColor=vec4(d,a,b,c);}',
                i: ['u44'],
              },
              {
                id: 's69',
                name: '_',
                s: 'attribute vec2 a0;void main(){gl_Position=vec4(a0,0.,1.);}',
                h: 'uniform sampler2D u44;const vec4 e=vec4(.25,.25,.25,.25);const float f=3.1415,g=1e-7;void main(){float b=dot(texture2D(u44,vec2(.875,.375)),e),c=dot(texture2D(u44,vec2(.375,.125)),e),d=f/2.*dot(texture2D(u44,vec2(.625,.375)),e),a=dot(texture2D(u44,vec2(.125,.375)),e),h=dot(texture2D(u44,vec2(.375,.375)),e);a+=(step(0.,a)-.5)*g;float i=atan(h,a);gl_FragColor=vec4(i,b,c,d);}',
                i: ['u44'],
              },
              {
                id: 's59',
                name: '_',
                h: 'uniform sampler2D u1,u70;varying vec2 vv0;vec4 i(vec4 a,sampler2D g){mediump float b=a.b*63.;mediump vec2 c;c.y=floor(floor(b)/8.),c.x=floor(b)-c.y*8.;mediump vec2 d;d.y=floor(ceil(b)/8.),d.x=ceil(b)-d.y*8.;highp vec2 e;e.x=c.x*.125+9.765625e-4+.123047*a.r,e.y=c.y*.125+9.765625e-4+.123047*a.g;highp vec2 f;f.x=d.x*.125+9.765625e-4+.123047*a.r,f.y=d.y*.125+9.765625e-4+.123047*a.g;lowp vec4 j=texture2D(g,e),k=texture2D(g,f),l=mix(j,k,fract(b));return l;}void main(){vec4 a=texture2D(u1,vv0);gl_FragColor=i(a,u70);}',
                i: ['u1', 'u70'],
              },
            ]);
            H();
            g();
            wb.m({ gi: !1, ya: R });
            Gb.m({ Sf: 0, n: M.Wc[1] - M.Wc[0] + 1, ti: M.Wc[0] });
            S.set_videoRotation = function (J) {
              Xa.rotate = J;
              S.ready &&
                (db.vg(Ca.element.videoWidth, Ca.element.videoHeight), db.Cg());
            };
            S.set_viewRotation = function () {};
            S.set_LUT = function (J) {
              return new Promise(function (T) {
                J
                  ? ca.instance({
                      url: J,
                      isFloat: !1,
                      isFlipY: !1,
                      J: function (fa) {
                        N.Ab = fa;
                        ya.Tc();
                        T();
                      },
                    })
                  : ((N.Ab = null), ya.Tc(), T());
              });
            };
            S.resize = function (J, T, fa) {
              function ua() {
                wb.stop();
                m.cb && (clearTimeout(m.cb), (m.cb = null));
                if (!m.Sb)
                  if (M.width === Ha && M.height === lb) v();
                  else if (ia !== Z.V && ia !== Z.Ea)
                    m.cb = setTimeout(ua, M.Wi);
                  else {
                    var hb = 'undefined' === typeof tb ? !1 : tb.get_mode(),
                      Ra = ia;
                    ia = Z.ta;
                    m.Sb = !0;
                    oa.isEnabled = !0;
                    oa.J = function () {
                      oa.isEnabled = !1;
                      m.Sb = !1;
                      w();
                      t(M.ya);
                      Q && clearTimeout(Q);
                      Q = !1;
                      ia = Ra;
                    };
                    k(Ha, lb, 0);
                    v();
                    ia === Z.Ea && ((ia = Z.V), S.switch_viewer3D(!0, !1));
                    hb && tb.switch_mode(hb);
                  }
              }
              if (S.ready) {
                m.cb && (clearTimeout(m.cb), (m.cb = null));
                wb.stop();
                fa = fa ? lc.Xe : 1;
                var Ha = J * fa,
                  lb = T * fa;
                m.cb = setTimeout(ua, M.Wi);
              }
            };
          },
          Ql: function () {
            return B;
          },
          v: function () {
            wb.v();
            return new Promise(function (J) {
              S.switch_sleep(!0, !0)
                .finally(function () {
                  ea && ea.v();
                  da.v();
                  gb.v();
                  c && (c = null);
                  ea = null;
                  M.Kf = !1;
                  cb = null;
                  sa = !0;
                  Pa = 1;
                  la = -1;
                  ia = Z.V;
                  X = null;
                  ma = Z.V;
                  Object.assign(Ca, Jc);
                  Object.assign(M, Kc);
                  J();
                })
                .catch(function (T) {
                  throw Error(T);
                });
            });
          },
          Tc: function () {
            wa.dj(y.nc, null === N.Ab ? N.fb : N.Vc, V.Rd, N.Kj);
          },
          Nl: function () {
            return aa;
          },
          kj: function (J) {
            aa = J;
          },
          ie: function () {
            Ob[0] = ha[0] - aa.offsetX;
            Ob[1] = ha[1] + aa.offsetY;
            Ob[2] = ha[2];
            wa.Gn(u, xb, Ob);
          },
          je: function () {
            wa.Hn(ka * M.bn, Eb, aa.scale);
          },
          Hj: function () {
            wa.In(O + p);
          },
          vo: function () {
            wa.En(M.cd + h, M.Gb + Fb);
          },
          xo: function () {
            wa.Fn(Ma);
          },
          ke: function () {
            ya.ie();
            ya.je();
            ya.Hj();
            ya.vo();
            ya.xo();
          },
          zn: function () {
            wb.stop();
            X && (clearInterval(X), (X = null));
            Ia.isEnabled = !0;
            Ia.Yb = 0;
            Ya = wa.Ml();
            Za = cb.Rh();
            mb = cb.Ph();
            yb = Eb;
            mc = xb;
            Hb = Ma;
            Nb = h;
            ec = Fb;
            oa.isEnabled = !1;
            wa.ce(!1);
          },
          wn: function (J) {
            function T() {
              2 === ++fa &&
                ((Ia.isEnabled = !1),
                (Eb = yb),
                (xb = mc),
                (Ma = Hb),
                (h = Nb),
                (Fb = ec),
                ya.ke(),
                wa.sa(Ya),
                v(),
                J && J());
            }
            var fa = 0;
            ia === Z.kc ? (ia = Z.Ea) : ia === Z.lc && (ia = Z.V);
            wa.Za(ia === Z.V ? 0 : 1);
            cb.replace(Za, T);
            cb.og(mb, T);
            ya.Tc();
            wa.ce(!0);
          },
          vj: function () {
            var J = Math.tan(Ca.Mb / 2);
            wa.cj({
              Ze: M.Ze / J,
              Bn: J,
              en: Ca.Ni,
              Ca: M.Ca,
              Rf: M.Rf,
              Nj: G.mb,
              Rj: M.Jo,
              Ec: M.Ec,
              pf: M.pf,
              lf: M.lf,
              mf: M.mf,
              Kc: Ma,
              Ae: M.Ae,
              Me: M.Me,
              gg: M.gg,
              hc: M.hc,
              eo: M.pj,
              fo: M.qj,
              ae: M.ae,
              ic: M.ic,
              hd: M.hd,
              Pe: M.Pe,
              Oe: M.Oe,
              Ne: M.Ne,
              De: M.De,
              Ce: M.ba + M.ua + M.Ce,
              cd: M.cd + h,
              Gb: M.Gb + Fb,
              jf: M.jf,
              Ug: M.Ug,
              Tg: M.Tg,
              qe: M.qe,
              Po: M.Oo,
              pe: Ca.pe,
              Jd: M.Jd,
              Km: sb,
              Id: M.Id,
              Kd: M.Kd,
              If: M.If,
              Jm: ab,
              Dg: M.Dg,
            });
          },
          Ok: function () {
            var J = Xa.te,
              T = Xa.se,
              fa = 1 / Math.tan(Ca.Mb / 2),
              ua = gb.X() / gb.N();
            Ca.Ni = [
              fa,
              0,
              0,
              0,
              0,
              fa / ua,
              0,
              0,
              0,
              0,
              -(T + J) / (T - J),
              -1,
              0,
              0,
              (-2 * J * T) / (T - J),
              0,
            ];
            Ca.pe = 1 / Math.tan((M.Mo * Math.PI) / 360) / fa;
          },
          vg: function (J, T) {
            I = [0.5, 0.5];
            J = T / J;
            T = gb.X() / gb.N();
            90 === Math.abs(Xa.rotate) && (J = 1 / J);
            J > T ? (I[1] *= T / J) : (I[0] *= J / T);
            E[0] = 0;
            E[1] = 0;
            E[2] = 0;
            E[3] = 0;
            switch (Xa.rotate) {
              case 0:
                E[0] = I[0];
                E[3] = I[1];
                break;
              case 180:
                E[0] = -I[0];
                E[3] = -I[1];
                break;
              case 90:
                E[1] = I[0];
                E[2] = -I[1];
                break;
              case -90:
                (E[1] = -I[0]), (E[2] = I[1]);
            }
            M.ii || ((E[0] *= -1), (E[1] *= -1));
            T = Xa.FOVforced;
            Ca.Mb =
              2 *
              Math.atan(
                2 *
                  I[0] *
                  Math.tan(
                    ((T ? T : 1 < J ? Xa.FOVmobile : Xa.FOVdesktop) * Math.PI) /
                      180 /
                      2
                  )
              );
            ya.Ok();
          },
          Cg: function () {
            ba.j('s58', [
              { type: '1i', name: 'u1', value: 0 },
              { type: 'mat2', name: 'u38', value: E },
            ]);
          },
          tf: function (J, T) {
            ya.gm(J, T);
            ya.m();
            if (!ya.hm())
              return (
                S.lb && S.lb('GL_INCOMPATIBLE', 'Cannot init JEELIZVTO'), !1
              );
            ya.$h();
            return !0;
          },
          gm: function (J, T) {
            S.Cb = document.createElement('canvas');
            S.Bb = document.createElement('canvas');
            S.Bb.width = M.width;
            S.Bb.height = M.height;
            S.Sj = S.Bb.getContext('2d');
            S.replace_video = function (fa) {
              Ca.element = fa;
              Ca.Jg.ia = Ca.element;
              return !0;
            };
            S.sc = S.Cb.getContext('2d');
            S.capture_background = function (fa, ua) {
              fa = 'undefined' === typeof fa ? J : fa;
              ua = 'undefined' === typeof ua ? T : ua;
              S.Cb.width = fa;
              S.Cb.height = ua;
              var Ha = fa / ua,
                lb = 0,
                hb = 0;
              if (J / T > Ha) {
                var Ra = T * Ha;
                Ha = T;
                lb = Math.round((J - Ra) / 2);
              } else (Ra = J), (Ha = J / Ha), (hb = Math.round((T - Ha) / 2));
              S.sc.save();
              S.sc.translate(fa, 0);
              S.sc.scale(-1, 1);
              S.sc.drawImage(Ca.element, lb, hb, Ra, Ha, 0, 0, fa, ua);
              S.sc.restore();
              fa = document.createElement('canvas');
              fa.width = S.Cb.width;
              fa.height = S.Cb.height;
              fa.getContext('2d').drawImage(S.Cb, 0, 0);
              return fa;
            };
          },
          $h: function () {
            window.CanvasListeners &&
              (tb.init({ pa: gb.qb() }),
              (S.init_listeners = ya.$h),
              (S.add_listener = tb.add_listener),
              (S.remove_listener = tb.remove_listener),
              (S.animate_swipe = tb.animate_swipe),
              (S.switch_modeInteractor = tb.switch_mode),
              (S.get_modeInteractor = tb.get_mode),
              tb
                .add_listener(
                  'move',
                  function (J, T) {
                    ia === Z.V &&
                      (M.Lm &&
                        ((aa.offsetX -= T[0] * M.xi),
                        (aa.offsetX = Math.min(
                          Math.max(aa.offsetX, -M.Ld),
                          M.Ld
                        ))),
                      (aa.offsetY -= T[1] * M.xi),
                      (aa.offsetY = Math.min(
                        Math.max(aa.offsetY, -M.Ld),
                        M.Ld
                      )),
                      ya.ie());
                  },
                  !0
                )
                .add_listener(
                  'pinch',
                  function (J, T) {
                    ia === Z.V &&
                      ((aa.scale += T * M.Mm),
                      (aa.scale = Math.min(
                        Math.max(aa.scale, M.yi[0]),
                        M.yi[1]
                      )),
                      ya.je());
                  },
                  !0
                ));
          },
          hm: function () {
            return da.m({
              Dd: !1,
              Mk: !1,
              expand: !1,
              pa: gb.qb(),
              Nb: gb,
              onload: function () {
                V.zb = dc.instance({
                  Fb: M.ba + M.ua + eb.Ho,
                  vc: M.ba + M.ua + eb.Io,
                  uc: eb.Lj,
                  wc: eb.Mj,
                });
                M.Wb
                  ? ((V.gb = dc.instance({})), za.Na.sa(V.gb))
                  : (V.gb = V.zb);
                wa.sa(V.gb);
                V.Pf = M.Wb ? Zc.instance({ Hm: V.gb, Fm: V.zb }) : V.zb;
                d();
              },
            });
          },
          yg: function () {
            ja ||
              (ya.Tc(),
              M.Wb && (Ba.reset(), za.Na.Fk(Ca.ka), za.Na.Ek()),
              (S.ready = !0),
              (P = 0),
              M.Fd && v(),
              (ra = 0),
              (ja = !0),
              da.Og(lc.vl),
              ya.ke(),
              wa.lo(),
              S.Zc.forEach(function (J) {
                J();
              }),
              S.Zc.splice(0));
          },
          vi: function (J, T) {
            J = uc.instance({
              J: function () {
                ya.yg();
                T && T();
              },
              url: J.url,
              Mc: J.Mc,
              Eb: J.Eb,
              Db: J.Db,
            });
            n(J);
          },
          oo: function () {
            if (M.Wb) {
              var J = Object.assign({}, eb, { $b: M.ba + M.ua + eb.$b });
              za.Na.pg(J);
            }
          },
        };
      return ya;
    }
    function $c() {
      S.we && S.we();
      Ca.Ed = !1;
      var a = {
          width: { min: Xa.minWidth, max: Xa.maxWidth, ideal: Xa.idealWidth },
          height: {
            min: Xa.minHeight,
            max: Xa.maxHeight,
            ideal: Xa.idealHeight,
          },
          facingMode: { ideal: 'user' },
        },
        b = { video: a, audio: !1 };
      Ca.kh = b;
      a && -1 !== Ca.deviceId && bc(b, Ca.deviceId);
      Cc(
        navigator.mediaDevices && navigator.mediaDevices.getUserMedia
          ? document.createElement('video')
          : !1,
        function (d) {
          S.xe && S.xe(d);
          Lc(d);
        },
        function (d) {
          S.lb && S.lb('WEBCAM_UNAVAILABLE', d);
        },
        b
      );
    }
    function Lc(a) {
      Ca.element = a;
      a = Ca.element.videoWidth || Ca.element.width;
      var b = Ca.element.videoHeight || Ca.element.height;
      Ca.Jg = { ia: Ca.element, isPot: !1, isFloat: !1, isFlipY: !0 };
      Ca.ka = ca.instance(Ca.Jg);
      db.vg(a, b);
      db.tf(a, b) && db.Cg();
    }
    function ad() {
      var a = document.createElement('canvas');
      a.width = M.width;
      a.height = M.height;
      Ca.yh = a.getContext('2d');
      Ca.Ed = !0;
      Lc(a);
    }
    function Ub(a) {
      return 3 === arguments.length ? this.ob(arguments) : this.set(a);
    }
    function Mc(a, b) {
      b = Math.floor(b);
      a.r = ((b >> 16) & 255) / 255;
      a.W = ((b >> 8) & 255) / 255;
      a.b = (b & 255) / 255;
    }
    function bd(a, b) {
      function d(n) {
        void 0 !== n &&
          1 > parseFloat(n) &&
          console.warn(
            'JETHREE.Color: Alpha component of ' + b + ' will be ignored.'
          );
      }
      var e;
      if ((e = /^((?:rgb|hsl)a?)\(\s*([^\)]*)\)/.exec(b))) {
        var q = e[2];
        switch (e[1]) {
          case 'rgb':
          case 'rgba':
            if (
              (e =
                /^(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(,\s*([0-9]*\.?[0-9]+)\s*)?$/.exec(
                  q
                ))
            ) {
              a.r = Math.min(255, parseInt(e[1], 10)) / 255;
              a.W = Math.min(255, parseInt(e[2], 10)) / 255;
              a.b = Math.min(255, parseInt(e[3], 10)) / 255;
              d(e[5]);
              return;
            }
            if (
              (e =
                /^(\d+)%\s*,\s*(\d+)%\s*,\s*(\d+)%\s*(,\s*([0-9]*\.?[0-9]+)\s*)?$/.exec(
                  q
                ))
            ) {
              a.r = Math.min(100, parseInt(e[1], 10)) / 100;
              a.W = Math.min(100, parseInt(e[2], 10)) / 100;
              a.b = Math.min(100, parseInt(e[3], 10)) / 100;
              d(e[5]);
              return;
            }
            break;
          case 'hsl':
          case 'hsla':
            if (
              (e =
                /^([0-9]*\.?[0-9]+)\s*,\s*(\d+)%\s*,\s*(\d+)%\s*(,\s*([0-9]*\.?[0-9]+)\s*)?$/.exec(
                  q
                ))
            ) {
              q = parseFloat(e[1]) / 360;
              var l = parseInt(e[2], 10) / 100,
                v = parseInt(e[3], 10) / 100;
              d(e[5]);
              a.Dn(q, l, v);
              return;
            }
        }
      } else if ((e = /^#([A-Fa-f0-9]+)$/.exec(b))) {
        e = e[1];
        q = e.length;
        if (3 === q) {
          a.r = parseInt(e.charAt(0) + e.charAt(0), 16) / 255;
          a.W = parseInt(e.charAt(1) + e.charAt(1), 16) / 255;
          a.b = parseInt(e.charAt(2) + e.charAt(2), 16) / 255;
          return;
        }
        if (6 === q) {
          a.r = parseInt(e.charAt(0) + e.charAt(1), 16) / 255;
          a.W = parseInt(e.charAt(2) + e.charAt(3), 16) / 255;
          a.b = parseInt(e.charAt(4) + e.charAt(5), 16) / 255;
          return;
        }
      }
      b &&
        0 < b.length &&
        ((e = cd[b]),
        void 0 !== e
          ? Mc(a, e)
          : console.warn('JETHREE.Color: Unknown color ' + b));
    }
    function nc(a, b, d, e) {
      this.B = a || 0;
      this.C = b || 0;
      this.D = d || 0;
      this.P = void 0 !== e ? e : 1;
    }
    function Nc(a, b, d) {
      var e = b.B,
        q = b.C,
        l = b.D;
      b = b.P;
      var v = d.B,
        n = d.C,
        t = d.D;
      d = d.P;
      a.B = e * d + b * v + q * t - l * n;
      a.C = q * d + b * n + l * v - e * t;
      a.D = l * d + b * t + e * n - q * v;
      a.P = b * d - e * v - q * n - l * t;
      return a;
    }
    function Vb(a, b) {
      this.x = a || 0;
      this.y = b || 0;
    }
    function Ta(a, b, d) {
      this.x = a || 0;
      this.y = b || 0;
      this.z = d || 0;
    }
    function Oc(a, b) {
      var d = a.x,
        e = a.y,
        q = a.z;
      a.x = e * b.z - q * b.y;
      a.y = q * b.x - d * b.z;
      a.z = d * b.y - e * b.x;
    }
    function Wb(a, b, d, e) {
      this.B = a || 0;
      this.C = b || 0;
      this.D = d || 0;
      this.Oa = e || Wb.Oj;
    }
    function vc(a, b) {
      this.min = void 0 !== a ? a : new Ta(Infinity, Infinity, Infinity);
      this.max = void 0 !== b ? b : new Ta(-Infinity, -Infinity, -Infinity);
    }
    function oc(a) {
      return new Ta().$c(a.min, a.max).Ba(0.5);
    }
    function dd(a, b) {
      a.min.min(b);
      a.max.max(b);
    }
    function Xb() {
      this.elements = new Float32Array([
        1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1,
      ]);
      0 < arguments.length &&
        console.error(
          'JETHREE.Matrix4: the constructor no longer reads arguments. use .set() instead.'
        );
    }
    function Pc(a, b, d) {
      var e = b.elements,
        q = d.elements;
      d = a.elements;
      b = e[0];
      var l = e[4],
        v = e[8],
        n = e[12],
        t = e[1],
        r = e[5],
        w = e[9],
        D = e[13],
        z = e[2],
        H = e[6],
        x = e[10],
        f = e[14],
        g = e[3],
        A = e[7],
        L = e[11];
      e = e[15];
      var k = q[0],
        p = q[4],
        h = q[8],
        G = q[12],
        I = q[1],
        E = q[5],
        B = q[9],
        m = q[13],
        u = q[2],
        F = q[6],
        R = q[10],
        Q = q[14],
        ea = q[3],
        ha = q[7],
        ka = q[11];
      q = q[15];
      d[0] = b * k + l * I + v * u + n * ea;
      d[4] = b * p + l * E + v * F + n * ha;
      d[8] = b * h + l * B + v * R + n * ka;
      d[12] = b * G + l * m + v * Q + n * q;
      d[1] = t * k + r * I + w * u + D * ea;
      d[5] = t * p + r * E + w * F + D * ha;
      d[9] = t * h + r * B + w * R + D * ka;
      d[13] = t * G + r * m + w * Q + D * q;
      d[2] = z * k + H * I + x * u + f * ea;
      d[6] = z * p + H * E + x * F + f * ha;
      d[10] = z * h + H * B + x * R + f * ka;
      d[14] = z * G + H * m + x * Q + f * q;
      d[3] = g * k + A * I + L * u + e * ea;
      d[7] = g * p + A * E + L * F + e * ha;
      d[11] = g * h + A * B + L * R + e * ka;
      d[15] = g * G + A * m + L * Q + e * q;
      return a;
    }
    function wc(a, b, d, e, q, l) {
      this.a = a;
      this.b = b;
      this.c = d;
      this.La = e instanceof Ta ? e : new Ta();
      this.oe = Array.isArray(e) ? e : [];
      this.color = q instanceof Ub ? q : new Ub();
      this.Rg = Array.isArray(q) ? q : [];
      this.Xb = void 0 !== l ? l : 0;
    }
    function ed(a, b, d) {
      var e = new XMLHttpRequest();
      e.open('GET', a, !0);
      var q = (e.withCredentials = !1);
      e.onreadystatechange = function () {
        404 !== e.status || q || ((q = !0), d && d(404));
        if (4 === e.readyState && 200 === e.status) {
          var l = null;
          try {
            l = JSON.parse(e.responseText);
          } catch (v) {
            d && d(-1);
          }
          b && l && b(l);
        }
      };
      e.onerror = function () {
        d && d(0);
      };
      e.send();
    }
    function xc(a, b, d) {
      'object' === typeof a ? b(a) : ed(a, b, d);
    }
    function fd(a, b) {
      for (var d = new Ta(), e = new Ta(), q = 0, l = b.length; q < l; q++) {
        var v = b[q],
          n = a[v.a],
          t = a[v.b];
        d.bb(a[v.c], t);
        e.bb(n, t);
        Oc(d, e);
        0 !== d.Bf() && (d.normalize(), v.La.K(d));
      }
    }
    function gd(a, b) {
      for (var d = Array(a.length), e = 0, q = a.length; e < q; ++e)
        d[e] = new Ta();
      e = new Ta();
      q = new Ta();
      for (var l = 0, v = b.length; l < v; ++l) {
        var n = b[l],
          t = a[n.a],
          r = a[n.b];
        e.bb(a[n.c], r);
        q.bb(t, r);
        Oc(e, q);
        d[n.a].add(e);
        d[n.b].add(e);
        d[n.c].add(e);
      }
      e = 0;
      for (a = a.length; e < a; ++e) d[e].normalize();
      a = 0;
      for (e = b.length; a < e; ++a)
        (q = b[a]),
          (l = q.oe),
          3 === l.length
            ? (l[0].K(d[q.a]), l[1].K(d[q.b]), l[2].K(d[q.c]))
            : ((l[0] = d[q.a].clone()),
              (l[1] = d[q.b].clone()),
              (l[2] = d[q.c].clone()));
      return d;
    }
    function hd(a, b, d, e) {
      function q(G) {
        p.K(b[G]);
        h.K(p);
        var I = n[G];
        L.K(I);
        L.sub(p.Ba(p.kd(I))).normalize();
        var E = h.x,
          B = h.y,
          m = h.z,
          u = I.x,
          F = I.y;
        I = I.z;
        k.x = B * I - m * F;
        k.y = m * u - E * I;
        k.z = E * F - B * u;
        E = 0 > k.kd(t[G]) ? -1 : 1;
        v[4 * G] = L.x;
        v[4 * G + 1] = L.y;
        v[4 * G + 2] = L.z;
        v[4 * G + 3] = E;
      }
      for (
        var l = a.length,
          v = new Float32Array(4 * l),
          n = Array(l),
          t = Array(l),
          r = 0;
        r < l;
        r++
      )
        (n[r] = new Ta()), (t[r] = new Ta());
      var w = new Ta(),
        D = new Ta(),
        z = new Ta(),
        H = new Vb(),
        x = new Vb(),
        f = new Vb(),
        g = new Ta(),
        A = new Ta();
      e.forEach(function (G) {
        var I = G.a,
          E = G.b;
        G = G.c;
        w.K(a[I]);
        D.K(a[E]);
        z.K(a[G]);
        H.K(d[I]);
        x.K(d[E]);
        f.K(d[G]);
        var B = D.x - w.x,
          m = z.x - w.x,
          u = D.y - w.y,
          F = z.y - w.y,
          R = D.z - w.z,
          Q = z.z - w.z,
          ea = x.x - H.x,
          ha = f.x - H.x,
          ka = x.y - H.y,
          O = f.y - H.y,
          N = 1 / (ea * O - ha * ka);
        g.set((O * B - ka * m) * N, (O * u - ka * F) * N, (O * R - ka * Q) * N);
        A.set(
          (ea * m - ha * B) * N,
          (ea * F - ha * u) * N,
          (ea * Q - ha * R) * N
        );
        n[I].add(g);
        n[E].add(g);
        n[G].add(g);
        t[I].add(A);
        t[E].add(A);
        t[G].add(A);
      });
      var L = new Ta(),
        k = new Ta(),
        p = new Ta(),
        h = new Ta();
      e.forEach(function (G) {
        q(G.a);
        q(G.b);
        q(G.c);
      });
      return v;
    }
    function Qc(a, b, d, e) {
      return Math.sqrt((a - d) * (a - d) + (b - e) * (b - e));
    }
    var U = {
        nh: !0,
        op: !1,
        pp: !1,
        Zk: !1,
        mh: !1,
        np: !1,
        Ka: !1,
        Dd: !1,
        Yp: !1,
        ba: '',
        Ai: '',
        tk: 700,
        sk: 200,
        oh: !1,
        Bo: !1,
        Co: !1,
        Ao: !1,
        $j: 3,
        Jb: !1,
        $g: !0,
        Fb: 'images/backgrounds/interior2.jpg',
        vc: 'images/backgrounds/interior_light.jpg',
        vk: [256, 256, 512, 512],
        uc: 2.1,
        wc: 8,
        uk: [64, 128, 256, 256],
        nm: [60, 96, 160, 250],
        mm: [8, 12, 18, 40],
        Oc: 2.2,
        ag: 1,
        Ee: 300,
        dh: 500,
        Fe: 50,
        Gk: 0,
        Hk: 0,
        cp: 45,
        fp: 1,
        ep: 1e3,
        eh: 20,
        Ro: 10,
        So: 10,
        To: 5,
        an: 0.1,
        Hi: 20,
        Ki: 100,
        Li: 100,
        $m: -Math.PI / 3,
        Zm: Math.PI / 3,
        Ji: 0,
        yj: 0,
        od: [40, 32, 16, 16],
        Yj: [0, 0.87, 0.92, 0.9],
        Wm: 2,
        Sm: 100,
        ea: !1,
        ak: 16,
        bk: 0.4,
        dk: [0.72, 0.73, 0.72, 0.74],
        nk: 1.2,
        kk: [0.5, 0.5, 0.5, 1],
        qk: 140,
        pk: 280,
        rk: 1.2,
        ek: 20,
        fk: 40,
        mk: [6, 9, 9, 12],
        jk: [0.03, 0.02, 0.02, 0.018],
        ik: [0.35, 0.35, 0.4, 0.5],
        gk: [0.2, 0.2, 0.2, 0.2],
        ck: [0.1, 0.15, 0.15, 0.15],
        lk: [200, 200, 150, 120],
        hk: [1, 2, 3, 5],
        ho: 1.1,
        rq: [0.25, 0.5, 1, 2],
        sq: 256,
        qq: 256,
        pq: 200,
        io: [40, 80, 200, 500],
        jo: [35, 45, 80, 120],
        Tk: !0,
        Uk: 'CCW',
      },
      Rc = {},
      ba = (function () {
        function a(m, u, F) {
          u = m.createShader(u);
          m.shaderSource(u, F);
          m.compileShader(u);
          return m.getShaderParameter(u, m.COMPILE_STATUS) ? u : null;
        }
        function b(m, u, F) {
          u = a(m, m.VERTEX_SHADER, u);
          F = a(m, m.FRAGMENT_SHADER, F);
          m === c && n.push(u, F);
          var R = m.createProgram();
          m.attachShader(R, u);
          m.attachShader(R, F);
          m.linkProgram(R);
          return R;
        }
        function d(m) {
          return ['float', 'sampler2D', 'int']
            .map(function (u) {
              return 'precision ' + m + ' ' + u + ';\n';
            })
            .join('');
        }
        function e(m, u) {
          u.$ = u.$ ? !0 : !1;
          if (!u.$) {
            u.s =
              u.s ||
              'precision lowp float;attribute vec2 a0;varying vec2 vv0;void main(){gl_Position=vec4(a0,0.,1.),vv0=a0*.5+vec2(.5);}';
            u.I = u.I || ['a0'];
            u.R = u.R || [2];
            u.precision = u.precision || z;
            u.id = w++;
            void 0 !== u.Zi &&
              (u.Zi.forEach(function (Q, ea) {
                u.h = u.h.replace(Q, u.Da[ea]);
              }),
              u.Zi.splice(0));
            u.Sg = 0;
            u.R.forEach(function (Q) {
              u.Sg += 4 * Q;
            });
            var F = d(u.precision);
            u.na = b(m, F + u.s, F + u.h);
            u.A = {};
            u.i.forEach(function (Q) {
              u.A[Q] = m.getUniformLocation(u.na, Q);
            });
            u.attributes = {};
            u.va = [];
            u.I.forEach(function (Q) {
              var ea = m.getAttribLocation(u.na, Q);
              u.attributes[Q] = ea;
              u.va.push(ea);
            });
            if (u.u) {
              m.useProgram(u.na);
              r = u;
              t = u.id;
              for (var R in u.u) m.uniform1i(u.A[R], u.u[R]);
            }
            u.Ha = !0;
          }
        }
        function q(m) {
          pb.nj(B);
          t !== m.id &&
            (B.H(),
            (t = m.id),
            (r = m),
            c.useProgram(m.na),
            m.va.forEach(function (u) {
              0 !== u && c.enableVertexAttribArray(u);
            }));
        }
        function l(m, u, F) {
          e(m, u, F);
          m.useProgram(u.na);
          m.enableVertexAttribArray(u.attributes.a0);
          t = -1;
          return (r = u);
        }
        function v() {
          return {
            h: 'uniform sampler2D u1;varying vec2 vv0;void main(){gl_FragColor=texture2D(u1,vv0);}',
            i: ['u1'],
            u: { u1: 0 },
          };
        }
        var n = [],
          t = -1,
          r = null,
          w = 0,
          D = !1,
          z = 'highp',
          H = ['u1'],
          x = ['u0'],
          f = { u1: 0 },
          g = { u0: 0 },
          A = { u1: 0, u2: 1 },
          L = { u1: 0, u3: 1 },
          k = ['u1', 'u3', 'u4'],
          p = { u5: 0 },
          h = {
            s0: v(),
            s1: {
              h: 'uniform sampler2D u1;varying vec2 vv0;void main(){gl_FragColor=texture2D(u1,vv0);}',
              i: H,
              u: f,
              precision: 'lowp',
            },
            s2: {
              h: 'uniform sampler2D u1,u2;varying vec2 vv0;void main(){vec4 a=texture2D(u2,vv0),b=texture2D(u1,vv0);gl_FragColor=a*b;}',
              i: ['u1', 'u2'],
              u: A,
            },
            s3: {
              h: 'uniform sampler2D u1;uniform vec2 u6,u7;varying vec2 vv0;void main(){vec2 a=vv0*u6+u7;gl_FragColor=texture2D(u1,a);}',
              i: ['u1', 'u6', 'u7'],
              u: f,
              $: !0,
            },
            s4: {
              h: 'uniform sampler2D u1;varying vec2 vv0;const vec4 f=vec4(1.,1.,1.,1.);void main(){vec4 a=texture2D(u1,vv0);gl_FragColor=a.r*f;}',
              i: H,
              u: f,
            },
            s5: {
              h: 'uniform sampler2D u1,u2;varying vec2 vv0;const vec4 f=vec4(1.,1.,1.,1.);void main(){vec4 a=texture2D(u2,vv0),b=texture2D(u1,vv0);gl_FragColor=a.a*b.r*f;}',
              i: ['u1', 'u2'],
              u: A,
            },
            s6: {
              h: 'uniform sampler2D u1;varying vec2 vv0;void main(){gl_FragColor=texture2D(u1,vec2(1.-vv0.x,vv0.y));}',
              i: H,
              u: f,
            },
            s7: {
              h: 'uniform sampler2D u1;varying vec2 vv0;void main(){gl_FragColor=texture2D(u1,vec2(vv0.x,1.-vv0.y));}',
              i: H,
              u: f,
            },
            s8: {
              h: 'uniform sampler2D u0;uniform float u6;varying vec2 vv0;void main(){vec4 a=texture2D(u0,vv0);gl_FragColor=a*u6;}',
              i: ['u0', 'u6'],
              u: g,
            },
            s9: {
              h: 'uniform sampler2D u0;uniform float u6;varying vec2 vv0;const vec4 f=vec4(.25,.25,.25,.25),g=vec4(1.,1.,1.,1.);void main(){vec4 a=texture2D(u0,vv0);float b=dot(a*u6,f);gl_FragColor=b*g;}',
              i: ['u0', 'u6'],
              u: g,
            },
            s10: {
              h: 'uniform sampler2D u1;varying vec2 vv0;const vec4 e=vec4(1.,1.,1.,1.);void main(){float a=.25*dot(e,texture2D(u1,vv0));gl_FragColor=a*e;}',
              i: H,
              u: f,
            },
            s11: {
              h: 'uniform sampler2D u1,u8;uniform float u9;const vec4 f=vec4(1.,1.,1.,1.);varying vec2 vv0;void main(){vec4 a=texture2D(u1,vv0),b=texture2D(u8,vv0);gl_FragColor=mix(b,a,u9*f);}',
              i: ['u1', 'u8', 'u9'],
              u: { u1: 0, u8: 1 },
            },
            s12: {
              h: 'uniform sampler2D u1;uniform vec2 u10;varying vec2 vv0;void main(){gl_FragColor=.25*(texture2D(u1,vv0+u10)+texture2D(u1,vv0+u10*vec2(1.,-1.))+texture2D(u1,vv0+u10*vec2(-1.,-1.))+texture2D(u1,vv0+u10*vec2(-1.,1.)));}',
              i: ['u1', 'u10'],
              u: f,
            },
            s13: {
              h: 'uniform sampler2D u1;uniform vec4 u11;varying vec2 vv0;float g(float a,float b){a=floor(a)+.5;return floor(a/exp2(b));}float h(float a,float b){return floor(a*exp2(b)+.5);}float i(float a,float b){return mod(a,h(1.,b));}float e(float c,float a,float b){a=floor(a+.5),b=floor(b+.5);return i(g(c,a),b-a);}vec4 j(float a){if(a==0.)return vec4(0.,0.,0.,0.);float k=128.*step(a,0.);a=abs(a);float c=floor(log2(a)),l=c+127.,b=(a/exp2(c)-1.)*8388608.,d=l/2.,m=fract(d)*2.,n=floor(d),o=e(b,0.,8.),p=e(b,8.,16.),q=m*128.+e(b,16.,23.),r=k+n;return vec4(o,p,q,r)/255.;}void main(){float a=dot(texture2D(u1,vv0),u11);gl_FragColor=j(a);}',
              i: ['u1', 'u11'],
              u: f,
            },
            s14: {
              h: 'uniform sampler2D u0;varying vec2 vv0;const vec4 e=vec4(1.,1.,1.,1.);void main(){vec4 a=texture2D(u0,vv0),b=e/(e+exp(-a));gl_FragColor=b;}',
              i: x,
              u: g,
              $: !0,
            },
            s15: {
              h: 'uniform sampler2D u0;varying vec2 vv0;const vec4 f=vec4(0.,0.,0.,0.);void main(){vec4 a=texture2D(u0,vv0);gl_FragColor=max(f,a);}',
              i: x,
              u: g,
            },
            s16: {
              h: 'uniform sampler2D u0;varying vec2 vv0;const vec4 f=vec4(1.,1.,1.,1.);void main(){vec4 a=texture2D(u0,vv0);gl_FragColor=mix(exp(-abs(a))-f,a,step(0.,a));}',
              i: x,
              u: g,
            },
            s17: {
              h: 'uniform sampler2D u0;varying vec2 vv0;const vec4 f=vec4(1.,1.,1.,1.);void main(){vec4 a=texture2D(u0,vv0),b=exp(-abs(a))-f;gl_FragColor=mix(.1*b,a,step(0.,a));}',
              i: x,
              u: g,
            },
            s18: {
              h: 'uniform sampler2D u0;const float e=3.141593;varying vec2 vv0;void main(){gl_FragColor=atan(e*texture2D(u0,vv0))/e;}',
              i: x,
              u: g,
            },
            s19: {
              h: 'uniform sampler2D u0;const float e=3.141593;varying vec2 vv0;void main(){gl_FragColor=2.*atan(e*texture2D(u0,vv0))/e;}',
              i: x,
              u: g,
              $: !0,
            },
            s20: {
              h: 'uniform sampler2D u0,u12;uniform float u13;const vec2 e=vec2(.5,.5);const float f=1e-5;const vec4 g=vec4(1.,1.,1.,1.),i=vec4(0.,0.,0.,0.);varying vec2 vv0;void main(){vec4 a=texture2D(u12,e);float b=u13*u13;vec4 c=max(b*a,f*g);gl_FragColor=texture2D(u0,vv0)/c;}',
              i: ['u0', 'u12', 'u13'],
              u: { u0: 0, u12: 1 },
              $: !0,
            },
            s21: {
              h: 'uniform sampler2D u1;uniform vec2 u14;varying vec2 vv0;void main(){float a=u14.x*u14.y;vec2 b=floor(vv0*a)/a,c=fract(vv0*a),d=floor(b*u14.y),f=floor(u14.x*fract(b*u14.y)),g=(f*u14.y+d)/a;gl_FragColor=texture2D(u1,g+c/a);}',
              i: ['u1', 'u14'],
              u: f,
            },
            s22: {
              h: 'uniform sampler2D u15,u16,u17;varying vec2 vv0;void main(){vec4 a=texture2D(u17,vv0);vec2 b=a.rg,c=a.ba;vec4 d=texture2D(u15,b),f=texture2D(u16,c);gl_FragColor=d*f;}',
              i: ['u15', 'u16', 'u17'],
              u: { u16: 0, u15: 1, u17: 2 },
              $: !0,
            },
            s23: {
              h: 'uniform float u18,u19;uniform sampler2D u15,u16;varying vec2 vv0;void main(){vec2 c=fract(vv0*u18),a=vv0;float b=u18*u19;a=(.5+floor(b*vv0))/b;vec4 d=texture2D(u15,a),f=texture2D(u16,c);gl_FragColor=d*f;}',
              i: ['u16', 'u15', 'u18', 'u19'],
              u: { u16: 0, u15: 1 },
            },
            s24: {
              h: 'uniform float u18,u19;uniform sampler2D u15,u16,u20,u21,u22,u23;varying vec2 vv0;const vec4 e=vec4(1.,1.,1.,1.),g=vec4(1e-3,1e-3,1e-3,1e-3);void main(){vec2 c=fract(vv0*u18),d=vv0;float h=u18*u19;d=(.5+floor(h*vv0))/h;vec4 l=texture2D(u15,d),m=texture2D(u16,c),a=texture2D(u23,d);a=floor(.5+a*255.);vec4 n=texture2D(u20,c),o=texture2D(u21,c),p=texture2D(u22,c),i=step(-g,-a),b=e-i,j=b*step(-e-g,-a);b*=e-j;vec4 k=b*step(-2.*e-g,-a);b*=e-k;vec4 q=b,r=i*m+j*n+k*o+q*p;gl_FragColor=l*r;}',
              i: 'u15 u16 u18 u19 u23 u20 u21 u22'.split(' '),
              u: { u16: 0, u15: 1, u23: 3, u20: 4, u21: 5, u22: 6 },
              $: !0,
            },
            s25: {
              h: 'uniform sampler2D u15,u16,u3;uniform float u18,u24,u25,u19;uniform vec2 u26;varying vec2 vv0;const vec2 f=vec2(1.),l=vec2(0.);void main(){vec2 c=floor(u24*vv0),d=u24*vv0-c;float g=u18/u24;vec2 h=floor(d*g),i=d*g-h,j=(c+i)/u24;float m=u24*u19/u18;vec2 b=m*h;b=floor(u26*b+.5*(u19-1.)*(f-u26));vec2 a=(b+i*u25)/u19;a+=.25/u19;vec2 k=step(a,f)*step(l,a);vec4 n=texture2D(u15,j),o=texture2D(u16,a),p=n*o,q=texture2D(u3,j);gl_FragColor=(p*u25*u25+q)*k.x*k.y;}',
              i: 'u15 u16 u18 u24 u25 u19 u3 u26'.split(' '),
              u: { u16: 0, u15: 1, u3: 2 },
            },
            s26: {
              h: 'uniform sampler2D u15,u16;varying vec2 vv0;void main(){vec4 a=texture2D(u15,vv0),b=texture2D(u16,vv0);gl_FragColor=a*b;}',
              i: ['u15', 'u16'],
              u: { u16: 0, u15: 1 },
              $: !0,
            },
            s27: {
              h: 'uniform sampler2D u1,u3;uniform float u4;varying vec2 vv0;void main(){gl_FragColor=texture2D(u3,vv0)+u4*texture2D(u1,vv0);}',
              i: k,
              u: L,
            },
            s28: {
              h: 'uniform sampler2D u1,u3;uniform float u4;varying vec2 vv0;const vec4 e=vec4(1.);void main(){vec4 a=texture2D(u3,vv0)+u4*texture2D(u1,vv0);vec2 h=mod(gl_FragCoord.xy,vec2(2.)),d=step(h,vec2(.75));float b=d.x+2.*d.y,c=step(2.5,b),g=(1.-c)*step(1.5,b),i=(1.-c)*(1.-g)*step(.5,b);a=mix(a,a.argb,i*e),a=mix(a,a.barg,g*e),a=mix(a,a.gbar,c*e),gl_FragColor=a;}',
              i: k,
              u: L,
              $: !0,
            },
            s29: {
              h: 'uniform sampler2D u1,u3;uniform float u4;varying vec2 vv0;const vec4 h=vec4(1.);void main(){vec4 a=texture2D(u3,vv0)+u4*texture2D(u1,vv0);vec2 b=floor(gl_FragCoord.xy);vec3 d=b.x*vec3(1.)+vec3(0.,1.,2.);float c=mod(b.y,2.);vec4 f=vec4(c,(1.-c)*step(mod(d,vec3(3.)),vec3(.5)));mat4 g=mat4(a.rgba,a.gbar,a.barg,a.argb);gl_FragColor=g*f;}',
              i: k,
              u: L,
              $: !0,
            },
            s30: {
              h: 'varying vec2 vv0;uniform sampler2D u1;const vec4 f=vec4(1.,1.,1.,1.),g=vec4(.299,.587,.114,0.);void main(){vec4 a=texture2D(u1,vv0);gl_FragColor=dot(a,g)*f;}',
              i: H,
              u: f,
              precision: 'lowp',
            },
            s31: {
              h: 'varying vec2 vv0;uniform sampler2D u1;uniform float u27;const vec3 f=vec3(.299,.587,.114);void main(){vec3 a=texture2D(u1,vv0).rgb,b=texture2D(u1,vv0+vec2(0.,u27)).rgb,c=texture2D(u1,vv0+vec2(u27,u27)).rgb,d=texture2D(u1,vv0+vec2(u27,0.)).rgb;gl_FragColor=vec4(dot(a,f),dot(b,f),dot(c,f),dot(d,f));}',
              i: ['u1', 'u27'],
              u: f,
              precision: 'lowp',
            },
            s32: {
              h: 'varying vec2 vv0;uniform sampler2D u1;uniform float u27;const vec3 f=vec3(.299,.587,.114);void main(){vec3 a=texture2D(u1,vv0).rgb,b=texture2D(u1,vv0+vec2(0.,u27)).rgb,c=texture2D(u1,vv0+vec2(u27,u27)).rgb,d=texture2D(u1,vv0+vec2(u27,0.)).rgb;gl_FragColor=vec4(a.r,b.g,c.b,dot(d,f));}',
              i: ['u1', 'u27'],
              u: f,
              precision: 'lowp',
            },
            s33: {
              h: 'varying vec2 vv0;uniform sampler2D u1,u2;uniform float u28;const vec4 f=vec4(1.,1.,1.,1.);void main(){vec4 a=vec4(0.);a-=texture2D(u1,vec2(vv0.x-u28,vv0.y-u28))*1.,a-=texture2D(u1,vec2(vv0.x-u28,vv0.y))*2.,a-=texture2D(u1,vec2(vv0.x-u28,vv0.y+u28))*1.,a+=texture2D(u1,vec2(vv0.x+u28,vv0.y-u28))*1.,a+=texture2D(u1,vec2(vv0.x+u28,vv0.y))*2.,a+=texture2D(u1,vec2(vv0.x+u28,vv0.y+u28))*1.;vec4 b=vec4(0.);b-=texture2D(u1,vec2(vv0.x-u28,vv0.y-u28))*1.,b-=texture2D(u1,vec2(vv0.x,vv0.y-u28))*2.,b-=texture2D(u1,vec2(vv0.x+u28,vv0.y-u28))*1.,b+=texture2D(u1,vec2(vv0.x-u28,vv0.y+u28))*1.,b+=texture2D(u1,vec2(vv0.x,vv0.y+u28))*2.,b+=texture2D(u1,vec2(vv0.x+u28,vv0.y+u28))*1.;vec3 c=sqrt(a.rgb*a.rgb+b.rgb*b.rgb);vec4 e=vec4(c,texture2D(u1,vv0).a),g=texture2D(u2,vv0);gl_FragColor=g.a*e.r*f;}',
              i: ['u1', 'u2', 'u28'],
              u: A,
              $: !0,
            },
            s34: {
              h: 'varying vec2 vv0;uniform sampler2D u1,u2;uniform float u28;const vec4 j=vec4(1.,1.,1.,1.);const vec2 k=vec2(1.,1.);void main(){float h=0.;vec2 l=k*u28,a,b;float c,d,i=0.;for(float e=-4.;e<=4.;e+=1.)for(float f=-4.;f<=4.;f+=1.)a=vec2(e,f),c=length(a)/2.,d=exp(-c*c),b=vv0+l*a,h+=d*texture2D(u1,b).r,i+=d;vec4 m=texture2D(u2,vv0);gl_FragColor=m.a*(texture2D(u1,b).r-h/i)*j;}',
              i: ['u1', 'u2', 'u28'],
              u: A,
              $: !0,
            },
            s35: {
              h: 'uniform sampler2D u5;uniform vec2 u10;varying vec2 vv0;vec4 e(vec4 a,vec4 b){vec4 c=step(a,b);return mix(a,b,c);}const vec2 g=vec2(.5,.5),h=vec2(1.,0.),i=vec2(0.,1.);void main(){vec2 a=vv0-u10*g;vec4 b=texture2D(u5,a),c=texture2D(u5,a+u10*h),d=texture2D(u5,a+u10*i),j=texture2D(u5,a+u10),k=e(b,c),l=e(d,j);gl_FragColor=e(k,l);}',
              i: ['u5', 'u10'],
              u: p,
            },
            s36: {
              h: 'uniform sampler2D u5;uniform vec2 u10;varying vec2 vv0;const vec2 k=vec2(1.,0.),l=vec2(0.,1.),m=vec2(2.,0.),n=vec2(0.,2.);vec4 e(vec4 a,vec4 b){vec4 c=step(a,b);return mix(a,b,c);}vec4 f(vec2 a){vec4 b=texture2D(u5,a),c=texture2D(u5,a+u10*k),d=texture2D(u5,a+u10*l),g=texture2D(u5,a+u10),h=e(b,c),i=e(d,g);return e(h,i);}void main(){vec2 a=vv0+u10*vec2(-.55,-1.05);vec4 b=f(a),c=f(a+u10*m),d=f(a+u10*2.),g=f(a+u10*n),h=e(b,c),i=e(d,g);gl_FragColor=e(h,i);}',
              i: ['u5', 'u10'],
              u: p,
              $: !0,
            },
            s37: {
              h: 'uniform sampler2D u1;varying vec2 vv0;void main(){vec4 a=texture2D(u1,vv0);gl_FragColor=a*a;}',
              i: ['u1'],
              u: f,
              precision: 'lowp',
              $: !0,
            },
            s38: {
              h: 'uniform sampler2D u1;uniform vec2 u10;varying vec2 vv0;const float e=15444.;void main(){vec4 a=1001./e*texture2D(u1,vv0-3.*u10)+2002./e*texture2D(u1,vv0-2.*u10)+3003./e*texture2D(u1,vv0-u10)+3432./e*texture2D(u1,vv0)+3003./e*texture2D(u1,vv0+u10)+2002./e*texture2D(u1,vv0+2.*u10)+1001./e*texture2D(u1,vv0+3.*u10);gl_FragColor=a;}',
              i: ['u10', 'u1'],
              u: f,
              precision: 'lowp',
              $: !0,
            },
            s39: {
              h: 'uniform sampler2D u1,u12,u29;varying vec2 vv0;const vec4 f=vec4(1.,1.,1.,1.);const float g=.1;void main(){vec4 a=texture2D(u12,vv0),b=texture2D(u29,vv0),c=texture2D(u1,vv0),d=max(f*g,b-a*a),h=sqrt(d);gl_FragColor=(c-a)/h;}',
              i: ['u1', 'u12', 'u29'],
              u: { u1: 0, u12: 1, u29: 2 },
              $: !0,
            },
          },
          G = {
            s40: {
              h: 'uniform float u18,u30;uniform sampler2D u15,u16,u3;varying vec2 vv0;const vec2 ZERO2=vec2(0.,0.),ONE2=vec2(1.,1.),HALF2=vec2(.5,.5),EPS2=vec2(1e-5,1e-5);void main(){vec4 sum=texture2D(u3,vv0);float toSparsity=1.1111;vec2 uvFrom,uvWeight,xyPatch=ZERO2,eps2=EPS2/u18,xyTo=floor(vv0*u18+eps2);float weightSize=toSparsity*u18;vec2 halfFromSparsity=ONE2*(toSparsity-1.)/2.;for(float patch_x=0.;patch_x<1.1111;patch_x+=1.){xyPatch.x=patch_x;for(float patch_y=0.;patch_y<1.1111;patch_y+=1.)xyPatch.y=patch_y,uvFrom=(xyTo+HALF2+u30*(xyPatch-halfFromSparsity))/u18,uvFrom+=step(uvFrom,-eps2),uvFrom-=step(ONE2-eps2,uvFrom),uvWeight=(xyTo*toSparsity+xyPatch+HALF2)/weightSize,sum+=texture2D(u15,uvWeight)*texture2D(u16,uvFrom);}gl_FragColor=sum,gl_FragColor*=2.2222;}',
              i: ['u18', 'u15', 'u16', 'u3', 'u30'],
              Da: ['1.1111', 'gl_FragColor\\*=2.2222;'],
            },
            s41: {
              h: 'uniform float u18,u30,u19;uniform sampler2D u15,u16,u3;varying vec2 vv0;const vec2 ZERO2=vec2(0.,0.),ONE2=vec2(1.,1.),HALF2=vec2(.5,.5),EPS2=vec2(1e-4,1e-4);void main(){vec4 sum=texture2D(u3,vv0);float fromSparsity=1.1111,shrinkFactor=3.3333;vec2 uvFrom,uvWeight,xyFrom,xyPatchTo,xyPatch=ZERO2,xyShrink=ZERO2,eps2=EPS2/u19,xyTo=floor(vv0*u18+eps2);float weightSize=fromSparsity*u19;vec2 halfFromSparsity=ONE2*(fromSparsity-1.)/2.;float toSparsity=weightSize/u18;vec2 xyFrom0=xyTo*shrinkFactor;for(float patch_x=0.;patch_x<1.1111;patch_x+=1.){xyPatch.x=patch_x;for(float patch_y=0.;patch_y<1.1111;patch_y+=1.){xyPatch.y=patch_y;for(float shrink_x=0.;shrink_x<3.3333;shrink_x+=1.){xyShrink.x=shrink_x;for(float shrink_y=0.;shrink_y<3.3333;shrink_y+=1.)xyShrink.y=shrink_y,xyFrom=xyFrom0+xyShrink+shrinkFactor*u30*(xyPatch-halfFromSparsity),uvFrom=(xyFrom+HALF2)/u19,uvFrom+=step(uvFrom,-eps2),uvFrom-=step(ONE2-eps2,uvFrom),xyPatchTo=xyPatch*shrinkFactor+xyShrink,uvWeight=(xyTo*toSparsity+xyPatchTo+HALF2)/weightSize,sum+=texture2D(u15,uvWeight)*texture2D(u16,uvFrom);}}}gl_FragColor=sum,gl_FragColor*=2.2222;}',
              i: 'u18 u19 u15 u16 u3 u30'.split(' '),
              Da: ['1.1111', 'gl_FragColor\\*=2.2222;', '3.3333'],
            },
          },
          I = null,
          E = null,
          B = {
            Vb: function () {
              return D;
            },
            m: function () {
              if (!D) {
                I = Ka(h, 2);
                E = Ka(G, 2);
                z = 'highp';
                c.getShaderPrecisionFormat &&
                  (c.getShaderPrecisionFormat(
                    c.FRAGMENT_SHADER,
                    c.MEDIUM_FLOAT
                  ),
                  c.getShaderPrecisionFormat(c.FRAGMENT_SHADER, c.LOW_FLOAT));
                for (var m in I) e(c, I[m], m);
                ba.set('s0');
                c.enableVertexAttribArray(0);
                D = !0;
              }
            },
            tc: function (m) {
              m.forEach(function (u) {
                B.oa(u);
              });
            },
            oa: function (m) {
              I[m.id] = m;
              e(c, m, m.id);
            },
            km: function (m, u, F) {
              u || (u = m);
              I[u] = Object.create(E[m]);
              I[u].tm = !0;
              E[m].Da &&
                E[m].Da.forEach(function (R, Q) {
                  I[u].h = I[u].h.replace(new RegExp(R, 'g'), F[Q]);
                });
              e(c, I[u], u);
            },
            set: function (m) {
              var u = I[m];
              u.$ && ((u.$ = !1), e(c, u, m));
              q(u);
            },
            wb: function (m) {
              return l(m, v(), 's42');
            },
            Xd: function (m) {
              return l(
                m,
                {
                  h: 'void main(){gl_FragColor=vec4(.5,.5,.5,.5);}',
                  i: [],
                  precision: z,
                },
                's43'
              );
            },
            ul: function (m) {
              return 'undefined' === typeof I[m] ? !1 : I[m].Ha;
            },
            H: function () {
              -1 !== t &&
                ((t = -1),
                r.va.forEach(function (m) {
                  0 !== m && c.disableVertexAttribArray(m);
                }));
            },
            Zd: function () {
              var m = 0;
              r.va.forEach(function (u, F) {
                F = r.R[F];
                c.vertexAttribPointer(u, F, c.FLOAT, !1, r.Sg, m);
                m += 4 * F;
              });
            },
            tl: function () {
              c.enableVertexAttribArray(0);
            },
            dc: function () {
              B.ec(c);
            },
            ec: function (m) {
              m.vertexAttribPointer(r.va[0], 2, m.FLOAT, !1, 8, 0);
            },
            Yd: function (m, u) {
              c.uniform1i(r.A[m], u);
            },
            G: function (m, u) {
              c.uniform1f(r.A[m], u);
            },
            M: function (m, u, F) {
              c.uniform2f(r.A[m], u, F);
            },
            sg: function (m, u) {
              c.uniform2fv(r.A[m], u);
            },
            ug: function (m, u) {
              c.uniform3fv(r.A[m], u);
            },
            tg: function (m, u, F, R) {
              c.uniform3f(r.A[m], u, F, R);
            },
            $n: function (m, u, F, R, Q) {
              c.uniform4f(r.A[m], u, F, R, Q);
            },
            xa: function (m, u) {
              c.uniform4fv(r.A[m], u);
            },
            ao: function (m, u) {
              c.uniformMatrix2fv(r.A[m], !1, u);
            },
            bo: function (m, u) {
              c.uniformMatrix3fv(r.A[m], !1, u);
            },
            Rc: function (m, u) {
              c.uniformMatrix4fv(r.A[m], !1, u);
            },
            j: function (m, u) {
              B.set(m);
              u.forEach(function (F) {
                switch (F.type) {
                  case '4f':
                    c.uniform4fv(r.A[F.name], F.value);
                    break;
                  case '3f':
                    c.uniform3fv(r.A[F.name], F.value);
                    break;
                  case '2f':
                    c.uniform2fv(r.A[F.name], F.value);
                    break;
                  case '1f':
                    c.uniform1f(r.A[F.name], F.value);
                    break;
                  case '1i':
                    c.uniform1i(r.A[F.name], F.value);
                    break;
                  case 'mat2':
                    c.uniformMatrix2fv(r.A[F.name], !1, F.value);
                    break;
                  case 'mat3':
                    c.uniformMatrix3fv(r.A[F.name], !1, F.value);
                    break;
                  case 'mat4':
                    c.uniformMatrix4fv(r.A[F.name], !1, F.value);
                }
              });
            },
            Dp: function () {
              return 'lowp';
            },
            v: function () {
              B.H();
              c.disableVertexAttribArray(0);
              for (var m in I) {
                var u = I[m];
                u.Ha && ((u.Ha = !1), c.deleteProgram(u.na));
                u.tm && delete I[m];
              }
              n.forEach(function (F) {
                c.deleteShader(F);
              });
              n.splice(0);
              w = 0;
              D = !1;
              r = null;
              t = -1;
            },
          };
        return B;
      })(),
      c = null,
      gb = (function () {
        function a(x) {
          console.log('ERROR in ContextFF: ', x);
          return !1;
        }
        function b() {
          return (
            navigator.userAgent &&
            -1 !== navigator.userAgent.indexOf('forceWebGL1')
          );
        }
        function d(x, f, g) {
          x.setAttribute('width', f);
          x.setAttribute('height', g);
        }
        function e(x) {
          function f() {
            Ib.v();
            Ea.reset();
            A.getExtension('WEBGL_lose_context').loseContext();
          }
          if (b()) return !1;
          var g = document.createElement('canvas');
          d(g, 5, 5);
          var A = null;
          try {
            A = g.getContext('webgl2', x);
          } catch (L) {
            return !1;
          }
          if (!A) return !1;
          q(A);
          Ea.zh(A);
          x = Ea.Qe(A);
          if (!x.Ta && !x.Va) return f(), !1;
          x = Ib.fh(A, x);
          f();
          return x ? !0 : !1;
        }
        function q(x) {
          x.clearColor(0, 0, 0, 0);
          x.disable(x.DEPTH_TEST);
          x.disable(x.BLEND);
          x.disable(x.DITHER);
          x.disable(x.STENCIL_TEST);
          x.disable(x.CULL_FACE);
          x.GENERATE_MIPMAP_HINT &&
            x.FASTEST &&
            x.hint(x.GENERATE_MIPMAP_HINT, x.FASTEST);
          x.disable(x.SAMPLE_ALPHA_TO_COVERAGE);
          x.disable(x.SAMPLE_COVERAGE);
          x.depthFunc(x.LEQUAL);
          x.clearDepth(1);
        }
        var l = null,
          v = null,
          n = null,
          t = null,
          r = !0,
          w = null,
          D = null,
          z = [],
          H = {
            N: function () {
              return l.width;
            },
            X: function () {
              return l.height;
            },
            qb: function () {
              return l;
            },
            yl: function () {
              return c;
            },
            ja: function () {
              return r;
            },
            flush: function () {
              c.flush();
            },
            Lp: function () {
              Ba.ca();
              H.un();
            },
            un: function () {
              ca.reset();
              Y.reset();
              ba.H();
              ba.tl();
              c.disable(c.DEPTH_TEST);
              c.disable(c.BLEND);
              Y.fd();
              ba.dc();
            },
            Dl: function () {
              w || (w = new Uint8Array(l.width * l.height * 4));
              c.readPixels(0, 0, l.width, l.height, c.RGBA, c.UNSIGNED_BYTE, w);
              return w;
            },
            yp: function () {
              return l.toDataURL('image/jpeg');
            },
            zp: function () {
              Ba.aa();
              v ||
                ((v = document.createElement('canvas')),
                (n = v.getContext('2d')));
              d(v, l.width, l.height);
              for (
                var x = H.Dl(),
                  f = n.createImageData(v.width, v.height),
                  g = v.width,
                  A = v.height,
                  L = f.data,
                  k = 0;
                k < A;
                ++k
              )
                for (var p = A - k - 1, h = 0; h < g; ++h) {
                  var G = 4 * (k * g + h),
                    I = 4 * (p * g + h);
                  L[G] = x[I];
                  L[G + 1] = x[I + 1];
                  L[G + 2] = x[I + 2];
                  L[G + 3] = x[I + 3];
                }
              n.putImageData(f, 0, 0);
              return v.toDataURL('image/png');
            },
            Lh: function (x) {
              !v &&
                x &&
                ((v = document.createElement('canvas')),
                (n = v.getContext('2d')));
              var f = x ? v : document.createElement('canvas');
              d(f, l.width, l.height);
              (x ? n : f.getContext('2d')).drawImage(l, 0, 0);
              return f;
            },
            m: function (x) {
              x = Object.assign(
                {
                  Ua: null,
                  Uf: null,
                  pa: null,
                  Le: null,
                  width: 512,
                  height: 512,
                  premultipliedAlpha: !1,
                  qm: !0,
                  antialias: !1,
                  debug: !1,
                  mp: !1,
                },
                x
              );
              x.Ua
                ? ((c = x.Ua), (l = x.Ua.canvas))
                : x.Le && !x.pa
                ? (l = document.getElementById(x.Le))
                : x.pa && (l = x.pa);
              l || (l = document.createElement('canvas'));
              l.width = x.width;
              l.height = x.height;
              if (c) r = c instanceof WebGL2RenderingContext;
              else {
                r = !0;
                var f = {
                  antialias: x.antialias,
                  alpha: !0,
                  preserveDrawingBuffer: !0,
                  premultipliedAlpha: x.premultipliedAlpha,
                  stencil: !1,
                  depth: x.qm,
                  failIfMajorPerformanceCaveat: !0,
                  powerPreference: 'high-performance',
                };
                navigator &&
                  navigator.userAgent &&
                  -1 !== navigator.userAgent.indexOf('noAntialiasing') &&
                  (f.antialias = !1);
                var g = e(f);
                g || !f.antialias || b() || ((f.antialias = !1), (g = e(f)));
                g && (c = l.getContext('webgl2', f));
                c
                  ? (r = !0)
                  : ((c = l.getContext('webgl', f)) ||
                      (c = l.getContext('experimental-webgl', f)),
                    (r = !1));
              }
              if (!c) return a('WebGL1 and 2 are not enabled');
              x.Uf &&
                l.addEventListener &&
                (t = c.getExtension('WEBGL_lose_context')) &&
                ((D = x.Uf), l.addEventListener('webglcontextlost', D, !1));
              if (!Ea.m()) return a('Not enough GL capabilities');
              q(c);
              ba.m();
              Y.m();
              Ib.fh(c, Ea.Al());
              z.forEach(function (A) {
                A(c);
              });
              z.splice(0);
              return !0;
            },
            bp: function () {
              return new Promise(function (x) {
                c ? x(c) : z.push(x);
              });
            },
            v: function () {
              c && (Ea.v(), ba.v(), Ib.v());
              t &&
                D &&
                (l.removeEventListener('webglcontextlost', D, !1),
                (t = D = null));
              c = w = n = v = l = null;
              z.splice(0);
            },
          };
        return H;
      })(),
      pb = (function () {
        function a() {
          null === b &&
            ('undefined' !== typeof ba
              ? (b = ba)
              : 'undefined' !== typeof C && (b = C));
        }
        var b = null;
        return {
          reset: function () {
            b = null;
          },
          nj: function (d) {
            b !== d && (b && b.H(), (b = d));
          },
          Vb: function () {
            return b.Vb();
          },
          dc: function () {
            return b.dc();
          },
          ec: function (d) {
            return b.ec(d);
          },
          Zd: function () {
            return b.Zd();
          },
          H: function () {
            return b.H();
          },
          set: function (d) {
            a();
            return b.set(d);
          },
          wb: function (d) {
            a();
            return b.wb(d);
          },
          Xd: function (d) {
            a();
            return b.Xd(d);
          },
        };
      })(),
      ca = (function () {
        function a(m) {
          c.bindTexture(c.TEXTURE_2D, m);
        }
        function b(m) {
          var u = new Uint16Array(m.length);
          m.forEach(function (F, R) {
            G[0] = F;
            var Q = I[0];
            var ea = (Q >> 16) & 32768;
            F = (Q >> 12) & 2047;
            var ha = (Q >> 23) & 255;
            Q =
              103 > ha
                ? ea
                : 142 < ha
                ? ea | 31744 | ((255 == ha ? 0 : 1) && Q & 8388607)
                : 113 > ha
                ? ((F |= 2048),
                  ea | ((F >> (114 - ha)) + ((F >> (113 - ha)) & 1)))
                : (ea | ((ha - 112) << 10) | (F >> 1)) + (F & 1);
            u[R] = Q;
          });
          return u;
        }
        function d() {
          if (null !== E.rf) return E.rf;
          var m = e(b([0.5, 0.5, 0.5, 0.5]), !0);
          return null === m ? !0 : (E.rf = m);
        }
        function e(m, u) {
          if (!pb.Vb() || !H) return null;
          var F = null,
            R = Math.sqrt(m.length / 4);
          try {
            var Q = c.getError();
            if ('FUCKING_BIG_ERROR' === Q) return !1;
            F = B.instance({ isFloat: !1, S: u, array: m, width: R });
            Q = c.getError();
            if (Q !== c.NO_ERROR) return !1;
          } catch (ea) {
            return !1;
          }
          Ba.aa();
          c.viewport(0, 0, R, R);
          c.clearColor(0, 0, 0, 0);
          c.clear(c.COLOR_BUFFER_BIT);
          pb.set('s0');
          F.Pa(0);
          Y.l(!0, !0);
          m = 4 * R * R;
          u = new Uint8Array(m);
          c.readPixels(0, 0, R, R, c.RGBA, c.UNSIGNED_BYTE, u);
          R = !0;
          for (Q = 0; Q < m; ++Q) R = R && 3 > Math.abs(u[Q] - 127);
          F.remove();
          Ba.ca();
          return R;
        }
        var q = 0,
          l = null,
          v = 0,
          n = null,
          t = null,
          r = null,
          w = null,
          D = null,
          z = null,
          H = !1,
          x = [],
          f = {
            isFloat: !1,
            isPot: !0,
            isLinear: !1,
            isMipmap: !1,
            isAnisotropicFiltering: !1,
            isMirrorX: !1,
            isMirrorY: !1,
            isSrgb: !1,
            isKeepArray: !1,
            isFlipY: null,
            width: 0,
            height: 0,
            url: null,
            array: null,
            data: null,
            ia: null,
            Uh: null,
            rm: !1,
            S: !1,
            J: null,
            F: 4,
            Nf: 0,
          },
          g = !1,
          A = null,
          L = null,
          k = [
            [1, 0, 0, 0],
            [0, 1, 0, 0],
            [0, 0, 1, 0],
            [0, 0, 0, 1],
          ],
          p = !1,
          h = !1,
          G = new Float32Array(1),
          I = new Int32Array(G.buffer),
          E = { rf: null, sf: null },
          B = {
            m: function () {
              H ||
                ((D = [c.RGBA, null, c.RGBA, c.RGBA]),
                (z = [c.RGBA, null, c.RGBA, c.RGBA]),
                (l = [
                  c.TEXTURE0,
                  c.TEXTURE1,
                  c.TEXTURE2,
                  c.TEXTURE3,
                  c.TEXTURE4,
                  c.TEXTURE5,
                  c.TEXTURE6,
                  c.TEXTURE7,
                ]),
                (p = 'undefined' !== typeof da),
                (h = 'undefined' !== typeof Ea),
                (n = [-1, -1, -1, -1, -1, -1, -1, -1]),
                (w = [c.UNSIGNED_BYTE, c.FLOAT, c.FLOAT]),
                (H = !0));
            },
            im: function () {
              if (!t) {
                for (var m = new Float32Array(16384), u = 0; 16384 > u; ++u)
                  m[u] = 2 * Math.random() - 1;
                t = {
                  random: B.instance({
                    isFloat: !0,
                    isPot: !0,
                    array: m,
                    width: 64,
                  }),
                  Cj: B.instance({
                    isFloat: !1,
                    isPot: !0,
                    width: 1,
                    array: new Uint8Array([0, 0, 0, 0]),
                  }),
                };
              }
              B.wo();
            },
            Th: function () {
              return t.Cj;
            },
            wo: function () {
              w[1] = Ea.cf(c);
            },
            Vn: function () {
              z = D = [c.RGBA, c.RGBA, c.RGBA, c.RGBA];
            },
            Ti: function (m) {
              ba.set('s1');
              Ba.aa();
              var u = m.N(),
                F = m.X();
              c.viewport(0, 0, u, F);
              m.g(0);
              Y.l(!1, !1);
            },
            $p: function (m, u) {
              B.Ti(m);
              c.readPixels(0, 0, m.N(), m.X(), c.RGBA, c.UNSIGNED_BYTE, u);
            },
            aq: function (m, u) {
              B.Ti(m);
              return Ea.fg(0, 0, m.N(), m.X(), u);
            },
            Gh: function (m, u, F, R, Q, ea, ha) {
              m.activeTexture(m.TEXTURE0);
              var ka = m.createTexture();
              m.bindTexture(m.TEXTURE_2D, ka);
              Q = Q instanceof Float32Array ? Q : new Float32Array(Q);
              m.texParameteri(m.TEXTURE_2D, m.TEXTURE_WRAP_S, m.CLAMP_TO_EDGE);
              m.texParameteri(m.TEXTURE_2D, m.TEXTURE_WRAP_T, m.CLAMP_TO_EDGE);
              m.texParameteri(m.TEXTURE_2D, m.TEXTURE_MAG_FILTER, m.NEAREST);
              m.texParameteri(m.TEXTURE_2D, m.TEXTURE_MIN_FILTER, m.NEAREST);
              m.pixelStorei(m.UNPACK_FLIP_Y_WEBGL, ea);
              m.texImage2D(
                m.TEXTURE_2D,
                0,
                m.RGBA,
                F,
                R,
                0,
                m.RGBA,
                m.FLOAT,
                Q
              );
              m.bindTexture(m.TEXTURE_2D, null);
              m.pixelStorei(m.UNPACK_FLIP_Y_WEBGL, !1);
              ha && (Ba.ca(), ba.wb(m));
              m.viewport(0, 0, F, R);
              m.framebufferTexture2D(
                m.FRAMEBUFFER,
                m.COLOR_ATTACHMENT0,
                m.TEXTURE_2D,
                u,
                0
              );
              m.bindTexture(m.TEXTURE_2D, ka);
              ha ? Y.l(!0, !0) : Y.Lb(m);
              m.deleteTexture(ka);
              H && ((n[0] = -1), (r = null), (q = 0));
            },
            ye: function (m) {
              m !== q && (c.activeTexture(l[m]), (q = m));
            },
            instance: function (m) {
              function u() {
                la = void 0 !== O.ia.videoWidth ? O.ia.videoWidth : O.ia.width;
                Z =
                  void 0 !== O.ia.videoHeight ? O.ia.videoHeight : O.ia.height;
              }
              function F(aa) {
                var ta = c.getError();
                if ('FUCKING_BIG_ERROR' === ta) return !1;
                c.texImage2D(c.TEXTURE_2D, 0, ab, Ya, Za, aa);
                ta = c.getError();
                ta !== c.NO_ERROR &&
                  Ya !== c.RGBA &&
                  ((Ya = c.RGBA),
                  c.texImage2D(c.TEXTURE_2D, 0, ab, Ya, Za, aa));
                return !0;
              }
              function R() {
                if (!X) {
                  a(ja);
                  mb && c.pixelStorei(c.UNPACK_FLIP_Y_WEBGL, mb);
                  O.isPot
                    ? (c.texParameteri(
                        c.TEXTURE_2D,
                        c.TEXTURE_WRAP_S,
                        O.isMirrorX ? c.MIRRORED_REPEAT : c.REPEAT
                      ),
                      c.texParameteri(
                        c.TEXTURE_2D,
                        c.TEXTURE_WRAP_T,
                        O.isMirrorY ? c.MIRRORED_REPEAT : c.REPEAT
                      ))
                    : (c.texParameteri(
                        c.TEXTURE_2D,
                        c.TEXTURE_WRAP_S,
                        c.CLAMP_TO_EDGE
                      ),
                      c.texParameteri(
                        c.TEXTURE_2D,
                        c.TEXTURE_WRAP_T,
                        c.CLAMP_TO_EDGE
                      ));
                  O.isAnisotropicFiltering &&
                    'undefined' !== typeof U &&
                    c.texParameterf(
                      c.TEXTURE_2D,
                      da.El().TEXTURE_MAX_ANISOTROPY_EXT,
                      U.$j
                    );
                  c.texParameteri(
                    c.TEXTURE_2D,
                    c.TEXTURE_MAG_FILTER,
                    O.isLinear ? c.LINEAR : c.NEAREST
                  );
                  O.isLinear
                    ? c.texParameteri(
                        c.TEXTURE_2D,
                        c.TEXTURE_MIN_FILTER,
                        O.isMipmap && !yb ? c.NEAREST_MIPMAP_LINEAR : c.LINEAR
                      )
                    : c.texParameteri(
                        c.TEXTURE_2D,
                        c.TEXTURE_MIN_FILTER,
                        O.isMipmap && !yb ? c.NEAREST_MIPMAP_NEAREST : c.NEAREST
                      );
                  Ya = D[O.F - 1];
                  ab = z[O.F - 1];
                  Za = w[y];
                  if (Ea.ja()) {
                    var aa = Ea.Gl();
                    Ya === c.RGBA && Za === c.FLOAT
                      ? O.isMipmap || O.isLinear
                        ? (ab = Ib.Il(c))
                        : Ea.fa()
                        ? aa && (ab = aa)
                        : (ab = c.RGBA16F || c.RGBA)
                      : Ya === c.RGB &&
                        Za === c.FLOAT &&
                        aa &&
                        ((ab = aa), (Ya = c.RGBA));
                  }
                  if (
                    (O.S && !O.isFloat) ||
                    (O.isFloat && O.isMipmap && Ib.Am())
                  )
                    (ab = Ea.Hl()), (Za = Ea.cf(c));
                  O.Nf && (Nb = O.Nf);
                  O.isSrgb && 4 === O.F && (Ya = da.$l());
                  if (O.ia) F(O.ia);
                  else if (O.url) F(sa);
                  else if (Pa) {
                    aa = Pa;
                    try {
                      'FUCKING_BIG_ERROR' !== c.getError() &&
                        (c.texImage2D(
                          c.TEXTURE_2D,
                          0,
                          ab,
                          la,
                          Z,
                          0,
                          Ya,
                          Za,
                          aa
                        ),
                        c.getError() !== c.NO_ERROR &&
                          (c.texImage2D(
                            c.TEXTURE_2D,
                            0,
                            ab,
                            la,
                            Z,
                            0,
                            Ya,
                            Za,
                            null
                          ),
                          c.getError() !== c.NO_ERROR &&
                            c.texImage2D(
                              c.TEXTURE_2D,
                              0,
                              c.RGBA,
                              la,
                              Z,
                              0,
                              c.RGBA,
                              c.UNSIGNED_BYTE,
                              null
                            )));
                    } catch (fa) {
                      c.texImage2D(c.TEXTURE_2D, 0, ab, la, Z, 0, Ya, Za, null);
                    }
                    O.isKeepArray || (Pa = null);
                  } else
                    (aa = c.getError()),
                      'FUCKING_BIG_ERROR' !== aa &&
                        (c.texImage2D(
                          c.TEXTURE_2D,
                          0,
                          ab,
                          la,
                          Z,
                          0,
                          Ya,
                          Za,
                          null
                        ),
                        (aa = c.getError()),
                        aa !== c.NO_ERROR &&
                          ((Ya = c.RGBA),
                          O.S &&
                            Za !== c.FLOAT &&
                            ((Za = c.FLOAT),
                            c.texImage2D(
                              c.TEXTURE_2D,
                              0,
                              ab,
                              la,
                              Z,
                              0,
                              Ya,
                              Za,
                              null
                            ))));
                  if (O.isMipmap)
                    if (!yb && Ma) Ma.ud(), (xb = !0);
                    else if (yb) {
                      aa = Math.log2(Math.min(la, Z));
                      Hb = Array(1 + aa);
                      Hb[0] = ja;
                      for (var ta = 1; ta <= aa; ++ta) {
                        var ya = Math.pow(2, ta),
                          J = la / ya;
                        ya = Z / ya;
                        var T = c.createTexture();
                        a(T);
                        c.texParameteri(
                          c.TEXTURE_2D,
                          c.TEXTURE_MIN_FILTER,
                          c.NEAREST
                        );
                        c.texParameteri(
                          c.TEXTURE_2D,
                          c.TEXTURE_MAG_FILTER,
                          c.NEAREST
                        );
                        c.texImage2D(
                          c.TEXTURE_2D,
                          0,
                          ab,
                          J,
                          ya,
                          0,
                          Ya,
                          Za,
                          null
                        );
                        a(null);
                        Hb[ta] = T;
                      }
                      xb = !0;
                    }
                  a(null);
                  n[q] = -1;
                  mb && c.pixelStorei(c.UNPACK_FLIP_Y_WEBGL, !1);
                  ia = !0;
                  O.J && Ma && (O.J(Ma), (O.J = null));
                }
              }
              function Q() {
                for (
                  var aa = la * Z, ta = 2 * aa, ya = 3 * aa, J = 0;
                  J < aa;
                  ++J
                )
                  (na[0][J] = sb[J]),
                    (na[1][J] = sb[J + aa]),
                    (na[2][J] = sb[J + ta]),
                    (na[3][J] = sb[J + ya]);
              }
              function ea() {
                var aa = la * Z * 4;
                oa = [
                  new Uint8Array(aa),
                  new Uint8Array(aa),
                  new Uint8Array(aa),
                  new Uint8Array(aa),
                ];
                na = [
                  new Float32Array(oa[0].buffer),
                  new Float32Array(oa[1].buffer),
                  new Float32Array(oa[2].buffer),
                  new Float32Array(oa[3].buffer),
                ];
                Ia = new Uint8Array(4 * aa);
                sb = new Float32Array(Ia.buffer);
                ma = !0;
              }
              function ha() {
                ka = new Uint8Array(la * Z * 4);
                Fb = new Float32Array(ka.buffer);
                Eb = !0;
              }
              var ka,
                O = Object.assign({}, f, m),
                N = v++;
              null === O.isFlipY && (O.isFlipY = O.url ? !0 : !1);
              O.data &&
                ((O.array =
                  'string' === typeof O.data
                    ? qb(O.data)
                    : O.isFloat
                    ? new Float32Array(O.data)
                    : new Uint8Array(O.data)),
                (O.isFlipY = !1));
              var y = 0,
                P = O.ia ? !0 : !1,
                K = null,
                V = null,
                ra = !1;
              O.S = O.S || O.isFloat;
              O.S && (y = 1);
              !O.rm && O.isFloat && h && !Ea.fa() && (O.isFloat = !1);
              O.isFloat && (y = 2);
              O.isAnisotropicFiltering &&
                p &&
                !da.zm() &&
                (O.isAnisotropicFiltering = !1);
              var ja = O.Uh || c.createTexture(),
                sa = null,
                Pa = !1,
                la = 0,
                Z = 0,
                ia = !1,
                X = !1,
                ma = !1,
                na = null,
                oa = null,
                Ia = null,
                sb = null,
                ab = null,
                Ya = null,
                Za = null,
                mb = O.isFlipY,
                mc = (m = O.S && O.isMipmap) && Ib.Jk(),
                yb = m && !mc ? !0 : !1,
                Hb = null,
                Nb = -1,
                ec = -1,
                xb = !1,
                Eb = !1,
                Fb = (ka = null);
              O.width && ((la = O.width), (Z = O.height ? O.height : la));
              var Ma = {
                get: function () {
                  return ja;
                },
                N: function () {
                  return la;
                },
                X: function () {
                  return Z;
                },
                am: function () {
                  return O.url;
                },
                ni: function () {
                  return O.isFloat;
                },
                oi: function () {
                  return O.S;
                },
                Qp: function () {
                  return O.isLinear;
                },
                ud: function () {
                  c.generateMipmap(c.TEXTURE_2D);
                },
                Ak: function (aa, ta) {
                  yb
                    ? (aa || (aa = Ma.Qh()), B.ye(ta), a(Hb[aa]), (n[ta] = -1))
                    : Ma.g(ta);
                },
                Qh: function () {
                  -1 === Nb && (Nb = Math.log(la) / Math.log(2));
                  return Nb;
                },
                xl: function (aa) {
                  aa || (aa = Ma.Qh());
                  if (yb) {
                    ba.set('s12');
                    B.ye(0);
                    for (var ta = la, ya = Z, J = 1; J <= aa; ++J)
                      (ta /= 2),
                        (ya /= 2),
                        ba.M('u10', 0.25 / ta, 0.25 / ya),
                        c.viewport(0, 0, ta, ya),
                        a(Hb[J - 1]),
                        c.framebufferTexture2D(
                          Ba.yd(),
                          c.COLOR_ATTACHMENT0,
                          c.TEXTURE_2D,
                          Hb[J],
                          0
                        ),
                        Y.l(!1, 1 === J);
                    n[0] = -1;
                  } else
                    aa !== ec &&
                      ((ec = aa),
                      c.TEXTURE_MAX_LEVEL &&
                        c.texParameteri(c.TEXTURE_2D, c.TEXTURE_MAX_LEVEL, aa)),
                      Ma.ud();
                },
                oq: function (aa) {
                  (P = !(
                    Array.isArray(aa) ||
                    aa.constructor === Float32Array ||
                    aa.constructor === Uint8Array
                  ))
                    ? ((Pa = null), (O.ia = aa), u())
                    : (Pa = aa);
                },
                g: function (aa) {
                  if (!ia) return !1;
                  B.ye(aa);
                  if (n[aa] === N) return !1;
                  a(ja);
                  n[aa] = N;
                  return !0;
                },
                Pa: function (aa) {
                  c.activeTexture(l[aa]);
                  q = aa;
                  a(ja);
                  n[aa] = N;
                },
                o: function () {
                  r = Ma;
                  c.framebufferTexture2D(
                    Ba.yd(),
                    c.COLOR_ATTACHMENT0,
                    c.TEXTURE_2D,
                    ja,
                    0
                  );
                },
                O: function () {
                  r = Ma;
                  c.viewport(0, 0, la, Z);
                  c.framebufferTexture2D(
                    Ba.yd(),
                    c.COLOR_ATTACHMENT0,
                    c.TEXTURE_2D,
                    ja,
                    0
                  );
                },
                he: B.he,
                On: function (aa, ta) {
                  la = aa;
                  Z = ta;
                },
                resize: function (aa, ta) {
                  Ma.On(aa, ta);
                  R();
                },
                clone: function (aa) {
                  aa = B.instance({
                    width: la,
                    height: Z,
                    S: O.S,
                    isFloat: O.isFloat,
                    isLinear: O.isLinear,
                    isMirrorY: O.isMirrorY,
                    isFlipY: aa ? !mb : mb,
                    isPot: O.isPot,
                  });
                  pb.set('s0');
                  Ba.ca();
                  aa.o();
                  c.viewport(0, 0, la, Z);
                  Ma.g(0);
                  Y.l(!0, !0);
                  return aa;
                },
                Sc: function () {
                  c.viewport(0, 0, la, Z);
                },
                remove: function () {
                  c.deleteTexture(ja);
                  X = !0;
                  x.splice(x.indexOf(Ma), 1);
                  Ma = null;
                },
                refresh: function () {
                  Ma.Pa(0);
                  mb && c.pixelStorei(c.UNPACK_FLIP_Y_WEBGL, !0);
                  P
                    ? c.texImage2D(c.TEXTURE_2D, 0, ab, Ya, Za, O.ia)
                    : c.texImage2D(c.TEXTURE_2D, 0, ab, la, Z, 0, Ya, Za, Pa);
                  mb && c.pixelStorei(c.UNPACK_FLIP_Y_WEBGL, !1);
                },
                Ri: function () {
                  ma || ea();
                  c.readPixels(0, 0, la, 4 * Z, c.RGBA, c.UNSIGNED_BYTE, Ia);
                  Q();
                  return na;
                },
                kn: function () {
                  ma || ea();
                  return Ea.fg(0, 0, la, 4 * Z, Ia).then(function () {
                    Q();
                    return na;
                  });
                },
                mn: function () {
                  Eb || ha();
                  c.readPixels(0, 0, la, Z, c.RGBA, c.UNSIGNED_BYTE, ka);
                  return Fb;
                },
                ln: function () {
                  Eb || ha();
                  return Ea.fg(0, 0, la, Z, ka);
                },
                sh: function (aa) {
                  Ba.aa();
                  ba.set('s13');
                  Ma.g(0);
                  if (aa)
                    c.viewport(0, 0, la, Z),
                      ba.$n('u11', 0.25, 0.25, 0.25, 0.25),
                      Y.l(!1, !0);
                  else
                    for (aa = 0; 4 > aa; ++aa)
                      c.viewport(0, Z * aa, la, Z),
                        ba.xa('u11', k[aa]),
                        Y.l(!1, 0 === aa);
                },
                Ng: function (aa) {
                  var ta;
                  if ((ta = Za === w[0]))
                    null !== E.sf
                      ? (ta = E.sf)
                      : ((ta = e(new Uint8Array([127, 127, 127, 127]), !1)),
                        (ta = null === ta ? !0 : (E.sf = ta))),
                      (ta = !ta);
                  a(ja);
                  mb && c.pixelStorei(c.UNPACK_FLIP_Y_WEBGL, !0);
                  ta
                    ? (ra ||
                        ((K = document.createElement('canvas')),
                        (K.width = la),
                        (K.height = Z),
                        (V = K.getContext('2d')),
                        V.createImageData(la, Z),
                        (ra = !0)),
                      null.data.set(aa),
                      V.putImageData(null, 0, 0),
                      c.texImage2D(c.TEXTURE_2D, 0, ab, Ya, Za, K))
                    : c.texImage2D(c.TEXTURE_2D, 0, ab, la, Z, 0, Ya, Za, aa);
                  n[q] = N;
                  mb && c.pixelStorei(c.UNPACK_FLIP_Y_WEBGL, !1);
                },
                Bq: function (aa, ta) {
                  a(ja);
                  ta && c.pixelStorei(c.UNPACK_FLIP_Y_WEBGL, !0);
                  c.texImage2D(c.TEXTURE_2D, 0, ab, Ya, Za, aa);
                  n[q] = N;
                  ta && c.pixelStorei(c.UNPACK_FLIP_Y_WEBGL, !1);
                },
                ac: function (aa, ta) {
                  var ya = la * Z,
                    J = 4 * ya;
                  aa = O.S ? (aa ? 'RGBE' : 'JSON') : 'RGBA';
                  ta && (aa = ta);
                  ta = Ea.ja() && !1;
                  var T = null;
                  switch (aa) {
                    case 'RGBE':
                      T = 's44';
                      break;
                    case 'JSON':
                      T = ta ? 's0' : 's13';
                      break;
                    case 'RGBA':
                    case 'RGBAARRAY':
                      T = 's7';
                  }
                  ma ||
                    ('RGBA' === aa || 'RGBE' === aa || 'RGBAARRAY' === aa
                      ? ((oa = new Uint8Array(J)), (ma = !0))
                      : 'JSON' !== aa || ta || ea());
                  Ba.aa();
                  ba.set(T);
                  Ma.g(0);
                  J = null;
                  if ('RGBA' === aa || 'RGBE' === aa || 'RGBAARRAY' === aa) {
                    c.viewport(0, 0, la, Z);
                    Y.l(!0, !0);
                    c.readPixels(0, 0, la, Z, c.RGBA, c.UNSIGNED_BYTE, oa);
                    if ('RGBAARRAY' === aa) return { data: oa };
                    g ||
                      ((A = document.createElement('canvas')),
                      (L = A.getContext('2d')),
                      (g = !0));
                    A.width = la;
                    A.height = Z;
                    ya = L.createImageData(la, Z);
                    ya.data.set(oa);
                    L.putImageData(ya, 0, 0);
                    J = A.toDataURL('image/png');
                  } else if ('JSON' === aa)
                    if (ta)
                      (J = new Float32Array(ya)),
                        c.viewport(0, 0, la, Z),
                        Y.l(!0, !0),
                        c.readPixels(0, 0, la, Z, c.RGBA, c.FLOAT, J);
                    else {
                      for (J = 0; 4 > J; ++J)
                        c.viewport(0, Z * J, la, Z),
                          ba.xa('u11', k[J]),
                          Y.l(!J, !J);
                      Ma.Ri();
                      J = Array(ya);
                      for (ta = 0; ta < ya; ++ta)
                        (J[4 * ta] = na[0][ta]),
                          (J[4 * ta + 1] = na[1][ta]),
                          (J[4 * ta + 2] = na[2][ta]),
                          (J[4 * ta + 3] = na[3][ta]);
                    }
                  return {
                    format: aa,
                    data: J,
                    width: la,
                    height: Z,
                    isMirrorY: O.isMirrorY,
                    isFlipY: 'RGBA' === aa ? O.isFlipY : !O.isFlipY,
                  };
                },
              };
              O.isMipmap && !yb && ia && !xb && (Ma.ud(), (xb = !0));
              if (O.url)
                a(ja),
                  c.texImage2D(
                    c.TEXTURE_2D,
                    0,
                    c.RGBA,
                    1,
                    1,
                    0,
                    c.RGBA,
                    c.UNSIGNED_BYTE,
                    null
                  ),
                  (sa = new Image()),
                  (sa.lp = 'Anonymous'),
                  (sa.crossOrigin = 'Anonymous'),
                  (sa.src = O.url),
                  (sa.onload = function () {
                    la = sa.width;
                    Z = sa.height;
                    R();
                  });
              else if (O.ia) {
                var Ob = function () {
                  u();
                  la ? R() : setTimeout(Ob, 1);
                };
                Ob();
              } else
                O.array
                  ? (O.S && !O.isFloat
                      ? O.array instanceof Uint16Array
                        ? ((Pa = O.array), R())
                        : d()
                        ? ((Pa = b(O.array)), R())
                        : (R(), B.Gh(c, ja, Ma.N(), Ma.X(), O.array, mb, !0))
                      : ((Pa = O.isFloat
                          ? O.array instanceof Float32Array
                            ? O.array
                            : new Float32Array(O.array)
                          : O.array instanceof Uint8Array
                          ? O.array
                          : new Uint8Array(O.array)),
                        R()),
                    O.isKeepArray ||
                      (Pa && Pa !== O.array && (Pa = null), delete O.array))
                  : O.Uh
                  ? (ia = !0)
                  : R();
              Ma.Hp = Ma.N;
              O.J && ia && (O.J(Ma), (O.J = null));
              x.push(Ma);
              return Ma;
            },
            aa: function (m) {
              m !== q && (c.activeTexture(l[m]), (q = m));
              n[m] = -1;
              a(null);
            },
            Ck: function (m) {
              t.random.g(m);
            },
            he: function () {
              r = null;
              c.framebufferTexture2D(
                Ba.yd(),
                c.COLOR_ATTACHMENT0,
                c.TEXTURE_2D,
                null,
                0
              );
            },
            reset: function () {
              0 !== q && c.activeTexture(l[0]);
              for (var m = 0; m < l.length; ++m) n[m] = -1;
              q = -1;
            },
            eq: function () {
              q = -1;
            },
            Ej: function () {
              for (var m = 0; m < l.length; ++m) B.aa(m);
            },
            L: function () {
              t && (t.random.remove(), t.Cj.remove());
            },
            Uc: function (m, u) {
              if ('RGBA' === m.format || 'RGBE' === m.format) {
                var F = new Image();
                F.src = m.data;
                F.onload = function () {
                  B.instance({
                    isMirrorY: m.isMirrorY,
                    isFlipY: m.isFlipY,
                    isFloat: !1,
                    ia: F,
                    J: function (R) {
                      if ('RGBA' === m.format) u(R);
                      else {
                        var Q = m.width,
                          ea = m.height,
                          ha = B.instance({
                            isMirrorY: m.isMirrorY,
                            isFloat: !0,
                            width: Q,
                            height: ea,
                            isFlipY: m.isFlipY,
                          });
                        Ba.ca();
                        c.viewport(0, 0, Q, ea);
                        ba.set('s45');
                        ha.o();
                        R.g(0);
                        Y.l(!0, !0);
                        B.aa(0);
                        u(ha);
                        Ea.flush();
                        setTimeout(R.remove, 50);
                      }
                    },
                  });
                };
              } else
                'JSON' === m.format
                  ? u(
                      B.instance({
                        isFloat: !0,
                        isFlipY: m.isFlipY,
                        width: m.width,
                        height: m.height,
                        array: new Float32Array(m.data),
                      })
                    )
                  : u(!1);
            },
            Pk: b,
            v: function () {
              r && (Ba.ca(), B.he(), Ba.aa());
              B.Ej();
              x.slice(0).forEach(function (m) {
                m.remove();
              });
              x.splice(0);
              H = !1;
              v = 0;
              'undefined' !== typeof Ib && Ib.v();
              t = null;
            },
          };
        return B;
      })(),
      Hc = {
        instance: function (a) {
          var b = [ca.instance(a), ca.instance(a)],
            d = [b[1], b[0]],
            e = d,
            q = {
              fj: function (l) {
                e[1].o();
                e[0].g(l);
                q.rj();
              },
              Jn: function (l) {
                e[1].O();
                e[0].g(l);
                q.rj();
              },
              rj: function () {
                e = e === b ? d : b;
              },
              refresh: function () {
                e[0].refresh();
                e[1].refresh();
              },
              g: function (l) {
                e[0].g(l);
              },
              Pa: function (l) {
                e[0].Pa(l);
              },
              Bk: function (l) {
                e[1].g(l);
              },
              Cp: function () {
                return e[0];
              },
              Fp: function () {
                return e[1];
              },
              Ng: function (l) {
                e[0].Ng(l);
                e[1].Ng(l);
              },
              remove: function () {
                e[0].remove();
                e[1].remove();
                e = null;
              },
              sync: function () {
                q.Jn(0);
                ba.set('s0');
                Y.l(!1, !1);
              },
            };
          return q;
        },
      },
      Y = (function () {
        function a(t) {
          var r = { ha: null, indices: null };
          r.ha = t.createBuffer();
          t.bindBuffer(t.ARRAY_BUFFER, r.ha);
          t.bufferData(
            t.ARRAY_BUFFER,
            new Float32Array([-1, -1, 3, -1, -1, 3]),
            t.STATIC_DRAW
          );
          r.indices = t.createBuffer();
          t.bindBuffer(t.ELEMENT_ARRAY_BUFFER, r.indices);
          t.bufferData(
            t.ELEMENT_ARRAY_BUFFER,
            new Uint16Array([0, 1, 2]),
            t.STATIC_DRAW
          );
          return r;
        }
        var b = null,
          d = 0,
          e = !1,
          q = [],
          l = -2,
          v = -2,
          n = {
            reset: function () {
              v = l = -2;
            },
            m: function () {
              e || ((b = a(c)), n.fd(), (e = !0));
            },
            instance: function (t) {
              var r = d++,
                w = t.indices ? t.indices.length : 0,
                D = 'undefined' === typeof t.mode ? c.STATIC_DRAW : t.mode,
                z = c.createBuffer();
              c.bindBuffer(c.ARRAY_BUFFER, z);
              c.bufferData(
                c.ARRAY_BUFFER,
                t.ha instanceof Float32Array ? t.ha : new Float32Array(t.ha),
                D
              );
              l = r;
              var H = null,
                x = null,
                f = null;
              if (t.indices) {
                H = c.createBuffer();
                c.bindBuffer(c.ELEMENT_ARRAY_BUFFER, H);
                var g = null;
                65536 > t.indices.length
                  ? ((g = Uint16Array), (x = c.UNSIGNED_SHORT), (f = 2))
                  : ((g = Uint32Array), (x = c.UNSIGNED_INT), (f = 4));
                g = t.indices instanceof g ? t.indices : new g(t.indices);
                c.bufferData(c.ELEMENT_ARRAY_BUFFER, g, D);
                v = r;
              }
              var A = {
                xc: function (L) {
                  l !== r && (c.bindBuffer(c.ARRAY_BUFFER, z), (l = r));
                  L && pb.Zd();
                },
                yk: function () {
                  v !== r && (c.bindBuffer(c.ELEMENT_ARRAY_BUFFER, H), (v = r));
                },
                bind: function (L) {
                  A.xc(L);
                  A.yk();
                },
                U: function () {
                  c.drawElements(c.TRIANGLES, w, x, 0);
                },
                Ga: function (L, k) {
                  c.drawElements(c.TRIANGLES, L, x, k * f);
                },
                remove: function () {
                  c.deleteBuffer(z);
                  t.indices && c.deleteBuffer(H);
                  A = null;
                },
              };
              q.push(A);
              return A;
            },
            fd: function () {
              -1 !== l && (c.bindBuffer(c.ARRAY_BUFFER, b.ha), (l = -1));
              -1 !== v &&
                (c.bindBuffer(c.ELEMENT_ARRAY_BUFFER, b.indices), (v = -1));
            },
            l: function (t, r) {
              t && Y.fd();
              r && pb.dc();
              c.drawElements(c.TRIANGLES, 3, c.UNSIGNED_SHORT, 0);
            },
            Lb: function (t) {
              t = t || c;
              var r = a(t);
              t.bindBuffer(t.ARRAY_BUFFER, r.ha);
              t.bindBuffer(t.ELEMENT_ARRAY_BUFFER, r.indices);
              pb.ec(t);
              t.clear(t.COLOR_BUFFER_BIT);
              t.drawElements(t.TRIANGLES, 3, t.UNSIGNED_SHORT, 0);
              t.flush();
              t.bindBuffer(t.ARRAY_BUFFER, null);
              t.bindBuffer(t.ELEMENT_ARRAY_BUFFER, null);
              t.deleteBuffer(r.ha);
              t.deleteBuffer(r.indices);
              n.reset();
              e && (n.fd(), pb.dc());
            },
            L: function () {
              var t = c,
                r = b;
              t.deleteBuffer(r.ha);
              t.deleteBuffer(r.indices);
            },
            v: function () {
              n.L();
              q.forEach(function (t) {
                t.remove();
              });
              c.bindBuffer(c.ARRAY_BUFFER, null);
              c.bindBuffer(c.ELEMENT_ARRAY_BUFFER, null);
              n.reset();
              e = !1;
              q.splice(0);
              d = 0;
            },
          };
        return n;
      })(),
      Ba = (function () {
        var a = null,
          b = null,
          d = null,
          e = !1,
          q = [],
          l = { ma: -2, Fh: 1 },
          v = {
            Vb: function () {
              return e;
            },
            m: function () {
              if (!e) {
                a = c.createFramebuffer();
                var n = Ea.ja();
                b =
                  n && c.DRAW_FRAMEBUFFER ? c.DRAW_FRAMEBUFFER : c.FRAMEBUFFER;
                d =
                  n && c.READ_FRAMEBUFFER ? c.READ_FRAMEBUFFER : c.FRAMEBUFFER;
                e = !0;
              }
            },
            Fl: function () {
              return b;
            },
            Mh: function () {
              return d;
            },
            yd: function () {
              return c.FRAMEBUFFER;
            },
            Gp: function () {
              return l;
            },
            vp: function () {
              return a;
            },
            instance: function (n) {
              void 0 === n.Fc && (n.Fc = !1);
              var t = n.ka ? n.ka : null,
                r = n.width,
                w = void 0 !== n.height ? n.height : n.width,
                D = a,
                z = null,
                H = !1,
                x = !1,
                f = 0;
              t && ((r = r ? r : t.N()), (w = w ? w : t.X()));
              var g = {
                $i: function () {
                  H || ((D = c.createFramebuffer()), (H = !0), (f = l.Fh++));
                },
                ad: function () {
                  g.$i();
                  g.o();
                  z = c.createRenderbuffer();
                  c.bindRenderbuffer(c.RENDERBUFFER, z);
                  c.renderbufferStorage(
                    c.RENDERBUFFER,
                    c.DEPTH_COMPONENT16,
                    r,
                    w
                  );
                  c.framebufferRenderbuffer(
                    b,
                    c.DEPTH_ATTACHMENT,
                    c.RENDERBUFFER,
                    z
                  );
                  c.clearDepth(1);
                },
                bind: function (A, L) {
                  f !== l.ma && (c.bindFramebuffer(b, D), (l.ma = f));
                  t && t.o();
                  L && c.viewport(0, 0, r, w);
                  A && c.clear(c.COLOR_BUFFER_BIT | c.DEPTH_BUFFER_BIT);
                },
                ah: function () {
                  f !== l.ma && (c.bindFramebuffer(b, D), (l.ma = f));
                },
                clear: function () {
                  c.clear(c.COLOR_BUFFER_BIT | c.DEPTH_BUFFER_BIT);
                },
                He: function () {
                  c.clear(c.COLOR_BUFFER_BIT);
                },
                hh: function () {
                  c.clear(c.DEPTH_BUFFER_BIT);
                },
                Sc: function () {
                  c.viewport(0, 0, r, w);
                },
                o: function () {
                  f !== l.ma && (c.bindFramebuffer(b, D), (l.ma = f));
                },
                rtt: function (A) {
                  t = A;
                  l.ma !== f &&
                    (c.bindFramebuffer(c.FRAMEBUFFER, D), (l.ma = f));
                  A.o();
                },
                aa: function () {
                  c.bindFramebuffer(b, null);
                  l.ma = -1;
                },
                resize: function (A, L) {
                  r = A;
                  w = L;
                  z &&
                    (c.bindRenderbuffer(c.RENDERBUFFER, z),
                    c.renderbufferStorage(
                      c.RENDERBUFFER,
                      c.DEPTH_COMPONENT16,
                      r,
                      w
                    ));
                },
                remove: function () {
                  D === a ||
                    x ||
                    (c.bindFramebuffer(b, D),
                    c.framebufferTexture2D(
                      b,
                      c.COLOR_ATTACHMENT0,
                      c.TEXTURE_2D,
                      null,
                      0
                    ),
                    z &&
                      c.framebufferRenderbuffer(
                        b,
                        c.DEPTH_ATTACHMENT,
                        c.RENDERBUFFER,
                        null
                      ),
                    c.bindFramebuffer(b, null),
                    c.deleteFramebuffer(D),
                    z && c.deleteRenderbuffer(z));
                  x = !0;
                },
              };
              n.Fc && g.ad();
              q.push(g);
              return g;
            },
            aa: function () {
              c.bindFramebuffer(b, null);
              l.ma = -1;
            },
            zq: function () {
              c.bindFramebuffer(b, null);
              c.clear(c.COLOR_BUFFER_BIT | c.DEPTH_BUFFER_BIT);
              Ea.oj();
              l.ma = -1;
            },
            reset: function () {
              l.ma = -2;
            },
            ca: function () {
              0 !== l.ma && (c.bindFramebuffer(b, a), (l.ma = 0));
            },
            clear: function () {
              Ea.oj();
              c.clear(c.COLOR_BUFFER_BIT);
            },
            v: function () {
              v.aa();
              q.forEach(function (n) {
                n.remove();
              });
              null !== a && (c.deleteFramebuffer(a), (a = null));
              v.reset();
              e = !1;
              q.splice(0);
              l.Fh = 1;
            },
          };
        return v;
      })(),
      Ea = (function () {
        function a() {
          n = 'undefined' === typeof gb ? da : gb;
          t = !0;
        }
        function b(k, p) {
          for (var h = 0; h < k.length; ++h) {
            var G = p.getExtension(k[h]);
            if (G) return G;
          }
          return null;
        }
        function d() {
          null !== g.ge && (clearTimeout(g.ge), (g.ge = null));
          g.Qb = !1;
        }
        function e(k) {
          if (0 === g.tb.length) {
            g.za = c.PIXEL_PACK_BUFFER;
            g.tb.splice(0);
            g.zd.splice(0);
            for (var p = 0; p < g.zc; ++p)
              g.tb.push(c.createBuffer()), g.zd.push(-1);
            g.Ra = 0;
            g.Tf = 0;
          }
          c.bindBuffer(g.za, g.tb[g.Ra]);
          k.byteLength !== g.zd[g.Ra] &&
            (c.bufferData(g.za, k.byteLength, c.STREAM_READ),
            (g.zd[g.Ra] = k.byteLength));
          g.Mp = !0;
        }
        function q() {
          c.bindBuffer(g.za, null);
        }
        function l() {
          g.Ob.forEach(function (k) {
            c.deleteSync(k);
          });
          g.Ob.splice(0);
        }
        function v() {
          g.Ra = (g.Ra + 1) % g.zc;
          ++g.Tf;
        }
        var n = null,
          t = !1,
          r = {
            ei: !1,
            Fg: null,
            Gg: null,
            ki: !1,
            xm: !1,
            Hg: null,
            li: !1,
            Ig: null,
            fi: !1,
            Ie: null,
            om: !1,
            Je: null,
            pm: !1,
          },
          w = null,
          D = { Ta: !0, Va: !0, Ye: !0, Qi: !1 },
          z = null,
          H = !0,
          x = null,
          f = null,
          g = {
            Qk: 1,
            zc: -1,
            Ra: 0,
            Tf: 0,
            Qb: !1,
            tb: [],
            Ob: [],
            zd: [],
            za: null,
            ge: null,
          },
          A = 'undefined' === typeof window ? {} : window,
          L = {
            m: function () {
              if (t) return !0;
              L.reset();
              t || a();
              var k = c;
              if (!w.ei) {
                w.Fg = L.Ch(k);
                A.GL_EXT_FLOAT = w.Fg;
                w.ki = w.Fg ? !0 : !1;
                if (w.ki || L.ja())
                  (w.Gg = L.Dh(k)),
                    (w.xm = w.Gg ? !0 : !1),
                    (A.GL_EXT_FLOATLINEAR = w.Gg);
                w.ei = !0;
              }
              if (!w.fi) {
                w.Hg = L.qd(k);
                w.Hg && ((w.li = !0), (A.GL_EXT_HALFFLOAT = w.Hg));
                if (w.li || L.ja())
                  (w.Ig = L.Eh(k)), (A.GL_EXT_HALFFLOATLINEAR = w.Ig);
                w.Op = w.Ig ? !0 : !1;
                w.fi = !0;
              }
              w.Ie = L.Ah(k);
              w.om = w.Ie ? !0 : !1;
              A.GL_EXT_COLORBUFFERFLOAT = w.Ie;
              w.Je = L.Bh(k);
              w.pm = w.Je ? !0 : !1;
              A.GL_EXT_COLORBUFFERHALFFLOAT = w.Je;
              Ba.m();
              ca.m();
              if (!L.bl()) return !1;
              Y.m();
              ca.im();
              return !0;
            },
            reset: function () {
              w = Object.assign({}, r);
              z = Object.assign({}, D);
            },
            N: function () {
              t || a();
              return n.N();
            },
            X: function () {
              t || a();
              return n.X();
            },
            ja: function () {
              t || a();
              return n.ja();
            },
            zh: function (k) {
              L.Ah(k);
              L.Bh(k);
              L.Ch(k);
              L.Dh(k);
              L.qd(k);
              L.Eh(k);
            },
            Ah: b.bind(null, [
              'EXT_color_buffer_float',
              'WEBGL_color_buffer_float',
              'OES_color_buffer_float',
            ]),
            Bh: b.bind(null, [
              'EXT_color_buffer_half_float',
              'WEBGL_color_buffer_half_float',
              'OES_color_buffer_half_float',
            ]),
            Ch: b.bind(null, [
              'OES_texture_float',
              'MOZ_OES_texture_float',
              'WEBKIT_OES_texture_float',
            ]),
            Dh: b.bind(null, [
              'OES_texture_float_linear',
              'MOZ_OES_texture_float_linear',
              'WEBKIT_OES_texture_float_linear',
            ]),
            qd: b.bind(null, [
              'OES_texture_half_float',
              'MOZ_OES_texture_half_float',
              'WEBKIT_OES_texture_half_float',
            ]),
            Eh: b.bind(null, [
              'OES_texture_half_float_linear',
              'MOZ_OES_texture_half_float_linear',
              'WEBKIT_OES_texture_half_float_linear',
            ]),
            cf: function (k) {
              var p = L.qd(k);
              return p && p.HALF_FLOAT_OES
                ? p.HALF_FLOAT_OES
                : k.HALF_FLOAT || k.FLOAT;
            },
            Gl: function () {
              return f || c.RGBA32F || c.RGBA;
            },
            Hl: function () {
              return x || c.RGBA16F || c.RGBA;
            },
            Al: function () {
              return z;
            },
            fa: function () {
              return z.Ta;
            },
            gp: function () {
              return z.Va;
            },
            Ik: function () {
              return z.Ye;
            },
            Lk: function () {
              return z.Qi && H;
            },
            Bj: function (k) {
              H = k;
              !k && g.Qb && (l(), c.bindBuffer(g.za, null), (g.Qb = !1));
            },
            Rp: function () {
              return g.Qb;
            },
            ee: function (k, p, h) {
              function G() {
                k.bindTexture(k.TEXTURE_2D, null);
                k.bindFramebuffer(I, null);
                k.deleteTexture(m);
                k.deleteFramebuffer(B);
              }
              var I = k.FRAMEBUFFER,
                E = k.NEAREST,
                B = k.createFramebuffer();
              k.bindFramebuffer(I, B);
              var m = k.createTexture();
              k.activeTexture(k.TEXTURE0);
              k.bindTexture(k.TEXTURE_2D, m);
              k.pixelStorei(k.UNPACK_FLIP_Y_WEBGL, !1);
              k.texParameteri(k.TEXTURE_2D, k.TEXTURE_WRAP_S, k.CLAMP_TO_EDGE);
              k.texParameteri(k.TEXTURE_2D, k.TEXTURE_WRAP_T, k.CLAMP_TO_EDGE);
              k.texParameteri(k.TEXTURE_2D, k.TEXTURE_MAG_FILTER, E);
              k.texParameteri(k.TEXTURE_2D, k.TEXTURE_MIN_FILTER, E);
              k.texImage2D(k.TEXTURE_2D, 0, p, 3, 3, 0, k.RGBA, h, null);
              k.framebufferTexture2D(
                k.FRAMEBUFFER,
                k.COLOR_ATTACHMENT0,
                k.TEXTURE_2D,
                m,
                0
              );
              if (
                k.checkFramebufferStatus(
                  k.READ_FRAMEBUFFER || k.FRAMEBUFFER
                ) !== k.FRAMEBUFFER_COMPLETE
              )
                return G(), !1;
              pb.Xd(k);
              k.clearColor(0, 0, 0, 0);
              k.viewport(0, 0, 3, 3);
              k.disable(k.DEPTH_TEST);
              k.clear(k.COLOR_BUFFER_BIT);
              Y.Lb(k);
              k.bindFramebuffer(I, null);
              pb.wb(k);
              k.activeTexture(k.TEXTURE0);
              k.bindTexture(k.TEXTURE_2D, m);
              Y.Lb(k);
              p = new Uint8Array(36);
              k.readPixels(0, 0, 3, 3, k.RGBA, k.UNSIGNED_BYTE, p);
              G();
              for (h = 0; 36 > h; ++h)
                if (3 !== h % 4 && 3 < Math.abs(p[h] - 127)) return !1;
              return !0;
            },
            Qe: function (k) {
              var p = { Ta: !1, Va: !1 };
              k.disable(k.BLEND);
              k.clearColor(0, 0, 0, 0);
              k.clear(k.COLOR_BUFFER_BIT);
              k.RGBA32F &&
                L.ee(k, k.RGBA32F, k.FLOAT) &&
                ((p.Ta = !0), (f = k.RGBA32F));
              !p.Ta && L.ee(k, k.RGBA, k.FLOAT) && ((p.Ta = !0), (f = k.RGBA));
              var h = L.cf(k);
              x = null;
              k.RGBA16F &&
                L.ee(k, k.RGBA16F, h) &&
                ((p.Va = !0), (x = k.RGBA16F));
              !p.Va && L.ee(k, k.RGBA, h) && ((p.Va = !0), (x = k.RGBA));
              return p;
            },
            dl: function () {
              var k = Ba.instance({ width: 2 });
              k.$i();
              var p = ca.instance({ width: 2, isFloat: !0, F: 3 });
              k.o();
              p.o();
              L.flush();
              c.checkFramebufferStatus(Ba.Mh()) !== c.FRAMEBUFFER_COMPLETE
                ? (ca.Vn(), (z.Ye = !1))
                : (z.Ye = !0);
              k.remove();
              p.remove();
            },
            el: function () {
              var k = !1;
              L.ja() &&
                (k =
                  'PIXEL_PACK_BUFFER STREAM_READ SYNC_GPU_COMMANDS_COMPLETE WAIT_FAILED fenceSync deleteSync createBuffer'
                    .split(' ')
                    .every(function (p) {
                      return 'undefined' !== typeof c[p];
                    }));
              z.Qi = k;
            },
            bl: function () {
              var k = L.Qe(c);
              Object.assign(z, k);
              if (!z.Ta && !z.Va) return !1;
              L.dl();
              L.el();
              return !0;
            },
            nn: function (k, p, h, G, I) {
              c.readPixels(k, p, h, G, c.RGBA, c.UNSIGNED_BYTE, I);
              return Promise.resolve(I, !1);
            },
            fg: function (k, p, h, G, I, E, B) {
              if (!L.Lk()) return L.nn(k, p, h, G, I);
              g.zc = B || g.Qk;
              e(I);
              c.readPixels(k, p, h, G, c.RGBA, c.UNSIGNED_BYTE, 0);
              g.Ob[g.Ra] = c.fenceSync(c.SYNC_GPU_COMMANDS_COMPLETE, 0);
              L.flush();
              var m = !1;
              return new Promise(function (u, F) {
                function R() {
                  if (!g.Qb) return d(), q(), v(), F(), !1;
                  var Q = (g.Ra + 1) % g.zc;
                  switch (c.clientWaitSync(g.Ob[Q], 0, 0)) {
                    case c.TIMEOUT_EXPIRED:
                    case c.WAIT_FAILED:
                      break;
                    default:
                      return (
                        d(),
                        c.deleteSync(g.Ob[Q]),
                        (g.Ob[Q] = null),
                        c.bindBuffer(g.za, g.tb[Q]),
                        c.getBufferSubData(g.za, 0, I),
                        q(),
                        v(),
                        u(I, m),
                        !0
                      );
                  }
                  g.ge = setTimeout(R, 0);
                  return !1;
                }
                d();
                g.Tf + 1 < g.zc
                  ? (q(), v(), u(I, !1))
                  : ((g.Qb = !0), R() || !E || m || ((m = !0), E()));
              });
            },
            oj: function () {
              c.viewport(0, 0, L.N(), L.X());
            },
            flush: function () {
              c.flush();
            },
            v: function () {
              d();
              l();
              ca.v();
              Ba.v();
              Y.v();
              g.tb.forEach(function (k) {
                c.deleteBuffer(k);
              });
              g.tb.splice(0);
              pb.reset();
              t = !1;
            },
          };
        return L;
      })(),
      Ib = (function () {
        function a(h, G, I, E) {
          g.texParameteri(
            g.TEXTURE_2D,
            g.TEXTURE_MIN_FILTER,
            E ? g.NEAREST_MIPMAP_NEAREST : g.LINEAR
          );
          var B = null;
          if (null !== I)
            try {
              B = g.getError();
              if ('FUCKING_BIG_ERROR' === B) return !1;
              g.texImage2D(g.TEXTURE_2D, 0, h, 4, 4, 0, g.RGBA, G, I);
              B = g.getError();
              if (B !== g.NO_ERROR) return !1;
            } catch (m) {
              return !1;
            }
          E && g.generateMipmap(g.TEXTURE_2D);
          g.clear(g.COLOR_BUFFER_BIT);
          Y.Lb(g);
          B = g.getError();
          if ('FUCKING_BIG_ERROR' === B) return !1;
          g.readPixels(0, 0, 2, 2, g.RGBA, g.UNSIGNED_BYTE, w);
          B = g.getError();
          B === g.INVALID_OPERATION &&
            'undefined' !== typeof g.PIXEL_PACK_BUFFER &&
            (g.bindBuffer(g.PIXEL_PACK_BUFFER, null),
            g.readPixels(0, 0, 2, 2, g.RGBA, g.UNSIGNED_BYTE, w),
            (B = g.getError()));
          if (B !== g.NO_ERROR) return !1;
          I = !0;
          for (E = 0; 16 > E; ++E) I = I && 4 > Math.abs(w[E] - 127);
          I && ((t.Mi = G), (t.ci = h));
          return I;
        }
        function b(h, G) {
          return A.Ta && a(h, g.FLOAT, new Float32Array(D), G)
            ? ((n = v.Yg), !0)
            : !1;
        }
        function d(h, G, I) {
          if (!A.Va) return !1;
          var E = ca.Pk(D),
            B = Ea.qd(g);
          if (
            (B && B.HALF_FLOAT_OES && a(h, B.HALF_FLOAT_OES, E, G)) ||
            (g.HALF_FLOAT && a(h, g.HALF_FLOAT, E, G))
          )
            return (n = v.rc), !0;
          E = new Float32Array(D);
          if (a(h, g.FLOAT, E, G)) return (n = v.rc), !0;
          g.bindTexture(g.TEXTURE_2D, I);
          g.texImage2D(
            g.TEXTURE_2D,
            0,
            g.RGBA,
            2,
            2,
            0,
            g.RGBA,
            g.UNSIGNED_BYTE,
            null
          );
          g.bindFramebuffer(t.ld, p);
          ca.Gh(g, I, 2, 2, E, !1, !1);
          g.bindFramebuffer(t.ld, null);
          g.bindTexture(g.TEXTURE_2D, I);
          return a(h, null, null, G) ? ((n = v.rc), !0) : !1;
        }
        function e(h, G, I) {
          r = !0;
          if (d(h, !0, I) || b(G, !0)) return !0;
          r = !1;
          return d(h, !1, I) || b(G, !1) ? !0 : !1;
        }
        function q(h) {
          if (n === v.H) {
            g = h || c;
            n = v.RGBA8;
            r = !0;
            Ea.zh(g);
            A || (A = Ea.Qe(g));
            Ba.reset();
            p = g.createFramebuffer();
            t.ld = g.DRAW_FRAMEBUFFER || g.FRAMEBUFFER;
            g.bindFramebuffer(t.ld, null);
            g.clearColor(0, 0, 0, 0);
            g.viewport(0, 0, 2, 2);
            ba.H();
            L = ba.wb(g);
            h = g.createTexture();
            g.activeTexture(g.TEXTURE0);
            g.bindTexture(g.TEXTURE_2D, h);
            g.texParameteri(g.TEXTURE_2D, g.TEXTURE_WRAP_S, g.REPEAT);
            g.texParameteri(g.TEXTURE_2D, g.TEXTURE_WRAP_T, g.REPEAT);
            g.texParameteri(g.TEXTURE_2D, g.TEXTURE_MAG_FILTER, g.NEAREST);
            k = h;
            var G = (h = g.RGBA),
              I = g.RGBA16F,
              E = g.RGBA32F;
            E && (h = E);
            I && (G = I);
            if ((I || E) && e(G, h, k)) return l(), !0;
            h = G = g.RGBA;
            if (e(G, h, k)) return l(), !0;
            n = v.RGBA8;
            l();
            return !1;
          }
        }
        function l() {
          g.deleteProgram(L.na);
          g.deleteTexture(k);
          k = L = null;
        }
        for (
          var v = { H: -1, Yg: 3, rc: 2, RGBA8: 0 },
            n = v.H,
            t = { Mi: null, ci: null, ld: null },
            r = !0,
            w = new Uint8Array(16),
            D = Array(64),
            z = 0;
          4 > z;
          ++z
        )
          for (var H = 0; 4 > H; ++H) {
            var x = 0 === (H + z) % 2 ? 1 : 0,
              f = 4 * z + H;
            D[4 * f] = x;
            D[4 * f + 1] = x;
            D[4 * f + 2] = x;
            D[4 * f + 3] = x;
          }
        var g = null,
          A = null,
          L = null,
          k = null,
          p = null;
        return {
          Jk: function (h) {
            q(h);
            return r;
          },
          fh: function (h, G) {
            n === v.H && (typeof ('undefined' !== G) && (A = G), q(h));
            return n !== v.RGBA8;
          },
          Pp: function (h) {
            q(h);
            return n === v.Yg;
          },
          Am: function (h) {
            q(h);
            return n === v.rc;
          },
          Bp: function (h) {
            q(h);
            return t.Mi;
          },
          Il: function (h) {
            q(h);
            return t.ci;
          },
          v: function () {
            g = null;
            r = !0;
            n = v.H;
            A = null;
          },
        };
      })(),
      Uc = {
        instance: function (a) {
          var b = null,
            d = !1,
            e = !1,
            q = null,
            l = !1,
            v = !1,
            n = null,
            t = 'undefined' === typeof a.preprocessing ? !1 : a.preprocessing,
            r =
              'undefined' === typeof a.preprocessingSize
                ? a.size
                : a.preprocessingSize;
          a.mask &&
            ((d = !0),
            M && void 0 !== M.ba && (a.mask = M.ba + a.mask),
            (b = ca.instance({ isFloat: !1, url: a.mask })));
          var w = !1;
          a.customInputShader &&
            ((w = 's46'),
            ba.oa({
              name: '_',
              id: w,
              h: a.customInputShader,
              Aq: ['uSource'],
              precision: 'lowp',
            }),
            ba.j(w, [{ type: '1i', name: '_', value: 0 }]));
          switch (t) {
            case 'sobel':
              n = 's33';
              l = !0;
              break;
            case 'meanNormalization':
              n = 's34';
              l = !0;
              break;
            case 'grayScale':
              n = 's30';
              l = !1;
              break;
            case 'grayScaleTilt':
              n = 's31';
              v = !0;
              l = !1;
              break;
            case 'rgbGrayTilt':
              n = 's32';
              v = !0;
              l = !1;
              break;
            case 'copy':
              n = w ? w : 's0';
              break;
            case 'inputLightRegulation':
              n = w ? w : 's30';
              q = id.instance({ bi: r, Gi: a.size, Bi: a.nBlurPass, Aa: !1 });
              e = !0;
              break;
            case 'inputMix0':
              n = 'none';
              q = jd.instance({
                Y: r,
                eb: a.varianceMin,
                Qa: a.blurKernelSizePx,
                gain: a.gain || 1,
                Aa: !1,
              });
              e = !0;
              break;
            case 'inputMix1':
              n = 'none';
              q = kd.instance({
                Y: r,
                eb: a.varianceMin,
                Qa: a.blurKernelSizePx,
                gain: a.gain || 1,
                Aa: !1,
              });
              e = !0;
              break;
            case 'inputCut4':
              n = 'none';
              q = ld.instance({
                Y: r,
                eb: a.varianceMin,
                Qa: a.blurKernelSizePx,
                gain: a.gain || 1,
                Gc: a.isNormalized || !1,
                $f: a.overlap || 0,
                Aa: !1,
              });
              r *= q.Jl();
              e = !0;
              break;
            case 'direct':
            case 'none':
              n = 'abort';
              break;
            default:
              n = 's4';
          }
          r = Math.ceil(r);
          v && ba.j(n, [{ name: 'u27', type: '1f', value: a.tilt }]);
          d && (n += 'Mask');
          var D = ca.instance({ isFloat: !1, isPot: !1, width: a.size }),
            z = {
              N: function () {
                return a.size;
              },
              Kl: function () {
                return r;
              },
              df: function () {
                return z.N();
              },
              Ol: function () {
                return e ? q.Dc() : D;
              },
              wa: function (H) {
                Ba.ca();
                'abort' !== n &&
                  ('none' !== n &&
                    (ba.set(n),
                    l && ba.G('u28', 1 / a.size),
                    D.O(),
                    d && b.g(1),
                    Y.l(!1, !1),
                    D.g(0),
                    (H = D)),
                  e && q.process(H));
              },
              v: function () {
                D.remove();
                d && b.remove();
              },
            };
          return z;
        },
      },
      Vc = {
        instance: function (a) {
          function b(G) {
            q.forEach(function (I, E) {
              l[E][0] = G[0][I];
              l[E][1] = G[1][I];
              l[E][2] = G[2][I];
              l[E][3] = G[3][I];
            });
            return l;
          }
          a.normalize = a.normalize || !1;
          var d = {
              input: null,
              bias: null,
              uf: null,
              Zb: null,
              Yf: null,
              Wf: null,
              Xf: null,
            },
            e = null,
            q = [],
            l = [],
            v = !1,
            n = null,
            t = !0,
            r = -1,
            w = a.isReorganize ? a.isReorganize : !1,
            D = a.kernelsCount ? !0 : !1,
            z = ['s27', 's28', 's29'][a.shiftRGBAMode || 0],
            H = { isEnabled: !1 };
          a.um
            ? ((a.sparsity =
                'undefined' !== typeof a.sparsity ? a.sparsity : a.Td.df()),
              (t = !1))
            : 'full' === a.connectivityUp && (a.sparsity = a.Td.df());
          var x = {
              elu: 's16',
              elu01: 's17',
              relu: 's15',
              arctan: 's18',
              arctan2: 's19',
              sigmoid: 's14',
              copy: 's0',
            }[a.activation],
            f = a.sparsity * a.sparsity,
            g = !1,
            A = a.size,
            L = '';
          if (a.maxPooling) {
            switch (a.maxPooling.size) {
              case 2:
                L = 's35';
                break;
              case 4:
                L = 's36';
            }
            g = !0;
            A /= a.maxPooling.size;
            d.Wf = ca.instance({ isFloat: !0, isPot: !1, width: A });
          }
          var k = -1,
            p = null;
          t && (d.Zb = ca.instance({ isFloat: !0, isPot: !1, width: a.size }));
          d.bias = ca.instance(a.bias);
          var h = {
            N: function () {
              return a.size;
            },
            df: function () {
              return A;
            },
            Jh: function () {
              return a.classesCount;
            },
            zk: function (G) {
              e.g(G);
            },
            dn: function () {
              a.remap &&
                a.remap.isEnabled &&
                (H = {
                  isEnabled: !0,
                  Om: ca.instance(a.remap.maskTexture),
                  Hd: a.remap.layers.map(function (G) {
                    return a.parent.Ll(G);
                  }),
                  depth: a.remap.depth,
                });
            },
            Wn: function () {
              switch (a.connectivityUp) {
                case 'direct':
                  p = md.instance(a.connectivity);
                  break;
                case 'square':
                  p = nd.instance(a.connectivity);
                  break;
                case 'squareFast':
                  p = od.instance(a.connectivity, a.activation);
                  break;
                case 'full':
                  p = pd.instance(a.connectivity);
                  break;
                case 'conv':
                  (r = a.kernelsCount),
                    (p = qd.instance(a.connectivity)),
                    w &&
                      (d.Yf = ca.instance({
                        width: A,
                        isFloat: !0,
                        isFlipY: !1,
                        isPot: !1,
                      }));
              }
              if (p.jc) {
                var G = a.size * a.sparsity;
                k = Math.log(G / a.size) / Math.log(2);
                d.input = ca.instance({
                  isMipmap: !0,
                  isFloat: !0,
                  isPot: !0,
                  width: G,
                  Nf: k,
                });
                d.uf = ca.instance({ isFloat: !0, isPot: !0, width: a.size });
              }
            },
            wa: function (G, I) {
              e = G;
              p.jc
                ? (d.input.O(),
                  D && d.bias.g(2),
                  p.wa(H),
                  d.input.g(0),
                  d.input.xl(k),
                  d.uf.O(),
                  D ? ba.set('s0') : (ba.set(z), ba.G('u4', f), d.bias.g(1)),
                  d.input.Ak(k, 0),
                  Y.l(!1, !1),
                  ba.set(x),
                  d.Zb.o(),
                  d.uf.g(0),
                  Y.l(!1, !1))
                : (d.Zb.O(), d.bias.g(1), p.wa());
              if (t)
                return (
                  (I = d.Zb),
                  g &&
                    (d.Wf.O(),
                    I.g(0),
                    ba.set(L),
                    ba.M('u10', 1 / a.size, 1 / a.size),
                    Y.l(!1, !1),
                    (I = d.Wf)),
                  w &&
                    (d.Yf.o(),
                    ba.set('s21'),
                    ba.M('u14', r, A / r),
                    I.g(0),
                    Y.l(!1, !1),
                    (I = d.Yf)),
                  I.g(0),
                  I
                );
              var E = d.Zb;
              a.normalize &&
                ((G = E),
                ba.set('gpuRawAvg' === v ? 's9' : 's8'),
                ba.G('u6', 1 / a.size),
                d.Xf.O(),
                G.g(0),
                Y.l(!1, !1),
                (E = d.Xf));
              G = null;
              switch (v) {
                case 'cpuRGBA2Float':
                  E.sh(!1);
                  I ? (G = h.hn(E).then(n)) : ((E = h.jn(E)), n(E));
                  break;
                case 'cpuMeanFloat':
                  E.sh(!0);
                  if (I) G = E.ln().then(n);
                  else {
                    E = E.mn();
                    for (var B = 0; B < E.length; ++B);
                    n(E);
                  }
                  break;
                case 'gpuRawAvg':
                case 'gpuRaw':
                  E.g(0);
                case 'none':
                  null !== n && n(E);
              }
              I && null === G && (G = Promise.resolve());
              return G;
            },
            Sk: function (G) {
              var I = !1;
              G &&
                ((v = G.Zf || 'none'),
                (n = G.Vf || null),
                (I = G.Fi ? !0 : !1));
              d.Zb = ca.instance({
                isFloat: !0,
                isPot: !0,
                isLinear: I,
                isMipmap: !1,
                width: a.size,
              });
              G =
                'undefined' !== typeof a.classesCount && a.classesCount
                  ? a.classesCount
                  : a.size * a.size;
              for (var E = (I = 0), B = 0; I < G; ++I)
                q.push(E + (a.size - 1 - B) * a.size),
                  l.push([-1, -1, -1, -1]),
                  ++E,
                  E === a.size && ((E = 0), ++B);
              a.normalize &&
                (d.Xf = ca.instance({ isFloat: !0, isPot: !0, width: a.size }));
            },
            hn: function (G) {
              return G.kn().then(b);
            },
            jn: function (G) {
              G = G.Ri();
              b(G);
              return l;
            },
            v: function () {
              for (var G in d) {
                var I = d[G];
                I && I.remove();
              }
              p && (p.v(), (p = null));
            },
          };
          a.Td && h.Wn(a.Td);
          return h;
        },
      },
      md = {
        instance: function (a) {
          var b = ca.instance(a.weights);
          return {
            jc: !0,
            xd: function () {
              return 1;
            },
            v: function () {
              b.remove();
            },
            bm: function () {
              return b;
            },
            wa: function () {
              ba.set('s26');
              b.g(1);
              Y.l(!1, !1);
            },
          };
        },
      },
      pd = {
        instance: function (a) {
          var b = a.fromLayerSize,
            d = ca.instance(a.weights);
          return {
            jc: !0,
            xd: function () {
              return b;
            },
            v: function () {
              d.remove();
            },
            wa: function (e) {
              if (e.isEnabled) {
                ba.set('s24');
                e.Om.g(3);
                for (var q = Math.min(e.Hd.length, e.depth), l = 0; l < q; ++l)
                  e.Hd[l].zk(4 + l);
              } else ba.set('s23');
              ba.G('u18', a.toLayerSize);
              ba.G('u19', a.fromLayerSize);
              d.g(1);
              Y.l(!1, !1);
            },
          };
        },
      },
      nd = {
        instance: function (a) {
          for (
            var b = a.fromLayerSize,
              d = a.toLayerSize,
              e = a.toSparsity,
              q = e * d,
              l = q / b,
              v = b / d,
              n = 0,
              t = 0,
              r = 0,
              w = Array(e * d * e * d * 4),
              D = Array(e * d * e * d * 4),
              z = Array(b * b),
              H = 0;
            H < z.length;
            ++H
          )
            z[H] = 0;
          H = Math.floor(e / 2);
          for (var x = 0.5 / d, f = 0.5 / b, g = 0.5 / q, A = 0; A < d; ++A)
            for (var L = Math.round(A * v), k = 0; k < d; ++k) {
              var p = Math.round(k * v),
                h = A / d,
                G = k / d;
              h += x;
              G += x;
              for (var I = 0; I < e; ++I) {
                var E = L + I - H;
                0 > E && (E += b);
                E >= b && (E -= b);
                for (var B = 0; B < e; ++B) {
                  var m = n / q,
                    u = t / q,
                    F = p + B - H;
                  0 > F && (F += b);
                  F >= b && (F -= b);
                  var R = E / b,
                    Q = F / b;
                  u = 1 - u - 1 / q;
                  R += f;
                  Q += f;
                  m += g;
                  u += g;
                  var ea = A * e + I,
                    ha = k * e + B;
                  ha = d * e - ha - 1;
                  ea = ha * d * e + ea;
                  w[4 * ea] = m;
                  w[4 * ea + 1] = u;
                  w[4 * ea + 2] = R;
                  w[4 * ea + 3] = Q;
                  Q = z[F * b + E]++;
                  ea = Q % l;
                  R = E * l + ea;
                  F = F * l + (Q - ea) / l;
                  F = b * l - 1 - F;
                  F = F * b * l + R;
                  D[4 * F] = m;
                  D[4 * F + 1] = u;
                  D[4 * F + 2] = h;
                  D[4 * F + 3] = G;
                  ++n >= q && ((n = 0), ++t);
                  ++r;
                }
              }
            }
          z = null;
          var ka = ca.instance(a.weights);
          delete a.weights.data;
          var O = ca.instance({
            width: q,
            isFloat: !0,
            array: new Float32Array(D),
            isPot: !0,
          });
          D = null;
          var N = ca.instance({
            width: q,
            isFloat: !0,
            array: new Float32Array(w),
            isPot: !0,
          });
          w = null;
          return {
            jc: !0,
            xd: function () {
              return l;
            },
            v: function () {
              O.remove();
              N.remove();
              ka.remove();
            },
            wa: function () {
              ba.set('s22');
              ka.g(1);
              N.g(2);
              Y.l(!1, !1);
            },
          };
        },
      },
      qd = {
        instance: function (a) {
          var b = a.kernelsCount,
            d = a.toSparsity,
            e = (d * a.toLayerSize) / a.fromLayerSize,
            q = a.inputScale || [1, 1],
            l = ca.instance(a.weights);
          return {
            jc: !0,
            xd: function () {
              return e;
            },
            Jp: function () {
              return d;
            },
            bm: function () {
              return l;
            },
            v: function () {
              l.remove();
            },
            wa: function () {
              ba.set('s25');
              ba.sg('u26', q);
              ba.G('u24', b);
              ba.G('u25', d);
              ba.G('u18', a.toLayerSize);
              ba.G('u19', a.fromLayerSize);
              l.g(1);
              Y.l(!1, !1);
            },
          };
        },
      },
      od = {
        instance: function (a, b) {
          var d = a.fromLayerSize,
            e = a.toLayerSize,
            q = a.toSparsity,
            l = a.stride ? a.stride : 1,
            v = (q * e) / d,
            n = e < d,
            t = d / e,
            r = ca.instance(a.weights),
            w =
              's47' +
              [d.toString(), e.toString(), q.toString(), l.toString(), b].join(
                '_'
              );
          ba.ul(w) ||
            ((a = Wa(b)),
            (e = [
              { type: '1f', name: 'u18', value: e },
              { type: '1f', name: 'u30', value: l },
            ]),
            n && e.push({ type: '1f', name: 'u19', value: d }),
            (d = [(n ? v : q).toFixed(1), a]),
            n && d.push(t.toFixed(1)),
            ba.km(n ? 's41' : 's40', w, d),
            ba.j(
              w,
              e.concat([
                { type: '1i', name: 'u16', value: 0 },
                { type: '1i', name: 'u3', value: 1 },
                { type: '1i', name: 'u15', value: 3 },
              ])
            ));
          return {
            jc: !1,
            xd: function () {
              return v;
            },
            v: function () {
              r.remove();
            },
            wa: function () {
              ba.set(w);
              r.g(3);
              Y.l(!1, !1);
            },
          };
        },
      },
      id = {
        instance: function (a) {
          var b = a.Bi ? a.Bi : 3,
            d = a.bi ? a.bi : 64,
            e = a.Gi ? a.Gi : 64,
            q = a.Aa ? !0 : !1;
          a = { isFloat: !1, width: d, isPot: !1, isFlipY: !1 };
          var l = ca.instance(a),
            v = ca.instance(a),
            n = ca.instance(a),
            t = ca.instance(a),
            r = ca.instance({ isFloat: !0, width: e, isPot: !1, isFlipY: !1 }),
            w = 1 / d;
          return {
            process: function (D) {
              ba.set('s37');
              t.o();
              Y.l(q, !1);
              ba.set('s38');
              for (var z = 0; z < b; ++z)
                l.o(),
                  ba.M('u10', w, 0),
                  Y.l(q, !1),
                  n.o(),
                  t.g(0),
                  Y.l(q, !1),
                  v.o(),
                  l.g(0),
                  ba.M('u10', 0, w),
                  Y.l(q, !1),
                  t.o(),
                  n.g(0),
                  Y.l(q, !1),
                  z !== b - 1 && v.g(0);
              ba.set('s39');
              r.o();
              D.g(0);
              v.g(1);
              t.g(2);
              Y.l(q, !1);
              r.g(0);
            },
            Dc: function () {
              return r;
            },
          };
        },
      },
      jd = {
        instance: function (a) {
          function b(w) {
            return ca.instance({
              isFloat: w,
              width: d.Y,
              isPot: !1,
              isFlipY: !1,
            });
          }
          var d = Object.assign({ eb: 0.1, Qa: 9, Y: 128, gain: 1, Aa: !1 }, a),
            e = b(!1),
            q = [b(!1), b(!1), b(!1)],
            l = [b(!1), b(!1), b(!1)],
            v = b(!0),
            n = [e, l[0], l[1]];
          a =
            'uniform sampler2D u1;const float e=1.1111,g=2.2222;uniform vec2 u31;varying vec2 vv0;void main(){float b=0.,c=0.;for(float a=-e;a<=e;a+=1.){vec2 i=u31*a,j=vv0+i*g;float d=1.2*a/e,f=exp(-d*d);b+=f*texture2D(u1,j).r,c+=f;}b/=c,gl_FragColor=vec4(b,0.,0.,1.);}'
              .replace('1.1111', Math.round((d.Qa - 1) / 2).toFixed(2))
              .replace('2.2222', (1 / d.Y).toFixed(6));
          var t =
              'uniform sampler2D u32,u33,u34,u35;const float f=1.1111;const vec3 g=vec3(1.);const float h=2.2222;varying vec2 vv0;void main(){vec3 a=texture2D(u32,vv0).rgb;float c=texture2D(u33,vv0).r,d=texture2D(u34,vv0).r,i=texture2D(u35,vv0).r,j=a.r*a.r;vec3 b=vec3(c,d,i),k=max(g*f,abs(vec3(j)-b*b)),l=sqrt(k);gl_FragColor=vec4(a.r,h*(a-b)/l);}'
                .replace('1.1111', d.eb.toFixed(4))
                .replace('2.2222', d.gain.toFixed(4)),
            r = { u1: 0 };
          ba.tc([
            {
              id: 's49',
              name: '_',
              h: 'uniform sampler2D u1;varying vec2 vv0;const vec3 f=vec3(.2126,.7152,.0722),g=vec3(1.);void main(){vec3 b=texture2D(u1,vv0).rgb;float a=dot(b,f);gl_FragColor=vec4(a,a,a,a);}',
              u: r,
              i: ['u1'],
              precision: 'lowp',
            },
            {
              id: 's50',
              name: '_',
              h: a,
              u: r,
              i: ['u1', 'u31'],
              precision: 'lowp',
            },
            {
              id: 's51',
              name: '_',
              h: t,
              u: { u32: 0, u33: 1, u34: 2, u35: 3 },
              i: ['u32', 'u33', 'u34', 'u35'],
              precision: 'highp',
            },
          ]);
          return {
            process: function () {
              ba.set('s49');
              e.O();
              Y.l(d.Aa, !1);
              ba.set('s50');
              for (var w = 0; 3 > w; ++w)
                ba.M('u31', 1, 0),
                  q[w].o(),
                  n[w].g(0),
                  Y.l(!1, !1),
                  ba.M('u31', 0, 1),
                  l[w].o(),
                  q[w].g(0),
                  Y.l(!1, !1);
              ba.set('s51');
              v.o();
              e.g(0);
              l[0].g(1);
              l[1].g(2);
              l[2].g(3);
              Y.l(!1, !1);
              v.g(0);
            },
            Dc: function () {
              return v;
            },
          };
        },
      },
      kd = {
        instance: function (a) {
          function b(r) {
            return ca.instance({
              isFloat: r,
              width: d.Y,
              isPot: !1,
              isFlipY: !1,
            });
          }
          var d = Object.assign({ eb: 0.1, Qa: 9, Y: 128, gain: 1, Aa: !1 }, a),
            e = b(!1),
            q = b(!1),
            l = b(!1),
            v = b(!0);
          a =
            'uniform sampler2D u1;const float e=1.1111,g=2.2222;uniform vec2 u31;varying vec2 vv0;void main(){vec3 b=vec3(0.);float c=0.;for(float a=-e;a<=e;a+=1.){vec2 i=u31*a,j=vv0+i*g;float d=1.2*a/e,f=exp(-d*d);b+=f*texture2D(u1,j).rgb,c+=f;}b/=c,gl_FragColor=vec4(b,1.);}'
              .replace('1.1111', Math.round((d.Qa - 1) / 2).toFixed(2))
              .replace('2.2222', (1 / d.Y).toFixed(6));
          var n =
              'uniform sampler2D u0,u36;const float f=1.1111;const vec3 g=vec3(1.);const float h=2.2222;varying vec2 vv0;void main(){vec4 a=texture2D(u0,vv0);vec3 c=texture2D(u36,vv0).rgb;float d=a.a*a.a;vec3 b=c.rgb,i=max(g*f,abs(vec3(d)-b*b)),j=sqrt(i);gl_FragColor=vec4(a.a,h*(a.rgb-b)/j);}'
                .replace('1.1111', d.eb.toFixed(4))
                .replace('2.2222', d.gain.toFixed(4)),
            t = { u1: 0 };
          ba.tc([
            {
              id: 's52',
              name: '_',
              h: 'uniform sampler2D u1;varying vec2 vv0;const vec3 f=vec3(.2126,.7152,.0722),g=vec3(1.);void main(){vec3 a=texture2D(u1,vv0).rgb;float b=dot(a,f);gl_FragColor=vec4(a.rgb,b);}',
              u: t,
              i: ['u1'],
              precision: 'lowp',
            },
            {
              id: 's53',
              name: '_',
              h: a,
              u: t,
              i: ['u1', 'u31'],
              precision: 'lowp',
            },
            {
              id: 's54',
              name: '_',
              h: n,
              u: { u0: 0, u36: 1 },
              i: ['u0', 'u36'],
              precision: 'highp',
            },
          ]);
          return {
            process: function () {
              ba.set('s52');
              e.O();
              Y.l(d.Aa, !1);
              ba.set('s53');
              ba.M('u31', 1, 0);
              q.o();
              e.g(0);
              Y.l(!1, !1);
              ba.M('u31', 0, 1);
              l.o();
              q.g(0);
              Y.l(!1, !1);
              ba.set('s54');
              v.o();
              e.g(0);
              l.g(1);
              Y.l(!1, !1);
              v.g(0);
            },
            Dc: function () {
              return v;
            },
          };
        },
      },
      ld = {
        instance: function (a) {
          function b(w) {
            return ca.instance({
              isFloat: w,
              width: d.Y,
              isPot: !1,
              isFlipY: !1,
            });
          }
          var d = Object.assign(
              { eb: 0.1, Qa: 9, Y: 128, gain: 1, $f: 0, Gc: !1, Aa: !1 },
              a
            ),
            e = b(!1),
            q = null,
            l = null,
            v = null;
          d.Gc && ((q = b(!1)), (l = b(!1)), (v = b(!0)));
          a = { u1: 0 };
          var n = [
            {
              id: 's55',
              name: '_',
              h: 'uniform sampler2D u1;const float f=1.1111;varying vec2 vv0;const vec3 e=vec3(.2126,.7152,.0722);void main(){vec2 a=vv0*.5*(f+1.);float b=.5*(1.-f),c=dot(texture2D(u1,a).rgb,e),d=dot(texture2D(u1,a+vec2(0.,b)).rgb,e),h=dot(texture2D(u1,a+vec2(b,0.)).rgb,e),i=dot(texture2D(u1,a+vec2(b,b)).rgb,e);gl_FragColor=vec4(c,d,h,i);}'.replace(
                '1.1111',
                d.$f.toFixed(4)
              ),
              u: a,
              i: ['u1'],
              precision: 'lowp',
            },
          ];
          if (d.Gc) {
            var t =
                'uniform sampler2D u1;const float e=1.1111,g=2.2222;uniform vec2 u31;varying vec2 vv0;void main(){vec4 b=vec4(0.);float c=0.;for(float a=-e;a<=e;a+=1.){vec2 i=u31*a,j=vv0+i*g;float d=1.2*a/e,f=exp(-d*d);b+=f*texture2D(u1,j),c+=f;}gl_FragColor=b/c;}'
                  .replace('1.1111', Math.round((d.Qa - 1) / 2).toFixed(2))
                  .replace('2.2222', (1 / d.Y).toFixed(6)),
              r =
                'uniform sampler2D u0,u36;const float f=1.1111;const vec4 g=vec4(1.);const float h=2.2222;varying vec2 vv0;void main(){vec4 a=texture2D(u0,vv0),c=texture2D(u36,vv0),d=a*a,b=c,i=max(g*f,abs(d-b*b)),j=sqrt(i);gl_FragColor=h*(a-b)/j;}'
                  .replace('1.1111', d.eb.toFixed(4))
                  .replace('2.2222', d.gain.toFixed(4));
            n.push(
              {
                id: 's56',
                name: '_',
                h: t,
                u: a,
                i: ['u1', 'u31'],
                precision: 'lowp',
              },
              {
                id: 's57',
                name: '_',
                h: r,
                u: { u0: 0, u36: 1 },
                i: ['u0', 'u36'],
                precision: 'highp',
              }
            );
          }
          ba.tc(n);
          return {
            process: function () {
              ba.set('s55');
              e.O();
              Y.l(d.Aa, !1);
              d.Gc
                ? (ba.set('s56'),
                  ba.M('u31', 1, 0),
                  q.o(),
                  e.g(0),
                  Y.l(!1, !1),
                  ba.M('u31', 0, 1),
                  l.o(),
                  q.g(0),
                  Y.l(!1, !1),
                  ba.set('s57'),
                  v.o(),
                  e.g(0),
                  l.g(1),
                  Y.l(!1, !1),
                  v.g(0))
                : e.g(0);
            },
            Jl: function () {
              return 2 - d.$f;
            },
            Dc: function () {
              return d.Gc ? v : e;
            },
          };
        },
      },
      Gb = (function () {
        function a(f, g, A, L, k, p, h) {
          if (!H)
            if (h === p.length) k();
            else {
              switch (p[h]) {
                case 'A':
                  A();
                  break;
                case 'D':
                  f();
                  break;
                case 'S':
                  g()
                    .then(function (G, I) {
                      x.Aj();
                      a(f, g, A, I ? null : L, k, p, ++h);
                    })
                    .catch(function (G) {
                      console.log('An error occurred in the WebAR loop: ', G);
                      k();
                    });
                  return;
                case 'R':
                  L && L();
              }
              a(f, g, A, L, k, p, ++h);
            }
        }
        var b = {
            n: 5,
            Sf: 1,
            ti: 0,
            td: [35, 49],
            pd: [2, 200],
            k: 0.7,
            uo: 200,
            Ym: 0.05,
          },
          d = -1,
          e = null,
          q = -1,
          l = -1,
          v = 0,
          n = -1,
          t = -1,
          r = 0,
          w = 0,
          D = b.pd[1],
          z = Math.log(2),
          H = !0,
          x = {
            T: function () {
              switch (d) {
                case -1:
                  return -1;
                case 0:
                  return t + e.ti;
                case 1:
                  return r;
              }
            },
            Kh: function (f) {
              return Math.pow(
                Math.min(Math.max(n, 0), e.n - 1) / (e.n - 1),
                f || 1
              );
            },
            m: function (f) {
              e = Object.assign({}, b, f);
              n = t = e.Sf;
              d = 0;
              x.reset();
            },
            Aj: function (f) {
              f = ('undefined' === typeof f ? Date.now() : f) || 0;
              var g = Math.min(Math.max(f - w, e.pd[0]), e.pd[1]);
              D = g;
              w = f;
              var A = -1 === q ? 0 : e.k;
              q = Math.min(Math.max(1e3 / g, 5), 120) * (1 - A) + q * A;
              f - l > e.uo &&
                5 < ++v &&
                ((g = e.k),
                (n =
                  n * (1 - g) +
                  (q < e.td[0] ? t - 1 : q > e.td[1] ? t + 1 : t) * g),
                Math.abs(n - t) > 1 - e.Ym &&
                  ((g = Math.min(Math.max(Math.round(n), 0), e.n - 1)),
                  g !== t && ((n = t = g), (q = (e.td[1] - e.td[0]) / 2))),
                (l = f));
            },
            hg: function (f, g, A, L, k, p) {
              H = !1;
              a(f, g, A, L, k, p, 0);
            },
            stop: function () {
              H = !0;
            },
            Qn: function (f) {
              r = f;
              d = 1;
            },
            to: function () {
              d = 0;
              x.reset();
            },
            reset: function () {
              D = b.pd[1];
              l = q = -1;
              v = 0;
            },
            uq: function (f, g, A) {
              A = Math.exp((-z * D) / A);
              return (1 - A) * f + A * g;
            },
            Ap: function () {
              return D;
            },
          };
        return x;
      })(),
      Ic = (function () {
        function a(D, z) {
          var H = D[0] - 0.5;
          D = D[1] - 0.5;
          var x = z[0] - 0.5;
          z = z[1] - 0.5;
          return H * H + D * D - (x * x + z * z);
        }
        var b = {
            Ci: 4,
            Pd: [1.5, 1.5, 2],
            qa: [0.1, 0.1, 0.1],
            Yi: 1,
            Y: -1,
            qf: -1,
            no: 2,
            Vm: 1,
            ig: !0,
            sl: 0.8,
          },
          d = null,
          e = [],
          q = [],
          l = [],
          v = [0],
          n = [0.5, 0.5, 1],
          t = null,
          r = 0,
          w = [0, 0, 0];
        return {
          m: function (D) {
            d = Object.assign({}, b, D);
            e.splice(0);
            q.splice(0);
            l.splice(0);
            r = 0;
            D = d.Pd[0] * d.qa[0];
            var z = d.Pd[1] * d.qa[1],
              H = 1 / (1 + d.Pd[2] * d.qa[2]),
              x = d.Yi * Math.min(d.Y, d.qf),
              f = x / d.Y;
            x /= d.qf;
            var g = 0.5 * d.sl;
            g *= g;
            for (var A = 0; A < d.Ci; ++A) {
              var L = [];
              q.push(L);
              var k = Math.pow(H, A),
                p = f * k,
                h = x * k;
              k = p * d.Vm;
              l.push(k);
              var G = p * D,
                I = h * z;
              p /= 2;
              h /= 2;
              for (
                var E = 1 + (1 - p - p) / G, B = 1 + (1 - h - h) / I, m = 0;
                m < B;
                ++m
              )
                for (var u = h + m * I, F = u - 0.5, R = 0; R < E; ++R) {
                  var Q = p + R * G,
                    ea = Q - 0.5;
                  ea * ea + F * F > g ||
                    ((Q = [Q, u, k]), e.push(Q), L.push(Q));
                }
              d.ig && L.sort(a);
              t = e;
            }
            d.ig && e.sort(a);
          },
          get: function (D) {
            var z = t.length;
            if (0 === z) return n;
            for (; D >= v.length; ) v.push(0);
            v[D] >= z && (v[D] = 0);
            var H = t[Math.floor(v[D]) % z];
            v[D] = (v[D] + 1 / d.no) % z;
            if (0 === r) return H;
            w[0] = H[0];
            w[1] = H[1];
            w[2] = r;
            return w;
          },
          Zp: function (D) {
            D >= v.length || (v[D] = Math.floor(Math.random() * t.length));
          },
          nq: function (D) {
            r = D;
            if (0 === r) t = e;
            else {
              for (var z = l.length, H = z - 1, x = 0; x < z; ++x)
                if (l[x] <= D) {
                  H = x;
                  break;
                }
              t = q[H];
            }
          },
          reset: function () {
            for (var D = e.length / v.length, z = 0; z < v.length; ++z)
              v[z] = Math.floor(z * D);
            r = 0;
            t = e;
          },
        };
      })(),
      wb = (function () {
        function a() {
          d(f + H.Of);
          g.port.postMessage('DONE');
        }
        function b() {
          p.bd = 0 === H.ya ? L(d) : L(e);
        }
        function d(B) {
          k.Tb &&
            null !== x &&
            ((B -= f),
            (B = Math.min(Math.max(B, H.wh[0]), H.wh[1])),
            (f += B),
            l(),
            h.isEnabled && h.Hc && k.Ia && f - h.zf > H.Xg && (r(), (h.zf = f)),
            x(f));
        }
        function e(B) {
          k.Tb && (p.timeout = setTimeout(d.bind(null, B), H.ya));
        }
        function q() {
          x = null;
          k.Tb = !1;
          l();
        }
        function l() {
          p.bd && (window.cancelAnimationFrame(p.bd), (p.bd = null));
          p.timeout && (window.clearTimeout(p.timeout), (p.timeout = null));
        }
        function v(B) {
          B && !k.Ia
            ? ((k.Ia = !0),
              A && Gb.to(),
              g.port.postMessage('STOP'),
              Ea.Bj(!0),
              b())
            : !B &&
              k.Ia &&
              ((k.Ia = !1),
              A && Gb.Qn(1),
              Ea.Bj(!1),
              g.port.postMessage('START'));
        }
        function n(B) {
          B.target.hidden ? I() : G();
        }
        function t(B, m, u) {
          m = B.createShader(m);
          B.shaderSource(m, u);
          B.compileShader(m);
          return m;
        }
        function r() {
          h.Hc = !1;
          var B = h.Ua,
            m = h.Ad,
            u = h.Bd,
            F = h.za;
          B.uniform1f(h.Vh, Math.random());
          h.Ub ? m.beginQueryEXT(F, u) : B.beginQuery(F, u);
          B.drawElements(B.POINTS, 1, B.UNSIGNED_SHORT, 0);
          h.Ub ? m.endQueryEXT(F) : B.endQuery(F);
          Ea.flush();
          D()
            .then(function (R) {
              0 === R || isNaN(R)
                ? ((h.isEnabled = !1),
                  console.log(
                    'WARNING in benchmark_GPUClock: WebGL timer queries is not working properly. timeElapsedNs =',
                    R
                  ))
                : ((R = (H.Pj * H.Wg * 1e3) / R),
                  (h.le = (h.le + 1) % H.qc),
                  (h.Af[h.le] = R),
                  ++h.ri > H.qc &&
                    (h.Gd.set(h.Af),
                    h.Gd.sort(function (Q, ea) {
                      return Q - ea;
                    }),
                    (R = h.Gd[Math.floor(H.qc / 2)]),
                    (h.sd = Math.max(h.sd, R)),
                    H.Vg(R / h.sd)),
                  (h.Hc = !0));
            })
            .catch(function () {
              h.Hc = !0;
            });
        }
        function w(B) {
          var m = h.Ua,
            u = h.Ad,
            F = h.Bd;
          F = h.Ub
            ? u.up(F, u.QUERY_RESULT_AVAILABLE_EXT)
            : m.getQueryParameter(F, m.QUERY_RESULT_AVAILABLE);
          m = m.getParameter(u.GPU_DISJOINT_EXT);
          F ? B(!m) : setTimeout(w.bind(null, B), 0.1);
        }
        function D() {
          return new Promise(function (B, m) {
            w(function (u) {
              if (u) {
                u = h.Ua;
                var F = h.Ad,
                  R = h.Bd;
                u = h.Ub
                  ? F.getQueryObjectEXT(R, F.QUERY_RESULT_EXT)
                  : u.getQueryParameter(R, u.QUERY_RESULT);
                B(u);
              } else m();
            });
          });
        }
        var z = {
            gi: !0,
            wh: [1, 200],
            Of: 20,
            ya: 0,
            Wg: 50,
            Pj: 240,
            Xg: 3e3,
            qc: 3,
            Vg: null,
          },
          H = null,
          x = null,
          f = 0,
          g = null,
          A = !1,
          L = null,
          k = { Ha: !1, Ia: !0, yf: !1, xf: !1, wf: !1, Tb: !1 },
          p = { bd: null, timeout: null },
          h = {
            isEnabled: !1,
            Hc: !1,
            Ua: null,
            Ad: null,
            Bd: null,
            za: null,
            Vh: null,
            Ub: !0,
            zf: 0,
            ri: 0,
            Af: null,
            Gd: null,
            le: 0,
            sd: 0,
          },
          G = v.bind(null, !0),
          I = v.bind(null, !1),
          E = {
            m: function (B) {
              H = Object.assign(z, B);
              Object.assign(k, { Ia: !0, Ha: !0, Tb: !1 });
              L =
                window.requestPostAnimationFrame ||
                window.requestAnimationFrame;
              if (null !== H.Vg) {
                B = document.createElement('canvas');
                B.setAttribute('width', '1');
                B.setAttribute('height', '1');
                var m = { antialias: !1 };
                B = B.getContext('webgl2', m) || B.getContext('webgl', m);
                if (
                  (m =
                    B.getExtension('EXT_disjoint_timer_query') ||
                    B.getExtension('EXT_disjoint_timer_query_webgl2'))
                ) {
                  h.Ua = B;
                  h.Ad = m;
                  h.isEnabled = !0;
                  h.Ub = m.beginQueryEXT ? !0 : !1;
                  var u = t(
                      B,
                      B.VERTEX_SHADER,
                      'attribute vec4 a0;void main(){gl_Position=a0;}'
                    ),
                    F = t(
                      B,
                      B.FRAGMENT_SHADER,
                      'precision lowp float;uniform float u37;void main(){vec4 a=u37*vec4(1.,2.,3.,4.);for(int b=0;b<666;b+=1)a=cos(a);gl_FragColor=a;}'.replace(
                        '666',
                        H.Wg.toString()
                      )
                    ),
                    R = B.createProgram();
                  B.attachShader(R, u);
                  B.attachShader(R, F);
                  B.linkProgram(R);
                  u = B.getAttribLocation(R, 'a0');
                  h.Vh = B.getUniformLocation(R, 'u37');
                  B.useProgram(R);
                  B.enableVertexAttribArray(u);
                  R = B.createBuffer();
                  B.bindBuffer(B.ARRAY_BUFFER, R);
                  B.bufferData(
                    B.ARRAY_BUFFER,
                    new Float32Array([0.5, 0.5, 0, 1]),
                    B.STATIC_DRAW
                  );
                  B.vertexAttribPointer(u, 4, B.FLOAT, !1, 16, 0);
                  R = B.createBuffer();
                  B.bindBuffer(B.ELEMENT_ARRAY_BUFFER, R);
                  B.bufferData(
                    B.ELEMENT_ARRAY_BUFFER,
                    new Uint16Array([0]),
                    B.STATIC_DRAW
                  );
                  B.disable(B.DEPTH_TEST);
                  B.disable(B.DITHER);
                  B.disable(B.STENCIL_TEST);
                  B.viewport(0, 0, 1, 1);
                  R = h.Ub ? m.createQueryEXT() : B.createQuery();
                  h.Bd = R;
                  h.za = m.TIME_ELAPSED_EXT || B.TIME_ELAPSED;
                  h.zf = -H.Xg;
                  h.Af = new Float32Array(H.qc);
                  h.Gd = new Float32Array(H.qc);
                  h.sd = 0;
                  h.le = 0;
                  h.ri = 0;
                  h.Hc = !0;
                }
              }
              if (H.gi) {
                B = !1;
                try {
                  if ('undefined' === typeof SharedWorker) {
                    var Q = URL.createObjectURL(
                        new Blob(
                          [
                            "let handler = null;\n      self.addEventListener('message', function(e){\n        if (handler !== null){\n          clearTimeout(handler);\n          handler = null;\n        }\n        switch (e.data) {\n          case 'START':\n          case 'DONE':\n            handler = setTimeout(function(){\n              self.postMessage('TICK');\n            }, " +
                              H.Of.toString() +
                              ");\n            break;\n          case 'STOP':\n            break;\n        };\n      }, false);",
                          ],
                          { type: 'text/javascript' }
                        )
                      ),
                      ea = new Worker(Q);
                    ea.addEventListener('message', a);
                    g = { Pi: ea, port: ea };
                    k.yf = !0;
                  } else {
                    var ha = URL.createObjectURL(
                        new Blob(
                          [
                            "let handler = null;\n      onconnect = function(e) {\n        const port = e.ports[0];\n        port.addEventListener('message', function(e) {\n          \n          if (handler !== null){\n            clearTimeout(handler);\n            handler = null;\n          }\n          switch (e.data) {\n            case 'START':\n            case 'DONE':\n              handler = setTimeout(function(){\n                port.postMessage('TICK');\n              }, " +
                              H.Of.toString() +
                              ");\n              break;\n            case 'STOP':\n              break;\n          };\n          \n        });\n        \n        port.start();\n      } // end onconnect()",
                          ],
                          { type: 'text/javascript' }
                        )
                      ),
                      ka = new SharedWorker(ha);
                    ka.port.start();
                    ka.port.addEventListener('message', a);
                    g = { Pi: ka, port: ka.port };
                    k.xf = !0;
                  }
                  B = !0;
                } catch (O) {}
                B &&
                  ('onvisibilitychange' in document
                    ? document.addEventListener('visibilitychange', n)
                    : (window.addEventListener('blur', I),
                      window.addEventListener('focus', G)),
                  window.addEventListener('pagehide', I),
                  window.addEventListener('pageshow', G),
                  (k.wf = !0));
              }
              A = 'undefined' !== typeof Gb;
            },
            v: function () {
              q();
              k.wf &&
                ('onvisibilitychange' in document
                  ? document.removeEventListener('visibilitychange', n)
                  : (window.removeEventListener('blur', I),
                    window.removeEventListener('focus', G)),
                window.removeEventListener('pagehide', I),
                window.removeEventListener('pageshow', G),
                (k.wf = !1));
              k.xf
                ? (g.port.close(), (k.xf = !1))
                : k.yf && (g.Pi.terminate(), (k.yf = !1));
              Object.assign(k, { Ia: !0, Ha: !1, Tb: !1 });
              x = null;
            },
            Up: function () {
              return k.Ia;
            },
            update: function (B) {
              Object.assign(H, B);
            },
            hg: function (B) {
              k.Ha || E.m({});
              l();
              k.Tb = !0;
              x = B;
              k.Ia && b();
            },
            stop: q,
          };
        return E;
      })(),
      tc = {
        bf: function () {
          return Date.now();
        },
        xp: function () {
          return performance.now();
        },
      },
      tb = (function () {
        function a(X) {
          switch (G) {
            case h.movePinch:
              var ma = -X.deltaY;
              0 === I && f('pinch', -1, 0.001 * ma, null);
          }
          X.deltaY;
          X.preventDefault();
        }
        function b(X) {
          if (-1 !== I)
            switch (G) {
              case h.swipe:
                if (1 !== I) break;
                t();
                w(X, B);
                var ma = B[0] - E[0];
                q(ma);
                X = ma / ((20 * L.offsetWidth) / 100);
                f('swipeMove', Math.min(Math.max(X, -1), 1), X, null);
                break;
              case h.movePinch:
                if (2 === I || 3 === I) {
                  w(X, B);
                  ma = B[0] - E[0];
                  var na = B[1] - E[1];
                  2 === I
                    ? ((V += Math.sqrt(ma * ma + na * na)),
                      10 > V
                        ? ((E[0] = B[0]), (E[1] = B[1]))
                        : (sa || ((sa = !0), f('moveStart', null, null, null)),
                          (ra[0] = ma),
                          (ra[1] = na),
                          (u[0] = ma - m[0]),
                          (u[1] = na - m[1]),
                          f('move', ra, u, null),
                          (m[0] = ra[0]),
                          (m[1] = ra[1])))
                    : 3 === I &&
                      ((X = r(X) / ja), f('pinch', X, X - Pa, null), (Pa = X));
                }
            }
        }
        function d(X) {
          if (-1 !== I)
            switch (G) {
              case h.swipe:
                if (1 !== I) break;
                t();
                w(X, B);
                X = B[0] - E[0];
                var ma = 0 > X;
                (X = 20 < (100 * Math.abs(X)) / L.offsetWidth) && ma
                  ? f('swipeLeft', F, null, null)
                  : X && !ma && f('swipeRight', F, null, null);
                var na = function () {
                  setTimeout(function () {
                    n();
                    I = 0;
                    f('swipeEnd', null, null, null);
                  }, 202);
                };
                X
                  ? ((X = function () {
                      var oa = (ma ? -1 : 1) * L.width,
                        Ia = ((ma ? 1 : -1) * oa) / L.width;
                      F.style.transitionDuration = (400).toString() + 'ms';
                      F.style.left = (ka[0] + oa).toString() + 'px';
                      F.style.top = ka[1].toString() + 'px';
                      F.style.transform = 'rotate( ' + Ia.toString() + 'rad )';
                      na();
                    }),
                    ha ? X() : (O = X))
                  : ((F.style.transitionDuration = (200).toString() + 'ms'),
                    (F.style.opacity = '0'),
                    (F.style.left = ka[0].toString() + 'px'),
                    (F.style.top = ka[1].toString() + 'px'),
                    (F.style.transform = ''),
                    na());
                I = -1;
                break;
              case h.movePinch:
                if (2 === I || 3 === I)
                  I === I.move
                    ? f('moveEnd', null, null, null)
                    : 3 === I && f('pinchEnd', null, null, null),
                    (I = 0);
            }
        }
        function e(X) {
          X.preventDefault();
          if (-1 !== I)
            switch (G) {
              case h.swipe:
                if (0 !== I) break;
                t();
                I = 1;
                N = setTimeout(function () {
                  n();
                  N = null;
                  1 === I && ((I = 0), f('swipeEnd', null, null, null));
                }, 1e3);
                l();
                f('swipeStart', null, null, null);
                f('swipeGetCanvas', F, Q, R);
                w(X, E);
                break;
              case h.movePinch:
                0 !== I
                  ? 2 !== I ||
                    sa ||
                    (void 0 === X.changedTouches && void 0 === X.touches) ||
                    ((ja = r(X)),
                    20 < ja &&
                      ((I = 3), (Pa = 1), f('pinchStart', null, null, null)))
                  : 3 !== I &&
                    ((sa = !1),
                    w(X, E),
                    (m[0] = 0),
                    (m[1] = 0),
                    (I = 2),
                    (V = 0));
            }
        }
        function q(X) {
          var ma = 0 > X;
          F.style.left = ka[0] + X + 'px';
          F.style.transformOrigin = ma ? P : y;
          F.style.transform =
            'rotate( ' + (((ma ? 1 : -1) * X) / L.width).toString() + 'rad )';
        }
        function l() {
          ha = !1;
          var X = L.getBoundingClientRect();
          ka[0] = X.left;
          ka[1] = X.top;
          F.width = Math.round(L.width / 4);
          F.height = Math.round(L.height / 4);
          R.width = F.width;
          R.height = F.height;
          F.style.width = L.offsetWidth + 'px';
          F.style.height = L.offsetHeight + 'px';
          F.style.left = ka[0] + 'px';
          F.style.top = ka[1] + 'px';
          setTimeout(v, 0);
        }
        function v() {
          Q.drawImage(L, 0, 0, F.width, F.height);
          ea.drawImage(F, 0, 0);
          ha = !0;
          document.body.appendChild(F);
          O && (O(), (O = !1));
        }
        function n() {
          F.style.transitionDuration = '0ms';
          F.style.opacity = '1';
          F.style.transform = '';
          ha && (document.body.removeChild(F), (ha = !1));
        }
        function t() {
          N && (window.clearTimeout(N), (N = null));
        }
        function r(X) {
          D(X, la, 0);
          D(X, Z, 1);
          return Math.sqrt(la[0] * la[0] + Z[0] * Z[0]);
        }
        function w(X, ma) {
          void 0 !== X.changedTouches || void 0 !== X.touches
            ? D(X, ma, 0)
            : ((ma[0] = X.pageX), (ma[1] = X.pageY));
        }
        function D(X, ma, na) {
          X.touches.length > na
            ? ((ma[0] = X.touches[na].pageX), (ma[1] = X.touches[na].pageY))
            : ((ma[0] = X.changedTouches[na].pageX),
              (ma[1] = X.changedTouches[na].pageY));
        }
        function z() {
          p.forEach(function (X) {
            L.removeEventListener(X.type, X.pb, !1);
          });
          return p.splice(0, p.length);
        }
        function H(X) {
          X.forEach(function (ma) {
            x(ma.type, ma.pb);
          });
        }
        function x(X, ma) {
          L.removeEventListener(X, ma, !1);
          F.removeEventListener(X, ma, !1);
          L.addEventListener(X, ma, !1);
          F.addEventListener(X, ma, !1);
          0 ===
            p.filter(function (na) {
              return na.type === X && na.pb === ma;
            }).length && p.push({ type: X, pb: ma });
        }
        function f(X, ma, na, oa) {
          k[X].forEach(function (Ia) {
            Ia.pb(ma, na, oa);
          });
        }
        function g(X) {
          return X[0] + '% ' + (100 - X[1]).toString() + '%';
        }
        var A = !1,
          L = null,
          k = {
            swipeStart: [],
            swipeEnd: [],
            swipeLeft: [],
            swipeRight: [],
            swipeMove: [],
            swipeGetCanvas: [],
            pinch: [],
            pinchStart: [],
            pinchEnd: [],
            move: [],
            moveStart: [],
            moveEnd: [],
          },
          p = [],
          h = { idle: 0, swipe: 1, movePinch: 2 },
          G = h.idle,
          I = 0,
          E = [0, 0],
          B = [0, 0],
          m = [0, 0],
          u = [0, 0],
          F = document.createElement('canvas'),
          R = document.createElement('canvas'),
          Q = F.getContext('2d'),
          ea = R.getContext('2d');
        F.style.position = 'fixed';
        F.style.zIndex = '800';
        F.style.cursor = 'move';
        F.style.pointerEvents = 'none';
        F.className = 'swipeImage';
        F.setAttribute('draggable', !1);
        var ha = !1,
          ka = [0, 0],
          O = null,
          N = null,
          y = g([50, 100]),
          P = g([50, 0]),
          K = null,
          V = 0,
          ra = [0, 0],
          ja = 0,
          sa = !1,
          Pa = 1,
          la = [0, 0],
          Z = [0, 0],
          ia = {
            init: function (X) {
              if (A) ia.switch_canvas(X.pa);
              else
                return (
                  (L = X.pa),
                  x('mousedown', e),
                  x('mouseup', d),
                  x('mouseout', d),
                  x('mousemove', b),
                  x('mousemove', b),
                  x('wheel', a),
                  x('touchstart', e),
                  x('touchend', d),
                  x('touchmove', b),
                  (A = !0),
                  ia
                );
            },
            switch_canvas: function (X) {
              if (!A) ia.init({ pa: X });
              else if (L !== X) {
                var ma = z();
                L = X;
                H(ma);
                for (var na in k)
                  for (X = k[na], ma = X.length - 1; 0 <= ma; --ma)
                    X[ma].pn && X.splice(ma, 1);
              }
            },
            get_mode: function () {
              for (var X in h) if (h[X] === G) return X;
              return !1;
            },
            switch_mode: function (X) {
              A &&
                'undefined' !== typeof h[X] &&
                ((X = h[X]), G !== X && (t(), (G = X), (I = 0)));
            },
            add_listener: function (X, ma, na) {
              k[X].push({ pb: ma, pn: 'undefined' === typeof na ? !1 : na });
              return ia;
            },
            remove_listener: function (X) {
              k[X].splice(0, k[X].length);
              return ia;
            },
            animate_swipe: function (X, ma) {
              K && (clearInterval(K), (K = null));
              l();
              var na = (L.width / (ma / 1e3)) * ('left' === X ? -1 : 1),
                oa = 0,
                Ia,
                sb = Date.now();
              K = setInterval(function () {
                K &&
                  ((Ia = Date.now()),
                  (oa += ((Ia - sb) / 1e3) * na),
                  q(oa),
                  (sb = Ia),
                  Math.abs(oa) > 0.75 * L.width &&
                    K &&
                    (clearInterval(K), (K = null), n()));
              }, 16);
            },
          };
        return ia;
      })();
    window.CanvasListeners = tb;
    var S = {
        VERSION: '3.6.1',
        Zc: [],
        Yc: [],
        we: !1,
        ve: !1,
        xe: !1,
        ready: !1,
        isBusy: !1,
      },
      Xa = {
        idealWidth: 800,
        idealHeight: 600,
        minWidth: 480,
        maxWidth: 1280,
        minHeight: 480,
        maxHeight: 1280,
        FOVdesktop: 60,
        rotate: 0,
        FOVmobile: 45,
        FOVforced: 0,
        te: 10,
        se: 8e3,
      },
      Kc = {
        Fd: !0,
        Nd: 'models3D',
        Md: 'materials',
        ro: 'tweakers',
        neuralNetworkPath: 'built/jeefitNNC_60_0.json',
        neuralNetworkVersion: '60_0',
        ba: '',
        ua: '',
        ue: '',
        ya: 0,
        Zj: 20,
        width: 1024,
        height: 1024,
        ii: !0,
        Xm: [2, 3.5],
        Wi: 300,
        Wc: [1, 6],
        scanOverlapFactors: [2, 2, 3],
        scanNScaleLevels: 2,
        scanScale0Factor: 0.7,
        qa: [0.2, 0.2, 0.3],
        mc: [
          [0.8, 0.5],
          [0.8, 0.5],
          [1, 1],
        ],
        po: 30,
        $k: 0.9,
        gn: [0.2, 0.6],
        fn: 1,
        qo: [0.01, 0.035],
        yn: [0.003, 0.007],
        Dg: [0, 0.6],
        wl: 0.2,
        Xa: [0.698111, 1.047166, 0.122169],
        zj: [-0.1, 0, 0],
        Sd: [0, -62, 8],
        bn: 1.03,
        Ca: [0, -60, 0],
        Rf: 50,
        Bc: 0.4,
        Ze: 73,
        ze: [0.02, 1],
        Xj: [4, 1],
        Dk: [0, 0.5],
        An: 0.15,
        xn: 1,
        tn: [0.5, 4],
        Fo: 20,
        sp: !1,
        Ec: 145,
        pf: -18,
        lf: 20,
        mf: 3,
        Kc: [-110, 0],
        hc: 1,
        pj: 0.4,
        qj: 3,
        ae: [0, 0, 0],
        ic: [1.1, 1],
        hd: 0,
        Pe: 0.95,
        Oe: 90,
        Ne: 50,
        cd: 30,
        Gb: 0.05,
        jf: !0,
        Jd: !0,
        Jf: 'images/masks/target.jpg',
        Kf: !1,
        Id: [1 / 255, 175 / 255, 236 / 255, 0],
        Kd: -0.001,
        If: 3.14,
        De: 0,
        Ce: 'images/masks/burka.png',
        Ae: Math.PI - Math.PI / 4,
        Me: Math.PI / 4,
        gg: [0.3, 0.2, 0.1],
        Wb: 1,
        ui: [700, 90],
        Im: [0.2, 0.04],
        Go: 'images/backgrounds/viewer3D.png',
        Ug: [0, 0, 0],
        Tg: [0, 15, 60],
        qe: 0.3,
        Oo: 50,
        Ko: Rc ? La : !1,
        Lo: Rc ? La : !1,
        No: 1e3,
        Qo: 1e3,
        Mo: 40,
        Jo: [0, 0, -400],
        xi: 0.1,
        Mm: 0.5,
        yi: [0.5, 1.5],
        Ld: 30,
        Lm: !0,
      },
      M = Object.assign({}, Kc);
    U.nh = !0;
    U.oh = !0;
    U.mh = !1;
    U.Ka = !0;
    var eb = {
      kg: 3.5,
      $b: 'images/debug/picsou.png',
      Ud: 45,
      Ff: 0.785,
      Gf: 0.3925,
      Hf: 5,
      Df: 2,
      Ef: 0,
      Cf: 0,
      Ho: 'images/backgrounds/bg1.jpg',
      Io: 'images/backgrounds/bg1_light.jpg',
      Lj: 1,
      Mj: 2,
    };
    M.fx = [4, 50];
    M.Kc = [-110, 0];
    M.pj = 0.25;
    M.qj = 3;
    M.ae = [0, -2, 20];
    M.ic = [0.95, 1];
    U.Oc = 2.1289;
    U.ag = 1;
    eb.kg = 2.5858;
    eb.Ff = 0.4388;
    eb.Gf = 0.118;
    eb.$b = 'images/debug/hdri2.png';
    eb.Ud = 180;
    eb.jg = 0.8065;
    eb.Hf = 5.3887;
    eb.Df = 0.5351;
    eb.Ef = -0.3019;
    eb.Cf = 0;
    eb.Lj = 3.5288;
    eb.Mj = 6.2168;
    var Jc = {
        element: null,
        yh: null,
        Ed: !1,
        kh: null,
        ka: null,
        Jg: null,
        deviceId: -1,
        Mb: -1,
        od: 0,
        Ni: null,
        pe: -1,
      },
      Ca = Object.assign({}, Jc),
      cb = null,
      Sc = M.Xm,
      yc = window.devicePixelRatio ? window.devicePixelRatio : 1;
    var lc = { vl: Math.max(Sc[0], yc) / yc, Xe: Math.min(yc, Sc[1]) };
    var db = null;
    S.onLoad = function (a) {
      S.ready ? a() : S.Zc.push(a);
    };
    S.onHalfLoad = function (a) {
      S.load_model ? a() : S.Yc.push(a);
    };
    S.onWebcamAsk = function (a) {
      S.we = a;
    };
    S.onContextLost = function (a) {
      S.ve = a;
    };
    S.onWebcamGet = function (a) {
      S.xe = a;
    };
    S.get_onHalfLoadCallstack = function () {
      return S.Yc;
    };
    S.set_size = function (a, b, d) {
      d = d ? lc.Xe : 1;
      M.width = a * d;
      M.height = b * d;
    };
    S.get_videoDevices = function (a) {
      Wc(a);
    };
    S.set_videoDevice = function (a) {
      Ca.deviceId = a;
    };
    S.set_videoSizes = function (a, b, d, e, q, l) {
      Xa.idealWidth = a;
      Xa.idealHeight = b;
      Xa.minWidth = d;
      Xa.maxWidth = e;
      Xa.minHeight = q;
      Xa.maxHeight = l;
    };
    S.set_loading = function (a, b, d) {
      a && ((M.Kf = !0), (M.Jf = a));
      'number' === typeof b && ((a = new Ub(b)), (M.Id = [a.r, a.W, a.b, 0]));
      'number' === typeof d && (M.Kd = d);
    };
    S.set_settings = function (a, b, d) {
      a && Object.assign(M, a);
      b && Object.assign(Xa, b);
      d && Object.assign(eb, d);
    };
    S.get_size = function () {
      return { width: M.width, height: M.height };
    };
    S.get_cv = function () {
      return gb.qb();
    };
    S.set_NNCPath = function (a) {
      M.ue = a;
    };
    S.set_materialsPath = function (a) {
      M.Md = a;
    };
    S.set_modelsPath = function (a) {
      M.Nd = a;
    };
    S.destroy = function () {
      return db ? db.v() : Promise.resolve();
    };
    S.init2 = function (a) {
      var b = Object.assign(
        {
          basePath: null,
          modelsPath: null,
          materialsPath: null,
          materialTextureBasePath: null,
          cv: null,
          isRequestCamera: !0,
          width: 512,
          height: 512,
          isMirror: !0,
          isApplyOverSampling: !1,
        },
        a
      );
      M.Fd = b.isRequestCamera;
      S.set_size(b.width, b.height, b.isApplyOverSampling);
      b.modelsPath && (M.Nd = b.modelsPath);
      b.materialsPath && (M.Md = b.materialsPath);
      b.materialTextureBasePath && (U.Ai = b.materialTextureBasePath);
      M.ii = b.isMirror;
      return new Promise(function (d, e) {
        S.onHalfLoad(d);
        S.init(b.basePath, function () {}, e, b.cv);
      });
    };
    S.init = function (a, b, d, e) {
      db = Xc();
      S.lb = d
        ? function (q, l) {
            d(q, l);
            S.lb = !1;
          }
        : function () {};
      S.Wo = db;
      a && (M.ba = a);
      b && S.Zc.push(b);
      db.oo();
      a = db.Ql();
      if (
        !gb.m({
          Le: 'jeefitCanvas',
          pa: e,
          width: a.width,
          height: a.height,
          debug: !1,
          Uf: function () {
            S.ve && S.ve();
          },
          premultipliedAlpha: !0,
        })
      )
        return S.lb && S.lb('GL_INCOMPATIBLE', 'Cannot init Context'), !1;
      M.Fd ? $c() : ad();
      return !0;
    };
    JEELIZVTO = S;
    var Gc = (function () {
        function a() {
          Ba.aa();
          c.viewport(0, 0, 1, 1);
          ba.set('s70');
          e.g(0);
          Y.l(!1);
          c.readPixels(0, 0, 1, 1, c.RGBA, c.UNSIGNED_BYTE, l);
          b(0 < l[0]);
        }
        var b = null,
          d = !1,
          e = null,
          q = !1,
          l = null,
          v = {
            m: function (n) {
              if (q) return !1;
              e = n;
              ba.tc([
                {
                  id: 's70',
                  name: '_',
                  h: 'uniform sampler2D u39;const vec2 e=vec2(.16,.5);void main(){vec4 a=texture2D(u39,e);float b=step(1.99,a.r);gl_FragColor=vec4(b,0.,0.,1.);}',
                  i: ['u39'],
                  precision: 'lowp',
                },
              ]);
              ba.j('s70', [{ type: '1i', name: 'u39', value: 0 }]);
              l = new Uint8Array(4);
              return (q = !0);
            },
            start: function (n, t) {
              v.stop();
              b = t;
              d = window.setInterval(a, n);
            },
            stop: function () {
              d && (window.clearInterval(a), (d = !1));
            },
          };
        return v;
      })(),
      pc = pc || {};
    Ub.prototype = {
      constructor: Ub,
      r: 1,
      W: 1,
      b: 1,
      set: function (a) {
        a instanceof Ub
          ? this.K(a)
          : 'number' === typeof a
          ? Mc(this, a)
          : 'string' === typeof a && bd(this, a);
        return this;
      },
      Dn: (function () {
        function a(b, d, e) {
          0 > e && (e += 1);
          1 < e && --e;
          return e < 1 / 6
            ? b + 6 * (d - b) * e
            : 0.5 > e
            ? d
            : e < 2 / 3
            ? b + 6 * (d - b) * (2 / 3 - e)
            : b;
        }
        return function (b, d, e) {
          b = pc.Math.tp(b, 1);
          d = pc.Math.Ge(d, 0, 1);
          e = pc.Math.Ge(e, 0, 1);
          0 === d
            ? (this.r = this.W = this.b = e)
            : ((d = 0.5 >= e ? e * (1 + d) : e + d - e * d),
              (e = 2 * e - d),
              (this.r = a(e, d, b + 1 / 3)),
              (this.W = a(e, d, b)),
              (this.b = a(e, d, b - 1 / 3)));
          return this;
        };
      })(),
      clone: function () {
        return new this.constructor(this.r, this.W, this.b);
      },
      K: function (a) {
        this.r = a.r;
        this.W = a.W;
        this.b = a.b;
        return this;
      },
      add: function (a) {
        this.r += a.r;
        this.W += a.W;
        this.b += a.b;
        return this;
      },
      multiply: function (a) {
        this.r *= a.r;
        this.W *= a.W;
        this.b *= a.b;
        return this;
      },
      Ba: function (a) {
        this.r *= a;
        this.W *= a;
        this.b *= a;
        return this;
      },
      ob: function (a, b) {
        void 0 === b && (b = 0);
        this.r = a[b];
        this.W = a[b + 1];
        this.b = a[b + 2];
        return this;
      },
    };
    var cd = {};
    nc.prototype = {
      constructor: nc,
      get x() {
        return this.B;
      },
      set x(a) {
        this.B = a;
      },
      get y() {
        return this.C;
      },
      set y(a) {
        this.C = a;
      },
      get z() {
        return this.D;
      },
      set z(a) {
        this.D = a;
      },
      get w() {
        return this.P;
      },
      set w(a) {
        this.P = a;
      },
      set: function (a, b, d, e) {
        this.B = a;
        this.C = b;
        this.D = d;
        this.P = e;
        return this;
      },
      clone: function () {
        return new this.constructor(this.B, this.C, this.D, this.P);
      },
      K: function (a) {
        this.B = a.x;
        this.C = a.y;
        this.D = a.z;
        this.P = a.w;
        return this;
      },
      inverse: function () {
        this.B *= -1;
        this.C *= -1;
        this.D *= -1;
        this.normalize();
        return this;
      },
      kd: function (a) {
        return this.B * a.B + this.C * a.C + this.D * a.D + this.P * a.P;
      },
      Bf: function () {
        return (
          this.B * this.B + this.C * this.C + this.D * this.D + this.P * this.P
        );
      },
      length: function () {
        return Math.sqrt(
          this.B * this.B + this.C * this.C + this.D * this.D + this.P * this.P
        );
      },
      normalize: function () {
        var a = this.length();
        0 === a
          ? ((this.D = this.C = this.B = 0), (this.P = 1))
          : ((a = 1 / a),
            (this.B *= a),
            (this.C *= a),
            (this.D *= a),
            (this.P *= a));
        return this;
      },
      multiply: function (a, b) {
        return void 0 !== b
          ? (console.warn(
              'JETHREE.Quaternion: .multiply() now only accepts one argument. Use .multiplyQuaternions( a, b ) instead.'
            ),
            Nc(this, a, b))
          : Nc(this, this, a);
      },
      ob: function (a, b) {
        void 0 === b && (b = 0);
        this.B = a[b];
        this.C = a[b + 1];
        this.D = a[b + 2];
        this.P = a[b + 3];
        return this;
      },
    };
    Vb.prototype = {
      constructor: Vb,
      get width() {
        return this.x;
      },
      set width(a) {
        this.x = a;
      },
      get height() {
        return this.y;
      },
      set height(a) {
        this.y = a;
      },
      set: function (a, b) {
        this.x = a;
        this.y = b;
        return this;
      },
      aj: function (a) {
        this.x = a;
        return this;
      },
      bj: function (a) {
        this.y = a;
        return this;
      },
      clone: function () {
        return new this.constructor(this.x, this.y);
      },
      K: function (a) {
        this.x = a.x;
        this.y = a.y;
        return this;
      },
      add: function (a, b) {
        if (void 0 !== b)
          return (
            console.warn(
              'JETHREE.Vector2: .add() now only accepts one argument. Use .addVectors( a, b ) instead.'
            ),
            this.$c(a, b)
          );
        this.x += a.x;
        this.y += a.y;
        return this;
      },
      $c: function (a, b) {
        this.x = a.x + b.x;
        this.y = a.y + b.y;
        return this;
      },
      sub: function (a, b) {
        if (void 0 !== b)
          return (
            console.warn(
              'JETHREE.Vector2: .sub() now only accepts one argument. Use .subVectors( a, b ) instead.'
            ),
            this.bb(a, b)
          );
        this.x -= a.x;
        this.y -= a.y;
        return this;
      },
      bb: function (a, b) {
        this.x = a.x - b.x;
        this.y = a.y - b.y;
        return this;
      },
      multiply: function (a) {
        this.x *= a.x;
        this.y *= a.y;
        return this;
      },
      Ba: function (a) {
        isFinite(a) ? ((this.x *= a), (this.y *= a)) : (this.y = this.x = 0);
        return this;
      },
      Se: function (a) {
        return this.Ba(1 / a);
      },
      min: function (a) {
        this.x = Math.min(this.x, a.x);
        this.y = Math.min(this.y, a.y);
        return this;
      },
      max: function (a) {
        this.x = Math.max(this.x, a.x);
        this.y = Math.max(this.y, a.y);
        return this;
      },
      Ge: function (a, b) {
        this.x = Math.max(a.x, Math.min(b.x, this.x));
        this.y = Math.max(a.y, Math.min(b.y, this.y));
        return this;
      },
      floor: function () {
        this.x = Math.floor(this.x);
        this.y = Math.floor(this.y);
        return this;
      },
      ceil: function () {
        this.x = Math.ceil(this.x);
        this.y = Math.ceil(this.y);
        return this;
      },
      round: function () {
        this.x = Math.round(this.x);
        this.y = Math.round(this.y);
        return this;
      },
      kd: function (a) {
        return this.x * a.x + this.y * a.y;
      },
      Bf: function () {
        return this.x * this.x + this.y * this.y;
      },
      length: function () {
        return Math.sqrt(this.x * this.x + this.y * this.y);
      },
      normalize: function () {
        return this.Se(this.length());
      },
      ob: function (a, b) {
        void 0 === b && (b = 0);
        this.x = a[b];
        this.y = a[b + 1];
        return this;
      },
    };
    Ta.prototype = {
      constructor: Ta,
      set: function (a, b, d) {
        this.x = a;
        this.y = b;
        this.z = d;
        return this;
      },
      aj: function (a) {
        this.x = a;
        return this;
      },
      bj: function (a) {
        this.y = a;
        return this;
      },
      clone: function () {
        return new this.constructor(this.x, this.y, this.z);
      },
      K: function (a) {
        this.x = a.x;
        this.y = a.y;
        this.z = a.z;
        return this;
      },
      add: function (a, b) {
        if (void 0 !== b)
          return (
            console.warn(
              'JETHREE.Vector3: .add() now only accepts one argument. Use .addVectors( a, b ) instead.'
            ),
            this.$c(a, b)
          );
        this.x += a.x;
        this.y += a.y;
        this.z += a.z;
        return this;
      },
      $c: function (a, b) {
        this.x = a.x + b.x;
        this.y = a.y + b.y;
        this.z = a.z + b.z;
        return this;
      },
      sub: function (a, b) {
        if (void 0 !== b)
          return (
            console.warn(
              'JETHREE.Vector3: .sub() now only accepts one argument. Use .subVectors( a, b ) instead.'
            ),
            this.bb(a, b)
          );
        this.x -= a.x;
        this.y -= a.y;
        this.z -= a.z;
        return this;
      },
      bb: function (a, b) {
        this.x = a.x - b.x;
        this.y = a.y - b.y;
        this.z = a.z - b.z;
        return this;
      },
      multiply: function (a, b) {
        if (void 0 !== b)
          return (
            console.warn(
              'JETHREE.Vector3: .multiply() now only accepts one argument. Use .multiplyVectors( a, b ) instead.'
            ),
            (this.x = a.x * b.x),
            (this.y = a.y * b.y),
            (this.z = a.z * b.z),
            this
          );
        this.x *= a.x;
        this.y *= a.y;
        this.z *= a.z;
        return this;
      },
      Ba: function (a) {
        isFinite(a)
          ? ((this.x *= a), (this.y *= a), (this.z *= a))
          : (this.z = this.y = this.x = 0);
        return this;
      },
      Se: function (a) {
        return this.Ba(1 / a);
      },
      min: function (a) {
        this.x = Math.min(this.x, a.x);
        this.y = Math.min(this.y, a.y);
        this.z = Math.min(this.z, a.z);
        return this;
      },
      max: function (a) {
        this.x = Math.max(this.x, a.x);
        this.y = Math.max(this.y, a.y);
        this.z = Math.max(this.z, a.z);
        return this;
      },
      Ge: function (a, b) {
        this.x = Math.max(a.x, Math.min(b.x, this.x));
        this.y = Math.max(a.y, Math.min(b.y, this.y));
        this.z = Math.max(a.z, Math.min(b.z, this.z));
        return this;
      },
      floor: function () {
        this.x = Math.floor(this.x);
        this.y = Math.floor(this.y);
        this.z = Math.floor(this.z);
        return this;
      },
      ceil: function () {
        this.x = Math.ceil(this.x);
        this.y = Math.ceil(this.y);
        this.z = Math.ceil(this.z);
        return this;
      },
      round: function () {
        this.x = Math.round(this.x);
        this.y = Math.round(this.y);
        this.z = Math.round(this.z);
        return this;
      },
      kd: function (a) {
        return this.x * a.x + this.y * a.y + this.z * a.z;
      },
      Bf: function () {
        return this.x * this.x + this.y * this.y + this.z * this.z;
      },
      length: function () {
        return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z);
      },
      normalize: function () {
        return this.Se(this.length());
      },
      ob: function (a, b) {
        void 0 === b && (b = 0);
        this.x = a[b];
        this.y = a[b + 1];
        this.z = a[b + 2];
        return this;
      },
    };
    Wb.Oj = 'XYZ';
    Wb.prototype = {
      constructor: Wb,
      get x() {
        return this.B;
      },
      set x(a) {
        this.B = a;
      },
      get y() {
        return this.C;
      },
      set y(a) {
        this.C = a;
      },
      get z() {
        return this.D;
      },
      set z(a) {
        this.D = a;
      },
      get order() {
        return this.Oa;
      },
      set order(a) {
        this.Oa = a;
      },
      set: function (a, b, d, e) {
        this.B = a;
        this.C = b;
        this.D = d;
        this.Oa = e || this.Oa;
        return this;
      },
      clone: function () {
        return new this.constructor(this.B, this.C, this.D, this.Oa);
      },
      K: function (a) {
        this.B = a.B;
        this.C = a.C;
        this.D = a.D;
        this.Oa = a.Oa;
        return this;
      },
      ob: function (a) {
        this.B = a[0];
        this.C = a[1];
        this.D = a[2];
        void 0 !== a[3] && (this.Oa = a[3]);
        return this;
      },
    };
    vc.prototype = {
      constructor: vc,
      set: function (a, b) {
        this.min.K(a);
        this.max.K(b);
        return this;
      },
      clone: function () {
        return new this.constructor().K(this);
      },
      K: function (a) {
        this.min.K(a.min);
        this.max.K(a.max);
        return this;
      },
      empty: function () {
        return (
          this.max.x < this.min.x ||
          this.max.y < this.min.y ||
          this.max.z < this.min.z
        );
      },
      size: function (a) {
        return (a || new Ta()).bb(this.max, this.min);
      },
      getParameter: function (a, b) {
        return (b || new Ta()).set(
          (a.x - this.min.x) / (this.max.x - this.min.x),
          (a.y - this.min.y) / (this.max.y - this.min.y),
          (a.z - this.min.z) / (this.max.z - this.min.z)
        );
      },
      translate: function (a) {
        this.min.add(a);
        this.max.add(a);
        return this;
      },
    };
    Xb.prototype = {
      constructor: Xb,
      set: function (a, b, d, e, q, l, v, n, t, r, w, D, z, H, x, f) {
        var g = this.elements;
        g[0] = a;
        g[4] = b;
        g[8] = d;
        g[12] = e;
        g[1] = q;
        g[5] = l;
        g[9] = v;
        g[13] = n;
        g[2] = t;
        g[6] = r;
        g[10] = w;
        g[14] = D;
        g[3] = z;
        g[7] = H;
        g[11] = x;
        g[15] = f;
        return this;
      },
      clone: function () {
        return new Xb().ob(this.elements);
      },
      K: function (a) {
        this.elements.set(a.elements);
        return this;
      },
      multiply: function (a, b) {
        return void 0 !== b
          ? (console.warn(
              'JETHREE.Matrix4: .multiply() now only accepts one argument. Use .multiplyMatrices( a, b ) instead.'
            ),
            Pc(this, a, b))
          : Pc(this, this, a);
      },
      Ba: function (a) {
        var b = this.elements;
        b[0] *= a;
        b[4] *= a;
        b[8] *= a;
        b[12] *= a;
        b[1] *= a;
        b[5] *= a;
        b[9] *= a;
        b[13] *= a;
        b[2] *= a;
        b[6] *= a;
        b[10] *= a;
        b[14] *= a;
        b[3] *= a;
        b[7] *= a;
        b[11] *= a;
        b[15] *= a;
        return this;
      },
      setPosition: function (a) {
        var b = this.elements;
        b[12] = a.x;
        b[13] = a.y;
        b[14] = a.z;
        return this;
      },
      translate: function () {
        console.error('JETHREE.Matrix4: .translate() has been removed.');
      },
      scale: function (a) {
        var b = this.elements,
          d = a.x,
          e = a.y;
        a = a.z;
        b[0] *= d;
        b[4] *= e;
        b[8] *= a;
        b[1] *= d;
        b[5] *= e;
        b[9] *= a;
        b[2] *= d;
        b[6] *= e;
        b[10] *= a;
        b[3] *= d;
        b[7] *= e;
        b[11] *= a;
        return this;
      },
      ob: function (a) {
        this.elements.set(a);
        return this;
      },
    };
    wc.prototype = {
      constructor: wc,
      clone: function () {
        return new this.constructor().K(this);
      },
      K: function (a) {
        this.a = a.a;
        this.b = a.b;
        this.c = a.c;
        this.La.K(a.La);
        this.color.K(a.color);
        this.Xb = a.Xb;
        for (var b = 0, d = a.oe.length; b < d; b++)
          this.oe[b] = a.oe[b].clone();
        b = 0;
        for (d = a.Rg.length; b < d; b++) this.Rg[b] = a.Rg[b].clone();
        return this;
      },
    };
    var C = (function () {
        function a(p, h, G) {
          h = p.createShader(h);
          p.shaderSource(h, G);
          p.compileShader(h);
          return p.getShaderParameter(h, p.COMPILE_STATUS) ? h : !1;
        }
        function b(p, h) {
          da.ja() && (h.h = h.h.replace(/gl_FragData\[([0-3])\]/g, 'gbuf$1'));
          h.hf = a(p, p.VERTEX_SHADER, h.s, h.name + ' VERTEX');
          h.gf = a(p, p.FRAGMENT_SHADER, h.h, h.name + ' FRAGMENT');
          var G = p.createProgram();
          p.attachShader(G, h.hf);
          p.attachShader(G, h.gf);
          p.linkProgram(G);
          return G;
        }
        function d(p) {
          p.s = '#version 300 es\n' + p.s.replace(/varying/g, 'out');
          p.h = '#version 300 es\n' + p.h.replace(/varying/g, 'in');
          p.s = p.s.replace(/texture2D\(/g, 'texture(');
          p.h = p.h.replace(/texture2D\(/g, 'texture(');
          p.da ||
            ((p.h = p.h.replace(
              /void main/g,
              'out vec4 FragColor;\nvoid main'
            )),
            (p.h = p.h.replace(/gl_FragColor/g, 'FragColor')));
          var h = 0,
            G = [];
          p.s = p.s.replace(
            /attribute ([a-z]+[0-4]*) ([_a-zA-Z,0-9\s]+);/g,
            function (I, E, B) {
              var m = '';
              B.split(',').forEach(function (u) {
                u = u.trim();
                m += 'layout(location = ' + h + ') in ' + E + ' ' + u + ';\n';
                G.push(u);
                ++h;
              });
              return m;
            }
          );
          p.Tj = G;
        }
        function e(p) {
          return ['float', 'sampler2D', 'int']
            .map(function (h) {
              return 'precision ' + p + ' ' + h + ';\n';
            })
            .join('');
        }
        function q(p, h) {
          if (h.ai) return !1;
          var G = da.ja();
          U.Np || G || p.enableVertexAttribArray(0);
          void 0 === h.da && (h.da = !1);
          h.da && (h.Xc = G ? 3 : 2);
          h.id = L++;
          void 0 === h.Xc && (h.Xc = 2);
          void 0 === h.precision && (h.precision = 'highp');
          h.da &&
            (h.h =
              (da.ja()
                ? 'precision highp float;\n          layout(location = 0) out vec4 gbuf0;\n          layout(location = 1) out vec4 gbuf1;\n          layout(location = 2) out vec4 gbuf2;\n          layout(location = 3) out vec4 gbuf3;\n'
                : '#extension GL_EXT_draw_buffers : require\n') + h.h);
          void 0 === h.s &&
            (h.s =
              'precision lowp float;attribute vec2 a0;varying vec2 vv0;void main(){gl_Position=vec4(a0,0.,1.),vv0=a0*.5+vec2(.5,.5);}');
          var I = e(h.precision);
          h.h = I + h.h;
          h.s = I + h.s;
          G && 3 <= h.Xc && d(h);
          h.Da &&
            h.Da.forEach(function (E) {
              h.s = h.s.replace(E.search, E.replace);
              h.h = h.h.replace(E.search, E.replace);
            });
          h.na = b(p, h);
          h.A = {};
          h.i.forEach(function (E) {
            h.A[E] = p.getUniformLocation(h.na, E);
          });
          h.attributes = {};
          h.va = [];
          h.Qg = 0;
          void 0 === h.I && (h.I = ['a0']);
          void 0 === h.R && (h.R = [2]);
          h.I.forEach(function (E, B) {
            var m =
              G && 3 <= h.Xc ? h.Tj.indexOf(E) : p.getAttribLocation(h.na, E);
            h.attributes[E] = m;
            h.va.push(m);
            h.Qg += 4 * h.R[B];
          });
          h.set = function () {
            g !== h.id &&
              (-1 !== g && A.H(),
              (g = h.id),
              (A = h),
              p.useProgram(h.na),
              h.va.forEach(function (E) {
                0 !== E && p.enableVertexAttribArray(E);
              }));
          };
          h.H = function () {
            g = -1;
            h.va.forEach(function (E) {
              0 !== E && p.disableVertexAttribArray(E);
            });
          };
          h.ai = !0;
        }
        function l(p, h) {
          q(p, h);
          h.set();
          g = -1;
          return h;
        }
        function v() {
          return {
            name: '_',
            h: 'uniform sampler2D u1;varying vec2 vv0;void main(){gl_FragColor=texture2D(u1,vv0);}',
            i: ['u1'],
            precision: 'highp',
          };
        }
        function n() {
          k.j('s99', [{ type: '1i', name: 'u1', value: 0 }]);
          k.j('s100', [{ type: '1i', name: 'u151', value: 0 }]);
          k.j('s101', [{ type: '1i', name: 'u72', value: 0 }]);
        }
        function t() {
          var p = 'u39 u141 u142 u143 u144 u40 u76'.split(' ').concat(H, x);
          f.s102 = {
            name: '_',
            h: 'varying vec3 vv0;varying float vv1;void main(){gl_FragColor=vec4(vv0,vv1);}',
            s: 'attribute vec3 a0;uniform sampler2D u39;uniform vec3 u141;uniform vec2 u40,u149;uniform float u142,u147,u148,u143,u144,u150;varying vec3 vv0;varying float vv1;const vec2 e=vec2(1.);const vec3 o=vec3(1.);const vec2 D=vec2(-1.,1.),p=vec2(.16,.5),q=vec2(.5,.5),r=vec2(.84,.5);uniform mat4 u74;uniform vec3 u76,u80,u81,u82;uniform float u75,u83,u84,u77,u78,u79,u85;mat3 s(vec3 c){vec3 b=cos(c),a=sin(c);return mat3(b.y*b.z,b.y*a.z,a.y,-a.x*a.y*b.z+b.x*a.z,-a.x*a.y*a.z-b.x*b.z,a.x*b.y,b.x*a.y*b.z+a.x*a.z,b.x*a.y*a.z-a.x*b.z,-b.x*b.y);}void main(){vec4 d=texture2D(u39,p);vec2 f=u83*e;vec3 c=u83*o;vec2 t=mix(d.a*u40,e,f),g=(2.*d.gb-e)*(1.-f);g.x*=-1.;vec3 a=mix(texture2D(u39,q).rgb+vec3(u77,0.,0.),u80,c);float u=mix(texture2D(u39,r).r,0.,u83);a.z+=u;mat3 v=s(a);vec3 w=mix(u141,u81,c);float x=mix(u142,u84,u83);vec3 b=mix(u76,u82,c);b.x+=u75*sin(a.y);float h=cos(a.z),i=sin(a.z);mat2 y=mat2(h,i,-i,h);b.xy=y*b.xy;float z=mix(u79,1.,u83);vec2 j=u78/t;vec3 k=a0;float A=max(0.,-a0.z-u143)*u144;k.x+=A*sign(a0.x)*(1.-u83);vec3 l=v*(k+w)*x+b;vec2 B=j*z;vec3 C=vec3(g*B,-j)+l*vec3(1.,-1.,-1.);gl_Position=u74*(vec4(u85*e,e)*vec4(C,1.)),vv0=l,vv1=smoothstep(u147,u148,a0.z);}',
            i: ['u147', 'u148'].concat(p),
            I: ['a0'],
            precision: 'highp',
          };
          f.s103 = {
            name: '_',
            h: 'uniform sampler2D u1;uniform vec3 u145;uniform float u71;varying vec2 vv0;void main(){vec4 a=texture2D(u1,vv0);vec3 b=mix(u145,a.rgb,a.a);vec4 c=vec4(mix(a.rgb*u145,b,u71),a.a);gl_FragColor=c;}',
            s: 'attribute vec3 a0;attribute vec2 a1;uniform sampler2D u39;uniform vec3 u141;uniform vec2 u40,u149;uniform float u142,u143,u144,u150;varying vec2 vv0;const vec2 e=vec2(1.);const vec3 m=vec3(1.);const vec2 C=vec2(-1.,1.),n=vec2(.16,.5),o=vec2(.5,.5),p=vec2(.84,.5);uniform mat4 u74;uniform vec3 u76,u80,u81,u82;uniform float u75,u83,u84,u77,u78,u79,u85;mat3 q(vec3 c){vec3 b=cos(c),a=sin(c);return mat3(b.y*b.z,b.y*a.z,a.y,-a.x*a.y*b.z+b.x*a.z,-a.x*a.y*a.z-b.x*b.z,a.x*b.y,b.x*a.y*b.z+a.x*a.z,b.x*a.y*a.z-a.x*b.z,-b.x*b.y);}void main(){vec4 d=texture2D(u39,n);vec2 f=u83*e;vec3 c=u83*m;vec2 r=mix(d.a*u40,e,f),g=(2.*d.gb-e)*(1.-f);g.x*=-1.;vec3 a=mix(texture2D(u39,o).rgb+vec3(u77,0.,0.),u80,c);float s=mix(texture2D(u39,p).r,0.,u83);a.z+=s;mat3 t=q(a);vec3 u=mix(u141,u81,c);float v=mix(u142,u84,u83);vec3 b=mix(u76,u82,c);b.x+=u75*sin(a.y);float h=cos(a.z),i=sin(a.z);mat2 w=mat2(h,i,-i,h);b.xy=w*b.xy;float x=mix(u79,1.,u83);vec2 j=u78/r;vec3 k=a0;float y=max(0.,-a0.z-u143)*u144;k.x+=y*sign(a0.x)*(1.-u83);vec3 z=t*(k+u)*v+b;vec2 A=j*x;vec3 B=vec3(g*A,-j)+z*vec3(1.,-1.,-1.);gl_Position=u74*(vec4(u85*e,e)*vec4(B,1.)),vv0=a1;}',
            i: ['u145'].concat(D, p),
            I: ['a0', 'a1'],
            R: [3, 2],
            precision: 'lowp',
          };
          f.s104 = {
            name: '_',
            h: 'uniform vec3 u145;void main(){gl_FragColor=vec4(u145,0.);}',
            s: 'attribute vec3 a0;uniform sampler2D u39;uniform vec3 u141;uniform vec2 u40,u149;uniform float u142,u143,u144,u150;const vec2 e=vec2(1.);const vec3 l=vec3(1.);const vec2 B=vec2(-1.,1.),m=vec2(.16,.5),n=vec2(.5,.5),o=vec2(.84,.5);uniform mat4 u74;uniform vec3 u76,u80,u81,u82;uniform float u75,u83,u84,u77,u78,u79,u85;mat3 p(vec3 c){vec3 b=cos(c),a=sin(c);return mat3(b.y*b.z,b.y*a.z,a.y,-a.x*a.y*b.z+b.x*a.z,-a.x*a.y*a.z-b.x*b.z,a.x*b.y,b.x*a.y*b.z+a.x*a.z,b.x*a.y*a.z-a.x*b.z,-b.x*b.y);}void main(){vec4 d=texture2D(u39,m);vec2 f=u83*e;vec3 c=u83*l;vec2 q=mix(d.a*u40,e,f),g=(2.*d.gb-e)*(1.-f);g.x*=-1.;vec3 a=mix(texture2D(u39,n).rgb+vec3(u77,0.,0.),u80,c);float r=mix(texture2D(u39,o).r,0.,u83);a.z+=r;mat3 s=p(a);vec3 t=mix(u141,u81,c);float u=mix(u142,u84,u83);vec3 b=mix(u76,u82,c);b.x+=u75*sin(a.y);float h=cos(a.z),i=sin(a.z);mat2 v=mat2(h,i,-i,h);b.xy=v*b.xy;float w=mix(u79,1.,u83);vec2 j=u78/q;vec3 k=a0;float x=max(0.,-a0.z-u143)*u144;k.x+=x*sign(a0.x)*(1.-u83);vec3 y=s*(k+t)*u+b;vec2 z=j*w;vec3 A=vec3(g*z,-j)+y*vec3(1.,-1.,-1.);gl_Position=u74*(vec4(u85*e,e)*vec4(A,1.));}',
            i: ['u145'].concat(p),
            R: [3],
            precision: 'lowp',
          };
          f.s105 = {
            name: '_',
            h: 'uniform vec4 u9;varying vec3 vv0;varying float vv1;void main(){float a=u9.x+u9.y*smoothstep(-u9.w,-u9.z,vv1);gl_FragColor=vec4(normalize(vv0),a);}',
            s: 'attribute vec3 a0,a2;uniform sampler2D u39;uniform vec3 u141;uniform vec2 u40,u149;uniform float u142,u143,u144,u150;varying vec3 vv0;varying float vv1;const vec2 e=vec2(1.);const vec3 o=vec3(1.);const vec2 D=vec2(-1.,1.),p=vec2(.16,.5),q=vec2(.5,.5),r=vec2(.84,.5);uniform mat4 u74;uniform vec3 u76,u80,u81,u82;uniform float u75,u83,u84,u77,u78,u79,u85;mat3 s(vec3 c){vec3 b=cos(c),a=sin(c);return mat3(b.y*b.z,b.y*a.z,a.y,-a.x*a.y*b.z+b.x*a.z,-a.x*a.y*a.z-b.x*b.z,a.x*b.y,b.x*a.y*b.z+a.x*a.z,b.x*a.y*a.z-a.x*b.z,-b.x*b.y);}void main(){vec4 d=texture2D(u39,p);vec2 f=u83*e;vec3 c=u83*o;vec2 t=mix(d.a*u40,e,f),g=(2.*d.gb-e)*(1.-f);g.x*=-1.;vec3 a=mix(texture2D(u39,q).rgb+vec3(u77,0.,0.),u80,c);float u=mix(texture2D(u39,r).r,0.,u83);a.z+=u;mat3 h=s(a);vec3 v=mix(u141,u81,c);float w=mix(u142,u84,u83);vec3 b=mix(u76,u82,c);b.x+=u75*sin(a.y);float i=cos(a.z),j=sin(a.z);mat2 x=mat2(i,j,-j,i);b.xy=x*b.xy;float y=mix(u79,1.,u83);vec2 k=u78/t;vec3 l=a0;float z=max(0.,-a0.z-u143)*u144;l.x+=z*sign(a0.x)*(1.-u83);vec3 A=h*(l+v)*w+b;vec2 B=k*y;vec3 C=vec3(g*B,-k)+A*vec3(1.,-1.,-1.);gl_Position=u74*(vec4(u85*e,e)*vec4(C,1.)),vv0=h*a2*vec3(1.,-1.,-1.),vv1=a0.y;}',
            i: ['u9', 'u76'].concat(p),
            I: ['a0', 'a2'],
            precision: 'highp',
          };
          f.s106 = {
            name: '_',
            h: 'uniform sampler2D u151;uniform vec4 u9;varying vec4 vv0;varying vec3 vv1;varying vec2 vv2;varying float vv3;const vec3 i=vec3(1.,1.,1.);void main(){vec3 j=vec3(0.,0.,-1.),c=normalize(vv1),b=texture2D(u151,vv2).xyz;b=normalize(b*255./127.-1.007874*i);vec3 d=vv0.xyz,k=cross(c,d)*vv0.w;mat3 l=mat3(d,k,c);vec3 a=l*b;a=dot(a,j)>0.?vv1:a;float m=u9.x+u9.y*smoothstep(-u9.w,-u9.z,vv3);gl_FragColor=vec4(a,m);}',
            s: 'attribute vec4 a3;attribute vec3 a0,a2;attribute vec2 a1;uniform sampler2D u39;uniform vec3 u141;uniform vec2 u40,u149;uniform float u142,u143,u144,u150;varying vec4 vv0;varying vec3 vv1;varying vec2 vv2;varying float vv3;const vec2 e=vec2(1.);const vec3 q=vec3(1.);const vec2 F=vec2(-1.,1.),r=vec2(.16,.5),s=vec2(.5,.5),t=vec2(.84,.5);uniform mat4 u74;uniform vec3 u76,u80,u81,u82;uniform float u75,u83,u84,u77,u78,u79,u85;mat3 u(vec3 c){vec3 b=cos(c),a=sin(c);return mat3(b.y*b.z,b.y*a.z,a.y,-a.x*a.y*b.z+b.x*a.z,-a.x*a.y*a.z-b.x*b.z,a.x*b.y,b.x*a.y*b.z+a.x*a.z,b.x*a.y*a.z-a.x*b.z,-b.x*b.y);}void main(){vec4 d=texture2D(u39,r);vec2 f=u83*e;vec3 c=u83*q;vec2 v=mix(d.a*u40,e,f),g=(2.*d.gb-e)*(1.-f);g.x*=-1.;vec3 a=mix(texture2D(u39,s).rgb+vec3(u77,0.,0.),u80,c);float w=mix(texture2D(u39,t).r,0.,u83);a.z+=w;mat3 h=u(a);vec3 x=mix(u141,u81,c);float y=mix(u142,u84,u83);vec3 b=mix(u76,u82,c);b.x+=u75*sin(a.y);float i=cos(a.z),j=sin(a.z);mat2 z=mat2(i,j,-j,i);b.xy=z*b.xy;float A=mix(u79,1.,u83);vec2 k=u78/v;vec3 l=a0;float B=max(0.,-a0.z-u143)*u144;l.x+=B*sign(a0.x)*(1.-u83);vec3 C=h*(l+x)*y+b;vec2 D=k*A;vec3 E=vec3(g*D,-k)+C*vec3(1.,-1.,-1.);gl_Position=u74*(vec4(u85*e,e)*vec4(E,1.)),vv1=h*a2*vec3(1.,-1.,-1.),vv0=a3,vv2=a1,vv3=a0.y;}',
            i: ['u9', 'u76', 'u151'].concat(p),
            I: ['a3', 'a0', 'a2', 'a1'],
            R: [4, 3, 3, 2],
            precision: 'highp',
          };
          f.s107 = {
            name: '_',
            h: 'uniform vec4 u109;uniform float u146;void main(){float b=u146;vec4 a=u109;float c=floor(15.99*b),d=floor(15.99*a.b);a.b=(c+16.*d)/255.,gl_FragColor=a;}',
            s: 'attribute vec3 a0;uniform sampler2D u39;uniform vec3 u141;uniform vec2 u40,u149;uniform float u142,u143,u144,u150;const vec2 e=vec2(1.);const vec3 l=vec3(1.);const vec2 B=vec2(-1.,1.),m=vec2(.16,.5),n=vec2(.5,.5),o=vec2(.84,.5);uniform mat4 u74;uniform vec3 u76,u80,u81,u82;uniform float u75,u83,u84,u77,u78,u79,u85;mat3 p(vec3 c){vec3 b=cos(c),a=sin(c);return mat3(b.y*b.z,b.y*a.z,a.y,-a.x*a.y*b.z+b.x*a.z,-a.x*a.y*a.z-b.x*b.z,a.x*b.y,b.x*a.y*b.z+a.x*a.z,b.x*a.y*a.z-a.x*b.z,-b.x*b.y);}void main(){vec4 d=texture2D(u39,m);vec2 f=u83*e;vec3 c=u83*l;vec2 q=mix(d.a*u40,e,f),g=(2.*d.gb-e)*(1.-f);g.x*=-1.;vec3 a=mix(texture2D(u39,n).rgb+vec3(u77,0.,0.),u80,c);float r=mix(texture2D(u39,o).r,0.,u83);a.z+=r;mat3 s=p(a);vec3 t=mix(u141,u81,c);float u=mix(u142,u84,u83);vec3 b=mix(u76,u82,c);b.x+=u75*sin(a.y);float h=cos(a.z),i=sin(a.z);mat2 v=mat2(h,i,-i,h);b.xy=v*b.xy;float w=mix(u79,1.,u83);vec2 j=u78/q;vec3 k=a0;float x=max(0.,-a0.z-u143)*u144;k.x+=x*sign(a0.x)*(1.-u83);vec3 y=s*(k+t)*u+b;vec2 z=j*w;vec3 A=vec3(g*z,-j)+y*vec3(1.,-1.,-1.);gl_Position=u74*(vec4(u85*e,e)*vec4(A,1.));}',
            i: ['u109', 'u146'].concat(p),
            precision: 'lowp',
          };
          f.s108 = {
            name: '_',
            h: 'uniform sampler2D u72;uniform vec4 u109,u73;uniform float u146;varying vec2 vv0;vec2 i(float d,float e){float f=floor(d*255.+.01),a=pow(2.,e),g=256./a,b=f/a,c=floor(b),h=(b-c)*a;return vec2(c/(g-1.),h/(a-1.));}void main(){float c=u146;vec4 a=u109,d=texture2D(u72,vv0);vec2 b=i(d.b,4.);float f=1.-b.x,g=b.y;b=i(d.a,1.);float h=b.x,e=b.y;vec4 k=vec4(d.rg,g,h);float l=f;a=mix(a,k,u73*e),c=mix(c,l,u73.b*e);float m=floor(15.99*c),n=floor(15.99*a.b);a.b=(m+16.*n)/255.,gl_FragColor=a;}',
            s: 'attribute vec3 a0;attribute vec2 a1;uniform sampler2D u39;uniform vec3 u141;uniform vec2 u40,u149;uniform float u142,u143,u144,u150;varying vec2 vv0;const vec2 e=vec2(1.);const vec3 m=vec3(1.);const vec2 C=vec2(-1.,1.),n=vec2(.16,.5),o=vec2(.5,.5),p=vec2(.84,.5);uniform mat4 u74;uniform vec3 u76,u80,u81,u82;uniform float u75,u83,u84,u77,u78,u79,u85;mat3 q(vec3 c){vec3 b=cos(c),a=sin(c);return mat3(b.y*b.z,b.y*a.z,a.y,-a.x*a.y*b.z+b.x*a.z,-a.x*a.y*a.z-b.x*b.z,a.x*b.y,b.x*a.y*b.z+a.x*a.z,b.x*a.y*a.z-a.x*b.z,-b.x*b.y);}void main(){vec4 d=texture2D(u39,n);vec2 f=u83*e;vec3 c=u83*m;vec2 r=mix(d.a*u40,e,f),g=(2.*d.gb-e)*(1.-f);g.x*=-1.;vec3 a=mix(texture2D(u39,o).rgb+vec3(u77,0.,0.),u80,c);float s=mix(texture2D(u39,p).r,0.,u83);a.z+=s;mat3 t=q(a);vec3 u=mix(u141,u81,c);float v=mix(u142,u84,u83);vec3 b=mix(u76,u82,c);b.x+=u75*sin(a.y);float h=cos(a.z),i=sin(a.z);mat2 w=mat2(h,i,-i,h);b.xy=w*b.xy;float x=mix(u79,1.,u83);vec2 j=u78/r;vec3 k=a0;float y=max(0.,-a0.z-u143)*u144;k.x+=y*sign(a0.x)*(1.-u83);vec3 z=t*(k+u)*v+b;vec2 A=j*x;vec3 B=vec3(g*A,-j)+z*vec3(1.,-1.,-1.);gl_Position=u74*(vec4(u85*e,e)*vec4(B,1.)),vv0=a1;}',
            i: ['u109', 'u146'].concat(z, p),
            I: ['a0', 'a1'],
            R: [3, 2],
            precision: 'lowp',
          };
          p = ['u134', 'u122', 'u135'];
          f.s109 = {
            name: '_',
            h: 'varying vec3 vv0;varying float vv1;void main(){gl_FragColor=vec4(vv0,vv1);}',
            s: 'attribute vec3 a0;uniform mat4 u134,u122,u135;varying vec3 vv0;varying float vv1;void main(){vec4 a=u135*vec4(a0,1.);gl_Position=u134*u122*a,vv0=a.xyz,vv1=1.;}',
            i: p,
            precision: 'highp',
          };
          f.s110 = {
            name: '_',
            h: 'varying vec3 vv0;void main(){gl_FragColor=vec4(normalize(vv0),1.);}',
            s: 'attribute vec3 a0,a2;uniform mat4 u134,u122,u135;varying vec3 vv0;varying float vv1;void main(){vec4 a=u135*vec4(a2,0.);gl_Position=u134*u122*u135*vec4(a0,1.),vv0=a.xyz,vv1=a0.y;}',
            i: p,
            I: ['a0', 'a2'],
            precision: 'highp',
          };
          f.s100 = {
            name: '_',
            h: 'uniform sampler2D u151;uniform vec3 u152;varying vec4 vv0;varying vec3 vv1,vv2;varying vec2 vv3;const vec3 i=vec3(1.,1.,1.);void main(){vec3 j=normalize(vv1+u152),c=normalize(vv2),b=texture2D(u151,vv3).xyz;b=normalize(b*255./127.-1.007874*i);vec3 d=vv0.xyz,k=cross(c,d)*vv0.w;mat3 l=mat3(d,k,c);vec3 a=l*b;a=dot(a,j)>0.?vv2:a,gl_FragColor=vec4(a,1.);}',
            s: 'attribute vec4 a3;attribute vec3 a0,a2;attribute vec2 a1;uniform mat4 u134,u122,u135;varying vec4 vv0;varying vec3 vv1,vv2;varying vec2 vv3;void main(){vec4 b=u135*vec4(a2,0.),a=u135*vec4(a0,1.);gl_Position=u134*u122*a,vv0=a3,vv2=b.xyz,vv3=a1,vv1=a.xyz;}',
            i: ['u151', 'u152'].concat(p),
            I: ['a0', 'a2', 'a1', 'a3'],
            precision: 'highp',
          };
          f.s99 = {
            name: '_',
            h: 'uniform sampler2D u1;uniform vec3 u145;uniform float u71;varying vec2 vv0;void main(){vec4 a=texture2D(u1,vv0);vec3 b=mix(u145,a.rgb,a.a);vec4 c=vec4(mix(a.rgb*u145,b,u71),a.a);gl_FragColor=c;}',
            s: 'attribute vec3 a0;attribute vec2 a1;uniform mat4 u134,u122,u135;varying vec2 vv0;const vec4 f=vec4(0.,0.,5e-4,0.);void main(){gl_Position=u134*u122*u135*vec4(a0,1.)+f,vv0=a1;}',
            i: ['u145'].concat(D, p),
            I: ['a0', 'a1'],
            Da: [{ search: '0.0005', replace: Ea.fa() ? '0.0005' : '0.0' }],
            precision: 'lowp',
          };
          f.s111 = {
            name: '_',
            h: 'uniform vec4 u109;uniform float u146;void main(){float b=u146;vec4 a=u109;float c=floor(15.99*b),d=floor(15.99*a.b);a.b=(c+16.*d)/255.,gl_FragColor=a;}',
            s: 'attribute vec3 a0;uniform mat4 u134,u122,u135;void main(){gl_Position=u134*u122*u135*vec4(a0,1.);}',
            i: ['u109'].concat(p),
            precision: 'highp',
          };
          f.s101 = {
            name: '_',
            h: 'uniform sampler2D u72;uniform vec4 u109,u73;uniform float u146;varying vec2 vv0;vec2 i(float d,float e){float f=floor(d*255.+.01),a=pow(2.,e),g=256./a,b=f/a,c=floor(b),h=(b-c)*a;return vec2(c/(g-1.),h/(a-1.));}void main(){float c=u146;vec4 a=u109,d=texture2D(u72,vv0);vec2 b=i(d.b,4.);float f=1.-b.x,g=b.y;b=i(d.a,1.);float h=b.x,e=b.y;vec4 k=vec4(d.rg,g,h);float l=f;a=mix(a,k,u73*e),c=mix(c,l,u73.b*e);float m=floor(15.99*c),n=floor(15.99*a.b);a.b=(m+16.*n)/255.,gl_FragColor=a;}',
            s: 'attribute vec3 a0;attribute vec2 a1;uniform mat4 u134,u122,u135;varying vec2 vv0;void main(){gl_Position=u134*u122*u135*vec4(a0,1.),vv0=a1;}',
            i: ['u109'].concat(z, p),
            I: ['a0', 'a1'],
            R: [3, 2],
            precision: 'highp',
          };
        }
        function r() {
          for (var p in f) q(c, f[p]);
        }
        var w = !1,
          D = ['u1', 'u71'],
          z = ['u72', 'u73'],
          H = 'u74 u75 u76 u77 u78 u79'.split(' '),
          x = 'u80 u81 u82 u83 u84 u85'.split(' '),
          f = {},
          g = -1,
          A = null,
          L = 0,
          k = {
            oa: function (p, h) {
              f[p] = h;
              w && q(c, f[p]);
            },
            cq: function (p, h) {
              f[p] = h;
              h.ai = !1;
              q(c, f[p]);
            },
            Vb: function () {
              return w;
            },
            m: function () {
              f.s0 = v();
              f.s1 = {
                name: '_',
                h: 'uniform sampler2D u1;varying vec2 vv0;void main(){gl_FragColor=texture2D(u1,vv0);}',
                i: ['u1'],
                precision: 'lowp',
              };
              f.s71 = {
                name: '_',
                h: 'uniform sampler2D u1,u8;uniform float u9;varying vec2 vv0;const vec3 f=vec3(1.,1.,1.);void main(){gl_FragColor=vec4(mix(texture2D(u8,vv0).rgb,texture2D(u1,vv0).rgb,u9*f),1.);}',
                i: ['u1', 'u8', 'u9'],
                precision: 'highp',
              };
              f.s72 = {
                name: '_',
                h: 'uniform sampler2D u1,u8;uniform float u9;varying vec2 vv0;const vec4 f=vec4(1.,1.,1.,1.);void main(){gl_FragColor=mix(texture2D(u8,vv0),texture2D(u1,vv0),u9*f);}',
                i: ['u1', 'u8', 'u9'],
                precision: 'highp',
              };
              f.s12 = {
                name: '_',
                h: 'uniform sampler2D u1,u86;uniform vec2 u87;uniform float u88,u89;varying vec2 vv0;const vec4 f=vec4(1.,1.,1.,1.);void main(){vec4 b=texture2D(u86,vv0*u87),c=texture2D(u1,vv0*u87);float a=smoothstep(u88,0.,vv0.y);a+=smoothstep(1.-u88,1.,vv0.y),gl_FragColor=pow(mix(c,b,a*f),u89*f);}',
                i: ['u1', 'u87', 'u86', 'u88', 'u89'],
              };
              f.s73 = {
                name: '_',
                h: 'uniform sampler2D u1,u86;uniform vec2 u87;uniform float u88,u89;varying vec2 vv0;const vec3 h=vec3(1.,1.,1.);vec4 i(vec3 d){vec3 b=d/65536.,a=clamp(ceil(log2(b)),-128.,127.);float c=max(max(a.r,a.g),a.b),f=exp2(c);vec3 g=clamp(b/f,0.,1.);return vec4(g,(c+128.)/256.);}void main(){vec2 a=vv0*u87;float c=floor(a.x),d=mod(c,2.);a.x=mod(a.x,1.),a.x=mix(a.x,1.-a.x,d);vec3 f=texture2D(u86,a).rgb,g=texture2D(u1,a).rgb;float b=smoothstep(u88,0.,vv0.y);b+=smoothstep(1.-u88,1.,vv0.y);vec3 j=mix(g,f,b*h);vec4 k=i(pow(j,u89*h));gl_FragColor=k;}',
                i: ['u1', 'u87', 'u86', 'u88', 'u89'],
                precision: 'highp',
              };
              f.s74 = {
                name: '_',
                h: 'uniform sampler2D u1;varying vec2 vv0;void main(){vec4 a=texture2D(u1,vv0);if(a.a<.5)discard;gl_FragColor=a;}',
                i: ['u1'],
                precision: 'lowp',
              };
              f.s75 = {
                name: '_',
                h: 'uniform sampler2D u1,u90;uniform vec2 u10;varying vec2 vv0;const vec2 f=vec2(-.9,.4),g=vec2(.4,.9),h=vec2(-.4,-.9),i=vec2(.9,-.4);void main(){vec2 a=vv0;vec3 b=texture2D(u1,a).rgb+texture2D(u1,a+u10*f).rgb+texture2D(u1,a+u10*g).rgb+texture2D(u1,a+u10*h).rgb+texture2D(u1,a+u10*i).rgb;gl_FragColor=vec4(b/5.,1.);}',
                i: ['u1', 'u10'],
                precision: 'lowp',
              };
              f.s76 = {
                name: '_',
                h: 'uniform sampler2D u1,u90,u39;uniform vec2 u10,u91;varying vec2 vv0;const vec3 k=vec3(1.,1.,1.);const vec2 f=vec2(-.9,.4),g=vec2(.4,.9),h=vec2(-.4,-.9),i=vec2(.9,-.4);void main(){vec2 a=vv0;vec3 b=texture2D(u1,a).rgb+texture2D(u1,a+u10*f).rgb+texture2D(u1,a+u10*g).rgb+texture2D(u1,a+u10*h).rgb+texture2D(u1,a+u10*i).rgb;float c=texture2D(u39,vec2(.5,.5)).a,d=u91.x+pow(c,2.)*(u91.y-u91.x);vec3 j=mix(b/5.,texture2D(u90,a).rgb,d);gl_FragColor=vec4(j,1.);}',
                i: ['u1', 'u90', 'u10', 'u39', 'u91'],
                precision: 'lowp',
              };
              f.s77 = {
                name: '_',
                h: 'uniform sampler2D u1;uniform vec2 u10;varying vec2 vv0;const vec3 f=vec3(.299,.587,.114);const float m=.007813,n=.125,h=8.;void main(){vec2 x=vv0;vec3 o=texture2D(u1,vv0+vec2(-1.,-1.)*u10).xyz,p=texture2D(u1,vv0+vec2(1.,-1.)*u10).xyz,q=texture2D(u1,vv0+vec2(-1.,1.)*u10).xyz,r=texture2D(u1,vv0+vec2(1.,1.)*u10).xyz,s=texture2D(u1,vv0).xyz;float b=dot(o,f),c=dot(p,f),e=dot(q,f),g=dot(r,f),i=dot(s,f),t=min(i,min(min(b,c),min(e,g))),u=max(i,max(max(b,c),max(e,g)));vec2 a;a.x=-(b+c-(e+g)),a.y=b+e-(c+g);float v=max((b+c+e+g)*(.25*n),m),w=1./(min(abs(a.x),abs(a.y))+v);a=min(vec2(h,h),max(vec2(-h,-h),a*w))*u10;vec3 j=.5*(texture2D(u1,vv0+a*-.166667).rgb+texture2D(u1,vv0+a*.166667).rgb),k=j*.5+.25*(texture2D(u1,vv0+a*-.5).rgb+texture2D(u1,vv0+a*.5).rgb);float l=dot(k,f);gl_FragColor=l<t||l>u?vec4(j,1.):vec4(k,1.);}',
                i: ['u1', 'u10'],
                precision: 'lowp',
              };
              f.s44 = {
                name: '_',
                h: 'uniform sampler2D u1;varying vec2 vv0;const vec3 f=vec3(0.,0.,0.);vec4 g(vec3 d){vec3 b=d/65536.,a=clamp(ceil(log2(b)),-128.,127.);float c=max(max(a.r,a.g),a.b),h=exp2(c);vec3 i=clamp(b/h,0.,1.);return vec4(i,(c+128.)/256.);}void main(){vec3 a=texture2D(u1,vv0).rgb;gl_FragColor=g(max(a,f));}',
                i: ['u1'],
                precision: 'highp',
              };
              f.s78 = {
                name: '_',
                h: 'uniform sampler2D u92,u93;uniform float u94,u95;varying vec2 vv0;void main(){vec3 a=texture2D(u93,vv0).rgb,b=texture2D(u92,vv0).rgb;gl_FragColor=vec4(b*u95+u94*a,1.);}',
                i: ['u92', 'u93', 'u94', 'u95'],
                precision: 'highp',
              };
              f.s79 = {
                name: '_',
                h: 'uniform sampler2D u96,u97;uniform float u89;varying vec2 vv0;const int j=8888;const float e=3.141592;const vec2 k=vec2(0.,0.);const vec3 n=vec3(1.,1.,1.),o=vec3(0.,0.,0.);void main(){float p=e*(vv0.x*2.-1.),q=e/2.*(vv0.y*2.-1.),b,c,r,l,m;vec4 d;vec3 f=o;vec2 g=k,a=k;for(int h=0;h<j;h+=1)a.x=float(h),a.y=floor(a.x/64.),d=texture2D(u97,a/64.),b=e*d.r,c=2.*asin(sqrt(.25+d.g*.25)),l=p+c*cos(b),m=q+c*sin(b),g.x=.5+.5*l/e,g.y=.5+m/e,f+=pow(texture2D(u96,g).rgb,u89*n);f/=float(j),gl_FragColor=vec4(f,1.);}',
                i: ['u96', 'u97', 'u89'],
                precision: 'lowp',
                Da: [{ search: '8888', replace: U.nm[da.T()] }],
              };
              f.s80 = {
                name: '_',
                h: 'uniform sampler2D u1;uniform vec2 u10;varying vec2 vv0;void main(){vec4 a=texture2D(u1,vv0);float b=.031496*texture2D(u1,vv0-3.*u10).a+.110236*texture2D(u1,vv0-2.*u10).a+.220472*texture2D(u1,vv0-u10).a+.275591*a.a+.220472*texture2D(u1,vv0+u10).a+.110236*texture2D(u1,vv0+2.*u10).a+.031496*texture2D(u1,vv0+3.*u10).a;gl_FragColor=vec4(a.rgb,4.*b);}',
                i: ['u1', 'u10'],
                precision: 'lowp',
              };
              f.s81 = {
                name: '_',
                h: 'uniform sampler2D u1;varying vec2 vv0;const vec3 f=vec3(1.,1.,1.);void main(){vec4 a=texture2D(u1,vv0);float b=.3*pow(a.a,2.);gl_FragColor=vec4(a.rgb+b*f,1.);}',
                i: ['u1'],
                precision: 'lowp',
              };
              f.s82 = {
                name: '_',
                h: 'uniform sampler2D u1;uniform vec2 u10;varying vec2 vv0;void main(){vec4 a=.031496*texture2D(u1,vv0-3.*u10)+.110236*texture2D(u1,vv0-2.*u10)+.220472*texture2D(u1,vv0-u10)+.275591*texture2D(u1,vv0)+.220472*texture2D(u1,vv0+u10)+.110236*texture2D(u1,vv0+2.*u10)+.031496*texture2D(u1,vv0+3.*u10);gl_FragColor=a;}',
                i: ['u1', 'u10'],
                precision: 'lowp',
              };
              f.s83 = {
                name: '_',
                h: 'uniform sampler2D u1;uniform vec2 u10;varying vec2 vv0;void main(){vec4 a=texture2D(u1,vv0-3.*u10)+texture2D(u1,vv0-2.*u10)+texture2D(u1,vv0-u10)+texture2D(u1,vv0)+texture2D(u1,vv0+u10)+texture2D(u1,vv0+2.*u10)+texture2D(u1,vv0+3.*u10);gl_FragColor=a/7.;}',
                i: ['u1', 'u10'],
                precision: 'lowp',
              };
              f.s84 = {
                name: '_',
                h: 'uniform sampler2D u1;varying vec2 vv0;const vec4 g=vec4(0.,0.,0.,0.);const float e=256.;void main(){vec4 b=g;float c=0.;vec2 d;for(float a=0.;a<e;a+=1.)d=vec2((a+.5)/e,vv0.y),b+=texture2D(u1,d),c+=1.;gl_FragColor=b/c;}',
                i: ['u1'],
                precision: 'highp',
              };
              f.s85 = {
                name: '_',
                h: 'uniform sampler2D u1,u86;varying vec2 vv0;const vec4 h=vec4(1.,1.,1.,1.);const float f=0.,g=.3;void main(){vec4 b=texture2D(u86,vv0),c=texture2D(u1,vv0);float a=smoothstep(g,f,vv0.y);a+=smoothstep(1.-g,1.-f,vv0.y),gl_FragColor=mix(c,b,a*h);}',
                i: ['u1', 'u86'],
                precision: 'highp',
              };
              f.s86 = {
                name: '_',
                h: 'uniform sampler2D u1,u86;varying vec2 vv0;const vec3 h=vec3(1.,1.,1.);const float f=0.,g=.3;vec4 i(vec3 d){vec3 b=d/65536.,a=clamp(ceil(log2(b)),-128.,127.);float c=max(max(a.r,a.g),a.b),j=exp2(c);vec3 k=clamp(b/j,0.,1.);return vec4(k,(c+128.)/256.);}void main(){vec3 b=texture2D(u86,vv0).rgb,c=texture2D(u1,vv0).rgb;float a=smoothstep(g,f,vv0.y);a+=smoothstep(1.-g,1.-f,vv0.y),gl_FragColor=i(mix(c,b,a*h));}',
                i: ['u1', 'u86'],
                precision: 'highp',
              };
              f.s87 = {
                name: '_',
                h: 'uniform sampler2D u1,u98,u2,u99;uniform vec4 u100;uniform vec2 u101;uniform float u102,u103,u104,u105;varying vec2 vv0;const vec2 g=vec2(1.,1.),h=vec2(.5,.5);const float e=3.141592;void main(){vec4 d=texture2D(u1,vv0),i=texture2D(u98,vec2(1.-vv0.x,vv0.y));float j=step(texture2D(u99,vec2(.25,.5)).r,1.);vec2 a=vv0*2.-g;float k=texture2D(u2,a*u101*.5+h).r,l=atan(a.x,a.y),m=-(mod(u102,2.*e)-e),b=mod(l-m+e,2.*e)-e,n=smoothstep(0.,u103,b),c=.5+u105*(.5-n);c*=(sign(b)+1.)/2.;vec4 o=i+c*u100*k;gl_FragColor=mix(d,o,j*u104);}',
                i: 'u1 u2 u99 u98 u100 u102 u103 u104 u101 u105'.split(' '),
                precision: 'lowp',
              };
              var p =
                'u106 u107 u108 u109 u96 u110 u3 u111 u98 u112 u113 u114 u115 u116 u10'.split(
                  ' '
                );
              U.ea &&
                (f.s88 = {
                  name: '_',
                  h: 'uniform sampler2D u106,u107,u108,u109,u96,u110,u117,u98;uniform vec3 u111,u114;uniform vec2 u10;uniform float u3,u118,u113,u115,u112;varying vec2 vv0;const float j=3.141592;const vec3 u=vec3(0.,0.,0.),v=vec3(.299,.587,.114);const float w=2.;vec3 l(vec4 a){float b=a.a*256.-128.;vec3 c=a.rgb;return exp2(b)*c*65536.;}vec2 x(vec3 a){float b=atan(a.x,a.z),c=acos(-a.y);return vec2(.5-.5*b/j,1.-c/j);}vec2 y(vec3 a,float b){vec2 d=vec2(1.,.5)/pow(2.,b),f=vec2(0.,1.-pow(.5,b));float g=atan(a.x,a.z),h=acos(-a.y),c=.5+.5*g/j,i=h/j,k=pow(2.,b)/u112;c=(1.-k)*c;return f+vec2(c,i)*d;}void main(){vec4 c=texture2D(u106,vv0);vec3 k=texture2D(u98,vec2(1.-vv0.x,vv0.y)).rgb;if(c.a<.01){gl_FragColor=vec4(k,0.);return;}float z=c.a;vec3 A=c.rgb,B=A+u111;vec4 b=texture2D(u109,vv0),m=texture2D(u107,vv0);vec3 d=m.rgb;float f=m.a;vec4 n=texture2D(u108,vv0);vec3 C=n.rgb;float o=b.r,D=b.g,p=floor(b.b*255.),g=floor(p/16.),E=(p-16.*g)/16.;g/=16.;float F=b.a;f=1.-(1.-f)*(1.-n.a);vec2 G=x(-d);vec3 q=(1.-F)*l(texture2D(u110,G)),r=normalize(B),h=u,s=reflect(-r,d);vec2 H=y(s,floor(D*u3));float I=acos(-s.z),J=smoothstep(u113-u115,u113+u115,I);h=mix(l(texture2D(u96,H)),u114,J);float a=o+(E-o)*pow(1.-dot(d,-r),g*16.);a=clamp(a,0.,1.);float t=1.-u118*texture2D(u117,vv0).r;h*=pow(t,2.),q*=t;vec3 i=C*mix(q,h,a),M=mix(k,i,z*(f*(1.-a)+a));float K=dot(i,v),L=max(0.,(K-1.)/(w-1.));gl_FragColor=vec4(i,L);}',
                  i: p.concat(['u117', 'u118']),
                  precision: 'highp',
                });
              f.s89 = {
                name: '_',
                h: 'uniform sampler2D u106,u107,u108,u109,u96,u110,u98;uniform vec3 u111,u114;uniform vec2 u10;uniform float u3,u113,u115,u116,u119,u120,u112,u121;varying vec2 vv0;const float g=3.141592;const vec3 G=vec3(0.),m=vec3(1.),H=vec3(.299,.587,.114);const float I=2.;vec3 r(vec4 a){float b=a.a*256.-128.;vec3 c=a.rgb;return exp2(b)*c*65536.;}vec2 J(vec3 a){float b=atan(a.x,-a.z),c=acos(-a.y);return vec2(.5-.5*b/g,1.-c/g);}vec2 K(vec3 a,float e){float b=pow(2.,e);vec2 f=vec2(1.,.5)/b,h=vec2(0.,1.-1./b);float i=atan(a.x,a.z),j=acos(-a.y),c=.5+.5*i/g,k=j/g,l=.5*b/u112;c=(1.-l)*c;return h+vec2(c,k)*f;}float n(vec3 a,vec3 b){return abs(acos(dot(a,b)));}float o(vec2 a){float b=texture2D(u106,a).a;return step(.01,b);}vec3 p(vec2 a){return texture2D(u98,vec2(1.-a.x,a.y)).rgb;}void main(){vec4 h=texture2D(u106,vv0);if(h.a<.01){gl_FragColor=vec4(p(vv0),0.);return;}float i=h.a;vec3 L=h.rgb,M=L+u111;vec4 c=texture2D(u109,vv0),s=texture2D(u107,vv0);vec3 a=s.rgb;float j=s.a;vec4 k=texture2D(u108,vv0);vec3 e=k.rgb;if(i>1.){gl_FragColor=vec4(mix(p(vv0),e,k.a),1.);return;}e=pow(e,u119*m);float t=c.r,N=c.g,O=c.a,u=floor(c.b*255.),l=floor(u/16.),P=(u-16.*l)/16.;l/=16.,j=1.-(1.-j)*(1.-k.a);vec2 v=vv0+vec2(-1.,0.)*u10,w=vv0+vec2(1.,0.)*u10,x=vv0+vec2(0.,1.)*u10,y=vv0+vec2(0.,-1.)*u10;vec3 Q=texture2D(u107,v).rgb,R=texture2D(u107,w).rgb,S=texture2D(u107,x).rgb,T=texture2D(u107,y).rgb;float U=n(a,Q)*o(v),V=n(a,R)*o(w),W=n(a,S)*o(x),X=n(a,T)*o(y),Y=2.*max(max(U,V),max(W,X)),Z=1.2*clamp(Y/g,0.,1.),_=max(N,Z);vec2 aa=J(a);vec3 ba=r(texture2D(u110,aa)),ca=(1.-O)*ba,z=normalize(M),A=G,B=reflect(-z,a);float da=floor(_*u3);vec2 ea=K(B,da);float fa=acos(-B.z),ga_=smoothstep(u113-u115,u113+u115,fa);vec3 ha=r(texture2D(u96,ea));A=mix(ha,u114,ga_*u116);float b=t+(P-t)*pow(1.+dot(a,z),l*15.);b=clamp(b,0.,1.);vec2 C=vv0;vec3 D=refract(vec3(0.,0.,-1.),a,.666667);float ia=smoothstep(.1,.3,length(D.xy)),E=sqrt(u10.y/u10.x),ja=smoothstep(.3,.8,i);C+=ja*D.xy*vec2(1./E,E)*ia*.03;vec3 ka=e*mix(ca,A,b);float q=i*(j*(1.-b)+b);vec3 f=mix(p(C),pow(ka,m/u119),q);float F=dot(f,H),la=max(0.,(F-1.)/(I-1.));f=mix(F*m,f,mix(1.,u120,q)*m);float ma=mix(la,q,u121);gl_FragColor=vec4(f,ma);}',
                i: p.concat(['u121', 'u119', 'u120']),
                precision: 'highp',
              };
              U.ea &&
                ((f.s90 = {
                  name: '_',
                  h: 'uniform sampler2D u106,u107;uniform mat4 u122;uniform vec2 u123,u10,u124;uniform float u125,u126,u127,u128,u129,u130,u131,u132,u118;varying vec2 vv0;const float PI=3.141593,HALFPI=1.570796,N=8888.8;void main(){vec2 uvt=vv0+u124;vec4 pos=texture2D(u106,uvt);if(pos.a<.01){gl_FragColor=vec4(0.,0.,0.,1.);return;}vec3 co0=pos.rgb;float c=cos(u125),s=sin(u125);vec3 no0=texture2D(u107,uvt).rgb;float zv=(u122*vec4(co0,1.)).z;vec3 co;vec2 scale=u123/abs(zv),uv,duv=u10*vec2(c,s)*scale;vec3 dp,dpn;float dzMax=0.,angleMin=0.,angle;for(float i=0.;i<N;i+=1.)uv=uvt+i*duv,co=texture2D(u106,uv).rgb,dp=co-co0,dpn=normalize(dp),angle=atan(dot(no0,dpn),length(cross(no0,dpn))),angle*=1.-smoothstep(u131,u132,length(dp)),angleMin=max(angleMin,angle),dzMax=max(dzMax,sin(angle)*length(dp));float angleMinInv=0.;for(float i=0.;i<N;i+=1.)uv=uvt-i*duv,co=texture2D(u106,uv).rgb,dp=co-co0,dpn=normalize(dp),angle=atan(dot(no0,dpn),length(cross(no0,dpn))),angle*=1.-smoothstep(u131,u132,length(dp)),dzMax=max(dzMax,sin(angle)*length(dp)),angleMinInv=max(angleMinInv,angle);duv=u10*vec2(s,c)*scale;float angleMin2=0.;for(float i=0.;i<N;i+=1.)uv=uvt+i*duv,co=texture2D(u106,uv).rgb,dp=co-co0,dpn=normalize(dp),angle=atan(dot(no0,dpn),length(cross(no0,dpn))),angle*=1.-smoothstep(u131,u132,length(dp)),dzMax=max(dzMax,sin(angle)*length(dp)),angleMin2=max(angleMin2,angle);float angleMin2Inv=0.;for(float i=0.;i<N;i+=1.)uv=uvt-i*duv,co=texture2D(u106,uv).rgb,dp=co-co0,dpn=normalize(dp),angle=atan(dot(no0,dpn),length(cross(no0,dpn))),angle*=1.-smoothstep(u131,u132,length(dp)),dzMax=max(dzMax,sin(angle)*length(dp)),angleMin2Inv=max(angleMin2Inv,angle);float omegaMin=PI/4.*(angleMin+angleMinInv)*(angleMin2+angleMin2Inv),dzFactor=clamp(dzMax/u128,u129,1.),ao=dzFactor*clamp(u127*omegaMin*u130,0.,u118);gl_FragColor=vec4(ao,ao,ao,u126);}',
                  i: 'u106 u107 u127 u126 u125 u10 u133 u128 u129 u130 u131 u132 u122 u123 u118'.split(
                    ' '
                  ),
                  Da: [{ search: '8888.8', replace: U.mk[da.T()].toFixed(1) }],
                  precision: 'lowp',
                }),
                (f.s91 = {
                  name: '_',
                  h: 'uniform sampler2D u1;uniform vec2 u10;varying vec2 vv0;const vec2 f=vec2(-.9,.4),g=vec2(.4,.9),h=vec2(-.4,-.9),i=vec2(.9,-.4),j=vec2(-1.9,.9),k=vec2(.9,1.9),l=vec2(-.9,-1.9),m=vec2(1.9,-.9);void main(){vec2 a=vv0;vec4 b=texture2D(u1,a)+texture2D(u1,a+u10*f)+texture2D(u1,a+u10*g)+texture2D(u1,a+u10*h)+texture2D(u1,a+u10*i);b+=texture2D(u1,a+u10*j)+texture2D(u1,a+u10*k)+texture2D(u1,a+u10*l)+texture2D(u1,a+u10*m),gl_FragColor=b/9.;}',
                  i: ['u1', 'u10'],
                  precision: 'lowp',
                }));
              f.s92 = {
                name: '_',
                h: 'varying vec3 vv0;void main(){gl_FragColor=vec4(vv0,1.);}',
                s: 'attribute vec3 a0;uniform mat4 u134,u122,u135;varying vec3 vv0;void main(){vec4 a=u134*u122*u135*vec4(a0,1.);gl_Position=a,vv0=a.xyz/a.w;}',
                i: ['u134', 'u122', 'u135'],
                precision: 'lowp',
              };
              f.s93 = {
                name: '_',
                h: 'uniform sampler2D u136,u110,u97;uniform mat4 u134,u137;uniform vec2 u138;uniform float u139;varying vec2 vv0;const float n=8888.8,o=9999.9,p=25.,v=50.,w=1.2,e=3.141592;const vec4 x=vec4(0.,0.,0.,0.),A=vec4(1.,1.,1.,1.);const vec2 f=vec2(.5,.5);vec2 y(vec3 a){float b=atan(a.x,a.z),c=acos(a.y);return vec2(.5-.5*b/e,1.-c/e);}void main(){float d,a,q;vec2 z=vec2(vv0.x,1.-vv0.y),b;vec3 r=vec3(u138*(z-f),0.),B=vec3(u137*vec4(r,1.)),g,s;vec4 t=x,h,c,u;vec3 i;int j;for(float k=0.;k<n;k+=1.){b.x=k,b.y=floor(b.x/64.),c=texture2D(u97,b/64.),d=e*c.r,a=2.*asin(sqrt(.25+c.g*.25)),g=vec3(cos(d)*sin(a),sin(d)*sin(a),-cos(a)),q=p+(.5+.5*c.b)*(v-p),j=0;for(float l=0.;l<=o;l+=1.){u=vec4(r+g*q*pow(l/o,w),1.),h=u134*u,i=h.xyz/h.w;if(texture2D(u136,f+f*i.xy).z<i.z){j=1;break;}}if(j==1)continue;s=vec3(u137*vec4(g,0.)),t+=texture2D(u110,y(s));}gl_FragColor=vec4(u139*t.rgb/n,1.);}',
                i: 'u136 u110 u97 u134 u137 u138 u139'.split(' '),
                Da: [
                  { search: '8888.8', replace: U.io[da.T()].toFixed(1) },
                  { search: '9999.9', replace: U.jo[da.T()].toFixed(1) },
                ],
                precision: 'lowp',
              };
              f.s94 = {
                name: '_',
                h: 'uniform sampler2D u1;uniform vec2 u10;varying vec2 vv0;void main(){vec4 a=.285714*texture2D(u1,vv0-u10)+.428571*texture2D(u1,vv0)+.285714*texture2D(u1,vv0+u10);gl_FragColor=a;}',
                i: ['u1', 'u10'],
                precision: 'lowp',
              };
              f.s95 = {
                name: '_',
                h: 'uniform sampler2D u1,u140;varying vec2 vv0;void main(){gl_FragColor=texture2D(u1,vv0);}',
                s: 'attribute vec3 a0;attribute vec2 a1;uniform mat4 u134,u122;varying vec2 vv0;void main(){vec4 a=u134*u122*vec4(a0,1.);gl_Position=a,vv0=a1;}',
                i: ['u134', 'u122', 'u1'],
                I: ['a0', 'a1'],
                precision: 'lowp',
              };
              if (da.Z()) {
                p =
                  'u39 u141 u142 u143 u144 u40 u109 u145 u146 u9 u147 u148 u76'
                    .split(' ')
                    .concat(H, x);
                da.mi() ||
                  (f.s96 = {
                    name: '_',
                    s: 'attribute vec2 a0;void main(){gl_Position=vec4(a0,0.,1.);}',
                    h: 'void main(){gl_FragData[0]=vec4(0.,0.,0.,0.),gl_FragData[1]=vec4(0.,0.,0.,0.),gl_FragData[2]=vec4(0.,0.,0.,0.),gl_FragData[3]=vec4(0.,0.,0.,0.);}',
                    i: [],
                    precision: 'lowp',
                    da: !0,
                  });
                f.s97 = {
                  name: '_',
                  s: 'attribute vec2 a0;void main(){gl_Position=vec4(a0,0.,1.);}',
                  h: 'uniform vec4 color;void main(){gl_FragData[0]=color,gl_FragData[1]=color,gl_FragData[2]=color,gl_FragData[3]=color;}',
                  i: ['color'],
                  da: !0,
                };
                f.s98NNGLcolor = {
                  name: '_',
                  h: 'uniform vec4 u109,u9;uniform vec3 u145;uniform float u146;varying vec3 vv0,vv1;varying float vv2,vv3;void main(){float b=u9.x+u9.y*smoothstep(-u9.w,-u9.z,vv3),c=u146;vec4 a=u109;float d=floor(15.99*c),i=floor(15.99*a.b);a.b=(d+16.*i)/255.,gl_FragData[0]=vec4(vv0,vv2),gl_FragData[1]=vec4(normalize(vv1),b),gl_FragData[2]=vec4(u145,0.),gl_FragData[3]=a;}',
                  s: 'attribute vec3 a0,a2;uniform sampler2D u39;uniform vec3 u141;uniform vec2 u40,u149;uniform float u142,u147,u148,u143,u144,u150;varying vec3 vv0,vv1;varying float vv2,vv3;const vec2 e=vec2(1.);const vec3 r=vec3(1.);const vec2 F=vec2(-1.,1.),s=vec2(.16,.5),t=vec2(.5,.5),u=vec2(.84,.5);uniform mat4 u74;uniform vec3 u76,u80,u81,u82;uniform float u75,u83,u84,u77,u78,u79,u85;mat3 v(vec3 c){vec3 b=cos(c),a=sin(c);return mat3(b.y*b.z,b.y*a.z,a.y,-a.x*a.y*b.z+b.x*a.z,-a.x*a.y*a.z-b.x*b.z,a.x*b.y,b.x*a.y*b.z+a.x*a.z,b.x*a.y*a.z-a.x*b.z,-b.x*b.y);}void main(){vec4 d=texture2D(u39,s);vec2 f=u83*e;vec3 c=u83*r;vec2 w=mix(d.a*u40,e,f),g=(2.*d.gb-e)*(1.-f);g.x*=-1.;vec3 a=mix(texture2D(u39,t).rgb+vec3(u77,0.,0.),u80,c);float x=mix(texture2D(u39,u).r,0.,u83);a.z+=x;mat3 h=v(a);vec3 y=mix(u141,u81,c);float z=mix(u142,u84,u83);vec3 b=mix(u76,u82,c);b.x+=u75*sin(a.y);float i=cos(a.z),j=sin(a.z);mat2 A=mat2(i,j,-j,i);b.xy=A*b.xy;float B=mix(u79,1.,u83);vec2 k=u78/w;vec3 l=a0;float C=max(0.,-a0.z-u143)*u144;l.x+=C*sign(a0.x)*(1.-u83);vec3 m=h*(l+y)*z+b;vec2 D=k*B;vec3 E=vec3(g*D,-k)+m*vec3(1.,-1.,-1.);gl_Position=u74*(vec4(u85*e,e)*vec4(E,1.)),vv1=h*a2*vec3(1.,-1.,-1.),vv2=smoothstep(u147,u148,a0.z),vv0=m,vv3=a0.y;}',
                  i: p,
                  I: ['a0', 'a2'],
                  R: [3, 3],
                  da: !0,
                };
                f.s98NNGLtexture = {
                  name: '_',
                  h: 'uniform sampler2D u1;uniform vec4 u109,u9;uniform vec3 u145;uniform float u146,u71;varying vec3 vv0,vv1;varying vec2 vv2;varying float vv3,vv4;void main(){float c=u9.x+u9.y*smoothstep(-u9.w,-u9.z,vv4),d=u146;vec4 b=u109;float j=floor(15.99*d),k=floor(15.99*b.b);b.b=(j+16.*k)/255.;vec4 a=texture2D(u1,vv2);vec3 l=mix(u145,a.rgb,a.a);vec4 m=vec4(mix(a.rgb*u145,l,u71),a.a);gl_FragData[0]=vec4(vv0,vv3),gl_FragData[1]=vec4(normalize(vv1),c),gl_FragData[2]=m,gl_FragData[3]=b;}',
                  s: 'attribute vec3 a0,a2;attribute vec2 a1;uniform sampler2D u39;uniform vec3 u141;uniform vec2 u40,u149;uniform float u142,u147,u148,u143,u144,u150;varying vec3 vv0,vv1;varying vec2 vv2;varying float vv3,vv4;const vec2 e=vec2(1.);const vec3 s=vec3(1.);const vec2 G=vec2(-1.,1.),t=vec2(.16,.5),u=vec2(.5,.5),v=vec2(.84,.5);uniform mat4 u74;uniform vec3 u76,u80,u81,u82;uniform float u75,u83,u84,u77,u78,u79,u85;mat3 w(vec3 c){vec3 b=cos(c),a=sin(c);return mat3(b.y*b.z,b.y*a.z,a.y,-a.x*a.y*b.z+b.x*a.z,-a.x*a.y*a.z-b.x*b.z,a.x*b.y,b.x*a.y*b.z+a.x*a.z,b.x*a.y*a.z-a.x*b.z,-b.x*b.y);}void main(){vec4 d=texture2D(u39,t);vec2 f=u83*e;vec3 c=u83*s;vec2 x=mix(d.a*u40,e,f),g=(2.*d.gb-e)*(1.-f);g.x*=-1.;vec3 a=mix(texture2D(u39,u).rgb+vec3(u77,0.,0.),u80,c);float y=mix(texture2D(u39,v).r,0.,u83);a.z+=y;mat3 h=w(a);vec3 z=mix(u141,u81,c);float A=mix(u142,u84,u83);vec3 b=mix(u76,u82,c);b.x+=u75*sin(a.y);float i=cos(a.z),j=sin(a.z);mat2 B=mat2(i,j,-j,i);b.xy=B*b.xy;float C=mix(u79,1.,u83);vec2 k=u78/x;vec3 l=a0;float D=max(0.,-a0.z-u143)*u144;l.x+=D*sign(a0.x)*(1.-u83);vec3 m=h*(l+z)*A+b;vec2 E=k*C;vec3 F=vec3(g*E,-k)+m*vec3(1.,-1.,-1.);gl_Position=u74*(vec4(u85*e,e)*vec4(F,1.)),vv1=h*a2*vec3(1.,-1.,-1.),vv3=smoothstep(u147,u148,a0.z),vv2=a1,vv0=m,vv4=a0.y;}',
                  i: p.concat(D),
                  I: ['a0', 'a2', 'a1'],
                  R: [3, 3, 2],
                  da: !0,
                };
                f.s98NNGLtextureNormalMap = {
                  name: '_',
                  h: 'uniform vec4 u109,u9;uniform vec3 u145;uniform sampler2D u1,u151;uniform float u146,u71;varying vec4 vv0;varying vec3 vv1,vv2;varying vec2 vv3;varying float vv4,vv5;const vec3 l=vec3(1.,1.,1.);void main(){float m=u9.x+u9.y*smoothstep(-u9.w,-u9.z,vv5);vec3 v=vec3(0.,0.,-1.),d=normalize(vv2),b=texture2D(u151,vv3).xyz;b=normalize(b*255./127.-1.007874*l);vec3 g=vv0.xyz,n=cross(d,g)*vv0.w;mat3 o=mat3(g,n,d);vec3 p=o*b;float q=u146;vec4 c=u109;float r=floor(15.99*q),s=floor(15.99*c.b);c.b=(r+16.*s)/255.;vec4 a=texture2D(u1,vv3);vec3 t=mix(u145,a.rgb,a.a);vec4 u=vec4(mix(a.rgb*u145,t,u71),a.a);gl_FragData[0]=vec4(vv1,vv4),gl_FragData[1]=vec4(p,m),gl_FragData[2]=u,gl_FragData[3]=c;}',
                  s: 'attribute vec4 a3;attribute vec3 a0,a2;attribute vec2 a1;uniform sampler2D u39;uniform vec3 u141;uniform vec2 u40,u149;uniform float u142,u147,u148,u143,u144,u150;varying vec4 vv0;varying vec3 vv1,vv2;varying vec2 vv3;varying float vv4,vv5;const vec2 e=vec2(1.);const vec3 t=vec3(1.);const vec2 H=vec2(-1.,1.),u=vec2(.16,.5),v=vec2(.5,.5),w=vec2(.84,.5);uniform mat4 u74;uniform vec3 u76,u80,u81,u82;uniform float u75,u83,u84,u77,u78,u79,u85;mat3 x(vec3 c){vec3 b=cos(c),a=sin(c);return mat3(b.y*b.z,b.y*a.z,a.y,-a.x*a.y*b.z+b.x*a.z,-a.x*a.y*a.z-b.x*b.z,a.x*b.y,b.x*a.y*b.z+a.x*a.z,b.x*a.y*a.z-a.x*b.z,-b.x*b.y);}void main(){vec4 d=texture2D(u39,u);vec2 f=u83*e;vec3 c=u83*t;vec2 y=mix(d.a*u40,e,f),g=(2.*d.gb-e)*(1.-f);g.x*=-1.;vec3 a=mix(texture2D(u39,v).rgb+vec3(u77,0.,0.),u80,c);float z=mix(texture2D(u39,w).r,0.,u83);a.z+=z;mat3 h=x(a);vec3 A=mix(u141,u81,c);float B=mix(u142,u84,u83);vec3 b=mix(u76,u82,c);b.x+=u75*sin(a.y);float i=cos(a.z),j=sin(a.z);mat2 C=mat2(i,j,-j,i);b.xy=C*b.xy;float D=mix(u79,1.,u83);vec2 k=u78/y;vec3 l=a0;float E=max(0.,-a0.z-u143)*u144;l.x+=E*sign(a0.x)*(1.-u83);vec3 m=h*(l+A)*B+b;vec2 F=k*D;vec3 G=vec3(g*F,-k)+m*vec3(1.,-1.,-1.);gl_Position=u74*(vec4(u85*e,e)*vec4(G,1.)),vv2=h*a2*vec3(1.,-1.,-1.),vv4=smoothstep(u147,u148,a0.z),vv0=a3,vv3=a1,vv1=m,vv5=a0.y;}',
                  i: p.concat(D, ['u151']),
                  I: ['a3', 'a0', 'a2', 'a1'],
                  R: [4, 3, 3, 2],
                  da: !0,
                };
                f.s98NNGLtextureParamsMap = {
                  name: '_',
                  h: 'uniform sampler2D u1,u72;uniform vec4 u109,u9,u73;uniform vec3 u145;uniform float u146,u71;varying vec3 vv0,vv1;varying vec2 vv2;varying float vv3,vv4;vec2 j(float d,float e){float f=floor(d*255.+.01),a=pow(2.,e),g=256./a,b=f/a,c=floor(b),h=(b-c)*a;return vec2(c/(g-1.),h/(a-1.));}void main(){float g=u9.x+u9.y*smoothstep(-u9.w,-u9.z,vv4),d=u146;vec4 a=u109,e=texture2D(u72,vv2);vec2 b=j(e.b,4.);float h=1.-b.x,o=b.y;b=j(e.a,1.);float p=b.x,f=b.y;vec4 q=vec4(e.rg,o,p);float r=h;a=mix(a,q,u73*f),d=mix(d,r,u73.b*f);float s=floor(15.99*d),t=floor(15.99*a.b);a.b=(s+16.*t)/255.;vec4 c=texture2D(u1,vv2);vec3 u=mix(u145,c.rgb,c.a);vec4 v=vec4(mix(c.rgb*u145,u,u71),c.a);gl_FragData[0]=vec4(vv0,vv3),gl_FragData[1]=vec4(normalize(vv1),g),gl_FragData[2]=v,gl_FragData[3]=a;}',
                  s: 'attribute vec3 a0,a2;attribute vec2 a1;uniform sampler2D u39;uniform vec3 u141;uniform vec2 u40,u149;uniform float u142,u147,u148,u143,u144,u150;varying vec3 vv0,vv1;varying vec2 vv2;varying float vv3,vv4;const vec2 e=vec2(1.);const vec3 s=vec3(1.);const vec2 G=vec2(-1.,1.),t=vec2(.16,.5),u=vec2(.5,.5),v=vec2(.84,.5);uniform mat4 u74;uniform vec3 u76,u80,u81,u82;uniform float u75,u83,u84,u77,u78,u79,u85;mat3 w(vec3 c){vec3 b=cos(c),a=sin(c);return mat3(b.y*b.z,b.y*a.z,a.y,-a.x*a.y*b.z+b.x*a.z,-a.x*a.y*a.z-b.x*b.z,a.x*b.y,b.x*a.y*b.z+a.x*a.z,b.x*a.y*a.z-a.x*b.z,-b.x*b.y);}void main(){vec4 d=texture2D(u39,t);vec2 f=u83*e;vec3 c=u83*s;vec2 x=mix(d.a*u40,e,f),g=(2.*d.gb-e)*(1.-f);g.x*=-1.;vec3 a=mix(texture2D(u39,u).rgb+vec3(u77,0.,0.),u80,c);float y=mix(texture2D(u39,v).r,0.,u83);a.z+=y;mat3 h=w(a);vec3 z=mix(u141,u81,c);float A=mix(u142,u84,u83);vec3 b=mix(u76,u82,c);b.x+=u75*sin(a.y);float i=cos(a.z),j=sin(a.z);mat2 B=mat2(i,j,-j,i);b.xy=B*b.xy;float C=mix(u79,1.,u83);vec2 k=u78/x;vec3 l=a0;float D=max(0.,-a0.z-u143)*u144;l.x+=D*sign(a0.x)*(1.-u83);vec3 m=h*(l+z)*A+b;vec2 E=k*C;vec3 F=vec3(g*E,-k)+m*vec3(1.,-1.,-1.);gl_Position=u74*(vec4(u85*e,e)*vec4(F,1.)),vv1=h*a2*vec3(1.,-1.,-1.),vv3=smoothstep(u147,u148,a0.z),vv2=a1,vv0=m,vv4=a0.y;}',
                  i: p.concat(D, z),
                  I: ['a0', 'a2', 'a1'],
                  R: [3, 3, 2],
                  da: !0,
                };
                f.s98NNGLtextureNormalParamsMap = {
                  name: '_',
                  h: 'uniform sampler2D u1,u151,u72;uniform vec4 u109,u9,u73;uniform vec3 u145;uniform float u146,u71;varying vec4 vv0;varying vec3 vv1,vv2;varying vec2 vv3;varying float vv4,vv5;const vec3 q=vec3(1.,1.,1.);vec2 k(float d,float e){float f=floor(d*255.+.01),a=pow(2.,e),g=256./a,b=f/a,c=floor(b),h=(b-c)*a;return vec2(c/(g-1.),h/(a-1.));}void main(){float r=u9.x+u9.y*smoothstep(-u9.w,-u9.z,vv5);vec3 E=vec3(0.,0.,-1.),g=normalize(vv2),d=texture2D(u151,vv3).xyz;d=normalize(d*255./127.-1.007874*q);vec3 h=vv0.xyz,s=cross(g,h)*vv0.w;mat3 t=mat3(h,s,g);vec3 u=t*d;float e=u146;vec4 a=u109,f=texture2D(u72,vv3);vec2 b=k(f.b,4.);float v=1.-b.x,w=b.y;b=k(f.a,1.);float x=b.x,l=b.y;vec4 y=vec4(f.rg,w,x);float z=v;a=mix(a,y,u73*l),e=mix(e,z,u73.b*l);float A=floor(15.99*e),B=floor(15.99*a.b);a.b=(A+16.*B)/255.;vec4 c=texture2D(u1,vv3);vec3 C=mix(u145,c.rgb,c.a);vec4 D=vec4(mix(c.rgb*u145,C,u71),c.a);gl_FragData[0]=vec4(vv1,vv4),gl_FragData[1]=vec4(u,r),gl_FragData[2]=D,gl_FragData[3]=a;}',
                  s: 'attribute vec4 a3;attribute vec3 a0,a2;attribute vec2 a1;uniform sampler2D u39;uniform vec3 u141;uniform vec2 u40,u149;uniform float u142,u147,u148,u143,u144,u150;varying vec4 vv0;varying vec3 vv1,vv2;varying vec2 vv3;varying float vv4,vv5;const vec2 e=vec2(1.);const vec3 t=vec3(1.);const vec2 H=vec2(-1.,1.),u=vec2(.16,.5),v=vec2(.5,.5),w=vec2(.84,.5);uniform mat4 u74;uniform vec3 u76,u80,u81,u82;uniform float u75,u83,u84,u77,u78,u79,u85;mat3 x(vec3 c){vec3 b=cos(c),a=sin(c);return mat3(b.y*b.z,b.y*a.z,a.y,-a.x*a.y*b.z+b.x*a.z,-a.x*a.y*a.z-b.x*b.z,a.x*b.y,b.x*a.y*b.z+a.x*a.z,b.x*a.y*a.z-a.x*b.z,-b.x*b.y);}void main(){vec4 d=texture2D(u39,u);vec2 f=u83*e;vec3 c=u83*t;vec2 y=mix(d.a*u40,e,f),g=(2.*d.gb-e)*(1.-f);g.x*=-1.;vec3 a=mix(texture2D(u39,v).rgb+vec3(u77,0.,0.),u80,c);float z=mix(texture2D(u39,w).r,0.,u83);a.z+=z;mat3 h=x(a);vec3 A=mix(u141,u81,c);float B=mix(u142,u84,u83);vec3 b=mix(u76,u82,c);b.x+=u75*sin(a.y);float i=cos(a.z),j=sin(a.z);mat2 C=mat2(i,j,-j,i);b.xy=C*b.xy;float D=mix(u79,1.,u83);vec2 k=u78/y;vec3 l=a0;float E=max(0.,-a0.z-u143)*u144;l.x+=E*sign(a0.x)*(1.-u83);vec3 m=h*(l+A)*B+b;vec2 F=k*D;vec3 G=vec3(g*F,-k)+m*vec3(1.,-1.,-1.);gl_Position=u74*(vec4(u85*e,e)*vec4(G,1.)),vv2=h*a2*vec3(1.,-1.,-1.),vv4=smoothstep(u147,u148,a0.z),vv0=a3,vv3=a1,vv1=m,vv5=a0.y;}',
                  i: p.concat(D, ['u151'], z),
                  I: ['a3', 'a0', 'a2', 'a1'],
                  R: [4, 3, 3, 2],
                  da: !0,
                };
                p = 'u134 u122 u135 u109 u145 u146 u9'.split(' ');
                f.s98color = {
                  name: '_',
                  h: 'uniform vec4 u109,u9;uniform vec3 u145;uniform float u146;varying vec3 vv0,vv1;varying float vv2,vv3;void main(){float b=u9.x+u9.y*smoothstep(-u9.w,-u9.z,vv3),c=u146;vec4 a=u109;float d=floor(15.99*c),i=floor(15.99*a.b);a.b=(d+16.*i)/255.,gl_FragData[0]=vec4(vv0,vv2),gl_FragData[1]=vec4(normalize(vv1),b),gl_FragData[2]=vec4(u145,0.),gl_FragData[3]=a;}',
                  s: 'attribute vec3 a0,a2;uniform mat4 u134,u122,u135;varying vec3 vv0,vv1;varying float vv2,vv3;void main(){vec4 a=u135*vec4(a0,1.),b=u135*vec4(a2,0.);gl_Position=u134*u122*a,vv0=a.xyz,vv1=b.xyz,vv2=1.,vv3=a0.y;}',
                  i: p,
                  I: ['a0', 'a2'],
                  da: !0,
                };
                f.s98 = {
                  name: '_',
                  h: 'uniform sampler2D u1;uniform vec4 u109,u9;uniform vec3 u145;uniform float u146,u71;varying vec3 vv0,vv1;varying vec2 vv2;varying float vv3,vv4;void main(){float c=u9.x+u9.y*smoothstep(-u9.w,-u9.z,vv4),d=u146;vec4 b=u109;float j=floor(15.99*d),k=floor(15.99*b.b);b.b=(j+16.*k)/255.;vec4 a=texture2D(u1,vv2);vec3 l=mix(u145,a.rgb,a.a);vec4 m=vec4(mix(a.rgb*u145,l,u71),a.a);gl_FragData[0]=vec4(vv0,vv3),gl_FragData[1]=vec4(normalize(vv1),c),gl_FragData[2]=m,gl_FragData[3]=b;}',
                  s: 'attribute vec3 a0,a2;attribute vec2 a1;uniform mat4 u134,u122,u135;varying vec3 vv0,vv1;varying vec2 vv2;varying float vv3,vv4;void main(){vec4 a=u135*vec4(a0,1.),b=u135*vec4(a2,0.);gl_Position=u134*u122*a,vv2=a1,vv0=a.xyz,vv1=b.xyz,vv3=1.,vv4=a0.y;}',
                  i: p.concat(D),
                  I: ['a0', 'a2', 'a1'],
                  da: !0,
                };
                var h = ['u151', 'u152'];
                f.s98NormalMap = {
                  name: '_',
                  h: 'uniform sampler2D u1,u151;uniform vec4 u109,u9;uniform vec3 u152,u145;uniform float u146,u71;varying vec4 vv0;varying vec3 vv1,vv2;varying vec2 vv3;varying float vv4,vv5;const vec3 l=vec3(1.,1.,1.);void main(){float m=u9.x+u9.y*smoothstep(-u9.w,-u9.z,vv5);vec3 v=vec3(0.,0.,-1.),d=normalize(vv2),b=texture2D(u151,vv3).xyz;b=normalize(b*255./127.-1.007874*l);vec3 g=vv0.xyz,n=cross(d,g)*vv0.w;mat3 o=mat3(g,n,d);vec3 p=o*b;float q=u146;vec4 c=u109;float r=floor(15.99*q),s=floor(15.99*c.b);c.b=(r+16.*s)/255.;vec4 a=texture2D(u1,vv3);vec3 t=mix(u145,a.rgb,a.a);vec4 u=vec4(mix(a.rgb*u145,t,u71),a.a);gl_FragData[0]=vec4(vv1,vv4),gl_FragData[1]=vec4(p,m),gl_FragData[2]=u,gl_FragData[3]=c;}',
                  s: 'attribute vec4 a3;attribute vec3 a0,a2;attribute vec2 a1;uniform mat4 u134,u122,u135;varying vec4 vv0;varying vec3 vv1,vv2;varying vec2 vv3;varying float vv4,vv5;void main(){vec4 a=u135*vec4(a0,1.),b=u135*vec4(a2,0.);gl_Position=u134*u122*a,vv0=a3,vv3=a1,vv1=a.xyz,vv2=b.xyz,vv4=1.,vv5=a0.y;}',
                  i: p.concat(D, h),
                  I: ['a0', 'a2', 'a1', 'a3'],
                  da: !0,
                };
                f.s98ParamsMap = {
                  name: '_',
                  h: 'uniform sampler2D u1,u72;uniform vec4 u109,u9,u73;uniform vec3 u145;uniform float u146,u71;varying vec3 vv0,vv1;varying vec2 vv2;varying float vv3,vv4;vec2 j(float d,float e){float f=floor(d*255.+.01),a=pow(2.,e),g=256./a,b=f/a,c=floor(b),h=(b-c)*a;return vec2(c/(g-1.),h/(a-1.));}void main(){float g=u9.x+u9.y*smoothstep(-u9.w,-u9.z,vv4),d=u146;vec4 a=u109,e=texture2D(u72,vv2);vec2 b=j(e.b,4.);float h=1.-b.x,o=b.y;b=j(e.a,1.);float p=b.x,f=b.y;vec4 q=vec4(e.rg,o,p);float r=h;a=mix(a,q,u73*f),d=mix(d,r,u73.b*f);float s=floor(15.99*d),t=floor(15.99*a.b);a.b=(s+16.*t)/255.;vec4 c=texture2D(u1,vv2);vec3 u=mix(u145,c.rgb,c.a);vec4 v=vec4(mix(c.rgb*u145,u,u71),c.a);gl_FragData[0]=vec4(vv0,vv3),gl_FragData[1]=vec4(normalize(vv1),g),gl_FragData[2]=v,gl_FragData[3]=a;}',
                  s: 'attribute vec3 a0,a2;attribute vec2 a1;uniform mat4 u134,u122,u135;varying vec3 vv0,vv1;varying vec2 vv2;varying float vv3,vv4;void main(){vec4 a=u135*vec4(a0,1.),b=u135*vec4(a2,0.);gl_Position=u134*u122*a,vv2=a1,vv0=a.xyz,vv1=b.xyz,vv3=1.,vv4=a0.y;}',
                  i: p.concat(D, z),
                  I: ['a0', 'a2', 'a1'],
                  da: !0,
                };
                f.s98NormalParamsMap = {
                  name: '_',
                  h: 'uniform sampler2D u1,u151,u72;uniform vec4 u109,u9,u73;uniform vec3 u152,u145;uniform float u146,u71;varying vec4 vv0;varying vec3 vv1,vv2;varying vec2 vv3;varying float vv4,vv5;const vec3 q=vec3(1.,1.,1.);vec2 k(float d,float e){float f=floor(d*255.+.01),a=pow(2.,e),g=256./a,b=f/a,c=floor(b),h=(b-c)*a;return vec2(c/(g-1.),h/(a-1.));}void main(){float r=u9.x+u9.y*smoothstep(-u9.w,-u9.z,vv5);vec3 E=vec3(0.,0.,-1.),g=normalize(vv2),d=texture2D(u151,vv3).xyz;d=normalize(d*255./127.-1.007874*q);vec3 h=vv0.xyz,s=cross(g,h)*vv0.w;mat3 t=mat3(h,s,g);vec3 u=t*d;float e=u146;vec4 a=u109,f=texture2D(u72,vv3);vec2 b=k(f.b,4.);float v=1.-b.x,w=b.y;b=k(f.a,1.);float x=b.x,l=b.y;vec4 y=vec4(f.rg,w,x);float z=v;a=mix(a,y,u73*l),e=mix(e,z,u73.b*l);float A=floor(15.99*e),B=floor(15.99*a.b);a.b=(A+16.*B)/255.;vec4 c=texture2D(u1,vv3);vec3 C=mix(u145,c.rgb,c.a);vec4 D=vec4(mix(c.rgb*u145,C,u71),c.a);gl_FragData[0]=vec4(vv1,vv4),gl_FragData[1]=vec4(u,r),gl_FragData[2]=D,gl_FragData[3]=a;}',
                  s: 'attribute vec4 a3;attribute vec3 a0,a2;attribute vec2 a1;uniform mat4 u134,u122,u135;varying vec4 vv0;varying vec3 vv1,vv2;varying vec2 vv3;varying float vv4,vv5;void main(){vec4 a=u135*vec4(a0,1.),b=u135*vec4(a2,0.);gl_Position=u134*u122*a,vv0=a3,vv3=a1,vv1=a.xyz,vv2=b.xyz,vv4=1.,vv5=a0.y;}',
                  i: p.concat(D, h, z),
                  I: ['a0', 'a2', 'a1', 'a3'],
                  da: !0,
                };
              } else t();
              r();
              p = [{ type: '1i', name: 'u1', value: 0 }];
              k.j('s0', p);
              k.j('s1', p);
              k.j('s71', [{ type: '1i', name: 'u8', value: 1 }].concat(p));
              k.j('s72', [{ type: '1i', name: 'u8', value: 1 }].concat(p));
              k.j('s12', [{ type: '1i', name: 'u86', value: 1 }].concat(p));
              k.j('s73', [{ type: '1i', name: 'u86', value: 1 }].concat(p));
              k.j('s74', p);
              k.j('s75', p);
              k.j(
                's76',
                [
                  { type: '1i', name: 'u90', value: 1 },
                  { type: '1i', name: 'u39', value: 2 },
                ].concat(p)
              );
              k.j('s77', p);
              k.j('s44', p);
              k.j('s78', [
                { type: '1i', name: 'u92', value: 0 },
                { type: '1i', name: 'u93', value: 1 },
              ]);
              k.j('s79', [
                { type: '1i', name: 'u96', value: 0 },
                { type: '1i', name: 'u97', value: 1 },
              ]);
              k.j('s80', p);
              k.j('s81', p);
              k.j('s82', p);
              k.j('s83', p);
              k.j('s84', p);
              k.j('s85', [{ type: '1i', name: 'u86', value: 1 }].concat(p));
              k.j('s86', [{ type: '1i', name: 'u86', value: 1 }].concat(p));
              U.ea &&
                (k.j('s90', [
                  { type: '1i', name: 'u106', value: 0 },
                  { type: '1i', name: 'u107', value: 1 },
                  { type: '1f', name: 'u128', value: U.ak },
                  { type: '1f', name: 'u129', value: U.bk },
                  { type: '1f', name: 'u130', value: U.nk },
                  { type: '1f', name: 'u131', value: U.ek },
                  { type: '1f', name: 'u132', value: U.fk },
                  { type: '1f', name: 'u127', value: 1 },
                  { type: '1f', name: 'u118', value: 1 },
                ]),
                k.j('s91', p));
              h = [
                { type: '1i', name: 'u106', value: 0 },
                { type: '1i', name: 'u107', value: 1 },
                { type: '1i', name: 'u108', value: 2 },
                { type: '1i', name: 'u96', value: 3 },
                { type: '1i', name: 'u110', value: 4 },
                { type: '1i', name: 'u109', value: 6 },
                { type: '1i', name: 'u98', value: 7 },
                { type: '1f', name: 'u116', value: 0 },
                { type: '1f', name: 'u113', value: 0 },
                { type: '1f', name: 'u115', value: 0 },
              ];
              U.ea &&
                k.j(
                  's88',
                  h.concat([
                    { type: '1f', name: 'u118', value: U.dk[da.T()] },
                    { type: '1i', name: 'u117', value: 5 },
                  ])
                );
              k.j(
                's89',
                h.concat([
                  { type: '1f', name: 'u119', value: U.Oc },
                  { type: '1f', name: 'u120', value: U.ag },
                  { type: '1f', name: 'u121', value: 0 },
                ])
              );
              k.j('s93', [
                { type: '1i', name: 'u136', value: 0 },
                { type: '1i', name: 'u110', value: 1 },
                { type: '1i', name: 'u97', value: 2 },
                { type: '1f', name: 'u139', value: U.ho },
              ]);
              k.j('s94', p);
              k.j('s95', p);
              k.j(
                's87',
                [
                  { type: '1i', name: 'u2', value: 1 },
                  { type: '1i', name: 'u99', value: 2 },
                  { type: '1i', name: 'u98', value: 3 },
                  { type: '1f', name: 'u104', value: 1 },
                  { type: '2f', name: 'u101', value: [0, 0] },
                ].concat(p)
              );
              da.Z()
                ? (k.j('s98', p),
                  k.j(
                    's98NormalMap',
                    [{ type: '1i', name: 'u151', value: 1 }].concat(p)
                  ),
                  k.j(
                    's98ParamsMap',
                    [{ type: '1i', name: 'u72', value: 1 }].concat(p)
                  ),
                  k.j(
                    's98NormalParamsMap',
                    [
                      { type: '1i', name: 'u151', value: 1 },
                      { type: '1i', name: 'u72', value: 2 },
                    ].concat(p)
                  ))
                : n();
              w = !0;
            },
            Un: function () {
              t();
              r();
              n();
            },
            wd: function () {
              return A.id;
            },
            ef: function () {
              return H;
            },
            ff: function () {
              return x;
            },
            set: function (p) {
              pb.nj(k);
              f[p].set();
            },
            wb: function (p) {
              return l(p, v());
            },
            Xd: function (p) {
              return l(p, {
                name: '_',
                h: 'void main(){gl_FragColor=vec4(.5,.5,.5,.5);}',
                i: [],
                precision: 'highp',
              });
            },
            Xn: function (p) {
              return l(p, {
                name: '_',
                h: 'const vec4 d=vec4(.5,.5,.5,.5);void main(){gl_FragData[0]=d,gl_FragData[1]=d,gl_FragData[2]=d,gl_FragData[3]=d;}',
                i: [],
                precision: 'highp',
                da: !0,
              });
            },
            H: function () {
              -1 !== g && A.H();
            },
            Zd: function () {
              var p = 0;
              A.va.forEach(function (h, G) {
                G = A.R[G];
                c.vertexAttribPointer(h, G, c.FLOAT, !1, A.Qg, p);
                p += 4 * G;
              });
            },
            dc: function () {
              k.ec(c);
            },
            ec: function (p) {
              p.vertexAttribPointer(A.va[0], 2, p.FLOAT, !1, 8, 0);
            },
            iq: function () {
              c.vertexAttribPointer(A.attributes.a0, 3, c.FLOAT, !1, 12, 0);
            },
            Ma: function () {
              c.vertexAttribPointer(A.attributes.a0, 3, c.FLOAT, !1, 32, 0);
            },
            Ya: function () {
              c.vertexAttribPointer(A.attributes.a0, 3, c.FLOAT, !1, 24, 0);
            },
            gj: function () {
              c.vertexAttribPointer(A.attributes.a2, 3, c.FLOAT, !1, 32, 12);
            },
            hj: function () {
              c.vertexAttribPointer(A.attributes.a2, 3, c.FLOAT, !1, 24, 12);
            },
            Qc: function () {
              c.vertexAttribPointer(A.attributes.a1, 2, c.FLOAT, !1, 32, 24);
            },
            jq: function () {
              c.vertexAttribPointer(A.attributes.a0, 3, c.FLOAT, !1, 20, 0);
              c.vertexAttribPointer(A.attributes.a1, 2, c.FLOAT, !1, 20, 12);
            },
            Kn: function () {
              c.vertexAttribPointer(A.attributes.a0, 3, c.FLOAT, !1, 32, 0);
              c.vertexAttribPointer(A.attributes.a2, 3, c.FLOAT, !1, 32, 12);
              c.vertexAttribPointer(A.attributes.a1, 2, c.FLOAT, !1, 32, 24);
            },
            Ln: function () {
              c.vertexAttribPointer(A.attributes.a0, 3, c.FLOAT, !1, 32, 0);
              c.vertexAttribPointer(A.attributes.a2, 3, c.FLOAT, !1, 32, 12);
            },
            Mn: function () {
              c.vertexAttribPointer(A.attributes.a0, 3, c.FLOAT, !1, 24, 0);
              c.vertexAttribPointer(A.attributes.a2, 3, c.FLOAT, !1, 24, 12);
            },
            Vd: function () {
              c.vertexAttribPointer(A.attributes.a3, 4, c.FLOAT, !1, 16, 0);
            },
            Yd: function (p, h) {
              c.uniform1i(A.A[p], h);
            },
            G: function (p, h) {
              c.uniform1f(A.A[p], h);
            },
            M: function (p, h, G) {
              c.uniform2f(A.A[p], h, G);
            },
            sg: function (p, h) {
              c.uniform2fv(A.A[p], h);
            },
            tg: function (p, h, G, I) {
              c.uniform3f(A.A[p], h, G, I);
            },
            ug: function (p, h) {
              c.uniform3fv(A.A[p], h);
            },
            xa: function (p, h) {
              c.uniform4fv(A.A[p], h);
            },
            ao: function (p, h) {
              c.uniformMatrix2fv(A.A[p], !1, h);
            },
            bo: function (p, h) {
              c.uniformMatrix3fv(A.A[p], !1, h);
            },
            Rc: function (p, h) {
              c.uniformMatrix4fv(A.A[p], !1, h);
            },
            j: function (p, h) {
              k.set(p);
              h.forEach(function (G) {
                switch (G.type) {
                  case '4f':
                    c.uniform4fv(A.A[G.name], G.value);
                    break;
                  case '3f':
                    c.uniform3fv(A.A[G.name], G.value);
                    break;
                  case '2f':
                    c.uniform2fv(A.A[G.name], G.value);
                    break;
                  case '1f':
                    c.uniform1f(A.A[G.name], G.value);
                    break;
                  case '1i':
                    c.uniform1i(A.A[G.name], G.value);
                    break;
                  case 'mat2':
                    c.uniformMatrix2fv(A.A[G.name], !1, G.value);
                    break;
                  case 'mat4':
                    c.uniformMatrix4fv(A.A[G.name], !1, G.value);
                }
              });
            },
            L: function () {
              for (var p in f) {
                var h = f[p];
                c.detachShader(h.na, h.hf);
                c.detachShader(h.na, h.gf);
                c.deleteShader(h.hf);
                c.deleteShader(h.gf);
                c.deleteProgram(h.na);
              }
            },
            v: function () {
              c.disableVertexAttribArray(0);
              k.H();
              k.L();
              L = 0;
              w = !1;
              A = null;
              g = -1;
            },
          };
        return k;
      })(),
      Va = (function () {
        var a = {},
          b = [],
          d = !1,
          e = 0,
          q = 0,
          l = -1,
          v = -1,
          n = -1,
          t = 1,
          r = null,
          w = !1,
          D = null,
          z = !1,
          H = !1,
          x = !1,
          f = !1,
          g = !1,
          A = !1,
          L = !1,
          k = !1,
          p = null,
          h = null,
          G = -1,
          I = -1,
          E = null,
          B = -1,
          m,
          u = null,
          F = null,
          R = null,
          Q = null,
          ea = null,
          ha = null,
          ka = null,
          O = [
            { type: '1f', name: 'u83', value: 0 },
            { type: '1f', name: 'u147', value: 0 },
            { type: '1f', name: 'u148', value: 0 },
            { type: '1f', name: 'u78', value: 1 },
            { type: '1f', name: 'u75', value: 0 },
            { type: '1f', name: 'u85', value: 1 },
          ],
          N = {
            m: function (y, P) {
              a.wg = y;
              da.Mg();
              zc.We();
              Pb.We(y.qe);
              l = y.Ze;
              v = y.Po;
              n = y.Rf;
              t = y.pe;
              var K = [
                { type: '1f', name: 'u78', value: l },
                { type: '1f', name: 'u75', value: n },
                { type: '1f', name: 'u79', value: y.Bn },
                { type: 'mat4', name: 'u74', value: y.en },
                { type: '2f', name: 'u40', value: y.Nj },
              ];
              y.Kg = K;
              var V = [
                { type: '3f', name: 'u80', value: [0, 0, 0] },
                { type: '3f', name: 'u81', value: y.Ug },
                { type: '3f', name: 'u82', value: y.Tg },
                { type: '1f', name: 'u83', value: 0 },
                { type: '1f', name: 'u84', value: y.qe },
                { type: '1f', name: 'u85', value: 1 },
              ];
              y.Fj = V;
              N.jm(y, P);
              d || void 0 !== y.Ca || (y.Ca = [0, 0, 120]);
              k = L = M.jf;
              if (!d && L) {
                P = 1 * da.sb();
                var ra = 1 * da.rb(),
                  ja = { isLinear: !0, isPot: !1, width: P, height: ra };
                p = ca.instance(ja);
                h = ca.instance(ja);
                G = 1 / P;
                I = 1 / ra;
              }
              K = [
                { type: '1i', name: 'u39', value: 1 },
                { type: '3f', name: 'u76', value: y.Ca },
                { type: '1f', name: 'u143', value: y.cd },
                { type: '1f', name: 'u144', value: y.Gb },
              ].concat(K, V);
              r = y.Kc;
              V = [
                { type: '1f', name: 'u147', value: r[0] },
                { type: '1f', name: 'u148', value: r[1] },
              ];
              da.Z()
                ? ((P = [{ type: '1i', name: 'u1', value: 0 }]),
                  (ra = [{ type: '1i', name: 'u151', value: 2 }]),
                  C.j('s98NNGLcolor', K.concat(V)),
                  C.j('s98NNGLtexture', [].concat(P, K, V)),
                  C.j('s98NNGLtextureNormalMap', [].concat(P, ra, K, V)),
                  C.j(
                    's98NNGLtextureParamsMap',
                    [{ type: '1i', name: 'u72', value: 2 }].concat(P, K, V)
                  ),
                  C.j(
                    's98NNGLtextureNormalParamsMap',
                    [{ type: '1i', name: 'u72', value: 3 }].concat(P, ra, K, V)
                  ))
                : (C.j('s102', K.concat(V)),
                  C.j('s103', [{ type: '1i', name: 'u1', value: 0 }].concat(K)),
                  C.j('s104', K),
                  C.j('s105', K),
                  C.j(
                    's106',
                    K.concat([{ type: '1i', name: 'u151', value: 0 }])
                  ),
                  C.j('s107', K),
                  C.j(
                    's108',
                    K.concat([{ type: '1i', name: 'u72', value: 0 }])
                  ));
              C.j('s76', [{ type: '2f', name: 'u91', value: y.Dg }]);
              C.j(U.ea ? 's88' : 's89', [
                { type: '1f', name: 'u113', value: y.Ae },
                { type: '3f', name: 'u114', value: y.gg },
                { type: '1f', name: 'u115', value: y.Me },
                { type: '1f', name: 'u116', value: 1 },
                { type: '3f', name: 'u111', value: y.Rj },
              ]);
              if ((m = y.Jd))
                (E = y.Km),
                  (B = y.Kd),
                  C.j('s87', [
                    { type: '4f', name: 'u100', value: y.Id },
                    { type: '1f', name: 'u103', value: y.If },
                    { type: '2f', name: 'u101', value: y.Jm },
                    { type: '1f', name: 'u105', value: Math.sign(B) },
                  ]);
              b.forEach(function (sa) {
                sa.cj(y);
              });
              d = !0;
            },
            bc: function (y) {
              H && za.la.bc(y);
              f && za.ra.bc(y);
            },
            jm: function (y, P) {
              void 0 !== za.la &&
                y.hc &&
                da.Z() &&
                (za.la.m(y),
                (z = !0),
                P.push(function (K) {
                  za.la.bc(K);
                  H = !x;
                }));
              void 0 !== za.ra &&
                y.hd &&
                (za.ra.m(y),
                P.push(function (K) {
                  za.ra.bc(K);
                  f = !0;
                }));
              void 0 !== za.pc && y.De && (za.pc.m(y), (A = g = !0));
              void 0 !== za.kb &&
                (za.kb.m(y),
                (D = za.kb.lm({
                  width: y.Ec,
                  height: 2 * y.Ec,
                  depth: 1.5 * y.Ec,
                  rl: -y.pf,
                  Sa: y.lf,
                  Vk: y.mf,
                })),
                (w = !0));
            },
            Zn: function (y, P, K, V) {
              y &&
                ((ka = y),
                z && za.la.cc(y),
                f && za.ra.cc(y),
                g && za.pc.cc(y),
                b.forEach(function (ra) {
                  ra.cc(y);
                }));
              K && (Q = K);
              V && (ea = V);
            },
            xb: function (y) {
              da.Z()
                ? (C.j('s98NNGLcolor', y),
                  C.j('s98NNGLtexture', y),
                  C.j('s98NNGLtextureNormalMap', y),
                  C.j('s98NNGLtextureParamsMap', y),
                  C.j('s98NNGLtextureNormalParamsMap', y))
                : (C.j('s102', y),
                  C.j('s103', y),
                  C.j('s104', y),
                  C.j('s105', y),
                  C.j('s106', y),
                  C.j('s107', y),
                  C.j('s108', y));
            },
            $a: function (y, P, K) {
              var V = [y[0] + P[0], y[1] + P[1], y[2] + P[2]];
              V = [V[0] + K[0], V[1] + K[1], V[2] + K[2]];
              a.Sd = V;
              a.Qm = P;
              a.Do = K;
              N.xb([{ type: '3f', name: 'u141', value: V }]);
              da.Z() && (z && za.la.$a(y, P, K), f && za.ra.$a(V));
              w && za.kb.$a(y);
            },
            ab: function (y, P, K) {
              var V = y * P * K;
              a.Rm = P;
              a.Eo = K;
              a.cm = y;
              N.xb([{ type: '1f', name: 'u142', value: V }]);
              da.Z() && (z && za.la.ab(y * P, K), f && za.ra.ab(V));
              w && za.kb.ab(y);
            },
            Xi: function () {
              N.$a(a.Sd, a.Qm, a.Do);
              N.ab(a.cm, a.Rm, a.Eo);
              N.lj(a.rx);
              N.m(a.wg);
              N.ij(a.wk, a.Gb);
            },
            lj: function (y) {
              a.rx = y;
              N.xb([{ type: '1f', name: 'u77', value: y }]);
              da.Z() && (z && za.la.qg(y), f && za.ra.qg(y));
            },
            ij: function (y, P) {
              a.wk = y;
              a.Gb = P;
              N.xb([
                { type: '1f', name: 'u143', value: y },
                { type: '1f', name: 'u144', value: P },
              ]);
            },
            Sn: function (y) {
              r = y;
              0 === e &&
                N.xb([
                  { type: '1f', name: 'u147', value: r[0] },
                  { type: '1f', name: 'u148', value: r[1] },
                ]);
            },
            Za: function (y) {
              function P() {
                w && za.kb.toggle(!1);
                m && C.j('s87', [{ type: '1f', name: 'u104', value: 0 }]);
              }
              0 >= y
                ? ((q = 0),
                  0 !== e &&
                    ((e = 0),
                    Pb.vn(),
                    w && za.kb.toggle(!0),
                    m && C.j('s87', [{ type: '1f', name: 'u104', value: 1 }])))
                : 1 <= y
                ? ((q = 1), 1 !== e && ((e = 1), Pb.tj(!0)), P())
                : ((q = y), 2 !== e && (Pb.tj(!1), (e = 2), P()));
              C.j('s89', [{ type: '1f', name: 'u116', value: 1 - y }]);
              O[0].value = q;
              O[1].value = r[0] * (1 - y) + -300 * y;
              O[2].value = r[1] * (1 - y) + -300 * y;
              O[3].value = l * (1 - y) + y * v;
              O[4].value = n * (1 - y);
              O[5].value = 1 - y + y * t;
              H && za.la.rg(q, O);
              f && za.ra.rg(q, O);
              N.xb(O);
            },
            ol: function (y) {
              ka.g(1);
              y.forEach(function (P) {
                P.jl();
              });
              w && D.U();
            },
            Dm: function () {
              return 1 === e;
            },
            Be: function (y) {
              ka.Pa(y);
            },
            Wj: function (y) {
              b.push(y);
            },
            Bg: function (y) {
              x = !y;
              H = y && z;
            },
            Ag: function (y) {
              A = y && g;
            },
            ng: function (y) {
              f && da.Z() && za.ra.co(y);
            },
            yb: function (y) {
              da.Z() && (z && za.la.yb(y), f && za.ra.yb(y));
            },
            ll: function (y, P) {
              if (!k) return !1;
              p.O();
              y.g(0);
              C.set('s80');
              C.M('u10', 0, I);
              Y.l(!1, !1);
              h.o();
              p.g(0);
              C.M('u10', G, 0);
              Y.l(!1, !1);
              C.set('s81');
              P.O();
              h.g(0);
              Y.l(!1, !1);
              return !0;
            },
            sj: function (y) {
              k = y && L;
            },
            resize: function (y, P, K) {
              L &&
                ((y *= K),
                (P *= K),
                p.resize(y, P),
                h.resize(y, P),
                (G = 1 / y),
                (I = 1 / P));
            },
            lg: function (y, P) {
              var K = y.N(),
                V = y.X(),
                ra = { width: K, height: V, isPot: !1 };
              z && (R && R.remove(), (R = ca.instance(ra)));
              u = Ba.instance({ width: K, height: V });
              g || f
                ? (za.pc.mg(K, V), F && F.remove(), (F = ca.instance(ra)))
                : (F = y);
              z && za.la.mg(K, V);
              P && (ha && ha.remove(), (ha = ca.instance(ra)));
            },
            hl: function (y) {
              var P = null;
              switch (e) {
                case 0:
                  P = y;
                  break;
                case 2:
                  u.bind(!1, !0);
                  ha.o();
                  C.set('s71');
                  C.G('u9', q);
                  y.g(1);
                  ea.g(0);
                  Y.l(!0, !0);
                  P = ha;
                  break;
                case 1:
                  P = ea;
              }
              if (!H || 1 === e || !da.Z()) return P;
              P.Pa(0);
              A && za.pc.U(P, F);
              u.bind(!1, !A);
              f && (A ? P.g(0) : (F.o(), C.set('s1'), Y.l(!0, !0)), za.ra.U());
              F.g(0);
              Q.Pa(2);
              za.la.U();
              R.o();
              C.set('s1');
              A || f ? F.g(0) : P.g(0);
              Y.l(!0, !U.ea);
              za.la.add();
              return R;
            },
            ml: function (y, P) {
              if (!m) return !1;
              C.set('s87');
              C.G('u102', y * B);
              E.g(1);
              Va.Be(2);
              F ? F.g(3) : P.g(3);
              return !0;
            },
            v: function () {
              d = !1;
              q = e = 0;
              n = v = l = -1;
              t = 1;
              r = null;
              w = !1;
              D = null;
              A = g = f = x = H = z = !1;
              za.la.v();
              za.Na.v();
            },
          };
        return N;
      })(),
      wa = (function () {
        function a() {
          n.forEach(function (K) {
            K.pl(R);
          });
        }
        function b() {
          n.forEach(function (K) {
            K.md(R);
          });
        }
        function d() {
          n.forEach(function (K) {
            K.nl(R);
          });
        }
        function e() {
          n.forEach(function (K) {
            K.nd(R);
          });
        }
        function q() {
          R
            ? Va.ol(n)
            : n.forEach(function (K) {
                K.kl();
              });
        }
        function l() {
          m && clearTimeout(m);
          m = setTimeout(function () {
            h = !1;
            m = null;
          }, 16);
        }
        function v(K) {
          K();
        }
        var n = [],
          t = [],
          r = { ga_: !1, position: !1, ub: !1 },
          w = [],
          D = [],
          z = null,
          H = 0,
          x = null,
          f = null,
          g = null,
          A = null,
          L = !1,
          k = !1,
          p = !1,
          h = !1,
          G = !1,
          I = !1,
          E = null,
          B = null,
          m = null,
          u = null,
          F = !1,
          R = !1,
          Q = !1,
          ea = !1,
          ha = !0,
          ka = !1,
          O = !1,
          N = !1,
          y = !1,
          P = {
            m: function () {
              c.enable(c.DEPTH_TEST);
              c.depthFunc(c.LEQUAL);
              c.clearDepth(1);
              U.Tk
                ? (c.enable(c.CULL_FACE),
                  c.frontFace('CCW' === U.Uk ? c.CCW : c.CW),
                  c.cullFace(c.BACK))
                : c.disable(c.CULL_FACE);
              P.lh();
              var K = {
                isPot: !1,
                isLinear: !1,
                width: da.sb(),
                height: da.rb(),
                F: 4,
                isFloat: !1,
              };
              x = ca.instance(K);
              K = Object.assign({}, K, {
                isLinear: !0,
                width: da.N(),
                height: da.X(),
              });
              f = ca.instance(K);
              g = ca.instance(K);
              U.Ka &&
                ((K = Object.assign({}, K, { isLinear: !1 })),
                (A = ca.instance(K)));
              I = Ea.fa();
              U.Ka ||
                (z = dc.instance({ Fb: U.Fb, vc: U.vc, wc: U.wc, uc: U.uc }));
              L = !0;
            },
            lh: function () {
              da.Z()
                ? (r = qc.instance({}))
                : ((r.ga_ = Jb.instance({
                    fc: U.Ka ? !1 : 's99',
                    isFloat: !1,
                    Rb: !0,
                    clearColor: [0, 0, 0, 0],
                    F: 4,
                  })),
                  (r.position = Jb.instance({
                    fc: U.Ka ? !1 : 's109',
                    isFloat: !0,
                    Rb: !0,
                    clearColor: [0, 0, 0, 0],
                    F: 4,
                  })),
                  (r.ub = Jb.instance({
                    fc: !1,
                    isFloat: !0,
                    Rb: !0,
                    clearColor: [0, 0, 0, 0],
                    F: 4,
                  })),
                  (r.Lc = Jb.instance({
                    fc: !1,
                    isFloat: !1,
                    Rb: !0,
                    clearColor: [0, 0, 0, 0],
                    F: 4,
                  })));
            },
            Ml: function () {
              return z;
            },
            sa: function (K) {
              z = K;
            },
            yq: function () {},
            yb: function (K) {
              Va.yb(K);
            },
            cj: function (K) {
              Va.m(K, w);
              da.Z() || (r.ga_.mj(!1), r.position.mj('s102'));
              R = ea = !0;
            },
            fq: function () {
              Va.Xi();
            },
            Xo: function (K) {
              Va.Wj(K);
            },
            Gn: function (K, V, ra) {
              Va.$a(K, V, ra);
            },
            Hn: function (K, V, ra) {
              Va.ab(K, V, ra);
            },
            En: function (K, V) {
              Va.ij(K, V);
            },
            Fn: function (K) {
              Va.Sn(K);
            },
            In: function (K) {
              Va.lj(K);
            },
            Za: function (K) {
              Va.Za(K);
            },
            dj: function (K, V, ra, ja) {
              Va.Zn(K, V, ra, ja);
              V && P.lg(V, ja ? !0 : !1);
              Q = !0;
            },
            Bg: function (K) {
              Va.Bg(K);
            },
            ng: function (K) {
              Va.ng(K);
            },
            Ag: function (K) {
              Va.Ag(K);
            },
            sj: function (K) {
              Va.sj(K);
            },
            Yo: function (K) {
              F &&
                ((O = !0),
                (N = ca.instance({ width: u.N(), height: u.X(), isPot: !1 })),
                (y = K));
            },
            lg: function (K, V) {
              u =
                'string' === typeof K
                  ? ca.instance({ url: K, isFloat: !1 })
                  : K;
              R && Va.lg(u, V);
              F = !0;
            },
            Vj: function (K) {
              n.push(K);
              0 !== w.length &&
                (w.forEach(function (V) {
                  V(K);
                }),
                w.splice(0, w.length));
            },
            qn: function (K) {
              K = n.indexOf(K);
              -1 !== K && n.splice(K, 1);
            },
            Zo: function (K) {
              t.push(K);
            },
            bq: function (K) {
              K = t.indexOf(K);
              -1 !== K && t.splice(K, 1);
            },
            de: function (K) {
              R && (k = K);
            },
            animate: function (K) {
              !U.Ka || (R && Q)
                ? k &&
                  (h || (H > U.Sm && G)
                    ? (E && clearTimeout(E),
                      ++H,
                      window.cancelAnimationFrame(P.animate),
                      (E = setTimeout(function () {
                        window.requestAnimationFrame(P.animate);
                      }, 16)))
                    : (P.Si(K),
                      ++H,
                      R || (k && window.requestAnimationFrame(P.animate))))
                : setTimeout(P.animate, 100);
            },
            ap: function (K) {
              D.push(K);
            },
            Si: function (K) {
              if ((!U.Ka || (R && Q)) && L) {
                D.forEach(v);
                da.Z()
                  ? r.set() || da.ja()
                    ? (R || uc.sn(), q(), r.H(), I && c.depthMask(!1))
                    : (da.so(),
                      P.lh(),
                      Jb.ad(),
                      C.Un(),
                      U.Ka && Va.Xi(),
                      c.flush(),
                      window.requestAnimationFrame(P.animate))
                  : (R && Va.Be(1),
                    r.ga_.set(!0, !0, !0),
                    b(),
                    r.ga_.H(),
                    I && c.depthMask(!1),
                    r.Lc.set(!1, !I, !1),
                    d(),
                    r.Lc.H(),
                    r.position.set(!0, !I, !1),
                    nb.U(),
                    a(),
                    r.position.H(),
                    r.ub.set(!1, !I, !1),
                    e(),
                    r.ub.H());
                c.disable(c.DEPTH_TEST);
                I || c.depthMask(!1);
                U.ea && zb.U();
                var V = P.Hh();
                null !== V &&
                  (V.g(7),
                  C.set(U.ea ? 's88' : 's89'),
                  C.M('u10', 1 / da.sb(), 1 / da.rb()),
                  Jb.xk(),
                  x.O(),
                  ka
                    ? (c.enable(c.BLEND),
                      c.clearColor(0, 0, 0, 0),
                      c.clear(c.COLOR_BUFFER_BIT),
                      c.blendFunc(c.ONE, c.ONE_MINUS_SRC_ALPHA),
                      C.G('u121', 1))
                    : c.disable(c.BLEND),
                  R || nb.Ve(),
                  r.position.g(0),
                  r.ub.g(1),
                  r.ga_.g(2),
                  z.dd(3),
                  r.Lc.g(6),
                  z.ed(4),
                  z.ph(),
                  U.ea && zb.g(5),
                  Y.l(!0, !0),
                  ka && C.G('u121', 0),
                  Ba.ca(),
                  ka
                    ? (c.disable(c.BLEND),
                      C.set('s112'),
                      g.O(),
                      x.g(0),
                      Y.l(!1, !1),
                      f.o(),
                      g.g(0),
                      Y.l(!1, !1),
                      f.g(0))
                    : (Va.ll(x, f) || (C.set('s1'), f.O(), x.g(0), Y.l(!1, !1)),
                      ha
                        ? (C.set('s77'),
                          g.O(),
                          f.g(0),
                          Y.l(!1, !1),
                          f.o(),
                          g.g(0),
                          ea && R
                            ? (C.set('s76'),
                              A.g(1),
                              Va.Be(2),
                              Y.l(!1, !1),
                              C.set('s1'),
                              A.O(),
                              f.g(0),
                              Y.l(!1, !1))
                            : (C.set('s75'), Y.l(!1, !1), f.g(0)))
                        : f.g(0)),
                  Ba.aa(),
                  c.viewport(0, 0, da.N(), da.X()),
                  (!ka && R && Va.ml(K, V)) || C.set('s1'),
                  Y.l(!1, !1),
                  c.enable(c.DEPTH_TEST),
                  c.depthMask(!0),
                  c.flush());
              }
            },
            Hh: function () {
              if (!F || ka) return ca.Th();
              if (!R) return u;
              if (O && !Va.Dm()) {
                C.set(y);
                Ba.ca();
                N.Sc();
                N.o();
                u.g(0);
                var K = N;
                Y.l(!0, !0);
              } else K = u;
              return Va.hl(K);
            },
            lo: function () {
              U.Zk ||
                k ||
                ((k = !0),
                P.animate(Date.now()),
                p || rc.mo(),
                p || Pb.oc(!1),
                B && clearTimeout(B),
                U.ea && zb.Wd(),
                (B = setTimeout(P.ta, U.tk)),
                p || da.fm(),
                (p = !0));
            },
            vq: function () {
              k && ((G = k = !1), cancelAnimationFrame(P.animate));
            },
            ta: function () {
              G ||
                !p ||
                h ||
                U.nh ||
                ((G = h = !0),
                B && clearTimeout(B),
                m && clearTimeout(m),
                nb.af().Ui(),
                (B = setTimeout(function () {
                  da.Og(U.Wm);
                  U.ea && zb.Gj();
                  H = 0;
                  l();
                }, 24)));
            },
            wake: function () {
              G &&
                p &&
                !h &&
                ((h = !0),
                (G = !1),
                (H = 0),
                nb.af().Ui(),
                B && clearTimeout(B),
                m && clearTimeout(m),
                (B = setTimeout(function () {
                  da.Og(1);
                  U.ea && zb.Wd();
                  l();
                }, 16)));
            },
            Kp: function () {},
            qp: function () {},
            ce: function (K) {
              ea = K;
            },
            xq: function (K) {
              ha = K;
            },
            uj: function (K) {
              ka = K;
            },
            Cq: function () {
              C.j('s89', [
                { type: '1f', name: 'u119', value: U.Oc },
                { type: '1f', name: 'u120', value: U.ag },
              ]);
            },
            resize: function (K, V, ra) {
              x.resize(K * ra, V * ra);
              f.resize(K, V);
              g.resize(K, V);
              U.Ka && A.resize(K, V);
              Va.resize(K, V, ra);
              K = [{ type: '2f', name: 'u10', value: [1 / K, 1 / V] }];
              C.j('s77', K);
              C.j('s75', K);
            },
            L: function () {
              E && clearTimeout(E);
              B && clearTimeout(B);
              m && clearTimeout(m);
              n.concat(t).forEach(function (K) {
                K.L();
              });
              n.splice(0, n.length);
              t.splice(0, t.length);
              r.ga_.remove();
              r.ub.remove();
              r.Lc.remove();
              r.position.remove();
              x.remove();
              f.remove();
              g.remove();
              A && A.remove();
              h = !0;
            },
            v: function () {
              P.L();
              I = G = h = p = k = R = Q = h = !1;
            },
          };
        return P;
      })(),
      za = {},
      da = (function () {
        function a() {
          Jb.resize(d * t, e * t);
          x.Z() && qc.resize(d * t, e * t);
          wa.resize(d, e, t);
          U.ea && zb.resize(d * t, e * t, t);
          x.Mg();
        }
        var b = null,
          d = 0,
          e = 0,
          q = -1,
          l = !1,
          v = {
            fe: !1,
            Eg: !1,
            Dj: !1,
            xg: !1,
            drawBuffers: !1,
            wm: !1,
            ji: !1,
            ym: !1,
            Ic: !1,
            Wa: !1,
          },
          n = Object.assign({}, v),
          t = 1,
          r = !1,
          w = !1,
          D = !1,
          z = !1,
          H = !1,
          x = {
            m: function (f) {
              void 0 !== f.onload && f.onload && (w = f.onload);
              void 0 === f.expand && (f.expand = !1);
              void 0 === f.Dd && (f.Dd = !1);
              void 0 === f.pa && (f.pa = !1);
              void 0 === f.Nb && (f.Nb = !1);
              void 0 === f.alpha && (f.alpha = !1);
              void 0 === f.preserveDrawingBuffer &&
                (f.preserveDrawingBuffer = !1);
              f.Dd && (l = !0);
              b = f.pa ? f.pa : document.getElementById(f.Mk);
              f.expand && x.expand();
              try {
                window.Uo = f.Nb
                  ? f.Nb.yl()
                  : b.getContext('webgl', {
                      antialias: !1,
                      alpha: f.alpha,
                      depth: !0,
                      premultipliedAlpha: !1,
                      stencil: !1,
                      preserveDrawingBuffer: f.preserveDrawingBuffer,
                    });
                z = f.Nb ? f.Nb.ja() : !1;
                D = !z;
                8 > c.getParameter(c.MAX_TEXTURE_IMAGE_UNITS) &&
                  x.jd('too few texture image units');
                if (!Ea.m()) return x.jd('invalid config');
                U.Ao &&
                  ((n.Eg = c.getExtension('EXT_texture_filter_anisotropic')),
                  n.Eg && (n.ji = !0));
                U.Bo &&
                  ((n.fe = c.getExtension('WEBGL_compressed_texture_s3tc')),
                  n.fe &&
                    void 0 !== n.fe.COMPRESSED_RGBA_S3TC_DXT5_EXT &&
                    n.fe.COMPRESSED_RGBA_S3TC_DXT5_EXT &&
                    (n.wm = !0));
                D &&
                  ((n.Dj =
                    c.getExtension('OES_element_index_uint') ||
                    c.getExtension('MOZ_OES_element_index_uint') ||
                    c.getExtension('WEBKIT_OES_element_index_uint')),
                  n.Dj && (n.ym = !0));
                !z &&
                  U.Co &&
                  ((n.xg = c.getExtension('EXT_sRGB')), n.xg && (n.Ic = !0));
                D
                  ? ((n.drawBuffers = c.getExtension('WEBGL_draw_buffers')),
                    n.drawBuffers && !U.mh && (n.Wa = !0))
                  : (n.Wa = 4 <= c.getParameter(c.MAX_DRAW_BUFFERS));
                if (n.Wa) {
                  var g = x.al();
                  n.Wa = n.Wa && g;
                }
              } catch (A) {
                return x.jd(A);
              }
              if (null === c || !c) return x.jd('NO_GL');
              f.expand && window.addEventListener('resize', x.expand, !1);
              b.addEventListener(
                'contextmenu',
                function (A) {
                  A.preventDefault();
                  return !1;
                },
                !1
              );
              d = b.width;
              e = b.height;
              x.tf();
              return !0;
            },
            tf: function () {
              q = l ? 3 : 2;
              Ea.fa() || (q = Math.min(q, 1));
              Ea.Ik() || (q = Math.min(q, 0));
              zc.m();
              Jb.m();
              for (var f in za) za[f].Pc();
              C.m();
              nb.m();
              Pb.m();
              wa.m();
              rc.m();
              U.ea && zb.m();
              'undefined' !== typeof FPSCounter && FPSCounter.m();
              x.Mg();
              x.cl();
              r = !0;
              w && w();
              return !0;
            },
            cl: function () {
              if (n.Wa) {
                var f = qc.instance({ width: 256, height: 1 });
                f.bind();
                c.viewport(0, 0, 256, 1);
                C.set('s97');
                C.xa('color', [1, 0, 0, 1]);
                Y.l(!0, !0);
                c.clearColor(0, 0, 0, 0);
                c.clear(c.COLOR_BUFFER_BIT || c.DEPTH_BUFFER_BIT);
                Ba.aa();
                C.set('s1');
                f.ub.g(0);
                Y.l(!1, !1);
                f = new Uint8Array(1024);
                c.readPixels(0, 0, 256, 1, c.RGBA, c.UNSIGNED_BYTE, f);
                H = 1 >= f[1020];
              }
            },
            al: function () {
              var f = qc.instance({ width: 1, height: 1 });
              if (!f.set()) return f.remove(), !1;
              C.Xn(c);
              Y.Lb(c);
              c.bindFramebuffer(c.FRAMEBUFFER, null);
              C.wb(c);
              f.ga_.Pa(0);
              Y.Lb(c);
              var g = new Uint8Array(4);
              c.readPixels(0, 0, 1, 1, c.RGBA, c.UNSIGNED_BYTE, g);
              f.remove();
              return 3 < Math.abs(g[0] - 127) ? !1 : !0;
            },
            ja: function () {
              return z;
            },
            N: function () {
              return d;
            },
            X: function () {
              return e;
            },
            sb: function () {
              return t * x.N();
            },
            rb: function () {
              return t * x.X();
            },
            zl: function () {
              return d / e;
            },
            T: function () {
              return q;
            },
            Bm: function () {
              return 3 === q;
            },
            mi: function () {
              return H;
            },
            Z: function () {
              return n.Wa;
            },
            so: function () {
              n.Wa = !1;
            },
            Sp: function () {
              return !1;
            },
            Kk: function () {
              return 0 < x.T();
            },
            hp: function () {
              return x.Z() && 0 < x.T();
            },
            $e: function (f) {
              var g = c,
                A = '';
              z || ((g = n.drawBuffers), (A = '_WEBGL'));
              return [
                g['COLOR_ATTACHMENT0' + A],
                g['COLOR_ATTACHMENT1' + A],
                g['COLOR_ATTACHMENT2' + A],
                g['COLOR_ATTACHMENT3' + A],
              ].splice(0, f);
            },
            vd: function (f) {
              return x.$e(4)[f];
            },
            $l: function () {
              return z
                ? c.SRGB
                  ? c.SRGB
                  : c.RGBA
                : n.Ic
                ? n.xg.SRGB_ALPHA_EXT
                : c.RGBA;
            },
            zm: function () {
              return n.ji;
            },
            El: function () {
              return n.Eg;
            },
            Nm: function (f) {
              x.ja()
                ? c.drawBuffers(x.$e(f))
                : n.drawBuffers.drawBuffersWEBGL(x.$e(f));
            },
            expand: function () {
              wa.wake();
              x.resize(window.innerWidth, window.innerHeight);
              wa.ta();
            },
            resize: function (f, g) {
              !b ||
                (f === d && g === e) ||
                ((d = f),
                (e = g),
                (b.width = d),
                (b.height = e),
                r && (nb.resize(), a()));
            },
            Mg: function () {
              var f = [
                { type: '2f', name: 'u10', value: [1 / da.sb(), 1 / da.rb()] },
              ];
              C.j('s77', f);
              C.j('s75', f);
            },
            Og: function (f) {
              t = f;
              a();
            },
            Fa: function (f, g) {
              b.addEventListener(f, g, !1);
            },
            jd: function () {
              q = -1;
              return !1;
            },
            gh: function () {
              return 0 <= q;
            },
            Vp: function () {},
            gq: function () {},
            tq: function () {
              var f = document.getElementById('loading');
              f && (f.style.display = 'block');
            },
            fm: function () {
              var f = document.getElementById('loading');
              f && (f.style.display = 'none');
            },
            L: function () {
              x.gh() &&
                (ca.Ej(),
                wa.L(),
                Y.L(),
                Jb.L(),
                U.ea && zb.L(),
                dc.L(),
                rc.L(),
                C.L(),
                ca.L(),
                c.flush(),
                (c = null));
            },
            v: function () {
              wa.v();
              Va.v();
              C.v();
              Object.assign(n, v);
              r = !1;
            },
          };
        return x;
      })(),
      nb = (function () {
        var a = !1,
          b = !1,
          d = [];
        return {
          m: function () {},
          instance: function (e) {
            void 0 === e.Vi && (e.Vi = !0);
            void 0 === e.te && (e.te = 0.1);
            void 0 === e.se && (e.se = 100);
            void 0 === e.direction && (e.direction = [0, 0, -1]);
            void 0 === e.Mb && (e.Mb = 45);
            var q = new Xb(),
              l = new Ta(50, -50, -400),
              v = null;
            q.setPosition(l);
            var n = new Int8Array(20),
              t = new Int8Array(20),
              r = 0,
              w = 0,
              D = 0,
              z = 0,
              H = {
                U: function () {
                  t[C.wd()] || (C.Rc('u122', q.elements), (t[C.wd()] = 1));
                  n[C.wd()] || (C.Rc('u134', v), (n[C.wd()] = 1));
                },
                Ue: function () {
                  w || (C.Rc('u122', q.elements), (w = 1));
                  r || (C.M('u123', v[0], v[5]), (r = 1));
                },
                Ve: function () {
                  D || (C.tg('u111', l.x, l.y, l.z), (D = 1));
                },
                Ib: function () {
                  z || (C.tg('u152', l.x, l.y, l.z), (z = 1));
                },
                ih: function () {
                  var x = e.te,
                    f = e.se,
                    g = Math.tan((0.5 * e.Mb * Math.PI) / 180);
                  v = [
                    0.5 / g,
                    0,
                    0,
                    0,
                    0,
                    (0.5 * da.zl()) / g,
                    0,
                    0,
                    0,
                    0,
                    -(f + x) / (f - x),
                    -1,
                    0,
                    0,
                    (-2 * f * x) / (f - x),
                    0,
                  ];
                  for (x = 0; 20 > x; ++x) n[x] = 0;
                  r = 0;
                },
                Tn: function (x, f) {
                  l.aj(f[0]).bj(f[1]).z = f[2];
                  q.elements.set(x);
                  for (x = 0; 20 > x; ++x) t[x] = 0;
                  z = D = w = 0;
                },
                Ui: function () {
                  for (var x = (z = D = 0); 20 > x; ++x) t[x] = 0;
                },
              };
            H.ih();
            a = H;
            b = !0;
            e.Vi && d.push(H);
            return H;
          },
          U: function () {
            b && a.U();
          },
          Ue: function () {
            b && a.Ue();
          },
          Ve: function () {
            b && a.Ve();
          },
          Ib: function () {
            b && a.Ib();
          },
          resize: function () {
            d.forEach(function (e) {
              e.ih();
            });
          },
          af: function () {
            return a;
          },
        };
      })(),
      Jb = (function () {
        var a = [],
          b = null;
        return {
          m: function () {
            b = Ba.instance({ width: da.sb(), height: da.rb(), Fc: !da.Z() });
          },
          instance: function (d) {
            void 0 === d.width && (d.width = da.sb());
            void 0 === d.height && (d.height = da.rb());
            void 0 === d.isFloat && (d.isFloat = !1);
            void 0 === d.Rb && (d.Rb = !1);
            void 0 === d.clearColor && (d.clearColor = [0, 0, 0, 0]);
            void 0 === d.F && (d.F = 4);
            var e = ca.instance({
                isFloat: d.isFloat && Ea.fa(),
                S: d.isFloat,
                width: d.width,
                height: d.height,
                isPot: !1,
                isLinear: !1,
                F: d.F,
              }),
              q = void 0 !== d.fc && d.fc ? !0 : !1,
              l = d.fc,
              v = {
                set: function (n, t, r) {
                  r && b.bind(!1, r);
                  e.o();
                  n &&
                    (c.clearColor(
                      d.clearColor[0],
                      d.clearColor[1],
                      d.clearColor[2],
                      d.clearColor[3]
                    ),
                    b.He());
                  t && b.hh();
                  q && C.set(l);
                },
                mj: function (n) {
                  q = (l = n) ? !0 : !1;
                },
                H: function () {
                  e.he();
                },
                g: function (n) {
                  e.g(n);
                },
                resize: function (n, t) {
                  e.resize(n, t);
                },
                debug: function () {
                  e.debug();
                },
                remove: function () {
                  e.remove();
                },
              };
            d.Rb && a.push(v);
            return v;
          },
          resize: function (d, e) {
            b.resize(d, e);
            a.forEach(function (q) {
              q.resize(d, e);
            });
          },
          xk: function () {
            b.ah();
          },
          ad: function () {
            b.ad();
          },
          Sc: function () {
            b.Sc();
          },
          kp: function () {
            b.hh();
          },
          jp: function () {
            b.He();
          },
          ip: function () {
            b.clear();
          },
          L: function () {
            b.remove();
          },
        };
      })(),
      qc = (function () {
        var a = [];
        return {
          instance: function (b) {
            void 0 === b.width && (b.width = da.sb());
            void 0 === b.height && (b.height = da.rb());
            var d = c.createFramebuffer(),
              e = b.width,
              q = b.height,
              l = !0;
            b = {
              isFloat: Ea.fa(),
              S: !0,
              width: e,
              height: q,
              isPot: !1,
              isLinear: !1,
              F: 4,
            };
            var v = ca.instance(b),
              n = ca.instance(b),
              t = ca.instance(b),
              r = ca.instance(b),
              w = Ba.Fl(),
              D = Ba.Mh();
            c.bindFramebuffer(w, d);
            var z = c.createRenderbuffer();
            c.bindRenderbuffer(c.RENDERBUFFER, z);
            c.renderbufferStorage(c.RENDERBUFFER, c.DEPTH_COMPONENT16, e, q);
            c.framebufferRenderbuffer(w, c.DEPTH_ATTACHMENT, c.RENDERBUFFER, z);
            c.clearDepth(1);
            c.framebufferTexture2D(w, da.vd(0), c.TEXTURE_2D, v.get(), 0);
            c.framebufferTexture2D(w, da.vd(1), c.TEXTURE_2D, n.get(), 0);
            c.framebufferTexture2D(w, da.vd(2), c.TEXTURE_2D, r.get(), 0);
            c.framebufferTexture2D(w, da.vd(3), c.TEXTURE_2D, t.get(), 0);
            da.Nm(4);
            c.bindFramebuffer(w, null);
            Ba.reset();
            var H = {
              position: v,
              ub: n,
              Lc: t,
              ga_: r,
              bind: function () {
                c.bindFramebuffer(w, d);
                Ba.reset();
              },
              set: function () {
                l && c.checkFramebufferStatus(D);
                c.bindFramebuffer(w, d);
                Ba.reset();
                if (l) {
                  if (c.checkFramebufferStatus(D) !== c.FRAMEBUFFER_COMPLETE)
                    return !1;
                  l = !1;
                }
                c.viewport(0, 0, e, q);
                c.clearColor(0, 0, 0, 0);
                C.Vb() && !da.mi() && (C.set('s96'), Y.l(!1, !1));
                c.clear(c.COLOR_BUFFER_BIT | c.DEPTH_BUFFER_BIT);
                return !0;
              },
              H: function () {},
              resize: function (x, f) {
                e = x;
                q = f;
                v.resize(x, f);
                n.resize(x, f);
                r.resize(x, f);
                t.resize(x, f);
                c.bindRenderbuffer(c.RENDERBUFFER, z);
                c.renderbufferStorage(
                  c.RENDERBUFFER,
                  c.DEPTH_COMPONENT16,
                  e,
                  q
                );
                c.bindRenderbuffer(c.RENDERBUFFER, null);
              },
              remove: function () {
                v.remove();
                n.remove();
                r.remove();
                t.remove();
                c.deleteRenderbuffer(z);
                c.deleteFramebuffer(d);
                var x = a.indexOf(H);
                -1 !== x && a.splice(x, 1);
              },
            };
            a.push(H);
            return H;
          },
          resize: function (b, d) {
            a.forEach(function (e) {
              e.resize(b, d);
            });
          },
        };
      })(),
      dc = (function () {
        var a = [],
          b = U.$g;
        return {
          instance: function (d) {
            function e() {
              t
                ? q()
                : ((g = rd.instance({ ka: D, vm: b })),
                  (n = U.uk[da.T()]),
                  (z = ca.instance({
                    isFloat: Ea.fa(),
                    S: !0,
                    isPot: !0,
                    isLinear: !1,
                    Pb: !0,
                    width: n,
                    height: n / 2,
                    F: 3,
                  })),
                  (H = ca.instance({
                    isFloat: Ea.fa(),
                    S: !0,
                    isPot: !0,
                    isLinear: !1,
                    Pb: !0,
                    width: n,
                    height: n / 2,
                    F: 3,
                  })),
                  (x = ca.instance({
                    isFloat: Ea.fa(),
                    S: !0,
                    isPot: !0,
                    width: 1,
                    height: n / 2,
                    F: 3,
                  })),
                  (f = ca.instance({
                    isFloat: Ea.fa() && !b,
                    S: !b,
                    isPot: !1,
                    isLinear: !0,
                    Pb: !0,
                    isMipmap: !1,
                    width: n,
                    height: n / 2,
                    F: b ? 4 : 3,
                  })),
                  (t = !0),
                  q(),
                  L.forEach(function (k) {
                    k();
                  }),
                  L.splice(0, L.length));
            }
            function q() {
              if (t) {
                Ba.ca();
                g.on();
                z.O();
                C.set('s79');
                D.g(0);
                C.G('u89', U.Oc);
                ca.Ck(1);
                Y.l(!0, !0);
                for (var k = U.mm[da.T()], p = 0; p < k; ++p)
                  H.o(),
                    C.set('s82'),
                    C.M('u10', 1 / n, 0),
                    z.g(0),
                    Y.l(!1, !1),
                    z.o(),
                    C.M('u10', 0, 2 / n),
                    H.g(0),
                    Y.l(!1, !1);
                x.O();
                C.set('s84');
                z.g(0);
                Y.l(!1, !1);
                C.set(b ? 's86' : 's85');
                f.O();
                z.g(0);
                x.g(1);
                Y.l(!1, !1);
                ca.aa(0);
                ca.aa(1);
              }
            }
            var l = Object.assign({ Fb: null, vc: null, uc: 0, wc: 0 }, d),
              v = 0,
              n = 0,
              t = !1,
              r = null,
              w = null,
              D = null,
              z = null,
              H = null,
              x = null,
              f = null,
              g = null,
              A = 0,
              L = [];
            d = {
              m: function () {
                function k() {
                  2 === ++p &&
                    ((D = ca.instance({
                      isFloat: Ea.fa(),
                      S: !0,
                      isPot: !1,
                      isMipmap: !1,
                      isLinear: !1,
                      Pb: !0,
                      width: v,
                      height: v / 2,
                      F: 3,
                    })),
                    Ba.ca(),
                    D.O(),
                    C.set('s78'),
                    C.G('u94', l.wc),
                    C.G('u95', l.uc),
                    r.g(0),
                    w.g(1),
                    Y.l(!0, !0),
                    e());
                }
                var p = 0;
                v = U.vk[da.T()];
                A = Math.log2(v) - 1;
                l.Fb &&
                  ((r = ca.instance({
                    isPot: !1,
                    url: l.Fb,
                    J: k,
                    F: 3,
                    isFlipY: !1,
                  })),
                  (w = ca.instance({
                    isPot: !1,
                    url: l.vc,
                    J: k,
                    F: 3,
                    isFlipY: !1,
                  })));
              },
              jj: function (k) {
                D = k;
                e();
              },
              dd: function (k) {
                t && (g.g(k), C.G('u112', g.N()));
              },
              ed: function (k) {
                t && f.g(k);
              },
              ph: function () {
                C.G('u3', A);
              },
              Ih: function () {
                return A;
              },
              N: function () {
                return v;
              },
              Hb: function (k) {
                t ? k() : L.push(k);
              },
              L: function () {
                r && r.remove();
                w && w.remove();
                z.remove();
                x.remove();
                H.remove();
                g.remove();
                f.remove();
                D.remove();
              },
            };
            a.push(d);
            d.m();
            return d;
          },
          L: function () {
            a.forEach(function (d) {
              d.L();
            });
          },
        };
      })(),
      Zc = {
        instance: function (a) {
          var b = a.Hm,
            d = a.Fm,
            e = 0,
            q = b.N();
          a = U.$g;
          var l = ca.instance({
              isFloat: Ea.fa() && !a,
              S: !a,
              isLinear: !0,
              isMipmap: !1,
              isPot: !1,
              width: q,
              F: a ? 4 : 3,
              isFlipY: !1,
            }),
            v = ca.instance({
              isFloat: Ea.fa() && !a,
              S: !a,
              isPot: !1,
              isLinear: !0,
              Pb: !0,
              isMipmap: !1,
              width: q,
              height: q / 2,
              F: a ? 4 : 3,
            }),
            n = Ba.instance({ width: q, height: q }),
            t = a ? 's72' : 's71';
          return {
            Yn: function (r) {
              e = r;
              C.set(t);
              c.viewport(0, 0, q, q);
              n.o();
              l.o();
              C.G('u9', e);
              b.dd(1);
              d.dd(0);
              Y.l(!0, !0);
              c.viewport(0, 0, q, q / 2);
              v.o();
              b.ed(1);
              d.ed(0);
              Y.l(!1, !1);
              c.flush();
            },
            dd: function (r) {
              l.g(r);
            },
            ed: function (r) {
              v.g(r);
            },
            ph: function () {
              C.G('u3', b.Ih() * (1 - e) + d.Ih() * e);
            },
          };
        },
      },
      Pb = (function () {
        function a(u) {
          var F = (h - U.Fe) / (U.dh - U.Fe);
          F = 1 - Math.pow(1 - F, U.So);
          h += u * (1 + F * U.To);
          h = Math.min(Math.max(h, U.Fe), U.dh);
          m.oc();
        }
        function b(u) {
          -1 !== n &&
            ((A = g = 0),
            v(),
            a((U.Ro * u.deltaY) / window.innerHeight),
            u.preventDefault());
        }
        function d() {
          k += g;
          p += A;
          p = Math.min(Math.max(p, U.$m), U.Zm);
          m.oc();
        }
        function e(u) {
          if (0 === n || -1 === n) return !1;
          var F = void 0 !== u.touches && u.touches.length;
          u.preventDefault();
          if (2 === n) {
            var R = Qc(
              u.touches[0].pageX,
              u.touches[0].pageY,
              u.touches[1].pageX,
              u.touches[1].pageY
            );
            a(-(x - R) * U.an);
            x = R;
          } else
            (R = F ? u.touches[0].clientX : u.clientX),
              (u = F ? u.touches[0].clientY : u.clientY),
              (g = (2 * (R - z) * Math.PI) / da.N()),
              (A = (2 * (u - H) * Math.PI) / da.X()),
              4 === n
                ? ((B[0] += g * U.Hi),
                  (B[1] -= A * U.Hi),
                  (B[0] = Math.min(Math.max(B[0], -U.Ki), U.Ki)),
                  (B[1] = Math.min(Math.max(B[1], -U.Li), U.Li)),
                  m.oc())
                : d(),
              (z = R),
              (H = u);
        }
        function q() {
          0 !== n &&
            -1 !== n &&
            ((0 === g && 0 === A) || 1 !== n || !I
              ? wa.ta()
              : (v(), (f = Date.now()), (G = setInterval(m.Em, L))),
            (n = 0));
        }
        function l(u) {
          if (2 !== n && -1 !== n) {
            A = g = 0;
            v();
            wa.wake();
            var F = void 0 !== u.changedTouches && u.touches.length;
            u.preventDefault();
            F && 2 === u.touches.length
              ? ((n = 2),
                (x = Qc(
                  u.touches[0].pageX,
                  u.touches[0].pageY,
                  u.touches[1].pageX,
                  u.touches[1].pageY
                )))
              : ((n = F || 2 !== u.button ? 1 : 4),
                (z = F ? u.touches[0].clientX : u.clientX),
                (H = F ? u.touches[0].clientY : u.clientY));
            return !1;
          }
        }
        function v() {
          G && (clearInterval(G), (G = !1));
        }
        var n = 0,
          t = !1,
          r = !1,
          w = !1,
          D = 1,
          z = 0,
          H = 0,
          x = 0,
          f = 0,
          g = 0,
          A = 0,
          L = 16,
          k = U.yj,
          p = U.Ji,
          h = U.Ee,
          G = !1,
          I = 0,
          E = new Float32Array([0, 0, 0, 0, 0]),
          B = [U.Gk, U.Hk],
          m = {
            m: function () {
              I = U.Yj[da.T()];
              L = U.od[da.T()];
              da.Fa('mousedown', l);
              da.Fa('mouseup', q);
              da.Fa('mouseout', q);
              da.Fa('mousemove', e);
              da.Fa('mousemove', e);
              da.Fa('wheel', b);
              da.Fa('touchstart', l);
              da.Fa('touchend', q);
              da.Fa('touchmove', e);
            },
            oc: function (u) {
              t
                ? ((r[0] = -p),
                  (r[1] = k),
                  (w[1].value = (D / U.Ee) * h),
                  Va.xb(w))
                : ((E[0] = k),
                  (E[1] = p),
                  (E[2] = h),
                  (E[3] = B[0]),
                  (E[4] = B[1]),
                  rc.Cn(E, u));
            },
            Em: function () {
              if ((1e-4 > g && 1e-4 > A) || -1 === n)
                v(), (A = g = 0), 0 === n && wa.ta();
              var u = Date.now(),
                F = u - f;
              f = u;
              u = Math.pow(I, F / L);
              g *= u;
              A *= u;
              d();
            },
            We: function (u) {
              t ||
                ((t = !0),
                (n = -1),
                (r = [0, 0, 0]),
                (w = [
                  { name: 'u80', type: '3f', value: r },
                  { name: 'u84', type: '1f', value: 1 },
                ]),
                (D = u));
            },
            tj: function (u) {
              -1 === n && u && (n = 0);
              u || (n = -1);
            },
            vn: function () {
              A = g = 0;
              k = U.yj;
              p = U.Ji;
              h = U.Ee;
              m.oc();
            },
            lq: function (u) {
              h = u;
            },
            mq: function (u) {
              B[0] = u[0];
              B[1] = u[1];
              U.eh = u[2];
            },
            kq: function (u, F) {
              k = u;
              p = F;
            },
          };
        return m;
      })(),
      uc = (function () {
        var a = {
          s98: !1,
          s98color: !1,
          s98NormalMap: !1,
          s98ParamsMap: !1,
          s98NormalParamsMap: !1,
        };
        return {
          instance: function (b) {
            function d(N) {
              if (O) {
                N.tweaker &&
                  JEELIZVTO &&
                  'undefined' !== typeof S &&
                  S.Zg(N.tweaker);
                B = N.partsNames || [];
                E.splice(0, E.length);
                E.push({ n: 0, offset: 0 });
                h.min.set(Infinity, Infinity, Infinity);
                h.max.set(-Infinity, -Infinity, -Infinity);
                var y = N.uvs;
                y &&
                  (y = y.filter(function (na) {
                    return na;
                  }));
                ha = y && 0 < y.length && 0 < y[0].length ? !0 : !1;
                'undefined' !== typeof vb &&
                  'string' === typeof N.faces &&
                  (N.faces = vb(N.faces));
                'undefined' !== typeof rb &&
                  ('string' === typeof N.vertices &&
                    (N.vertices = rb(N.vertices)),
                  y &&
                    y.length &&
                    y.forEach(function (na, oa) {
                      'string' === typeof na && (y[oa] = rb(na));
                    }));
                var P = N.metadata.faces,
                  K = 1 + (ha ? 1 : 0);
                P = (N.faces.length - P) / (N.metadata.faces * K);
                (6 !== P && 8 !== P) || ha || (++K, (P /= 2));
                if (4 === P) {
                  P = 6 * K + 2;
                  for (
                    var V = 4 * K + 1, ra = Array(N.metadata.faces * P), ja = 0;
                    ja < N.metadata.faces;
                    ++ja
                  )
                    for (var sa = 0; sa < K; ++sa)
                      (ra[ja * P + 4 * sa] = N.faces[ja * V + 5 * sa]),
                        (ra[ja * P + 4 * sa + 1] =
                          N.faces[ja * V + 5 * sa + 1]),
                        (ra[ja * P + 4 * sa + 2] =
                          N.faces[ja * V + 5 * sa + 2]),
                        0 === sa && (ra[ja * P + 3] = N.faces[ja * V + 4]),
                        (ra[ja * P + 4 * sa + 3 * K + 1] =
                          N.faces[ja * V + 5 * sa]),
                        (ra[ja * P + 4 * sa + 3 * K + 2] =
                          N.faces[ja * V + 5 * sa + 2]),
                        (ra[ja * P + 4 * sa + 3 * K + 3] =
                          N.faces[ja * V + 5 * sa + 3]),
                        0 === sa &&
                          (ra[ja * P + 3 * K + 4] = N.faces[ja * V + 4]);
                  N.faces = ra;
                  N.metadata.faces *= 2;
                }
                z = Array(N.metadata.vertices);
                for (P = 0; P < N.metadata.vertices; ++P)
                  (z[P] = new Ta(
                    N.vertices[3 * P],
                    N.vertices[3 * P + 1],
                    N.vertices[3 * P + 2]
                  )),
                    dd(h, z[P]);
                H = Array(N.metadata.faces);
                K = 3 * K + 1;
                for (P = 0; P < N.metadata.faces; ++P)
                  (H[P] = new wc(
                    N.faces[K * P],
                    N.faces[K * P + 1],
                    N.faces[K * P + 2]
                  )),
                    (H[P].Xb = N.faces[K * P + 3]);
                u = 3 < z.length;
                O && (O.visible = u);
                fd(z, H);
                x = gd(z, H);
                if (ha) {
                  K = Array(z.length);
                  P = ['a', 'b', 'c'];
                  for (V = 0; V < N.metadata.faces; ++V)
                    for (ra = 0; 3 > ra; ++ra)
                      if (
                        ((ja = N.faces[7 * V + ra]),
                        (sa = N.faces[7 * V + 1 + ra + 3]),
                        'undefined' === typeof K[ja])
                      )
                        K[ja] = [[ja, sa]];
                      else if (K[ja][0][1] !== sa) {
                        for (var Pa = -1, la = 1; la < K[ja].length; ++la)
                          if (K[ja][la][1] === sa) {
                            Pa = K[ja][la][0];
                            break;
                          }
                        la = -1;
                        -1 === Pa
                          ? ((la = z.length),
                            z.push(z[ja].clone()),
                            x.push(x[ja].clone()),
                            K[ja].push([la, sa]),
                            (K[la] = [[la, sa]]))
                          : (la = Pa);
                        N.faces[7 * V + ra] = la;
                        H[V][P[ra]] = la;
                      }
                  f = Array(z.length);
                  for (N = 0; N < z.length; ++N)
                    (P = 'undefined' === typeof K[N] ? N : K[N][0][1]),
                      (f[N] = new Vb(y[0][2 * P], y[0][2 * P + 1]));
                }
                var Z = oc(h);
                b.Db &&
                  (z.forEach(function (na) {
                    na.x -= Z.x;
                    na.z -= Z.z;
                    na.y -= h.min.y;
                  }),
                  (h.min.x -= Z.x),
                  (h.max.x -= Z.x),
                  (h.min.z -= Z.z),
                  (h.max.z -= Z.z),
                  (h.max.y -= h.min.y),
                  (h.min.y = 0));
                if (b.Eb) {
                  var ia =
                    U.sk /
                    Math.max(
                      h.max.x - h.min.x,
                      h.max.y - h.min.y,
                      h.max.z - h.min.z
                    );
                  z.forEach(function (na) {
                    na.Ba(ia);
                  });
                  h.min.Ba(ia);
                  h.max.Ba(ia);
                }
                N = ha ? 8 : 6;
                K = new Float32Array(z.length * N);
                for (P = 0; P < z.length; ++P)
                  (K[N * P] = z[P].x),
                    (K[N * P + 1] = z[P].y),
                    (K[N * P + 2] = z[P].z),
                    (K[N * P + 3] = x[P].x),
                    (K[N * P + 4] = x[P].y),
                    (K[N * P + 5] = x[P].z),
                    ha && ((K[N * P + 6] = f[P].x), (K[N * P + 7] = f[P].y));
                H.sort(function (na, oa) {
                  return na.Xb - oa.Xb;
                });
                var X = new (65536 > 3 * H.length ? Uint16Array : Uint32Array)(
                    3 * H.length
                  ),
                  ma = 0;
                H.forEach(function (na, oa) {
                  na.Xb === ma
                    ? (E[ma].n += 3)
                    : (E.push({ n: 3, offset: 3 * oa }), ++ma);
                  X[3 * oa] = na.a;
                  X[3 * oa + 1] = na.b;
                  X[3 * oa + 2] = na.c;
                });
                g && g.remove();
                g = Y.instance({ ha: K, indices: X });
                k = L = !1;
                ea && O.jh();
                F = !0;
                O.Te();
                b.J && (b.J(O), (b.J = null));
              }
            }
            function e(N) {
              g.Ga(N.n, N.offset);
            }
            function q(N, y) {
              Q[y] &&
                (C.set(Q[y].Vl()),
                g.bind(!1),
                ha ? (C.Ma(), C.gj()) : (C.Ya(), C.hj()),
                Q[y].Jc() && (C.Qc(), L.xc(!1), C.Vd(), nb.Ib()),
                Q[y].fl(),
                Q[y].nd(),
                g.Ga(N.n, N.offset));
            }
            function l(N, y) {
              Q[y] &&
                (C.set(Q[y].Wl()),
                g.bind(!1),
                ha ? (C.Ma(), C.gj()) : (C.Ya(), C.hj()),
                Q[y].Jc() && (C.Qc(), L.xc(!1), C.Vd(), nb.Ib()),
                O.Cc(),
                Q[y].nd(),
                g.Ga(N.n, N.offset));
            }
            function v(N, y) {
              ka && Q[y] && (Q[y].gl(), g.Ga(N.n, N.offset));
            }
            function n(N, y) {
              ka && Q[y] && (Q[y].il(ha), g.Ga(N.n, N.offset));
            }
            function t(N, y) {
              Q[y] && (C.set(Q[y].Rl()), Q[y].uh(), g.Ga(N.n, N.offset));
            }
            function r(N, y) {
              Q[y] &&
                (C.set(Q[y].Sl()), O.Cc(), Q[y].uh(), g.Ga(N.n, N.offset));
            }
            function w(N, y) {
              Q[y] &&
                (C.set(Q[y].Tl()),
                Q[y].Jc() && (L.xc(!1), C.Vd(), nb.Ib()),
                g.bind(!1),
                Q[y].rh(ha),
                g.Ga(N.n, N.offset));
            }
            function D(N, y) {
              if (Q[y]) {
                var P = Q[y].Ul();
                C.set(P);
                Q[y].Jc() && (L.xc(!1), C.Vd(), nb.Ib(), g.bind(!1));
                a[P] || (O.Cc(), g.bind(!1), (a[P] = !0));
                Q[y].rh(ha);
                g.Ga(N.n, N.offset);
              }
            }
            if (!da.gh()) return !1;
            void 0 === b.Db && (b.Db = !1);
            void 0 === b.Eb && (b.Eb = !1);
            void 0 === b.bh && (b.bh = !1);
            var z = null,
              H = null,
              x = null,
              f = null,
              g = null,
              A = null,
              L = null,
              k = !1,
              p = new Xb(),
              h = new vc(),
              G = [],
              I = null,
              E = [{ n: 0, offset: 0 }],
              B = [],
              m = [],
              u = !1,
              F = !1,
              R = [],
              Q = [],
              ea = !1,
              ha = !1,
              ka = !1,
              O = {
                visible: u,
                Rk: function () {
                  return E.length;
                },
                Pl: function () {
                  return B;
                },
                jh: function () {
                  !k &&
                    ha &&
                    ((H = H.filter(function (N) {
                      return null !== N;
                    })),
                    (A = hd(z, x, f, H)),
                    (L = Y.instance({ ha: A, indices: !1 })),
                    (f = x = H = z = A = null),
                    (k = !0));
                },
                Cc: function () {
                  nb.U();
                  O.th();
                },
                th: function () {
                  C.Rc('u135', p.elements);
                },
                rp: function () {
                  u && (O.th(), g.bind(!1), ha ? C.Ma() : C.Ya(), g.U());
                },
                pl: function (N) {
                  u && (N || O.Cc(), g.bind(!1), ha ? C.Ma() : C.Ya(), g.U());
                },
                ql: function () {
                  u && (g.bind(!1), ha ? C.Ma() : C.Ya(), E.forEach(v));
                },
                qh: function () {
                  u && (g.bind(!1), ha ? C.Ma() : C.Ya(), m.forEach(e));
                },
                nl: function (N) {
                  ka &&
                    u &&
                    (g.bind(!1),
                    ha ? C.Ma() : C.Ya(),
                    N ? E.forEach(t) : E.forEach(r));
                },
                md: function (N) {
                  u &&
                    (N || O.Cc(),
                    g.bind(!1),
                    N || (C.Ma(), C.Qc()),
                    ka && E.forEach(n));
                },
                nd: function (N) {
                  ka && u && (N ? E.forEach(q) : E.forEach(l));
                },
                kl: function () {
                  ka && u && E.forEach(D);
                },
                jl: function () {
                  ka && u && E.forEach(w);
                },
                Rh: function () {
                  return I;
                },
                Ph: function () {
                  return R;
                },
                yo: function (N, y) {
                  Q[N].update(y);
                  O.Ij();
                },
                og: function (N, y) {
                  function P(ja, sa) {
                    ja &&
                      ((ja.J = function () {
                        O && (++ra < V || K());
                      }),
                      (ja = zc.instance(ja)),
                      Q[sa] && Q[sa].L(),
                      (Q[sa] = ja),
                      (ea = ea || ja.Jc()));
                  }
                  function K() {
                    ka = !0;
                    ea && O.Hb(O.jh, 5);
                    O.Te();
                    y &&
                      O.Hb(function () {
                        y(O);
                      }, 10);
                  }
                  R = N;
                  ka = !1;
                  var V = N.length,
                    ra = 0;
                  Q = Array(V);
                  ea = !1;
                  N.forEach(function (ja, sa) {
                    'string' === typeof ja
                      ? xc(
                          -1 === ja.indexOf('.json') ? ja + '.json' : ja,
                          function (Pa) {
                            Pa.name = ja;
                            P(Pa, sa, ja);
                          }
                        )
                      : P(ja, sa, !1);
                  });
                  O.Hb(function () {
                    O.Ij();
                    wa.yb(O);
                    wa.de(!0);
                  }, 4);
                },
                Ij: function () {
                  m.splice(0, m.length);
                  E.forEach(function (N, y) {
                    Q[y] && Q[y].Cm() && m.push(N);
                  });
                },
                Hb: function (N, y) {
                  F && ka ? N(O) : G.push({ pb: N, order: y ? y : 0 });
                },
                Te: function () {
                  F &&
                    ka &&
                    (G.sort(function (N, y) {
                      return 0 > N.order - y.order ? 1 : -1;
                    }),
                    G.forEach(function (N) {
                      N.pb(O);
                    }),
                    G.splice(0, G.length));
                },
                remove: function () {
                  O.L();
                  O = null;
                },
                L: function () {
                  u = F = !1;
                  g && g.remove();
                  Q.forEach(function (N) {
                    N.L();
                  });
                  k && L.remove();
                },
                Yl: function () {
                  return h.size().x;
                },
                Zl: function () {
                  return h.size().y;
                },
                Ip: function () {
                  return h.size().z;
                },
                Bl: function () {
                  return oc(h).x;
                },
                Cl: function () {
                  return oc(h).y;
                },
                wp: function () {
                  return oc(h).z;
                },
                Ep: function () {
                  return h.min.y;
                },
                replace: function (N, y, P) {
                  if (N === I) return y && O && (O.Te(), y(O)), !1;
                  I = N;
                  wa.de(!1);
                  xc(
                    N,
                    function (K) {
                      d(K);
                      y && y(O);
                    },
                    P
                  );
                  return !0;
                },
              };
            b.Mc && O.og(b.Mc, b.bh);
            I = b.url;
            xc(b.url, d);
            return O;
          },
          sn: function () {
            a.s98 = !1;
            a.s98color = !1;
            a.s98NormalMap = !1;
            a.s98ParamsMap = !1;
            a.s98NormalParamsMap = !1;
          },
        };
      })(),
      rc = (function () {
        var a = null,
          b = !1,
          d = !1,
          e = null,
          q = new Float32Array(16),
          l = new Float32Array(3),
          v = { data: 0 },
          n = {
            m: function () {
              a = U.Jb
                ? new Worker('js/worker.php')
                : {
                    postMessage: function (t) {
                      v.data = t;
                      Ac.Um(v);
                    },
                    terminate: function () {},
                  };
              a.onmessage = function (t) {
                switch (t.data[0]) {
                  case 3:
                    for (var r = 0; 16 > r; ++r) q[r] = t.data[r + 1];
                    for (r = 0; 3 > r; ++r) l[r] = t.data[r + 17];
                    nb.af().Tn(q, l);
                    break;
                  case 6:
                    n.Nn(), (b = !0), Pb.oc(!1), U.ea && (zb.enable(), zb.Wd());
                }
              };
              e = new Float32Array(6);
              e[0] = 2;
              U.Jb || Ac.Pn(a);
            },
            mo: function () {
              U.oh || (d = !0);
            },
            wq: function () {
              d = !1;
            },
            Cn: function (t, r) {
              if (r || (b && d))
                (e[1] = t[0]),
                  (e[2] = t[1]),
                  (e[3] = t[2]),
                  (e[4] = t[3]),
                  (e[5] = t[4]),
                  a.postMessage(e);
            },
            Nn: function () {
              a.postMessage([5, U.eh]);
            },
            L: function () {
              U.Jb && a.terminate();
            },
          };
        return n;
      })(),
      Ac = (function () {
        var a = 0,
          b = 0,
          d = 0,
          e = [0, 0],
          q = new Xb(),
          l = new nc(),
          v = new nc(),
          n = new Ta(),
          t = new Ta(),
          r = new Wb(),
          w = 0,
          D = new Float32Array(20);
        D[0] = 3;
        var z = !1,
          H = { data: !1 },
          x = {
            m: function () {
              'undefined' === typeof U && (self.Vo = { Jb: !0 });
              U.Jb && x.bg([6]);
            },
            Um: function (f) {
              switch (f.data[0]) {
                case 2:
                  x.pg(f.data);
                  break;
                case 5:
                  w = f.data[1];
              }
            },
            bg: function (f) {
              U.Jb ? postMessage(f) : ((H.data = f), z.onmessage(H));
            },
            pg: function (f) {
              a = f[1];
              b = f[2];
              d = f[3];
              e[0] = f[4];
              e[1] = f[5];
              n.set(e[0], e[1], -d);
              r.set(b, a, 0, 'XYZ');
              if (!1 === r instanceof Wb)
                throw Error(
                  'JETHREE.Quaternion: .setFromEuler() now expects a Euler rotation rather than a Vector3 and order.'
                );
              f = Math.cos(r.B / 2);
              var g = Math.cos(r.C / 2),
                A = Math.cos(r.D / 2),
                L = Math.sin(r.B / 2),
                k = Math.sin(r.C / 2),
                p = Math.sin(r.D / 2),
                h = r.order;
              'XYZ' === h
                ? ((l.B = L * g * A + f * k * p),
                  (l.C = f * k * A - L * g * p),
                  (l.D = f * g * p + L * k * A),
                  (l.P = f * g * A - L * k * p))
                : 'YXZ' === h
                ? ((l.B = L * g * A + f * k * p),
                  (l.C = f * k * A - L * g * p),
                  (l.D = f * g * p - L * k * A),
                  (l.P = f * g * A + L * k * p))
                : 'ZXY' === h
                ? ((l.B = L * g * A - f * k * p),
                  (l.C = f * k * A + L * g * p),
                  (l.D = f * g * p + L * k * A),
                  (l.P = f * g * A - L * k * p))
                : 'ZYX' === h
                ? ((l.B = L * g * A - f * k * p),
                  (l.C = f * k * A + L * g * p),
                  (l.D = f * g * p - L * k * A),
                  (l.P = f * g * A + L * k * p))
                : 'YZX' === h
                ? ((l.B = L * g * A + f * k * p),
                  (l.C = f * k * A + L * g * p),
                  (l.D = f * g * p - L * k * A),
                  (l.P = f * g * A - L * k * p))
                : 'XZY' === h &&
                  ((l.B = L * g * A - f * k * p),
                  (l.C = f * k * A - L * g * p),
                  (l.D = f * g * p + L * k * A),
                  (l.P = f * g * A + L * k * p));
              n.y -= w;
              f = q.elements;
              p = l.x;
              var G = l.y,
                I = l.z;
              L = l.w;
              var E = p + p,
                B = G + G;
              k = I + I;
              g = p * E;
              A = p * B;
              p *= k;
              h = G * B;
              G *= k;
              I *= k;
              E *= L;
              B *= L;
              L *= k;
              f[0] = 1 - (h + I);
              f[4] = A - L;
              f[8] = p + B;
              f[1] = A + L;
              f[5] = 1 - (g + I);
              f[9] = G - E;
              f[2] = p - B;
              f[6] = G + E;
              f[10] = 1 - (g + h);
              f[3] = 0;
              f[7] = 0;
              f[11] = 0;
              f[12] = 0;
              f[13] = 0;
              f[14] = 0;
              f[15] = 1;
              q.setPosition(n);
              v.K(l).inverse();
              f = t.K(n);
              G = f.x;
              E = f.y;
              I = f.z;
              g = v.x;
              A = v.y;
              L = v.z;
              k = v.w;
              p = k * G + A * I - L * E;
              h = k * E + L * G - g * I;
              B = k * I + g * E - A * G;
              G = -g * G - A * E - L * I;
              f.x = p * k + G * -g + h * -L - B * -A;
              f.y = h * k + G * -A + B * -g - p * -L;
              f.z = B * k + G * -L + p * -A - h * -g;
              for (f = 1; 17 > f; ++f) D[f] = q.elements[f - 1];
              D[17] = t.x;
              D[18] = t.y;
              D[19] = t.z;
              x.bg(D);
            },
            Pn: function (f) {
              z = f;
              x.bg([6]);
            },
          };
        return x;
      })();
    Ac.m();
    var zc = (function () {
        function a(v) {
          var n = v.split(':').shift();
          return 'data' === n || 'blob' === n
            ? v
            : ('undefined' !== typeof M && M.ba ? M : U).ba + U.Ai + v;
        }
        function b(v, n) {
          return Math.min(n + v + n * v, 1);
        }
        var d = !1,
          e = null,
          q = 1,
          l = {
            diffuseTexture: null,
            normalTexture: null,
            paramsTexture: null,
            colorTextureUsage: 0,
            metalness: 0.5,
            roughness: 0.5,
            fresnelMin: 0,
            fresnelMax: 1,
            fresnelPow: 5,
            alpha: 1,
            diffuseColor: [255, 255, 255],
            paramsMapMask: [0, 0, 0, 0],
            J: null,
          };
        return {
          m: function () {
            e = ca.instance({
              width: 1,
              height: 1,
              isMipmap: !1,
              F: 4,
              array: new Uint8Array([255, 255, 255, 255]),
              Ic: !1,
            });
          },
          We: function () {
            d = !0;
            q = 2;
          },
          instance: function (v) {
            function n(m) {
              function u() {
                ++R === F && m && m();
              }
              var F = 1,
                R = 0;
              (r = H.normalTexture && da.Kk() ? !0 : !1) &&
                !g.La &&
                (++F,
                (g.La = ca.instance({
                  url: a(H.normalTexture),
                  isLinear: !0,
                  isMipmap: !0,
                  di: da.Bm(),
                  isPot: !0,
                  F: 3,
                  J: u,
                })));
              (w = H.diffuseTexture && '' !== H.diffuseTexture ? !0 : !1) &&
              !g.ga_
                ? (++F,
                  (g.ga_ = ca.instance({
                    url: a(H.diffuseTexture),
                    isMipmap: !0,
                    isLinear: !0,
                    isPot: !0,
                    di: !0,
                    Ic: !1,
                    Pb: !1,
                    sm: !1,
                    F: 4,
                    J: u,
                  })),
                  (f = 's103'))
                : g.ga_ || ((f = 's104'), (g.ga_ = e));
              x = [
                H.diffuseColor[0] / 255,
                H.diffuseColor[1] / 255,
                H.diffuseColor[2] / 255,
              ];
              (A = H.paramsTexture ? !0 : !1) &&
                !g.vb &&
                (H.paramsTexture === H.diffuseTexture
                  ? (g.vb = g.ga_)
                  : (++F,
                    (g.vb = ca.instance({
                      url: a(H.paramsTexture),
                      isMipmap: !0,
                      isLinear: !0,
                      isPot: !0,
                      di: !0,
                      Ic: !1,
                      Pb: !1,
                      sm: !1,
                      F: 4,
                      J: u,
                    }))));
              u();
            }
            function t(m) {
              'number' === typeof H.alpha
                ? ((D[0] = H.alpha), (D[1] = 0), (D[2] = 0), (D[3] = 0))
                : ((D[0] = H.alpha[0]),
                  (D[1] = H.alpha[1] - H.alpha[0]),
                  (D[2] = H.alpha[2]),
                  (D[3] = H.alpha[3]));
              var u = 1 <= H.fresnelPow ? H.fresnelMin : H.fresnelMax;
              z[0] = b(D[0], u);
              z[1] = b(D[1], u);
              z[2] = D[2];
              z[3] = D[3];
              L = {
                Ii: H.fresnelMax,
                wi: [H.fresnelMin, H.roughness, H.fresnelPow / 15, H.metalness],
                zi: H.paramsMapMask,
              };
              m = H.J ? H.J.bind(null, m) : null;
              n(m);
              r || A || w
                ? r || A
                  ? r && !A
                    ? ((k = 's98NormalMap'), (p = 's98NNGLtextureNormalMap'))
                    : !r && A
                    ? ((k = 's98ParamsMap'), (p = 's98NNGLtextureParamsMap'))
                    : ((k = 's98NormalParamsMap'),
                      (p = 's98NNGLtextureNormalParamsMap'))
                  : ((k = 's98'), (p = 's98NNGLtexture'))
                : ((k = 's98color'), (p = 's98NNGLcolor'));
              h = r ? 's106' : 's105';
              G = r ? 's100' : 's110';
              I = A ? 's108' : 's107';
              E = A ? 's101' : 's111';
            }
            var r,
              w,
              D = [1, 0, 0, 0],
              z = [0, 0, 0, 0],
              H = Object.assign({}, l, v),
              x = null,
              f = null,
              g = { ga_: null, La: null, vb: null },
              A = (r = w = !1),
              L = null,
              k = null,
              p = null,
              h = null,
              G = null,
              I = null,
              E = null,
              B = {
                update: function (m) {
                  Object.assign(H, m);
                  t();
                },
                Jc: function () {
                  return r;
                },
                Cm: function () {
                  return 0.99 > D[0];
                },
                Wl: function () {
                  return G;
                },
                Vl: function () {
                  return h;
                },
                Sl: function () {
                  return E;
                },
                Rl: function () {
                  return I;
                },
                Ul: function () {
                  return k;
                },
                Tl: function () {
                  return p;
                },
                nd: function () {
                  r && g.La.g(0);
                },
                il: function (m) {
                  d && C.set(f);
                  m ? C.Ma() : C.Ya();
                  w && C.Qc();
                  B.md();
                },
                md: function () {
                  w && (C.G('u71', H.colorTextureUsage), g.ga_.g(0));
                  C.ug('u145', x);
                },
                uh: function () {
                  A && (g.vb.g(0), C.xa('u73', L.zi), C.Qc());
                  C.xa('u109', L.wi);
                  C.G('u146', L.Ii);
                },
                rh: function (m) {
                  A && !r
                    ? g.vb.g(q)
                    : r && (w || e.g(0), g.La.g(q), A && g.vb.g(q + 1));
                  A && C.xa('u73', L.zi);
                  w || r ? C.Kn() : m ? C.Ln() : C.Mn();
                  B.md();
                  C.xa('u9', D);
                  C.xa('u109', L.wi);
                  C.G('u146', L.Ii);
                },
                fl: function () {
                  C.xa('u9', D);
                },
                gl: function () {
                  C.xa('u9', z);
                },
                L: function () {
                  w && g.ga_.remove();
                  r && g.La.remove();
                  A && H.paramsTexture !== H.diffuseTexture && g.vb.remove();
                },
              };
            setTimeout(t.bind(null, B), 0);
            return B;
          },
        };
      })(),
      zb = (function () {
        var a = 0,
          b = 0,
          d = 0,
          e = 0,
          q = 0,
          l = 0,
          v = U.qk,
          n = U.pk,
          t = U.rk,
          r = 0,
          w = 0,
          D = null,
          z = null,
          H = 0,
          x = 0,
          f = 0,
          g = 0,
          A = 0,
          L = null,
          k = 0,
          p = 0,
          h = 0,
          G = Date.now(),
          I = null,
          E = !1,
          B = !1,
          m = !1,
          u = 1,
          F = !1,
          R = {
            m: function () {
              a = U.kk[da.T()];
              b = U.jk[da.T()];
              d = U.ik[da.T()];
              p = U.lk[da.T()];
              e = U.ck[da.T()];
              q = U.gk[da.T()];
              f = U.hk[da.T()];
              g = da.N();
              A = da.X();
              r = Math.round(g * a);
              w = Math.round(A * a);
              z = Ba.instance({ width: r, height: w, Fc: !1 });
              D = ca.instance({ width: r, height: w, isPot: !1, isLinear: !0 });
              L = ca.instance({
                width: r,
                height: w,
                isPot: !1,
                isLinear: !0,
                F: 1,
              });
              E = !0;
            },
            resize: function (Q, ea, ha) {
              u = ha;
              g = Q;
              A = ea;
              r = Math.round(Q * a);
              w = Math.round(ea * a);
              z.resize(r, w);
              B = !0;
            },
            U: function () {
              var Q = Math.exp(-(Date.now() - G) / p);
              k = m ? h + (1 - Q) * (1 - h) : h * Q;
              H = b + k * (d - b);
              x = e + (1 - k) * (1 - e);
              l = q + (1 - k) * (1 - q);
              ca.aa(5);
              if (B && E)
                ca.aa(6),
                  L.resize(r, w),
                  C.set('s0'),
                  C.Yd('u1', 6),
                  z.bind(!1, !0),
                  L.o(),
                  z.He(),
                  D.g(6),
                  Y.l(!0, !0),
                  D.resize(r, w),
                  D.o(),
                  L.g(6),
                  Y.l(!1, !1),
                  C.Yd('u1', 0),
                  (B = !1);
              else {
                c.enable(c.BLEND);
                c.blendFunc(c.CONSTANT_ALPHA, c.ONE_MINUS_SRC_ALPHA);
                Q = H / f;
                c.blendColor(Q, Q, Q, Q);
                c.colorMask(!0, !1, !1, !0);
                C.set('s90');
                nb.Ue();
                C.G('u126', H);
                p && (C.G('u127', x), C.G('u118', l));
                var ea = u * (v + Math.pow(Math.random(), t) * (n - v));
                C.M('u10', ea / g, ea / A);
                z.ah();
                z.Sc();
                D.o();
                ea = 2 * Math.PI * Math.random();
                for (var ha = !0, ka = 0; ka < f; ++ka)
                  1 === ka && (c.blendFunc(c.SRC_ALPHA, c.ONE), C.G('u126', Q)),
                    C.G('u125', ea + (ka / f) * (Math.PI / 2)),
                    C.M(
                      'u124',
                      (Math.random() - 0.5) / g,
                      (Math.random() - 0.5) / A
                    ),
                    Y.l(ha, ha),
                    (ha = !1);
                c.disable(c.BLEND);
                C.set('s91');
                C.M('u10', 1 / r, 1 / w);
                L.o();
                D.g(7);
                Y.l(!1, !1);
                c.colorMask(!0, !0, !0, !0);
              }
            },
            g: function (Q) {
              L.g(Q);
            },
            enable: function () {
              F = !0;
            },
            cn: function () {
              if (m || !F) return !1;
              I && clearTimeout(I);
              R.Wd();
              I = setTimeout(R.Gj, 400);
            },
            Wd: function () {
              I && (clearTimeout(I), (I = !1));
              !m &&
                F &&
                (window.Qj.disable(), (m = !0), (G = Date.now()), (h = k));
            },
            Gj: function () {
              m &&
                F &&
                (I && (clearTimeout(I), (I = null)),
                window.Qj.enable(),
                (m = !1),
                (G = Date.now()),
                (h = k));
            },
            L: function () {
              D.remove();
              L.remove();
              z.remove();
            },
          };
        R.cn();
        return R;
      })(),
      rd = {
        instance: function (a) {
          var b = a.ka.N(),
            d = a.vm ? !0 : !1,
            e = d ? 's73' : 's12',
            q = ca.instance({
              isFloat: a.ka.ni() && Ea.fa() && !d,
              S: a.ka.oi() && !d,
              isLinear: !0,
              isMipmap: !1,
              isPot: !1,
              width: b,
              height: b,
              F: d ? 4 : 3,
            }),
            l = ca.instance({
              isFloat: a.ka.ni() && Ea.fa(),
              S: a.ka.oi(),
              isPot: !0,
              width: 1,
              height: b / 2,
              F: 3,
            });
          l.o();
          C.set('s84');
          a.ka.g(0);
          Y.l(!0, !0);
          var v = Math.round(Math.log(b) / Math.log(2));
          q.on = function () {
            q.o();
            C.set(e);
            C.G('u89', U.Oc);
            a.ka.g(0);
            l.g(1);
            for (var n = 0, t = 0; t <= v; ++t) {
              var r = Math.pow(2, v - t),
                w = r / 2;
              c.viewport(0, n, b, w);
              C.M('u87', b / r, 1);
              C.G('u88', Math.min(6 / w, 0.6));
              n += r / 2;
              Y.l(0 === t, 0 === t);
            }
          };
          q.rn = q.remove;
          q.remove = function () {
            q.rn();
            l.remove();
          };
          return q;
        },
      };
    za.Na = (function () {
      var a = {
          Ud: 45,
          jg: 1,
          $b: '../../images/debug/picsou.png',
          kg: 0.8,
          Ff: 3.14 / 6,
          Gf: 0.314,
          Hf: 4,
          Df: 0.5,
          Ef: -0.25,
          Gm: 1,
          Y: 256,
          Cf: 0.15,
        },
        b = { Kb: null, rd: null, screen: null },
        d = !1,
        e = !1,
        q = -1,
        l = null,
        v = null,
        n = null,
        t = Math.PI / 180,
        r = [1, 1],
        w = {
          m: function (D) {
            q = D.width;
            D = {
              isFloat: Ea.fa(),
              S: !0,
              isPot: !1,
              isMipmap: !1,
              isLinear: !1,
              isMirrorY: !0,
              width: q,
              height: q / 2,
              F: 3,
            };
            b.Kb = ca.instance(D);
            b.rd = ca.instance(D);
            C.j('s113', [{ type: '1i', name: 'u153', value: 0 }]);
            C.j('s114', [{ type: '1i', name: 'u158', value: 0 }]);
            w.zo();
          },
          zo: function () {
            C.j('s114', [
              { type: '1f', name: 'u159', value: a.Ff },
              { type: '1f', name: 'u160', value: a.Gf },
              { type: '1f', name: 'u161', value: a.Hf },
              { type: '1f', name: 'u162', value: a.Df },
              { type: '1f', name: 'u163', value: a.Ef },
            ]);
          },
          Tp: function () {
            return e;
          },
          sa: function (D) {
            l = D;
          },
          Pc: function () {
            v =
              'uniform sampler2D u153;uniform vec2 u154,u155,u6;uniform int u156;uniform float u157,u139;varying vec2 vv0;const float h=3.141593;const vec2 i=vec2(.5,.5);const float e=1.2;const vec3 g=vec3(1.,1.,1.);void main(){vec2 c=vec2(vv0.x*2.,-vv0.y+.5)*h,a=i+u6*(c-u154)/u155;float b=1.;if(u156==0){if(a.x<0.||a.x>1.||a.y<0.||a.y>1.)discard;}else b*=smoothstep(-e,0.,a.x),b*=1.-smoothstep(1.,1.+e,a.x),b*=smoothstep(-e,0.,a.y),b*=1.-smoothstep(1.,1.+e,a.y);vec3 d=mix(u157*g,texture2D(u153,a).rgb*u139,b*g);gl_FragColor=vec4(d,1.);}';
            n =
              'uniform sampler2D u158;uniform float u159,u160,u161,u162,u163;varying vec2 vv0;const float f=3.141593;const vec2 o=vec2(.5,.5);const vec3 h=vec3(1.,1.,1.);void main(){float i=(vv0.x*2.-1.)*f,c=(-vv0.y+.5)*f;vec4 a=texture2D(u158,vec2(.5,.5));float d=a.r,j=u161*a.g,k=u162*(a.b+u163),b=a.a,g=asin(cos(b)*cos(d)),l=atan(cos(b)*sin(d),-sin(b)),m=acos(sin(c)*sin(g)+cos(c)*cos(g)*cos(i-l)),n=1.-smoothstep(u159-u160,u159+u160,m);gl_FragColor=vec4(h*(max(k,0.)+max(j,0.)*n),1.);}';
            C.oa('s113', {
              name: '_',
              h: v,
              i: 'u153 u154 u156 u155 u157 u139 u6'.split(' '),
              precision: 'highp',
            });
            C.oa('s114', {
              name: '_',
              h: n,
              i: 'u158 u159 u160 u161 u162 u163'.split(' '),
              precision: 'highp',
            });
          },
          zg: function (D, z, H, x, f, g, A) {
            C.M('u154', z, H);
            C.Yd('u156', x ? 1 : 0);
            C.M('u155', f, f / g);
            C.sg('u6', A);
            D.g(0);
            Y.l(!1, !1);
          },
          Uj: function (D) {
            c.viewport(0, 0, a.Y, a.Y / 2);
            C.set('s114');
            D.g(0);
            Y.l(!1, !1);
          },
          Sh: function () {
            return b.Kb;
          },
          Fk: function (D) {
            w.m({ width: a.Y });
            w.Jj(D, !1, 1);
            e = !0;
          },
          Ek: function () {
            (d && b.screen.am() === a.$b) ||
              ((d = !1),
              (b.screen = ca.instance({
                url: a.$b,
                isFloat: !1,
                J: function () {
                  d = !0;
                },
              })));
          },
          pg: function (D) {
            Object.assign(a, D);
          },
          Jj: function (D, z, H) {
            var x = a.Y;
            Ba.ca();
            b.rd.O();
            C.set('s0');
            b.Kb.g(0);
            Y.l(!0, !0);
            b.Kb.o();
            C.set('s113');
            C.G('u157', a.Cf);
            C.G('u139', a.Gm);
            w.zg(D, Math.PI, 0, !0, 90 * t, D.N() / D.X(), r);
            d &&
              (C.G('u139', a.kg),
              c.viewport(0, 0, x / 2, x / 2),
              w.zg(b.screen, 0, 0, !1, 2 * a.Ud * t, 2 * a.jg, r),
              c.viewport(x / 2, 0, x / 2, x / 2),
              w.zg(b.screen, 2 * Math.PI, 0, !1, 2 * a.Ud * t, 2 * a.jg, r));
            c.enable(c.BLEND);
            c.blendFunc(c.ONE, c.ONE);
            z && w.Uj(z);
            C.set('s0');
            c.blendColor(0, 0, 0, 1 - H);
            c.blendFunc(c.CONSTANT_ALPHA, c.ONE_MINUS_CONSTANT_ALPHA);
            b.rd.g(0);
            Y.l(!1, !1);
            c.disable(c.BLEND);
            l.jj(b.Kb);
          },
          v: function () {
            Object.assign(b, { Kb: null, rd: null, screen: null });
            e = d = !1;
            q = -1;
            l = null;
          },
        };
      return w;
    })();
    za.kb = (function () {
      var a = !1,
        b = !0,
        d = null,
        e = null,
        q = {
          Pc: function () {
            da.Z() &&
              (C.oa('s115', {
                name: '_',
                s: 'attribute vec3 a0;uniform sampler2D u39;uniform vec2 u40;uniform vec3 u141;const float l=1.,m=0.,n=0.,E=1.;const vec2 e=vec2(1.);const vec3 o=vec3(1.);const vec2 F=vec2(-1.,1.),p=vec2(.16,.5),q=vec2(.5,.5),r=vec2(.84,.5);uniform mat4 u74;uniform vec3 u76,u80,u81,u82;uniform float u75,u83,u84,u77,u78,u79,u85;mat3 s(vec3 c){vec3 b=cos(c),a=sin(c);return mat3(b.y*b.z,b.y*a.z,a.y,-a.x*a.y*b.z+b.x*a.z,-a.x*a.y*a.z-b.x*b.z,a.x*b.y,b.x*a.y*b.z+a.x*a.z,b.x*a.y*a.z-a.x*b.z,-b.x*b.y);}void main(){vec4 d=texture2D(u39,p);vec2 f=u83*e;vec3 c=u83*o;vec2 t=mix(d.a*u40,e,f),g=(2.*d.gb-e)*(1.-f);g.x*=-1.;vec3 a=mix(texture2D(u39,q).rgb+vec3(u77,0.,0.),u80,c);float u=mix(texture2D(u39,r).r,0.,u83);a.z+=u;mat3 v=s(a);vec3 w=mix(u141,u81,c);float x=mix(l,u84,u83);vec3 b=mix(u76,u82,c);b.x+=u75*sin(a.y);float h=cos(a.z),i=sin(a.z);mat2 y=mat2(h,i,-i,h);b.xy=y*b.xy;float z=mix(u79,1.,u83);vec2 j=u78/t;vec3 k=a0;float A=max(0.,-a0.z-m)*n;k.x+=A*sign(a0.x)*(1.-u83);vec3 B=v*(k+w)*x+b;vec2 C=j*z;vec3 D=vec3(g*C,-j)+B*vec3(1.,-1.,-1.);gl_Position=u74*(vec4(u85*e,e)*vec4(D,1.));}',
                h: 'void main(){gl_FragData[0]=vec4(0.,0.,0.,0.),gl_FragData[1]=vec4(0.,0.,1.,1.),gl_FragData[2]=vec4(1.,0.,0.,0.),gl_FragData[3]=vec4(0.,.5,1.,0.);}',
                i: ['u39', 'u40', 'u76', 'u141'].concat(C.ef(), C.ff()),
                I: ['a0'],
                R: [3],
                da: !0,
              }),
              (a = !0));
          },
          m: function (l) {
            a &&
              C.j(
                's115',
                [
                  { type: '1i', name: 'u39', value: 1 },
                  { type: '3f', name: 'u76', value: l.Ca },
                  { type: '1f', name: 'u77', value: 0 },
                  { type: '1f', name: 'u85', value: 1 },
                ].concat(l.Kg)
              );
          },
          ab: function (l) {
            e = l;
            d && q.Zh();
          },
          $a: function (l) {
            d = l;
            e && q.Zh();
          },
          Zh: function () {
            da.Z() &&
              (C.j('s115', [
                {
                  type: '3f',
                  name: 'u141',
                  value: [d[0] * e, d[1] * e, d[2] * e],
                },
              ]),
              C.H());
          },
          lm: function (l) {
            for (
              var v = l.width / 2,
                n = l.height / 2,
                t = l.depth,
                r = l.rl,
                w = l.height / 4,
                D = l.Vk,
                z = 2 * D + 4,
                H = [],
                x = [],
                f = -v + l.Sa,
                g = -r - l.Sa,
                A = v - l.Sa,
                L = -r - l.Sa,
                k = 0;
              k < z;
              ++k
            ) {
              var p = 0,
                h = 0;
              0 === k
                ? ((p = -v), (h = -r - t))
                : 1 <= k && k <= 1 + D
                ? ((h = (((k - 1) / D) * Math.PI) / 2),
                  (p = f - Math.cos(h) * l.Sa),
                  (h = g + Math.sin(h) * l.Sa))
                : k >= 2 + D && k <= 2 + 2 * D
                ? ((h = (((k - 2 - D) / D) * Math.PI) / 2),
                  (p = A + Math.sin(h) * l.Sa),
                  (h = L + Math.cos(h) * l.Sa))
                : k === z - 1 && ((p = v), (h = -r - t));
              H.push(p, n + w, h, p, -n + w, h);
              0 !== k &&
                x.push(
                  2 * k,
                  2 * k - 2,
                  2 * k - 1,
                  2 * k,
                  2 * k - 1,
                  2 * k + 1
                );
            }
            return q.instance({ ha: H, indices: x });
          },
          toggle: function (l) {
            b = l;
          },
          instance: function (l) {
            var v = Y.instance({ ha: l.ha, indices: l.indices });
            return {
              U: function () {
                a && b && (C.set('s115'), v.bind(!0), v.U());
              },
            };
          },
        };
      return q;
    })();
    za.la = (function () {
      var a = {
        kf: -87,
        em: [85, 95],
        Yh: [90, 90],
        Xh: [85, 70],
        gd: 24,
        Wk: 12,
        Xk: 2,
        cg: [-80, 10],
        Wh: [40, 140],
        Cd: [1, 8],
        dm: 80,
        Ei: [-120, -10],
        Tm: 2,
        $d: [0, -15],
        re: 1024,
        hb: 256,
        Od: 4,
        ko: [6, 30],
        Di: 1.2,
      };
      a.Oi = a.cg;
      var b = !1,
        d = !1,
        e = !1,
        q = null,
        l = null,
        v = null,
        n = null,
        t = null,
        r = null,
        w = !1,
        D = !1,
        z = null,
        H = null,
        x = null,
        f = null,
        g = 0.5,
        A = [{ type: '1f', name: 'u165', value: 1 }],
        L = null,
        k = null,
        p = null,
        h = null,
        G = null,
        I = {
          Xl: function () {
            return {
              name: '_',
              s: 'attribute vec3 a0,a2;attribute vec2 a1;varying vec2 vv0;varying float vv1;uniform sampler2D u39;uniform vec2 u40;uniform float u142;uniform vec3 u141;const float o=0.,p=0.;const vec2 e=vec2(1.);const vec3 q=vec3(1.);const vec2 G=vec2(-1.,1.),r=vec2(.16,.5),s=vec2(.5,.5),t=vec2(.84,.5);uniform mat4 u74;uniform vec3 u76,u80,u81,u82;uniform float u75,u83,u84,u77,u78,u79,u85;mat3 u(vec3 c){vec3 b=cos(c),a=sin(c);return mat3(b.y*b.z,b.y*a.z,a.y,-a.x*a.y*b.z+b.x*a.z,-a.x*a.y*a.z-b.x*b.z,a.x*b.y,b.x*a.y*b.z+a.x*a.z,b.x*a.y*a.z-a.x*b.z,-b.x*b.y);}void main(){vec4 d=texture2D(u39,r);vec2 f=u83*e;vec3 c=u83*q;vec2 v=mix(d.a*u40,e,f),g=(2.*d.gb-e)*(1.-f);g.x*=-1.;vec3 a=mix(texture2D(u39,s).rgb+vec3(u77,0.,0.),u80,c);float w=mix(texture2D(u39,t).r,0.,u83);a.z+=w;mat3 h=u(a);vec3 x=mix(u141,u81,c);float y=mix(u142,u84,u83);vec3 b=mix(u76,u82,c);b.x+=u75*sin(a.y);float i=cos(a.z),j=sin(a.z);mat2 z=mat2(i,j,-j,i);b.xy=z*b.xy;float A=mix(u79,1.,u83);vec2 k=u78/v;vec3 l=a0;float B=max(0.,-a0.z-o)*p;l.x+=B*sign(a0.x)*(1.-u83);vec3 C=h*(l+x)*y+b;vec2 D=k*A;vec3 E=vec3(g*D,-k)+C*vec3(1.,-1.,-1.);gl_Position=u74*(vec4(u85*e,e)*vec4(E,1.)),vv0=a1,gl_Position*=vec4(-1.,1.,1.,1.);vec3 F=h*a2;vv1=-F.z;}',
              h: 'uniform sampler2D u172,u158;uniform vec2 u87,u173;uniform float u174,u165;varying vec2 vv0;varying float vv1;void main(){vec2 b=u173*u174+u87*vv0;vec4 a=u165*texture2D(u172,b);a.r*=step(0.,vv0.y),gl_FragColor=vec4(0.,0.,0.,a.r*vv1);}',
              i: 'u39 u172 u158 u40 u76 u174 u173 u142 u141 u87 u165'
                .split(' ')
                .concat(C.ef())
                .concat(C.ff()),
              I: ['a0', 'a2', 'a1'],
              R: [3, 3, 2],
              precision: 'lowp',
            };
          },
          Pc: function () {
            C.oa('s116', {
              name: '_',
              s: 'attribute vec3 a0;uniform vec3 u141;uniform vec2 u166,u167;uniform float u142,u168,u169,u170;varying float vv0,vv1;void main(){vec3 a=(a0+u141)*u142;float b=atan(a.x,a.z-u168),d=2.*(a.y-u169)/(u170-u169)-1.;vv0=a0.y;float g=1.-u166.x*u166.x/(u166.y*u166.y),c=u166.x/sqrt(1.-g*pow(cos(b),2.));vec3 h=vec3(c*sin(b),a.y,c*cos(b)+u168);vv1=smoothstep(u167.x,u167.y,length(h-a)),gl_Position=vec4(b,d,0.,1.);}',
              h: 'uniform float u171;uniform vec4 u9;varying float vv0,vv1;void main(){float a=u9.x+u9.y*smoothstep(-u9.w,-u9.z,vv0),b=min(a,1.)*u171;gl_FragColor=vec4(b,vv1,1.,1.);}',
              i: 'u142 u141 u166 u167 u168 u169 u170 u9 u171'.split(' '),
              I: ['a0'],
              R: [3],
              precision: 'highp',
            });
            C.oa('s117', I.Xl());
            C.oa('s118', {
              name: '_',
              h: 'uniform sampler2D u1;uniform vec2 u10;varying vec2 vv0;void main(){vec4 a=texture2D(u1,vv0),b=texture2D(u1,vv0-3.*u10),c=texture2D(u1,vv0-2.*u10),d=texture2D(u1,vv0-u10),f=texture2D(u1,vv0+u10),g=texture2D(u1,vv0+2.*u10),h=texture2D(u1,vv0+3.*u10);float j=.031496*b.r+.110236*c.r+.220472*d.r+.275591*a.r+.220472*f.r+.110236*g.r+.031496*h.r;vec2 i=b.gb*b.b+c.gb*c.b+d.gb*d.b+a.gb*a.b+f.gb*f.b+g.gb*g.b+h.gb*h.b;i/=b.b+c.b+d.b+a.b+f.b+g.b+h.b,gl_FragColor=vec4(mix(j,a.r,1.-i.x),i,1);}',
              i: ['u1', 'u10'],
              precision: 'lowp',
            });
            b = !0;
          },
          m: function (E) {
            if (b) {
              if (void 0 === E.hc || !E.hc) return !1;
              if (d) I.ej(E);
              else {
                n = ca.instance({
                  isFloat: !1,
                  isPot: !1,
                  isMipmap: !1,
                  isLinear: !0,
                  width: a.re,
                  height: a.re / 4,
                  F: 4,
                });
                var B = a.hb / 4,
                  m = {
                    isFloat: !1,
                    isPot: !1,
                    isMipmap: !1,
                    isLinear: !1,
                    width: a.hb,
                    height: B,
                    F: 4,
                  };
                v = ca.instance(m);
                r = ca.instance(m);
                t = ca.instance({
                  isFloat: !1,
                  isPot: !1,
                  isMipmap: !1,
                  isLinear: !0,
                  width: a.hb,
                  height: B * a.Od,
                  F: 4,
                });
                B = 0.5 - 0.5 / E.ic[1];
                m = 0.5 + 0.5 / E.ic[1];
                for (
                  var u = a.Wk + 1,
                    F = [],
                    R = [],
                    Q = new Float32Array(16 * a.gd),
                    ea = new Uint16Array(6 * (a.gd - 1)),
                    ha = 0,
                    ka = 0,
                    O = 0,
                    N = 0;
                  N < a.gd;
                  ++N
                ) {
                  var y = (2 * N) / (a.gd - 1) - 1;
                  y = Math.sign(y) * Math.pow(Math.abs(y), a.Xk);
                  y = (Math.PI * (y + 1)) / 2 - Math.PI / 2;
                  var P = Math.sin(y),
                    K = Math.cos(y),
                    V = Math.sin(y * a.Di),
                    ra = Math.cos(y * a.Di),
                    ja = y / (Math.PI * E.ic[0]) + 0.5,
                    sa = a.Xh[0] * P,
                    Pa = a.Oi[0],
                    la = a.Xh[1] * K + a.kf,
                    Z = ja,
                    ia = B,
                    X = a.Yh[0] * P,
                    ma = a.Oi[1],
                    na = a.Yh[1] * K + a.kf,
                    oa = m,
                    Ia = 16 * N;
                  Q[Ia] = X;
                  Q[Ia + 1] = ma;
                  Q[Ia + 2] = na;
                  Q[Ia + 3] = V;
                  Q[Ia + 4] = 0;
                  Q[Ia + 5] = ra;
                  Q[Ia + 6] = ja;
                  Q[Ia + 7] = oa;
                  Q[Ia + 8] = sa;
                  Q[Ia + 9] = Pa;
                  Q[Ia + 10] = la;
                  Q[Ia + 11] = V;
                  Q[Ia + 12] = 0;
                  Q[Ia + 13] = ra;
                  Q[Ia + 14] = Z;
                  Q[Ia + 15] = ia;
                  0 !== N &&
                    ((Z = 2 * N),
                    (ia = 6 * (N - 1)),
                    (ea[ia] = Z),
                    (ea[ia + 1] = Z - 1),
                    (ea[ia + 2] = Z - 2),
                    (ea[ia + 3] = Z),
                    (ea[ia + 4] = Z + 1),
                    (ea[ia + 5] = Z - 1));
                  ia = Math.pow(
                    0.5 *
                      (1 +
                        Math.cos(
                          Math.min(
                            Math.max((Math.PI / a.Wh[0]) * sa, -Math.PI),
                            Math.PI
                          )
                        )),
                    a.Tm
                  );
                  Pa -= a.dm * ia;
                  Z = a.Wh[1] * ia;
                  sa -= P * a.Cd[0];
                  la -= K * a.Cd[1];
                  X -= P * a.Cd[0];
                  na -= K * a.Cd[1];
                  P = 0.001 > ia ? 2 : u;
                  for (K = 0; K < P; ++K)
                    (ia = K / (P - 1)),
                      (ja = Pa * (1 - ia) + ma * ia),
                      (oa = a.Ei[0]),
                      (oa = Math.min(
                        Math.max((ja - oa) / (a.Ei[1] - oa), 0),
                        1
                      )),
                      (oa = oa * oa * (3 - 2 * oa)),
                      F.push(
                        sa * (1 - ia) + X * ia,
                        ja,
                        (la +
                          Z * Math.exp(400 * -Math.abs(y) * Math.pow(ia, 4))) *
                          (1 - oa) +
                          na * oa,
                        V,
                        0,
                        ra,
                        0,
                        0
                      );
                  y = 0 === N ? 0 : 2 < P && 2 < ka ? P - 1 : 1;
                  for (V = 1; V <= y; ++V)
                    (ra = P > ka ? P - 2 : 0),
                      R.push(
                        ha + V + ra,
                        ha + V - 1,
                        O + V - 1,
                        O + V - 1,
                        O + V + (P < ka ? ka - 2 : 0),
                        ha + V + ra
                      );
                  ka = P;
                  O = ha;
                  ha += P;
                }
                h = Y.instance({
                  ha: new Float32Array(F),
                  indices: new Uint16Array(R),
                });
                G = Y.instance({ ha: Q, indices: ea });
                I.ej(E);
                C.j('s118', [{ type: '1i', name: 'u1', value: 0 }]);
                d = !0;
              }
            }
          },
          ej: function (E) {
            g = E.eo;
            f = E.ae;
            L = [
              { type: '1i', name: 'u39', value: 1 },
              { type: '1i', name: 'u172', value: 0 },
              { type: '1i', name: 'u158', value: 2 },
              {
                type: '3f',
                name: 'u76',
                value: [E.Ca[0], E.Ca[1] - a.$d[0], E.Ca[2] + a.$d[1]],
              },
              { type: '1f', name: 'u174', value: E.fo },
              { type: '2f', name: 'u87', value: [1, 1 / a.Od] },
              { type: '2f', name: 'u173', value: [0, 1 / a.Od] },
              { type: '1f', name: 'u165', value: 1 },
            ].concat(E.Kg, E.Fj);
            C.j('s117', L);
          },
          cc: function (E) {
            q = E;
          },
          bc: function (E) {
            k = E;
            k.Hb(I.yc);
          },
          pi: function () {
            return e && null !== k && null !== p;
          },
          yc: function () {
            if (!(e || (D && w)) || null === k || null === p) return !1;
            c.viewport(0, 0, a.re, a.re / 4);
            Ba.ca();
            n.o();
            c.clearColor(0, 0, 0, 0);
            c.clear(c.COLOR_BUFFER_BIT);
            C.j('s116', [
              { type: '1f', name: 'u168', value: a.kf },
              { type: '1f', name: 'u169', value: a.cg[0] },
              { type: '1f', name: 'u170', value: a.cg[1] },
              {
                type: '3f',
                name: 'u141',
                value: [z[0] + H[0], z[1] + H[1], z[2] + H[2]],
              },
              { type: '1f', name: 'u171', value: g },
              { type: '2f', name: 'u166', value: a.em },
              { type: '2f', name: 'u167', value: a.ko },
            ]);
            k.ql();
            C.set('s1');
            var E = a.hb / 4;
            c.viewport(0, 0, a.hb, E);
            v.o();
            n.g(0);
            n.ud();
            Y.l(!0, !0);
            for (var B = 0; B < a.Od; ++B)
              C.set('s118'),
                0 !== B && c.viewport(0, 0, a.hb, E),
                r.o(),
                v.g(0),
                C.M('u10', 1 / a.hb, 0),
                Y.l(!1, !1),
                v.o(),
                r.g(0),
                C.M('u10', 0, 1 / E),
                Y.l(!1, !1),
                a.Yk && c.colorMask(0 === B, 1 === B, 2 === B, !0),
                C.set('s1'),
                t.o(),
                v.g(0),
                c.viewport(0, B * E, a.hb, E),
                Y.l(!1, !1),
                a.Yk && c.colorMask(!0, !0, !0, !0);
            return (e = !0);
          },
          U: function () {
            I.pi() &&
              (p.bind(!1, !1),
              l.o(),
              c.clearColor(0, 0, 0, 0),
              c.enable(c.DEPTH_TEST),
              c.depthMask(!0),
              c.clear(c.COLOR_BUFFER_BIT | c.DEPTH_BUFFER_BIT),
              C.set('s117'),
              q.g(1),
              t.g(0),
              h.bind(!0),
              h.U(),
              G.bind(!0),
              G.U(),
              c.disable(c.DEPTH_TEST),
              c.depthMask(!1));
          },
          add: function () {
            I.pi() &&
              (c.enable(c.BLEND),
              c.blendFunc(c.ONE, c.ONE_MINUS_SRC_ALPHA),
              l.g(0),
              Y.l(!1, !1),
              c.disable(c.BLEND));
          },
          mg: function (E, B) {
            p = Ba.instance({ width: E, height: B, Fc: !0 });
            l = ca.instance({ width: E, height: B, isFloat: !1, isPot: !1 });
            I.yc();
          },
          $a: function (E, B, m) {
            E || ((E = z), (B = H), (m = x));
            C.j('s117', [
              {
                type: '3f',
                name: 'u141',
                value: [
                  m[0] + f[0],
                  m[1] + f[1] - a.$d[0],
                  m[2] + f[2] + a.$d[1],
                ],
              },
            ]);
            z = E;
            H = B;
            x = m;
            D = !0;
            !e && w && I.yc();
            C.H();
          },
          ab: function (E, B) {
            C.j('s116', [{ type: '1f', name: 'u142', value: E }]);
            C.j('s117', [{ type: '1f', name: 'u142', value: B }]);
            w = !0;
            !e && D && I.yc();
            C.H();
          },
          qg: function (E) {
            C.j('s117', [{ type: '1f', name: 'u77', value: E }]);
            C.H();
          },
          yb: function (E) {
            E && (k = E);
            I.yc();
          },
          rg: function (E, B) {
            A[0].value = 1 - E;
            C.j('s117', A);
            C.j('s117', B);
          },
          L: function () {},
          v: function () {
            e = d = b = !1;
            r = t = n = v = l = q = null;
          },
        };
      return I;
    })();
    za.ra = (function () {
      var a = !1,
        b = null,
        d = 0,
        e = 0,
        q = 0,
        l = [{ type: '1f', name: 'u165', value: 1 }],
        v = null,
        n = null,
        t = null,
        r = {
          Pc: function () {
            C.oa('s119', {
              name: '_',
              s: 'attribute vec3 a0;uniform vec2 u175,u176;varying vec2 vv0;void main(){vec2 a=2.*(a0.xy-u176)/u175;gl_Position=vec4(a,0.,1.),vv0=a0.xy;}',
              h: 'uniform vec2 u177;uniform float u178,u179,u180;varying vec2 vv0;void main(){vec2 b=vec2(sign(vv0.x)*.5*u178,u179),a=vv0-b,c=u180*a,d=(c-a)*u177;gl_FragColor=vec4(d,0.,1.);}',
              i: 'u175 u176 u178 u179 u180 u177'.split(' '),
              I: ['a0'],
              R: [3],
              precision: 'highp',
            });
            C.oa('s120', {
              name: '_',
              s: 'attribute vec3 a0;varying vec2 vv0,vv1;uniform sampler2D u39;uniform vec3 u141;uniform vec2 u40,u175,u176;uniform float u142;const float n=0.,o=0.;const vec2 e=vec2(1.);const vec3 p=vec3(1.);const vec2 F=vec2(-1.,1.),q=vec2(.16,.5),r=vec2(.5,.5),s=vec2(.84,.5);uniform mat4 u74;uniform vec3 u76,u80,u81,u82;uniform float u75,u83,u84,u77,u78,u79,u85;mat3 t(vec3 c){vec3 b=cos(c),a=sin(c);return mat3(b.y*b.z,b.y*a.z,a.y,-a.x*a.y*b.z+b.x*a.z,-a.x*a.y*a.z-b.x*b.z,a.x*b.y,b.x*a.y*b.z+a.x*a.z,b.x*a.y*a.z-a.x*b.z,-b.x*b.y);}void main(){vec4 d=texture2D(u39,q);vec2 f=u83*e;vec3 c=u83*p;vec2 u=mix(d.a*u40,e,f),g=(2.*d.gb-e)*(1.-f);g.x*=-1.;vec3 a=mix(texture2D(u39,r).rgb+vec3(u77,0.,0.),u80,c);float v=mix(texture2D(u39,s).r,0.,u83);a.z+=v;mat3 w=t(a);vec3 x=mix(u141,u81,c);float y=mix(u142,u84,u83);vec3 b=mix(u76,u82,c);b.x+=u75*sin(a.y);float h=cos(a.z),i=sin(a.z);mat2 z=mat2(h,i,-i,h);b.xy=z*b.xy;float A=mix(u79,1.,u83);vec2 j=u78/u;vec3 k=a0;float B=max(0.,-a0.z-n)*o;k.x+=B*sign(a0.x)*(1.-u83);vec3 C=w*(k+x)*y+b;vec2 D=j*A;vec3 E=vec3(g*D,-j)+C*vec3(1.,-1.,-1.);gl_Position=u74*(vec4(u85*e,e)*vec4(E,1.)),gl_Position*=vec4(-1.,1.,1.,1.),vv0=vec2(.5,.5)+(a0.xy-u176)/u175,vv1=vec2(.5,.5)+.5*gl_Position.xy/gl_Position.w;}',
              h: 'uniform sampler2D u181,u182;uniform float u165;varying vec2 vv0,vv1;void main(){vec2 a=u165*texture2D(u181,vv0).rg;gl_FragColor=texture2D(u182,a+vv1);}',
              i: 'u165 u39 u181 u182 u175 u176 u40 u76 u142 u141'
                .split(' ')
                .concat(C.ef(), C.ff()),
              I: ['a0'],
              R: [3],
              precision: 'lowp',
            });
            a = !0;
          },
          m: function (w) {
            if (a) {
              if (void 0 === w.hc || !w.hd) return !1;
              n = ca.instance({
                isFloat: !0,
                isPot: !1,
                isMipmap: !1,
                isLinear: !1,
                width: 256,
                height: 128,
                F: 4,
              });
              t = Ba.instance({ width: 256, height: 128 });
              C.j(
                's120',
                [
                  { type: '1i', name: 'u39', value: 1 },
                  { type: '1i', name: 'u181', value: 2 },
                  { type: '1i', name: 'u182', value: 0 },
                  { type: '3f', name: 'u76', value: w.Ca },
                  { type: '1f', name: 'u165', value: 1 },
                ].concat(w.Fj, w.Kg)
              );
              e = w.Oe;
              q = w.Ne;
              d = w.Pe;
            }
          },
          cc: function (w) {
            b = w;
          },
          bc: function (w) {
            v = w;
            v.Hb(r.Ke);
          },
          Ke: function () {
            c.viewport(0, 0, 256, 128);
            t.o();
            n.o();
            var w = v.Yl(),
              D = v.Zl(),
              z = [
                { type: '2f', name: 'u175', value: [w, D] },
                { type: '2f', name: 'u176', value: [v.Bl(), v.Cl()] },
              ];
            C.j(
              's119',
              z.concat([
                { type: '1f', name: 'u178', value: e },
                { type: '1f', name: 'u179', value: q },
                { type: '1f', name: 'u180', value: d },
                { type: '2f', name: 'u177', value: [1 / w, -1 / D] },
              ])
            );
            v.qh();
            C.j('s120', z);
          },
          U: function () {
            C.set('s120');
            b.g(1);
            n.g(2);
            v.qh();
          },
          $a: function (w) {
            C.j('s120', [{ type: '3f', name: 'u141', value: w }]);
            C.H();
          },
          ab: function (w) {
            C.j('s120', [{ type: '1f', name: 'u142', value: w }]);
            C.H();
          },
          qg: function (w) {
            C.j('s120', [{ type: '1f', name: 'u77', value: w }]);
            C.H();
          },
          co: function (w) {
            d = w;
            r.Ke();
            C.H();
            wa.animate(Date.now());
          },
          yb: function (w) {
            w && (v = w);
            r.Ke();
          },
          rg: function (w, D) {
            l.u165 = 1 - w;
            C.j('s120', l);
            C.j('s120', D);
          },
          L: function () {},
        };
      return r;
    })();
    za.pc = (function () {
      var a = [0, -0.5],
        b = !1,
        d = !1,
        e = null,
        q = null,
        l = null,
        v = null,
        n = null,
        t = -1,
        r = -1;
      return {
        Pc: function () {
          C.oa('s121', {
            name: '_',
            s: 'attribute vec2 a0;uniform sampler2D u39;uniform vec2 u40,u7;uniform float u6;varying vec2 vv0;const vec2 f=vec2(1.,1.);void main(){vec4 a=texture2D(u39,vec2(.25,.5));vec2 b=a.a*u40,c=2.*a.gb-f,d=u7+a0*u6;gl_Position=vec4(c+b*d,0.,1.),vv0=vec2(.5,.5)+.5*a0;}',
            h: 'uniform sampler2D u183;varying vec2 vv0;void main(){gl_FragColor=texture2D(u183,vv0);}',
            i: ['u39', 'u183', 'u40', 'u7', 'u6'],
            precision: 'lowp',
          });
          C.oa('s122', {
            name: '_',
            h: 'uniform sampler2D u2,u184,u185;varying vec2 vv0;const vec3 f=vec3(1.,1.,1.);void main(){float a=texture2D(u2,vv0).r;vec3 b=texture2D(u185,vv0).rgb,c=texture2D(u184,vv0).rgb;gl_FragColor=vec4(mix(b,c,a*f),1.);}',
            i: ['u2', 'u185', 'u184'],
            precision: 'lowp',
          });
          b = !0;
        },
        m: function (w) {
          b &&
            ((n = ca.instance({
              isFloat: !1,
              isPot: !0,
              url: w.Ce,
              J: function () {
                d = !0;
              },
            })),
            C.j('s121', [
              { type: '1i', name: 'u39', value: 1 },
              { type: '1i', name: 'u183', value: 0 },
              { type: '2f', name: 'u40', value: w.Nj },
              { type: '2f', name: 'u7', value: a },
              { type: '1f', name: 'u6', value: 3.8 },
            ]),
            C.j('s122', [
              { type: '1i', name: 'u184', value: 0 },
              { type: '1i', name: 'u2', value: 1 },
              { type: '1i', name: 'u185', value: 2 },
            ]));
        },
        cc: function (w) {
          q = w;
        },
        mg: function (w, D) {
          var z = {
            isFloat: !1,
            isPot: !1,
            isMipmap: !1,
            isLinear: !1,
            width: w,
            height: D,
            F: 4,
          };
          t = 2 / w;
          r = 2 / D;
          l = ca.instance(z);
          v = ca.instance(z);
          e = Ba.instance({ width: w, height: D });
        },
        U: function (w, D) {
          if (d) {
            e.bind(!1, !0);
            C.set('s83');
            for (var z = 0; 2 > z; ++z) {
              C.M('u10', t, 0);
              l.o();
              0 !== z && v.g(0);
              var H = 0 === z && !U.ea;
              Y.l(H, H);
              C.M('u10', 0, r);
              v.o();
              l.g(0);
              Y.l(!1, !1);
            }
            C.set('s121');
            q.g(1);
            n.g(0);
            l.o();
            c.clearColor(1, 0, 0, 1);
            c.clear(c.COLOR_BUFFER_BIT);
            Y.l(!1, !1);
            C.set('s122');
            D.o();
            v.g(0);
            l.g(1);
            w.g(2);
            Y.l(!1, !1);
          }
        },
        L: function () {},
      };
    })();
    var Ec = (function () {
      var a = {
        instance: function (b) {
          var d = b.Qf,
            e = b.Mf,
            q = b.Ac,
            l = b.background ? b.background : ca.Th(),
            v = b.Ja,
            n = { scale: 1, offsetX: 0, offsetY: 0 },
            t = null;
          b.Lf && ((n.scale = b.Lf.scale), (n.offsetY = b.Lf.offsetY));
          return {
            Oh: function () {
              return v;
            },
            Hh: function () {
              return l;
            },
            set: function () {
              t = db.Nl();
              db.kj(n);
              db.ie();
              db.je();
              wa.dj(q, l, !1, !1);
            },
            H: function () {
              db.kj(t);
            },
            ac: function () {
              return {
                modelURL: d,
                materialsURLs: e,
                background: l.ac(!1),
                Ac: q.ac(!1),
                Ja: v.ac(!0),
              };
            },
            $o: function (r) {
              l.g(r);
            },
          };
        },
        Uc: function (b, d, e) {
          function q() {
            if (3 === ++t && d) {
              var r = a.instance({
                Qf: b.modelURL,
                Mf: b.materialsURLs,
                background: l,
                Ac: v,
                Ja: n,
              });
              d(r);
            }
          }
          var l = null,
            v = null,
            n = null,
            t = 0;
          ca.Uc(b.background, function (r) {
            !r && e ? e() : ((l = r), q());
          });
          ca.Uc(b.dataState, function (r) {
            !r && e ? e() : ((v = r), q());
          });
          ca.Uc(b.light, function (r) {
            !r && e ? e() : ((n = r), q());
          });
        },
      };
      return a;
    })();
    return Sa || JEELIZVTO;
  })();
  (function (W, Da) {
    'function' === typeof define && define.amd
      ? define(Da)
      : 'object' === typeof exports
      ? (module.exports = Da())
      : (W.ResizeSensor = Da());
  })('undefined' !== typeof window ? window : this, function () {
    function W(La, Wa) {
      var Ua = Object.prototype.toString.call(La),
        Lb = 0,
        Ja = La.length;
      if (
        '[object Array]' === Ua ||
        '[object NodeList]' === Ua ||
        '[object HTMLCollection]' === Ua ||
        '[object Object]' === Ua ||
        ('undefined' !== typeof jQuery && La instanceof jQuery) ||
        ('undefined' !== typeof Elements && La instanceof Elements)
      )
        for (; Lb < Ja; Lb++) Wa(La[Lb]);
      else Wa(La);
    }
    if ('undefined' === typeof window) return null;
    var Da =
        window.requestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        function (La) {
          return window.setTimeout(La, 20);
        },
      Ka = function (La, Wa) {
        function Ua() {
          var Ja = [];
          this.add = function (vb) {
            Ja.push(vb);
          };
          var bb, qb;
          this.call = function () {
            bb = 0;
            for (qb = Ja.length; bb < qb; bb++) Ja[bb].call();
          };
          this.remove = function (vb) {
            var rb = [];
            bb = 0;
            for (qb = Ja.length; bb < qb; bb++)
              Ja[bb] !== vb && rb.push(Ja[bb]);
            Ja = rb;
          };
          this.length = function () {
            return Ja.length;
          };
        }
        function Lb(Ja, bb) {
          if (Ja)
            if (Ja.resizedAttached) Ja.resizedAttached.add(bb);
            else {
              Ja.resizedAttached = new Ua();
              Ja.resizedAttached.add(bb);
              Ja.resizeSensor = document.createElement('div');
              Ja.resizeSensor.className = 'resize-sensor';
              Ja.resizeSensor.style.cssText =
                'position: absolute; left: 0; top: 0; right: 0; bottom: 0; overflow: hidden; z-index: -1; visibility: hidden;';
              Ja.resizeSensor.innerHTML =
                '<div class="resize-sensor-expand" style="position: absolute; left: 0; top: 0; right: 0; bottom: 0; overflow: hidden; z-index: -1; visibility: hidden;"><div style="position: absolute; left: 0; top: 0; transition: 0s;"></div></div><div class="resize-sensor-shrink" style="position: absolute; left: 0; top: 0; right: 0; bottom: 0; overflow: hidden; z-index: -1; visibility: hidden;"><div style="position: absolute; left: 0; top: 0; transition: 0s; width: 200%; height: 200%"></div></div>';
              Ja.appendChild(Ja.resizeSensor);
              Ja.resizeSensor.offsetParent !== Ja &&
                (Ja.style.position = 'relative');
              var qb = Ja.resizeSensor.childNodes[0],
                vb = qb.childNodes[0],
                rb = Ja.resizeSensor.childNodes[1],
                hc,
                Cb,
                Tb,
                Zb,
                $b = Ja.offsetWidth,
                ac = Ja.offsetHeight,
                bc = function () {
                  vb.style.width = '100000px';
                  vb.style.height = '100000px';
                  qb.scrollLeft = 1e5;
                  qb.scrollTop = 1e5;
                  rb.scrollLeft = 1e5;
                  rb.scrollTop = 1e5;
                };
              bc();
              var ic = function () {
                Cb = 0;
                hc &&
                  (($b = Tb),
                  (ac = Zb),
                  Ja.resizedAttached && Ja.resizedAttached.call());
              };
              bb = function () {
                Tb = Ja.offsetWidth;
                Zb = Ja.offsetHeight;
                (hc = Tb != $b || Zb != ac) && !Cb && (Cb = Da(ic));
                bc();
              };
              var jc = function (cc, Mb, kc) {
                cc.attachEvent
                  ? cc.attachEvent('on' + Mb, kc)
                  : cc.addEventListener(Mb, kc);
              };
              jc(qb, 'scroll', bb);
              jc(rb, 'scroll', bb);
            }
        }
        W(La, function (Ja) {
          Lb(Ja, Wa);
        });
        this.detach = function (Ja) {
          Ka.detach(La, Ja);
        };
      };
    Ka.detach = function (La, Wa) {
      W(La, function (Ua) {
        if (Ua) {
          if (
            Ua.resizedAttached &&
            'function' == typeof Wa &&
            (Ua.resizedAttached.remove(Wa), Ua.resizedAttached.length())
          )
            return;
          Ua.resizeSensor &&
            (Ua.contains(Ua.resizeSensor) && Ua.removeChild(Ua.resizeSensor),
            delete Ua.resizeSensor,
            delete Ua.resizedAttached);
        }
      });
    };
    return Ka;
  });
  var gc = {
      glassesDBURL: 'https://glassesdbcached.jeeliz.com/sku/',
      appstaticURL: 'https://appstatic.jeeliz.com/',
    },
    kb = { notLoaded: -1, init: 0, realtime: 2, loadingModel: 3, paused: 4 },
    Oa = {
      isRT: !0,
      sku: void 0,
      materialsReplacements: '',
      mode: kb.notLoaded,
    },
    fb = { displayWidth: -1, displayHeight: -1, cvWidth: -1, cvHeight: -1 },
    Tc = {
      cv: null,
      container: null,
      adjust: null,
      adjustNotice: null,
      adjustExit: null,
      loading: null,
      trackIframe: null,
    },
    xa = Object.assign({}, Tc),
    sd = {
      ADJUST_START: null,
      ADJUST_END: null,
      LOADING_START: null,
      LOADING_END: null,
    },
    Bc = null,
    Sb = { enabled: !1, callback: null, interval: 1e3 },
    sc = { error: !1 },
    fc = null,
    Yb = null,
    ub = {
      start: function (W) {
        console.log('INFO in JeelizVTOWidget.js: start()');
        if (Oa.mode !== kb.notLoaded) ub.resume();
        else {
          va();
          if (W.settings) for (var Da in W.settings) gc[Da] = W.settings[Da];
          W.NNCPath && Sa.set_NNCPath(W.NNCPath);
          W.faceDetectionCallback &&
            ((Sb.enabled = !0),
            (Sb.callback = W.faceDetectionCallback),
            (Sb.interval =
              'undefined' === typeof W.faceDetectionInterval
                ? 1e3
                : W.faceDetectionInterval));
          Bc = Object.assign({}, sd, W.callbacks || {});
          xa.container =
            W.placeHolder || document.getElementById('JeelizVTOWidget');
          if (!xa.container)
            throw Error(
              'Cannot find a <div> element with id=JeelizVTOWidget to append the VTO widget.'
            );
          xa.cv = W.canvas || document.getElementById('JeelizVTOWidgetCanvas');
          xa.cv ||
            ((xa.cv = document.createElement('canvas')),
            xa.container.appendChild(xa.cv));
          xa.loading = document.getElementById('JeelizVTOWidgetLoading');
          W.onError && (sc.error = W.onError);
          Bb();
          if (!Ab(xa.container))
            return Promise.reject('PLACEHOLDER_NULL_WIDTH');
          if (!pa(xa.container))
            return Promise.reject('PLACEHOLDER_NULL_HEIGHT');
          jb();
          new ResizeSensor(xa.container, function (La) {
            jb();
          });
          (W.searchImageMask ||
            W.searchImageColor ||
            W.searchImageRotationSpeed) &&
            Sa.set_loading(
              W.searchImageMask,
              W.searchImageColor,
              W.searchImageRotationSpeed
            );
          W.callbackReady && (Yb = W.callbackReady);
          Oa.mode = kb.init;
          var Ka =
            'undefined' === typeof W.assetsPath
              ? gc.appstaticURL + 'jeefit/'
              : W.assetsPath;
          'undefined' !== typeof W.catalog && (fc = W.catalog);
          if (W.onWebcamGet) Sa.onWebcamGet(W.onWebcamGet);
          return new Promise(function (La, Wa) {
            Sa.init(
              Ka,
              qa,
              function () {
                Oa.isRT = !1;
                $a('NO_ERROR_LABEL');
                Wa();
              },
              xa.cv
            );
            var Ua = W.sku ? W.sku : null;
            Sa.onHalfLoad(function () {
              !1 === W.isShadow && Sa.switch_shadow(!1);
              ub.load(Ua, La, W.materialsReplacements);
            });
          });
        }
      },
      destroy: function () {
        return Sa.destroy().then(function () {
          Oa.mode = kb.notLoaded;
          Oa.sku = void 0;
          Oa.materialsReplacements = '';
          Yb = fc = null;
          Object.assign(xa, Tc);
        });
      },
      pause: function (W) {
        if (!Oa.isRT) return Promise.reject();
        Oa.mode = kb.paused;
        var Da = Sa.switch_sleep(!0, W);
        return W ? Da : Promise.resolve(Da);
      },
      resume: function (W) {
        if (!Oa.isRT) return Promise.reject();
        Oa.mode = kb.realtime;
        var Da = Sa.switch_sleep(!1, W);
        return W ? Da : Promise.resolve(Da);
      },
      set_videoRotation: function (W) {
        Oa.isRT && Sa.set_videoRotation(W);
      },
      set_videoSizes: function (W, Da, Ka, La, Wa, Ua) {
        Oa.isRT && Sa.set_videoSizes(W, Da, Ka, La, Wa, Ua);
      },
      resize: function () {
        jb();
      },
      set_scale: function (W) {
        Sa.set_scale(W);
      },
      capture_image: function (W, Da, Ka) {
        Sa && Sa.ready ? Sa.capture_image(W, Da, Ka, !1) : Da(!1);
      },
      toggle_loading: function (W) {
        W
          ? (Fa(xa.loading), Kb('LOADING_START'))
          : (Qa(xa.loading), Kb('LOADING_END'));
      },
      load_modelStandalone: function (W, Da) {
        if (!Oa.isRT)
          throw Error('Loading standalone models is only available in RT mode');
        Oa.mode === kb.paused && ub.resume();
        Oa.mode = kb.loadingModel;
        var Ka = 'undef';
        'string' === typeof W
          ? ((Ka = W),
            Ga(W)
              .then(function (La) {
                Sa.set_modelStandalone(La, Da, Ka);
              })
              .catch(Na))
          : ((Ka = 'RANDOM_SKU_' + Date.now().toString()),
            Sa.set_modelStandalone(W, Da, Ka));
        Oa.sku = Ka;
        Oa.materialsReplacements = '';
      },
      load: function (W, Da, Ka) {
        ub.toggle_loading(!0);
        Oa.isRT && ub.load_RT(W, Da, Ka);
      },
      load_RT: function (W, Da, Ka) {
        var La = Ka ? JSON.stringify(Ka) : '';
        W === Oa.sku && La === Oa.materialsReplacements
          ? ub.toggle_loading(!1)
          : ((Oa.sku = W),
            (Oa.materialsReplacements = La),
            (Oa.mode = kb.loadingModel),
            Oa.mode === kb.paused && ub.resume(),
            W
              ? fc && fc[W]
                ? Qb(W, fc[W], Da, Ka)
                : Ga(gc.glassesDBURL + W)
                    .then(function (Wa) {
                      if (Wa.error) return Na();
                      Qb(W, Wa.intrinsic, Da, Ka);
                    })
                    .catch(Na)
              : ((Oa.mode = kb.realtime),
                ub.toggle_loading(!1),
                Sa.start_rendering(),
                Da && Da()));
      },
      enter_adjustMode: Rb,
      exit_adjustMode: ob,
      set_LUT: function (W) {
        return Sa && Sa.ready
          ? Sa.set_LUT(W || null)
          : Promise.reject('NOT_READY');
      },
    };
  return ub;
})();
JEELIZVTO = JEELIZVTO;
JEELIZVTOWIDGET = {
  VERSION: '2.4.0',
  start: JeelizVTOWidget.start,
  pause: JeelizVTOWidget.pause,
  resume: JeelizVTOWidget.resume,
  load: JeelizVTOWidget.load,
  load_modelStandalone: JeelizVTOWidget.load_modelStandalone,
  capture_image: JeelizVTOWidget.capture_image,
  set_videoRotation: JeelizVTOWidget.set_videoRotation,
  resize: JeelizVTOWidget.resize,
  set_scale: JeelizVTOWidget.set_scale,
  set_videoSizes: JeelizVTOWidget.set_videoSizes,
  destroy: JeelizVTOWidget.destroy,
  enter_adjustMode: JeelizVTOWidget.enter_adjustMode,
  exit_adjustMode: JeelizVTOWidget.exit_adjustMode,
  set_LUT: JeelizVTOWidget.set_LUT,
};

export { JEELIZVTO, JEELIZVTOWIDGET };
/* eslint-enable */
