<template>
  <div class="wrap">
    <Form ref="basic" :model="basic" :rules="ruleValidate" :label-width="150">
      <FormItem label="应聘类型" prop="type">
        <Select v-model="basic.typeId" placeholder="请选择应聘类型">
          <Option v-for="item in basic.type" v-bind:key=item.id :value="item.id">{{ item.name }}</Option>
        </Select>
      </FormItem>
      <FormItem label="应聘职位" prop="job">
        <Input v-model="basic.job" placeholder="请输入应聘的职位" />
      </FormItem>
      <FormItem label="可开始工作的时间" prop="startTime">
        <DatePicker type="month" placeholder="" v-model="basic.startTime"></DatePicker>
      </FormItem>
      <FormItem label="可工作时长" prop="duration">
        <Select v-model="basic.durationId" placeholder="">
          <Option v-for="item in basic.duration" v-bind:key=item.id :value="item.id">{{ item.name }}</Option>
        </Select>
      </FormItem>
      <FormItem label="期望工作的城市" prop="eagerCity">
        <Input v-model="basic.eagerCity" placeholder="" />
      </FormItem>
      <FormItem label="是否服从分配" prop="isObey">
        <RadioGroup v-model="basic.isObey">
          <Radio label="true">是</Radio>
          <Radio label="false">否</Radio>
        </RadioGroup>
      </FormItem>
    </Form>
    <div class="save">
      <Button type="primary" @click="next('basic')">保存并下一步</Button>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  data () {
    return {
      basic: {
        typeId: 0,
        durationId: 0,
        type: [
          {
            id: 0,
            name: '全职'
          },
          {
            id: 1,
            name: '兼职'
          },
          {
            id: 2,
            name: '暑期实习'
          },
          {
            id: 3,
            name: '日常实习'
          }
        ],
        startTime: '',
        duration: [
          {
            id: 0,
            name: '1-3个月'
          },
          {
            id: 1,
            name: '半年'
          },
          {
            id: 2,
            name: '1年以内'
          },
          {
            id: 3,
            name: '一年以上'
          }
        ],
        job: '',
        eagerCity: '',
        isObey: 'false'
      },
      ruleValidate: {
        typeId: [
          { required: true, message: 'The name cannot be empty', trigger: 'blur' }
        ],
        startTime: [
          { required: true, type: 'date', message: '开始工作时间不能为空', trigger: 'blur' }
        ],
        durationId: [
          { required: true, message: 'The name cannot be empty', trigger: 'blur' }
        ],
        eagerCity: [
          { required: true, message: '期望城市不能为空', trigger: 'blur' }
        ],
        job: [
          { required: true, message: '职位不能为空', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    next (name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          this.$Message.success('Success!')
          this.$router.push({path: '/addApply/personInfo'})
        } else {
          this.$Message.error('Fail!')
        }
      })
    }
  }
}
</script>

<style scoped lang="stylus">
.ivu-input-wrapper, .ivu-select, .ivu-date-picker
  width 4rem
.save
    display flex
    justify-content center

</style>
