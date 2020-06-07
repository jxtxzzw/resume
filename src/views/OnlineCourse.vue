<template>
  <div>
    <Table :data="tableData" :columns="tableColumns" index stripe show-header />
    <div :style="{margin: '10px', overflow: 'hidden'}">
      <div :style="{float: 'right'}">
        <Page
          :total="gotData.length"
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
import { getOnlineCourseData } from '../api/data';

export default {
  name: 'OnlineCourse',
  data() {
    return {
      pageNumber: 1,
      sizer: [10],
      pageSize: 10,
      gotData: [],
      tableData: [],
      tableColumns: [
        {
          title: '#',
          key: 'idx',
          render: (h, params) => h('span', params.index + 1 + (this.pageNumber - 1) * this.pageSize),
        },
        {
          title: this.$t('message.course.name'),
          key: 'name',
        },
        {
          title: this.$t('message.course.instructor'),
          key: 'instructor',
        },
        {
          title: this.$t('message.course.platform'),
          key: 'platform',
        },
        {
          title: this.$t('message.course.university'),
          key: 'university',
        },
        {
          title: this.$t('message.course.content'),
          key: 'content',
          render: (h, params) => {
            if (params.row.content.length > 0) {
              return h('Poptip', {
                props: {
                  trigger: 'hover',
                  title: this.$t('message.course.content_poptip', { num: params.row.content.length }),
                  placement: 'bottom',
                  transfer: true,
                },
              }, [
                h('Tag', params.row.content.length),
                h('div', {
                  slot: 'content',
                }, [
                  h('ul', this.tableData[params.index].content.map((item) => h('li', {
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
          title: '视频',
          key: 'video',
          render: (h, params) => {
            const { row } = params;
            const color = this.getColor(row.video);
            const text = this.getText(row.video);
            return h('Tag', {
              props: {
                type: 'dot',
                color,
              },
            }, text);
          },
        },
        {
          title: '讲义',
          key: 'lecture',
          render: (h, params) => {
            const { row } = params;
            const color = this.getColor(row.lecture);
            const text = this.getText(row.lecture);
            return h('Tag', {
              props: {
                type: 'dot',
                color,
              },
            }, text);
          },
        },
        {
          title: '作业',
          key: 'homework',
          render: (h, params) => {
            const { row } = params;
            const color = this.getColor(row.homework);
            const text = this.getText(row.homework);
            return h('Tag', {
              props: {
                type: 'dot',
                color,
              },
            }, text);
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
        return this.$t('message.course.todo');
      } if (x === 'done') {
        return this.$t('message.course.done');
      } if (x === 'aborted') {
        return this.$t('message.course.aborted');
      } if (x === 'doing') {
        return this.$t('message.course.doing');
      }
      return this.$t('message.course.disabled');
    },
    generatePagedTableData(pageNumber) {
      const data = [];
      const arr = this.gotData;
      for (let i = (pageNumber - 1) * this.pageSize; i < pageNumber * this.pageSize; i += 1) {
        if (i === this.gotData.length) {
          break;
        }
        const row = arr[i];
        data.push({
          name: row.name,
          platform: row.platform,
          instructor: row.instructor,
          university: row.university,
          video: row.video,
          homework: row.homework,
          lecture: row.lecture,
          content: row.content,
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
    this.gotData = await getOnlineCourseData();
    this.sizer.push(this.gotData.length);
    this.changePage(this.pageNumber);
  },
};
</script>
