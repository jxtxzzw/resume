<template>
  <div>
    <Row class="expand-row">
      <Col span="24">
        <span class="expand-value">{{ name }}</span>
        <span v-if="label">
          <Tag
            v-for="lab in splitToArray(label)"
            :key="lab"
            :color="randomLabelColor()"
          >
            {{ lab }}
          </Tag>
        </span>
      </Col>
    </Row>
    <Row>
      <Divider> {{ name }} </Divider>
      <Col span="24">
        <span class="expand-value">{{ comment }}</span>
      </Col>
    </Row>
  </div>
</template>

<script>
import { splitToArray, randomLabelColor } from 'assets/util'

export default {
  name: 'ExpandRow',
  props: {
    name: {
      type: String,
      default: null,
    },
    comment: {
      type: String,
      default: null,
    },
    label: {
      type: String,
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
