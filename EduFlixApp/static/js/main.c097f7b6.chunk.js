(this.webpackJsonpstreaming = this.webpackJsonpstreaming || []).push([
  [0], {
    63: function(e, n, t) {
      "use strict";
      t.r(n);
      var r = t(4),
        c = t(5),
        i = t(7),
        o = t(8),
        s = t(30),
        a = t(13),
        d = t(15),
        j = t(3),
        u = t.n(j),
        l = t(41),
        b = t.n(l),
        h = t(20),
        O = t(32);

      function f() {
        var e = Object(s.a)(["\n  width: 100%;\n"]);
        return f = function() {
          return e
        }, e
      }

      function x() {
        var e = Object(s.a)(["\n  width: 100%;\n"]);
        return x = function() {
          return e
        }, e
      }

      function p() {
        var e = Object(s.a)(["\n  flex: 1 1 50%;\n"]);
        return p = function() {
          return e
        }, e
      }

      function v() {
        var e = Object(s.a)(["\n  flex: 1 1 50%;\n\n"]);
        return v = function() {
          return e
        }, e
      }

      function m() {
        var e = Object(s.a)(["\n  display: flex;\n  width: 100%;\n  justify-content: space-evenly;\n"]);
        return m = function() {
          return e
        }, e
      }
      var g = "https://api.simplewebrtc.com/config/guest/".concat("716625839d6dd087acb04de6"),
        w = h.j(),
        y = O.a.div(m()),
        k = O.a.div(v()),
        R = O.a.div(p()),
        U = Object(O.a)(h.i)(x()),
        C = O.a.video(f()),
        F = function(e) {
          Object(i.a)(t, e);
          var n = Object(o.a)(t);

          function t() {
            return Object(r.a)(this, t), n.apply(this, arguments)
          }
          return Object(c.a)(t, [{
            key: "render",
            value: function() {
              return this.props.peers.map((function(e) {
                return console.log(e), Object(a.jsx)(h.f, {
                  peer: e.address,
                  render: function(n) {
                    var t = n.media.filter((function(e) {
                      return "video" === e.kind && !e.remoteDisabled
                    }));
                    return t.length > 0 ? Object(a.jsxs)("div", {
                      children: [Object(a.jsxs)("p", {
                        children: ["Video for Peer ", e.id]
                      }), Object(a.jsx)(U, {
                        media: t[0]
                      })]
                    }, e.id) : Object(a.jsx)("h1", {
                      children: "Can't find video for peer"
                    })
                  }
                })
              }))
            }
          }]), t
        }(u.a.Component);
      b.a.render(Object(a.jsx)(d.a, {
        store: w,
        children: Object(a.jsxs)(y, {
          children: [Object(a.jsxs)(k, {
            children: [Object(a.jsx)("h1", {
              children: "Lecture Video!"
            }), Object(a.jsx)(C, {
              src: function() {
                var e = window.location.search;
                console.log(e);
                var n = new URLSearchParams(e).get("s3link");
                return null == n ? "" : n
              }(),
              controls: !0,
              children: "Your browser does not support the video tag."
            })]
          }), Object(a.jsx)(R, {
            children: Object(a.jsxs)(h.d, {
              configUrl: g,
              children: [Object(a.jsx)(h.b, {
                children: Object(a.jsx)("h1", {
                  children: "Connecting..."
                })
              }), Object(a.jsxs)(h.a, {
                children: [Object(a.jsx)("h1", {
                  children: "Connected!"
                }), Object(a.jsx)(h.g, {
                  audio: !0,
                  video: !0,
                  auto: !0
                }), Object(a.jsx)(h.e, {}), Object(a.jsx)(h.h, {
                  name: "YOUR_ROOM_NAME",
                  password: "YOUR_ROOM_PASSWORD",
                  children: function(e) {
                    var n = e.peers;
                    return Object(a.jsxs)(a.Fragment, {
                      children: [Object(a.jsx)(h.c, {
                        shared: !0,
                        render: function(e) {
                          var n = e.media.filter((function(e) {
                            return "video" === e.kind
                          }));
                          return n.length > 0 ? Object(a.jsx)(a.Fragment, {
                            children: n.map((function(e) {
                              return Object(a.jsxs)(a.Fragment, {
                                children: [Object(a.jsx)("p", {
                                  children: "Local Video"
                                }), Object(a.jsx)(U, {
                                  media: e
                                }, e.id)]
                              })
                            }))
                          }) : Object(a.jsx)("h1", {
                            children: "No Stream For Local User - is your webcam on?"
                          })
                        }
                      }), Object(a.jsx)(F, {
                        peers: n
                      })]
                    })
                  }
                })]
              })]
            })
          })]
        })
      }), document.getElementById("root"))
    },
    80: function(e, n) {},
    82: function(e, n) {}
  },
  [
    [63, 1, 2]
  ]
]);
//# sourceMappingURL=main.c097f7b6.chunk.js.map
