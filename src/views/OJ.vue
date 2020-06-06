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
import { getCode } from '../api/util';

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
            return h('Poptip', {
              props: {
                trigger: 'hover',
                title: this.$t('message.oj.code_pop', { name: params.row.name }),
                placement: 'bottom',
                transfer: true,
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
              }, [
                h('codemirror', {
                  class: 'codemirror',
                  ref: 'cmEditor',
                  props: {
                    value: params.row.code,
                    options: {
                      tabSize: 4,
                      styleActiveLine: true,
                      lineNumbers: true,
                      line: true,
                      mode: params.row.mode,
                      readOnly: true,
                      theme: 'idea',
                    },
                  },
                }),
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
                  transfer: true,
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
          title: this.$t('message.oj.algs'),
          key: 'algs',
          render: (h, params) => {
            if (params.row.algs.length > 0) {
              return h('Poptip', {
                props: {
                  trigger: 'hover',
                  title: this.$t('message.oj.algs_pop', { num: params.row.algs.length }),
                  placement: 'bottom',
                  transfer: true,
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
    async code(oj, problem) {
      const res = await getCode(oj, problem);
      return res == null ? '' : res.code;
    },
    async mode(oj, problem) {
      let mode = '';
      const res = await getCode(oj, problem);
      const language = res == null ? '' : res.language;
      switch (language.toLowerCase()) {
        case 'c':
        case 'c++':
          mode = 'text/x-c++src';
          break;
        case 'java':
          mode = 'text/x-java';
          break;
        case 'python':
          mode = 'text/x-python';
          break;
        case 'javascript':
          mode = 'text/javascript';
          break;
        case 'sql':
          mode = 'text/x-sql';
          break;
        case 'ml':
        case 'sml':
        case 'ocaml':
          mode = 'text/x-ocaml';
          break;
        default:
          break;
      }
      return mode;
    },
    async generatePagedTableData(pageNumber) {
      let codes = [];
      let modes = [];
      const data = [];
      const arr = this.OJData;
      for (let i = (pageNumber - 1) * this.pageSize; i < pageNumber * this.pageSize; i += 1) {
        if (i === this.OJData.length) {
          break;
        }
        codes.push(this.code(arr[i].oj, arr[i].problem));
        modes.push(this.mode(arr[i].oj, arr[i].problem));
        data.push({
          oj: arr[i].oj,
          problem: arr[i].problem,
          name: arr[i].name,
          status: arr[i].status,
          ds: arr[i].ds,
          algs: arr[i].algs,
        });
      }
      codes = await Promise.all(codes);
      modes = await Promise.all(modes);
      for (let i = 0; i < data.length; i += 1) {
        data[i].code = codes[i];
        data[i].mode = modes[i];
      }
      return data;
    },
    async changePage(pageNumber) {
      this.pageNumber = pageNumber;
      this.tableData = await this.generatePagedTableData(this.pageNumber);
    },
    async pageSizeChange(pageSize) {
      this.pageSize = pageSize;
      await this.changePage(this.pageNumber);
    },
  },
  async mounted() {
    this.OJData = await getOJData();
    await this.changePage(this.pageNumber);
  },
};
</script>
