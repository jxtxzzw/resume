<template>
  <div>
    <Divider> {{ name }} </Divider>
    <Row class="expand-row">
      <Col span="24">
        <span class="expand-value">
          <Tag type="dot" :color="randomLabelColor(name)"> {{ name }} </Tag>
        </span>
        <span v-if="label">
          <Tag
            v-for="lab in splitToArray(label)"
            :key="lab"
            :color="randomLabelColor(lab)"
          >
            {{ lab }}
          </Tag>
        </span>
      </Col>
    </Row>
    <Row>
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
