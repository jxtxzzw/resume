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
        <MenuItem name="introduction" to="introduction">
          {{ $t('navigation.introduction') }}
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
        <MenuItem name="work" to="work">
          {{ $t('navigation.work') }}
        </MenuItem>
        <MenuItem name="project" to="project">
          {{ $t('navigation.project') }}
        </MenuItem>
        <MenuItem name="research" to="reserved">
          {{ $t('navigation.research') }}
        </MenuItem>
        <MenuItem name="publication" to="reserved">
          {{ $t('navigation.publication') }}
        </MenuItem>
      </Submenu>
      <Submenu name="skill">
        <template slot="title">
          <Icon type="md-school" />
          {{ $t('navigation.skill') }}
        </template>
        <MenuItem name="exam" to="exam">
          {{ $t('navigation.exam') }}
        </MenuItem>
        <MenuItem name="certificate" to="certificate">
          {{ $t('navigation.certificate') }}
        </MenuItem>
        <MenuItem name="coding" to="coding">
          {{ $t('navigation.coding') }}
        </MenuItem>
        <MenuItem name="technique" to="reserved">
          {{ $t('navigation.technique') }}
        </MenuItem>
        <MenuItem name="honor" to="honor">
          {{ $t('navigation.honor') }}
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
        <MenuItem name="food" to="food">
          {{ $t('navigation.food') }}
        </MenuItem>
      </Submenu>
      <Submenu name="moment">
        <template slot="title">
          <Icon type="md-filing" />
          {{ $t('navigation.moment') }}
        </template>
        <MenuItem name="microblog" to="microblog">
          {{ $t('navigation.microblog') }}
        </MenuItem>
        <MenuItem name="exhibit" to="exhibit">
          {{ $t('navigation.exhibit') }}
        </MenuItem>
        <MenuItem name="footprint" to="footprint">
          {{ $t('navigation.footprint') }}
        </MenuItem>
        <MenuItem name="wish" to="reserved">
          {{ $t('navigation.wish') }}
        </MenuItem>
        <MenuItem name="income" to="reserved">
          {{ $t('navigation.income') }}
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
