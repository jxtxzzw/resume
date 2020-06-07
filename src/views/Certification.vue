<template>
  <div>
    <List item-layout="vertical">
      <ListItem v-for="item in data" :key="item.title">
        <ListItemMeta :title="item.title" :description="item.description" />
        {{ item.content }}
        <template slot="action">
          <li>
            <Icon type="ios-calendar-outline" />
            {{ $t("message.certification.start") }} {{ item.start }}
          </li>
          <li>
            <Icon type="ios-calendar-outline" />
            {{ $t("message.certification.end") }} {{ item.end }}
          </li>
          <li>
            <Icon type="ios-barcode-outline" />
            {{ $t("message.certification.verify_id") }}{{ item.verify }}
          </li>
        </template>
        <template slot="extra">
          <Tooltip placement="top" transfer>
            <div slot="content">
              <p>{{ $t("message.certification.verify_prompt") }}</p>
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
import { getCertificationData } from '../api/data';

export default {
  name: 'Certification',
  data() {
    return {
      data: [],
    };
  },
  async mounted() {
    this.data = await getCertificationData();
  },
};
</script>

<style scoped>

</style>
