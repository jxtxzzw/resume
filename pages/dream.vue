<template>
  <div>
    <Row v-for="d in dream" :key="d.name" style="margin-bottom: 40px">
      <Col span="4">
        <Divider> {{ d.name }} </Divider>
      </Col>
      <a-steps :current="d.current" :status="d.status">
        <a-step>
          <span slot="title"> {{ $t('dream.born') }} </span>
          <span slot="subTitle"> {{ d.born_date }} </span>
          <span slot="description"> {{ d.born }} </span>
        </a-step>
        <a-step>
          <span slot="title"> {{ $t('dream.prepare') }} </span>
          <span slot="subTitle"> {{ d.prepare_date }} </span>
          <span slot="description"> {{ d.prepare }} </span>
        </a-step>
        <a-step>
          <span slot="title"> {{ $t('dream.enjoy') }} </span>
          <span slot="subTitle"> {{ d.enjoy_date }} </span>
          <span slot="description"> {{ d.enjoy }} </span>
        </a-step>
        <a-step>
          <span slot="title"> {{ $t('dream.done') }} </span>
          <span slot="subTitle"> {{ d.done_date }} </span>
          <span slot="description"> {{ d.done }} </span>
        </a-step>
      </a-steps>
    </Row>
  </div>
</template>

<script>
import { dream } from 'assets/reader'
export default {
  name: 'Dream',
  data() {
    return {
      dream,
    }
  },
}
</script>
