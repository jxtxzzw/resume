<template>
  <div>
    <Table :data="tableData" :columns="tableColumns" index stripe show-header />
    <div :style="{margin: '10px', overflow: 'hidden'}">
      <div :style="{float: 'right'}">
        <Page
          :total="ProfessionalBookData.length"
          :current="1"
          @on-change="changePage"
          show-total
          show-sizer
          :page-size="pageSize"
          :page-size-opts="sizer"
          @on-page-size-change="pageSizeChange"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { getProfessionalBookData } from '../api/data';

export default {
  name: 'ProfessionalBook',
  data() {
    return {
      pageNumber: 1,
      sizer: [10],
      pageSize: 10,
      ProfessionalBookData: [],
      tableData: [],
      tableColumns: [
        {
          title: '#',
          key: 'idx',
          render: (h, params) => h('span', params.index + 1 + (this.pageNumber - 1) * this.pageSize),
        },
        {
          title: this.$t('message.book.status'),
          key: 'status',
          render: (h, params) => {
            const { row } = params;
            const color = this.getColor(row.status);
            const text = this.getText(row.status);
            return h('Tag', {
              props: {
                type: 'dot',
                color,
              },
            }, text);
          },
        },
        {
          title: this.$t('message.book.title'),
          key: 'title',
        },
        {
          title: this.$t('message.book.version'),
          key: 'version',
        },
        {
          title: this.$t('message.book.author'),
          key: 'author',
        },
        {
          title: this.$t('message.book.publisher'),
          key: 'publisher',
        },
        {
          title: this.$t('message.book.label'),
          key: 'label',
          render: (h, params) => {
            const { label } = params.row;
            return label.map((x) => h('Tag', {
              props: {
                type: 'border',
                color: this.randomColor(),
              },
            }, x));
          },
        },
      ],
    };
  },
  methods: {
    getColor(x) {
      if (x === 'todo') {
        return 'warning';
      } if (x === 'done') {
        return 'success';
      } if (x === 'aborted') {
        return 'error';
      } if (x === 'doing') {
        return 'primary';
      }
      return 'disabled';
    },
    getText(x) {
      if (x === 'todo') {
        return this.$t('message.book.todo');
      } if (x === 'done') {
        return this.$t('message.book.done');
      } if (x === 'aborted') {
        return this.$t('message.book.aborted');
      } if (x === 'doing') {
        return this.$t('message.book.doing');
      }
      return this.$t('message.book.disabled');
    },
    generatePagedTableData(pageNumber) {
      const data = [];
      const arr = this.ProfessionalBookData;
      for (let i = (pageNumber - 1) * this.pageSize; i < pageNumber * this.pageSize; i += 1) {
        if (i === this.ProfessionalBookData.length) {
          break;
        }
        const row = arr[i];
        data.push({
          title: row.title,
          version: row.version,
          author: row.author,
          status: row.status,
          publisher: row.publisher,
          label: row.label,
        });
      }
      return data;
    },
    changePage(pageNumber) {
      this.pageNumber = pageNumber;
      this.tableData = this.generatePagedTableData(this.pageNumber);
    },
    pageSizeChange(pageSize) {
      this.pageSize = pageSize;
      this.changePage(this.pageNumber);
    },
    randomColor() {
      const color = ['magenta', 'blue', 'volcano', 'orange', 'gold', 'yellow', 'lime', 'green', 'cyan', 'blue', 'geekblue', 'purple'];
      const r = Math.floor(Math.random() * color.length);
      return color[r];
    },
  },
  async mounted() {
    this.ProfessionalBookData = await getProfessionalBookData();
    this.sizer.push(this.ProfessionalBookData.length);
    this.changePage(this.pageNumber);
  },
};
</script>
