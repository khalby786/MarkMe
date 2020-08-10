Vue.use(VTooltip);

Vue.component("markdown_el", {
  template:
    '<button :id="element" v-html="element" @click="insert(insertel)" v-tooltip="tooltip"></button>',
  props: ["element", "insertel", "tooltip"],
  methods: {
    insert(md) {
      var charBehind;
      var charAfter;

      switch (md) {
        case "h1":
          charBehind = "# ";
          charAfter = "";
          break;
        case "h2":
          charBehind = "## ";
          charAfter = "";
          break;
        case "h3":
          charBehind = "### ";
          charAfter = "";
          break;
        case "h4":
          charBehind = "#### ";
          charAfter = "";
          break;
        case "h5":
          charBehind = "##### ";
          charAfter = "";
          break;
        case "h6":
          charBehind = "###### ";
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
          charAfter = " ";
          break;
        case "ol":
          charBehind = "1.";
          charAfter = " ";
        case "quote":
          charBehind = "> ";
          charAfter = " ";
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

      let editor = document.getElementById("md-editor");

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
  }
});

Vue.component("theme", {
  template: `<button id="toggle" @click="darktheme === true ? light() : dark()" v-tooltip="'Toggle dark/light mode'">🌙</button>`,
  data() {
    return {
      darktheme: "false"
    };
  },
  methods: {
    light() {
      document.getElementById("toggle").innerText = "🌙";
      document.body.style.backgroundColor = "var(--background)";
      document.getElementsByClassName('cancel')[0].style.backgroundColor = "var(--background)";
      document.getElementsByClassName('cancel')[0].style.backgroundColor = "var(--background)";
      document.body.style.color = "var(--forground)";
      var x = document.getElementsByTagName("button");
      for (let i = 0; i < x.length; i++) {
        x[i].style.backgroundColor = "var(--background)";
      }
      document.getElementById("md-editor").style.backgroundColor =
        "var(--background)";
      document.getElementById("down-pop").style.backgroundColor =
        "var(--background)";
      document.getElementById("md-editor").style.color = "var(--foreground)";
      document.getElementById("md-html").style.backgroundColor =
        "var(--background)";
      document.getElementById("md-html").style.color = "var(--foreground)";
      document.querySelector("footer").style.backgroundColor =
        "var(--background)";
      document.querySelector("footer").style.color = "var(--foreground)";
      var x = document.getElementsByTagName("a");
      for (let i = 0; i < x.length; i++) {
        x[i].style.color = "var(--foreground)";
      }
      var p = document.querySelectorAll("p");
      for (let i = 0; i < p.length; i++) {
        p[i].style.color = "var(--foreground)";
      }
      var c = document.querySelectorAll(".cancel");
      for (let i = 0; i < c.length; i++) {
        c[i].style.backgroundColor = "var(--background)";
      }
      this.darktheme = false;
    },
    dark() {
      document.getElementById("toggle").innerText = "🌞";
      var b = document.querySelectorAll("blockquote > p");
      for (let i = 0; i < b.length; i++) {
        b[i].style.color = "black";
      }
      document.body.style.backgroundColor = "var(--background-dark)";
      document.body.style.color = "var(--forground-dark)";
      var x = document.getElementsByTagName("button");
      for (let i = 0; i < x.length; i++) {
        x[i].style.backgroundColor = "var(--background-dark)";
      }
      document.getElementById("md-editor").style.backgroundColor =
        "var(--background-dark)";
      document.getElementById("down-pop").style.backgroundColor =
        "var(--background-dark)";
      document.getElementById("md-editor").style.color =
        "var(--foreground-dark)";
      document.getElementById("md-html").style.backgroundColor =
        "var(--background-dark)";
      document.getElementById("md-html").style.color = "var(--foreground-dark)";
      document.querySelector("footer").style.backgroundColor =
        "var(--background-dark)";
      document.querySelector("footer").style.color = "var(--foreground-dark)";
      var x = document.getElementsByTagName("a");
      for (let i = 0; i < x.length; i++) {
        x[i].style.color = "var(--foreground-dark)";
      }
      var p = document.querySelectorAll("p");
      for (let i = 0; i < p.length; i++) {
        p[i].style.color = "white";
      }
      var c = document.querySelectorAll(".cancel");
      for (let i = 0; i < c.length; i++) {
        c[i].style.backgroundColor = "var(--background-dark)";
      }
      this.darktheme = true;
    },
    theme3() {
      document.getElementById("toggle").innerText = "🌞";
      var b = document.querySelectorAll("blockquote > p");
      for (let i = 0; i < b.length; i++) {
        b[i].style.color = "black";
      }
      document.body.style.backgroundColor = "var(--theme3-back)";
      document.body.style.color = "var(--theme3-font)";
      var x = document.getElementsByTagName("button");
      for (let i = 0; i < x.length; i++) {
        x[i].style.backgroundColor = "var(--theme3-back)";
      }
      document.getElementById("md-editor").style.backgroundColor =
        "var(--theme3-back)";
      document.getElementById("down-pop").style.backgroundColor =
        "var(--theme3-back)";
      document.getElementById("md-editor").style.color =
        "var(--theme3-font)";
      document.getElementById("md-html").style.backgroundColor =
        "var(--theme3-back)";
      document.getElementById("md-html").style.color = "var(--theme3-font)";
      document.querySelector("footer").style.backgroundColor =
        "var(--theme3-back)";
      document.querySelector("footer").style.color = "var(--theme3-font)";
      var x = document.getElementsByTagName("a");
      for (let i = 0; i < x.length; i++) {
        x[i].style.color = "var(--theme3-font)";
      }
      var p = document.querySelectorAll("p");
      for (let i = 0; i < p.length; i++) {
        p[i].style.color = "white";
      }
      var c = document.querySelectorAll(".cancel");
      for (let i = 0; i < c.length; i++) {
        c[i].style.backgroundColor = "var(--theme3-back)";
      }
      var b = document.querySelectorAll("button");
      for (let i = 0; i < b.length; i++) {
        b[i].style.color = "var(--theme3-font)";
      }
      this.darktheme = true;
    }
  },
  mounted: function() {
    this.dark();
  }
});

let localstorage = '';
if (!localStorage.getItem("markdown")) {
  localstorage = '';
} else {
  localstorage = localStorage.getItem("markdown");
}

Vue.component("mdhtml", {
  template: `<div><textarea id="md-editor" v-model="md" v-on:keyup="convert" placeholder="🔮 enter markdown here..."></textarea><div id="md-html" v-html="html"></div></div>`,
  data() {
    return {
      md: localstorage || "",
      html: marked(localstorage) || ""
    };
  },
  methods: {
    convert() {
      this.html = marked(this.md);
      localStorage.setItem("markdown", this.md);
    },
  },
  mounted: function() {
    this.convert();
  }
})

Vue.component("download", {
  template: `<button id="download" @click="visible === false ? show() : hide()" v-tooltip="'Download HTML or Markdown'">💾</button>`,
  data() {
    return {
      visible: false,
    };
  },
  methods: {
    show() {
      document.getElementById("modal-background").style.display = "block";
      this.visible = true;
    },
    hide() {
      document.getElementById("modal-background").style.display = "none";
      this.visible = false;
    }
  },
});

var app = new Vue({
  el: "#app",
  data() {
    return {
      hidehtmltext: "Hide",
      hidemdtext: "Hide",
      visible: false,
      editor: "",
      html: ""
    };
  },
  methods: {
    download(filename, text) {
      var element = document.createElement("a");
      element.setAttribute(
        "href",
        "data:text/plain;charset=utf-8," + encodeURIComponent(text)
      );
      element.setAttribute("download", filename);

      element.style.display = "none";
      document.body.appendChild(element);

      element.click();

      document.body.removeChild(element);
    },
    hidehtml() {
      this.hidehtmltext = "Show";
      document.getElementById("md-html").style.display = "none";
      // document.getElementById("md-editor").style.width = "100%";
      // document.getElementById("md-editor").style.borderRight = "none";
      
    },
    showhtml() {
      this.hidehtmltext = "Hide";
      document.getElementById("md-html").style.display = "inline-block";  
      // document.getElementById("md-editor").style.width = "50%";
      // document.getElementById("md-editor").style.borderRight = "1px dashed var(--border)";
    },
    hidemd() {
      this.hidemdtext = "Show";
      
      document.getElementById("md-editor").style.display = "none";
    },
    showmd() {
      this.hidemdtext = "Hide";
      document.getElementById("md-editor").style.display = "inline-block";
    },
    cancel() {
      document.getElementById("modal-background").style.display = "none";
    }
  },
  mounted: function() {
    this.editor = document.getElementById('md-editor').value;
    this.html = document.getElementById('md-html').innerHTML;
  }
});
