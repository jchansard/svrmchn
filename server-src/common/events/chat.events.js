"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ChatEvents = (function () {
    function ChatEvents() {
    }
    Object.defineProperty(ChatEvents.prototype, "sendMessage", {
        get: function () { return '>:send-chat'; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ChatEvents.prototype, "receiveMessage", {
        get: function () { return '<:receive-chat'; },
        enumerable: true,
        configurable: true
    });
    return ChatEvents;
}());
exports.ChatEvents = ChatEvents;
//# sourceMappingURL=chat.events.js.map