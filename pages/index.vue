<template>
  <div class="container">
    <Overlay />

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
    </header>

    <div id="workspace">
      <div id="markdown">
        <textarea id="markdown-input" ref="markdownEditor" v-model="markdown">
        </textarea>
      </div>
      <div id="html" ref="htmlEditor" v-html="html"></div>
    </div>
  </div>
</template>

<script>
import marked from "marked"
import DOMPurify from "dompurify"

export default {
  data: function () {
    return {
      markdown: "# hi",
      html: marked(""),
    }
  },
  methods: {
    convertMarkdown: function (markdown) {
      this.html = DOMPurify.sanitize(marked(markdown))
    },
    insert: function (markdown) {
      let charBehind
      let charAfter

      switch (markdown) {
        case "h1":
          charBehind = "# "
          charAfter = ""
          break
        case "h2":
          charBehind = "## "
          charAfter = ""
          break
        case "h3":
          charBehind = "### "
          charAfter = ""
          break
        case "h4":
          charBehind = "#### "
          charAfter = ""
          break
        case "h5":
          charBehind = "##### "
          charAfter = ""
          break
        case "h6":
          charBehind = "###### "
          charAfter = ""
          break
        case "bold":
          charBehind = "**"
          charAfter = "**"
          break
        case "italic":
          charBehind = "*"
          charAfter = "*"
          break
        case "strike":
          charBehind = "~"
          charAfter = "~"
          break
        case "ul":
          charBehind = "*"
          charAfter = " "
          break
        case "ol":
          charBehind = "1."
          charAfter = " "
          break
        case "quote":
          charBehind = "> "
          charAfter = " "
          break
        case "inline":
          charBehind = "`"
          charAfter = "`"
          break
        case "block":
          charBehind = "```\n"
          charAfter = "\n```"
          break
        case "hr":
          charBehind = "---\n"
          charAfter = ""
          break
        case "a":
          charBehind = "["
          charAfter = "]()"
          break
        default:
          console.error("Unknown markdown character!")
      }

      let editor = this.$refs.markdownEditor

      let start = editor.selectionStart // editor start
      let end = editor.selectionEnd // editor end
      editor.value =
        editor.value.substring(0, start) +
        charBehind +
        editor.value.substring(start, end) +
        charAfter +
        editor.value.substring(end, editor.value.length)
      editor.selectionStart = start + charBehind.length
      editor.selectionEnd = end + charBehind.length
      editor.focus()
    },
  },
  watch: {
    markdown: function (oldMarkdown, newMarkdown) {
      if (oldMarkdown !== null) {
        this.convertMarkdown(oldMarkdown)
      }
    },
  },
}
</script>

<style scoped>
.md-elements {
  height: 30px;
  padding: 5px;
  border-bottom: 1px dashed var(--border);
  font-family: var(--monospace);
  font-size: 16px;
  overflow: auto;
}

.md-element {
  cursor: pointer;
  margin-right: 7px;
  color: var(--border-dark);
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

#markdown {
  border-right: 1px dashed var(--border);
  height: calc(100vh - 100px);
  padding: 20px 10px;
}

#html {
  text-align: left;
  padding: 20px 10px;
  font-family: var(--sans-serif);
  height: calc(100vh - 100px);
  overflow: auto;
}

@media only screen and (max-width: 600px) {
  #workspace {
    grid-template-columns: repeat(1, 1fr);
    grid-template-rows: repeat(1, 1fr);
  }

  #markdown {
    border-right: none;
    border-bottom: 1px dashed var(--border);
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
</style>
