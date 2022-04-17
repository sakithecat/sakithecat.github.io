console.log("foo")

Vue.createApp({
    data() {
      return {
        title_image: [
          ['The Cat', "/img/microbe_wanted.jpg"],
          ['The Adventurer', "/img/outdoorkitty.jpg"],
          ['The Cyclist', "/img/saki_biker.jpg"],
          ['The Test Pilot', "/img/saki_boxtime.png"],
          ['The Elf', "/img/micheal_microbe.jpg"],
          ['The Cheesepuff Lover', "/img/microbe_cheesepuff2.jpg"],
          ['The Stylish', "/img/sweaterkitty.jpg"],
          ['The Kitten', '/img/kitten.jpg'],
          ['The Plumber', '/img/saki_toilet.jpg']
        ],
        cat_names: [
            "Saki",
            "Microbe",
            "Micro-Chat",
            "Dingle",
            "Orla",
            "Who Names A Cat Orla??",
            "Kitty"
        ],
        alt_name: "Microbe",
        index: 0,
        name_index: 0,
      }
    },
    methods: {
        increment_index_forever(){
            
            this.index++
            if (this.index >= this.title_image.length){
                this.index = 0
            }
        },
        change_cat_name(){
            this.name_index++;
            if (this.name_index >= this.cat_names.length){
                this.name_index = 0
            }
            this.alt_name = this.cat_names[this.name_index + 1]
            if (this.name_index +1 >= this.cat_names.length)
            this.alt_name = this.cat_names[0]

        }

    },
    mounted(){
        setInterval(this.increment_index_forever, 2000)
    }

  }).mount('#app')