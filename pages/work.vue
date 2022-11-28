<template>
  <div>
    <Timeline>
      <TimelineItem v-for="item in items" :key="item.id" color="green">
        <p>
          <span class="company"> {{ item.company }} </span>
        </p>
        <p class="date">
          <span>{{ showDate(item) }}</span>
          <span>{{ $t('work.till') }}</span>
          <span>{{
            item.end == null
              ? $t('work.now')
              : showDate(item, 'formatted_end', 'end')
          }}</span>
        </p>
        <div v-if="item.content">
          <p v-for="c in item.content.split('\n')" :key="c" class="content">
            {{ c }}
          </p>
        </div>
        <div v-if="item.children">
          <Timeline>
            <TimelineItem v-for="c in item.children" :key="c.id" color="green">
              <p>
                <span class="department"> {{ c.department }} </span>
              </p>
              <p>
                <span class="position"> {{ c.position }} </span>
                <span class="level"> {{ c.level }} </span>
              </p>
              <p class="date">
                <span>{{ showDate(c) }}</span>
                <span>{{ $t('work.till') }}</span>
                <span>{{
                  c.end == null
                    ? $t('work.now')
                    : showDate(c, 'formatted_end', 'end')
                }}</span>
              </p>
              <div v-if="c.content">
                <p
                  v-for="cc in c.content.split('\n')"
                  :key="cc"
                  class="content"
                >
                  {{ cc }}
                </p>
              </div>
            </TimelineItem>
          </Timeline>
        </div>
      </TimelineItem>
    </Timeline>
  </div>
</template>

<script>
import { work } from 'assets/reader'
import { showDate } from 'assets/util'

export default {
  name: 'Work',
  data() {
    return {
      showDate,
      work,
      items: [],
    }
  },
  mounted() {
    this.preProcess()
  },
  methods: {
    preProcess() {
      // 按父记录排序，父记录小的在前，确保按序遍历时元素都存在
      work.sort((a, b) => {
        const pa = a.parent ? parseInt(a.parent) : 0
        const pb = b.parent ? parseInt(b.parent) : 0
        return pa - pb
      })
      // 开始处理嵌套关系
      // 数据保证只有至多两层嵌套，所以可以简单写成这样
      for (const x of work) {
        if (!x.parent) {
          this.items.push(x)
        } else {
          for (const y of this.items) {
            if (parseInt(y.id) === parseInt(x.parent)) {
              if (!y.children) {
                y.children = []
              }
              y.children.push(x)
            }
          }
        }
      }
      // 根据入职日期排序，该字段要求 NOT_NULL 所以可以直接排序
      // 入职早的在下面，所以是按日期逆序排序，日期大的在前面
      this.items.sort((a, b) => {
        return new Date(b) - new Date(a)
      })
      for (const x of this.items) {
        if (x.children) {
          x.children.sort((a, b) => {
            return new Date(b) - new Date(a)
          })
        }
      }
    },
  },
}
</script>

<style scoped>
.company {
  color: #4285f4;
  font-size: 20px;
  font-weight: bold;
}

.department {
  color: #34a853;
  font-size: 18px;
  font-weight: bold;
}

.date {
  font-size: 14px;
  font-weight: bold;
  padding-left: 12px;
  margin-top: 6px;
}

.position {
  color: #fbbc05;
  font-size: 16px;
  font-weight: bold;
}

.level {
  color: #ea4335;
  font-size: 16px;
  font-weight: bold;
}

.content {
  color: #b6c3d7;
  font-size: 12px;
  padding-left: 12px;
  margin-top: 6px;
}
</style>
