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
        <MenuItem name="introduction" to="reserved">
          {{ $t('navigation.introduction') }}
        </MenuItem>
        <MenuItem name="contact" to="reserved">
          {{ $t('navigation.contact') }}
        </MenuItem>
      </Submenu>
      <Submenu name="experience">
        <template slot="title">
          <Icon type="md-copy" />
          {{ $t('navigation.experience') }}
        </template>
        <MenuItem name="study" to="study">
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
        <MenuItem name="publication" to="reserved">
          {{ $t('navigation.publication') }}
        </MenuItem>
        <MenuItem name="milestone" to="milestone">
          {{ $t('navigation.milestone') }}
        </MenuItem>
      </Submenu>
      <Submenu name="skill">
        <template slot="title">
          <Icon type="md-school" />
          {{ $t('navigation.skill') }}
        </template>
        <MenuItem name="exam" to="reserved">
          {{ $t('navigation.exam') }}
        </MenuItem>
        <MenuItem name="certificate" to="certificate">
          {{ $t('navigation.certificate') }}
        </MenuItem>
        <MenuItem name="oj" to="reserved">
          {{ $t('navigation.oj') }}
        </MenuItem>
        <MenuItem name="technique" to="reserved">
          {{ $t('navigation.technique') }}
        </MenuItem>
        <MenuItem name="honor" to="reserved">
          {{ $t('navigation.honor') }}
        </MenuItem>
        <MenuItem name="exhibit" to="reserved">
          {{ $t('navigation.exhibit') }}
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
        <MenuItem name="media" to="media">
          {{ $t('navigation.media') }}
        </MenuItem>
        <MenuItem name="photo" to="photo">
          {{ $t('navigation.photo') }}
        </MenuItem>
        <MenuItem name="food" to="reserved">
          {{ $t('navigation.food') }}
        </MenuItem>
        <MenuItem name="footprint" to="reserved">
          {{ $t('navigation.footprint') }}
        </MenuItem>
        <MenuItem name="wish" to="reserved">
          {{ $t('navigation.wish') }}
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
