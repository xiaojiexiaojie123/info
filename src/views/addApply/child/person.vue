<template>
  <div class="wrap">
    <Form ref="person" :model="person" :rules="ruleValidate" :label-width="150">
      <FormItem label="姓名" prop="name">
        <Input v-model="person.name" placeholder="请输入您的姓名" />
      </FormItem>
      <FormItem label="性别" prop="sex">
        <RadioGroup v-model="person.sex">
          <Radio label="1">男</Radio>
          <Radio label="2">女</Radio>
        </RadioGroup>
      </FormItem>
      <FormItem label="出生日期" prop="birthDate">
        <DatePicker type="date" placeholder="" v-model="person.birthDate"></DatePicker>
      </FormItem>
      <FormItem label="手机" prop="phone">
        <Input v-model="person.phone" placeholder="请输入您的手机" />
      </FormItem>
      <FormItem label="邮箱" prop="email">
        <Input v-model="person.email" placeholder="请输入您的邮箱" />
      </FormItem>
      <FormItem label="微信" prop="wechat">
        <Input v-model="person.wechat" placeholder="请输入您的微信" />
      </FormItem>
      <FormItem label="紧急联系人" prop="urgentPeople">
        <Input v-model="person.urgentPeople" placeholder="" />
      </FormItem>
      <FormItem label="紧急联系人电话" prop="urgentPeoplePhone">
        <Input v-model="person.urgentPeoplePhone" placeholder="" />
      </FormItem>
      <FormItem label="个人照片" prop="pic">
        <Input v-model="person.pic" placeholder="" />
      </FormItem>
    </Form>
    <div class="save">
      <Button type="primary" @click="next('person')" style="margin-right: .5rem">保存并下一步</Button>
      <Button @click="prev()">返回上一步</Button>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  data () {
    return {
      person: {
        name: '',
        sex: '1',
        birthDate: '',
        phone: '',
        email: '',
        wechat: '',
        urgentPeople: '',
        urgentPeoplePhone: '',
        pic: ''
      },
      ruleValidate: {
        name: [
          { required: true, message: '名字不能为空', trigger: 'blur' }
        ],
        birthDate: [
          { required: true, type: 'date', message: '出生日期不能为空', trigger: 'blur' }
        ],
        phone: [
          { required: true, message: '手机不能为空', trigger: 'blur' }
        ],
        email: [
          { required: true, message: '邮箱不能为空', trigger: 'blur' }
        ],
        urgentPeople: [
          { required: true, message: '紧急联系人不能为空', trigger: 'blur' }
        ],
        urgentPeoplePhone: [
          { required: true, message: '紧急联系人电话不能为空', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    next (name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          this.$Message.success('Success!')
          this.$router.push({path: '/addApply/education'})
        } else {
          this.$Message.error('Fail!')
        }
      })
    },
    prev () {
      this.$router.push({path: '/addApply/basic'})
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
