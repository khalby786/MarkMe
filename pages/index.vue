<template>
  <div class="container">
    <!-- <Overlay /> -->
    <modal
      name="intro"
      :adaptive="true"
      :classes="'modal'"
      width="100%"
      height="100%"
      :styles="'background-color: var(--background-dark);border-radius: 0px;'"
    >
      <div class="modal-content">
        <h1 class="title">#markme</h1>
        <p class="description">
          A simple, lightweight and beautiful Markdown editor and viewer.
        </p>
        <button class="links" @click="$modal.hide('intro')">Get Started</button
        >&nbsp;
        <NuxtLink to="/about"><button class="links">About</button></NuxtLink>
        <div class="modal-links">
          <a href="https://github.com/khalby786/markme">github</a> ~
          <a href="https://khaleelgibran.com">khaleel gibran</a>
        </div>
        <a href="https://www.buymeacoffee.com/" class="bmc-button"
          ><img
            src="https://img.buymeacoffee.com/button-api/?text=Buy me a coffee&emoji=&slug=khaleelgibran&button_colour=FF5F5F&font_colour=ffffff&font_family=Inter&outline_colour=000000&coffee_colour=FFDD00"
        /></a>
      </div>
    </modal>

    <header class="md-elements">
      <span class="md-element" @click="insert('h1')">h1</span>
      <span class="md-element" @click="insert('h2')">h2</span>
      <span class="md-element" @click="insert('h3')">h3</span>
      <span class="md-element" @click="insert('h4')">h4</span>
      <span class="md-element" @click="insert('h5')">h5</span>
      <span class="md-element" @click="insert('h6')">h6</span>
      <span class="md-element" @click="insert('bold')"><b>b</b></span>
      <span class="md-element" @click="insert('italic')"><i>i</i></span>
      <span class="md-element" @click="insert('strike')"
        ><strike>s</strike></span
      >
      <span class="md-element" @click="insert('ul')"> · </span>
      <span class="md-element" @click="insert('ol')">1</span>
      <span class="md-element" @click="insert('quote')">&gt;</span>
      <span class="md-element" @click="insert('inline')">I&lt;&gt;</span>
      <span class="md-element" @click="insert('block')">&lt;&gt;B</span>
      <span class="md-element" @click="insert('hr')">--</span>
      <span class="md-element" @click="insert('a')">A</span>

      <div class="right-elements">
        <!-- <button class="cta-button" id="remotestorage-widget"></button> -->
        <button class="text-only">
          login
        </button> ·
        <button class="text-only" @click="toggleOutput()">show preview</button>
      </div>
    </header>

    <div :id="parentClass">
      <div id="markdown">
        <textarea
          v-cloak
          id="markdown-input"
          ref="markdownEditor"
          v-model="markdown"
          @dragover="draggedover()"
          @drop.prevent="addFile()"
        >
        </textarea>
      </div>
      <div
        id="html"
        ref="htmlEditor"
        v-html="html"
        v-show="showOutput === true"
      ></div>
    </div>
  </div>
</template>

<script>
import marked from "marked";
import DOMPurify from "dompurify";
import emoji from "node-emoji";
// import Widget from 'remotestorage-widget';
import katex from "katex";

export default {
  data: function () {
    return {
      markdown: "# hi",
      html: marked(""),
      files: [],
      showOutput: false,
      parentClass: "markdownonly",
    };
  },
  head() {
    return {
      script: [
        {
          src:
            "//cdnjs.cloudflare.com/ajax/libs/highlight.js/11.2.0/highlight.min.js",
        },
      ],
      link: [
        {
          rel: "stylesheet",
          href:
            "https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.2.0/styles/night-owl.min.css",
        },
      ],
    };
  },
  mounted() {
    // const remoteStorage = new RemoteStorage({ logging: true })
    // remoteStorage.access.claim("markme", "rw")

    // const widget = new Widget(remoteStorage)
    // widget.attach("remotestorage-widget")
    this.$modal.show("intro");
  },
  methods: {
    // 1. Get markdown
    // 2. Strip XSS and other shenanigans
    // 3. Parse emojis
    // 4. Convert to HTML
    convertMarkdown: function (markdown) {
      marked.setOptions({
        highlight: function (code, lang) {
          const language = hljs.getLanguage(lang) ? lang : "plaintext";
          return hljs.highlight(code, { language }).value;
        },
        gfm: true,
      });

      this.html = this.processMarkdown(markdown);

      // this.html = katex.renderToString(this.processMarkdown(markdown), {
      //   delimiters: [
      //     {
      //       left: "$$",
      //       right: "$$",
      //       display: false,
      //     },
      //   ],
      // });

      // console.log(katex.renderToString(this.processMarkdown(markdown), {
      //   delimiters: [
      //     {
      //       left: "$$",
      //       right: "$$",
      //       display: false,
      //     },
      //   ],
      // }))
      renderMathInElement(document.body, {
        delimiters: [
          { left: "$$", right: "$$", display: true },
          { left: "$", right: "$", display: false },
          { left: "\\(", right: "\\)", display: false },
          { left: "\\[", right: "\\]", display: true },
        ],
      });
    },
    processMarkdown: function (markdown) {
      markdown = DOMPurify.sanitize(markdown);
      const replacer = (match) => emoji.emojify(match);
      markdown = markdown.replace(/(:.*:)/g, replacer);
      return marked(markdown);
    },
    insert: function (markdown) {
      let charBehind;
      let charAfter;

      switch (markdown) {
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
          break;
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

      let editor = this.$refs.markdownEditor;

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
      editor.focus();
    },
    addFile(e) {
      console.log("files added!");
      let droppedFiles = e.dataTransfer.files;
      if (!droppedFiles) return;
      // this tip, convert FileList to array, credit: https://www.smashingmagazine.com/2018/01/drag-drop-file-uploader-vanilla-js/
      [...droppedFiles].forEach((f) => {
        this.files.push(f);
      });
    },
    draggedover() {
      console.log("dragged in!");
    },
    toggleOutput() {
      this.showOutput = !this.showOutput;
      if (this.showOutput === true) {
        this.parentClass = "workspace";
      } else {
        this.parentClass = "markdownonly";
      }
    },
  },
  watch: {
    markdown: function (oldMarkdown, newMarkdown) {
      if (oldMarkdown !== null) {
        this.convertMarkdown(oldMarkdown);
      }
    },
  },
};
</script>

<style scoped>
.md-elements {
  height: 30px;
  padding: 5px;
  border-bottom: 1px solid var(--border);
  font-family: var(--monospace);
  font-size: 16px;
  overflow: auto;
  /* position: absolute;
  top: 0px;
  left: 0px;
  right: 0px; */
}

.md-element {
  cursor: pointer;
  margin-right: 7px;
  color: var(--border-dark);
}

.right-elements {
  float: right;
}

.right-elements > button {
  background-color: var(--background-dark);
}

.cta-button {
  font-size: 15px;
  margin-top: 0px;
  height: 20px;
  border: 0px solid white;
  padding-top: 0px;
  padding-bottom: 0px;
  vertical-align: middle;
  padding-right: 0px;
}

.cta-button:hover {
  color: var(--border);
  background-color: var(--background-dark);
}

#workspace {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: repeat(1, 1fr);
  grid-column-gap: 10px;
  grid-row-gap: 10px;
  text-align: center;
  word-wrap: break-word;
  box-sizing: border-box;
}

#markdownonly {
  max-width: 750px;
  margin: 0 auto;
}

#markdown {
  height: calc(100vh - 120px);
  padding: 20px 10px;
  width: 100%;
  max-width: 600px;
  margin: 0 auto;
}

#html {
  text-align: left;
  padding: 20px 10px;
  font-family: var(--sans-serif);
  height: calc(100vh - 100px);
  border-left: 1px solid var(--border);
  overflow: auto;
  padding: 10px 20px;
}

@media only screen and (max-width: 600px) {
  #workspace {
    grid-template-columns: repeat(1, 1fr);
    grid-template-rows: repeat(1, 1fr);
  }

  #markdown {
    border-right: none;
    border-bottom: 1px solid var(--border);
  }
}

textarea {
  border: 0px solid var(--background-dark);
  background-color: var(--background-dark);
  color: var(--foreground-dark);
  width: 100%;
  height: 100%;
  resize: none;
  font-family: var(--monospace);
}

textarea:focus {
  outline: none;
}

pre {
  background-color: var(--background-dark) !important;
}

/* modal stuff */

.title {
  font-family: "Fira Code", monospace;
  color: var(--border);
  margin-top: 0px;
}

.modal-links {
  margin-top: 30px;
  padding-top: 20px;
  border-top: 1px solid gray;
}

.modal-content {
  max-width: 600px;
  margin: 0 auto;
}

.bmc-button {
  height: 25px;
  width: 210px;
  margin-top: 30px;
  display: inline-block;
}
</style>
