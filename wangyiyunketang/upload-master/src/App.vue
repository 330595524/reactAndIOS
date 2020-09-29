<template>
  <div>
    <div>
      <input type="text" value="测试页面是否卡顿" />
    </div>
    <h1>测试</h1>
    <input type="file" @change="handleFileChange" />
    <!-- <el-button type="primary" @click="handleUpload" :disabled="uploadDisabled">上传</el-button> -->
    <el-button type="primary" @click="handleUpload">上传</el-button>
    <el-button type="primary" @click="handleUpload1">慢启动上传</el-button>
    <el-button @click="handleResume" v-if="status === Status.pause">恢复</el-button>
    <el-button
      v-else
      :disabled="status !== Status.uploading || !container.hash"
      @click="handlePause"
    >暂停</el-button>
    <div>
      <div>计算文件 hash</div>
      <el-progress :percentage="hashProgress"></el-progress>
      <div>总进度</div>
      <el-progress :percentage="fakeProgress"></el-progress>

      <!-- <div class="cube-container">
        <div class="cube" 
          :class="{'uploading':chunk>0&&chunk<100, 'success':chunk==100}" 
        v-for="(chunk,index) in cubes" :key="index">
        </div>

      </div> -->
      <!-- <pre>
{{chunks.length}}--{{cubeWidth}}

      </pre> -->

      <div class="cube-container" :style="{width:cubeWidth+'px'}">
        <div class="cube" 

          v-for="chunk in chunks" 
          :key="chunk.hash">
          <div           
            :class="{
            'uploading':chunk.progress>0&&chunk.progress<100, 
            'success':chunk.progress==100,
            'error':chunk.progress<0,
            }" 
            :style="{height:chunk.progress+'%'}"
            >
            {{chunk.index}}
            <!-- <i v-if="chunk.progress<100" class="el-icon-loading" style="color:#F56C6C;"></i> -->
          </div>
        </div>
      </div>

      <!-- <el-table :data="chunks">
        <el-table-column prop="hash" label="切片hash" align="center"></el-table-column>
        <el-table-column label="大小(KB)" align="center" width="120">
          <template v-slot="{ row }">{{ row.size |transformByte}}</template>
        </el-table-column>
        <el-table-column label="进度" align="center">
          <template v-slot="{ row }">
            <el-progress :percentage="row.progress"></el-progress>
          </template>
        </el-table-column>
      </el-table> -->
    </div>
  </div>
</template>
<style lang="stylus" scoped>
.cube-container
  width 100px
  overflow hidden
.cube
  width 14px
  height 14px
  line-height 12px;
  border 1px solid black
  background  #eee
  float left
  >.success
    background #67C23A
  >.uploading
    background #409EFF
  >.error
    background #F56C6C


</style>
<script>
import { request, post } from "./util"
import SparkMD5 from "spark-md5"

// import axios from 'axios'

// 1. hash切片( 介绍一下generator，，我们录制以下即可)
// 2. hash计算切片，requestIdleCallback
// 3. hash计算方式取巧 先计算前面2M和最后一块 中间取样的  命中率低 但是效率高 考虑两者配合 (布隆过滤器)
// 4. 上传并发量控制， 我的mac上4个G计算hash40秒，虽然web-workder导致不卡顿了，但是建立这么多TCP链接，依然会卡死
// 并发控制这个，我记得也是个头条面试题
// 6. 方块进度条（canvas or div）
// 7. 上传失败文件定时清理
      // 定期扫描target下面的文件夹，创建时间过了24小时就可以清理了




// 5. 并发中上传失败重试次数 + 错误提醒 （恢复）
    // 以及红色区块提醒 如何做retry

// 8. size动态调配，根据网速 慢启动的逻辑， 思考这种情况方块进度条怎么做
    // 慢启动逻辑讲解 
    // 比如每个请求控制在30秒，初始大小是1M
    // 根据上一个上传成功的耗时 来决定下一个块的大小  
    // 比如3秒传完，拿下一个就换成30M的length  
    // 30M如果60秒才传完 下一个就换成15M的

// 9. 文件页面提醒小tips watch status如果是uploading，页面跳转和 离开时给提醒 router钩子和 onbeforeunload 就像掘金注销的弹窗
// 10 大文件下载 
    // 先用axios.head获取content-length 获取文件大小信息
    // 然后分片，通过http的headers={'Range':'Bytes=0-15000','Accept-Encoding':'*'} 一次获取写入
    // 断电续传的逻辑想通
    // 当然最好的就是ftp协议的node实现（ftp介绍逻辑 不实现）
// 11 思考
//    1. 问题深挖的好处  学习原理 应付面试
//    2. 真实场景下的解决方案 oss 七牛
// const request = axios.create({
//   baseURL: 'https://some-domain.com/api/',
// })

const SIZE = 0.2 * 1024 * 1024;
const Status = {
  wait: "wait",
  pause: "pause",
  uploading: "uploading",
  error: "error",
  done: "done",
};
export default {
  data: () => ({
    container: {
      file: null
    },
    chunks: [],
    hashProgress: 0,
    // 请求列表，方便随时abort
    requestList: [],
    Status,
    // 默认状态
    status: Status.wait,
    fakeProgress: 0,
    cubes:[0,0,0,0,0,0,1,1,1,1,1,1,1,1,100,100,100,1,0]
  }),
  filters: {
    transformByte(val) {
      return Number((val / 1024).toFixed(0));
    }
  },
  computed: {
    // 方块进度条尽可能的正方形 平方根向上取整
    cubeWidth(){
      return Math.ceil(Math.sqrt(this.chunks.length))*16
    },
    uploadDisabled() {
      return (
        !this.container.file ||
        [Status.pause, Status.uploading].includes(this.status)
      );
    },
    uploadProgress() {
      if (!this.container.file || !this.chunks.length) return 0;
      const loaded = this.chunks
        .map(item => item.size * item.progress)
        .reduce((acc, cur) => acc + cur);
      return parseInt((loaded / this.container.file.size).toFixed(2));
    }
  },
  watch: {
    uploadProgress(now) {
      if (now > this.fakeProgress) {
        this.fakeProgress = now;
      }
    }
  },

  methods: {
    async handleResume() {
      this.status = Status.uploading;

      const { uploadedList } = await this.verify(
        this.container.file.name,
        this.container.hash
      );
      await this.uploadChunks(uploadedList);
    },
    handlePause() {
      this.status = Status.pause;

      this.requestList.forEach(xhr => xhr?.abort());
      this.requestList = [];
    },
    handleFileChange(e) {
      const [file] = e.target.files;
      if (!file) return;
      this.container.file = file;
    },
    createFileChunk(file, size = SIZE) {
      // 生成文件块
      const chunks = [];
      let cur = 0;
      while (cur < file.size) {
        chunks.push({ file: file.slice(cur, cur + size) });
        cur += size;
      }
      return chunks;
    },

    async sendRequest(urls, max=4,retrys=3) {
      console.log(urls,max)
      
      return new Promise((resolve,reject) => {
        const len = urls.length;
        let idx = 0;
        let counter = 0;
        const retryArr = []
        const start = async ()=> {
          // 有请求，有通道
          while (counter < len && max > 0) {
            max--; // 占用通道
            console.log(idx, "start");
            const i = urls.findIndex(v=>v.status==Status.wait || v.status==Status.error )// 等待或者error
            urls[i].status = Status.uploading
            const form = urls[i].form;
            const index = urls[i].index;
            if(typeof retryArr[index]=='number'){
              console.log(index,'开始重试')
            }
            request({
              url: '/upload',
              data: form,
              onProgress: this.createProgresshandler(this.chunks[index]),
              requestList: this.requestList
            }).then(() => {
               urls[i].status = Status.done

              max++; // 释放通道
              counter++;
              urls[counter].done=true
              if (counter === len) {
                resolve();
              } else {
                start();
              }
            }).catch(()=>{
                // 初始值
               urls[i].status = Status.error
               if(typeof retryArr[index]!=='number'){
                  retryArr[index] = 0
               }
              // 次数累加
              retryArr[index]++
              // 一个请求报错3次的
              if(retryArr[index]>=2){
                return reject() // 考虑abort所有别的
              }
              console.log(index, retryArr[index],'次报错')
              // 3次报错以内的 重启
              this.chunks[index].progress = -1 // 报错的进度条
              max++; // 释放当前占用的通道，但是counter不累加
              
              start()
            })
          }
        }
        start();
      });
    },

    async uploadChunks(uploadedList = []) {
      // 这里一起上传，碰见大文件就是灾难
      // 没被hash计算打到，被一次性的tcp链接把浏览器稿挂了
      // 异步并发控制策略，我记得这个也是头条一个面试题
      // 比如并发量控制成4
      const list = this.chunks
        .filter(chunk => uploadedList.indexOf(chunk.hash) == -1)
        .map(({ chunk, hash, index }, i) => {
          const form = new FormData();
          form.append("chunk", chunk);
          form.append("hash", hash);
          form.append("filename", this.container.file.name);
          form.append("fileHash", this.container.hash);
          return { form, index,status:Status.wait };
        })
        // .map(({ form, index }) =>
        //   request({
        //     url: "/upload",
        //     data: form,
        //     onProgress: this.createProgresshandler(this.chunks[index]),
        //     requestList: this.requestList
        //   })
        // );
      // await Promise.all(list);
      try{
        const ret =  await this.sendRequest(list,4)
        if (uploadedList.length + list.length === this.chunks.length) {
          // 上传和已经存在之和 等于全部的再合并
          await this.mergeRequest();
        }
      }catch(e){
        // 上传有被reject的
         this.$message.error('亲 上传失败了,考虑重试下呦');

      }

    },
    createProgresshandler(item) {
      return e => {
        item.progress = parseInt(String((e.loaded / e.total) * 100));
      };
    },

    async mergeRequest() {
      await post("/merge", {
        filename: this.container.file.name,
        size: SIZE,
        fileHash: this.container.hash
      });
      // await request({
      //   url: "/merge",
      //   headers: {
      //     "content-type": "application/json"
      //   },
      //   data: JSON.stringify({
      //     filename: this.container.file.name,
      //     size:SIZE
      //   })
      // })
    },
    async calculateHash(chunks) {
      return new Promise(resolve => {
        // web-worker 防止卡顿主线程
        this.container.workder = new Worker("/hash.js");
        this.container.workder.postMessage({ chunks });
        this.container.workder.onmessage = e => {
          const { progress, hash } = e.data;
          this.hashProgress = Number(progress.toFixed(2));
          if (hash) {
            resolve(hash);
          }
        };
      });
    },
    async calculateHashSample() {
      return new Promise(resolve => {
        const spark = new SparkMD5.ArrayBuffer();
        const reader = new FileReader();
        const file = this.container.file;
        // 文件大小
        const size = this.container.file.size;
        let offset = 2 * 1024 * 1024;

        let chunks = [file.slice(0, offset)];

        // 前面100K

        let cur = offset;
        while (cur < size) {
          // 最后一块全部加进来
          if (cur + offset >= size) {
            chunks.push(file.slice(cur, cur + offset));
          } else {
            // 中间的 前中后去两个子杰
            const mid = cur + offset / 2;
            const end = cur + offset;
            chunks.push(file.slice(cur, cur + 2));
            chunks.push(file.slice(mid, mid + 2));
            chunks.push(file.slice(end - 2, end));
          }
          // 前取两个子杰
          cur += offset;
        }
        // 拼接
        reader.readAsArrayBuffer(new Blob(chunks));

        // 最后100K
        reader.onload = e => {
          spark.append(e.target.result);

          resolve(spark.end());
        };
      });
    },
    async calculateHashIdle(chunks) {
      return new Promise(resolve => {
        const spark = new SparkMD5.ArrayBuffer();
        let count = 0;
        const appendToSpark = async file => {
          return new Promise(resolve => {
            const reader = new FileReader();
            reader.readAsArrayBuffer(file);
            reader.onload = e => {
              spark.append(e.target.result);
              resolve();
            };
          });
        };
        const workLoop = async deadline => {
          // 有任务，并且当前帧还没结束
          while (count < chunks.length && deadline.timeRemaining() > 1) {
            await appendToSpark(chunks[count].file);
            count++;
            // 没有了 计算完毕
            if (count < chunks.length) {
              // 计算中
              this.hashProgress = Number(
                ((100 * count) / chunks.length).toFixed(2)
              );
              // console.log(this.hashProgress)
            } else {
              // 计算完毕
              this.hashProgress = 100;
              resolve(spark.end());
            }
          }
          window.requestIdleCallback(workLoop);
        };
        window.requestIdleCallback(workLoop);
      });
    },
    async calculateHashSync(chunks) {
      return new Promise(resolve => {
        const spark = new SparkMD5.ArrayBuffer();
        let progress = 0;
        let count = 0;

        const loadNext = index => {
          const reader = new FileReader();
          reader.readAsArrayBuffer(chunks[index].file);
          reader.onload = e => {
            // 累加器 不能依赖index，
            count++;
            // 增量计算md5
            spark.append(e.target.result);
            if (count === chunks.length) {
              // 通知主线程，计算结束
              resolve(spark.end());
              this.hashProgress = 100;
            } else {
              // 每个区块计算结束，通知进度即可
              this.hashProgress += 100 / chunks.length;

              // 计算下一个
              loadNext(count);
            }
          };
        };
        // 启动
        loadNext(0);
      });
      // 不计算之前的 方便一会拆解
    },
    async verify(filename, hash) {
      const data = await post("/verify", { filename, hash });
      return data;
    },
    async handleUpload1(){
      // @todo数据缩放的比率 可以更平缓  
      // @todo 并发+慢启动

      // 慢启动上传逻辑 
      const file = this.container.file
      if (!file) return;
      this.status = Status.uploading;
      const fileSize = file.size
      let offset = 1024*1024 
      let cur = 0 
      let count =0
      this.container.hash = await this.calculateHashSample();

      while(cur<fileSize){
        const chunk = file.slice(cur, cur+offset)
        cur+=offset
        const chunkName = this.container.hash + "-" + count;
        const form = new FormData();
        form.append("chunk", chunk);
        form.append("hash", chunkName);
        form.append("filename", file.name);
        form.append("fileHash", this.container.hash);
        form.append("size", chunk.size);

        let start = new Date().getTime()
        await request({ url: '/upload',data: form })
        const now = new Date().getTime()

        const time = ((now -start)/1000).toFixed(4)
        let rate = time/30
        // 速率有最大和最小 可以考虑更平滑的过滤 比如1/tan 
        if(rate<0.5) rate=0.5
        if(rate>2) rate=2
        // 新的切片大小等比变化
        console.log(`切片${count}大小是${this.format(offset)},耗时${time}秒，是30秒的${rate}倍，修正大小为${this.format(offset/rate)}`)
        offset = parseInt(offset/rate)
        // if(time)
        count++
      }



    },
    format(num){
      if(num>1024*1024*1024){
        return (num/(1024*1024*1024)).toFixed(2)+'GB'
      }
      if(num>1024*1024){
        return (num/(1024*1024)).toFixed(2)+'MB'
      }
      if(num>1024){
        return (num/(1024)).toFixed(2)+'KB'
      }
      return num+'B'
    },
    async handleUpload() {
      if (!this.container.file) return;
      this.status = Status.uploading;
      const chunks = this.createFileChunk(this.container.file);
      console.log(chunks);
      // 计算哈希
      // this.container.hash = await this.calculateHashSync(chunks)
      console.time("samplehash");
      // 这样抽样，大概1个G1秒，如果还嫌慢，可以考虑分片+web-worker的方式
      // 这种方式偶尔会误判 不过大题效率不错
      // 可以考虑和全部的hash配合，因为samplehash不存在，就一定不存在，存在才有可能误判，有点像布隆过滤器
      this.container.hash = await this.calculateHashSample();
      console.timeEnd("samplehash");

      console.log("hashSample", this.container.hash);

      // this.container.hash = await this.calculateHashIdle(chunks);
      // console.log("hash2", this.container.hash);

      // this.container.hash = await this.calculateHash(chunks);
      // console.log("hash3", this.container.hash);

      // 判断文件是否存在,如果不存在，获取已经上传的切片
      const { uploaded, uploadedList } = await this.verify(
        this.container.file.name,
        this.container.hash
      );

      if (uploaded) {
        return this.$message.success("秒传:上传成功");
      }
      this.chunks = chunks.map((chunk, index) => {
        const chunkName = this.container.hash + "-" + index;
        return {
          fileHash: this.container.hash,
          chunk: chunk.file,
          index,
          hash: chunkName,
          progress: uploadedList.indexOf(chunkName) > -1 ? 100 : 0,
          size: chunk.file.size
        };
      });
      // 传入已经存在的切片清单
      await this.uploadChunks(uploadedList);
    }
  }
};
</script>