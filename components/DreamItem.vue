<template>
  <Collapse simple>
    <Panel v-for="dream in dreams" :key="dream.id" :name="`${dream.id}`">
      {{ dream.name }}
      <span slot="content">
        <span>
          {{ dream.content }}
        </span>
        <Progress
          :percent="dream.estimated_progress"
          :stroke-color="['#108ee9', '#87d068']"
          status="active"
        />
        <a-steps
          v-if="getCurrentProgressInScope(dream) !== -1"
          size="small"
          direction="vertical"
          :current="getCurrentProgressInScope(dream)"
        >
          <a-step
            v-for="prg in getProgress(dream)"
            :key="prg.id"
            :status="prg.status"
          >
            <span slot="title"> {{ prg.title }} </span>
            <span slot="subTitle"> {{ prg.date }} </span>
            <span slot="description"> {{ prg.description }} </span>
          </a-step>
        </a-steps>
        <DreamItem :dreams="getChildren(dream)" />
      </span>
    </Panel>
  </Collapse>
</template>

<script>
import { dreamEntry, dreamCascade, dreamProgress } from 'assets/reader'
export default {
  name: 'DreamItem',
  props: {
    dreams: {
      type: Array,
      default() {
        return []
      },
    },
  },
  data() {
    return {
      dreamEntry,
      dreamCascade,
      dreamProgress,
    }
  },
  methods: {
    getProgress(dream) {
      const progress = []
      for (const p of this.dreamProgress) {
        if (p.dream_id === dream.id) {
          progress.push(p)
        }
      }
      progress.sort((a, b) => {
        if (a.date !== null && b.date !== null) {
          if (a.date !== b.date) {
            return new Date(a.date) - new Date(b.date)
          } else {
            return a.id - b.id
          }
        } else if (a.date === null && b.date !== null) {
          return 1
        } else if (a.date !== null && b.date === null) {
          return -1
        } else {
          return a.id - b.id
        }
      })
      return progress
    },
    getCurrentProgressInScope(dream) {
      const progress = this.getProgress(dream)
      for (const i in progress) {
        if (progress[i].id === dream.current_progress) {
          return i
        }
      }
      return -1
    },
    getChildren(dream) {
      const id2dream = new Map()
      for (const dream of this.dreamEntry) {
        id2dream.set(dream.id, dream)
      }
      const children = []
      for (const pair of this.dreamCascade) {
        if (pair.parent_dream_id === dream.id) {
          children.push(id2dream.get(pair.dream_id))
        }
      }
      return children
    },
  },
}
</script>
