let current_session = 'greeter:config:session';
let blank_session = 'select session:';

// NOTE: do not set this to true, feature has not been implemented yet and setting to true will not allow you to log in
let console_mode = false; // change the theming a little to resemble a TUI, TODO


// Gets the current system time, returns string representation
function get_date_time() {
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    var now     = new Date(); 
    var year    = now.getFullYear();
    var month   = monthNames[now.getMonth()]; 
    var day     = now.getDate();
    var hour    = now.getHours();
    var minute  = now.getMinutes();
    var second  = now.getSeconds(); 

    if (day.toString().length == 1) {
         day = '0' + day;
    }   
    if (hour.toString().length == 1) {
         hour = '0' + hour;
    }
    if (minute.toString().length == 1) {
         minute = '0' + minute;
    }
    if (second.toString().length == 1) {
         second = '0' + second;
    }   

    return (day + ' ' + month + ' ' + year + ', ' + hour + ':' + minute + ':' + second);
}

// Clears all messages being displayed
function clear_messages() {
    let messages = document.getElementById("messages");
    messages.innerHTML = "";
    messages.style.visibility = "hidden";
}

function init_session_menu() {
    var x, i, j, l, ll, selElmnt, a, b, c;
    x = document.getElementsByClassName("custom-select");
    l = x.length;
    for (i = 0; i < l; i++) {
        selElmnt = x[i].getElementsByTagName("select")[0];
        ll = selElmnt.length;
        a = document.createElement("DIV");
        a.setAttribute("class", "select-selected");
        a.innerHTML = selElmnt.options[selElmnt.selectedIndex].innerHTML;
        x[i].appendChild(a);
        b = document.createElement("DIV");
        b.setAttribute("class", "select-items select-hide");
        for (j = 1; j < ll; j++) {
            c = document.createElement("DIV");
            c.innerHTML = selElmnt.options[j].innerHTML;
            c.addEventListener("click", function(e) {
                var y, i, k, s, h, sl, yl;
                s = this.parentNode.parentNode.getElementsByTagName("select")[0];
                sl = s.length;
                h = this.parentNode.previousSibling;
                for (i = 0; i < sl; i++) {
                    if (s.options[i].innerHTML == this.innerHTML) {
                        s.selectedIndex = i;
                        h.innerHTML = this.innerHTML;
                        y = this.parentNode.getElementsByClassName("same-as-selected");
                        yl = y.length;
                        for (k = 0; k < yl; k++) {
                            y[k].removeAttribute("class");
                        }
                        this.setAttribute("class", "same-as-selected");
                        break;
                    }
                }
                h.click();
                update_current_session()
            });
            b.appendChild(c);
        }
        x[i].appendChild(b);
        a.addEventListener("click", function(e) {
            e.stopPropagation();
            close_all_select(this);
            this.nextSibling.classList.toggle("select-hide");
            this.classList.toggle("select-arrow-active");
            });
    }

    // Here we'll implement the console mode
    if (console_mode === true) {
        document.getElementById("break").style.display = "inline";
        document.getElementById("titlebreak_0").style.display = "inline";
        document.getElementById("titlebreak_1").style.display = "inline";
        document.getElementById("user_indicator").style.display = "inline";
        document.getElementById("pass_indicator").style.display = "inline";
        document.getElementById("login_button").style.display = "none";
        document.getElementById("pagetitle").style.fontSize = "16px";
        document.getElementById("pagetitle").style.fontWeight = "normal";
    } else {
        document.getElementById("break").style.display = "none";
        document.getElementById("titlebreak_0").style.display = "none";
        document.getElementById("titlebreak_1").style.display = "none";
        document.getElementById("user_indicator").style.display = "none";
        document.getElementById("pass_indicator").style.display = "none";
        document.getElementById("login_button").style.display = "inline";
        document.getElementById("username").setAttribute("placeholder", "username") ;
        document.getElementById("password").setAttribute("placeholder", "password") ;
        document.getElementById("pagetitle").style.fontSize = "32px";
        document.getElementById("pagetitle").style.fontWeight = "bold";
    }

}

function close_all_select(elmnt) {
    var x, y, i, xl, yl, arrNo = [];
    x = document.getElementsByClassName("select-items");
    y = document.getElementsByClassName("select-selected");
    xl = x.length;
    yl = y.length;
    for (i = 0; i < yl; i++) {
        if (elmnt == y[i]) {
            arrNo.push(i)
        } else {
            y[i].classList.remove("select-arrow-active");
        }
    }
    for (i = 0; i < xl; i++) {
        if (arrNo.indexOf(i)) {
            x[i].classList.add("select-hide");
        }
    }
}

function add_session_options() {
    session_names = [];
    max_session_name_len = 0;
    session_menu = document.getElementById("session-menu");

    if(window.lightdm !== undefined && lightdm.sessions !== undefined) {
        var i;
        for (i = 0; i < lightdm.sessions.length; i++) {
            session_names.push(lightdm.sessions[i].name);
        } 
    }
    else {
        show_message("Unable to get list of available sessions", "error")
    }

    if (localStorage.getItem(current_session) !== null && session_names.includes(localStorage.getItem(current_session))) {
        session_menu.innerHTML = `<option value="0">${localStorage.getItem(current_session)}</option>`;
        max_session_name_len = localStorage.getItem(current_session).length;
    }
    else {
        session_menu.innerHTML = `<option value="0" id="session-blank">${blank_session}</option>`;
        max_session_name_len = blank_session.length;
    }

    for (session_num in session_names) {
        session_name = session_names[session_num]
        session_menu.innerHTML += `<option value="${session_num + 1}">${session_name}</option>`;
        if (session_name.length > max_session_name_len) {
            max_session_name_len = session_name.length;
        }
    }
    font_size = parseFloat(window.getComputedStyle(document.getElementById('main_nav'), null).getPropertyValue('font-size')) * 3 / 4;
    session_menu_width = font_size * max_session_name_len;
    document.getElementById("custom-select-div").style.width = session_menu_width + "px";
}

function update_current_session() {
    console.log("Trying to update current session")
    selected_session = document.getElementsByClassName("select-selected")[0].textContent
    if (selected_session !== blank_session){
        console.log("Updating current session")
        localStorage.setItem(current_session, selected_session)
    }
}

window.show_prompt = function(text, type) {   
    password = document.getElementById("password");
    if (type === 'password') {
        lightdm.respond(password.value);
    }
};

window.show_message = function(text, type) {    
    if (0 === text.length) {
        return;
    }
    let messages = document.getElementById('messages');
    messages.style.visibility = "visible";
    if (type == 'error') {
        text = `<li style="color:red;">${text}</li>`;
    }
    messages.innerHTML = `${messages.innerHTML}${text}`;
};

window.authentication_complete = function() {  
    if (lightdm.is_authenticated && localStorage.getItem(current_session) !== null && lightdm.sessions !== undefined ) {
        choosen_session = null;
        for (i = 0; i < lightdm.sessions.length; i++) {
            if (lightdm.sessions[i].name === localStorage.getItem(current_session)) {
                choosen_session = lightdm.sessions[i];
            }
        }
        lightdm.start_session_sync(choosen_session.key);
    } else {
        show_message("Authentication Failed", "error");
    }
};

// Runs if we're attempting authentication
window.start_authentication = function(username) {   
    //clear_messages();
    lightdm.authenticate(username);
};

// Runs when we confirm our credentials
window.handle_input = function(e) {   
    let username = document.getElementById("username");

    // if the username is empty
    if (username.value === "") {
        clear_messages();
        show_message("No username provided", "error");
        e.preventDefault();
        return;
    }
    
    // no session was provided
    if (localStorage.getItem(current_session) === null) {
        clear_messages();
        show_message('Choose a proper session', 'error');
        e.preventDefault();
        return;
    }

    start_authentication(username.value);
    
    if (e !== undefined)
        e.preventDefault();
}

document.addEventListener("click", close_all_select);

// Runs when the webpage is finished loading
document.addEventListener('DOMContentLoaded', function() {  
    time = document.getElementById('time')
    setInterval(() => {
        time.innerHTML = get_date_time();
    }, 1000);
    document.getElementById('time').innerHTML = get_date_time();

    if (window.lightdm !== undefined && lightdm.hostname !== undefined) {
        document.getElementById('pagetitle').innerText = lightdm.hostname;
    }

    // Checks if more than one user exists on this system
    if (window.lightdm !== undefined && lightdm.users.length === 1) {
        document.getElementById("username").value = lightdm.users[0].username;
        document.getElementById("password").focus(); //focus the password field if only one user
    } else {
        document.getElementById("username").focus(); //focus the user field if multiple users
    }

    add_session_options()
    init_session_menu()
});

// If console mode is enabled, we will use arrow keys to traverse
document.onkeydown = function(e) {
    
}
