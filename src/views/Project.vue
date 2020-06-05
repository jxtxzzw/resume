<template>
  <Carousel autoplay loop>
    <CarouselItem>
      <div class="demo-carousel">
        <div class="cycle-gallery">
          <div class="img-box">
            <div class="img-holder">
              <img src="https://dev.jxtxzzw.com/images/knowledgegraph.jpg">
            </div>
            <div class="text-holder">
              <h3>
                {{ $t('message.project.knowledge_graph.title') }}
              </h3>
            </div>
          </div>
          <p>
            {{ $t('message.project.knowledge_graph.desc') }}
          </p>
          <em class="date">
            2019-03-16
          </em>
        </div>
      </div>
    </CarouselItem>
    <CarouselItem>
      <div class="demo-carousel">
        <div class="cycle-gallery">
          <div class="img-box">
            <div class="img-holder">
              <img src="https://dev.jxtxzzw.com/images/acm-desktopcta.png">
            </div>
            <div class="text-holder">
              <h3>
                {{ $t('message.project.eoj_app.title') }}
              </h3>
            </div>
          </div>
          <p>
            {{ $t('message.project.eoj_app.desc') }}
          </p>
          <em class="date">
            2019-11-08
          </em>
          <div class="attachment">
            <img src="https://dev.jxtxzzw.com/images/eoj_app_cert.jpg" />
          </div>
        </div>
      </div>
    </CarouselItem>
    <CarouselItem>
      <div class="demo-carousel">
        <div class="cycle-gallery">
          <div class="img-box">
            <div class="img-holder">
            </div>
            <div class="text-holder">
              <h3>
                {{ $t('message.project.hackathon.title') }}
              </h3>
            </div>
          </div>
          <p>
            {{ $t('message.project.hackathon.desc') }}
          </p>
          <em class="date">
            2019-07-25
          </em>
          <Button style="margin-right: 10px" type="info" ghost
                  target="_blank"
                  to="https://github.com/jxtxzzw/Microsoft-Hackathon-2019-Intelligent-Garbage-Classification-IoT-Edge-Solution">
            GitHub
          </Button>
          <div class="attachment">
            <img src="https://img.jxtxzzw.com/2019/12/08/z5cxsg.jpg">
          </div>
        </div>
      </div>
    </CarouselItem>
    <CarouselItem>
      <div class="demo-carousel">
        <div class="cycle-gallery">
          <div class="img-box">
            <div class="img-holder">
            </div>
            <div class="text-holder">
              <h3>
                {{ $t('message.project.azure_iot_d2c.title') }}
              </h3>
            </div>
          </div>
          <p>
            {{ $t('message.project.azure_iot_d2c.desc') }}
          </p>
          <em class="date">
            2019-09-25
          </em>
          <Button style="margin-right: 10px" type="info" ghost
                  target="_blank"
                  to="https://github.com/microsoft/vscode-azure-iot-toolkit">
            GitHub
          </Button>
          <Button style="margin-right: 10px"  type="info" ghost
                  target="_blank"
                  :to="'https://devblogs.microsoft.com/iotdev/' +
                  'easily-send-random-generated-d2c-messages-to-iot-hub-with-azure-iot-hub-tools/'">
            Microsoft Blog
          </Button>
        </div>
      </div>
    </CarouselItem>
  </Carousel>
</template>

<script>
export default {
  name: 'Project',
};
</script>

<style scoped>
  .demo-carousel {
    text-align: center;
    color: #fff;
    font-size: 20px;
    background: #FFFFFF;
  }

  .cycle-gallery {
    position: relative;
    text-align: center;
    padding: 40px 200px 33px;
    margin: 0 0 60px;
    line-height: 1.6;
  }

  .cycle-gallery p {
    color: #515a6e;
  }

  .cycle-gallery .img-box {
    display: block;
    line-height: 1.5;
    padding: 0 0 40px;
  }

  .cycle-gallery .img-box .img-holder {
    display: inline-block;
    vertical-align: middle;
    margin: 0 22px 0 0;
    overflow: hidden;
  }

  .cycle-gallery .img-box .img-holder img {
    width: 100px;
    height: 100px;
    border-radius: 50%;
  }

  .cycle-gallery .img-box .text-holder {
    display: inline-block;
    vertical-align: middle;
    text-align: left;
  }

  .cycle-gallery .img-box h3 {
    margin: 0;
    line-height: 1.33333;
    color: #635C73;
  }

  .cycle-gallery .img-box a {
    font-weight: bold;
  }

  .cycle-gallery:after {
    content: "";
    position: absolute;
    bottom: 0;
    left: 180px;
    right: 180px;
    height: 1px;
    background: #f4f4f4;
  }

  .cycle-gallery .date {
    display: block;
    font-style: normal;
    line-height: 1.5;
    font-weight: normal;
    color: #848e97;
  }

  .attachment img {
    height: 300px;
  }
</style>
