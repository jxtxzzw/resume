[![wakatime](https://wakatime.com/badge/gitlab/jxtxzzw/resume.svg)](https://wakatime.com/badge/gitlab/jxtxzzw/resume)

[![GitLab pipeline](https://gitlab.jxtxzzw.com/jxtxzzw/resume/badges/master/pipeline.svg)](https://gitlab.jxtxzzw.com/jxtxzzw/resume)

# 个人简历 (resume)

这是凝神长老的个人简历页面。

我提供了 3 份详细程度不同的说明，请根据你的需要，随意使用我的代码：

- 面向中级用户的使用说明 (For Intermediate Level)

- 面向高级用户的使用说明 (For Advanced Users)

- 面向初级用户的使用说明 (For Beginners)

## 面向中级用户的使用说明 (For Intermediate Level)

1. 复制 `/assets/data-sample/` 中的所有文件到 `/assets/data/`，复制 `/static/data-sample/` 中的所有文件到 `/static/data/`

2. 根据需要修改这些 `.json` 文件，并将需要的资源复制到 `/static/` 目录下，在 `.json` 文件中的 `src` 都是相对于 `/static/` 的位置

   注意 `.json` 文件中不存在的属性使用 `null` 而不是 `""`，逻辑值使用 `true` 或 `false` 而不是 `1`、`"1"` 等

3. 运行，或者生产静态文件

   ```bash
   # install dependencies
   $ npm install

   # serve with hot reload at localhost:3000
   $ npm run dev

   # build for production and launch server
   $ npm run build
   $ npm run start

   # generate static project
   $ npm run generate
   ```

4. 如果你不需要某些页面，删除 `/components/Navigation.vue` 中的菜单项

   翻译在 `/assets/lang/` 目录下

5. 你可以使用 `npm run build && npm run start` 运行，你可以修改默认端口，或者使用 Nginx 等工具进行反向代理、端口转发

   也可以使用 `npm run generate` 生成静态文件，然后将 `dist` 目录下的所有文件上传到你的服务器目录中

   如果需要部署到 GitHub Pages，你还需要在 `/static/` 目录下创建一个 `.nojekyll` 的文件

   如果你需要部署到子目录，你需要修改 `setting.json` 中的 `deployDir` 字段，注意，当你采用 `npm run start` 方式运行时，这个参数不起作用

6. 更新时，只需要下载（或者克隆）最新的项目文件，将 `/assets/data/` 和 `/static/data/` 复制到新的项目文件夹中，重新运行这些命令即可，无需再次编辑数据

## 面向高级用户的使用说明 (For Advanced Users)

1. 只使用 Vue.js，就没有办法 SEO 了，所以选择了 Nuxt.js，提供了有限的 SEO

2. 使用 JSON 文件存放数据，而不是数据库的方式，是为了方便部署在类似于 GitHub Pages 这样不支持后端环境的平台上

   一般来说，个人简历的信息很少更新，所以可以不需要数据库的支持，而且个人简历的信息是完全公开的，不涉及用户权限的问题（无登录、无鉴权），可以全部展示，也不需要数据库的参与

   如果数据是存放在数据库中，可以使用脚本提前导出，`sql_to_json_converter.js` 提供了一个脚本，将 `.sql` 文件转化为 `.json` 文件，你只需要使用 `mysqldump` 这样的命令导出相应的表然后运行这个脚本，注意 `\` 转义已经被消除，如果你的需要转义后的 `\`，你可以自己修改 `stringify` 前后的代码

   考虑到 MySQL 中没有原生数组的支持，所以很多文件都是采用了 `,` 分隔，然后调用 `.split(',')` 得到数组，如果你使用的是 MongoDB 这样的数据库，你可以修改对应的代码，直接使用数组

   你也可以安装 `Sequelize` 或者 `Mongoose` 这样的模块，并修改 `/assets/reader.js` 以便从数据库获取数据

   或者采用前后端分离的部署方法，利用 `axios` 等手段获取数据

3. 如果需要部署到 GitHub Pages，你还需要在 `/static/` 目录下创建一个 `.nojekyll` 的文件

   如果你需要部署到子目录，你需要修改 `setting.json` 中的 `deployDir` 字段

4. 关于 DevOps (CI/CD)，可以参考 `.gitlab-ci.yml` 文件，你也可以使用 `.travis.yml` 文件

   `.gitlab.yml` 中，`load_resources` 是获取资源，`deploy` 中实现了本地部署（上传到服务器）、GitHub Pages（利用 pull 和 push），以及 GitLab Pages（利用 GitLab Runner 的自动部署）

   `setting.json` 中的 `updated` 可以自动修改，利用命令 `sed` 搜索匹配的内容，并完成替换

   在 `.gitlab-ci.yml` 中，这个命令是

   ```yaml
   sed \"s/\\\"updated\\\":[ ]*\\\"[0-9]\\{4\\}-[0-9]\\{2\\}-[0-9]\\{2\\}\\\"/\\\"updated\\\":\\\"${RESUME_DATE}\\\"/g\"
   ```

   使用不同的 `yml` 工具可能会有不同的转义 `\` 的次数

5. 你可以随意修改代码，删除你不需要的内容，或者增加、修改其他的功能

6. 如果你需要 `matomo`，你可以直接修改 `/assets/data/matomo.json`，项目已包含 `vue-matomo` 模块

7. 如果需要个性化的地图需求，你可以将高德地图和 MapBox 的 API KEY 添加到代码中，这里使用的是官方提供的 DEV KEY

8. `轻博客` 是直接从 WordPress 的 `wp_posts` 表中导出的，所以包含了较多的 WordPress 相关的字段，如果你不需要某些字段，请随意删改 JSON 文件的格式（当然可能需要修改代码以适应）

9. 更新时，只需要下载（或者克隆）最新的项目文件，将 `/assets/data/` 和 `/static/data/` 复制到新的项目文件夹中，重新运行这些命令即可，无需再次编辑数据

10. （暂时）没有做移动端适配（没有响应式布局），你可以自己修改

## 面向初级用户的使用说明 (For Beginners)

1. 在 https://nodejs.org/en/ 下载 LTS 版的 Node.js

2. 按照说明完成 Node.js 的安装，如果你不清楚设置选项，请全部保留默认，注意勾选 `添加到环境变量` (`Add to PATH`) 选项，你甚至可以勾选 `自动安装必要的工具` (`Automatically install the necessary tools`)

3. 安装完成后，你可以重启电脑，确保环境变量生效

4. 下载并解压（或者克隆）这个项目，进入项目目录，然后执行 `npm install`，等待安装完成

5. 复制 `/assets/data-sample/` 中的所有文件到 `/assets/data/`，复制 `/static/data-sample/` 中的所有文件到 `/static/data/`

6. 执行 `npm run dev`，等待开发环境启动

7. 你可以在浏览器中访问 `localhost:3000` 查看页面，如果默认端口 3000 被占用，程序会使用其他端口，你可以在刚才的窗口中看到实际使用的端口

8. 编辑 `/assets/data/settings.json`，修改 `updated` 为当天的日期

9. 编辑 `/assets/data/` 中除了 `matomo.json` 以外的 `.json` 文件，仿照样例的格式，输入你想要展示的内容

   例如对 `introduction.json` 做如下修改

   ```json
   {
     "location": "上海",
     "role": "学生",
     "email": null,
     "qq": "12345",
     "qq_qr": "/data/introduction/qrcode_qq.jpg"
   }
   ```

   又比如在 `study.json` 文件中，在 `[]` 之间增加其他的记录

   ```json
   [
     {
       "school": "中学",
       "date": "2011-09-01",
       "end": "2011-10-01",
       "content": "某中学录取"
     },
     {
       "school": "大学",
       "date": "2011-10-01",
       "end": null,
       "content": "位于上海，至今，附加说明……"
     },
     {
       "school": "小学",
       "date": "2010-11-10",
       "end": null,
       "content": "增加的记录"
     }
   ]
   ```

   明确不需要的字段，例如没有内容、不适用，这样的字段请设置为 `null`

   如果你不清楚某些字段的作用，或者你不需要这些字段，例如，也许你的轻博客不需要跳转到正式博客，那么，这些内容可以保留为 `null` 或者 `""`

10. 将图片等资源复制到 `/static/data/` 中对应的文件夹

    类似于 `"/data/introduction/qrcode_qq.jpg"` 这样的内容表示文件路径，你在填写值后，还需要将对应文件复制到 `/static/` 的对应文件夹下面

    注意文件夹都是相对 `/static/` 目录开始的，即 `"/data/introduction/qrcode_qq.jpg"` 中，`qrcode_qq.jpg` 这个文件应该被复制到 `/static/data/introduction/` 这个文件夹中，文件名为 `qrcode_qq.jpg`

11. 如果有些页面你不需要，例如你不是程序员，你可能不需要 `编程题` 页面，那你可以编辑 `/components/Navigation.vue` 文件，将对应的菜单项删除，例如删除以下 3 行，就不会在菜单中出现 `编程题` 了

    ```vue
    <MenuItem name="coding" to="coding">
      {{ $t('navigation.coding') }}
    </MenuItem>
    ```

    同时，你还应该删除 `/pages/` 目录下的 `coding.vue` 这个文件

12. 保存后，`localhost:3000` 会自动加载刷新

    如果你的修改没有错误的话，修改后的内容已经显示在页面上了，点击不同的菜单，查看是否一切正常

    如果你的修改错误的话，再次修改，然后重复这个过程

13. 当一切准备就绪后，同时按下 `Ctrl` `C` 停止开发环境，并运行 `npm run build` 和 `npm run start`

    你可以通过 IP:3000、域名:3000 这样的方式访问这个页面（你可能需要在服务器提供商处开放 3000 端口）

    你也可以使用 Nginx 这样的工具完成代理，将你的域名转发到 3000 端口上

    注意这种情况下，`npm run start` 服务需要处于运行状态，如果你打算关掉 SSH，这个服务可能也会被关闭，因此，你最好使用 `screen` 这样的工具确保，或者使用 `npm run start &` 确保服务在后台运行

    请自行搜索关键词为 `服务器维护` 、 `Nginx 端口转发` 、 `域名配置` 相关的教程

14. 如果你不想运行这样一个服务（例如内存不足），或者你的服务器只支持静态页面，你还可以运行 `npm run generate`，等待静态文件生成

    如果遇到问题，你可以先尝试反复多次运行这些命令，大多数情况下，二次运行会解决奇怪的问题，这通常是由于第一次运行时花费时间太久而被终止了

    这些文件就是最终的页面，部署它们

- 将 `/dist/` 文件夹下的所有内容（不包括 `/dist/` 文件夹本身），复制（上传）到你的服务器域名对应目录中，然后访问域名（例如 `www.jxtxzzw.com` ）就可以了，你可能需要了解你的站点文件是存放在何处，以及你可能需要给这些文件授予读取的权限，请自行搜索教程，或者咨询服务器提供商

- 如果你的服务器提供商给你的站点是子目录，或者你需要部署到某个子目录中，例如 `www.jxtxzzw.com/zzw` 方式访问，那么你需要在执行 `generate` 步骤前，将 `settings.json` 中的 `deployDir` 修改为子目录 `/zzw/`，注意，当你采用 `npm run start` 方式运行时，这个参数不起作用

  如果你没有自己的服务器或者空间，你也可以使用 GitHub Pages

- 首先注册 GitHub 账号，假设账号名是 `jxtxzzw`

- 然后新建一个仓库，仓库名必须是 `XXX.github.io` 的形式，其中 `XXX` 是你的用户名，例如 `jxtxzzw.github.io`

  - 你可以搜索关键词为 `GitHub Pages` 的相关教程，注意，有些 GitHub Pages 的教程是指导使用 `hexo`，这需要安装额外的软件，或者要在仓库设置中进行一些配置，我们不需要这些步骤

- 将 `/dist/` 文件夹下的所有内容（不包括 `/dist/` 文件夹本身），上传到这个仓库，注意，当你需要部署到 GitHub Pages 时，请检查 `/dist/` 目录下应该有一个 `.nojekyll` 的文件，如果没有，你应该创建它

  - 你可以下载 GitHub Desktop 完成这个操作

  - 你也可以下载安装 git 软件，利用 `git push` 操作将这些文件推送到远端仓库

  - 你可以搜索关键词为 `git tutorial`、`git pull push`、`git remote` 的相关教程

- 你可以访问 `https://XXX.github.io`，例如 `https://jxtxzzw.github.io`，查看你的页面

15. 更新时，只需要下载（或者克隆）最新的项目文件，将 `/assets/data/` 和 `/static/data/` 复制到新的项目文件夹中，重新运行这些命令即可，无需再次编辑数据
