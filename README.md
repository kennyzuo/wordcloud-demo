## 背景
一个大屏项目，需要展示后端返回的数据，希望效果如下

![skills.gif](skill.gif)

## 方案
采用 [wordcloud2.js](url) 实现静态数据展示，然后在通过 css 的动画，实现页面闪动的效果

### wordcloud2.js
wordcloud2 可以通过 cavans 或者 html 标签生成词云

安装
```javascript
// npm
npm install wordcloud
// yarn
yarn add wordcloud
```
简单使用
```html
<!-- 使用 html 标签实现 --> 
<div id="word-cloud">

</div>

<!-- 使用 cavans 标签实现 --> 
<cavans id="word-cloud>
</cavans>
```
```javascript
import WordCloud from 'wordcloud';
const list = [['词云A', 30], ['词云B', 28]];
const $el = document.getElementById('word-cloud')
WordCloud($el, { list } );
```
wordcloud 只能把数据展示出来，要实现文字的一些动画，我们还要通过 wordcloud 的 API 和 css3 的 animate 来实现。

大概思路是给先给每个词云分组，假设每组数据为 7 个，然后通过 css 选择器来对每组元素的固定位置设置颜色
```css
.word-color:nth-child(7n + 1) {
  color: rgb(202, 110, 255);
}
.word-color:nth-child(7n + 2) {
  color: rgb(83, 110, 255);
}
.word-color:nth-child(7n + 3) {
  color: rgb(143, 253, 241);
}
.word-color:nth-child(7n + 4) {
  color: rgb(183, 255, 112);
}
.word-color:nth-child(7n + 5) {
  color: rgb(255, 212, 126);
}
.word-color:nth-child(7n + 6) {
  color: rgb(248, 140, 131);
}
.word-color:nth-child(7n + 7) {
  color: rgb(104, 160, 255);
}
```

同理，我们针对每组元素设置动画效果，通过 animation-delay 动画延迟属性来实现不同位置单词的动画错开
```css
@keyframes word {
  0% {
    opacity: 0.5;
  }
  3% {
    opacity: 1;
  }
  9% {
    opacity: 1;
  }
  12% {
    opacity: 0.5;
  }
  100% {
    opacity: 0.5;
  }
}


.word-animate {
  animation-name: word;
  animation-duration: 20s;
  animation-iteration-count: infinite;
  will-change: opacity;
  opacity: 0.5;
}

.word-animate:nth-child(7n + 1) {
  animation-delay: 0s;
}
.word-animate:nth-child(7n + 2) {
  animation-delay: 3s;
}
.word-animate:nth-child(7n + 3) {
  animation-delay: 6s;
}
.word-animate:nth-child(7n + 4) {
  animation-delay: 9s;
}
.word-animate:nth-child(7n + 5) {
  animation-delay: 12s;
}
.word-animate:nth-child(7n + 6) {
  animation-delay: 15s;
}
.word-animate:nth-child(7n + 7) {
  animation-delay: 18s;
}
```

在细节上，因为要求在开始的时候，单词都是正常显示的，所以我们要在 wordcloud2 将词云生成之后，再开始执行元素的动画。

```js
// 监听执行结束事件
$el.addEventListener("wordcloudstop", function () {
  // 等待 2s 后在将动画类添加，不然正常显示的效果时间太短。
  setTimeout(() => {
    let els = this.querySelectorAll(".word-color")
    Array.from(els).forEach((el) => {
      el.classList.add("word-animate")
    })
  }, 2000)
})
```





