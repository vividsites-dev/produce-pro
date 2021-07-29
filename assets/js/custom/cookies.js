function setDisplayNone(id) {
    document.getElementById(id).style.display = "none";
}

function setDisplayInline(id) {
    document.getElementById(id).style.display = "inline";
}

function t_addCookie(name) {
    var id = name + "_add";
    setDisplayNone(id);
    id = name + "_remove";
    setDisplayInline(id);
}

function t_removeCookie(name) {
    var id = name + "_remove";
    setDisplayNone(id);
    id = name + "_add";
    setDisplayInline(id);
}

function addCookie(value) {
    // toggle display of the add/remove links, turn add off and remove on
    var id = "z" + value + "_add";
    setDisplayNone(id);
    id = "z" + value + "_remove";
    setDisplayInline(id);

	var val = simpleGetCookie("myfolder");
	var len;
    if (val == null) {
        simpleSetCookie("myfolder", value, 30, "/");
        return;
    }
    var offset = val.indexOf(value);
    if (offset == -1) {
        len = val.length;
        if (len > 0) {
            simpleSetCookie("myfolder", val + ":" + value, 30, "/");
        }
        else {
            simpleSetCookie("myfolder", value, 30, "/");
        }
    }
}

function removeCookie(value) {
    // toggle display of the add/remove links, turn add on and remove off
    var id = "z" + value + "_remove";
    setDisplayNone(id);
    id = "z" + value + "_add";
    setDisplayInline(id);

	var val = simpleGetCookie("myfolder");
	var newval;
    if (val == null) {
        simpleSetCookie("myfolder", newval, 30, "/");
        return;
    }
    // alert("cookie is now " + val);
    var offset = val.indexOf(value);
    // alert("found " + value + " at " + offset);
    if (offset != -1) {
        var end = val.indexOf(":", offset);
        if (end == -1) {
            end = val.length;
        }
        // alert("ends at " + end);
        if (offset > 0) {
            // not at beginning of string, need to cut out of middle
            // end at offset - 1 to get rid of :
            newval = val.substring(0, offset - 1);
            newval += val.substring(end);
        }
        else {
            newval = val.substring(end + 1);
        }
        // alert("cookie is now " + newval);
        simpleSetCookie("myfolder", newval, 30, "/");
		// location.reload();
    }
}


function simpleSetCookie(name, value, exdays, path, domain, secure) {
    if (exdays == null) {
        expires = null;
    }
    else {
        var expires = new Date();
        expires.setDate(expires.getDate() + exdays);
    }
    document.cookie = name + "=" + escape(value) +
	((expires) ? "; expires=" + expires.toGMTString() : "") +
	((path) ? "; path=" + path : "") +
	((domain) ? "; domain=" + domain : "") +
	((secure) ? "; secure" : "");
}

function simpleGetCookie(name) {
    var dc = document.cookie;
    var prefix = name + "=";
    var begin = dc.indexOf("; " + prefix);
    if (begin == -1) {
        begin = dc.indexOf(prefix);
        if (begin != 0) return null;
    } else {
        begin += 2;
    }
    var end = document.cookie.indexOf(";", begin);
    if (end == -1) {
        end = dc.length;
    }
    return unescape(dc.substring(begin + prefix.length, end));
}

function simpleDeleteCookie(name, path, domain) {
    if (simpleGetCookie(name)) {
        document.cookie = name + "=" +
		((path) ? "; path=" + path : "") +
		((domain) ? "; domain=" + domain : "") +
		"; expires=Thu, 01-Jan-70 00:00:01 GMT";
    }
}

function FixCookieDate(date) {
    var base = new Date(0);
    var skew = base.getTime();

    date.setTime(date.getTime() - skew);
}
