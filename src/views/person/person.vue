<template>
  <div class="person">
    <div class="title">
      个人中心
    </div>
    <div class="person-center">
      <div class="item" v-if="hasApply">
        <h3>我的简历</h3>
        <Table class="personTable" border stripe :columns="columns" :data="applyData"></Table>
        <Button type="primary" @click="addApply" style="margin-top: .1rem">添加简历</Button>
      </div>
      <div class="noItem" v-else>
        <p>当前暂无简历信息，请添加简历</p>
        <Button icon="ios-add" type="primary" @click="addApply">添加简历</Button>
      </div>
      <Modal
        v-model="addShow"
        title="添加简历名称"
        @on-ok="confirmAdd"
        @on-cancel="cancel">
        <Input v-model="name" autofocus placeholder="请输入简历名称" style="width: 100%" />
      </Modal>
      <Modal
        v-model="updateShow"
        title="修改简历名称"
        @on-ok="confirmUpdate"
        @on-cancel="cancel">
        <Input v-model="name" autofocus placeholder="请输入简历名称" style="width: 100%" />
      </Modal>
    </div>
  </div>
</template>

<script>
import { createApply, getApply, deleteApply, updateApply } from '@/api/api'
export default {
  name: 'dashboard',
  data () {
    return {
      name: '',
      hasApply: false,
      addShow: false,
      updateShow: false,
      updateId: '',
      columns: [
        {
          title: '简历名称',
          key: 'name',
          align: 'center',
          width: 200,
          render: (h, params) => {
            return h('div',
              {
                style: {
                  display: 'flex',
                  alignItems: 'center'
                }
              },
              [
                h('span', {
                  style: {
                    width: '100%',
                    height: '100%'
                  }
                }, params.row.name),
                h('Icon', {
                  props: {
                    type: 'ios-create-outline',
                    size: 20
                    // trigger:'moseover',
                    // placement:'bottom'
                  },
                  style: {
                    marginLeft: '10px',
                    cursor: 'pointer'
                  },
                  on: {
                    click: () => {
                      this.updateApply(params.row)
                    }
                  }
                })
              ]
            )
          }
        },
        {
          title: '更新时间',
          key: 'update',
          align: 'center',
          width: 200
        },
        {
          title: '完整程度',
          align: 'center',
          key: 'integrity',
          render: (h, params) => {
            return h('div', [
              h('Progress', {
                props: {
                  percent: params.row.integrity
                }
              })
            ])
          }
        },
        {
          title: '操作',
          width: 300,
          align: 'center',
          render: (h, params) => {
            return h('div', [
              h('Button', {
                style: {
                  marginRight: '.2rem'
                },
                on: {
                  click: () => {
                    this.preview(params.index)
                  }
                }
              }, '预览'),
              h('Button', {
                style: {
                  marginRight: '.2rem'
                },
                on: {
                  click: () => {
                    this.edit(params.index)
                  }
                }
              }, '编辑'),
              h('Button', {
                on: {
                  click: () => {
                    this.delete(params.row.id)
                  }
                }
              }, '删除')
            ])
          }
        }
      ],
      applyData: [
        {
          name: 'John Brown',
          update: '2016-10-03',
          integrity: 40
        }
      ]
    }
  },
  created () {
    this.getApplyData()
  },
  methods: {
    // 获取简历
    async getApplyData () {
      const res = await getApply()
      console.log(res)
      if (res) {
        this.hasApply = true
        this.applyData = res.data
      }
    },
    // 添加简历
    addApply () {
      this.addShow = true
    },
    confirmAdd () {
      const res = createApply({name: this.name})
      res.then(result => {
        this.name = ''
        this.getApplyData()
        this.$router.push('/addApply')
      })
    },
    // 更新简历
    updateApply (item) {
      this.name = item.name
      this.updateId = item.id
      this.updateShow = true
    },
    confirmUpdate () {
      const res = updateApply({id: this.updateId, name: this.name})
      res.then(result => {
        this.getApplyData()
      })
    },
    // 删除简历
    delete (id) {
      const res = deleteApply({id: id})
      res.then(result => {
        this.getApplyData()
      })
    },
    cancel () {
      this.name = ''
    }
  },
  computed: {
    user () {
      return this.$store.getters.user
    },
    profile () {
      return this.$store.getters.profile
    }
  }
}
</script>

<style lang="stylus" scoped>
.person
  .title
    font-size .26rem
    padding .4rem 0
    position relative
  .title::before
    position absolutek
    content ''
    height .26rem
    border 1px solid #0068f1
    margin-right .1rem
  .item
    h3
      font-size .16rem
      margin-bottom .1rem
      font-weight bold
  .noItem
    p
      font-size .16rem
      padding .4rem 0
.ivu-table-header
  font-size .2rem
</style>
