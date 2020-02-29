<template>
    <div>
      <List item-layout="vertical">
        <ListItem v-for="item in data" :key="item.title">
          <ListItemMeta :title="item.title" :description="item.description" />
          {{ item.content }}
          <template slot="action">
            <li>
              <Icon type="ios-calendar-outline" />
              颁发日期：{{ item.start }}
            </li>
            <li>
              <Icon type="ios-calendar-outline" />
              有效期至：{{ item.end }}
            </li>
            <li>
              <Icon type="ios-barcode-outline" />
              认证编号：{{ item.verify }}
            </li>
          </template>
          <template slot="extra">
            <Tooltip placement="top" transfer>
              <div slot="content">
                <p>点击证书图片以核验证书</p>
              </div>
              <a :href="item.link" target="_blank">
                <img :src="item.src" style="width: 280px">
              </a>
            </Tooltip>
          </template>
        </ListItem>
      </List>
    </div>
</template>

<script>
  import { getCertificationData } from '../data/ResumeData'
  export default {
    name: 'Certification',
    data () {
      return {
        data: []
      }
    },
    async mounted () {
      this.data = await getCertificationData()
    }
  }
</script>

<style scoped>

</style>
