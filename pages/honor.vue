<template>
  <Waterfall
    :data="honor"
    :date-lang="'honor.date'"
    :info-lang="'honor.info'"
  />
</template>

<script>
import { honor } from 'assets/reader'
import Waterfall from '../components/Waterfall'
export default {
  name: 'Honor',
  components: { Waterfall },
  data() {
    return {
      honor,
    }
  },
}
</script>
