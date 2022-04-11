<template>
  <div>
    <Menu
      accordion
      active-name="1-2"
      theme="dark"
      width="auto"
      :open-names="['1']"
    >
      <Submenu name="information">
        <template slot="title">
          <Icon type="md-person" />
          {{ $t('navigation.information') }}
        </template>
        <MenuItem name="introduction" :to="localePath('introduction')">
          {{ $t('navigation.introduction') }}
        </MenuItem>
      </Submenu>
      <Submenu name="experience">
        <template slot="title">
          <Icon type="md-copy" />
          {{ $t('navigation.experience') }}
        </template>
        <MenuItem name="study" :to="localePath('study')">
          {{ $t('navigation.study') }}
        </MenuItem>
        <MenuItem name="work" :to="localePath('work')">
          {{ $t('navigation.work') }}
        </MenuItem>
        <MenuItem name="project" :to="localePath('project')">
          {{ $t('navigation.project') }}
        </MenuItem>
        <MenuItem name="research" :to="localePath('research')">
          {{ $t('navigation.research') }}
        </MenuItem>
        <MenuItem name="subject" :to="localePath('subject')">
          {{ $t('navigation.subject') }}
        </MenuItem>
        <MenuItem name="publication" :to="localePath('reserved')">
          {{ $t('navigation.publication') }}
        </MenuItem>
        <MenuItem name="life" :to="localePath('life')">
          {{ $t('navigation.life') }}
        </MenuItem>
      </Submenu>
      <Submenu name="skill">
        <template slot="title">
          <Icon type="md-school" />
          {{ $t('navigation.skill') }}
        </template>
        <MenuItem name="course" :to="localePath('course')">
          {{ $t('navigation.course') }}
        </MenuItem>
        <MenuItem name="exam" :to="localePath('exam')">
          {{ $t('navigation.exam') }}
        </MenuItem>
        <MenuItem name="certificate" :to="localePath('certificate')">
          {{ $t('navigation.certificate') }}
        </MenuItem>
        <MenuItem name="coding" :to="localePath('coding')">
          {{ $t('navigation.coding') }}
        </MenuItem>
        <MenuItem name="tech" :to="localePath('tech')">
          {{ $t('navigation.tech') }}
        </MenuItem>
        <MenuItem name="honor" :to="localePath('honor')">
          {{ $t('navigation.honor') }}
        </MenuItem>
      </Submenu>
      <Submenu name="entertainment">
        <template slot="title">
          <Icon type="md-laptop" />
          {{ $t('navigation.entertainment') }}
        </template>
        <MenuItem name="game" :to="localePath('game')">
          {{ $t('navigation.game') }}
        </MenuItem>
        <MenuItem name="fiction" :to="localePath('fiction')">
          {{ $t('navigation.fiction') }}
        </MenuItem>
        <MenuItem name="media" :to="localePath('media')">
          {{ $t('navigation.media') }}
        </MenuItem>
        <MenuItem name="activity" :to="localePath('activity')">
          {{ $t('navigation.activity') }}
        </MenuItem>
        <MenuItem name="photo" :to="localePath('photo')">
          {{ $t('navigation.photo') }}
        </MenuItem>
        <MenuItem name="food" :to="localePath('food')">
          {{ $t('navigation.food') }}
        </MenuItem>
        <MenuItem name="creation" :to="localePath('creation')">
          {{ $t('navigation.creation') }}
        </MenuItem>
      </Submenu>
      <Submenu name="moment">
        <template slot="title">
          <Icon type="md-filing" />
          {{ $t('navigation.moment') }}
        </template>
        <MenuItem name="microblog" :to="localePath('microblog')">
          {{ $t('navigation.microblog') }}
        </MenuItem>
        <MenuItem name="exhibit" :to="localePath('exhibit')">
          {{ $t('navigation.exhibit') }}
        </MenuItem>
        <MenuItem name="footprint" :to="localePath('footprint')">
          {{ $t('navigation.footprint') }}
        </MenuItem>
        <MenuItem name="dream" :to="localePath('dream')">
          {{ $t('navigation.dream') }}
        </MenuItem>
        <MenuItem name="income" :to="localePath('income')">
          {{ $t('navigation.income') }}
        </MenuItem>
        <MenuItem name="credit" :to="localePath('credit')">
          {{ $t('navigation.credit') }}
        </MenuItem>
      </Submenu>
    </Menu>
  </div>
</template>

<script>
export default {
  name: 'Navigation',
}
</script>
