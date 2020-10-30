<template>
  <div>
    <Row class="expand-row">
      <Col span="24">
        <span class="expand-key"> {{ this.$t('game.name') }}</span>
        <span class="expand-value">{{ row.name }}</span>
        <span v-if="row.label">
          <Tag v-for="lab in row.label.split()" :key="lab" color="green">
            {{ lab }}
          </Tag>
        </span>
      </Col>
    </Row>
    <Row>
      <Col span="24">
        <span class="expand-key">{{ this.$t('game.comment') }} </span>
        <span class="expand-value">{{ row.comment }}</span>
      </Col>
    </Row>
  </div>
</template>

<script>
export default {
  name: 'ExpandRow',
  props: {
    row: {
      type: Object,
      default: null,
    },
  },
}
</script>

<style scoped>
.expand-row {
  margin-bottom: 16px;
}
</style>
