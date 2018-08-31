<template>
  <FormItem label="City" :prop="type">
    <Select v-model="selectId" :placeholder="placeholder">
      <Option v-for="item in items" v-bind:key=item.id value="item.id">{{ item.name }}</Option>
    </Select>
  </FormItem>
</template>

<script type="text/ecmascript-6">
export default {
  data () {
    return {
    }
  },
  props: [
    'placeholder',
    'selectId',
    'items',
    'type'
  ],
  methods: {},
  created () {
    console.log(this.items)
  }
}
</script>

<style scoped lang="stylus">
</style>
