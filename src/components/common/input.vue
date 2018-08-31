<template>
  <Form ref="value" :model="basic" :rules="ruleValidate" :label-width="80">
    <FormItem label="Name" :prop="name">
      <Input v-model="name" placeholder="Enter your name" style="width: 4rem"/>
    </FormItem>
  </Form>
</template>

<script type="text/ecmascript-6">
export default {
  data () {
    return {
    }
  },
  props: [
    'name'
  ],
  methods: {}
}
</script>

<style scoped lang="stylus">
</style>
