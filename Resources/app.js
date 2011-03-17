// this sets the background color of the master UIView (when there are no windows/tab groups on it)
Titanium.UI.setBackgroundColor('#000');

// create tab group
var tabGroup = Titanium.UI.createTabGroup();


//
// create base UI tab and root window
//
var win1 = Titanium.UI.createWindow({  
	height:Ti.Platform.displayCaps.platformHeight,
	width:Ti.Platform.displayCaps.platformWidth,
	fullscreen:true,
    title:'MYtxtBOX Quick SMS',
    backgroundColor:'#fff'
});

var tab1 = Titanium.UI.createTab({  
    icon:'KS_nav_views.png',
    title:'Send Quick SMS',
    window:win1
});

var smsapi 	= Titanium.Network.createHTTPClient();

var mobileno = Titanium.UI.createTextField({
	top:10,
	left:10,
	width:300,
	height:40,
	hintText:'Mobile Number',
	keyboardType:Titanium.UI.KEYBOARD_NUMBER_PAD,
	borderStyle:Titanium.UI.INPUT_BORDERSTYLE_ROUNDED,
	returnKeyType:Titanium.UI.RETURNKEY_NEXT,
	suppressReturn:false
});

var message = Titanium.UI.createTextArea({
	top:60,
	left:10,
	width:300,
	height:120,
	borderWidth:2,
	borderColor:'#bbb',
	borderRadius:5,
	keyboardType:Titanium.UI.KEYBOARD_DEFAULT
});

var sendbut = Ti.UI.createButton({
	title:'Send SMS',
	height:40,
	width:200,
	top:260
});

mobileno.addEventListener('return',function(){message.focus();});

sendbut.addEventListener('click',function(){
	if (mobileno.value == '' || message.value == '' || username.value == '' || password.value == '')
	{
		alert('Aaah! Please don\'t try me. Fill the form and submit');
	}else{
		smsapi.open("GET","http://site.mytxtbox.com/sms_api?username="+username.value+"&password="+password.value+"&msg="+message.value+"&to="+mobileno.value); 
		smsapi.onload = function(){
			
			if (this.responseText == 'OK') {
				alert('Your SMS has been successfully sent.');
			}else{
				alert(this.responseText);
			}
		};
		smsapi.send();
	}
});


win1.add(mobileno);
win1.add(message);
win1.add(sendbut);

//
// create controls tab and root window
//
var win2 = Titanium.UI.createWindow({ 
    title:'Account Settings',
    backgroundColor:'#fff'
});

var tab2 = Titanium.UI.createTab({  
    icon:'KS_nav_ui.png',
    title:'Account Settings',
    window:win2
});

username = Titanium.UI.createTextField({
	top:10,
	left:10,
	width:300,
	height:40,
	hintText:'MYtxtBOX Username',
	keyboardType:Titanium.UI.KEYBOARD_DEFAULT,
	returnKeyType:Titanium.UI.RETURNKEY_NEXT,
	borderStyle:Titanium.UI.INPUT_BORDERSTYLE_ROUNDED,
	suppressReturn:false
});

password = Titanium.UI.createTextField({
	top:60,
	left:10,
	width:300,
	height:40,
	hintText:'MYtxtBOX Password',
	passwordMask:true,
	keyboardType:Titanium.UI.KEYBOARD_DEFAULT,
	borderStyle:Titanium.UI.INPUT_BORDERSTYLE_ROUNDED,
	returnKeyType:Titanium.UI.RETURNKEY_DEFAULT
});

username.addEventListener('return',function(){password.focus();});

win2.add(username);
win2.add(password);

//
//  add tabs
//
tabGroup.addTab(tab1);  
tabGroup.addTab(tab2);  


// open tab group
tabGroup.open();
