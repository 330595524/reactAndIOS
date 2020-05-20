import Vue from 'vue'
import { Button,Table,TableColumn,Progress,Message} from 'element-ui'

Vue.use(Button)
Vue.use(Progress)
// Vue.use(Message)

Vue.prototype.$message = Message;
Vue.use(Table)
Vue.use(TableColumn)
