"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Events = (function () {
    function Events() {
        this.NAMESPACE = '/';
        this.allEvents = Object.keys(this).filter(function (event) { return event !== "NAMESPACE"; });
    }
    return Events;
}());
exports.Events = Events;
//# sourceMappingURL=events.js.map