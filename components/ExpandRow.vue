<template>
  <div>
    <Row class="expand-row">
      <Divider> {{ this.$t('game.name') }} </Divider>
      <Col span="24">
        <span class="expand-value">{{ row.name }}</span>
        <span v-if="row.label">
          <Tag
            v-for="lab in splitToArray(row.label)"
            :key="lab"
            :color="randomLabelColor()"
          >
            {{ lab }}
          </Tag>
        </span>
      </Col>
    </Row>
    <Row>
      <Divider> {{ this.$t('game.comment') }} </Divider>
      <Col span="24">
        <span class="expand-value">{{ row.comment }}</span>
      </Col>
    </Row>
  </div>
</template>

<script>
import { splitToArray, randomLabelColor } from 'assets/util'

export default {
  name: 'ExpandRow',
  props: {
    row: {
      type: Object,
      default: null,
    },
  },
  data() {
    return {
      splitToArray,
      randomLabelColor,
    }
  },
}
</script>

<style scoped>
.expand-row {
  margin-bottom: 16px;
}
</style>
