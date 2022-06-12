<template>
  <div class="container">
    <IntroModal />

    <splitpanes v-if="isInit === true">
      <pane>
        <textarea
          id="markdown"
          ref="mdEditor"
          v-model="markdown"
          v-if="codeMirrorInput === false"
        >
        </textarea>
        <client-only placeholder="Codemirror Loading...">
          <codemirror
            v-model="markdown"
            :options="cmOption"
            v-if="codeMirrorInput === true"
          ></codemirror>
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
import { Splitpanes, Pane } from "splitpanes";
import "splitpanes/dist/splitpanes.css";
import parserHtml from "prettier/parser-html";
import prettier from "prettier/standalone";

let hljs = require('highlight.js');
let MarkdownIt = require("markdown-it");
let katex = require("markdown-it-katex");
let defaultConfig = {
  html: true,
  breaks: true,
  linkify: true,
  typographer: true,
  highlight: function (str, lang) {
    if (lang && hljs.getLanguage(lang)) {
      try {
        return hljs.highlight(str, { language: lang }).value;
      } catch (__) {}
    }

    return ""; // use external default escaping
  },
};

export default {
  data: function () {
    return {
      // isInit: false,
      markdownIt: new MarkdownIt(defaultConfig),
      markdown: "# hi",
      html: null,
      files: [],
      showHtmlCode: false,
      codeMirrorInput: false,
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
  methods: {
    // 1. Get markdown
    // 2. Strip XSS and other shenanigans
    // 3. Parse emojis https://cdn.jsdelivr.net/gh/omnidan/node-emoji/lib/emoji.json
    // 4. Convert to HTML
    // 5. Render math
    convertMarkdown: function (markdown) {
      this.html = this.markdownIt.render(markdown);
    },
    // processMarkdown: function (markdown) {
    //   // markdown = DOMPurify.sanitize(markdown);
    //   const replacer = (match) => emoji.emojify(match);
    //   markdown = markdown.replace(/(:.*:)/g, replacer);
    //   return md.render(markdown);
    // },
    beautifyHtml: function () {
      this.html = prettier.format(this.html, {
        parser: "html",
        plugins: [parserHtml],
      });
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
  computed: {
    isInit() {
      return this.$store.state.isInit;
    },
    mditHtml() {
      return this.$store.state.markdown.html;
    },
    mditBreaks() {
      return this.$store.state.markdown.breaks;
    },
    mditLinkify() {
      return this.$store.state.markdown.linkify;
    },
    mditTypographer() {
      return this.$store.state.markdown.typographer;
    },
    mditKatex() {
      return this.$store.state.markdown.katex;
    },
  },
  watch: {
    // watch for markdown changes, and process accordingly
    markdown: function (newMarkdown, oldMarkdown) {
      if (newMarkdown !== null) {
        this.convertMarkdown(newMarkdown);
      }
    },

    // has the modal been hidden?
    isInit: function (newValue, oldValue) {
      console.log(newValue);
    },

    // detect markdown-it config changes
    mditHtml: function (newValue, oldValue) {
      if (newValue !== oldValue || newValue !== null) {
        md.set({ html: newValue });
      }
    },
    mditBreaks: function (newValue, oldValue) {
      if (newValue !== oldValue || newValue !== null) {
        md.set({ breaks: newValue });
      }
    },
    mditLinkify: function (newValue, oldValue) {
      if (newValue !== oldValue || newValue !== null) {
        md.set({ linkify: newValue });
      }
    },
    mditTypographer: function (newValue, oldValue) {
      if (newValue !== oldValue || newValue !== null) {
        md.set({ typographer: newValue });
      }
    },
    mditKatex: function (newValue, oldValue) {
      if (newValue !== oldValue || newValue !== null) {
        // if katex is true...
        if (newValue === true) {
          // create new instance with katex loaded
          this.markdownIt = new MarkdownIt({
            html: this.mditHtml,
            breaks: this.mditBreaks,
            linkify: this.mditLinkify,
            typographer: this.mditTypographer,
            highlight: function (code, lang) {
              const language = hljs.getLanguage(lang) ? lang : "plaintext";
              return hljs.highlight(code, { language }).value;
            },
          }).use(katex);
        } else {
          // else don't use katex
          this.markdownIt = new MarkdownIt({
            html: this.mditHtml,
            breaks: this.mditBreaks,
            linkify: this.mditLinkify,
            typographer: this.mditTypographer,
            highlight: function (code, lang) {
              const language = hljs.getLanguage(lang) ? lang : "plaintext";
              return hljs.highlight(code, { language }).value;
            },
          });
        }
      }
    },
  },
  created() {
    this.$root.$on("showHtmlCode", () => {
      this.showHtmlCode = !this.showHtmlCode;
    });

    this.$root.$on("beauitfyHtml", () => {
      this.beautifyHtml();
    });
  },
  mounted() {
    // enable or disable katex?
    if (this.mditKatex === true) {
      this.markdownIt = new MarkdownIt({
        html: this.mditHtml,
        breaks: this.mditBreaks,
        linkify: this.mditLinkify,
        typographer: this.mditTypographer,
        highlight: function (code, lang) {
          const language = hljs.getLanguage(lang) ? lang : "plaintext";
          return hljs.highlight(code, { language }).value;
        },
      }).use(katex);
    } else {
      this.markdownIt = new MarkdownIt({
        html: this.mditHtml,
        breaks: this.mditBreaks,
        linkify: this.mditLinkify,
        typographer: this.mditTypographer,
        highlight: function (code, lang) {
          const language = hljs.getLanguage(lang) ? lang : "plaintext";
          return hljs.highlight(code, { language }).value;
        },
      });
    }

    // HERE COMES THE PARTY!
    this.convertMarkdown(this.markdown);
  },
};
</script>

<style scoped>
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
  width: 100%;
  height: calc(100vh - 40px);
  margin: 0px;
  padding-top: 30px;
  padding-left: 30px;
  padding-bottom: 30px;
  padding-right: 30px;
  box-sizing: border-box;
}

textarea:focus {
  outline: none;
}

pre {
  background-color: var(--background-dark) !important;
}
</style>
