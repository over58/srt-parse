# vue-toast-xyc
a toast plugin

# Usage
```
import Vue from 'vue'
import Toast from 'vue-toast-xyc'

Vue.use(Toast)

this.$toast.show("hello,toast")

or
 
this.$toast.show("hello,toast",{
  duration:3000
})
 
or
 
this.$toast.show("hello,toast",function(){
    //to-do 
})

```

