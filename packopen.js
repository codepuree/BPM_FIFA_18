function packopen() {  
    const btnStore = document.querySelector("button.btnFooter.btnStore")
    //opens store
    simulateklick(btnStore)

    // choose bronzepacks
    setTimeout(function () {
        simulateklick(document.querySelector("a.TabMenuItem:nth-child(4)"))
    }, 3000 + Math.random() * 750)

    // buys pack
    setTimeout(function () {
        simulateklick(document.querySelector('.StorePack button.currency.cCoins'))
    }, 5000 + Math.random() * 750)

    // confirms buy
    setTimeout(function () {
        simulateklick(document.querySelectorAll("a.btn-flat")[1])
    }, 7000 + Math.random() * 750)

    // sent to my club
    setTimeout(function () {
        simulateklick(document.querySelector("button.standard.section-header-btn.mini.call-to-action"))
    }, 17000 + Math.random() * 750)

    // 
    setTimeout(function () {
        Array.from(document.querySelectorAll('section.list-view.sectioned-item-list>ul>li.listFUTItem'))
            .forEach((element, index) => {
                setTimeout(_=> {
                    simulateklick(element)
                        .then(_=>{
                            let btnRedeem = getButtonInDetailsPanel('redeem');
                            let btnPlayerBio = getButtonInDetailsPanel('player bio');
                            
                            if (btnRedeem != undefined && btnRedeem != null) {
                                simulateklick(btnRedeem)
                            } else if (btnPlayerBio != undefined && btnPlayerBio != null) {
                                let btnSendToTranferList = getButtonInDetailsPanel('send to transfer list');
                                
                                if (btnSendToTranferList) {
                                    simulateklick(btnSendToTranferList)
                                } else {
                                    console.error('Unable to send to transfer list', element);
                                }
                            } else {
                                let btnQuickSell = getButtonInDetailsPanel('quick sell');

                                if (btnQuickSell) {
                                    simulateklick(btnQuickSell)
                                        .then(_=>{
                                            setTimeout(_=>{
                                                simulateklick(document.querySelectorAll("a.btn-flat")[1])
                                            }, 500+ Math.random()*222)
                                        })
                                }
                            }
                        })
                    }, index * 1800)
                    
                })
    }, 25000 + Math.random() * 750)

    // setTimeout(function() {
    //     let btnSendToTransfer = document.querySelector("button.standard.section-header-btn.mini.call-to-action");
    //     if (btnSendToTransfer) {
    //         simulateklick(btnSendToTransfer)
    //         setTimeout(function() {
    //             simulateklick(document.querySelectorAll("a.btn-flat")[1])
    //         }, 1400)
    //     }
    // }, 11000)

}
function openpacks(runs)
{
 for (let i=0; i<runs; i++)
 {
     (function(i) {
         setTimeout(_=>{
             packopen()
             console.log(`Opening pack number ${i}...`)
         },i*45000)
     })(i);
 }
}


function simulateklick(element) {
    return new Promise((resolve, reject) => {
        try {
            simulate(element, "mouseover")
            simulate(element, "mousedown")
            simulate(element, "mouseup")

            resolve();
        } catch (error) {
            reject(error);
        }
    })
}

function delay(t) {
    return function (v) {
        return new Promise(function (resolve) {
            setTimeout(resolve.bind(null, v), t)
        });
    }
}

function getButtonInDetailsPanel(textContent) {
    return Array.from(document.querySelectorAll('.DetailPanel>ul>button'))
        .filter(element => !element.style.display.includes('none'))
        .find(element => element.querySelector('.btn-text').innerHTML.toLowerCase().includes(textContent));
}

function simulate(element, eventName) {
    var options = extend(defaultOptions, arguments[2] || {});
    var oEvent, eventType = null;

    for (var name in eventMatchers) {
        if (eventMatchers[name].test(eventName)) { eventType = name; break; }
    }

    if (!eventType)
        throw new SyntaxError('Only HTMLEvents and MouseEvents interfaces are supported');

    if (document.createEvent) {
        oEvent = document.createEvent(eventType);
        if (eventType == 'HTMLEvents') {
            oEvent.initEvent(eventName, options.bubbles, options.cancelable);
        }
        else {
            oEvent.initMouseEvent(eventName, options.bubbles, options.cancelable, document.defaultView,
                options.button, options.pointerX, options.pointerY, options.pointerX, options.pointerY,
                options.ctrlKey, options.altKey, options.shiftKey, options.metaKey, options.button, element);
        }
        element.dispatchEvent(oEvent);
    }
    else {
        options.clientX = options.pointerX;
        options.clientY = options.pointerY;
        var evt = document.createEventObject();
        oEvent = extend(evt, options);
        element.fireEvent('on' + eventName, oEvent);
    }
    return element;
}

function extend(destination, source) {
    for (var property in source)
        destination[property] = source[property];
    return destination;
}

var eventMatchers = {
    'HTMLEvents': /^(?:load|unload|abort|error|select|change|submit|reset|focus|blur|resize|scroll)$/,
    'MouseEvents': /^(?:click|dblclick|mouse(?:down|up|over|move|out))$/
}
var defaultOptions = {
    pointerX: 0,
    pointerY: 0,
    button: 0,
    ctrlKey: false,
    altKey: false,
    shiftKey: false,
    metaKey: false,
    bubbles: true,
    cancelable: true
}
