<template>
  <div>
    <Alert type="error" show-icon>
      {{ $t('reserved.title') }}
      <template slot="desc">
        {{ $t('reserved.desc') }}
      </template>
    </Alert>
  </div>
</template>

<script>
export default {
  name: 'Reserved',
  mounted() {
    this.$i18n.locale = this.$store.getters['language/getLanguage']
  },
}
</script>
