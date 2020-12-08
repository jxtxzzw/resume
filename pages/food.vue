<template>
  <div>
    <a-card
      v-for="item in food"
      :key="item.name"
      hoverable
      :style="{
        display: 'inline-block',
        margin: '5px',
        width:
          item.photo_width == null
            ? '500px'
            : parseInt(item.photo_width) * 0.75 + 'px',
      }"
    >
      <img
        v-if="item.fired && item.fired_photo"
        slot="cover"
        :alt="item.name"
        :src="setting.src.food + item.fired_photo"
      />
      <template slot="actions" class="ant-card-actions">
        <a-popover v-if="item.seen">
          <template slot="content">
            <span v-if="item.seen_date">
              {{ $t('food.seen_at', { date: item.seen_date }) }}
            </span>
            <span v-else>{{ $t('food.seen') }}</span>
          </template>
          <a-icon type="eye" theme="twoTone" two-tone-color="#52c41a" />
        </a-popover>
        <a-icon v-if="!item.seen" type="eye" />
        <a-popover v-if="item.ate">
          <template slot="content">
            <span v-if="item.ate_date">
              {{ $t('food.ate_at', { date: item.ate_date }) }}
            </span>
            <span v-else>{{ $t('food.ate') }}</span>
          </template>
          <a-icon type="shopping" theme="twoTone" />
        </a-popover>
        <a-icon v-if="!item.ate" type="shopping" />
        <a-popover v-if="item.fired">
          <template slot="content">
            <span v-if="item.fired_date">
              {{ $t('food.fired_at', { date: item.fired_date }) }}
            </span>
            <span v-else>{{ $t('food.fired') }}</span>
          </template>
          <a-icon type="fire" theme="twoTone" two-tone-color="#eb2f96" />
        </a-popover>
        <a-icon v-if="!item.fired" type="fire" />
      </template>
      <a-card-meta :title="item.name" :description="item.description">
        <a-avatar
          v-if="item.avatar"
          slot="avatar"
          :src="setting.src.food + item.avatar"
        />
      </a-card-meta>
    </a-card>
  </div>
</template>

<script>
import { setting, food } from 'assets/reader'
export default {
  name: 'Food',
  data() {
    return {
      food,
      setting,
    }
  },
}
</script>
