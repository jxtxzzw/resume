<template>
  <Waterfall
    :data="exhibit"
    :date-lang="'exhibit.date'"
    :info-lang="'exhibit.info'"
  />
</template>

<script>
import { exhibit } from 'assets/reader'
import Waterfall from '../components/Waterfall'
export default {
  name: 'Exhibit',
  components: { Waterfall },
  data() {
    return {
      exhibit,
    }
  },
}
</script>
