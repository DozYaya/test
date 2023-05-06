//节流
// vue
import Vue from 'vue'
// create directive
const preventReClick = Vue.directive('preventReClick', {
    inserted: function (el, binding) {
        el.addEventListener('click', () => {
            // 判断按钮是否可点击
            if (!el.disabled) {
                el.disabled = true
                setTimeout(() => {
                    el.disabled = false
                }, binding.value || 2000)//默认3秒节流时间
            }
        })
    }
})

// export
export { preventReClick }