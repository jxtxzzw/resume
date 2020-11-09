<template>
  <div>
    <Menu
      accordion
      active-name="1-2"
      theme="dark"
      width="auto"
      :open-names="['1']"
    >
      <Submenu name="experience">
        <template slot="title">
          <Icon type="md-person" />
          {{ $t('navigation.experience') }}
        </template>
        <MenuItem name="introduction" to="reserved">
          {{ $t('navigation.introduction') }}
        </MenuItem>
        <MenuItem name="milestone" to="milestone">
          {{ $t('navigation.milestone') }}
        </MenuItem>
        <MenuItem name="contact" to="reserved">
          {{ $t('navigation.contact') }}
        </MenuItem>
      </Submenu>
      <Submenu name="skill">
        <template slot="title">
          <Icon type="md-school" />
          {{ $t('navigation.skill') }}
        </template>
        <MenuItem name="study" to="reserved">
          {{ $t('navigation.study') }}
        </MenuItem>
        <MenuItem name="work" to="reserved">
          {{ $t('navigation.work') }}
        </MenuItem>
        <MenuItem name="project" to="reserved">
          {{ $t('navigation.project') }}
        </MenuItem>
        <MenuItem name="research" to="reserved">
          {{ $t('navigation.research') }}
        </MenuItem>
        <MenuItem name="certificate" to="certificate">
          {{ $t('navigation.certificate') }}
        </MenuItem>
        <MenuItem name="honor" to="reserved">
          {{ $t('navigation.honor') }}
        </MenuItem>
        <MenuItem name="exam" to="reserved">
          {{ $t('navigation.exam') }}
        </MenuItem>
        <MenuItem name="oj" to="reserved">
          {{ $t('navigation.oj') }}
        </MenuItem>
        <MenuItem name="technique" to="reserved">
          {{ $t('navigation.technique') }}
        </MenuItem>
      </Submenu>
      <Submenu name="entertainment">
        <template slot="title">
          <Icon type="md-laptop" />
          {{ $t('navigation.entertainment') }}
        </template>
        <MenuItem name="game" to="game">
          {{ $t('navigation.game') }}
        </MenuItem>
        <MenuItem name="fiction" to="fiction">
          {{ $t('navigation.fiction') }}
        </MenuItem>
        <MenuItem name="movie" to="reserved">
          {{ $t('navigation.movie') }}
        </MenuItem>
        <MenuItem name="anime" to="reserved">
          {{ $t('navigation.anime') }}
        </MenuItem>
        <MenuItem name="music" to="reserved">
          {{ $t('navigation.music') }}
        </MenuItem>
        <MenuItem name="footprint" to="reserved">
          {{ $t('navigation.footprint') }}
        </MenuItem>
        <MenuItem name="photo" to="reserved">
          {{ $t('navigation.photo') }}
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
