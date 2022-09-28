var app = new Vue({
    el: "#app",
    data: {
        num: 4
    },
    vuetify: new Vuetify(),
    methods: {
        getQuest: function () {
            console.log("Get data");
            const myHeaders = new Headers();
            
            fetch("http://localhost:3000/getPreguntes/",
                {
                method: "POST",
                headers: myHeaders,
                mode: "cors",
                cache: "default",
                body: JSON.stringify(this.data)
                }
            ).then(
                (response)=>{
                    console.log(response);
                }
            ).catch(
                (error) => {
                    //console.log("Error: " + error)
                }
            );
        }
    },
    
})