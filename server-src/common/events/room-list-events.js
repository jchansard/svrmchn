"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var RoomListEvents = (function () {
    function RoomListEvents() {
    }
    Object.defineProperty(RoomListEvents.prototype, "createRoom", {
        get: function () { return '>:create-room'; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RoomListEvents.prototype, "getRooms", {
        get: function () { return '>:get-rooms'; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RoomListEvents.prototype, "roomListUpdate", {
        get: function () { return '<:roomListUpdate'; },
        enumerable: true,
        configurable: true
    });
    return RoomListEvents;
}());
exports.RoomListEvents = RoomListEvents;
//# sourceMappingURL=room-list-events.js.map