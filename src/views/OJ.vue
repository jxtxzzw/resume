<template>
  <div>
    <Table :data="tableData" :columns="tableColumns" index stripe show-header/>
    <div :style="{margin: '10px', overflow: 'hidden'}">
      <div :style="{float: 'right'}">
        <Page :total="OJData.length"
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
import { getOJData } from '../api/data';
import { QUERY_URL_CODE } from '../api/constant';

export default {
  name: 'OJ',
  data() {
    return {
      pageNumber: 1,
      sizer: [10],
      pageSize: 10,
      OJData: [],
      tableData: [],
      tableColumns: [
        {
          title: '#',
          key: 'idx',
          render: (h, params) => h('span', params.index + 1 + (this.pageNumber - 1) * this.pageSize),
        },
        {
          title: this.$t('message.oj.status'),
          key: 'status',
          render: (h, params) => {
            const { row } = params;
            const color = this.statusColor(row.status);
            const text = this.statusText(row.status);
            const hyperlink = `${QUERY_URL_CODE}?oj=${params.row.oj}&problem=${params.row.problem}`;
            return h('Poptip', {
              props: {
                trigger: 'hover',
                title: `${params.row.oj}-${params.row.name}`,
                placement: 'bottom',
              },
            }, [
              h('Tag', {
                props: {
                  type: 'dot',
                  color,
                },
              }, text),
              h('div', {
                slot: 'content',
                style: {
                  width: '800px',
                },
              },
              [
                h('a', {
                  domProps: {
                    href: row.status === 'Accepted' ? hyperlink : '#',
                    target: 'blank',
                  },
                },
                [
                  h('iframe', {
                    domProps: {
                      src: hyperlink,
                      style: 'border: none; display: block; margin: 0 auto;',
                      width: '100%',
                      height: '800px',
                    },
                  }),
                ]),
              ]),
            ]);
          },
        },
        {
          title: this.$t('message.oj.oj'),
          key: 'oj',
        },
        {
          title: this.$t('message.oj.problem'),
          key: 'problem',
        },
        {
          title: this.$t('message.oj.title'),
          key: 'name',
        },
        {
          title: this.$t('message.oj.status'),
          key: 'ds',
          render: (h, params) => {
            if (params.row.ds.length > 0) {
              return h('Poptip', {
                props: {
                  trigger: 'hover',
                  title: this.$t('message.oj.ds_pop', { num: params.row.ds.length }),
                  placement: 'bottom',
                },
              }, [
                h('Tag', params.row.ds.length),
                h('div', {
                  slot: 'content',
                }, [
                  h('ul', this.tableData[params.index].ds.map((item) => h('li', {
                    style: {
                      textAlign: 'center',
                      padding: '4px',
                    },
                  }, item))),
                ]),
              ]);
            }
            return h('span');
          },
        },
        {
          title: '算法',
          key: 'algs',
          render: (h, params) => {
            if (params.row.algs.length > 0) {
              return h('Poptip', {
                props: {
                  trigger: 'hover',
                  title: this.$t('message.oj.algs_pop', { num: params.row.algs.length }),
                  placement: 'bottom',
                },
              }, [
                h('Tag', params.row.algs.length),
                h('div', {
                  slot: 'content',
                }, [
                  h('ul', this.tableData[params.index].algs.map((item) => h('li', {
                    style: {
                      textAlign: 'center',
                      padding: '4px',
                    },
                  }, item))),
                ]),
              ]);
            }
            return h('span');
          },
        },
      ],
    };
  },
  methods: {
    statusColor(status) {
      if (status === 'TODO') {
        return 'primary';
      } if (status === 'Accepted') {
        return 'success';
      }
      return 'error';
    },
    statusText(status) {
      if (status === 'TODO') {
        return this.$t('message.oj.todo');
      } if (status === 'Accepted') {
        return this.$t('message.oj.accepted');
      }
      return this.$t('message.oj.attempted');
    },
    generatePagedTableData(pageNumber) {
      const data = [];
      const arr = this.OJData;
      for (let i = (pageNumber - 1) * this.pageSize; i < pageNumber * this.pageSize; i += 1) {
        if (i === this.OJData.length) {
          break;
        }
        const row = arr[i];
        data.push({
          oj: row.oj,
          problem: row.problem,
          name: row.name,
          status: row.status,
          ds: row.ds,
          algs: row.algs,
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
  },
  async mounted() {
    this.OJData = await getOJData();
    this.changePage(this.pageNumber);
  },
};
</script>
