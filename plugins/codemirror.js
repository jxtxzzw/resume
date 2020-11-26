import Vue from 'vue'
import VueCodemirror from 'vue-codemirror'

import 'codemirror/lib/codemirror.js'

// import more codemirror resource...
// import base style
import 'codemirror/lib/codemirror.css'
import 'codemirror/theme/base16-dark.css'
import 'codemirror/theme/idea.css'

// codemirror language
import 'codemirror/mode/clike/clike' // Java, C, C++, Kotlin 都是 clike 中的
import 'codemirror/mode/python/python'
import 'codemirror/mode/javascript/javascript'
import 'codemirror/mode/sql/sql'
import 'codemirror/mode/mllike/mllike'
import 'codemirror/mode/go/go'

// codemirror active-line.js
import 'codemirror/addon/selection/active-line.js'
import 'codemirror/addon/search/search.js'
import 'codemirror/addon/edit/closebrackets.js'
import 'codemirror/addon/edit/matchbrackets.js'
import 'codemirror/addon/edit/closetag.js'
import 'codemirror/addon/edit/matchtags.js'
import 'codemirror/addon/edit/trailingspace.js'
import 'codemirror/addon/fold/brace-fold.js'
import 'codemirror/addon/fold/comment-fold.js'

// you can set default global options and events when Vue.use
Vue.use(VueCodemirror, {
  options: { theme: 'idea' },
  events: ['scroll'],
})
