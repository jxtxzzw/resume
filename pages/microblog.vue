<template>
  <div>
    <div class="pf_microblog">
      <ul>
        <li v-for="blog in microblog" :key="blog.ID">
          <div class="date silver-color">
            <span> {{ blog.post_date }} </span>
          </div>
          <a :href="parseURL(blog.guid)">
            <div class="main">
              <p></p>
              <!-- eslint-disable-next-line vue/no-v-html -->
              <p v-html="parseHTML(blog.post_content)"></p>
              <p></p>
            </div>
          </a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { microblog } from 'assets/reader'

export default {
  name: 'Microblog',
  data() {
    return {
      microblog,
    }
  },
  methods: {
    parseHTML(content) {
      return content.split('\r\n').join('<br/>')
    },
    parseURL(guid) {
      return guid.replace('&#038;', '&')
    },
  },
}
</script>

<style scoped>
.pf_microblog > ul::after,
.pf_tag_cloud > .navigator::after {
  bottom: 0;
}

.pf_microblog > ul {
  margin-top: 15px;
  margin-left: 15px;
  padding: 0 0 20px;
  border-left: 1px solid #cad1db;
  -webkit-box-shadow: 1px 0 rgba(255, 255, 255, 0.7) inset;
  box-shadow: 1px 0 rgba(255, 255, 255, 0.7) inset;
  position: relative;
}

.pf_microblog > ul::after,
.pf_microblog > ul::before {
  content: '';
  position: absolute;
  width: 9px;
  height: 9px;
  background: -webkit-gradient(
    linear,
    left top,
    left bottom,
    from(#98a3b3),
    to(#d8e0ea)
  );
  background: -webkit-linear-gradient(#98a3b3, #d8e0ea);
  background: linear-gradient(#98a3b3, #d8e0ea);
  -webkit-box-shadow: 0 0 0 1px #a4b2c6 inset, 0 0 0 2px #d8e0ea inset,
    0 4px 3px rgba(166, 180, 199, 0.4);
  box-shadow: 0 0 0 1px #a4b2c6 inset, 0 0 0 2px #d8e0ea inset,
    0 4px 3px rgba(166, 180, 199, 0.4);
  left: -5px;
  border-radius: 50%;
}

.pf_microblog > ul::before {
  top: 0;
}

.pf_microblog > ul > li {
  display: block;
  list-style: none;
  position: relative;
  margin-left: 20px;
  -webkit-transform: translateY(0);
  transform: translateY(0);
  -webkit-transition: 0.25s;
  transition: 0.25s;
}

.pf_microblog > ul > li:hover {
  -webkit-transform: translateY(6px);
  transform: translateY(6px);
}

.pf_microblog > ul .date {
  height: 16px;
}

.pf_microblog > ul .date span {
  font-size: 12px;
  opacity: 0;
  -webkit-transform: translateY(13px);
  transform: translateY(13px);
  display: inline-block;
  -webkit-transition: 0.25s;
  transition: 0.25s;
}

.pf_microblog > ul > li:hover .date span {
  opacity: 1;
  -webkit-transform: translateY(-3px);
  transform: translateY(-3px);
}

.pf_microblog > ul .main {
  position: relative;
  display: inline-block;
  background: #d3dce6;
  background: -webkit-linear-gradient(
      bottom,
      rgba(255, 255, 255, 0.5),
      rgba(255, 255, 255, 0) 10px
    )
    #d3dce6;
  background: linear-gradient(
      0deg,
      rgba(255, 255, 255, 0.5),
      rgba(255, 255, 255, 0) 10px
    )
    #d3dce6;
  border-radius: 13px;
  border: 1px solid #acbacc;
  padding: 5px 15px;
  -webkit-box-shadow: 0 0 0 1px rgba(255, 255, 255, 0.4) inset,
    0 13px 15px rgba(31, 45, 61, 0.15);
  box-shadow: 0 0 0 1px rgba(255, 255, 255, 0.4) inset,
    0 13px 15px rgba(31, 45, 61, 0.15);
  max-width: 100%;
  -webkit-transition: 0.25s;
  transition: 0.25s;
}

.pf_microblog > ul > li:hover .main {
  -webkit-box-shadow: 0 0 0 1px rgba(255, 255, 255, 0.4) inset,
    0 3px 3px rgba(31, 45, 61, 0.2);
  box-shadow: 0 0 0 1px rgba(255, 255, 255, 0.4) inset,
    0 3px 3px rgba(31, 45, 61, 0.2);
}

.pf_microblog > ul .main::before {
  content: '';
  display: block;
  position: absolute;
  left: 4px;
  top: 0;
  right: 4px;
  height: 20px;
  border-radius: 10px;
  background: rgba(255, 255, 255, 0.5);
  background: -webkit-gradient(
    linear,
    left top,
    left bottom,
    from(rgba(255, 255, 255, 1)),
    to(rgba(255, 255, 255, 0.2))
  );
  background: -webkit-linear-gradient(
    rgba(255, 255, 255, 1),
    rgba(255, 255, 255, 0.2)
  );
  background: linear-gradient(rgba(255, 255, 255, 1), rgba(255, 255, 255, 0.2));
}

.pf_microblog > ul .date::after,
.pf_microblog > ul .date::before {
  top: 29px;
  border-top: 6px solid transparent;
  border-bottom: 6px solid transparent;
  z-index: 1;
}

.pf_microblog > ul .main p {
  margin: 4px 0;
}

.pf_microblog > ul .main * {
  text-shadow: 0 1px rgba(255, 255, 255, 0.5);
  color: #5d6b7d;
  font-size: 13px;
  position: relative;
  z-index: 1;
}

.pf_microblog > ul .date::after,
.pf_microblog > ul .date::before,
.pf_microblog > ul .main::after,
.pf_microblog > ul > li::before {
  content: '';
  position: absolute;
}

.pf_microblog > ul .main img {
  max-width: 100%;
  height: auto;
  border-radius: 5px;
  -webkit-box-shadow: 0 1px rgba(255, 255, 255, 0.5);
  box-shadow: 0 1px rgba(255, 255, 255, 0.5);
}

.pf_microblog > ul .date::before {
  border-right: 6px solid #acbacc;
  left: -5px;
}

.pf_microblog > ul .date::after {
  border-right: 6px solid #e5eaf0;
  left: -4px;
}

.pf_microblog > ul .main::after {
  border-top: 6px solid transparent;
  border-right: 6px solid #d3dce6;
  border-bottom: 6px solid transparent;
  top: 12px;
  z-index: 1;
  left: -3px;
}

.pf_microblog > ul > li::before {
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: #a6b4c7;
  left: -24px;
  top: 32px;
  -webkit-box-shadow: 0 0 0 1px #cad1db inset, 0 0 0 2px #f0f2f7 inset;
  box-shadow: 0 0 0 1px #cad1db inset, 0 0 0 2px #f0f2f7 inset;
}

.silver-color {
  color: #738192;
}
</style>
