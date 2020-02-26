// 按需引入elmentUi组件
import Vue from 'vue'
import {
  Button,
  Input,
  Form,
  FormItem,
  Menu,
  MenuItem,
  Submenu,
  MessageBox,
  Message,
  Icon,
  Tabs,
  TabPane,
  Progress,
  Switch,
  Table,
  TableColumn,
  Pagination,
  Collapse,
  CollapseItem,
  Row,
  Radio,
  DatePicker,
  Tree,
  Drawer,
  Checkbox
} from 'element-ui'
// fade/zoom 等
import 'element-ui/lib/theme-chalk/base.css'
// collapse 展开折叠
import CollapseTransition from 'element-ui/lib/transitions/collapse-transition'
Vue.prototype.$ELEMENT = { size: 'small', zIndex: 3000 }
Vue.use(Button)
Vue.use(Input)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Menu)
Vue.use(Submenu)
Vue.use(MenuItem)
Vue.use(Icon)
Vue.use(Tabs)
Vue.use(TabPane)
Vue.use(Progress)
Vue.use(Switch)
Vue.use(Table)
Vue.use(TableColumn)
Vue.use(Row)
Vue.use(Pagination)
Vue.use(Radio)
Vue.use(Collapse)
Vue.use(CollapseItem)
Vue.use(Tree)
Vue.use(Drawer)
Vue.use(Checkbox)
Vue.use(DatePicker, { size: 'small', zIndex: 3000 })
Vue.component(Message.name, Message)
Vue.component(MessageBox.name, MessageBox)
Vue.component(CollapseTransition.name, CollapseTransition)
