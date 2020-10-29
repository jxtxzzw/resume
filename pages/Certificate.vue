<template>
  <div>
    <List item-layout="vertical">
      <ListItem v-for="item in certificate" :key="item.title">
        <ListItemMeta
          :title="item.title"
          :description="generateDescription(item)"
        />
        {{ item.content }}
        <template slot="action">
          <li>
            <Icon type="ios-calendar-outline" />
            {{ $t('certificate.start') }} {{ item.start }}
          </li>
          <li>
            <Icon type="ios-calendar-outline" />
            {{ $t('certificate.end') }}
            {{ item.end ? item.end : $t('certificate.lifetime') }}
          </li>
          <li>
            <Icon type="ios-barcode-outline" />
            {{ $t('certificate.verify_id') }}{{ item.verify }}
          </li>
        </template>
        <template slot="extra">
          <Tooltip placement="top" transfer>
            <div slot="content">
              <p>{{ $t('certificate.verify_prompt') }}</p>
            </div>
            <a :href="item.link" target="_blank">
              <img
                :src="setting.src.certificate + item.filename"
                style="width: 280px"
              />
            </a>
          </Tooltip>
        </template>
      </ListItem>
    </List>
  </div>
</template>

<script>
import { certificate, setting } from 'assets/reader'

export default {
  name: 'Certification',
  data() {
    return {
      certificate,
      setting,
    }
  },
  methods: {
    generateDescription(item) {
      let description = ''
      if (item.specialization) {
        description += ` ${this.$t('certificate.specialization', {
          specialization: item.specialization,
        })} `
      }
      if (item.platform) {
        description += ` ${this.$t('certificate.platform', {
          platform: item.platform,
        })} `
      }
      if (item.provider) {
        description += ` ${this.$t('certificate.provider', {
          provider: item.provider,
        })} `
      }
      return description
    },
  },
}
</script>
