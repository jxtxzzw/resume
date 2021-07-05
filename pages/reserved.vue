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
}
</script>
