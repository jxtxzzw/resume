<template>
  <div>
    <Collapse accordion>
      <Panel v-for="item in CollapsePanelData" :key="item.id" :name="item.title">
        <Rate disabled v-model="item.rate"/>
        {{ item.title }}
        <Tag v-if="item.status==='done'" color='success' :style="{margin: '0 10px 0 10px'}">
          {{ item.date === null ? $t('message.fiction.read') : $t('message.fiction.read_at',
          {date: item.date}) }}
        </Tag>
        <Tag v-if="item.status==='doing'" color='primary' :style="{margin: '0 10px 0 10px'}">
          {{ $t('message.fiction.doing') }}
        </Tag>
        <Tag v-if="item.status==='todo'" color='error' :style="{margin: '0 10px 0 10px'}">
          {{ $t('message.fiction.todo') }}
        </Tag>
        <Tag v-for="leb in item.label" :key="leb.id" :color='randomColor()'>
          {{leb}}
        </Tag>
        <p slot="content">
          {{ item.comment }}
        </p>
      </Panel>
    </Collapse>
    <div :style="{margin: '10px', overflow: 'hidden'}">
      <div :style="{float: 'right'}">
        <Page
          :total="FictionData.length"
          :current="1"
          @on-change="changePage"
          show-total
          :page-size="pageSize"/>
      </div>
    </div>
  </div>
</template>

<script>
import { getFictionData } from '../api/data';

export default {
  name: 'Fiction',
  data() {
    return {
      pageSize: 10,
      FictionData: [],
      CollapsePanelData: [],
    };
  },
  methods: {
    changePage(pageNumber) {
      this.CollapsePanelData = this.generatePagedCollapsePanelData(pageNumber);
    },
    generatePagedCollapsePanelData(pageNumber) {
      const data = [];
      const arr = this.FictionData;
      for (let i = (pageNumber - 1) * this.pageSize; i < pageNumber * this.pageSize; i += 1) {
        if (i === this.FictionData.length) {
          break;
        }
        const row = arr[i];
        data.push(row);
      }
      console.log(data);
      return data;
    },
    randomColor() {
      const color = ['magenta', 'blue', 'volcano', 'orange', 'gold', 'yellow', 'lime', 'green', 'cyan', 'blue', 'geekblue', 'purple'];
      const r = Math.floor(Math.random() * color.length);
      return color[r];
    },
  },
  async mounted() {
    this.$Message.info(this.$t('message.fiction.prompt'));
    this.$Message.error({
      content: this.$t('message.fiction.warning'),
      duration: 5,
      closable: true,
    });
    this.FictionData = await getFictionData();
    this.changePage(1);
  },
};
</script>
