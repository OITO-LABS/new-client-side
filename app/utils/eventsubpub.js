import queryString from 'utils/querystring';
import * as CONST from 'utils/constants';
export default Object.seal({
    key: -1,
    currentCtxKey: -1,
    keyContext: {},
    subscribers: {},
    windowEvents: [CONST.WIN_CLICK, CONST.WIN_RESIZE, CONST.WIN_SCROLL],
    registeredEvents: [],
    subscribe: function (subscriberInfo, context, ctxKey) {
        this.subscribers[++this.key] = subscriberInfo;
        this.registerEvents(subscriberInfo);
        //this.keyContext[this.key] = null;
        if (context) {
            this.keyContext[this.key] = { ctx: context, ctxKey: (ctxKey || this.currentCtxKey), key: this.key };
        }
        return this.key;
    },
    publish: function (args, eventName) {
        let keys = Object.keys(this.subscribers);
        for (var i in keys) {
            try {
                let sub = this.subscribers[keys[i]];
                if (sub[eventName]) {
                    //console.log(eventName + ' called.....');
                    sub[eventName](args);
                }
            }
            catch (ignore) { }
        }
    },
    generateNewCtxKey: function (removeCurrent) {
        removeCurrent && this.unsubscribeUnMoutedCTx(false, this.currentCtxKey);
        this.currentCtxKey = new Date().getTime();
        return this.currentCtxKey;
    },
    trigger: function (eventName, ...arg) {
        setTimeout(()=>this.publish(arg, eventName),0);        
    },
    hasEvent:function(key)
    {
        return !!this.subscribers[key];
    },
    unsubscribe: function (key) {
        //console.log('unsubscribe => ' + queryString.stringify(Object.keys(this.subscribers[key])));
        delete this.subscribers[key];
        delete this.keyContext[key];
    },
    unsubscribeUnMoutedCTx: function (allCtx, ctxKey) {
        let keys = Object.keys(this.subscribers);
        for (var i in keys) {
            try {
                let context = this.keyContext[keys[i]];
                if (context && (allCtx || (context.ctxKey == ctxKey) || (context.ctx.updater && !context.updater.isMounted(context)))) {
                    //console.log('----------removed ctxt----------');
                    this.unsubscribe(context.key);
                }
            }
            catch (ignore) { }
        }
        //genNewCtx && this.generateNewCtxKey();
    },
    registerEvents: function (events) {
        for (var key in events) {
            this.registerEvent(key);
        }
    },
    registerEvent: function (eventName) {
        if (eventName && !this.registeredEvents.includes(eventName) && this.windowEvents.includes(eventName)) {
            window.addEventListener(eventName, function (event) {
                app.events.publish(event, eventName);
            });
            this.registeredEvents.push(eventName);
        }
    }
});