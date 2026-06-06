(function () {
  "use strict";

  function decode(s) {
    var out = "";
    for (var i = 0; i < s.length; i++) {
      out += String.fromCharCode(s.charCodeAt(i) - 3);
    }
    return out;
  }

  var form = document.getElementById("contact-form");
  if (!form) return;

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    var address = decode("khoorCjhqwohkloo1fr");
    var from = (form.elements.email && form.elements.email.value) || "";
    var project = (form.elements.project && form.elements.project.value) || "";
    var subject = encodeURIComponent("New enquiry");
    var body = encodeURIComponent("From: " + from + "\n\nProject:\n" + project);

    // Heuristic: if the mail app opens, the page loses focus / hides.
    var opened = false;
    function mark() {
      opened = true;
    }
    document.addEventListener("visibilitychange", mark);
    window.addEventListener("blur", mark);

    window.location.href =
      "mailto:" + address + "?subject=" + subject + "&body=" + body;

    setTimeout(function () {
      document.removeEventListener("visibilitychange", mark);
      window.removeEventListener("blur", mark);
      if (!opened) showFallback(address);
    }, 1000);
  });

  function showFallback(address) {
    if (document.getElementById("contact-fallback")) return;

    var note = document.createElement("p");
    note.id = "contact-fallback";
    note.className = "mt-4 text-sm text-[#151515]/65";
    note.textContent =
      "Opps email was not sent, write to us at " + address + " ";

    var btn = document.createElement("button");
    btn.type = "button";
    btn.textContent = "copy";
    btn.className =
      "ml-2 border border-[#151515]/30 px-2 py-1 text-[11px] uppercase tracking-[0.2em]";
    btn.addEventListener("click", function () {
      if (navigator.clipboard) {
        navigator.clipboard.writeText(address).then(function () {
          btn.textContent = "copied";
        });
      }
    });

    note.appendChild(btn);
    form.appendChild(note);
  }
})();
