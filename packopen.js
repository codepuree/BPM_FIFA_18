/**
 * The function packopen, buys, opens and manages a pack.
 */
async function packopen() {
    const btnStore = document.querySelector("button.btnFooter.btnStore")

    //opens store
    await simulateklick(btnStore)

    // choose bronzepacks
    await delay(600 + Math.random() * 750)
    await simulateklick(document.querySelector("a.TabMenuItem:nth-child(4)"))

    // buys pack
    await delay(600 + Math.random() * 750)
    await simulateklick(document.querySelector('.StorePack button.currency.cCoins'))

    // confirms buy
    await delay(600 + Math.random() * 750)
    await simulateklick(document.querySelectorAll("a.btn-flat")[1])

    // wait for pack open animation to finish
    await delay(10000)

    // sent to my club
    await delay(600 + Math.random() * 750)
    await simulateklick(document.querySelector("button.standard.section-header-btn.mini.call-to-action"))

    // clear up pack items list
    await delay(600 + Math.random() * 750)
    let fuItems = Array.from(document.querySelectorAll('section.list-view.sectioned-item-list>ul>li.listFUTItem'))
    for (let fuItem of fuItems) {
        await delay(600 + Math.random() * 750)
        await simulateklick(element)
        
        let btnRedeem = getButtonInDetailsPanel('redeem');
        let btnPlayerBio = getButtonInDetailsPanel('player bio');
        
        if (btnRedeem != undefined && btnRedeem != null) {
            await delay(600 + Math.random() * 750)
            await simulateklick(btnRedeem)
        } else if (btnPlayerBio != undefined && btnPlayerBio != null) {
            let btnSendToTranferList = getButtonInDetailsPanel('send to transfer list');
            
            if (btnSendToTranferList) {
                await delay(600 + Math.random() * 750)
                await simulateklick(btnSendToTranferList)
            } else {
                console.error('Unable to send to transfer list', element);
            }
        } else {
            let btnQuickSell = getButtonInDetailsPanel('quick sell');
            
            if (btnQuickSell) {
                await delay(600 + Math.random() * 750)
                await simulateklick(btnQuickSell)
                await delay(600 + Math.random() * 750)
                await simulateklick(document.querySelectorAll("a.btn-flat")[1])
            }
        }
    }
}

/**
 * The function openpacks, opens the given number of packs.
 * 
 * @param {Number} runs - Specifies the number of packs to open
 */
function openpacks(runs) {
    for (let i = 0; i < runs; i++) {
        (function (i) {
            setTimeout(_ => {
                packopen()
                console.log(`Opening pack number ${i}...`)
            }, i * 45000)
        })(i);
    }
}

/**
 * The function simulateklick, simulates a mouse click on a given element.
 * 
 * @param {HTMLElement} element - HTML element that should be clicked
 * @returns {Promise<|Error>} - Resolves if all steps worked
 */
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

/**
 * The function delay, is the promise version of setTimeout.
 * 
 * @param {Number} t - Time out in milliseconds
 * @returns {Promise<arguments|Error} - Promise with given arguments
 */
function delay(t) {
    return function (v) {
        return new Promise(function (resolve) {
            setTimeout(resolve.bind(null, v), t)
        });
    }
}

/**
 * The function getButtonInDetails, returns a visible button with the given text
 * content in the details panel.
 * 
 * @param {String} textContent - Text content in button
 * @returns {HTMLButtonElement} - HTML button with containing text
 */
function getButtonInDetailsPanel(textContent) {
    return Array.from(document.querySelectorAll('.DetailPanel>ul>button'))
        .filter(element => !element.style.display.includes('none'))
        .find(element => element.querySelector('.btn-text').innerHTML.toLowerCase().includes(textContent));
}

/**
 * The function simulate, simulates an event on a given element
 * 
 * @param {HTMLElement} element - HTML element, where the event should get 
 *                                applied
 * @param {String} eventName - Name of the event to execute
 */
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

/**
 * The function extend, extends the given destination object with the data of 
 * the other given source object.
 * 
 * @param {Object} destination 
 * @param {Object} source 
 * @returns {Object}
 */
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
