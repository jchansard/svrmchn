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
var ChatEvents = (function (_super) {
    __extends(ChatEvents, _super);
    function ChatEvents() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.NAMESPACE = '/chat';
        _this.sendMessage = '>:send-chat';
        _this.receiveMessage = '<:receive-chat';
        return _this;
    }
    return ChatEvents;
}(events_1.Events));
exports.ChatEvents = ChatEvents;
//# sourceMappingURL=chat.events.js.map