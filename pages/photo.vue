<template>
  <Waterfall
    :data="photo"
    :date-lang="'photo.date'"
    :info-lang="'photo.info'"
    :credit-lang="'photo.credit'"
  />
</template>

<script>
import { photo } from 'assets/reader'
import Waterfall from '../components/Waterfall'
export default {
  name: 'Photo',
  components: { Waterfall },
  data() {
    return {
      photo,
    }
  },
}
</script>
