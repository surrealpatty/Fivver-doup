(function () {
    "use strict";
    var n = {
        531: function (n, r, t) {
            var e = t(751), // Importing a module (e.g., Vue)
                o = t(641); // Importing another module

            const i = { id: "app" }; // Element ID for mounting the app

            // Render function
            function u(n, r, t, e, u, f) {
                return (0, o.uX)(), (0, o.CE)("div", i, r[0] || (r[0] = [
                    (0, o.Lk)("h1", null, "Welcome to Fivver Doup!", -1) // Header element
                ]));
            }

            var f = { name: "App" }; // Component definition
            var c = t(262); // Importing another module

            // Creating component with render function and scope ID
            const a = (0, c.A)(f, [["render", u], ["__scopeId", "data-v-ebe75784"]]);
            var v = a;

            // Mounting the app to the DOM
            const p = (0, e.Ef)(v);
            p.mount("#app");
        }
    }, r = {};

    // Module loader function
    function t(e) {
        var o = r[e];
        if (void 0 !== o) return o.exports;
        var i = r[e] = { exports: {} };
        return n[e](i, i.exports, t), i.exports;
    }

    // Exposing modules and handling dependencies
    t.m = n, function () {
        var n = [];
        t.O = function (r, e, o, i) {
            if (!e) {
                var u = 1 / 0;
                for (v = 0; v < n.length; v++) {
                    e = n[v][0], o = n[v][1], i = n[v][2];
                    for (var f = !0, c = 0; c < e.length; c++) {
                        (!1 & i || u >= i) && Object.keys(t.O).every(function (n) {
                            return t.O[n](e[c]);
                        }) ? e.splice(c--, 1) : (f = !1, i < u && (u = i));
                    }
                    if (f) {
                        n.splice(v--, 1);
                        var a = o();
                        void 0 !== a && (r = a);
                    }
                }
                return r;
            }
            i = i || 0;
            for (var v = n.length; v > 0 && n[v - 1][2] > i; v--) n[v] = n[v - 1];
            n[v] = [e, o, i];
        };
    }();

    // Defining additional helper functions
    function () {
        t.d = function (n, r) {
            for (var e in r) t.o(r, e) && !t.o(n, e) && Object.defineProperty(n, e, {
                enumerable: !0,
                get: r[e]
            });
        };
    };

    function {
        t.g = function () {
            if ("object" === typeof globalThis) return globalThis;
            try {
                return this || new Function("return this")();
            } catch (n) {
                if ("object" === typeof window) return window;
            }
        };
    };

    function {
        t.o = function (n, r) {
            return Object.prototype.hasOwnProperty.call(n, r);
        };
    };

    // Handling dynamic imports
    (function () {
        var n = { 524: 0 };
        t.O.j = function (r) { return 0 === n[r]; };
        var r = function (r, e) {
            var o, i, u = e[0], f = e[1], c = e[2], a = 0;
            if (u.some(function (r) { return 0 !== n[r]; })) {
                for (o in f) t.o(f, o) && (t.m[o] = f[o]);
                if (c) var v = c(t);
            }
            for (r && r(e); a < u.length; a++) {
                i = u[a];
                t.o(n, i) && n[i] && n[i][0]();
                n[i] = 0;
            }
            return t.O(v);
        }, e = self["webpackChunkfivver_doup"] = self["webpackChunkfivver_doup"] || [];
        e.forEach(r.bind(null, 0)), e.push = r.bind(null, e.push.bind(e));
    })();

    // Initial module execution
    var e = t.O(void 0, [504], function () {
        return t(531);
    });
    e = t.O(e);
})();
