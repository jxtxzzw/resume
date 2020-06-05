<template>
  <div>
    <Alert type="error" show-icon>
      {{ $t('message.reserved.title') }}
      <template slot="desc">
        {{ $t('message.reserved.desc') }}
      </template>
    </Alert>
  </div>
</template>

<script>
export default {
  name: 'Reserved',
};
</script>

<style scoped>

</style>
