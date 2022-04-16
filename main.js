console.log("foo")

Vue.createApp({
    data() {
      return {
        title_image: [
          ['The Cat', "/img/microbe_wanted.jpg"],
          ['The Adventurer', "/img/outdoorkitty.jpg"],
          ['The Adventurer', "/img/saki_biker.jpg"],
          ['The Test Pilot', "/img/saki_boxtime.png"],
          ['The Elf', "/img/micheal_microbe.jpg"],
          ['The Cheesepuff Lover', "/img/microbe_cheesepuff2.jpg"],
          ['The Stylish', "/img/sweaterkitty.jpg"],
          ['The Kitten', '/img/kitten.jpg'],
          ['The Plumber', '/img/saki_toilet.jpg']
      ],
        index: 0
      }
    },
    methods: {
        increment_index_forever(){
            this.index++
            if (this.index >= this.title_image.length){
                this.index = 0
            }
        }
    },
    mounted(){
        setInterval(this.increment_index_forever, 2000)
    }

  }).mount('#app')