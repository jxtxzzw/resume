<template>
  <div>
    <Collapse accordion>
      <Panel v-for="item in CollapsePanelData" :key="item.id" :name="item.name">
        <Rate disabled v-model="item.rate"/>
        {{ item.name }}
        <Tag v-if="item.status==='done'" color='success' :style="{margin: '0 10px 0 10px'}">
          {{ item.date === null ? $t('message.movie.done') : $t('message.movie.done_at', { date:
          item.date }) }}
        </Tag>
        <Tag v-if="item.status==='doing'" color='primary' :style="{margin: '0 10px 0 10px'}">
          {{ $t('message.movie.doing') }}
        </Tag>
        <Tag v-if="item.status==='todo'" color='error' :style="{margin: '0 10px 0 10px'}">
          {{ $t('message.movie.todo') }}
        </Tag>
        <Tag :color='getTagColor(item.type)' :style="{margin: '0 10px 0 10px'}">
          {{ getTagText(item.type) }}
        </Tag>
        <p slot="content">
          {{ item.comment }}
        </p>
      </Panel>
    </Collapse>
    <div :style="{margin: '10px', overflow: 'hidden'}">
      <div :style="{float: 'right'}">
        <Page
          :total="MovieData.length"
          :current="1"
          @on-change="changePage"
          show-total
          :page-size="pageSize"/>
      </div>
    </div>
  </div>
</template>
<script>
import { getMovieData } from '../api/data';

export default {
  name: 'Movie',
  data() {
    return {
      pageSize: 10,
      MovieData: [],
      CollapsePanelData: [],
    };
  },
  methods: {
    changePage(pageNumber) {
      this.CollapsePanelData = this.generatePagedCollapsePanelData(pageNumber);
    },
    generatePagedCollapsePanelData(pageNumber) {
      const data = [];
      const arr = this.MovieData;
      for (let i = (pageNumber - 1) * this.pageSize; i < pageNumber * this.pageSize; i += 1) {
        if (i === this.MovieData.length) {
          break;
        }
        const row = arr[i];
        data.push(row);
      }
      return data;
    },
    getTagColor(type) {
      let color = '';
      switch (type) {
        case '电影':
          color = 'green';
          break;
        case '电视剧':
          color = 'blue';
          break;
        case '动漫':
          color = 'pink';
          break;
        case '音乐':
          color = 'volcano';
          break;
        default:
          color = 'purple';
          break;
      }
      return color;
    },
    getTagText(type) {
      let color = '';
      switch (type) {
        case '电影':
          color = this.$t('message.movie.movie');
          break;
        case '电视剧':
          color = this.$t('message.movie.tv');
          break;
        case '动漫':
          color = this.$t('message.movie.anime');
          break;
        case '音乐':
          color = this.$t('message.movie.music');
          break;
        default:
          color = '';
          break;
      }
      return color;
    },
  },
  async mounted() {
    this.$Message.info(this.$t('message.movie.prompt'));
    this.$Message.error({ content: this.$t('message.movie.warning'), duration: 5, closable: true });
    this.MovieData = await getMovieData();
    this.changePage(1);
  },
};
</script>
