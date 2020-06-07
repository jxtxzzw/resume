<template>
  <div>
    <Collapse accordion>
      <Panel v-for="item in CollapsePanelData" :key="item.id" :name="item.name">
        <Rate disabled v-model="item.rate"/>
        <Tooltip v-if="item.play === true" :content="$t('message.game.play')">
          <Icon
            :style="{margin: ' 0 10px 0 10px'}"
            type="ios-game-controller-b"
            size="30"
            color="#5cb85c"
          />
        </Tooltip>
        <Tooltip v-if="item.cloud === true" :content="$t('message.game.cloud')">
          <Icon
            :style="{margin: ' 0 10px 0 10px'}"
            type="ios-cloud-done"
            size="30"
            color="#2d8cf0"
          />
        </Tooltip>
        {{ item.name }}
        <Tooltip v-if="item.achievement === true" :content="$t('message.game.achievement')">
          <Icon :style="{margin: ' 0 10px 0 10px'}" type="md-trophy" size="30" color="#F5A623"/>
        </Tooltip>
        <Tag v-if="item.status==='done'" color='success' :style="{margin: '0 10px 0 10px'}">
          {{
          item.date === null ?
          $t('message.game.done') :
          $t('message.game.done_at', { date: item.date })
          }}
        </Tag>
        <Tag v-if="item.status==='doing'" color='primary' :style="{margin: '0 10px 0 10px'}">
          {{$t('message.game.doing')}}
        </Tag>
        <Tag v-if="item.status==='todo'" color='error' :style="{margin: '0 10px 0 10px'}">
          {{$t('message.game.todo')}}
        </Tag>
        <Tag v-if="item.status==='disabled'" color='disabled' :style="{margin: '0 10px 0 10px'}">
          {{$t('message.game.disabled')}}
        </Tag>
        <Tag v-for="leb in item.label" :key="leb.id" :color='randomColor()'>
          {{ leb }}
        </Tag>
        <p slot="content">
          {{ item.comment }}
        </p>
      </Panel>
    </Collapse>
    <div :style="{margin: '10px', overflow: 'hidden'}">
      <div :style="{float: 'right'}">
        <page
          :total="GameData.length"
          :current="1"
          @on-change="changePage"
          show-total
          :page-size="pageSize"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { getGameData } from '../api/data';

export default {
  name: 'Game',
  data() {
    return {
      pageSize: 10,
      GameData: [],
      CollapsePanelData: [],
    };
  },
  methods: {
    changePage(pageNumber) {
      this.CollapsePanelData = this.generatePagedCollapsePanelData(pageNumber);
    },
    generatePagedCollapsePanelData(pageNumber) {
      const data = [];
      const arr = this.GameData;
      for (let i = (pageNumber - 1) * this.pageSize; i < pageNumber * this.pageSize; i += 1) {
        if (i === this.GameData.length) {
          break;
        }
        const row = arr[i];
        data.push(row);
      }
      return data;
    },
    randomColor() {
      const color = ['magenta', 'blue', 'volcano', 'orange', 'gold', 'yellow', 'lime', 'green', 'cyan', 'blue', 'geekblue', 'purple'];
      const r = Math.floor(Math.random() * color.length);
      return color[r];
    },
  },
  async mounted() {
    this.$Message.info(this.$t('message.game.info'));
    this.$Message.error({ content: this.$t('message.game.warning'), duration: 5, closable: true });
    this.GameData = await getGameData();
    this.changePage(1);
  },
};
</script>
