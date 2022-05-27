/* start: This Fetch works with Vue 3 */
const { createApp } = Vue

const app = createApp({
data() {
    return {
    count: 0,
    name: 'Variables estado en Vue',
    data: {}
    }
},
methods: {
    testing() {
        console.log(`my first method`)
    },
    get_data: function () {
        const url = "/controllers/region_list_controller.php"
        fetch(url)
        .then(response => response.json())
        .then((json_data) => {
            console.log(json_data)
            this.data = json_data.data
        })
        .catch((error) => {
            console.log(error)
        })
        //console.log(event.target.id)
    }
}
})

app.mount('#app')
/* end: This Fetch works with Vue 3 */