"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var events_1 = require("./events");
var RoomListEvents = (function (_super) {
    __extends(RoomListEvents, _super);
    function RoomListEvents() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.NAMESPACE = '/room-list';
        _this.createRoom = '>:create-room';
        _this.getRooms = '>:get-rooms';
        _this.roomListUpdate = '<:roomListUpdate';
        return _this;
    }
    return RoomListEvents;
}(events_1.Events));
exports.RoomListEvents = RoomListEvents;
//# sourceMappingURL=room-list.events.js.map