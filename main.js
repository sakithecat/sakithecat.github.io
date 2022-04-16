console.log("foo")

Vue.createApp({
    data() {
      return {
        titles: ['The Cat', 'The Adventurer', 'The Test Pilot', 'The Flea Exterminator', 'The Cheesepuff Lover', 'The Greenies-Fiender'],
        index: 0
      }
    },
    methods: {
        increment_index_forever(){
            this.index++
            if (this.index >= this.titles.length){
                this.index = 0
            }
        }
    },
    mounted(){
        setInterval(this.increment_index_forever, 1200)
    }

  }).mount('#app')