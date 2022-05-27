/* start: This Fetch works with Vue 2 */
var vm = new Vue({
    el: '#app',
    // property is reactive
    data: {
        name: 'Variables estado en Vue',
        data: {}
    },
    // define methods under the `methods` object
    methods: {
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
/* end: This Fetch works with Vue 2 */