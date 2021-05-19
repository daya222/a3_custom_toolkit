import {SVG} from './svg.min.js';

import '@svgdotjs/svg.draggable.js'

/** Custom toolkit with 7 widgets */
var MyToolkit = (function() {


    /** Canvas space - page component */
    var draw = SVG().addTo('body').size(900, 900);
    var outline = draw.rect("100%", "100%").fill("blue")
    var defaultState = "idle"
    

    /** Custom button widget function
     * @constructor
     * @return Button widget
     */
    var Button = function(){

        /** Group button widget elements
         *  @var shadow - Black shadow of button
         *  @var rect - Button shape
         */
        var rect = draw.rect(100,50).fill({color:'#A7F3D0'})
        var shadow = draw.rect(100,50).fill("black")
        rect.stroke({color: "black", width:4})
       
        
        /**Group button attributes */
        var group = draw.group()
        group.add(rect)
        
        /**Track state and click event changes */
        var clickEvent = null
        var stateEvent = null

        /**Color change on hover state of button text */
        group.mouseover(function(){
            rect.fill({color:'#6EE7B7'})
            defaultState = "hover"
            transition()
        })
        
        /**Color change on "mouse out" state of button text */
        rect.mouseout(function(){
            rect.fill({ color: '#A7F3D0'})
            defaultState = "idle"
            transition()
        })
        /**Color change on "pressed" state of button text */
        group.mousedown(function(){
            rect.fill({ color: '#10B981'})
            defaultState = "pressed"
            transition()
        })

        /**Color change on "mouse up" state of button text */
        group.mouseup(function(){
            if (defaultState == "pressed"){
                if (clickEvent != null)
                    clickEvent(event)
            }
            defaultState = "up"
            rect.fill({ color: '#047857'})
            transition()
        })

        /** State change function */
        function transition(){
            if (stateEvent!=null) {
                stateEvent(defaultState)
            }
        }

        return {
            move: function(x, y) {
                group.move(x, y)
                shadow.move(x-8,y);
                rect.move(x-18,y-10)
            },
            onclick: function(eventHandler){
                clickEvent = eventHandler
            },
            stateChanged: function(eventHandler){
                stateEvent = eventHandler
            },
            text: function(text){
                var text = draw.text(text)
                group.add(text)
            }

        }
    }

    /**Custom CheckBox widget
     * @constructor
     * @return CheckBox widget
     */
    var CheckBox = function () {
            /** CheckBox attributes
             * @var shadow - shadow of button
             * @var rect2 - button object
             * @var check - checkmark object
            */
            var shadow2 = draw.rect(50,50).fill("black")
            var rect2 = draw.rect(50,50).fill({color:'#A7F3D0'})
            rect2.stroke({color: "black", width:4})
            var check = draw.path('M20.285 2l-11.285 11.567-5.286-5.011-3.714 3.716 9 8.728 15-15.285z')
            check.fill({color:"#A7F3D0"})

            /**Boolean to track whether widget has been "checked" */
            var checkedState = false;
            
            /**group used to move text easily */
            const group2 = draw.group()
            
            /**Track state and click event changes */
            var clickEvent = null
            var stateEvent = null
           
            /**hover state; if checkedState, keep displaying checkmark; if not, hide */
            rect2.mouseover(function(){
                defaultState="hover"
                if (checkedState== false) {
                    check.fill({color:"#6EE7B7"})
                }
                rect2.fill({ color: '#6EE7B7'})
                transition()
            })

            /** move mouse out; if checkedState, keep displaying checkmark; if not, hide  */
            rect2.mouseout(function(){
                defaultState = "idle"
                if (checkedState==false) {
                    check.fill({color:'#A7F3D0'})
                }
                this.fill({ color: '#A7F3D0'})
                transition()
            })

            /** release mouse button; if checkedState, keep displaying checkmark; if not, hide */
            rect2.mouseup(function(){
                defaultState="up"
                if (checkedState==false) {
                    check.fill({color:'#A7F3D0'})
                }
                this.fill({ color: '#A7F3D0'})
                transition()
            })

            /** press mouse button; modifies checkedState  */
            rect2.mousedown(function(){
                defaultState="pressed"
                if (checkedState==false){
                    checkedState = true
                    check.fill({ color: '#10B981'})
                }
                else {
                    checkedState = false
                }
                this.fill({ color: '#10B981'})
                transition()
            })

            /** click mouse button; notifies when checkedState has changed  */
            rect2.click(function(event){
                
                if(clickEvent != null)
                clickEvent(event)
                    if (checkedState) {
                        check.fill({color:'black'})
                        console.log("Checked!")
                    }
                    else {
                        
                        check.fill({color:'#A7F3D0'})
                        rect2.fill({color:'#A7F3D0'})
                        console.log("Unchecked!")
                    }
                    
                    
            })

            /** State change function */
            function transition(){
                if (stateEvent!=null) {
                    stateEvent(defaultState)
                }
            }
           
            return {
                move: function(x, y) {
                    group2.move(x+70,y+10)
                    rect2.move(x, y);
                    shadow2.move(x+7,y+10);
                    
                    check.move(x+13, y+15);
                    
                },
                stateChanged: function(eventHandler){
                    stateEvent = eventHandler
                },
                text: function(text){
                    var text = draw.text(text)
                    group2.add(text)
                },
                onclick: function(eventHandler){
                    clickEvent = eventHandler
                }
            }
        
    }

    /** Custom RadioButton widget
     * @constructor
     * @return RadioButton widget
     */
    var RadioButton = function (opt) {
        /**Min of 2 radio buttons; checks if consuming code has inputted at least 2 */
        if (opt.length < 2) {
            opt = []
            opt.push(["Radio Button 1", false])
            opt.push(["Radio Button 2", true])
        }

        /**Track state and click event changes */
        var clickEvent = null
        var stateEvent = null


        const group3 = draw.group()

        /** Spacing between radio buttons */
        var spacing = 10;

        /** array to store button attr created in loop below  */
        const buttons = []
        var checkedState = false;
        
        /** loop through input  */
        for (let i=0; i<opt.length; i++) {

            var circle = draw.circle(50,50).fill({color:'#A7F3D0'})
            circle.stroke({color: "black", width:4})

            var text = draw.text(opt[i][0])
            
            /**sets pre-selected radio button as selected in the display */
            if (opt[i][1]) {
                checkedState = true;
                circle.fill({color:"black"})
            }
            /**button attr for each: circle to display selection, checkedState, custom text, string text */
            buttons.push([circle,opt[i][1],text, opt[i][0]])
        }
        
    /**loop through each radio button objects with corresponding attr */
       for (let i=0; i<buttons.length; i++) {
            
            
            /**hover state; if checkedState keep displaying checkedState; else hide */
            buttons[i][0].mouseover(function(){
                defaultState="hover"
                if (buttons[i][1]) {
                    buttons[i][0].fill({color:"black"})
                }
                else {
                    buttons[i][0].fill({color:'#6EE7B7'})
                }
               
                transition()
            })

            /** move mouse out; if checkedState keep displaying checkedState; else hide  */
            buttons[i][0].mouseout(function(){
                defaultState = "idle"
                if (buttons[i][1]) {
                    buttons[i][0].fill({color:"black"})
                    
                }
                else {
                    buttons[i][0].fill({color:'#A7F3D0'})
                }
                transition()
            })

            /** release mouse button; if checkedState keep displaying checkedState; else hide */
            buttons[i][0].mouseup(function(){
                defaultState="up"
                if (buttons[i][1]) {
                    buttons[i][0].fill({color:"black"})
                    
                }
                else{
                    buttons[i][0].fill({color:'#A7F3D0'})
                }
                transition()
            })

            /** press mouse button; modifies checkedState  */
            buttons[i][0].mousedown(function(){
                defaultState="pressed"
                this.fill({ color: '#10B981'})
                transition()
            })
            /** click mouse button; modifies checkedState, makes sure only one selection is done  */
            buttons[i][0].click(function(event){
                
                if(clickEvent != null)
                    clickEvent(event)

                    if (buttons[i][1]){
                        buttons[i][1] = false;
                        buttons[i][0].fill({ color: '#A7F3D0'})
                        console.log(buttons[i][3]+ " has been unselected")
                    }
                    else {
                        for (let j=0; j<buttons.length;j++) {
                            if (buttons[j][1]) {
                                buttons[j][1]=false;
                                buttons[j][0].fill('#A7F3D0');
                                
                            }
                        }
                        buttons[i][1] = true;
                        buttons[i][0].fill({ color: 'black'})
                        
                        console.log(buttons[i][3]+ " has been selected")
                    }
                    
                    
            })
        }
            /** State change function */
            function transition(){
                if (stateEvent!=null) {
                    stateEvent(defaultState)
                }
            }
       
            return {
                move: function(x, y) {
                    for (let i=0; i<buttons.length; i++){

                        buttons[i][0].move(x,y+spacing);
                        //buttons[i][3].move(x+13,y+10+spacing);
                        buttons[i][2].move(x+70,y+15+spacing);
                        
                        spacing+=70;
                    }
                },
                stateChanged: function(eventHandler){
                    stateEvent = eventHandler
                },
                onclick: function(eventHandler){
                    clickEvent = eventHandler
                }
            }
    }

    /** Custom TextBox widget function
     * @constructor
     * @return TextBox widget
     */
    var TextBox = function(){
        var starting = 0

        /** Group textbox widget elements
         *  @var shadow - Black shadow of Textbox
         *  @var rect - Textbox shape
         *  @var frame - group textbox attr
         * @var text - input text
         */
        var shadow = draw.rect(200,50).fill("black")
        var frame = draw.group()
        var rect = frame.rect(200,50).fill({color:'#A7F3D0'}).stroke({color: "black", width:4})

        /**Track state and click event changes */
        var defaultState = null
        var stateEvent = null
        
        /**initialize text input and create caret */
        var text = frame.text("")//.move(370,210)
        var caret = frame.rect(2,15).fill({color:'#A7F3D0'})//.move(370,220)
        var runner = null
        
        /**handle inputted text and move caret */
        SVG.on(window, 'keyup',(event) => {
            if (text.length()<=180 && defaultState =="hover") {
                text.text(text.text()+event.key)
                console.log("text has changed")
                caret.x(text.length()+starting)
            }
        })
        frame.move(10,10)

        /**hover state: text can be inputted and caret blinks */
        frame.mouseover(function(event){
            defaultState = "hover"
            caret.fill({color:"black"})
            runner = caret.animate().width(0)
            runner.loop(1000,1,0)
            rect.fill({color:"#6EE7B7"})
            transition()
        })

        /** mouse out state: text can no longer be inputted and caret dissapears */
        frame.mouseout(function(event){
            caret.fill({color:'#A7F3D0'})
            runner.finish()
            defaultState = "idle"
            rect.fill({color:'#A7F3D0'})
            transition()
            
        })

        
       
        /** State change function */
        function transition(){
            if (stateEvent!=null) {
                stateEvent(defaultState)
            }
        }
        
        return {
            move: function(x, y) {
                frame.move(x, y)
                shadow.move(x+10,y+10);
                caret.move(x+10,y+15)
                starting = x+10
                text.move(10, 8)
                console.log(x,y)
                
                
                //rect.move(x+18,y-10)
            },
            onclick: function(eventHandler){
                clickEvent = eventHandler
            },
            stateChanged: function(eventHandler){
                stateEvent = eventHandler
            }

        }
  
    }   
     /** Custom scrollbar widget function
      * @constructor
     * @return ScrollBar widget
     */
      var ScrollBar = function(){
        /** Group scrollbar widget elements
         *  @var rect - scrollbar outline shape
         *  @var bar - scrollbar shape
         * 
         *  @var tri - scrollbar arrow with custom label
         *  @var tri2 - scrollbar arrow with custom label
         */
        
        /**create draggable scroll thumb */
        var bar = draw.rect(60,130).fill({color:"black"})
        bar.draggable()

        /**Group scroll attributes */
        var group = draw.group()
        
        var clickEvent = null
        var stateEvent = null

       var length = null;
        

        /**hover state of scroll thumb */
        bar.mouseover(function(){

            defaultState = "hover"
            transition()
        })
        
        /**"mouse out" state of scroll thumb */
        bar.mouseout(function(){
            defaultState = "idle"
            transition()
        })
        /**"pressed" state of scrollthumb*/
        bar.mousedown(function(){
            defaultState = "pressed"
            
            transition()

        })

        /**C"mouse up" state of scrollthumb */
        bar.mouseup(function(){
            if (defaultState == "pressed"){
                if (clickEvent != null)
                    clickEvent(event)
            }
            defaultState = "up"
            
            transition()
        })

        /** State change function */
        function transition(){
            if (stateEvent!=null) {
                stateEvent(defaultState)
            }
        }

        return {
            /**move function: create constraints for draggable scroll thumb */
            move: function(x, y) {
                group.move(x, y)
                bar.move(x,y)
                console.log(length)
                const constraints = new SVG.Box(x, y, 60, length)
                bar.on('dragmove.namespace',e=>{
                    const {handler, box}=e.detail
                    e.preventDefault()
        
                    let { x, y } = box
        
                    if (x < constraints.x) {
                        x = constraints.x
                      }
                    
                      if (y < constraints.y) {
                        y = constraints.y
                      }
                    
                      if (box.x2 > constraints.x2) {
                        x = constraints.x2 - box.w
                      }
                    
                      if (box.y2 > constraints.y2) {
                        y = constraints.y2 - box.h
                      }
                    
                      handler.move(x - (x % 10), y - (y % 10))
                    })
                
            },
            onclick: function(eventHandler){
                clickEvent = eventHandler
            },
            stateChanged: function(eventHandler){
                stateEvent = eventHandler
            },
            /**custom height of scroll bar */
            height: function(height){
                var rect = draw.rect(60,height).fill({color:'#A7F3D0'})
                
                rect.stroke({color: "black", width:4})
                group.add(rect)
                
                group.add(bar)
                
                length = height;
                
            }

        }
    } 
    /**Custom widget ToggleButton
     * @constructor
     * @return ToggleButton widget
     */
    var ToggleButton = function(){

        /**Toggle Button attr 
         * @var shadow2
         * @var rect2
         * @var circle
         * @var circle2
        */
        var shadow2 = draw.rect(150,50).fill("black")
        var rect2 = draw.rect(150,50).fill({color:'#A7F3D0'})
        rect2.stroke({color: "black", width:4})
        
        var circle = draw.circle(40,40)
        circle.fill({color:"#A7F3D0"})
        circle.stroke({color:"black"})
        var circle2 = draw.circle(40,40)
        circle2.fill({color:"#A7F3D0"})
        circle2.stroke({color:"black"})

        /**check which circle has been selected */
        var checkedState = "left";
        
        const group2 = draw.group()
        group2.add(circle)
        group2.add(circle2)
        
        
        var clickEvent = null
        var stateEvent = null
       
        /**hover state; if checkedState keep displaying checkmark */
        circle.mouseover(function(){
            defaultState="hover"
            if (checkedState == "left")
                circle.fill({color:"#A7F3D0"})
            else {
                circle.fill({color:"black"})
            }
            transition()
        })

        circle2.mouseover(function(){
            defaultState="hover"
            if (checkedState == "left") {
                circle2.fill({color:"black"})
            }
            else{
                circle2.fill({color:"#10B981"})
            }
            transition()
        })

        /** move mouse out; if checkedState keep displaying checkmark  */
        circle.mouseout(function(){
            defaultState = "idle"
            if (checkedState == "right") {
                circle.fill({color:'#6EE7B7'})
            }
            circle.fill({color:'#A7F3D0'})
            transition()
        })

        circle2.mouseout(function(){
            defaultState = "idle"
            if (checkedState == "right") {
                circle2.fill({color:'#10B981'})
            }
            else {
                circle2.fill({color:'#A7F3D0'})
            }
            
            transition()
        })
        

        /** press mouse button; modifies checkedState  */
        circle.mousedown(function(){
            defaultState="pressed"
            if (checkedState=="right"){
                checkedState = "left"
                circle.fill({ color: '#A7F3D0'})
                circle2.fill({color: '#A7F3D0'})
                rect2.fill({ color: '#A7F3D0'})
            }
            transition()
        })

        circle2.mousedown(function(){
            defaultState="pressed"
            if (checkedState=="left"){
                checkedState = "right"
                circle.fill({color:"#6EE7B7"})
                circle2.fill({ color: '#10B981'})
                rect2.fill({ color: '#6EE7B7'})
            }
            transition()
        })

        group2.click(function(event){
            
            if(clickEvent != null)
                clickEvent(event)
                if (checkedState=="left") {
                    console.log("Off!")
                }
                else {
                    console.log("On!")
                }
                
                
        })

        /** State change function */
        function transition(){
            if (stateEvent!=null) {
                stateEvent(defaultState)
            }
        }
       
        return {
            move: function(x, y) {
                group2.move(x+30,y-40)
                rect2.move(x, y);
                shadow2.move(x+7,y+10);
                
                circle.move(x+13, y+5);
                circle2.move(x+95, y+5);
                
            },
            stateChanged: function(eventHandler){
                stateEvent = eventHandler
            },
            text: function(text){
                var text = draw.text(text)
                group2.add(text)
            },
            onclick: function(eventHandler){
                clickEvent = eventHandler
            }
        }
    
}

return {Button, CheckBox, RadioButton, TextBox, ScrollBar, ToggleButton}
}());




export{MyToolkit}
