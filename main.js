import WordCloud from "./wordcloud2.js"
import Mock from "mockjs"

let $el = document.querySelector(".word-cloud-wrapper")

const { list } = Mock.mock({
  "list|40": [["@cname", "@integer(12,30)"]],
})

console.log(list, $el)

$el.addEventListener("wordcloudstop", function () {
  setTimeout(() => {
    let els = this.querySelectorAll(".word-color")
    Array.from(els).forEach((el) => {
      el.classList.add("word-animate")
    })
  }, 2000)
})

WordCloud($el, {
  list,
  drawOutOfBound: true,
  classes: "word-color",
  color: null
})
