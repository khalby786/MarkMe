// declaring the editor for everyone
var editor = document.getElementById("md-editor");

$("#md-html").on("scroll", function() {
  $("#md-editor").scrollTop($(this).scrollTop());
});

$("#md-editor").on("scroll", function() {
  $("#md-html").scrollTop($(this).scrollTop());
});

MathJax.Hub.Config({
  skipStartupTypeset: true,
  showProcessingMessages: false,
  tex2jax: {
    inlineMath: [["$", "$"], ["\\(", "\\)"]],
    displayMath: [["$$", "$$"], ["\\[", "\\]"]],
    processEscapes: true
  },
  TeX: {
    equationNumbers: {
      autoNumber: "AMS"
    }
  }
});

// keyup function to trigger MD to HTML conversion
editor.onkeyup = function() {
  let md = this.value;
  console.log(md);
  document.getElementById("md-html").innerHTML = marked(md);
};

// function insertAtCursor(value) {
//  editor.focus();
//  document.execCommand('insertText', false /*no UI*/, value);
// }

// Events for MD elements to insert
function insert(md) {
  var charBehind;
  var charAfter;

  switch (md) {
    case "h1":
      charBehind = "#";
      charAfter = "";
      break;
    case "h2":
      charBehind = "##";
      charAfter = "";
      break;
    case "h3":
      charBehind = "###";
      charAfter = "";
      break;
    case "h4":
      charBehind = "####";
      charAfter = "";
      break;
    case "h5":
      charBehind = "#####";
      charAfter = "";
      break;
    case "h6":
      charBehind = "######";
      charAfter = "";
      break;
    case "bold":
      charBehind = "**";
      charAfter = "**";
      break;
    case "italic":
      charBehind = "*";
      charAfter = "*";
      break;
    case "strike":
      charBehind = "~";
      charAfter = "~";
      break;
    case "ul":
      charBehind = "*";
      charAfter = "";
      break;
    case "ol":
      charBehind = "1.";
      charAfter = "";
    case "quote":
      charBehind = "> ";
      charAfter = "";
      break;
    case "inline":
      charBehind = "`";
      charAfter = "`";
      break;
    case "block":
      charBehind = "```\n";
      charAfter = "\n```";
      break;
    case "hr":
      charBehind = "---\n";
      charAfter = "";
      break;
    case "a":
      charBehind = "[";
      charAfter = "]()";
      break;
    default:
      console.error("Unknown markdown character!");
  }

  let start = editor.selectionStart; // editor start
  let end = editor.selectionEnd; // editor end
  editor.value =
    editor.value.substring(0, start) +
    charBehind +
    editor.value.substring(start, end) +
    charAfter +
    editor.value.substring(end, editor.value.length);
  editor.selectionStart = start + charBehind.length;
  editor.selectionEnd = end + charBehind.length;
  editor.focus(); // focus so as to not let the user lose concentration and return the input focus to editor
}

function dark() {
  document.body.style.backgroundColor = "var(--background-dark)";
  document.body.style.color = "var(--forground-dark)";
  var x = document.getElementsByTagName("button");
  for (let i = 0; i < x.length; i++) {
    x[i].style.backgroundColor = "var(--background-dark)";
  }
  document.getElementById("md-editor").style.backgroundColor = "var(--background-dark)";
  document.getElementById("md-editor").style.color = "var(--foreground-dark)";
  document.getElementById("md-html").style.backgroundColor = "var(--background-dark)";
  document.getElementById("md-html").style.color = "var(--foreground-dark)";
  document.querySelector("footer").style.backgroundColor = "var(--background-dark)";
  document.querySelector("footer").style.color = "var(--foreground-dark)";
  var x = document.getElementsByTagName("a");
  for (let i = 0; i < x.length; i++) {
    x[i].style.color = "var(--foreground-dark)";
  }
}

function light() {
  document.body.style.backgroundColor = "var(--background)";
  document.body.style.color = "var(--forground)";
  var x = document.getElementsByTagName("button");
  for (let i = 0; i < x.length; i++) {
    x[i].style.backgroundColor = "var(--background)";
  }
  document.getElementById("md-editor").style.backgroundColor = "var(--background)";
  document.getElementById("md-editor").style.color = "var(--foreground)";
  document.getElementById("md-html").style.backgroundColor = "var(--background)";
  document.getElementById("md-html").style.color = "var(--foreground)";
  document.querySelector("footer").style.backgroundColor = "var(--background)";
  document.querySelector("footer").style.color = "var(--foreground)";
  var x = document.getElementsByTagName("a");
  for (let i = 0; i < x.length; i++) {
    x[i].style.color = "var(--foreground)";
  }
}

// dark();
// // light();