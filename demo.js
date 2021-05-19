import {MyToolkit} from './mytoolkit.js';

// Implement a MyToolkit Button
var btn = new MyToolkit.Button;
btn.text("Click Me")
btn.move(150,100);

btn.onclick(function(e){
	console.log(e);
});
btn.stateChanged(function(e){
	console.log(e)
});
var check = new MyToolkit.CheckBox;
check.text("Check Box")
check.move(130,200);
check.onclick(function(e){
	console.log(e)
});
check.stateChanged(function(e){
	console.log(e)
});

let opt = []
opt.push(["Radio Button 1", true])
opt.push(["Radio Button 2", false])
opt.push(["Radio Button 3", false])
var radio = new MyToolkit.RadioButton(opt);
radio.move(130,300);
radio.onclick(function(e){
	console.log(e)
});
radio.stateChanged(function(e){
	console.log(e)
});

let tb = new MyToolkit.TextBox()
tb.move(350,200)
tb.text = ""
tb.stateChanged(function(e){
	console.log(e)
});

let sb = new MyToolkit.ScrollBar()
sb.height(450)
sb.move(650, 200)

var tgbtn = new MyToolkit.ToggleButton;
tgbtn.text("Toggle Button")
tgbtn.move(130,600);

tgbtn.onclick(function(e){
	console.log(e);
});
tgbtn.stateChanged(function(e){
	console.log(e)
});