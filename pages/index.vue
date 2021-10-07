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
      :transition="''"
      :overlayTransition="''"
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
        <button class="text-only">login</button> ·
        <button class="text-only" @click="toggleOutput()">show preview</button>
      </div>
    </header>

    <splitpanes class="default-theme">
      <pane>
        <client-only placeholder="Codemirror Loading...">
          <codemirror v-model="markdown" :options="cmOption"></codemirror>
        </client-only>
      </pane>
      <pane>
        <div
          id="html"
          ref="htmlEditor"
          v-html="html"
          v-if="showHtmlCode === false"
        ></div>
        <client-only placeholder="Codemirror Loading...">
          <codemirror
            v-model="html"
            :options="htmlCmOption"
            v-if="showHtmlCode === true"
          ></codemirror>
        </client-only>
      </pane>
    </splitpanes>
  </div>
</template>

<script>
import marked from "marked";
import DOMPurify from "dompurify";
import emoji from "node-emoji";
import katex from "katex";
import { Splitpanes, Pane } from "splitpanes";
import "splitpanes/dist/splitpanes.css";
import parserHtml from "prettier/parser-html";
import prettier from "prettier/standalone";

export default {
  data: function () {
    return {
      markdown: "# hi",
      html: marked(""),
      files: [],
      showHtmlCode: false,
      cmOption: {
        tabSize: 2,
        styleActiveLine: true,
        lineNumbers: true,
        line: true,
        foldGutter: true,
        styleSelectedText: true,
        mode: "gfm",
        keyMap: "sublime",
        matchBrackets: true,
        showCursorWhenSelecting: true,
        theme: "monokai",
        gutter: true,
        lineWrapping: true,
      },
      htmlCmOption: {
        readOnly: "nocursor",
        tabSize: 2,
        styleActiveLine: true,
        lineNumbers: true,
        line: true,
        foldGutter: true,
        styleSelectedText: true,
        mode: "gfm",
        keyMap: "sublime",
        matchBrackets: true,
        showCursorWhenSelecting: true,
        theme: "monokai",
        gutter: true,
        lineWrapping: true,
      },
      // showOutput: false,
      // parentClass: "markdownonly",
    };
  },
  components: {
    Splitpanes,
    Pane,
  },
  head() {
    return {
      script: [
        {
          src: "//cdnjs.cloudflare.com/ajax/libs/highlight.js/11.2.0/highlight.min.js",
        },
      ],
      link: [
        {
          rel: "stylesheet",
          href: "https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.2.0/styles/night-owl.min.css",
        },
        {
          rel: "stylesheet",
          href: "https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.63.0/codemirror.min.css",
        },
      ],
    };
  },
  mounted() {
    this.$modal.show("intro");
    this.convertMarkdown(this.markdown);
  },
  methods: {
    // 1. Get markdown
    // 2. Strip XSS and other shenanigans
    // 3. Parse emojis https://cdn.jsdelivr.net/gh/omnidan/node-emoji/lib/emoji.json
    // 4. Convert to HTML
    // 5. Render math
    convertMarkdown: function (markdown) {
      marked.setOptions({
        highlight: function (code, lang) {
          const language = hljs.getLanguage(lang) ? lang : "plaintext";
          return hljs.highlight(code, { language }).value;
        },
        gfm: true,
      });

      this.html = this.processMarkdown(markdown);

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
    beautifyHtml: function () {
      console.log(this.html);
      this.html = prettier.format(this.html, {
        parser: "html",
        plugins: [parserHtml],
      });
      console.log(this.html);
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
    // toggleOutput() {
    //   this.showOutput = !this.showOutput;
    //   if (this.showOutput === true) {
    //     this.parentClass = "workspace";
    //   } else {
    //     this.parentClass = "markdownonly";
    //   }
    // },
  },
  watch: {
    markdown: function (oldMarkdown, newMarkdown) {
      if (oldMarkdown !== null) {
        this.convertMarkdown(oldMarkdown);
      }
    },
  },
  created() {
    this.$root.$on("showHtmlCode", () => {
      console.log("kobe!");
      this.showHtmlCode = !this.showHtmlCode;
    });

    this.$root.$on("beauitfyHtml", () => {
      this.beautifyHtml();
    });
  },
};
</script>

<style scoped>
.md-elements {
  height: 30px;
  padding: 5px 10px;
  border-bottom: 1px solid var(--border);
  font-family: var(--monospace);
  font-size: 16px;
  overflow: auto;
  position: absolute;
  top: 0px;
  left: 0px;
  right: 0px;
  display: none;
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

#html {
  box-sizing: border-box;
  height: calc(100vh - 40px);
  overflow: auto;
  padding-top: 30px;
  padding-left: 30px;
  padding-bottom: 30px;
  padding-right: 30px;
  margin: 0px;
  word-break: break-word;
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

textarea {
  border: 0px solid var(--background-dark);
  background-color: var(--background-dark);
  color: var(--foreground-dark);
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

.slide-leave-active,
.slide-enter-active {
  transition: 0.25s;
}
.slide-enter {
  transform: translate(100%, 0);
}
.slide-leave-to {
  transform: translate(-100%, 0);
}
</style>
