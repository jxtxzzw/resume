<template lang="pug">
div
  Alert(type="success", show-icon)
    | 欢迎访问我的个人主页
    template(slot="desc")
      | 门面总还是要有的，这是一个基于Vue的前端页面，包括了更详细的个人简历、学习经历、获奖情况，以及包括专业课成绩和OJ做题记录，甚至包括了我读过的小说、玩过的游戏、看过的电影以及我个人对他们的评价
  Alert(show-icon)
    | 随便点开一个看看吧
    template(slot="desc")
      | 在左边的导航菜单中可以看到我的个人简历、专业技能的掌握情况，以及看过的小说和电影、玩过的游戏
  Alert(type="success", show-icon)
    | 还可以在上侧导航栏中访问我的其他站点
    template(slot="desc")
      | 个人博客，基于WordPress，里面有我的学习笔记、专业课作业、游记和见闻；代码仓库，基于GitLab，有些不想放到GitHub上的东西，或者暂时需要保密的代码，就放在自己的私有代码仓库
</template>

<script>
export default {
  name: 'Welcome'
}
</script>

<style scoped>

</style>
