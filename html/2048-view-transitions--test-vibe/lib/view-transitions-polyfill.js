/**
 * View Transitions API polyfill 1.0.6
 * ISC License (text on website)
 *
 * Copyright (c) 2024 Marco Pizzorusso <demarketed@gmail.com>
 * https://github.com/demarketed/view-transitions-polyfill
 */
class ui extends HTMLElement {
  constructor() {
    super(), this.live = !1, this.style.display = "block", this.clone = document.createElement("canvas"), this.clone.style.width = "100%", this.clone.style.height = "100%", this.appendChild(this.clone);
    const t = this.clone.getContext("2d");
    if (!t)
      throw new Error("Canvas context 2D is unsupported");
    this.ctx = t;
  }
  setup(t, n) {
    this.element = t, n && (this.live = n), this.element instanceof HTMLVideoElement ? (this.clone.width = this.element.videoWidth, this.clone.height = this.element.videoHeight) : this.element instanceof HTMLCanvasElement && (this.clone.width = this.element.width, this.clone.height = this.element.height);
  }
  connectedCallback() {
    this.live ? this.drawLive() : this.draw();
  }
  disconnectedCallback() {
    this.nextAnimationFrame && cancelAnimationFrame(this.nextAnimationFrame);
  }
  drawLive() {
    if (this) {
      if (!this.element || !document.documentElement.contains(this.element)) {
        this.nextAnimationFrame && cancelAnimationFrame(this.nextAnimationFrame);
        return;
      }
      this.ctx.drawImage(this.element, 0, 0), this.nextAnimationFrame = requestAnimationFrame(
        () => this.drawLive.call(this)
      );
    }
  }
  draw() {
    if (this.element)
      return this.ctx.drawImage(this.element, 0, 0);
  }
}
customElements.define("view-transition-media", ui);
const xe = 0, b = 1, C = 2, D = 3, I = 4, he = 5, Pt = 6, U = 7, X = 8, A = 9, v = 10, N = 11, T = 12, j = 13, nt = 14, J = 15, G = 16, K = 17, Z = 18, te = 19, ue = 20, $ = 21, x = 22, H = 23, ie = 24, q = 25, os = 0;
function V(e) {
  return e >= 48 && e <= 57;
}
function ve(e) {
  return V(e) || // 0 .. 9
  e >= 65 && e <= 70 || // A .. F
  e >= 97 && e <= 102;
}
function On(e) {
  return e >= 65 && e <= 90;
}
function ss(e) {
  return e >= 97 && e <= 122;
}
function as(e) {
  return On(e) || ss(e);
}
function ls(e) {
  return e >= 128;
}
function wt(e) {
  return as(e) || ls(e) || e === 95;
}
function hi(e) {
  return wt(e) || V(e) || e === 45;
}
function cs(e) {
  return e >= 0 && e <= 8 || e === 11 || e >= 14 && e <= 31 || e === 127;
}
function xt(e) {
  return e === 10 || e === 13 || e === 12;
}
function $e(e) {
  return xt(e) || e === 32 || e === 9;
}
function fe(e, t) {
  return !(e !== 92 || xt(t) || t === os);
}
function mt(e, t, n) {
  return e === 45 ? wt(t) || t === 45 || fe(t, n) : wt(e) ? !0 : e === 92 ? fe(e, t) : !1;
}
function Rt(e, t, n) {
  return e === 43 || e === 45 ? V(t) ? 2 : t === 46 && V(n) ? 3 : 0 : e === 46 ? V(t) ? 2 : 0 : V(e) ? 1 : 0;
}
function pi(e) {
  return e === 65279 || e === 65534 ? 1 : 0;
}
const un = new Array(128), us = 128, ft = 130, di = 131, Ln = 132, mi = 133;
for (let e = 0; e < un.length; e++)
  un[e] = $e(e) && ft || V(e) && di || wt(e) && Ln || cs(e) && mi || e || us;
function Bt(e) {
  return e < 128 ? un[e] : Ln;
}
function ze(e, t) {
  return t < e.length ? e.charCodeAt(t) : 0;
}
function hn(e, t, n) {
  return n === 13 && ze(e, t + 1) === 10 ? 2 : 1;
}
function Me(e, t, n) {
  let r = e.charCodeAt(t);
  return On(r) && (r = r | 32), r === n;
}
function Ze(e, t, n, r) {
  if (n - t !== r.length || t < 0 || n > e.length)
    return !1;
  for (let i = t; i < n; i++) {
    const o = r.charCodeAt(i - t);
    let s = e.charCodeAt(i);
    if (On(s) && (s = s | 32), s !== o)
      return !1;
  }
  return !0;
}
function hs(e, t) {
  for (; t >= 0 && $e(e.charCodeAt(t)); t--)
    ;
  return t + 1;
}
function ot(e, t) {
  for (; t < e.length && $e(e.charCodeAt(t)); t++)
    ;
  return t;
}
function Ht(e, t) {
  for (; t < e.length && V(e.charCodeAt(t)); t++)
    ;
  return t;
}
function Ne(e, t) {
  if (t += 2, ve(ze(e, t - 1))) {
    for (const r = Math.min(e.length, t + 5); t < r && ve(ze(e, t)); t++)
      ;
    const n = ze(e, t);
    $e(n) && (t += hn(e, t, n));
  }
  return t;
}
function st(e, t) {
  for (; t < e.length; t++) {
    const n = e.charCodeAt(t);
    if (!hi(n)) {
      if (fe(n, ze(e, t + 1))) {
        t = Ne(e, t) - 1;
        continue;
      }
      break;
    }
  }
  return t;
}
function _t(e, t) {
  let n = e.charCodeAt(t);
  if ((n === 43 || n === 45) && (n = e.charCodeAt(t += 1)), V(n) && (t = Ht(e, t + 1), n = e.charCodeAt(t)), n === 46 && V(e.charCodeAt(t + 1)) && (t += 2, t = Ht(e, t)), Me(
    e,
    t,
    101
    /* e */
  )) {
    let r = 0;
    n = e.charCodeAt(t + 1), (n === 45 || n === 43) && (r = 1, n = e.charCodeAt(t + 2)), V(n) && (t = Ht(e, t + 1 + r + 1));
  }
  return t;
}
function Vt(e, t) {
  for (; t < e.length; t++) {
    const n = e.charCodeAt(t);
    if (n === 41) {
      t++;
      break;
    }
    fe(n, ze(e, t + 1)) && (t = Ne(e, t));
  }
  return t;
}
function fi(e) {
  if (e.length === 1 && !ve(e.charCodeAt(0)))
    return e[0];
  let t = parseInt(e, 16);
  return (t === 0 || // If this number is zero,
  t >= 55296 && t <= 57343 || // or is for a surrogate,
  t > 1114111) && (t = 65533), String.fromCodePoint(t);
}
const gi = [
  "EOF-token",
  "ident-token",
  "function-token",
  "at-keyword-token",
  "hash-token",
  "string-token",
  "bad-string-token",
  "url-token",
  "bad-url-token",
  "delim-token",
  "number-token",
  "percentage-token",
  "dimension-token",
  "whitespace-token",
  "CDO-token",
  "CDC-token",
  "colon-token",
  "semicolon-token",
  "comma-token",
  "[-token",
  "]-token",
  "(-token",
  ")-token",
  "{-token",
  "}-token",
  "comment-token"
], ps = 16 * 1024;
function vt(e = null, t) {
  return e === null || e.length < t ? new Uint32Array(Math.max(t + 1024, ps)) : e;
}
const tr = 10, ds = 12, nr = 13;
function rr(e) {
  const t = e.source, n = t.length, r = t.length > 0 ? pi(t.charCodeAt(0)) : 0, i = vt(e.lines, n), o = vt(e.columns, n);
  let s = e.startLine, c = e.startColumn;
  for (let l = r; l < n; l++) {
    const a = t.charCodeAt(l);
    i[l] = s, o[l] = c++, (a === tr || a === nr || a === ds) && (a === nr && l + 1 < n && t.charCodeAt(l + 1) === tr && (l++, i[l] = s, o[l] = c), s++, c = 1);
  }
  i[n] = s, o[n] = c, e.lines = i, e.columns = o, e.computed = !0;
}
class ms {
  constructor() {
    this.lines = null, this.columns = null, this.computed = !1;
  }
  setSource(t, n = 0, r = 1, i = 1) {
    this.source = t, this.startOffset = n, this.startLine = r, this.startColumn = i, this.computed = !1;
  }
  getLocation(t, n) {
    return this.computed || rr(this), {
      source: n,
      offset: this.startOffset + t,
      line: this.lines[t],
      column: this.columns[t]
    };
  }
  getLocationRange(t, n, r) {
    return this.computed || rr(this), {
      source: r,
      start: {
        offset: this.startOffset + t,
        line: this.lines[t],
        column: this.columns[t]
      },
      end: {
        offset: this.startOffset + n,
        line: this.lines[n],
        column: this.columns[n]
      }
    };
  }
}
const ne = 16777215, pe = 24, fs = /* @__PURE__ */ new Map([
  [C, x],
  [$, x],
  [te, ue],
  [H, ie]
]);
class gs {
  constructor(t, n) {
    this.setSource(t, n);
  }
  reset() {
    this.eof = !1, this.tokenIndex = -1, this.tokenType = 0, this.tokenStart = this.firstCharOffset, this.tokenEnd = this.firstCharOffset;
  }
  setSource(t = "", n = () => {
  }) {
    t = String(t || "");
    const r = t.length, i = vt(this.offsetAndType, t.length + 1), o = vt(this.balance, t.length + 1);
    let s = 0, c = 0, l = 0, a = -1;
    for (this.offsetAndType = null, this.balance = null, n(t, (u, p, m) => {
      switch (u) {
        default:
          o[s] = r;
          break;
        case c: {
          let g = l & ne;
          for (l = o[g], c = l >> pe, o[s] = g, o[g++] = s; g < s; g++)
            o[g] === r && (o[g] = s);
          break;
        }
        case $:
        case C:
        case te:
        case H:
          o[s] = l, c = fs.get(u), l = c << pe | s;
          break;
      }
      i[s++] = u << pe | m, a === -1 && (a = p);
    }), i[s] = xe << pe | r, o[s] = r, o[r] = r; l !== 0; ) {
      const u = l & ne;
      l = o[u], o[u] = r;
    }
    this.source = t, this.firstCharOffset = a === -1 ? 0 : a, this.tokenCount = s, this.offsetAndType = i, this.balance = o, this.reset(), this.next();
  }
  lookupType(t) {
    return t += this.tokenIndex, t < this.tokenCount ? this.offsetAndType[t] >> pe : xe;
  }
  lookupTypeNonSC(t) {
    for (let n = this.tokenIndex; n < this.tokenCount; n++) {
      const r = this.offsetAndType[n] >> pe;
      if (r !== j && r !== q && t-- === 0)
        return r;
    }
    return xe;
  }
  lookupOffset(t) {
    return t += this.tokenIndex, t < this.tokenCount ? this.offsetAndType[t - 1] & ne : this.source.length;
  }
  lookupOffsetNonSC(t) {
    for (let n = this.tokenIndex; n < this.tokenCount; n++) {
      const r = this.offsetAndType[n] >> pe;
      if (r !== j && r !== q && t-- === 0)
        return n - this.tokenIndex;
    }
    return xe;
  }
  lookupValue(t, n) {
    return t += this.tokenIndex, t < this.tokenCount ? Ze(
      this.source,
      this.offsetAndType[t - 1] & ne,
      this.offsetAndType[t] & ne,
      n
    ) : !1;
  }
  getTokenStart(t) {
    return t === this.tokenIndex ? this.tokenStart : t > 0 ? t < this.tokenCount ? this.offsetAndType[t - 1] & ne : this.offsetAndType[this.tokenCount] & ne : this.firstCharOffset;
  }
  substrToCursor(t) {
    return this.source.substring(t, this.tokenStart);
  }
  isBalanceEdge(t) {
    return this.balance[this.tokenIndex] < t;
  }
  isDelim(t, n) {
    return n ? this.lookupType(n) === A && this.source.charCodeAt(this.lookupOffset(n)) === t : this.tokenType === A && this.source.charCodeAt(this.tokenStart) === t;
  }
  skip(t) {
    let n = this.tokenIndex + t;
    n < this.tokenCount ? (this.tokenIndex = n, this.tokenStart = this.offsetAndType[n - 1] & ne, n = this.offsetAndType[n], this.tokenType = n >> pe, this.tokenEnd = n & ne) : (this.tokenIndex = this.tokenCount, this.next());
  }
  next() {
    let t = this.tokenIndex + 1;
    t < this.tokenCount ? (this.tokenIndex = t, this.tokenStart = this.tokenEnd, t = this.offsetAndType[t], this.tokenType = t >> pe, this.tokenEnd = t & ne) : (this.eof = !0, this.tokenIndex = this.tokenCount, this.tokenType = xe, this.tokenStart = this.tokenEnd = this.source.length);
  }
  skipSC() {
    for (; this.tokenType === j || this.tokenType === q; )
      this.next();
  }
  skipUntilBalanced(t, n) {
    let r = t, i, o;
    e:
      for (; r < this.tokenCount; r++) {
        if (i = this.balance[r], i < t)
          break e;
        switch (o = r > 0 ? this.offsetAndType[r - 1] & ne : this.firstCharOffset, n(this.source.charCodeAt(o))) {
          case 1:
            break e;
          case 2:
            r++;
            break e;
          default:
            this.balance[i] === r && (r = i);
        }
      }
    this.skip(r - this.tokenIndex);
  }
  forEachToken(t) {
    for (let n = 0, r = this.firstCharOffset; n < this.tokenCount; n++) {
      const i = r, o = this.offsetAndType[n], s = o & ne, c = o >> pe;
      r = s, t(c, i, s, n);
    }
  }
  dump() {
    const t = new Array(this.tokenCount);
    return this.forEachToken((n, r, i, o) => {
      t[o] = {
        idx: o,
        type: gi[n],
        chunk: this.source.substring(r, i),
        balance: this.balance[o]
      };
    }), t;
  }
}
function It(e, t) {
  function n(p) {
    return p < c ? e.charCodeAt(p) : 0;
  }
  function r() {
    if (a = _t(e, a), mt(n(a), n(a + 1), n(a + 2))) {
      u = T, a = st(e, a);
      return;
    }
    if (n(a) === 37) {
      u = N, a++;
      return;
    }
    u = v;
  }
  function i() {
    const p = a;
    if (a = st(e, a), Ze(e, p, a, "url") && n(a) === 40) {
      if (a = ot(e, a + 1), n(a) === 34 || n(a) === 39) {
        u = C, a = p + 4;
        return;
      }
      s();
      return;
    }
    if (n(a) === 40) {
      u = C, a++;
      return;
    }
    u = b;
  }
  function o(p) {
    for (p || (p = n(a++)), u = he; a < e.length; a++) {
      const m = e.charCodeAt(a);
      switch (Bt(m)) {
        case p:
          a++;
          return;
        case ft:
          if (xt(m)) {
            a += hn(e, a, m), u = Pt;
            return;
          }
          break;
        case 92:
          if (a === e.length - 1)
            break;
          const g = n(a + 1);
          xt(g) ? a += hn(e, a + 1, g) : fe(m, g) && (a = Ne(e, a) - 1);
          break;
      }
    }
  }
  function s() {
    for (u = U, a = ot(e, a); a < e.length; a++) {
      const p = e.charCodeAt(a);
      switch (Bt(p)) {
        case 41:
          a++;
          return;
        case ft:
          if (a = ot(e, a), n(a) === 41 || a >= e.length) {
            a < e.length && a++;
            return;
          }
          a = Vt(e, a), u = X;
          return;
        case 34:
        case 39:
        case 40:
        case mi:
          a = Vt(e, a), u = X;
          return;
        case 92:
          if (fe(p, n(a + 1))) {
            a = Ne(e, a) - 1;
            break;
          }
          a = Vt(e, a), u = X;
          return;
      }
    }
  }
  e = String(e || "");
  const c = e.length;
  let l = pi(n(0)), a = l, u;
  for (; a < c; ) {
    const p = e.charCodeAt(a);
    switch (Bt(p)) {
      case ft:
        u = j, a = ot(e, a + 1);
        break;
      case 34:
        o();
        break;
      case 35:
        hi(n(a + 1)) || fe(n(a + 1), n(a + 2)) ? (u = I, a = st(e, a + 1)) : (u = A, a++);
        break;
      case 39:
        o();
        break;
      case 40:
        u = $, a++;
        break;
      case 41:
        u = x, a++;
        break;
      case 43:
        Rt(p, n(a + 1), n(a + 2)) ? r() : (u = A, a++);
        break;
      case 44:
        u = Z, a++;
        break;
      case 45:
        Rt(p, n(a + 1), n(a + 2)) ? r() : n(a + 1) === 45 && n(a + 2) === 62 ? (u = J, a = a + 3) : mt(p, n(a + 1), n(a + 2)) ? i() : (u = A, a++);
        break;
      case 46:
        Rt(p, n(a + 1), n(a + 2)) ? r() : (u = A, a++);
        break;
      case 47:
        n(a + 1) === 42 ? (u = q, a = e.indexOf("*/", a + 2), a = a === -1 ? e.length : a + 2) : (u = A, a++);
        break;
      case 58:
        u = G, a++;
        break;
      case 59:
        u = K, a++;
        break;
      case 60:
        n(a + 1) === 33 && n(a + 2) === 45 && n(a + 3) === 45 ? (u = nt, a = a + 4) : (u = A, a++);
        break;
      case 64:
        mt(n(a + 1), n(a + 2), n(a + 3)) ? (u = D, a = st(e, a + 1)) : (u = A, a++);
        break;
      case 91:
        u = te, a++;
        break;
      case 92:
        fe(p, n(a + 1)) ? i() : (u = A, a++);
        break;
      case 93:
        u = ue, a++;
        break;
      case 123:
        u = H, a++;
        break;
      case 125:
        u = ie, a++;
        break;
      case di:
        r();
        break;
      case Ln:
        i();
        break;
      default:
        u = A, a++;
    }
    t(u, l, l = a);
  }
}
let Oe = null;
class B {
  static createItem(t) {
    return {
      prev: null,
      next: null,
      data: t
    };
  }
  constructor() {
    this.head = null, this.tail = null, this.cursor = null;
  }
  createItem(t) {
    return B.createItem(t);
  }
  // cursor helpers
  allocateCursor(t, n) {
    let r;
    return Oe !== null ? (r = Oe, Oe = Oe.cursor, r.prev = t, r.next = n, r.cursor = this.cursor) : r = {
      prev: t,
      next: n,
      cursor: this.cursor
    }, this.cursor = r, r;
  }
  releaseCursor() {
    const { cursor: t } = this;
    this.cursor = t.cursor, t.prev = null, t.next = null, t.cursor = Oe, Oe = t;
  }
  updateCursors(t, n, r, i) {
    let { cursor: o } = this;
    for (; o !== null; )
      o.prev === t && (o.prev = n), o.next === r && (o.next = i), o = o.cursor;
  }
  *[Symbol.iterator]() {
    for (let t = this.head; t !== null; t = t.next)
      yield t.data;
  }
  // getters
  get size() {
    let t = 0;
    for (let n = this.head; n !== null; n = n.next)
      t++;
    return t;
  }
  get isEmpty() {
    return this.head === null;
  }
  get first() {
    return this.head && this.head.data;
  }
  get last() {
    return this.tail && this.tail.data;
  }
  // convertors
  fromArray(t) {
    let n = null;
    this.head = null;
    for (let r of t) {
      const i = B.createItem(r);
      n !== null ? n.next = i : this.head = i, i.prev = n, n = i;
    }
    return this.tail = n, this;
  }
  toArray() {
    return [...this];
  }
  toJSON() {
    return [...this];
  }
  // array-like methods
  forEach(t, n = this) {
    const r = this.allocateCursor(null, this.head);
    for (; r.next !== null; ) {
      const i = r.next;
      r.next = i.next, t.call(n, i.data, i, this);
    }
    this.releaseCursor();
  }
  forEachRight(t, n = this) {
    const r = this.allocateCursor(this.tail, null);
    for (; r.prev !== null; ) {
      const i = r.prev;
      r.prev = i.prev, t.call(n, i.data, i, this);
    }
    this.releaseCursor();
  }
  reduce(t, n, r = this) {
    let i = this.allocateCursor(null, this.head), o = n, s;
    for (; i.next !== null; )
      s = i.next, i.next = s.next, o = t.call(r, o, s.data, s, this);
    return this.releaseCursor(), o;
  }
  reduceRight(t, n, r = this) {
    let i = this.allocateCursor(this.tail, null), o = n, s;
    for (; i.prev !== null; )
      s = i.prev, i.prev = s.prev, o = t.call(r, o, s.data, s, this);
    return this.releaseCursor(), o;
  }
  some(t, n = this) {
    for (let r = this.head; r !== null; r = r.next)
      if (t.call(n, r.data, r, this))
        return !0;
    return !1;
  }
  map(t, n = this) {
    const r = new B();
    for (let i = this.head; i !== null; i = i.next)
      r.appendData(t.call(n, i.data, i, this));
    return r;
  }
  filter(t, n = this) {
    const r = new B();
    for (let i = this.head; i !== null; i = i.next)
      t.call(n, i.data, i, this) && r.appendData(i.data);
    return r;
  }
  nextUntil(t, n, r = this) {
    if (t === null)
      return;
    const i = this.allocateCursor(null, t);
    for (; i.next !== null; ) {
      const o = i.next;
      if (i.next = o.next, n.call(r, o.data, o, this))
        break;
    }
    this.releaseCursor();
  }
  prevUntil(t, n, r = this) {
    if (t === null)
      return;
    const i = this.allocateCursor(t, null);
    for (; i.prev !== null; ) {
      const o = i.prev;
      if (i.prev = o.prev, n.call(r, o.data, o, this))
        break;
    }
    this.releaseCursor();
  }
  // mutation
  clear() {
    this.head = null, this.tail = null;
  }
  copy() {
    const t = new B();
    for (let n of this)
      t.appendData(n);
    return t;
  }
  prepend(t) {
    return this.updateCursors(null, t, this.head, t), this.head !== null ? (this.head.prev = t, t.next = this.head) : this.tail = t, this.head = t, this;
  }
  prependData(t) {
    return this.prepend(B.createItem(t));
  }
  append(t) {
    return this.insert(t);
  }
  appendData(t) {
    return this.insert(B.createItem(t));
  }
  insert(t, n = null) {
    if (n !== null)
      if (this.updateCursors(n.prev, t, n, t), n.prev === null) {
        if (this.head !== n)
          throw new Error("before doesn't belong to list");
        this.head = t, n.prev = t, t.next = n, this.updateCursors(null, t);
      } else
        n.prev.next = t, t.prev = n.prev, n.prev = t, t.next = n;
    else
      this.updateCursors(this.tail, t, null, t), this.tail !== null ? (this.tail.next = t, t.prev = this.tail) : this.head = t, this.tail = t;
    return this;
  }
  insertData(t, n) {
    return this.insert(B.createItem(t), n);
  }
  remove(t) {
    if (this.updateCursors(t, t.prev, t, t.next), t.prev !== null)
      t.prev.next = t.next;
    else {
      if (this.head !== t)
        throw new Error("item doesn't belong to list");
      this.head = t.next;
    }
    if (t.next !== null)
      t.next.prev = t.prev;
    else {
      if (this.tail !== t)
        throw new Error("item doesn't belong to list");
      this.tail = t.prev;
    }
    return t.prev = null, t.next = null, t;
  }
  push(t) {
    this.insert(B.createItem(t));
  }
  pop() {
    return this.tail !== null ? this.remove(this.tail) : null;
  }
  unshift(t) {
    this.prepend(B.createItem(t));
  }
  shift() {
    return this.head !== null ? this.remove(this.head) : null;
  }
  prependList(t) {
    return this.insertList(t, this.head);
  }
  appendList(t) {
    return this.insertList(t);
  }
  insertList(t, n) {
    return t.head === null ? this : (n != null ? (this.updateCursors(n.prev, t.tail, n, t.head), n.prev !== null ? (n.prev.next = t.head, t.head.prev = n.prev) : this.head = t.head, n.prev = t.tail, t.tail.next = n) : (this.updateCursors(this.tail, t.tail, null, t.head), this.tail !== null ? (this.tail.next = t.head, t.head.prev = this.tail) : this.head = t.head, this.tail = t.tail), t.head = null, t.tail = null, this);
  }
  replace(t, n) {
    "head" in n ? this.insertList(n, t) : this.insert(n, t), this.remove(t);
  }
}
function zt(e, t) {
  const n = Object.create(SyntaxError.prototype), r = new Error();
  return Object.assign(n, {
    name: e,
    message: t,
    get stack() {
      return (r.stack || "").replace(/^(.+\n){1,3}/, `${e}: ${t}
`);
    }
  });
}
const qt = 100, ir = 60, or = "    ";
function sr({ source: e, line: t, column: n, baseLine: r, baseColumn: i }, o) {
  function s(w, M) {
    return a.slice(w, M).map(
      (L, E) => String(w + E + 1).padStart(m) + " |" + L
    ).join(`
`);
  }
  const c = `
`.repeat(Math.max(r - 1, 0)), l = " ".repeat(Math.max(i - 1, 0)), a = (c + l + e).split(/\r\n?|\n|\f/), u = Math.max(1, t - o) - 1, p = Math.min(t + o, a.length + 1), m = Math.max(4, String(p).length) + 1;
  let g = 0;
  n += (or.length - 1) * (a[t - 1].substr(0, n - 1).match(/\t/g) || []).length, n > qt && (g = n - ir + 3, n = ir - 2);
  for (let w = u; w <= p; w++)
    w >= 0 && w < a.length && (a[w] = a[w].replace(/\t/g, or), a[w] = (g > 0 && a[w].length > g ? "…" : "") + a[w].substr(g, qt - 2) + (a[w].length > g + qt - 1 ? "…" : ""));
  return [
    s(u, t),
    new Array(n + m + 2).join("-") + "^",
    s(t, p)
  ].filter(Boolean).join(`
`).replace(/^(\s+\d+\s+\|\n)+/, "").replace(/\n(\s+\d+\s+\|)+$/, "");
}
function ar(e, t, n, r, i, o = 1, s = 1) {
  return Object.assign(zt("SyntaxError", e), {
    source: t,
    offset: n,
    line: r,
    column: i,
    sourceFragment(l) {
      return sr({ source: t, line: r, column: i, baseLine: o, baseColumn: s }, isNaN(l) ? 0 : l);
    },
    get formattedMessage() {
      return `Parse error: ${e}
` + sr({ source: t, line: r, column: i, baseLine: o, baseColumn: s }, 2);
    }
  });
}
function bs(e) {
  const t = this.createList();
  let n = !1;
  const r = {
    recognizer: e
  };
  for (; !this.eof; ) {
    switch (this.tokenType) {
      case q:
        this.next();
        continue;
      case j:
        n = !0, this.next();
        continue;
    }
    let i = e.getNode.call(this, r);
    if (i === void 0)
      break;
    n && (e.onWhiteSpace && e.onWhiteSpace.call(this, i, t, r), n = !1), t.push(i);
  }
  return n && e.onWhiteSpace && e.onWhiteSpace.call(this, null, t, r), t;
}
const lr = () => {
}, ys = 33, ks = 35, Wt = 59, cr = 123, ur = 0;
function ws(e) {
  return function() {
    return this[e]();
  };
}
function Ut(e) {
  const t = /* @__PURE__ */ Object.create(null);
  for (const n of Object.keys(e)) {
    const r = e[n], i = r.parse || r;
    i && (t[n] = i);
  }
  return t;
}
function xs(e) {
  const t = {
    context: /* @__PURE__ */ Object.create(null),
    features: Object.assign(/* @__PURE__ */ Object.create(null), e.features),
    scope: Object.assign(/* @__PURE__ */ Object.create(null), e.scope),
    atrule: Ut(e.atrule),
    pseudo: Ut(e.pseudo),
    node: Ut(e.node)
  };
  for (const [n, r] of Object.entries(e.parseContext))
    switch (typeof r) {
      case "function":
        t.context[n] = r;
        break;
      case "string":
        t.context[n] = ws(r);
        break;
    }
  return {
    config: t,
    ...t,
    ...t.node
  };
}
function vs(e) {
  let t = "", n = "<unknown>", r = !1, i = lr, o = !1;
  const s = new ms(), c = Object.assign(new gs(), xs(e || {}), {
    parseAtrulePrelude: !0,
    parseRulePrelude: !0,
    parseValue: !0,
    parseCustomProperty: !1,
    readSequence: bs,
    consumeUntilBalanceEnd: () => 0,
    consumeUntilLeftCurlyBracket(a) {
      return a === cr ? 1 : 0;
    },
    consumeUntilLeftCurlyBracketOrSemicolon(a) {
      return a === cr || a === Wt ? 1 : 0;
    },
    consumeUntilExclamationMarkOrSemicolon(a) {
      return a === ys || a === Wt ? 1 : 0;
    },
    consumeUntilSemicolonIncluded(a) {
      return a === Wt ? 2 : 0;
    },
    createList() {
      return new B();
    },
    createSingleNodeList(a) {
      return new B().appendData(a);
    },
    getFirstListNode(a) {
      return a && a.first;
    },
    getLastListNode(a) {
      return a && a.last;
    },
    parseWithFallback(a, u) {
      const p = this.tokenIndex;
      try {
        return a.call(this);
      } catch (m) {
        if (o)
          throw m;
        this.skip(p - this.tokenIndex);
        const g = u.call(this);
        return o = !0, i(m, g), o = !1, g;
      }
    },
    lookupNonWSType(a) {
      let u;
      do
        if (u = this.lookupType(a++), u !== j && u !== q)
          return u;
      while (u !== ur);
      return ur;
    },
    charCodeAt(a) {
      return a >= 0 && a < t.length ? t.charCodeAt(a) : 0;
    },
    substring(a, u) {
      return t.substring(a, u);
    },
    substrToCursor(a) {
      return this.source.substring(a, this.tokenStart);
    },
    cmpChar(a, u) {
      return Me(t, a, u);
    },
    cmpStr(a, u, p) {
      return Ze(t, a, u, p);
    },
    consume(a) {
      const u = this.tokenStart;
      return this.eat(a), this.substrToCursor(u);
    },
    consumeFunctionName() {
      const a = t.substring(this.tokenStart, this.tokenEnd - 1);
      return this.eat(C), a;
    },
    consumeNumber(a) {
      const u = t.substring(this.tokenStart, _t(t, this.tokenStart));
      return this.eat(a), u;
    },
    eat(a) {
      if (this.tokenType !== a) {
        const u = gi[a].slice(0, -6).replace(/-/g, " ").replace(/^./, (g) => g.toUpperCase());
        let p = `${/[[\](){}]/.test(u) ? `"${u}"` : u} is expected`, m = this.tokenStart;
        switch (a) {
          case b:
            this.tokenType === C || this.tokenType === U ? (m = this.tokenEnd - 1, p = "Identifier is expected but function found") : p = "Identifier is expected";
            break;
          case I:
            this.isDelim(ks) && (this.next(), m++, p = "Name is expected");
            break;
          case N:
            this.tokenType === v && (m = this.tokenEnd, p = "Percent sign is expected");
            break;
        }
        this.error(p, m);
      }
      this.next();
    },
    eatIdent(a) {
      (this.tokenType !== b || this.lookupValue(0, a) === !1) && this.error(`Identifier "${a}" is expected`), this.next();
    },
    eatDelim(a) {
      this.isDelim(a) || this.error(`Delim "${String.fromCharCode(a)}" is expected`), this.next();
    },
    getLocation(a, u) {
      return r ? s.getLocationRange(
        a,
        u,
        n
      ) : null;
    },
    getLocationFromList(a) {
      if (r) {
        const u = this.getFirstListNode(a), p = this.getLastListNode(a);
        return s.getLocationRange(
          u !== null ? u.loc.start.offset - s.startOffset : this.tokenStart,
          p !== null ? p.loc.end.offset - s.startOffset : this.tokenStart,
          n
        );
      }
      return null;
    },
    error(a, u) {
      const p = typeof u < "u" && u < t.length ? s.getLocation(u) : this.eof ? s.getLocation(hs(t, t.length - 1)) : s.getLocation(this.tokenStart);
      throw new ar(
        a || "Unexpected input",
        t,
        p.offset,
        p.line,
        p.column,
        s.startLine,
        s.startColumn
      );
    }
  });
  return Object.assign(function(a, u) {
    t = a, u = u || {}, c.setSource(t, It), s.setSource(
      t,
      u.offset,
      u.line,
      u.column
    ), n = u.filename || "<unknown>", r = !!u.positions, i = typeof u.onParseError == "function" ? u.onParseError : lr, o = !1, c.parseAtrulePrelude = "parseAtrulePrelude" in u ? !!u.parseAtrulePrelude : !0, c.parseRulePrelude = "parseRulePrelude" in u ? !!u.parseRulePrelude : !0, c.parseValue = "parseValue" in u ? !!u.parseValue : !0, c.parseCustomProperty = "parseCustomProperty" in u ? !!u.parseCustomProperty : !1;
    const { context: p = "default", onComment: m } = u;
    if (!(p in c.context))
      throw new Error("Unknown context `" + p + "`");
    typeof m == "function" && c.forEachToken((w, M, L) => {
      if (w === q) {
        const E = c.getLocation(M, L), y = Ze(t, L - 2, L, "*/") ? t.slice(M + 2, L - 2) : t.slice(M + 2, L);
        m(y, E);
      }
    });
    const g = c.context[p].call(c, u);
    return c.eof || c.error(), g;
  }, {
    SyntaxError: ar,
    config: c.config
  });
}
var Pn = {}, _n = {}, hr = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".split("");
_n.encode = function(e) {
  if (0 <= e && e < hr.length)
    return hr[e];
  throw new TypeError("Must be between 0 and 63: " + e);
};
_n.decode = function(e) {
  var t = 65, n = 90, r = 97, i = 122, o = 48, s = 57, c = 43, l = 47, a = 26, u = 52;
  return t <= e && e <= n ? e - t : r <= e && e <= i ? e - r + a : o <= e && e <= s ? e - o + u : e == c ? 62 : e == l ? 63 : -1;
};
var bi = _n, In = 5, yi = 1 << In, ki = yi - 1, wi = yi;
function Ss(e) {
  return e < 0 ? (-e << 1) + 1 : (e << 1) + 0;
}
function Cs(e) {
  var t = (e & 1) === 1, n = e >> 1;
  return t ? -n : n;
}
Pn.encode = function(t) {
  var n = "", r, i = Ss(t);
  do
    r = i & ki, i >>>= In, i > 0 && (r |= wi), n += bi.encode(r);
  while (i > 0);
  return n;
};
Pn.decode = function(t, n, r) {
  var i = t.length, o = 0, s = 0, c, l;
  do {
    if (n >= i)
      throw new Error("Expected more digits in base 64 VLQ value.");
    if (l = bi.decode(t.charCodeAt(n++)), l === -1)
      throw new Error("Invalid base64 digit: " + t.charAt(n - 1));
    c = !!(l & wi), l &= ki, o = o + (l << s), s += In;
  } while (c);
  r.value = Cs(o), r.rest = n;
};
var Mt = {};
(function(e) {
  function t(h, d, k) {
    if (d in h)
      return h[d];
    if (arguments.length === 3)
      return k;
    throw new Error('"' + d + '" is a required argument.');
  }
  e.getArg = t;
  var n = /^(?:([\w+\-.]+):)?\/\/(?:(\w+:\w+)@)?([\w.-]*)(?::(\d+))?(.*)$/, r = /^data:.+\,.+$/;
  function i(h) {
    var d = h.match(n);
    return d ? {
      scheme: d[1],
      auth: d[2],
      host: d[3],
      port: d[4],
      path: d[5]
    } : null;
  }
  e.urlParse = i;
  function o(h) {
    var d = "";
    return h.scheme && (d += h.scheme + ":"), d += "//", h.auth && (d += h.auth + "@"), h.host && (d += h.host), h.port && (d += ":" + h.port), h.path && (d += h.path), d;
  }
  e.urlGenerate = o;
  var s = 32;
  function c(h) {
    var d = [];
    return function(k) {
      for (var f = 0; f < d.length; f++)
        if (d[f].input === k) {
          var ge = d[0];
          return d[0] = d[f], d[f] = ge, d[0].result;
        }
      var ae = h(k);
      return d.unshift({
        input: k,
        result: ae
      }), d.length > s && d.pop(), ae;
    };
  }
  var l = c(function(d) {
    var k = d, f = i(d);
    if (f) {
      if (!f.path)
        return d;
      k = f.path;
    }
    for (var ge = e.isAbsolute(k), ae = [], rt = 0, Y = 0; ; )
      if (rt = Y, Y = k.indexOf("/", rt), Y === -1) {
        ae.push(k.slice(rt));
        break;
      } else
        for (ae.push(k.slice(rt, Y)); Y < k.length && k[Y] === "/"; )
          Y++;
    for (var it, Re = 0, Y = ae.length - 1; Y >= 0; Y--)
      it = ae[Y], it === "." ? ae.splice(Y, 1) : it === ".." ? Re++ : Re > 0 && (it === "" ? (ae.splice(Y + 1, Re), Re = 0) : (ae.splice(Y, 2), Re--));
    return k = ae.join("/"), k === "" && (k = ge ? "/" : "."), f ? (f.path = k, o(f)) : k;
  });
  e.normalize = l;
  function a(h, d) {
    h === "" && (h = "."), d === "" && (d = ".");
    var k = i(d), f = i(h);
    if (f && (h = f.path || "/"), k && !k.scheme)
      return f && (k.scheme = f.scheme), o(k);
    if (k || d.match(r))
      return d;
    if (f && !f.host && !f.path)
      return f.host = d, o(f);
    var ge = d.charAt(0) === "/" ? d : l(h.replace(/\/+$/, "") + "/" + d);
    return f ? (f.path = ge, o(f)) : ge;
  }
  e.join = a, e.isAbsolute = function(h) {
    return h.charAt(0) === "/" || n.test(h);
  };
  function u(h, d) {
    h === "" && (h = "."), h = h.replace(/\/$/, "");
    for (var k = 0; d.indexOf(h + "/") !== 0; ) {
      var f = h.lastIndexOf("/");
      if (f < 0 || (h = h.slice(0, f), h.match(/^([^\/]+:\/)?\/*$/)))
        return d;
      ++k;
    }
    return Array(k + 1).join("../") + d.substr(h.length + 1);
  }
  e.relative = u;
  var p = function() {
    var h = /* @__PURE__ */ Object.create(null);
    return !("__proto__" in h);
  }();
  function m(h) {
    return h;
  }
  function g(h) {
    return M(h) ? "$" + h : h;
  }
  e.toSetString = p ? m : g;
  function w(h) {
    return M(h) ? h.slice(1) : h;
  }
  e.fromSetString = p ? m : w;
  function M(h) {
    if (!h)
      return !1;
    var d = h.length;
    if (d < 9 || h.charCodeAt(d - 1) !== 95 || h.charCodeAt(d - 2) !== 95 || h.charCodeAt(d - 3) !== 111 || h.charCodeAt(d - 4) !== 116 || h.charCodeAt(d - 5) !== 111 || h.charCodeAt(d - 6) !== 114 || h.charCodeAt(d - 7) !== 112 || h.charCodeAt(d - 8) !== 95 || h.charCodeAt(d - 9) !== 95)
      return !1;
    for (var k = d - 10; k >= 0; k--)
      if (h.charCodeAt(k) !== 36)
        return !1;
    return !0;
  }
  function L(h, d, k) {
    var f = S(h.source, d.source);
    return f !== 0 || (f = h.originalLine - d.originalLine, f !== 0) || (f = h.originalColumn - d.originalColumn, f !== 0 || k) || (f = h.generatedColumn - d.generatedColumn, f !== 0) || (f = h.generatedLine - d.generatedLine, f !== 0) ? f : S(h.name, d.name);
  }
  e.compareByOriginalPositions = L;
  function E(h, d, k) {
    var f;
    return f = h.originalLine - d.originalLine, f !== 0 || (f = h.originalColumn - d.originalColumn, f !== 0 || k) || (f = h.generatedColumn - d.generatedColumn, f !== 0) || (f = h.generatedLine - d.generatedLine, f !== 0) ? f : S(h.name, d.name);
  }
  e.compareByOriginalPositionsNoSource = E;
  function y(h, d, k) {
    var f = h.generatedLine - d.generatedLine;
    return f !== 0 || (f = h.generatedColumn - d.generatedColumn, f !== 0 || k) || (f = S(h.source, d.source), f !== 0) || (f = h.originalLine - d.originalLine, f !== 0) || (f = h.originalColumn - d.originalColumn, f !== 0) ? f : S(h.name, d.name);
  }
  e.compareByGeneratedPositionsDeflated = y;
  function z(h, d, k) {
    var f = h.generatedColumn - d.generatedColumn;
    return f !== 0 || k || (f = S(h.source, d.source), f !== 0) || (f = h.originalLine - d.originalLine, f !== 0) || (f = h.originalColumn - d.originalColumn, f !== 0) ? f : S(h.name, d.name);
  }
  e.compareByGeneratedPositionsDeflatedNoLine = z;
  function S(h, d) {
    return h === d ? 0 : h === null ? 1 : d === null ? -1 : h > d ? 1 : -1;
  }
  function Q(h, d) {
    var k = h.generatedLine - d.generatedLine;
    return k !== 0 || (k = h.generatedColumn - d.generatedColumn, k !== 0) || (k = S(h.source, d.source), k !== 0) || (k = h.originalLine - d.originalLine, k !== 0) || (k = h.originalColumn - d.originalColumn, k !== 0) ? k : S(h.name, d.name);
  }
  e.compareByGeneratedPositionsInflated = Q;
  function se(h) {
    return JSON.parse(h.replace(/^\)]}'[^\n]*\n/, ""));
  }
  e.parseSourceMapInput = se;
  function R(h, d, k) {
    if (d = d || "", h && (h[h.length - 1] !== "/" && d[0] !== "/" && (h += "/"), d = h + d), k) {
      var f = i(k);
      if (!f)
        throw new Error("sourceMapURL could not be parsed");
      if (f.path) {
        var ge = f.path.lastIndexOf("/");
        ge >= 0 && (f.path = f.path.substring(0, ge + 1));
      }
      d = a(o(f), d);
    }
    return l(d);
  }
  e.computeSourceURL = R;
})(Mt);
var xi = {}, zn = Mt, Mn = Object.prototype.hasOwnProperty, Te = typeof Map < "u";
function ye() {
  this._array = [], this._set = Te ? /* @__PURE__ */ new Map() : /* @__PURE__ */ Object.create(null);
}
ye.fromArray = function(t, n) {
  for (var r = new ye(), i = 0, o = t.length; i < o; i++)
    r.add(t[i], n);
  return r;
};
ye.prototype.size = function() {
  return Te ? this._set.size : Object.getOwnPropertyNames(this._set).length;
};
ye.prototype.add = function(t, n) {
  var r = Te ? t : zn.toSetString(t), i = Te ? this.has(t) : Mn.call(this._set, r), o = this._array.length;
  (!i || n) && this._array.push(t), i || (Te ? this._set.set(t, o) : this._set[r] = o);
};
ye.prototype.has = function(t) {
  if (Te)
    return this._set.has(t);
  var n = zn.toSetString(t);
  return Mn.call(this._set, n);
};
ye.prototype.indexOf = function(t) {
  if (Te) {
    var n = this._set.get(t);
    if (n >= 0)
      return n;
  } else {
    var r = zn.toSetString(t);
    if (Mn.call(this._set, r))
      return this._set[r];
  }
  throw new Error('"' + t + '" is not in the set.');
};
ye.prototype.at = function(t) {
  if (t >= 0 && t < this._array.length)
    return this._array[t];
  throw new Error("No element indexed by " + t);
};
ye.prototype.toArray = function() {
  return this._array.slice();
};
xi.ArraySet = ye;
var vi = {}, Si = Mt;
function Es(e, t) {
  var n = e.generatedLine, r = t.generatedLine, i = e.generatedColumn, o = t.generatedColumn;
  return r > n || r == n && o >= i || Si.compareByGeneratedPositionsInflated(e, t) <= 0;
}
function Nt() {
  this._array = [], this._sorted = !0, this._last = { generatedLine: -1, generatedColumn: 0 };
}
Nt.prototype.unsortedForEach = function(t, n) {
  this._array.forEach(t, n);
};
Nt.prototype.add = function(t) {
  Es(this._last, t) ? (this._last = t, this._array.push(t)) : (this._sorted = !1, this._array.push(t));
};
Nt.prototype.toArray = function() {
  return this._sorted || (this._array.sort(Si.compareByGeneratedPositionsInflated), this._sorted = !0), this._array;
};
vi.MappingList = Nt;
var Be = Pn, F = Mt, St = xi.ArraySet, Ts = vi.MappingList;
function oe(e) {
  e || (e = {}), this._file = F.getArg(e, "file", null), this._sourceRoot = F.getArg(e, "sourceRoot", null), this._skipValidation = F.getArg(e, "skipValidation", !1), this._ignoreInvalidMapping = F.getArg(e, "ignoreInvalidMapping", !1), this._sources = new St(), this._names = new St(), this._mappings = new Ts(), this._sourcesContents = null;
}
oe.prototype._version = 3;
oe.fromSourceMap = function(t, n) {
  var r = t.sourceRoot, i = new oe(Object.assign(n || {}, {
    file: t.file,
    sourceRoot: r
  }));
  return t.eachMapping(function(o) {
    var s = {
      generated: {
        line: o.generatedLine,
        column: o.generatedColumn
      }
    };
    o.source != null && (s.source = o.source, r != null && (s.source = F.relative(r, s.source)), s.original = {
      line: o.originalLine,
      column: o.originalColumn
    }, o.name != null && (s.name = o.name)), i.addMapping(s);
  }), t.sources.forEach(function(o) {
    var s = o;
    r !== null && (s = F.relative(r, o)), i._sources.has(s) || i._sources.add(s);
    var c = t.sourceContentFor(o);
    c != null && i.setSourceContent(o, c);
  }), i;
};
oe.prototype.addMapping = function(t) {
  var n = F.getArg(t, "generated"), r = F.getArg(t, "original", null), i = F.getArg(t, "source", null), o = F.getArg(t, "name", null);
  !this._skipValidation && this._validateMapping(n, r, i, o) === !1 || (i != null && (i = String(i), this._sources.has(i) || this._sources.add(i)), o != null && (o = String(o), this._names.has(o) || this._names.add(o)), this._mappings.add({
    generatedLine: n.line,
    generatedColumn: n.column,
    originalLine: r != null && r.line,
    originalColumn: r != null && r.column,
    source: i,
    name: o
  }));
};
oe.prototype.setSourceContent = function(t, n) {
  var r = t;
  this._sourceRoot != null && (r = F.relative(this._sourceRoot, r)), n != null ? (this._sourcesContents || (this._sourcesContents = /* @__PURE__ */ Object.create(null)), this._sourcesContents[F.toSetString(r)] = n) : this._sourcesContents && (delete this._sourcesContents[F.toSetString(r)], Object.keys(this._sourcesContents).length === 0 && (this._sourcesContents = null));
};
oe.prototype.applySourceMap = function(t, n, r) {
  var i = n;
  if (n == null) {
    if (t.file == null)
      throw new Error(
        `SourceMapGenerator.prototype.applySourceMap requires either an explicit source file, or the source map's "file" property. Both were omitted.`
      );
    i = t.file;
  }
  var o = this._sourceRoot;
  o != null && (i = F.relative(o, i));
  var s = new St(), c = new St();
  this._mappings.unsortedForEach(function(l) {
    if (l.source === i && l.originalLine != null) {
      var a = t.originalPositionFor({
        line: l.originalLine,
        column: l.originalColumn
      });
      a.source != null && (l.source = a.source, r != null && (l.source = F.join(r, l.source)), o != null && (l.source = F.relative(o, l.source)), l.originalLine = a.line, l.originalColumn = a.column, a.name != null && (l.name = a.name));
    }
    var u = l.source;
    u != null && !s.has(u) && s.add(u);
    var p = l.name;
    p != null && !c.has(p) && c.add(p);
  }, this), this._sources = s, this._names = c, t.sources.forEach(function(l) {
    var a = t.sourceContentFor(l);
    a != null && (r != null && (l = F.join(r, l)), o != null && (l = F.relative(o, l)), this.setSourceContent(l, a));
  }, this);
};
oe.prototype._validateMapping = function(t, n, r, i) {
  if (n && typeof n.line != "number" && typeof n.column != "number") {
    var o = "original.line and original.column are not numbers -- you probably meant to omit the original mapping entirely and only map the generated position. If so, pass null for the original mapping instead of an object with empty or null values.";
    if (this._ignoreInvalidMapping)
      return typeof console < "u" && console.warn && console.warn(o), !1;
    throw new Error(o);
  }
  if (!(t && "line" in t && "column" in t && t.line > 0 && t.column >= 0 && !n && !r && !i)) {
    if (t && "line" in t && "column" in t && n && "line" in n && "column" in n && t.line > 0 && t.column >= 0 && n.line > 0 && n.column >= 0 && r)
      return;
    var o = "Invalid mapping: " + JSON.stringify({
      generated: t,
      source: r,
      original: n,
      name: i
    });
    if (this._ignoreInvalidMapping)
      return typeof console < "u" && console.warn && console.warn(o), !1;
    throw new Error(o);
  }
};
oe.prototype._serializeMappings = function() {
  for (var t = 0, n = 1, r = 0, i = 0, o = 0, s = 0, c = "", l, a, u, p, m = this._mappings.toArray(), g = 0, w = m.length; g < w; g++) {
    if (a = m[g], l = "", a.generatedLine !== n)
      for (t = 0; a.generatedLine !== n; )
        l += ";", n++;
    else if (g > 0) {
      if (!F.compareByGeneratedPositionsInflated(a, m[g - 1]))
        continue;
      l += ",";
    }
    l += Be.encode(a.generatedColumn - t), t = a.generatedColumn, a.source != null && (p = this._sources.indexOf(a.source), l += Be.encode(p - s), s = p, l += Be.encode(a.originalLine - 1 - i), i = a.originalLine - 1, l += Be.encode(a.originalColumn - r), r = a.originalColumn, a.name != null && (u = this._names.indexOf(a.name), l += Be.encode(u - o), o = u)), c += l;
  }
  return c;
};
oe.prototype._generateSourcesContent = function(t, n) {
  return t.map(function(r) {
    if (!this._sourcesContents)
      return null;
    n != null && (r = F.relative(n, r));
    var i = F.toSetString(r);
    return Object.prototype.hasOwnProperty.call(this._sourcesContents, i) ? this._sourcesContents[i] : null;
  }, this);
};
oe.prototype.toJSON = function() {
  var t = {
    version: this._version,
    sources: this._sources.toArray(),
    names: this._names.toArray(),
    mappings: this._serializeMappings()
  };
  return this._file != null && (t.file = this._file), this._sourceRoot != null && (t.sourceRoot = this._sourceRoot), this._sourcesContents && (t.sourcesContent = this._generateSourcesContent(t.sources, t.sourceRoot)), t;
};
oe.prototype.toString = function() {
  return JSON.stringify(this.toJSON());
};
var As = oe;
const pr = /* @__PURE__ */ new Set(["Atrule", "Selector", "Declaration"]);
function $s(e) {
  const t = new As(), n = {
    line: 1,
    column: 0
  }, r = {
    line: 0,
    // should be zero to add first mapping
    column: 0
  }, i = {
    line: 1,
    column: 0
  }, o = {
    generated: i
  };
  let s = 1, c = 0, l = !1;
  const a = e.node;
  e.node = function(m) {
    if (m.loc && m.loc.start && pr.has(m.type)) {
      const g = m.loc.start.line, w = m.loc.start.column - 1;
      (r.line !== g || r.column !== w) && (r.line = g, r.column = w, n.line = s, n.column = c, l && (l = !1, (n.line !== i.line || n.column !== i.column) && t.addMapping(o)), l = !0, t.addMapping({
        source: m.loc.source,
        original: r,
        generated: n
      }));
    }
    a.call(this, m), l && pr.has(m.type) && (i.line = s, i.column = c);
  };
  const u = e.emit;
  e.emit = function(m, g, w) {
    for (let M = 0; M < m.length; M++)
      m.charCodeAt(M) === 10 ? (s++, c = 0) : c++;
    u(m, g, w);
  };
  const p = e.result;
  return e.result = function() {
    return l && t.addMapping(o), {
      css: p(),
      map: t
    };
  }, e;
}
const Os = 43, Ls = 45, Gt = (e, t) => {
  if (e === A && (e = t), typeof e == "string") {
    const n = e.charCodeAt(0);
    return n > 127 ? 32768 : n << 8;
  }
  return e;
}, Ci = [
  [b, b],
  [b, C],
  [b, U],
  [b, X],
  [b, "-"],
  [b, v],
  [b, N],
  [b, T],
  [b, J],
  [b, $],
  [D, b],
  [D, C],
  [D, U],
  [D, X],
  [D, "-"],
  [D, v],
  [D, N],
  [D, T],
  [D, J],
  [I, b],
  [I, C],
  [I, U],
  [I, X],
  [I, "-"],
  [I, v],
  [I, N],
  [I, T],
  [I, J],
  [T, b],
  [T, C],
  [T, U],
  [T, X],
  [T, "-"],
  [T, v],
  [T, N],
  [T, T],
  [T, J],
  ["#", b],
  ["#", C],
  ["#", U],
  ["#", X],
  ["#", "-"],
  ["#", v],
  ["#", N],
  ["#", T],
  ["#", J],
  // https://github.com/w3c/csswg-drafts/pull/6874
  ["-", b],
  ["-", C],
  ["-", U],
  ["-", X],
  ["-", "-"],
  ["-", v],
  ["-", N],
  ["-", T],
  ["-", J],
  // https://github.com/w3c/csswg-drafts/pull/6874
  [v, b],
  [v, C],
  [v, U],
  [v, X],
  [v, v],
  [v, N],
  [v, T],
  [v, "%"],
  [v, J],
  // https://github.com/w3c/csswg-drafts/pull/6874
  ["@", b],
  ["@", C],
  ["@", U],
  ["@", X],
  ["@", "-"],
  ["@", J],
  // https://github.com/w3c/csswg-drafts/pull/6874
  [".", v],
  [".", N],
  [".", T],
  ["+", v],
  ["+", N],
  ["+", T],
  ["/", "*"]
], Ps = Ci.concat([
  [b, I],
  [T, I],
  [I, I],
  [D, $],
  [D, he],
  [D, G],
  [N, N],
  [N, T],
  [N, C],
  [N, "-"],
  [x, b],
  [x, C],
  [x, N],
  [x, T],
  [x, I],
  [x, "-"]
]);
function Ei(e) {
  const t = new Set(
    e.map(([n, r]) => Gt(n) << 16 | Gt(r))
  );
  return function(n, r, i) {
    const o = Gt(r, i), s = i.charCodeAt(0);
    return (s === Ls && r !== b && r !== C && r !== J || s === Os ? t.has(n << 16 | s << 8) : t.has(n << 16 | o)) && this.emit(" ", j, !0), o;
  };
}
const _s = Ei(Ci), Ti = Ei(Ps), dr = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  safe: Ti,
  spec: _s
}, Symbol.toStringTag, { value: "Module" })), Is = 92;
function zs(e, t) {
  if (typeof t == "function") {
    let n = null;
    e.children.forEach((r) => {
      n !== null && t.call(this, n), this.node(r), n = r;
    });
    return;
  }
  e.children.forEach(this.node, this);
}
function Ms(e) {
  It(e, (t, n, r) => {
    this.token(t, e.slice(n, r));
  });
}
function Ns(e) {
  const t = /* @__PURE__ */ new Map();
  for (let [n, r] of Object.entries(e.node))
    typeof (r.generate || r) == "function" && t.set(n, r.generate || r);
  return function(n, r) {
    let i = "", o = 0, s = {
      node(l) {
        if (t.has(l.type))
          t.get(l.type).call(c, l);
        else
          throw new Error("Unknown node type: " + l.type);
      },
      tokenBefore: Ti,
      token(l, a) {
        o = this.tokenBefore(o, l, a), this.emit(a, l, !1), l === A && a.charCodeAt(0) === Is && this.emit(`
`, j, !0);
      },
      emit(l) {
        i += l;
      },
      result() {
        return i;
      }
    };
    r && (typeof r.decorator == "function" && (s = r.decorator(s)), r.sourceMap && (s = $s(s)), r.mode in dr && (s.tokenBefore = dr[r.mode]));
    const c = {
      node: (l) => s.node(l),
      children: zs,
      token: (l, a) => s.token(l, a),
      tokenize: Ms
    };
    return s.node(n), s.result();
  };
}
function js(e) {
  return {
    fromPlainObject(t) {
      return e(t, {
        enter(n) {
          n.children && !(n.children instanceof B) && (n.children = new B().fromArray(n.children));
        }
      }), t;
    },
    toPlainObject(t) {
      return e(t, {
        leave(n) {
          n.children && n.children instanceof B && (n.children = n.children.toArray());
        }
      }), t;
    }
  };
}
const { hasOwnProperty: Nn } = Object.prototype, Ve = function() {
};
function mr(e) {
  return typeof e == "function" ? e : Ve;
}
function fr(e, t) {
  return function(n, r, i) {
    n.type === t && e.call(this, n, r, i);
  };
}
function Fs(e, t) {
  const n = t.structure, r = [];
  for (const i in n) {
    if (Nn.call(n, i) === !1)
      continue;
    let o = n[i];
    const s = {
      name: i,
      type: !1,
      nullable: !1
    };
    Array.isArray(o) || (o = [o]);
    for (const c of o)
      c === null ? s.nullable = !0 : typeof c == "string" ? s.type = "node" : Array.isArray(c) && (s.type = "list");
    s.type && r.push(s);
  }
  return r.length ? {
    context: t.walkContext,
    fields: r
  } : null;
}
function Ds(e) {
  const t = {};
  for (const n in e.node)
    if (Nn.call(e.node, n)) {
      const r = e.node[n];
      if (!r.structure)
        throw new Error("Missed `structure` field in `" + n + "` node type definition");
      t[n] = Fs(n, r);
    }
  return t;
}
function gr(e, t) {
  const n = e.fields.slice(), r = e.context, i = typeof r == "string";
  return t && n.reverse(), function(o, s, c, l) {
    let a;
    i && (a = s[r], s[r] = o);
    for (const u of n) {
      const p = o[u.name];
      if (!u.nullable || p) {
        if (u.type === "list") {
          if (t ? p.reduceRight(l, !1) : p.reduce(l, !1))
            return !0;
        } else if (c(p))
          return !0;
      }
    }
    i && (s[r] = a);
  };
}
function br({
  StyleSheet: e,
  Atrule: t,
  Rule: n,
  Block: r,
  DeclarationList: i
}) {
  return {
    Atrule: {
      StyleSheet: e,
      Atrule: t,
      Rule: n,
      Block: r
    },
    Rule: {
      StyleSheet: e,
      Atrule: t,
      Rule: n,
      Block: r
    },
    Declaration: {
      StyleSheet: e,
      Atrule: t,
      Rule: n,
      Block: r,
      DeclarationList: i
    }
  };
}
function Rs(e) {
  const t = Ds(e), n = {}, r = {}, i = Symbol("break-walk"), o = Symbol("skip-node");
  for (const a in t)
    Nn.call(t, a) && t[a] !== null && (n[a] = gr(t[a], !1), r[a] = gr(t[a], !0));
  const s = br(n), c = br(r), l = function(a, u) {
    function p(E, y, z) {
      const S = m.call(L, E, y, z);
      return S === i ? !0 : S === o ? !1 : !!(w.hasOwnProperty(E.type) && w[E.type](E, L, p, M) || g.call(L, E, y, z) === i);
    }
    let m = Ve, g = Ve, w = n, M = (E, y, z, S) => E || p(y, z, S);
    const L = {
      break: i,
      skip: o,
      root: a,
      stylesheet: null,
      atrule: null,
      atrulePrelude: null,
      rule: null,
      selector: null,
      block: null,
      declaration: null,
      function: null
    };
    if (typeof u == "function")
      m = u;
    else if (u && (m = mr(u.enter), g = mr(u.leave), u.reverse && (w = r), u.visit)) {
      if (s.hasOwnProperty(u.visit))
        w = u.reverse ? c[u.visit] : s[u.visit];
      else if (!t.hasOwnProperty(u.visit))
        throw new Error("Bad value `" + u.visit + "` for `visit` option (should be: " + Object.keys(t).sort().join(", ") + ")");
      m = fr(m, u.visit), g = fr(g, u.visit);
    }
    if (m === Ve && g === Ve)
      throw new Error("Neither `enter` nor `leave` walker handler is set or both aren't a function");
    p(a);
  };
  return l.break = i, l.skip = o, l.find = function(a, u) {
    let p = null;
    return l(a, function(m, g, w) {
      if (u.call(this, m, g, w))
        return p = m, i;
    }), p;
  }, l.findLast = function(a, u) {
    let p = null;
    return l(a, {
      reverse: !0,
      enter(m, g, w) {
        if (u.call(this, m, g, w))
          return p = m, i;
      }
    }), p;
  }, l.findAll = function(a, u) {
    const p = [];
    return l(a, function(m, g, w) {
      u.call(this, m, g, w) && p.push(m);
    }), p;
  }, l;
}
function Bs(e) {
  return e;
}
function Hs(e) {
  const { min: t, max: n, comma: r } = e;
  return t === 0 && n === 0 ? r ? "#?" : "*" : t === 0 && n === 1 ? "?" : t === 1 && n === 0 ? r ? "#" : "+" : t === 1 && n === 1 ? "" : (r ? "#" : "") + (t === n ? "{" + t + "}" : "{" + t + "," + (n !== 0 ? n : "") + "}");
}
function Vs(e) {
  switch (e.type) {
    case "Range":
      return " [" + (e.min === null ? "-∞" : e.min) + "," + (e.max === null ? "∞" : e.max) + "]";
    default:
      throw new Error("Unknown node type `" + e.type + "`");
  }
}
function qs(e, t, n, r) {
  const i = e.combinator === " " || r ? e.combinator : " " + e.combinator + " ", o = e.terms.map((s) => jn(s, t, n, r)).join(i);
  return e.explicit || n ? (r || o[0] === "," ? "[" : "[ ") + o + (r ? "]" : " ]") : o;
}
function jn(e, t, n, r) {
  let i;
  switch (e.type) {
    case "Group":
      i = qs(e, t, n, r) + (e.disallowEmpty ? "!" : "");
      break;
    case "Multiplier":
      return jn(e.term, t, n, r) + t(Hs(e), e);
    case "Type":
      i = "<" + e.name + (e.opts ? t(Vs(e.opts), e.opts) : "") + ">";
      break;
    case "Property":
      i = "<'" + e.name + "'>";
      break;
    case "Keyword":
      i = e.name;
      break;
    case "AtKeyword":
      i = "@" + e.name;
      break;
    case "Function":
      i = e.name + "(";
      break;
    case "String":
    case "Token":
      i = e.value;
      break;
    case "Comma":
      i = ",";
      break;
    default:
      throw new Error("Unknown node type `" + e.type + "`");
  }
  return t(i, e);
}
function Fn(e, t) {
  let n = Bs, r = !1, i = !1;
  return typeof t == "function" ? n = t : t && (r = !!t.forceBraces, i = !!t.compact, typeof t.decorate == "function" && (n = t.decorate)), jn(e, n, r, i);
}
const yr = { offset: 0, line: 1, column: 1 };
function Ws(e, t) {
  const n = e.tokens, r = e.longestMatch, i = r < n.length && n[r].node || null, o = i !== t ? i : null;
  let s = 0, c = 0, l = 0, a = "", u, p;
  for (let m = 0; m < n.length; m++) {
    const g = n[m].value;
    m === r && (c = g.length, s = a.length), o !== null && n[m].node === o && (m <= r ? l++ : l = 0), a += g;
  }
  return r === n.length || l > 1 ? (u = at(o || t, "end") || qe(yr, a), p = qe(u)) : (u = at(o, "start") || qe(at(t, "start") || yr, a.slice(0, s)), p = at(o, "end") || qe(u, a.substr(s, c))), {
    css: a,
    mismatchOffset: s,
    mismatchLength: c,
    start: u,
    end: p
  };
}
function at(e, t) {
  const n = e && e.loc && e.loc[t];
  return n ? "line" in n ? qe(n) : n : null;
}
function qe({ offset: e, line: t, column: n }, r) {
  const i = {
    offset: e,
    line: t,
    column: n
  };
  if (r) {
    const o = r.split(/\n|\r\n?|\f/);
    i.offset += r.length, i.line += o.length - 1, i.column = o.length === 1 ? i.column + r.length : o.pop().length + 1;
  }
  return i;
}
const He = function(e, t) {
  const n = zt(
    "SyntaxReferenceError",
    e + (t ? " `" + t + "`" : "")
  );
  return n.reference = t, n;
}, Us = function(e, t, n, r) {
  const i = zt("SyntaxMatchError", e), {
    css: o,
    mismatchOffset: s,
    mismatchLength: c,
    start: l,
    end: a
  } = Ws(r, n);
  return i.rawMessage = e, i.syntax = t ? Fn(t) : "<generic>", i.css = o, i.mismatchOffset = s, i.mismatchLength = c, i.message = e + `
  syntax: ` + i.syntax + `
   value: ` + (o || "<empty string>") + `
  --------` + new Array(i.mismatchOffset + 1).join("-") + "^", Object.assign(i, l), i.loc = {
    source: n && n.loc && n.loc.source || "<unknown>",
    start: l,
    end: a
  }, i;
}, lt = /* @__PURE__ */ new Map(), Le = /* @__PURE__ */ new Map(), Ct = 45, Kt = Gs, kr = Ks;
function Dn(e, t) {
  return t = t || 0, e.length - t >= 2 && e.charCodeAt(t) === Ct && e.charCodeAt(t + 1) === Ct;
}
function Ai(e, t) {
  if (t = t || 0, e.length - t >= 3 && e.charCodeAt(t) === Ct && e.charCodeAt(t + 1) !== Ct) {
    const n = e.indexOf("-", t + 2);
    if (n !== -1)
      return e.substring(t, n + 1);
  }
  return "";
}
function Gs(e) {
  if (lt.has(e))
    return lt.get(e);
  const t = e.toLowerCase();
  let n = lt.get(t);
  if (n === void 0) {
    const r = Dn(t, 0), i = r ? "" : Ai(t, 0);
    n = Object.freeze({
      basename: t.substr(i.length),
      name: t,
      prefix: i,
      vendor: i,
      custom: r
    });
  }
  return lt.set(e, n), n;
}
function Ks(e) {
  if (Le.has(e))
    return Le.get(e);
  let t = e, n = e[0];
  n === "/" ? n = e[1] === "/" ? "//" : "/" : n !== "_" && n !== "*" && n !== "$" && n !== "#" && n !== "+" && n !== "&" && (n = "");
  const r = Dn(t, n.length);
  if (!r && (t = t.toLowerCase(), Le.has(t))) {
    const c = Le.get(t);
    return Le.set(e, c), c;
  }
  const i = r ? "" : Ai(t, n.length), o = t.substr(0, n.length + i.length), s = Object.freeze({
    basename: t.substr(o.length),
    name: t.substr(n.length),
    hack: n,
    vendor: i,
    prefix: o,
    custom: r
  });
  return Le.set(e, s), s;
}
const Rn = [
  "initial",
  "inherit",
  "unset",
  "revert",
  "revert-layer"
], et = 43, de = 45, Qt = 110, Pe = !0, Qs = !1;
function pn(e, t) {
  return e !== null && e.type === A && e.value.charCodeAt(0) === t;
}
function Ke(e, t, n) {
  for (; e !== null && (e.type === j || e.type === q); )
    e = n(++t);
  return t;
}
function we(e, t, n, r) {
  if (!e)
    return 0;
  const i = e.value.charCodeAt(t);
  if (i === et || i === de) {
    if (n)
      return 0;
    t++;
  }
  for (; t < e.value.length; t++)
    if (!V(e.value.charCodeAt(t)))
      return 0;
  return r + 1;
}
function Yt(e, t, n) {
  let r = !1, i = Ke(e, t, n);
  if (e = n(i), e === null)
    return t;
  if (e.type !== v)
    if (pn(e, et) || pn(e, de)) {
      if (r = !0, i = Ke(n(++i), i, n), e = n(i), e === null || e.type !== v)
        return 0;
    } else
      return t;
  if (!r) {
    const o = e.value.charCodeAt(0);
    if (o !== et && o !== de)
      return 0;
  }
  return we(e, r ? 0 : 1, r, i);
}
function Ys(e, t) {
  let n = 0;
  if (!e)
    return 0;
  if (e.type === v)
    return we(e, 0, Qs, n);
  if (e.type === b && e.value.charCodeAt(0) === de) {
    if (!Me(e.value, 1, Qt))
      return 0;
    switch (e.value.length) {
      case 2:
        return Yt(t(++n), n, t);
      case 3:
        return e.value.charCodeAt(2) !== de ? 0 : (n = Ke(t(++n), n, t), e = t(n), we(e, 0, Pe, n));
      default:
        return e.value.charCodeAt(2) !== de ? 0 : we(e, 3, Pe, n);
    }
  } else if (e.type === b || pn(e, et) && t(n + 1).type === b) {
    if (e.type !== b && (e = t(++n)), e === null || !Me(e.value, 0, Qt))
      return 0;
    switch (e.value.length) {
      case 1:
        return Yt(t(++n), n, t);
      case 2:
        return e.value.charCodeAt(1) !== de ? 0 : (n = Ke(t(++n), n, t), e = t(n), we(e, 0, Pe, n));
      default:
        return e.value.charCodeAt(1) !== de ? 0 : we(e, 2, Pe, n);
    }
  } else if (e.type === T) {
    let r = e.value.charCodeAt(0), i = r === et || r === de ? 1 : 0, o = i;
    for (; o < e.value.length && V(e.value.charCodeAt(o)); o++)
      ;
    return o === i || !Me(e.value, o, Qt) ? 0 : o + 1 === e.value.length ? Yt(t(++n), n, t) : e.value.charCodeAt(o + 1) !== de ? 0 : o + 2 === e.value.length ? (n = Ke(t(++n), n, t), e = t(n), we(e, 0, Pe, n)) : we(e, o + 2, Pe, n);
  }
  return 0;
}
const Xs = 43, $i = 45, Oi = 63, Js = 117;
function dn(e, t) {
  return e !== null && e.type === A && e.value.charCodeAt(0) === t;
}
function Zs(e, t) {
  return e.value.charCodeAt(0) === t;
}
function We(e, t, n) {
  let r = 0;
  for (let i = t; i < e.value.length; i++) {
    const o = e.value.charCodeAt(i);
    if (o === $i && n && r !== 0)
      return We(e, t + r + 1, !1), 6;
    if (!ve(o) || ++r > 6)
      return 0;
  }
  return r;
}
function ct(e, t, n) {
  if (!e)
    return 0;
  for (; dn(n(t), Oi); ) {
    if (++e > 6)
      return 0;
    t++;
  }
  return t;
}
function ea(e, t) {
  let n = 0;
  if (e === null || e.type !== b || !Me(e.value, 0, Js) || (e = t(++n), e === null))
    return 0;
  if (dn(e, Xs))
    return e = t(++n), e === null ? 0 : e.type === b ? ct(We(e, 0, !0), ++n, t) : dn(e, Oi) ? ct(1, ++n, t) : 0;
  if (e.type === v) {
    const r = We(e, 1, !0);
    return r === 0 ? 0 : (e = t(++n), e === null ? n : e.type === T || e.type === v ? !Zs(e, $i) || !We(e, 1, !1) ? 0 : n + 1 : ct(r, n, t));
  }
  return e.type === T ? ct(We(e, 1, !0), ++n, t) : 0;
}
const ta = ["calc(", "-moz-calc(", "-webkit-calc("], Bn = /* @__PURE__ */ new Map([
  [C, x],
  [$, x],
  [te, ue],
  [H, ie]
]);
function ce(e, t) {
  return t < e.length ? e.charCodeAt(t) : 0;
}
function Li(e, t) {
  return Ze(e, 0, e.length, t);
}
function Pi(e, t) {
  for (let n = 0; n < t.length; n++)
    if (Li(e, t[n]))
      return !0;
  return !1;
}
function _i(e, t) {
  return t !== e.length - 2 ? !1 : ce(e, t) === 92 && // U+005C REVERSE SOLIDUS (\)
  V(ce(e, t + 1));
}
function jt(e, t, n) {
  if (e && e.type === "Range") {
    const r = Number(
      n !== void 0 && n !== t.length ? t.substr(0, n) : t
    );
    if (isNaN(r) || e.min !== null && r < e.min && typeof e.min != "string" || e.max !== null && r > e.max && typeof e.max != "string")
      return !0;
  }
  return !1;
}
function na(e, t) {
  let n = 0, r = [], i = 0;
  e:
    do {
      switch (e.type) {
        case ie:
        case x:
        case ue:
          if (e.type !== n)
            break e;
          if (n = r.pop(), r.length === 0) {
            i++;
            break e;
          }
          break;
        case C:
        case $:
        case te:
        case H:
          r.push(n), n = Bn.get(e.type);
          break;
      }
      i++;
    } while (e = t(i));
  return i;
}
function re(e) {
  return function(t, n, r) {
    return t === null ? 0 : t.type === C && Pi(t.value, ta) ? na(t, n) : e(t, n, r);
  };
}
function _(e) {
  return function(t) {
    return t === null || t.type !== e ? 0 : 1;
  };
}
function ra(e) {
  if (e === null || e.type !== b)
    return 0;
  const t = e.value.toLowerCase();
  return Pi(t, Rn) || Li(t, "default") ? 0 : 1;
}
function Ii(e) {
  return e === null || e.type !== b || ce(e.value, 0) !== 45 || ce(e.value, 1) !== 45 ? 0 : 1;
}
function ia(e) {
  return !Ii(e) || e.value === "--" ? 0 : 1;
}
function oa(e) {
  if (e === null || e.type !== I)
    return 0;
  const t = e.value.length;
  if (t !== 4 && t !== 5 && t !== 7 && t !== 9)
    return 0;
  for (let n = 1; n < t; n++)
    if (!ve(ce(e.value, n)))
      return 0;
  return 1;
}
function sa(e) {
  return e === null || e.type !== I || !mt(ce(e.value, 1), ce(e.value, 2), ce(e.value, 3)) ? 0 : 1;
}
function aa(e, t) {
  if (!e)
    return 0;
  let n = 0, r = [], i = 0;
  e:
    do {
      switch (e.type) {
        case Pt:
        case X:
          break e;
        case ie:
        case x:
        case ue:
          if (e.type !== n)
            break e;
          n = r.pop();
          break;
        case K:
          if (n === 0)
            break e;
          break;
        case A:
          if (n === 0 && e.value === "!")
            break e;
          break;
        case C:
        case $:
        case te:
        case H:
          r.push(n), n = Bn.get(e.type);
          break;
      }
      i++;
    } while (e = t(i));
  return i;
}
function la(e, t) {
  if (!e)
    return 0;
  let n = 0, r = [], i = 0;
  e:
    do {
      switch (e.type) {
        case Pt:
        case X:
          break e;
        case ie:
        case x:
        case ue:
          if (e.type !== n)
            break e;
          n = r.pop();
          break;
        case C:
        case $:
        case te:
        case H:
          r.push(n), n = Bn.get(e.type);
          break;
      }
      i++;
    } while (e = t(i));
  return i;
}
function be(e) {
  return e && (e = new Set(e)), function(t, n, r) {
    if (t === null || t.type !== T)
      return 0;
    const i = _t(t.value, 0);
    if (e !== null) {
      const o = t.value.indexOf("\\", i), s = o === -1 || !_i(t.value, o) ? t.value.substr(i) : t.value.substring(i, o);
      if (e.has(s.toLowerCase()) === !1)
        return 0;
    }
    return jt(r, t.value, i) ? 0 : 1;
  };
}
function ca(e, t, n) {
  return e === null || e.type !== N || jt(n, e.value, e.value.length - 1) ? 0 : 1;
}
function zi(e) {
  return typeof e != "function" && (e = function() {
    return 0;
  }), function(t, n, r) {
    return t !== null && t.type === v && Number(t.value) === 0 ? 1 : e(t, n, r);
  };
}
function ua(e, t, n) {
  if (e === null)
    return 0;
  const r = _t(e.value, 0);
  return !(r === e.value.length) && !_i(e.value, r) || jt(n, e.value, r) ? 0 : 1;
}
function ha(e, t, n) {
  if (e === null || e.type !== v)
    return 0;
  let r = ce(e.value, 0) === 43 || // U+002B PLUS SIGN (+)
  ce(e.value, 0) === 45 ? 1 : 0;
  for (; r < e.value.length; r++)
    if (!V(ce(e.value, r)))
      return 0;
  return jt(n, e.value, r) ? 0 : 1;
}
const pa = {
  "ident-token": _(b),
  "function-token": _(C),
  "at-keyword-token": _(D),
  "hash-token": _(I),
  "string-token": _(he),
  "bad-string-token": _(Pt),
  "url-token": _(U),
  "bad-url-token": _(X),
  "delim-token": _(A),
  "number-token": _(v),
  "percentage-token": _(N),
  "dimension-token": _(T),
  "whitespace-token": _(j),
  "CDO-token": _(nt),
  "CDC-token": _(J),
  "colon-token": _(G),
  "semicolon-token": _(K),
  "comma-token": _(Z),
  "[-token": _(te),
  "]-token": _(ue),
  "(-token": _($),
  ")-token": _(x),
  "{-token": _(H),
  "}-token": _(ie)
}, da = {
  // token type aliases
  string: _(he),
  ident: _(b),
  // percentage
  percentage: re(ca),
  // numeric
  zero: zi(),
  number: re(ua),
  integer: re(ha),
  // complex types
  "custom-ident": ra,
  "dashed-ident": Ii,
  "custom-property-name": ia,
  "hex-color": oa,
  "id-selector": sa,
  // element( <id-selector> )
  "an-plus-b": Ys,
  urange: ea,
  "declaration-value": aa,
  "any-value": la
};
function ma(e) {
  const {
    angle: t,
    decibel: n,
    frequency: r,
    flex: i,
    length: o,
    resolution: s,
    semitones: c,
    time: l
  } = e || {};
  return {
    dimension: re(be(null)),
    angle: re(be(t)),
    decibel: re(be(n)),
    frequency: re(be(r)),
    flex: re(be(i)),
    length: re(zi(be(o))),
    resolution: re(be(s)),
    semitones: re(be(c)),
    time: re(be(l))
  };
}
function fa(e) {
  return {
    ...pa,
    ...da,
    ...ma(e)
  };
}
const ga = [
  // absolute length units https://www.w3.org/TR/css-values-3/#lengths
  "cm",
  "mm",
  "q",
  "in",
  "pt",
  "pc",
  "px",
  // font-relative length units https://drafts.csswg.org/css-values-4/#font-relative-lengths
  "em",
  "rem",
  "ex",
  "rex",
  "cap",
  "rcap",
  "ch",
  "rch",
  "ic",
  "ric",
  "lh",
  "rlh",
  // viewport-percentage lengths https://drafts.csswg.org/css-values-4/#viewport-relative-lengths
  "vw",
  "svw",
  "lvw",
  "dvw",
  "vh",
  "svh",
  "lvh",
  "dvh",
  "vi",
  "svi",
  "lvi",
  "dvi",
  "vb",
  "svb",
  "lvb",
  "dvb",
  "vmin",
  "svmin",
  "lvmin",
  "dvmin",
  "vmax",
  "svmax",
  "lvmax",
  "dvmax",
  // container relative lengths https://drafts.csswg.org/css-contain-3/#container-lengths
  "cqw",
  "cqh",
  "cqi",
  "cqb",
  "cqmin",
  "cqmax"
], ba = ["deg", "grad", "rad", "turn"], ya = ["s", "ms"], ka = ["hz", "khz"], wa = ["dpi", "dpcm", "dppx", "x"], xa = ["fr"], va = ["db"], Sa = ["st"], wr = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  angle: ba,
  decibel: va,
  flex: xa,
  frequency: ka,
  length: ga,
  resolution: wa,
  semitones: Sa,
  time: ya
}, Symbol.toStringTag, { value: "Module" }));
function Ca(e, t, n) {
  return Object.assign(zt("SyntaxError", e), {
    input: t,
    offset: n,
    rawMessage: e,
    message: e + `
  ` + t + `
--` + new Array((n || t.length) + 1).join("-") + "^"
  });
}
const Ea = 9, Ta = 10, Aa = 12, $a = 13, Oa = 32;
class La {
  constructor(t) {
    this.str = t, this.pos = 0;
  }
  charCodeAt(t) {
    return t < this.str.length ? this.str.charCodeAt(t) : 0;
  }
  charCode() {
    return this.charCodeAt(this.pos);
  }
  nextCharCode() {
    return this.charCodeAt(this.pos + 1);
  }
  nextNonWsCode(t) {
    return this.charCodeAt(this.findWsEnd(t));
  }
  skipWs() {
    this.pos = this.findWsEnd(this.pos);
  }
  findWsEnd(t) {
    for (; t < this.str.length; t++) {
      const n = this.str.charCodeAt(t);
      if (n !== $a && n !== Ta && n !== Aa && n !== Oa && n !== Ea)
        break;
    }
    return t;
  }
  substringToPos(t) {
    return this.str.substring(this.pos, this.pos = t);
  }
  eat(t) {
    this.charCode() !== t && this.error("Expect `" + String.fromCharCode(t) + "`"), this.pos++;
  }
  peek() {
    return this.pos < this.str.length ? this.str.charAt(this.pos++) : "";
  }
  error(t) {
    throw new Ca(t, this.str, this.pos);
  }
}
const Pa = 9, _a = 10, Ia = 12, za = 13, Ma = 32, Mi = 33, Hn = 35, xr = 38, Et = 39, Ni = 40, Na = 41, ji = 42, Vn = 43, qn = 44, vr = 45, Wn = 60, Fi = 62, mn = 63, ja = 64, Ft = 91, Un = 93, Tt = 123, Sr = 124, Cr = 125, Er = 8734, tt = new Uint8Array(128).map(
  (e, t) => /[a-zA-Z0-9\-]/.test(String.fromCharCode(t)) ? 1 : 0
), Tr = {
  " ": 1,
  "&&": 2,
  "||": 3,
  "|": 4
};
function At(e) {
  return e.substringToPos(
    e.findWsEnd(e.pos)
  );
}
function je(e) {
  let t = e.pos;
  for (; t < e.str.length; t++) {
    const n = e.str.charCodeAt(t);
    if (n >= 128 || tt[n] === 0)
      break;
  }
  return e.pos === t && e.error("Expect a keyword"), e.substringToPos(t);
}
function $t(e) {
  let t = e.pos;
  for (; t < e.str.length; t++) {
    const n = e.str.charCodeAt(t);
    if (n < 48 || n > 57)
      break;
  }
  return e.pos === t && e.error("Expect a number"), e.substringToPos(t);
}
function Fa(e) {
  const t = e.str.indexOf("'", e.pos + 1);
  return t === -1 && (e.pos = e.str.length, e.error("Expect an apostrophe")), e.substringToPos(t + 1);
}
function Ar(e) {
  let t = null, n = null;
  return e.eat(Tt), e.skipWs(), t = $t(e), e.skipWs(), e.charCode() === qn ? (e.pos++, e.skipWs(), e.charCode() !== Cr && (n = $t(e), e.skipWs())) : n = t, e.eat(Cr), {
    min: Number(t),
    max: n ? Number(n) : 0
  };
}
function Da(e) {
  let t = null, n = !1;
  switch (e.charCode()) {
    case ji:
      e.pos++, t = {
        min: 0,
        max: 0
      };
      break;
    case Vn:
      e.pos++, t = {
        min: 1,
        max: 0
      };
      break;
    case mn:
      e.pos++, t = {
        min: 0,
        max: 1
      };
      break;
    case Hn:
      e.pos++, n = !0, e.charCode() === Tt ? t = Ar(e) : e.charCode() === mn ? (e.pos++, t = {
        min: 0,
        max: 0
      }) : t = {
        min: 1,
        max: 0
      };
      break;
    case Tt:
      t = Ar(e);
      break;
    default:
      return null;
  }
  return {
    type: "Multiplier",
    comma: n,
    min: t.min,
    max: t.max,
    term: null
  };
}
function Fe(e, t) {
  const n = Da(e);
  return n !== null ? (n.term = t, e.charCode() === Hn && e.charCodeAt(e.pos - 1) === Vn ? Fe(e, n) : n) : t;
}
function Xt(e) {
  const t = e.peek();
  return t === "" ? null : {
    type: "Token",
    value: t
  };
}
function Ra(e) {
  let t;
  return e.eat(Wn), e.eat(Et), t = je(e), e.eat(Et), e.eat(Fi), Fe(e, {
    type: "Property",
    name: t
  });
}
function Ba(e) {
  let t = null, n = null, r = 1;
  return e.eat(Ft), e.charCode() === vr && (e.peek(), r = -1), r == -1 && e.charCode() === Er ? e.peek() : (t = r * Number($t(e)), tt[e.charCode()] !== 0 && (t += je(e))), At(e), e.eat(qn), At(e), e.charCode() === Er ? e.peek() : (r = 1, e.charCode() === vr && (e.peek(), r = -1), n = r * Number($t(e)), tt[e.charCode()] !== 0 && (n += je(e))), e.eat(Un), {
    type: "Range",
    min: t,
    max: n
  };
}
function Ha(e) {
  let t, n = null;
  return e.eat(Wn), t = je(e), e.charCode() === Ni && e.nextCharCode() === Na && (e.pos += 2, t += "()"), e.charCodeAt(e.findWsEnd(e.pos)) === Ft && (At(e), n = Ba(e)), e.eat(Fi), Fe(e, {
    type: "Type",
    name: t,
    opts: n
  });
}
function Va(e) {
  const t = je(e);
  return e.charCode() === Ni ? (e.pos++, {
    type: "Function",
    name: t
  }) : Fe(e, {
    type: "Keyword",
    name: t
  });
}
function qa(e, t) {
  function n(i, o) {
    return {
      type: "Group",
      terms: i,
      combinator: o,
      disallowEmpty: !1,
      explicit: !1
    };
  }
  let r;
  for (t = Object.keys(t).sort((i, o) => Tr[i] - Tr[o]); t.length > 0; ) {
    r = t.shift();
    let i = 0, o = 0;
    for (; i < e.length; i++) {
      const s = e[i];
      s.type === "Combinator" && (s.value === r ? (o === -1 && (o = i - 1), e.splice(i, 1), i--) : (o !== -1 && i - o > 1 && (e.splice(
        o,
        i - o,
        n(e.slice(o, i), r)
      ), i = o + 1), o = -1));
    }
    o !== -1 && t.length && e.splice(
      o,
      i - o,
      n(e.slice(o, i), r)
    );
  }
  return r;
}
function Di(e) {
  const t = [], n = {};
  let r, i = null, o = e.pos;
  for (; r = Ua(e); )
    r.type !== "Spaces" && (r.type === "Combinator" ? ((i === null || i.type === "Combinator") && (e.pos = o, e.error("Unexpected combinator")), n[r.value] = !0) : i !== null && i.type !== "Combinator" && (n[" "] = !0, t.push({
      type: "Combinator",
      value: " "
    })), t.push(r), i = r, o = e.pos);
  return i !== null && i.type === "Combinator" && (e.pos -= o, e.error("Unexpected combinator")), {
    type: "Group",
    terms: t,
    combinator: qa(t, n) || " ",
    disallowEmpty: !1,
    explicit: !1
  };
}
function Wa(e) {
  let t;
  return e.eat(Ft), t = Di(e), e.eat(Un), t.explicit = !0, e.charCode() === Mi && (e.pos++, t.disallowEmpty = !0), t;
}
function Ua(e) {
  let t = e.charCode();
  if (t < 128 && tt[t] === 1)
    return Va(e);
  switch (t) {
    case Un:
      break;
    case Ft:
      return Fe(e, Wa(e));
    case Wn:
      return e.nextCharCode() === Et ? Ra(e) : Ha(e);
    case Sr:
      return {
        type: "Combinator",
        value: e.substringToPos(
          e.pos + (e.nextCharCode() === Sr ? 2 : 1)
        )
      };
    case xr:
      return e.pos++, e.eat(xr), {
        type: "Combinator",
        value: "&&"
      };
    case qn:
      return e.pos++, {
        type: "Comma"
      };
    case Et:
      return Fe(e, {
        type: "String",
        value: Fa(e)
      });
    case Ma:
    case Pa:
    case _a:
    case za:
    case Ia:
      return {
        type: "Spaces",
        value: At(e)
      };
    case ja:
      return t = e.nextCharCode(), t < 128 && tt[t] === 1 ? (e.pos++, {
        type: "AtKeyword",
        name: je(e)
      }) : Xt(e);
    case ji:
    case Vn:
    case mn:
    case Hn:
    case Mi:
      break;
    case Tt:
      if (t = e.nextCharCode(), t < 48 || t > 57)
        return Xt(e);
      break;
    default:
      return Xt(e);
  }
}
function Ri(e) {
  const t = new La(e), n = Di(t);
  return t.pos !== e.length && t.error("Unexpected input"), n.terms.length === 1 && n.terms[0].type === "Group" ? n.terms[0] : n;
}
const Ue = function() {
};
function $r(e) {
  return typeof e == "function" ? e : Ue;
}
function Ga(e, t, n) {
  function r(s) {
    switch (i.call(n, s), s.type) {
      case "Group":
        s.terms.forEach(r);
        break;
      case "Multiplier":
        r(s.term);
        break;
      case "Type":
      case "Property":
      case "Keyword":
      case "AtKeyword":
      case "Function":
      case "String":
      case "Token":
      case "Comma":
        break;
      default:
        throw new Error("Unknown type: " + s.type);
    }
    o.call(n, s);
  }
  let i = Ue, o = Ue;
  if (typeof t == "function" ? i = t : t && (i = $r(t.enter), o = $r(t.leave)), i === Ue && o === Ue)
    throw new Error("Neither `enter` nor `leave` walker handler is set or both aren't a function");
  r(e);
}
const Ka = {
  decorator(e) {
    const t = [];
    let n = null;
    return {
      ...e,
      node(r) {
        const i = n;
        n = r, e.node.call(this, r), n = i;
      },
      emit(r, i, o) {
        t.push({
          type: i,
          value: r,
          node: o ? null : n
        });
      },
      result() {
        return t;
      }
    };
  }
};
function Qa(e) {
  const t = [];
  return It(
    e,
    (n, r, i) => t.push({
      type: n,
      value: e.slice(r, i),
      node: null
    })
  ), t;
}
function Ya(e, t) {
  return typeof e == "string" ? Qa(e) : t.generate(e, Ka);
}
const O = { type: "Match" }, P = { type: "Mismatch" }, Gn = { type: "DisallowEmpty" }, Xa = 40, Ja = 41;
function W(e, t, n) {
  return t === O && n === P || e === O && t === O && n === O ? e : (e.type === "If" && e.else === P && t === O && (t = e.then, e = e.match), {
    type: "If",
    match: e,
    then: t,
    else: n
  });
}
function Bi(e) {
  return e.length > 2 && e.charCodeAt(e.length - 2) === Xa && e.charCodeAt(e.length - 1) === Ja;
}
function Or(e) {
  return e.type === "Keyword" || e.type === "AtKeyword" || e.type === "Function" || e.type === "Type" && Bi(e.name);
}
function fn(e, t, n) {
  switch (e) {
    case " ": {
      let r = O;
      for (let i = t.length - 1; i >= 0; i--) {
        const o = t[i];
        r = W(
          o,
          r,
          P
        );
      }
      return r;
    }
    case "|": {
      let r = P, i = null;
      for (let o = t.length - 1; o >= 0; o--) {
        let s = t[o];
        if (Or(s) && (i === null && o > 0 && Or(t[o - 1]) && (i = /* @__PURE__ */ Object.create(null), r = W(
          {
            type: "Enum",
            map: i
          },
          O,
          r
        )), i !== null)) {
          const c = (Bi(s.name) ? s.name.slice(0, -1) : s.name).toLowerCase();
          if (!(c in i)) {
            i[c] = s;
            continue;
          }
        }
        i = null, r = W(
          s,
          O,
          r
        );
      }
      return r;
    }
    case "&&": {
      if (t.length > 5)
        return {
          type: "MatchOnce",
          terms: t,
          all: !0
        };
      let r = P;
      for (let i = t.length - 1; i >= 0; i--) {
        const o = t[i];
        let s;
        t.length > 1 ? s = fn(
          e,
          t.filter(function(c) {
            return c !== o;
          }),
          !1
        ) : s = O, r = W(
          o,
          s,
          r
        );
      }
      return r;
    }
    case "||": {
      if (t.length > 5)
        return {
          type: "MatchOnce",
          terms: t,
          all: !1
        };
      let r = n ? O : P;
      for (let i = t.length - 1; i >= 0; i--) {
        const o = t[i];
        let s;
        t.length > 1 ? s = fn(
          e,
          t.filter(function(c) {
            return c !== o;
          }),
          !0
        ) : s = O, r = W(
          o,
          s,
          r
        );
      }
      return r;
    }
  }
}
function Za(e) {
  let t = O, n = Kn(e.term);
  if (e.max === 0)
    n = W(
      n,
      Gn,
      P
    ), t = W(
      n,
      null,
      // will be a loop
      P
    ), t.then = W(
      O,
      O,
      t
      // make a loop
    ), e.comma && (t.then.else = W(
      { type: "Comma", syntax: e },
      t,
      P
    ));
  else
    for (let r = e.min || 1; r <= e.max; r++)
      e.comma && t !== O && (t = W(
        { type: "Comma", syntax: e },
        t,
        P
      )), t = W(
        n,
        W(
          O,
          O,
          t
        ),
        P
      );
  if (e.min === 0)
    t = W(
      O,
      O,
      t
    );
  else
    for (let r = 0; r < e.min - 1; r++)
      e.comma && t !== O && (t = W(
        { type: "Comma", syntax: e },
        t,
        P
      )), t = W(
        n,
        t,
        P
      );
  return t;
}
function Kn(e) {
  if (typeof e == "function")
    return {
      type: "Generic",
      fn: e
    };
  switch (e.type) {
    case "Group": {
      let t = fn(
        e.combinator,
        e.terms.map(Kn),
        !1
      );
      return e.disallowEmpty && (t = W(
        t,
        Gn,
        P
      )), t;
    }
    case "Multiplier":
      return Za(e);
    case "Type":
    case "Property":
      return {
        type: e.type,
        name: e.name,
        syntax: e
      };
    case "Keyword":
      return {
        type: e.type,
        name: e.name.toLowerCase(),
        syntax: e
      };
    case "AtKeyword":
      return {
        type: e.type,
        name: "@" + e.name.toLowerCase(),
        syntax: e
      };
    case "Function":
      return {
        type: e.type,
        name: e.name.toLowerCase() + "(",
        syntax: e
      };
    case "String":
      return e.value.length === 3 ? {
        type: "Token",
        value: e.value.charAt(1),
        syntax: e
      } : {
        type: e.type,
        value: e.value.substr(1, e.value.length - 2).replace(/\\'/g, "'"),
        syntax: e
      };
    case "Token":
      return {
        type: e.type,
        value: e.value,
        syntax: e
      };
    case "Comma":
      return {
        type: e.type,
        syntax: e
      };
    default:
      throw new Error("Unknown node type:", e.type);
  }
}
function ut(e, t) {
  return typeof e == "string" && (e = Ri(e)), {
    type: "MatchGraph",
    match: Kn(e),
    syntax: t || null,
    source: e
  };
}
const { hasOwnProperty: Lr } = Object.prototype, el = 0, tl = 1, gn = 2, Hi = 3, Pr = "Match", nl = "Mismatch", rl = "Maximum iteration number exceeded (please fill an issue on https://github.com/csstree/csstree/issues)", _r = 15e3;
function il(e) {
  let t = null, n = null, r = e;
  for (; r !== null; )
    n = r.prev, r.prev = t, t = r, r = n;
  return t;
}
function Jt(e, t) {
  if (e.length !== t.length)
    return !1;
  for (let n = 0; n < e.length; n++) {
    const r = t.charCodeAt(n);
    let i = e.charCodeAt(n);
    if (i >= 65 && i <= 90 && (i = i | 32), i !== r)
      return !1;
  }
  return !0;
}
function ol(e) {
  return e.type !== A ? !1 : e.value !== "?";
}
function Ir(e) {
  return e === null ? !0 : e.type === Z || e.type === C || e.type === $ || e.type === te || e.type === H || ol(e);
}
function zr(e) {
  return e === null ? !0 : e.type === x || e.type === ue || e.type === ie || e.type === A && e.value === "/";
}
function sl(e, t, n) {
  function r() {
    do
      y++, E = y < e.length ? e[y] : null;
    while (E !== null && (E.type === j || E.type === q));
  }
  function i(Q) {
    const se = y + Q;
    return se < e.length ? e[se] : null;
  }
  function o(Q, se) {
    return {
      nextState: Q,
      matchStack: S,
      syntaxStack: p,
      thenStack: m,
      tokenIndex: y,
      prev: se
    };
  }
  function s(Q) {
    m = {
      nextState: Q,
      matchStack: S,
      syntaxStack: p,
      prev: m
    };
  }
  function c(Q) {
    g = o(Q, g);
  }
  function l() {
    S = {
      type: tl,
      syntax: t.syntax,
      token: E,
      prev: S
    }, r(), w = null, y > z && (z = y);
  }
  function a() {
    p = {
      syntax: t.syntax,
      opts: t.syntax.opts || p !== null && p.opts || null,
      prev: p
    }, S = {
      type: gn,
      syntax: t.syntax,
      token: S.token,
      prev: S
    };
  }
  function u() {
    S.type === gn ? S = S.prev : S = {
      type: Hi,
      syntax: p.syntax,
      token: S.token,
      prev: S
    }, p = p.prev;
  }
  let p = null, m = null, g = null, w = null, M = 0, L = null, E = null, y = -1, z = 0, S = {
    type: el,
    syntax: null,
    token: null,
    prev: null
  };
  for (r(); L === null && ++M < _r; )
    switch (t.type) {
      case "Match":
        if (m === null) {
          if (E !== null && (y !== e.length - 1 || E.value !== "\\0" && E.value !== "\\9")) {
            t = P;
            break;
          }
          L = Pr;
          break;
        }
        if (t = m.nextState, t === Gn)
          if (m.matchStack === S) {
            t = P;
            break;
          } else
            t = O;
        for (; m.syntaxStack !== p; )
          u();
        m = m.prev;
        break;
      case "Mismatch":
        if (w !== null && w !== !1)
          (g === null || y > g.tokenIndex) && (g = w, w = !1);
        else if (g === null) {
          L = nl;
          break;
        }
        t = g.nextState, m = g.thenStack, p = g.syntaxStack, S = g.matchStack, y = g.tokenIndex, E = y < e.length ? e[y] : null, g = g.prev;
        break;
      case "MatchGraph":
        t = t.match;
        break;
      case "If":
        t.else !== P && c(t.else), t.then !== O && s(t.then), t = t.match;
        break;
      case "MatchOnce":
        t = {
          type: "MatchOnceBuffer",
          syntax: t,
          index: 0,
          mask: 0
        };
        break;
      case "MatchOnceBuffer": {
        const R = t.syntax.terms;
        if (t.index === R.length) {
          if (t.mask === 0 || t.syntax.all) {
            t = P;
            break;
          }
          t = O;
          break;
        }
        if (t.mask === (1 << R.length) - 1) {
          t = O;
          break;
        }
        for (; t.index < R.length; t.index++) {
          const h = 1 << t.index;
          if (!(t.mask & h)) {
            c(t), s({
              type: "AddMatchOnce",
              syntax: t.syntax,
              mask: t.mask | h
            }), t = R[t.index++];
            break;
          }
        }
        break;
      }
      case "AddMatchOnce":
        t = {
          type: "MatchOnceBuffer",
          syntax: t.syntax,
          index: 0,
          mask: t.mask
        };
        break;
      case "Enum":
        if (E !== null) {
          let R = E.value.toLowerCase();
          if (R.indexOf("\\") !== -1 && (R = R.replace(/\\[09].*$/, "")), Lr.call(t.map, R)) {
            t = t.map[R];
            break;
          }
        }
        t = P;
        break;
      case "Generic": {
        const R = p !== null ? p.opts : null, h = y + Math.floor(t.fn(E, i, R));
        if (!isNaN(h) && h > y) {
          for (; y < h; )
            l();
          t = O;
        } else
          t = P;
        break;
      }
      case "Type":
      case "Property": {
        const R = t.type === "Type" ? "types" : "properties", h = Lr.call(n, R) ? n[R][t.name] : null;
        if (!h || !h.match)
          throw new Error(
            "Bad syntax reference: " + (t.type === "Type" ? "<" + t.name + ">" : "<'" + t.name + "'>")
          );
        if (w !== !1 && E !== null && t.type === "Type" && // https://drafts.csswg.org/css-values-4/#custom-idents
        // When parsing positionally-ambiguous keywords in a property value, a <custom-ident> production
        // can only claim the keyword if no other unfulfilled production can claim it.
        (t.name === "custom-ident" && E.type === b || // https://drafts.csswg.org/css-values-4/#lengths
        // ... if a `0` could be parsed as either a <number> or a <length> in a property (such as line-height),
        // it must parse as a <number>
        t.name === "length" && E.value === "0")) {
          w === null && (w = o(t, g)), t = P;
          break;
        }
        a(), t = h.matchRef || h.match;
        break;
      }
      case "Keyword": {
        const R = t.name;
        if (E !== null) {
          let h = E.value;
          if (h.indexOf("\\") !== -1 && (h = h.replace(/\\[09].*$/, "")), Jt(h, R)) {
            l(), t = O;
            break;
          }
        }
        t = P;
        break;
      }
      case "AtKeyword":
      case "Function":
        if (E !== null && Jt(E.value, t.name)) {
          l(), t = O;
          break;
        }
        t = P;
        break;
      case "Token":
        if (E !== null && E.value === t.value) {
          l(), t = O;
          break;
        }
        t = P;
        break;
      case "Comma":
        E !== null && E.type === Z ? Ir(S.token) ? t = P : (l(), t = zr(E) ? P : O) : t = Ir(S.token) || zr(E) ? O : P;
        break;
      case "String":
        let Q = "", se = y;
        for (; se < e.length && Q.length < t.value.length; se++)
          Q += e[se].value;
        if (Jt(Q, t.value)) {
          for (; y < se; )
            l();
          t = O;
        } else
          t = P;
        break;
      default:
        throw new Error("Unknown node type: " + t.type);
    }
  switch (L) {
    case null:
      console.warn("[csstree-match] BREAK after " + _r + " iterations"), L = rl, S = null;
      break;
    case Pr:
      for (; p !== null; )
        u();
      break;
    default:
      S = null;
  }
  return {
    tokens: e,
    reason: L,
    iterations: M,
    match: S,
    longestMatch: z
  };
}
function Mr(e, t, n) {
  const r = sl(e, t, n || {});
  if (r.match === null)
    return r;
  let i = r.match, o = r.match = {
    syntax: t.syntax || null,
    match: []
  };
  const s = [o];
  for (i = il(i).prev; i !== null; ) {
    switch (i.type) {
      case gn:
        o.match.push(o = {
          syntax: i.syntax,
          match: []
        }), s.push(o);
        break;
      case Hi:
        s.pop(), o = s[s.length - 1];
        break;
      default:
        o.match.push({
          syntax: i.syntax || null,
          token: i.token.value,
          node: i.token.node
        });
    }
    i = i.prev;
  }
  return r;
}
function Vi(e) {
  function t(i) {
    return i === null ? !1 : i.type === "Type" || i.type === "Property" || i.type === "Keyword";
  }
  function n(i) {
    if (Array.isArray(i.match)) {
      for (let o = 0; o < i.match.length; o++)
        if (n(i.match[o]))
          return t(i.syntax) && r.unshift(i.syntax), !0;
    } else if (i.node === e)
      return r = t(i.syntax) ? [i.syntax] : [], !0;
    return !1;
  }
  let r = null;
  return this.matched !== null && n(this.matched), r;
}
function al(e, t) {
  return Qn(this, e, (n) => n.type === "Type" && n.name === t);
}
function ll(e, t) {
  return Qn(this, e, (n) => n.type === "Property" && n.name === t);
}
function cl(e) {
  return Qn(this, e, (t) => t.type === "Keyword");
}
function Qn(e, t, n) {
  const r = Vi.call(e, t);
  return r === null ? !1 : r.some(n);
}
const ul = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  getTrace: Vi,
  isKeyword: cl,
  isProperty: ll,
  isType: al
}, Symbol.toStringTag, { value: "Module" }));
function qi(e) {
  return "node" in e ? e.node : qi(e.match[0]);
}
function Wi(e) {
  return "node" in e ? e.node : Wi(e.match[e.match.length - 1]);
}
function Nr(e, t, n, r, i) {
  function o(c) {
    if (c.syntax !== null && c.syntax.type === r && c.syntax.name === i) {
      const l = qi(c), a = Wi(c);
      e.syntax.walk(t, function(u, p, m) {
        if (u === l) {
          const g = new B();
          do {
            if (g.appendData(p.data), p.data === a)
              break;
            p = p.next;
          } while (p !== null);
          s.push({
            parent: m,
            nodes: g
          });
        }
      });
    }
    Array.isArray(c.match) && c.match.forEach(o);
  }
  const s = [];
  return n.matched !== null && o(n.matched), s;
}
const { hasOwnProperty: Qe } = Object.prototype;
function Zt(e) {
  return typeof e == "number" && isFinite(e) && Math.floor(e) === e && e >= 0;
}
function jr(e) {
  return !!e && Zt(e.offset) && Zt(e.line) && Zt(e.column);
}
function hl(e, t) {
  return function(r, i) {
    if (!r || r.constructor !== Object)
      return i(r, "Type of node should be an Object");
    for (let o in r) {
      let s = !0;
      if (Qe.call(r, o) !== !1) {
        if (o === "type")
          r.type !== e && i(r, "Wrong node type `" + r.type + "`, expected `" + e + "`");
        else if (o === "loc") {
          if (r.loc === null)
            continue;
          if (r.loc && r.loc.constructor === Object)
            if (typeof r.loc.source != "string")
              o += ".source";
            else if (!jr(r.loc.start))
              o += ".start";
            else if (!jr(r.loc.end))
              o += ".end";
            else
              continue;
          s = !1;
        } else if (t.hasOwnProperty(o)) {
          s = !1;
          for (let c = 0; !s && c < t[o].length; c++) {
            const l = t[o][c];
            switch (l) {
              case String:
                s = typeof r[o] == "string";
                break;
              case Boolean:
                s = typeof r[o] == "boolean";
                break;
              case null:
                s = r[o] === null;
                break;
              default:
                typeof l == "string" ? s = r[o] && r[o].type === l : Array.isArray(l) && (s = r[o] instanceof B);
            }
          }
        } else
          i(r, "Unknown field `" + o + "` for " + e + " node type");
        s || i(r, "Bad value for `" + e + "." + o + "`");
      }
    }
    for (const o in t)
      Qe.call(t, o) && Qe.call(r, o) === !1 && i(r, "Field `" + e + "." + o + "` is missed");
  };
}
function Ui(e, t) {
  const n = [];
  for (let r = 0; r < e.length; r++) {
    const i = e[r];
    if (i === String || i === Boolean)
      n.push(i.name.toLowerCase());
    else if (i === null)
      n.push("null");
    else if (typeof i == "string")
      n.push(i);
    else if (Array.isArray(i))
      n.push("List<" + (Ui(i, t) || "any") + ">");
    else
      throw new Error("Wrong value `" + i + "` in `" + t + "` structure definition");
  }
  return n.join(" | ");
}
function pl(e, t) {
  const n = t.structure, r = {
    type: String,
    loc: !0
  }, i = {
    type: '"' + e + '"'
  };
  for (const o in n) {
    if (Qe.call(n, o) === !1)
      continue;
    const s = r[o] = Array.isArray(n[o]) ? n[o].slice() : [n[o]];
    i[o] = Ui(s, e + "." + o);
  }
  return {
    docs: i,
    check: hl(e, r)
  };
}
function dl(e) {
  const t = {};
  if (e.node) {
    for (const n in e.node)
      if (Qe.call(e.node, n)) {
        const r = e.node[n];
        if (r.structure)
          t[n] = pl(n, r);
        else
          throw new Error("Missed `structure` field in `" + n + "` node type definition");
      }
  }
  return t;
}
function bn(e, t, n) {
  const r = {};
  for (const i in e)
    e[i].syntax && (r[i] = n ? e[i].syntax : Fn(e[i].syntax, { compact: t }));
  return r;
}
function ml(e, t, n) {
  const r = {};
  for (const [i, o] of Object.entries(e))
    r[i] = {
      prelude: o.prelude && (n ? o.prelude.syntax : Fn(o.prelude.syntax, { compact: t })),
      descriptors: o.descriptors && bn(o.descriptors, t, n)
    };
  return r;
}
function fl(e) {
  for (let t = 0; t < e.length; t++)
    if (e[t].value.toLowerCase() === "var(")
      return !0;
  return !1;
}
function gl(e) {
  const t = e.terms[0];
  return e.explicit === !1 && e.terms.length === 1 && t.type === "Multiplier" && t.comma === !0;
}
function le(e, t, n) {
  return {
    matched: e,
    iterations: n,
    error: t,
    ...ul
  };
}
function _e(e, t, n, r) {
  const i = Ya(n, e.syntax);
  let o;
  return fl(i) ? le(null, new Error("Matching for a tree with var() is not supported")) : (r && (o = Mr(i, e.cssWideKeywordsSyntax, e)), (!r || !o.match) && (o = Mr(i, t.match, e), !o.match) ? le(
    null,
    new Us(o.reason, t.syntax, n, o),
    o.iterations
  ) : le(o.match, null, o.iterations));
}
class Fr {
  constructor(t, n, r) {
    if (this.cssWideKeywords = Rn, this.syntax = n, this.generic = !1, this.units = { ...wr }, this.atrules = /* @__PURE__ */ Object.create(null), this.properties = /* @__PURE__ */ Object.create(null), this.types = /* @__PURE__ */ Object.create(null), this.structure = r || dl(t), t) {
      if (t.cssWideKeywords && (this.cssWideKeywords = t.cssWideKeywords), t.units)
        for (const i of Object.keys(wr))
          Array.isArray(t.units[i]) && (this.units[i] = t.units[i]);
      if (t.types)
        for (const [i, o] of Object.entries(t.types))
          this.addType_(i, o);
      if (t.generic) {
        this.generic = !0;
        for (const [i, o] of Object.entries(fa(this.units)))
          this.addType_(i, o);
      }
      if (t.atrules)
        for (const [i, o] of Object.entries(t.atrules))
          this.addAtrule_(i, o);
      if (t.properties)
        for (const [i, o] of Object.entries(t.properties))
          this.addProperty_(i, o);
    }
    this.cssWideKeywordsSyntax = ut(this.cssWideKeywords.join(" |  "));
  }
  checkStructure(t) {
    function n(o, s) {
      i.push({ node: o, message: s });
    }
    const r = this.structure, i = [];
    return this.syntax.walk(t, function(o) {
      r.hasOwnProperty(o.type) ? r[o.type].check(o, n) : n(o, "Unknown node type `" + o.type + "`");
    }), i.length ? i : !1;
  }
  createDescriptor(t, n, r, i = null) {
    const o = {
      type: n,
      name: r
    }, s = {
      type: n,
      name: r,
      parent: i,
      serializable: typeof t == "string" || t && typeof t.type == "string",
      syntax: null,
      match: null,
      matchRef: null
      // used for properties when a syntax referenced as <'property'> in other syntax definitions
    };
    return typeof t == "function" ? s.match = ut(t, o) : (typeof t == "string" ? Object.defineProperty(s, "syntax", {
      get() {
        return Object.defineProperty(s, "syntax", {
          value: Ri(t)
        }), s.syntax;
      }
    }) : s.syntax = t, Object.defineProperty(s, "match", {
      get() {
        return Object.defineProperty(s, "match", {
          value: ut(s.syntax, o)
        }), s.match;
      }
    }), n === "Property" && Object.defineProperty(s, "matchRef", {
      get() {
        const c = s.syntax, l = gl(c) ? ut({
          ...c,
          terms: [c.terms[0].term]
        }, o) : null;
        return Object.defineProperty(s, "matchRef", {
          value: l
        }), l;
      }
    })), s;
  }
  addAtrule_(t, n) {
    n && (this.atrules[t] = {
      type: "Atrule",
      name: t,
      prelude: n.prelude ? this.createDescriptor(n.prelude, "AtrulePrelude", t) : null,
      descriptors: n.descriptors ? Object.keys(n.descriptors).reduce(
        (r, i) => (r[i] = this.createDescriptor(n.descriptors[i], "AtruleDescriptor", i, t), r),
        /* @__PURE__ */ Object.create(null)
      ) : null
    });
  }
  addProperty_(t, n) {
    n && (this.properties[t] = this.createDescriptor(n, "Property", t));
  }
  addType_(t, n) {
    n && (this.types[t] = this.createDescriptor(n, "Type", t));
  }
  checkAtruleName(t) {
    if (!this.getAtrule(t))
      return new He("Unknown at-rule", "@" + t);
  }
  checkAtrulePrelude(t, n) {
    const r = this.checkAtruleName(t);
    if (r)
      return r;
    const i = this.getAtrule(t);
    if (!i.prelude && n)
      return new SyntaxError("At-rule `@" + t + "` should not contain a prelude");
    if (i.prelude && !n && !_e(this, i.prelude, "", !1).matched)
      return new SyntaxError("At-rule `@" + t + "` should contain a prelude");
  }
  checkAtruleDescriptorName(t, n) {
    const r = this.checkAtruleName(t);
    if (r)
      return r;
    const i = this.getAtrule(t), o = Kt(n);
    if (!i.descriptors)
      return new SyntaxError("At-rule `@" + t + "` has no known descriptors");
    if (!i.descriptors[o.name] && !i.descriptors[o.basename])
      return new He("Unknown at-rule descriptor", n);
  }
  checkPropertyName(t) {
    if (!this.getProperty(t))
      return new He("Unknown property", t);
  }
  matchAtrulePrelude(t, n) {
    const r = this.checkAtrulePrelude(t, n);
    if (r)
      return le(null, r);
    const i = this.getAtrule(t);
    return i.prelude ? _e(this, i.prelude, n || "", !1) : le(null, null);
  }
  matchAtruleDescriptor(t, n, r) {
    const i = this.checkAtruleDescriptorName(t, n);
    if (i)
      return le(null, i);
    const o = this.getAtrule(t), s = Kt(n);
    return _e(this, o.descriptors[s.name] || o.descriptors[s.basename], r, !1);
  }
  matchDeclaration(t) {
    return t.type !== "Declaration" ? le(null, new Error("Not a Declaration node")) : this.matchProperty(t.property, t.value);
  }
  matchProperty(t, n) {
    if (kr(t).custom)
      return le(null, new Error("Lexer matching doesn't applicable for custom properties"));
    const r = this.checkPropertyName(t);
    return r ? le(null, r) : _e(this, this.getProperty(t), n, !0);
  }
  matchType(t, n) {
    const r = this.getType(t);
    return r ? _e(this, r, n, !1) : le(null, new He("Unknown type", t));
  }
  match(t, n) {
    return typeof t != "string" && (!t || !t.type) ? le(null, new He("Bad syntax")) : ((typeof t == "string" || !t.match) && (t = this.createDescriptor(t, "Type", "anonymous")), _e(this, t, n, !1));
  }
  findValueFragments(t, n, r, i) {
    return Nr(this, n, this.matchProperty(t, n), r, i);
  }
  findDeclarationValueFragments(t, n, r) {
    return Nr(this, t.value, this.matchDeclaration(t), n, r);
  }
  findAllFragments(t, n, r) {
    const i = [];
    return this.syntax.walk(t, {
      visit: "Declaration",
      enter: (o) => {
        i.push.apply(i, this.findDeclarationValueFragments(o, n, r));
      }
    }), i;
  }
  getAtrule(t, n = !0) {
    const r = Kt(t);
    return (r.vendor && n ? this.atrules[r.name] || this.atrules[r.basename] : this.atrules[r.name]) || null;
  }
  getAtrulePrelude(t, n = !0) {
    const r = this.getAtrule(t, n);
    return r && r.prelude || null;
  }
  getAtruleDescriptor(t, n) {
    return this.atrules.hasOwnProperty(t) && this.atrules.declarators && this.atrules[t].declarators[n] || null;
  }
  getProperty(t, n = !0) {
    const r = kr(t);
    return (r.vendor && n ? this.properties[r.name] || this.properties[r.basename] : this.properties[r.name]) || null;
  }
  getType(t) {
    return hasOwnProperty.call(this.types, t) ? this.types[t] : null;
  }
  validate() {
    function t(l, a) {
      return a ? `<${l}>` : `<'${l}'>`;
    }
    function n(l, a, u, p) {
      if (u.has(a))
        return u.get(a);
      u.set(a, !1), p.syntax !== null && Ga(p.syntax, function(m) {
        if (m.type !== "Type" && m.type !== "Property")
          return;
        const g = m.type === "Type" ? l.types : l.properties, w = m.type === "Type" ? i : o;
        hasOwnProperty.call(g, m.name) ? n(l, m.name, w, g[m.name]) && (r.push(`${t(a, u === i)} used broken syntax definition ${t(m.name, m.type === "Type")}`), u.set(a, !0)) : (r.push(`${t(a, u === i)} used missed syntax definition ${t(m.name, m.type === "Type")}`), u.set(a, !0));
      }, this);
    }
    const r = [];
    let i = /* @__PURE__ */ new Map(), o = /* @__PURE__ */ new Map();
    for (const l in this.types)
      n(this, l, i, this.types[l]);
    for (const l in this.properties)
      n(this, l, o, this.properties[l]);
    const s = [...i.keys()].filter((l) => i.get(l)), c = [...o.keys()].filter((l) => o.get(l));
    return s.length || c.length ? {
      errors: r,
      types: s,
      properties: c
    } : null;
  }
  dump(t, n) {
    return {
      generic: this.generic,
      cssWideKeywords: this.cssWideKeywords,
      units: this.units,
      types: bn(this.types, !n, t),
      properties: bn(this.properties, !n, t),
      atrules: ml(this.atrules, !n, t)
    };
  }
  toString() {
    return JSON.stringify(this.dump());
  }
}
function en(e, t) {
  return typeof t == "string" && /^\s*\|/.test(t) ? typeof e == "string" ? e + t : t.replace(/^\s*\|\s*/, "") : t || null;
}
function Dr(e, t) {
  const n = /* @__PURE__ */ Object.create(null);
  for (const [r, i] of Object.entries(e))
    if (i) {
      n[r] = {};
      for (const o of Object.keys(i))
        t.includes(o) && (n[r][o] = i[o]);
    }
  return n;
}
function yn(e, t) {
  const n = { ...e };
  for (const [r, i] of Object.entries(t))
    switch (r) {
      case "generic":
        n[r] = !!i;
        break;
      case "cssWideKeywords":
        n[r] = e[r] ? [...e[r], ...i] : i || [];
        break;
      case "units":
        n[r] = { ...e[r] };
        for (const [o, s] of Object.entries(i))
          n[r][o] = Array.isArray(s) ? s : [];
        break;
      case "atrules":
        n[r] = { ...e[r] };
        for (const [o, s] of Object.entries(i)) {
          const c = n[r][o] || {}, l = n[r][o] = {
            prelude: c.prelude || null,
            descriptors: {
              ...c.descriptors
            }
          };
          if (s) {
            l.prelude = s.prelude ? en(l.prelude, s.prelude) : l.prelude || null;
            for (const [a, u] of Object.entries(s.descriptors || {}))
              l.descriptors[a] = u ? en(l.descriptors[a], u) : null;
            Object.keys(l.descriptors).length || (l.descriptors = null);
          }
        }
        break;
      case "types":
      case "properties":
        n[r] = { ...e[r] };
        for (const [o, s] of Object.entries(i))
          n[r][o] = en(n[r][o], s);
        break;
      case "scope":
      case "features":
        n[r] = { ...e[r] };
        for (const [o, s] of Object.entries(i))
          n[r][o] = { ...n[r][o], ...s };
        break;
      case "parseContext":
        n[r] = {
          ...e[r],
          ...i
        };
        break;
      case "atrule":
      case "pseudo":
        n[r] = {
          ...e[r],
          ...Dr(i, ["parse"])
        };
        break;
      case "node":
        n[r] = {
          ...e[r],
          ...Dr(i, ["name", "structure", "parse", "generate", "walkContext"])
        };
        break;
    }
  return n;
}
function Gi(e) {
  const t = vs(e), n = Rs(e), r = Ns(e), { fromPlainObject: i, toPlainObject: o } = js(n), s = {
    lexer: null,
    createLexer: (c) => new Fr(c, s, s.lexer.structure),
    tokenize: It,
    parse: t,
    generate: r,
    walk: n,
    find: n.find,
    findLast: n.findLast,
    findAll: n.findAll,
    fromPlainObject: i,
    toPlainObject: o,
    fork(c) {
      const l = yn({}, e);
      return Gi(
        typeof c == "function" ? c(l) : yn(l, c)
      );
    }
  };
  return s.lexer = new Fr({
    generic: e.generic,
    cssWideKeywords: e.cssWideKeywords,
    units: e.units,
    types: e.types,
    atrules: e.atrules,
    properties: e.properties,
    node: e.node
  }, s), s;
}
const bl = (e) => Gi(yn({}, e)), yl = {
  generic: !0,
  cssWideKeywords: [
    "initial",
    "inherit",
    "unset",
    "revert",
    "revert-layer"
  ],
  units: {
    angle: [
      "deg",
      "grad",
      "rad",
      "turn"
    ],
    decibel: [
      "db"
    ],
    flex: [
      "fr"
    ],
    frequency: [
      "hz",
      "khz"
    ],
    length: [
      "cm",
      "mm",
      "q",
      "in",
      "pt",
      "pc",
      "px",
      "em",
      "rem",
      "ex",
      "rex",
      "cap",
      "rcap",
      "ch",
      "rch",
      "ic",
      "ric",
      "lh",
      "rlh",
      "vw",
      "svw",
      "lvw",
      "dvw",
      "vh",
      "svh",
      "lvh",
      "dvh",
      "vi",
      "svi",
      "lvi",
      "dvi",
      "vb",
      "svb",
      "lvb",
      "dvb",
      "vmin",
      "svmin",
      "lvmin",
      "dvmin",
      "vmax",
      "svmax",
      "lvmax",
      "dvmax",
      "cqw",
      "cqh",
      "cqi",
      "cqb",
      "cqmin",
      "cqmax"
    ],
    resolution: [
      "dpi",
      "dpcm",
      "dppx",
      "x"
    ],
    semitones: [
      "st"
    ],
    time: [
      "s",
      "ms"
    ]
  },
  types: {
    "abs()": "abs( <calc-sum> )",
    "absolute-size": "xx-small|x-small|small|medium|large|x-large|xx-large|xxx-large",
    "acos()": "acos( <calc-sum> )",
    "alpha-value": "<number>|<percentage>",
    "angle-percentage": "<angle>|<percentage>",
    "angular-color-hint": "<angle-percentage>",
    "angular-color-stop": "<color>&&<color-stop-angle>?",
    "angular-color-stop-list": "[<angular-color-stop> [, <angular-color-hint>]?]# , <angular-color-stop>",
    "animateable-feature": "scroll-position|contents|<custom-ident>",
    "asin()": "asin( <calc-sum> )",
    "atan()": "atan( <calc-sum> )",
    "atan2()": "atan2( <calc-sum> , <calc-sum> )",
    attachment: "scroll|fixed|local",
    "attr()": "attr( <attr-name> <type-or-unit>? [, <attr-fallback>]? )",
    "attr-matcher": "['~'|'|'|'^'|'$'|'*']? '='",
    "attr-modifier": "i|s",
    "attribute-selector": "'[' <wq-name> ']'|'[' <wq-name> <attr-matcher> [<string-token>|<ident-token>] <attr-modifier>? ']'",
    "auto-repeat": "repeat( [auto-fill|auto-fit] , [<line-names>? <fixed-size>]+ <line-names>? )",
    "auto-track-list": "[<line-names>? [<fixed-size>|<fixed-repeat>]]* <line-names>? <auto-repeat> [<line-names>? [<fixed-size>|<fixed-repeat>]]* <line-names>?",
    axis: "block|inline|vertical|horizontal",
    "baseline-position": "[first|last]? baseline",
    "basic-shape": "<inset()>|<xywh()>|<rect()>|<circle()>|<ellipse()>|<polygon()>|<path()>",
    "bg-image": "none|<image>",
    "bg-layer": "<bg-image>||<bg-position> [/ <bg-size>]?||<repeat-style>||<attachment>||<box>||<box>",
    "bg-position": "[[left|center|right|top|bottom|<length-percentage>]|[left|center|right|<length-percentage>] [top|center|bottom|<length-percentage>]|[center|[left|right] <length-percentage>?]&&[center|[top|bottom] <length-percentage>?]]",
    "bg-size": "[<length-percentage>|auto]{1,2}|cover|contain",
    "blur()": "blur( <length> )",
    "blend-mode": "normal|multiply|screen|overlay|darken|lighten|color-dodge|color-burn|hard-light|soft-light|difference|exclusion|hue|saturation|color|luminosity",
    box: "border-box|padding-box|content-box",
    "brightness()": "brightness( <number-percentage> )",
    "calc()": "calc( <calc-sum> )",
    "calc-sum": "<calc-product> [['+'|'-'] <calc-product>]*",
    "calc-product": "<calc-value> ['*' <calc-value>|'/' <number>]*",
    "calc-value": "<number>|<dimension>|<percentage>|<calc-constant>|( <calc-sum> )",
    "calc-constant": "e|pi|infinity|-infinity|NaN",
    "cf-final-image": "<image>|<color>",
    "cf-mixing-image": "<percentage>?&&<image>",
    "circle()": "circle( [<shape-radius>]? [at <position>]? )",
    "clamp()": "clamp( <calc-sum>#{3} )",
    "class-selector": "'.' <ident-token>",
    "clip-source": "<url>",
    color: "<color-base>|currentColor|<system-color>|<device-cmyk()>|<light-dark()>|<-non-standard-color>",
    "color-stop": "<color-stop-length>|<color-stop-angle>",
    "color-stop-angle": "<angle-percentage>{1,2}",
    "color-stop-length": "<length-percentage>{1,2}",
    "color-stop-list": "[<linear-color-stop> [, <linear-color-hint>]?]# , <linear-color-stop>",
    "color-interpolation-method": "in [<rectangular-color-space>|<polar-color-space> <hue-interpolation-method>?|<custom-color-space>]",
    combinator: "'>'|'+'|'~'|['|' '|']",
    "common-lig-values": "[common-ligatures|no-common-ligatures]",
    "compat-auto": "searchfield|textarea|push-button|slider-horizontal|checkbox|radio|square-button|menulist|listbox|meter|progress-bar|button",
    "composite-style": "clear|copy|source-over|source-in|source-out|source-atop|destination-over|destination-in|destination-out|destination-atop|xor",
    "compositing-operator": "add|subtract|intersect|exclude",
    "compound-selector": "[<type-selector>? <subclass-selector>*]!",
    "compound-selector-list": "<compound-selector>#",
    "complex-selector": "<complex-selector-unit> [<combinator>? <complex-selector-unit>]*",
    "complex-selector-list": "<complex-selector>#",
    "conic-gradient()": "conic-gradient( [from <angle>]? [at <position>]? , <angular-color-stop-list> )",
    "contextual-alt-values": "[contextual|no-contextual]",
    "content-distribution": "space-between|space-around|space-evenly|stretch",
    "content-list": "[<string>|contents|<image>|<counter>|<quote>|<target>|<leader()>|<attr()>]+",
    "content-position": "center|start|end|flex-start|flex-end",
    "content-replacement": "<image>",
    "contrast()": "contrast( [<number-percentage>] )",
    "cos()": "cos( <calc-sum> )",
    counter: "<counter()>|<counters()>",
    "counter()": "counter( <counter-name> , <counter-style>? )",
    "counter-name": "<custom-ident>",
    "counter-style": "<counter-style-name>|symbols( )",
    "counter-style-name": "<custom-ident>",
    "counters()": "counters( <counter-name> , <string> , <counter-style>? )",
    "cross-fade()": "cross-fade( <cf-mixing-image> , <cf-final-image>? )",
    "cubic-bezier-timing-function": "ease|ease-in|ease-out|ease-in-out|cubic-bezier( <number [0,1]> , <number> , <number [0,1]> , <number> )",
    "deprecated-system-color": "ActiveBorder|ActiveCaption|AppWorkspace|Background|ButtonFace|ButtonHighlight|ButtonShadow|ButtonText|CaptionText|GrayText|Highlight|HighlightText|InactiveBorder|InactiveCaption|InactiveCaptionText|InfoBackground|InfoText|Menu|MenuText|Scrollbar|ThreeDDarkShadow|ThreeDFace|ThreeDHighlight|ThreeDLightShadow|ThreeDShadow|Window|WindowFrame|WindowText",
    "discretionary-lig-values": "[discretionary-ligatures|no-discretionary-ligatures]",
    "display-box": "contents|none",
    "display-inside": "flow|flow-root|table|flex|grid|ruby",
    "display-internal": "table-row-group|table-header-group|table-footer-group|table-row|table-cell|table-column-group|table-column|table-caption|ruby-base|ruby-text|ruby-base-container|ruby-text-container",
    "display-legacy": "inline-block|inline-list-item|inline-table|inline-flex|inline-grid",
    "display-listitem": "<display-outside>?&&[flow|flow-root]?&&list-item",
    "display-outside": "block|inline|run-in",
    "drop-shadow()": "drop-shadow( <length>{2,3} <color>? )",
    "east-asian-variant-values": "[jis78|jis83|jis90|jis04|simplified|traditional]",
    "east-asian-width-values": "[full-width|proportional-width]",
    "element()": "element( <custom-ident> , [first|start|last|first-except]? )|element( <id-selector> )",
    "ellipse()": "ellipse( [<shape-radius>{2}]? [at <position>]? )",
    "ending-shape": "circle|ellipse",
    "env()": "env( <custom-ident> , <declaration-value>? )",
    "exp()": "exp( <calc-sum> )",
    "explicit-track-list": "[<line-names>? <track-size>]+ <line-names>?",
    "family-name": "<string>|<custom-ident>+",
    "feature-tag-value": "<string> [<integer>|on|off]?",
    "feature-type": "@stylistic|@historical-forms|@styleset|@character-variant|@swash|@ornaments|@annotation",
    "feature-value-block": "<feature-type> '{' <feature-value-declaration-list> '}'",
    "feature-value-block-list": "<feature-value-block>+",
    "feature-value-declaration": "<custom-ident> : <integer>+ ;",
    "feature-value-declaration-list": "<feature-value-declaration>",
    "feature-value-name": "<custom-ident>",
    "fill-rule": "nonzero|evenodd",
    "filter-function": "<blur()>|<brightness()>|<contrast()>|<drop-shadow()>|<grayscale()>|<hue-rotate()>|<invert()>|<opacity()>|<saturate()>|<sepia()>",
    "filter-function-list": "[<filter-function>|<url>]+",
    "final-bg-layer": "<'background-color'>||<bg-image>||<bg-position> [/ <bg-size>]?||<repeat-style>||<attachment>||<box>||<box>",
    "fixed-breadth": "<length-percentage>",
    "fixed-repeat": "repeat( [<integer [1,∞]>] , [<line-names>? <fixed-size>]+ <line-names>? )",
    "fixed-size": "<fixed-breadth>|minmax( <fixed-breadth> , <track-breadth> )|minmax( <inflexible-breadth> , <fixed-breadth> )",
    "font-stretch-absolute": "normal|ultra-condensed|extra-condensed|condensed|semi-condensed|semi-expanded|expanded|extra-expanded|ultra-expanded|<percentage>",
    "font-variant-css21": "[normal|small-caps]",
    "font-weight-absolute": "normal|bold|<number [1,1000]>",
    "frequency-percentage": "<frequency>|<percentage>",
    "general-enclosed": "[<function-token> <any-value>? )]|[( <any-value>? )]",
    "generic-family": "<generic-script-specific>|<generic-complete>|<generic-incomplete>|<-non-standard-generic-family>",
    "generic-name": "serif|sans-serif|cursive|fantasy|monospace",
    "geometry-box": "<shape-box>|fill-box|stroke-box|view-box",
    gradient: "<linear-gradient()>|<repeating-linear-gradient()>|<radial-gradient()>|<repeating-radial-gradient()>|<conic-gradient()>|<repeating-conic-gradient()>|<-legacy-gradient>",
    "grayscale()": "grayscale( <number-percentage> )",
    "grid-line": "auto|<custom-ident>|[<integer>&&<custom-ident>?]|[span&&[<integer>||<custom-ident>]]",
    "historical-lig-values": "[historical-ligatures|no-historical-ligatures]",
    "hsl()": "hsl( <hue> <percentage> <percentage> [/ <alpha-value>]? )|hsl( <hue> , <percentage> , <percentage> , <alpha-value>? )",
    "hsla()": "hsla( <hue> <percentage> <percentage> [/ <alpha-value>]? )|hsla( <hue> , <percentage> , <percentage> , <alpha-value>? )",
    hue: "<number>|<angle>",
    "hue-rotate()": "hue-rotate( <angle> )",
    "hue-interpolation-method": "[shorter|longer|increasing|decreasing] hue",
    "hwb()": "hwb( [<hue>|none] [<percentage>|none] [<percentage>|none] [/ [<alpha-value>|none]]? )",
    "hypot()": "hypot( <calc-sum># )",
    image: "<url>|<image()>|<image-set()>|<element()>|<paint()>|<cross-fade()>|<gradient>",
    "image()": "image( <image-tags>? [<image-src>? , <color>?]! )",
    "image-set()": "image-set( <image-set-option># )",
    "image-set-option": "[<image>|<string>] [<resolution>||type( <string> )]",
    "image-src": "<url>|<string>",
    "image-tags": "ltr|rtl",
    "inflexible-breadth": "<length-percentage>|min-content|max-content|auto",
    "inset()": "inset( <length-percentage>{1,4} [round <'border-radius'>]? )",
    "invert()": "invert( <number-percentage> )",
    "keyframes-name": "<custom-ident>|<string>",
    "keyframe-block": "<keyframe-selector># { <declaration-list> }",
    "keyframe-block-list": "<keyframe-block>+",
    "keyframe-selector": "from|to|<percentage>|<timeline-range-name> <percentage>",
    "lab()": "lab( [<percentage>|<number>|none] [<percentage>|<number>|none] [<percentage>|<number>|none] [/ [<alpha-value>|none]]? )",
    "layer()": "layer( <layer-name> )",
    "layer-name": "<ident> ['.' <ident>]*",
    "lch()": "lch( [<percentage>|<number>|none] [<percentage>|<number>|none] [<hue>|none] [/ [<alpha-value>|none]]? )",
    "leader()": "leader( <leader-type> )",
    "leader-type": "dotted|solid|space|<string>",
    "length-percentage": "<length>|<percentage>",
    "light-dark()": "light-dark( <color> , <color> )",
    "line-names": "'[' <custom-ident>* ']'",
    "line-name-list": "[<line-names>|<name-repeat>]+",
    "line-style": "none|hidden|dotted|dashed|solid|double|groove|ridge|inset|outset",
    "line-width": "<length>|thin|medium|thick",
    "linear-color-hint": "<length-percentage>",
    "linear-color-stop": "<color> <color-stop-length>?",
    "linear-gradient()": "linear-gradient( [[<angle>|to <side-or-corner>]||<color-interpolation-method>]? , <color-stop-list> )",
    "log()": "log( <calc-sum> , <calc-sum>? )",
    "mask-layer": "<mask-reference>||<position> [/ <bg-size>]?||<repeat-style>||<geometry-box>||[<geometry-box>|no-clip]||<compositing-operator>||<masking-mode>",
    "mask-position": "[<length-percentage>|left|center|right] [<length-percentage>|top|center|bottom]?",
    "mask-reference": "none|<image>|<mask-source>",
    "mask-source": "<url>",
    "masking-mode": "alpha|luminance|match-source",
    "matrix()": "matrix( <number>#{6} )",
    "matrix3d()": "matrix3d( <number>#{16} )",
    "max()": "max( <calc-sum># )",
    "media-and": "<media-in-parens> [and <media-in-parens>]+",
    "media-condition": "<media-not>|<media-and>|<media-or>|<media-in-parens>",
    "media-condition-without-or": "<media-not>|<media-and>|<media-in-parens>",
    "media-feature": "( [<mf-plain>|<mf-boolean>|<mf-range>] )",
    "media-in-parens": "( <media-condition> )|<media-feature>|<general-enclosed>",
    "media-not": "not <media-in-parens>",
    "media-or": "<media-in-parens> [or <media-in-parens>]+",
    "media-query": "<media-condition>|[not|only]? <media-type> [and <media-condition-without-or>]?",
    "media-query-list": "<media-query>#",
    "media-type": "<ident>",
    "mf-boolean": "<mf-name>",
    "mf-name": "<ident>",
    "mf-plain": "<mf-name> : <mf-value>",
    "mf-range": "<mf-name> ['<'|'>']? '='? <mf-value>|<mf-value> ['<'|'>']? '='? <mf-name>|<mf-value> '<' '='? <mf-name> '<' '='? <mf-value>|<mf-value> '>' '='? <mf-name> '>' '='? <mf-value>",
    "mf-value": "<number>|<dimension>|<ident>|<ratio>",
    "min()": "min( <calc-sum># )",
    "minmax()": "minmax( [<length-percentage>|min-content|max-content|auto] , [<length-percentage>|<flex>|min-content|max-content|auto] )",
    "mod()": "mod( <calc-sum> , <calc-sum> )",
    "name-repeat": "repeat( [<integer [1,∞]>|auto-fill] , <line-names>+ )",
    "named-color": "transparent|aliceblue|antiquewhite|aqua|aquamarine|azure|beige|bisque|black|blanchedalmond|blue|blueviolet|brown|burlywood|cadetblue|chartreuse|chocolate|coral|cornflowerblue|cornsilk|crimson|cyan|darkblue|darkcyan|darkgoldenrod|darkgray|darkgreen|darkgrey|darkkhaki|darkmagenta|darkolivegreen|darkorange|darkorchid|darkred|darksalmon|darkseagreen|darkslateblue|darkslategray|darkslategrey|darkturquoise|darkviolet|deeppink|deepskyblue|dimgray|dimgrey|dodgerblue|firebrick|floralwhite|forestgreen|fuchsia|gainsboro|ghostwhite|gold|goldenrod|gray|green|greenyellow|grey|honeydew|hotpink|indianred|indigo|ivory|khaki|lavender|lavenderblush|lawngreen|lemonchiffon|lightblue|lightcoral|lightcyan|lightgoldenrodyellow|lightgray|lightgreen|lightgrey|lightpink|lightsalmon|lightseagreen|lightskyblue|lightslategray|lightslategrey|lightsteelblue|lightyellow|lime|limegreen|linen|magenta|maroon|mediumaquamarine|mediumblue|mediumorchid|mediumpurple|mediumseagreen|mediumslateblue|mediumspringgreen|mediumturquoise|mediumvioletred|midnightblue|mintcream|mistyrose|moccasin|navajowhite|navy|oldlace|olive|olivedrab|orange|orangered|orchid|palegoldenrod|palegreen|paleturquoise|palevioletred|papayawhip|peachpuff|peru|pink|plum|powderblue|purple|rebeccapurple|red|rosybrown|royalblue|saddlebrown|salmon|sandybrown|seagreen|seashell|sienna|silver|skyblue|slateblue|slategray|slategrey|snow|springgreen|steelblue|tan|teal|thistle|tomato|turquoise|violet|wheat|white|whitesmoke|yellow|yellowgreen",
    "namespace-prefix": "<ident>",
    "ns-prefix": "[<ident-token>|'*']? '|'",
    "number-percentage": "<number>|<percentage>",
    "numeric-figure-values": "[lining-nums|oldstyle-nums]",
    "numeric-fraction-values": "[diagonal-fractions|stacked-fractions]",
    "numeric-spacing-values": "[proportional-nums|tabular-nums]",
    nth: "<an-plus-b>|even|odd",
    "opacity()": "opacity( [<number-percentage>] )",
    "overflow-position": "unsafe|safe",
    "outline-radius": "<length>|<percentage>",
    "page-body": "<declaration>? [; <page-body>]?|<page-margin-box> <page-body>",
    "page-margin-box": "<page-margin-box-type> '{' <declaration-list> '}'",
    "page-margin-box-type": "@top-left-corner|@top-left|@top-center|@top-right|@top-right-corner|@bottom-left-corner|@bottom-left|@bottom-center|@bottom-right|@bottom-right-corner|@left-top|@left-middle|@left-bottom|@right-top|@right-middle|@right-bottom",
    "page-selector-list": "[<page-selector>#]?",
    "page-selector": "<pseudo-page>+|<ident> <pseudo-page>*",
    "page-size": "A5|A4|A3|B5|B4|JIS-B5|JIS-B4|letter|legal|ledger",
    "path()": "path( [<fill-rule> ,]? <string> )",
    "paint()": "paint( <ident> , <declaration-value>? )",
    "perspective()": "perspective( [<length [0,∞]>|none] )",
    "polygon()": "polygon( <fill-rule>? , [<length-percentage> <length-percentage>]# )",
    "polar-color-space": "hsl|hwb|lch|oklch",
    position: "[[left|center|right]||[top|center|bottom]|[left|center|right|<length-percentage>] [top|center|bottom|<length-percentage>]?|[[left|right] <length-percentage>]&&[[top|bottom] <length-percentage>]]",
    "pow()": "pow( <calc-sum> , <calc-sum> )",
    "pseudo-class-selector": "':' <ident-token>|':' <function-token> <any-value> ')'",
    "pseudo-element-selector": "':' <pseudo-class-selector>|<legacy-pseudo-element-selector>",
    "pseudo-page": ": [left|right|first|blank]",
    quote: "open-quote|close-quote|no-open-quote|no-close-quote",
    "radial-gradient()": "radial-gradient( [<ending-shape>||<size>]? [at <position>]? , <color-stop-list> )",
    ratio: "<number [0,∞]> [/ <number [0,∞]>]?",
    "ray()": "ray( <angle>&&<ray-size>?&&contain?&&[at <position>]? )",
    "ray-size": "closest-side|closest-corner|farthest-side|farthest-corner|sides",
    "rectangular-color-space": "srgb|srgb-linear|display-p3|a98-rgb|prophoto-rgb|rec2020|lab|oklab|xyz|xyz-d50|xyz-d65",
    "relative-selector": "<combinator>? <complex-selector>",
    "relative-selector-list": "<relative-selector>#",
    "relative-size": "larger|smaller",
    "rem()": "rem( <calc-sum> , <calc-sum> )",
    "repeat-style": "repeat-x|repeat-y|[repeat|space|round|no-repeat]{1,2}",
    "repeating-conic-gradient()": "repeating-conic-gradient( [from <angle>]? [at <position>]? , <angular-color-stop-list> )",
    "repeating-linear-gradient()": "repeating-linear-gradient( [<angle>|to <side-or-corner>]? , <color-stop-list> )",
    "repeating-radial-gradient()": "repeating-radial-gradient( [<ending-shape>||<size>]? [at <position>]? , <color-stop-list> )",
    "reversed-counter-name": "reversed( <counter-name> )",
    "rgb()": "rgb( <percentage>{3} [/ <alpha-value>]? )|rgb( <number>{3} [/ <alpha-value>]? )|rgb( <percentage>#{3} , <alpha-value>? )|rgb( <number>#{3} , <alpha-value>? )",
    "rgba()": "rgba( <percentage>{3} [/ <alpha-value>]? )|rgba( <number>{3} [/ <alpha-value>]? )|rgba( <percentage>#{3} , <alpha-value>? )|rgba( <number>#{3} , <alpha-value>? )",
    "rotate()": "rotate( [<angle>|<zero>] )",
    "rotate3d()": "rotate3d( <number> , <number> , <number> , [<angle>|<zero>] )",
    "rotateX()": "rotateX( [<angle>|<zero>] )",
    "rotateY()": "rotateY( [<angle>|<zero>] )",
    "rotateZ()": "rotateZ( [<angle>|<zero>] )",
    "round()": "round( <rounding-strategy>? , <calc-sum> , <calc-sum> )",
    "rounding-strategy": "nearest|up|down|to-zero",
    "saturate()": "saturate( <number-percentage> )",
    "scale()": "scale( [<number>|<percentage>]#{1,2} )",
    "scale3d()": "scale3d( [<number>|<percentage>]#{3} )",
    "scaleX()": "scaleX( [<number>|<percentage>] )",
    "scaleY()": "scaleY( [<number>|<percentage>] )",
    "scaleZ()": "scaleZ( [<number>|<percentage>] )",
    "scroll()": "scroll( [<axis>||<scroller>]? )",
    scroller: "root|nearest",
    "self-position": "center|start|end|self-start|self-end|flex-start|flex-end",
    "shape-radius": "<length-percentage>|closest-side|farthest-side",
    "sign()": "sign( <calc-sum> )",
    "skew()": "skew( [<angle>|<zero>] , [<angle>|<zero>]? )",
    "skewX()": "skewX( [<angle>|<zero>] )",
    "skewY()": "skewY( [<angle>|<zero>] )",
    "sepia()": "sepia( <number-percentage> )",
    shadow: "inset?&&<length>{2,4}&&<color>?",
    "shadow-t": "[<length>{2,3}&&<color>?]",
    shape: "rect( <top> , <right> , <bottom> , <left> )|rect( <top> <right> <bottom> <left> )",
    "shape-box": "<box>|margin-box",
    "side-or-corner": "[left|right]||[top|bottom]",
    "sin()": "sin( <calc-sum> )",
    "single-animation": "<'animation-duration'>||<easing-function>||<'animation-delay'>||<single-animation-iteration-count>||<single-animation-direction>||<single-animation-fill-mode>||<single-animation-play-state>||[none|<keyframes-name>]||<single-animation-timeline>",
    "single-animation-direction": "normal|reverse|alternate|alternate-reverse",
    "single-animation-fill-mode": "none|forwards|backwards|both",
    "single-animation-iteration-count": "infinite|<number>",
    "single-animation-play-state": "running|paused",
    "single-animation-timeline": "auto|none|<dashed-ident>|<scroll()>|<view()>",
    "single-transition": "[none|<single-transition-property>]||<time>||<easing-function>||<time>||<transition-behavior-value>",
    "single-transition-property": "all|<custom-ident>",
    size: "closest-side|farthest-side|closest-corner|farthest-corner|<length>|<length-percentage>{2}",
    "sqrt()": "sqrt( <calc-sum> )",
    "step-position": "jump-start|jump-end|jump-none|jump-both|start|end",
    "step-timing-function": "step-start|step-end|steps( <integer> [, <step-position>]? )",
    "subclass-selector": "<id-selector>|<class-selector>|<attribute-selector>|<pseudo-class-selector>",
    "supports-condition": "not <supports-in-parens>|<supports-in-parens> [and <supports-in-parens>]*|<supports-in-parens> [or <supports-in-parens>]*",
    "supports-in-parens": "( <supports-condition> )|<supports-feature>|<general-enclosed>",
    "supports-feature": "<supports-decl>|<supports-selector-fn>",
    "supports-decl": "( <declaration> )",
    "supports-selector-fn": "selector( <complex-selector> )",
    symbol: "<string>|<image>|<custom-ident>",
    "tan()": "tan( <calc-sum> )",
    target: "<target-counter()>|<target-counters()>|<target-text()>",
    "target-counter()": "target-counter( [<string>|<url>] , <custom-ident> , <counter-style>? )",
    "target-counters()": "target-counters( [<string>|<url>] , <custom-ident> , <string> , <counter-style>? )",
    "target-text()": "target-text( [<string>|<url>] , [content|before|after|first-letter]? )",
    "time-percentage": "<time>|<percentage>",
    "timeline-range-name": "cover|contain|entry|exit|entry-crossing|exit-crossing",
    "easing-function": "linear|<cubic-bezier-timing-function>|<step-timing-function>",
    "track-breadth": "<length-percentage>|<flex>|min-content|max-content|auto",
    "track-list": "[<line-names>? [<track-size>|<track-repeat>]]+ <line-names>?",
    "track-repeat": "repeat( [<integer [1,∞]>] , [<line-names>? <track-size>]+ <line-names>? )",
    "track-size": "<track-breadth>|minmax( <inflexible-breadth> , <track-breadth> )|fit-content( <length-percentage> )",
    "transform-function": "<matrix()>|<translate()>|<translateX()>|<translateY()>|<scale()>|<scaleX()>|<scaleY()>|<rotate()>|<skew()>|<skewX()>|<skewY()>|<matrix3d()>|<translate3d()>|<translateZ()>|<scale3d()>|<scaleZ()>|<rotate3d()>|<rotateX()>|<rotateY()>|<rotateZ()>|<perspective()>",
    "transform-list": "<transform-function>+",
    "transition-behavior-value": "normal|allow-discrete",
    "translate()": "translate( <length-percentage> , <length-percentage>? )",
    "translate3d()": "translate3d( <length-percentage> , <length-percentage> , <length> )",
    "translateX()": "translateX( <length-percentage> )",
    "translateY()": "translateY( <length-percentage> )",
    "translateZ()": "translateZ( <length> )",
    "type-or-unit": "string|color|url|integer|number|length|angle|time|frequency|cap|ch|em|ex|ic|lh|rlh|rem|vb|vi|vw|vh|vmin|vmax|mm|Q|cm|in|pt|pc|px|deg|grad|rad|turn|ms|s|Hz|kHz|%",
    "type-selector": "<wq-name>|<ns-prefix>? '*'",
    "var()": "var( <custom-property-name> , <declaration-value>? )",
    "view()": "view( [<axis>||<'view-timeline-inset'>]? )",
    "viewport-length": "auto|<length-percentage>",
    "visual-box": "content-box|padding-box|border-box",
    "wq-name": "<ns-prefix>? <ident-token>",
    "-legacy-gradient": "<-webkit-gradient()>|<-legacy-linear-gradient>|<-legacy-repeating-linear-gradient>|<-legacy-radial-gradient>|<-legacy-repeating-radial-gradient>",
    "-legacy-linear-gradient": "-moz-linear-gradient( <-legacy-linear-gradient-arguments> )|-webkit-linear-gradient( <-legacy-linear-gradient-arguments> )|-o-linear-gradient( <-legacy-linear-gradient-arguments> )",
    "-legacy-repeating-linear-gradient": "-moz-repeating-linear-gradient( <-legacy-linear-gradient-arguments> )|-webkit-repeating-linear-gradient( <-legacy-linear-gradient-arguments> )|-o-repeating-linear-gradient( <-legacy-linear-gradient-arguments> )",
    "-legacy-linear-gradient-arguments": "[<angle>|<side-or-corner>]? , <color-stop-list>",
    "-legacy-radial-gradient": "-moz-radial-gradient( <-legacy-radial-gradient-arguments> )|-webkit-radial-gradient( <-legacy-radial-gradient-arguments> )|-o-radial-gradient( <-legacy-radial-gradient-arguments> )",
    "-legacy-repeating-radial-gradient": "-moz-repeating-radial-gradient( <-legacy-radial-gradient-arguments> )|-webkit-repeating-radial-gradient( <-legacy-radial-gradient-arguments> )|-o-repeating-radial-gradient( <-legacy-radial-gradient-arguments> )",
    "-legacy-radial-gradient-arguments": "[<position> ,]? [[[<-legacy-radial-gradient-shape>||<-legacy-radial-gradient-size>]|[<length>|<percentage>]{2}] ,]? <color-stop-list>",
    "-legacy-radial-gradient-size": "closest-side|closest-corner|farthest-side|farthest-corner|contain|cover",
    "-legacy-radial-gradient-shape": "circle|ellipse",
    "-non-standard-font": "-apple-system-body|-apple-system-headline|-apple-system-subheadline|-apple-system-caption1|-apple-system-caption2|-apple-system-footnote|-apple-system-short-body|-apple-system-short-headline|-apple-system-short-subheadline|-apple-system-short-caption1|-apple-system-short-footnote|-apple-system-tall-body",
    "-non-standard-color": "-moz-ButtonDefault|-moz-ButtonHoverFace|-moz-ButtonHoverText|-moz-CellHighlight|-moz-CellHighlightText|-moz-Combobox|-moz-ComboboxText|-moz-Dialog|-moz-DialogText|-moz-dragtargetzone|-moz-EvenTreeRow|-moz-Field|-moz-FieldText|-moz-html-CellHighlight|-moz-html-CellHighlightText|-moz-mac-accentdarkestshadow|-moz-mac-accentdarkshadow|-moz-mac-accentface|-moz-mac-accentlightesthighlight|-moz-mac-accentlightshadow|-moz-mac-accentregularhighlight|-moz-mac-accentregularshadow|-moz-mac-chrome-active|-moz-mac-chrome-inactive|-moz-mac-focusring|-moz-mac-menuselect|-moz-mac-menushadow|-moz-mac-menutextselect|-moz-MenuHover|-moz-MenuHoverText|-moz-MenuBarText|-moz-MenuBarHoverText|-moz-nativehyperlinktext|-moz-OddTreeRow|-moz-win-communicationstext|-moz-win-mediatext|-moz-activehyperlinktext|-moz-default-background-color|-moz-default-color|-moz-hyperlinktext|-moz-visitedhyperlinktext|-webkit-activelink|-webkit-focus-ring-color|-webkit-link|-webkit-text",
    "-non-standard-image-rendering": "optimize-contrast|-moz-crisp-edges|-o-crisp-edges|-webkit-optimize-contrast",
    "-non-standard-overflow": "overlay|-moz-scrollbars-none|-moz-scrollbars-horizontal|-moz-scrollbars-vertical|-moz-hidden-unscrollable",
    "-non-standard-size": "intrinsic|min-intrinsic|-webkit-fill-available|-webkit-fit-content|-webkit-min-content|-webkit-max-content|-moz-available|-moz-fit-content|-moz-min-content|-moz-max-content",
    "-webkit-gradient()": "-webkit-gradient( <-webkit-gradient-type> , <-webkit-gradient-point> [, <-webkit-gradient-point>|, <-webkit-gradient-radius> , <-webkit-gradient-point>] [, <-webkit-gradient-radius>]? [, <-webkit-gradient-color-stop>]* )",
    "-webkit-gradient-color-stop": "from( <color> )|color-stop( [<number-zero-one>|<percentage>] , <color> )|to( <color> )",
    "-webkit-gradient-point": "[left|center|right|<length-percentage>] [top|center|bottom|<length-percentage>]",
    "-webkit-gradient-radius": "<length>|<percentage>",
    "-webkit-gradient-type": "linear|radial",
    "-webkit-mask-box-repeat": "repeat|stretch|round",
    "-ms-filter-function-list": "<-ms-filter-function>+",
    "-ms-filter-function": "<-ms-filter-function-progid>|<-ms-filter-function-legacy>",
    "-ms-filter-function-progid": "'progid:' [<ident-token> '.']* [<ident-token>|<function-token> <any-value>? )]",
    "-ms-filter-function-legacy": "<ident-token>|<function-token> <any-value>? )",
    "absolute-color-base": "<hex-color>|<absolute-color-function>|<named-color>|transparent",
    "absolute-color-function": "<rgb()>|<rgba()>|<hsl()>|<hsla()>|<hwb()>|<lab()>|<lch()>|<oklab()>|<oklch()>|<color()>",
    age: "child|young|old",
    "anchor-name": "<dashed-ident>",
    "attr-name": "<wq-name>",
    "attr-fallback": "<any-value>",
    "bg-clip": "<box>|border|text",
    bottom: "<length>|auto",
    "container-name": "<custom-ident>",
    "container-condition": "not <query-in-parens>|<query-in-parens> [[and <query-in-parens>]*|[or <query-in-parens>]*]",
    "coord-box": "content-box|padding-box|border-box|fill-box|stroke-box|view-box",
    "generic-voice": "[<age>? <gender> <integer>?]",
    gender: "male|female|neutral",
    "generic-script-specific": "generic( kai )|generic( fangsong )|generic( nastaliq )",
    "generic-complete": "serif|sans-serif|system-ui|cursive|fantasy|math|monospace",
    "generic-incomplete": "ui-serif|ui-sans-serif|ui-monospace|ui-rounded",
    "-non-standard-generic-family": "-apple-system|BlinkMacSystemFont",
    left: "<length>|auto",
    "color-base": "<hex-color>|<color-function>|<named-color>|<color-mix()>|transparent",
    "color-function": "<rgb()>|<rgba()>|<hsl()>|<hsla()>|<hwb()>|<lab()>|<lch()>|<oklab()>|<oklch()>|<color()>",
    "system-color": "AccentColor|AccentColorText|ActiveText|ButtonBorder|ButtonFace|ButtonText|Canvas|CanvasText|Field|FieldText|GrayText|Highlight|HighlightText|LinkText|Mark|MarkText|SelectedItem|SelectedItemText|VisitedText",
    "device-cmyk()": "<legacy-device-cmyk-syntax>|<modern-device-cmyk-syntax>",
    "legacy-device-cmyk-syntax": "device-cmyk( <number>#{4} )",
    "modern-device-cmyk-syntax": "device-cmyk( <cmyk-component>{4} [/ [<alpha-value>|none]]? )",
    "cmyk-component": "<number>|<percentage>|none",
    "color-mix()": "color-mix( <color-interpolation-method> , [<color>&&<percentage [0,100]>?]#{2} )",
    "color-space": "<rectangular-color-space>|<polar-color-space>|<custom-color-space>",
    "custom-color-space": "<dashed-ident>",
    paint: "none|<color>|<url> [none|<color>]?|context-fill|context-stroke",
    "palette-identifier": "<dashed-ident>",
    right: "<length>|auto",
    "scope-start": "<forgiving-selector-list>",
    "scope-end": "<forgiving-selector-list>",
    "forgiving-selector-list": "<complex-real-selector-list>",
    "forgiving-relative-selector-list": "<relative-real-selector-list>",
    "selector-list": "<complex-selector-list>",
    "complex-real-selector-list": "<complex-real-selector>#",
    "simple-selector-list": "<simple-selector>#",
    "relative-real-selector-list": "<relative-real-selector>#",
    "complex-selector-unit": "[<compound-selector>? <pseudo-compound-selector>*]!",
    "complex-real-selector": "<compound-selector> [<combinator>? <compound-selector>]*",
    "relative-real-selector": "<combinator>? <complex-real-selector>",
    "pseudo-compound-selector": "<pseudo-element-selector> <pseudo-class-selector>*",
    "simple-selector": "<type-selector>|<subclass-selector>",
    "legacy-pseudo-element-selector": "':' [before|after|first-line|first-letter]",
    "single-animation-composition": "replace|add|accumulate",
    "svg-length": "<percentage>|<length>|<number>",
    "svg-writing-mode": "lr-tb|rl-tb|tb-rl|lr|rl|tb",
    top: "<length>|auto",
    x: "<number>",
    y: "<number>",
    declaration: "<ident-token> : <declaration-value>? ['!' important]?",
    "declaration-list": "[<declaration>? ';']* <declaration>?",
    url: "url( <string> <url-modifier>* )|<url-token>",
    "url-modifier": "<ident>|<function-token> <any-value> )",
    "number-zero-one": "<number [0,1]>",
    "number-one-or-greater": "<number [1,∞]>",
    "color()": "color( <colorspace-params> [/ [<alpha-value>|none]]? )",
    "colorspace-params": "[<predefined-rgb-params>|<xyz-params>]",
    "predefined-rgb-params": "<predefined-rgb> [<number>|<percentage>|none]{3}",
    "predefined-rgb": "srgb|srgb-linear|display-p3|a98-rgb|prophoto-rgb|rec2020",
    "xyz-params": "<xyz-space> [<number>|<percentage>|none]{3}",
    "xyz-space": "xyz|xyz-d50|xyz-d65",
    "oklab()": "oklab( [<percentage>|<number>|none] [<percentage>|<number>|none] [<percentage>|<number>|none] [/ [<alpha-value>|none]]? )",
    "oklch()": "oklch( [<percentage>|<number>|none] [<percentage>|<number>|none] [<hue>|none] [/ [<alpha-value>|none]]? )",
    "offset-path": "<ray()>|<url>|<basic-shape>",
    "rect()": "rect( [<length-percentage>|auto]{4} [round <'border-radius'>]? )",
    "xywh()": "xywh( <length-percentage>{2} <length-percentage [0,∞]>{2} [round <'border-radius'>]? )",
    "query-in-parens": "( <container-condition> )|( <size-feature> )|style( <style-query> )|<general-enclosed>",
    "size-feature": "<mf-plain>|<mf-boolean>|<mf-range>",
    "style-feature": "<declaration>",
    "style-query": "<style-condition>|<style-feature>",
    "style-condition": "not <style-in-parens>|<style-in-parens> [[and <style-in-parens>]*|[or <style-in-parens>]*]",
    "style-in-parens": "( <style-condition> )|( <style-feature> )|<general-enclosed>",
    "-non-standard-display": "-ms-inline-flexbox|-ms-grid|-ms-inline-grid|-webkit-flex|-webkit-inline-flex|-webkit-box|-webkit-inline-box|-moz-inline-stack|-moz-box|-moz-inline-box",
    "inset-area": "[[left|center|right|span-left|span-right|x-start|x-end|span-x-start|span-x-end|x-self-start|x-self-end|span-x-self-start|span-x-self-end|span-all]||[top|center|bottom|span-top|span-bottom|y-start|y-end|span-y-start|span-y-end|y-self-start|y-self-end|span-y-self-start|span-y-self-end|span-all]|[block-start|center|block-end|span-block-start|span-block-end|span-all]||[inline-start|center|inline-end|span-inline-start|span-inline-end|span-all]|[self-block-start|self-block-end|span-self-block-start|span-self-block-end|span-all]||[self-inline-start|self-inline-end|span-self-inline-start|span-self-inline-end|span-all]|[start|center|end|span-start|span-end|span-all]{1,2}|[self-start|center|self-end|span-self-start|span-self-end|span-all]{1,2}]",
    "position-area": "[[left|center|right|span-left|span-right|x-start|x-end|span-x-start|span-x-end|x-self-start|x-self-end|span-x-self-start|span-x-self-end|span-all]||[top|center|bottom|span-top|span-bottom|y-start|y-end|span-y-start|span-y-end|y-self-start|y-self-end|span-y-self-start|span-y-self-end|span-all]|[block-start|center|block-end|span-block-start|span-block-end|span-all]||[inline-start|center|inline-end|span-inline-start|span-inline-end|span-all]|[self-block-start|center|self-block-end|span-self-block-start|span-self-block-end|span-all]||[self-inline-start|center|self-inline-end|span-self-inline-start|span-self-inline-end|span-all]|[start|center|end|span-start|span-end|span-all]{1,2}|[self-start|center|self-end|span-self-start|span-self-end|span-all]{1,2}]",
    "anchor()": "anchor( <anchor-element>?&&<anchor-side> , <length-percentage>? )",
    "anchor-side": "inside|outside|top|left|right|bottom|start|end|self-start|self-end|<percentage>|center",
    "anchor-size()": "anchor-size( [<anchor-element>||<anchor-size>]? , <length-percentage>? )",
    "anchor-size": "width|height|block|inline|self-block|self-inline",
    "anchor-element": "<dashed-ident>",
    "try-size": "most-width|most-height|most-block-size|most-inline-size",
    "try-tactic": "flip-block||flip-inline||flip-start",
    "font-variant-css2": "normal|small-caps",
    "font-width-css3": "normal|ultra-condensed|extra-condensed|condensed|semi-condensed|semi-expanded|expanded|extra-expanded|ultra-expanded",
    "system-family-name": "caption|icon|menu|message-box|small-caption|status-bar"
  },
  properties: {
    "--*": "<declaration-value>",
    "-ms-accelerator": "false|true",
    "-ms-block-progression": "tb|rl|bt|lr",
    "-ms-content-zoom-chaining": "none|chained",
    "-ms-content-zooming": "none|zoom",
    "-ms-content-zoom-limit": "<'-ms-content-zoom-limit-min'> <'-ms-content-zoom-limit-max'>",
    "-ms-content-zoom-limit-max": "<percentage>",
    "-ms-content-zoom-limit-min": "<percentage>",
    "-ms-content-zoom-snap": "<'-ms-content-zoom-snap-type'>||<'-ms-content-zoom-snap-points'>",
    "-ms-content-zoom-snap-points": "snapInterval( <percentage> , <percentage> )|snapList( <percentage># )",
    "-ms-content-zoom-snap-type": "none|proximity|mandatory",
    "-ms-filter": "<string>",
    "-ms-flow-from": "[none|<custom-ident>]#",
    "-ms-flow-into": "[none|<custom-ident>]#",
    "-ms-grid-columns": "none|<track-list>|<auto-track-list>",
    "-ms-grid-rows": "none|<track-list>|<auto-track-list>",
    "-ms-high-contrast-adjust": "auto|none",
    "-ms-hyphenate-limit-chars": "auto|<integer>{1,3}",
    "-ms-hyphenate-limit-lines": "no-limit|<integer>",
    "-ms-hyphenate-limit-zone": "<percentage>|<length>",
    "-ms-ime-align": "auto|after",
    "-ms-overflow-style": "auto|none|scrollbar|-ms-autohiding-scrollbar",
    "-ms-scrollbar-3dlight-color": "<color>",
    "-ms-scrollbar-arrow-color": "<color>",
    "-ms-scrollbar-base-color": "<color>",
    "-ms-scrollbar-darkshadow-color": "<color>",
    "-ms-scrollbar-face-color": "<color>",
    "-ms-scrollbar-highlight-color": "<color>",
    "-ms-scrollbar-shadow-color": "<color>",
    "-ms-scrollbar-track-color": "<color>",
    "-ms-scroll-chaining": "chained|none",
    "-ms-scroll-limit": "<'-ms-scroll-limit-x-min'> <'-ms-scroll-limit-y-min'> <'-ms-scroll-limit-x-max'> <'-ms-scroll-limit-y-max'>",
    "-ms-scroll-limit-x-max": "auto|<length>",
    "-ms-scroll-limit-x-min": "<length>",
    "-ms-scroll-limit-y-max": "auto|<length>",
    "-ms-scroll-limit-y-min": "<length>",
    "-ms-scroll-rails": "none|railed",
    "-ms-scroll-snap-points-x": "snapInterval( <length-percentage> , <length-percentage> )|snapList( <length-percentage># )",
    "-ms-scroll-snap-points-y": "snapInterval( <length-percentage> , <length-percentage> )|snapList( <length-percentage># )",
    "-ms-scroll-snap-type": "none|proximity|mandatory",
    "-ms-scroll-snap-x": "<'-ms-scroll-snap-type'> <'-ms-scroll-snap-points-x'>",
    "-ms-scroll-snap-y": "<'-ms-scroll-snap-type'> <'-ms-scroll-snap-points-y'>",
    "-ms-scroll-translation": "none|vertical-to-horizontal",
    "-ms-text-autospace": "none|ideograph-alpha|ideograph-numeric|ideograph-parenthesis|ideograph-space",
    "-ms-touch-select": "grippers|none",
    "-ms-user-select": "none|element|text",
    "-ms-wrap-flow": "auto|both|start|end|maximum|clear",
    "-ms-wrap-margin": "<length>",
    "-ms-wrap-through": "wrap|none",
    "-moz-appearance": "none|button|button-arrow-down|button-arrow-next|button-arrow-previous|button-arrow-up|button-bevel|button-focus|caret|checkbox|checkbox-container|checkbox-label|checkmenuitem|dualbutton|groupbox|listbox|listitem|menuarrow|menubar|menucheckbox|menuimage|menuitem|menuitemtext|menulist|menulist-button|menulist-text|menulist-textfield|menupopup|menuradio|menuseparator|meterbar|meterchunk|progressbar|progressbar-vertical|progresschunk|progresschunk-vertical|radio|radio-container|radio-label|radiomenuitem|range|range-thumb|resizer|resizerpanel|scale-horizontal|scalethumbend|scalethumb-horizontal|scalethumbstart|scalethumbtick|scalethumb-vertical|scale-vertical|scrollbarbutton-down|scrollbarbutton-left|scrollbarbutton-right|scrollbarbutton-up|scrollbarthumb-horizontal|scrollbarthumb-vertical|scrollbartrack-horizontal|scrollbartrack-vertical|searchfield|separator|sheet|spinner|spinner-downbutton|spinner-textfield|spinner-upbutton|splitter|statusbar|statusbarpanel|tab|tabpanel|tabpanels|tab-scroll-arrow-back|tab-scroll-arrow-forward|textfield|textfield-multiline|toolbar|toolbarbutton|toolbarbutton-dropdown|toolbargripper|toolbox|tooltip|treeheader|treeheadercell|treeheadersortarrow|treeitem|treeline|treetwisty|treetwistyopen|treeview|-moz-mac-unified-toolbar|-moz-win-borderless-glass|-moz-win-browsertabbar-toolbox|-moz-win-communicationstext|-moz-win-communications-toolbox|-moz-win-exclude-glass|-moz-win-glass|-moz-win-mediatext|-moz-win-media-toolbox|-moz-window-button-box|-moz-window-button-box-maximized|-moz-window-button-close|-moz-window-button-maximize|-moz-window-button-minimize|-moz-window-button-restore|-moz-window-frame-bottom|-moz-window-frame-left|-moz-window-frame-right|-moz-window-titlebar|-moz-window-titlebar-maximized",
    "-moz-binding": "<url>|none",
    "-moz-border-bottom-colors": "<color>+|none",
    "-moz-border-left-colors": "<color>+|none",
    "-moz-border-right-colors": "<color>+|none",
    "-moz-border-top-colors": "<color>+|none",
    "-moz-context-properties": "none|[fill|fill-opacity|stroke|stroke-opacity]#",
    "-moz-float-edge": "border-box|content-box|margin-box|padding-box",
    "-moz-force-broken-image-icon": "0|1",
    "-moz-image-region": "<shape>|auto",
    "-moz-orient": "inline|block|horizontal|vertical",
    "-moz-outline-radius": "<outline-radius>{1,4} [/ <outline-radius>{1,4}]?",
    "-moz-outline-radius-bottomleft": "<outline-radius>",
    "-moz-outline-radius-bottomright": "<outline-radius>",
    "-moz-outline-radius-topleft": "<outline-radius>",
    "-moz-outline-radius-topright": "<outline-radius>",
    "-moz-stack-sizing": "ignore|stretch-to-fit",
    "-moz-text-blink": "none|blink",
    "-moz-user-focus": "ignore|normal|select-after|select-before|select-menu|select-same|select-all|none",
    "-moz-user-input": "auto|none|enabled|disabled",
    "-moz-user-modify": "read-only|read-write|write-only",
    "-moz-window-dragging": "drag|no-drag",
    "-moz-window-shadow": "default|menu|tooltip|sheet|none",
    "-webkit-appearance": "none|button|button-bevel|caps-lock-indicator|caret|checkbox|default-button|inner-spin-button|listbox|listitem|media-controls-background|media-controls-fullscreen-background|media-current-time-display|media-enter-fullscreen-button|media-exit-fullscreen-button|media-fullscreen-button|media-mute-button|media-overlay-play-button|media-play-button|media-seek-back-button|media-seek-forward-button|media-slider|media-sliderthumb|media-time-remaining-display|media-toggle-closed-captions-button|media-volume-slider|media-volume-slider-container|media-volume-sliderthumb|menulist|menulist-button|menulist-text|menulist-textfield|meter|progress-bar|progress-bar-value|push-button|radio|scrollbarbutton-down|scrollbarbutton-left|scrollbarbutton-right|scrollbarbutton-up|scrollbargripper-horizontal|scrollbargripper-vertical|scrollbarthumb-horizontal|scrollbarthumb-vertical|scrollbartrack-horizontal|scrollbartrack-vertical|searchfield|searchfield-cancel-button|searchfield-decoration|searchfield-results-button|searchfield-results-decoration|slider-horizontal|slider-vertical|sliderthumb-horizontal|sliderthumb-vertical|square-button|textarea|textfield|-apple-pay-button",
    "-webkit-border-before": "<'border-width'>||<'border-style'>||<color>",
    "-webkit-border-before-color": "<color>",
    "-webkit-border-before-style": "<'border-style'>",
    "-webkit-border-before-width": "<'border-width'>",
    "-webkit-box-reflect": "[above|below|right|left]? <length>? <image>?",
    "-webkit-line-clamp": "none|<integer>",
    "-webkit-mask": "[<mask-reference>||<position> [/ <bg-size>]?||<repeat-style>||[<box>|border|padding|content|text]||[<box>|border|padding|content]]#",
    "-webkit-mask-attachment": "<attachment>#",
    "-webkit-mask-clip": "[<box>|border|padding|content|text]#",
    "-webkit-mask-composite": "<composite-style>#",
    "-webkit-mask-image": "<mask-reference>#",
    "-webkit-mask-origin": "[<box>|border|padding|content]#",
    "-webkit-mask-position": "<position>#",
    "-webkit-mask-position-x": "[<length-percentage>|left|center|right]#",
    "-webkit-mask-position-y": "[<length-percentage>|top|center|bottom]#",
    "-webkit-mask-repeat": "<repeat-style>#",
    "-webkit-mask-repeat-x": "repeat|no-repeat|space|round",
    "-webkit-mask-repeat-y": "repeat|no-repeat|space|round",
    "-webkit-mask-size": "<bg-size>#",
    "-webkit-overflow-scrolling": "auto|touch",
    "-webkit-tap-highlight-color": "<color>",
    "-webkit-text-fill-color": "<color>",
    "-webkit-text-stroke": "<length>||<color>",
    "-webkit-text-stroke-color": "<color>",
    "-webkit-text-stroke-width": "<length>",
    "-webkit-touch-callout": "default|none",
    "-webkit-user-modify": "read-only|read-write|read-write-plaintext-only",
    "accent-color": "auto|<color>",
    "align-content": "normal|<baseline-position>|<content-distribution>|<overflow-position>? <content-position>",
    "align-items": "normal|stretch|<baseline-position>|[<overflow-position>? <self-position>]",
    "align-self": "auto|normal|stretch|<baseline-position>|<overflow-position>? <self-position>",
    "align-tracks": "[normal|<baseline-position>|<content-distribution>|<overflow-position>? <content-position>]#",
    all: "initial|inherit|unset|revert|revert-layer",
    "anchor-name": "none|<dashed-ident>#",
    "anchor-scope": "none|all|<dashed-ident>#",
    animation: "<single-animation>#",
    "animation-composition": "<single-animation-composition>#",
    "animation-delay": "<time>#",
    "animation-direction": "<single-animation-direction>#",
    "animation-duration": "<time>#",
    "animation-fill-mode": "<single-animation-fill-mode>#",
    "animation-iteration-count": "<single-animation-iteration-count>#",
    "animation-name": "[none|<keyframes-name>]#",
    "animation-play-state": "<single-animation-play-state>#",
    "animation-range": "[<'animation-range-start'> <'animation-range-end'>?]#",
    "animation-range-end": "[normal|<length-percentage>|<timeline-range-name> <length-percentage>?]#",
    "animation-range-start": "[normal|<length-percentage>|<timeline-range-name> <length-percentage>?]#",
    "animation-timing-function": "<easing-function>#",
    "animation-timeline": "<single-animation-timeline>#",
    appearance: "none|auto|textfield|menulist-button|<compat-auto>",
    "aspect-ratio": "auto||<ratio>",
    azimuth: "<angle>|[[left-side|far-left|left|center-left|center|center-right|right|far-right|right-side]||behind]|leftwards|rightwards",
    "backdrop-filter": "none|<filter-function-list>",
    "backface-visibility": "visible|hidden",
    background: "[<bg-layer> ,]* <final-bg-layer>",
    "background-attachment": "<attachment>#",
    "background-blend-mode": "<blend-mode>#",
    "background-clip": "<bg-clip>#",
    "background-color": "<color>",
    "background-image": "<bg-image>#",
    "background-origin": "<box>#",
    "background-position": "<bg-position>#",
    "background-position-x": "[center|[[left|right|x-start|x-end]? <length-percentage>?]!]#",
    "background-position-y": "[center|[[top|bottom|y-start|y-end]? <length-percentage>?]!]#",
    "background-repeat": "<repeat-style>#",
    "background-size": "<bg-size>#",
    "block-size": "<'width'>",
    border: "<line-width>||<line-style>||<color>",
    "border-block": "<'border-top-width'>||<'border-top-style'>||<color>",
    "border-block-color": "<'border-top-color'>{1,2}",
    "border-block-style": "<'border-top-style'>",
    "border-block-width": "<'border-top-width'>",
    "border-block-end": "<'border-top-width'>||<'border-top-style'>||<color>",
    "border-block-end-color": "<'border-top-color'>",
    "border-block-end-style": "<'border-top-style'>",
    "border-block-end-width": "<'border-top-width'>",
    "border-block-start": "<'border-top-width'>||<'border-top-style'>||<color>",
    "border-block-start-color": "<'border-top-color'>",
    "border-block-start-style": "<'border-top-style'>",
    "border-block-start-width": "<'border-top-width'>",
    "border-bottom": "<line-width>||<line-style>||<color>",
    "border-bottom-color": "<'border-top-color'>",
    "border-bottom-left-radius": "<length-percentage>{1,2}",
    "border-bottom-right-radius": "<length-percentage>{1,2}",
    "border-bottom-style": "<line-style>",
    "border-bottom-width": "<line-width>",
    "border-collapse": "collapse|separate",
    "border-color": "<color>{1,4}",
    "border-end-end-radius": "<length-percentage>{1,2}",
    "border-end-start-radius": "<length-percentage>{1,2}",
    "border-image": "<'border-image-source'>||<'border-image-slice'> [/ <'border-image-width'>|/ <'border-image-width'>? / <'border-image-outset'>]?||<'border-image-repeat'>",
    "border-image-outset": "[<length>|<number>]{1,4}",
    "border-image-repeat": "[stretch|repeat|round|space]{1,2}",
    "border-image-slice": "<number-percentage>{1,4}&&fill?",
    "border-image-source": "none|<image>",
    "border-image-width": "[<length-percentage>|<number>|auto]{1,4}",
    "border-inline": "<'border-top-width'>||<'border-top-style'>||<color>",
    "border-inline-end": "<'border-top-width'>||<'border-top-style'>||<color>",
    "border-inline-color": "<'border-top-color'>{1,2}",
    "border-inline-style": "<'border-top-style'>",
    "border-inline-width": "<'border-top-width'>",
    "border-inline-end-color": "<'border-top-color'>",
    "border-inline-end-style": "<'border-top-style'>",
    "border-inline-end-width": "<'border-top-width'>",
    "border-inline-start": "<'border-top-width'>||<'border-top-style'>||<color>",
    "border-inline-start-color": "<'border-top-color'>",
    "border-inline-start-style": "<'border-top-style'>",
    "border-inline-start-width": "<'border-top-width'>",
    "border-left": "<line-width>||<line-style>||<color>",
    "border-left-color": "<color>",
    "border-left-style": "<line-style>",
    "border-left-width": "<line-width>",
    "border-radius": "<length-percentage>{1,4} [/ <length-percentage>{1,4}]?",
    "border-right": "<line-width>||<line-style>||<color>",
    "border-right-color": "<color>",
    "border-right-style": "<line-style>",
    "border-right-width": "<line-width>",
    "border-spacing": "<length> <length>?",
    "border-start-end-radius": "<length-percentage>{1,2}",
    "border-start-start-radius": "<length-percentage>{1,2}",
    "border-style": "<line-style>{1,4}",
    "border-top": "<line-width>||<line-style>||<color>",
    "border-top-color": "<color>",
    "border-top-left-radius": "<length-percentage>{1,2}",
    "border-top-right-radius": "<length-percentage>{1,2}",
    "border-top-style": "<line-style>",
    "border-top-width": "<line-width>",
    "border-width": "<line-width>{1,4}",
    bottom: "<length>|<percentage>|auto",
    "box-align": "start|center|end|baseline|stretch",
    "box-decoration-break": "slice|clone",
    "box-direction": "normal|reverse|inherit",
    "box-flex": "<number>",
    "box-flex-group": "<integer>",
    "box-lines": "single|multiple",
    "box-ordinal-group": "<integer>",
    "box-orient": "horizontal|vertical|inline-axis|block-axis|inherit",
    "box-pack": "start|center|end|justify",
    "box-shadow": "none|<shadow>#",
    "box-sizing": "content-box|border-box",
    "break-after": "auto|avoid|always|all|avoid-page|page|left|right|recto|verso|avoid-column|column|avoid-region|region",
    "break-before": "auto|avoid|always|all|avoid-page|page|left|right|recto|verso|avoid-column|column|avoid-region|region",
    "break-inside": "auto|avoid|avoid-page|avoid-column|avoid-region",
    "caption-side": "top|bottom|block-start|block-end|inline-start|inline-end",
    caret: "<'caret-color'>||<'caret-shape'>",
    "caret-color": "auto|<color>",
    "caret-shape": "auto|bar|block|underscore",
    clear: "none|left|right|both|inline-start|inline-end",
    clip: "<shape>|auto",
    "clip-path": "<clip-source>|[<basic-shape>||<geometry-box>]|none",
    "clip-rule": "nonzero|evenodd",
    color: "<color>",
    "color-interpolation-filters": "auto|sRGB|linearRGB",
    "color-scheme": "normal|[light|dark|<custom-ident>]+&&only?",
    "column-count": "<integer>|auto",
    "column-fill": "auto|balance",
    "column-gap": "normal|<length-percentage>",
    "column-rule": "<'column-rule-width'>||<'column-rule-style'>||<'column-rule-color'>",
    "column-rule-color": "<color>",
    "column-rule-style": "<'border-style'>",
    "column-rule-width": "<'border-width'>",
    "column-span": "none|all",
    "column-width": "<length>|auto",
    columns: "<'column-width'>||<'column-count'>",
    contain: "none|strict|content|[[size||inline-size]||layout||style||paint]",
    "contain-intrinsic-size": "[auto? [none|<length>]]{1,2}",
    "contain-intrinsic-block-size": "auto? [none|<length>]",
    "contain-intrinsic-height": "auto? [none|<length>]",
    "contain-intrinsic-inline-size": "auto? [none|<length>]",
    "contain-intrinsic-width": "auto? [none|<length>]",
    container: "<'container-name'> [/ <'container-type'>]?",
    "container-name": "none|<custom-ident>+",
    "container-type": "normal||[size|inline-size]",
    content: "normal|none|[<content-replacement>|<content-list>] [/ [<string>|<counter>]+]?",
    "content-visibility": "visible|auto|hidden",
    "counter-increment": "[<counter-name> <integer>?]+|none",
    "counter-reset": "[<counter-name> <integer>?|<reversed-counter-name> <integer>?]+|none",
    "counter-set": "[<counter-name> <integer>?]+|none",
    cursor: "[[<url> [<x> <y>]? ,]* [auto|default|none|context-menu|help|pointer|progress|wait|cell|crosshair|text|vertical-text|alias|copy|move|no-drop|not-allowed|e-resize|n-resize|ne-resize|nw-resize|s-resize|se-resize|sw-resize|w-resize|ew-resize|ns-resize|nesw-resize|nwse-resize|col-resize|row-resize|all-scroll|zoom-in|zoom-out|grab|grabbing|hand|-webkit-grab|-webkit-grabbing|-webkit-zoom-in|-webkit-zoom-out|-moz-grab|-moz-grabbing|-moz-zoom-in|-moz-zoom-out]]",
    d: "none|path( <string> )",
    cx: "<length>|<percentage>",
    cy: "<length>|<percentage>",
    direction: "ltr|rtl",
    display: "[<display-outside>||<display-inside>]|<display-listitem>|<display-internal>|<display-box>|<display-legacy>|<-non-standard-display>",
    "dominant-baseline": "auto|use-script|no-change|reset-size|ideographic|alphabetic|hanging|mathematical|central|middle|text-after-edge|text-before-edge",
    "empty-cells": "show|hide",
    "field-sizing": "content|fixed",
    fill: "<paint>",
    "fill-opacity": "<number-zero-one>",
    "fill-rule": "nonzero|evenodd",
    filter: "none|<filter-function-list>|<-ms-filter-function-list>",
    flex: "none|[<'flex-grow'> <'flex-shrink'>?||<'flex-basis'>]",
    "flex-basis": "content|<'width'>",
    "flex-direction": "row|row-reverse|column|column-reverse",
    "flex-flow": "<'flex-direction'>||<'flex-wrap'>",
    "flex-grow": "<number>",
    "flex-shrink": "<number>",
    "flex-wrap": "nowrap|wrap|wrap-reverse",
    float: "left|right|none|inline-start|inline-end",
    font: "[[<'font-style'>||<font-variant-css2>||<'font-weight'>||<font-width-css3>]? <'font-size'> [/ <'line-height'>]? <'font-family'>#]|<system-family-name>|<-non-standard-font>",
    "font-family": "[<family-name>|<generic-family>]#",
    "font-feature-settings": "normal|<feature-tag-value>#",
    "font-kerning": "auto|normal|none",
    "font-language-override": "normal|<string>",
    "font-optical-sizing": "auto|none",
    "font-palette": "normal|light|dark|<palette-identifier>",
    "font-variation-settings": "normal|[<string> <number>]#",
    "font-size": "<absolute-size>|<relative-size>|<length-percentage>",
    "font-size-adjust": "none|[ex-height|cap-height|ch-width|ic-width|ic-height]? [from-font|<number>]",
    "font-smooth": "auto|never|always|<absolute-size>|<length>",
    "font-stretch": "<font-stretch-absolute>",
    "font-style": "normal|italic|oblique <angle>?",
    "font-synthesis": "none|[weight||style||small-caps||position]",
    "font-synthesis-position": "auto|none",
    "font-synthesis-small-caps": "auto|none",
    "font-synthesis-style": "auto|none",
    "font-synthesis-weight": "auto|none",
    "font-variant": "normal|none|[<common-lig-values>||<discretionary-lig-values>||<historical-lig-values>||<contextual-alt-values>||stylistic( <feature-value-name> )||historical-forms||styleset( <feature-value-name># )||character-variant( <feature-value-name># )||swash( <feature-value-name> )||ornaments( <feature-value-name> )||annotation( <feature-value-name> )||[small-caps|all-small-caps|petite-caps|all-petite-caps|unicase|titling-caps]||<numeric-figure-values>||<numeric-spacing-values>||<numeric-fraction-values>||ordinal||slashed-zero||<east-asian-variant-values>||<east-asian-width-values>||ruby]",
    "font-variant-alternates": "normal|[stylistic( <feature-value-name> )||historical-forms||styleset( <feature-value-name># )||character-variant( <feature-value-name># )||swash( <feature-value-name> )||ornaments( <feature-value-name> )||annotation( <feature-value-name> )]",
    "font-variant-caps": "normal|small-caps|all-small-caps|petite-caps|all-petite-caps|unicase|titling-caps",
    "font-variant-east-asian": "normal|[<east-asian-variant-values>||<east-asian-width-values>||ruby]",
    "font-variant-emoji": "normal|text|emoji|unicode",
    "font-variant-ligatures": "normal|none|[<common-lig-values>||<discretionary-lig-values>||<historical-lig-values>||<contextual-alt-values>]",
    "font-variant-numeric": "normal|[<numeric-figure-values>||<numeric-spacing-values>||<numeric-fraction-values>||ordinal||slashed-zero]",
    "font-variant-position": "normal|sub|super",
    "font-weight": "<font-weight-absolute>|bolder|lighter",
    "forced-color-adjust": "auto|none",
    gap: "<'row-gap'> <'column-gap'>?",
    grid: "<'grid-template'>|<'grid-template-rows'> / [auto-flow&&dense?] <'grid-auto-columns'>?|[auto-flow&&dense?] <'grid-auto-rows'>? / <'grid-template-columns'>",
    "grid-area": "<grid-line> [/ <grid-line>]{0,3}",
    "grid-auto-columns": "<track-size>+",
    "grid-auto-flow": "[row|column]||dense",
    "grid-auto-rows": "<track-size>+",
    "grid-column": "<grid-line> [/ <grid-line>]?",
    "grid-column-end": "<grid-line>",
    "grid-column-gap": "<length-percentage>",
    "grid-column-start": "<grid-line>",
    "grid-gap": "<'grid-row-gap'> <'grid-column-gap'>?",
    "grid-row": "<grid-line> [/ <grid-line>]?",
    "grid-row-end": "<grid-line>",
    "grid-row-gap": "<length-percentage>",
    "grid-row-start": "<grid-line>",
    "grid-template": "none|[<'grid-template-rows'> / <'grid-template-columns'>]|[<line-names>? <string> <track-size>? <line-names>?]+ [/ <explicit-track-list>]?",
    "grid-template-areas": "none|<string>+",
    "grid-template-columns": "none|<track-list>|<auto-track-list>|subgrid <line-name-list>?",
    "grid-template-rows": "none|<track-list>|<auto-track-list>|subgrid <line-name-list>?",
    "hanging-punctuation": "none|[first||[force-end|allow-end]||last]",
    height: "auto|<length>|<percentage>|min-content|max-content|fit-content|fit-content( <length-percentage> )|stretch|<-non-standard-size>",
    "hyphenate-character": "auto|<string>",
    "hyphenate-limit-chars": "[auto|<integer>]{1,3}",
    hyphens: "none|manual|auto",
    "image-orientation": "from-image|<angle>|[<angle>? flip]",
    "image-rendering": "auto|crisp-edges|pixelated|optimizeSpeed|optimizeQuality|<-non-standard-image-rendering>",
    "image-resolution": "[from-image||<resolution>]&&snap?",
    "ime-mode": "auto|normal|active|inactive|disabled",
    "initial-letter": "normal|[<number> <integer>?]",
    "initial-letter-align": "[auto|alphabetic|hanging|ideographic]",
    "inline-size": "<'width'>",
    "input-security": "auto|none",
    inset: "<'top'>{1,4}",
    "inset-block": "<'top'>{1,2}",
    "inset-block-end": "<'top'>",
    "inset-block-start": "<'top'>",
    "inset-inline": "<'top'>{1,2}",
    "inset-inline-end": "<'top'>",
    "inset-inline-start": "<'top'>",
    "interpolate-size": "numeric-only|allow-keywords",
    isolation: "auto|isolate",
    "justify-content": "normal|<content-distribution>|<overflow-position>? [<content-position>|left|right]",
    "justify-items": "normal|stretch|<baseline-position>|<overflow-position>? [<self-position>|left|right]|legacy|legacy&&[left|right|center]",
    "justify-self": "auto|normal|stretch|<baseline-position>|<overflow-position>? [<self-position>|left|right]",
    "justify-tracks": "[normal|<content-distribution>|<overflow-position>? [<content-position>|left|right]]#",
    left: "<length>|<percentage>|auto",
    "letter-spacing": "normal|<length-percentage>",
    "line-break": "auto|loose|normal|strict|anywhere",
    "line-clamp": "none|<integer>",
    "line-height": "normal|<number>|<length>|<percentage>",
    "line-height-step": "<length>",
    "list-style": "<'list-style-type'>||<'list-style-position'>||<'list-style-image'>",
    "list-style-image": "<image>|none",
    "list-style-position": "inside|outside",
    "list-style-type": "<counter-style>|<string>|none",
    margin: "[<length>|<percentage>|auto]{1,4}",
    "margin-block": "<'margin-left'>{1,2}",
    "margin-block-end": "<'margin-left'>",
    "margin-block-start": "<'margin-left'>",
    "margin-bottom": "<length>|<percentage>|auto",
    "margin-inline": "<'margin-left'>{1,2}",
    "margin-inline-end": "<'margin-left'>",
    "margin-inline-start": "<'margin-left'>",
    "margin-left": "<length>|<percentage>|auto",
    "margin-right": "<length>|<percentage>|auto",
    "margin-top": "<length>|<percentage>|auto",
    "margin-trim": "none|in-flow|all",
    marker: "none|<url>",
    "marker-end": "none|<url>",
    "marker-mid": "none|<url>",
    "marker-start": "none|<url>",
    mask: "<mask-layer>#",
    "mask-border": "<'mask-border-source'>||<'mask-border-slice'> [/ <'mask-border-width'>? [/ <'mask-border-outset'>]?]?||<'mask-border-repeat'>||<'mask-border-mode'>",
    "mask-border-mode": "luminance|alpha",
    "mask-border-outset": "[<length>|<number>]{1,4}",
    "mask-border-repeat": "[stretch|repeat|round|space]{1,2}",
    "mask-border-slice": "<number-percentage>{1,4} fill?",
    "mask-border-source": "none|<image>",
    "mask-border-width": "[<length-percentage>|<number>|auto]{1,4}",
    "mask-clip": "[<geometry-box>|no-clip]#",
    "mask-composite": "<compositing-operator>#",
    "mask-image": "<mask-reference>#",
    "mask-mode": "<masking-mode>#",
    "mask-origin": "<geometry-box>#",
    "mask-position": "<position>#",
    "mask-repeat": "<repeat-style>#",
    "mask-size": "<bg-size>#",
    "mask-type": "luminance|alpha",
    "masonry-auto-flow": "[pack|next]||[definite-first|ordered]",
    "math-depth": "auto-add|add( <integer> )|<integer>",
    "math-shift": "normal|compact",
    "math-style": "normal|compact",
    "max-block-size": "<'max-width'>",
    "max-height": "none|<length-percentage>|min-content|max-content|fit-content|fit-content( <length-percentage> )|stretch|<-non-standard-size>",
    "max-inline-size": "<'max-width'>",
    "max-lines": "none|<integer>",
    "max-width": "none|<length-percentage>|min-content|max-content|fit-content|fit-content( <length-percentage> )|stretch|<-non-standard-size>",
    "min-block-size": "<'min-width'>",
    "min-height": "auto|<length>|<percentage>|min-content|max-content|fit-content|fit-content( <length-percentage> )|stretch|<-non-standard-size>",
    "min-inline-size": "<'min-width'>",
    "min-width": "auto|<length>|<percentage>|min-content|max-content|fit-content|fit-content( <length-percentage> )|stretch|<-non-standard-size>",
    "mix-blend-mode": "<blend-mode>|plus-lighter",
    "object-fit": "fill|contain|cover|none|scale-down",
    "object-position": "<position>",
    offset: "[<'offset-position'>? [<'offset-path'> [<'offset-distance'>||<'offset-rotate'>]?]?]! [/ <'offset-anchor'>]?",
    "offset-anchor": "auto|<position>",
    "offset-distance": "<length-percentage>",
    "offset-path": "none|<offset-path>||<coord-box>",
    "offset-position": "normal|auto|<position>",
    "offset-rotate": "[auto|reverse]||<angle>",
    opacity: "<alpha-value>",
    order: "<integer>",
    orphans: "<integer>",
    outline: "[<'outline-width'>||<'outline-style'>||<'outline-color'>]",
    "outline-color": "auto|<color>",
    "outline-offset": "<length>",
    "outline-style": "auto|<'border-style'>",
    "outline-width": "<line-width>",
    overflow: "[visible|hidden|clip|scroll|auto]{1,2}|<-non-standard-overflow>",
    "overflow-anchor": "auto|none",
    "overflow-block": "visible|hidden|clip|scroll|auto",
    "overflow-clip-box": "padding-box|content-box",
    "overflow-clip-margin": "<visual-box>||<length [0,∞]>",
    "overflow-inline": "visible|hidden|clip|scroll|auto",
    "overflow-wrap": "normal|break-word|anywhere",
    "overflow-x": "visible|hidden|clip|scroll|auto",
    "overflow-y": "visible|hidden|clip|scroll|auto",
    overlay: "none|auto",
    "overscroll-behavior": "[contain|none|auto]{1,2}",
    "overscroll-behavior-block": "contain|none|auto",
    "overscroll-behavior-inline": "contain|none|auto",
    "overscroll-behavior-x": "contain|none|auto",
    "overscroll-behavior-y": "contain|none|auto",
    padding: "[<length>|<percentage>]{1,4}",
    "padding-block": "<'padding-left'>{1,2}",
    "padding-block-end": "<'padding-left'>",
    "padding-block-start": "<'padding-left'>",
    "padding-bottom": "<length>|<percentage>",
    "padding-inline": "<'padding-left'>{1,2}",
    "padding-inline-end": "<'padding-left'>",
    "padding-inline-start": "<'padding-left'>",
    "padding-left": "<length>|<percentage>",
    "padding-right": "<length>|<percentage>",
    "padding-top": "<length>|<percentage>",
    page: "auto|<custom-ident>",
    "page-break-after": "auto|always|avoid|left|right|recto|verso",
    "page-break-before": "auto|always|avoid|left|right|recto|verso",
    "page-break-inside": "auto|avoid",
    "paint-order": "normal|[fill||stroke||markers]",
    perspective: "none|<length>",
    "perspective-origin": "<position>",
    "place-content": "<'align-content'> <'justify-content'>?",
    "place-items": "<'align-items'> <'justify-items'>?",
    "place-self": "<'align-self'> <'justify-self'>?",
    "pointer-events": "auto|none|visiblePainted|visibleFill|visibleStroke|visible|painted|fill|stroke|all|inherit",
    position: "static|relative|absolute|sticky|fixed|-webkit-sticky",
    "position-anchor": "auto|<anchor-name>",
    "position-area": "none|<position-area>",
    "position-try": "<'position-try-order'>? <'position-try-fallbacks'>",
    "position-try-fallbacks": "none|[[<dashed-ident>||<try-tactic>]|<'position-area'>]#",
    "position-try-order": "normal|<try-size>",
    "position-visibility": "always|[anchors-valid||anchors-visible||no-overflow]",
    "print-color-adjust": "economy|exact",
    quotes: "none|auto|[<string> <string>]+",
    r: "<length>|<percentage>",
    resize: "none|both|horizontal|vertical|block|inline",
    right: "<length>|<percentage>|auto",
    rotate: "none|<angle>|[x|y|z|<number>{3}]&&<angle>",
    "row-gap": "normal|<length-percentage>",
    "ruby-align": "start|center|space-between|space-around",
    "ruby-merge": "separate|collapse|auto",
    "ruby-position": "[alternate||[over|under]]|inter-character",
    rx: "<length>|<percentage>",
    ry: "<length>|<percentage>",
    scale: "none|<number>{1,3}",
    "scrollbar-color": "auto|<color>{2}",
    "scrollbar-gutter": "auto|stable&&both-edges?",
    "scrollbar-width": "auto|thin|none",
    "scroll-behavior": "auto|smooth",
    "scroll-margin": "<length>{1,4}",
    "scroll-margin-block": "<length>{1,2}",
    "scroll-margin-block-start": "<length>",
    "scroll-margin-block-end": "<length>",
    "scroll-margin-bottom": "<length>",
    "scroll-margin-inline": "<length>{1,2}",
    "scroll-margin-inline-start": "<length>",
    "scroll-margin-inline-end": "<length>",
    "scroll-margin-left": "<length>",
    "scroll-margin-right": "<length>",
    "scroll-margin-top": "<length>",
    "scroll-padding": "[auto|<length-percentage>]{1,4}",
    "scroll-padding-block": "[auto|<length-percentage>]{1,2}",
    "scroll-padding-block-start": "auto|<length-percentage>",
    "scroll-padding-block-end": "auto|<length-percentage>",
    "scroll-padding-bottom": "auto|<length-percentage>",
    "scroll-padding-inline": "[auto|<length-percentage>]{1,2}",
    "scroll-padding-inline-start": "auto|<length-percentage>",
    "scroll-padding-inline-end": "auto|<length-percentage>",
    "scroll-padding-left": "auto|<length-percentage>",
    "scroll-padding-right": "auto|<length-percentage>",
    "scroll-padding-top": "auto|<length-percentage>",
    "scroll-snap-align": "[none|start|end|center]{1,2}",
    "scroll-snap-coordinate": "none|<position>#",
    "scroll-snap-destination": "<position>",
    "scroll-snap-points-x": "none|repeat( <length-percentage> )",
    "scroll-snap-points-y": "none|repeat( <length-percentage> )",
    "scroll-snap-stop": "normal|always",
    "scroll-snap-type": "none|[x|y|block|inline|both] [mandatory|proximity]?",
    "scroll-snap-type-x": "none|mandatory|proximity",
    "scroll-snap-type-y": "none|mandatory|proximity",
    "scroll-timeline": "[<'scroll-timeline-name'>||<'scroll-timeline-axis'>]#",
    "scroll-timeline-axis": "[block|inline|x|y]#",
    "scroll-timeline-name": "[none|<dashed-ident>]#",
    "shape-image-threshold": "<alpha-value>",
    "shape-margin": "<length-percentage>",
    "shape-outside": "none|[<shape-box>||<basic-shape>]|<image>",
    "shape-rendering": "auto|optimizeSpeed|crispEdges|geometricPrecision",
    stroke: "<paint>",
    "stroke-dasharray": "none|[<svg-length>+]#",
    "stroke-dashoffset": "<svg-length>",
    "stroke-linecap": "butt|round|square",
    "stroke-linejoin": "miter|round|bevel",
    "stroke-miterlimit": "<number-one-or-greater>",
    "stroke-opacity": "<'opacity'>",
    "stroke-width": "<svg-length>",
    "tab-size": "<integer>|<length>",
    "table-layout": "auto|fixed",
    "text-align": "start|end|left|right|center|justify|match-parent",
    "text-align-last": "auto|start|end|left|right|center|justify",
    "text-anchor": "start|middle|end",
    "text-combine-upright": "none|all|[digits <integer>?]",
    "text-decoration": "<'text-decoration-line'>||<'text-decoration-style'>||<'text-decoration-color'>||<'text-decoration-thickness'>",
    "text-decoration-color": "<color>",
    "text-decoration-line": "none|[underline||overline||line-through||blink]|spelling-error|grammar-error",
    "text-decoration-skip": "none|[objects||[spaces|[leading-spaces||trailing-spaces]]||edges||box-decoration]",
    "text-decoration-skip-ink": "auto|all|none",
    "text-decoration-style": "solid|double|dotted|dashed|wavy",
    "text-decoration-thickness": "auto|from-font|<length>|<percentage>",
    "text-emphasis": "<'text-emphasis-style'>||<'text-emphasis-color'>",
    "text-emphasis-color": "<color>",
    "text-emphasis-position": "auto|[over|under]&&[right|left]?",
    "text-emphasis-style": "none|[[filled|open]||[dot|circle|double-circle|triangle|sesame]]|<string>",
    "text-indent": "<length-percentage>&&hanging?&&each-line?",
    "text-justify": "auto|inter-character|inter-word|none",
    "text-orientation": "mixed|upright|sideways",
    "text-overflow": "[clip|ellipsis|<string>]{1,2}",
    "text-rendering": "auto|optimizeSpeed|optimizeLegibility|geometricPrecision",
    "text-shadow": "none|<shadow-t>#",
    "text-size-adjust": "none|auto|<percentage>",
    "text-spacing-trim": "space-all|normal|space-first|trim-start|trim-both|trim-all|auto",
    "text-transform": "none|capitalize|uppercase|lowercase|full-width|full-size-kana",
    "text-underline-offset": "auto|<length>|<percentage>",
    "text-underline-position": "auto|from-font|[under||[left|right]]",
    "text-wrap": "<'text-wrap-mode'>||<'text-wrap-style'>",
    "text-wrap-mode": "auto|wrap|nowrap",
    "text-wrap-style": "auto|balance|stable|pretty",
    "timeline-scope": "none|<dashed-ident>#",
    top: "<length>|<percentage>|auto",
    "touch-action": "auto|none|[[pan-x|pan-left|pan-right]||[pan-y|pan-up|pan-down]||pinch-zoom]|manipulation",
    transform: "none|<transform-list>",
    "transform-box": "content-box|border-box|fill-box|stroke-box|view-box",
    "transform-origin": "[<length-percentage>|left|center|right|top|bottom]|[[<length-percentage>|left|center|right]&&[<length-percentage>|top|center|bottom]] <length>?",
    "transform-style": "flat|preserve-3d",
    transition: "<single-transition>#",
    "transition-behavior": "<transition-behavior-value>#",
    "transition-delay": "<time>#",
    "transition-duration": "<time>#",
    "transition-property": "none|<single-transition-property>#",
    "transition-timing-function": "<easing-function>#",
    translate: "none|<length-percentage> [<length-percentage> <length>?]?",
    "unicode-bidi": "normal|embed|isolate|bidi-override|isolate-override|plaintext|-moz-isolate|-moz-isolate-override|-moz-plaintext|-webkit-isolate|-webkit-isolate-override|-webkit-plaintext",
    "user-select": "auto|text|none|contain|all",
    "vector-effect": "none|non-scaling-stroke|non-scaling-size|non-rotation|fixed-position",
    "vertical-align": "baseline|sub|super|text-top|text-bottom|middle|top|bottom|<percentage>|<length>",
    "view-timeline": "[<'view-timeline-name'> <'view-timeline-axis'>?]#",
    "view-timeline-axis": "[block|inline|x|y]#",
    "view-timeline-inset": "[[auto|<length-percentage>]{1,2}]#",
    "view-timeline-name": "none|<dashed-ident>#",
    "view-transition-name": "none|<custom-ident>",
    visibility: "visible|hidden|collapse",
    "white-space": "normal|pre|nowrap|pre-wrap|pre-line|break-spaces|[<'white-space-collapse'>||<'text-wrap'>||<'white-space-trim'>]",
    "white-space-collapse": "collapse|discard|preserve|preserve-breaks|preserve-spaces|break-spaces",
    widows: "<integer>",
    width: "auto|<length>|<percentage>|min-content|max-content|fit-content|fit-content( <length-percentage> )|stretch|<-non-standard-size>",
    "will-change": "auto|<animateable-feature>#",
    "word-break": "normal|break-all|keep-all|break-word|auto-phrase",
    "word-spacing": "normal|<length>",
    "word-wrap": "normal|break-word",
    "writing-mode": "horizontal-tb|vertical-rl|vertical-lr|sideways-rl|sideways-lr|<svg-writing-mode>",
    x: "<length>|<percentage>",
    y: "<length>|<percentage>",
    "z-index": "auto|<integer>",
    zoom: "normal|reset|<number>|<percentage>",
    "-moz-background-clip": "padding|border",
    "-moz-border-radius-bottomleft": "<'border-bottom-left-radius'>",
    "-moz-border-radius-bottomright": "<'border-bottom-right-radius'>",
    "-moz-border-radius-topleft": "<'border-top-left-radius'>",
    "-moz-border-radius-topright": "<'border-bottom-right-radius'>",
    "-moz-control-character-visibility": "visible|hidden",
    "-moz-osx-font-smoothing": "auto|grayscale",
    "-moz-user-select": "none|text|all|-moz-none",
    "-ms-flex-align": "start|end|center|baseline|stretch",
    "-ms-flex-item-align": "auto|start|end|center|baseline|stretch",
    "-ms-flex-line-pack": "start|end|center|justify|distribute|stretch",
    "-ms-flex-negative": "<'flex-shrink'>",
    "-ms-flex-pack": "start|end|center|justify|distribute",
    "-ms-flex-order": "<integer>",
    "-ms-flex-positive": "<'flex-grow'>",
    "-ms-flex-preferred-size": "<'flex-basis'>",
    "-ms-interpolation-mode": "nearest-neighbor|bicubic",
    "-ms-grid-column-align": "start|end|center|stretch",
    "-ms-grid-row-align": "start|end|center|stretch",
    "-ms-hyphenate-limit-last": "none|always|column|page|spread",
    "-webkit-background-clip": "[<box>|border|padding|content|text]#",
    "-webkit-column-break-after": "always|auto|avoid",
    "-webkit-column-break-before": "always|auto|avoid",
    "-webkit-column-break-inside": "always|auto|avoid",
    "-webkit-font-smoothing": "auto|none|antialiased|subpixel-antialiased",
    "-webkit-mask-box-image": "[<url>|<gradient>|none] [<length-percentage>{4} <-webkit-mask-box-repeat>{2}]?",
    "-webkit-print-color-adjust": "economy|exact",
    "-webkit-text-security": "none|circle|disc|square",
    "-webkit-user-drag": "none|element|auto",
    "-webkit-user-select": "auto|none|text|all",
    "alignment-baseline": "auto|baseline|before-edge|text-before-edge|middle|central|after-edge|text-after-edge|ideographic|alphabetic|hanging|mathematical",
    "baseline-shift": "baseline|sub|super|<svg-length>",
    behavior: "<url>+",
    cue: "<'cue-before'> <'cue-after'>?",
    "cue-after": "<url> <decibel>?|none",
    "cue-before": "<url> <decibel>?|none",
    "glyph-orientation-horizontal": "<angle>",
    "glyph-orientation-vertical": "<angle>",
    kerning: "auto|<svg-length>",
    pause: "<'pause-before'> <'pause-after'>?",
    "pause-after": "<time>|none|x-weak|weak|medium|strong|x-strong",
    "pause-before": "<time>|none|x-weak|weak|medium|strong|x-strong",
    rest: "<'rest-before'> <'rest-after'>?",
    "rest-after": "<time>|none|x-weak|weak|medium|strong|x-strong",
    "rest-before": "<time>|none|x-weak|weak|medium|strong|x-strong",
    src: "[<url> [format( <string># )]?|local( <family-name> )]#",
    speak: "auto|never|always",
    "speak-as": "normal|spell-out||digits||[literal-punctuation|no-punctuation]",
    "unicode-range": "<urange>#",
    "voice-balance": "<number>|left|center|right|leftwards|rightwards",
    "voice-duration": "auto|<time>",
    "voice-family": "[[<family-name>|<generic-voice>] ,]* [<family-name>|<generic-voice>]|preserve",
    "voice-pitch": "<frequency>&&absolute|[[x-low|low|medium|high|x-high]||[<frequency>|<semitones>|<percentage>]]",
    "voice-range": "<frequency>&&absolute|[[x-low|low|medium|high|x-high]||[<frequency>|<semitones>|<percentage>]]",
    "voice-rate": "[normal|x-slow|slow|medium|fast|x-fast]||<percentage>",
    "voice-stress": "normal|strong|moderate|none|reduced",
    "voice-volume": "silent|[[x-soft|soft|medium|loud|x-loud]||<decibel>]",
    "white-space-trim": "none|discard-before||discard-after||discard-inner"
  },
  atrules: {
    charset: {
      prelude: "<string>",
      descriptors: null
    },
    "counter-style": {
      prelude: "<counter-style-name>",
      descriptors: {
        "additive-symbols": "[<integer>&&<symbol>]#",
        fallback: "<counter-style-name>",
        negative: "<symbol> <symbol>?",
        pad: "<integer>&&<symbol>",
        prefix: "<symbol>",
        range: "[[<integer>|infinite]{2}]#|auto",
        "speak-as": "auto|bullets|numbers|words|spell-out|<counter-style-name>",
        suffix: "<symbol>",
        symbols: "<symbol>+",
        system: "cyclic|numeric|alphabetic|symbolic|additive|[fixed <integer>?]|[extends <counter-style-name>]"
      }
    },
    document: {
      prelude: "[<url>|url-prefix( <string> )|domain( <string> )|media-document( <string> )|regexp( <string> )]#",
      descriptors: null
    },
    "font-palette-values": {
      prelude: "<dashed-ident>",
      descriptors: {
        "base-palette": "light|dark|<integer [0,∞]>",
        "font-family": "<family-name>#",
        "override-colors": "[<integer [0,∞]> <absolute-color-base>]#"
      }
    },
    "font-face": {
      prelude: null,
      descriptors: {
        "ascent-override": "normal|<percentage>",
        "descent-override": "normal|<percentage>",
        "font-display": "[auto|block|swap|fallback|optional]",
        "font-family": "<family-name>",
        "font-feature-settings": "normal|<feature-tag-value>#",
        "font-variation-settings": "normal|[<string> <number>]#",
        "font-stretch": "<font-stretch-absolute>{1,2}",
        "font-style": "normal|italic|oblique <angle>{0,2}",
        "font-weight": "<font-weight-absolute>{1,2}",
        "line-gap-override": "normal|<percentage>",
        "size-adjust": "<percentage>",
        src: "[<url> [format( <string># )]?|local( <family-name> )]#",
        "unicode-range": "<urange>#"
      }
    },
    "font-feature-values": {
      prelude: "<family-name>#",
      descriptors: null
    },
    import: {
      prelude: "[<string>|<url>] [layer|layer( <layer-name> )]? [supports( [<supports-condition>|<declaration>] )]? <media-query-list>?",
      descriptors: null
    },
    keyframes: {
      prelude: "<keyframes-name>",
      descriptors: null
    },
    layer: {
      prelude: "[<layer-name>#|<layer-name>?]",
      descriptors: null
    },
    media: {
      prelude: "<media-query-list>",
      descriptors: null
    },
    namespace: {
      prelude: "<namespace-prefix>? [<string>|<url>]",
      descriptors: null
    },
    page: {
      prelude: "<page-selector-list>",
      descriptors: {
        bleed: "auto|<length>",
        marks: "none|[crop||cross]",
        "page-orientation": "upright|rotate-left|rotate-right",
        size: "<length>{1,2}|auto|[<page-size>||[portrait|landscape]]"
      }
    },
    "position-try": {
      prelude: "<dashed-ident>",
      descriptors: {
        top: "<'top'>",
        left: "<'left'>",
        bottom: "<'bottom'>",
        right: "<'right'>",
        "inset-block-start": "<'inset-block-start'>",
        "inset-block-end": "<'inset-block-end'>",
        "inset-inline-start": "<'inset-inline-start'>",
        "inset-inline-end": "<'inset-inline-end'>",
        "inset-block": "<'inset-block'>",
        "inset-inline": "<'inset-inline'>",
        inset: "<'inset'>",
        "margin-top": "<'margin-top'>",
        "margin-left": "<'margin-left'>",
        "margin-bottom": "<'margin-bottom'>",
        "margin-right": "<'margin-right'>",
        "margin-block-start": "<'margin-block-start'>",
        "margin-block-end": "<'margin-block-end'>",
        "margin-inline-start": "<'margin-inline-start'>",
        "margin-inline-end": "<'margin-inline-end'>",
        margin: "<'margin'>",
        "margin-block": "<'margin-block'>",
        "margin-inline": "<'margin-inline'>",
        width: "<'width'>",
        height: "<'height'>",
        "min-width": "<'min-width'>",
        "min-height": "<'min-height'>",
        "max-width": "<'max-width'>",
        "max-height": "<'max-height'>",
        "block-size": "<'block-size'>",
        "inline-size": "<'inline-size'>",
        "min-block-size": "<'min-block-size'>",
        "min-inline-size": "<'min-inline-size'>",
        "max-block-size": "<'max-block-size'>",
        "max-inline-size": "<'max-inline-size'>",
        "align-self": "<'align-self'>|anchor-center",
        "justify-self": "<'justify-self'>|anchor-center"
      }
    },
    property: {
      prelude: "<custom-property-name>",
      descriptors: {
        syntax: "<string>",
        inherits: "true|false",
        "initial-value": "<declaration-value>?"
      }
    },
    scope: {
      prelude: "[( <scope-start> )]? [to ( <scope-end> )]?",
      descriptors: null
    },
    "starting-style": {
      prelude: null,
      descriptors: null
    },
    supports: {
      prelude: "<supports-condition>",
      descriptors: null
    },
    container: {
      prelude: "[<container-name>]? <container-condition>",
      descriptors: null
    },
    nest: {
      prelude: "<complex-selector-list>",
      descriptors: null
    }
  }
}, me = 43, ee = 45, gt = 110, Ce = !0, kl = !1;
function bt(e, t) {
  let n = this.tokenStart + e;
  const r = this.charCodeAt(n);
  for ((r === me || r === ee) && (t && this.error("Number sign is not allowed"), n++); n < this.tokenEnd; n++)
    V(this.charCodeAt(n)) || this.error("Integer is expected", n);
}
function Ie(e) {
  return bt.call(this, 0, e);
}
function ke(e, t) {
  if (!this.cmpChar(this.tokenStart + e, t)) {
    let n = "";
    switch (t) {
      case gt:
        n = "N is expected";
        break;
      case ee:
        n = "HyphenMinus is expected";
        break;
    }
    this.error(n, this.tokenStart + e);
  }
}
function tn() {
  let e = 0, t = 0, n = this.tokenType;
  for (; n === j || n === q; )
    n = this.lookupType(++e);
  if (n !== v)
    if (this.isDelim(me, e) || this.isDelim(ee, e)) {
      t = this.isDelim(me, e) ? me : ee;
      do
        n = this.lookupType(++e);
      while (n === j || n === q);
      n !== v && (this.skip(e), Ie.call(this, Ce));
    } else
      return null;
  return e > 0 && this.skip(e), t === 0 && (n = this.charCodeAt(this.tokenStart), n !== me && n !== ee && this.error("Number sign is expected")), Ie.call(this, t !== 0), t === ee ? "-" + this.consume(v) : this.consume(v);
}
const wl = "AnPlusB", xl = {
  a: [String, null],
  b: [String, null]
};
function Ki() {
  const e = this.tokenStart;
  let t = null, n = null;
  if (this.tokenType === v)
    Ie.call(this, kl), n = this.consume(v);
  else if (this.tokenType === b && this.cmpChar(this.tokenStart, ee))
    switch (t = "-1", ke.call(this, 1, gt), this.tokenEnd - this.tokenStart) {
      case 2:
        this.next(), n = tn.call(this);
        break;
      case 3:
        ke.call(this, 2, ee), this.next(), this.skipSC(), Ie.call(this, Ce), n = "-" + this.consume(v);
        break;
      default:
        ke.call(this, 2, ee), bt.call(this, 3, Ce), this.next(), n = this.substrToCursor(e + 2);
    }
  else if (this.tokenType === b || this.isDelim(me) && this.lookupType(1) === b) {
    let r = 0;
    switch (t = "1", this.isDelim(me) && (r = 1, this.next()), ke.call(this, 0, gt), this.tokenEnd - this.tokenStart) {
      case 1:
        this.next(), n = tn.call(this);
        break;
      case 2:
        ke.call(this, 1, ee), this.next(), this.skipSC(), Ie.call(this, Ce), n = "-" + this.consume(v);
        break;
      default:
        ke.call(this, 1, ee), bt.call(this, 2, Ce), this.next(), n = this.substrToCursor(e + r + 1);
    }
  } else if (this.tokenType === T) {
    const r = this.charCodeAt(this.tokenStart), i = r === me || r === ee;
    let o = this.tokenStart + i;
    for (; o < this.tokenEnd && V(this.charCodeAt(o)); o++)
      ;
    o === this.tokenStart + i && this.error("Integer is expected", this.tokenStart + i), ke.call(this, o - this.tokenStart, gt), t = this.substring(e, o), o + 1 === this.tokenEnd ? (this.next(), n = tn.call(this)) : (ke.call(this, o - this.tokenStart + 1, ee), o + 2 === this.tokenEnd ? (this.next(), this.skipSC(), Ie.call(this, Ce), n = "-" + this.consume(v)) : (bt.call(this, o - this.tokenStart + 2, Ce), this.next(), n = this.substrToCursor(o + 1)));
  } else
    this.error();
  return t !== null && t.charCodeAt(0) === me && (t = t.substr(1)), n !== null && n.charCodeAt(0) === me && (n = n.substr(1)), {
    type: "AnPlusB",
    loc: this.getLocation(e, this.tokenStart),
    a: t,
    b: n
  };
}
function vl(e) {
  if (e.a) {
    const t = e.a === "+1" && "n" || e.a === "1" && "n" || e.a === "-1" && "-n" || e.a + "n";
    if (e.b) {
      const n = e.b[0] === "-" || e.b[0] === "+" ? e.b : "+" + e.b;
      this.tokenize(t + n);
    } else
      this.tokenize(t);
  } else
    this.tokenize(e.b);
}
const Sl = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  generate: vl,
  name: wl,
  parse: Ki,
  structure: xl
}, Symbol.toStringTag, { value: "Module" }));
function Rr() {
  return this.Raw(this.consumeUntilLeftCurlyBracketOrSemicolon, !0);
}
function Cl() {
  for (let e = 1, t; t = this.lookupType(e); e++) {
    if (t === ie)
      return !0;
    if (t === H || t === D)
      return !1;
  }
  return !1;
}
const El = "Atrule", Tl = "atrule", Al = {
  name: String,
  prelude: ["AtrulePrelude", "Raw", null],
  block: ["Block", null]
};
function Qi(e = !1) {
  const t = this.tokenStart;
  let n, r, i = null, o = null;
  switch (this.eat(D), n = this.substrToCursor(t + 1), r = n.toLowerCase(), this.skipSC(), this.eof === !1 && this.tokenType !== H && this.tokenType !== K && (this.parseAtrulePrelude ? i = this.parseWithFallback(this.AtrulePrelude.bind(this, n, e), Rr) : i = Rr.call(this, this.tokenIndex), this.skipSC()), this.tokenType) {
    case K:
      this.next();
      break;
    case H:
      hasOwnProperty.call(this.atrule, r) && typeof this.atrule[r].block == "function" ? o = this.atrule[r].block.call(this, e) : o = this.Block(Cl.call(this));
      break;
  }
  return {
    type: "Atrule",
    loc: this.getLocation(t, this.tokenStart),
    name: n,
    prelude: i,
    block: o
  };
}
function $l(e) {
  this.token(D, "@" + e.name), e.prelude !== null && this.node(e.prelude), e.block ? this.node(e.block) : this.token(K, ";");
}
const Ol = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  generate: $l,
  name: El,
  parse: Qi,
  structure: Al,
  walkContext: Tl
}, Symbol.toStringTag, { value: "Module" })), Ll = "AtrulePrelude", Pl = "atrulePrelude", _l = {
  children: [[]]
};
function Yi(e) {
  let t = null;
  return e !== null && (e = e.toLowerCase()), this.skipSC(), hasOwnProperty.call(this.atrule, e) && typeof this.atrule[e].prelude == "function" ? t = this.atrule[e].prelude.call(this) : t = this.readSequence(this.scope.AtrulePrelude), this.skipSC(), this.eof !== !0 && this.tokenType !== H && this.tokenType !== K && this.error("Semicolon or block is expected"), {
    type: "AtrulePrelude",
    loc: this.getLocationFromList(t),
    children: t
  };
}
function Il(e) {
  this.children(e);
}
const zl = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  generate: Il,
  name: Ll,
  parse: Yi,
  structure: _l,
  walkContext: Pl
}, Symbol.toStringTag, { value: "Module" })), Ml = 36, Xi = 42, yt = 61, Nl = 94, kn = 124, jl = 126;
function Fl() {
  this.eof && this.error("Unexpected end of input");
  const e = this.tokenStart;
  let t = !1;
  return this.isDelim(Xi) ? (t = !0, this.next()) : this.isDelim(kn) || this.eat(b), this.isDelim(kn) ? this.charCodeAt(this.tokenStart + 1) !== yt ? (this.next(), this.eat(b)) : t && this.error("Identifier is expected", this.tokenEnd) : t && this.error("Vertical line is expected"), {
    type: "Identifier",
    loc: this.getLocation(e, this.tokenStart),
    name: this.substrToCursor(e)
  };
}
function Dl() {
  const e = this.tokenStart, t = this.charCodeAt(e);
  return t !== yt && // =
  t !== jl && // ~=
  t !== Nl && // ^=
  t !== Ml && // $=
  t !== Xi && // *=
  t !== kn && this.error("Attribute selector (=, ~=, ^=, $=, *=, |=) is expected"), this.next(), t !== yt && (this.isDelim(yt) || this.error("Equal sign is expected"), this.next()), this.substrToCursor(e);
}
const Rl = "AttributeSelector", Bl = {
  name: "Identifier",
  matcher: [String, null],
  value: ["String", "Identifier", null],
  flags: [String, null]
};
function Ji() {
  const e = this.tokenStart;
  let t, n = null, r = null, i = null;
  return this.eat(te), this.skipSC(), t = Fl.call(this), this.skipSC(), this.tokenType !== ue && (this.tokenType !== b && (n = Dl.call(this), this.skipSC(), r = this.tokenType === he ? this.String() : this.Identifier(), this.skipSC()), this.tokenType === b && (i = this.consume(b), this.skipSC())), this.eat(ue), {
    type: "AttributeSelector",
    loc: this.getLocation(e, this.tokenStart),
    name: t,
    matcher: n,
    value: r,
    flags: i
  };
}
function Hl(e) {
  this.token(A, "["), this.node(e.name), e.matcher !== null && (this.tokenize(e.matcher), this.node(e.value)), e.flags !== null && this.token(b, e.flags), this.token(A, "]");
}
const Vl = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  generate: Hl,
  name: Rl,
  parse: Ji,
  structure: Bl
}, Symbol.toStringTag, { value: "Module" })), ql = 38;
function Zi() {
  return this.Raw(null, !0);
}
function Br() {
  return this.parseWithFallback(this.Rule, Zi);
}
function Hr() {
  return this.Raw(this.consumeUntilSemicolonIncluded, !0);
}
function Wl() {
  if (this.tokenType === K)
    return Hr.call(this, this.tokenIndex);
  const e = this.parseWithFallback(this.Declaration, Hr);
  return this.tokenType === K && this.next(), e;
}
const Ul = "Block", Gl = "block", Kl = {
  children: [[
    "Atrule",
    "Rule",
    "Declaration"
  ]]
};
function eo(e) {
  const t = e ? Wl : Br, n = this.tokenStart;
  let r = this.createList();
  this.eat(H);
  e:
    for (; !this.eof; )
      switch (this.tokenType) {
        case ie:
          break e;
        case j:
        case q:
          this.next();
          break;
        case D:
          r.push(this.parseWithFallback(this.Atrule.bind(this, e), Zi));
          break;
        default:
          e && this.isDelim(ql) ? r.push(Br.call(this)) : r.push(t.call(this));
      }
  return this.eof || this.eat(ie), {
    type: "Block",
    loc: this.getLocation(n, this.tokenStart),
    children: r
  };
}
function Ql(e) {
  this.token(H, "{"), this.children(e, (t) => {
    t.type === "Declaration" && this.token(K, ";");
  }), this.token(ie, "}");
}
const Yl = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  generate: Ql,
  name: Ul,
  parse: eo,
  structure: Kl,
  walkContext: Gl
}, Symbol.toStringTag, { value: "Module" })), Xl = "Brackets", Jl = {
  children: [[]]
};
function to(e, t) {
  const n = this.tokenStart;
  let r = null;
  return this.eat(te), r = e.call(this, t), this.eof || this.eat(ue), {
    type: "Brackets",
    loc: this.getLocation(n, this.tokenStart),
    children: r
  };
}
function Zl(e) {
  this.token(A, "["), this.children(e), this.token(A, "]");
}
const ec = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  generate: Zl,
  name: Xl,
  parse: to,
  structure: Jl
}, Symbol.toStringTag, { value: "Module" })), tc = "CDC", nc = [];
function no() {
  const e = this.tokenStart;
  return this.eat(J), {
    type: "CDC",
    loc: this.getLocation(e, this.tokenStart)
  };
}
function rc() {
  this.token(J, "-->");
}
const ic = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  generate: rc,
  name: tc,
  parse: no,
  structure: nc
}, Symbol.toStringTag, { value: "Module" })), oc = "CDO", sc = [];
function ro() {
  const e = this.tokenStart;
  return this.eat(nt), {
    type: "CDO",
    loc: this.getLocation(e, this.tokenStart)
  };
}
function ac() {
  this.token(nt, "<!--");
}
const lc = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  generate: ac,
  name: oc,
  parse: ro,
  structure: sc
}, Symbol.toStringTag, { value: "Module" })), cc = 46, uc = "ClassSelector", hc = {
  name: String
};
function io() {
  return this.eatDelim(cc), {
    type: "ClassSelector",
    loc: this.getLocation(this.tokenStart - 1, this.tokenEnd),
    name: this.consume(b)
  };
}
function pc(e) {
  this.token(A, "."), this.token(b, e.name);
}
const dc = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  generate: pc,
  name: uc,
  parse: io,
  structure: hc
}, Symbol.toStringTag, { value: "Module" })), mc = 43, Vr = 47, fc = 62, gc = 126, bc = "Combinator", yc = {
  name: String
};
function oo() {
  const e = this.tokenStart;
  let t;
  switch (this.tokenType) {
    case j:
      t = " ";
      break;
    case A:
      switch (this.charCodeAt(this.tokenStart)) {
        case fc:
        case mc:
        case gc:
          this.next();
          break;
        case Vr:
          this.next(), this.eatIdent("deep"), this.eatDelim(Vr);
          break;
        default:
          this.error("Combinator is expected");
      }
      t = this.substrToCursor(e);
      break;
  }
  return {
    type: "Combinator",
    loc: this.getLocation(e, this.tokenStart),
    name: t
  };
}
function kc(e) {
  this.tokenize(e.name);
}
const wc = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  generate: kc,
  name: bc,
  parse: oo,
  structure: yc
}, Symbol.toStringTag, { value: "Module" })), xc = 42, vc = 47, Sc = "Comment", Cc = {
  value: String
};
function so() {
  const e = this.tokenStart;
  let t = this.tokenEnd;
  return this.eat(q), t - e + 2 >= 2 && this.charCodeAt(t - 2) === xc && this.charCodeAt(t - 1) === vc && (t -= 2), {
    type: "Comment",
    loc: this.getLocation(e, this.tokenStart),
    value: this.substring(e + 2, t)
  };
}
function Ec(e) {
  this.token(q, "/*" + e.value + "*/");
}
const Tc = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  generate: Ec,
  name: Sc,
  parse: so,
  structure: Cc
}, Symbol.toStringTag, { value: "Module" })), Ac = /* @__PURE__ */ new Set([G, x, xe]), $c = "Condition", Oc = {
  kind: String,
  children: [[
    "Identifier",
    "Feature",
    "FeatureFunction",
    "FeatureRange",
    "SupportsDeclaration"
  ]]
};
function qr(e) {
  return this.lookupTypeNonSC(1) === b && Ac.has(this.lookupTypeNonSC(2)) ? this.Feature(e) : this.FeatureRange(e);
}
const Lc = {
  media: qr,
  container: qr,
  supports() {
    return this.SupportsDeclaration();
  }
};
function ao(e = "media") {
  const t = this.createList();
  e: for (; !this.eof; )
    switch (this.tokenType) {
      case q:
      case j:
        this.next();
        continue;
      case b:
        t.push(this.Identifier());
        break;
      case $: {
        let n = this.parseWithFallback(
          () => Lc[e].call(this, e),
          () => null
        );
        n || (n = this.parseWithFallback(
          () => {
            this.eat($);
            const r = this.Condition(e);
            return this.eat(x), r;
          },
          () => this.GeneralEnclosed(e)
        )), t.push(n);
        break;
      }
      case C: {
        let n = this.parseWithFallback(
          () => this.FeatureFunction(e),
          () => null
        );
        n || (n = this.GeneralEnclosed(e)), t.push(n);
        break;
      }
      default:
        break e;
    }
  return t.isEmpty && this.error("Condition is expected"), {
    type: "Condition",
    loc: this.getLocationFromList(t),
    kind: e,
    children: t
  };
}
function Pc(e) {
  e.children.forEach((t) => {
    t.type === "Condition" ? (this.token($, "("), this.node(t), this.token(x, ")")) : this.node(t);
  });
}
const _c = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  generate: Pc,
  name: $c,
  parse: ao,
  structure: Oc
}, Symbol.toStringTag, { value: "Module" })), lo = 33, Ic = 35, zc = 36, Mc = 38, Nc = 42, jc = 43, Wr = 47;
function Fc() {
  return this.Raw(this.consumeUntilExclamationMarkOrSemicolon, !0);
}
function Dc() {
  return this.Raw(this.consumeUntilExclamationMarkOrSemicolon, !1);
}
function Rc() {
  const e = this.tokenIndex, t = this.Value();
  return t.type !== "Raw" && this.eof === !1 && this.tokenType !== K && this.isDelim(lo) === !1 && this.isBalanceEdge(e) === !1 && this.error(), t;
}
const Bc = "Declaration", Hc = "declaration", Vc = {
  important: [Boolean, String],
  property: String,
  value: ["Value", "Raw"]
};
function co() {
  const e = this.tokenStart, t = this.tokenIndex, n = Wc.call(this), r = Dn(n), i = r ? this.parseCustomProperty : this.parseValue, o = r ? Dc : Fc;
  let s = !1, c;
  this.skipSC(), this.eat(G);
  const l = this.tokenIndex;
  if (r || this.skipSC(), i ? c = this.parseWithFallback(Rc, o) : c = o.call(this, this.tokenIndex), r && c.type === "Value" && c.children.isEmpty) {
    for (let a = l - this.tokenIndex; a <= 0; a++)
      if (this.lookupType(a) === j) {
        c.children.appendData({
          type: "WhiteSpace",
          loc: null,
          value: " "
        });
        break;
      }
  }
  return this.isDelim(lo) && (s = Uc.call(this), this.skipSC()), this.eof === !1 && this.tokenType !== K && this.isBalanceEdge(t) === !1 && this.error(), {
    type: "Declaration",
    loc: this.getLocation(e, this.tokenStart),
    important: s,
    property: n,
    value: c
  };
}
function qc(e) {
  this.token(b, e.property), this.token(G, ":"), this.node(e.value), e.important && (this.token(A, "!"), this.token(b, e.important === !0 ? "important" : e.important));
}
function Wc() {
  const e = this.tokenStart;
  if (this.tokenType === A)
    switch (this.charCodeAt(this.tokenStart)) {
      case Nc:
      case zc:
      case jc:
      case Ic:
      case Mc:
        this.next();
        break;
      case Wr:
        this.next(), this.isDelim(Wr) && this.next();
        break;
    }
  return this.tokenType === I ? this.eat(I) : this.eat(b), this.substrToCursor(e);
}
function Uc() {
  this.eat(A), this.skipSC();
  const e = this.consume(b);
  return e === "important" ? !0 : e;
}
const Gc = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  generate: qc,
  name: Bc,
  parse: co,
  structure: Vc,
  walkContext: Hc
}, Symbol.toStringTag, { value: "Module" })), Kc = 38;
function nn() {
  return this.Raw(this.consumeUntilSemicolonIncluded, !0);
}
const Qc = "DeclarationList", Yc = {
  children: [[
    "Declaration",
    "Atrule",
    "Rule"
  ]]
};
function uo() {
  const e = this.createList();
  for (; !this.eof; )
    switch (this.tokenType) {
      case j:
      case q:
      case K:
        this.next();
        break;
      case D:
        e.push(this.parseWithFallback(this.Atrule.bind(this, !0), nn));
        break;
      default:
        this.isDelim(Kc) ? e.push(this.parseWithFallback(this.Rule, nn)) : e.push(this.parseWithFallback(this.Declaration, nn));
    }
  return {
    type: "DeclarationList",
    loc: this.getLocationFromList(e),
    children: e
  };
}
function Xc(e) {
  this.children(e, (t) => {
    t.type === "Declaration" && this.token(K, ";");
  });
}
const Jc = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  generate: Xc,
  name: Qc,
  parse: uo,
  structure: Yc
}, Symbol.toStringTag, { value: "Module" })), Zc = "Dimension", eu = {
  value: String,
  unit: String
};
function ho() {
  const e = this.tokenStart, t = this.consumeNumber(T);
  return {
    type: "Dimension",
    loc: this.getLocation(e, this.tokenStart),
    value: t,
    unit: this.substring(e + t.length, this.tokenStart)
  };
}
function tu(e) {
  this.token(T, e.value + e.unit);
}
const nu = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  generate: tu,
  name: Zc,
  parse: ho,
  structure: eu
}, Symbol.toStringTag, { value: "Module" })), ru = 47, iu = "Feature", ou = {
  kind: String,
  name: String,
  value: ["Identifier", "Number", "Dimension", "Ratio", "Function", null]
};
function po(e) {
  const t = this.tokenStart;
  let n, r = null;
  if (this.eat($), this.skipSC(), n = this.consume(b), this.skipSC(), this.tokenType !== x) {
    switch (this.eat(G), this.skipSC(), this.tokenType) {
      case v:
        this.lookupNonWSType(1) === A ? r = this.Ratio() : r = this.Number();
        break;
      case T:
        r = this.Dimension();
        break;
      case b:
        r = this.Identifier();
        break;
      case C:
        r = this.parseWithFallback(
          () => {
            const i = this.Function(this.readSequence, this.scope.Value);
            return this.skipSC(), this.isDelim(ru) && this.error(), i;
          },
          () => this.Ratio()
        );
        break;
      default:
        this.error("Number, dimension, ratio or identifier is expected");
    }
    this.skipSC();
  }
  return this.eof || this.eat(x), {
    type: "Feature",
    loc: this.getLocation(t, this.tokenStart),
    kind: e,
    name: n,
    value: r
  };
}
function su(e) {
  this.token($, "("), this.token(b, e.name), e.value !== null && (this.token(G, ":"), this.node(e.value)), this.token(x, ")");
}
const au = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  generate: su,
  name: iu,
  parse: po,
  structure: ou
}, Symbol.toStringTag, { value: "Module" })), lu = "FeatureFunction", cu = {
  kind: String,
  feature: String,
  value: ["Declaration", "Selector"]
};
function uu(e, t) {
  const r = (this.features[e] || {})[t];
  return typeof r != "function" && this.error(`Unknown feature ${t}()`), r;
}
function mo(e = "unknown") {
  const t = this.tokenStart, n = this.consumeFunctionName(), r = uu.call(this, e, n.toLowerCase());
  this.skipSC();
  const i = this.parseWithFallback(
    () => {
      const o = this.tokenIndex, s = r.call(this);
      return this.eof === !1 && this.isBalanceEdge(o) === !1 && this.error(), s;
    },
    () => this.Raw(null, !1)
  );
  return this.eof || this.eat(x), {
    type: "FeatureFunction",
    loc: this.getLocation(t, this.tokenStart),
    kind: e,
    feature: n,
    value: i
  };
}
function hu(e) {
  this.token(C, e.feature + "("), this.node(e.value), this.token(x, ")");
}
const pu = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  generate: hu,
  name: lu,
  parse: mo,
  structure: cu
}, Symbol.toStringTag, { value: "Module" })), Ur = 47, du = 60, Gr = 61, mu = 62, fu = "FeatureRange", gu = {
  kind: String,
  left: ["Identifier", "Number", "Dimension", "Ratio", "Function"],
  leftComparison: String,
  middle: ["Identifier", "Number", "Dimension", "Ratio", "Function"],
  rightComparison: [String, null],
  right: ["Identifier", "Number", "Dimension", "Ratio", "Function", null]
};
function rn() {
  switch (this.skipSC(), this.tokenType) {
    case v:
      return this.isDelim(Ur, this.lookupOffsetNonSC(1)) ? this.Ratio() : this.Number();
    case T:
      return this.Dimension();
    case b:
      return this.Identifier();
    case C:
      return this.parseWithFallback(
        () => {
          const e = this.Function(this.readSequence, this.scope.Value);
          return this.skipSC(), this.isDelim(Ur) && this.error(), e;
        },
        () => this.Ratio()
      );
    default:
      this.error("Number, dimension, ratio or identifier is expected");
  }
}
function Kr(e) {
  if (this.skipSC(), this.isDelim(du) || this.isDelim(mu)) {
    const t = this.source[this.tokenStart];
    return this.next(), this.isDelim(Gr) ? (this.next(), t + "=") : t;
  }
  if (this.isDelim(Gr))
    return "=";
  this.error(`Expected ${e ? '":", ' : ""}"<", ">", "=" or ")"`);
}
function fo(e = "unknown") {
  const t = this.tokenStart;
  this.skipSC(), this.eat($);
  const n = rn.call(this), r = Kr.call(this, n.type === "Identifier"), i = rn.call(this);
  let o = null, s = null;
  return this.lookupNonWSType(0) !== x && (o = Kr.call(this), s = rn.call(this)), this.skipSC(), this.eat(x), {
    type: "FeatureRange",
    loc: this.getLocation(t, this.tokenStart),
    kind: e,
    left: n,
    leftComparison: r,
    middle: i,
    rightComparison: o,
    right: s
  };
}
function bu(e) {
  this.token($, "("), this.node(e.left), this.tokenize(e.leftComparison), this.node(e.middle), e.right && (this.tokenize(e.rightComparison), this.node(e.right)), this.token(x, ")");
}
const yu = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  generate: bu,
  name: fu,
  parse: fo,
  structure: gu
}, Symbol.toStringTag, { value: "Module" })), ku = "Function", wu = "function", xu = {
  name: String,
  children: [[]]
};
function go(e, t) {
  const n = this.tokenStart, r = this.consumeFunctionName(), i = r.toLowerCase();
  let o;
  return o = t.hasOwnProperty(i) ? t[i].call(this, t) : e.call(this, t), this.eof || this.eat(x), {
    type: "Function",
    loc: this.getLocation(n, this.tokenStart),
    name: r,
    children: o
  };
}
function vu(e) {
  this.token(C, e.name + "("), this.children(e), this.token(x, ")");
}
const Su = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  generate: vu,
  name: ku,
  parse: go,
  structure: xu,
  walkContext: wu
}, Symbol.toStringTag, { value: "Module" })), Cu = "GeneralEnclosed", Eu = {
  kind: String,
  function: [String, null],
  children: [[]]
};
function bo(e) {
  const t = this.tokenStart;
  let n = null;
  this.tokenType === C ? n = this.consumeFunctionName() : this.eat($);
  const r = this.parseWithFallback(
    () => {
      const i = this.tokenIndex, o = this.readSequence(this.scope.Value);
      return this.eof === !1 && this.isBalanceEdge(i) === !1 && this.error(), o;
    },
    () => this.createSingleNodeList(
      this.Raw(null, !1)
    )
  );
  return this.eof || this.eat(x), {
    type: "GeneralEnclosed",
    loc: this.getLocation(t, this.tokenStart),
    kind: e,
    function: n,
    children: r
  };
}
function Tu(e) {
  e.function ? this.token(C, e.function + "(") : this.token($, "("), this.children(e), this.token(x, ")");
}
const Au = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  generate: Tu,
  name: Cu,
  parse: bo,
  structure: Eu
}, Symbol.toStringTag, { value: "Module" })), $u = "XXX", Ou = "Hash", Lu = {
  value: String
};
function yo() {
  const e = this.tokenStart;
  return this.eat(I), {
    type: "Hash",
    loc: this.getLocation(e, this.tokenStart),
    value: this.substrToCursor(e + 1)
  };
}
function Pu(e) {
  this.token(I, "#" + e.value);
}
const _u = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  generate: Pu,
  name: Ou,
  parse: yo,
  structure: Lu,
  xxx: $u
}, Symbol.toStringTag, { value: "Module" })), Iu = "Identifier", zu = {
  name: String
};
function ko() {
  return {
    type: "Identifier",
    loc: this.getLocation(this.tokenStart, this.tokenEnd),
    name: this.consume(b)
  };
}
function Mu(e) {
  this.token(b, e.name);
}
const Nu = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  generate: Mu,
  name: Iu,
  parse: ko,
  structure: zu
}, Symbol.toStringTag, { value: "Module" })), ju = "IdSelector", Fu = {
  name: String
};
function wo() {
  const e = this.tokenStart;
  return this.eat(I), {
    type: "IdSelector",
    loc: this.getLocation(e, this.tokenStart),
    name: this.substrToCursor(e + 1)
  };
}
function Du(e) {
  this.token(A, "#" + e.name);
}
const Ru = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  generate: Du,
  name: ju,
  parse: wo,
  structure: Fu
}, Symbol.toStringTag, { value: "Module" })), Bu = 46, Hu = "Layer", Vu = {
  name: String
};
function xo() {
  let e = this.consume(b);
  for (; this.isDelim(Bu); )
    this.eat(A), e += "." + this.consume(b);
  return {
    type: "Layer",
    loc: this.getLocation(this.tokenStart, this.tokenEnd),
    name: e
  };
}
function qu(e) {
  this.tokenize(e.name);
}
const Wu = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  generate: qu,
  name: Hu,
  parse: xo,
  structure: Vu
}, Symbol.toStringTag, { value: "Module" })), Uu = "LayerList", Gu = {
  children: [[
    "Layer"
  ]]
};
function vo() {
  const e = this.createList();
  for (this.skipSC(); !this.eof && (e.push(this.Layer()), this.lookupTypeNonSC(0) === Z); )
    this.skipSC(), this.next(), this.skipSC();
  return {
    type: "LayerList",
    loc: this.getLocationFromList(e),
    children: e
  };
}
function Ku(e) {
  this.children(e, () => this.token(Z, ","));
}
const Qu = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  generate: Ku,
  name: Uu,
  parse: vo,
  structure: Gu
}, Symbol.toStringTag, { value: "Module" })), Yu = "MediaQuery", Xu = {
  modifier: [String, null],
  mediaType: [String, null],
  condition: ["Condition", null]
};
function So() {
  const e = this.tokenStart;
  let t = null, n = null, r = null;
  if (this.skipSC(), this.tokenType === b && this.lookupTypeNonSC(1) !== $) {
    const i = this.consume(b), o = i.toLowerCase();
    switch (o === "not" || o === "only" ? (this.skipSC(), t = o, n = this.consume(b)) : n = i, this.lookupTypeNonSC(0)) {
      case b: {
        this.skipSC(), this.eatIdent("and"), r = this.Condition("media");
        break;
      }
      case H:
      case K:
      case Z:
      case xe:
        break;
      default:
        this.error("Identifier or parenthesis is expected");
    }
  } else
    switch (this.tokenType) {
      case b:
      case $:
      case C: {
        r = this.Condition("media");
        break;
      }
      case H:
      case K:
      case xe:
        break;
      default:
        this.error("Identifier or parenthesis is expected");
    }
  return {
    type: "MediaQuery",
    loc: this.getLocation(e, this.tokenStart),
    modifier: t,
    mediaType: n,
    condition: r
  };
}
function Ju(e) {
  e.mediaType ? (e.modifier && this.token(b, e.modifier), this.token(b, e.mediaType), e.condition && (this.token(b, "and"), this.node(e.condition))) : e.condition && this.node(e.condition);
}
const Zu = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  generate: Ju,
  name: Yu,
  parse: So,
  structure: Xu
}, Symbol.toStringTag, { value: "Module" })), eh = "MediaQueryList", th = {
  children: [[
    "MediaQuery"
  ]]
};
function Co() {
  const e = this.createList();
  for (this.skipSC(); !this.eof && (e.push(this.MediaQuery()), this.tokenType === Z); )
    this.next();
  return {
    type: "MediaQueryList",
    loc: this.getLocationFromList(e),
    children: e
  };
}
function nh(e) {
  this.children(e, () => this.token(Z, ","));
}
const rh = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  generate: nh,
  name: eh,
  parse: Co,
  structure: th
}, Symbol.toStringTag, { value: "Module" })), ih = 38, oh = "NestingSelector", sh = {};
function Eo() {
  const e = this.tokenStart;
  return this.eatDelim(ih), {
    type: "NestingSelector",
    loc: this.getLocation(e, this.tokenStart)
  };
}
function ah() {
  this.token(A, "&");
}
const lh = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  generate: ah,
  name: oh,
  parse: Eo,
  structure: sh
}, Symbol.toStringTag, { value: "Module" })), ch = "Nth", uh = {
  nth: ["AnPlusB", "Identifier"],
  selector: ["SelectorList", null]
};
function To() {
  this.skipSC();
  const e = this.tokenStart;
  let t = e, n = null, r;
  return this.lookupValue(0, "odd") || this.lookupValue(0, "even") ? r = this.Identifier() : r = this.AnPlusB(), t = this.tokenStart, this.skipSC(), this.lookupValue(0, "of") && (this.next(), n = this.SelectorList(), t = this.tokenStart), {
    type: "Nth",
    loc: this.getLocation(e, t),
    nth: r,
    selector: n
  };
}
function hh(e) {
  this.node(e.nth), e.selector !== null && (this.token(b, "of"), this.node(e.selector));
}
const ph = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  generate: hh,
  name: ch,
  parse: To,
  structure: uh
}, Symbol.toStringTag, { value: "Module" })), dh = "Number", mh = {
  value: String
};
function Ao() {
  return {
    type: "Number",
    loc: this.getLocation(this.tokenStart, this.tokenEnd),
    value: this.consume(v)
  };
}
function fh(e) {
  this.token(v, e.value);
}
const gh = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  generate: fh,
  name: dh,
  parse: Ao,
  structure: mh
}, Symbol.toStringTag, { value: "Module" })), bh = "Operator", yh = {
  value: String
};
function $o() {
  const e = this.tokenStart;
  return this.next(), {
    type: "Operator",
    loc: this.getLocation(e, this.tokenStart),
    value: this.substrToCursor(e)
  };
}
function kh(e) {
  this.tokenize(e.value);
}
const wh = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  generate: kh,
  name: bh,
  parse: $o,
  structure: yh
}, Symbol.toStringTag, { value: "Module" })), xh = "Parentheses", vh = {
  children: [[]]
};
function Oo(e, t) {
  const n = this.tokenStart;
  let r = null;
  return this.eat($), r = e.call(this, t), this.eof || this.eat(x), {
    type: "Parentheses",
    loc: this.getLocation(n, this.tokenStart),
    children: r
  };
}
function Sh(e) {
  this.token($, "("), this.children(e), this.token(x, ")");
}
const Ch = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  generate: Sh,
  name: xh,
  parse: Oo,
  structure: vh
}, Symbol.toStringTag, { value: "Module" })), Eh = "Percentage", Th = {
  value: String
};
function Lo() {
  return {
    type: "Percentage",
    loc: this.getLocation(this.tokenStart, this.tokenEnd),
    value: this.consumeNumber(N)
  };
}
function Ah(e) {
  this.token(N, e.value + "%");
}
const $h = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  generate: Ah,
  name: Eh,
  parse: Lo,
  structure: Th
}, Symbol.toStringTag, { value: "Module" })), Oh = "PseudoClassSelector", Lh = "function", Ph = {
  name: String,
  children: [["Raw"], null]
};
function Po() {
  const e = this.tokenStart;
  let t = null, n, r;
  return this.eat(G), this.tokenType === C ? (n = this.consumeFunctionName(), r = n.toLowerCase(), this.lookupNonWSType(0) == x ? t = this.createList() : hasOwnProperty.call(this.pseudo, r) ? (this.skipSC(), t = this.pseudo[r].call(this), this.skipSC()) : (t = this.createList(), t.push(
    this.Raw(null, !1)
  )), this.eat(x)) : n = this.consume(b), {
    type: "PseudoClassSelector",
    loc: this.getLocation(e, this.tokenStart),
    name: n,
    children: t
  };
}
function _h(e) {
  this.token(G, ":"), e.children === null ? this.token(b, e.name) : (this.token(C, e.name + "("), this.children(e), this.token(x, ")"));
}
const Ih = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  generate: _h,
  name: Oh,
  parse: Po,
  structure: Ph,
  walkContext: Lh
}, Symbol.toStringTag, { value: "Module" })), zh = "PseudoElementSelector", Mh = "function", Nh = {
  name: String,
  children: [["Raw"], null]
};
function _o() {
  const e = this.tokenStart;
  let t = null, n, r;
  return this.eat(G), this.eat(G), this.tokenType === C ? (n = this.consumeFunctionName(), r = n.toLowerCase(), this.lookupNonWSType(0) == x ? t = this.createList() : hasOwnProperty.call(this.pseudo, r) ? (this.skipSC(), t = this.pseudo[r].call(this), this.skipSC()) : (t = this.createList(), t.push(
    this.Raw(null, !1)
  )), this.eat(x)) : n = this.consume(b), {
    type: "PseudoElementSelector",
    loc: this.getLocation(e, this.tokenStart),
    name: n,
    children: t
  };
}
function jh(e) {
  this.token(G, ":"), this.token(G, ":"), e.children === null ? this.token(b, e.name) : (this.token(C, e.name + "("), this.children(e), this.token(x, ")"));
}
const Fh = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  generate: jh,
  name: zh,
  parse: _o,
  structure: Nh,
  walkContext: Mh
}, Symbol.toStringTag, { value: "Module" })), Qr = 47;
function Yr() {
  switch (this.skipSC(), this.tokenType) {
    case v:
      return this.Number();
    case C:
      return this.Function(this.readSequence, this.scope.Value);
    default:
      this.error("Number of function is expected");
  }
}
const Dh = "Ratio", Rh = {
  left: ["Number", "Function"],
  right: ["Number", "Function", null]
};
function Io() {
  const e = this.tokenStart, t = Yr.call(this);
  let n = null;
  return this.skipSC(), this.isDelim(Qr) && (this.eatDelim(Qr), n = Yr.call(this)), {
    type: "Ratio",
    loc: this.getLocation(e, this.tokenStart),
    left: t,
    right: n
  };
}
function Bh(e) {
  this.node(e.left), this.token(A, "/"), e.right ? this.node(e.right) : this.node(v, 1);
}
const Hh = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  generate: Bh,
  name: Dh,
  parse: Io,
  structure: Rh
}, Symbol.toStringTag, { value: "Module" }));
function Vh() {
  return this.tokenIndex > 0 && this.lookupType(-1) === j ? this.tokenIndex > 1 ? this.getTokenStart(this.tokenIndex - 1) : this.firstCharOffset : this.tokenStart;
}
const qh = "Raw", Wh = {
  value: String
};
function zo(e, t) {
  const n = this.getTokenStart(this.tokenIndex);
  let r;
  return this.skipUntilBalanced(this.tokenIndex, e || this.consumeUntilBalanceEnd), t && this.tokenStart > n ? r = Vh.call(this) : r = this.tokenStart, {
    type: "Raw",
    loc: this.getLocation(n, r),
    value: this.substring(n, r)
  };
}
function Uh(e) {
  this.tokenize(e.value);
}
const Gh = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  generate: Uh,
  name: qh,
  parse: zo,
  structure: Wh
}, Symbol.toStringTag, { value: "Module" }));
function Xr() {
  return this.Raw(this.consumeUntilLeftCurlyBracket, !0);
}
function Kh() {
  const e = this.SelectorList();
  return e.type !== "Raw" && this.eof === !1 && this.tokenType !== H && this.error(), e;
}
const Qh = "Rule", Yh = "rule", Xh = {
  prelude: ["SelectorList", "Raw"],
  block: ["Block"]
};
function Mo() {
  const e = this.tokenIndex, t = this.tokenStart;
  let n, r;
  return this.parseRulePrelude ? n = this.parseWithFallback(Kh, Xr) : n = Xr.call(this, e), r = this.Block(!0), {
    type: "Rule",
    loc: this.getLocation(t, this.tokenStart),
    prelude: n,
    block: r
  };
}
function Jh(e) {
  this.node(e.prelude), this.node(e.block);
}
const Zh = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  generate: Jh,
  name: Qh,
  parse: Mo,
  structure: Xh,
  walkContext: Yh
}, Symbol.toStringTag, { value: "Module" })), ep = "Scope", tp = {
  root: ["SelectorList", "Raw", null],
  limit: ["SelectorList", "Raw", null]
};
function No() {
  let e = null, t = null;
  this.skipSC();
  const n = this.tokenStart;
  return this.tokenType === $ && (this.next(), this.skipSC(), e = this.parseWithFallback(
    this.SelectorList,
    () => this.Raw(!1, !0)
  ), this.skipSC(), this.eat(x)), this.lookupNonWSType(0) === b && (this.skipSC(), this.eatIdent("to"), this.skipSC(), this.eat($), this.skipSC(), t = this.parseWithFallback(
    this.SelectorList,
    () => this.Raw(!1, !0)
  ), this.skipSC(), this.eat(x)), {
    type: "Scope",
    loc: this.getLocation(n, this.tokenStart),
    root: e,
    limit: t
  };
}
function np(e) {
  e.root && (this.token($, "("), this.node(e.root), this.token(x, ")")), e.limit && (this.token(b, "to"), this.token($, "("), this.node(e.limit), this.token(x, ")"));
}
const rp = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  generate: np,
  name: ep,
  parse: No,
  structure: tp
}, Symbol.toStringTag, { value: "Module" })), ip = "Selector", op = {
  children: [[
    "TypeSelector",
    "IdSelector",
    "ClassSelector",
    "AttributeSelector",
    "PseudoClassSelector",
    "PseudoElementSelector",
    "Combinator"
  ]]
};
function jo() {
  const e = this.readSequence(this.scope.Selector);
  return this.getFirstListNode(e) === null && this.error("Selector is expected"), {
    type: "Selector",
    loc: this.getLocationFromList(e),
    children: e
  };
}
function sp(e) {
  this.children(e);
}
const ap = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  generate: sp,
  name: ip,
  parse: jo,
  structure: op
}, Symbol.toStringTag, { value: "Module" })), lp = "SelectorList", cp = "selector", up = {
  children: [[
    "Selector",
    "Raw"
  ]]
};
function Fo() {
  const e = this.createList();
  for (; !this.eof; ) {
    if (e.push(this.Selector()), this.tokenType === Z) {
      this.next();
      continue;
    }
    break;
  }
  return {
    type: "SelectorList",
    loc: this.getLocationFromList(e),
    children: e
  };
}
function hp(e) {
  this.children(e, () => this.token(Z, ","));
}
const pp = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  generate: hp,
  name: lp,
  parse: Fo,
  structure: up,
  walkContext: cp
}, Symbol.toStringTag, { value: "Module" })), wn = 92, Do = 34, dp = 39;
function Ro(e) {
  const t = e.length, n = e.charCodeAt(0), r = n === Do || n === dp ? 1 : 0, i = r === 1 && t > 1 && e.charCodeAt(t - 1) === n ? t - 2 : t - 1;
  let o = "";
  for (let s = r; s <= i; s++) {
    let c = e.charCodeAt(s);
    if (c === wn) {
      if (s === i) {
        s !== t - 1 && (o = e.substr(s + 1));
        break;
      }
      if (c = e.charCodeAt(++s), fe(wn, c)) {
        const l = s - 1, a = Ne(e, l);
        s = a - 1, o += fi(e.substring(l + 1, a));
      } else
        c === 13 && e.charCodeAt(s + 1) === 10 && s++;
    } else
      o += e[s];
  }
  return o;
}
function mp(e, t) {
  const n = '"', r = Do;
  let i = "", o = !1;
  for (let s = 0; s < e.length; s++) {
    const c = e.charCodeAt(s);
    if (c === 0) {
      i += "�";
      continue;
    }
    if (c <= 31 || c === 127) {
      i += "\\" + c.toString(16), o = !0;
      continue;
    }
    c === r || c === wn ? (i += "\\" + e.charAt(s), o = !1) : (o && (ve(c) || $e(c)) && (i += " "), i += e.charAt(s), o = !1);
  }
  return n + i + n;
}
const fp = "String", gp = {
  value: String
};
function Bo() {
  return {
    type: "String",
    loc: this.getLocation(this.tokenStart, this.tokenEnd),
    value: Ro(this.consume(he))
  };
}
function bp(e) {
  this.token(he, mp(e.value));
}
const yp = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  generate: bp,
  name: fp,
  parse: Bo,
  structure: gp
}, Symbol.toStringTag, { value: "Module" })), kp = 33;
function Jr() {
  return this.Raw(null, !1);
}
const wp = "StyleSheet", xp = "stylesheet", vp = {
  children: [[
    "Comment",
    "CDO",
    "CDC",
    "Atrule",
    "Rule",
    "Raw"
  ]]
};
function Ho() {
  const e = this.tokenStart, t = this.createList();
  let n;
  for (; !this.eof; ) {
    switch (this.tokenType) {
      case j:
        this.next();
        continue;
      case q:
        if (this.charCodeAt(this.tokenStart + 2) !== kp) {
          this.next();
          continue;
        }
        n = this.Comment();
        break;
      case nt:
        n = this.CDO();
        break;
      case J:
        n = this.CDC();
        break;
      case D:
        n = this.parseWithFallback(this.Atrule, Jr);
        break;
      default:
        n = this.parseWithFallback(this.Rule, Jr);
    }
    t.push(n);
  }
  return {
    type: "StyleSheet",
    loc: this.getLocation(e, this.tokenStart),
    children: t
  };
}
function Sp(e) {
  this.children(e);
}
const Cp = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  generate: Sp,
  name: wp,
  parse: Ho,
  structure: vp,
  walkContext: xp
}, Symbol.toStringTag, { value: "Module" })), Ep = "SupportsDeclaration", Tp = {
  declaration: "Declaration"
};
function Vo() {
  const e = this.tokenStart;
  this.eat($), this.skipSC();
  const t = this.Declaration();
  return this.eof || this.eat(x), {
    type: "SupportsDeclaration",
    loc: this.getLocation(e, this.tokenStart),
    declaration: t
  };
}
function Ap(e) {
  this.token($, "("), this.node(e.declaration), this.token(x, ")");
}
const $p = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  generate: Ap,
  name: Ep,
  parse: Vo,
  structure: Tp
}, Symbol.toStringTag, { value: "Module" })), Op = 42, Zr = 124;
function on() {
  this.tokenType !== b && this.isDelim(Op) === !1 && this.error("Identifier or asterisk is expected"), this.next();
}
const Lp = "TypeSelector", Pp = {
  name: String
};
function qo() {
  const e = this.tokenStart;
  return this.isDelim(Zr) ? (this.next(), on.call(this)) : (on.call(this), this.isDelim(Zr) && (this.next(), on.call(this))), {
    type: "TypeSelector",
    loc: this.getLocation(e, this.tokenStart),
    name: this.substrToCursor(e)
  };
}
function _p(e) {
  this.tokenize(e.name);
}
const Ip = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  generate: _p,
  name: Lp,
  parse: qo,
  structure: Pp
}, Symbol.toStringTag, { value: "Module" })), Wo = 43, Uo = 45, xn = 63;
function Ge(e, t) {
  let n = 0;
  for (let r = this.tokenStart + e; r < this.tokenEnd; r++) {
    const i = this.charCodeAt(r);
    if (i === Uo && t && n !== 0)
      return Ge.call(this, e + n + 1, !1), -1;
    ve(i) || this.error(
      t && n !== 0 ? "Hyphen minus" + (n < 6 ? " or hex digit" : "") + " is expected" : n < 6 ? "Hex digit is expected" : "Unexpected input",
      r
    ), ++n > 6 && this.error("Too many hex digits", r);
  }
  return this.next(), n;
}
function ht(e) {
  let t = 0;
  for (; this.isDelim(xn); )
    ++t > e && this.error("Too many question marks"), this.next();
}
function zp(e) {
  this.charCodeAt(this.tokenStart) !== e && this.error((e === Wo ? "Plus sign" : "Hyphen minus") + " is expected");
}
function Mp() {
  let e = 0;
  switch (this.tokenType) {
    case v:
      if (e = Ge.call(this, 1, !0), this.isDelim(xn)) {
        ht.call(this, 6 - e);
        break;
      }
      if (this.tokenType === T || this.tokenType === v) {
        zp.call(this, Uo), Ge.call(this, 1, !1);
        break;
      }
      break;
    case T:
      e = Ge.call(this, 1, !0), e > 0 && ht.call(this, 6 - e);
      break;
    default:
      if (this.eatDelim(Wo), this.tokenType === b) {
        e = Ge.call(this, 0, !0), e > 0 && ht.call(this, 6 - e);
        break;
      }
      if (this.isDelim(xn)) {
        this.next(), ht.call(this, 5);
        break;
      }
      this.error("Hex digit or question mark is expected");
  }
}
const Np = "UnicodeRange", jp = {
  value: String
};
function Go() {
  const e = this.tokenStart;
  return this.eatIdent("u"), Mp.call(this), {
    type: "UnicodeRange",
    loc: this.getLocation(e, this.tokenStart),
    value: this.substrToCursor(e)
  };
}
function Fp(e) {
  this.tokenize(e.value);
}
const Dp = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  generate: Fp,
  name: Np,
  parse: Go,
  structure: jp
}, Symbol.toStringTag, { value: "Module" })), Rp = 32, vn = 92, Bp = 34, Hp = 39, Vp = 40, Ko = 41;
function qp(e) {
  const t = e.length;
  let n = 4, r = e.charCodeAt(t - 1) === Ko ? t - 2 : t - 1, i = "";
  for (; n < r && $e(e.charCodeAt(n)); )
    n++;
  for (; n < r && $e(e.charCodeAt(r)); )
    r--;
  for (let o = n; o <= r; o++) {
    let s = e.charCodeAt(o);
    if (s === vn) {
      if (o === r) {
        o !== t - 1 && (i = e.substr(o + 1));
        break;
      }
      if (s = e.charCodeAt(++o), fe(vn, s)) {
        const c = o - 1, l = Ne(e, c);
        o = l - 1, i += fi(e.substring(c + 1, l));
      } else
        s === 13 && e.charCodeAt(o + 1) === 10 && o++;
    } else
      i += e[o];
  }
  return i;
}
function Wp(e) {
  let t = "", n = !1;
  for (let r = 0; r < e.length; r++) {
    const i = e.charCodeAt(r);
    if (i === 0) {
      t += "�";
      continue;
    }
    if (i <= 31 || i === 127) {
      t += "\\" + i.toString(16), n = !0;
      continue;
    }
    i === Rp || i === vn || i === Bp || i === Hp || i === Vp || i === Ko ? (t += "\\" + e.charAt(r), n = !1) : (n && ve(i) && (t += " "), t += e.charAt(r), n = !1);
  }
  return "url(" + t + ")";
}
const Up = "Url", Gp = {
  value: String
};
function Qo() {
  const e = this.tokenStart;
  let t;
  switch (this.tokenType) {
    case U:
      t = qp(this.consume(U));
      break;
    case C:
      this.cmpStr(this.tokenStart, this.tokenEnd, "url(") || this.error("Function name must be `url`"), this.eat(C), this.skipSC(), t = Ro(this.consume(he)), this.skipSC(), this.eof || this.eat(x);
      break;
    default:
      this.error("Url or Function is expected");
  }
  return {
    type: "Url",
    loc: this.getLocation(e, this.tokenStart),
    value: t
  };
}
function Kp(e) {
  this.token(U, Wp(e.value));
}
const Qp = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  generate: Kp,
  name: Up,
  parse: Qo,
  structure: Gp
}, Symbol.toStringTag, { value: "Module" })), Yp = "Value", Xp = {
  children: [[]]
};
function Yo() {
  const e = this.tokenStart, t = this.readSequence(this.scope.Value);
  return {
    type: "Value",
    loc: this.getLocation(e, this.tokenStart),
    children: t
  };
}
function Jp(e) {
  this.children(e);
}
const Zp = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  generate: Jp,
  name: Yp,
  parse: Yo,
  structure: Xp
}, Symbol.toStringTag, { value: "Module" })), ed = Object.freeze({
  type: "WhiteSpace",
  loc: null,
  value: " "
}), td = "WhiteSpace", nd = {
  value: String
};
function Xo() {
  return this.eat(j), ed;
}
function rd(e) {
  this.token(j, e.value);
}
const id = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  generate: rd,
  name: td,
  parse: Xo,
  structure: nd
}, Symbol.toStringTag, { value: "Module" })), Jo = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  AnPlusB: Sl,
  Atrule: Ol,
  AtrulePrelude: zl,
  AttributeSelector: Vl,
  Block: Yl,
  Brackets: ec,
  CDC: ic,
  CDO: lc,
  ClassSelector: dc,
  Combinator: wc,
  Comment: Tc,
  Condition: _c,
  Declaration: Gc,
  DeclarationList: Jc,
  Dimension: nu,
  Feature: au,
  FeatureFunction: pu,
  FeatureRange: yu,
  Function: Su,
  GeneralEnclosed: Au,
  Hash: _u,
  IdSelector: Ru,
  Identifier: Nu,
  Layer: Wu,
  LayerList: Qu,
  MediaQuery: Zu,
  MediaQueryList: rh,
  NestingSelector: lh,
  Nth: ph,
  Number: gh,
  Operator: wh,
  Parentheses: Ch,
  Percentage: $h,
  PseudoClassSelector: Ih,
  PseudoElementSelector: Fh,
  Ratio: Hh,
  Raw: Gh,
  Rule: Zh,
  Scope: rp,
  Selector: ap,
  SelectorList: pp,
  String: yp,
  StyleSheet: Cp,
  SupportsDeclaration: $p,
  TypeSelector: Ip,
  UnicodeRange: Dp,
  Url: Qp,
  Value: Zp,
  WhiteSpace: id
}, Symbol.toStringTag, { value: "Module" })), od = {
  generic: !0,
  cssWideKeywords: Rn,
  ...yl,
  node: Jo
}, sd = 35, ad = 42, ei = 43, ld = 45, cd = 47, ud = 117;
function Zo(e) {
  switch (this.tokenType) {
    case I:
      return this.Hash();
    case Z:
      return this.Operator();
    case $:
      return this.Parentheses(this.readSequence, e.recognizer);
    case te:
      return this.Brackets(this.readSequence, e.recognizer);
    case he:
      return this.String();
    case T:
      return this.Dimension();
    case N:
      return this.Percentage();
    case v:
      return this.Number();
    case C:
      return this.cmpStr(this.tokenStart, this.tokenEnd, "url(") ? this.Url() : this.Function(this.readSequence, e.recognizer);
    case U:
      return this.Url();
    case b:
      return this.cmpChar(this.tokenStart, ud) && this.cmpChar(this.tokenStart + 1, ei) ? this.UnicodeRange() : this.Identifier();
    case A: {
      const t = this.charCodeAt(this.tokenStart);
      if (t === cd || t === ad || t === ei || t === ld)
        return this.Operator();
      t === sd && this.error("Hex or identifier is expected", this.tokenStart + 1);
      break;
    }
  }
}
const hd = {
  getNode: Zo
}, pd = 35, dd = 38, md = 42, fd = 43, gd = 47, ti = 46, bd = 62, yd = 124, kd = 126;
function wd(e, t) {
  t.last !== null && t.last.type !== "Combinator" && e !== null && e.type !== "Combinator" && t.push({
    // FIXME: this.Combinator() should be used instead
    type: "Combinator",
    loc: null,
    name: " "
  });
}
function xd() {
  switch (this.tokenType) {
    case te:
      return this.AttributeSelector();
    case I:
      return this.IdSelector();
    case G:
      return this.lookupType(1) === G ? this.PseudoElementSelector() : this.PseudoClassSelector();
    case b:
      return this.TypeSelector();
    case v:
    case N:
      return this.Percentage();
    case T:
      this.charCodeAt(this.tokenStart) === ti && this.error("Identifier is expected", this.tokenStart + 1);
      break;
    case A: {
      switch (this.charCodeAt(this.tokenStart)) {
        case fd:
        case bd:
        case kd:
        case gd:
          return this.Combinator();
        case ti:
          return this.ClassSelector();
        case md:
        case yd:
          return this.TypeSelector();
        case pd:
          return this.IdSelector();
        case dd:
          return this.NestingSelector();
      }
      break;
    }
  }
}
const vd = {
  onWhiteSpace: wd,
  getNode: xd
};
function Sd() {
  return this.createSingleNodeList(
    this.Raw(null, !1)
  );
}
function Cd() {
  const e = this.createList();
  if (this.skipSC(), e.push(this.Identifier()), this.skipSC(), this.tokenType === Z) {
    e.push(this.Operator());
    const t = this.tokenIndex, n = this.parseCustomProperty ? this.Value(null) : this.Raw(this.consumeUntilExclamationMarkOrSemicolon, !1);
    if (n.type === "Value" && n.children.isEmpty) {
      for (let r = t - this.tokenIndex; r <= 0; r++)
        if (this.lookupType(r) === j) {
          n.children.appendData({
            type: "WhiteSpace",
            loc: null,
            value: " "
          });
          break;
        }
    }
    e.push(n);
  }
  return e;
}
function ni(e) {
  return e !== null && e.type === "Operator" && (e.value[e.value.length - 1] === "-" || e.value[e.value.length - 1] === "+");
}
const Ed = {
  getNode: Zo,
  onWhiteSpace(e, t) {
    ni(e) && (e.value = " " + e.value), ni(t.last) && (t.last.value += " ");
  },
  expression: Sd,
  var: Cd
}, Td = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  AtrulePrelude: hd,
  Selector: vd,
  Value: Ed
}, Symbol.toStringTag, { value: "Module" })), Ad = /* @__PURE__ */ new Set(["none", "and", "not", "or"]), $d = {
  parse: {
    prelude() {
      const e = this.createList();
      if (this.tokenType === b) {
        const t = this.substring(this.tokenStart, this.tokenEnd);
        Ad.has(t.toLowerCase()) || e.push(this.Identifier());
      }
      return e.push(this.Condition("container")), e;
    },
    block(e = !1) {
      return this.Block(e);
    }
  }
}, Od = {
  parse: {
    prelude: null,
    block() {
      return this.Block(!0);
    }
  }
};
function sn(e, t) {
  return this.parseWithFallback(
    () => {
      try {
        return e.call(this);
      } finally {
        this.skipSC(), this.lookupNonWSType(0) !== x && this.error();
      }
    },
    t || (() => this.Raw(null, !0))
  );
}
const ri = {
  layer() {
    this.skipSC();
    const e = this.createList(), t = sn.call(this, this.Layer);
    return (t.type !== "Raw" || t.value !== "") && e.push(t), e;
  },
  supports() {
    this.skipSC();
    const e = this.createList(), t = sn.call(
      this,
      this.Declaration,
      () => sn.call(this, () => this.Condition("supports"))
    );
    return (t.type !== "Raw" || t.value !== "") && e.push(t), e;
  }
}, Ld = {
  parse: {
    prelude() {
      const e = this.createList();
      switch (this.tokenType) {
        case he:
          e.push(this.String());
          break;
        case U:
        case C:
          e.push(this.Url());
          break;
        default:
          this.error("String or url() is expected");
      }
      return this.skipSC(), this.tokenType === b && this.cmpStr(this.tokenStart, this.tokenEnd, "layer") ? e.push(this.Identifier()) : this.tokenType === C && this.cmpStr(this.tokenStart, this.tokenEnd, "layer(") && e.push(this.Function(null, ri)), this.skipSC(), this.tokenType === C && this.cmpStr(this.tokenStart, this.tokenEnd, "supports(") && e.push(this.Function(null, ri)), (this.lookupNonWSType(0) === b || this.lookupNonWSType(0) === $) && e.push(this.MediaQueryList()), e;
    },
    block: null
  }
}, Pd = {
  parse: {
    prelude() {
      return this.createSingleNodeList(
        this.LayerList()
      );
    },
    block() {
      return this.Block(!1);
    }
  }
}, _d = {
  parse: {
    prelude() {
      return this.createSingleNodeList(
        this.MediaQueryList()
      );
    },
    block(e = !1) {
      return this.Block(e);
    }
  }
}, Id = {
  parse: {
    prelude() {
      return this.createSingleNodeList(
        this.SelectorList()
      );
    },
    block() {
      return this.Block(!0);
    }
  }
}, zd = {
  parse: {
    prelude() {
      return this.createSingleNodeList(
        this.SelectorList()
      );
    },
    block() {
      return this.Block(!0);
    }
  }
}, Md = {
  parse: {
    prelude() {
      return this.createSingleNodeList(
        this.Scope()
      );
    },
    block(e = !1) {
      return this.Block(e);
    }
  }
}, Nd = {
  parse: {
    prelude: null,
    block(e = !1) {
      return this.Block(e);
    }
  }
}, jd = {
  parse: {
    prelude() {
      return this.createSingleNodeList(
        this.Condition("supports")
      );
    },
    block(e = !1) {
      return this.Block(e);
    }
  }
}, Fd = {
  container: $d,
  "font-face": Od,
  import: Ld,
  layer: Pd,
  media: _d,
  nest: Id,
  page: zd,
  scope: Md,
  "starting-style": Nd,
  supports: jd
};
function Dd() {
  const e = this.createList();
  this.skipSC();
  e: for (; !this.eof; ) {
    switch (this.tokenType) {
      case b:
        e.push(this.Identifier());
        break;
      case he:
        e.push(this.String());
        break;
      case Z:
        e.push(this.Operator());
        break;
      case x:
        break e;
      default:
        this.error("Identifier, string or comma is expected");
    }
    this.skipSC();
  }
  return e;
}
const Se = {
  parse() {
    return this.createSingleNodeList(
      this.SelectorList()
    );
  }
}, an = {
  parse() {
    return this.createSingleNodeList(
      this.Selector()
    );
  }
}, Rd = {
  parse() {
    return this.createSingleNodeList(
      this.Identifier()
    );
  }
}, Bd = {
  parse: Dd
}, pt = {
  parse() {
    return this.createSingleNodeList(
      this.Nth()
    );
  }
}, Hd = {
  dir: Rd,
  has: Se,
  lang: Bd,
  matches: Se,
  is: Se,
  "-moz-any": Se,
  "-webkit-any": Se,
  where: Se,
  not: Se,
  "nth-child": pt,
  "nth-last-child": pt,
  "nth-last-of-type": pt,
  "nth-of-type": pt,
  slotted: an,
  host: an,
  "host-context": an
}, Vd = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  AnPlusB: Ki,
  Atrule: Qi,
  AtrulePrelude: Yi,
  AttributeSelector: Ji,
  Block: eo,
  Brackets: to,
  CDC: no,
  CDO: ro,
  ClassSelector: io,
  Combinator: oo,
  Comment: so,
  Condition: ao,
  Declaration: co,
  DeclarationList: uo,
  Dimension: ho,
  Feature: po,
  FeatureFunction: mo,
  FeatureRange: fo,
  Function: go,
  GeneralEnclosed: bo,
  Hash: yo,
  IdSelector: wo,
  Identifier: ko,
  Layer: xo,
  LayerList: vo,
  MediaQuery: So,
  MediaQueryList: Co,
  NestingSelector: Eo,
  Nth: To,
  Number: Ao,
  Operator: $o,
  Parentheses: Oo,
  Percentage: Lo,
  PseudoClassSelector: Po,
  PseudoElementSelector: _o,
  Ratio: Io,
  Raw: zo,
  Rule: Mo,
  Scope: No,
  Selector: jo,
  SelectorList: Fo,
  String: Bo,
  StyleSheet: Ho,
  SupportsDeclaration: Vo,
  TypeSelector: qo,
  UnicodeRange: Go,
  Url: Qo,
  Value: Yo,
  WhiteSpace: Xo
}, Symbol.toStringTag, { value: "Module" })), qd = {
  parseContext: {
    default: "StyleSheet",
    stylesheet: "StyleSheet",
    atrule: "Atrule",
    atrulePrelude(e) {
      return this.AtrulePrelude(e.atrule ? String(e.atrule) : null);
    },
    mediaQueryList: "MediaQueryList",
    mediaQuery: "MediaQuery",
    condition(e) {
      return this.Condition(e.kind);
    },
    rule: "Rule",
    selectorList: "SelectorList",
    selector: "Selector",
    block() {
      return this.Block(!0);
    },
    declarationList: "DeclarationList",
    declaration: "Declaration",
    value: "Value"
  },
  features: {
    supports: {
      selector() {
        return this.Selector();
      }
    },
    container: {
      style() {
        return this.Declaration();
      }
    }
  },
  scope: Td,
  atrule: Fd,
  pseudo: Hd,
  node: Vd
}, Wd = {
  node: Jo
}, Ud = bl({
  ...od,
  ...qd,
  ...Wd
}), {
  tokenize: Em,
  parse: Ae,
  generate: Ye,
  lexer: Tm,
  createLexer: Am,
  walk: De,
  find: Sn,
  findLast: Gd,
  findAll: Kd,
  toPlainObject: es,
  fromPlainObject: $m,
  fork: Om
} = Ud;
function Yn(e) {
  return e.type === "PseudoElementSelector";
}
function Qd(e) {
  return e.type === "Raw";
}
function Ee(e) {
  return e.type === "Declaration";
}
function ts(e) {
  return e.type === "Identifier";
}
function Yd(e) {
  return e.type === "Value";
}
function Xd(e) {
  return e.type === "Selector";
}
function ii(e) {
  return e.type === "Rule";
}
const Xn = [
  "view-transition",
  "view-transition-group",
  "view-transition-image-pair",
  "view-transition-old",
  "view-transition-new"
], Jd = ["media", "layer", "container", "scope", "supports"];
function ns(e) {
  let t = "", n = "";
  De(e, {
    enter(o) {
      Yn(o) ? t = o.name : Qd(o) && this.root === e && (n = o.value);
    }
  });
  const r = n !== "" && n !== "*" ? `${t}[name="${n}"]` : t;
  return Ae(r, {
    context: "selector"
  });
}
function Zd(e) {
  return e.property = "--vt-polyfill-name", Ot(e);
}
function Ot(e) {
  return new B().createItem(e);
}
function Jn(e) {
  De(e, {
    visit: "Declaration",
    enter(t, n, r) {
      if (t.property === "view-transition-name") {
        const i = Zd(t);
        r.replace(n, i);
      }
    }
  });
}
function em(e) {
  const t = (r) => r.block.children.some((i) => ii(i) ? t(i) : Ee(i) && i.property === "view-transition-name"), n = (r) => {
    r.block.children.forEach((i, o, s) => {
      if (!(Ee(i) && i.property === "view-transition-name")) {
        if (ii(i)) {
          n(i);
          return;
        }
        s.remove(o);
      }
    });
  };
  De(e, {
    visit: "Rule",
    enter(r, i, o) {
      if (this.atrule && !Jd.includes(this.atrule.name))
        return;
      const s = r.block.children.some((l) => Ee(l) && l.property === "view-transition-name"), c = r.prelude.children.some((l) => Xd(l) ? l.children.some((a) => Yn(a) && Xn.includes(a.name)) : !1);
      if (!s && !c) {
        if (t(r)) {
          r.block.children.forEach((a, u, p) => {
            Ee(a) && p.remove(u);
          });
          return;
        }
        o.remove(i);
        return;
      }
      s && n(r);
    }
  });
}
function tm(e) {
  return De(e, {
    visit: "PseudoElementSelector",
    enter(t, n, r) {
      if (Xn.includes(t.name)) {
        const i = t;
        i.name === "view-transition" && i.children && console.warn(
          `View Transition API polyfill, CSS parse error: ::view-transition should not have parentheses. ${t.loc ? `Source: ${t.loc.source}; Line: ${t.loc.start.line}; Column: ${t.loc.start.column}` : ""}`
        );
        const o = ns(t);
        r.replace(n, Ot(o));
      }
    }
  }), e;
}
function nm(e) {
  const n = Ae(e, {
    // The only detailed things needed are rule preludes (may contain ::view-transition pseudo elements)
    // The values for view-transition-name can just be raw, they do not need to be dissected.
    parseAtrulePrelude: !1,
    parseValue: !1,
    parseCustomProperty: !1,
    positions: !0
  });
  return em(n), tm(n), Jn(n), Ye(n);
}
async function oi() {
  const e = [...document.styleSheets], t = /* @__PURE__ */ new Map();
  for (const s of e)
    if (s.ownerNode instanceof HTMLStyleElement) {
      if (s.ownerNode.hasAttribute("data-vt-polyfill-style")) continue;
      const c = s.ownerNode.textContent;
      if (!c) continue;
      t.set(s, c);
    }
  const n = e.filter(
    (s) => s.ownerNode instanceof HTMLLinkElement
  ), r = /* @__PURE__ */ new Map();
  await Promise.all(
    n.map(async (s) => {
      const c = s.href;
      if (!c) return;
      const a = await (await fetch(c, {
        headers: { Accept: "text/css" }
      })).text();
      r.set(s, a);
    })
  );
  const i = e.map((s) => t.get(s) || r.get(s)), o = [];
  return await Promise.all(
    i.map((s) => {
      if (!s) return;
      const c = nm(s);
      o.push(c);
    })
  ), o.join(`
`);
}
class kt extends HTMLElement {
  constructor() {
    super(), this.name = "", this.captureElement = new Dt();
  }
  setupForOldImage(t, n) {
    return this.name = t, this.setAttribute("name", t), this.captureElement = n, this.captureElement.oldElement && (this.oldImage = new is(), this.oldImage.setup(this.name, this.captureElement), this.appendChild(this.oldImage)), this.oldImage;
  }
  setupForNewImage(t, n) {
    return this.name = t, this.setAttribute("name", t), this.captureElement = n, this.captureElement.newElement && (this.newImage = new En(), this.newImage.setup(this.name, this.captureElement), this.appendChild(this.newImage)), this.newImage;
  }
  addNewImage() {
    return this.captureElement.newElement && (this.newImage = new En(), this.newImage.setup(this.name, this.captureElement), this.appendChild(this.newImage)), this.newImage;
  }
}
const Lt = class Lt {
  constructor() {
    this.element = document.createElement("div"), this.element.classList.add("polyfill-inner-element"), this.styleEl = document.createElement("style"), this.styleEl.textContent = Lt.stylesheet, this.element.appendChild(this.styleEl);
  }
};
Lt.stylesheet = `
      .polyfill-inner-element {
        display: block;
        position: relative;
        inline-size: fit-content;
      }
      `;
let Cn = Lt;
class rs extends HTMLElement {
  constructor() {
    super(), this.name = "", this.captureElement = new Dt();
    const t = new Cn();
    this.innerElement = t.element;
  }
  setup(t, n) {
    if (this.name = t, !this.image)
      throw new Error(
        `View Transitions API polyfill: could not find old captured clone for name ${t}`
      );
    if (!this.element)
      throw new Error(
        `View Transitions API polyfill: could not find old captured element for name ${t}`
      );
    this.setAttribute("name", t), this.captureElement = n;
    const r = this.attachShadow({ mode: "closed" });
    this.innerElement.appendChild(this.image), r.appendChild(this.innerElement);
  }
  connectedCallback() {
    this.innerElement.querySelectorAll("[data-vt-scroll-top]").forEach((n) => {
      if (n instanceof HTMLElement) {
        n.style.overflow = "hidden", n.style.maxHeight = "100vh", n.style.maxWidth = "100vw";
        const r = parseInt(n.getAttribute("data-vt-scroll-top") || "0") ?? 0;
        n.scrollTop = r;
      }
    }), this.innerElement.querySelectorAll("[data-vt-scroll-left]").forEach((n) => {
      if (n instanceof HTMLElement) {
        n.style.overflow = "hidden", n.style.maxHeight = "100vh", n.style.maxWidth = "100vw";
        const r = parseInt(n.getAttribute("data-vt-scroll-top") || "0") ?? 0;
        n.scrollTop = r;
      }
    });
    const t = this.innerElement.querySelector(
      ":scope > :not(style) > :not(style)"
    );
    this.offsetHeight !== this.innerElement.offsetHeight && t instanceof HTMLElement && !(this.element instanceof HTMLHtmlElement) && (t.style.marginBlockStart = "0");
  }
  getScaleFactor(t, n, r, i, o) {
    let s = "", c = 1, l = 1;
    if (this.element instanceof HTMLHtmlElement)
      return c = 1, l = 1, s = "", [c, l, s];
    const a = n / i, u = r / o;
    switch (t) {
      case "fill":
        c = r / n, l = o / i;
        break;
      case "contain":
        a > u ? c = r / n : c = o / i, l = c;
        break;
      case "cover":
        a > u ? c = o / i : c = r / n, l = c;
        break;
      case "scale-down":
        c = 1, l = c;
        break;
    }
    return c = Number.isNaN(c) ? 1 : c, l = Number.isNaN(l) ? 1 : l, c = parseFloat(c.toFixed(2)), l = parseFloat(l.toFixed(2)), s = `scale(${c}, ${l})`, [c, l, s];
  }
  getObjectPositionValues(t, n, r, i, o) {
    if (this.element instanceof HTMLHtmlElement)
      return {
        old: { top: "0px", left: "0px" },
        new: { top: "0px", left: "0px" }
      };
    const [s, c] = t.split(" "), l = this.captureElement.old.width, a = this.captureElement.old.height, u = this.captureElement.new.width, p = this.captureElement.new.height;
    let m, g;
    if (s.includes("%")) {
      const L = parseFloat(s) / 100;
      m = ((l - n) * L).toString().concat("px"), g = ((u - r) * L).toString().concat("px");
    } else
      m = s, g = s;
    let w, M;
    if (c.includes("%")) {
      const L = parseFloat(c) / 100;
      w = ((a - i) * L).toString().concat("px"), M = ((p - o) * L).toString().concat("px");
    } else
      w = c, M = c;
    return {
      old: { top: w, left: m },
      new: { top: M, left: g }
    };
  }
  animateImage(t, n, r, i) {
    this.innerElement.animate(
      [
        {
          transform: r,
          transformOrigin: "top left"
        },
        {
          transform: i,
          transformOrigin: "top left"
        }
      ],
      {
        duration: t,
        iterations: 1,
        fill: "forwards",
        easing: n
      }
    );
  }
}
class is extends rs {
  setup(t, n) {
    return this.image = n.old.image, this.element = n.oldElement, super.setup(t, n);
  }
  getAnimateImageFunctions() {
    const t = getComputedStyle(this), n = t.objectFit, [r, i, o] = this.getScaleFactor(n), s = t.objectPosition, c = this.getObjectPositionValues(
      s,
      r,
      i
    ), l = `translate(${c.old.left}, ${c.old.top})`, a = `translate(${c.new.left}, ${c.new.top})`;
    return [
      l,
      a,
      o
    ];
  }
  getScaleFactor(t) {
    const n = this.captureElement.old.width, r = this.captureElement.old.height, i = this.captureElement.new.width, o = this.captureElement.new.height;
    return super.getScaleFactor(
      t,
      n,
      i,
      r,
      o
    );
  }
  getObjectPositionValues(t, n, r) {
    const i = this.innerElement.offsetWidth, o = this.innerElement.offsetHeight, s = Math.floor(i * n), c = Math.floor(o * r);
    return super.getObjectPositionValues(
      t,
      i,
      s,
      o,
      c
    );
  }
  animateImage(t, n) {
    const [
      r,
      i,
      o
    ] = this.getAnimateImageFunctions();
    return super.animateImage(
      t,
      n,
      r,
      `${i} ${o}`
    );
  }
}
class En extends rs {
  setup(t, n) {
    this.image = n.new.image, this.element = n.newElement, super.setup(t, n);
  }
  getAnimateImageFunctions() {
    const t = getComputedStyle(this), n = t.objectFit, [r, i, o] = this.getScaleFactor(n), s = t.objectPosition, c = this.getObjectPositionValues(
      s,
      r,
      i
    ), l = `translate(${c.old.left}, ${c.old.top})`, a = `translate(${c.new.left}, ${c.new.top})`;
    return [
      l,
      a,
      o
    ];
  }
  getScaleFactor(t) {
    const n = this.captureElement.new.width, r = this.captureElement.new.height, i = this.captureElement.old.width, o = this.captureElement.old.height;
    return super.getScaleFactor(
      t,
      n,
      i,
      r,
      o
    );
  }
  getObjectPositionValues(t, n, r) {
    const i = this.innerElement.offsetWidth, o = this.innerElement.offsetHeight, s = Math.floor(i * n), c = Math.floor(o * r);
    return super.getObjectPositionValues(
      t,
      s,
      i,
      c,
      o
    );
  }
  animateImage(t, n) {
    const [
      r,
      i,
      o
    ] = this.getAnimateImageFunctions();
    return super.animateImage(
      t,
      n,
      `${r} ${o}`,
      i
    );
  }
}
customElements.define("view-transition-image-pair", kt);
customElements.define("view-transition-old", is);
customElements.define("view-transition-new", En);
class Tn extends HTMLElement {
  constructor() {
    super(), this.transitionName = "", this.captureElement = new Dt(), this.imagePair = new kt(), this.groupStyle = document.createElement("style");
  }
  setupForOldImage(t, n) {
    this.transitionName = t, this.setAttribute("name", t), this.captureElement = n, this.imagePair = new kt(), this.oldImage = this.imagePair.setupForOldImage(t, n), this.oldImage && this.forceDisplay(this.oldImage, !0);
    const r = this.getStyleValues("old");
    this.mapStyleValuesForAttribute(r), this.appendChild(this.imagePair), this.appendChild(this.groupStyle);
  }
  forceDisplay(t, n) {
    t.style.display = n ? "block" : "";
  }
  setupForNewImage(t, n) {
    this.transitionName = t, this.setAttribute("name", t), this.captureElement = n, this.imagePair = new kt(), this.newImage = this.imagePair.setupForNewImage(t, n);
    const r = this.getStyleValues("new");
    this.mapStyleValuesForAttribute(r), this.appendChild(this.imagePair), this.appendChild(this.groupStyle);
  }
  addNewImage() {
    this.newImage = this.imagePair.addNewImage();
  }
  setup() {
    if (!this.newImage) {
      const n = this.getStyleValues("old");
      this.captureElement.groupStylesRule = `
      :where(view-transition-group[name="${this.transitionName}"]) {
        width: ${n.width};
        height: ${n.height};
        transform: ${n.transform};
        writing-mode: ${n.writingMode};
        direction: ${n.direction};
        text-orientation: ${n.textOrientation};
        mix-blend-mode: ${n.mixBlendMode};
        backdrop-filter: ${n.backdropFilter};
        color-scheme: ${n.colorScheme};
      }
      `, this.appendToStyle(this.captureElement.groupStylesRule), this.setAttribute("style", ""), this.appendToStyle(
        `:where(view-transition-old[name="${this.transitionName}"]) {
          animation-name: -ua-view-transition-fade-out;
        }`
      );
      return;
    }
    const t = this.getStyleValues("new");
    if (this.captureElement.groupStylesRule = `
      :where(view-transition-group[name="${this.transitionName}"]) {
        width: ${t.width};
        height: ${t.height};
        transform: ${t.transform};
        writing-mode: ${t.writingMode};
        direction: ${t.direction};
        text-orientation: ${t.textOrientation};
        mix-blend-mode: ${t.mixBlendMode};
        backdrop-filter: ${t.backdropFilter};
        color-scheme: ${t.colorScheme};
      }
      `, this.appendToStyle(this.captureElement.groupStylesRule), this.setAttribute("style", ""), !this.oldImage) {
      this.appendToStyle(
        `:where(view-transition-new[name="${this.transitionName}"]) {
          animation-name: -ua-view-transition-fade-in;
        }`
      );
      return;
    }
    this.forceDisplay(this.oldImage, !1), this.captureElement.groupKeyframes = `
        @keyframes -ua-view-transition-group-anim-${this.transitionName} {
          from {
            transform: ${this.captureElement.old.transform};
            width: ${this.captureElement.old.width}px;
            height: ${this.captureElement.old.height}px;
            backdrop-filter: ${this.captureElement.old.backdropFilter};
          }
        }
      `, this.appendToStyle(this.captureElement.groupKeyframes), this.captureElement.groupAnimationNameRule = `
        :where(view-transition-group[name="${this.transitionName}"]) {
          animation-name: -ua-view-transition-group-anim-${this.transitionName};
        }
      `, this.appendToStyle(this.captureElement.groupAnimationNameRule), this.captureElement.imagePairIsolationRule = `
        :where(view-transition-image-pair[name="${this.transitionName}"]) {
          isolation: isolate;
        }
      `, this.appendToStyle(this.captureElement.imagePairIsolationRule), this.captureElement.imageAnimationNameRule = `
        :where(view-transition-old[name="${this.transitionName}"]) {
          animation-name: -ua-view-transition-fade-out, -ua-mix-blend-mode-plus-lighter;
        }
        :where(view-transition-new[name="${this.transitionName}"]) {
          animation-name: -ua-view-transition-fade-in, -ua-mix-blend-mode-plus-lighter;
        }
      `, this.appendToStyle(this.captureElement.imageAnimationNameRule);
  }
  appendToStyle(t) {
    const n = this.groupStyle.textContent || "";
    this.groupStyle.textContent = n.concat(t);
  }
  getStyleValues(t = "old") {
    return t === "old" ? {
      width: this.captureElement.old.width.toString().concat("px"),
      height: this.captureElement.old.height.toString().concat("px"),
      transform: this.captureElement.old.transform,
      writingMode: this.captureElement.old.writingMode,
      direction: this.captureElement.old.direction,
      textOrientation: this.captureElement.old.textOrientation,
      mixBlendMode: this.captureElement.old.mixBlendMode,
      backdropFilter: this.captureElement.old.mixBlendMode,
      colorScheme: this.captureElement.old.colorScheme
    } : {
      width: this.captureElement.new.width.toString().concat("px"),
      height: this.captureElement.new.height.toString().concat("px"),
      transform: this.captureElement.new.transform,
      writingMode: this.captureElement.new.writingMode,
      direction: this.captureElement.new.direction,
      textOrientation: this.captureElement.new.textOrientation,
      mixBlendMode: this.captureElement.new.mixBlendMode,
      backdropFilter: this.captureElement.new.backdropFilter,
      colorScheme: this.captureElement.new.colorScheme
    };
  }
  mapStyleValuesForAttribute(t) {
    let n;
    ((r) => {
      r.width = "width", r.height = "height", r.transform = "transform", r.writingMode = "writing-mode", r.direction = "direction", r.textOrientation = "text-orientation", r.mixBlendMode = "mix-blend-mode", r.backdropFilter = "backdrop-filter", r.colorScheme = "color-scheme";
    })(n || (n = {}));
    for (const [r, i] of Object.entries(t)) {
      const o = n[r];
      o && this.style.setProperty(o, i);
    }
  }
  getSizingAnimationParemters() {
    const t = getComputedStyle(this);
    return [
      this.getSizingAnimationDuration(t),
      this.getSizingAnimationEasing(t)
    ];
  }
  getSizingAnimationDuration(t) {
    const n = t.animationName.split(", "), r = t.animationDuration.split(", "), o = new Map(
      n.map((c) => [
        c,
        r[n.indexOf(c)]
      ])
    ).get(
      `-ua-view-transition-group-anim-${this.transitionName}`
    );
    return parseFloat(o || "0") * 1e3;
  }
  getSizingAnimationEasing(t) {
    const n = t.animationName.split(", "), r = t.animationTimingFunction.split(", ");
    return new Map(
      n.map((s) => [
        s,
        r[n.indexOf(s)]
      ])
    ).get(
      `-ua-view-transition-group-anim-${this.transitionName}`
    ) || "ease";
  }
  animateImages() {
    const [t, n] = this.getSizingAnimationParemters();
    this.oldImage && this.oldImage.animateImage(t, n), this.newImage && this.newImage.animateImage(t, n);
  }
}
customElements.define("view-transition-group", Tn);
class si {
  constructor() {
    this.width = 0, this.height = 0, this.styleTransform = "initial", this.transform = "initial", this.writingMode = "initial", this.direction = "initial", this.textOrientation = "initial", this.mixBlendMode = "initial", this.backdropFilter = "initial", this.colorScheme = "initial";
  }
}
class Dt {
  constructor() {
    this.old = new si(), this.groupKeyframes = "", this.groupAnimationNameRule = "", this.groupStylesRule = "", this.imagePairIsolationRule = "", this.imageAnimationNameRule = "", this.name = "", this.new = new si();
  }
}
class An extends HTMLElement {
  constructor() {
    super(), this.setAttribute("aria-hidden", "true"), this.setAttribute("inert", "");
  }
}
customElements.define("view-transition", An);
class dt extends Error {
  constructor(t, n) {
    super(t), this.elements = n;
  }
}
const Je = class Je {
  constructor() {
    this.phase = "pending-capture", this.transitionPromises = new Zn(this), this.viewTransitionElement = new An(), this.parsedStyleElement = document.createElement("style"), this.namedElements = /* @__PURE__ */ new Map(), this.oldElements = /* @__PURE__ */ new Map(), this.newElements = /* @__PURE__ */ new Map(), this.callback = () => {
    }, this.animationPromises = [], this.fontSizeFactor = void 0;
  }
  static isViewTransitionActive() {
    return !!document.querySelector("view-transition");
  }
  async startViewTransition(t, n) {
    var o;
    if (this.phase = "pending-capture", this.transitionPromises = t, n && (this.callback = n), Je.isViewTransitionActive()) {
      this.skipTransition(
        "Tried to initiate a View Transition from the polyfill, but one was already active."
      );
      return;
    }
    this.viewTransitionElement = new An(), document.documentElement.appendChild(this.viewTransitionElement);
    try {
      const s = await oi();
      this.parsedStyleElement = document.createElement("style"), this.parsedStyleElement.textContent = s;
    } catch (s) {
      const c = s instanceof Error ? `View Transitions API polyfill: could not parse stylesheets: ${s.name} ${s.message}` : s;
      throw this.skipTransition(c), c;
    }
    this.addUAStylesheet(), this.viewTransitionElement.appendChild(this.parsedStyleElement), this.fontSizeFactor = pm(), this.namedElements = /* @__PURE__ */ new Map();
    try {
      this.oldElements = this.getNamedTransitionElements();
    } catch (s) {
      if (s instanceof dt)
        return;
    }
    this.captureElements("old"), this.initialSetupGroups(), this.activeElement = document.activeElement instanceof HTMLElement ? document.activeElement : void 0, document.body.setAttribute("inert", "");
    try {
      n && await n(), this.transitionPromises.updateCallbackDone.resolve(), this.phase = "update-callback-called";
    } catch (s) {
      this.transitionPromises.updateCallbackDone.reject(s), this.skipTransition(s);
      return;
    }
    (o = this.parsedStyleElement) == null || o.remove();
    try {
      const s = await oi();
      this.parsedStyleElement = document.createElement("style"), this.parsedStyleElement.textContent = s, this.viewTransitionElement.appendChild(this.parsedStyleElement);
    } catch (s) {
      const c = s instanceof Error ? `View Transitions API polyfill: could not parse stylesheets: ${s.name} ${s.message}` : s;
      throw this.skipTransition(c), c;
    }
    try {
      this.newElements = this.getNamedTransitionElements();
    } catch (s) {
      if (s instanceof dt)
        return;
    }
    this.captureElements("new"), await rm(), this.setupGroups(), this.newElements.forEach((s) => er(s, !1)), this.transitionPromises.ready.resolve(), this.phase = "animating";
    const i = this.viewTransitionElement.getAnimations({
      subtree: !0
    }).map((s) => s.finished);
    this.animationPromises.push(...i), this.animationsFinished();
  }
  skipTransition(t) {
    this.phase === "pending-capture" && queueMicrotask(async () => {
      this.callback && await this.callback(), this.transitionPromises.updateCallbackDone.resolve();
    }), li(!0), document.body.removeAttribute("inert"), this.phase = "done", this.transitionPromises.ready.reject(t), this.transitionPromises.finished.resolve(), document.querySelectorAll("view-transition").forEach((r) => r.remove());
  }
  captureElements(t) {
    const n = t === "old" ? this.oldElements : this.newElements;
    for (const [r, i] of n) {
      let o = this.namedElements.get(r);
      o || (o = new Dt(), this.namedElements.set(r, o));
      const s = getComputedStyle(i);
      o.name = r, t === "old" ? o.oldElement = i : o.newElement = i;
      try {
        const l = t === "new";
        o[t].image = dm(
          i,
          l,
          this.fontSizeFactor
          // Needed for Chrome 114.0.5735.196
        );
      } catch (l) {
        const a = l instanceof Error ? `Could not clone element ${i}: ${l.message}` : l;
        this.skipTransition(a);
        return;
      }
      o[t].width = i.offsetWidth, o[t].height = i.offsetHeight, o[t].styleTransform = s.transform;
      const c = o[t].styleTransform === "none" ? "" : o[t].styleTransform;
      try {
        const l = fm(i), a = `translate(${l.left}px, ${l.top}px)`;
        if (s.translate) {
          const u = cn(
            "translate",
            s.translate
          ), p = cn(
            "rotate",
            s.rotate
          ), m = cn(
            "scale",
            s.scale
          ), g = [
            u,
            p,
            m
          ].join(" ");
          o[t].transform = `${a} ${g} ${c}`.trim();
        } else
          o[t].transform = `${a} ${c}`.trim();
      } catch (l) {
        const a = l instanceof Error ? `Could not get position of element ${i}: ${l.message}` : l;
        this.skipTransition(a);
        return;
      }
      o[t].writingMode = s.writingMode, o[t].direction = s.direction, o[t].textOrientation = s.textOrientation, o[t].mixBlendMode = s.mixBlendMode, o[t].backdropFilter = s.backdropFilter, o[t].colorScheme = s.colorScheme, t === "old" && this.namedElements.set(r, o);
    }
  }
  addUAStylesheet() {
    const t = document.createElement("style");
    t.setAttribute("data-vt-polyfill-style", ""), t.textContent = Je.UAStylesheetText, this.viewTransitionElement.appendChild(t);
  }
  getNamedTransitionElements() {
    const t = [], n = /* @__PURE__ */ new Map(), r = (i) => {
      if (i === document.head) return;
      const o = getComputedStyle(i);
      let s = !0;
      if (i.checkVisibility ? s = i.checkVisibility() : s = o.getPropertyValue("display") !== "none", !s) return;
      const c = i.style.viewTransitionName || // Note the .trim(): newer browsers already do it, older browsers don't
      o.getPropertyValue("--vt-polyfill-name").trim(), l = (a) => a.querySelectorAll(":scope > *").forEach((u) => {
        hm(u) && r(u);
      });
      if (c === "none")
        return l(i);
      if (t.includes(c))
        throw new dt(
          "View Transitions API Polyfill: two elements with the same view transition name have been found",
          [n.get(c), i]
        );
      return c !== "" && (t.push(c), n.set(c, i), (i === document.documentElement || i === document.body) && this.viewTransitionElement.classList.add("has-root-group")), l(i);
    };
    try {
      r(document.documentElement);
    } catch (i) {
      if (i instanceof dt)
        throw this.skipTransition(i), i;
    }
    return n;
  }
  initialSetupGroups() {
    for (const [t, n] of this.namedElements) {
      const r = n, i = t, o = new Tn();
      r.group = o, o.setupForOldImage(i, r), this.viewTransitionElement.appendChild(o);
    }
  }
  setupGroups() {
    for (const t of this.namedElements) {
      const n = t[0], r = t[1];
      let i = r.group;
      i ? i.addNewImage() : (i = new Tn(), r.group = i, i.setupForNewImage(
        n,
        r
      ), this.viewTransitionElement.appendChild(i)), i.setup(), i.animateImages();
    }
  }
  updateAnimations(t) {
    this.animationPromises.push(t.finished);
  }
  animationsFinished() {
    Promise.allSettled(this.animationPromises).then((t) => {
      t.length === this.animationPromises.length ? (this.animationPromises = [], this.phase = "done", this.transitionPromises.finished.resolve(), li(!0), document.body.removeAttribute("inert"), this.activeElement && document.body.contains(this.activeElement) && this.activeElement.focus(), this.viewTransitionElement.remove()) : this.animationsFinished();
    });
  }
};
Je.UAStylesheetText = `* {
      --vt-polyfill-name: initial;
    }
    
    :where(:root) {
      --vt-polyfill-name: root;
    }
    
    :where(view-transition) {
      position: fixed;
      inset: 0;
      z-index: 100000;
  
      pointer-events: none;
    }
    
    :where(view-transition-group) {
      position: absolute;
      top: 0;
      left: 0;
    
      animation-duration: 0.25s;
      animation-fill-mode: both;
    }
    
    :where(view-transition-image-pair) {
      position: absolute;
      inset: 0;
    
      isolation: isolate;
    
      animation-duration: inherit;
      animation-fill-mode: inherit;
    }
    
    :where(view-transition-old,
    view-transition-new) {
      position: absolute;
      inset-block-start: 0;
      inline-size: 100%;
      block-size: auto;
    
      mix-blend-mode: plus-lighter;
    
      animation-duration: inherit;
      animation-fill-mode: inherit;
    }
  
    @keyframes -ua-view-transition-fade-out {
      to { opacity: 0; }
    }
    @keyframes -ua-view-transition-fade-in {
      from { opacity: 0; }
    }
    @keyframes -ua-mix-blend-mode-plus-lighter {
      from { mix-blend-mode: plus-lighter }
      to { mix-blend-mode: plus-lighter }
    }
    `;
let $n = Je;
function ln() {
  let e, t;
  const n = new Promise((r, i) => {
    e = r, t = i;
  });
  return n.resolve = e, n.reject = t, n;
}
class Zn {
  constructor(t) {
    this.finished = ln(), this.ready = ln(), this.updateCallbackDone = ln(), this.viewTransitionElement = t;
  }
  skipTransition() {
    this.viewTransitionElement.skipTransition(
      new DOMException("Transition skipped")
    );
  }
}
const rm = () => new Promise((e) => {
  requestAnimationFrame(() => {
    setTimeout(e, 0);
  });
}), ai = (e) => [
  "head",
  "script",
  "style",
  "view-transition",
  "view-transition-group",
  "view-transition-image-pair",
  "view-transition-old",
  "view-transition-new"
].includes(e.tagName.toLowerCase()), im = (e) => [
  "area",
  "base",
  "br",
  "col",
  "embed",
  "hr",
  "img",
  "input",
  "link",
  "meta",
  "param",
  "source",
  "track",
  "wbr"
].includes(e.tagName.toLowerCase()), om = (e) => {
  const t = e.getBoundingClientRect();
  return t.top > window.innerHeight + document.documentElement.scrollTop || t.left > window.innerWidth + document.documentElement.scrollLeft;
}, sm = [
  "color",
  "background-color",
  "border-color",
  "border-bottom-color",
  "border-left-color",
  "border-right-color",
  "border-top-color",
  "column-rule-color",
  "outline-color",
  "text-decoration-color",
  "text-emphasis-color",
  "text-decoration-line"
], am = [
  "width",
  "height",
  "inline-size",
  "block-size",
  "padding-top",
  "padding-bottom",
  "padding-left",
  "padding-right",
  "border-top-width",
  "border-bottom-width",
  "border-left-width",
  "border-right-width",
  "margin-top",
  "margin-bottom",
  "margin-left",
  "margin-right",
  "box-sizing",
  "display"
], lm = [
  "max-width",
  "max-height",
  "max-inline-size",
  "max-block-size",
  "min-width",
  "min-height",
  "min-inline-size",
  "min-block-size"
], cm = [
  "position",
  "margin-top",
  "margin-bottom",
  "margin-right",
  "margin-left",
  "position",
  "top",
  "bottom",
  "right",
  "left"
], um = (e) => {
  const t = document.createElement("div");
  t.dataset.vtSpacer = "";
  const n = e.getBoundingClientRect();
  t.style.width = `${n.width}px`, t.style.height = `${n.height}px`;
  const r = getComputedStyle(e);
  for (const i of cm)
    t.style.setProperty(i, r.getPropertyValue(i));
  return t;
};
function hm(e) {
  return e instanceof HTMLElement || e instanceof SVGElement || e instanceof MathMLElement;
}
function pm() {
  const e = document.createElement("div");
  e.style.fontSize = "16px", e.style.position = "fixed", e.style.display = "none", document.body.appendChild(e);
  const t = parseFloat(getComputedStyle(e).fontSize) / 16;
  return e.remove(), t > 1.01 || t < 0.99 ? t : void 0;
}
function dm(e, t = !1, n = void 0) {
  const r = document.createElement("div");
  r.setAttribute("data-vt-default-style-div", ""), r.style.all = "initial", r.style.display = "none", document.body.appendChild(r);
  const i = getComputedStyle(r), o = (c) => {
    var E;
    if (ai(c))
      return;
    let l;
    if (c instanceof HTMLBodyElement || c instanceof HTMLHtmlElement)
      l = document.createElement("div");
    else if (c instanceof HTMLVideoElement)
      try {
        const y = new ui();
        y.setup(c, t), l = y;
      } catch {
        return;
      }
    else
      l = c.cloneNode();
    const a = getComputedStyle(c), u = [];
    if (u.push("all: initial;"), a)
      for (const y of [...a]) {
        if (lm.includes(y)) continue;
        const z = a.getPropertyValue(y);
        if (!(z === i.getPropertyValue(y) && !am.includes(y))) {
          if (y === "-webkit-text-fill-color") {
            u.push(`color: ${z};`);
            continue;
          } else if (n && y === "font-size") {
            u.push(
              `font-size: ${parseFloat(z) / n}px;`
            );
            continue;
          }
          u.push(`${y}: ${z};`);
        }
      }
    if (c instanceof HTMLAnchorElement)
      for (const y of sm)
        l.style.setProperty(y, a.getPropertyValue(y));
    const p = "VT" + Math.random().toString(36).slice(2);
    if (l.setAttribute("id", p), c instanceof HTMLHtmlElement) {
      const y = document.createElement("style");
      y.textContent = `
      :where(#${p}) {background-color: Canvas}
      #${p} {zoom: initial !important;}
      `, l.appendChild(y);
    }
    if (s && (l.style.margin = "0"), im(l))
      l.setAttribute("style", u.join(""));
    else {
      const y = document.createElement("style");
      y.textContent = `#${p} {${u.join("")}}`, l.appendChild(y);
    }
    l.style.opacity = c.hasAttribute("data-vt-polyfill-opacity") ? c.getAttribute("data-vt-polyfill-opacity") || "1" : a ? a.getPropertyValue("opacity") : "1", l.removeAttribute("data-vt-polyfill-opacity"), s && (l.style.position = "relative", l.style.inset = "0", l.style.transform = "none", l.style.translate !== void 0 && (l.style.translate = "none", l.style.rotate = "none", l.style.scale = "none"));
    const m = getComputedStyle(c, "::before");
    if (m.content !== "none" && m.content !== "-moz-alt-content") {
      const y = document.createElement("style"), z = [];
      for (const S of [...m])
        z.push(
          `${S}: ${m.getPropertyValue(S)};`
        );
      y.textContent = `#${p}::before {${z.join("")}}`, l.appendChild(y);
    }
    const g = getComputedStyle(c, "::after");
    if (g.content !== "none" && g.content !== "-moz-alt-content") {
      const y = document.createElement("style"), z = [];
      for (const S of [...g])
        z.push(
          `${S}: ${g.getPropertyValue(S)};`
        );
      y.textContent = `#${p}::after {${z.join("")}}`, l.appendChild(y);
    }
    const w = c.scrollTop;
    w !== 0 && l.setAttribute("data-vt-scroll-top", w.toString());
    const M = c.scrollLeft;
    M !== 0 && l.setAttribute("data-vt-scroll-left", M.toString());
    const L = c.childNodes;
    for (const y of [...L])
      if (y instanceof Element && !ai(y)) {
        if (s = !1, y.hasAttribute("data-vt-default-style-div")) continue;
        const z = getComputedStyle(y).getPropertyValue("--vt-polyfill-name");
        if (om(y) || z) {
          const Q = um(y);
          l.appendChild(Q);
          continue;
        }
        const S = o(y);
        S && l.appendChild(S);
      } else if (y instanceof Text && ((E = y.textContent) != null && E.trim())) {
        const z = y.cloneNode();
        l.append(z);
      }
    return l;
  };
  let s = !0;
  try {
    return o(e);
  } finally {
    r.remove();
  }
}
function cn(e, t) {
  if (t === "none") return "";
  const n = t.split(" ").join(", ");
  switch (e) {
    case "translate":
      return `translate(${n})`;
    case "rotate":
      return `rotate(${n})`;
    case "scale":
      return `scale(${n})`;
  }
  return "";
}
function mm(e) {
  let t = 0, n = 0;
  const r = (i) => {
    if (i.scrollTop === 0 && i.scrollLeft === 0)
      return i.parentElement ? r(i.parentElement) : void 0;
    t += i.scrollTop, n += i.scrollLeft;
  };
  return e.parentElement ? (r(e.parentElement), [t, n]) : [0, 0];
}
function fm(e) {
  const t = (o) => {
    const s = o.offsetTop, c = o.offsetLeft, l = o.offsetParent;
    let a = { top: 0, left: 0 };
    return l && (a = t(l)), {
      top: s + a.top,
      left: c + a.left
    };
  }, [n, r] = mm(e), i = t(e);
  return i.top -= n, i.left -= r, i;
}
function er(e, t) {
  if (e instanceof HTMLHtmlElement) {
    er(document.body, t);
    return;
  }
  if (t === !1) {
    if (e.hasAttribute("data-vt-polyfill-opacity")) return;
    const n = e.style.opacity;
    e.setAttribute("data-vt-polyfill-opacity", n), e.style.opacity = "0.001";
  } else t === !0 && e.hasAttribute("data-vt-polyfill-opacity") && (e.style.opacity = e.getAttribute("data-vt-polyfill-opacity") ?? "", e.removeAttribute("data-vt-polyfill-opacity"));
}
function li(e) {
  const t = document.querySelectorAll("[data-vt-polyfill-opacity]");
  for (const n of t)
    er(n, e);
}
function gm(e) {
  const t = Ae(e, { context: "selector" }), n = Sn(
    t,
    (i) => Yn(i) && Xn.includes(i.name)
  );
  if (!n)
    throw new Error(
      `View Transitions API polyfill: invalid pseudo-element selector given: ${e}`
    );
  const r = ns(n);
  return Ye(r);
}
function ci(e) {
  const n = es(e).children;
  return !(n.length !== 1 || !ts(n[0]));
}
function bm(e) {
  const n = es(
    e
  ).value.children;
  return n.length !== 1 || !ts(n[0]) ? "" : n[0].name;
}
function ym(e) {
  const t = Ae(e, {
    context: "declarationList",
    parseCustomProperty: !0
  });
  Jn(t);
  const n = Gd(
    t,
    (r) => Ee(r) && r.property === "--vt-polyfill-name"
  );
  return n ? bm(n) : "";
}
function km(e, t) {
  const n = Ae(e, {
    context: "declarationList",
    parseCustomProperty: !0
  });
  Jn(n);
  const r = Kd(
    n,
    (o) => Ee(o) && o.property === "--vt-polyfill-name"
  );
  if (t === "")
    return De(n, {
      visit: "Declaration",
      enter(s, c, l) {
        s.property === "--vt-polyfill-name" && l.remove(c);
      }
    }), Ye(n);
  if (r.length >= 2) {
    const o = r[r.length - 1];
    De(n, {
      visit: "Declaration",
      enter(s, c, l) {
        s.property === "--vt-polyfill-name" && s !== o && l.remove(c);
      }
    });
  }
  if (r.length === 1) {
    const o = r[r.length - 1], s = Ae(t, { context: "value" }), c = Sn(
      s,
      (u) => Yd(u)
    );
    if (!c || !ci(c)) return e;
    const l = Ot(c);
    return o.value.children.clear(), o.value.children.append(l), Ye(n);
  } else {
    const o = `--vt-polyfill-name: ${t}`, s = Ae(o, {
      context: "declaration",
      parseCustomProperty: !0
    }), c = Sn(
      s,
      (a) => Ee(a) && a.property === "--vt-polyfill-name"
    );
    if (!c || !ci(c.value))
      return e;
    const l = Ot(c);
    n.children.append(l);
  }
  return Ye(n);
}
let Xe;
function wm(e) {
  const t = new $n(), n = new Zn(t);
  return Xe = t, t.startViewTransition(n, e), n.finished.then(() => {
    Xe = void 0;
  }), n;
}
function xm() {
  Object.defineProperty(Document.prototype, "startViewTransition", {
    value: wm,
    writable: !0
  });
}
function vm() {
  const e = HTMLHtmlElement.prototype.animate;
  Object.defineProperty(HTMLHtmlElement.prototype, "animate", {
    value: (t, n) => {
      const r = () => e.call(document.documentElement, t, n);
      if (!n || typeof n == "number") return r();
      const i = n.pseudoElement;
      if (!(i && i.startsWith("::view-transition")))
        return r();
      const s = gm(i), c = { ...n };
      delete c.pseudoElement;
      const l = document.querySelector(s);
      if (!l) {
        const u = new KeyframeEffect(
          document.documentElement,
          t,
          c
        );
        return Object.defineProperty(u, "pseudoElement", {
          get() {
            return i;
          }
        }), new Animation(u, document.timeline);
      }
      const a = l.animate(t, c);
      return Xe == null || Xe.updateAnimations(a), a;
    },
    configurable: !0,
    writable: !0
  });
}
function Sm() {
  const e = Document.prototype.getAnimations;
  Object.defineProperty(Document.prototype, "getAnimations", {
    value: () => {
      const t = e.call(document);
      return t.filter((r) => {
        var i;
        return (i = r.effect.target) == null ? void 0 : i.tagName.toLowerCase().startsWith("view-transition");
      }).forEach((r) => {
        var o;
        const i = (o = r.effect) == null ? void 0 : o.target;
        Object.defineProperty(r.effect, "target", {
          get() {
            return document.documentElement;
          }
        }), Object.defineProperty(r.effect, "pseudoElement", {
          get() {
            let s = `::${i == null ? void 0 : i.tagName.toLowerCase()}`;
            return i instanceof Zn || (s = s.concat(
              `(${i == null ? void 0 : i.getAttribute("name")})`
            )), s;
          }
        });
      }), t;
    },
    configurable: !0,
    writable: !0
  });
}
function Cm() {
  const e = Object.getOwnPropertyDescriptor(
    HTMLElement.prototype,
    "style"
  );
  Object.defineProperty(HTMLElement.prototype, "style", {
    get() {
      var r;
      const t = (r = e == null ? void 0 : e.get) == null ? void 0 : r.call(this), n = this;
      return Object.defineProperty(t, "viewTransitionName", {
        get() {
          const i = n.getAttribute("style") || "";
          return ym(i);
        },
        set(i) {
          const o = n.getAttribute("style") || "", s = km(o, i);
          return n.setAttribute("style", s), i;
        },
        configurable: !0
      }), t;
    },
    configurable: !0
  });
}
document.startViewTransition || (xm(), vm(), Sm(), Cm());
//# sourceMappingURL=view-transitions-polyfill.js.map
