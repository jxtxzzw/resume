<template>
  <div>
    <a-page-header
      style="border: 1px solid rgb(235, 237, 240)"
      :title="introduction.nick_name"
      :sub-title="introduction.motto"
    >
      <div class="content">
        <div class="main">
          <a-descriptions size="small" :column="3">
            <a-descriptions-item :label="$t('introduction.true_name')">
              {{ maskedContent(introduction.true_name) }}
            </a-descriptions-item>
            <a-descriptions-item :label="$t('introduction.nick_name')">
              {{ maskedContent(introduction.nick_name) }}
            </a-descriptions-item>
            <a-descriptions-item :label="$t('introduction.english_name')">
              {{ maskedContent(introduction.english_name) }}
            </a-descriptions-item>
            <a-descriptions-item :label="$t('introduction.birthday')">
              {{ maskedContent(introduction.birthday) }}
            </a-descriptions-item>
            <a-descriptions-item :label="$t('introduction.location')">
              {{ maskedContent(introduction.location) }}
            </a-descriptions-item>
            <a-descriptions-item :label="$t('introduction.role')">
              {{ maskedContent(introduction.role) }}
            </a-descriptions-item>
            <a-descriptions-item :label="$t('introduction.email')">
              {{ maskedContent(introduction.email) }}
            </a-descriptions-item>
            <a-descriptions-item :label="$t('introduction.qq')">
              <a-popover :title="$t('introduction.qq')">
                <template v-if="introduction.qq_qr" slot="content">
                  <img :src="introduction.qq_qr" style="max-width: 400px" />
                </template>
                {{ maskedContent(introduction.qq) }}
              </a-popover>
            </a-descriptions-item>
            <a-descriptions-item :label="$t('introduction.wechat')">
              <a-popover :title="$t('introduction.wechat')">
                <template v-if="introduction.wechat_qr" slot="content">
                  <img :src="introduction.wechat_qr" style="max-width: 400px" />
                </template>
                {{ maskedContent(introduction.wechat) }}
              </a-popover>
            </a-descriptions-item>
            <a-descriptions-item :label="$t('introduction.github')">
              <a
                v-if="introduction.github"
                :href="'https://github.com/' + introduction.github"
              >
                {{ introduction.github }}
              </a>
              <span v-else>
                {{ $t('introduction.secret') }}
              </span>
            </a-descriptions-item>
            <a-descriptions-item :label="$t('introduction.gitlab')">
              <a v-if="introduction.gitlab" :href="introduction.gitlab">
                {{ introduction.gitlab }}
              </a>
              <span v-else>
                {{ $t('introduction.secret') }}
              </span>
            </a-descriptions-item>
            <a-descriptions-item :label="$t('introduction.zhihu')">
              <a v-if="introduction.zhihu_href" :href="introduction.zhihu_href">
                {{ introduction.zhihu }}
              </a>
              <span v-else>
                {{ $t('introduction.secret') }}
              </span>
            </a-descriptions-item>
            <a-descriptions-item :label="$t('introduction.zhihu_zhuanlan')">
              <a
                v-if="introduction.zhihu_zhuanlan_href"
                :href="introduction.zhihu_zhuanlan_href"
              >
                {{ introduction.zhihu_zhuanlan }}
              </a>
              <span v-else>
                {{ $t('introduction.secret') }}
              </span>
            </a-descriptions-item>
            <a-descriptions-item :label="$t('introduction.bilibili')">
              <a
                v-if="introduction.bilibili_href"
                :href="introduction.bilibili_href"
              >
                {{ introduction.bilibili }}
              </a>
              <span v-else>
                {{ $t('introduction.secret') }}
              </span>
            </a-descriptions-item>
            <a-descriptions-item :label="$t('introduction.bilibili_live')">
              <a
                v-if="introduction.bilibili_live"
                :href="
                  'https://live.bilibili.com/' + introduction.bilibili_live
                "
              >
                {{ introduction.bilibili_live }}
              </a>
              <span v-else>
                {{ $t('introduction.secret') }}
              </span>
            </a-descriptions-item>
            <a-descriptions-item :label="$t('introduction.wechat_mp')">
              <a-popover :title="$t('introduction.wechat_mp')">
                <template v-if="introduction.wechat_mp_qr" slot="content">
                  <img
                    :src="introduction.wechat_mp_qr"
                    style="max-width: 800px"
                  />
                </template>
                {{ maskedContent(introduction.wechat_mp) }}
              </a-popover>
            </a-descriptions-item>
            <a-descriptions-item :label="$t('introduction.wechat_video')">
              <a-popover :title="$t('introduction.wechat_video')">
                <template v-if="introduction.wechat_video_qr" slot="content">
                  <img
                    :src="introduction.wechat_video_qr"
                    style="max-width: 800px"
                  />
                </template>
                {{ maskedContent(introduction.wechat_video) }}
              </a-popover>
            </a-descriptions-item>
            <a-descriptions-item :label="$t('introduction.youtube')">
              {{ maskedContent(introduction.youtube) }}
            </a-descriptions-item>
            <a-descriptions-item :label="$t('introduction.facebook')">
              {{ maskedContent(introduction.facebook) }}
            </a-descriptions-item>
            <a-descriptions-item :label="$t('introduction.twitter')">
              {{ maskedContent(introduction.twitter) }}
            </a-descriptions-item>
            <a-descriptions-item :label="$t('introduction.linkedin')">
              <a
                v-if="introduction.linkedin"
                :href="'https://www.linkedin.com/in/' + introduction.linkedin"
              >
                {{ introduction.linkedin }}
              </a>
              <span v-else>
                {{ $t('introduction.secret') }}
              </span>
            </a-descriptions-item>
          </a-descriptions>
        </div>
      </div>
    </a-page-header>
  </div>
</template>

<script>
import { introduction, milestone } from 'assets/reader'
export default {
  name: 'Introduction',
  data() {
    return {
      introduction,
      milestone,
      distinctPlatform: [],
    }
  },
  mounted() {
    this.milestone = milestone.map((item) => {
      if (!this.distinctPlatform.includes(item.platform)) {
        this.distinctPlatform.push(item.platform)
      }
      return item
    })
    this.distinctPlatform.sort((a, b) => {
      const A = this.milestone.filter((e) => e.platform === a).length
      const B = this.milestone.filter((e) => e.platform === b).length
      return B - A
    })
    this.milestone.sort((a, b) => {
      return new Date(a) - new Date(b)
    })
  },
  methods: {
    maskedContent(content) {
      return content == null ? this.$t('introduction.secret') : content
    },
  },
}
</script>

<style>
tr:last-child td {
  padding-bottom: 0;
}
.time {
  color: #2d8cf0;
  font-size: 16px;
  font-weight: bold;
}
.content {
  padding-left: 12px;
  font-size: 14px;
  font-weight: bold;
}
</style>
